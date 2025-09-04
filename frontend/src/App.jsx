import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContexts";
import LoginForm from "./components/auth/LoginForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ThemeProvider } from "./contexts/ThemeContext";

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <AppContent />
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;