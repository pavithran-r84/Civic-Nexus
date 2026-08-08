import { useState } from "react";
import { useApp } from "../context/AppContext";
import { ChevronDown, User, Building2, Heart, Users, Home } from "lucide-react";

const ROLES = [
  {
    id: "Citizen",
    label: "Citizen",
    icon: User,
  },
  {
    id: "Municipality",
    label: "Municipality",
    icon: Building2,
  },
  {
    id: "NGO",
    label: "CleanCity NGO",
    icon: Heart,
  },
  {
    id: "Volunteers",
    label: "Youth Volunteers",
    icon: Users,
  },
  {
    id: "RWA",
    label: "Green Park RWA",
    icon: Home,
  },
];

export default function RoleSwitcher() {
  const { activeRole, setActiveRole } = useApp();
  const [open, setOpen] = useState(false);

  const current = ROLES.find((r) => r.name === activeRole) || ROLES[0];
  const CurrentIcon = current.icon;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          background: "#fff",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        <CurrentIcon size={16} />
        {current.name}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minWidth: "180px",
            zIndex: 50,
          }}
        >
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.name}
                onClick={() => {
                  setActiveRole(role.name);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  background: role.name === activeRole ? "#eef2ff" : "transparent",
                }}
              >
                <Icon size={16} />
                {role.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
