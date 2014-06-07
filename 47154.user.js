// ==UserScript==
// @name           mynotes-tribalwars-travian-plapl.com
// @version        1.2.3f 
// @namespace      ( Ikariam - Travian - Erepublik )
// @description    made by EnigmaBrand - Developed By V1T4L for Persian user
// @include       http://ae1.tribalwars.ae/*
// @include        http://*.travian.*
// @include        http://*.erepublik.*
// @include        *
// @exclude        http://*.userscripts.*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand and translate to atabic  by araby.

var mynotes = GM_getValue("mynotes", "اكتب ملاحضاتك ثما اضغط على save      اخوكم  عربي اصيل لا تنسوني من دعوتكم");
var version="1.21";

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
	if(document.getElementById("notes").value == "Click here ;) ")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.right == "-412px")
	{
		document.getElementById("notebar").style.right = "0px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.right = "-412px;"
}

// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:427px; position:fixed; right:-412px;height:420px; top:115px; z-index: 50; border:0px black solid;}");
GM_addStyle("#nhead { height:30px; width:300px; position:absolute; right:0px; top:0px; line-height:35px; font-weight:bold; font-family:tahoma ; font-size:13px;} ");
GM_addStyle("#notebar:hover { right:0px; }");
GM_addStyle("#nfoot { width:412px; height:36px; position:absolute; bottom:-9px; right:-2px;}");
GM_addStyle("#notes { position: absolute; top:30px; right:27px; left:0px; bottom:0px; background: #FDF6C0; border:none; text-align:right; margin-right: 15 ;font-family:tahoma ;font-weight: normal; font-size: 12px; padding:10px; } ");
///// right note bar
GM_addStyle("#notetab { background:url(http://dc02.arabsh.com/i/00096/uchgz7o0awpr.png); width:43px; height:400px; position:absolute; left:-26px; top:26px; z-index:452; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<table border=0 ><td id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></td>';
nbHTML += '<td id="nhead" align=right><img src="http://dc02.arabsh.com/i/00096/0t41ec4421eb.png"></td>';
nbHTML += '<td background="data:image/gif;base64,R0lGODlhmgEBAJEAAPPdsuS4c/333QAAACH5BAAAAAAALAAAAACaAQEAAAIVhCKpy+0Po5y02ouz3rz7D4ZiiAAFADs="><div><textarea dir=rtl style="border-style: solid; border-width: 1px; text-align: right" id="notes" cols="70" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea></div></td>';
nbHTML += '<td id="nfoot"><img src="http://dc02.arabsh.com/i/00096/0t41ec4421eb.png"></td></table>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////