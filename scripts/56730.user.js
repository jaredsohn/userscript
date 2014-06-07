// ==UserScript==
// @name           Ikariam Notebar test
// @version        1.9.1 Fix version.
// @namespace      http://www.compactador.com.ar
// @description    Añade un pequeño tab a la izquierda de la pantalla de juego. Al pasar el mouse sobre él, se expande y muestra una ventana de notas. Clickeando dentro se puede tipear lo que queramos. El script salva lo que escribes automáticamente, no existe el botón save. Clickeando en el tab, éste se esconde.
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand.
// Este script fue modificado por HuMoR ante la falta de las imágenes.
// Las imágenes fueron tomadas de el notebar de KingsAge, modificación del de EnigmaBrand por Kyler (http://userscripts.org/scripts/show/42044) y editadas por mi (HuMoR) en photoshop.

var mynotes = GM_getValue("mynotes", "Click here to begin taking notes!");
var version="1.9";

// Create my div and append it to the body tag
vnotebar = document.createElement("div");
vnotebar.setAttribute("id", "notebar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vnotebar);

// This is the function that saves your notes
unsafeWindow.savenotes = function() {
	window.setTimeout(GM_setValue, 0, "mynotes", document.getElementById("notes").value);
}

// This is the function that clears the window if it has the default value
unsafeWindow.startnotes = function() {
	if(document.getElementById("notes").value == "Click here to begin taking notes!")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.left == "-412px")
	{
		document.getElementById("notebar").style.left = "0px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.left = "-412px;"
}


// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:400px; top:115px; z-index: 50; background:url(http://img33.imageshack.us/img33/3693/notebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#nhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://img32.imageshack.us/img32/3596/notebartop2.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { left:0px; }");
GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://img12.imageshack.us/img12/8996/notebarbot.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#notes { position: absolute; top:31px; left:29px; right:3px; bottom:3px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
GM_addStyle("#notetab { background:url(http://img36.imageshack.us/img36/2189/notebartab.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/scripts/show/50307">Ikiariam Notebar v'+version+'</a></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////