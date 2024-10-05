import { ERole, IUser } from "@interfaces/user.interface";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string): IUser | null => {
  try {
    const decoded = jwtDecode<{ id: string; name: string; role: string }>(
      token
    );

    if (Object.values(ERole).includes(decoded.role as ERole)) {
      return {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role as ERole,
      };
    }

    return null;
  } catch {
    throw new Error("Ocurrió un error en la codificación");
  }
};
