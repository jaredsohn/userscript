// ==UserScript==
// @name           Nettbyprofil CSS n00x
// @namespace      CSS n00x
// @include        http://www.nettby.no/user/index.php?user_id=317946 , http://www.nettby.no/user/index.php?nick=n00x
// @description    For å få frem CSS på n00x sin profil :D
// @version 	   v1
// ==/UserScript==

var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
var r=d.getElementsByTagName('div');mm[0].href='http://hustad.atbhost.net/nettby.css';
