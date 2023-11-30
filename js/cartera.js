// Función para obtener datos
const obtenerDatos = async () => {
  try {
    const response = await fetch("../json/data.json");
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
};

// Función para crear la tabla
const crearTabla = (columnsToShow, headersMapping, datos) => {
  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-hover");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  columnsToShow.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = headersMapping[column] || column;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  datos.forEach((item) => {
        const row = document.createElement("tr");
        columnsToShow.forEach((column) => {
          const cell = document.createElement("td");
          cell.textContent = item[column]; 
          row.appendChild(cell);
        });
        tbody.appendChild(row);
      });

  if (tbody.children.length === 0) {
    const noDataRow = document.createElement("tr");
    const noDataCell = document.createElement("td");
    noDataCell.colSpan = columnsToShow.length;
    noDataCell.textContent = "No hay datos disponibles.";
    noDataRow.appendChild(noDataCell);
    tbody.appendChild(noDataRow);
  }

  table.appendChild(tbody);
  return table;
};

// Función para mostrar pagos
const mostrarCartera = (datos) => {
  const columnsToShow = [
    "REF_PAGO",
    "TORRE",
    "APTO",
    "PROPIETARIO",
    "INTERES",
    "SANCION",
    "SALDO_ANTERIOR",
    "CUOTA_MENSUAL",
    "PAGO_NO_OPORTUNO",
    "ABONO",
    "EXOGENA",
    "BINGO",
    "CUOTA_EXTRAORDINARIA",
    "TOTAL_CARTERA",
    "CARTERA_2",
  ];

  // Mapeo de encabezados
  const headersMapping = {
    REF_PAGO: "Referencia de Pago",
    TORRE: "Torre",
    APTO: "Apartamento",
    ANIO: "Año",
    MES: "Mes Facturado",
    PROPIETARIO: "Propietario",
    INTERES: "Interes",
    SANCION: "Sanción",
    SALDO_ANTERIOR: "Saldo Anterior",
    CUOTA_MENSUAL: "Cuota Administración",
    PAGO_NO_OPORTUNO: "Administración + Recargo",
    ABONO: "Abono",
    EXOGENA: "Exogena",
    BINGO: "Bingo",
    CUOTA_EXTRAORDINARIA: "Cuota Extraordinaria",
    TOTAL_CARTERA: "Cartera",
    CARTERA_2: "Cartera + Recargo",
  };

  listado.innerHTML = ""; // Limpiar contenido anterior
  const table = crearTabla(columnsToShow, headersMapping, datos);
  listado.appendChild(table);
};

// Función para filtrar cartera
const filtrarCartera = async (e) => {
  e.preventDefault();

  const filtroInput = document.getElementById("filtro");
  const radioSeleccionado = document.querySelector(
    'input[name="filtroTipo"]:checked'
  );

  // Deshabilitar el input de texto si la opción seleccionada es "todos"
  filtroInput.disabled = radioSeleccionado.value === "todos";

  const filtro = filtroInput.value.trim(); // Eliminar espacios al inicio y al final

  try {
    const datos = await obtenerDatos();
    if (!datos) {
      Swal.fire("No hay datos disponibles.");
      return;
    }

    const pagosFiltrados = datos.filter((pago) => {
      const campo = radioSeleccionado ? radioSeleccionado.value : null;

      if (!campo || !filtro) {
        return true; // Si no hay filtro, muestra todos los pagos
      }
      return String(pago[campo]).trim() === filtro;
    });

    mostrarCartera(pagosFiltrados);
  } catch (error) {
    console.error("Error al filtrar pagos:", error);
  }
};

// Llama a la función obtenerDatos al cargar la página
obtenerDatos().then((datos) => {
  if (datos && datos.length > 0) {
    mostrarCartera(datos);
  }

  const filtroInput = document.getElementById("filtro");
  const radios = document.querySelectorAll('input[name="filtroTipo"]');

  // Agrega un evento change a cada radio para gestionar la habilitación/deshabilitación del input
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      filtroInput.disabled = radio.value === "todos";

      // Borra el contenido del input si la opción seleccionada es "todos"
      if (radio.value === "todos") {
        filtroInput.value = "";
      }
    });
  });

  // Deshabilitar el input al cargar la página si la opción "todos" está seleccionada
  const radioSeleccionado = document.querySelector(
    'input[name="filtroTipo"]:checked'
  );
  filtroInput.disabled = radioSeleccionado.value === "todos";
});

const cCartera = document.getElementById("consultaCartera");
cCartera.addEventListener("submit", filtrarCartera);
