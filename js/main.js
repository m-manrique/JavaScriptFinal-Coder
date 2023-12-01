// Obtener el estado del mensaje desde sessionStorage
const mensajeSesion = sessionStorage.getItem("mensajeSesion");

// Obtener el estado del mensaje desde localStorage
const mensajeMostrado = localStorage.getItem("mensajeMostrado");

// Obtener el estado del mensaje de bienvenida desde localStorage
const mensajeBienvenida = localStorage.getItem("mensajeBienvenida");

if (mensajeBienvenida === null || mensajeBienvenida === undefined) {
    // Mostrar el mensaje de bienvenida
    Swal.fire("Trebol Apartamentos le da la Bienvenida!");
    // Establecer el estado en localStorage
    localStorage.setItem("mensajeBienvenida", "true");
} else if (!mensajeSesion) {
    // Mostrar el mensaje de bienvenida durante la sesión actual
    Swal.fire("Bienvenido Nuevamente a Trebol Apartamentos!");
    // Establecer el estado en sessionStorage
    sessionStorage.setItem("mensajeSesion", "true");
} else if (!mensajeMostrado) {
    // Establecer el estado en localStorage
    localStorage.setItem("mensajeMostrado", "true");
}
