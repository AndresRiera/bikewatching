


//////////////////////////////////////////////////////////////////////////////////////////



import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';

console.log("Mapbox GL JS Loaded:", mapboxgl);

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzcmllcmEiLCJhIjoiY203amcybzVrMDNsajJ2cHc1aTQ5empxMSJ9.a3CMibeqUpEjoy76IjHJmw';

// let departuresByMinute = Array.from({ length: 1440 }, () => []);
// let arrivalsByMinute = Array.from({ length: 1440 }, () => []);


// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v12',
//     center: [-71.09415, 42.36027],
//     zoom: 12,
//     minZoom: 5,
//     maxZoom: 18
// });

// const bikeLaneStyle = {
//     'line-color': '#32D400',
//     'line-width': 4,
//     'line-opacity': 0.5
// };

// map.on('load', async () => {
//     map.addSource('boston_bike_lanes', {
//         type: 'geojson',
//         data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson'
//     });

//     map.addLayer({
//         id: 'bike-lanes',
//         type: 'line',
//         source: 'boston_bike_lanes',
//         paint: bikeLaneStyle
//     });

//     let stations, trips;

//     try {
//         const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';
//         const csvurl = 'https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv';

//         [stations, trips] = await Promise.all([
//             d3.json(jsonurl).then(data => data.data.stations),
//             d3.csv(csvurl)
//         ]);

//         console.log('Stations:', stations);
//         console.log('Trips:', trips);
//     } catch (error) {
//         console.error('Error loading data:', error);
//         return;
//     }

//     const departures = d3.rollup(
//         trips,
//         v => v.length,
//         d => d.start_station_id
//     );

//     const arrivals = d3.rollup(
//         trips,
//         v => v.length,
//         d => d.end_station_id
//     );

//     stations = stations.map(station => {
//         let id = station.short_name;
//         station.departures = departures.get(id) ?? 0;
//         station.arrivals = arrivals.get(id) ?? 0;
//         station.totalTraffic = station.departures + station.arrivals;
//         return station;
//     });

//     console.log('Updated Stations:', stations);

//     const radiusScale = d3.scaleSqrt()
//         .domain([0, d3.max(stations, d => d.totalTraffic)])
//         .range([0, 25]);

//     const svg = d3.select('#map')
//         .append('svg')
//         .attr('width', '100%')
//         .attr('height', '100%')
//         .style('position', 'absolute')
//         .style('top', 0)
//         .style('left', 0)
//         .style('pointer-events', 'none');

//     const circles = svg.selectAll('circle')
//         .data(stations)
//         .enter()
//         .append('circle')
//         .attr('r', d => radiusScale(d.totalTraffic))
//         .attr('fill', 'steelblue')
//         .attr('stroke', 'white')
//         .attr('stroke-width', 1)
//         .attr('opacity', 0.6)
//         .style('pointer-events', 'auto')
//         .each(function(d) {
//             d3.select(this)
//                 .append('title')
//                 .text(`${d.totalTraffic} trips (${d.departures} departures, ${d.arrivals} arrivals)`);
//         });

//     function getCoords(station) {
//         const point = new mapboxgl.LngLat(+station.lon, +station.lat);
//         const { x, y } = map.project(point);
//         return { cx: x, cy: y };
//     }

//     function updatePositions() {
//         circles
//             .attr('cx', d => getCoords(d).cx)
//             .attr('cy', d => getCoords(d).cy);
//     }

//     updatePositions();
//     map.on('move', updatePositions);
// });

// const timeSlider = document.getElementById('time-slider');
// const selectedTime = document.getElementById('selected-time');
// const anyTimeLabel = document.getElementById('any-time');

// // Helper function to format time from minutes to HH:MM AM/PM
// function formatTime(minutes) {
//   const date = new Date(0, 0, 0, 0, minutes);
//   return date.toLocaleString('en-US', { timeStyle: 'short' });
// }

// // Function to update the displayed time based on the slider value
// // function updateTimeDisplay() {
// //   let timeFilter = Number(timeSlider.value);

