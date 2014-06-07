// ==UserScript==
// @name           insapass
// @namespace      scastiel
// @include        https://cas.insa-rennes.fr/*
// ==/UserScript==

var txtuser = document.getElementById("InputId").childNodes[0];
var txtpass = document.getElementById("InputPassword").childNodes[0];

function newsubmit(event) {
	if (document.getElementById("keep").checked) {
		GM_setValue("user", txtuser.value);
		GM_setValue("pass", txtpass.value);
	}
	
	GM_setValue("keep", document.getElementById("keep").checked);

    this._submit();
}

window.addEventListener('submit', newsubmit, true);

// Obtention du nom d'utilisateur et du mot de passe.
var user = GM_getValue("user");
var pass = GM_getValue("pass");
var keep = GM_getValue("keep");

// On remplit les champs avec le nom d'utilisateur et le mot de passe.
txtuser.value = user;
txtpass.value = pass;

var check = document.createElement("li");
check.innerHTML = "<input type=\"checkbox\" id=\"keep\" " + (keep ? "checked" : "unchecked") + "=\"true\">Conserver les informations pour la prochaine connexion</input>";
document.getElementById("Links").replaceChild(check, document.getElementById("Links").childNodes[1]);
//document.getElementById("Links").appendChild(check);