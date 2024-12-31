import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const Login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };

        try {
            const response = await fetch(process.env.BACKEND_URL + '/login', requestOptions);
            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                window.location.href = '/private';
            } else {
                console.error('Error en el inicio de sesión, vuelve a intentarlo', data.msg);
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="container mt-5 d-flex justify-content-center align-items-center vh-100">
                <div className="col-md-6">
                    <div className="card p-4 bg-success">
                        <div className="card-header">
                            <h4 className="card-title text-center text-white">Iniciar Sesión</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-white">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p className="mb-0">¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;