// ==UserScript==
// @name           Ikariam Notebar
// @version        1.2
// @namespace      http://ikariamwikibar.googlepages.com/home
// @description    Adds a small tab to the left side of the game window. When you mouseover it, it will expand to show you the note taking window. Click into it and begin typing. The script saves what you type as you type it so you don't have to worry about clicking any save buttons. Click the tab again and it hides it!
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand.

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
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:400px; top:115px; z-index: 50; background:url(http://imgboot.com/images/enigmabrand/bgnotebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#nhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://imgboot.com/images/enigmabrand/bgnotebartop.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { left:0px; }");
GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://imgboot.com/images/enigmabrand/bgnotebarbot.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#notes { position: absolute; top:31px; left:29px; right:3px; bottom:3px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
GM_addStyle("#notetab { background:url(http://www.imgboot.com/images/enigmabrand/tabnotebar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts">Ikiariam Notebar v'+version+'</a></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////