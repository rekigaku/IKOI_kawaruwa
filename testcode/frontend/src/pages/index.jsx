// import Link from 'next/link';

// export default function Home({ posts }) {
//   return (
//     <main>
//       <div className="hero min-h-screen bg-base-200">
//       <div className="hero-content text-center">
//       <div className="max-w-md">
//       <h1 className="text-5xl font-bold bottom-20">KAWARU_WA</h1>
//       <p className="py-10 text-2xl">小さな行動変容が<br/>組織や社会を変えていく</p>
      
//       <Link href="/login" passHref>
//       <button className="btn btn-active btn-primary text-lg">Get Started</button>
//       </Link>
      
//     </div>
//   </div>
// </div>
//     </main>
//   );
// }

import Link from 'next/link';
import React from 'react';

const Home = ({ posts }) => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-300">
      <div className="hero bg-white shadow-lg rounded-lg p-10">
        <div className="hero-content text-center">
          <div className="max-w-md">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-200 mb-6">KAWARU_WA</h1>
            <p className="mb-5 text-xl font-light text-purple-800">
              ひとりの小さな行動変容が<br/>組織や社会を変えていく
            </p>
            <Link href="/login" passHref>
              <button className="btn text-lg" style={{ backgroundColor: "#8d659b", color: "white" }}>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

