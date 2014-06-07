// ==UserScript==
// @name        old favicon
// @namespace   nouglyenvelopeshadow
// @description Changes gmail's favicon back to the old one
// @include     http*://mail.google.com*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/mail/u/0/images/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}());