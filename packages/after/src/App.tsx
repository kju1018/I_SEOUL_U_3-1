import React from "react";
import { Header } from "./components/ui/Header";
import { ManagementPage } from "./pages/ManagementPage";
import "./styles/components.css";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-secondary transition-colors duration-300">
      <Header />
      <main className="mx-auto max-w-[1400px] p-6">
        <ManagementPage />
      </main>
    </div>
  );
};
