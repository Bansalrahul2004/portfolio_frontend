import { Card } from "@/components/ui/card";
import api from '../../api/axios';
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await api.get("/skill/getall");
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMySkills();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-8 sm:gap-12">
        <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-12 w-32 mx-auto"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="h-fit p-7 flex flex-col justify-center items-center gap-3">
              <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-12 sm:h-24 w-12 sm:w-24"></div>
              <div className="bg-slate-200 dark:bg-slate-800 animate-pulse rounded h-4 w-20"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="text-center">
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mb-4">
          MY SKILLS
        </h1>
        <p className="text-muted-foreground text-lg">Technologies I've been working with</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills &&
          skills.map((element) => {
            return (
              <Card 
                className="group h-fit p-8 flex flex-col justify-center items-center gap-4 hover:scale-105 transition-all duration-300 ease-in-out bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl" 
                key={element._id}
              >
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <img
                    src={element.svg && element.svg.url}
                    alt={element.title}
                    className="h-full w-auto transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-muted-foreground text-center font-medium group-hover:text-blue-500 transition-colors duration-300">
                  {element.title}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
