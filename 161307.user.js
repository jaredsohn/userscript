// ==UserScript==
// @name        LiveLeak: stretch video
// @namespace   http://userscripts.org/users/joshg253
// @description stretch the videos on LiveLeak, hide right column
// @include     http://www.liveleak.com/view?i=*
// @version     1
// ==/UserScript==

var leftCol = document.getElementById("leftcol");
leftCol.style.width = "100%";

var rightCol = document.getElementById("rightcol");
rightCol.style.display = "none";

var wrapper = document.getElementById("wrapper");
var vidDiv = wrapper.firstChild;
var vidObj = vidDiv.firstChild;

wrapper.style.width = "100%";
vidObj.style.width = "100%";
vidObj.style.height = "532px";
