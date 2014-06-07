// ==UserScript==
// @name		NoDataProtocol
// @description		Kills all `` data: '' elements on selected site.
// @description		That means, forbid data protocol for any site that abuses it.
// @namespace		http://userscripts.org/uscript.raskin@rambler.ru
// @include		about:nonexistent
// ==/UserScript==

window.document.body.setAttribute("onload","_do=function(n) { \
	if(n.getAttribute) \
	if(n.getAttribute('src')) \
	if(n.getAttribute('src').substring(0,5)=='data:')\
	{\
		n.src = 'about:blank'; \
		n.setAttribute('src','about:blank'); \
	}\
	if(n.src) \
	if(n.src.substring(0,5)=='data:')\
	{\
		n.src = 'about:blank'; \
		n.setAttribute('src','about:blank'); \
	} \
	if(n.firstChild){ \
		_do(n.firstChild); \
	} \
	if(n.nextSibling){ \
		_do(n.nextSibling); \
	} \
	if(n.contentDocument){ \
		_do(n.contentDocument); \
	} \
}; \
_do(window.document);");
