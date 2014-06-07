// ==UserScript==
// @name           minúsculas
// @namespace      Valmen - Basado en userscripts.org/scripts/show/129428
// @description    Todo texto en minúsculas
// @include        *
// ==/UserScript==

function n(x){return x.toLowerCase()}var a=Node.a||3;var y=false;function z(node){y=true;node.textContent=n(node.textContent);y=false}function c(node){var f,d;if(node.nodeType==a){z(node)}else{d=node.childNodes;f=d.length;for(var i=0;i<f;++i){c(d[i])}}}function e(event){c(event.target)}function b(event){if(!y){z(event.target)}}c(document.body);document.title=n(document.title);document.body.addEventListener('DOMNodeInserted',e,false);document.body.addEventListener('DOMCharacterDataModified',b,false)