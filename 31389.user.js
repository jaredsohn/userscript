// ==UserScript==
// @name           Vistors Details
// @namespace      blip.pl
// @description    Pokazuje dokładne informacje o odwiedzających nasz kokpit, bez potrzeby najeżdzania na ich zdjęcia
// @include        http://www.blip.pl/dashboard
// @include        http://blip.pl/dashboard
// ==/UserScript==

css = "div#observed-and-observing-box div.transparent-box { height:auto;}"
+"\nul#active-users.users li {text-align:center; width: 110px !important; height: 75px !important; }"
+"\nul#active-users.users a {display:block;}"
+"\nul#active-users.users a:after {content: attr(title); bottom:10%; display:block;}";


var head = document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
head.appendChild(style);