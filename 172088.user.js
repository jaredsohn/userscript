// ==UserScript==
// @name        显示贴吧发帖时间
// @namespace   http://tieba.baidu.com/f?kw=chrome
// @description 鼠标放置在帖子链接上即可读取
// @include     http://tieba.baidu.com/f*kw=*
// @version     1.1
// @grant       GM_addStyle
// ==/UserScript==
var pnem='show_posttime',
	link=document.querySelectorAll('a.j_th_tit'),
	pe=/Chrome/.test(navigator.userAgent)?document.body:document.documentElement,
	dts=1000*60*60*24,
	wl=dts*7,
	ml=dts*30,
	yl=dts*365;
GM_addStyle('[id^='+pnem+']{color:rgba(255,0,0,0.9);font-size:10px;position:absolute;background-color:rgba(255,255,255,0.9);margin-left:3px}.wl{color:rgb(255,0,255)}.ml{color:rgb(0,0,255)}.yl{color:rgb(0,0,0)}.opaem{opacity:0}');
function pn(x,y){
	if(document.getElementById(pnem+y))
		return;
	var xhr=new XMLHttpRequest();
	xhr.onload=function(){
		var a=this.responseXML.querySelector('div.l_post.noborder'),
			dt=JSON.parse(a.dataset.field),
			tiedt=dt.content.date,
			timenow=new Date().getTime(),
			timepost=tiedt.split(' '),
			timepart1=timepost[0].trim().split('-'),
			timepart2=timepost[1].trim().split(':'),
			posttime=new Date(+timepart1[0],+(timepart1[1]-1),+timepart1[2],+timepart2[0],+timepart2[1]).getTime(),
			timepassed=timenow-posttime,
			em=document.createElement('em'),
			rect;
		em.id=pnem+y;
		em.className=(timepassed>=yl)?'yl':(timepassed>=ml)?'ml':(timepassed>=wl)?'wl':'';
		em.innerHTML='&nbsp;&nbsp;'+tiedt;
		rect=x.getBoundingClientRect();
		em.style.left=rect.left+x.offsetWidth+'px';
		em.style.top=rect.top+pe.scrollTop+'px';
		document.body.appendChild(em);
	}
	xhr.open('GET',x.href);
	xhr.responseType='document';
	xhr.send();
}
Array.prototype.forEach.call(link,function(a,b){
	a.addEventListener('mouseover',function(){
		pn(this,b);
	},false);
});
var observer= new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
		var n=mutation.addedNodes;
		if(n)
			Array.prototype.forEach.call(n,function(a){
				if(a.id.indexOf(pnem)!=-1){
					a.title='点击切换隐藏/显示';
					a.addEventListener('click',function(){
						this.classList.toggle('opaem');
					},false);
				}
			});
	});
});
observer.observe(document.body,{childList:true,subtree:true});