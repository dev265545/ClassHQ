import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Navbar";

import dynamic from "next/dynamic";
import { BiPlusCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useSession } from "next-auth/react";
import emailjs from "@emailjs/browser";


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
   courses?.map((course, index) => {
console.log(course?.livestream)
        if(course?.livestream){
          let emailparams = {
            from_name: session?.user?.name,
            to_name: course?.name,
            email: course?.email,
            email2: session?.user?.email,
            message: "A New Live Stream has been started by me. Please Attend it",
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
          `/EducatorDashboard/${router?.query?.id}/LiveStreaming/122344`
        );
    }
  return (
    <div className="flex  bg-blue-100 min-h-screen flex-row gap-60">
      <Sidebar />
      <div className="p-10 gap-5 flex flex-col">
    
    <div className="p-4  flex items-center justify-center w-[500px] h-[255px]  wavy  bg-gray-800  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col">
        <div className=" flex justify-end">
          <p className="text-white text-lg font-bold inline-block">
            Start A live Stream 
            [Beware this will send a notification to all the people who are subscribed to this plan ...]
          </p>
          <button
            onClick={()=>{handleClick()}}
            className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
          >
            <BiPlusCircle className="text-5xl  text-white  rounded-full "></BiPlusCircle>
          </button>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
      

}

export default LiveStreaming;
