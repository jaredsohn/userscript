// ==UserScript==
// @name           OGame Login öffnen
// @namespace      ogame
// @description    Öffnet automatisch die Loginbox und setzt das Universum auf Kassiopeia
// @include        http://ogame.de/
// ==/UserScript==


function showLoginBox() {
	document.getElementById('login').style.display="block";
	document.getElementById('serverLogin').value="uni111.ogame.de";
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", true, true);
	document.getElementById('serverLogin').dispatchEvent(evt);
	var name = GM_getValue("og_loginname", "");
	if(name == "") {
		document.getElementById('usernameLogin').focus();
	} else {
		document.getElementById('usernameLogin').value = name;
		document.getElementById('passwordLogin').focus();	
	}
}
document.body.addEventListener("load", showLoginBox, true);

function saveLoginName() {
	if(document.getElementById('usernameLogin').value != "") {
		if(document.getElementById('usernameLogin').value != GM_getValue("og_loginname", ""))
		{
			GM_setValue("og_loginname", document.getElementById('usernameLogin').value);
			alert("OGameLogin-Script: Name gespeichert.");
		}
	}
}
document.getElementById('usernameLogin').addEventListener("blur", saveLoginName, true);