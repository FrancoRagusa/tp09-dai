// Importar useRouter desde next/navigation
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Cambiado de "next/router" a "next/navigation"
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  // Utiliza el hook de next/navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push("/inicio");
    // Enviar las credenciales al backend
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    router.push("/inicio");
    if (data.success) {
      // Guardar el token en localStorage o cookies
      localStorage.setItem("token", data.token);

      // Redirigir al usuario después de iniciar sesión
      router.push("/inicio");  // Cambiado el uso de router
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.content__form} onSubmit={handleSubmit}>
          <div className={styles.content__inputs}>
            <label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Phone number, username, or email</span>
            </label>
            <label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className={styles.content__or_text}>
          <span></span>
          <span>OR</span>
          <span></span>
        </div>
        <div className={styles.content__forgot_buttons}>
          <button onClick={()=>{router.push("/register");}}>Registrarse</button>
        </div>
      </div>
    </div>
  );
}