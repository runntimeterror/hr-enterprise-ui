import Dashboard from "@material-ui/icons/Dashboard";
import FileCopyOutlined from "@material-ui/icons/FileCopyOutlined";
import CalendarToday from "@material-ui/icons/CalendarTodayOutlined"
import SearchIcon from "@material-ui/icons/Search"
// core ../components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import SearchPage from "./views/SearchPage/SearchPage"
import TableList from "./views/TableList/TableList.js";
import Documents from "./views/Documents/Documents.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard",
  },
  {
    path: "/search/:searchfor",
    name: "Search Result",
    icon: SearchIcon,
    component: SearchPage,
    layout: "/dashboard"
  },
  {
    path: "/table",
    name: "Historical Data",
    icon: CalendarToday,
    component: TableList,
    layout: "/dashboard",
  },
  {
    path: "/documents",
    name: "Documents",
    icon: FileCopyOutlined,
    component: Documents,
    layout: "/dashboard",
  }
];

export default dashboardRoutes;
