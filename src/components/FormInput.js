export default function FormInput({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 mt-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
