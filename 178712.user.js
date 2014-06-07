// ==UserScript==
// @name        muh edf smileys
// @namespace   null
// @author      Popcorn
// @description fixes edf smilies.
// @include     https://forum.encyclopediadramatica.es/*
// @version     1
// ==/UserScript==

replace();

function replace() {
    var images = document.getElementsByClassName("mceSmilie");
    for(var i = 0; i < images.length; i++) {                                    
        images[i].src = images[i].src.replace('dramatica.se', 'dramatica.es');
        // for whatever reason, "kpmafqbfhvbyvyucecqd" is the class name for shit that don't work
        if(images[i].className.indexOf("kpmafqbfhvbyvyucecqd") != -1) {
            images[i].className="mceSmilie";    // gets rid of kpmaf...
            //var newSmilie = images[i].cloneNode();
            images[i].parentNode.insertBefore(images[i].cloneNode(),images[i]);
        }
    }
}