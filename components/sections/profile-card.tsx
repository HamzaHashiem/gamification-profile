"use client";

import { useRef, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { gsap } from "gsap";

interface ProfileData {
  id: number;
  name: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  bio: string;
  avatar: string;
}

export function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const xpProgress = profileData ? Math.round((profileData.currentXP / profileData.nextLevelXP) * 100) : 0;  useEffect(() => {
    if (cardRef.current && profileData) {
      gsap.set(cardRef.current, { opacity: 0, y: 30 });

      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.to(
        { value: 0 },
        {
          value: xpProgress,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
          onUpdate: function () {
            setAnimatedProgress(Math.round(this.targets()[0].value));
          },
        }
      );
    }
  }, [xpProgress, profileData]);

  if (loading) {
    return (
      <div className="bg-card shadow-lg rounded-xl p-4 sm:p-6 mb-6 animate-pulse">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-20 h-20 bg-muted rounded-full"></div>
          <div className="flex-1">
            <div className="h-6 bg-muted rounded w-32 mb-2"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
          <div className="w-20 h-20 bg-muted rounded-full"></div>
        </div>
        <div className="mt-4 h-16 bg-muted rounded"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="bg-card shadow-lg rounded-xl p-4 sm:p-6 mb-6">
        <div className="text-center text-muted-foreground">
          Failed to load profile data
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="bg-card shadow-lg rounded-xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={profileData.avatar}
            alt="Profile Picture"
            className="w-30 h-30 m-0 sm:w-20 sm:h-20 sm:me-2 lg:w-24 lg:h-24 lg:me-4 rounded-full"
          />
        </div>
        <div className="w-full text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground truncate">
            {profileData.name}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Level: {profileData.level}
          </p>
        </div>

        {/* for web */}
        <div className="hidden sm:flex flex-shrink-0 mx-auto sm:mx-0">
          <div className="flex flex-col items-center">
            {" "}
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <CircularProgressbar
                value={animatedProgress}
                text={`${animatedProgress}%`}
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: "var(--primary)",
                  textColor: "var(--foreground)",
                  trailColor: "var(--muted)",
                  backgroundColor: "var(--background)",
                })}
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-muted-foreground">
                {profileData.currentXP.toLocaleString()} / {profileData.nextLevelXP.toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Bio: {profileData.bio}
        </p>
      </div>

      {/* for mobile */}
      <div className="mt-4 sm:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">XP Progress</span>
          <span className="text-sm text-muted-foreground">
            {profileData.currentXP.toLocaleString()} / {profileData.nextLevelXP.toLocaleString()}
          </span>
        </div>{" "}
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-xs text-muted-foreground">
            {animatedProgress}% to next level
          </span>
        </div>
      </div>
    </div>
  );
}
