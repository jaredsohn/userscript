// ==UserScript==
// @name           Disable SJAX
// @namespace      disable_sjax.ubergeeky.org
// @include        *
// ==/UserScript==

var scriptElement = document.createElement("script");
scriptElement.setAttribute("type", "text/javascript");
scriptElement.innerHTML="XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;\n"+
"var ajaxOpen = function(method, url, async, user, password) {\n"+
"  if (async == true) {\n"+
"    this.oldOpen (method, url, async, user, password);\n"+
"  }\n"+
"}\n"+
"XMLHttpRequest.prototype.open = ajaxOpen;";
document.body.appendChild(scriptElement);