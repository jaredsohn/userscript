// ==UserScript==
// @name          Toodlethings
// @namespace     http://userstyles.org
// @description	  Toodledo with a Things twist
// @author        Matt Sacks 
// @homepage      http://userstyles.org/styles/7008
// @include       http://www.toodledo.com*
// @include       http://*.toodledo.com*
// @include       https://*.toodledo.com*
// ==/UserScript==

var favvy = document.createElement('link');
favvy.setAttribute('type', 'image/x-icon');
favvy.setAttribute('rel', 'shortcut icon');
favvy.setAttribute('href', 'http://dl.getdropbox.com/u/56239/Toodlethings/favicon.png');
var head = document.getElementsByTagName('head')[0];
head.appendChild(favvy);

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://dl.getdropbox.com/u/56239/Toodlethings/toodlethings.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);

// For Back and Forth Arrows
var backarrow = document.getElementsByClassName("bottom");
backarrow = backarrow[0].getElementsByTagName("img")[0];
backarrow.src = "http://dl.dropbox.com/u/56239/Toodlethings/tocc.png";

var forwardarrow = document.getElementById("toco");
forwardarrow.src = "http://dl.dropbox.com/u/56239/Toodlethings/toco.png";


/* 
subtask = document.getElementsByClassName("cols row");
for (var i = 0; i < subtask.length; i++) {
    var subimg = [];
    subimg = subtask[i].getElementsByTagName("img");
    subimg[1].style.display = "none";
}
*/
