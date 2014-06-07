// ==UserScript==
// @name           Colorize Toodledo Slim
// @namespace      http://userscripts.org/users/108975
// @include        http://www.toodledo.com/slim/*
// @include        https://www.toodledo.com/slim/*
// ==/UserScript==

var tts = document.getElementsByClassName('tt');

for (var t=0; t<tts.length; t++) {
    var tt = tts[t];
    var i = tt.getElementsByTagName('i')[0];

    // First check its priority
    if (i.innerHTML.indexOf('Top Priority') >= 0) {
        i.style.fontWeight = 900;
        i.style.color = '#c00';
    } else if (i.innerHTML.indexOf('High Priority') >= 0) {
        i.style.fontWeight = 700;
        i.style.color = '#fc0';
    } else if (i.innerHTML.indexOf('Medium Priority') >= 0) {
        i.style.fontWeight = 700;
        i.style.color = '#00c';
    } else if (i.innerHTML.indexOf('Low Priority') >= 0) {
        i.style.fontWeight = 700;
        i.style.color = '#090';
    } else {
        i.style.fontWeight = 700;
        i.style.color = '#555';
    }

    // Check if it's due TODAY or if it's OVERDUE
    var due = i.innerHTML.indexOf(' Due ');
    if (due > 0) {
        var d = Date.parse(i.innerHTML.substr(due+5));
        if ((!isNaN(d)) && (d + 86400000 < new Date().getTime())) {
            tt.style.fontWeight = 900;
            tt.style.color = '#c0c';
            i.style.fontSize = '0.9em';
        } else if ((!isNaN(d)) && (d < new Date().getTime())) {
            tt.style.fontWeight = 700;
            tt.style.color = '#0cc';
            i.style.fontSize = '0.9em';
        } 
    }
}

