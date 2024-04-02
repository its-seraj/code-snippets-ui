import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BasicModal from "./modal";
import { Chip } from "@mui/material";
import chipColorConfig from "./chip.color.json";
import { RunCodeIcon } from "../../assets/terminal.jsx";
import { Editor } from "./AceEditor.jsx";
import { useTheme } from "../../ThemeProvider.jsx";

const Card = (props) => {
  const { cardDetails, cardUx } = props;
  const [moreOpen, setMoreOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const { theme } = useTheme();

  const toggleMoreButton = () => setMoreOpen((prev) => (prev === false ? true : false));

  const openModelHandler = (action) => {
    setModalAction(action);
    setModalOpen(true);
  };
  const labels = ["javascript", "mui", "autocomplete", "react", "nodejs"];

  const handleClick = () => {};

  return (
    <>
      <div className="card-item">
        <div className={"card-action"}>
          <div className={moreOpen ? "card-action-expanded" : "card-action-collapsed"}>
            <ExpandMoreRoundedIcon onClick={toggleMoreButton} className="more" />
            <div className={moreOpen ? "action-btn-root" : "hide"}>
              <div onClick={() => openModelHandler("card")}>
                <EditNoteIcon />
                <span>Edit</span>
              </div>
              <div>
                <DeleteSweepIcon />
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="run-code-icon" onClick={() => openModelHandler("editor")}>
          <RunCodeIcon />
        </div>
        <div className="card-body-root">
          {cardUx === 0 && (
            <>
              <div className="card-image-root">
                <img src="./assets/img2.png" alt="" />
              </div>
              <div className="card-body-content">
                <div className="header">Fugiat ad magna adipisicing tempor aliquip consequat nulla tempor adipisicing.</div>
                <div className="labels">
                  {labels?.length > 0 &&
                    labels.map((chip) => {
                      const bg = chipColorConfig?.[chip] ? chipColorConfig?.[chip].bg + " !important" : "";
                      const color = chipColorConfig?.[chip] ? chipColorConfig?.[chip].color + " !important" : "";
                      return (
                        <>
                          <Chip label={chip} sx={{ backgroundColor: bg ?? "", color: color ?? "" }} onClick={handleClick} />
                        </>
                      );
                    })}
                </div>
              </div>
            </>
          )}
          {cardUx === 1 && (
            <>
              <div className="card-body-content">
                <div className="header" style={{ width: "calc(100% - 50px)" }}>
                  Fugiat ad magna adipisicing
                </div>
                <div className="sub-header">Laboris labore do voluptate anim irure consequat incididunt eu magna duis Lorem.</div>
                <div className="labels">
                  {labels?.length > 0 &&
                    labels.map((chip) => {
                      const bg = chipColorConfig?.[chip] ? chipColorConfig?.[chip].bg + " !important" : "";
                      const color = chipColorConfig?.[chip] ? chipColorConfig?.[chip].color + " !important" : "";
                      return (
                        <>
                          <Chip label={chip} sx={{ backgroundColor: bg ?? "", color: color ?? "" }} onClick={handleClick} />
                        </>
                      );
                    })}
                </div>
                <div className="run-code-icon" onClick={() => openModelHandler("editor")}>
                  <RunCodeIcon />
                </div>
              </div>
            </>
          )}
          {cardUx === 2 && (
            <>
              <div className="card-body-content">
                <div className="header" style={{ width: "calc(100% - 50px)" }}>
                  Fugiat ad magna adipisicing
                </div>
                {cardDetails?.header && <div className="sub-header">Laboris labore do voluptate anim irure consequat incididunt eu magna duis Lorem.</div>}

                <div className="ace_editor-root">
                  <Editor
                    mode="javascript"
                    dark={theme === "dark"}
                    // onChange={(e) => {
                    //    updatejsValue(e);
                    // }}
                    editable={false}
                    value={`const a = 'String'\nfunction yell`}
                    maxLines={10}
                  />
                </div>

                <div className="labels">
                  {labels?.length > 0 &&
                    labels.map((chip) => {
                      const bg = chipColorConfig?.[chip] ? chipColorConfig?.[chip].bg + " !important" : "";
                      const color = chipColorConfig?.[chip] ? chipColorConfig?.[chip].color + " !important" : "";
                      return (
                        <>
                          <Chip label={chip} sx={{ backgroundColor: bg ?? "", color: color ?? "" }} onClick={handleClick} />
                        </>
                      );
                    })}
                </div>
                <div className="run-code-icon" onClick={() => openModelHandler("editor")}>
                  <RunCodeIcon />
                </div>
              </div>
            </>
          )}
        </div>
        {modalOpen && <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} cardDetails={cardDetails} modalAction={modalAction} />}
      </div>
    </>
  );
};

export default Card;
