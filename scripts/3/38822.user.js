// ==UserScript==
// @name           GMail Character Count
// @namespace      http://userscripts.org/users/63868
// @include        *mail.google.com/mail*
// ==/UserScript==

var g=null;
var cv='';
var sm=false;
var ve=null;
var ic=0;
function ce(e){var v=document.createEvent("MouseEvents");v.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(v);return;}
function $(a,b){if(!a){return null;}b=b||document;if(typeof a=="string"){if(s=a.match(/^(\\*|.*?)(?:([#.*@<])(.*))?$/)){var c=s[1];if(c==""){c="*";}var d=s[2];a=s[3];}else{return;}if(d=="#"){return b.getElementById(a);}else{if(d=="."){var e=[];var f=b.getElementsByTagName(c);var g=new RegExp("\\b"+a+"\\b");for(var i=0;i<f.length;i++){if(f[i].className.match(g)){e.push(f[i]);}}if(1>e.length){return null;}return e;}else{if(d=="@"){var h=new Array();var j=document.evaluate(a,b,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);var n;while(n=j.iterateNext()){h.push(n);}return h;}else{if(d=="*"){var e=[];if(s=a.match(/(.+?)(?:=(.*?))?\|(.*)/)){var k=s[1];var l=s[2];var m=s[3];}else{return;}var g=new RegExp(m);var f=b.getElementsByTagName(c);if(k=="h"){for(var i=0;i<f.length;i++){if(f[i].innerHTML.match(g)){e.push(f[i]);}}}else{if(k=="t"){for(var i=0;i<f.length;i++){if(f[i].textContent.match(g)){e.push(f[i]);}}}else{if(k=="a"){for(var i=0;i<f.length;i++){if(el=f[i].getAttribute(l)){if(el.match(g)){e.push(f[i]);}}}}}}if(1>e.length){return null;}return e;}else{return b.getElementsByTagName(c);}}}}}else{if(a.nodeType){return a;}else{if(a[0].nodeType){return a;}}}return null;};
function bm()
{
	ve=g.getActiveViewElement();
	if(b=$('button*t|\\bDiscard$',ve))
	{
		var div=null;
		var btn=null;
		for(var i=0;i<b.length;i++)
		{
			btn=b[i];
			if (!btn.gcc_add)
			{
				div=document.createElement('span');
				div.setAttribute('style','font-size:10px;padding:0 0 0 15px;');
				div.innerHTML='( 0 Characters )';
				div.className='char_count'+ic;
				btn.parentNode.insertBefore(div,btn.nextSibling);
				btn.gcc_add=true;
				if(i>=1){setTimeout(iev,1500,ic);ic++;};
			}
		};
	}
	if(sm)
	{
		setTimeout(bm,1500);
	}
	return;
}
function iev(count)
{
	var ifs=$('iframe',g.getActiveViewElement());
	var ifm;
	for(var i=0;i<ifs.length;i++)
	{
		if(!ifs[i].gcc_added)
		{
			ifm=ifs[i].contentDocument;
			ifm.body.setAttribute('count_class','char_count'+count);
			ifm.count_class='char_count'+count;
			ifm.addEventListener('keyup',function()
			{
				var spans=$('.'+this.body.getAttribute('count_class'),g.getActiveViewElement());
				for(var i=spans.length-1;i>=0;i--)
				{
					spans[i].innerHTML='( '+this.body.textContent.length+' Characters )';
				};
				return;
			},false);
			var spans=$('.char_count'+count,g.getActiveViewElement());
			for(var i=spans.length-1;i>=0;i--)
			{
				spans[i].innerHTML='( '+ifm.body.textContent.length+' Characters )';
			};
			ifs[i].gcc_added=true;
			return;
		}
	};
	return;
};
function vc()
{
	cv=g.getActiveViewType();
	if(cv=='cv'||cv=='co')
	{
		ic=0;
		sm=true;
		bm();
		return;
	}
	sm=false;
	return;
}
function init(a)
{
	g=a;
	var fn=function()
	{
		try
		{
			g.registerViewChangeCallback(vc);
		}
		catch(er)
		{
			GM_log(er.message);
			top.location="http://mail.google.com/mail/";
		}
		return;
	};
	setTimeout(fn,1000);
	return;
}
unsafeWindow.gmonkey.load("1.0",init);