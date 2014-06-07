// ==UserScript==
// @name           Facebook Auto-Accept Gift (v1.09)
// @namespace      KingRider
// @include        http://www.facebook.*/reqs.php*
// @include        https://www.facebook.*/reqs.php*
// @include        https://*.facebook.*/games?*
// @include        http://www.facebook.*
// @include        https://www.facebook.*
// @include        http://apps.facebook.*
// @include        http://www.facebook.*/connect/uiserver.php*
// @include        http://*.zynga.com/*
// @exclude        http://*.facebook.*/login.php*
// @exclude        http://*.facebook.*/login/*
// @exclude        https://apps.facebook.*
// ==/UserScript==

var temp = 0;
var acceptbotao = "Aceitar"; // Botao Request - Portugueses Brasil
var botao = document.getElementsByTagName('INPUT');
var request = "top.document.location.href='http://www.facebook.com/reqs.php'";

var gifts = new Array();
gifts[0]="accept";
gifts[1]="fellowship";
gifts[2]="reward";
gifts[3]="claim";
gifts[4]="loot";

for (j = 0; j == 5; j++) {
alert(gifts);
   if (location.href.indexOf(gifts[j]) > 5) { 
      setTimeout("top.document.location.href="+request,9000);
   }
}

if (location.href.indexOf('knightsofthecrystals') > 5 || location.href.indexOf('havenworld') > 5 || location.href.indexOf('herolegend') > 5) {
  setTimeout(request,3000);
} else {
  setTimeout(request,15000);
}

if (location.href.indexOf('/connect/') > 5 || location.href.indexOf('zynga.com') > 5) {
  setTimeout(request,3000);
}

for (i = 0; i < botao.length; i++) {
  if (document.getElementsByTagName('INPUT')[i].value == acceptbotao && temp == 0) {
    document.getElementsByTagName('INPUT')[i].click();
    temp = 1;      
  }
}