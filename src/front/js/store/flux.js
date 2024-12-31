
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			loginUser: async (email, password) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/login`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, password })
				  });
			  
				  if (!response.ok) {
					const errorData = await response.json();
					console.error('Error data:', errorData);
					throw new Error(errorData.msg || 'Error en la autenticación'); // Use error message from response or a default
				  }
			  
				  const data = await response.json();
				  console.log('Datos recibidos del servidor:', data);
			  
				  // Update token and userType in store (assuming these exist)
				  setStore({ token: data.access_token }); // Update based on your store structure
			  
				  return { success: true, data };
				} catch (error) {
				  console.error('Error en loginUser:', error);
				  return { success: false, error: error.message };
				}
			  },
			  registerUser: async (userData) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify(userData)
				  });
			  
				  if (!response.ok) {
					const errorData = await response.json();
					console.error('Error data:', errorData);
					throw new Error(errorData.msg || 'Error en el registro'); // Use error message from response or a default
				  }
			  
				  const data = await response.json();
				  console.log('Registro exitoso:', data);
			  
				  return { success: true };
				} catch (error) {
				  console.error('Error en registerUser:', error);
				  return { success: false, error: error.message };
				}
			  },
		}
	};
};

export default getState;
