"use client"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function ProfileCard() {
  // Mock XP data - replace with your actual data source
  const currentXP = 2850;
  const nextLevelXP = 3500;
  const currentLevel = 42;
  const xpProgress = Math.round((currentXP / nextLevelXP) * 100);

  return (
    <div className="bg-card shadow-lg rounded-xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img
            src="/avatar.svg"
            alt="Profile Picture"
            className="w-30 h-30 m-0 sm:w-20 sm:h-20 sm:me-2 lg:w-24 lg:h-24 lg:me-4 rounded-full"
          />
        </div>
        <div className="w-full text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground truncate">
            John Smith
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Level: {currentLevel}
          </p>
        </div>
           
        {/* for web */}
        <div className="hidden sm:flex flex-shrink-0 mx-auto sm:mx-0">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <CircularProgressbar
                value={xpProgress}
                text={`${xpProgress}%`}
                styles={buildStyles({
                  textSize: '20px',
                  pathColor: 'var(--primary)',
                  textColor: 'var(--foreground)',
                  trailColor: 'var(--muted)',
                  backgroundColor: 'var(--background)',
                })}
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-muted-foreground">
                {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Bio: Avid gamer and developer, always looking for the next challenge!
        </p>
      </div>

      {/* for mobile */}
      <div className="mt-4 sm:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">XP Progress</span>
          <span className="text-sm text-muted-foreground">
            {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-xs text-muted-foreground">
            {xpProgress}% to next level
          </span>
        </div>
      </div>
    </div>
  );
}