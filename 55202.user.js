// ==UserScript==
// @name Rearrange
// @namespace GLB
// @include http://goallineblitz.com/game/forum_main.pl
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

function findName3(test) {
if (test.innerHTML.indexOf('/game/forum_thread_list.pl?forum_id=5374', 0)>=0) return 1;
return 0;
}

function findName(test) {
if (test.innerHTML.indexOf('/game/forum_thread_list.pl?forum_id=3011', 0)>=0) return 1;
return 0;
}

function findName2(test) {
if (test.innerHTML.indexOf('/game/forum_thread_list.pl?forum_id=5473', 0)>=0) return 1;
return 0;
}

var els = getElementsByClassName('alternating_color2 forum', document);
for(var i=0,j=els.length; i<j; i++) {
if (findName3(els)){
els.parentNode.removeChild(els);
els[0].parentNode.appendChild(els)
}
if (findName(els)){
els.parentNode.removeChild(els);
els[0].parentNode.appendChild(els)
}
if (findName2(els)){
els.parentNode.removeChild(els);
els[0].parentNode.appendChild(els)
}
}