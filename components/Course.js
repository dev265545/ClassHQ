import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import {useRouter} from "next/router"
import { useSession } from "next-auth/react";

function Course() {
  const router = useRouter()
  const {data : session} = useSession()
  return (
    <div className="p-4  w-[250px] h-[155px]  wavy   rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div onClick={(e)=>{router.push(`/EducatorDashboard/${session.user.uid}/Course`)}} className="flex flex-col">
        <div className=" flex justify-end">
          <button
            // onClick={openModal}
            className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
          >
            <BiPlusCircle className="text-5xl    rounded-full "></BiPlusCircle>
          </button>
        </div>

        <p className="text-white font-bold text-lg inline-block">Manage your Courses</p>
      </div>
      {/* {isOpen && (
        // <NewAppointmentModal
        //   doctor={doctor}
        //   isOpen={isOpen}
        //   closeModal={closeModal}
        //   openModal={openModal}
        // />
      )} */}
    </div>
  );
}

export default Course;
