// ==UserScript==
// @name           UR Snow
// @namespace      http://nunoxavier.site88.net/
// @description    Snow for UR
// @author         Nuno Xavier
// @version        0.2
// @include        http://www.urban-rivals.com/*
// ==/UserScript==

var num_flakes = 10;
var snowflakes = new Array("http://javascript.about.com/library/graphics/snowflake.gif","http://javascript.about.com/library/graphics/snowflake1.gif");

// DOM test
var aDOM = 0, ieDOM = 0, nsDOM = 0; var stdDOM = document.getElementById;
if (stdDOM) aDOM = 1; else {ieDOM = document.all; if (ieDOM) aDOM = 1; else {
var nsDOM = ((navigator.appName.indexOf('Netscape') != -1)
&& (parseInt(navigator.appVersion) ==4)); if (nsDOM) aDOM = 1;}}
function findDOM(objectId, wS) {
if (stdDOM) return wS ? document.getElementById(objectId).style:
document.getElementById(objectId);
if (ieDOM) return wS ? document.all[objectId].style: document.all[objectId];
if (nsDOM) return document.layers[objectId];
}

function findLivePageWidth() {return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       document.documentElement.clientWidth : document.body != null ? document.body.clientWidth :700;}function findLivePageHeight() {return  window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight :500;}
function posX() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;}
function posY() {return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;}

var speed = 50;var movw = new Array();var movh = new Array();var move = new Array();var stepw = new Array();var steph = new Array();var posw = new Array();var posh = new Array();var dir = new Array();var winWidth;var winHeight;
function startSnow() {winWidth = findLivePageWidth()-75;winHeight = findLivePageHeight()-50;
for (var i = 0; i < num_flakes; i++){move[i] = 0;movh[i] = 12+ Math.random()*2;movw[i] = 11+ Math.random()*4;posw[i] = Math.random()*(winWidth-35)+12;posh[i] = Math.random()*winHeight;   stepw[i] = 0.02 + Math.random()/10;steph[i] = 0.7 + Math.random();dir[i] = (Math.random()>0.5)?1:-1;document.write('<div id="snow'+ i +'" style="position: absolute; z-index: '+ i +'; visibility:hidden; "><img src="'+snowflakes[Math.floor(Math.random()*snowflakes.length)]+ '" border="0"></div>');}setTimeout("moreSnow()", speed);}
function moreSnow() {for (var i = 0; i < num_flakes; i++) {if (posh[i] > winHeight-50) {posw[i] = 10+ Math.random()*(winWidth-movw[i]-30);posh[i] = 0;dir[i]=(Math.random()<0.5)?1:-1;stepw[i] = 0.02 + Math.random()/9;steph[i] = 1.3 + Math.random();} move[i] += stepw[i] *dir[i]; if (Math.abs(move[i]) > 3) {dir[i]=-dir[i];   posh[i]+=Math.abs(movh[i]*move[i]);posw[i]+=movw[i]*move[i]; move[i]=0;} objstyle = findDOM('snow'+i,1); objstyle.left = (posX()+posw[i] + movw[i]*move[i])+'px'; objstyle.top = (posY()+posh[i] + movh[i]*(Math.abs(Math.cos(move[i])+move[i])))+'px';objstyle.visibility = 'visible';} setTimeout("moreSnow()", speed);}
                  