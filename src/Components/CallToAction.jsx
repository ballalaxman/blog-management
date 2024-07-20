import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="w-full border-2 border-teal-500 rounded-tl-3xl rounded-br-3xl p-5 flex items-center justify-between">
      <div className="flex-1 justify-center flex flex-col">
        <h1>Want to explore my Javascript Projects?</h1>
        <p className="text-gray-500 my-2">
          Checkout these resourcers to see the latest projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-2xl rounded-br-2xl max-w-96 focus:ring-0"
          fullSized
        >
          <a href="https://www.w3schools.com" target="_blank" rel="noreferrer">
            Javascript Project
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 max-w-[700px]">
        <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/01/Python-vs-Java-featured-image-1024x675.png" />
      </div>
    </div>
  );
};

export default CallToAction;
