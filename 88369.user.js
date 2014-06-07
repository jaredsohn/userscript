// ==UserScript==
// @name           Replace Tisa
// @namespace      Hacked from Font Must Die script
// @description    Replaces bitmapped TisaWeb font with generic sans serif.
// @version     1.0
// @copyright	2010, Aiah
// @include        http://*
// ==/UserScript==

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/tisaweb/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/tisaweb/i)) {
                                fonts[j] = 'sans-serif';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}