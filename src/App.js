import React from "react";
import cx from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Button } from "react-bootstrap";

import {
  NavigationProvider,
  NAVIGATION_DIRECTION,
  useNavigation,
} from "./context/navigation";
import "./styles.scss";

const NOTIFICATION_TYPE = {
  LIKE: "like",
  COMMENT: "comment",
};

const notifications = [
  { id: 1, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 1" },
  { id: 2, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 2" },
  { id: 3, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 3" },
  { id: 4, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 4" },
  { id: 5, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 5" },
  { id: 6, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 6" },
  { id: 7, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 7" },
  { id: 8, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 8" },
  { id: 9, type: NOTIFICATION_TYPE.COMMENT, message: "Lorem ipsum 9" },
  { id: 10, type: NOTIFICATION_TYPE.LIKE, message: "Lorem ipsum 10" },
];

function App() {
  return (
    <NavigationProvider>
      <Main />
    </NavigationProvider>
  );
}

function Main() {
  const {
    currentIndex,
    navDirection,
    moveToPrev,
    moveToNext,
  } = useNavigation();

  const handlePrevClick = () => {
    moveToPrev();
  };

  const handleNextClick = () => {
    moveToNext();
  };

  const notification = notifications[currentIndex];
  const { message, type } = notification;

  const isDisabledPrev = currentIndex === 0;
  const isDisabledNext = currentIndex === notifications.length - 1;

  return (
    <div className="app">
      <main>
        <Header>
          <HeaderContent
            type={type}
            message={message}
            currentIndex={currentIndex}
            navDirection={navDirection}
          />
        </Header>
        <Button
          className="prev-btn"
          onClick={handlePrevClick}
          disabled={isDisabledPrev}
        >
          ⬅️ Prev
        </Button>
        <Button onClick={handleNextClick} disabled={isDisabledNext}>
          Next ➡️{" "}
        </Button>
      </main>
    </div>
  );
}

function Header({ children }) {
  return <header className="header">{children}</header>;
}

function HeaderContent({ type, message, currentIndex, navDirection }) {
  return (
    <div
      className={cx("header__content", {
        "header__content--is-next": navDirection === NAVIGATION_DIRECTION.NEXT,
        "header__content--is-prev": navDirection === NAVIGATION_DIRECTION.PREV,
      })}
    >
      <TransitionGroup className="header__inner">
        <CSSTransition
          key={`${currentIndex}-title`}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade-title"
        >
          <div>
            <span className="header__title">{message}</span>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
