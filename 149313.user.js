// ==UserScript==
// @name            Getchu Gallery Link, Pre-load Images and Auto Age Verification
// @namespace       http://userscripts.org/users/whoisnull
// @description     Pre-load all images. Generate gallery link above the title. Auto-click age verification.
// @include         http://www.getchu.com/soft_sampleimage.phtml?id=*
// @include         http://www.getchu.com/soft.phtml?id=*
// @include         http://www.getchu.com/php/attestation.html?aurl=*
// @run-at          document-end
// @updateURL       http://userscripts.org/scripts/source/149313.user.js
// @version         1.3
// ==/UserScript==

console.log('Getchu.com Automation');

var yesLink = document.querySelector('span[style="font-size:160%;font-weight:bold;"] > a');

if (yesLink) {
    yesLink.click();
}

var imageElements = document.querySelectorAll(".lazy[src='common/images/space.gif']");

if (imageElements) {
    for (var i = 0; i < imageElements.length; i++) {
        var imageElement = imageElements[i];
        imageElement.src = imageElement.dataset['original'];
    }
}

var galleryLinkNodes = document.querySelectorAll('.header_wish');

for (var i = 0; i < galleryLinkNodes.length; i++) {
    var galleryLinkNode = galleryLinkNodes[i];

    if (galleryLinkNode.innerText.indexOf('大きなサンプル画像の一覧') >= 0) {
        var titleNode = document.querySelector('#soft-title');
        var newNode = document.createElement('a');
        newNode.innerText = 'Link to gallery';
        newNode.href = galleryLinkNode.onclick.toString().match(/href=\'(.*)\'/)[1];
        titleNode.parentNode.insertBefore(newNode, titleNode);

        window.addEventListener('keydown', function(ev) {
            // if press 'g'
            if (ev.keyCode === 71) {
                newNode.click();
            }
        });

        break;
    }
}