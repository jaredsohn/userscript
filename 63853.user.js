// ==UserScript==
// @name           Nettby - Dashboard (av matsinator)
// @namespace      Fikser loggen, varsler, og statusen på nettby. Av matsinator på nettby.
// @include        http://www.nettby.no/*
// ==/UserScript==
var d=document;

var links=d.getElementsByTagName('a');

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Logg") {
if(links[i].href='/user/dashboard_action_log.php');
 }
}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Varsler") {
if(links[i].href='/user/dashboard_action_private_log.php');
 }
}




for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Status") {
if(links[i].href='/user/dashboard_status.php');
 }
}




