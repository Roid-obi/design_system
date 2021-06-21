import React from "react";
import Card from "components/Card";
import Typography from "components/Typography";
import Button from "components/Button";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Centered } from "../../decorators";

export default {
  title: "Components/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;
const DefaultArgs = {};

export const CardTest = Template.bind({});
CardTest.args = {
  ...DefaultArgs,
  title: (
    <div style={{ display: "flex" }}>
      <Typography>TITLE</Typography>
    </div>
  ),
  children: <div>This is a piece of text that explains something.</div>,
};

export const LineItemCard = Template.bind({});
LineItemCard.args = {
  ...DefaultArgs,
  title: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>TITLE</Typography>
      <Button
        style={{ padding: "0px", color: "var(--nds-secondary-color)" }}
        transparent={true}
        secondary={true}
      >
        Button
      </Button>
    </div>
  ),
  children: <div>This is a piece of text that explains something.</div>,
};

export const OneButtonCard = Template.bind({});
OneButtonCard.args = {
  ...DefaultArgs,
  title: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>TITLE</Typography>
      <Button
        style={{ padding: "0px", color: "var(--nds-secondary-color)" }}
        transparent={true}
        secondary={true}
      >
        Button
      </Button>
    </div>
  ),
};

export const MultipleButtons = Template.bind({});
MultipleButtons.args = {
  ...DefaultArgs,
  title: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography style={{ fontWeight: "600", color: "#2A4494" }}>
        TITLE
      </Typography>
      <div
        style={{
          color: "#2A4494",
          height: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ArrowRight /> <ArrowLeft style={{ marginTop: "-3px" }} />
      </div>
    </div>
  ),
  children: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        left: "0",
        width: "70px",
      }}
    >
      <Button
        style={{ color: "var(--nds-secondary-color)" }}
        transparent={true}
        secondary={true}
      >
        Button 1
      </Button>
      <Button
        style={{ color: "var(--nds-secondary-color)" }}
        transparent={true}
        secondary={true}
      >
        Button 2
      </Button>
      <Button
        style={{ color: "var(--nds-secondary-color)" }}
        transparent={true}
        secondary={true}
      >
        Button 3
      </Button>
    </div>
  ),
};

const SampleTitle = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontWeight: "600", color: "#2A4494" }}>
          TITLE
        </Typography>
        <div
          style={{
            color: "#2A4494",
            height: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ArrowRight /> <ArrowLeft style={{ marginTop: "-3px" }} />
        </div>
      </div>
      <Button
        transparent={true}
        secondary={true}
        style={{
          fontSize: "10px",
          width: "5px",
          color: "grey",
          padding: "0px",
        }}
      >
        Press
      </Button>
    </div>
  );
};

const SampleCard = () => {
  return (
    <Card style={{ width: "600px" }} title={<SampleTitle />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          left: "0",
          width: "75px",
        }}
      >
        <Button
          style={{ color: "var(--nds-secondary-color)" }}
          transparent={true}
          secondary={true}
        >
          Button 1
        </Button>
        <Button
          style={{ color: "var(--nds-secondary-color)" }}
          transparent={true}
          secondary={true}
        >
          Button 2
        </Button>
        <Button
          style={{ color: "var(--nds-secondary-color)" }}
          transparent={true}
          secondary={true}
        >
          Button 3
        </Button>
      </div>
    </Card>
  );
};

export const MultipleCards = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        width: "100%",
        "justify-content": "space-around",
      }}
    >
      <SampleCard />
      <SampleCard />
      <SampleCard />
    </div>
  );
};

export const HoverCard = Template.bind({});
HoverCard.args = {
  title: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>TITLE</Typography>
      <Button
        style={{ color: "var(--nds-secondary-color)", padding: "0px" }}
        transparent={true}
        secondary={true}
      >
        Button
      </Button>
    </div>
  ),
  style: { border: "1px solid var(--nds-primary-color)" },
};
