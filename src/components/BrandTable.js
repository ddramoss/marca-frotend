import { Edit3, Trash2, Plus } from "lucide-react";
import { Toaster } from 'react-hot-toast';

export default function BrandTable({
  brands,
  onEdit,
  onDelete,
  onCreate,
  filters,
  setFilters,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-colors duration-300">
      <Toaster position="top-right" />

      {/* Header con botón crear y filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Marcas Registradas</h2>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Nueva Marca
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por marca..."
          value={filters.marca}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, marca: e.target.value }))
          }
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="text"
          placeholder="Buscar por titular..."
          value={filters.titular}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, titular: e.target.value }))
          }
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
        />

        <select
          value={filters.estado}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, estado: e.target.value }))
          }
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="Todos">Todos</option>
          <option value="Activa">Activa</option>
          <option value="Inactiva">Inactiva</option>
        </select>
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100">
            <th className="px-4 py-2">Marca</th>
            <th className="px-4 py-2">Titular</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <tr
                key={brand.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-2">{brand.marca}</td>
                <td className="px-4 py-2">{brand.titular}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      brand.estado === "Activa"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                  >
                    {brand.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(brand)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(brand)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
                No hay marcas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          Anterior
        </button>
        <span className="text-sm font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
