import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data - replace with your actual data source
const activityProgress = [
  { name: "Games Owned", progress: 75, total: 100, color: "#4dabf7" },
  { name: "Achievements", progress: 42, total: 50, color: "#36cfcf" },
  { name: "Badges", progress: 8, total: 10, color: "#ffd75e" },
  { name: "Time Spent", progress: 120, total: 200, color: "#ff9a5e" },
];

const latestRewards = [
  { id: 1, name: "Platinum Trophy", game: "Space Adventure", date: "2025-06-15", icon: "🏆" },
  { id: 2, name: "Collection Master", game: "Fantasy RPG", date: "2025-06-10", icon: "🎮" },
  { id: 3, name: "Early Adopter", game: "System", date: "2025-06-05", icon: "🔔" },
  { id: 4, name: "Marathon Player", game: "Racing Extreme", date: "2025-05-28", icon: "⏱️" },
  { id: 5, name: "Social Butterfly", game: "Community", date: "2025-05-20", icon: "🦋" },
];

// Create multi-ring doughnut chart data
const multiRingChartData = {
  datasets: [
    // Outer ring - Games Owned
    {
      label: 'Games Owned',
      data: [75, 25], // progress, remaining
      backgroundColor: ['#4dabf7', '#e5e7eb'],
      borderWidth: 0,
      cutout: '65%',
      radius: '100%',
    },
    // Second ring - Achievements
    {
      label: 'Achievements',
      data: [42, 8], // progress, remaining (out of 50)
      backgroundColor: ['#36cfcf', '#e5e7eb'],
      borderWidth: 0,
      cutout: '55%',
      radius: '80%',
    },
    // Third ring - Badges
    {
      label: 'Badges',
      data: [8, 2], // progress, remaining (out of 10)
      backgroundColor: ['#ffd75e', '#e5e7eb'],
      borderWidth: 0,
      cutout: '35%',
      radius: '60%',
    },
    // Inner ring - Time Spent
    {
      label: 'Time Spent',
      data: [120, 80], // progress, remaining (out of 200)
      backgroundColor: ['#ff9a5e', '#e5e7eb'],
      borderWidth: 0,
      cutout: '15%',
      radius: '40%',
    },
  ],
};

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
          const datasetIndex = context.datasetIndex;
          const activity = activityProgress[datasetIndex];
          const percentage = Math.round((activity.progress / activity.total) * 100);
          return `${activity.name}: ${activity.progress}/${activity.total} (${percentage}%)`;
        },
      },
    },
  },
};

export function Rewards() {
  return (
    <div className="space-y-6 mb-6">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Rewards & Progress</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left column - Radial Charts for Progress */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
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
              {activityProgress.map((activity, index) => (
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
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">Latest Rewards</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {latestRewards.map((reward) => (
                <div key={reward.id} className="flex items-center p-3 sm:p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors duration-200">
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