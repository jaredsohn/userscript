Ã¯Â»Â¿// ==UserScript==
// @name            IntelliTxt Disabler
// @namespace       http://slashetc.net/code/
// @description     Disable Vibrant Media IntelliTxt automatic text links, like on AnandTech.com. Update: 2006-01-13
// @include         http://*
// ==/UserScript==
// To report bugs or suggestions, go to http://slashetc.net/home/contact

function injectCSS(css){
    head = document.getElementsByTagName("head")[0];
    style = document.createElement("style");
    style.setAttribute("type", 'text/css');
    style.innerHTML = css;
    head.appendChild(style);
}

function ITxtTimer(){
    injectCSS("a.iAs, .kLink1 { color: gray !important}");
    setTimeout(removeITxtAds,200);
    setTimeout(removeITxtAds,1000);
    setTimeout(removeITxtAds,4000);
    setTimeout(removeITxtAds,7000);
}

function removeITxtAds(){
    a = document.getElementsByTagName('a');
    for(var i=0; i<a.length; i++){
        if(a[i].className == 'iAs' || a[i].className == 'kLink1'){
            var p = a[i].parentNode;
            var r = document.createElement('span');
            r.innerHTML = a[i].innerHTML;
            p.replaceChild(r,a[i]);
            i--;
        }
    }
}

window.addEventListener("load", ITxtTimer, false);