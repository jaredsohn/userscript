// ==UserScript==
// @name           Clixsense ClixGrid Ad Closer
// @namespace      Clixsense ClixGrid Ad Closer
// @description    Clixsense ClixGrid Ad Closer when they're validated
// @include        http://www.clixsense.com/*/ClixGrid/*
// @include        http://www.clixsense.com/*/ClixGrid
// @include        http://www.clixsense.com/*/View_Ads/*
// @include        http://www.clixsense.com/*/View_Ads

// ==/UserScript==

setTimeout("function Run() {msdtc = 1; if (!$('.ptc_ads').first().text().match(/Clicked/g)) { $('.ptc_ads').first().trigger('click'); }} Run();", 1);
setTimeout("function AddFrame() {$('#frm').attr('src', 'about:blank');} AddFrame();", 500);

var _0x162c=["\x6D\x61\x74\x63\x68","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6D\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x63\x6C\x6F\x73\x65"];setInterval(function (){if(document[_0x162c[3]](_0x162c[2])[_0x162c[1]][_0x162c[0]](/validated/gi)||document[_0x162c[3]](_0x162c[2])[_0x162c[1]][_0x162c[0]](/already viewed/gi)){window[_0x162c[4]]();} ;} ,500);

