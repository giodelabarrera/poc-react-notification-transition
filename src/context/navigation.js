import React, { useState, useContext } from "react";

const NavigationContext = React.createContext();

const NAVIGATION_DIRECTION = {
  PREV: "prev",
  NEXT: "next",
};

function NavigationProvider({ children, initialCurrentIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialCurrentIndex);
  const [navDirection, setNavDirection] = useState(null);

  const moveToPrev = () => {
    setNavDirection(NAVIGATION_DIRECTION.PREV);
    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex - 1);
  };

  const moveToNext = () => {
    setNavDirection(NAVIGATION_DIRECTION.NEXT);
    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
  };

  const value = {
    currentIndex,
    navDirection,
    moveToPrev,
    moveToNext,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

export { NavigationProvider, useNavigation, NAVIGATION_DIRECTION };
