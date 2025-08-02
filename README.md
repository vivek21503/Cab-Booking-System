# 🚖 TAXIWALA - Cab Booking System

**TAXIWALA** is a real-time web-based cab booking system built using modern web technologies. It provides a seamless interface for both users and drivers, with intelligent location-based search, fare estimation, and efficient ride allocation mechanisms. The system ensures minimal wait time, dynamic ride matching, and robust user-driver interactions.

---

## ✨ Key Features

- 🔐 **Authentication:**  
  Secure registration and login for both drivers and clients.

- 📍 **Real-Time Location & Nearby Search:**  
  - Dynamically updates client and driver locations.  
  - Uses **Mapbox** APIs for accurate reverse geocoding and distance/path calculation.  
  - Searches for available drivers within 1km → 3km → 5km in increasing order if necessary.

- 🚘 **Driver Allocation System:**  
  - Prioritizes drivers based on availability and rating.  
  - Automatically reassigns the ride request if a driver declines or doesn’t respond within 5 minutes.

- 💬 **Notifications & Feedback:**  
  - Notification system to inform drivers of new ride requests.  
  - Clients can give feedback and rate drivers after the trip.

- 💸 **Fare Calculation:**  
  - Uses path-based distance fetched via Mapbox APIs.  
  - Predicts ride cost based on distance and vehicle type.

- 🕒 **Efficient Ride Management:**  
  - Ensures clients are never waiting longer than 5 minutes for a driver response.  
  - Stores trip and status data in a structured MySQL database.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML, CSS, React 
- **Database:** MySQL  
- **APIs & Libraries:** Mapbox APIs (Geolocation, Reverse Geocoding)





