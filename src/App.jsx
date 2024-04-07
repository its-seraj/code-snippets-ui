import Menu from "./view/menu";
import { GlobalStyles } from "./GlobalStyles";
import { useTheme } from "./ThemeProvider";
import CardRoot from "./view/cardRoot";
import PowerMenu from "./view/component/powerMenu";
import { Divider } from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [modalOpenRoot, setModalOpenRoot] = useState(false);

  const newCardHandler = () => {
    setModalOpenRoot(true);
  };

  return (
    <>
      {GlobalStyles}
      <div className="theme-toggle-button" onClick={toggleTheme}>
        {theme === "dark" ? (
          <span className="material-icons" title="Switch to Light Mode">
            <ContrastIcon style={{ width: "4vw", height: "4vw", maxHeight: "24px" }} />
          </span>
        ) : (
          <span className="material-icons" title="Switch to Dark Mode">
            <ContrastIcon style={{ width: "4vw", height: "4vw", maxHeight: "24px" }} />
          </span>
        )}
      </div>
      <PowerMenu />
      <Menu />
      <div className="action-menu">
        <Divider className="root-divider" />
        <div className="action">
          <div></div>
          {/* <div className="sort-by-btn">
            <SortIcon />
            <span>Sort By</span>
          </div> */}
          <div onClick={newCardHandler} className="new-card-btn">
            <AddIcon />
            <span>New Card</span>
          </div>
        </div>
      </div>
      <CardRoot modalOpenRoot={modalOpenRoot} setModalOpenRoot={setModalOpenRoot} />
    </>
  );
}

export default App;
