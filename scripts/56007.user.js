// ==UserScript==
// @name           whatmademe
// @namespace      whatmademe
// @description    Detect what software made the page you're viewing
// @include        *
// ==/UserScript==

//id = document.innerHTML.match(/meta name="generator" content=".+"/i);

//console.log(id);

var id = false;
var body = document.getElementsByTagName('body')[0];

var metas = document.getElementsByTagName('meta');
for (i = 0; i < metas.length; i++){
    if (metas[i].name.toLowerCase() == 'generator') {
        id = metas[i].content;
    }
}

if (!id) {
    if(typeof MM_reloadPage == 'function' || typeof MM_swapImage == 'function'
    || body.innerHTML.match(/MM_reloadPage/) ||  body.innerHTML.match(/MM_swapImage/)) {
        id = 'Macrobloodymedia';
    }
}

if (id) {
    body.innerHTML += '<div style="position: fixed; right: 0; top: 0; z-index: 9999; opacity: 0.9; border: 1px solid black; background-color: #ffa; color: black; height: 20px; min-width: 50px; padding: 2px 5px;"><span style="font-size: 55%; margin-right: 1em;">made with</span>'+id+'</div>';
}