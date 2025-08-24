import { useState, useEffect } from "react";
import { getBrands, deleteBrand } from "../services/api";
import BrandTable from "../components/BrandTable";
import BrandModal from "../components/BrandModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast from "react-hot-toast";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [brands, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);


  // filtros
  const [filters, setFilters] = useState({
    marca: "",
    titular: "",
    estado: "Todos",
  });

  // debounce en marca y titular
  const debouncedMarca = useDebounce(filters.marca, 400);
  const debouncedTitular = useDebounce(filters.titular, 400);

  // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // detectar cambios inmediatos
useEffect(() => {
  setFilterLoading(true);
}, [filters.marca, filters.titular]);

// apagar loading cuando debounce termina
useEffect(() => {
  setFilterLoading(false);
}, [debouncedMarca, debouncedTitular]);


  // aplicar filtros
  const filteredBrands = brands.filter((b) => {
    const byMarca = b.marca
      .toLowerCase()
      .includes(debouncedMarca.toLowerCase());
    const byTitular = b.titular
      .toLowerCase()
      .includes(debouncedTitular.toLowerCase());
    const byEstado =
      filters.estado === "Todos" || b.estado === filters.estado;

    return byMarca && byTitular && byEstado;
  });

  // paginación
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async () => {
    try {
      await deleteBrand(selectedBrand.id);
      toast.success("Marca eliminada ✅");
      fetchBrands();
    } catch {
      toast.error("Error al eliminar ❌");
    }
    setDeleteOpen(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
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
