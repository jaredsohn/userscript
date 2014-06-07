// ==UserScript==
// @name          PH
// @namespace     AMARFF
// @include       *brainticklernew/braintickler.php
// ==/UserScript==

var imgs = document.getElementsByTagName("img");

    for (var i = 0; i < imgs.length; i++) {
        if(imgs[i].src=='https://neuronimbusmail.com/brainticklernew/img/back.jpg')
        imgs[i].style.top='-5000px';
        void(0);
    }