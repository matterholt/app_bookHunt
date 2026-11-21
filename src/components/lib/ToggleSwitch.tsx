

import { useState } from "react";


interface ToggleSwitchProps {
  obtained: boolean
}

export function ToggleSwitch({ obtained }: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(() => obtained);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-4 w-10 items-center rounded-full
          transition-colors duration-300 focus:outline-none
          focus:ring-4 focus:ring-blue-300
          ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-3 w-2 transform rounded-full
            bg-white shadow-md transition-transform duration-300
            ${enabled ? "translate-x-7" : "translate-x-1"}`}
        />
      </button>

      <span className="text-sm font-medium">
        {enabled ? "Yes" : "No"}
      </span>
    </div>
  );
}
