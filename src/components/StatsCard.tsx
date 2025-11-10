interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: string;
  variant?: 'gradient' | 'white';
}

export default function StatsCard({ title, value, subtitle, icon, variant = 'gradient' }: StatsCardProps) {
  if (variant === 'white') {
    return (
      <div className="stat-card-alt">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-[var(--text-secondary)] mb-1">{title}</p>
            <p className="text-4xl font-bold text-[var(--text-primary)] mb-1">{value}</p>
            {subtitle && <p className="text-xs text-[var(--text-secondary)]">{subtitle}</p>}
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
            <div className={`icon-${icon} text-lg text-[var(--text-secondary)]`}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-white/80 mb-1">{title}</p>
          <p className="text-4xl font-bold mb-1">{value}</p>
          {subtitle && <p className="text-xs text-white/70">{subtitle}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <div className={`icon-${icon} text-lg text-white`}></div>
        </div>
      </div>
    </div>
  );
}
