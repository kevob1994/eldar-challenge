import { ERole, IUser } from "@interfaces/user.interface";

export const loginService = (credentials: { email: string; password: string }): Promise<{ user: IUser; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        resolve({
          user: { id: '1', name: 'John Doe', role: ERole.User },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiVXN1YXJpbyBQcnVlYmEiLCJyb2xlIjoidXNlciJ9.2X1Uw6qLwvSxLkSuwIC6KlWe3e4WvMCgyKAKjvyMExk',
        });
      } else if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        resolve({
          user: { id: '2', name: 'Jane Doe', role: ERole.Admin },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWRtaW4gUHJ1ZWJhIiwicm9sZSI6ImFkbWluIn0.gjsTKq3bd0AuURS0hJ450BCaKPiWRKEYaFWsfJH0okE',
        });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 1000);
  });
};