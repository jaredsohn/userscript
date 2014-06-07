// ==UserScript==
// @name           Goldpiece tabla de anotaciones
// @namespace      tabla de notas
// @include        http://m1.goldpiece.net/*
// ==/UserScript==
// ===========================================================================
// This script was made by Calico Jack.

var mynotes = GM_getValue("mynotes", "Click aquÃ­ para comenzar a poner notas!");
var version="1.1 by Calico Jack";http://img360.imageshack.us/img360/9712/fondo3lm3.png

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
	if(document.getElementById("notes").value == "Click aquÃ­ para comenzar a poner notas!")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.right == "-650px")
	{
		document.getElementById("notebar").style.right = "0px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.right = "-650px;"
}

// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:650px; position:fixed; right:-650px; height:380px; top:202px; z-index: 200; background:url(http://imgboot.com/images/djsuco/sinttulo3.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#nhead { height:30px; width:650px; position:absolute; right:-10px; top:0px; background:url(); line-height:28px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { right:-140px; }");
GM_addStyle("#nfoot { width:650px; height:3px; background:url(http://imgboot.com/images/enigmabrand/bgnotebarbot.gif); position:absolute; bottom:10px; right:0px;}");
GM_addStyle("#notes { position: absolute; top:31px; right:29px; left:3px; bottom:3px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
GM_addStyle("#notetab { background:url(http://imgboot.com/images/djsuco/notas.png); width:26px; height:175px; position:absolute; left:-26px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #fcf9fb;" href="http://www.goldpiece.net/index.php?seccion=especias&m=1&u=122"> Gold Piece - Tabla de Notas v'+version+'</a></div>';
nbHTML += '<textarea id="notes" cols="69" wrap="soft" rows="22" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////