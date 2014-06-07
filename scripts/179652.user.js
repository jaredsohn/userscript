// ==UserScript==
// @name       Bring Back Google Top Menu
// @namespace  http://www.garrettgalloway.com/bbgtm.user.js
// @version    0.9
// @description  Modifies top links.
// @match      *.google.com
// @match      *.google.com/*
// ==/UserScript==

/*global $, jQuery*/

var i, TINY={}, settingsContent, settingsLink, saveLink, redrawLinks, divs, durl;

durl = document.URL;
divs = document.getElementsByClassName('gb_ob');

function saveSettings(){
    var linksText = document.getElementById("linksText").value;
    GM_setValue("linksText", linksText);
    redrawLinks();
}

redrawLinks = function(){
    var tmpText = "", tmpLinkSets, n;
	
    tmpLinkSets = GM_getValue("linksText", "Gmail|https://mail.google.com/mail/\nDrive|https://drive.google.com/\nCalendar|https://www.google.com/calendar/render\nNews|https://news.google.com/").split("\n");
    
    for (n = 0; n < tmpLinkSets.length; n++)
    {
        if(durl.toLowerCase().indexOf("mail.google") != -1 || durl.toLowerCase().indexOf("google.com/calendar") != -1 || durl.toLowerCase().indexOf("drive.google") != -1 || durl.toLowerCase().indexOf("plus.google") != -1)
        {
            tmpText = tmpText + "<div class=\"gb_g\" style=\"padding-left: 8px;\"><a class=\"gb_b\" href=\"" + tmpLinkSets[n].split("|", 2)[1] + "\"> " + tmpLinkSets[n].split("|", 2)[0] + "</a></div>";
        }else if(durl.toLowerCase().indexOf("news.google.com") != -1)
        {
            tmpText = tmpText + "<div class=\"gb_e gb_f\" style=\"padding-left: 8px;  padding-right:4px; overflow:visible; display:flex;\"><a class=\"gb_b gb_f\" href=\"" + tmpLinkSets[n].split("|", 2)[1] + "\"> " + tmpLinkSets[n].split("|", 2)[0] + "</a></div>";
        }else
        {
            tmpText = tmpText + "<div class=\"gb_e gb_f\"><a class=\"gb_b gb_f\" href=\"" + tmpLinkSets[n].split("|", 2)[1] + "\">" + tmpLinkSets[n].split("|", 2)[0] + "</a></div>";
        }
        
    }
    if(durl.toLowerCase().indexOf("mail.google") != -1 || durl.toLowerCase().indexOf("google.com/calendar") != -1 || durl.toLowerCase().indexOf("drive.google") != -1 || durl.toLowerCase().indexOf("plus.google") != -1)
    {
    	tmpText = tmpText + "<div class=\"gb_g\" style=\"padding-left: 8px;\"><a class=\"gb_b\" id=\"settingsLnk\" href=\"javascript:void(0);\">More</a></div>";
    }else if(durl.toLowerCase().indexOf("news.google.com") != -1)
    {
        tmpText = tmpText + "<div class=\"gb_e gb_f\" style=\"padding-left: 8px;  padding-right:4px; overflow:visible; display:flex;\"><a class=\"gb_b gb_f\" id=\"settingsLnk\" href=\"javascript:void(0);\">More</a></div>";
    }else{
        tmpText = tmpText + "<div class=\"gb_e gb_f\"><a class=\"gb_b gb_f\" id=\"settingsLnk\" href=\"javascript:void(0);\">More</a></div>";
    }
    if (divs.length == 0)
    {
        setTimeout(function(){divs = document.getElementsByClassName('gb_ob'); redrawLinks();}, 1000);
    }
    for ( i = 0; i < divs.length; i++ )
    {
        divs[i].innerHTML = tmpText;
    }
    settingsLink = document.getElementById("settingsLnk");
    settingsLink.onclick = function () {
        settingsContent = "<div>Please put each title and URL separated by a bar/pipe(|) on a separate line. <br/>ex:<br/>Youtube|http://www.youtube.com<br>Facebook|http://www.facebook.com<br/><textarea id=\"linksText\"rows=\"10\" cols=\"50\">" +
            GM_getValue("linksText", "Gmail|https://mail.google.com/mail/\nDrive|https://drive.google.com/\nCalendar|https://www.google.com/calendar/render\nNews|https://news.google.com/") + "</textarea></div>";
        TINY.box.show(settingsContent,0,0,0,1,0, saveSettings);
        return false;
	}
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
"#tinybox {position:absolute; display:none; padding:10px; background:#fff url(images/preload.gif) no-repeat 50% 50%; border:10px solid #e3e3e3; z-index:2000}" +
"#tinymask {position:absolute; display:none; top:0; left:0; height:100%; width:100%; background:#000; z-index:1500}" +
"#tinycontent {background:#fff}" +
".button {font:14px Georgia,Verdana; margin-bottom:10px; padding:8px 10px 9px; border:1px solid #ccc; background:#eee; cursor:pointer}" +
".button:hover {border:1px solid #bbb; background:#e3e3e3}");

