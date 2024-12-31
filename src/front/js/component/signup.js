import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showRedirectButton, setShowRedirectButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        const result = await actions.registerUser(formData);
        console.log("Resultado del registro:", result);
        if (result.success) {
            setShowRedirectButton(true);
            setErrorMessage('');
        } else {
            setErrorMessage(result.error || 'Error en el registro');
        }
    };

    const handleRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6">
                <div className="card p-4 bg-success">
                    <div className="card-body rounded">
                        <h2 className="text-white text-center mb-3">Registro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="mb-3 text-start">
                                        <label htmlFor="email" className="form-label text-white">Email</label>
                                        <input type="email" className="form-control" id="email"
                                            value={formData.email} onChange={handleChange} />
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label text-white">Contraseña</label>
                                    <input type="password" className="form-control" id="password" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.password} onChange={handleChange} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary">Confirmar Registro</button>
                                </div>
                            </div>
                        </form>
                        {errorMessage && (
                            <div className="row mt-4">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                </div>
                            </div>
                        )}
                        {showRedirectButton && (
                            <div className="row mt-4">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <button onClick={handleRedirect} className="btn btn-primary" >Ir a la página de inicio</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;