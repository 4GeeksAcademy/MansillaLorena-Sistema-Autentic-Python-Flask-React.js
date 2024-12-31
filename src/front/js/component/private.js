import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const signout = () => {
        
        sessionStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/');
    };

    return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Sesión iniciada con éxito!</h1>
                        <p className="card-text">¡Bienvenido!</p>
						<p className="card-text">¡Hasta pronto!</p>
                        <button className="btn btn-danger" onClick={signout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
    );
};

export default Private;