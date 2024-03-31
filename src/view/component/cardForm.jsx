import { useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Divider, Skeleton, Box, TextField, Autocomplete } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { createFilterOptions } from "@mui/material/Autocomplete";

const CardForm = (props) => {
  const { action } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(["option1", "option2", "option3"]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [displayOrder, setDisplayOrder] = useState();
  const [selectedLabels, setSelectedLabels] = useState([]);

  const filter = createFilterOptions();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
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

      setSelectedFile(pastedFile); // Optional: Store pasted file for further use
    } else {
      setErrorMessage("Please paste an image.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Please select or paste an image.");
      return;
    }

    const requestBody = {
      title,
      category: selectedCategory,
      displayOrder,
      labels: selectedLabels,
      image: previewImage,
    };
    const url = "http://127.0.0.1:3000/card";
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
        } else {
          setErrorMessage(data?.error || data?.message);
        }
      })
      .catch((error) => {
        console.error("Error occured while saving card", error);
        setErrorMessage(error.message);
      });
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

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-root">
        <TextField id="title" label="" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter titles" />
        <div className="form-section2">
          <Autocomplete
            popupIcon={<ExpandMoreRoundedIcon />}
            disablePortal
            id="combo-box-demo"
            options={category}
            sx={{ width: 300 }}
            value={selectedCategory}
            onChange={(event, value) => setSelectedCategory(value)}
            renderInput={(params) => <TextField {...params} label="" placeholder="Select category" />}
          />
          <TextField id="display-order" label="" type="number" value={displayOrder} onChange={(event) => setDisplayOrder(event.target.value)} placeholder="Enter display order" />
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
          options={category}
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
        <div style={{ display: "flex", marginTop: "3em", gap: "20px" }}>
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
                <Skeleton className="preview-skeleton" variant="rectangular" />
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
              </Box>
            </>
          )}
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
