// ==UserScript==
// @name           prit@ems
// @namespace      ms server check
// @description    checks when ems login server is online
// @include        http://www.mmoserverstatus.com/maplestory
// 3/5/12 update: updated to website adjustments
// ==/UserScript==
// JScript source code
var y = document.getElementsByTagName("td");
if (y[49].innerHTML.search("online") != -1) {
    alert("server online");
}