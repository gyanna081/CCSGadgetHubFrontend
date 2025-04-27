import { useState } from "react";
import { auth, provider } from "../firebaseconfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = email.includes("@cit.edu") ? "Admin" : "User";

      await syncUserWithBackend(user, firstName, lastName, role);

      // Redirect based on role
      navigate(role === "Admin" ? "/admin" : "/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Firebase: " + err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const nameParts = user.displayName?.split(" ") || [];
      const fname = nameParts[0] || "";
      const lname = nameParts.slice(1).join(" ") || "";
      const role = user.email?.includes("@cit.edu") ? "Admin" : "User";

      await syncUserWithBackend(user, fname, lname, role);

      // Redirect based on role
      navigate(role === "Admin" ? "/admin" : "/dashboard");
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Google Signup: " + err.message);
    }
  };

  const syncUserWithBackend = async (user, fName, lName, role) => {
    try {
      await axios.post("http://localhost:8080/api/sync/user", {
        uid: user.uid,
        email: user.email,
        firstName: fName,
        lastName: lName,
        role: role,
      });
    } catch (err) {
      console.error("Backend sync failed:", err.response?.data || err.message);
      throw new Error("Failed to sync with backend");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", background: "#545454" }}>
      <div style={{ background: "#ffffff", padding: "3rem", borderRadius: "12px", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", textAlign: "center", width: "400px" }}>
        <h2 style={{ marginBottom: "24px" }}>Sign Up</h2>
        {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" style={{ padding: "8px", background: "#E26901", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Sign Up with Email
          </button>
        </form>

        <div style={{ margin: "16px 0", textAlign: "center" }}>or</div>

        <button
          onClick={handleGoogleSignup}
          style={{ width: "100%", padding: "8px", background: "#4285f4", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Sign Up with Google
        </button>

        <div style={{ marginTop: "16px" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} style={{ color: "#E26901", cursor: "pointer" }}>
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
