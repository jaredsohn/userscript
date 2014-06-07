// ==UserScript==
// @name Bank Hack of CCB
// @update 2007-oct-29
// @namespace http://web2.0geek.org/userjs
// @description hack to login ccb bank
// @include https://ibsbjstar.ccb.com.cn/app/V5/*
// ==/UserScript==

window.addEventListener('load',
function() {
document.getElementById('fclogin').height='520px';
frames[1].document.getElementsByName('LOGPASS')[0].readOnly=false;
//document.getElementsByTagName('iframe')[1].height=520px;
//document.getElementsByTagName('iframe')[0].height=420px;
},
false);
//END