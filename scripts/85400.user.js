// ==UserScript==
// @name                Google logo remover
// @description         removes logo from Google start page
// @include     http://www.google.*/
// ==/UserScript==


function removeLogo(){
    var l = document.getElementById('lga');
    //var p = l.parentNode;
    //p.removeChild(l);
    l.innerHTML = "";
}


removeLogo();
window.addEventListener('load', removeLogo, false);
