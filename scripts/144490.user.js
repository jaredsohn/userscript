// ==UserScript==
// @name       My Fancy New Userscript
// @namespace     http://www.science.unitn.it/
// @version    0.1
// @description  enter something useful
// @include       http://www.science.unitn.it/~traini/didattica/fisII_BIO/Risultati3-09-12.pdf

// @copyright  2012+, You
// ==/UserScript==

function refresh(){
   document.location.reload(true)
}


setInterval(refresh,3000);