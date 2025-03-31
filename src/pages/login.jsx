import { useState } from "react";
import { auth, provider } from "../firebaseconfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/CCSGadgetHub.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google Sign-In failed");
    }
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", background: "#545454"
    }}>
      <div style={{
        background: "#ffffff", padding: "3rem", borderRadius: "12px", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", textAlign: "center", width: "400px", maxWidth: "90%"
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <img src={logo} alt="CCS GadgetHub Logo" style={{ width: "200px", height: "auto", transition: "transform 0.3s ease" }} />
        </div>
        
        <h2 style={{ color: "#000", fontSize: "26px", fontWeight: "600", marginBottom: "10px" }}>Welcome Back</h2>
        <p style={{ color: "#545454", fontSize: "18px", marginBottom: "28px" }}>Sign in to your account</p>

        {error && (
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "rgba(226, 105, 1, 0.1)", color: "#E26901", fontSize: "14px", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px", textAlign: "left" }}>
            <label style={{ display: "block", color: "#545454", fontSize: "16px", marginBottom: "6px", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "14px 18px", border: "1px solid #dcdcdc", borderRadius: "8px", fontSize: "16px" }}
            />
          </div>

          <div style={{ marginBottom: "16px", textAlign: "left" }}>
            <label style={{ display: "block", color: "#545454", fontSize: "16px", marginBottom: "6px", fontWeight: "500" }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "14px 18px", border: "1px solid #dcdcdc", borderRadius: "8px", fontSize: "16px" }}
            />
          </div>

          <button type="submit" style={{ width: "100%", padding: "14px", background: "#E26901", color: "white", fontSize: "16px", fontWeight: "600", borderRadius: "8px", cursor: "pointer", border: "none" }}>Sign In</button>
        </form>
        
        <div style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "24px 0" }}>
          <span style={{ flex: 1, borderBottom: "1px solid #dcdcdc" }}></span>
          <span style={{ padding: "0 10px", color: "#909090", fontSize: "14px" }}>or</span>
          <span style={{ flex: 1, borderBottom: "1px solid #dcdcdc" }}></span>
        </div>

        <button onClick={handleGoogleLogin} style={{ width: "100%", padding: "14px", background: "#ffffff", color: "#545454", fontSize: "16px", fontWeight: "600", borderRadius: "8px", cursor: "pointer", border: "1px solid #dcdcdc" }}>
          Sign in with Google
        </button>

        <div style={{ marginTop: "20px", fontSize: "16px", color: "#545454" }}>
          Don't have an account? <span style={{ color: "#E26901", fontWeight: "600", cursor: "pointer" }}>Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
