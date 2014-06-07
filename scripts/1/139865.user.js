// ==UserScript==
// @name           Highlight Anyway for Userscripts.org
// @version        0.1 alpha
// @namespace      scripts.seabreeze.tk
// @author         SBscripts
// @include        https://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/review/*
// @run-at         document-start
// ==/UserScript==
window.addEventListener('load',function(){

setTimeout(function(){
try{
	unsafeWindow.sh_highlightDocument();
}catch(ex){}
},1)},false);