// ==UserScript==
// @name        Tumblr Image Size
// @description When directly viewing an image on Tumblr, ensures that the highest resolution image is loaded.
// @namespace   http://userscripts.org/users/543210
// @include     /^https?://\d+\.media\.tumblr\.com/(.+/)*tumblr_.+_\d+\.(jpe?g|gif|png|bmp)$/
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       none
// ==/UserScript==

var sizes = [ '_1280.', '_500.', '_400.', '_250.', '_100.' ];

function checkSize(index) {
    if (index >= sizes.length) return;
    var url = window.location.href.replace(/(.*(?=_))(_\d*.)(.*)/, '$1' + sizes[index] + '$3');
    if (url == window.location.href) return;
    $.ajax({
        url: url,
        type: 'HEAD',
        success: function(data, textStatus, jqXHR) {
            window.location.replace(url);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            checkSize(index + 1);
        }
    });
}

checkSize(0);