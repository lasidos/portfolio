import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useLanguage } from '../i18n';
import './CapabilityRadar.css';

/** radarAxes 라벨과 순서 일치하는 역량 점수 (0~100) */
const VALUES = [95, 92, 88, 88, 84, 78, 82];

export function CapabilityRadar() {
  const { t } = useLanguage();
  const { radarTitle, radarHint, radarAxes } = t.career.dashboard;

  const data = radarAxes.map((axis, i) => ({ axis, value: VALUES[i] ?? 80 }));

  return (
    <div className="capability-radar">
      <h3 className="capability-radar-title">{radarTitle}</h3>
      <div className="capability-radar-chart">
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={data} outerRadius="70%" margin={{ top: 16, right: 40, bottom: 16, left: 40 }}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: 'var(--color-text)', fontSize: 12, fontFamily: 'var(--font-heading)' }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="value"
              dataKey="value"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="var(--color-accent)"
              fillOpacity={0.32}
              isAnimationActive
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                boxShadow: 'var(--color-shadow-card-hover)',
              }}
              labelStyle={{ color: 'var(--color-accent)', fontWeight: 600 }}
              formatter={(value) => [`${value} / 100`, '']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="capability-radar-hint">{radarHint}</p>
    </div>
  );
}
