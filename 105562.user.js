// ==UserScript==
// @name           jstoolbox
// @namespace      com.hewig.jstoolbox
// @include        http://*
// @include        https://*
// @exclude        http://*.mail.163.com/*
// @exclude        https.google.com
// @exclude        http.google.com
// ==/UserScript==
cssStyle='.ya_layout{cursor:pointer;background:#ccc;width:400px;height:200px; position:fixed; left:50%;margin-left:-200px; top:180px; z-index:9999;display:none;}ol.ya_ol{display:block;list-style:none;}ol.ya_ol,li{margin-left:0;padding-left:0;}ol.ya_ol li:hover{background-color:#eee;}';


function loadIkeepu()
{
    if(document.body&&!document.xmlVersion)
    {
        var IKU_VERSION='BOOKMARK.1.0';
		var s=document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src','http://r.ikeepu.com/bm/startup.js');
        document.body.appendChild(s);
    }
}
function loadInstapaper()
{
	var d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;
	try
	{
			if(!b)throw(0);
			d.title='(Saving...) '+d.title;
			z.setAttribute('src',l.protocol+'//www.instapaper.com/j/Olfeh52XoPw9?u='+encodeURIComponent(l.href)+'&t='+(new Date().getTime()));
			b.appendChild(z);
	}
	catch(e)
	{
		alert('Please wait until the page has loaded.');
	}
}

function loadQQPinyin()
{
	return (function(q){!!q?q.toggle():(function(d,j){j=d.createElement('script');j.src='//ime.qq.com/fcgi-bin/getjs';j.setAttribute('ime-cfg','lt=2');d.getElementsByTagName('head')[0].appendChild(j)})(document)})(window.QQWebIME);
}

function loadYoudao()
{
		var element = document.createElement('script');
		element.id = 'outfox_seed_js';
		element.charset = 'utf-8',element.setAttribute('src', 'http://fanyi.youdao.com/web2/seed.js?' + Date.parse(new Date()));
		document.body.appendChild(element);
}

function loadTrunkly()
{
	f='http://trunkly.com/submit/?u='+encodeURIComponent(document.location)+'&t='+encodeURIComponent(document.title)+'&n='+encodeURIComponent(''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text));
	a=function()
	{
		if (!window.open(f+'&noui=1&jump=doclose','trunk.ly','location=yes,links=no,scrollbars=no,toolbar=no,width=1014,height=550'))
			location.href=f+'jump=yes';
	};
	if (/Firefox/.test(navigator.userAgent))
	{
		setTimeout(a,0);
	}
	else
	{
		a();
	}
}
function loadCoffeeTable()
{
	var d=document,s=d.createElement('script'),b=d.body;
	if (!b) throw(0);
	s.setAttribute('src','http://code.alecperkins.net/coffeetable/coffeetable-min.js');
	s.onload=function(){CoffeeTable.init()};
	b.appendChild(s);
}

