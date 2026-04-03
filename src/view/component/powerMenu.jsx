import * as React from "react";
import { verifyLogin } from "../helper/token";
import { useEffect } from "react";

export default function PowerMenu() {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [resource, setResource] = React.useState();
  const [passkey, setPasskey] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  useEffect(() => {
    setResource(verifyLogin());
  }, []);

  const loginSubmit = (value) => {
    const url = `${window._env_.CODE_SNIPPETS_BACKEND}/login`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passkey: value }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("resource", data.resource);
          setPasskey("");
          setLoginError("");
          setIsLoginOpen(false);
          setResource(true);
        } else {
          setLoginError("Incorrect passkey. Please try again.");
          setPasskey("");
        }
      })
      .catch(() => setLoginError("Unable to connect. Please check your network."));
  };

  const logoutSubmit = () => {
    fetch(`${window._env_.CODE_SNIPPETS_BACKEND}/login`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(() => {
        localStorage.removeItem("resource");
        setResource(undefined);
      })
      .catch(console.error);
  };

  const handlePasskeyChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPasskey(raw);
    setLoginError("");
    if (raw.length === 6) loginSubmit(raw);
  };

  return (
    <>
      {resource ? (
        <button className="btn-logout" onClick={logoutSubmit} title="Sign out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>
      ) : (
        <button className="btn-login" onClick={() => setIsLoginOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Sign in
        </button>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="login-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setIsLoginOpen(false); setPasskey(""); setLoginError(""); } }}>
          <div className="login-card">
            <div className="login-card-header">
              <div className="login-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <h2 className="login-card-title">Authenticate</h2>
                <p className="login-card-subtitle">Enter your 6-digit access code</p>
              </div>
              <button className="login-close-btn" onClick={() => { setIsLoginOpen(false); setPasskey(""); setLoginError(""); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="login-card-body">
              <div className="passkey-dots">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className={`passkey-dot${i < passkey.length ? " filled" : ""}${i === passkey.length ? " active" : ""}`} />
                ))}
              </div>

              <input
                className="passkey-hidden-input"
                type="tel"
                inputMode="numeric"
                maxLength={6}
                value={passkey}
                onChange={handlePasskeyChange}
                autoFocus
                autoComplete="off"
              />

              {loginError && <p className="login-error">{loginError}</p>}

              <p className="login-hint">Use your keyboard to enter the code</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
