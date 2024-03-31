import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "./../../ThemeProvider";
import CardForm from "./cardForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  height: "620px",
  bgcolor: "var(--background)",
  border: "none",
  outline: "none",
  borderRadius: "12px",
  padding: "2px",
};

const BasicModal = (props) => {
  console.log("props inside Modal", props);
  const { modalOpen, setModalOpen, modalAction } = props;

  const handleClose = () => setModalOpen(false);

  const { theme } = useTheme();

  return (
    <div>
      <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="modal-box-root">
            {modalAction === "editor" ? (
              <iframe
                src={`https://codesandbox.io/embed/ptsqm3?view=preview&module=%2Fsrc%2Findex.tsx&hidenavigation=1&theme=${theme}&fontsize=10`}
                title="Framer Motion: useSpring example (forked)"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            ) : (
              <CardForm action={modalAction === "card" ? "edit" : "new"} />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
