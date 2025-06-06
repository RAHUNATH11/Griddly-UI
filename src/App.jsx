import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AdminHome from "./pages/AdminHome";
import StaffHome from "./pages/StaffHome";
import WarehouseSetup from './pages/Warehouse/WarehouseSetup';
import AdminRoute from "./pages/AdminRoute"; // wherever it's stored
import Layout from "./pages/WarehouseLayout/Layout";
import AddProduct from './pages/AddProduct/AddProduct';
import PickProduct from './pages/PickProduct/PickProduct';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Register />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/staff" element={<StaffHome />} />
      <Route path="/warehouse-setup" element={<WarehouseSetup />} />
      <Route path="/warehouse-setup" element={<AdminRoute><WarehouseSetup /></AdminRoute>} />
      <Route path="/Layout" element={<AdminRoute><Layout/></AdminRoute>}/>
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/pick-product" element={<PickProduct />} />
     
    </Routes>
  );
}

export default App;
