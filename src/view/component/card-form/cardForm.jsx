import { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Divider, Skeleton, Box, TextField, Autocomplete } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { createFilterOptions } from "@mui/material/Autocomplete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CustomPopper } from "../popper";
import ExtraFields from "./extraFields";
import config from "../../config.json";

const CardForm = (props) => {
  const { action, cardDetails, setModalOpen, refresh } = props;

  const [previewImage, setPreviewImage] = useState(cardDetails?.images?.image || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState(cardDetails?.title || "");
  const [description, setDescription] = useState(cardDetails?.description || "");
  const [selectedLabels, setSelectedLabels] = useState(cardDetails?.labels || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [popperPlacement, setPopperPlacement] = useState();
  const [extraFields, setExtraFields] = useState(cardDetails?.extraFields || {});

  const labels = config.labels.sort((a, b) => a > b);
  const filter = createFilterOptions();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setErrorMessage("");
    if (!file.type.match("image/*")) { setErrorMessage("Please select a valid image file."); return; }
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    if (!clipboardData?.items) return;
    const pastedItem = clipboardData.items[0];
    if (pastedItem.type.indexOf("image/") !== -1) {
      const pastedFile = pastedItem.getAsFile();
      if (!pastedFile.type.match("image/*")) { setErrorMessage("Please paste a valid image."); return; }
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(pastedFile);
    } else {
      setErrorMessage("Please paste an image.");
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;
    if (!file.type.match("image/*")) { setErrorMessage("Please drop a valid image file."); return; }
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = { title, description, labels: selectedLabels, image: previewImage, extraFields, cardUuid: cardDetails?.cardUuid };
    await fetch(`${window._env_.CODE_SNIPPETS_BACKEND}/card`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success === true) { refresh(true); setModalOpen(false); }
        else setErrorMessage(data?.error || data?.message);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const popperClickHandler = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopperOpen((prev) => popperPlacement !== newPlacement || !prev);
    setPopperPlacement(newPlacement);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-root">

        {/* Modal header */}
        <div className="form-header">
          <span className="form-header-title">{action === "new" ? "New Snippet" : "Edit Snippet"}</span>
        </div>

        <div className="form-body">

          {/* Title + Description */}
          <div className="form-row">
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          </div>

          {/* Labels */}
          <Autocomplete
            multiple
            limitTags={3}
            value={selectedLabels}
            onChange={(event, newValue) => {
              setSelectedLabels(newValue.map((o) => (typeof o === "string" ? o : o.inputValue ?? o)));
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              if (inputValue !== "" && !options.some((o) => inputValue === o)) {
                filtered.push({ inputValue, title: `Add "${inputValue}"` });
              }
              return filtered;
            }}
            selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
            options={labels}
            getOptionLabel={(o) => (typeof o === "string" ? o : o.inputValue ?? o.title)}
            renderOption={(props, option) => <li {...props}>{option.title ?? option}</li>}
            renderInput={(params) => <TextField {...params} placeholder="Labels" />}
          />

          {/* Image upload */}
          <div className="form-image-row">
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="drop-zone">
              <CloudUploadOutlinedIcon style={{ height: 48, width: 48, opacity: 0.35 }} />
              <span>Drag & Drop</span>
              <input type="file" id="image-upload" onChange={handleFileChange} />
              <label htmlFor="image-upload">Upload Image</label>
              <div className="paste-container" onPaste={handlePaste}>(Ctrl+V)</div>
            </div>

            <div className="form-image-preview">
              {previewImage ? (
                <img className="preview" src={previewImage} alt="Preview" />
              ) : (
                <div className="preview-skeleton">
                  <Skeleton variant="rectangular" />
                  <div className="preview-placeholder">
                    <ImageOutlinedIcon style={{ height: 40, width: 40 }} />
                    <span>Preview</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Extra fields */}
          <ExtraFields extraFields={extraFields} setExtraFields={setExtraFields} />

        </div>

        {/* Footer */}
        <div className="form-footer">
          <div className="text-btn-root" onClick={popperClickHandler("top-start")}>
            {isPopperOpen && <CustomPopper anchorEl={anchorEl} isPopperOpen={isPopperOpen} popperPlacement={popperPlacement} setExtraFields={setExtraFields} />}
            <AddRoundedIcon />
            <button className="text-btn" type="button">Add More</button>
          </div>
          <div className="form-footer-right">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="save-card-btn">
              {action === "new" ? "Create Snippet" : "Update Snippet"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CardForm;
