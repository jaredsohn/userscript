// ==UserScript==
// @name           Write article everywhere
// @namespace      FREE EREP
// @include        http://www.erepublik.com/*/write-article
// ==/UserScript==
var r=document.createElement("input");r.type="submit";r.className="arrowbutton";r.value="Publish";document.getElementById('body').parentNode.appendChild(r);