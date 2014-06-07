// ==UserScript==
// @name       Moar smilies
// @version    1.1
// @include    /^http:\/\/www\.jeuxvideo\.com\/forums\/.*/
// @include    /^http:\/\/www.jeuxvideo.com\/cgi-bin\/jvforums\/forums.cgi/
// ==/UserScript==

var form = document.querySelector('#post');
if (form) {
    form.onsubmit = function() {
        var textarea = form.querySelector('textarea');
        textarea.value = textarea.value.replace(':trollface:', 'http://image.noelshack.com/fichiers/2013/22/1369689985-troll.jpg');
    }
}