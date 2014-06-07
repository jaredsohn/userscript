// ==UserScript==
// @name           Barra de Notas Mendigogame
// @namespace      Sin unload
// @description    Una barrita para tomar notas...
// @include        http://*.mendigogame.es/*
//
// ==/UserScript==// 
// The original Script was made by Marverickds.
// This script was edited by Marverickds.
// This script was redesigned and Translated by Marverickds xD.


var mynotes = GM_getValue("mynotes", "Click aqui para empezar a escribir!");
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
	if(document.getElementById("notes").value == "Click aqui para empezar a escribir!")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.left == "-400px")
	{
		document.getElementById("notebar").style.left = "0px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.left = "-400px;"
}

// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:400px; position:fixed; left:-400px; height:300px; top:0px; z-index: 50; background:url(http://img25.xooimage.com/files/5/e/9/wood3-162b380.jpg); border:0px black solid;}");

GM_addStyle("#nhead { height:70px; width:400px; position:absolute; left:0px; top:0px; background:url(http://img25.xooimage.com/files/5/e/9/wood3-162b380.jpg); line-height:38px; font-weight:bold; font-size:13px;} ");

GM_addStyle("#notebar:hover { left:0px; }");


GM_addStyle("#notes { width:375px; height:330px ; position: absolute; top:50px; left:10px; right:5px; bottom:5px; background-color:transparent; border:0px black solid; font-weight: bold; font-size: 18px; padding:3px; color: yellow;} ");

GM_addStyle("#notetab { background:url(http://inodes.pennergame.de/es_ES/avatare/180763_small.jpg); width:30px; height:130px; position:absolute; right:-30px; top:0px; z-index:495; } ");

GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onclick="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><center><a style="border-bottom:1px #000080 dotted; color: #000080;" href="http://cambio.mendigogame.es/change_please/8226213/">Barra de Notas Mendigo Game  v'+version+'</a></center></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
document.getElementById("notebar").innerHTML = nbHTML;



///// End of script /////