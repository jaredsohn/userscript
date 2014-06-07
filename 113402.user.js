// ==UserScript==
// @name           AutoClick
// @namespace      http://userscripts.org/users/169582
// @description    win the kiro competition!
// @include        http://www.kirotv.com/hsfootball/index.html
// ==/UserScript==

var r = new Array();
var t;

var h = document.getElementById("q1ans1");
if(h)
{
h.checked = true;
t = searchfortag();
clickbutton();
}

function searchfortag()
{
r = document.getElementsByTagName("input");
for(var i = 0; i < r.length; ++i)
{
if(r[i].value == "Vote")
{
return r[i];
}
}
}

function clickbutton()
{
if(t)
{
t.click();
var r=setTimeout(clickbutton,500);
}
}