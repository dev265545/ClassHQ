import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineExplore,
  MdChat,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPills, FaRegComments } from "react-icons/fa";
import { BiCalendarEvent, BiMessageSquareDots } from "react-icons/bi";

function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-0  peer rounded-md p-1 px-2 py-3 text-gray-800 hover:bg-gradient-radial  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block lg:hidden z-50  h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-blue-50 rounded-lg z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-100">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-lg text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              CLASSHQ
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div
                onClick={() =>
                  router.push(`/EducatorDashboard/${session?.user?.uid}`)
                }
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gradient-radial  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineSpaceDashboard className="text-2xl text-gray-900 group-hover:text-black " />
                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                  Dashboard
                </h3>
              </div>
              <div
                onClick={() =>
                  router.push(`/DoctorDashBoard/${session?.user?.id}/Profile`)
                }
                className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gradient-radial  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <CgProfile className="text-2xl text-gray-900 group-hover:text-black " />
                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                  Profile
                </h3>
              </div>

              <div
                onClick={() =>
                  router.push(`/DoctorDashBoard/${session?.user?.id}/Chat`)
                }
                className="flex   mb-2 justify-start items-center gap-4 pl-5 hover:bg-gradient-radial  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdChat className="text-2xl text-gray-900 group-hover:text-black " />
                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                 Templates
                </h3>
              </div>
              <div
                onClick={() =>
                  router.push(
                    `/DoctorDashBoard/${session?.user?.id}/Appointments`
                  )
                }
                className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gradient-radial  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <BiCalendarEvent className="text-2xl text-gray-900 group-hover:text-black " />
                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                 Courses
                </h3>
              </div>
              <div
                onClick={() =>
                  router.push(`/DoctorDashBoard/${session?.user?.id}/Reviews`)
                }
                className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gradient-radial  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-900 group-hover:text-black " />
                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                  Reviews
                </h3>
              </div>
            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-gray-100 pb-4"></div>
            {/* logout */}
            <div className=" my-4">
              <div
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gradient-radial  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineLogout className="text-2xl text-gray-900 group-hover:text-black " />
                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default Sidebar;
