// ==UserScript==
// @name           Clixsense Helper
// @namespace      tehAon
// @description    Clicks all Clixsense ads and then closes window after timer expires.
// @include        http://www.clixsense.com/*/View_Ads
// @include        http://www.clixsense.com/*/View_Ads/*/*
// @include        http://www.clixsense.com/*/ClixGrid/*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

setTimeout("function Run() {msdtc = 1; if (!$('.ptc_ads').first().text().match(/Clicked/g)) { $('.ptc_ads').first().trigger('click'); }} Run();", 1);
setTimeout("function AddFrame() {$('#frm').attr('src', 'about:blank');} AddFrame();", 500);
var t = setTimeout(" function Hello() { if ($(\"a[title='Close window']\").length && $(\"a[title='Close window']\").css('display') == 'inline') { window.close(); } setTimeout('Hello()', 1000) } Hello(); ", 1000);

