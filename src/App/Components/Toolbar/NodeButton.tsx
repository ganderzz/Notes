import * as React from "react";
import { hasBlock } from "../../Utilities/Editor/utils";

export function NodeButton({ children, value, type, onClick, ...rest }: any) {
  const isActive = hasBlock(value, type);

  return (
    <button
      style={{
        padding: "10px 15px",
        textAlign: "center",
        background: "#FFF",
        border: 0,
        fontSize: "0.9rem",
        cursor: "pointer",
        ...(isActive ? { opacity: 1, fontWeight: 600 } : { opacity: 0.55 }),
      }}
      onClick={e => onClick(e, type)}
      {...rest}
    >
      {children}
    </button>
  );
}