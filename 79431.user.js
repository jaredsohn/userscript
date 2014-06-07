// ==UserScript==
// @name           Travian Resource needed to Build
// @description    add needed resource in build page
// @author	       ww_start_t
// @license 	   ® KSA License
// @include        http://*.travian.*/*
// @version        2.5
// ==/UserScript==
function format(maxtime){
var hrs = Math.floor(maxtime/3600);
var min = Math.floor(maxtime/60) % 60;
var sec = maxtime % 60;
var t = hrs + ":"; if(min < 10){t += "0";}
t += min + ":"; if(sec < 10){t += "0";}
t += sec; return t;}

for (var M = 0; M < 4; M++) {
resource = document.getElementById("l"+(4-M)).title;
res = document.getElementsByClassName("r"+(M+1))[1].title; 

function xpath(query, object) 
{if(!object) var object = document;return document.evaluate(query, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
XP = xpath("id('contract')");
if(XP.snapshotItem(0)){ PerHour = '<tr> <img class="r'+(M+1)+'" alt="'+res+'" src="img/x.gif" title="'+res+'">'+resource+' </>';
XP.snapshotItem(0).innerHTML= XP.snapshotItem(0).innerHTML + PerHour;}}

var basee =  document.getElementById("contract");
var base = basee.innerHTML;
var test = base.split(/<img\b[^>]*>/);
var neededRes = [];
var curRes = [];
var wantsRes = [];
var mColor = [];

for (var e = 0; e < 4; e++) {
neededRes[e] = test[(e+1)].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
curRes[e] = document.getElementById("l" + (4-e)).innerHTML.split("/")[0];
var wholeRes = document.getElementById("l" + (4 - e));
var income = wholeRes.getAttribute("title");
var incomepersecond = income / 3600;
wantsRes[e] = curRes[e] - neededRes[e];
if (wantsRes[e] >= 0) { mColor[e] = "green"; wantsRes[e] = "+" + wantsRes[e]; }
else { mColor[e] = "red";wantsRes[e] = "  " + wantsRes[e] + " (" + format(Math.abs(Math.round(wantsRes[e] / incomepersecond)), 0) +")" }}

var beforeThis = document.createElement("span");
beforeThis.innerHTML = "<br>";
for (var j = 0; j < 4; j++) {
beforeThis.innerHTML +='<div><img src="img/x.gif" class="r' + (j+1) + '"> <span style="color: ' + mColor[j] + ';">' + wantsRes[j] + '</span></> ';}
basee.appendChild(beforeThis);