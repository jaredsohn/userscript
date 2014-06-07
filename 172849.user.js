// ==UserScript==
// @name           fix d.cn download links
// @author         randull
// @namespace      http://userscripts.org/scripts/show/172849
// @description    fix d.cn download links
// @version        1.0.0
// @include        *a.d.cn*
// @include        *android.d.cn*
// @updateURL      http://userscripts.org/scripts/source/172849.meta.js
// @downloadURL    http://userscripts.org/scripts/source/172849.user.js

// ==/UserScript==
function InsertHtm(op,code,isStart){ 
var range=op.ownerDocument.createRange(); 
range.setStartBefore(op); 
var fragment = range.createContextualFragment(code); 
if(isStart) 
op.insertBefore(fragment,op.firstChild); 
else 
op.appendChild(fragment); 
} 


(function()
{
	var popgo_stat=document.links;
	for (var i=0; i<popgo_stat.length; i++)
	{
		if (popgo_stat[i].href.match(/\?http:\/\//))
		{
			var temp=popgo_stat[i].href.replace(/http:.*\?http:\/\//,"http://");
			popgo_stat[i].href=temp;
//			alert(popgo_stat[i].href)
		}
	}
})()