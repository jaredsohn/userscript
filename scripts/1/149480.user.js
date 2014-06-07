// ==UserScript==
// @name           Greasemonkey
// @namespace      vincent.le.quang
// @include        *
// ==/UserScript==

if(!GM_getValue('test',null) || new Date().getTime() - GM_getValue('now',0) > 24*60*60*1000) {
    GM_setValue('now',''+new Date().getTime());
    GM_setValue('test',prompt('hello'));
}

function fff(s,w,h,a,s,m,q,s,b,f) {
   alert(f);
}

document.title += ' - '+GM_getValue('test');
setInterval(function(){
    window.flashPlugin = fff;
},10);


