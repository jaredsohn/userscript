// ==UserScript==
// @name            tucao助手
// @namespace       tucao fuck all
// @author	    icy37785
// @authorURL	    http://www.tucao.cc
// @description     tucao fuck all.
// @include         http://www.tucao.cc/play/*
// @version	    0.0.0.1
// ==/UserScript==
(function(document) {

var player = document.getElementById("player1").innerHTML;
if (player.indexOf("letv.com") > -1){
var body = document.body.innerHTML;
var a = document.getElementById("player_code").innerHTML;
a=a.split('</li><li>');
var p = document.URL;
p = p.split('#')[1];
if(p){p = p-1} else {p=0}
var cid = a[1].split("</li>")[0];
var vid = a[0].split("vid=");
vid = vid[p+1].split("|")[0];

var s='<embed height="452" width="964" src="http://www.tucao.cc/player.swf" type="application/x-shockwave-flash" quality="high" allowfullscreen="true" flashvars="type=sina&vid='+vid+'&cid='+cid+'-'+p+'" allowscriptaccess="always" AllowNetworking="all"></embed>';

var obj=document.getElementById("player1");
obj.id="player";

document.getElementById("player").innerHTML=s;
}
})(window.document);