// ==UserScript==
// @name           Nu cleaner
// @namespace      http://www.nu.nl
// @description    Clean Nu.nl's homepage
// @include        http://www.nu.nl/
// ==/UserScript==

// Change the classnames in this Array to hide the chosen items.
var filter = new Array('ovr', 'vid', 'shorty', 'nuwerk', 'spt');
var divs = document.getElementsByTagName('div');

for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    for (var j = 0; j < filter.length; j++) {
        if (div.className.indexOf(filter[j]) != -1) {
            div.style.position = 'absolute';
            div.style.left = '-1000px';

            if (div.parentNode.id == 'listblock') {
                div.parentNode.style.position = 'absolute';
                div.parentNode.style.left = '-1000px';
            }
        }
    }
}