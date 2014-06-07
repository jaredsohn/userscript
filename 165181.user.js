// ==UserScript==
// @name        百度贴吧帖子楼层
// @namespace   http://tieba.baidu.com/f?kw=chrome
// @description 跳转至指定楼层
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/f?kz=*
// @grant       GM_addStyle
// @version     2.2
// ==/UserScript==
var a=function(a1){
		return a1.querySelectorAll('div.l_post')
	},
	b=function(a1){
		return Array.prototype.map.call(a1,function(a2){
			return JSON.parse(a2.getAttribute('data-field')).content.floor
		})
	},
	c=function(a1){
		return Array.prototype.map.call(a1,function(a2){
			return '#'+a2.querySelector('a.l_post_anchor').name
		})
	},
	d=function(a1,b1){
		return a1.indexOf(b1)
	},
	e=document.createElement('style'),
	f=function(a1){
		e.innerHTML='#j_p_postlist>:nth-child('+a1+') div.p_content{font-weight:900}'
	},
	g=function(a1,b1,c1,d1){
		var aa=a(a1),
			ba=d(b(aa),b1);
		window.location.href=c1+c(aa)[ba];
		if (d1)
			f(ba+1)
	},
	h=document.querySelector('span.red'),
	i=function(a1){
		return a1.querySelector('span.tP')
	},
	j=function(a1){
		var aa=+h.innerHTML;
		return a1<=0?1:a1>aa?aa:a1
	},
	k=function(){
		var aa=window.location.hash,
			ba=a(document),
			ca=d(c(ba),aa);
		if (aa && ca!=-1)
			f(ca+1)
	},
	l=true,
	m=navigator.userAgent.indexOf('Chrome')!=-1?'':'#input1a{border-radius:9px 0 0 9px}#button1a{border-radius:0 9px 9px 0}',
	n=function(a1,b1,c1){
		var aa1=function(aA1,bA1){
			return aA1-bA1
			},
			ba1
		a1.push(b1);
		a1.sort(aa1);
		ba1=d(a1,b1);
		return c1==1?a1[ba1-1]:a1[ba1+1]
	};
document.head.appendChild(e);
document.body.insertAdjacentHTML('beforeend','<div id="div1a" style="position:fixed;top:50%;right:5px;z-index:10000;display:none"><input id="input1a" type="text" title="输入楼层数字" placeholder="输入楼层数字" style="width:9em;border-style:solid;border-width:1px 0 1px 1px;border-color:rgba(0,0,0,.7) transparent rgba(0,0,0,.3) rgba(0,0,0,.7);font-size:16px"/><button id="button1a" type="button" value="确定" style="width:3.2em;border-style:solid;border-width:1px 1px 1px 0;border-color:rgba(255,255,255,.3) rgba(255,255,255,.7) rgba(255,255,255,.7) transparent;color:rgb(255,255,255);font-size:16px;cursor:pointer">确定</button></div><table id="table1a" style="position:fixed;bottom:52%;right:5px;z-index:10000;width:auto;height:auto;border:solid 1px rgba(255,255,255,0.9);border-radius:13px;background-color:rgba(0,0,0,0.9);color:rgba(255,255,255,0.9);font-size:16px;display:none"><tr><td></td></tr></table>');
GM_addStyle('.div1a,.table1a{display:block !important}.table1a1a{border:solid 1px rgba(0,0,0,0.9)!important;background-color:rgba(255,255,255,0.9)!important;color:rgba(0,0,0,0.9)!important}#input1a{background-color:rgb(255,255,255)}#input1a:hover{background-color:rgb(235,235,235)}#input1a:focus{background-color:rgb(192,192,192)}#button1a{background-color:rgb(0,0,0)}#button1a:hover{background-color:rgb(40,40,40)}#button1a:active{background-color:rgb(128,128,128)}'+m);
k();
var div1a=document.querySelector('#div1a'),
	input1a=document.querySelector('#input1a'),
	button1a=document.querySelector('#button1a'),
	table1a=document.querySelector('#table1a');
