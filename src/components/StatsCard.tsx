interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="stat-card">
      <div className="flex-1">
        <p className="text-sm text-white/80 mb-2">{title}</p>
        <p className="text-4xl font-bold">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        <div className={`icon-${icon} text-2xl text-white`}></div>
      </div>
    </div>
  );
}
