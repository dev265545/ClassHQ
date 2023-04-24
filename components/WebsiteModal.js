import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function WebsiteModal({isOpen, closeModal, openModal,user}) {
    console.log(user.website_template)
    const router = useRouter();
    const { data: session } = useSession();
    const [name, setName] = useState(user?.website_data?.name);
    const [level, setLevel] = useState(user?.website_data?.level);
    const [email, setEmail] = useState( user?.website_data?.email);
    const [phone, setPhone] = useState( user?.website_data?.phone);
    const [image, setImage] = useState( user?.website_data?.image);
    const [description, setDescription] = useState( user?.website_data?.description);
    const [linkedin, setLinkedin] = useState( user?.website_data?.linkedin);
    const [twitter, setTwitter] = useState( user?.website_data?.twitter);
    const [youtube, setYoutube] = useState( user?.website_data?.youtube);
    const [details, setDetails] = useState( user?.website_data?.details);
    const [numberofstudents, setNumberofstudents] = useState(user?.website_data?.numberofstudents);
    const [numberofcourses, setNumberofcourses] = useState(user?.website_data?.numberofcourses);
    const [numberofexpertise, setNumberofexpertise] = useState(user?.website_data?.numberofexpertise);
    const [expertise_Details, setExpertise_Details] = useState(user?.website_data?.expertise_Details);
    
  const [yoe, setYoe] = useState(user?.website_data?.yoe);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      level: level,
      email: email,
      phone: phone,
      image: image,
      description: description,
      linkedin: linkedin,
      twitter: twitter,
      youtube: youtube,
      details: details,
      numberofstudents: numberofstudents,
      numberofcourses: numberofcourses,
      numberofexpertise: numberofexpertise,
      expertise_Details: expertise_Details,
      yoe: yoe,
    };
    setDoc(
      doc(db, "users", session?.user?.uid),
      { website_data: data },
      { merge: true }
    );
    closeModal();
   
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
      {user?.website_template !== null && (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          class=" overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full h-full md:h-auto">
            <div class="relative p-4  rounded-lg shadow bg-gray-800 sm:p-5">
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                <h3 class="text-lg font-semibold text-white">
                  Edit Website Content
                </h3>
                <button
                  onClick={() => closeModal()}
                  type="button"
                  class="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-toggle="defaultModal"
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
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Input your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium  text-white"
                    >
                      Your Expertise
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Expertise Profile Job"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      Twitter Link
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Twitter Link"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      Youtube Link
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Youtube Link"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Write  description here"
                    ></textarea>
                  </div>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Image Photo Link
                    </label>
                    <input
                      type="text"
                      name="photo"
                      id="photo"
                      class="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Photo Link"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div>
                    <div>
                      <label
                        for="phone"
                        class="block mb-2 text-sm font-medium text-white"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123-45-678"
                        pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      Email ID
                    </label>
                    <input
                      type="email"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder=" Email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      LinkedIn link
                    </label>
                    <input
                      type="url"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="LinkedIn link"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Write  description here"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      No of students Taught
                    </label>
                    <input
                      type="number"
                      name="photo"
                      id="photo"
                      min={0}
                      class="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="No of students Taught"
                      value={numberofstudents}
                      onChange={(e) => setNumberofstudents(e.target.value)}
                    />
                  </div>
                  <div>
                    <div>
                      <label
                        for="phone"
                        class="block mb-2 text-sm font-medium text-white"
                      >
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="yoe"
                        class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Years of Experience"
                        min={0}
                        value={yoe}
                        onChange={(e) => setYoe(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      No of Expertises
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="No of Expertises"
                      value={numberofexpertise}
                      onChange={(e) => setNumberofexpertise(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      Number of Courses Taught till now
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Number of Courses Taught till now"
                      value={numberofcourses}
                      onChange={(e) => setNumberofcourses(e.target.value)}
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Write  description here"
                    value={expertise_Details}
                    onChange={(e) => setExpertise_Details(e.target.value)}
                  ></textarea>
                </div>

                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  <svg
                    class="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {user?.website_template === null && (
        <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between mb-4 rounded-t sm:mb-5">
              <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                <h3 class="font-semibold ">No Template Selected</h3>
                {/* <p class="font-bold">$2999</p> */}
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
            <dl>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Details
              </dt>
              <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                No template is Selected from The template Section Please Select
                a Template to Continue
              </dd>
              {/* <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Category
              </dt>
              <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                Electronics/PC
              </dd> */}
            </dl>
            <div class="flex justify-between items-center">
              {/* <div class="flex items-center space-x-3 sm:space-x-4"> */}
              {/* <button
                  type="button"
                  class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                </button> */}
              {/* <button
                  type="button"
                  class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Preview
                </button> */}
              {/* </div> */}
              <button
                onClick={() => {
                  router.push(`${user?.id}/Templates`);
                }}
                type="button"
                class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                {/* <svg
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
                </svg> */}
                Go To Templates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebsiteModal