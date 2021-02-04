import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Button } from "react-bootstrap";
import "./styles.css";

export default function App() {
  const [state, setState] = React.useState(true);
  return (
    <>
      <div className="main">
        <SwitchTransition>
          <CSSTransition
            key={state}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="button-container">
              <Button
                className="btn"
                onClick={() => setState((state) => !state)}
              >
                {state ? "Hello, world!" : "Goodbye, world!"}
              </Button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}
