import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="text-center p-10">
      <div className="p-6 md:p-12 max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="bg-blue-50 p-8 rounded-2xl shadow mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Dental Office Online Scheduling System
          </h1>
          <p className="text-gray-700 text-lg">
            Your smile is our priority. Schedule your dental appointment with
            ease and get the care you deserve.
          </p>
          <p className="text-gray-700 text-lg">
            Our dental clinic is open from 9am to 5pm (or 17:00).
          </p>
          <Link
            to="/booking"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Book an Appointment
          </Link>
        </div>

        {/* Services Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                General Dentistry
              </h3>
              <p className="text-gray-600">
                Routine checkups, cleanings, and cavity fillings to keep your
                teeth healthy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                Cosmetic Dentistry
              </h3>
              <p className="text-gray-600">
                Teeth whitening, veneers, and smile makeovers for a confident
                smile.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                Orthodontics
              </h3>
              <p className="text-gray-600">
                Braces and Invisalign to align your teeth and improve your bite.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                Emergency Care
              </h3>
              <p className="text-gray-600">
                Same-day appointments for dental emergencies like pain or
                injury.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
