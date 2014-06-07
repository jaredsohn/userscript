// ==UserScript==
// @name          PokazBlipspinkiWKokpicie
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Wstawia liste spinek danego użytkownika podczas przeglądania jego kokpitu
// @include       http://www.blip.pl/users/*/dashboard
// @include       http://blip.pl/users/*/dashboard
// @include       http://blip.pl/dashboard
// @include       http://www.blip.pl/dashboard
// ==/UserScript==
// image url: http://blipspinki.pl/users/[login]/widget.png
var login = document.getElementsByTagName('h1')[0].innerHTML;
// użycie poniższego _znacznie_ spowalania skrypt
// var widget = 'http://blipspinki.pl/users/'+login+'/widget.png?width=7&size=30';
// a to nie spowalnia :)
var widget = 'http://blipspinki.pl/users/'+login+'/widget.png';
var spinka = "http://blipspinki.pl/users/"+login;
var html = '<div class="transparent-box-rounding">&nbsp;</div><div class="transparent-box"><ul style="margin-left:0.5em;"><li><strong><a href='+spinka+'>Zobacz moje BlipSpinki</a></strong></li><li><img src='+widget+' alt="Muszę się w końcu zapisać ;)" /></li></ul></div><div class="transparent-box-rounding-bottom">&nbsp;</div></div></div>';
var box = document.getElementById("profile-info");
var spinkaWidget = document.createElement('div');
spinkaWidget.innerHTML = html;
box.parentNode.insertBefore(spinkaWidget, box.nextSibiling);