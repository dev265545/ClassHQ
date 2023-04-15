
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function LandingPage({providers}) {
 

  return (
    <>
      <div className="relative bg-[rgba(93,95,239,1)]  text-left min-h-screen  min-w-fit overflow-clip">
        <div>
          <div className="left-0 top-0 absolute w-[1440px] h-full bg-[rgba(93,95,239,1)]" />
        </div>
        <div>
          <div className="absolute rounded-full w-[1276px] h-[1276px] left-[289px] top-[-147px]   shadow-middle bg-[rgba(103,104,241,0.25)] " />
        </div>
        <div>
          <div className="absolute rounded-full w-[828px] h-[828px] left-[501px] top-[77px] shadow-middle bg-[rgba(120,121,241,0.26)]" />
        </div>
        <div>
          <div className="absolute rounded-full w-[418px] h-[418px] left-[700px] top-[282px] shadow-middle bg-[rgba(165,166,246,0.26)]" />
        </div>
        <div>
          <div className="top-0 absolute w-[543px] h-[1024px] left-[897px] bg-[rgba(28,29,33,1)]" />
        </div>
        <div>
          <div className="h-6 absolute w-[78px] left-[977px] top-[335px]" />
        </div>

        <div className="">
          <div className="absolute top-52 gap-6 flex flex-col items-start left-[977px]">
            <div className="h-24 relative gap-6 text-white font-semibold w-[230px] font-['Poppins']">
              <p className="left-0  top-0 absolute m-0 w-[230px] text-[32px] leading-[normal]">
                Sign In to explore the powers of this tool.
              </p>
            </div>
            <div className="gap-2 p-12 py-16 text-white font-bold">
              <div>
                {Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    {/* https://devdojo.com/tailwindcss/buttons#_ */}
                    <button
                      className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    >
                      <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        Sign in with {provider.name}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`text-white font-['Poppins']`}>
          <div className="absolute top-10 flex flex-col items-start left-[120px] gap-[10px]">
            <div className="w-[79px] h-[79px] " />
            <div className="font-bold text-4xl">ClassHQ</div>

            <div className="flex flex-col items-start">
              <div className="flex flex-col items-center gap-[18px]">
                <div className="gap-[27px]">
                  <div className="flex flex-col items-start gap-[13px]">
                    <p className="text-lg font-medium m-0 leading-[normal]">
                      {/* Congratulations! */}
                    </p>
                    <p className="font-semibold m-0 w-[436px] text-[32px] leading-[normal]">
                      A powerful tool to help you build your brand, connect to a
                      lot of students and grow your business.
                    </p>
                  </div>
                </div>
                <div className="gap-2 flex flex-col items-center font-medium w-[435px]">
                  <p className="text-lg m-0 leading-[normal]">
                    Features to offer
                  </p>
                  <div className="gap-2 flex items-center">
                    <div className="gap-2.5 flex items-center p-2.5 border-8 h-[150px] w-[150px] rounded-[90px] [box-shadow:0px_0px_0px_1px_white_inset] [box-shadow-width:1px]">
                      <p className="text-lg m-0 leading-[normal]">
                        Portfolio Website
                      </p>
                    </div>
                    <div className="gap-2.5 flex items-center p-2.5 h-[150px] border-8 w-[150px]  overflow-clip rounded-[90px] [box-shadow:0px_0px_0px_1px_white_inset] [box-shadow-width:1px]">
                      <p className="text-lg m-0 leading-[normal]">Courses</p>
                    </div>
                    <div className="gap-2.5 flex  border-8  items-center justify-center p-2.5 h-[150px] w-[150px]  rounded-[90px] [box-shadow:0px_0px_0px_1px_white_inset] [box-shadow-width:1px]">
                      <p className=" flex items-center text-lg m-0 leading-[normal]">
                        Live Streaming
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
