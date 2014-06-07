// ==UserScript==
// @name          PHhhh
// @namespace     AMARFF
// @include       *evagirl.in/index.php?page=game.php
// ==/UserScript==

var imgs = document.getElementsByTagName("img");

    for (var i = 0; i < imgs.length; i++) {
        if(imgs[i].src=='http://www.brandscope.co.in/evagirl.in/back.png')
        imgs[i].style.top='-5000px';
        void(0);
    }