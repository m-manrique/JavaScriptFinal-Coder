// Obtener el estado del mensaje desde sessionStorage
const mensajeSesion = sessionStorage.getItem("mensajeSesion");

// Obtener el estado del mensaje desde localStorage
const mensajeMostrado = localStorage.getItem("mensajeMostrado");

// Obtener el estado del mensaje de bienvenida desde localStorage
const mensajeBienvenida = localStorage.getItem("mensajeBienvenida");

// Verificar si el mensaje de bienvenida ya se ha mostrado
if (!mensajeBienvenida) {
    // Mostrar el mensaje de bienvenida
    Swal.fire("Trebol Apartamentos le da la Bienvenida!");

    // Establecer el estado en localStorage para indicar que el mensaje de bienvenida se ha mostrado
    localStorage.setItem("mensajeBienvenida", "true");
}

// Verificar si el mensaje ya se ha mostrado durante la sesión actual
if (!mensajeSesion) {
    mensaje = "Bienvenido Nuevamente a Trebol Apartamentos!"
    // Mostrar el mensaje
    //const mensaje = [{ mj: "Bienvenido Nuevamente a Trebol Apartamentos!" }];
    Swal.fire(mensaje);

    // Establecer el estado en sessionStorage para indicar que el mensaje se ha mostrado durante la sesión actual
    sessionStorage.setItem("mensajeSesion", "true");
}

// Verificar si el mensaje ya se ha mostrado en alguna sesión anterior
if (!mensajeMostrado) {
    // Establecer el estado en localStorage para indicar que el mensaje se ha mostrado en alguna sesión anterior
    localStorage.setItem("mensajeMostrado", "true");
}

