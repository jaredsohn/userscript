// ==UserScript==
// @name Handelsblatt.com "Alles zeigen"
// @version 0.1.5
// @include *handelsblatt.com*
// ==/UserScript==

var _url = document.location.href;
_url = _url.toString();

// Abfragen, ob es ein Seitenmenue gibt
var _Pager = false;
var _Class = document.getElementsByTagName("div");

for (var i=0; _Class[i] != null; i++)
{
if (_Class[i].className == "hcf-pager-wrapper")
{
_Pager = true;
}
}


//Auf einer Seite anzeigen
if ((_url.substring(_url.length,_url.length-4)) != "=all" && _Pager==true)
{
_url = _url + "?p" + _url.substring(_url.lastIndexOf("/")+1,_url.lastIndexOf(".")) + "=all";
document.location.href = _url;
}