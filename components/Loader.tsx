import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen overflow-hidden my-auto bg-black border-black z-50">
      <video src="/loading.mp4" className="w-[300px]" autoPlay muted loop></video>
    </div>
  );
};

export default Loading;