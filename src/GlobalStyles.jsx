import { GlobalStyles as GB } from "@mui/material";

export const GlobalStyles = (
  <GB
    styles={{
      ".menu": {
        width: "40vw !important",
        marginTop: "2rem",
        "& .MuiInputAdornment-root": {},
        ".MuiInputBase-root": {
          width: "100% !important",
          overflow: "hidden !important",
          alignItems: "center !important",
          borderRadius: "8px !important",
          "& input": {
            width: "100%",
            "& :hover, :focus, :active": {
              width: "100%",
            },
          },
          "& svg": {
            color: "var(--title-color)",
          },
        },
      },
      ".admin-menu-root": {
        position: "absolute",
        left: "0",
        top: "5vh",
        zIndex: "1301",
        "& .MuiIconButton-root": {
          marginLeft: "-4px",
          padding: "4px",
          borderRadius: "0 8px 8px 0",
          border: "1px solid var(--border)",
          borderLeft: "none",
          backgroundColor: "var(--background)",
          "&:hover, &:focus": {
            // borderBottom: "none !important",
            backgroundColor: "var(--background)",
          },
        },
        "& .MuiIconButton-root[aria-expanded=true]": {
          borderBottomRightRadius: "0",
          borderBottom: "none",
        },
        "& svg": {
          color: "var(--title-color)",
          opacity: "0.5",
        },
      },
      ".admin-menu": {
        "& .MuiMenu-paper": {
          left: "0 !important",
          marginTop: "-1.5px",
          color: "var(--title-color)",
          border: "1px solid var(--border)",
          borderLeft: "none",
          borderRadius: "0 8px 8px 0",
          backgroundColor: "var(--background) !important",
          "& .MuiMenu-list": {
            display: "grid",
            // gap: "10px",
            padding: "4px",
          },
          "& .MuiMenuItem-root": {
            padding: "10px",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "'Fira Code', monospace",
            borderRadius: "8px",
            gap: "1em",
            opacity: "0.5",
            "& svg": {
              height: "0.9em",
              width: "0.9em",
            },
            "&:hover": {
              opacity: "0.8",
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
      ".root-divider": {
        width: "100%",
        backgroundColor: "var(--border) !important",
      },
      ".login-modal-root": {
        "& .MuiTextField-root": {
          width: "200px !important",
          "& .MuiOutlinedInput-root": {
            letterSpacing: "10px",
            "& .MuiOutlinedInput-input": {
              textAlign: "center !important",
            },
          },
          "& fieldset": {
            padding: "0",
            width: "200px !important",
          },
        },
      },
    }}
  />
);
