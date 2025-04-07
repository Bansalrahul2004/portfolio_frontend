import { Card } from "@/components/ui/card";
import api from '../../api/axios';
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await api.get("/softwareapplication/getall");
        setApps(data.softwareApplications);
      } catch (error) {
        console.error("Error fetching apps data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyApps();
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
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        MY APPS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps &&
          apps.map((element) => {
            return (
              <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                <img
                  src={element.svg && element.svg.url}
                  alt="skill"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element.name}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;
