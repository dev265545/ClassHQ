import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Template1Modal from './Template1/Template1Modal';

function TemplateModal({ isOpen, closeModal, openModal, activetemplateId,user }) {
  console.log(activetemplateId)
  const [selected, setSelcted] = useState(false)
  const [templatemodalopen, setTemplateModalOpen] = useState(false)

  const openTemplate1Modal = () => {
    setTemplateModalOpen(true)
  }
  const closeTemplate1Modal = () => {
    setTemplateModalOpen(false)
  }

  useEffect(()=>{
if (user?.website_template === activetemplateId?.codename) {
  setSelcted(true);
}
 
  },[user?.website_template,activetemplateId?.codename])

     
     const router = useRouter();
     const handletemplateselect = () => {
      const cityRef = doc(db, "users", user?.id);
      setDoc(cityRef, { website_template: 'Template1' }, { merge: true });
     }
      const handletemplateunselect = () => {
        const cityRef = doc(db, "users", user?.id);
        setDoc(cityRef, { website_template: null }, { merge: true });
      };
  return (
    <div
      data-te-modal-init
      class="fixed left-0 top-0 z-50 h-full w-full flex  backdrop-blur-lg items-center justify-center overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalLg"
      tabindex="-1"
      aria-labelledby="exampleModalLgLabel"
      aria-modal="true"
      role="dialog"
    >
      {
        <div class="relative p-4 w-full  h-full md:h-auto">
          <div class="relative p-4  rounded-lg shadow bg-gray-900 sm:p-5">
            <div class="flex justify-between mb-4 rounded-t sm:mb-5">
              <div class="text-lg  md:text-xl text-white">
                <h3 class="font-semibold ">{activetemplateId?.codename}</h3>
                <p class="font-bold">{activetemplateId?.name}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    closeModal();
                  }}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="readProductModal"
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
              </div>
            </div>
            <section class="  rounded-xlbg-gray-900">
              <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div class="font-light  sm:text-lg text-gray-400">
                  <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white">
                    {activetemplateId?.name}
                  </h2>
                  <p class="mb-4">{activetemplateId?.decription}</p>
                  <p>{activetemplateId?.info}</p>
                </div>

                <div
                  id="default-carousel"
                  class="relative w-full"
                  data-carousel="slide"
                >
                  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <div class=" duration-100 ease-in-out" data-carousel-item>
                      <img
                        src={activetemplateId?.images[0]}
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />{" "}
                    </div>
                    <div
                      class=" duration-100 ease-in-out"
                      data-carousel-item="active"
                    >
                      <img
                        src={activetemplateId?.images[1]}
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>

                    <div class=" duration-100 ease-in-out" data-carousel-item>
                      <img
                        src={activetemplateId?.images[2]}
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                  >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                      <svg
                        aria-hidden="true"
                        class="w-6 h-6 text-white dark:text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                      <span class="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                  >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                      <svg
                        aria-hidden="true"
                        class="w-6 h-6 text-white dark:text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                      <span class="sr-only">Next</span>
                    </span>
                  </button>
                </div>
              </div>
            </section>
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3 sm:space-x-4">
                {!selected && (
                  <button
                    onClick={() => {
                      setSelcted(true);
                      handletemplateselect();
                    }}
                    type="button"
                    class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                  
                    Select this Template
                  </button>
                )}
                {selected && (
                  <button
                    onClick={() => {
                      setSelcted(false);
                      handletemplateunselect();
                    }}
                    type="button"
                    class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                   
                    Selected
                  </button>
                )}
                {!selected && (
                  <button
                  disabled
                   
                    type="button"
                    class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      aria-hidden="true"
                      class="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                   Edit
                  </button>
                )}
                {selected && (
                  <button
                    onClick={() => {
                      openTemplate1Modal();
                    }}
                    type="button"
                    class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      aria-hidden="true"
                      class="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Preview
                </button>
              </div>
              {/* <button
                type="button"
                class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-1.5 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Delete
              </button> */}
            </div>
          </div>
        </div>
      }
      {
        templatemodalopen && <Template1Modal closeTemplate1Modal={closeTemplate1Modal} />
      }
    </div>
  );
}

export default TemplateModal