// ==UserScript==
// @name           Tumblr Reblog reposition button
// @namespace      http://daviderizzo.net/
// @include        http://www.tumblr.com/reblog/*
// ==/UserScript==

var orig = document.getElementById('save_button');
if (orig) {
    var clone = orig.cloneNode(true);
    
    var newDiv = document.createElement('div');
    newDiv.appendChild(clone);
    newDiv.style.textAlign = 'center';
    newDiv.style.marginBottom = '1em';

    var div1 = document.getElementById('right_column');
    var div2 = document.getElementById('edit_post_controls');
    div1.insertBefore(newDiv, div2);
}
