// ==UserScript==
// @name        Remove unwanted stuff from Politiken.dk
// @namespace   pollytykken
// @include     *://politiken.dk/*
// @version     1
// @grant       none
// ==/UserScript==
var $ = unsafeWindow.jQuery;
$('#meteroverlay').hide();
$('embed').hide();
$('.nocontent').hide();
$('[id^=adform]').hide();
$('[class^=ad-text]').hide();
$('.teasercontainer').hide();
$('#teaserwrapper').hide();
$('body').css('overflow','visible');
setTimeout("jQuery('[class^=cookie]').hide();",2000);
