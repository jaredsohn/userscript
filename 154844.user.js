// ==UserScript==
// @name		SteamGifts Highlighter
// @namespace	Crazycatz00
// @description	Highlights gifts.
// @copyright	2012 Crazycatz
// @icon		http://www.steamgifts.com/favicon.ico
// @match		*://www.steamgifts.com/*open*
// @match		*://www.steamgifts.com/*new*
// @match		*://www.steamgifts.com/*coming-soon*
// @include		*://www.steamgifts.com/
// @downloadURL	https://userscripts.org/scripts/source/154844.user.js
// @updateURL	https://userscripts.org/scripts/source/154844.meta.js
// @version		1.1.0
// @grant		none
// !LastEdited	12-23-2012
// ==/UserScript==

function $(e,s,p){'use strict';e=(p||document).getElementsByClassName(e);return e.length>0?(s?e[0]:e):null;}
var e=document.getElementById('navigation').textContent.search(/\(([0-9]+)P\)/),p=1*RegExp.$1,i,b,t;
function work(){'use strict';
	for(i=(e=Array.filter($('post',false,$('ajax_gifts',true)),function(e){return typeof e.sgh==='undefined';})).length;i-->0;){
		if($('title',true,b=e[i]).textContent.search(/\(([0-9]+)P\)/)!==-1){
			b.style.backgroundColor='rgba('+(RegExp.$1>p?'255,0,0':(RegExp.$1<p?'0,255,0':'0,0,255'))+',.25)';
			b.sgh=true;
		}
	}
	setTimeout(work,5000);
}
if(e!==-1){work();}