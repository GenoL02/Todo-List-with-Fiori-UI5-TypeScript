import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ui5
 */
export default class Component extends UIComponent {
  public static metadata = {
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
    manifest: "json",
  };
  init(): void {
    // call the init function of the parent
    super.init();

    // set data model
    const data = {
      recipient: {
        todos: [], // todo todo list
        currentTodos: [], // current todo
      },
    };
    const dataModel = new JSONModel(data);
    this.setModel(dataModel);

    // set i18n model
    const i18nModel = new ResourceModel({
      bundleName: "ui5.i18n.i18n",
    });
    this.setModel(i18nModel, "i18n");
  }

  createContent(): Control | Promise<Control | null> | null {
    return XMLView.create({
      viewName: "ui5.view.App",
      id: "app",
    });
  }
}
