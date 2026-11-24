import { useId, useState } from "react";



interface StarRatingProps{
  value: number
  max:number
  disabled: boolean
  onChange: ()=>void

}

export function StarRating({
  value,
  onChange,
  max = 5,
  disabled = false,
}) {
  const id = useId();
  const [hovered, setHovered] = useState(null);
  const activeRating = hovered ?? value;

  return (
    <fieldset
      disabled={disabled}
      aria-label="Star rating"
      className="m-0 inline-flex border-0 p-0"
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;

        return (
          <label
            key={rating}
            className={
              disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
            onMouseEnter={() => {
              if (!disabled) setHovered(rating);
            }}
          >
            <input
              type="radio"
              name={`${id}-rating`}
              value={rating}
              checked={value === rating}
              onChange={() => onChange(rating)}
              aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
              className="peer sr-only"
            />

            <span
              className={[
                "flex h-7 w-7 items-center justify-center rounded",
                "transition-colors",
                "peer-focus-visible:outline peer-focus-visible:outline-2",
                "peer-focus-visible:outline-offset-2",
                "peer-focus-visible:outline-amber-500",
                rating <= activeRating
                  ? "text-amber-400"
                  : "text-slate-300",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="m12 2.25 3.01 6.1 6.74.98-4.88 4.76 1.15 6.71L12 17.63l-6.02 3.17 1.15-6.71-4.88-4.76 6.74-.98L12 2.25Z" />
              </svg>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
