// ==UserScript==
// @name           Autologin on mybrute
// @author         ich
// @description    Automatisches Login auf mybrute.com, insofern die Benutzerdaten gespeichert sind
// @include        http://*.mybrute.com/login
// ==/UserScript==

var body = document.getElementsByTagName('body')[0];

if(body.getElementsByTagName('INPUT')[0].value != "")
{ 
	body.getElementsByTagName('INPUT')[1].click();
}