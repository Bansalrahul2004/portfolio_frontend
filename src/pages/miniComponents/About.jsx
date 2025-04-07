import React, { useEffect, useState } from "react";
import api from '../../api/axios';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data } = await api.get("/user/portfolio/me");
        setAboutData(data.user);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col overflow-x-hidden">
        <div className="relative">
          <div className="h-16 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-48 mx-auto"></div>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div className="text-center">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-64 mx-auto"></div>
        </div>
        <div>
          <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
            <div className="flex justify-center items-center">
              <div className="bg-slate-200 dark:bg-slate-800 animate-pulse h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] w-[240px] sm:w-[340px] md:w-[350px] lg:w-[450px]"></div>
            </div>
            <div className="flex justify-center flex-col gap-5">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-full"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-full"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
          <div className="h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={aboutData?.avatar?.url || "/me.jpg"}
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              {aboutData?.about || "My name is Rahul Bansal, and I am a Full-Stack Web Developer eager to explore the world of DevOps. I will graduate with a B.Tech in Electrical Engineering from NIT Bhopal in 2026. Passionate about building scalable and efficient web applications, I constantly strive to learn new technologies and improve my skills."}
            </p>
            <p>
              {aboutData?.interests || "I have interests not only in technology but also in playing Sudoku and badminton. I enjoy solving complex problems, both in coding and strategy games, and I excel in meeting deadlines for my work."}
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          {aboutData?.commitment || "I am committed to delivering work on time and always ready to tackle challenges with patience and determination"}
        </p>
      </div>
    </div>
  );
};

export default About;
