// ==UserScript==
// @name       Limitar tamaño de post
// @namespace  http://userscripts.org
// @version    0.3
// @description  Limita el tamaño de post a 30em
// @match      http://www.forocoches.com/foro/showthread.php?*
// @copyright  2013+, mansonjesus
// ==/UserScript==


//Añade un estilo a la cabecera de la página para que el post tenga como máximo 30em y que muestre scroll en caso de que el contenido se salga.
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.alt1 #HOTWordsTxt{max-height:30em;overflow: auto;}';
document.getElementsByTagName('head')[0].appendChild(style);


var posts = document.getElementsByName("HOTWordsTxt");

//Función que se inserta en cada botón para colapsar/descolapsar. Añade o elimina un style donde se indica que no hay max-height.
var script = "javascript:obj=this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('colapsable')[0];if(obj.getAttribute('style')==null){obj.setAttribute('style', 'max-height:none !important;');}else{obj.removeAttribute('style')};";

//Insertar los botones de colapsar descolapsar
for(i=0;i<posts.length;i++){
    
    var colapsar = document.createElement("a");
    colapsar.innerHTML = "[Expandir/Colapsar]";
    colapsar.setAttribute("onclick", script);
    colapsar.setAttribute("class", "expandir");
    
    posts[i].parentNode.parentNode.parentNode.childNodes[0].childNodes[3].appendChild(colapsar);
    posts[i].setAttribute("class", "colapsable");
    
}
