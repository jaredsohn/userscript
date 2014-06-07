// UserArt script for reddit
// 
// ==UserScript==
// @name UserArt
// @description add randomart images to usernames on reddit
// @require http://crypto-js.googlecode.com/svn/tags/3.0/build/rollups/sha256.js
// @require https://raw.github.com/andre-d/visiprint/master/visiprint.js
// @include http://*.reddit.com/*
// @include https://pay.reddit.com/*
// @grant none
// @version 3
// ==/UserScript==
//

my_colors = [
    [255, 255, 255],
    [32, 128, 128],
    [128, 128, 255],
    [255, 255, 0],
    [0, 0, 255],
    [200, 0, 255],
    [128, 128, 0],
    [128, 0, 0],
    [128, 0, 128],
    [0, 128, 128],
    [0, 0, 128],
    [128, 69, 69],
    [64, 192, 192],
    [0, 64, 192],
    [128, 64, 192],
    [160, 64, 255],
];

function applyUserArt() {
    $(".author:not(.userart-applied)").each(function (i, el) {
        var user = el.text;
        var fp = visiprint.fingerprint_randomart(CryptoJS.SHA256(user).toString(CryptoJS.enc.Latin1), 8, 16, 16);
        var canvas = $("<canvas>");
        $(el).addClass("userart-applied");
        $(el).prepend(canvas);
        visiprint.canvas_fingerprint(canvas.get(0), fp,  my_colors, 1);
    });
}

    
window.addEventListener('neverEndingLoad', function() {
    applyUserArt();
});

$(applyUserArt);