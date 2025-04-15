import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
  const { user, login } = useAuth(); // get current user and login method to update context
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
  });
  const [currentPassword, setCurrentPassword] = useState(user?.password);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const res = await axios.put(`/api/users/${user._id}`, formData);
      // update user in context + localStorage
      login(res.data);
      setFormData({
        name: user?.name,
        email: user?.email,
        password: "",
      });
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed.");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow rounded-xl"
      >
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded"
            type="text"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded"
            type="email"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Current Password
          </label>
          <div className="relative">
            <input
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 p-2 rounded"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-4"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
            >
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            New Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 p-2 rounded"
            type="password"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={isSaving || formData.name === "" || formData.email === ""}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
