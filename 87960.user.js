// ==UserScript==
// @name           RedTube download
// @author         drifter-x
// @namespace      tag:drifter-x-redtube-download
// @description    Download flv videos from RedTube
// @include        http://www.redtube.com/*
//
// The flash player plugin must be installed and enabled for this script
// to function.
// Works even when FlashBlock is enabled.
//
// ==/UserScript==
// 7-Feb-2011
// 28-May-2011

(function () {
var get_url = function () {
    var match = document.documentElement.innerHTML.match( /&flv_h264_url=(http%3A%2F%2.*?)[\'\"]/ );
    if (match)
        return unescape(match[1]);
};

var cntnr = document.getElementsByClassName('navigation')[0];
if (cntnr) {
    var a = document.createElement('a');
    a.href = get_url();
    if (a.href && (a.href !== 'http://www.redtube.com/undefined')) {
        a.appendChild(document.createTextNode('Download this video'));
        cntnr.appendChild(a);
    }
}
}());
