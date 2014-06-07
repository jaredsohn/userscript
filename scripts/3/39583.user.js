// ==UserScript==
// @name           UR PT Forum bg
// @namespace      http://nunoxavier.site88.net/
// @description    Change background from PT forum
// @author         Nuno Xavier
// @version        1.0
// @include        http://urbanrivals-portugal.forumotion.com/*
// ==/UserScript==

var d = new Date()
var horas = d.getHours()
var url
if(horas >=6 && horas <=17){
url="http://static.urban-rivals.com/img/v2/ui/fond.jpg"
}
else
{
url="http://static.urban-rivals.com/img/v2/ui/fond_night.jpg"
}
document.body.style.backgroundImage = 'url(' + url +')';