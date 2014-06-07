// ==UserScript==
// @name           arkCAS
// @description    mot de passe "recette" en re7 et login "user" en prod
// @namespace      chooz
// @author         chooz
// @version        1.3.201404
// @updateURL      http://userscripts.org/scripts/source/156017.user.js
// @include        http*://cas*.gicm.net*
// @icon           http://www.jasig.org/sites/all/themes/jasig3/images/icon_cas_color.png
// ==/UserScript==

var sURL = window.location.toString();

var oInputUsername;		oInputUsername = document.getElementById('username');
var oInputPassword;		oInputPassword = document.getElementById('password');

if (sURL.match(/cas\.rec\.gicm\.net/)) {  // pre-renseigne mot de passe "recette" en re7
	oInputPassword.value='recette';
	oInputUsername.focus();
	oInputUsername.select();
} else if (sURL.match(/cas\.gicm\.net/)) {  // pre-renseigne login "user" en prod
	oInputUsername.value='user';
	oInputPassword.focus();
	oInputPassword.select();
}


// affiche un encart avec l'URL sur laquelle CAS propose de se loguer
var oForm = document.getElementById('fm1');
var sURLAppli = oForm.action;
sURLAppli = decodeURIComponent(sURLAppli.replace(/.*service=(.*)/, "$1"));

GM_addStyle("   \
	fieldset#description {color:#D3DDE3 !important; border-color:#D3DDE3 !important;}	\
	fieldset#description:hover {color:#0A78BF !important; border-color:#0A78BF !important;}	\
");

var oAjout = document.createElement('fieldset');
oAjout.setAttribute('id', "description");
oAjout.innerHTML = "<legend>CAS Login</legend><br />" + sURLAppli + "<br /><br />";
oForm.appendChild(oAjout);
