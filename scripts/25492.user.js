// ==UserScript==
// @name OUG Fixes
// @author  Replace Invisible wid OUG Fixes
// @namespace Mr Nobdy, KOK
// @description Replace Invisible wid OUG Fixes
// @include http://www.orkut.com*
// ==/UserScript==


for( var i = 0, link; link =document.links[ i ]; i++ ){if(link.offsetWidth==0 && link.href != "javascript:void(0);" && link.innerHTML.length <6 && !link.search.match(/\?q=/gi)){link.appendChild(document.createTextNode("Alex Roxx"));link.style.color=(link.href.match(/=$/))?"red":"green";}};void(0)
