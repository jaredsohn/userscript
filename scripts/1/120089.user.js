// ==UserScript==
// @name       InverseLook
// @namespace  shellgratuit
// @version    1.2
// @description  Inverse the columns of the NewLook of Twitter, as it was in the old one.
// @include    http://*twitter.com/*
// @include    https://*twitter.com/*
// @copyright  2011+, at shellgratuit
// ==/UserScript==

updateTwttr();
document.getElementsByTagName('body')[0].addEventListener('load', function() {
    updateTwttr();
}, true);

function updateTwttr() {
    if (document.getElementsByClassName('dashboard')[0] != undefined) {
        document.getElementsByClassName('dashboard')[0].style.float = "right";
        document.getElementsByClassName('js-content-main')[0].style.float = "left";
        $ = unsafeWindow["jQuery"];
        $('.chev-right').each(function(i) {
            $(this).css({ '-moz-transform': 'rotate(180deg)', '-o-transform': 'rotate(180deg)', '-webkit-transform': 'rotate(180deg)' });
        });
    } else {
        window.setTimeout(function() { updateTwttr(); },200);
    }
}