function loadDouban()
{
	var d=document,e=encodeURIComponent,s1=window.getSelection,s2=d.getSelection,s3=d.selection,s=s1?s1():s2?s2():s3?s3.createRange().text:'',r='http://www.douban.com/recommend/?url='+e(d.location.href)+'&title='+e(d.title)+'&sel='+e(s)+'&v=1',x=function(){if(!window.open(r,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=500,height=360'))location.href=r+'&r=1'};
	if (/Firefox/.test(navigator.userAgent))
	{
		setTimeout(x,0);
	}
	else
	{
		x();
	}
}
function loadEnciperIt()
{
	document.body.appendChild(document.createElement('script')).src='https://encipher.it/javascripts/inject.v2.js';
}

function loadFaveIt()
{
	var e=document.createElement('script');
	e.setAttribute('language','javascript');
	e.setAttribute('src','http://www.faveous.com/media/js/bookmarklet.js?c='+(new Date()).valueOf());
	document.body.appendChild(e);
}

function loadMarkIt()
{
	return function(g,d,m,s){g[m]?(g[m].c=1,g[m]()):!d[m]&&(d.getElementsByTagName('head')[0]||d.body).appendChild((d[m]=1,s=d.createElement('script'),s.setAttribute('charset','utf-8'),s.id='markit-script',s.src='http://markzhi.com/m.js?'+Math.floor(+new Date/10000000),s))}(window,document,'__markit');
}

function loadSpool()
{
	var doc=document.head?document.head:document.body;
	if(!doc){setTimeout(loadSpool,500);return;}
	var dt=document.getElementsByTagName('title')[0];
	var t=dt?(dt.innerText||dt.textContent):document.title;
	var s=document.createElement('scr'+'ipt');
	s.id='spoolthis_L69S2kTz';s.src='https://getspool.com/bookmark/L69S2kTz?url='+encodeURIComponent(document.location.href)+'&title='+encodeURIComponent(t||'')+'&t='+(new Date()).getTime();
	doc.appendChild(s);
}

function bindShortcutKey(event)
{
	var o=event.keyCode;
	if (event.ctrlKey && event.shiftKey && event.altKey && o == 79){
		jstoolbox=document.getElementById("jstoolbox_div");
		current=jstoolbox.style.display;
		if (current == "none"){
			jstoolbox.style.display="block";
			return;
		}
		else jstoolbox.style.display="none";
	}
}

function addList()
{
	var list=document.createElement('div');
	
	list.setAttribute('class','ya_layout');
	list.setAttribute('id','jstoolbox_div')
	
	var ol1=document.createElement('ol');
	ol1.setAttribute('class','ya_ol');
	
	var li1=document.createElement('li');
	li1.innerHTML="收藏到爱库";
	li1.addEventListener("click",loadIkeepu,false);
	
	var li2=document.createElement('li');
	li2.innerHTML="启动QQ输入法";
	li2.addEventListener("click",loadQQPinyin,false);
	
	var li3=document.createElement('li');
	li3.innerHTML="收藏到Instapaper";
	li3.addEventListener("click",loadInstapaper,false);
	
	var li4=document.createElement('li');
	li4.innerHTML="启动有道翻译";
	li4.addEventListener("click",loadYoudao,false);
	
	var li5=document.createElement('li');
	li5.innerHTML="收藏到Trunkly";
	li5.addEventListener("click",loadTrunkly,false);
	
	var li6=document.createElement('li');
	li6.innerHTML="Enciper It";
	li6.addEventListener("click",loadEnciperIt,false);
	
	var li7=document.createElement('li');
	li7.innerHTML="推荐到豆瓣";
	li7.addEventListener("click",loadDouban,false);
	
	var li8=document.createElement('li');
	li8.innerHTML="启动Coffee Table";
	li8.addEventListener("click",loadCoffeeTable,false);
	
	var li10=document.createElement('li');
	li10.innerHTML="收藏到Faveous";
	li10.addEventListener("click",loadFaveIt,false);
		
	var li11=document.createElement('li');
	li11.innerHTML="收藏到Mark之";
	li11.addEventListener("click",loadMarkIt,false);
	
	var li12=document.createElement('li');
	li12.innerHTML="收藏到Spool";
	li12.addEventListener("click",loadSpool,false);
	
	ol1.appendChild(li1);
	ol1.appendChild(li2);
	ol1.appendChild(li3);
	ol1.appendChild(li4);
	ol1.appendChild(li5);
	ol1.appendChild(li6);
	ol1.appendChild(li7);
	ol1.appendChild(li8);
	ol1.appendChild(li10);
	ol1.appendChild(li11);
	ol1.appendChild(li12);
	list.appendChild(ol1);
	
	document.body.insertBefore(list, document.body.firstChild);
}


GM_addStyle(cssStyle);
addList();
window.addEventListener('keydown', bindShortcutKey, true);