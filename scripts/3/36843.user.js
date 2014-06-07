// ==UserScript==
// @name           Mystadio's Homepage
// @namespace      http://www.mystadio.com/
// @description    Mystadio's Homepage
// @include        http://www.wowhead.com/?mystadio
// ==/UserScript==

function $(element)
{
	if(arguments.length > 1)
	{
		var elements = [];
		for(var i = 0, len = arguments.length; i < len; ++i)
			elements.push($(arguments[i]));
		return elements;
	}

	if(typeof element == 'string')
		element = ge(element);

	return element;
}

function ge(z){return document.getElementById(z)}
function gE(z,y){return z.getElementsByTagName(y)}
function ce(z, p){var r = document.createElement(z); if(p) cOr(r, p); return r }
function de(z){z.parentNode.removeChild(z)}
function ae(z,y){return z.appendChild(y)}
function ct(z){return document.createTextNode(z)}
function nw(z){z.style.whiteSpace='nowrap'}
function rf(){return false}
function tb(){this.blur()}
function ac(z){var a=0,b=0;while(z){a+=z.offsetLeft;b+=z.offsetTop;z=z.offsetParent}return [a,b]}
function aE(z,y,x){if(Browser.ie)z.attachEvent('on'+y,x);else z.addEventListener(y,x,false)}
function dE(z,y,x){if(Browser.ie)z.detachEvent('on'+y,x);else z.removeEventListener(y,x,false)}
function sp(z){if(!z)z=event;if(Browser.ie){z.cancelBubble=true}else{z.stopPropagation()}}
function sc(z,y,x,w,v){var a=new Date();var b=z+'='+escape(x)+'; ';a.setDate(a.getDate()+y);b+='expires='+a.toUTCString()+'; ';if(w)b+='path='+w+'; ';if(v)b+='domain='+v+'; ';document.cookie=b}
function dc(z){sc(z,-1)}
function gc(z){var b,c;if(!z){var a=[];c=document.cookie.split('; ');for(var i=0;i< c.length;++i){b=c[i].split('=');a[b[0]]=unescape(b[1])}return a}else{b=document.cookie.indexOf(z+'=');if(b!=-1){if(b==0||document.cookie.substring(b-2,b)=='; '){b+=z.length+1;c=document.cookie.indexOf('; ',b);if(c==-1)c=document.cookie.length;return unescape(document.cookie.substring(b,c))}}}return null}
function ns(n){if(Browser.ie){n.onfocus=tb;n.onmousedown=n.onselectstart=n.ondragstart=rf;}}

var Browser = {
	ie:     !!(window.attachEvent && !window.opera),
	opera:  !!window.opera,
	safari: navigator.userAgent.indexOf('Safari') != -1,
	gecko:  navigator.userAgent.indexOf('Gecko') != -1 && navigator.userAgent.indexOf('KHTML') == -1
};
Browser.ie7 = Browser.ie && navigator.userAgent.indexOf('MSIE 7.0') != -1;
Browser.ie6 = Browser.ie && navigator.userAgent.indexOf('MSIE 6.0') != -1 && !Browser.ie7;
navigator.userAgent.match(/Gecko\/([0-9]+)/);
Browser.geckoVersion = parseInt(RegExp.$1) | 0;

var OS = {
	windows: navigator.appVersion.indexOf('Windows')   != -1,
	mac:     navigator.appVersion.indexOf('Macintosh') != -1,
	linux:   navigator.appVersion.indexOf('Linux')     != -1
};

//****************************************************************************
//****************************************************************************
//****************************************************************************

window.updateLinks = function()
{
	GM_log('onchange: ' + this.value);

	var links = [
		['Item #',    'http://www.wowhead.com/?item='],
		['Npc #',     'http://www.wowhead.com/?npc='],
		['Object #',  'http://www.wowhead.com/?object='],
		['Quest #',   'http://www.wowhead.com/?quest='],
		['Spell #',   'http://www.wowhead.com/?spell='],
		['Zone #',    'http://www.wowhead.com/?zone='],
		['Faction #', 'http://www.wowhead.com/?faction='],
		['Itemset #', 'http://www.wowhead.com/?itemset=']
	];

	var buffer = '';

	for(var i in links)
	{
		buffer += '<br /><a href="' + links[i][1] + this.value + '">' + links[i][0] + this.value + '</a>';
	}

	$('allTheLinks').innerHTML = buffer;
};



var p = gE($('main-contents'), 'div')[0];
p.lastChild.nodeValue = '';

var node = ce('div');
ae(p, node);

var input = ce('input');
input.type = 'text';
input.value = '';
aE(input, 'change', updateLinks);
aE(input, 'keyup', updateLinks);
ae(node, input);

ae(node, ce('br'));

var div = ce('div');
div.id = 'allTheLinks';
div.innerHTML = '...';
ae(node, div);
