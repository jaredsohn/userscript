// ==UserScript==
// @name           GMX - Autofokus auf Eingabefeld
// @namespace      http://www.gotu.de
// @description	   Setzt bei GMX und  Web.de/fm den Eingabefokus automatisch auf das erste Namensfeld, damit man nicht extra darauf klicken muss.
// @author         gotU
// @include        http://www.gmx.net/
// @include        http://gmx.net/
// @include        https://www.gmx.net/
// @include        https://gmx.net/
// @include        http://www.gmx.net/?status=hinweis
// @include        https://www.gmx.net/?status=hinweis
// @include        http://www.gmx.net/?status=login-failed
// @include        https://www.gmx.net/?status=login-failed
// @include        http://www.gmx.de/
// @include        http://gmx.de/
// @include        https://www.gmx.de/
// @include        https://gmx.de/
// @include        http://www.gmx.at/
// @include        http://gmx.at/
// @include        https://www.gmx.at/
// @include        https://gmx.at/
// @include        http://www.gmx.at/?status=hinweis
// @include        https://www.gmx.at/?status=hinweis
// @include        http://www.gmx.at/?status=login-failed
// @include        https://www.gmx.at/?status=login-failed
// @include        http://www.gmx.ch/
// @include        http://gmx.ch/
// @include        https://www.gmx.ch/
// @include        https://gmx.ch/
// @include        http://www.gmx.ch/?status=hinweis
// @include        https://www.gmx.ch/?status=hinweis
// @include        http://www.gmx.ch/?status=login-failed
// @include        https://www.gmx.ch/?status=login-failed

// @include        http://web.de/fm/
// @include        https://web.de/fm/
// ==/UserScript==



(function() {

/*gmx*/
if(location.host.indexOf("gmx.")>=0){
 var t=setTimeout("document.getElementById('inpLoginFreemailUsername').focus();",5);
}

/*web.de*/
if(location.host.indexOf("web.de")>=0){
 var u=setTimeout("document.getElementById('inpLoginUsername').focus();",5);
}


})();