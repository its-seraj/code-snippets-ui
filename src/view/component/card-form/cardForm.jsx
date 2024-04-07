import { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Divider, Skeleton, Box, TextField, Autocomplete } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { createFilterOptions } from "@mui/material/Autocomplete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CustomPopper } from "../popper";
import ExtraFields from "./extraFields";
import config from "../../config.json";

const CardForm = (props) => {
  console.log("props inside Cardform", props);
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

  useEffect(() => {
    console.log(extraFields);
  }, [extraFields]);

  const filter = createFilterOptions();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setErrorMessage("");

    if (!file.type.match("image/*")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const clipboardData = event.clipboardData || window.clipboardData;

    if (!clipboardData || !clipboardData.items) {
      return;
    }

    const pastedItem = clipboardData.items[0];

    if (pastedItem.type.indexOf("image/") !== -1) {
      const pastedFile = pastedItem.getAsFile();

      if (!pastedFile.type.match("image/*")) {
        setErrorMessage("Please paste a valid image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(pastedFile);
    } else {
      setErrorMessage("Please paste an image.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      if (!file.type.match("image/*")) {
        setErrorMessage("Please drop a valid image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      title,
      description: description,
      labels: selectedLabels,
      image: previewImage,
      extraFields,
      cardUuid: cardDetails?.cardUuid,
    };
    const url = `${window._env_.CODE_SNIPPETS_BACKEND}/card`;
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("datat", data);
        if (data.success === true) {
          refresh(true);
          setModalOpen(false);
        } else {
          setErrorMessage(data?.error || data?.message);
        }
      })
      .catch((error) => {
        console.error("Error occured while saving card", error);
        setErrorMessage(error.message);
      });
  };

  const popperClickHandler = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopperOpen((prev) => popperPlacement !== newPlacement || !prev);
    setPopperPlacement(newPlacement);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-root">
        <div className="form-body">
          <div className="form-section2">
            <TextField id="title" label="" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter titles" />
            {/* <Autocomplete
              popupIcon={<ExpandMoreRoundedIcon />}
              disablePortal
              id="combo-box-demo"
              options={category}
              sx={{ width: 300 }}
              value={description}
              onChange={(event, value) => setDescription(value)}
              renderInput={(params) => <TextField {...params} label="" placeholder="Select category" />}
            /> */}
            <TextField id="description" label="" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter description" />
            {/* <TextField id="display-order" label="" type="number" value={displayOrder} onChange={(event) => setDisplayOrder(event.target.value)} placeholder="Enter display order" /> */}
          </div>
          <Autocomplete
            multiple
            limitTags={3}
            value={selectedLabels}
            onChange={(event, newValue) => {
              setSelectedLabels(
                newValue.map((option) => {
                  if (typeof option === "string") {
                    return option;
                  } else if (option && option.inputValue) {
                    return option.inputValue;
                  } else {
                    return option;
                  }
                })
              );
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option);
              if (inputValue !== "" && !isExisting) {
                filtered.push({ inputValue, title: `Add "${inputValue}"` });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={labels}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title ?? option}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="" placeholder="Select labels" />}
          />
          <div style={{ display: "flex", margin: "3em auto", gap: "20px" }}>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="drop-zone">
              <CloudUploadOutlinedIcon style={{ height: "80px", width: "128px" }} />
              <span>Drag & Drop</span>
              <input type="file" id="image-upload" onChange={handleFileChange} />
              <label htmlFor="image-upload">Upload Image</label>
              <div className="paste-container" onPaste={handlePaste}>
                (Ctrl+V)
              </div>
            </div>
            <Divider />
            {previewImage ? (
              <img className="preview" src={previewImage} alt="Preview" />
            ) : (
              <>
                <Box>
                  <div className="preview-skeleton">
                    <Skeleton variant="rectangular" />
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        opacity: "0.2",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <ImageOutlinedIcon style={{ height: "80px", width: "80px" }} />
                      <span>Preview</span>
                    </div>
                  </div>
                </Box>
              </>
            )}
          </div>

          <ExtraFields extraFields={extraFields} setExtraFields={setExtraFields} />

          <div className="text-btn-root" onClick={popperClickHandler("top-start")}>
            {isPopperOpen && <CustomPopper anchorEl={anchorEl} isPopperOpen={isPopperOpen} popperPlacement={popperPlacement} setExtraFields={setExtraFields} />}
            <AddRoundedIcon />
            <button className="text-btn" type="button">
              Add More
            </button>
          </div>
        </div>

        <button type="submit" className="save-card-btn">
          {action === "new" ? "Create Card" : "Update Card"}
        </button>
        {errorMessage ? <p className="error-message">Error: {errorMessage}</p> : <p className="error-message"></p>}
      </div>
    </form>
  );
};

export default CardForm;
