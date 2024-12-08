import { useEffect } from "react";

export const useOutsideClick = (ref, callback, excludeRef) => {
  useEffect(() => {
    if (!ref?.current || !callback) return;

    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!excludeRef?.current || !excludeRef.current.contains(event.target))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, excludeRef]);
};