// //   if (timeFilter === -1) {
// //     selectedTime.textContent = '';  // Clear time display
// //     anyTimeLabel.style.display = 'block';  // Show "(any time)"
// //   } else {
// //     selectedTime.textContent = formatTime(timeFilter);
// //     anyTimeLabel.style.display = 'none';  // Hide "(any time)"
// //   }

// //   // This will update the scatterplot later
// //   updateScatterPlot(timeFilter);
// // }

// // Listen for slider changes and update the UI
// timeSlider.addEventListener('input', updateTimeDisplay);
// updateTimeDisplay();  // Ensure it runs once on page load

// function computeStationTraffic(stations, trips) {
//     // Compute departures
//     const departures = d3.rollup(
//         trips, 
//         (v) => v.length, 
//         (d) => d.start_station_id
//     );

//     // Compute arrivals
//     const arrivals = d3.rollup(
//         trips, 
//         (v) => v.length, 
//         (d) => d.end_station_id
//     );

//     // Update each station
//     return stations.map((station) => {
//       let id = station.short_name;
//       station.arrivals = arrivals.get(id) ?? 0;
//       station.departures = departures.get(id) ?? 0;
//       station.totalTraffic = station.arrivals + station.departures;
//       return station;
//     });
// }

// // let trips = await d3.csv(
// //     'https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv',
// //     (trip) => {
// //       trip.started_at = new Date(trip.started_at);
// //       trip.ended_at = new Date(trip.ended_at);
// //       return trip;
// //     },
// //   );

// let trips = await d3.csv(
//     'https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv',
//     (trip) => {
//       trip.started_at = new Date(trip.started_at);
//       trip.ended_at = new Date(trip.ended_at);
  
//       let startMinutes = minutesSinceMidnight(trip.started_at);
//       let endMinutes = minutesSinceMidnight(trip.ended_at);
  
//       departuresByMinute[startMinutes].push(trip);
//       arrivalsByMinute[endMinutes].push(trip);
  
//       return trip;
//     },
//   );
  


// function minutesSinceMidnight(date) {
//     return date.getHours() * 60 + date.getMinutes();
// }

// // function filterTripsByTime(trips, timeFilter) {
// //     return timeFilter === -1 
// //       ? trips  // If no filter is applied, return all trips
// //       : trips.filter((trip) => {
// //           const startedMinutes = minutesSinceMidnight(trip.started_at);
// //           const endedMinutes = minutesSinceMidnight(trip.ended_at);
  
// //           return (
// //             Math.abs(startedMinutes - timeFilter) <= 60 ||
// //             Math.abs(endedMinutes - timeFilter) <= 60
// //           );
// //       });
// //   }

// // function updateScatterPlot(timeFilter) {
// //     // Get only the trips that match the selected time
// //     const filteredTrips = filterTripsByTime(trips, timeFilter);
    
// //     // Recompute station traffic based on the filtered trips
// //     const filteredStations = computeStationTraffic(stations, filteredTrips);
    
// //     // Dynamically update the circle sizes
// //     circles
// //       .data(filteredStations, (d) => d.short_name)  // Use key for better tracking
// //       .join('circle')
// //       .attr('r', (d) => radiusScale(d.totalTraffic));
// // }

// function updateScatterPlot(timeFilter) {
//     const filteredTrips = filterTripsByTimeOptimized(timeFilter);
//     const filteredStations = computeStationTraffic(stations, filteredTrips);

//     circles
//       .data(filteredStations, (d) => d.short_name)
//       .join('circle')
//       .attr('r', (d) => radiusScale(d.totalTraffic));
// }


// function updateTimeDisplay() {
//     let timeFilter = Number(timeSlider.value);

//     if (timeFilter === -1) {
//       selectedTime.textContent = ''; 
//       anyTimeLabel.style.display = 'block';  
//     } else {
//       selectedTime.textContent = formatTime(timeFilter);
//       anyTimeLabel.style.display = 'none';  
//     }
    
//     // Update scatterplot when the slider changes
//     updateScatterPlot(timeFilter);
// }

// function filterTripsByTimeOptimized(timeFilter) {
//     if (timeFilter === -1) return trips;
  
//     let filteredTrips = [];
    
//     for (let i = Math.max(0, timeFilter - 60); i <= Math.min(1439, timeFilter + 60); i++) {
//       filteredTrips.push(...departuresByMinute[i], ...arrivalsByMinute[i]);
//     }
    
