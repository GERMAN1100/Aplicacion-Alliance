import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/busqueda.css'
// import lupa from '../img/lupa.svg';

const Busqueda = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate('');

    // const handleRefresh = () => {
    //     window.location.reload();
    //   };

    const fetchAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/users/search?name=${searchTerm}`);
    //         const data = await response.json();
    //         setUsers(data);
    //     } catch (error) {
    //         console.error('Error searching users:', error);
    //     }
    // };

    const filterUsers = () => {
        return users.filter(user =>
            user.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);


    useEffect(() => {
        // This effect will run every time searchTerm changes and will filter users in real-time
        filterUsers();
    }, [searchTerm]);

    return (
        <div>
            <div>
                <div className='body-head'>
                   <div className='nameApp'>
                      <div className='All'>
                        <h1>ALLIANCE</h1>
                        <p>BUSCA CONTACTOS</p>
                      </div>
                   </div> 
                  <div className='img-perfil'> 
                    <div className='sect-img'>
                        imagen de perfil de usuario chica
                    </div>
                  </div>
                </div>
            </div>
            <div className='buscador'>
              <input
                 type="text"
                 placeholder="Buscar usuarios"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
               {/* <button onClick={handleSearch}>Buscar</button> */}
               {/* <button onClick={handleRefresh}> Refresh</button> */}
            </div>
            <div className='SectorBuscador'>
                {/* {users.map(user => ( */}
                {filterUsers().map(user => (
                    <div className='SectPerfil' key={user.id} onClick={() => navigate(`/perfil/${user.id}`)}>
                        <div className='Perfil'>
                            <div className='imgenPerfil'>
                              <img 
                               src={`http://localhost:3000/uploads/${user.imagenPerfil}`} 
                               alt={`${user.nombreUsuario} perfil`} 
                               className="profile-image"
                             />
                            </div>
                            <div className='NomUsuario'>
                              <h3>{user.nombreUsuario}</h3>
                              <p>{user.descripcion}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Busqueda;
