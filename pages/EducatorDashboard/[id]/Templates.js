import React, { useState } from 'react'
import Sidebar from '../../../components/Navbar';
import Course from '../../../components/Course';
import { BiLinkExternal } from 'react-icons/bi';
import Image from 'next/image';
import design1 from "../../../public/2481_R0lVIEpFTiA4MTgtMTg.jpg"
import WebsiteModal from '../../../components/WebsiteModal';
import TemplateModal from '../../../components/TemplateModal';
function Templates() {
  const [isOpen, setIsOpen] = useState(false)
  const [activetemplateId, setActivetemplateId] = useState()
  const openModal = (id) => {
    setActivetemplateId(id)
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }


  const data = [
    {
      id: 1,
      name: "Template 1",
      description: "This is a template",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    {
      id: 2,
      name: "Template 2",
      description: "This is a template",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    {
      id: 1,
      name: "Template 1",
      description: "This is a template",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    {
      id: 2,
      name: "Template 2",
      description: "This is a template",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    {
      id: 1,
      name: "Template 1",
      description: "This is a template",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    {
      id: 2,
      name: "Template 2",
      description: "This is a template",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
  ];
  return (
    <div className="flex bg-white  min-h-screen   flex-row gap-60">
      <Sidebar />

      <div className="p-10 gap-5 text-black flex flex-row">
        <section class="bg-white ">
          <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="max-w-screen-md mb-8 lg:mb-16">
              <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                <div class="triangle absolute top-0 right-0 w-200 z-50 h-200 border-t-4 border-r-4">
                  <Image
                    width={310}
                    height={350}
                    class=" rounded-xl sm:rounded-none sm:rounded-l-lg"
                    src={design1}
                    alt="Bonnie Avatar"
                  />
                </div>
                Designed for Educators to Maximize their{" "}
                <p className="text-purple-600">Impact....</p>
              </h2>
              <p class="text-gray-500 sm:text-xl">
                Here at ClassHQ you have the Power to create the best Website
                for your to showcase your talent, skills and knowledge to the
                world.
              </p>
            </div>
            <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
              {data.map((template, index) => (
                <div
                  key={index}
                  class="items-center bg-gray-50 rounded-lg shadow-lg shadow-blue-100 border-8 sm:flex  dark:border-gray-700"
                >
                  <a className="rounded-full p-2" href="#">
                    <Image
                      width={400}
                      height={400}
                      class="w-full p-2  rounded-xl sm:rounded-none sm:rounded-l-lg"
                      src={template?.image}
                      alt="Bonnie Avatar"
                    />
                  </a>
                  <div class="p-5">
                    <h3 class="text-xl items-center justify-center flex font-bold tracking-tight text-gray-900 ">
                      <a href="#">{template?.name}</a>
                    </h3>
                    <span class="text-gray-500 ">{template?.description}</span>
                    <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400"></p>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          openModal(template?.id);
                        }}
                        type="button"
                        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {isOpen && (
        <TemplateModal
          // doctor={doctor}
          activetemplateId={activetemplateId}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
    </div>
  );
}

export default Templates