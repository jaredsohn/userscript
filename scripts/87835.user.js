// ==UserScript==
// @name           Reject All Friend Requests
// @namespace      Gildward Rutherford
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/reqs.php*
// @include        http://www.facebook.com/#!/reqs.php*
// ==/UserScript==

var a = document.getElementsByClassName("UITwoColumnLayout_Content")[0];

var input = document.createElement("input");
input.setAttribute("type","button");
input.setAttribute("onclick", "Reject_All()");
input.setAttribute("value", "Reject All");
input.setAttribute("class", "inputbutton");

a.insertBefore(input, a.firstChild.nextSibling);

var script = document.createElement('script');
script.type="text/javascript";
script.innerHTML = ";\
\
function pauseCount(millis)\
{\
var date = new Date();\
var curDate = null;\
\
do { curDate = new Date(); }\
while(curDate-date < millis);\
}\
\
function Reject_All() {\
var hids = document.getElementsByName('actions[hide]');\
for(var j=0; j < 6; j++){\
   for(var k=0; k < hids.length; k++){\
      hids[k].name = 'actions[reject]';\
   }\
}\
var rejs = document.getElementsByName('actions[reject]');\
for(var i=0; i < rejs.length; i++){\
      pauseCount(200);\
      rejs[i].click();\
}\
}\
";

document.getElementsByTagName("head")[0].appendChild(script);
