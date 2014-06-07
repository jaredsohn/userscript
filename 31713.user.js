// ==UserScript==
// @name           Ikariam Notas
// @namespace      http://s*.ikariam.*/*
// @description    Para anotar coisas importantes. XD
// @include        http://s*.ikariam.*/*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand.

var mynotes = GM_getValue("mynotes", "Clica aqui para come&ccedil;ar a tomar notas!");
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
	if(document.getElementById("notes").value == "Clica aqui para come&ccedil;ar a tomar notas!")
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
GM_addStyle("#notebar { width:410px; position:fixed; left:-418px; height:400px; top:9px; z-index: 50; background:url(http://www.picamatic.com/show/2008/08/14/04/813155_410x1.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#nhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://www.picamatic.com/show/2008/08/14/04/813156_410x30.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { left:0px; }");
GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://www.picamatic.com/show/2008/08/14/04/813156_410x30.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#notes { position: absolute; top:31px; left:29px; right:3px; bottom:3px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
GM_addStyle("#notetab { background:url(http://www.picamatic.com/show/2008/08/14/04/813257_41x154.png); width:41px; height:154px; position:absolute; right:-41px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/62821/scripts">Ikariam Notas</a></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////