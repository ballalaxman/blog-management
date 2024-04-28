// @ts-nocheck
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import {
  deleteUserFailure,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess
} from "../redux/userSlice";
import axios from "axios";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [imageFileUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [showModel, setShowmodel] = useState(false);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadProfileImage();
    }
  }, [imageFile]);

  const uploadProfileImage = async () => {
    // service firebase.storage {
    //     match /b/{bucket}/o {
    //       match /{allPaths=**} {
    //         allow read;
    //         allow write : if
    //         request.resource.size < 2 * 1024 * 1024 &&
    //         request.resource.contentType.matches('image/.*')
    //       }
    //     }
    //   }
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageFileUploadError(
          "Could not upload Image(File must be less than 2mb)"
        );
        setImageUploadProgress(null);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageFileUrl(url);
          setFormData({ ...formData, profilePic: url });
        })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await axios.put(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      dispatch(updateSuccess(res.data.data));
      console.log(res);
    } catch (error) {
      console.log(
        "Error Details:",
        error.response ? error.response.data : error.message
      );
      dispatch(updateFailure(error));
    }
  };

  const handleDeleteUser = async () => {
    setShowmodel(false);
    try {
      dispatch(updateStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      dispatch(updateSuccess(res.data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post("api/user/signout");
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full">
      <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="images/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                }
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePic}
            alt="user"
            className={`rounded-full h-full w-full object-cover border-8 border-[lightgrey] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failur">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleInputChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="youremail@gmail.com"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        />
        <TextInput
          type="password"
          id="password"
          defaultValue={"************"}
          onChange={handleInputChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer" onClick={() => setShowmodel(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <Modal
        show={showModel}
        onClose={() => setShowmodel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex items-center justify-center gap-3">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I&apos;m sure
              </Button>
              <Button onClick={() => setShowmodel(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
