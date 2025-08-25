import { useState, useEffect } from "react";
import { getBrands, deleteBrand } from "../services/api";
import BrandTable from "../components/BrandTable";
import BrandModal from "../components/BrandModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast, { Toaster } from "react-hot-toast";
import useDebounce from "../hooks/useDebounce";
import { Home as HomeIcon, List, CheckCircle, XCircle, Sun, Moon } from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function Home() {
  const [brands, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [filters, setFilters] = useState({
    marca: "",
    titular: "",
    estado: "Todos",
  });

  const debouncedMarca = useDebounce(filters.marca, 400);
  const debouncedTitular = useDebounce(filters.titular, 400);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeMenu, setActiveMenu] = useState("marcas"); // "dashboard" o "marcas"
  const [darkMode, setDarkMode] = useState(false);

  // Aplicar clase dark al <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.data);
    } catch (err) {
      toast.error("Error cargando marcas");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((b) => {
    const byMarca = b.marca.toLowerCase().includes(debouncedMarca.toLowerCase());
    const byTitular = b.titular.toLowerCase().includes(debouncedTitular.toLowerCase());
    const byEstado = filters.estado === "Todos" || b.estado === filters.estado;
    return byMarca && byTitular && byEstado;
  });

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async () => {
    try {
      await deleteBrand(selectedBrand.id);
      toast.success("Marca eliminada");
      fetchBrands();
    } catch {
      toast.error("Error al eliminar");
    }
    setDeleteOpen(false);
  };

  const dashboardData = [
    { name: "Activas", value: brands.filter((b) => b.estado === "Activa").length },
    { name: "Inactivas", value: brands.filter((b) => b.estado === "Inactiva").length },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // verde y rojo

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Toaster position="top-right" />

      <div className="flex flex-1">
        {/* Menú lateral */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col gap-4 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Marcas</h1>
          <button
            className={`flex items-center gap-2 p-3 rounded-md font-medium transition-colors ${
              activeMenu === "dashboard"
                ? "bg-blue-700 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveMenu("dashboard")}
          >
            <HomeIcon size={20} /> Dashboard

          </button>
          <button
            className={`flex items-center gap-2 p-3 rounded-md font-medium transition-colors ${
              activeMenu === "marcas"
                ? "bg-blue-700 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveMenu("marcas")}
          >
            <List size={20} /> Marcas
          </button>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-8 relative transition-colors duration-300">
          {/* Botón modo oscuro */}
          <div className="absolute top-4 right-4">
            <button
              className="flex items-center gap-2 p-2 rounded-md font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              {darkMode ? "Oscuro" : "Claro"}
            </button>
          </div>

          {/* Dashboard */}
          {activeMenu === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Marcas Activas */}
  <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 flex flex-col items-start transition-colors duration-300">
    <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
      <CheckCircle color="#22c55e" /> Marcas Activas
    </h2>
    <p className="text-3xl font-bold">{dashboardData[0]?.value || 0}</p>
  </div>

  {/* Marcas Inactivas */}
  <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 flex flex-col items-start transition-colors duration-300">
    <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
      <XCircle color="#ef4444" /> Marcas Inactivas
    </h2>
    <p className="text-3xl font-bold">{dashboardData[1]?.value || 0}</p>
  </div>

  {/* Gráfico de distribución */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 col-span-1 md:col-span-2 h-72 transition-colors duration-300" style={{ minHeight: '350px' }}>
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            Distribución de marcas
            </h2>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={dashboardData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}          // un poco más grande que antes
                innerRadius={40}           // opcional, para que quede más claro
                label={({ percent, name, value }) => `${value}`} // solo número
                labelLine={false}          // sin línea
                >
                {dashboardData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
            </ResponsiveContainer>
        </div>
        </div>

          )}

          {/* Tabla de marcas */}
          {activeMenu === "marcas" && (
            <BrandTable
              brands={paginatedBrands}
              onCreate={() => {
                setSelectedBrand(null);
                setModalOpen(true);
              }}
              onEdit={(brand) => {
                setSelectedBrand(brand);
                setModalOpen(true);
              }}
              onDelete={(brand) => {
                setSelectedBrand(brand);
                setDeleteOpen(true);
              }}
              filters={filters}
              setFilters={setFilters}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-center py-4 flex justify-center items-center gap-4 transition-colors duration-300">
        <span>&copy; {new Date().getFullYear()} Registro de marcas</span>
        <a href="#" className="hover:underline">Diego Ramos</a>
      </footer>

      {/* Modales */}
      <BrandModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        brand={selectedBrand}
        refresh={fetchBrands}
      />

      <ConfirmDeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
