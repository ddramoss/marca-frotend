export default function FormInput({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
