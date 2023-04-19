import React, { useEffect, useState } from "react";
import Course from "../../../components/Course";
import WebsiteManagement from "../../../components/WebsiteManagement";
import Sidebar from "../../../components/Navbar"
import ManageLive from "../../../components/ManageLive";
import GooglePlayButton from "@google-pay/button-react"
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

function EducatorDashboard() {
  const { data: session } = useSession();

  const [user, setUser] = useState([]);
  useEffect(
    () =>
      onSnapshot(query(collection(db, "users")), (snapshot) => {
        setUser(snapshot.docs[0].data());
      }),
    [db]
  );
  console.log(user);
  return (
    <div className="flex bg-white h-screen   flex-row gap-60">
      <Sidebar />
      <div className="p-10 gap-5 flex flex-row">
        <Course />
        <WebsiteManagement user={user} />
        <ManageLive user={user} />
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
