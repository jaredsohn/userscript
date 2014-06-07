// ==UserScript==
// @name           Hide Google+ Suggestions
// @namespace      http://adityamukherjee.com/
// @description    Hide the box of suggestions in the right-hand sidebar on Google+
// @include        *plus.google.com*
// ==/UserScript==

(function(){var d=window.DomReady={};var e=navigator.userAgent.toLowerCase();var f={version:(e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(e),opera:/opera/.test(e),msie:(/msie/.test(e))&&(!/opera/.test(e)),mozilla:(/mozilla/.test(e))&&(!/(compatible|webkit)/.test(e))};var g=false;var h=false;var j=[];function domReady(){if(!h){h=true;if(j){for(var a=0;a<j.length;a++){j[a].call(window,[])}j=[]}}};function addLoadEvent(a){var b=window.onload;if(typeof window.onload!='function'){window.onload=a}else{window.onload=function(){if(b){b()}a()}}};function bindReady(){if(g){return}g=true;if(document.addEventListener&&!f.opera){document.addEventListener("DOMContentLoaded",domReady,false)}if(f.msie&&window==top)(function(){if(h)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}domReady()})();if(f.opera){document.addEventListener("DOMContentLoaded",function(){if(h)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}domReady()},false)}if(f.safari){var c;(function(){if(h)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(c===undefined){var a=document.getElementsByTagName("link");for(var i=0;i<a.length;i++){if(a[i].getAttribute('rel')=='stylesheet'){c++}}var b=document.getElementsByTagName("style");c+=b.length}if(document.styleSheets.length!=c){setTimeout(arguments.callee,0);return}domReady()})()}addLoadEvent(domReady)};d.ready=function(a,b){bindReady();if(h){a.call(window,[])}else{j.push(function(){return a.call(window,[])})}};bindReady()})();

DomReady.ready(function(){
	if(!document.getElementsByClassName){
		throw "`documents.getElementsByClassName` not found. googleplussuggestionshider.user.js terminating.";
	}

	var sbox = document.getElementsByClassName("a-b-j-lc-Rd-A");
	if(sbox.length)
		sbox = sbox[0];
	
	sbox.style.display = "none";
});
