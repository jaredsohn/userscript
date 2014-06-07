// ==UserScript==
// @name           Replace Fonts With Myriad Pro
// @namespace      Replace Fonts With Myriad Pro
// @description    Replace Fonts With Myriad Pro
// @include        http*://*
// ==/UserScript==


var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/arial/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/arial/i)) {
                                fonts[j] = 'Myriad Pro';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/verdana/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/verdana/i)) {
                                fonts[j] = 'Myriad Pro';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/tahoma/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/tahoma/i)) {
                                fonts[j] = 'Myriad Pro';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/trebuchet/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/trebuchet/i)) {
                                fonts[j] = 'Myriad Pro';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}

var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/comic/i)) {
                var fonts = style.fontFamily.split(',');
                for (var j in fonts) {
                        if (fonts[j].match(/comic/i)) {
                                fonts[j] = 'Myriad Pro';
                        }
                }
                tags[i].style.fontFamily = fonts.join(',');
        }
}
