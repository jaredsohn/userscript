// ==UserScript==
// @id             mimiai_adblocker
// @name           mimiai adblocker
// @include        http://*mimi*.com/*
// @description	   Removed ads and added keyboard shortcuts for klmimi.com
// @version 1.1
// @namespace http://userscripts.org/users/boin
// @updateURL https://userscripts.org/scripts/source/135395.meta.js
// @downloadURL https://userscripts.org/scripts/source/135395.user.js
// ==/UserScript==

~function(){

var pre_a, next_a; 

Array.prototype.forEach.call(document.getElementsByTagName('a'), function(a){
	if(!a.href || (pre_a && next_a))return;
	if(/nextoldset$/.test(a.href))
		(pre_a = a);
	if(/nextnewset$/.test(a.href))
		(next_a = a);
});

if( !pre_a || !next_a ) return;

unsafeWindow.onkeydown = function(evt){
	if(evt.keyCode == 37){
		unsafeWindow.location = pre_a.href
	}else if(evt.keyCode == 39){
		unsafeWindow.location = next_a.href
	}
}

//grep some bad property
var e = document.querySelector('div.t_msgfont'), 
    c = e && e.innerHTML,
    n = c && c.match(/\[img\]/);
if (n) {
    c = c && c.replace(/\[img\]/g,'<img src=').replace(/<img src=<br>/g, ' />');
    e && c && (e.innerHTML = c);
}

var brs = document.querySelectorAll('img + br');
Array.prototype.forEach.call(brs, function(b){b.remove()});

}()