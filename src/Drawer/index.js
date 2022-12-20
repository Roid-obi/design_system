/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import cc from "classcat";
import useMountTransition from "./useMountTransition";
import useLockBodyScroll from "./useLockBodyScroll";

const noop = () => {};

/**
 * Renders an animated drawer dialog with an overlay that
 * allows navigation between multiple contents
 *
 * This component uses a `ReactDOM` portal to render it as a direct
 * child of `document.body`.
 */
const Drawer = ({
  isOpen = false,
  onUserDismiss = noop,
  onNext = null,
  onPrev = null,
  showControls = true,
  children,
  position = "right",
  depth = "70%",
  testId,
}) => {
  const shimRef = useRef(null);
  const navRef = useRef(null);

  const isTransitioning = useMountTransition(isOpen, 300);
  const isHorizontal = position === "bottom" || position === "top";
  // The depth is how far the drawer opens out, but the CSS prop depends
  // on whether the Drawer is vertical or not
  const depthStyle = isHorizontal ? { height: depth } : { width: depth };
  useLockBodyScroll(isOpen);

  // Navigation buttons on vertical drawers are the opposite compared to
  // horizontal ones due to the order of navigation buttons being the opposite
  //(rows are reversed in parent divs for horizontal drawers)
  const prevOrNext = (opposite = false) => {
    if (isHorizontal) {
      if (opposite) return onPrev;
      return onNext;
    }
    if (opposite) return onNext;
    return onPrev;
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      onUserDismiss();
    }
    if (isHorizontal) {
      if (key === "ArrowRight") {
        prevOrNext() && prevOrNext()();
      }
      if (key === "ArrowLeft") {
        prevOrNext(true) && prevOrNext(true)();
      }
    } else {
      if (key === "ArrowDown") {
        prevOrNext(true) && prevOrNext(true)();
      }
      if (key === "ArrowUp") {
        prevOrNext() && prevOrNext()();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  const handleShimClick = ({ target }) => {
    if (
      (navRef.current && target === navRef.current) ||
      (shimRef.current && target === shimRef.current)
    ) {
      onUserDismiss();
    }
  };

  /* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
  const navigationContainerJSX = (
    <div
      ref={navRef}
      onClick={handleShimClick}
      style={depthStyle}
      className={cc([
        `drawer navigation ${position}`,
        {
          open: isOpen,
          in: isTransitioning,
        },
      ])}
      data-testid={testId}
    >
      <div
        className={cc(`navigation-container ${position}`, {
          open: isOpen,
          in: isTransitioning,
        })}
      >
        <div
          className={`navigation-button ${position} alignChild--center--center`}
          onClick={onUserDismiss}
        >
          <span className="narmi-icon-x clickable" />
        </div>
        <div
          className={isHorizontal ? "margin--right--l" : "margin--bottom--l"}
        />
        {showControls && (
          <>
            <div
              className={`navigation-button ${position} alignChild--center--center ${
                prevOrNext() !== null ? "clickable" : "disabled"
              }`}
              onClick={prevOrNext() !== null ? prevOrNext() : undefined}
            >
              <span
                className={`narmi-icon-chevron-${
                  isHorizontal ? "right" : "up"
                }`}
              />
            </div>
            <div
              className={`navigation-button ${position} alignChild--center--center ${
                prevOrNext(true) !== null ? "clickable" : "disabled"
              }`}
              onClick={prevOrNext(true) !== null ? prevOrNext(true) : undefined}
            >
              <span
                className={`narmi-icon-chevron-${
                  isHorizontal ? "left" : "down"
                }`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const childrenJSX = (
    <div
      style={depthStyle}
      className={cc(["drawer", position])}
      role="dialog"
      data-testid={testId}
    >
      {children}
    </div>
  );

  // the shim has events for mouse users only; does not require a role
  /* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
  const drawerJSX = (
    <div
      className={cc([
        "drawer-container",
        {
          open: isOpen,
          in: isTransitioning,
        },
      ])}
    >
      {childrenJSX}
      {navigationContainerJSX}
      <div ref={shimRef} className="backdrop" onClick={handleShimClick} />
    </div>
  );

  if (!isTransitioning && !isOpen) {
    return null;
  }
  return <>{document && ReactDOM.createPortal(drawerJSX, document.body)}</>;
};

Drawer.propTypes = {
  /** Scrollable contents of the Drawer */
  children: PropTypes.node.isRequired,

  /** Controls open/close state of the modal. Use the `onUserDismiss` callback to update. */
  // eslint-disable-next-line react/require-default-props
  isOpen: PropTypes.bool,
  /**
   * Callback to handle user taking an action to dismiss the modal
   * (click outside, Escape key, click close button)
   */
  // eslint-disable-next-line react/require-default-props
  onUserDismiss: PropTypes.func,
  /**
   * Callback to handle user taking an action to go to the next element
   * (click on the next arrow, right/down arrow key)
   */
  // eslint-disable-next-line react/require-default-props
  onNext: PropTypes.func,
  /**
   * Callback to handle user taking an action to go to the previous element
   * (click on the previous arrow, left/up arrow key)
   */
  // eslint-disable-next-line react/require-default-props
  onPrev: PropTypes.func,
  /**
   * Sets how far the drawer opens out (width or height).
   * Use the full CSS value with the percentage (e.g. `"400px"` or `"70%"`)
   */
  // eslint-disable-next-line react/require-default-props
  depth: PropTypes.string,
  /**
   * Determines whether the next and prev buttons show.
   */
  // eslint-disable-next-line react/require-default-props
  showControls: PropTypes.bool,
  /**
   * Sets the position from which the drawers open.
   * Valid values are `right`, `left`, `bottom`, `top`.
   */
  // eslint-disable-next-line react/require-default-props
  position: PropTypes.oneOf(["right", "left", "top", "bottom"]),
  /** Optional value for `data-testid` attribute */
  // eslint-disable-next-line react/require-default-props
  testId: PropTypes.string,
};

export default Drawer;