// ==UserScript==
// @name        Google Translate
// @namespace   Google Translate
// @include     https://www.google.*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById('hdtb_msb').innerHTML += '<a href="https://translate.google.'+ window.location.href.split('www.google.')[1].split('/')[0] +'/?bav=on.2,or.r_qf.&bvm=pv.xjs.s.en_US.nZdU-ju1wak.O&noj=1&um=1&ie=UTF-8&hl=en&sa=N&tab=wT#auto/en/'+ window.location.href.split('q=')[1].split('&')[0] +'">Translate</a>';