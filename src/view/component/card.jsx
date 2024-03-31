import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CodeIcon from "@mui/icons-material/Code";
import BasicModal from "./modal";
import { Chip } from "@mui/material";
import chipColorConfig from "./chip.color.json";

const Card = (props) => {
  const { cardDetails } = props;
  const [moreOpen, setMoreOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const toggleMoreButton = () => setMoreOpen((prev) => (prev === false ? true : false));

  const openModelHandler = (action) => {
    setModalAction(action);
    setModalOpen(true);
  };
  const labels = ["javascript", "mui", "autocomplete", "react"];

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
        <div className="card-body-root">
          <div className="card-image-root">
            <img src="./assets/img1.png" alt="" />
            <div className="editor-btn" onClick={() => openModelHandler("editor")}>
              <CodeIcon />
            </div>
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
        </div>
        {modalOpen && <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} cardDetails={cardDetails} modalAction={modalAction} />}
      </div>
    </>
  );
};

export default Card;
