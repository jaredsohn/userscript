// ==UserScript==
// @name           Kill Helvetica
// @namespace      Hacked from Font Must Die script
// @description    Replaces corrupt and jumbled Helvetica fonts in Firefox. Removes all instances of Helvetica and replaces with Arial by replacing font tags with a CSS-styled span.
// @version     1.7
// @copyright	2010, Daniel P
// @include        http://*
// ==/UserScript==

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/helvetica/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/helvetica/i)) {
                                fonts[j] = 'arial';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}