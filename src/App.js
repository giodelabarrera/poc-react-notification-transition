import React, { useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Alert, Button } from "react-bootstrap";
import "./styles.css";

const NOTIFICATION_TYPE = {
  LIKE: "like",
  COMMENT: "comment",
};

const notifications = [
  { id: 1, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 0" },
  { id: 2, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 1" },
  { id: 3, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 2" },
  { id: 4, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 3" },
  { id: 5, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 4" },
  { id: 6, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 5" },
  { id: 7, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 6" },
  { id: 8, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 7" },
  { id: 9, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 8" },
  { id: 10, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 9" },
  { id: 11, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 10" },
  { id: 12, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 11" },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
  };

  const notification = notifications[currentIndex];

  return (
    <div className="app">
      <main>
        <Header>
          <SwitchTransition>
            <CSSTransition
              key={currentIndex}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <div className="item-container">
                <Item message={notification.message} />
              </div>
            </CSSTransition>
          </SwitchTransition>
        </Header>

        <Button onClick={handleNextClick}>Next</Button>
      </main>
    </div>
  );
}

function Header({ children }) {
  return <header>{children}</header>;
}

function Item({ message }) {
  return <p className="item">{message}</p>;
}

export default App;
