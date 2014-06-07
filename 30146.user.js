// ==UserScript==
// @name           walla fix talkback feedback
// @namespace      walla.feedback
// @include        http://*.walla.co.il/?w=/@@/userfeedback/talkback.commit.ok
// @include        http://*.walla.co.il/*&tb=/c
// @description    fixes the confirmation when sending talkback to walla.co.il
// @date           2008-10-23
// @version        0.3
// ==/UserScript==


unsafeWindow.tbCommit = function()
{
	if (document.getElementsByName("writer_name")[0].value.length<1) {alert("Please enter your name"); document.getElementsByName("writer_name")[0].focus(); return false;}
	if (document.getElementsByName("title")[0].value.length<1) {alert("please write a subject"); document.getElementsByName("title")[0].focus(); return false;}
	var GUI_COMMIT = document.getElementById("GUI_COMMIT");
	var GUI_COMPOSE = document.getElementById("GUI_COMPOSE");
	GUI_COMMIT.style.display="block";
	GUI_COMPOSE.style.display="none";
	unsafeWindow.document.tb_form.submit();
}


var GUI_COMMIT = document.getElementById("GUI_COMMIT");
var GUI_COMPOSE = document.getElementById("GUI_COMPOSE");


if (document.URL.match( /^.*tb=\/c/ ) != null)
{
	if (GUI_COMMIT != null){GUI_COMMIT.childNodes[2].style.display="block"; GUI_COMMIT.childNodes[2].style.border="none";}
}
else if (document.URL.match( /^.*userfeedback\/talkback\.commit\.ok/ ) != null)
{
	var x;
	x = parent.document.getElementById("GUI_COMMIT_OK");
	if (x != null) x.style.display="block";
	x = parent.document.getElementById("GUI_COMMIT");
	if (x != null) x.style.display="none";
	x = parent.document.getElementById("GUI_COMPOSE");
	if (x != null) x.style.display="none";
}

