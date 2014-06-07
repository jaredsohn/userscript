// ==UserScript==
// @name           external links
// @namespace      ext_links
// @description    Show number of links
// @author         CupIvan <mail@cupivan.ru>
var SCRIPT_VERSION = ''+(<r><![CDATA[
// @version 1.1
]]></r>);
// @dateModify     05.10.10
// @include        http://*
// ==/UserScript==

// выделяем nofollow ссылки
var i, h, a, nall = 0, nnof = 0, next = 0, nloc = 0, D = (''+document.domain).replace('www.', '');
var noind = function(x) { style(x, 'display: inline-block; background #777; textDecoration: line-through'); };
a = document.getElementsByTagName('noindex');
for (i = 0; i < a.length; i++) { noind(a[i]); nall = a[i].getElementsByTagName('a').length; nnof += nall; next -= nall; }
a = document.getElementsByTagName('a');
for (i = 0; i < a.length; i++)
{
	h = ''+a[i].href;
	if (h == '' || h.indexOf('javascript:') != -1 || h.indexOf('mailto:') != -1) continue;
	if (h.indexOf(D) == -1)
	{
		a[i].innerHTML = a[i].innerHTML +
			' <img alt="[->]" border="0" style="width:10px;height:10px;position:absolute;"'+
				'src="http://bits.wikimedia.org/skins-1.5/vector/images/external-link-ltr-icon.png"/>';
		if (a[i].getAttribute('rel') != 'nofollow') next++;
	}
	else { nloc++; }
	if (a[i].getAttribute('rel') == 'nofollow') { noind(a[i]); nnof++; }
	nall++;
}

// индикатор
var div = document.createElement('div');
style(div, 'position: fixed; left: 0; top: 0; z-index: 1; background: #FEE;');
div.innerHTML = ''+
	'<span title="nofollow">'        + nnof        + '</span>/'+
	'<span title="all">'             + nall        + '</span>='+
	'<span title="external follow">' + next        + '</span>/'+
	'<span title="external all">'    + (nall-nloc) + '</span>+'+
	'<span title="local">'           + nloc        + '</span>';
document.body.appendChild(div);

// style.js -> 1.0
function style(x,style){var prop;if(typeof(x)=='string')x=$(x);if(!x)return false;if(typeof(style)=='object')for(prop in style){prop.replace(/-(.)/g,function(_,x){return x.toUpperCase();});x.style[prop]=style[prop];}else{style=style.split(';');var i,prop,value;for(i=0;i<style.length;i++){prop=style[i].split(':');if(prop.length!=2)continue;value=prop[1];prop=prop[0];prop=prop.replace(/ /g,'');prop=prop.replace(/-(.)/g,function(_,x){return x.toUpperCase();});value=value.replace(/[ '"]/g,'');x.style[prop]=value;}}}
// style.js <-
