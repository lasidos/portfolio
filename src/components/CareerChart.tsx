import { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { CareerItem } from '../i18n/types';
import './CareerChart.css';

const BASE_YEAR = 2010;
const NOW_YEAR = new Date().getFullYear();
const NOW_MONTH = new Date().getMonth();
const NOW_DECIMAL = NOW_YEAR + (NOW_MONTH + 1) / 12;

function parsePeriod(period: string): { start: number; end: number } {
  const re = /(\d{4})\.?(\d{2})?\s*~\s*(재직\s*중|현재|Present|現在|(\d{4})\.?(\d{2})?)/;
  const m = period.match(re);
  if (!m) return { start: BASE_YEAR, end: BASE_YEAR + 0.5 };
  const y1 = parseInt(m[1], 10);
  const m1 = m[2] ? parseInt(m[2], 10) : 1;
  const start = y1 + (m1 - 1) / 12;
  if (/재직\s*중|현재|Present|現在/.test(m[3])) {
    return { start, end: NOW_DECIMAL };
  }
  const y2 = m[4] ? parseInt(m[4], 10) : y1;
  const m2 = m[5] ? parseInt(m[5], 10) : 12;
  const end = y2 + m2 / 12;
  return { start, end };
}

/** 경력 항목들의 period를 합산해 총 연수(소수) 반환 */
export function getTotalCareerYears(items: CareerItem[]): number {
  let total = 0;
  for (const item of items) {
    const { start, end } = parsePeriod(item.period);
    total += Math.max(0, end - start);
  }
  return total;
}

/** 단일 경력 항목의 연수(소수) 반환 */
export function getCareerItemYears(item: CareerItem): number {
  const { start, end } = parsePeriod(item.period);
  return Math.max(0, end - start);
}

function buildChartData(items: CareerItem[]): Array<{ company: string; startOffset: number; duration: number; period: string }> {
  return [...items].map((item) => {
      const { start, end } = parsePeriod(item.period);
      const startOffset = Math.max(0, start - BASE_YEAR);
      const duration = Math.max(0.1, end - start);
      return {
        company: item.company,
        startOffset,
        duration,
        period: item.period,
      };
    });
}

const X_DOMAIN = [0, NOW_DECIMAL - BASE_YEAR + 0.5];

interface CareerChartProps {
  items: CareerItem[];
  onBarClick?: (chartDataIndex: number) => void;
  selectedChartIndex?: number | null;
}

/** duration 비중(0~1)에 따른 색상: 비중 높을수록 진한 색 */
const DURATION_COLORS = [
  'var(--color-accent-light)',  /* 비중 낮음 */
  '#a5b4fc',
  'var(--color-accent)',
  'var(--color-accent-dark)',   /* 비중 높음 */
];

function getDurationColorIndex(ratio: number): number {
  if (ratio <= 0) return 0;
  if (ratio >= 1) return DURATION_COLORS.length - 1;
  return Math.min(DURATION_COLORS.length - 1, Math.floor(ratio * DURATION_COLORS.length));
}

const MOBILE_BREAKPOINT = 640;

export function CareerChart({ items, onBarClick, selectedChartIndex = null }: CareerChartProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT);
  const data = useMemo(() => buildChartData(items), [items]);
  const maxDuration = useMemo(() => Math.max(...data.map((d) => d.duration), 0.1), [data]);
  const colorByIndex = useMemo(() => data.map((d) => getDurationColorIndex(d.duration / maxDuration)), [data, maxDuration]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const chartMargin = { top: 8, right: isMobile ? 8 : 24, left: isMobile ? 52 : 64, bottom: 8 };
  const yAxisWidth = isMobile ? 52 : 64;

  return (
    <div className="career-chart-wrap">
      <ResponsiveContainer width="100%" height={Math.max(isMobile ? 240 : 280, data.length * (isMobile ? 36 : 40))}>
        <BarChart
          data={data}
          layout="vertical"
          margin={chartMargin}
        >
          <XAxis
            type="number"
            domain={X_DOMAIN}
            tickFormatter={(v) => String(BASE_YEAR + Math.round(v))}
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="company"
            width={yAxisWidth}
            axisLine={false}
            tickLine={false}
            tick={(props) => {
              const { x, y, payload, index } = props;
              const isClickable = typeof onBarClick === 'function';
              return (
                <g
                  transform={`translate(${x},${y})`}
                  className={isClickable ? 'career-chart-y-tick career-chart-y-tick--clickable' : 'career-chart-y-tick'}
                  onClick={isClickable ? () => onBarClick(index) : undefined}
                >
                  <text
                    x={0}
                    y={0}
                    dy={4}
                    textAnchor="end"
                    fontSize={isMobile ? 9 : 10}
                    fill="var(--color-text)"
                    fontFamily="var(--font-heading)"
                  >
                    {(payload as { value?: string; company?: string } | null)?.value ?? (payload as { company?: string } | null)?.company ?? ''}
                  </text>
                </g>
              );
            }}
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
            formatter={(_value, name, props) =>
              name === 'duration' && props?.payload && 'period' in props.payload
                ? [(props.payload as { period: string }).period, '']
                : null
            }
            labelFormatter={(label) => label}
            cursor={{ fill: 'rgba(99, 102, 241, 0.06)' }}
          />
          <Bar dataKey="startOffset" stackId="a" fill="transparent" isAnimationActive={true} />
          <Bar
            dataKey="duration"
            stackId="a"
            fill="var(--color-accent)"
            radius={[0, 4, 4, 0]}
            isAnimationActive={true}
            onClick={(_data, index) => {
              if (typeof index === 'number' && typeof onBarClick === 'function') onBarClick(index);
            }}
            cursor={onBarClick ? 'pointer' : undefined}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={selectedChartIndex === i ? 'var(--color-accent-dark)' : DURATION_COLORS[colorByIndex[i]]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
