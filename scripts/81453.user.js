// ==UserScript==
// @name           Submitlist fix right-click protection
// @namespace      inda
// @include        http://www.submitlist.com/mn4h2m9
// ==/UserScript==


var replacementScript = document.createElement("script");
replacementScript.setAttribute("type","text/javascript");
replacementScript.innerHTML = "document.oncontextmenu = function(e) {return true;}";
document.body.appendChild(replacementScript);

