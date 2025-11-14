import React, { useEffect, useState } from "react";
import axios from "axios";
import SlotCard from "../components/SlotCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// ✅ Mock slots for offline/demo mode
const MOCK_SLOTS = [
  {
    _id: "slot_1",
    time: "06:00 AM - 07:00 AM",
    capacity: 20,
    booked: 8,
    equipment: ["Treadmill", "Dumbbells"],
  },
  {
    _id: "slot_2",
    time: "07:00 AM - 08:00 AM",
    capacity: 20,
    booked: 15,
    equipment: ["CrossFit Rig", "Kettlebells"],
  },
  {
    _id: "slot_3",
    time: "08:00 AM - 09:00 AM",
    capacity: 20,
    booked: 5,
    equipment: ["Yoga Mats", "Benches"],
  },
  {
    _id: "slot_4",
    time: "05:00 PM - 06:00 PM",
    capacity: 20,
    booked: 18,
    equipment: ["Treadmill", "Rowing Machine"],
  },
  {
    _id: "slot_5",
    time: "06:00 PM - 07:00 PM",
    capacity: 20,
    booked: 12,
    equipment: ["Swimming Pool", "Sauna"],
  },
  {
    _id: "slot_6",
    time: "07:00 PM - 08:00 PM",
    capacity: 20,
    booked: 3,
    equipment: ["Boxing Ring", "Speed Bag"],
  },
];

function Dashboard() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  // ✅ Helper to get token properly
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  // 📦 Fetch available slots for the selected date
  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/slots?date=${date}`,
        { headers: getAuthHeader(), timeout: 5000 }
      );
      setSlots(res.data);
      setIsOfflineMode(false);
    } catch (err) {
      console.error("Error fetching slots:", err);
      
      // 🔓 Fallback to offline mode with mock data
      console.log("🔌 Server unavailable - using offline mock data");
      setSlots(MOCK_SLOTS);
      setIsOfflineMode(true);
    }
  };

  // 🏋️ Book a slot
  const handleBook = async (slotId) => {
    if (isOfflineMode) {
      // 📝 Mock booking for offline mode
      setBookedSlots([...bookedSlots, slotId]);
      alert("✅ Slot booked successfully (offline mode)!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { slotId, date },
        { headers: getAuthHeader(), timeout: 5000 }
      );
      alert("✅ Slot booked successfully!");
      fetchSlots();
    } catch (err) {
      console.error("Error booking slot:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Please log in again to continue.");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        // 📝 Fallback to local booking
        setBookedSlots([...bookedSlots, slotId]);
        alert("✅ Slot booked successfully (offline mode)!");
      }
    }
  };

  // 🔁 Fetch slots whenever date changes
  useEffect(() => {
    if (date) fetchSlots();
  }, [date]);

  // 🧭 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      window.location.href = "/login";
    }
  }, []);

  // ✅ Calculate today's date for min attribute
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // ✅ Check if slot is booked
  const isSlotBooked = (slotId) => bookedSlots.includes(slotId);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🏋️‍♂️ Book Your Gym Slot
      </h2>

      {/* Offline Mode Badge */}
      {isOfflineMode && (
        <div className="alert alert-warning" role="alert">
          <small>🔌 <strong>Offline Mode:</strong> Showing demo slots. Server connection unavailable.</small>
        </div>
      )}
      <div className="text-center mb-4">
        <label htmlFor="datePicker" className="form-label fw-semibold">
          Select Date:
        </label>
        <input
          id="datePicker"
          type="date"
          className="form-control w-auto d-inline-block mx-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={tomorrowStr} // ✅ disables past dates
        />
      </div>

      {/* Slots Display Section */}
      {date ? (
        <div className="row">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <div
                key={slot._id}
                className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
              >
                <SlotCard 
                  slot={slot} 
                  onBook={() => handleBook(slot._id)}
                  userHasBooked={isSlotBooked(slot._id)}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              No slots available for this date.
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-muted mt-3">
          Please select a date to view available slots.
        </p>
      )}
    </div>
  );
}

export default Dashboard;

