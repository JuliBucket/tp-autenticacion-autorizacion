const formulario = document.querySelector("#register-form");
const inputNodes = document.querySelectorAll("form input");

console.log(inputNodes);

const register = async (e) => {

  e.preventDefault()
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username);
  console.log(password);

  const peticion = await fetch("http://localhost:4000/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    }
  })

    const respuesta = await peticion.json();

    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        alert(respuesta.msg)

        location.href = 'index.html'
    }

}



