import { TextField, InputAdornment } from "@mui/material";
import { CodeSandboxIcon } from "./../../assets/codesandbox";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import { Editor } from "./AceEditor.jsx";
import { useTheme } from "../../ThemeProvider.jsx";
import { debounce } from "../helper/debounce";

const ExtraFields = (props) => {
  const { extraFields, setExtraFields } = props;

  const { theme } = useTheme();

  /* const debouncedSetValue = debounce((option, value, index) => {
    setExtraFields((prev) => {
      const updatedOption = [...prev[option]];
      updatedOption[index] = { ...updatedOption[index], value: value };
      return { ...prev, [option]: updatedOption };
    });
    console.log(extraFields);
  }, 500); */

  const onChangeHandler = (option, value, index) => {
    setExtraFields((prev) => {
      const updatedOption = [...prev[option]];
      updatedOption[index] = { ...updatedOption[index], value: value };
      return { ...prev, [option]: updatedOption };
    });
  };

  return (
    <>
      {Object.keys(extraFields).length && extraFields["Editor"] ? (
        <div className="form-ace-editor">
          {extraFields["Editor"].map((currEditor, index) => (
            <>
              <div>
                <Editor
                  mode="javascript"
                  dark={theme === "dark"}
                  // onChange={(e) => {
                  //    updatejsValue(e);
                  // }}
                  editable={true}
                  value={`const a = 'String'\nfunction yell`}
                  maxLines={10}
                />
              </div>
            </>
          ))}
        </div>
      ) : (
        <></>
      )}
      {Object.keys(extraFields).length && extraFields["CodeSandbox"] ? (
        extraFields["CodeSandbox"].map((currEditor, index) => (
          <>
            <TextField
              className="editor"
              label=""
              value={currEditor?.value}
              onChange={(event) => onChangeHandler("Editor", event.target.value, index)}
              placeholder="Embed URL"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <CodeSandboxIcon />
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </>
        ))
      ) : (
        <></>
      )}
      {Object.keys(extraFields).length && extraFields["URL's"] ? (
        extraFields["URL's"].map((currEditor, index) => (
          <>
            <TextField
              className="editor"
              label=""
              value={currEditor?.value}
              onChange={(event) => onChangeHandler("Editor", event.target.value, index)}
              placeholder="Enter URL"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <InsertLinkRoundedIcon />
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ExtraFields;
