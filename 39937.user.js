// ==UserScript==
// @name           Notebar ITA
// @description    A tab at the left side, when you mouseover it, it'll be a notebar. Can be used anytime, anywhere.
// @include        *
//
// ==/UserScript==// 
// The original Script was made by EnigmaBrand.
// This script was edited by Weirdowz and it was re-edited by Il_maca.
//Comment: Questo script è la versione universale dell'IKARIAM Notebar, l'ho italianizzato e molto migliorato graficamente, spero ke vi possa essere utile
//in particolare dovete solo aggiornare la lista dei link in cuoi volete che ci sia e in cui non volote ke sia valido, per il resto è funzionante e bello!!

var mynotes = GM_getValue("mynotes", "Clicca qui per prendere appunti!");
var version="1.0";

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
	if(document.getElementById("notes").value == "Clicca qui per prendere appunti!")
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
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:402px; top:0px; z-index: 50; background:url(http://img70.imageshack.us/img70/6007/notebarmidba8.gif); background-repeat:repeat-y; border:1px black solid;}");

GM_addStyle("#nhead { height:28px; width:410px; position:absolute; left:0px; top:0px; background:url(http://img395.imageshack.us/img395/5152/12633925rq2.png); line-height:35px; font-weight:bold; font-size:11px;} ");

GM_addStyle("#notebar:hover { left:0px; }");

GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://img183.imageshack.us/img183/9518/notebarbotij8.gif); position:absolute; bottom:0px; left:0px;}");

GM_addStyle("#notes { width:376px; height:358px ; position: absolute; top:28px; left:13px; right:5px; bottom:5px; background: #BBBBBB; border:line; font-weight: bold; font-size: 11px; padding:3px; } ");

GM_addStyle("#notetab { background:url(http://img183.imageshack.us/img183/9381/bbbli8.png); width:27px; height:102px; position:absolute; right:-25px; top:3px; z-index:495; } ");

GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><center><a style="border-bottom:1px #808080 dotted; color: #0033FF;" >Blocco note'+'</a></center></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;
///// End of script /////
