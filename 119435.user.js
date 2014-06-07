// ==UserScript==
// @name GamerSKY-BUG fix
// @namespace http://blog.windpr.tw
// @description GamerSKY的BUG修正
// @include        http://www.gamersky.com/*
// @version 1.0.1
// ==/UserScript==

function funcionPrincipal(e){
	var s = 'var d=document;';
		s+='var gs_cn=d.getElementById("gs_countn"),gs_cp=d.getElementById("gs_countp"),gs_cj=d.getElementById("gs_countj");';
		s+='d.getElementById("countn").innerHTML=gs_cn.innerHTML;gs_cn.innerHTML="";';
		s+='d.getElementById("countp").innerHTML=gs_cp.innerHTML;gs_cp.innerHTML="";';
		s+='d.getElementById("countj").innerHTML=gs_cj.innerHTML;gs_cj.innerHTML="";';
	if		(typeof GM_addScript != "undefined")	{GM_addScript(s);}
	else if	(typeof addScript != "undefined")		{addScript(s);}
	else											{
		var d=document;
		var b = d.getElementsByTagName("body");
		if (b.length > 0) {
			var n = d.createElement("script");
				n.type = "text/javascript";
				n.appendChild(d.createTextNode(s));
			b[0].appendChild(n); 
		}
	}
};
window.addEventListener('DOMContentLoaded', funcionPrincipal, true);
