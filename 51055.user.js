// ==UserScript==
// @name           Audiable Lingvo on Yandex
// @namespace      kylichuku
// @description    replaces a word that is being translated with link to site that knows how to pronounce things
// @include        http://lingvo.yandex.ru/*
// ==/UserScript==

function soundIcon() {
    var pronIcon = document.createElement('img');

    pronIcon.src = 'http://www.wallie.co.uk/images/menu_nl/sound-icon.gif';
    pronIcon.alt = 'sound icon';

    return pronIcon;
}

function pronunciationOf(word) {
    var pronLink = document.createElement('a');

    pronLink.href = 'http://www.howjsay.com/index.php?word=' + word + '&submit=Submit';
    pronLink.appendChild(soundIcon());

    return pronLink;
}

(function addPronunciation() {
    var word = document.getElementsByTagName('h1')[0];
    word.parentNode.insertBefore(pronunciationOf(word.innerHTML), word);
})()