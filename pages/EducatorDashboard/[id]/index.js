import React from "react";
import Course from "../../../components/Course";
import WebsiteManagement from "../../../components/WebsiteManagement";
import Sidebar from "../../../components/Navbar"
import ManageLive from "../../../components/ManageLive";


function EducatorDashboard() {
  return (
    <div className="flex bg-white h-screen   flex-row gap-60">
      <Sidebar />
      <div className="p-10 gap-5 flex flex-row">
        <Course/>
        <WebsiteManagement />
        <ManageLive />
      </div>
    </div>
  );
}

export default EducatorDashboard;
