// ==UserScript==
// @name           Kill Verdana
// @namespace      GE WEK
// @description    Replaces Verdana with far more sane Arial font.
// @version        9000
// @include        http://ernstchan.net/*
// @include        http://*.ernstchan.net/*
// ==/UserScript==

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/verdana/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/verdana/i)) {
                                fonts[j] = 'arial';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}