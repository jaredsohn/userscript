// ==UserScript==
// @name           xhamsterPrivateProfiles
// @namespace      http://userscripts.org/user
// @description    Takes you to private profiles pics and vids on xHamster
// @include        http://xhamster.com/user/*
// @exclude        http://xhamster.com/user/*new-1.html
// ==/UserScript==



var input=document.createElement("input");
input.type="button";
input.value="Show me the vids !";
input.onclick = gotovids;
input.setAttribute("style", "font-size:18px;position:absolute;top:30px;left:20px;");
document.body.appendChild(input);
 
function gotovids()
{
   var firstPart = 'http://xhamster.com/user/';
   var lastPart = window.location.href.match(/user\/(.*)/)[1];
   window.location.href = firstPart + 'video/' + lastPart + '/new-1.html';
}

var input=document.createElement("input");
input.type="button";
input.value="Show me the pics !";
input.onclick = gotopics;
input.setAttribute("style", "font-size:18px;position:absolute;top:60px;left:20px;");
document.body.appendChild(input);
 
function gotopics()
{
   var firstPart = 'http://xhamster.com/user/';
   var lastPart = window.location.href.match(/user\/(.*)/)[1];
   window.location.href = firstPart + 'photo/' + lastPart + '/new-1.html';
}