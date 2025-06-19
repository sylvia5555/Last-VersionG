import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaGlobe, FaIdCard, FaStar, FaHome,
  FaInfoCircle, FaConciergeBell, FaEnvelopeOpen, FaUpload, FaTrash, FaLandmark
} from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (location.pathname === "/profile") {
      document.body.style.background = "#112d4ecc";
    }
    return () => {
      document.body.style.background = "";
    };
  }, [location]);

  const fetchProfile = async () => {
    try {
      const storedUser = localStorage.getItem("user-info");
      if (!storedUser) throw new Error("User not logged in");
      const { token } = JSON.parse(storedUser);

      const response = await fetch("http://night-at-the-museum.runasp.net/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        console.warn("Profile not found. Creating new profile...");
        const createRes = await fetch("http://night-at-the-museum.runasp.net/api/profile", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // بيانات فارغة أو افتراضية
        });

        if (!createRes.ok) throw new Error("Failed to create profile");

        return fetchProfile(); // إعادة جلب البيانات بعد الإنشاء
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch profile: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setUser(data);
      setEditData(data);
      localStorage.setItem("user-profile", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    try {
      if (!selectedFile) return;
      const { token } = JSON.parse(localStorage.getItem("user-info"));
      const formData = new FormData();
      formData.append("picture", selectedFile);
      const res = await fetch("http://night-at-the-museum.runasp.net/api/profile/upload-picture", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      fetchProfile();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user-info"));
      const res = await fetch("http://night-at-the-museum.runasp.net/api/profile/delete-picture", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchProfile();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user-info"));
      const res = await fetch("http://night-at-the-museum.runasp.net/api/profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Update failed");

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!user || !editData) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      {showSuccess && <div className="success-box">✔️ Profile updated successfully!</div>}

      <div className="left-section">
        <img
          src={
            user.pictureUrl?.startsWith("http")
              ? user.pictureUrl
              : user.pictureUrl
              ? `http://night-at-the-museum.runasp.net/${user.pictureUrl}`
              : "https://via.placeholder.com/150"
          }
          alt={user.displayName}
          className="user-image"
        />
        <label className="custom-file-upload">
          <input type="file" onChange={handleFileChange} hidden />
          Choose File
        </label>
        <div className="icon-container">
          <FaUpload className="icon" onClick={handleUpload} style={{ color: "blue" }} />
          <FaTrash className="icon" onClick={handleDelete} style={{ color: "red" }} />
        </div>

        <ul className="header-links">
          <li><Link to="/" className="header-link"><FaHome /> Home</Link></li>
          <li><Link to="/about" className="header-link"><FaInfoCircle /> About</Link></li>
          <li><Link to="/events" className="header-link"><FaConciergeBell /> Events</Link></li>
          <li><Link to="/sections" className="header-link"><FaLandmark /> Sections</Link></li>
          <li><Link to="/contact" className="header-link"><FaEnvelopeOpen /> Contact</Link></li>
        </ul>

        <label className="custom-file-upload" onClick={() => setIsEditing(true)}>
          Update Profile
        </label>
      </div>

      <div className="right-section">
        {isEditing ? (
          <>
            <h2 className="user-name">Update Your Info</h2>
            <input type="text" name="displayName" value={editData.displayName} onChange={handleEditChange} className="edit-input" />
            <input type="email" name="email" value={editData.email} onChange={handleEditChange} className="edit-input" />
            <input type="text" name="phoneNumber" value={editData.phoneNumber} onChange={handleEditChange} className="edit-input" />
            <input type="text" name="nationality" value={editData.nationality} onChange={handleEditChange} className="edit-input" />
            <input type="text" name="niDorPassport" value={editData.niDorPassport} onChange={handleEditChange} className="edit-input" />
            <button onClick={handleProfileUpdate} className="submit-btn">Save Changes</button>
          </>
        ) : (
          <>
            <h2 className="user-name"><FaUser /> {user.displayName}</h2>
            <p className="user-info"><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
            <p className="user-info"><FaPhone /> <strong>Phone:</strong> {user.phoneNumber}</p>
            <p className="user-info"><FaGlobe /> <strong>Nationality:</strong> {user.nationality || "Not Provided"}</p>
            <p className="user-info"><FaIdCard /> <strong>ID/Passport:</strong> {user.niDorPassport}</p>
            <div className="rating">
              <p>User Rating:</p>
              <div className="stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} className={index < (user.rating || 0) ? "star filled" : "star"} style={{ color: "#fac010" }} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
