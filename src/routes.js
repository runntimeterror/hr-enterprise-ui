import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import FileCopyOutlined from "@material-ui/icons/FileCopyOutlined";
import CalendarToday from "@material-ui/icons/CalendarTodayOutlined"
// core ../components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import Typography from "./views/Typography/Typography.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard",
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
    component: Typography,
    layout: "/dashboard",
  }
];

export default dashboardRoutes;
