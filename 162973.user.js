// ==UserScript==
// @name		e[-x]hentai.org Helper
// @namespace	Crazycatz00
// @description	Auto transfer "fjords" galleries; Inter-site links
// @copyright	2013 Crazycatz
// @icon		http://e-hentai.org/favicon.ico
// @match		*://*.e-hentai.org/*
// @match		*://exhentai.org/*
// @version		2.0.0
// @grant		GM_xmlhttpRequest
// ==/UserScript==
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, evil:true*/
/*global GM_xmlhttpRequest, alert, unsafeWindow*/
(function(uwindow){'use strict';
	var _MakE=function(t,a,p,s){
			var e=document.createElement(t);
			for(t in a){if(a.hasOwnProperty(t)){e[t]=a[t];}}
			if(typeof s==='string'){e.style.cssText=s;}
			return typeof p!=='undefined'&&typeof p.appendChild==='function'?p.appendChild(e):e;
		};
	var ehentai=function(){
		/*Add Ex link*/
		var e=document.getElementById('nb1');
		if(e!==null){
			e.style.display='inline-block';e.style.width='auto';
			if((e=document.getElementById('nb3'))!==null){
				e.style.width='auto';
				if((e=Array.filter(e.getElementsByTagName('a'),function(e){return e.href.indexOf('g.e-hentai.org')!==-1;})).length!==0){
					e=(e=e[0].parentNode).parentNode.insertBefore(document.createElement('div'),e.nextSibling);e.style.cssFloat='left';
					_MakE('img',{alt:'ExHentai Galleries',/*src:'http://ehgt.org/c/nb/ga.png',*/src:'data:image/png;base64,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'},_MakE('a',{href:window.location.protocol+'//exhentai.org/'},e));
				}
			}
		}
	},
	gehentai=function(){
		var e;
		/*Redirect fjords*/
		if(document.title.indexOf('Gallery Not Available')!==-1){
			uwindow.gotonext=function(){};window.stop();
			window.location.replace(window.location.protocol+'//exhentai.org'+window.location.pathname+'?fjords');
			return;
		}
		/*Add Ex link*/
		if((e=document.getElementById('nb'))!==null){
			_MakE('img',{src:'http://ehgt.org/g/mr.gif'},e);
			e.appendChild(document.createTextNode(' '));
			_MakE('a',{href:window.location.protocol+'//exhentai.org'+window.location.pathname,textContent:'ExHentai'},e);
		}
	},
	exhentai=function(){
		var e;
		if((e=document.body.getElementsByTagName('img')).length===1&&e[0].src===window.location.href){exhentaiLogin();return;}
		/*Add GE link if not in fjords*/
		if(window.location.search.search(/[?&]fjords([&=]|$)/)===-1){
			if((e=document.getElementById('nb'))!==null){
				_MakE('img',{src:'http://st.exhentai.net/img/mr.gif'},e);
				e.appendChild(document.createTextNode(' '));
				_MakE('a',{href:window.location.protocol+'//g.e-hentai.org'+window.location.pathname,textContent:'E-Hentai'},e);
			}
		}
	},
	exhentaiLogin=function(){
		var pa=_MakE('div',{},document.body,'text-align:center'),
			un=_MakE('input',{type:'text',maxLength:255,autofocus:true,placeholder:'Username'},pa),
			ps=_MakE('input',{type:'password',maxLength:255,placeholder:'Password'},pa),
			sb=_MakE('input',{type:'button',value:'Login'},pa),
			submiting=false,
			submit=function(){if(submiting){return;}
				sb.disabled=submiting=true;
				var err=function(r){alert('An error occured trying to log you in!\n'+r.toString());submiting=sb.disabled=false;},u=un.value,p=ps.value;
				if(u.length===0||p.length===0){err('Please enter your username and password!');return;}
				GM_xmlhttpRequest({
					timeout:30000,onerror:err,ontimeout:err.bind(null,'Timeout!'),
					method:'POST',url:'https://forums.e-hentai.org/index.php?act=Login&CODE=01',headers:{'Content-Type':'application/x-www-form-urlencoded'},
					data:'CookieDate=1&UserName='+encodeURIComponent(u)+'&PassWord='+encodeURIComponent(p),
					onload:function(r){
						try{
							var i,p;
							if(r.responseHeaders.search(/ipb_member_id\s*=\s*([^;]+);/)!==-1){i=RegExp.$1;}
							if(r.responseHeaders.search(/ipb_pass_hash\s*=\s*([^;]+);/)!==-1){p=RegExp.$1;}
							if(typeof i==='string'&&typeof p==='string'){
								r=new Date();r.setYear(r.getFullYear()+1);r=';expires='+r.toGMTString();
								document.cookie='ipb_member_id='+i+r;
								document.cookie='ipb_pass_hash='+p+r;
								window.location.reload(true);
							}else{
								err(r.responseText.search(/<span class="postcolor">((?:(?!<\/span).)+)/)!==-1?RegExp.$1.replace(/<br\s*\/?>/i,'\n'):'Please make sure your details are correct!');
							}
						}catch(e){err(e);}
					}
				});
			},
			sOnEnter=function(e){if(e.which===13&&!submiting){submit();}};
		sb.addEventListener('click',submit,false);un.addEventListener('keydown',sOnEnter,false);ps.addEventListener('keydown',sOnEnter,false);
	};
	switch(window.location.host){
		case 'e-hentai.org':ehentai();break;
		case 'g.e-hentai.org':gehentai();break;
		case 'exhentai.org':exhentai();break;
	}
}(unsafeWindow));