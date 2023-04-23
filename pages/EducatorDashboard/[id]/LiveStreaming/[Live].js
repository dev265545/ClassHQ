import React from "react";

import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("./X"), {
  ssr: false,
});


function LiveStreams() {
  return (
   <div className="">
        <DynamicHeader />
      </div>
  )
}

export default LiveStreams