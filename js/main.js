//PRODUCTOS//
const productos = [
    //ALFAJORES//
    {
        id: "Alfajor-01",
        titulo: "Alfajor Coco Late",
        imagen: "./img/alfajores/coco.jpg",
        categoria:{
            nombre: "alfajores",
            id: "alfajores"
        },
        precio: 25,

    },
    {
        id: "Alfajor-02",
        titulo: "Alfajor Granolate",
        imagen: "./img/alfajores/granolate.jpg",
        categoria:{
            nombre: "alfajores",
            id: "alfajores"
        },
        precio: 105,

    },
    {
        id: "Alfajor-03",
        titulo: "Alfajor Marley Blanco",
        imagen: "./img/alfajores/marley.jpg",
        categoria:{
            nombre: "alfajores",
            id: "alfajores"
        },
        precio: 85,

    },
    {
        id: "Alfajor-04",
        titulo: "Alfajor Surprise",
        imagen: "./img/alfajores/surprise.jpg",
        categoria:{
            nombre: "alfajores",
            id: "alfajores"
        },
        precio: 35,

    },
    {
        id: "Alfajor-05",
        titulo: "Alfajor Blakc Triple",
        imagen: "./img/alfajores/triple.jpg",
        categoria:{
            nombre: "alfajores",
            id: "alfajores"
        },
        precio: 50,

    },

    //CARAMELOS//
    {
        id: "Caramelos-01",
        titulo: "Caramelos Butler Toffy",
        imagen: "./img/caramelos/buter.jpg",
        categoria:{
            nombre: "caramelos",
            id: "caramelos"
        },
        precio: 270,

    },
    {
        id: "Caramelos-02",
        titulo: "Caramelos HipoPo",
        imagen: "./img/caramelos/hipo.jpg",
        categoria:{
            nombre: "caramelos",
            id: "caramelos"
        },
        precio: 80,

    },
    {
        id: "Caramelos-03",
        titulo: "Caramelos Arcor Miel",
        imagen: "./img/caramelos/miel.jpg",
        categoria:{
            nombre: "caramelos",
            id: "caramelos"
        },
        precio: 100,

    },
    {
        id: "Caramelos-04",
        titulo: "Caramelos Pico Dulce",
        imagen: "./img/caramelos/pico.jpg",
        categoria:{
            nombre: "caramelos",
            id: "caramelos"
        },
        precio: 120,

    },
    {
        id: "Caramelos-05",
        titulo: "Caramelos Sugus Surtidos",
        imagen: "./img/caramelos/sugus.jpg",
        categoria:{
            nombre: "caramelos",
            id: "caramelos"
        },
        precio: 180,

    },
        //CHOCOLATES//
        {
            id: "Chocolate-01",
            titulo: "Chocolate Block",
            imagen: "./img/chocolates/Block.jpg",
            categoria:{
                nombre: "chocolates",
                id: "chocolates"
            },
            precio: 420,
    
        },
        {
            id: "Chocolate-02",
            titulo: "Chocolate Cadbury",
            imagen: "./img/chocolates/cadbury.jpg",
            categoria:{
                nombre: "chocolates",
                id: "chocolates"
            },
            precio: 135,
    
        },
        {
            id: "Chocolate-03",
            titulo: "Chocolate FullMani",
            imagen: "./img/chocolates/Fullmani.jpg",
            categoria:{
                nombre: "chocolates",
                id: "chocolates"
            },
            precio: 90,
    
        },
        {
            id: "Chocolate-04",
            titulo: "Chocolate Nikolo",
            imagen: "./img/chocolates/Nikolo.jpg",
            categoria:{
                nombre: "chocolates",
                id: "chocolates"
            },
            precio: 55,
    
        }
    
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

   contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalle">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
       

`;
        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    
}

cargarProductos(productos);


botonesCategoria.forEach(boton=> {
    boton.addEventListener("click", (e) =>{

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productosboton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosboton);

        }else{
            cargarProductos(productos);
        }
       

    })
})



function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    });

}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if(productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();

}else{

    productosEnCarrito = [];

}


function agregarCarrito(e){

    const idBoton= e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }
    
    console.log(productosEnCarrito);

   actualizarNumerito();

   localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

