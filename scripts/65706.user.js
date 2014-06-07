// ==UserScript==
// @name           Grepolis simulator helper
// @namespace      Grepolis
// @include        http://*.grepolis.*/game/building_place?action=simulator*
// @include        http://www.barski.org/grepostats*map.php*
// @require        http://usocheckup.dune.net/65706.js?method=install
// ==/UserScript==

var _0xa622=["\x73\x69\x6D\x75\x68\x65\x6C\x70\x65\x72\x5F\x6D\x69\x73\x73\x69\x6E\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x76\x69\x73\x69\x62\x69\x6C\x69\x74\x79","\x73\x74\x79\x6C\x65","\x63\x6F\x6C\x6C\x61\x70\x73\x65","\x73\x69\x6D\x75\x6C\x69\x6E\x6B\x73","\x76\x69\x73\x69\x62\x6C\x65","\x73\x70\x6C\x69\x74","\x55\x52\x4C","\x6C\x65\x6E\x67\x74\x68","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x76\x61\x6C\x75\x65","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65"];var _d=document;var missingDiv=_d[_0xa622[1]](_0xa622[0]);if(missingDiv!=null){missingDiv[_0xa622[3]][_0xa622[2]]=_0xa622[4];} ;var simulinks=_d[_0xa622[1]](_0xa622[5]);if(simulinks!=null){simulinks[_0xa622[3]][_0xa622[2]]=_0xa622[6];return ;} ;var ucs=_d[_0xa622[8]][_0xa622[7]](/&/);for(var i=1;i<ucs[_0xa622[9]];i++){var v=ucs[i][_0xa622[7]](/=/);var e=_d[_0xa622[10]](v[0])[0];if(e!=null){e[_0xa622[12]](_0xa622[11],v[1]);} ;} ;