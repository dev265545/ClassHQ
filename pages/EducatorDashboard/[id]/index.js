import React, { useEffect, useState } from "react";
import Course from "../../../components/Course";
import WebsiteManagement from "../../../components/WebsiteManagement";
import Sidebar from "../../../components/Navbar"
import ManageLive from "../../../components/ManageLive";
import GooglePlayButton from "@google-pay/button-react"
import Dashboard from "../../../public/dashboard.gif";
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

import { useSession } from "next-auth/react";
import { db } from "../../../firebase";
import Image from "next/image";

function EducatorDashboard() {
  const { data: session } = useSession();

  const [user, setUser] = useState([]);
  useEffect(() => {
    if (session?.user?.uid) {
      getDoc(doc(db, "users",session?.user?.uid)).then((doc) => {
        setUser(doc.data());
      });
    }
  }, [session]);
  console.log(user);
  return (
    <div className="flex  bg-purple-100 h-screen   flex-row gap-60">
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
          <h1 className="text-3xl font-sans text-black font-bold">
            Welcome {session?.user?.name}
          </h1>

          <p className="text-black font-normal inline-flex gap-0 ">
            This is your dashboard which has all the tools at your fingertips
            ....
          </p>
          <div className=" text-black font-bold inline-block ">
            From Managing your website to Conducting Live Streams and Adding
            Courses
          </div>
          <hr class="h-[2px] my-8 bg-black text-black"></hr>
        </div>

        <div className="flex flex-row gap-5 ">
          <WebsiteManagement user={user} />
          <Course user = {user} />
          
          <ManageLive user={user} />
        </div>

        {/* <GooglePlayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: [
                    "AMEX",
                    "DISCOVER",
                    "INTERAC",
                    "JCB",
                    "MASTERCARD",
                    "VISA",
                  ],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: "1.00",
              currencyCode: "INR",
              countryCode: "IN",
            },
            emailRequired: true,
            shippingAddressRequired: true,
            callbackIntents: ["PAYMENT_AUTHORIZATION"],
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("Success", paymentRequest);
          }}
          onPaymentAuthorized={(paymentData) => {
            console.log("Payment Authorised Success", paymentData);
            return { transactionState: "SUCCESS" };
          }}
          existingPaymentMethodRequired="false"
          buttonColor="black"
          buttonType="buy"
        ></GooglePlayButton> */}
      </div>
    </div>
  );
}

export default EducatorDashboard;
