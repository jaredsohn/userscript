// ==UserScript==
// @name Momerator
// @namespace GLB
// @include http://goallineblitz.com/game/forum*
// ==/UserScript==

function getElementsByClassName(classname, par){
var a=[];
var re = new RegExp('\\b' + classname + '\\b');
var els = par.getElementsByTagName("*");
for(var i=0,j=els.length; i<j; i++){
if(re.test(els.className)){
a.push(els);
}
}
return a;
};

function findName(test) {
if (test.innerHTML.indexOf('/game/home.pl?user_id=196327', 0)>=0) return 1;
return 0;
}

var els = getElementsByClassName('user_name', document);
for(var i=0,j=els.length; i<j; i++) {
if (findName(els)){
var online = getElementsByClassName('online', els)
var offline = getElementsByClassName('offline', els)
if (online.length > 0){els.removeChild(online[0])}
if (offline.length > 0){els.removeChild(offline[0])}
els.innerHTML = els.innerHTML + '<b>Momerator</b><br/>'
if (online.length > 0){els.appendChild(online[0])}
if (offline.length > 0){els.appendChild(offline[0])}
}
}
