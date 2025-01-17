/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,react/require-default-props */
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import cc from "classcat";
import useMountTransition from "./useMountTransition";
import useLockBodyScroll from "../hooks/useLockBodyScroll";

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

  const handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      onUserDismiss();
    }
    if (!showControls) return;
    if (isHorizontal) {
      if (key === "ArrowRight") {
        onNext && onNext();
      }
      if (key === "ArrowLeft") {
        onPrev && onPrev();
      }
    } else {
      if (key === "ArrowDown") {
        onNext && onNext();
      }
      if (key === "ArrowUp") {
        onPrev && onPrev();
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;
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
      className={`drawer drawer--${position} navigation  ${
        isOpen && isTransitioning ? `navigation--open--${position}` : ""
      }`}
      data-testid={testId}
    >
      <div className={`navigation-container--${position}`}>
        <div
          className={`navigation-button navigation-button--${position} alignChild--center--center`}
          onClick={onUserDismiss}
        >
          <span className="narmi-icon-x clickable fontSize--heading3" />
        </div>
        <div
          className={isHorizontal ? "margin--right--xl" : "margin--bottom--xl"}
        />
        {showControls && (
          <>
            <div
              className={cc([
                `navigation-button navigation-button--${position} alignChild--center--center`,
                {
                  // Navigation buttons on vertical drawers are the opposite compared to
                  // horizontal ones due to the order of navigation buttons being the opposite
                  // (rows are reversed in parent divs for horizontal drawers)
                  "navigation-button--disabled": isHorizontal
                    ? onNext == null
                    : onPrev == null,
                },
              ])}
              onClick={isHorizontal ? onNext : onPrev}
            >
              <span
                className={`narmi-icon-chevron-${
                  isHorizontal ? "right" : "up"
                } fontSize--heading3`}
              />
            </div>
            <div
              className={cc([
                `navigation-button navigation-button--${position} alignChild--center--center`,
                {
                  "navigation-button--disabled": isHorizontal
                    ? onPrev == null
                    : onNext == null,
                },
              ])}
              onClick={isHorizontal ? onPrev : onNext}
            >
              <span
                className={`narmi-icon-chevron-${
                  isHorizontal ? "left" : "down"
                } fontSize--heading3`}
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
      className={`drawer drawer--${position} ${
        isOpen && isTransitioning ? `drawer--open--${position}` : ""
      }`}
      role="dialog"
      data-testid={testId}
    >
      {children}
    </div>
  );

  // the shim has events for mouse users only; does not require a role
  /* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
  const drawerJSX = (
    <div className="drawerContainer">
      <div
        ref={shimRef}
        className={cc([
          "backdrop",
          { "backdrop--open": isOpen && isTransitioning },
        ])}
        onClick={handleShimClick}
      />
      {navigationContainerJSX}
      {childrenJSX}
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
  isOpen: PropTypes.bool,
  /**
   * Callback to handle user taking an action to dismiss the modal
   * (click outside, Escape key, click close button)
   */
  onUserDismiss: PropTypes.func,
  /**
   * Callback to handle user taking an action to go to the next element
   * (click on the next arrow, right/down arrow key)
   */
  onNext: PropTypes.func,
  /**
   * Callback to handle user taking an action to go to the previous element
   * (click on the previous arrow, left/up arrow key)
   */
  onPrev: PropTypes.func,
  /**
   * Sets how far the drawer opens out (width or height).
   * Use the full CSS value with the percentage (e.g. `"400px"` or `"70%"`)
   */
  depth: PropTypes.string,
  /**
   * Determines whether the next and prev buttons show.
   */
  showControls: PropTypes.bool,
  /**
   * Sets the position from which the drawers open.
   * Valid values are `right`, `left`, `bottom`, `top`.
   */
  position: PropTypes.oneOf(["right", "left", "top", "bottom"]),
  /** Optional value for `data-testid` attribute */
  testId: PropTypes.string,
};

export default Drawer;
