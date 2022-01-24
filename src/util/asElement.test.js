import React from "react";
import { render } from "@testing-library/react";
import AsElement from "./AsElement";

describe("AsElement", () => {
  it("renders the given element", () => {
    const elementType = "p";
    render(<AsElement elementType={elementType} />);
    expect(document.querySelector(elementType)).toBeInTheDocument();
  });
  it("passes through any additional props", () => {
    const elementType = "p";
    const testClass = "color--azul";
    const { container } = render(
      <AsElement elementType={elementType} className={testClass} />
    );
    expect(document.querySelector(elementType)).toHaveClass(testClass);
  });
});