import * as React from "react";
import { useEffect, useRef } from "react";
import { FaceLockScreen } from "react-face-totp";
import { verifyLogin } from "../helper/token";

export default function PowerMenu({ onAuthChange }) {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [resource, setResource] = React.useState();

  useEffect(() => {
    console.log("gfcvhjkgg2343")
    setResource(verifyLogin());
  }, []);

  const handleUnlocked = () => {
    const isAuth = verifyLogin() || true;
    setResource(isAuth);
    setIsLoginOpen(false);
    onAuthChange?.(true);
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
        onAuthChange?.(false);
      })
      .catch(console.error);
  };

  const authRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (authRef.current && !authRef.current.contains(event.target)) {
      setIsLoginOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

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

      {/* Login Modal using react-face-totp */}
      {isLoginOpen && (
        <div ref={authRef} className="auth-container" style={{ position: "relative", zIndex: 9999, height: "content-fit" }}>
          <FaceLockScreen
            appName="Code Snippets"
            onUnlocked={handleUnlocked}
            onClose={() => setIsLoginOpen(false)}
          />
        </div>
      )}
    </>
  );
}
