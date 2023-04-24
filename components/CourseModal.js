import React, { useEffect, useState } from 'react'
import ImageUploader from './ImageUploader';

import { useRouter } from 'next/router';
import { collection, doc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function CourseModal({course,closecourseModal}) {
    console.log("sss,",course)
  const router = useRouter();
  const [addamodule, setAddamodule] = useState(false);

  const [coursename, setCourseName] = useState(course?.coursename);
  const [course_topic, setCourseTopic] = useState(course?.course_topic);
  const [course_description, setCourseDescription] = useState(course?.course_description);
  const [course_d_details, setCourseDetails] = useState(course?.course_d_details);
  const [course_image, setCourseImage] = useState([]);
  const [course_price, setCoursePrice] = useState(course?.course_price);
  const [course_id, setCourseId] = useState(course?.course_id);
  const [onClick, setonClick] = useState(false);
   let modules = course?.modules
  const [module_name, setModuleName] = useState();
    const [module_description, setModuleDescription] = useState();
    const [module_image, setModuleImage] = useState("");
    const [module_video, setModuleVideo] = useState();
    const [notes, setNotes] = useState();
    const [module_id, setModuleId] = useState();


  const openModal = () => {
    setAddamodule(true);
  }
    const closeModal = () => {
    setAddamodule(false);}
  const handleaddmodule = (e) => {
    e.preventDefault()
    const data = {
        name: module_name,
        description: module_description,
        image: module_image,
        video_url : module_video,
        notes : notes,
        id : module_id,
    }
     modules.push(data)
     console.log(modules)
    const newCityRef = doc(db, "users", router?.query?.id, "courses",course?.id);
    setDoc(newCityRef, {
      course_topic: course_topic,
      course_description: course_description,
      course_d_details: course_d_details,
      course_image: course_image,
      course_price: course_price,
     
      coursename: coursename,

      modules: modules,
    },{ merge: true });
  };
  const handledelete = (index) => {
    let y = course?.modules
   const x =y.splice(index, 1);

    setDoc(doc(db, "users", router?.query?.id, "courses",course?.id), {
      modules : x,
      course_topic: course_topic,
      course_description: course_description,
      course_d_details: course_d_details,
      course_image: course_image,
      course_price: course_price,

      coursename: coursename,
    });
    closecourseModal();
    
  }
  const handleaddcourse = (e) => {
    e.preventDefault();
    const newCityRef = doc(db, "users", router?.query?.id, "courses",course?.id);
    setDoc(newCityRef, {
      course_topic: course_topic,
      course_description: course_description,
      course_d_details: course_d_details,
      course_image: course_image,
      course_price: course_price,
      modules : course?.modules,
      coursename: coursename,
    }, { merge: true });
  };
  return (
    <div
      id="updateProductModal"
      tabindex="-1"
      aria-hidden="true"
      class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full"
    >
      <div class="relative p-4 w-full">
        <div class="relative p-4 bg-gray-800 sm:p-5">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
            <h3 class="text-lg font-semibold text-white">Add Course</h3>
            <button
              onClick={() => {
                closecourseModal();
              }}
              type="button"
              class="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="updateProductModal"
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

          <form action="#">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  name="Course_name"
                  id="Course_name"
                  onChange={(e) => setCourseName(e.target.value)}
                  value={coursename}
                  class=" text-sm rounded-lg 0 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Course Name"
                />
              </div>
              <div>
                <label
                  for="brand"
                  class=" inline-block  text-sm font-medium  text-white"
                >
                  Course Topics Seperate with commas
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e) => setCourseTopic(e.target.value)}
                  value={course_topic}
                  class="  text-sm rounded-lg   block w-full  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write all the topics seperate with ,'s "
                />
              </div>
              <div>
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  min={0}
                  value={course_price}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  name="price"
                  id="price"
                  class=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Set A price"
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Document ID
                </label>
                <input
                  type="text"
                  value={course_id}
                  onChange={(e) => setCourseId(e.target.value)}
                  name="id"
                  id="id"
                  class=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Document ID"
                />
              </div>
              <div class="sm:col-span-4 ">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Small Description
                </label>
                <textarea
                  id="description"
                  value={course_description}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows="5"
                  class="block p-2.5 w-full text-sm   rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write a description..."
                ></textarea>
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Detailed Description
                </label>
                <textarea
                  value={course_d_details}
                  onChange={(e) => setCourseDetails(e.target.value)}
                  id="description"
                  rows="5"
                  class="block p-2.5 w-full text-sm   rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write a description..."
                ></textarea>
              </div>
            </div>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                {/* <button
                  onClick={() => {
                    setonClick(true);
                  }}
                  type="button"
                  class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                >
                  Image Upload
                </button> */}
              </div>
            </div>
            <div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700 text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Module Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Module Video Url
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Module Notes
                      </th>
                     
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {course?.modules?.map((module, index) => (
                      <tr
                        key={index}
                        class=" border-b bg-gray-900 border-gray-700"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                        >
                          {module.name}
                        </th>
                        <td class="px-6 py-4">{module.video_url}</td>
                        <td class="px-6 py-4">{module.notes}</td>

                        <td class="px-6 py-4">
                          <div onClick={()=>{handledelete(index)}} class="font-medium text-blue-600 text-blue-500 hover:underline">
                            Delete
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  openModal();
                }}
                type="button"
                class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-600 hover:bg-pink-700 focus:ring-purple-800"
              >
                Add A module
              </button>
            </div>
            <div class="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  handleaddcourse(e);
                }}
                type="submit"
                class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Update the Course
              </button>
              {/* <button
                    type="button"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    <svg
                      class="mr-1 -ml-1 w-5 h-5"
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
          </form>
        </div>
      </div>
      {onClick && (
        <div
          id="small-modal"
          tabIndex="-1"
          className="  overflow-y-auto overflow-x-hidden backdrop-blur-lg flex items-center justify-center fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center p-5 rounded-t border-b border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 text-white">
                  Upload a Document
                </h3>
                <button
                  onClick={() => {
                    setonClick(false);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-toggle="small-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <ImageUploader
                // uid={user?.data?.uid}
                // links={user?.data?.documents}
                />
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 border-gray-600"></div>
            </div>
          </div>
        </div>
      )}
      {addamodule && (
        <div
          id="updateProductModal"
          tabindex="-1"
          aria-hidden="true"
          class=" overflow-y-auto backdrop-blur-3xl overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full"
        >
          <div class="relative p-4 w-full">
            <div class="relative p-4 bg-gray-800 sm:p-5">
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                <h3 class="text-lg font-semibold text-white">
                  Add A module to the Course
                </h3>
                <button
                  onClick={() => {
                    closeModal();
                  }}
                  type="button"
                  class="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-toggle="updateProductModal"
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

              <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Module Name
                    </label>
                    <input
                      type="text"
                      name="Module_Name"
                      id="Module_name"
                      onChange={(e) => setModuleName(e.target.value)}
                      value={module_name}
                      class=" text-sm rounded-lg 0 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Module Name"
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Module Notes pdf Link
                    </label>
                    <input
                      type="text"
                      name="Module_Notes"
                      id="Module_notes"
                      onChange={(e) => setNotes(e.target.value)}
                      value={notes}
                      class=" text-sm rounded-lg 0 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Module Name"
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Module Video Link
                    </label>
                    <input
                      type="text"
                      name="Module_Video"
                      id="Module_Video"
                      onChange={(e) => setModuleVideo(e.target.value)}
                      value={module_video}
                      class=" text-sm rounded-lg 0 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Module Name"
                    />
                  </div>
                  <div>
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium  text-white"
                    >
                      Module ID
                    </label>
                    <input
                      type="text"
                      value={module_id}
                      onChange={(e) => setModuleId(e.target.value)}
                      name="id"
                      id="id"
                      class=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Module ID"
                    />
                  </div>
                  <div class="sm:col-span-4 ">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium  text-white"
                    >
                      Module Description
                    </label>
                    <textarea
                      id="description"
                      value={module_description}
                      onChange={(e) => setModuleDescription(e.target.value)}
                      rows="5"
                      class="block p-2.5 w-full text-sm   rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Write a description of this module ..."
                    ></textarea>
                  </div>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    {/* <button
                      onClick={() => {
                        setonClick(true);
                      }}
                      type="button"
                      class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                    >
                      Image Upload
                    </button> */}
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      handleaddmodule(e);
                    }}
                    type="button"
                    class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Add this Module to Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseModal