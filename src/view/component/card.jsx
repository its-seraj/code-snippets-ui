import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BasicModal from "./modal";
import { Chip } from "@mui/material";
import chipColorConfig from "./../chip.color.json";
import { RunCodeIcon } from "../../assets/terminal.jsx";
import { Editor } from "./AceEditor.jsx";
import { useTheme } from "../../ThemeProvider.jsx";

const Card = (props) => {
  console.log("props inside card", props);
  const { cardDetails, cardUx, refresh } = props;
  const [moreOpen, setMoreOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const { theme } = useTheme();

  const toggleMoreButton = () => setMoreOpen((prev) => (prev === false ? true : false));

  const openModelHandler = (action) => {
    setModalAction(action);
    setModalOpen(true);
  };
  const labels = cardDetails?.labels || [];

  const handleClick = () => {};

  const deleteCardHandler = async () => {
    const url = `${window._env_.CODE_SNIPPETS_BACKEND}/card?cardUuid=${cardDetails?.cardUuid}`;
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === true) {
          refresh(true);
        } else {
          // setErrorMessage(data?.error || data?.message);
        }
      })
      .catch((error) => {
        console.error("Error occured while deleting card", error);
        // setErrorMessage(error.message);
      });
  };

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
              <div onClick={deleteCardHandler}>
                <DeleteSweepIcon />
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="run-code-icon" onClick={() => openModelHandler("editor")}>
          <RunCodeIcon />
        </div> */}
        <div className="card-body-root">
          {cardDetails && (
            <>
              <div className="card-body-content">
                {cardDetails?.title && (
                  <div className="header" style={{ width: "calc(100% - 50px)" }}>
                    {cardDetails.title}
                  </div>
                )}

                {cardDetails?.description && <div className="sub-header">{cardDetails.description}</div>}

                {cardDetails?.images && (
                  <div className="card-image-root">
                    <img src={cardDetails.images?.image} alt="" />
                  </div>
                )}

                {cardDetails?.extraFields?.Editor?.length > 0 && (
                  <div className="ace_editor-root">
                    <Editor
                      mode={cardDetails.extraFields.Editor[0]?.language}
                      dark={theme === "dark"}
                      // onChange={(e) => {
                      //    updatejsValue(e);
                      // }}
                      editable={false}
                      value={cardDetails.extraFields.Editor[0]?.value}
                      maxLines={10}
                    />
                  </div>
                )}

                {cardDetails?.labels && (
                  <div className="labels">
                    {cardDetails.labels?.length > 0 &&
                      cardDetails.labels.map((chip, index) => {
                        const bg = chipColorConfig?.[chip] ? chipColorConfig?.[chip].bg + " !important" : "";
                        const color = chipColorConfig?.[chip] ? chipColorConfig?.[chip].color + " !important" : "";
                        return (
                          <>
                            <Chip key={index} label={chip} sx={{ backgroundColor: bg ?? "", color: color ?? "" }} onClick={handleClick} />
                          </>
                        );
                      })}
                  </div>
                )}
                {(cardDetails?.extraFields?.CodeSandbox?.length > 0 || cardDetails?.extraFields?.CodePen?.length > 0) && (
                  <div className="run-code-icon" onClick={() => openModelHandler("editor")}>
                    <RunCodeIcon />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {modalOpen && <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} cardDetails={cardDetails} modalAction={modalAction} refresh={refresh} />}
      </div>
    </>
  );
};

export default Card;
