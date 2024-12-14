import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "./../../ThemeProvider";
import { Editor } from "./AceEditor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  // height: "620px",
  bgcolor: "var(--background)",
  border: "none",
  outline: "none",
  borderRadius: "12px",
  padding: "2px",
  "@media (max-width: 820px)": {
    width: "90vw !important",
  },
};

const EditorModal = (props) => {
  const { modalOpen, setModalOpen, codes, language } = props;

  const handleClose = () => setModalOpen(false);

  const { theme } = useTheme();

  return (
    <div>
      <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="">
            <Editor
              mode={language}
              dark={theme === "dark"}
              editable={false}
              value={codes}
              maxLines={54}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditorModal;