function T$(i){return document.getElementById(i);}

TINY.box=function(){
	var p,m,b,fn,ic,iu,iw,ih,ia,f=0, oncloseFunc;
	return{
		show:function(c,u,w,h,a,t,oncloseF){
            oncloseFunc = oncloseF;
			if(!f){
				p=document.createElement('div'); p.id='tinybox';
				m=document.createElement('div'); m.id='tinymask';
				b=document.createElement('div'); b.id='tinycontent';
				document.body.appendChild(m); document.body.appendChild(p); p.appendChild(b);
				m.onclick=TINY.box.hide; window.onresize=TINY.box.resize; f=1
			}
			if(!a&&!u){
				p.style.width=w?w+'px':'auto'; p.style.height=h?h+'px':'auto';
				p.style.backgroundImage='none'; b.innerHTML=c
			}else{
				b.style.display='none'; p.style.width=p.style.height='100px'
			}
			this.mask();
			ic=c; iu=u; iw=w; ih=h; ia=a; this.alpha(m,1,80,3);
			if(t){setTimeout(function(){TINY.box.hide()},1000*t)}
		},
		fill:function(c,u,w,h,a){
			if(u){
				p.style.backgroundImage='';
				var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
				x.onreadystatechange=function(){
					if(x.readyState==4&&x.status==200){TINY.box.psh(x.responseText,w,h,a)}
				};
				x.open('GET',c,1); x.send(null)
			}else{
				this.psh(c,w,h,a)
			}
		},
		psh:function(c,w,h,a){
			if(a){
				if(!w||!h){
					var x=p.style.width, y=p.style.height; b.innerHTML=c;
					p.style.width=w?w+'px':''; p.style.height=h?h+'px':'';
					b.style.display='';
					w=parseInt(b.offsetWidth); h=parseInt(b.offsetHeight);
					b.style.display='none'; p.style.width=x; p.style.height=y;
				}else{
					b.innerHTML=c
				}
				this.size(p,w,h)
			}else{
				p.style.backgroundImage='none'
			}
		},
		hide:function(){
            oncloseFunc();
			TINY.box.alpha(p,-1,0,3);
		},
		resize:function(){
			TINY.box.pos(); TINY.box.mask()
		},
		mask:function(){
			m.style.height=TINY.page.total(1)+'px';
			m.style.width=''; m.style.width=TINY.page.total(0)+'px'
		},
		pos:function(){
			var t=(TINY.page.height()/2)-(p.offsetHeight/2); t=t<10?10:t;
			p.style.top=(t+TINY.page.top())+'px';
			p.style.left=(TINY.page.width()/2)-(p.offsetWidth/2)+'px'
		},
		alpha:function(e,d,a){
			clearInterval(e.ai);
			if(d==1){
				e.style.opacity=0; e.style.filter='alpha(opacity=0)';
				e.style.display='block'; this.pos()
			}
			e.ai=setInterval(function(){TINY.box.ta(e,a,d)},20)
		},
		ta:function(e,a,d){
			var o=Math.round(e.style.opacity*100);
			if(o==a){
				clearInterval(e.ai);
				if(d==-1){
					e.style.display='none';
					e==p?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''
				}else{
					e==m?this.alpha(p,1,100):TINY.box.fill(ic,iu,iw,ih,ia)
				}
			}else{
				var n=Math.ceil((o+((a-o)*.5))); n=n==1?0:n;
				e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
			}
		},
		size:function(e,w,h){
			e=typeof e=='object'?e:T$(e); clearInterval(e.si);
			var ow=e.offsetWidth, oh=e.offsetHeight,
			wo=ow-parseInt(e.style.width), ho=oh-parseInt(e.style.height);
			var wd=ow-wo>w?0:1, hd=(oh-ho>h)?0:1;
			e.si=setInterval(function(){TINY.box.ts(e,w,wo,wd,h,ho,hd)},20)
		},
		ts:function(e,w,wo,wd,h,ho,hd){
			var ow=e.offsetWidth-wo, oh=e.offsetHeight-ho;
			if(ow==w&&oh==h){
				clearInterval(e.si); p.style.backgroundImage='none'; b.style.display='block'
			}else{
				if(ow!=w){var n=ow+((w-ow)*.5); e.style.width=wd?Math.ceil(n)+'px':Math.floor(n)+'px'}
				if(oh!=h){var n=oh+((h-oh)*.5); e.style.height=hd?Math.ceil(n)+'px':Math.floor(n)+'px'}
				this.pos()
			}
		}
	}
}();

TINY.page=function(){
	return{
		top:function(){return document.documentElement.scrollTop||document.body.scrollTop},
		width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},
		height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},
		total:function(d){
			var b=document.body, e=document.documentElement;
			return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):
			Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
		}
	}
}();

redrawLinks();
