// ==UserScript==
// @name           Ikariam_notebar
// @namespace      (Ikariam_note)
// @description    note
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==// 
// The original Script was made by EnigmaBrand.
// This script was edited by Weirdowz.

var mynotes = GM_getValue("mynotes", "歡迎使用!請輸入你想紀錄的事情^^");
var version="2.0";

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
	if(document.getElementById("notes").value == "歡迎使用!請輸入你想紀錄的事情^^")
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
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:408px; top:150px; z-index: 50; background:blue; background-repeat:repeat-y; border:2px #FFFFFF solid;}");

GM_addStyle("#nhead {height:20px; width:410px; position:absolute; left:0px; top:0px; background: #B39A72; line-height:19px; font-weight:bold; font-size:11px;} ");

GM_addStyle("#notebar:hover { left:0px; }");

GM_addStyle("#nfoot { ; position:absolute; bottom:0px; left:0px;}");

GM_addStyle("#notes { width:381px; height:370px ; position: absolute; top:24px; left:10px; right:1px; bottom:5px; background: #FDF6C0; border:line; font-weight: bold; font-size:13px; padding:4px; } ");

GM_addStyle("#notetab { background:url(http://img441.imageshack.us/img441/8913/notey.png); width:27px; height:102px; position:absolute; right:-27px; top:0px; z-index:495; } ");

GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><center><font color="#FCF560" >note</font></center></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////