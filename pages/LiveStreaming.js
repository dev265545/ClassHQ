import React from 'react'

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function LiveStreaming() {
     const roomID = "12345";
     const userID = "FIO34M"
     const userName = "34R34OM"
      let role_str = "Host";
      const role =
        role_str === "Host"
          ? ZegoUIKitPrebuilt.Host
          : role_str === "Cohost"
          ? ZegoUIKitPrebuilt.Cohost
          : ZegoUIKitPrebuilt.Audience;

        let sharedLinks = [];
        if (
          role === ZegoUIKitPrebuilt.Host ||
          role === ZegoUIKitPrebuilt.Cohost
        ) {
          sharedLinks.push({
            name: "Join as co-host",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID +
              "&role=Cohost",
          });
        }
        sharedLinks.push({
          name: "Join as audience",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID +
            "&role=Audience",
        });    
     const meeting = async (element) => {
        
        
       const appID = 870295191;
       const serverSecret = "fac69acebbacf736d5cf1a25145611bf";
       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
         appID,
         serverSecret,
         roomID,
         userID
         , userName
       );
       const zp = ZegoUIKitPrebuilt.create(kitToken);

       zp.joinRoom({
         container: element,
         scenario: {
           mode: ZegoUIKitPrebuilt.LiveStreaming,
           config: {
             role,
           },
           sharedLinks,
         },
       });
     };
  return (<div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>
  )
}

export default LiveStreaming