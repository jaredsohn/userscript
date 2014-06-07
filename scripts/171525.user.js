// ==UserScript==
// @name        CaptchaFixer
// @namespace   stopabu
// @include     http://2ch.*
// @version     1
// ==/UserScript==

var divs = document.getElementById('captcha_div').getElementsByTagName("img"), x;
for(x = 0; x < divs.length; x++) {

    var str = divs[x].src;
    var text = str.substring(9, str.length);
    divs[x].src = "http://" + text;
}