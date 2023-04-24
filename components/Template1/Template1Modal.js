import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { useSession } from 'next-auth/react'

function Template1Modal({closeTemplate1Modal}) {
  const {data : session} = useSession()
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [youtube, setYoutube] = useState('')
  const [details, setDetails] = useState('')
  const [numberofstudents, setNumberofstudents] = useState(0)
  const [numberofcourses, setNumberofcourses] = useState(0)
  const [numberofexpertise, setNumberofexpertise] = useState(0)
  const [expertise_Details, setExpertise_Details] = useState('')

  const [yoe, setYoe] = useState('')
  const handleSubmit = (e)=>{
    e.preventDefault()
    const data = {
      name : name,
      level : level,
      email : email,
      phone : phone,
      image : image,
      description : description,
      linkedin : linkedin,
      twitter : twitter,
      youtube : youtube,
      details : details,
      numberofstudents : numberofstudents,
      numberofcourses : numberofcourses,
      numberofexpertise : numberofexpertise,
      expertise_Details : expertise_Details,
      yoe : yoe

    }
    setDoc(doc(db, "users", session?.user?.uid),{website_data : data} , { merge: true }
    
    )
    closeTemplate1Modal();
  }
  
  return (
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
              onClick={() => closeTemplate1Modal()}
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
            onClick={(e)=>handleSubmit(e)}
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
  );
}

export default Template1Modal