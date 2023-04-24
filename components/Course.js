import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import {useRouter} from "next/router"
import { useSession } from "next-auth/react";

function Course({user}) {
  const router = useRouter()
  const [show, setShow] = useState(false);

  const {data : session} = useSession()
  return (
    <div className="p-4  w-[250px] h-[155px]  cubes   rounded-lg border shadow-md sm:p-8 bg-gray-800 border-gray-700">
      {user?.subscription === 1 ? (
        <div
          onClick={(e) => {
          setShow(true)
          }}
          className="flex flex-col"
        >
          <div className=" flex justify-start">
            <p className="text-white font-bold text-lg inline-block">
              Manage your Courses
            </p>
            <button
              // onClick={openModal}
              className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
            >
              <BiPlusCircle className="text-5xl    rounded-full "></BiPlusCircle>
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => {
            router.push(`/EducatorDashboard/${session.user.uid}/Course`);
          }}
          className="flex flex-col"
        >
          <div className=" flex justify-start">
            <p className="text-white font-bold text-lg inline-block">
              Manage your Courses
            </p>
            <button
              // onClick={openModal}
              className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
            >
              <BiPlusCircle className="text-5xl    rounded-full "></BiPlusCircle>
            </button>
          </div>
        </div>
      )}
      {show && (
        <div
          id="successModal"
          tabindex="-1"
          aria-hidden="true"
          class=" overflow-y-auto overflow-x-hidden absolute  z-50 justify-center items-center "
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative p-4 text-center  rounded-lg shadow bg-gray-800 sm:p-5">
              <button
                onClick={() => {
                  setShow(false);
                }}
                type="button"
                class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                data-modal-toggle="successModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="w-12 h-12 rounded-full  bg-green-900 p-2 text-white  flex items-center justify-center mx-auto mb-3.5"></div>
              <p class="mb-4 text-lg font-semibold text-gray-900 text-white">
                You have not Subscribed to this Plan, Headover to Plans Page to
                Change the Plan
              </p>

              <button
                onClick={() => {
                  setShow(false);
                }}
                data-modal-toggle="successModal"
                type="button"
                class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:ring-primary-900"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
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
