// ==UserScript==
// @name           Shoutbox refresh rate
// @namespace      
// @include        http://www.thestudentroom.co.uk/forumdisplay.php?f=143
// ==/UserScript==
// Made by secretmessages

// window.onload = refreshPanel; 
// pigshoutbox.document.onload = refreshPanel;
// window.frames[pigshoutbox].onload = refreshPanel;

document.getElementById("pigshoutbox").onload = refreshPanel;

function refreshPanel()
{

frm=document.getElementsByName("pigshoutbox")[0];
frm.src=frm.src;
	     document.getElementById('pigshoutbox').src = document.getElementById('pigshoutbox').src;
		 // setTimeout('refreshPanel',5000);
}

