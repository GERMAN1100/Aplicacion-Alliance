import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/registro.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [ubicacion, setUbication] = useState("");
  const [image, setImage] = useState(null);
  const [ciudad, setCiudad] = useState("");
  const [OtroTel, setOtroTel] = useState("");
  const [document, setCuitDoc] = useState("");
  const [Text, setPresent] = useState("");
  const [linkweb, setWeb] = useState("");
  const [linkInst, setIg] = useState("");
  const [linkFace, setFace] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [linkCatalogo, setLinkCatalogo] = useState("");
  const navigate = useNavigate();

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
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
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
        const response = await fetch("http://localhost:3000/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            tel,
            ubicacion,
            ciudad,
            OtroTel,
            document,
            presentacion: Text,
            linkWeb: linkweb,
            linkInstagram: linkInst,
            linkFacebook: linkFace,
            categorias,
            linkCatalogo,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const { token, userId } = data; // Asume que la respuesta contiene token y userId
  
          localStorage.setItem('token', token);
          localStorage.setItem("userId", userId);
          // navigate(`/final/${userId}`);        ---------------------VER ESTO, YA QUE NO ME TIRA LA PAGINA CUANDO APRETO FINALIZAR, PERO SI ANDA PERFIL
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
          accept="images/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file" className="upload-label">
          {image ? (
            <img src={image} alt="Profile" className="profile-image" />
          ) : (
            <div className="ImgPerf">
              <p>Selecciona una imagen de perfil</p>
            </div>
          )}
        </label>
      </div>
      <div className="Form">
        <form onSubmit={handleFinalizar}>
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
              value={OtroTel}
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
              value={document}
              onChange={handleCuitOrDocChange}
              required
            />
            <label htmlFor="present">Presentación</label>
            <input
              type="text"
              id="present"
              value={Text}
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
              value={linkFace}
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
