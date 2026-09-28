export const chartTimes = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']

export const demoSeries = {
  routine: {
    actual: [5.1, 5.5, 5.3, 6.1, 6.4, 6.0, 5.8],
    forecast: [5.0, 5.4, 5.5, 5.8, 6.2, 6.1, 5.9],
    event: null,
  },
  meal: {
    actual: [5.2, 5.5, 5.4, 8.9, 7.1, 6.4, 6.0],
    forecast: [5.1, 5.3, 5.5, 7.8, 7.6, 6.8, 6.4],
    event: 3,
  },
  activity: {
    actual: [6.4, 6.2, 6.3, 6.0, 5.2, 4.9, 5.4],
    forecast: [6.3, 6.2, 6.2, 5.9, 5.6, 5.4, 5.5],
    event: 4,
  },
  low: {
    actual: [5.8, 5.4, 5.1, 4.8, 3.7, 4.2, 4.9],
    forecast: [5.7, 5.4, 5.2, 4.8, 4.4, 4.6, 4.9],
    event: 4,
  },
} as const

export type DemoSeriesKey = keyof typeof demoSeries
