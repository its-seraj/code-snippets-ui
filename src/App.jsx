import Menu from "./view/menu";
import { GlobalStyles } from "./GlobalStyles";
import { useTheme } from "./ThemeProvider";
import CardRoot from "./view/cardRoot";
import PowerMenu from "./view/component/powerMenu";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { verifyLogin } from "./view/helper/token";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [modalOpenRoot, setModalOpenRoot] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => verifyLogin());

  return (
    <>
      {GlobalStyles}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">
            <span className="navbar-logo-text">Snippets</span>
          </div>
        </div>

        <div className="navbar-center">
          <Menu search={search} setSearch={setSearch} />
        </div>

        <div className="navbar-right">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <PowerMenu onAuthChange={setIsLoggedIn} />

          <button className="btn-primary" onClick={() => setModalOpenRoot(true)}>
            <AddIcon style={{ width: 16, height: 16 }} />
            Add Snippet
          </button>
        </div>
      </nav>

      <div className="main-content">
        <CardRoot
          modalOpenRoot={modalOpenRoot}
          setModalOpenRoot={setModalOpenRoot}
          search={search}
          setSearch={setSearch}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </>
  );
}

export default App;
