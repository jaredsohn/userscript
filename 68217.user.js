// ==UserScript==
// @name           Horadot.net no direct
// @namespace      Kuchi.be
// @include        http://*.horadot.net/*
// @include        http://horadot.net/*
// @include        http://www.horadot.net/*
// ==/UserScript==
//מבטל את המעברון של הורדות נט

var Sid = document.getElementsByTagName('input')[2].value;
var Sid = Sid.replace('http://horadot.net/view,','');
var Sid = Sid.replace('.html','');

var i=0;
for (i=0;i<=9000;i++){
var regex = document.getElementsByTagName('a')[i].href;
document.getElementsByTagName('a')[i].href = regex.replace('http://horadot.net/to.php?id=' + Sid + '&url=','');

}