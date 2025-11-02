'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { locationsData, mapMarkersData } from '@/data/locations'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function LocationMap() {
  const locations = locationsData
  const markers = mapMarkersData
  const maxValue = Math.max(...locations.map(loc => parseInt(loc.value)))

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-2xl p-6 h-full flex flex-col">
      <p className="text-sm font-semibold text-black dark:text-white mb-4">Revenue by Location</p>

      {/* World Map */}
      <div className="flex-1 relative overflow-hidden rounded-lg mb-4 min-h-[140px] bg-transparent">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 110,
            center: [0, 20],
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#5A7A8F"
                  stroke="#3A4B5C"
                  strokeWidth={0.3}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={2.5} fill="#FFFFFF" stroke="none" />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Location List with Progress Bar */}
      <div className="space-y-3 text-sm">
        {locations.map((loc, idx) => {
          const value = parseInt(loc.value)
          const percentage = (value / maxValue) * 100

          return (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[#1C1C1C] dark:text-white text-xs">{loc.city}</span>
                <span className="text-[#1C1C1C] dark:text-white text-xs">{loc.value}</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-0.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A8C5DA] rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
