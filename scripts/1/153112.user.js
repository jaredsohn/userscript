// ==UserScript==
// @name       Ema_Cursos_QA
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  ayuda en la validación de cursos
// @include    http://*
// @copyright  2012+, Ismael
// @run-at         document-end

// ==/UserScript==
const esp = "http://www.admines.emagister.es/administradores/curso/edit?";
const ita = "http://www.adminit.emagister.es/administradores/curso/edit?";
const arg = "http://www.adminar.emagister.es/administradores/curso/edit?";
const chi = "http://www.admincl.emagister.es/administradores/curso/edit?";
const col = "http://www.adminco.emagister.es/administradores/curso/edit?";
const mex = "http://www.adminmx.emagister.es/administradores/curso/edit?";
const fra = "http://www.adminfr.emagister.es/administradores/curso/edit?";
const uka = "http://www.adminuk.emagister.es/administradores/curso/edit?";
const bra = "http://www.adminbr.emagister.es/administradores/curso/edit?";
const ind = "http://www.adminin.emagister.es/administradores/curso/edit?";

const paises = new Array(esp, ita, arg, chi, col, mex, fra, uka, bra, ind);

//ObtenciÃÂÃÂ³n de la URL de la pagina en la que estamos entrando
var dire = document.URL;
dire = dire.slice(0,59);

//Verifica si estamos entrando en el administrador de cursos
var pais = paises.indexOf(dire);
if (pais != -1){
    
    function enviando(estado){
            var url_curso = document.URL;
            var nombre_curso = document.getElementById("titulo").value;
            var temp = new Array();
            
            temp = url_curso.split("cu_id=");
            var id_curso= temp[1];
            
            setTimeout(function() {
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://ematools.giglobaljob.com/validacion.php",
                    data: "nombre_curso="+nombre_curso+"&id_curso="+id_curso+"&estado=validado-QA",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function(response) {
                    if (response.responseText == 0){
                            window.open("http://ematools.giglobaljob.com/index2.php?nombre_curso="+encodeURI(nombre_curso)+"&id_curso="+encodeURI(id_curso)+"&estado=validado-QA", "_blank");
                    }
                    ;},
                    synchronous: true
                });
            },0);
    }
    //*************************************************************************************
    //creo los objetos que corresponden a los botones
    var guardar_validar = document.getElementsByName("submit_guardarvalidar_but")[0];
    var guardar = document.getElementsByName("submit_guardar")[0];
    var eliminar = document.getElementsByName("submit_delete")[0];
    
    //genero los eventos click para los botones de manera que interactuen con Ajax
    guardar_validar.addEventListener("click",function(){return enviando("validado")}, true);
    guardar.addEventListener("click", function(){return enviando("guardado")}, true);
    eliminar.addEventListener("click", function(){return enviando("eliminado")}, true);
    
}