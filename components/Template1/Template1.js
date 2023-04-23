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
function Template1({id}) {
  const router = useRouter();
   const {data : session} = useSession();
  const [studentSet, setStudentSet] = useState([]);
  const [studentSignedIn, setStudentSignedIn] = useState(false);
  const [courses, setCourses] = useState(false);
  const [livestream, setLivestream] = useState(false);
  const [livestreamopted, setLivestreamopted] = useState(false);

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

  const data = {
    name: "Naem Azam",
    links: ["Home", "Courses"],
    job: "Web Developer",
    firstname: "Naem",
    lastname: "Azam",
    description:
      " I am a web developer. I have 2 years of experience in web development. W ith 12 years of experience and ",
    subdescription: "",
    aboutyourexpertise: "Lorem ipsum   ",
    online:
      "I am a web developer. I have 2 years of experience in web development. I have worked  on ",
    skills: [
      { skill: "Machine Learning", level: 90 },
      { skill: "Machine Learning", level: 95 },
      ,
      { skill: "Machine Learning", level: 95 },
    ],
    subjects: [
      { skill: "Python", level: 95 },
      { skill: "Python", level: 70 },
      { skill: "Python", level: 50 },
      { skill: "Python", level: 100 },
    ],
    journey: [
      {
        yearx: "2010",
        yeary: "2013",
        job: "Job 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        yearx: "2010",
        yeary: "2013",
        job: "Job 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        yearx: "2010",
        yeary: "2013",
        job: "Job 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    courses: [
      {
        topic: "e",
      },
      {
        topic: "e",
      },
    ],
    experience: {
      name: "Years of Experience",
      yoe: 12,
    },
    quote: "quote",
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
              <img src="image/logo.png" alt="" />
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
                {studentSignedIn && (
                  <div
                    onClick={() => {
                      setCourses(true);
                    }}
                    className="nav-link active"
                  >
                    Courses
                  </div>
                )}
                {!studentSignedIn && (
                  <div disabled className="nav-link active">
                    Courses
                  </div>
                )}
              </li>
              <li className="nav-item">
                {studentSignedIn && (
                  <div
                    onClick={() => {
                      setLivestream(true);
                    }}
                    className="nav-link active"
                  >
                    Live Streams
                  </div>
                )}
                {!studentSignedIn && (
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
                    <h3>{data?.job} </h3>
                  </div>
                  <div className="heading_bottom">
                    <h1>
                      <span>{data.firstname}</span>
                      {data.lastname}
                    </h1>
                  </div>
                </div>
                <p> {data?.description} </p>
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

                  <button className="btn2">Rate Me</button>
                </div>
              </div>
              <div className="right">
                <div className="dots">
                  <i className="fas fa-circle" />
                  <i className="fas fa-circle" />
                  <i className="fas fa-circle" />
                </div>
                <img src={home} alt="" />
                <div className="icon flex">
                  <i className="fab fa-twitter" />
                </div>
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
                        <h5>90+</h5>
                      </div>
                      <div className="text">
                        <h3>Happy Students</h3>
                      </div>
                    </div>
                    <div className="box">
                      <div className="number">
                        <h5>{data?.courses?.length}+</h5>
                      </div>
                      <div className="text">
                        <h3>Courses to offer</h3>
                      </div>
                    </div>
                  </div>
                  <div className="items flex mtop">
                    <div className="box">
                      <div className="number">
                        <h5>15+</h5>
                      </div>
                      <div className="text">
                        <h3>Projects Progresss</h3>
                      </div>
                    </div>
                    <div className="box">
                      <div className="number">
                        <h5>{data?.experience.yoe}+</h5>
                      </div>
                      <div className="text">
                        <h3>{data?.experience.name}</h3>
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
                      <span>{data?.quote}</span>
                    </h2>
                  </div>
                  <h4>{data?.description}</h4>
                </div>
                <p>
                  {" "}
                  Currently, I Am in charge of two projects. Published many
                  papers in internationally renowned conference journals.
                </p>
                <button className="btn2 btn3">Download CV</button>
              </div>
            </div>
          </section>
          <section className="services mtop">
            <div className="container">
              <div className="heading heading2">
                <div className="heading_top flex">
                  <div className="line" />
                  <div className="line line2" />
                  <i className="fas fa-circle" />
                  <h3> My Services</h3>
                </div>
                <div className="heading_bottom">
                  <h2>
                    <span>What Can I Do Best ?</span>
                  </h2>
                </div>
              </div>
              <div className="content grid top">
                <div className="box">
                  <div className="img">
                    <img src="https://img.icons8.com/ios/50/000000/machine-learning.png" />
                  </div>
                  <div className="text">
                    <h3>Machine learning</h3>
                    <hr />
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
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
                  <p>{data?.aboutyourexpertise} </p>
                  <button className="btn2 btn3">Review Me</button>
                </div>
              </div>
              <div className="right">
                {/* line skill bars*/}
                <div className="line_content"></div>
                {/* line skill bars*/}
                <div className="skill-container flex1">
                  {data?.subjects?.map((skill, index) => (
                    <div key={index} className="circle_box">
                      <svg className="skill-circle" height={150} width={150}>
                        <circle
                          cx={-40}
                          cy={10}
                          r={48}
                          style={{
                            strokeDasharray: 304 - (100 - skill.level) * 2,
                          }}
                          transform="translate(50,50) rotate(-90)"
                        />
                        <text
                          id="text1"
                          x={40}
                          y={100}
                          fill="#fff"
                          fontFamily="Verdana"
                          fontSize={28}
                        >
                          {skill.level}
                        </text>
                      </svg>
                      <h4>{skill.skill}</h4>
                    </div>
                  ))}
                </div>
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
              <div className="box">
                <ul className="filter-item">
                  <li
                    className="filter_container"
                    style={{ flexGrow: 1 }}
                    data-item="web"
                  >
                    <img src="image/p1.jpg" alt="Avatar" className="image" />
                    <div className="overlay">
                      <div className="text">
                        <h3>Illustrator Design</h3>
                        <p>Mockup, Design, Inspiration </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Filter portfolio */}
            </div>
          </section>
          <section className="experience background2">
            <div className="container">
              <div className="heading center">
                <div className="heading_top flex">
                  <div className="line" />
                  <div className="line line2" />
                  <i className="fas fa-circle" />
                  <h3> Employment &amp; Education</h3>
                </div>
                <div className="heading_bottom">
                  <h2>
                    <span>My Experience Journey </span>
                  </h2>
                </div>
              </div>
              <div className="content flex">
                <div className="left">
                  <img src="image/e.jpg" alt="" />
                </div>
                <div className="right">
                  {/*     timeline    */}
                  <div className="timeline">
                    <div className="line"></div>
                    {data?.journey.map((exp, index) => (
                      <div key={index} className="content content-1">
                        <section>
                          <i className="icon fas fa-briefcase" />
                          <div className="details">
                            <span>
                              {" "}
                              {exp.yearx}- {exp.yeary}
                            </span>
                            <h3>{exp.job}</h3>
                          </div>
                          <p> {exp.description}</p>
                        </section>
                      </div>
                    ))}
                  </div>
                  {/*     timeline    */}
                </div>
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

                <div class="img grid top">
                  <div class="box">
                    <img src="image/t1.png" alt="" />
                  </div>
                  <div class="box">
                    <img src="image/t2.png" alt="" />
                  </div>
                  <div class="box">
                    <img src="image/t3.png" alt="" />
                  </div>
                  <div class="box">
                    <img src="image/t4.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className=" gap-4">
                  <div className="item mtop">
                    <div className="image flex1">
                      <img src="image/c1.jpg" className="item_img" />
                      <i className="fas fa-quote-right" />
                    </div>
                    <div className="text">
                      <p>
                        Teachers have three loves: love of learning, love of
                        learners, and the love of bringing the first two loves
                        together{" "}
                      </p>
                      <h4>Naem</h4>
                    </div>
                  </div>
                  <div className="item mtop">
                    <div className="image flex1">
                      <img src="image/c2.jpg" className="item_img" />
                      <i className="fas fa-quote-right" />
                    </div>
                    <div className="text">
                      <p>I am not a teacher, but an awakener</p>
                      <h4>Robert Frost</h4>
                    </div>
                  </div>
                  <div className="item mtop">
                    <div className="image flex1">
                      <img src="image/c3.jpg" className="item_img" />
                      <i className="fas fa-quote-right" />
                    </div>
                    <div className="text">
                      <p>
                        They may forget what you said but they will not forget
                        how you made them feel{" "}
                      </p>
                      <h4>Carl Buechner</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="blog background2">
        <div className="container"> */}
          {/* <div className="heading heading2">
            <div className="heading_top flex">
              <div className="line" />
              <div className="line line2" />
              <i className="fas fa-circle" />
              <h3>Paper &amp; project </h3>
            </div>
            <div className="heading_bottom">
              <h2>
                <span>Some Research &amp; Activity </span>
              </h2>
            </div>
          </div> */}
          {/* Photo Grid */}
          {/* <div className="row">
            {/* <div className="column">
              <div className="box">
                <img src="image/b1.jpg" />
                <div className="text">
                  <p>18 Sep, 2020 - Data Engineering </p>
                  <h4>Research Paper Name </h4>
                </div>
              </div>
            </div> */}
          {/*<div className="column column2">
              <div className="box">
                <img src="image/b2.jpg" />
                <div className="text">
                  <p>18 Sep, 2020 - Artificial Intelligence</p>
                  <h4>Research Paper Name</h4>
                </div>
              </div>
              <div className="box">
                <img src="image/b4.jpg" />
                <div className="text">
                  <p>18 Sep, 2020 - FriendBurst </p>
                  <h4>Research Paper Name</h4>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <img src="image/b3.jpg" alt="" />
                <div className="text">
                  <p>18 Sep, 2020 - Machine Learning </p>
                  <h4>Research Paper Name.</h4>
                </div>
              </div>
            </div>
          </div> */}
          {/* Photo Grid */}
          {/* </div>
      </section> */}
          <section className="contact top">
            <div className="container flex">
              <div className="left">
                <img src="image/logo.png" alt="" />
                <div className="heading">
                  <div className="heading_bottom">
                    <h2>
                      <span>Associate</span>Professor
                    </h2>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="heading">
                  <div className="heading_top flex">
                    <div className="line" />
                    <div className="line line2" />
                    <i className="fas fa-circle" />
                    <h3>Any Question? </h3>
                  </div>
                  <div className="heading_bottom">
                    <h2>
                      <span>Drop Me A Line </span>
                    </h2>
                  </div>
                </div>
                <form className="mtop">
                  <div className="input grid">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Subject" />
                    <input type="text" placeholder="Phone" />
                  </div>
                  <textarea
                    name="name"
                    rows={5}
                    cols={80}
                    defaultValue={" Message"}
                  />
                  <button className="btn2 btn3">Send Message</button>
                </form>
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
                      <span>000 - 000- 0000</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fas fa-envelope-open-text" />
                    <div className="text">
                      <p>Email At:</p>
                      <span>yourename@mit.edu</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fab fa-weixin" />
                    <div className="text">
                      <p>WeChat:</p>
                      <span>@yourename</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fab fa-twitter" />
                    <div className="text">
                      <p>Twitter:</p>
                      <span>@yourename</span>
                    </div>
                  </div>
                  <div className="box">
                    <i className="fab fa-linkedin-in" />
                    <div className="text">
                      <p>Linkedin:</p>
                      <span>linkedin/yourname</span>
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
        <div className="container">
          <div className="logo">
            <img src="image/logo.png" alt="" />
          </div>
          <div className="content grid">
            <div className="box">
              <h4>Solutions</h4>
              <ul>
                <li>Control</li>
                <li>Scalability &amp; Effciency</li>
                <li>Supported by Experts</li>
                <li>Performance &amp; Security</li>
              </ul>
            </div>
            <div className="box">
              <h4>Links</h4>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Work</li>
                <li>Journey</li>
              </ul>
            </div>
            <div className="box">
              <h4>Resources</h4>
              <ul>
                <li>Case Studies</li>
                <li>Blog</li>
                <li>I'm a Clients</li>
              </ul>
            </div>
            <div className="box">
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Careers</li>
                <li>Newsroom</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="box">
              <div className="text">
                <span>000-000-000</span>
                <br />
                <label> Address</label>
                <br />
                <label>yourname@mit.edu</label>
                <br />
                <p>Cambridge,United States</p>
              </div>
              <div className="icon flex1">
                <i className="fab fa-weixin" />
                <i className="fab fa-qq" />
                <i className="fab fa-youtube" />
                <i className="fab fa-twitter" />
                <i className="fab fa-linkedin-in" />
              </div>
            </div>
          </div>
          <div className="legal flex1">
            <div className="box">
              <p>Copyright (c) 2021 Copyright Naem Azam All Rights Reserved.</p>
            </div>
            <div className="box flex">
              <p>
                <a href="https://github.com/naemazam">GitHub</a>
              </p>
            </div>
          </div>
        </div>
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
                        onClick={() =>
                          handlelivestream()
                        }
                      >
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                          Buy the Live Streaming Subscription
                        </span>
                      </button>
                    )}
                    {livestreamopted && (
                      <button
                        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                       
                      >
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