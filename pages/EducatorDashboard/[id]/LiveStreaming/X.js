import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}


function X() {
  const router = useRouter();

  const { data: session } = useSession();
  const [id, setId] = useState(router?.query?.id);
  const [name, setName] = useState(session?.user?.name);
  const [live, setLive] = useState(router?.query?.Live);
  useEffect(() => {
   
    setId(router?.query?.id);
    setLive(router?.query?.live);
    setName(session?.user?.name);
  }, [session, router]);
    const roomID = getUrlParams().get('roomID') || randomID(5);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
     window.location.protocol + '//' + 
     window.location.host + window.location.pathname +
      '?roomID=' +
      roomID +
      '&role=Audience',
  });
 // generate Kit Token
  const appID = 870295191;
  const serverSecret = "fac69acebbacf736d5cf1a25145611bf";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


  // start the call
  let myMeeting = async (element) => {
      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
        onLeaveRoom: () => {
          router.push(`/EducatorDashboard/${id}/LiveStreaming`)
        },
      });
  };


  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}

export default X;
