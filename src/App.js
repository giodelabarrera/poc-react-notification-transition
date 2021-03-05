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
      <TransitionGroup className="header__icon">
        <CSSTransition
          key={`${currentIndex}-icon`}
          // addEndListener={(node, done) => {
          //   node.addEventListener("transitionend", done, false);
          // }}
          timeout={{
            appear: 0,
            enter: 850,
            exit: 850,
          }}
          classNames="fade-icon"
        >
          <div>
            <svg fill="blue" className="header__icon-svg" viewBox="0 0 24 24">
              {type === NOTIFICATION_TYPE.LIKE && (
                <path
                  fillRule="evenodd"
                  d="M12.001 19c-1.106 0-6.507-4.06-7.72-7.952A4.522 4.522 0 0 1 4 9.502C4 7.02 6.03 5 8.527 5 9.875 5 11.14 5.594 12 6.61A4.536 4.536 0 0 1 15.47 5C17.967 5 20 7.02 20 9.502c0 .504-.09 1.01-.268 1.504-1.197 4.011-6.57 7.994-7.73 7.994z"
                ></path>
              )}
              {type === NOTIFICATION_TYPE.COMMENT && (
                <path
                  fillRule="evenodd"
                  d="M5 7.173C5 5.973 5.897 5 7.006 5h9.988C18.102 5 19 5.982 19 7.173v7.654c0 1.2-.897 2.173-2.006 2.173H7.006C5.898 17 5 16.018 5 14.827V7.173zM8 17h5l-5 3v-3z"
                ></path>
              )}
            </svg>
            <span className="header__icon-first-wave"></span>
            <span className="header__icon-second-wave"></span>
          </div>
        </CSSTransition>
      </TransitionGroup>
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
