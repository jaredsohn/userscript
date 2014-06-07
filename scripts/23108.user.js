// ==UserScript==
// @name Megaupload 2.0
// @include *megaupload*
// ==/UserScript==

function Cookie(name,value,days) {
if (days) {
 var date = new Date();
 date.setTime(date.getTime()+(days*24*60*60*1000));
 var expires = "; expires="+date.toGMTString();
}
else var expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}

Cookie('megauploadtoolbar_visibility', 'yes', 7);
Cookie('megauploadtoolbar_id', '197A9F07D8724E438DEBE1C11EBBE405', 7);