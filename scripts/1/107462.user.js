// ==UserScript==
// @name           Clixsense Ad Closer
// @namespace      Marcel
// @description    Closes Clixsense ads when they're validated
// @include        http://www.clixsense.com/*/View_Ads/*
// ==/UserScript==

var _0x162c=["\x6D\x61\x74\x63\x68","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6D\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x63\x6C\x6F\x73\x65"];setInterval(function (){if(document[_0x162c[3]](_0x162c[2])[_0x162c[1]][_0x162c[0]](/validated/gi)||document[_0x162c[3]](_0x162c[2])[_0x162c[1]][_0x162c[0]](/already viewed/gi)){window[_0x162c[4]]();} ;} ,500);