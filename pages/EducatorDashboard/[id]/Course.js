import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Navbar'
import { BiEdit, BiPlusCircle } from 'react-icons/bi';
import { addDoc, collection, doc, getDoc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import ImageUploader from '../../../components/ImageUploader';
import CourseModal from '../../../components/CourseModal';
import Image from 'next/image';
import Dashboard from "../../../public/content-moderation.gif";
import { useSession } from 'next-auth/react';

function Course() {
  const {data : session} =useSession()
  const router = useRouter()
  const [coursemodal, setCourseModal] = useState(false)
  const [courses, setCourses] = useState([])
  const [addacourse, setAddACourse] = useState(false)
  const [coursename, setCourseName] = useState("")
  const [course_topic, setCourseTopic] = useState("")
  const [course_description, setCourseDescription] = useState("")
  const [course_d_details, setCourseDetails] = useState("")
  const [course_image, setCourseImage] = useState([])
  const [course_price, setCoursePrice] = useState()
  const [course_id, setCourseId] = useState("")
  const [onClick,setonClick] = useState(false)
  const [courseSelected, setCourseSelected] = useState({})
  const openModal = ()=>{
    setAddACourse(true)
  }
  const closeModal = ()=>{
    setAddACourse(false)}
      const opencourseModal = (course) => {
        setCourseModal(true);
        setCourseSelected(course)
      };
      const closecourseModal = () => {
        setCourseModal(false);
         setCourseSelected({});
      };

  useEffect(() => {
    if(router?.query?.id){
 onSnapshot(
   query(collection(db, "users", router?.query?.id, "courses")),
   (snapshot) => {
     setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    
   }
 );
    }
    
  },[router?.query?.id])
  console.log(courses)
  const handleaddcourse =  (e)=>{
    e.preventDefault();
    const newCityRef = doc(collection(db, "users", router?.query?.id, "courses"));
    setDoc(newCityRef, {
  course_topic: course_topic,
  course_description: course_description,
  course_d_details: course_d_details,
  course_image: course_image,
  course_price: course_price,

  coursename: coursename,

});
  }
  return (
    <div className="flex  bg-purple-200 min-h-screen flex-row gap-60">
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
          <h1 className="text-4xl font-sans text-black font-bold">
            Hey! {session?.user?.name}, Welcome to your Courses Page
          </h1>

          <p className="text-gray-600 font-semibold inline-flex gap-0 ">
            This is your Courses Page which has gives you the feature to add
            courses Here you can add update edit and delete your courses ....
          </p>
          <div className=" text-black font-normal inline-block ">
            We hope you provide the people with best of your knoweldge and Class-HQ could help you in that.
          </div>
          <hr class="h-[2px] my-8 bg-black text-black"></hr>
        </div>
        <div className="p-4  flex items-center justify-center w-[250px] h-[155px]  wavy  bg-gray-800  rounded-lg border shadow-md sm:p-8 bg-gray-800 border-gray-700">
          <div className="flex flex-col">
            <div
              onClick={() => {
                openModal();
              }}
              className=" flex justify-end"
            >
              <p className="text-white text-lg font-bold inline-block">
                Add A Course
              </p>
              <button
                className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
              >
                <BiPlusCircle className="text-5xl  text-white  rounded-full "></BiPlusCircle>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {courses.map((course, index) => (
            <div key={index} className=" gap-5 flex flex-row">
              <div className="p-4  flex items-center justify-center w-[250px] h-[155px]  wavy  bg-gray-800  rounded-lg border shadow-md sm:p-8 bg-gray-800 border-gray-700">
                <div className="flex flex-col">
                  <div className=" flex justify-end">
                    <p className="text-white text-lg font-bold inline-block">
                      {course.coursename}
                    </p>
                    <button
                      onClick={() => {
                        opencourseModal(course);
                      }}
                      className="   rounded-full font-bold uppercase text-xs p-1  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                      type="button"
                    >
                      <BiEdit className="text-3xl  text-white  rounded-full "></BiEdit>
                    </button>
                  </div>
                </div>
              </div>
              {coursemodal && (
                <CourseModal
                  course={courseSelected}
                  closecourseModal={closecourseModal}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {addacourse && (
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
                      class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Image Upload
                    </button> */}
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      handleaddcourse(e);
                    }}
                    type="submit"
                    class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Add the Course
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
        </div>
      )}
      {onClick && (
        <div
          id="small-modal"
          tabIndex="-1"
          className="  overflow-y-auto overflow-x-hidden backdrop-blur-lg flex items-center justify-center fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Upload a Document
                </h3>
                <button
                  onClick={() => {
                    setonClick(false);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course