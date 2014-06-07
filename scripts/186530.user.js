// ==UserScript==
// @name        youtube: descriptive url
// @namespace   v6.nosepicking
// @description youtube: descriptive url
// @include     *youtube.com/watch?*v=*
// @version     1
// @grant       none
// ==/UserScript==


(function(window, unsafeWindow, document) {

function start(){
    var hash = document.location.hash;
    var title = document.getElementById('eow-title');
    var tit;

    if(title && title.hasAttribute && title.hasAttribute("title")) {
        title = title.getAttribute("title");
    } else {
        title  = '';
    }

    tit = encodeURIComponent(encodeURIComponent(title.replace(' ', '_', 'g')));


    if(hash == '') {
        hash = '#';
    } else {
        if(hash.indexOf('_tit=') !== -1) {
            // alert(hash);
            // alert(encodeURIComponent(hash));
            hash = hash.replace(/&{0,1}_tit=[^&]*&{0,1}/, '');
        }
    }
    hash = hash + '&_tit=' + tit;    
    document.location.hash = hash;
}

start();

})(this, this.unsafeWindow || this, document);