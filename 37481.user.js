// ==UserScript==
// @name           IDC Auto User/Pass Filler
// @namespace      http://userscripts.org/users/61596
// @description    Automatically fills the login form for the The Interdisciplinary Center (IDC), Herzliya website.
// @include        https://portal.idc.ac.il/CookieAuth.dll*
// @include        https://mp.idc.ac.il/CookieAuth.dll*
// @include		   https://portal.idc.ac.il/my.policy*
// @copyright      adamruss (mail@russ.co.il)
// ==/UserScript==

function set() 
{
	GM_setValue("gmidcUn", prompt("Username"));
	GM_setValue("gmidcPw", prompt("Password"));
	window.location.reload();
}

GM_registerMenuCommand('Set IDC Username/Password', set);

if (((GM_getValue("gmidcUn", "username")=="username") && (GM_getValue("gmidcPw", "password")=="password")) || ((GM_getValue("gmidcUn", "username")=="undefined") && (GM_getValue("gmidcPw", "password")=="undefined"))) 
{
	set();
}

if (document.addEventListener) 
{
	window.addEventListener("load", function() {
		setTimeout("document.forms[0].elements[0].value = \""+GM_getValue("gmidcUn", "username")+"\";", 100);
		setTimeout("document.forms[0].elements[1].value = \""+GM_getValue("gmidcPw", "password")+"\";", 100);
		setTimeout("document.forms[0].elements[2].click()",100);
		}, false);
}
else 
{
	window.document.onLoad = function() {
		setTimeout("document.forms[0].elements[0].value = \""+GM_getValue("gmidcUn", "username")+"\";", 100);
		setTimeout("document.forms[0].elements[1].value = \""+GM_getValue("gmidcPw", "password")+"\";", 100);
		setTimeout("document.forms[0].elements[2].click()",100);
	};
}