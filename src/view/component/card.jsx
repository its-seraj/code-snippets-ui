import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ExpandIcon } from "../../assets/expand.jsx";
import BasicModal from "./modal";
import { Chip } from "@mui/material";
import chipColorConfig from "./../chip.color.json";
import { RunCodeIcon } from "../../assets/terminal.jsx";
import { Editor } from "./AceEditor.jsx";
import EditorModal from "./editorModal.jsx";
import { useTheme } from "../../ThemeProvider.jsx";

const Card = (props) => {
  const { cardDetails, cardUx, refresh, isLoggedIn } = props;
  const [moreOpen, setMoreOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [expandedModal, setExpandedModal] = useState(false);

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
        {isLoggedIn && (
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
        )}

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
                    <div className="editor-expand" onClick={() => setExpandedModal(true)}>
                      <ExpandIcon />
                    </div>
                    {expandedModal && (
                      <EditorModal modalOpen={expandedModal} setModalOpen={setExpandedModal} language={cardDetails.extraFields.Editor[0]?.language} codes={cardDetails.extraFields.Editor[0]?.value} />
                    )}
                    <Editor
                      mode={cardDetails.extraFields.Editor[0]?.language}
                      dark={theme === "dark"}
                      editable={false}
                      value={cardDetails.extraFields.Editor[0]?.value}
                      maxLines={10}
                    />
                  </div>
                )}

                {cardDetails?.extraFields?.["URL's"]?.length > 0 && (
                  <div className="links-root">
                    {cardDetails.extraFields["URL's"].map((link, index) => {
                      return (
                        <>
                          <a href={link.value} target="_blank" rel="noopener noreferrer">
                            <img src={"https://www.google.com/s2/favicons?domain_url=" + link.value} />
                          </a>
                        </>
                      );
                    })}
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
