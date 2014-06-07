// ==UserScript==
// @name           coolrom instant leecher
// @namespace      http://www.kbstyle.net/program/greasemonkey/index.html
// @description    This userscript displays the download button directly and bypasses the time you normally have to wait (15 secs.)
// @include        http://www.coolrom.com/roms/*
// ==/UserScript==

(function(){
	document.getElementById("rom").innerHTML='<script language=javascript>time=0; download();</script>';
	var tempID, tempSID, romID, injectButton, injectNoscript;
	tempID = window.location.href.split("/")[5];
	tempSID = document.body.innerHTML.split("name=\"sid\" value=\"")[1].substring(0,32);
	injectButton = document.createElement("div");
	injectButton.innerHTML = "<form method=\"POST\" action=\"http://dl.coolrom.com/dl.php?"+ tempID +"\"><input type=\"hidden\" name=\"sid\" value=\"" + tempSID + "\"><input type=\"submit\" style=\"font: 8pt verdana\" value=\"Download Your File\" id=\"ddload\"></form>";
	romID = document.getElementById("rom");
	romID.parentNode.insertBefore(injectButton,romID);
	romID.style.visibility = "hidden";
})();