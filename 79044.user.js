// ==UserScript==
// @name           Fullscreen Youtube & Vimeo (+others) on Facebook
// @namespace      none
// @include        http*://www.facebook.com/*
// @version        3.5
// ==/UserScript==



function addScript(content) {
    var element;
    element = document.createElement('script');
    element.type = 'application/javascript';
    element.innerHTML = content;
    document.body.appendChild(element);
}

function initFYT(){origAddClass=CSS.addClass; CSS.addClass=function(param1, param2){ var result = origAddClass.apply(this, new Array(param1,param2)); if(param2=='uiVideoThumbLoading'){ timeout=setTimeout(fullscreen, 1000); } return result;}; function fullscreen() {if(utubes=document.getElementsByTagName('embed')) for(i=0;i<utubes.length;i++){if(utubes[i].getAttribute('allowfullscreen')!='true'){var tube=utubes[i].cloneNode(true);tube.setAttribute('allowfullscreen','true');tube.setAttribute('src', tube.getAttribute('src') + '&fullscreen=1&fs=1');utubes[i].parentNode.appendChild(tube);utubes[i].parentNode.removeChild(utubes[i]);}} clearTimeout(timeout);} };

addScript("("+initFYT+")();initFTY();");




