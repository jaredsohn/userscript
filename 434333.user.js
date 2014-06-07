// ==UserScript==
// @name       Nexusmods - Fullscreen Youtube Videos
// @namespace  http://www.nexusmods.com/
// @version    0.1
// @description  Adds the correct tags to the embedded youtube videos on mod description pages, so you can actually enjoy the videos in full ornate. (Finally)
// @match      http://www.nexusmods.com/*
// @copyright  2014+, JeffreyX
// ==/UserScript==


var els = document.getElementsByTagName('embed');
for(var i=0;i<els.length; i++){
    els[i].setAttribute('allowfullscreen', 'true');
    
    // Dom has to be reloaded so just ditch the obsolete object tag, and replace it with our pretty one.
    //var dom = els[i].outerHTML;
    //els[i].parentElement.parentElement
    els[i].parentElement.parentElement.replaceChild(els[i], els[i].parentElement);
}