// ==UserScript==
// @name        Youtube Clean Search
// @namespace   /g/
// @description Makes Youtube your little slut
// @include     https://www.youtube.com/
// @include     http://www.youtube.com/
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// ==/UserScript==

$('#page-container').hide();
$('#footer-container').fadeOut();
var x = $('body');
x.removeClass();
x.css('width','700px');
x.css('margin','0 auto');
x.css('margin-top','300px');