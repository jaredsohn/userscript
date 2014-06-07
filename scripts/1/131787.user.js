// ==UserScript==
// @name           OUsers
// @namespace      http://userscripts.org/users/kyborek
// @description    Online players for dark orbit
// @include        http://*.darkorbit.bigpoint.com/indexInternal.es*
// ==/UserScript==
var txt = document.documentElement.innerHTML;
var amount= txt.match('ouser": "([^"]*)"');
var out=document.getElementById("header_start_btn");
out.innerHTML+="<br>("+amount[1]+" online)";
out.setAttribute("style","font-size:10px;");
