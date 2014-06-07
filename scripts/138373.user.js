// ==UserScript==
// @name        bodyclick
// @namespace   jvc_nospam
// @include     http://www.jeuxvideo.com/
// @version     1
// ==/UserScript==

var $ = unsafeWindow.jQuery; // use existing jQuery, @require doesn't work when removing webpage events

$("body").unbind("click");