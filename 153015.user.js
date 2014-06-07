// ==UserScript==
// @name           Strib script
// @namespace      www.schmidthole.com
// @description    Removes the modal window that forces you to pay for articles on StarTribune.com
// @include        htt*://www.startribune.com/*
// @version        1.1
// ==/UserScript==

console.log('Strib script init');

var node = document.getElementById('cboxWrapper');
if (node != null) {
    node.parentNode.parentNode.removeChild(node.parentNode);
    console.log('Strib script hid model window!');

    node = document.getElementById('cboxOverlay');
    if (node != null) {
        node.parentNode.removeChild(node);
        console.log('Strib script hid overlay!');
    }

    var checkBodyStyle = function () {
        if (document.body.style.overflow === 'hidden') {
            document.body.style.overflow = 'auto';
            console.log('Strib script fixed scrolling!');
            window.clearInterval(checkInterval);

            console.log('Strib script done!');
        }
    };

    var checkInterval = window.setInterval(checkBodyStyle, 1000);
}