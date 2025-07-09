import React from "react";

export default function TableLayout({ children }: { children: React.ReactNode }) {
  return <div className="p-8 w-full">{children}</div>;
}
