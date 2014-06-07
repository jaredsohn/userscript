// ==UserScript==
// @name           Disable Ads
// @namespace      http://komica.csie.org/
// @description    pixiv
// @include      http://komica.csie.org*
// ==/UserScript==


function kk(){
        var tests = Array.filter( document.getElementsByClassName('banner'), function(elem){  
                elem.style = "display:none";
        });  
}

window.setInterval("kk",500);  