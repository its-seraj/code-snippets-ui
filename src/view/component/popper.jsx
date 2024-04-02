import { Popper, Fade, Paper } from "@mui/material";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import config from "./../config.json";
import { CodeSandboxIcon } from "./../../assets/codesandbox";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";

export const CustomPopper = (props) => {
  const { anchorEl, isPopperOpen, popperPlacement, setExtraFields } = props;

  const clickHandler = (value) => {
    setExtraFields((prev) => {
      if (prev?.[value]) {
        prev[value].push({});
      } else {
        prev[value] = [{}];
      }
      console.log(prev);
      return prev;
    });
  };

  return (
    <>
      <Popper sx={{ zIndex: 1301 }} open={isPopperOpen} anchorEl={anchorEl} placement={popperPlacement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div className="add-more-root">
                {config["add-more"].map((btn) => (
                  <div className="btn" onClick={() => clickHandler(btn)} key={btn}>
                    {btn === "Editor" ? <CodeRoundedIcon /> : <>{btn === "CodeSandbox" ? <CodeSandboxIcon /> : <InsertLinkRoundedIcon />}</>}
                    <span>{btn}</span>
                  </div>
                ))}
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
