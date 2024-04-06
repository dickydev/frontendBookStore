import React from "react";
import Header from "../components/Header";
import Footer from "../pages/components/Footer";

function Page() {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 mb-20">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <div className="text-center flex flex-col items-center">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="rounded-full w-32 h-32 object-cover"
              />
              <h3 className="text-2xl font-semibold">Work As</h3>
              <p className="text-lg text-gray-600 mb-4">FullStack Developer</p>
              <p className="text-gray-600 mb-4">
                6 years of experience as a developer
              </p>
              <p className="text-gray-600 mb-4">
                Proficient in programming languages:
                <span className="font-semibold">
                  {" "}
                  JavaScript, PHP, Python, C, C#
                </span>
              </p>
              <p className="text-gray-600 mb-4">
                Frameworks mastered:
                <span className="font-semibold">
                  {" "}
                  React JS, Node JS, Express JS, Nest JS, React Native, Next JS,
                  etc.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Page;