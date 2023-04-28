// Obtener el botón que abre el modal
var btn = document.querySelectorAll("button#modal-button");

// Obtene todas las modales de página
var modals = document.querySelectorAll('.modal-web');

// Obtener el elemento <span> que cierra el modal
var spans = document.getElementsByClassName("close");

// Abrir el modal, cuando la usuario haga clic en el botón
for (var i = 0; i < btn.length; i++) {
 btn[i].onclick = function(e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";
 }
}

// Cerrar el modal, cuando el usuario haga clic en <span> (x)
for (var i = 0; i < spans.length; i++) {
 spans[i].onclick = function() {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
    }
 }
}

// Cerrar el modal, cuando el usuario haga clic en cualquier lugar fuera del modal
window.onclick = function(event) {
    if (event.target.classList.contains('modal-web')) {
     for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
     }
    }
}