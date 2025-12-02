import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router"
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SafePath from "./SafePath";
import Niveis from "../pages/Niveis";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import Usuarios from "../pages/Usuarios";
import Plataformas from "../pages/Plataformas";
import Clientes from "../pages/Clientes";
import Pedidos from "../pages/Pedidos";

const Paths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<SafePath><DashboardLayout /></SafePath>}>
                        <Route index element={<Dashboard />} />
                        <Route path="/dashboard/niveis" element={<Niveis />} />
                        <Route path="/dashboard/usuarios" element={<Usuarios />} />
                        <Route path="/dashboard/plataformas" element={<Plataformas />} />
                        <Route path="/dashboard/clientes" element={<Clientes />} />
                        <Route path="/dashboard/pedidos" element={<Pedidos />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths;