import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Doughnut } from 'react-chartjs-2';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(ArcElement, Tooltip, Legend);

interface ActivityProgress {
  name: string;
  progress: number;
  total: number;
  color: string;
}

interface LatestReward {
  id: number;
  name: string;
  game: string;
  date: string;
  icon: string;
}

interface RewardsData {
  activityProgress: ActivityProgress[];
  latestRewards: LatestReward[];
}

export function Rewards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressCardRef = useRef<HTMLDivElement>(null);
  const rewardsCardRef = useRef<HTMLDivElement>(null);
  const rewardItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [rewardsData, setRewardsData] = useState<RewardsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewardsData = async () => {
      try {
        const response = await fetch('/api/rewards');
        if (!response.ok) throw new Error('Failed to fetch rewards data');
        const data = await response.json();
        setRewardsData(data);
      } catch (error) {
        console.error('Error fetching rewards data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewardsData();
  }, []);

  const multiRingChartData = rewardsData ? {
    datasets: rewardsData.activityProgress.map((activity, index) => {
      const totalRings = rewardsData.activityProgress.length;
      const ringIndex = index;
      const cutoutStep = 50 / totalRings; 
      const radiusStep = 60 / totalRings; 
      
      return {
        label: activity.name,
        data: [activity.progress, activity.total - activity.progress],
        backgroundColor: [activity.color, '#e5e7eb'],
        borderWidth: 0,
        cutout: `${15 + (totalRings - 1 - ringIndex) * cutoutStep}%`,
        radius: `${40 + (totalRings - 1 - ringIndex) * radiusStep}%`,
      };
    }),
  } : { datasets: [] };

  const multiRingOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (!rewardsData) return '';
            const datasetIndex = context.datasetIndex;
            const activity = rewardsData.activityProgress[datasetIndex];
            const percentage = Math.round((activity.progress / activity.total) * 100);
            return `${activity.name}: ${activity.progress}/${activity.total} (${percentage}%)`;
          },
        },
      },
    },  };
  
  useEffect(() => {
    if (!rewardsData) return;
    
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, progressCardRef.current, rewardsCardRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(rewardItemsRef.current, {
        opacity: 0,
        x: -50
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(progressCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(rewardsCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(rewardItemsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, [rewardsData]);

  if (loading) {
    return (
      <div className="space-y-6 mb-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-card rounded-xl p-6 shadow-lg animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-lg animate-pulse">
            <div className="h-6 bg-muted rounded w-32 mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!rewardsData) {
    return (
      <div className="space-y-6 mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Rewards & Progress</h2>
        <div className="text-center text-muted-foreground">
          Failed to load rewards data
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="space-y-6 mb-6">
      <h2 ref={titleRef} className="text-xl sm:text-2xl lg:text-3xl font-semibold">Rewards & Progress</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left column - Radial Charts for Progress */}
        <Card ref={progressCardRef} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Your Activity Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col justify-between pt-0">
            <div className="flex items-center justify-center">
              <div className="flex justify-center w-full m-auto h-[250px] sm:h-[300px] lg:h-[350px] max-w-lg lg:max-w-xl xl:max-w-2xl">
                <Doughnut className="p-2" data={multiRingChartData} options={multiRingOptions} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {rewardsData.activityProgress.map((activity, index) => (
                <div key={activity.name} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: activity.color }}
                    />
                    <span className="font-medium text-sm">{activity.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {activity.progress}/{activity.total}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((activity.progress / activity.total) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Right column - Latest Rewards */}
        <Card ref={rewardsCardRef} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">Latest Rewards</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">            <div className="space-y-3 sm:space-y-4">
              {rewardsData.latestRewards.map((reward, index) => (
                <div 
                  key={reward.id} 
                  ref={el => { rewardItemsRef.current[index] = el; }}
                  className="flex items-center p-3 sm:p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors duration-200"
                >
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">{reward.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base truncate">{reward.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{reward.game}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs shrink-0">
                    {new Date(reward.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}