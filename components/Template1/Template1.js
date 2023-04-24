/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */


import React, { useEffect, useState } from 'react'
import home from "./image/home.jpg"
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Courses from './Courses';
import { CgProfile } from 'react-icons/cg';
function Template1({id}) {
  const router = useRouter();
   const {data : session} = useSession();
  const [studentSet, setStudentSet] = useState([]);
  const [user, setUser] = useState([]);
  const [rating, setrating] = useState(0);
  const [rateme, setRateme] = useState(false);
  const [heading, setHeading] = useState("");
  const [review, setReview] = useState("");

  const [studentSignedIn, setStudentSignedIn] = useState(false);
  const [courses, setCourses] = useState(false);
  const [livestream, setLivestream] = useState(false);
  const [livestreamopted, setLivestreamopted] = useState(false);
  const [coursedata, setCoursedata] = useState([]);
  useEffect(() => {
    if (router?.query?.id) {

      onSnapshot(
        query(collection(db, "users", router?.query?.id, "courses")),
        (snapshot) => {
          setCoursedata(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );
    }
  }, [router?.query?.id]);
   
  const handleconfirm=()=>{
    const data = {
      heading: heading,
      review: review,
      rating: rating,
      name :  session?.user?.name,
      email : session?.user?.email,
      image : session?.user?.image,

    }
    let x = user?.reviews
    x.push(data)

    setDoc(doc(db, "users", router?.query?.id,),{
     
      reviews : x
    },{merge:true})
    setRateme(false)
  }
useEffect(() => {
  if (router?.query?.id) {
    getDoc(
      doc(db, "users", router?.query?.id)
    ).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("user exsits", docSnap.data());
        setUser(docSnap.data());
      }
    });
  }
}, [router?.query?.id, session?.user?.uid]);

 useEffect(()=>{
   if (!session || id === undefined) {
     console.log("not signed in");

   } else {
     getDoc(doc(db, "users", id,"students",session?.user?.uid)).then((docSnap) => {
       if (docSnap.exists()) {
         console.log("user exsits");
         setStudentSignedIn(true);
         setStudentSet(docSnap.data());
         setLivestreamopted(studentSet?.livestream);

         //  router.push(`/EducatorDashboard/${session?.user?.uid}`);
       } else {
         console.log("No such document!");
         {
           setDoc(
             doc(
               db,
               "users",
               router?.query?.id,
               "students",
               session?.user?.uid
             ),
             {
               id: session.user.uid,
               // tag: session.user.tag,
               username: session.user.name,
               userImg: session.user.image,
               email: session.user.email,
               courses: [],
               livestream: false,

               timestamp: serverTimestamp(),
             }
           );
           console.log("success");
         setStudentSignedIn(true);
         setStudentSet(docSnap.data());
         setLivestreamopted(studentSet?.livestream);
         }
       }
     });
   }
 },[id, router?.query?.id, session, studentSet?.livestream])
 
  console.log("x",studentSet)

 const handlelivestream = () => {
    const f = doc(db, "users", id,"students",session?.user?.uid);
    setDoc(f, { livestream : true }, {merge: true });
    setLivestreamopted(true);
 }



  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/*   owl fontawesome   */}
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      {/*   owl fontawesome   */}
      <title>portfolio</title>
      {/*   css file   */}
      <link rel="stylesheet" href="css/style.css" />
      {/*   css file   */}
      {/*   owl carousel   */}
      <link rel="stylesheet" href="css/owl.carousel.css" />
      <link rel="stylesheet" href="css/owl.theme.default.min.css" />
      {/*   owl carousel   */}
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <a href="#" className="nav-logo">
              {user?.website_data?.name}'s Site
            </a>
            <ul className="nav-menu">
              <li className="nav-item">
                <div
                  onClick={() => {
                    setCourses(false);
                  }}
                  className="nav-link active"
                >
                  Home
                </div>
              </li>
              <li className="nav-item">
                {studentSignedIn && user?.subscription !== 1 && (
                  <div
                    onClick={() => {
                      setCourses(true);
                    }}
                    className="nav-link active"
                  >
                    Courses
                  </div>
                )}
                {!studentSignedIn ||
                  (user?.subscription === 1 && (
                    <div disabled className="nav-link active">
                      Courses
                    </div>
                  ))}
              </li>
              <li className="nav-item">
                {studentSignedIn && user?.subscription === 3 && (
                  <div
                    onClick={() => {
                      setLivestream(true);
                    }}
                    className="nav-link active"
                  >
                    Live Streams
                  </div>
                )}
                {!studentSignedIn || user?.subscription !==3 && (
                  <div disabled className="nav-link active">
                    Live Streams
                  </div>
                )}
              </li>
            </ul>
            <div className="hamburger">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </div>
          </nav>
        </div>
      </header>
      {/*   Creator 
Naem Azam 
github: https://github.com/naemazam 
   */}
      {!courses && (
        <>
          <section className="home">
            <div className="container flex">
              <div className="left">
                <div className="heading">
                  <div className="heading_top flex">
                    <div className="line" />
                    <div className="line line2" />
                    <i className="fas fa-circle" />
                    <h3>{user?.website_data?.level} </h3>
                  </div>
                  <div className="heading_bottom">
                    <h1>{user?.website_data?.name}</h1>
                  </div>
                </div>
                <p> {user?.website_data?.description} </p>
                <div className="button p-2 gap-3">
                  {!studentSignedIn && (
                    <button
                      onClick={() => {
                        openModal();
                      }}
                      className=" bg-black "
                    >
                      Sign In
                    </button>
                  )}
                  {studentSignedIn && (
                    <button
                      onClick={() => {
                        openModal();
                      }}
                      className=" bg-black "
                    >
                      Hi {studentSet?.username}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setRateme(true);
                    }}
                    className="btn2"
                  >
                    Rate Me
                  </button>
                </div>
              </div>
              <div className="right">
                <div className="dots">
                  <i className="fas fa-circle" />
                  <i className="fas fa-circle" />
                  <i className="fas fa-circle" />
                </div>
                <img src={user?.website_data?.image} alt="" />
              </div>
            </div>
          </section>
          <section className="about mtop background2">
            <div className="container flex">
              <div className="left">
                <div className="dots">
                  <i className="fas fa-circle" />
                  <i className="fas fa-circle" />
                  <i className="fas fa-circle" />
                </div>
                <div className="content mtop">
                  <div className="items flex mtop">
                    <div className="box">
                      <div className="number">
                        <h5>{user?.website_data?.numberofstudents}+</h5>
                      </div>
                      <div className="text">
                        <h3>Happy Students</h3>
                      </div>
                    </div>
                    <div className="box">
                      <div className="number">
                        <h5>{user?.website_data?.numberofcourses}+</h5>
                      </div>
                      <div className="text">
                        <h3>Courses taught till now</h3>
                      </div>
                    </div>
                  </div>
                  <div className="items flex mtop">
                    <div className="box">
                      <div className="number">
                        <h5>{user?.website_data?.numberofexpertise}+</h5>
                      </div>
                      <div className="text">
                        <h3>Number of Expertise</h3>
                      </div>
                    </div>
                    <div className="box">
                      <div className="number">
                        <h5>{user?.website_data?.yoe}+</h5>
                      </div>
                      <div className="text">
                        <h3>Years of Expreience</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="heading">
                  <div className="heading_top flex">
                    <div className="line" />
                    <div className="line line2" />
                    <i className="fas fa-circle" />
                    <h3> About Me </h3>
                  </div>
                  <div className="heading_bottom">
                    <h2>
                      <span>
                        "The future belong to those who believe in the beauty of
                        their dreams"
                      </span>
                    </h2>
                  </div>
                  <h4>{user?.website_data?.details}</h4>
                </div>
              </div>
            </div>
          </section>

          <section className="skills mtop background2">
            <div className="container flex">
              <div className="left">
                <div className="heading">
                  <div className="heading_top flex">
                    <div className="line" />
                    <div className="line line2" />
                    <i className="fas fa-circle" />
                    <h3> Expertise</h3>
                  </div>
                  <div className="heading_bottom">
                    <h2>
                      <span>My Skills &amp; Tools </span>
                    </h2>
                  </div>
                </div>
                <div className="text">
                  <h3>Every Day is a New Challenge</h3>
                  <p>{user?.website_data?.expertise_Details} </p>
                  <button className="btn2 btn3">Review Me</button>
                </div>
              </div>
              <div className="right">
                {/* line skill bars*/}
                <div className="line_content"></div>
                {/* line skill bars*/}
              </div>
            </div>
          </section>
          <section className="portfolio mtop">
            <div className="container">
              <div className="content flex1">
                <div className="heading">
                  <div className="heading_top flex">
                    <div className="line" />
                    <div className="line line2" />
                    <i className="fas fa-circle" />
                    <h3> Portfolio</h3>
                  </div>
                  <div className="heading_bottom">
                    <h2>
                      <span> Courses You Can Take </span>
                    </h2>
                  </div>
                </div>
              </div>
              {/* Filter portfolio */}
              <div className="">
              {coursedata?.map((course, index) => (
            <article
              key={index}
              class="p-6  rounded-lg border shadow-md bg-gray-800 border-gray-700"
            >
              <div class="flex gap-3 items-center mb-5 text-gray-500">
                {course?.course_topic?.split(",").map((topic, index) => (
                  <span
                    key={index}
                    class="text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded bg-primary-200 text-primary-800"
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
                <span class=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded bg-primary-200 text-primary-800">
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
              <h2 class="mb-2 text-2xl font-bold tracking-tight  text-white">
                <a href="#">{course?.coursename}</a>
              </h2>
              <p class="mb-5 font-light  text-gray-400">
                {course?.course_description}
                {course?.course_d_details}
              </p>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <button
                    type="button"
                    class="py-2.5 px-5 text-xl font-bold  focus:outline-none rounded-lg border   focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-primary-500 hover:bg-gray-700"
                  >
                    Price : {course?.course_price}
                  </button>
                </div>
                <a
               
                  href="#"
                  class="inline-flex items-center font-medium  text-primary-500 hover:underline"
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
              
             
            </article>
            
          ))}
          </div>
          </div>
          </section>

          <section className="Testimonials mtop">
            <div className="container flex">
              <div className="left">
                <div className="heading">
                  <div className="heading_top flex">
                    <div className="line" />
                    <div className="line line2" />
                    <i className="fas fa-circle" />
                    <h3>Testimonials</h3>
                  </div>
                  <div className="heading_bottom">
                    <h2>
                      <span>Happy Students </span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className=" gap-4">
                  {user?.reviews?.map((review, index) => (
                    <div key={index} className="item mtop">
                      <div className="image flex1">
                        <CgProfile className="item_img" />
                        <i className="fas fa-quote-right" />
                      </div>
                      <div className="text">
                        <p>{review?.heading}</p>
                        <p>{review?.review}</p>
                        <h4>Rating : {review?.rating} / 5</h4>
                        <h4>{review?.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="social_media background2 ">
            <div className="container">
              <div className="social_icon ">
                <div className="heading center">
                  <h2>Looking to Design Similar Project ? </h2>
                  <p>
                    Contact me on any platform and i will happy to help you out
                    ?{" "}
                  </p>
                </div>
                <div className="content grid">
                  <div className="box">
                    <i className="fas fa-phone-alt" />
                    <div className="text">
                      <p>Call Me At:</p>
                      <span>{user?.website_data?.phone}</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fas fa-envelope-open-text" />
                    <div className="text">
                      <p>Email At:</p>
                      <span>{user?.website_data?.email}</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fab fa-weixin" />
                    <div className="text">
                      <p>Youtube</p>
                      <a href={user?.website_data?.youtube}>
                        {user?.website_data?.youtube}
                      </a>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fab fa-twitter" />
                    <div className="text">
                      <p>Twitter:</p>
                      <span>@DevGupta26</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fab fa-linkedin-in" />
                    <div className="text">
                      <p>Linkedin:</p>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {courses && <Courses />}

      <footer>
        {isOpen && (
          <div>
            <div
              id="popup-modal"
              tabindex="-1"
              class="fixed top-0 left-0 right-0 z-50  flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
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
                  <div class="p-6 text-center">
                    {!studentSignedIn && (
                      <button
                        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                        onClick={() =>
                          signIn("google", {
                            callbackUrl: `/EducatorDashboard/${router.query.id}/Show`,
                          })
                        }
                      >
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                          Sign in with Google
                        </span>
                      </button>
                    )}
                    {studentSignedIn && (
                      <button
                        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                        onClick={() =>
                          signOut({
                            callbackUrl: `/EducatorDashboard/${router.query.id}/Show`,
                          })
                        }
                      >
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                          Sign Out
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {livestream && (
          <div>
            <div
              id="popup-modal"
              tabindex="-1"
              class="fixed top-0 left-0 right-0 z-50  flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    onClick={() => {
                      setLivestream(false);
                    }}
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
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
                  <div class="p-6 text-center">
                    <div className="text-black">
                      Click the button to buy the Subscription to get notified
                      whenever the educator makes a private livestream...
                    </div>
                    {!livestreamopted && (
                      <button
                        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                        onClick={() => handlelivestream()}
                      >
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                          Buy the Live Streaming Subscription
                        </span>
                      </button>
                    )}
                    {livestreamopted && (
                      <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white group-hover:bg-black">
                          Thanks for buying the Subscription
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {rateme && (
          <div
            id="successModal"
            tabindex="-1"
            aria-hidden="true"
            class=" overflow-y-auto overflow-x-hidden absolute right-1/3 z-100 justify-center items-center "
          >
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
              <div class="relative p-4 text-center  rounded-lg shadow bg-gray-800 sm:p-5">
                <button
                  onClick={() => {
                    setRateme(false);
                  }}
                  type="button"
                  class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Success</span>
                </div>
                <div className="p-3">
                  <div className="text-3xl p-1 font-semibold"> Reviews</div>
                  <div>
                    <form>
                      <div class="w-full mb-4 border rounded-lg  bg-gray-700 border-gray-600">
                        <div class="px-4 py-2 rounded-t-lg bg-gray-800">
                          <label for="comment" class="sr-only">
                            Your Review
                          </label>
                          <input
                            id="comment"
                            onChange={(e) => setHeading(e.target.value)}
                            rows="4"
                            class="w-full px-0 p-4 text-sm  bg-gray-800 focus:ring-0 text-white placeholder-gray-400"
                            placeholder="Heading ..."
                            value={heading}
                          ></input>
                          <textarea
                            id="comment"
                            onChange={(e) => setReview(e.target.value)}
                            rows="4"
                            class="w-full px-0 text-sm  border-0 bg-gray-800 focus:ring-0 text-white  placeholder-gray-400"
                            placeholder="Write a Review..."
                            required
                            value={review}
                          ></textarea>
                        </div>
                        <div class="px-4 py-2 pt-4 border-black  shadow-2xl  bg-gray-800 ">
                          <div className=" text-white font-semibold pt-2 pb-3 ">
                            Your Rating Out of 5
                          </div>
                          <label for="comment" class="sr-only">
                            Your Rating Out of 5
                          </label>
                          <input
                            onChange={(e) => setrating(e.target.value)}
                            id="comment"
                            rows="4"
                            type="number"
                            max={5}
                            min={0}
                            class="w-30 p-3 rounded-full px-0 text-sm  border-0 bg-gray-800 focus:ring-0  text-white placeholder-gray-400"
                            placeholder="Your Rating Out of 5....."
                            required
                          ></input>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                          {/* <button
                            onClick={() => handleconfirm()}
                            type="submit"
                            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                          >
                            Submit Review
                          </button> */}
                          <div class="flex pl-0 space-x-1 sm:pl-2"></div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleconfirm();
                  }}
                  data-modal-toggle="successModal"
                  type="button"
                  class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* navbar  */}
      {/* navbar  */}
      {/* portfolio filter JS */}
      {/* portfolio filter JS */}
      {/*  Testimonials JS */}

      {/*  Testimonials JS */}
    </>
  );
}

export default Template1