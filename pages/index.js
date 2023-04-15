import { getProviders, getSession, signOut, useSession } from "next-auth/react";
import {
  collection,
  onSnapshot,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Login from "./Login";
import { db } from "../firebase";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";

// const DynamicComponentWithNoSSR = dynamic(
//   () => import("./LiveStreaming"),
//   { ssr: false }
// );



export default function Home({  providers }) {
  const { data: session } = useSession();

  const [userset, setUserSet] = useState([]);
  useEffect(
    () =>
      onSnapshot(query(collection(db, "users")), (snapshot) => {
        setUserSet(snapshot.docs);
      }),
    [db]
  );

  if (!session) return <LandingPage providers={providers} />;

  getDoc(doc(db, "users", session.user.uid)).then((docSnap) => {
    if (docSnap.exists()) {
      console.log("user exsits");
    } else {
      console.log("No such document!");
      {
        setDoc(doc(db, "users", session.user.uid), {
          id: session.user.uid,
          tag: session.user.tag,
          username: session.user.name,
          userImg: session.user.image,
          email: session.user.email,
          coverphoto: "https://i.im.ge/2022/07/26/FLevID.jpg",
          bio: "",
          timestamp: serverTimestamp(),
        });
        console.log("success");
      }
    }
  });

  return (
    <div className="bg-blue-600">
      <Navbar />
{/* <DynamicComponentWithNoSSR /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
