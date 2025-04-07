import api from '../../api/axios';
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await api.get("/timeline/getall");
        setTimeline(data.timelines);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyTimeline();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-8 w-32 mb-4"></div>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {[...Array(3)].map((_, i) => (
            <li className="mb-10 ms-6" key={i}>
              <div className="absolute flex items-center justify-center w-6 h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full -start-3 ring-8 ring-white dark:ring-gray-900"></div>
              <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-6 w-48 mb-2"></div>
              <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-4 w-32"></div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="relative">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mb-12 font-extrabold text-center tracking-[15px] dancing_text">
        MY JOURNEY
      </h1>
      <ol className="relative border-s-4 border-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
        {timeline &&
          timeline.map((element, index) => {
            return (
              <li 
                className="mb-12 ms-8 group hover:scale-105 transition-transform duration-300 ease-in-out" 
                key={element._id}
              >
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <div className="p-4 bg-white/5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                    {element.title}
                  </h3>
                  <time className="block mb-3 text-sm font-normal leading-none text-blue-500 dark:text-blue-400">
                    {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                  </time>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {element.description}
                  </p>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Timeline;
