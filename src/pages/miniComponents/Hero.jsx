import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import api from '../../api/axios';
import { Button } from "@/components/ui/button";

// Feather icons
import {
  GitHub,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "react-feather";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await api.get("/user/portfolio/me");
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full h-2 w-2"></div>
          <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-4 w-16"></div>
        </div>

        <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-8 w-48 mb-4"></div>
        <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-8 w-64"></div>

        <div className="flex gap-4 mt-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full h-8 w-8"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>

      <h1
        className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
          md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
      >
        Hey, I'm {user.name || "Rahul Bansal"}
      </h1>

      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
          sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
      >
        <Typewriter
          words={["FULLSTACK DEVELOPER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      {/* Social links container */}
      <div className="flex gap-4 mt-6">
        <a href={user.socialLinks?.github} target="_blank" rel="noopener noreferrer">
          <GitHub className="h-8 w-8" />
        </a>
        <a href={user.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-8 w-8" />
        </a>
        <a href={user.socialLinks?.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-8 w-8" />
        </a>
        <a href={user.socialLinks?.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-8 w-8" />
        </a>
        <a href={user.socialLinks?.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram className="h-8 w-8" />
        </a>
      </div>

      {/* Github and Resume buttons */}
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        {user.githubURL && (
          <Link to={user.githubURL} target="_blank">
            <Button className="rounded-[30px] flex items-center gap-2 flex-row">
              <GitHub />
              <span>Github</span>
            </Button>
          </Link>
        )}
        {user.resume?.url && (
          <Link to={user.resume.url} target="_blank">
            <Button className="rounded-[30px] flex items-center gap-2 flex-row">
              <ExternalLink />
              <span>Resume</span>
            </Button>
          </Link>
        )}
      </div>

      {/* About Me */}
      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>

      <hr className="my-8 md:my-10" />
    </div>
  );
};

export default Hero;
