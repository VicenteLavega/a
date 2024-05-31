"use strict";

// Mostrar el contenido del tab seleccionado
function showTab(tabIndex) {
    const tabs = document.getElementsByClassName('tab-content');
    for (const tab of tabs) {
        tab.classList.remove('active');
    }
    tabs[tabIndex].classList.add('active');
}



// Menús disponibles por día
const menus = {
    lunes: new Menu(
        new PlatoPrincipal("Pollo a la parrilla", 400, 'img/lunes_plato_principal.jpg'),
        new Acompanamiento("Arroz con vegetales", 200, 'img/lunes_acompanamiento.jpg'),
        new Postre("Ensalada de frutas", 100, 'img/lunes_postre.jpg'),
        10
    ),
    martes: new Menu(
        new PlatoPrincipal("Pasta al pesto", 450, 'img/martes_plato_principal.jpg'),
        new Acompanamiento("Ensalada César", 150, 'img/martes_acompanamiento.jpg'),
        new Postre("Gelatina", 50, 'img/martes_postre.jpg'),
        12
    ),
    miercoles: new Menu(
        new PlatoPrincipal("Sopa de lentejas", 300, 'img/miercoles_plato_principal.jpg'),
        new Acompanamiento("Pan integral", 100, 'img/miercoles_acompanamiento.jpg'),
        new Postre("Yogur", 150, 'img/miercoles_postre.jpg'),
        8
    ),
    jueves: new Menu(
        new PlatoPrincipal("Carne asada", 500, 'img/jueves_plato_principal.jpg'),
        new Acompanamiento("Papas fritas", 350, 'img/jueves_acompanamiento.jpg'),
        new Postre("Helado", 200, 'img/jueves_postre.jpg'),
        15
    ),
    viernes: new Menu(
        new PlatoPrincipal("Pescado al horno", 350, 'img/viernes_plato_principal.jpg'),
        new Acompanamiento("Ensalada mixta", 100, 'img/viernes_acompanamiento.jpg'),
        new Postre("Tarta de manzana", 300, 'img/viernes_postre.jpg'),
        12
    ),
    sabado: new Menu(
        new PlatoPrincipal("Pizza", 600, 'img/sabado_plato_principal.jpg'),
        new Acompanamiento("Aros de cebolla", 250, 'img/sabado_acompanamiento.jpg'),
        new Postre("Brownie", 400, 'img/sabado_postre.jpg'),
        18
    ),
    domingo: new Menu(
        new PlatoPrincipal("Lasagna", 550, 'img/domingo_plato_principal.jpg'),
        new Acompanamiento("Pan de ajo", 200, 'img/domingo_acompanamiento.jpg'),
        new Postre("Cheesecake", 450, 'img/domingo_postre.jpg'),
        20
    )
};

// Actualizar el menú visualizado según el día seleccionado
function updateMenu() {
    const selectedDay = document.getElementById('dias').value;
    const menu = menus[selectedDay];

    document.getElementById('plato-principal-texto').innerText = menu.platoPrincipal.nombre;
    document.getElementById('plato-principal-imagen').src = menu.platoPrincipal.imagen;
    document.getElementById('acompanamiento-texto').innerText = menu.acompanamiento.nombre;
    document.getElementById('acompanamiento-imagen').src = menu.acompanamiento.imagen;
    document.getElementById('postre-texto').innerText = menu.postre.nombre;
    document.getElementById('postre-imagen').src = menu.postre.imagen;
}

// Array para guardar los menús comprados
let compras = [];

// Función para guardar la compra
function guardarCompra() {
    const selectedDay = document.getElementById('dias').value;
    const menuComprado = menus[selectedDay];

    // Agregar el pedido al array de compras sin modificar los objetos del menú original
    compras.push(new Consumo(selectedDay, menuComprado));

    alert("Compra realizada con éxito!");
    mostrarConsumo();
    showTab(0); // Ir a la sección de consumo
}

// Mostrar el consumo
function mostrarConsumo() {
    const consumoSemana = document.getElementById('consumo-semana');
    consumoSemana.innerHTML = '';

    const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    // Mostrar consumo semanal
    diasSemana.forEach(dia => {
        const menuDia = compras.filter(compra => compra.dia === dia);
        const consumo = document.createElement('div');
        if (menuDia.length) {
            const caloriasTotales = menuDia.reduce((total, compra) => total + compra.menu.getCaloriasTotales(), 0);
            consumo.innerText = `${dia.charAt(0).toUpperCase() + dia.slice(1)}: ${caloriasTotales} calorías consumidas`;
        } else {
            consumo.innerText = `${dia.charAt(0).toUpperCase() + dia.slice(1)}: No consumido`;
        }
        consumoSemana.appendChild(consumo);
    });
}

// Event listeners para actualizar el menú y manejar pedidos y pagos
document.getElementById('dias').addEventListener('change', updateMenu);
document.getElementById('realizar-pedido').addEventListener('click', () => {
    showTab(2);
});
document.getElementById('pagar').addEventListener('click', guardarCompra);

// Inicializar el menú al cargar la página
document.addEventListener('DOMContentLoaded', updateMenu);
