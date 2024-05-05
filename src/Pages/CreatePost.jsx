// @ts-nocheck
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-4xl min-h-screen mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React Js</option>
            <option value="nextjs">NextJs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-gray-600 border-dashed p-3">
          <FileInput accept="image/*" type="file" />
          <Button type="button" gradientDuoTone="purpleToBlue" size={"sm"}>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit">Publish</Button>
      </form>
    </div>
  );
};

export default CreatePost;
