import { useState, useEffect } from "react";
import { createBrand, updateBrand } from "../services/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import FormInput from "./FormInput";

export default function BrandModal({ isOpen, onClose, brand, refresh }) {
  const [formData, setFormData] = useState({ id: null, marca: "", titular: "", estado: "Activa" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (brand) setFormData(brand);
    else setFormData({ id: null, marca: "", titular: "", estado: "Activa" });
    setErrors({});
  }, [brand]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let newErrors = {};
    if (!formData.marca.trim()) newErrors.marca = "La marca es obligatoria";
    if (!formData.titular.trim()) newErrors.titular = "El titular es obligatorio";
    if (!formData.estado) newErrors.estado = "Debe seleccionar un estado";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (formData.id) {
        await updateBrand(formData.id, formData);
        toast.success("Marca actualizada ✅");
      } else {
        await createBrand(formData);
        toast.success("Marca creada ✅");
      }
      refresh();
      onClose();
    } catch {
      toast.error("Error al guardar ❌");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        {/* Botón cerrar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Editar Marca" : "Nueva Marca"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            error={errors.marca}
          />
          <FormInput
            label="Titular"
            name="titular"
            value={formData.titular}
            onChange={handleChange}
            error={errors.titular}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 ${
                errors.estado ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
              }`}
            >
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
            {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
            {formData.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
