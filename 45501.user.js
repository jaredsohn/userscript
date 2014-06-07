// ==UserScript==
// @name           Biip.no Modification v2
// @namespace      CSS n00x
// @include        http://*.biip.no*
// @description    Style opp Biip!
// @version 	   v2
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
var r=d.getElementsByTagName('div');mm[0].href='http://hustad.atbhost.net/biipcss.css';
