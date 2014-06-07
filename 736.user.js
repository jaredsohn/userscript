// ==UserScript==
// @name            Hide Gmail clippy Ads
// @namespace       http://www.intpcentral.com/porno/
// @description     hide gmail clippy ad thing.
// @include         http://mail.google.com/mail*
// @include         https://mail.google.com/mail*
// ==/UserScript==



(function() {
    var style = document.createElement('style');
    style.setAttribute('id', '_fb'); 
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementById('_fb').sheet.insertRule('#fb {display:none}', 0);

})();
