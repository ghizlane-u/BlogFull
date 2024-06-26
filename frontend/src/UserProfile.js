// UserProfile.js
import React, {  useState } from 'react';


function UserStats() {  
  return (
    <div className="flex justify-center py-4 lg:pt-4 pt-8">
      <div className="mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
        <span className="text-sm text-blueGray-400">Friends</span>
      </div>
      <div className="mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
        <span className="text-sm text-blueGray-400">Photos</span>
      </div>
      <div className="lg:mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
        <span className="text-sm text-blueGray-400">Comments</span>
      </div>
    </div>
  );
}

function UserInfo() { 


return (
    <div className="text-center mt-6"> 
    

      <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Jenna Stones</h3>
      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
        Los Angeles, California
      </div>
      <div className="mb-2 text-blueGray-600 mt-6">
        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
        Solution Manager - Creative Tim Officer
      </div>
      <div className="mb-2 text-blueGray-600">
        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
        University of Computer Science
      </div>
    </div>
  );
}

export { UserStats, UserInfo };