//     return filteredTrips;
//   }
  


let timeFilter = -1;

const timeSlider = document.getElementById('time-slider');
const selectedTime = document.getElementById('selected-time');
const anyTimeLabel = document.getElementById('any-time');
const tooltip = d3.select("#tooltip");

let trips = [];
let filteredTrips = [];
let filteredArrivals = new Map();
let filteredDepartures = new Map();
let filteredStations = [];

const map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/light-v11',
   center: [-71.09415, 42.36027],
   zoom: 12,
   minZoom: 5,
   maxZoom: 18
});

const stationFlow = d3.scaleQuantize()
    .domain([0, 1]) 
    .range([0, 0.5, 1]);

const bikeLaneStyle = {
    'line-color': '#32D400',
    'line-width': 3,
    'line-opacity': 0.4
};

function getCoords(station) {
    if (!station || isNaN(station.lon) || isNaN(station.lat)) {
        console.warn("🚨 Invalid station coordinates:", station);
        return { cx: 100, cy: 100 };
    }
    const point = new mapboxgl.LngLat(+station.lon, +station.lat);
    const { x, y } = map.project(point);

    return { cx: x, cy: y };
}
function updatePositions() {

    const circles = svg.selectAll('circle')
        .data(filteredStations, d => d.short_name);

    circles.attr('cx', d => getCoords(d).cx)
           .attr('cy', d => getCoords(d).cy);
}

map.on('move', updatePositions);
map.on('zoom', updatePositions);
map.on('resize', updatePositions);
map.on('moveend', updatePositions);

function minutesSinceMidnight(date) {
    if (!date) return null;
    return date.getHours() * 60 + date.getMinutes();
}

