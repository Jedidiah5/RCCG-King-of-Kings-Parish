declare module '*.jsx' {
  const content: React.ComponentType<any>;
  export default content;
}

declare module './components/AdminLogin' {
  const AdminLogin: React.ComponentType;
  export default AdminLogin;
}

declare module './components/AdminDashboard' {
  const AdminDashboard: React.ComponentType;
  export default AdminDashboard;
}

declare module './components/ProtectedRoute' {
  const ProtectedRoute: React.ComponentType<{ children: React.ReactNode }>;
  export default ProtectedRoute;
}

declare module './components/DynamicEvents' {
  const DynamicEvents: React.ComponentType;
  export default DynamicEvents;
}

declare module './components/DynamicSermons' {
  const DynamicSermons: React.ComponentType;
  export default DynamicSermons;
}

declare module './components/DynamicAnnouncements' {
  const DynamicAnnouncements: React.ComponentType;
  export default DynamicAnnouncements;
}

declare module './contexts/AuthContext' {
  export const AuthProvider: React.ComponentType<{ children: React.ReactNode }>;
  export const useAuth: () => {
    currentUser: any;
    login: (email: string, password: string) => Promise<any>;
    signup: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    loading: boolean;
  };
}
