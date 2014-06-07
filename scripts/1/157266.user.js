// ==UserScript==
// @name           przewijanie miniaturek
// @description    Skrypt powoduje przewijanie miniaturek zdjęć scroolem myszy
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @version        1.2
// @copyright      2014, suchar
// @author         suchar
// ==/UserScript==

var u = unsafeWindow;
var $ = u.$;

var a = document.getElementById ("photosNavi");
if (a != null){
    a.addEventListener ("DOMMouseScroll", scroll, false);
    a.addEventListener ("mousewheel", scroll, false);
}

function scroll(e){
    e.preventDefault();
    var rolled = 0;
    if ('wheelDelta' in e) {
        rolled = e.wheelDelta;
    } else {  // Firefox
        rolled = -40 * e.detail;
    } 
    if(rolled < 0){
        u.thumbnailNavigation.photosMoreNext();
    }else{
        u.thumbnailNavigation.photosMoreBack();
    }
}