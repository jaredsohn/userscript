// ==UserScript==
// @name           OmegleVideos Just Go!
// @include        *omeglevideos*getexternal.php
// @version                1.1
// ==/UserScript==
var body   = document.body || document.getElementsByTagName('body')[0],
    newpar = document.createElement('script');
newpar.innerHTML = 'showlink();\nvar links = document.getElementsByTagName("a");\nfor(var i = 0; i<links.length; i++){\nif(links[i].outerText == "Continue"){\nlocation.href = links[i].href;\n}\n}';
body.insertBefore(newpar,body.childNodes[0]);
showlink();