// ==UserScript==
// @name           Grepo redirection automatique
// @namespace      Aqua
// @description    Redirige automatiquement quand on clique sur des liens dans Grepolis qui amènent sur des pages externes
// @include        *grepolis*
// ==/UserScript==

var URLs;
var i=0;
var currentLocation =  document.location.href;

if (currentLocation.indexOf('http://fr.grepolis.com/start/redirect?url=h')!=-1)
{
i=1;
var newLocation = currentLocation.replace('http://fr.grepolis.com/start/redirect?url=h','h');
newLocation = unescape(newLocation);
document.location.href = newLocation;
}
