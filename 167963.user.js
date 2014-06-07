// ==UserScript==
// @name         Google Play Store - Retinalizer
// @namespace    http://dragonwork.me/
// @version      1.0
// @description  Makes the Google Play Store retina-friendly. Doubles the size of all images where possible.
// @match        play.google.com/*
// @copyright    2013+, DragonWork
// ==/UserScript==

function retinalize() {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = imgs[i].src.replace(/(=?w)(\d+?)((-c)?-h\d+?|)$/, function(match, pre, size, end) {
            return pre+(size*2)+end;
        }).replace(/(=?-?h)(\d+?)$/, function(match, pre, size) {
            return pre+(size*2);
        });
    }
    var chart = document.getElementsByClassName('normalized-daily-installs-chart');
    if (chart.length > 0) {
        chart = chart[0].getElementsByTagName('img')[0];
        chart.width = 105;
        chart.height = 75;
        chart.src = chart.src.replace('chs=105x75', 'chs=210x150').replace('chls=2.5,', 'chls=5,');
    }
};

retinalize();