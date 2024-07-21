import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/registro.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [nombreUsuario, setNomUsu] = useState("");
  const [descripcion, setDescrip] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [ubicacion, setUbication] = useState("");
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [ciudad, setCiudad] = useState("");
  const [otroTel, setOtroTel] = useState("");
  const [documento, setCuitDoc] = useState("");
  const [present, setPresent] = useState("");
  const [linkweb, setWeb] = useState("");
  const [linkInst, setIg] = useState("");
  const [linkFacebook, setFace] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [linkCatalogo, setLinkCatalogo] = useState("");
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate();

  const handleNomUsuChange = (event) => {
    setNomUsu(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescrip(event.target.value)
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTelChange = (event) => {
    setTel(event.target.value);
  };
  const handleUbicationChange = (event) => {
    setUbication(event.target.value);
  };
  // const handleImageChange = (event) => {
  //   const selectedImage = event.target.files[0];
  //   setImage(URL.createObjectURL(selectedImage));
  // };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      try {
        setImagenPerfil(selectedImage);
      } catch (error) {
        console.error('Error setting image:', error);
        // Handle error
      }
    } else {
      console.error('No image selected');
      // Handle case where no image is selected
    }
  };
  



  const handleCiudadChange = (event) => {
    setCiudad(event.target.value);
  };
  const handleOtroTelChange = (event) => {
    setOtroTel(event.target.value);
  };
  const handleCuitOrDocChange = (event) => {
    setCuitDoc(event.target.value);
  };
  const handlePresentChange = (event) => {
    setPresent(event.target.value);
  };
  const handleWebChange = (event) => {
    setWeb(event.target.value);
  };
  const handleIgChange = (event) => {
    setIg(event.target.value);
  };
  const handleFaceChange = (event) => {
    setFace(event.target.value);
  };
  const handleCheckboxChange = (e) => {
    setAceptado(e.target.checked);
  };

  const handleSeleccion = (categoria) => {
    // Verificar si la categoría ya está seleccionada
    if (categorias.includes(categoria)) {
      // Si está seleccionada, quitarla de la lista de categorías
      setCategorias(categorias.filter((cat) => cat !== categoria));
    } else {
      // Si no está seleccionada, agregarla a la lista de categorías
      setCategorias([...categorias, categoria]);
    }
  };
  const handleCatalogoChange = (event) => {
    setLinkCatalogo(event.target.value);
  };
  const handleFinalizar = async (event) => {
    event.preventDefault();
    if (aceptado) {
      try {
        // const response = await fetch("http://localhost:3000/registro", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     nombreUsuario,
        //     descripcion,
        //     email,
        //     password,
        //     tel,
        //     ubicacion,
        //     ciudad,
        //     otroTel,
        //     documento,
        //     present: present,
        //     linkWeb: linkweb,
        //     linkInstagram: linkInst,
        //     linkFacebook: linkFacebook,
        //     categorias,
        //     linkCatalogo,
        //   }),
        // });
        const formData = new FormData();
        formData.append("nombreUsuario", nombreUsuario);
        formData.append("descripcion", descripcion);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("tel", tel);
        formData.append("ubicacion", ubicacion);
        formData.append("ciudad", ciudad);
        formData.append("otroTel", otroTel);
        formData.append("documento", documento);
        formData.append("present", present);
        formData.append("linkWeb", linkweb);
        formData.append("linkInstagram", linkInst);
        formData.append("linkFacebook", linkFacebook);
        formData.append("categorias", categorias);
        // formData.append("categorias", JSON.stringify(categorias));
        formData.append("linkCatalogo", linkCatalogo);
        formData.append("ImagenPerfil", imagenPerfil);

        const response = await fetch("http://localhost:3000/registro", {
          method: "POST",
          body: formData,
        });


  
        if (response.ok) {
          const data = await response.json();
          
          const { userId } = data; // Asumiendo que el servidor devuelve el ID de usuario
          setUserId(userId); // Guardar el ID de usuario en el estado local
          navigate(`/final`);
        } else {
          console.error("Error al guardar los datos:", response.statusText);
          alert("Error al guardar los datos. Por favor, inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Error al enviar la solicitud. Por favor, inténtalo de nuevo.");
      }
    } else {
      alert("Debes aceptar los términos y condiciones");
    }
  };
  return (
    <div>
      <div className="Selperfil">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="upload-file"
      />
      <label htmlFor="upload-file" className="upload-label">
        {imagenPerfil ? (
          <img
            src={URL.createObjectURL(imagenPerfil)}
            alt="Perfil"
            className="profile-image"
          />
        ) : (
          <div className="ImgPerf">
            <p>Selecciona una imagen de perfil</p>
          </div>
        )}
      </label>
      </div>
      <div className="Form">
        <form onSubmit={handleFinalizar}>
         <div className="nomUsuario">
            <label htmlFor="nombreUsuario">Nombre</label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={handleNomUsuChange}
              required
            />
          </div>
          <div className="descripcion">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={handleDescChange}
              required
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="tel">Teléfono</label>
            <input
              type="tel"
              id="tel"
              value={tel}
              onChange={handleTelChange}
              required
            />
            <label htmlFor="tel">Teléfono Secundario</label>
            <input
              type="tel"
              id="OtroTel"
              value={otroTel}
              onChange={handleOtroTelChange}
              required
            />
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              value={ciudad}
              onChange={handleCiudadChange}
              required
            />
            <label htmlFor="ubicacion">Dirección</label>
            <input
              type="text"
              id="ubicacion"
              value={ubicacion}
              onChange={handleUbicationChange}
              required
            />
            <label htmlFor="cuitordoc">Cuit o Documento</label>
            <input
              type="text"
              id="cuitordoc"
              value={documento}
              onChange={handleCuitOrDocChange}
              required
            />
            <label htmlFor="present">Presentación</label>
            <input
              type="text"
              id="present"
              value={present}
              onChange={handlePresentChange}
              required
            />
            <label htmlFor="linkweb">Sitio web</label>
            <input
              type="url"
              id="linkweb"
              value={linkweb}
              onChange={handleWebChange}
              required
            />
            <label htmlFor="linkInst">Instagram</label>
            <input
              type="url"
              id="linkInst"
              value={linkInst}
              onChange={handleIgChange}
              required
            />
            <label htmlFor="linkFace">Facebook</label>
            <input
              type="url"
              id="linkFace"
              value={linkFacebook}
              onChange={handleFaceChange}
              required
            />
            <div className="Select">
              <h2>¿Qué productos y servicios ofrece?</h2>
              <div className="SelectProd">
                {[
                  "Venta al público",
                  "Servicio a domicilio",
                  "Golosinas",
                  "Cigarrillos",
                  "Bebidas",
                  "Galletiteria",
                  "Helados y Hielo",
                  "Productos congelados",
                  "Lacteos",
                  "Fiambres",
                  "Productos de limpieza",
                  "Productos de higiene",
                ].map((categoria) => (
                  <button
                    key={categoria}
                    type="button"
                    className={categorias.includes(categoria) ? "selected" : ""}
                    onClick={() => handleSeleccion(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
            <div className="Catalogo">
              <label htmlFor="linkcat">Link Catálogo</label>
              <input
                type="url"
                id="linkcat"
                value={linkCatalogo}
                onChange={handleCatalogoChange}
                required
              />
            </div>
          </div>
        </form>
        <div className="Publicidad">
          <h2>
            ¿No tienes un catalogo online? Contacta con nosotros en
            www.Alliance.com.ar, Crece en el mundo del mercado con el desarrollo
            web de tu negocio
          </h2>
        </div>
      </div>
      <div className="FinAndTerm">
        <form className="Terms">
          <input
            type="checkbox"
            id="terminos"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terminos">Acepto los términos y condiciones</label>
          <button
            type="button"
            disabled={!aceptado}
            className="Fin"
            onClick={handleFinalizar}
          >
            Finalizar
          </button>
        </form>
      </div>
      <div className="volver">
        <button type="submit">
          <Link to="/login">Volver</Link>
        </button>
      </div>
    </div>
  );
};
export default Registro;
