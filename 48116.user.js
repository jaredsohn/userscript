// ==UserScript==
// @name           Tuenti Link
// @namespace      Fotos
// @include        http://*.tuenti.com/*foto*
// @description    Tuenti - Link de la foto que se está viendo
// ==/UserScript==

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastchild == targetElement) {
		parent.appendChild(newElement);
	} 
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

var foto = document.createElement("input").wrappedJSObject;
var link = document.wrappedJSObject.getElementById("photo_next_link");
if (link != null) {
	foto.type="text";
	foto.style.width="500px";
	foto.style.border="1px solid #ccc";
	foto.id="enlaceFoto";
	insertAfter(foto,link);
}

var source = "";
if (document.wrappedJSObject.getElementById("laFoto") != null) {
	source = document.wrappedJSObject.getElementById("laFoto").src;
	foto.value = source;
}