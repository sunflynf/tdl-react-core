import ListView from "../views/ListView";
import TableView from "../views/TableView";
import KanbanView from "../views/KanbanView";
import { SOURCE_PATH } from "../constant/path";

export const routes = [
  { to: SOURCE_PATH + "/", component: ListView },
  { to: SOURCE_PATH + "/list", component: ListView },
  { to: SOURCE_PATH + "/table", component: TableView },
  { to: SOURCE_PATH + "/kanban", component: KanbanView },
];
