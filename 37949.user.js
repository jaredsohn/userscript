// ==UserScript==
// @name           GMail Label Sorting
// @namespace      http://userscripts.org/users/63868
// @description    Sort labels as you last used them.
// @include        http://*mail.google.com/mail*
// @include        https://*mail.google.com/mail*
// ==/UserScript==
function $(a,b){if(!a){return null}b=b||document;if(typeof a=="string"){if(s=a.match(/^(\\*|.*?)(?:([#.*@<])(.*))?$/)){var c=s[1];if(c==""){c="*"}var d=s[2];a=s[3]}else{return}if(d=="#"){return b.getElementById(a)}else{if(d=="."){var e=[];var f=b.getElementsByTagName(c);var g=new RegExp("\\b"+a+"\\b");for(var i=0;i<f.length;i++){if(f[i].className.match(g)){e.push(f[i])}}if(1>e.length){return null}return e}else{if(d=="@"){var h=new Array();var j=document.evaluate(a,b,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);var n;while(n=j.iterateNext()){h.push(n)}return h}else{if(d=="*"){var e=[];if(s=a.match(/(.+?)(?:=(.*?))?\|(.*)/)){var k=s[1];var l=s[2];var m=s[3]}else{return}var g=new RegExp(m);var f=b.getElementsByTagName(c);if(k=="h"){for(var i=0;i<f.length;i++){if(f[i].innerHTML.match(g)){e.push(f[i])}}}else{if(k=="t"){for(var i=0;i<f.length;i++){if(f[i].textContent.match(g)){e.push(f[i])}}}else{if(k=="a"){for(var i=0;i<f.length;i++){if(el=f[i].getAttribute(l)){if(el.match(g)){e.push(f[i])}}}}}}if(1>e.length){return null}return e}else{return b.getElementsByTagName(c)}}}}}else{if(a.nodeType){return a}else{if(a[0].nodeType){return a}}}return null}
var g=null;
var l=null;
var p=null;
var tb=null;
var ind=false;
var nre=new RegExp('^(.*?)(?:\\s*?\\([0-9]+\\))?$');
var la=[];
if(GM_getValue("last_used"))
{
	p=eval(GM_getValue("last_used"));
}
else{
	p=[];
	GM_setValue("last_used",p.toSource());
}
function um()
{
	var d=$('#canvas_frame',top.document).contentDocument;
	var m=null;
	var lbs=[];
	var lb={};
	var lbc=null;
	if(ms=$('div*h|^New labe<wbr>l\\.\\.\\.$',d))
	{
		for(var i=0;m=ms[i];i++)
		{
			lbs=[];
			while(m=m.nextSibling)
			{
				lb={};
				lb.n=m.textContent;
				if(lb.n.match('Remove label'))break;
				if(lb.ts=ts(lb.n))
				{
					lb.c=m;
					lbs.push(lb);
				}
			}
			if(0<lbs.length)
			{
				lbs.sort(function(d,e){return (d.ts-e.ts)});
				for(var j=0;lb=lbs[j];j++)
				{
					lbc=lb.c;
					lb.c.parentNode.removeChild(lb.c);
					ms[i].parentNode.insertBefore(lbc,ms[i].nextSibling);
				}
			}
		}
	}
	return;
}
function vc()
{
	var h=g.getActiveViewElement();
	var mas=$('div*h|^\\bMore Actions\\b',h);
	for(var i=0;i<mas.length;i++)
	{
		mas[i].addEventListener('click',function()
		{
			setTimeout(um,100);
			return;
		},false);
	}
	return;
}
function lc(h)
{
	var t=new Date().getTime();
	for(var i=0;i<p.length;i++)
	{
		if(p[i].n==h)
		{
			p[i].ts=t;
			GM_setValue("last_used",p.toSource());
			sort();
			return
		}
	}
	p.push({n:h,ts:t});
	GM_setValue("last_used",p.toSource());
	sort();
	return;
}
function ts(a)
{
	var b=0;
	for(var i=0;i<p.length;i++)
	{
		if(p[i].n==a)
		{
			return p[i].ts;
		}
	}
	return null
}

function sort()
{
	var t=null;
	var a=null;
	var b="";
	var c=null;
	t=$("table",l)[0];
	tb=$("tbody",t)[0];
	a=$("a",t);
	for(var i=0;i<a.length;i++)
	{
		if(ind===false)
		{
			a[i].addEventListener("click",function(){lc(this.innerHTML.match(nre)[1])},false);
		}
		c={};
		c.n=a[i].innerHTML.match(nre)[1];
		c.ts=ts(c.n);
		if(c.ts)
		{
			c.c=a[i].parentNode.parentNode.parentNode.parentNode;
			la.push(c);
		}
	}
	la.sort(function(d,e){return (d.ts-e.ts)});
	for(i=0;i<la.length;i++)
	{
		c=la[i].c;la[i].c.parentNode.removeChild(la[i].c);
		tb.insertBefore(c,tb.firstChild);
	}
	ind=true;
	return;
}
function init()
{
	var h="";
	try
	{
		l=g.getNavPaneElement();
		g.registerViewChangeCallback(vc);
	}
	catch(er)
	{
		window.location.reload();
		return;
	}
	l=$('h2*t|\\bLabels\\b',l)[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	sort();
	return;
}
function fn(a)
{
	g=a;setTimeout(init,500);
	return;
}
unsafeWindow.gmonkey.load("1.0",fn)