import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools.js";

import ace from "ace-builds/src-min-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/");
// ace.config.setModuleUrl("ace/mode/javascript_worker", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js");

export const Editor = (props) => {
  return (
    AceEditor && (
      <AceEditor
        mode={props.mode}
        theme={props.dark ? "monokai" : "github"}
        onChange={props.onChange}
        fontSize={13}
        fontFamily='"JetBrains Mono", "Fira Code", monospace'
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={false}
        value={props.value}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: false,
          tabSize: 2,
          readOnly: !props.editable,
          minLines: 1,
          maxLines: props.maxLines || Infinity,
        }}
        style={{ boxSizing: "unset" }}
      />
    )
  );
};
