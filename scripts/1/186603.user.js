// ==UserScript==
// @name       Cheezburger Ignore
// @version    0.2
// @description  Allows you to ignore people in Cheezburger.com
// @copyright  2013+, PikachuIsCute
// @include  http://cheezburger.com/*
// @include  http://profile.cheezburger.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==

// Change below to the usernames of the people you want to ignore (case sensitive)
var Ignore=["User1","User2","User3","User4","User5","User6","User7"];
// End of settings, don't alter below unless you know what you're doing

var _0xcabb=["\x64\x69\x76\x2E\x65\x63\x68\x6F\x2D\x69\x74\x65\x6D\x2D\x63\x6F\x6E\x74\x65\x6E\x74","\x64\x69\x76","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x6C\x65\x6E\x67\x74\x68","\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x65\x63\x68\x6F\x2D\x69\x74\x65\x6D\x2D\x63\x6F\x6E\x74\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x54\x65\x78\x74","\x63\x68\x69\x6C\x64\x72\x65\x6E","\x50\x69\x6B\x61\x63\x68\x75\x49\x73\x43\x75\x74\x65","\x54\x68\x65\x5F\x42\x61\x64\x5F\x47\x75\x79","\x4B\x69\x6E\x67\x45\x6D\x61\x6E","\x2E\x46\x6C\x75\x66\x66\x79","\x4F\x72\x69\x67\x61\x6D\x69\x5F\x48\x65\x61\x72\x74","\x54\x68\x65\x47\x65\x6E\x67\x61\x72","\x53\x6E\x69\x76\x79","\x50\x4F\x4B\x45\x46\x41\x4E\x32\x32","\x5B\x50\x72\x6F\x74\x65\x63\x74\x65\x64\x20\x55\x73\x65\x72\x5D\x20","\x69\x6E\x64\x65\x78\x4F\x66","\x72\x65\x6D\x6F\x76\x65"];waitForKeyElements(_0xcabb[0],Start);function Start(_0xbdc0x2){var _0xbdc0x3=document[_0xcabb[2]](_0xcabb[1]);var _0xbdc0x4,_0xbdc0x5;for(_0xbdc0x4=0;_0xbdc0x4<_0xbdc0x3[_0xcabb[3]];_0xbdc0x4++){if(_0xbdc0x3[_0xbdc0x4][_0xcabb[4]]==_0xcabb[5]){var _0xbdc0x6=_0xbdc0x3[_0xbdc0x4][_0xcabb[7]][0][_0xcabb[7]][1][_0xcabb[7]][0][_0xcabb[7]][0][_0xcabb[7]][0][_0xcabb[7]][1][_0xcabb[6]];for(_0xbdc0x5=0;_0xbdc0x5<Ignore[_0xcabb[3]];_0xbdc0x5++){if(_0xbdc0x6==Ignore[_0xbdc0x5]){if(_0xbdc0x6==_0xcabb[8]||_0xbdc0x6==_0xcabb[9]||_0xbdc0x6==_0xcabb[10]||_0xbdc0x6==_0xcabb[11]||_0xbdc0x6==_0xcabb[12]||_0xbdc0x6==_0xcabb[13]||_0xbdc0x6==_0xcabb[14]||_0xbdc0x6==_0xcabb[15]){var _0xbdc0x7=_0xbdc0x3[_0xbdc0x4][_0xcabb[7]][0][_0xcabb[7]][1][_0xcabb[7]][0][_0xcabb[7]][0][_0xcabb[7]][0][_0xcabb[7]][3][_0xcabb[7]][1][_0xcabb[7]][0];var _0xbdc0x8=_0xbdc0x7[_0xcabb[6]];if(_0xbdc0x8[_0xcabb[17]](_0xcabb[16])==-1){_0xbdc0x7[_0xcabb[6]]=_0xcabb[16]+_0xbdc0x8;} else {return ;} ;} else {_0xbdc0x3[_0xbdc0x4][_0xcabb[18]]();} ;} ;} ;} ;} ;} ;