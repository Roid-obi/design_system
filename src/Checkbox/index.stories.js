import React, { useState } from "react";
import Checkbox from "./";

const Template = (args) => <Checkbox {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  label: "I agree to receive spam",
  name: "spam",
};

export const FullyControlled = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox
      label="Make deposits"
      name="deposit"
      checked={isChecked}
      onChange={() => setIsChecked((isChecked) => !isChecked)}
    />
  );
};
FullyControlled.parameters = {
  docs: {
    description: {
      story:
        "When passing `checked`, the input becomes fully controlled and you must use the `onChange` callback to update the value of `checked`.",
    },
  },
};

export const MultipleCheckboxes = () => (
  <>
    <h3 className="margin--bottom">Permissions</h3>
    <Checkbox label="See statements and documents" name="view" />
    <Checkbox label="Make deposits" name="deposit" />
    <Checkbox label="Make withdraws" name="widthdraw" />
  </>
);

export const AsCard = Template.bind({});
AsCard.args = {
  label: "Checkbox of 'card' kind",
  name: "card_kind",
  kind: "card",
};
AsCard.parameters = {
  docs: {
    description: {
      story: "Renders a checkbox input and label styled as a card",
    },
  },
};

export const markdown = Template.bind({});
markdown.args = {
  markdownLabel: "I agree to receive spam from [google](https://www.google.com/)",
  name: "spam",
};
markdown.parameters = {
  docs: {
    description: {
      story: "Renders markdown when markdownLabel prop is set"
    }
  }
}

export default {
  title: "Components/Checkbox",
  component: Checkbox,
};
