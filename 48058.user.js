// ==UserScript==
// @name              Lifehacker/Gawker/Kotaku/Consumerist/Gizmodo auto expand comments
// @namespace         None
// @homepage          http://userscripts.org/scripts/show/48058
// @author            RaiGal (script code provided by JoeSimmons from userscripts.org forums)
// @description      Expands comments on lifehacker article pages.
// @include           http://lifehacker.com/*
// @include           http://consumerist.com/*
// @include           http://kotaku.com/*
// @include           http://gawker.com/*
// @include           http://gizmodo.com/*


// ==/UserScript==

function show() {
setTimeout(function(){
var intv = setInterval(function(){
try{unsafeWindow.showAllStrayComments();
if(document.evaluate("//a[contains(@class,'collapseLink')]",document,null,6,null).snapshotLength>0) {clearInterval(intv);set();}
} catch(e){}
}, 100);
}, 2000);
}

function set() {
var links = document.evaluate("//a[contains(@onClick, 'setCommentPage')]",document,null,6,null);
for(var i=links.snapshotLength-1; i>=0; i--) {
links.snapshotItem(i).addEventListener('click', show, false);
}
}

window.addEventListener('load', function(){set();show();}, false);