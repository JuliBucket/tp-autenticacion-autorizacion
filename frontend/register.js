const formulario = document.querySelector("#formulario");
const inputNodes = document.querySelectorAll("form input");

console.log(inputNodes);

const register = async (e) => {

  e.preventDefault()
  
  const user = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(user);
  console.log(password);

  const peticion = await fetch("http://localhost:3000/register", {
    method: "POST",
    body: JSON.stringify({username, password}),
    headers: {
      "Content-type": "application/json"
    }
  })

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();
    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        //Caso contrario, mostramos el mensaje.
        alert(respuesta.msg)

        // Redirigimos al usuario al login.
        location.href = 'index.html'
    }

}


formulario.addEventListener('submit', register)

