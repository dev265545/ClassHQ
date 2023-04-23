import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Navbar";

import dynamic from "next/dynamic";
import { BiPlusCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useSession } from "next-auth/react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import Dashboard from "../../../../public/livestreaming.gif"


function LiveStreaming() {

    const router = useRouter()
    const [courses, setCourses] = useState([]);
    const {data : session} = useSession()
    
      useEffect(() => {
        if (router?.query?.id) {
          onSnapshot(
            query(collection(db, "users", router?.query?.id, "students")),
            (snapshot) => {
              setCourses(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
              );
            }
          );
        }
      }, [router?.query?.id]);
    const handleClick = () => {
      const r = Math.floor(Math.random() * 1010102);
   courses?.map((course, index) => {
console.log(course?.livestream)

const link = " https://localhost:3000/EducatorDashboard/"+router?.query?.id+"/LiveStreaming/"+ r +"?roomID=lu8GV&role=Audience" ;
        if(course?.livestream){
          let emailparams = {
            from_name: session?.user?.name,
            to_name: course?.name,
            email: course?.email,
            email2: session?.user?.email,
            message: "A New Live Stream has been started by me. Please Attend it " + link,
          };
          emailjs.send(
            "service_45kfoal",
            "template_z7r67nn",
            emailparams,
            "45iOpl98A5fWuxhEd"
          );
        }
   })
        


        
        router.push(
          `/EducatorDashboard/${router?.query?.id}/LiveStreaming/${r}`
        );
    }
  return (
    <div className="flex  bg-blue-100 min-h-screen flex-row gap-60">
      <Sidebar />
      <div className="p-10 gap-5 flex flex-col">
        <Image
          width={1}
          height={1}
          className="w-[500px] h-[800px] fixed right-0 top-0  "
          src={Dashboard}
          alt="Picture of the author"
        />
        <div className="flex flex-col gap-0">
          <h1 className="text-3xl font-sans text-black font-bold">
            Welcome {session?.user?.name}
          </h1>

          <p className="text-black font-normal inline-flex gap-0 ">
            This is your dashboard which has all the tools at your fingertips
            ....
          </p>
          <div className=" text-black font-bold inline-block ">
            From Managing your website to Conducting Live Streams and Adding
            Courses
          </div>
          <hr class="h-[2px] my-8 bg-black text-black"></hr>
        </div>
        <div className="p-4  flex items-center justify-center w-[350px] h-[185px]  wavy  bg-gray-800  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col">
            <div className=" flex justify-end">
              <p className="text-white text-lg font-bold inline-block">
                Start A live Stream
              </p>

              <button
                onClick={() => {
                  handleClick();
                }}
                className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
              >
                <BiPlusCircle className="text-5xl  text-white  rounded-full "></BiPlusCircle>
              </button>
            </div>
          </div>
        </div>
        <p className="text-black font-extrabold ">
          Note! - If you Click on this, it will send a notification to all the
          people who are subscribed to this plan ... <br /> So be prepared before you
          click on this button.
        </p>
        <p></p>
      </div>
    </div>
  );
      

}

export default LiveStreaming;
