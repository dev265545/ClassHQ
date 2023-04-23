import { collection, doc, getDoc, onSnapshot, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState, Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
import { useRouter } from 'next/router';

import { db } from '../../firebase';
import { useSession } from 'next-auth/react';

function Courses() {
  const {data : session} = useSession()
 

  const [open, setOpen] = useState(1);


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const router = useRouter()
  const [user, setUser] = useState([])
  const [courses, setCourses] = useState([])
   const id  = router?.query?.id
   const [coursemodal, setCourseModal] = useState(false)
   const [courseslected, setCourseslected] = useState()

   const [buyed, setBuyed] = useState(false)

  useEffect(() => {
    if (router?.query?.id) {
      onSnapshot(
        query(collection(db, "users", router?.query?.id, "courses")),
        (snapshot) => {
          setCourses(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );
    }
  }, [router?.query?.id]);
  useEffect(() => {
     if (router?.query?.id) {
       getDoc(doc(db, "users", router?.query?.id,"students",session?.user?.uid)).then((docSnap) => {
         if (docSnap.exists()) {
           console.log("user exsits", docSnap.data());
           setUser(docSnap.data());
           user?.courses?.map((code)=>{
              if(courseslected === code){
                setBuyed(true)
              }
              else { 
                setBuyed(false)
              }
           })
         }
       });
     }
  }, [courseslected, router?.query?.id, session?.user?.uid, user?.courses]);
  const handleBuy = (course) => {
    let x = user?.courses;
    x.push(course);
    const f = doc(db, "users", router?.query?.id,"students",session?.user?.uid);
    setDoc(f, { courses: x }, { merge: true });
  }


  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Courses
          </h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Providing the Best Courses for you to learn and grow ....
          </p>
        </div>
        <div class="flex flex-col gap-8 ">
          {courses?.map((course, index) => (
            <article
              key={index}
              class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="flex gap-3 items-center mb-5 text-gray-500">
                {course?.course_topic?.split(",").map((topic, index) => (
                  <span
                    key={index}
                    class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
                  >
                    <svg
                      class="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    {topic}
                  </span>
                ))}
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    class="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  Course
                </span>
              </div>
              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{course?.coursename}</a>
              </h2>
              <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                {course?.course_description}
                {course?.course_d_details}
              </p>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <button
                    type="button"
                    class="py-2.5 px-5 text-xl font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Price : {course?.course_price}
                  </button>
                </div>
                <a
                  onClick={() => {
                    setCourseModal(true);
                    setCourseslected(course?.id);
                  }}
                  href="#"
                  class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Click
                  <svg
                    class="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
              {coursemodal && (
                <div
                  data-te-modal-init
                  class="fixed left-0 top-0   overflow-y-scroll z-50 h-full w-full flex  backdrop-blur-lg items-center justify-center overflow-y-auto overflow-x-hidden outline-none"
                  id="exampleModalLg"
                  tabindex="-1"
                  aria-labelledby="exampleModalLgLabel"
                  aria-modal="true"
                  role="dialog"
                >
                  {
                    <div class="relative  overflow-scroll   w-full  h-full md:h-auto">
                      <div class="relative   rounded-lg shadow bg-gray-900 sm:p-5">
                        <div class="flex justify-between rounded-t sm:mb-5">
                          <div class="text-lg  md:text-xl text-white">
                            <h3 class="font-semibold ">Course Details</h3>
                            <p class="font-bold">{course?.coursename}</p>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setCourseModal(false);
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
                        <section class="  rounded-xl bg-gray-900">
                          <div class=" items-center  px-4   w-full lg:grid lg:grid-cols-2  lg:px-6">
                            <div class="font-light  sm:text-lg text-gray-400">
                              <h2 class=" text-4xl tracking-tight font-extrabold text-white">
                                {course?.coursename}
                              </h2>
                              <p class="">{course?.course_decription}</p>
                              <p>{course?.course_d_details}</p>
                            </div>

                           
                              <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                              
                                  {/* <img
                                    src={activetemplateId?.images[0]}
                                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                    alt="..."
                                  />{" "} */}
                          
                               

                               
                              </div>

                           
                          </div>
                        </section>
                        <div class="flex  flex-col ">
                          <div class="flex flex-col items-center ">
                            {buyed &&
                              course?.modules.map((module, index) => (
                                <Fragment key={index}>
                                  <Accordion open={open === index + 1}>
                                    <AccordionHeader
                                      onClick={() => handleOpen(index + 1)}
                                    >
                                      {module?.name}
                                    </AccordionHeader>
                                    <AccordionBody>
                                      <div>
                                        <div>
                                          <p>Description</p>
                                          {module?.description}
                                        </div>
                                        <div>
                                          Video
                                          <div className="flex items-center justify-center">
                                            <iframe
                                              width="949"
                                              height="534"
                                              src={module?.video_url}
                                              title="IPL 2023 -  GT vs LSG &amp; MI vs PBKS Review - Baby Over Ep 335"
                                              frameborder="0"
                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                              allowfullscreen
                                            ></iframe>
                                          </div>
                                        </div>
                                        <div>
                                          Notes
                                          <div>
                                            <a
                                              href={module?.notes}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              {module?.name}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionBody>
                                  </Accordion>
                                </Fragment>
                              ))}

                            {!buyed && (
                              <button
                              onClick ={()=>{
                                handleBuy(course?.id)
                              }}
                                type="button"
                                class="py-2.5 px-5 text-xl font-medium text-gray-900 focus:outline-none bg-green-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                Buy
                              </button>
                            )}
                            {buyed && (
                              <button
                                type="button"
                                class="py-1.5 px-2 text-xl font-medium text-gray-900 focus:outline-none bg-green-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                Thanks For Buying ....
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses