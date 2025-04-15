import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

//9am to 5pm working hours
const allTimeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "17:00",
];

export default function Booking() {
  const [dentists, setDentists] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchDentists = async () => {
    await axios
      .get("http://localhost:3001/api/dentists")
      .then((res) => setDentists(res.data));
  };

  const fetchAvailableSlots = async () => {
    if (selectedDentist && selectedDate) {
      //console.log(
      // `http://localhost:3001/api/appointments/bookedslots?dentistId=${selectedDentist}&date=${selectedDate}`
      //     );
      try {
        const res = await axios.get(
          `http://localhost:3001/api/appointments/bookedslots?dentistId=${selectedDentist}&date=${selectedDate}`
        );

        const bookedSlots = res.data;
        //console.log("booked slots: ", bookedSlots);
        const availableTimeSlots = allTimeSlots.filter(
          (time) => !bookedSlots.includes(time)
        );
        setAvailableSlots(availableTimeSlots);
      } catch {}
    }
  };

  const handleBooking = async () => {
    const appointmentData = {
      user: user._id,
      dentist: selectedDentist,
      date: selectedDate,
      time: selectedTime,
    };
    console.log(appointmentData);
    try {
      setIsBooking(true);
      await axios.post(
        "http://localhost:3001/api/appointments",
        appointmentData
      );
      toast.success("Appointment booked!");
      setIsBooking(false);
    } catch (err) {
      // console.error(err);
      // toast.error("Booking failed.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDentists();
      fetchAvailableSlots();
    }, 1000); //1 sec

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedDate, selectedDentist]);
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Book an Appointment</h2>
      <label className="block mb-1 font-medium">Select Dentist</label>
      <select
        onChange={(e) => setSelectedDentist(e.target.value)}
        className="p-2 mb-4 border rounded"
      >
        <option>Please select a dentist.</option>
        {dentists.length > 0 &&
          dentists.map((dentist) => (
            <option key={dentist._id} value={dentist._id}>
              {dentist.name}
            </option>
          ))}
      </select>

      <div>
        <label className="block mb-1 font-medium">Select Date</label>
        <input
          type="date"
          name="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block mb-4 p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Available Time slots</label>
        <select
          name="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className={`block mb-1 border p-2 rounded ${
            availableSlots.length === 0 ? "text-red-500" : ""
          } `}
          disabled={availableSlots.length === 0}
          required
        >
          <option>Please select a time slot.</option>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))
          ) : !selectedDentist || !selectedDate ? (
            <option>Please select a dentist and date.</option>
          ) : (
            <option>No available slots for this date.</option>
          )}
        </select>
      </div>

      <button
        disabled={
          !selectedDentist ||
          !selectedDate ||
          !selectedTime ||
          selectedDentist === "Please select a dentist." ||
          selectedTime === "Please select a time slot." ||
          isBooking
        }
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleBooking}
      >
        Book Appointment
      </button>
    </div>
  );
}
