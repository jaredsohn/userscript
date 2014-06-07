// ==UserScript==
// @name           Loan Watch3
// @namespace      http://userscripts.org/users/57047/scripts
// @description    A tab at the left side, when you mouseover it, it'll be a notebar. Can be used anytime, anywhere.
// @include        http://www.legacy-game.net/bank.php*
//
// ==/UserScript==// 
// The original Script was made by EnigmaBrand.
// This script was edited by Weirdowz.

var mynotes = GM_getValue("mynotes", " { font-size: 11px; color: blue; } something to go here? ");
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
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:400px; top:0px; z-index: 50; background:url(http://img199.imageshack.us/img199/6141/bgt5.png); background-repeat:repeat-y; border:1px black solid;}");

GM_addStyle("#nhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://img190.imageshack.us/img190/6051/tpop.png); line-height:38px; font-weight:bold; font-size:11px;} ");

GM_addStyle("#notebar:hover { left:0px; }");

GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://img11.imageshack.us/img11/3633/btyu7.png); position:absolute; bottom:0px; left:0px;}");

GM_addStyle("#notes { width:370px; height:364px ; position: absolute; top:31px; left:29px; right:5px; bottom:5px; font-family: Arial; background: #000000; border:line; font-weight: normal; font-size: 11px; color: white; overflow: auto; padding:3px; } ");

GM_addStyle("#notetab { background:url(http://img41.imageshack.us/img41/2721/loanwat.png); width:27px; height:102px; position:absolute; right:-27px; top:0px; z-index:495; } ");

GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><center><a style="border-bottom:1px #808080 dotted; color: #808080;" href="http://userscripts.org/scripts/show/29036"></a></center></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////