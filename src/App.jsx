import Menu from "./view/menu";
import { GlobalStyles } from "./GlobalStyles";
import { useTheme } from "./ThemeProvider";
import CardRoot from "./view/cardRoot";
import ContrastIcon from '@mui/icons-material/Contrast';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {GlobalStyles}
      <div className="theme-toggle-button" onClick={toggleTheme}>
        {theme === "dark" ? (
          <span className="material-icons" title="Switch to Light Mode">
            <ContrastIcon style={{width: "4vw", height: "4vw", maxHeight: "24px" }} />
          </span>
        ) : (
          <span className="material-icons" title="Switch to Dark Mode">
            <ContrastIcon style={{width: "4vw", height: "4vw", maxHeight: "24px" }} />
          </span>
        )}
      </div>
      <Menu />
      <CardRoot />
    </>
  );
}

export default App;
