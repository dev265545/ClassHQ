import { useRouter } from "next/router";
import React from "react";
import { BiPlusCircle } from "react-icons/bi";
function ManageLive({user}) {
const router = useRouter()
  return (
    <div className="p-4  w-[250px] h-[155px]  circles   rounded-lg border shadow-md sm:p-8 bg-gray-800 border-gray-700">
      <div className="flex flex-col">
        <div className=" flex justify-end">
          <p className="text-white text-lg font-bold inline-block">
           To Live Streaming 
          </p>
          <button
            onClick={() => {router.push(`${user.id}/LiveStreaming`)}}
            className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
          >
            <BiPlusCircle className="text-5xl   rounded-full "></BiPlusCircle>
          </button>
        </div>
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

export default ManageLive;
