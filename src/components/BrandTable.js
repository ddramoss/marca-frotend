import { Edit3, Trash2, Plus } from "lucide-react";

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
    <div className="bg-white shadow-md rounded-xl p-6">
      {/* Header con botón crear y filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-bold">Marcas Registradas</h2>

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
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />

        <input
          type="text"
          placeholder="Buscar por titular..."
          value={filters.titular}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, titular: e.target.value }))
          }
          className="border rounded-lg px-3 py-2 text-sm w-full"
        />

        <select
          value={filters.estado}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, estado: e.target.value }))
          }
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="Todos">Todos</option>
          <option value="Activa">Activa</option>
          <option value="Inactiva">Inactiva</option>
        </select>
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Marca</th>
            <th className="px-4 py-2">Titular</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <tr key={brand.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{brand.marca}</td>
                <td className="px-4 py-2">{brand.titular}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      brand.estado === "Activa"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {brand.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(brand)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(brand)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No hay marcas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
