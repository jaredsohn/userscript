// ==UserScript==
// @name           Anti-Urlanonimo
// @namespace      Jordi13
// @description    Quita los molestos links de urlanonimo.com
// @include        *
// ==/UserScript==

Creaado por Jordi13
http://taringa.net/perfil/Jordi13

element = document.getElementsByTagName("a");
for(var i = 0; i < element.length; i++)
{
	if(element[i].href.match("http://www.urlanonimo.com/?"))
	{
		element[i].href = element[i].href.substr(27);
	}
}