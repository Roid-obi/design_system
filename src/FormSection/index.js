import React from "react";
import PropTypes from "prop-types";
import Row from "../Row";

/**
 * A sectioning element for forms that renders a label and line above the section
 */
const FormSection = ({ title, children }) => (
  <div className="nds-formSection padding--bottom">
    <Row alignItems="center" gapSize="xs">
      <Row.Item shrink>
        <h3 className="fontColor--secondary fontSize--xs">{title}</h3>
      </Row.Item>
      <Row.Item>
        <div style={{ width: "100%", height: "var(--space-l)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height="var(--space-l)"
            width="100%"
          >
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="var(--font-color-hint)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </Row.Item>
    </Row>
    <div className="padding--top">
      {children}
    </div>
  </div>
);

FormSection.propTypes = {
  /** Title of form section */
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default FormSection;