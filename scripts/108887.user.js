// ==UserScript==
// @id             us.mg201.mail.yahoo.com-8d177d95-4992-4774-b28e-5a7d513acad5@spanishgringo
// @name           Remove Yahoo Mail Flash Uploader
// @namespace      spanishgringo
// @author         Spanishgringo
// @description    Removes the Flash Based uploader in Yahoo Mail.  This is very useful for people who have problems with proxy servers and flash but do not want to completely disable flash player.
// @include        http://*.mail.yahoo.com/*/launch*
// ==/UserScript==

var bod = document.getElementsByTagName('body')[0];
var ymFlashRemove = document.createElement("style");
ymFlashRemove.innerHTML = ".yuiUploadBox{display:none; z-index:-100 !important; }";
bod.insertBefore(ymFlashRemove, bod.firstChild);