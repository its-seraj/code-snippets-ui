import { GlobalStyles as GB } from "@mui/material";

export const GlobalStyles = (
  <GB
    styles={{
      ".menu": {
        backgroundColor: "var(--background) !important",
        backgroundImage: "var(--input-bg-image)",
        width: "40vw !important",
        marginTop: "2rem",
        borderRadius: "8px !important",
        ".MuiInputBase-root": {
          width: "100% !important",
          overflow: "hidden !important",
          "& input": {
            width: "100%",
            "& :hover, :focus, :active": {
              width: "100%",
            },
          },
        },
      },
      ".MuiChip-root": {
        color: "var(--label-color) !important",
        backgroundColor: "var(--label-background) !important",
        height: "24px !important",
        fontWeight: "500",
        "& .MuiChip-label": {
          paddingBottom: "2px",
        },
      },
      ".MuiBox-root": {
        width: "260px",
        position: "relative",
      },
      ".MuiTextField-root": {
        width: "100% !important",
        "& .MuiOutlinedInput-root": {
          display: "flex",
          alignItems: "flex-start",
          gap: "5px",
          height: "40px",
          padding: "9px",
          fontSize: "14px !important",
          letterSpacing: "1px",
          fontFamily: "'Fira Code', monospace",
          color: "var(--title-color)",
          backgroundColor: "var(--background) !important",
          "&:hover, &:active, &:focus": {
            "& fieldset": {
              border: "1px solid var(--border) !important",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "0 !important",
          },
          "& .MuiChip-root": {
            height: "20px !important",
            margin: "0 !important",
            color: "var(--label-color) !important",
            backgroundColor: "var(--label-background) !important",
            "& .MuiChip-label": {
              paddingBottom: "0 !important",
              fontWeight: "bold",
            },
            "& .MuiChip-deleteIcon": {
              height: "14px",
              width: "14px",
              color: "var(--title-color) !important",
            },
          },
          "& .MuiAutocomplete-endAdornment svg": {
            color: "var(--title-color) !important",
          },
        },
        "& fieldset": {
          height: "40px",
          border: "1px solid var(--border) !important",
          "&:hover, &:active, &:focus": {
            height: "40px !important",
          },
        },
      },
      ".MuiAutocomplete-root": {
        width: "100% !important",
      },
      ".MuiAutocomplete-popper": {
        borderRadius: "4px",
        backgroundColor: "var(--skeleton-background)",
        ".MuiPaper-root": {
          color: "var(--title-color) !important",
          backgroundColor: "transparent",
          "& .MuiAutocomplete-listbox": {
            padding: "4px",
            "& .MuiAutocomplete-option": {
              borderRadius: "4px",
              "&:hover, &:focus": {
                backgroundColor: "var(--background)",
              },
            },
          },
        },
      },
      ".base-Popper-root": {
        "& .MuiPaper-root": {
          backgroundColor: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        },
      },
      ".editor": {
        "& .MuiOutlinedInput-root": {
          alignItems: "center",
          opacity: "0.5",
          "& .MuiInputAdornment-root": {
            height: "1.5em",
            width: "1.5em",
            "& svg": {
              height: "100%",
              width: "100%",
              color: "var(--title-color)",
            },
          },
          "& fieldset": {
            borderStyle: "dashed !important",
          },
          "&:hover, &:active, &focus": {
            "& fieldset": {
              borderStyle: "dashed !important",
            },
          },
        },
      },
    }}
  />
);
