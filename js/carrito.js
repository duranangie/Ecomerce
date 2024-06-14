let productoEnCarrito = localStorage.getItem("productos-en-carrito");
productoEnCarrito = JSON.parse(productoEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProducto = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");




function cargarProductosCarritos(){

    if(productoEnCarrito && productoEnCarrito.length>0){

       

        contenedorCarritoVacio.classList.add("disable")
        contenedorCarritoProducto.classList.remove("disable");
        contenedorCarritoAcciones.classList.remove("disable");
        contenedorCarritoComprado.classList.add("disable");
    

        contenedorCarritoProducto.innerHTML=""

        productoEnCarrito.forEach(producto=>{
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML=`
    
                  <img class="carrito-producto-imagen" src="${producto.imagen}" alt="">
                                    <div class="carrito-producto-titulo">
                                        <small>titulo</small>
                                            <h3>${producto.titulo}</h3>
                                    </div>
                                    <div class="carrito-producto-cantidad">
                                        <small>cantidad</small>
                                        <p>${producto.cantidad}</p>
                                    </div>
                                    <div class="carrito-producto-precio">
                                        <small>precio</small>
                                        <p>$${producto.precio}</p>
                                    </div>
                                    <div class="carrito-producto-subtotal">
                                        <small>subtotal</small>
                                        <p>$${producto.precio * producto.cantidad}</p>
                                    </div>
                                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i>
                                            </button>
                                    
                                   
                        
            `;
    
            contenedorCarritoProducto.append(div);
        })
       
    
    
    }else{
        contenedorCarritoVacio.classList.remove("disable")
        contenedorCarritoProducto.classList.add("disable");
        contenedorCarritoAcciones.classList.add("disable");
        contenedorCarritoComprado.classList.add("disable");
    }
   
    actualizarBotonEliminar();
    actualizarTotal();
}

cargarProductosCarritos();


function actualizarBotonEliminar(){
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });


    
}


function eliminarDelCarrito(event){
    const idBoton = event.currentTarget.id;
    const index = productoEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productoEnCarrito.splice(index,1);
    cargarProductosCarritos();
    

    localStorage.setItem("productos-en-carrito",JSON.stringify(productoEnCarrito));
}


botonVaciar.addEventListener("click",vaciarCarrito);
function vaciarCarrito(){
    productoEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productoEnCarrito));
    cargarProductosCarritos();

}


function actualizarTotal(){
    const totalCalculado = productoEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`

}



botonComprar.addEventListener("click",comprarCarrito);
function comprarCarrito(){
    productoEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productoEnCarrito));
    
    contenedorCarritoVacio.classList.add("disable")
    contenedorCarritoProducto.classList.add("disable");
    contenedorCarritoAcciones.classList.add("disable");
    contenedorCarritoComprado.classList.remove("disable");

}
