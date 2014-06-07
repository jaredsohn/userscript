// ==UserScript==
// @name        polskieradio download mp3
// @namespace   http://userscripts.org/user/587636
// @include     http://www.polskieradio.pl/*
// @version     1
// @grant       none
// ==/UserScript==
var targets = [
    'bIcons',
    'clearfix',
    'icons'
];
for (var j = 0; j < targets.length; ++j) {
    var bIcons = document.getElementsByClassName(targets[j]);
    for (var i = 0; i < bIcons.length; i++) {
        var speakers = bIcons[i].getElementsByClassName('ico iSpeaker');
        if (speakers.length > 0) {
            if (speakers[0].parentNode == bIcons[i]) {
                var onclick = speakers[0].getAttribute('onclick');
                if (onclick !== null && onclick !== undefined) {
                    var tab = onclick.split(',');
                    if (tab.length > 1) {
                        var a = document.createElement('a');
                        a.href = 'http://static.polskieradio.pl/' + tab[1].replace(/\'/g, '') + '.mp3';
                        a.setAttribute('class', 'really nothing to see here');
                        a.innerHTML = 'Pobierz';
                        bIcons[i].appendChild(a);
                    }
                }
            }
        }
    }
}
