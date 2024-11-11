import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await fetch('http://localhost:8080/profile', {
                    credentials: 'include',
                });

                if(response.ok){
                    const data = await response.json();
                    setUser(data);
                }else{
                    window.location.href('/');
                }
            }catch(error){
                console.error('Error fetching user', error);
            }
        };

        fetchUser();
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);