button1a.addEventListener('click',function(){
	var aa=+input1a.value,
		ba=aa<=0 || isNaN(aa)?1:aa,
		ca=window.location.hostname,
		da=window.location.pathname,
		ea=window.location.search,
		fa=h.innerHTML==1?1:i(document).innerHTML,
		ga=function(a1){
			var aA,
				bA;
			if (da=='/f'){
				bA=ea.split('=');
				aA='http://'+ca+'/p/'+bA[bA.length-1]
			}
			else if (/\?(pid|pn)=.*/.test(ea))
				aA='http://'+ca+da;
			if (aA && a1)
				return aA+'?pn='+fa;
			else 
				return aA || 'http://'+ca+da
		},
		ha=b(a(document)),
		ia=true,
		ja=function(){
			if (table1a.classList.contains('table1a'))
				table1a.classList.remove('table1a')
		};
	if (d(ha,ba)!=-1)
		g(document,ba,ga(true),true);
	else if ((h.innerHTML==1||i(document).innerHTML==h.innerHTML)&&ba>ha[ha.length-1])
		alert('此帖不存在(或已被删除)');
	else if(ba>ha[0] && ba<ha[ha.length-1])
		alert('此帖已被删除');
	else {
		var aA=ba<ha[0]?ba-ha[0]:ba-ha[ha.length-1],
			bA=aA/Math.abs(aA),
			cA=Math.floor((aA-bA)/30)+bA,
			dA=j((+i(document).innerHTML+bA)),
			eA=j((+i(document).innerHTML+cA)),
			fA=ga(),
			gA=dA,
			hA;
		function xhr(url){
			var iA=new XMLHttpRequest();
			iA.onload=function(){
				var A=a(this.responseXML),
					B=b(A),
					C=i(this.responseXML),
					D=+C.innerHTML-bA,
					E=bA==1?ba<B[0]?B[0]:B[B.length-1]:ba>B[B.length-1]?B[B.length-1]:B[0],
					F=bA==-1?ba-B[B.length-1]:ba-B[0],
					G=Math.floor((F+bA)/30)-bA,
					H=+C.innerHTML+G,
					I=bA==-1?Math.min(H,gA):Math.max(gA,H);
				if (d(B,ba)==-1){
					if(C.innerHTML==h.innerHTML&&ba>B[B.length-1]){
						J=confirm('此帖不存在(或已被删除)\n已到达末页尾楼 '+C.innerHTML+'页 '+B[B.length-1]+'楼 ，是否转到此楼？');
						if(J==true)
							g(this.responseXML,B[B.length-1],fA+'?pn='+C.innerHTML);
						ja()
					}
					else if ((bA==1 && ba>B[0]) || (bA==-1 && ba<B[B.length-1])){
						(bA==1&&ba<B[B.length-1])||(bA==-1&&ba>B[0])?(J=confirm('此帖已被删除，是否转到邻近楼层？'),J==true&&g(this.responseXML,n(B,ba,bA),fA+'?pn='+C.innerHTML)):hA==1?(J=confirm('此帖已被删除，是否转到邻近楼层？'),J==true&&g(this.responseXML,n(B,ba,bA),fA+'?pn='+C.innerHTML)):(J=confirm('此帖已被翻过(或已被删除)\n于 '+C.innerHTML+'页 '+E+'楼 终止检索，是否转到此楼？'),J==true&&g(this.responseXML,E,fA+'?pn='+C.innerHTML));
						ja()
					}
					else if (C.innerHTML==gA){
						J=confirm('此帖已被删除\n已到达检索终点 '+gA+'页 '+E+'楼，是否转到此楼？');
						if(J==true)
							g(this.responseXML,E,fA+'?pn='+C.innerHTML);
						ja()
					}
					else {
						if (!table1a.classList.contains('table1a'))
							table1a.classList.add('table1a');
						table1a.querySelector('td').innerHTML='正在检索 '+C.innerHTML+' 页，最接近楼层为 '+E+' 楼';
						if (!l){
							J=prompt('当前页面为 '+C.innerHTML+' 页，最接近楼层为 '+E+' 楼\n请输入想要翻过的页数，预计最大页数值',Math.abs(I-C.innerHTML));
							if (J==null){
								ja();
								ia=false
							}
							else {
								var K=(Math.abs(parseInt(J))?Math.abs(parseInt(J)):1)*bA;
								D=+C.innerHTML-K;
								if ((bA==1 && D<I) || (bA==-1 && D>I))
									D=I
							}
							l=true
						}
						if (ia){
							gA=I;
                            hA=Math.abs(+C.innerHTML-D);							
							xhr(fA+'?pn='+D)
						}
					}
				}
				else {
					table1a.classList.add('table1a1a');
					table1a.querySelector('td').innerHTML='已找到目标楼层，即将跳转...';
					g(this.responseXML,ba,fA+'?pn='+C.innerHTML)
				}
			}
			iA.open('GET',url);
			iA.responseType='document';
			iA.send()
		}
		xhr(fA+'?pn='+eA)
	}
	input1a.value='';
	input1a.blur();
	div1a.classList.remove('div1a')
},false);
document.addEventListener('keydown',function(e){
	if (e.target.tagName.toLowerCase()!='input' && !e.target.isContentEditable){
		if (e.keyCode==13){
				div1a.classList.toggle('div1a');
				if (div1a.classList.contains('div1a'))
					input1a.focus()
		}
		else if (e.keyCode==27&&table1a.classList.contains('table1a'))
			if (l==true)
				l=false
	}
	else if(e.target==input1a&&e.keyCode==13)
		button1a.click()
},false)