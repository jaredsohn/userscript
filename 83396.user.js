// ==UserScript== 
// @name Rupee
// @namespace none 
// @description Puts Rupee Symbol
// @include * 
// @version 1
// @homepage Nil
//


/* 
By Jayadevan Raja;
Thanks to WebRupee.com

This work uses some code provided by WebRupee.com, as well as their font and API. The copyright of all those belong to WebRupee.com.

I, Jayadevan Raja, hold the copyright of the creative effort done by me. I release it under the GNU AGPL Licence, Version 3.

    This script helps th see the "Rs." as the Rupee Symbol, which has been recognised by the Indian government on 2010-07-15
    Copyright (C) 2010  Jayadevan Raja

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/ 



function addGlobalScript(css)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = css;
    head.appendChild(script);
}

addGlobalScript('\
var _wr_load = window.onload;\
window.onload = function()\
{\
	if(typeof(_wr_load)=="function")\
	{_wr_load()}_wr_d=document;\
	_wr_l(_wr_d);\
	_wr_i(_wr_d.body);\
	_wr_re(_wr_d.body)\
};\
_wr_l=function(c)\
{\
	var b = c.createElement("link");\
	b.type="text/css";\
	b.rel="stylesheet";\
	b.href="http://webrupee.com/font";\
	var a=c.getElementsByTagName("head")[0];\
	a.appendChild(b)\
};\
_wr_i = function(e)\
{\
	var b = e.childNodes;\
	var a = b.length;\
	for(var d=0;d<a;d++)\
	{\
		if(b[d].nodeType==3)\
		{\
			if(!b[d].nodeValue.match(/^[\s]*$/))\
			{\
				r = b[d].nodeValue;\
				r=r.replace(/\s(Rs|Rs\.)\s/gi," Rs. ");\
				r=r.replace(/^(Rs|Rs\.)\s/gi," Rs. ");\
				var reg=new RegExp(/\sRs\.[0-9]+\s/gi);\
				var mo=reg.exec(r);\
				while(mo!=null)\
				{\
					var nmo = String(mo);\
					nmo = nmo.replace(/(Rs\.)/gi," Rs. ");\
					r = r.replace(mo,nmo);\
					mo = reg.exec(r);\
				};\
				var reg = new RegExp(/\sRs\.[0-9]+,/gi);\
				var mo = reg.exec(r);\
				while(mo != null)\
				{\
					var nmo = String(mo);\
					nmo = nmo.replace(/Rs\./gi," Rs. ");\
					r = r.replace(mo,nmo);mo=reg.exec(r);};\
					reg = new RegExp(/^Rs\.[0-9]+$/gi);\
					mo = reg.exec(r);\
					if(mo != null)\
					{\
						nmo = String(mo);\
						nmo = nmo.replace(/Rs\./gi," Rs. ");\
						r = r.replace(mo,nmo);\
					};\
					b[d].nodeValue = r\
				}\
			}\
		else\
		{\
			if(b[d].nodeName.toLowerCase() != "script")\
			{\
				_wr_i(b[d])\
			}\
		}\
	}\
};\
_wr_re=function(j)\
{\
	var b=0;\
	if(j.nodeType==3)\
	{\
		var g = j.data.indexOf(" Rs. ");\
		if(g>=0)\
		{\
		var h = document.createElement("span");\
		h.className = "WebRupee";\
		var a = j.splitText(g);\
		var f = a.splitText(5);\
		var d=a.cloneNode(true);\
		h.appendChild(d);\
		a.parentNode.replaceChild(h,a);\
		b = 1}\
	}\
	else\
	{\
		if(j.nodeType==1&&j.childNodes&&!/(script|style)/i.test(j.tagName))\
		{\
			for(var i=0;i<j.childNodes.length;++i)\
			{\
				i += _wr_re(j.childNodes[i])\
				}\
			}\
		}\
	return b;\
};');

// ==/UserScript==