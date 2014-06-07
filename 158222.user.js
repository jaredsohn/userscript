// ==UserScript==
// @name           ipastore.me Bypass Captcha
// @namespace      ipastorebypasscaptcha
// @description    Bypass the captcha on ipastore.me
// @include        http://ipastore.me/index.php?act=appdetail&appid=*
// @grant          none
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

function str_rot13 (str) {
   // http://phpjs.org/functions/str_rot13/
  return (str + '').replace(/[a-z]/gi, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
  });
}

$('a[href^="captcha.php"]').each(function() {
	var url = $(this).prop("href");
    var obscLink = url.substring( url.indexOf('url=')+4);
	var realLink = str_rot13(obscLink);
    $(this).prop("href", realLink);
});