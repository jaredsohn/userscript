// ==UserScript==
// @name           VPF (Vendetta Più Facile)
// @namespace      http://userscripts.org/users/68105
// @description    Script para facilitar la navegación del Vendetta.
// @include        http://s*.vendetta*.*/vendetta/*
// ==/UserScript==

menu = false;
msgs = false;

if (location.href.match(/\/nav\.php/) == "\/nav.php") menu=true;
if (location.href.match(/\/msgshow\.php/) == "\/msgshow.php") msgs=true;

// Barra de navegación
if (menu) {
// Busca el menu (select)
	buildingselector = document.getElementsByTagName("select")[0];
	selectedbuilding = "";
	
	bldc = buildingselector.childNodes.length;
	blds = null;

	for (i = 0; i < bldc; i++) {
	// Busca el selected (donde esta parado)
		bldo = buildingselector.childNodes[i];
		if (bldo.nodeName == "OPTION" && bldo.getAttribute('selected') != null) blds = bldo;
	}
	
	// A partir del selected encuentro los ant y sig.
	bldp = blds.previousSibling;
	bldn = blds.nextSibling;

	if (bldp != null && bldp.nodeName == "OPTION") {
	// Link izq.
		lpbld = document.createElement("a");
		lpbldtext = document.createTextNode("< " + bldp.innerHTML);
		lpbld.setAttribute("onclick", 'document.getElementsByTagName("select")[0].value="'+bldp.value+'";document.getElementsByTagName("select")[0].onchange();');
		lpbld.setAttribute("style", "cursor:pointer;");
		lpbld.setAttribute("accesskey", "v");
		lpbld.appendChild(lpbldtext);
		buildingselector.parentNode.insertBefore( lpbld, buildingselector);
	}

	if (bldn != null && bldn.nodeName == "OPTION") {
	// Link der.
		lnbld = document.createElement("a");
		lnbldtext = document.createTextNode(" " + bldn.innerHTML+ " >");
		lnbld.setAttribute("onclick", 'document.getElementsByTagName("select")[0].value="'+bldn.value+'";document.getElementsByTagName("select")[0].onchange();');
		lnbld.setAttribute("style", "cursor:pointer;");
		lnbld.setAttribute("accesskey", "n");
		lnbld.appendChild(lnbldtext);
		buildingselector.parentNode.insertBefore( lnbld, buildingselector.nextSibling);
	}
}

// Mensajes
if (msgs) {
	var page = document.getElementsByTagName("input").item(0);
	newDiv = document.createElement("span");
	newDiv.innerHTML =  '<br> <input type="button" name="Submit" value="Seleccionar todo" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=true;}"> <input type="button" name="Submit2" value="Deseleccionar todo" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=false;}"> <input type="button" name="Submit3" value="Invertir seleción" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=!inputs[i].checked;}"> <input name="Submit3" type=submit value="Borrar">';
	var parentDiv = page.parentNode;
	parentDiv.insertBefore(newDiv, page);
}

