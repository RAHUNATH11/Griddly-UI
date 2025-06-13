import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AdminHome from "./pages/AdminHome/AdminHome";
import StaffHome from "./pages/StaffHome";
import WarehouseSetup from './pages/Warehouse/WarehouseSetup';
import Layout from "./pages/WarehouseLayout/Layout";
import AddProduct from './pages/AddProduct/AddProduct';
import PickProduct from './pages/PickProduct/PickProduct';
import AdminRoute from "./pages/AdminRoute";
import MainLayout from './pages/components/MainLayout';
import ActionLogs from "./pages/ActionLogs/ActionLogs"; // ✅ added

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route path="/admin" element={<MainLayout><AdminHome /></MainLayout>} />
      <Route path="/staff" element={<MainLayout><StaffHome /></MainLayout>} />
      <Route path="/warehouse-setup" element={<MainLayout><WarehouseSetup /></MainLayout>} />
      <Route path="/layout" element={<MainLayout><Layout /></MainLayout>} />
      <Route path="/add-product" element={<MainLayout><AddProduct /></MainLayout>} />
      <Route path="/pick-product" element={<MainLayout><PickProduct /></MainLayout>} />
      <Route path="/logs" element={<MainLayout><ActionLogs /></MainLayout>} /> {/* ✅ wrapped */}
    </Routes>
  );
}

export default App;
