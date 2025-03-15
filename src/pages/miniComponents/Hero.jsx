import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
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
  // Use `null` to indicate “not yet loaded”
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-8skl.onrender.com/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

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
        Hey, I'm Rahul Bansal
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
      <div
        className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] 
          flex gap-5 items-center mt-4 md:mt-8 lg:mt-10"
      >
        {/* Only render a link if user.instagramURL is truthy */}
        {user.instagramURL && (
          <Link to={user.instagramURL} target="_blank">
            <Instagram className="text-pink-500 w-7 h-7" />
          </Link>
        )}
        {user.facebookURL && (
          <Link to={user.facebookURL} target="_blank">
            <Facebook className="text-blue-800 w-7 h-7" />
          </Link>
        )}
        {user.linkedInURL && (
          <Link to={user.linkedInURL} target="_blank">
            <Linkedin className="text-sky-500 w-7 h-7" />
          </Link>
        )}
        {user.twitterURL && (
          <Link to={user.twitterURL} target="_blank">
            <Twitter className="text-blue-800 w-7 h-7" />
          </Link>
        )}
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
