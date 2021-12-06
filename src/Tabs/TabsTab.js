import React, { useContext } from "react";
import PropTypes from "prop-types";
import TabsContext from "./context";
import cc from "classcat";

const TabsTab = ({ label, tabId }) => {
  const { selectedIndex, tabIds, hasPanels, changeTabs } =
    useContext(TabsContext);
  const isSelected = tabId === tabIds[selectedIndex];

  return (
    <li
      className={cc([
        "nds-tabs-tabItem",
        {
          "nds-tabs-tabItem--selected": isSelected,
        },
      ])}
    >
      <button
        className={cc([
          "resetButton",
          "nds-tabs-button",
          {
            "nds-tabs-button--selected": isSelected,
          },
        ])}
        role={hasPanels ? "tab" : undefined}
        aria-selected={isSelected.toString()}
        aria-controls={hasPanels ? `${tabId}-tabpanel` : undefined}
        id={`${tabId}-tab`}
        tabIndex={hasPanels ? "-1" : "0"}
        onClick={() => changeTabs(tabId)}
      >
        {label}
      </button>
    </li>
  );
};

TabsTab.propTypes = {
  /** Label of the tab button */
  label: PropTypes.string.isRequired,
  /** String ID used to link the `Tabs.Tab` to a `Tabs.Panel` */
  tabId: PropTypes.string.isRequired,
};

TabsTab.displayName = "Tabs.Tab";

export default TabsTab;
