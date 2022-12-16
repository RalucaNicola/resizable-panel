import "./ResizablePanel.css";
import {useRef, useEffect} from "react";

function ResizablePanel({title, children}) {
  const ref = useRef(null);
  const refResizer = useRef(null);

  useEffect(() => {
    const resizablePanel = ref.current;

    const onMouseMoveResize = event => {
      let height = document.body.clientHeight - resizablePanel.style.bottom - event.clientY;
      resizablePanel.style.height = `${height}px`;
    };

    const onMouseUpResize = event => {
      let height = document.body.clientHeight - resizablePanel.style.bottom - event.clientY;
      if (height < 250) {
        height = 100;
      }
      resizablePanel.style.height = `${height}px`;

      document.removeEventListener("mousemove", onMouseMoveResize);
      document.removeEventListener("mouseup", onMouseUpResize);
    };

    const onMouseDownResize = event => {
      document.addEventListener("mousemove", onMouseMoveResize);
      document.addEventListener("mouseup", onMouseUpResize);
    };

    const resizer = refResizer.current;
    resizer.addEventListener("mousedown", onMouseDownResize);
    console.log("running this only once?");

    return () => {
      console.log("cleaning up");
      resizer.removeEventListener("mousedown", onMouseDownResize);
    };
  }, []);

  return (
    <div className="resizable-panel" ref={ref}>
      <div className="resizer" ref={refResizer}>
        <div className="resizer-handle"></div>
      </div>
      <div className="container">
        <h1>{title}</h1>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default ResizablePanel;