function updateMapVisualization() {
    if (!filteredStations.length) {
        console.warn("⚠️ No filtered stations found, forcing circle rendering!");
        filteredStations = stations.slice(0, 20);
    }


    const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(filteredStations, d => d.totalTraffic) || 1])
    .range(timeFilter === -1 
        ? [3, 25]
        : [3, Math.max(5, Math.min(50, 150 * (d3.max(filteredStations, d => d.totalTraffic) / (d3.max(stations, d => d.totalTraffic) || 1))))]);


    const circles = svg.selectAll('circle')
        .data(filteredStations, d => d.short_name);
    circles.exit().remove();

    const mergedCircles = circles.enter()
    .append('circle')
    .merge(circles)
    .attr('r', d => radiusScale(d.totalTraffic))
    .style("--departure-ratio", d => {
        if (d.totalTraffic === 0) return 0.5;
        return stationFlow(d.departures / d.totalTraffic);
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('opacity', 0.6);

    updatePositions();

    mergedCircles.on("mouseover", function(event, d) {  
        if (!d) return; 
        tooltip.style("visibility", "visible")
               .html(`<strong>${d.totalTraffic} trips</strong> <br> (${d.departures} departures, ${d.arrivals} arrivals)`);
    })
    .on("mousemove", function(event) {  
        tooltip.style("top", (event.pageY + 10) + "px")
               .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {  
        tooltip.style("visibility", "hidden");
    });
}

function filterTripsByTime() {
    if (!trips.length) return;

    filteredTrips = timeFilter === -1
        ? trips
        : trips.filter(trip => {
            if (!trip.started_at || !trip.ended_at) return false;
            const startedMinutes = minutesSinceMidnight(trip.started_at);
            const endedMinutes = minutesSinceMidnight(trip.ended_at);

            return (
                (startedMinutes !== null && Math.abs(startedMinutes - timeFilter) <= 60) ||
                (endedMinutes !== null && Math.abs(endedMinutes - timeFilter) <= 60)
            );
        });

    filteredArrivals = new Map();
    filteredDepartures = new Map();

    for (let trip of filteredTrips) {
        if (trip.end_station_id) {
            filteredArrivals.set(trip.end_station_id, (filteredArrivals.get(trip.end_station_id) || 0) + 1);
        }
        if (trip.start_station_id) {
            filteredDepartures.set(trip.start_station_id, (filteredDepartures.get(trip.start_station_id) || 0) + 1);
        }
    }

    filteredStations = stations.map(station => {
        let id = station.short_name;
        let arrivals = filteredArrivals.get(id) ?? 0;
        let departures = filteredDepartures.get(id) ?? 0;
        let totalTraffic = arrivals + departures;

        return {
            ...station,
            arrivals: arrivals,
            departures: departures,
            totalTraffic: totalTraffic
        };
    });

    
    if (filteredStations.length === 0) {
        console.warn("⚠️ No stations are being displayed! Check if the filtering logic is working.");
    }

    updateMapVisualization();
}


let svg = d3.select('#map').select('svg');
if (svg.empty()) {
    svg = d3.select("#map").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("position", "absolute")
        .style("top", "0")
        .style("left", "0");
}

let stations = [];

const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';

d3.json(jsonurl).then(jsonData => {
    console.log('Loaded JSON Data:', jsonData);

    stations = jsonData.data.stations.map(station => ({
        ...station,
        arrivals: 0,
        departures: 0,
        totalTraffic: 0
    }));

    const trafficUrl = 'https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv';

    d3.csv(trafficUrl).then(trafficData => {
        console.log('Loaded Traffic Data:', trafficData);
    
        trips = trafficData.map(trip => {
            let startTime = new Date(trip.started_at);
            let endTime = new Date(trip.ended_at);
        
            return {
                ...trip,
                started_at: startTime,
                ended_at: endTime
            };
        });
        

        filterTripsByTime();

        const departures = d3.rollup(trips, v => v.length, d => d.start_station_id);
        const arrivals = d3.rollup(trips, v => v.length, d => d.end_station_id);

        stations = stations.map(station => {
            let id = station.short_name;
            station.arrivals = arrivals.get(id) ?? 0;
            station.departures = departures.get(id) ?? 0;
            station.totalTraffic = station.arrivals + station.departures;
            return station;
        });

        const radiusScale = d3
            .scaleSqrt()
            .domain([0, d3.max(stations, d => d.totalTraffic)])
            .range([0, 25]);

        const circles = svg.selectAll('circle')
            .data(stations)
            .enter()
            .append('circle')
            .attr('r', d => radiusScale(d.totalTraffic))
            .attr('fill', 'steelblue')
            .attr('stroke', 'white')
            .attr('stroke-width', 1)
            .on("mouseover", function(event, d) {  
                tooltip.style("visibility", "visible")
                       .html(`<strong>${d.totalTraffic} trips</strong> <br> (${d.departures} departures, ${d.arrivals} arrivals)`);
            })            
            .on("mousemove", function(event) { 
                tooltip.style("top", (event.pageY + 10) + "px")
                       .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function() { 
                tooltip.style("visibility", "hidden");
            });

        function updatePositions() {
            const circles = svg.selectAll('circle')
                .data(filteredStations, d => d.short_name);
        
            circles.attr('cx', d => getCoords(d).cx)
                   .attr('cy', d => getCoords(d).cy);
        }
        
        updatePositions();

        map.on('move', updatePositions);
        map.on('zoom', updatePositions);
        map.on('resize', updatePositions);
        map.on('moveend', updatePositions);        

    }).catch(error => {
        console.error('Error loading traffic data:', error);
    });

}).catch(error => {
    console.error('Error loading JSON:', error);
});

map.on('load', () => {
    map.addSource('boston_route', {
        type: 'geojson',
        data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?...'
    });

    map.addLayer({
        id: 'bike-lanes',
        type: 'line',
        source: 'boston_route',
        paint: bikeLaneStyle
    });

    map.addSource('cambridge_route', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson'
    });

    map.addLayer({
        id: 'cambridge-bike-lanes',
        type: 'line',
        source: 'cambridge_route',
        paint: bikeLaneStyle
    });
});

function formatTime(minutes) {
    if (minutes === -1) return "11:59 PM";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
}

function updateTimeDisplay() {
    timeFilter = Number(timeSlider.value);


    selectedTime.textContent = timeFilter === -1 ? '' : formatTime(timeFilter);
    anyTimeLabel.style.display = timeFilter === -1 ? 'block' : 'none';

    filterTripsByTime();
}

timeSlider.addEventListener('input', updateTimeDisplay);

updateTimeDisplay();