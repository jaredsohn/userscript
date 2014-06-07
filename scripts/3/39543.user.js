// ==UserScript==
// @name          use topbottom exclude todayhumor hsver.
// @namespace     http://blog.naver.com/bluelenz (hs)
// @description   use topbottom exclude todayhumor
// @include       *
// @exclude       http://todayhumor.*
// ==/UserScript==

window.addEventListener("dblclick",gohome,true);

function gohome() {
    if (window.pageYOffset < window.innerHeight) window.scrollTo(0,document.body.scrollHeight);
    else window.scrollTo(0,0);
};
