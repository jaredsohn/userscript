// ==UserScript==
// @name           KingsAge - Notebar
// @namespace      Save your notes...
// @description    You can save notes with this script...
// @include        http://*.kingsage.*/*
// ==/UserScript==

var mynotes = GM_getValue("mynotes", "Not yazmaya baslamak icin buraya tiklayin!");
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
	if(document.getElementById("notes").value == "Not yazmaya baslamak icin buraya tiklayin!")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.left == "-412px")
	{
		document.getElementById("notebar").style.left = "-120px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.left = "-412px;"
}

// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:385px; top:25px; z-index: 50; background: #9EB642;}");
GM_addStyle("#nhead { height:15px; width:410px; position:absolute; left:0px; top:370px; background: #9EB642; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { left:0px; }");
GM_addStyle("#nfoot { width:410px; height:0px; background:url(http://www.oyun.sitesi.tc/styles/4poziomSEO/theme/images/cat_back.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#notes { width:394px; height:364px ; position: absolute; top:9px; left:9px; right:0px; bottom:0px; background: #F3F3F3; font-weight: bold; font-size: 11px; padding:0px; } ");
GM_addStyle("#notetab { background:url(http://img519.imageshack.us/img519/4369/notlarph1.jpg); width:27px; height:102px; position:absolute; right:-27px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nhead"><center><a style="border-bottom:1px #808080 dotted; color: #FFFFFF;" href="http://www.bilgilenin.net/kingsage">www.bilgilenin.net/kingsage</a></center></div>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////