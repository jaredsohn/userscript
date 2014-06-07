// ==UserScript==
// @name          Google cache alternative URL
// @namespace     K3rN3L http://userscripts.org/users/52751/scripts
// @description   changes Google cache url
// @description   made by DisconneKt (www.TuniTech.net)
// @include       http://64.233.*
// ==/UserScript==
var url=location.href;
window.location.replace("http://74.125.39.104" + url.substring(url.indexOf("")+21));