import { GlobalStyles as GB } from "@mui/material";

export const GlobalStyles = (
  <GB
    styles={{
      /* ── MUI Chip ─────────────────────────────────────────────────────────── */
      ".MuiChip-root": {
        color: "var(--label-color) !important",
        backgroundColor: "var(--label-background) !important",
        height: "22px !important",
        fontSize: "11.5px !important",
        fontWeight: "500 !important",
        fontFamily: "'Inter', sans-serif !important",
        borderRadius: "6px !important",
        "& .MuiChip-label": {
          paddingBottom: "1px",
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      },

      /* ── MUI TextField ────────────────────────────────────────────────────── */
      ".MuiTextField-root": {
        width: "100% !important",
        "& .MuiOutlinedInput-root": {
          display: "flex",
          alignItems: "flex-start",
          gap: "5px",
          height: "40px",
          padding: "9px 12px",
          fontSize: "13.5px !important",
          letterSpacing: "0.1px",
          fontFamily: "'Inter', sans-serif !important",
          color: "var(--title-color)",
          backgroundColor: "var(--background-secondary) !important",
          borderRadius: "9px !important",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--border-strong) !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--accent) !important",
            borderWidth: "1px !important",
          },
          "& .MuiOutlinedInput-input": {
            padding: "0 !important",
          },
          "& .MuiChip-root": {
            height: "20px !important",
            margin: "0 !important",
            fontSize: "11px !important",
            borderRadius: "5px !important",
            color: "var(--label-color) !important",
            backgroundColor: "var(--label-background) !important",
            "& .MuiChip-label": {
              paddingBottom: "0 !important",
              fontWeight: "500",
            },
            "& .MuiChip-deleteIcon": {
              height: "13px",
              width: "13px",
              color: "var(--text-muted) !important",
            },
          },
          "& .MuiAutocomplete-endAdornment svg": {
            color: "var(--text-muted) !important",
          },
          "& svg": {
            color: "var(--text-muted) !important",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid var(--border) !important",
          borderRadius: "9px !important",
        },
        "& fieldset": {
          border: "1px solid var(--border) !important",
          borderRadius: "9px !important",
        },
      },

      /* ── MUI Autocomplete ─────────────────────────────────────────────────── */
      ".MuiAutocomplete-root": {
        width: "100% !important",
      },
      ".MuiAutocomplete-popper": {
        borderRadius: "10px !important",
        overflow: "hidden",
        ".MuiPaper-root": {
          color: "var(--title-color) !important",
          backgroundColor: "var(--popper-background) !important",
          border: "1px solid var(--border-strong)",
          borderRadius: "10px !important",
          boxShadow: "var(--box-shadow-lg) !important",
          "& .MuiAutocomplete-listbox": {
            padding: "6px",
            "& .MuiAutocomplete-option": {
              borderRadius: "6px",
              fontSize: "13.5px",
              fontFamily: "'Inter', sans-serif",
              minHeight: "36px",
              "&:hover, &:focus, &[aria-selected=true]": {
                backgroundColor: "var(--btn-hover) !important",
              },
            },
          },
        },
      },

      /* ── MUI Box ──────────────────────────────────────────────────────────── */
      ".MuiBox-root": {
        width: "260px",
        position: "relative",
      },

      /* ── Base Popper ──────────────────────────────────────────────────────── */
      ".base-Popper-root": {
        "& .MuiPaper-root": {
          backgroundColor: "var(--popper-background)",
          border: "1px solid var(--border-strong)",
          borderRadius: "10px",
          boxShadow: "var(--box-shadow-lg)",
        },
      },

      /* ── Editor Field (dashed) ────────────────────────────────────────────── */
      ".editor": {
        "& .MuiOutlinedInput-root": {
          alignItems: "center",
          "& .MuiInputAdornment-root": {
            height: "1.4em",
            width: "1.4em",
            "& svg": {
              height: "100%",
              width: "100%",
              color: "var(--text-muted) !important",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderStyle: "dashed !important",
          },
        },
      },


      /* ── Login modal ──────────────────────────────────────────────────────── */
      ".login-modal-root": {
        "& .MuiTextField-root": {
          width: "260px !important",
          "& .MuiOutlinedInput-root": {
            letterSpacing: "10px",
            "& .MuiOutlinedInput-input": {
              textAlign: "center !important",
            },
          },
          "& fieldset": {
            padding: "0",
            width: "260px !important",
          },
        },
      },

      /* ── MUI Modal backdrop ───────────────────────────────────────────────── */
      ".MuiModal-backdrop": {
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0,0,0,0.45) !important",
      },

      /* ── MUI Divider ──────────────────────────────────────────────────────── */
      ".root-divider": {
        width: "100%",
        borderColor: "var(--border) !important",
      },
    }}
  />
);
