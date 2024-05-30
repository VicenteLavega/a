// Mostrar el contenido del tab seleccionado
function showTab(tabIndex) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    tabs[tabIndex].classList.add('active');
}

// Filtrar la visualización del consumo
function filterConsumo() {
    var filtro = document.getElementById('filtro').value;
    var semana = document.getElementById('consumo-semana');
    var mes = document.getElementById('consumo-mes');

    if (filtro === 'semana') {
        semana.style.display = 'block';
        mes.style.display = 'none';
    } else if (filtro === 'mes') {
        semana.style.display = 'none';
        mes.style.display = 'block';
    }
}

// Menús disponibles por día
const menus = {
    lunes: new Menu(
        new PlatoPrincipal("Pollo a la parrilla", 400),
        new Acompanamiento("Arroz con vegetales", 200),
        new Postre("Fruta fresca", 100),
        10
    ),
    martes: new Menu(
        new PlatoPrincipal("Pasta al pesto", 450),
        new Acompanamiento("Ensalada César", 150),
        new Postre("Gelatina", 50),
        12
    ),
    miercoles: new Menu(
        new PlatoPrincipal("Sopa de lentejas", 300),
        new Acompanamiento("Pan integral", 100),
        new Postre("Yogur", 150),
        8
    ),
    jueves: new Menu(
        new PlatoPrincipal("Carne asada", 500),
        new Acompanamiento("Papas fritas", 350),
        new Postre("Helado", 200),
        15
    ),
    viernes: new Menu(
        new PlatoPrincipal("Pescado al horno", 350),
        new Acompanamiento("Ensalada mixta", 100),
        new Postre("Tarta de manzana", 300),
        12
    ),
    sabado: new Menu(
        new PlatoPrincipal("Pizza", 600),
        new Acompanamiento("Aros de cebolla", 250),
        new Postre("Brownie", 400),
        18
    ),
    domingo: new Menu(
        new PlatoPrincipal("Lasagna", 550),
        new Acompanamiento("Pan de ajo", 200),
        new Postre("Cheesecake", 450),
        20
    )
};

// Actualizar el menú visualizado según el día seleccionado
function updateMenu() {
    const selectedDay = document.getElementById('dias').value;
    const menu = menus[selectedDay];

    document.getElementById('plato-principal-texto').innerText = menu.platoPrincipal.nombre;
    document.getElementById('acompanamiento-texto').innerText = menu.acompanamiento.nombre;
    document.getElementById('postre-texto').innerText = menu.postre.nombre;
}

// Array para guardar los menús comprados
let compras = [];

// Función para guardar la compra
function guardarCompra() {
    const selectedDay = document.getElementById('dias').value;
    const menuComprado = menus[selectedDay];
    compras.push(new Consumo(selectedDay, menuComprado));

    alert("Compra realizada con éxito!");
    mostrarConsumo();
    showTab(3); // Ir a la sección de consumo
}

// Mostrar el consumo
function mostrarConsumo() {
    const consumoSemana = document.getElementById('consumo-semana');
    const consumoMes = document.getElementById('consumo-mes');

    consumoSemana.innerHTML = '';
    consumoMes.innerHTML = '';

    const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Mostrar consumo semanal
    diasSemana.forEach(dia => {
        const menuDia = compras.filter(compra => compra.dia === dia);
        const consumo = document.createElement('div');
        if (menuDia.length) {
            const caloriasTotales = menuDia[0].menu.getCaloriasTotales();
            consumo.innerText = `${dia.charAt(0).toUpperCase() + dia.slice(1)}: ${caloriasTotales} calorías consumidas`;
        } else {
            consumo.innerText = `${dia.charAt(0).toUpperCase() + dia.slice(1)}: No consumido`;
        }
        consumoSemana.appendChild(consumo);
    });

    // Mostrar consumo mensual (para simplificar, mostramos los días de la semana también en el mes)
    meses.forEach(mes => {
        const consumo = document.createElement('div');
        consumo.innerText = `${mes}: Consumo detallado en días de la semana`;
        consumoMes.appendChild(consumo);
    });
}

// Event listener para actualizar el menú al cambiar el día
document.getElementById('dias').addEventListener('change', updateMenu);
document.getElementById('realizar-pedido').addEventListener('click', function() {
    showTab(2);
});
document.getElementById('pagar').addEventListener('click', guardarCompra);
