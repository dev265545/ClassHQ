import React from 'react'
import Sidebar from '../../../components/Navbar'

function Course() {
  return (
    <div className="flex  flex-row gap-60">
      <Sidebar />
      <div className="p-10 gap-5 flex flex-row">
       Courses
      </div>
    </div>
  );
}

export default Course