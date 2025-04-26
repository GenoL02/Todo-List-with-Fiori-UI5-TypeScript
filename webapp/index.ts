import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
  id: "container",
  name: "ui5",
  settings: {
    id: "ui5",
  },
  autoPrefixId: true,
  async: true,
}).placeAt("content");
