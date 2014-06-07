// ==UserScript==
// @name        Enable ClublandLV Downloads
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @namespace   http://userscripts.org/users/286362
// @include     http://www.clublandlv.com/*.html
// @grant       none
// ==/UserScript==


$("img[src='/images/GTembed/zippyshare-logo.png']").after('<h2><a href="http://'+zippywww+'.zippyshare.com/v/'+zippyfile+'/file.html">Download</a></h2>');


