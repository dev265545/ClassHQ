import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useRouter } from 'next/router';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function X() {
  const router = useRouter();
  const { id, Live } = router.query;

  const roomID = getUrlParams().get('roomID') || randomID(10);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;
   let token;   
   let userId;
   if(role_str === 'Host'){
      userId = 'dev';}
    else if(role_str === 'Audience'){
      userId = 'Audience';
    } else{
      userId = 'Audience2';
    }
 if(userId ==='dev') {
token =
  "04AAAAAGRHcPUAEG96YW8wYjJodzVxaHY4ankAoFfiTDF2KFoVVeDswoS9qU0S+B29L3tluIEo56t8hLiBHpSRqLmSnF1+p5mJMU8HLan4dMYROGj7DFebqO2m6Gp2qjx5IAOjCatUqU9jA9U2Yfex1OJieB8gZpznEDYr/ZuMecTbY674JZwbT42OfRgzBelk0CZG0Ubc8MSSZEsu+jEqHCG+wOvjFSur1/R3zUxSyOBOE5ciybqWNuaRsDY="; 

 } else if(userId === 'Audience'){
  token =
    "04AAAAAGRHcLUAEDdyeTh5bXV0a3VjdHN1Nm4AsHcH+IvS7ChvFQVQKSreveRt8+/j3841XtZEG9kdm3UCHaVZc979aS/Ms36MyhE0xojs+MmBH2GKV8hfo4HWM5AuHw5Fk8PopfdwEKqmGFbK3gnL/T+IH4+6P5lwJLihueme6YrBrGC6dCGquuL0g0O43mKh5SfPv4yS0gRi0ng8QdX3JU1PLt66pPk2ne36une71ude64xEraXfEUIjvTFf5kTbhgX+MBw1Q1o4W/Dc";
 } else {
  token =
    "04AAAAAGRHcRcAEDAxd3g2OWFiYTZzaXB4aTUAsGpjJ18/SZtDNKu9E4tW369BDdN5jLyjOmbYfsfyshVYcVt/2koe54uFgK/WL3P8nfhZhk1fKsTSAoyA8cTy3H2CgrRJvRk79BOAz95M/mQFOWn5/mGp/ZwWNTY5ZEv8Od5JLuyp3YHJgu22zdYXQT/mmgzqK7upq0hKrVErHV/mLzGhEGdTsIT9DBIwPDlCaJSpxhxzr0z6nO3MMOUzVbMlQeW6OqiYZvr8qcaN7joF";}
  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:"http:" + '//' + 
        "localhost:3000" + "/EducatorDashboard/" + id + "/LiveStreaming/" + Live +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: "Join as audience",
    url:
      "http:" +
      "//" +
      "localhost:3000" +
      "/EducatorDashboard/" +
      id +
      "/LiveStreaming/" +
      Live +
      "?roomID=" +
      roomID +
      "&role=Audience",
  });
 // generate Kit Token
  const appID = 162861517;
   const serverSecret = "5ada2976e6a219197ee4fc899cbc1daa";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID,  userId,   randomID(5));

console.log("ff",kitToken)
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
      });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}