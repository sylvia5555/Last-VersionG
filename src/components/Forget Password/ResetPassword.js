import React, { useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !token) {
      setMessage("Missing email or token.");
      return;
    }

    try {
      const res = await fetch(
        `/api/account/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );

      const data = await res.json();
      setMessage(data.message || "Something went wrong.");
    } catch (err) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        background: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "12px",
              width: "100%",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Reset
          </button>
        </form>
        <div
          style={{
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
