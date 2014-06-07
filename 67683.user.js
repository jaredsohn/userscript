// ==UserScript==
// @name           Travian - add needed resources automatically under build/upgrade link
// @namespace      http://userscripts.org/users/72477
// @description    Adds needed resources under building/upgrading link in building
// @include        http://s*.travian.*/build.php?*
// @version        0.01
// ==/UserScript==

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

wantsRes[e] = curRes[e] - neededRes[e];
if (wantsRes[e] >= 0) {
mColor[e] = "green";
wantsRes[e] = "+" + wantsRes[e];
}
else {
mColor[e] = "red";
}
}

var beforeThis = document.createElement("span");
beforeThis.innerHTML = "<br>";
for (var j = 0; j < 4; j++) {
beforeThis.innerHTML += '<img src="img/x.gif" class="r' + (j+1) + '"> <span style="color: ' + mColor[j] + ';">' + wantsRes[j] + '</span> '; 
}
basee.appendChild(beforeThis);
