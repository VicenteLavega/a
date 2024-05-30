// Clase PlatoPrincipal
class PlatoPrincipal {
    constructor(nombre, calorias) {
        this.nombre = nombre;
        this.calorias = calorias;
    }
}

// Clase Acompañamiento
class Acompanamiento {
    constructor(nombre, calorias) {
        this.nombre = nombre;
        this.calorias = calorias;
    }
}

// Clase Postre
class Postre {
    constructor(nombre, calorias) {
        this.nombre = nombre;
        this.calorias = calorias;
    }
}

// Clase Menu
class Menu {
    constructor(platoPrincipal, acompanamiento, postre, precio) {
        this.platoPrincipal = platoPrincipal;
        this.acompanamiento = acompanamiento;
        this.postre = postre;
        this.precio = precio;
    }

    getCaloriasTotales() {
        return this.platoPrincipal.calorias + this.acompanamiento.calorias + this.postre.calorias;
    }
}

// Clase MetodoPago
class MetodoPago {
    constructor(nombre, numero, fechaVencimiento, codigoSeguridad) {
        this.nombre = nombre;
        this.numero = numero;
        this.fechaVencimiento = fechaVencimiento;
        this.codigoSeguridad = codigoSeguridad;
    }
}

// Clase Consumo
class Consumo {
    constructor(dia, menu) {
        this.dia = dia;
        this.menu = menu;
    }
}
