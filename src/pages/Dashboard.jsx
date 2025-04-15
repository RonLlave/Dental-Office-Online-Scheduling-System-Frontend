import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

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

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const [cancelModal, setCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // Fetch user's appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/appointments/user?userId=${user._id}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAppointments();
  }, [user]);

  // Fetch booked slots for rescheduling
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (selectedAppointment && selectedDate) {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/appointments/slots?dentistId=${selectedAppointment.dentist._id}&date=${selectedDate}`
          );
          setBookedSlots(res.data);
        } catch (err) {
          console.error("Error fetching booked slots", err);
        }
      }
    };

    fetchBookedSlots();
  }, [selectedDate, selectedAppointment]);

  const handleOpenReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setRescheduleModal(true);
  };

  const handleReschedule = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/appointments/${selectedAppointment._id}`,
        {
          date: selectedDate,
          time: selectedTime,
        }
      );
      toast.success("Appointment rescheduled successfully!");
      setRescheduleModal(false);
      fetchAppointments();
    } catch (err) {
      toast.error("Failed to reschedule appointment.");
      console.error("Failed to reschedule", err);
    }
  };

  const confirmCancelAppointment = (appointment) => {
    setAppointmentToCancel(appointment);
    setCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/appointments/${appointmentToCancel._id}`
      );
      toast.success("Appointment cancelled.");
      fetchAppointments();
      setCancelModal(false);
      setAppointmentToCancel(null);
    } catch (err) {
      toast.error("Failed to cancel appointment.");
      console.error("Error cancelling appointment", err);
    }
  };

  const availableSlots = allTimeSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((app) => (
            <li key={app._id} className="border p-4 rounded shadow-sm">
              <p>
                <strong>Date:</strong> {app.date}
              </p>
              <p>
                <strong>Time:</strong> {app.time}
              </p>
              <p>
                <strong>Dentist:</strong> {app.dentist?.name || "N/A"}
              </p>

              <div className="mt-3 space-x-2">
                <button
                  onClick={() => handleOpenReschedule(app)}
                  className="bg-yellow-400 px-4 py-1 rounded"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => confirmCancelAppointment(app)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Reschedule Appointment
            </h2>

            <label className="block mb-2 font-medium">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />

            <label className="block mb-2 font-medium">Select Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="">Select Time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setRescheduleModal(false)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {cancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Cancel Appointment</h2>
            <p className="mb-4">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmCancel}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setCancelModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
