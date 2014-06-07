// ==UserScript==
// @name           Comentarios en el mundo
// @namespace      xolido.elmundo
// @description    Para comentar en el mundo
// @include        http://www.elmundo.es/elmundo/*
// ==/UserScript==

(function() {
var micode= new Object();
if (document.getElementById("tamano")) {
  var modif=document.getElementById("tamano");
  var mylink=document.createElement("a");
  mylink.href="http://meneame.net/submit.php?url="+document.location;

  var myimg=document.createElement("img");
  myimg.src="http://meneame.net/img/favicons/favicon4.ico";
  var img_container=document.createElement("div");
  img_container.style.cssFloat="left";
  img_container.style.paddingRight="5px";
  img_container.appendChild(myimg);
  var txt_container=document.createElement("div");
  txt_container.appendChild(img_container);
  txt_container.appendChild(document.createTextNode("Enviar a meneame.net"));
  mylink.appendChild(txt_container);
  
  if (modif.nextSibiling==null)
  modif.parentNode.appendChild(mylink);
  else
  modif.parentNode.insertBefore(mylink,modif.nextSibiling);
}else {
}

})();