import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Event from "sap/ui/base/Event";
import CheckBox from "sap/m/CheckBox";
import View from "sap/ui/core/mvc/View";
import HBox from "sap/m/HBox";
import Text from "sap/m/Text";
import Dialog from "sap/m/Dialog";

/**
 * @namespace ui5.controller
 */
export default class App extends Controller {
  private dialog: Dialog;
  async onOpenDialog(): Promise<void> {
    const oViewModel = this.getView()?.getModel("view") as JSONModel;
    const sNewTodo = oViewModel.getProperty("/newTodo")?.trim();

    const oModel = this.getView()?.getModel() as JSONModel;
    const aTodos = oModel.getProperty("/recipient/todos") || [];
    if (!sNewTodo) {
      console.log("error: newTodo is empty");
      console.log("New Todo:", sNewTodo);
      console.log("Todos List Before:", aTodos);
      return;
    } else {
      console.log("New Todo:", sNewTodo);
      console.log("Todos List Before:", aTodos);
      aTodos.push({ title: sNewTodo, completed: false });
      oModel.setProperty("/recipient/todos", aTodos);
      oViewModel.setProperty("/newTodo", "");
      this.dialog ??= (await this.loadFragment({
        name: "ui5.view.HelloDialog",
      })) as Dialog;
      this.dialog.open();
    }
  }
  onCloseDialog(): void {
    // note: We don't need to chain to the pDialog promise, since this event-handler
    // is only called from within the loaded dialog itself.
    (this.byId("helloDialog") as Dialog)?.close();
  }
  public onToggleCompleted(oEvent: Event): void {
    const oCheckbox = oEvent.getSource() as CheckBox;
    const bSelected = oCheckbox.getSelected();
    const sPath = oCheckbox.getBindingContext()?.getPath();
    const oParent = oCheckbox.getParent() as HBox;
    const oText = oParent.getItems()[1] as Text;
    if (oText) {
      if (bSelected) {
        oText.addStyleClass("todoStrike");
      } else {
        oText.removeStyleClass("todoStrike");
      }
    }
    if (sPath) {
      const oModel = (this.getView() as View).getModel() as JSONModel;
      oModel.setProperty(sPath + "/completed", bSelected);
      console.log("Checkbox selected:", bSelected);
      console.log("Checkbox path:", sPath);
    }
  }
  onFilter(event: SearchField$SearchEvent): void {
    console.log("onFilter called");
    // build filter array
    const filter = [];
    const query = event.getParameter("query");
    if (query) {
      filter.push(new Filter("title", FilterOperator.Contains, query));
    }
    // filter binding
    const list = this.byId("TodoList");
    const binding = list?.getBinding("items") as ListBinding;
    binding?.filter(filter);
  }
}
