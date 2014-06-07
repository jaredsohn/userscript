// ==UserScript==
// @name           smoothScrollTopBottom
// @author         NLF
// @description    平滑的滚动到页面的顶部/底部（support （opera，firefox（GreaseMonkey），chrome） Latest Stable）
// @version        1.0.0.6
// @created        2012-12-17
// @lastUpdated    2012-12-21
// @grant          none
// @run-at         document-start
// @namespace      http://userscripts.org/users/NLF
// @homepage       http://userscripts.org/scripts/show/154323
// @downloadURL    https://userscripts.org/scripts/source/154323.user.js
// @updateURL      https://userscripts.org/scripts/source/154323.meta.js
// @include *
// @match *://*/*
// ==/UserScript==


/* 
用鼠标手势或者其他能执行脚本的扩展，执行下列命令
滚动到顶部命令：
((window.gBrowser && window.gBrowser.contentWindow) || window).postMessage('__scrollTo_Top.Bottom__top','*');
滚动到底部命令：
((window.gBrowser && window.gBrowser.contentWindow) || window).postMessage('__scrollTo_Top.Bottom__bottom','*'); 
*/

(function(){
	'use strict';

	//只在顶层窗口加载。
	if(window!==window.top)return;

	function init(dest,container){

		//设置
		var prefs={
			//启动缓冲
			begin:{
				enabled:true,//是否启用
				bufferDis:120,//缓冲距离
				duration:6,//过渡步骤数
			},
			//结束缓冲
			end:{
				enabled:true,
				bufferDis:280,
				duration:16,
			},
		};

		var scrollUp;

		if(typeof dest=='number'){
			scrollUp=getScrolled() - dest >= 0 ;
		}else if(dest==='top'){
			scrollUp=true;
			dest=0;
		}else if(dest==='bottom'){
			scrollUp=false;
			dest=9999999;
		};


		if(typeof scrollUp=='undefined')return;

		var deAttr='__stopScroll_Top.Bottom__';
		var id= deAttr + scrollUp;
		var de=document.documentElement;
		var body=document.body;
		var backCompat=document.compatMode=='BackCompat';

		//如果已经在进行同向滚动。。
		if(de.hasAttribute(id)){
			return;
		};

		//动画算法
		//cubic
		function easeOut(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		};

		function easeIn(t,b,c,d){
			 return c*(t/=d)*t*t*t + b;
		};

		//获取已滚距离
		function getScrolled(){
			if(container){
				return container.scrollTop;
			}else{
				return window.scrollY;
			};
		};

		//滚动到
		function scrollTo(y){
			if(container){
				container.scrollTop=y;
			}else{
				wScroll(window.scrollX,y);
			};
		};


		function stop(e){
			//console.log(e);
			if(e && e.type=='message'){
				var data=e.data;
				if(typeof data!='string' || data.indexOf(deAttr)!=0 || data==id){
					return;
				};
			};
			window.removeEventListener(wheelEvent,stop,true);
			window.removeEventListener('message',stop,true);
			de.removeAttribute(id);
			clearInterval(timer);
		};

		var innerHeight;
		if(container){
			innerHeight=container.clientHeight;
		}else{
			if(backCompat){
				if(body){
					innerHeight=body.clientHeight
				}else{
					innerHeight=window.innerHeight;
				};
			}else{
				innerHeight=de.clientHeight;
			};
		};


		var scrollHeight;
		if(container){
			scrollHeight=container.scrollHeight;
		}else{
			if(backCompat){
				if(body){
					scrollHeight=body.scrollHeight;
				}else{//DOMContentLoaded还未发生，访问不到body元素
					if(typeof window.scrollMaxY=='number'){//firefox
						scrollHeight=innerHeight + window.scrollMaxY;
					}else{//这个获取并不一定正确，但是在body和html未明确设置高度的情况下是可行的。
						scrollHeight=Math.max(de.scrollHeight,innerHeight);
					};
				};
			}else{
				scrollHeight=de.scrollHeight
			};
		};


		var scrollAble=scrollHeight - innerHeight;

		//没有出现滚动条
		if(scrollAble<=0)return;

		//修正dest
		dest=Math.max(0,dest);
		dest=Math.min(dest,scrollAble);

		//已经达成
		if(getScrolled()==dest){
			//alert('已经达成');
			return;
		};

 
		//先停止已经在进行的相反方向的滚动
		window.postMessage(id,'*');

		var timer;

		function begin(){
			if(!prefs.begin.enabled){
				end();
				return;
			};

			//缓冲开始点
			var scrollY=getScrolled();
			var start=scrollY;

			var maxChangeAble=scrollUp? (scrollY - dest) : (dest - scrollY);
			//预留结束的缓动空间，如果需要的话。
			maxChangeAble -= (prefs.end.enabled? prefs.end.bufferDis : 0);
			if(maxChangeAble <=0 ){
				end();
				return;
			};

			var change=Math.min(prefs.begin.bufferDis,maxChangeAble);
			if(scrollUp){
				change=-change;
			};

			var current=0;
			var duration=prefs.begin.duration;
			timer=setInterval(function(){
				var y=easeIn(current,start,change,duration);
				//console.log('begin',y);
				scrollTo(y);
				if(current>=duration){
					clearInterval(timer);
					end();
				};
				current++;
			},17);
		};


		function end(){
			if(!prefs.end.enabled){
				scrollTo(dest);
				stop();
				return;
			};

			//缓冲开始点
			var scrollY=getScrolled();
			var start=scrollUp? Math.min(scrollY,dest + prefs.end.bufferDis) : Math.max(dest - prefs.end.bufferDis,scrollY);

			var change=dest - start;
			var current=0;
			var duration=prefs.end.duration;
			timer=setInterval(function(){
				var y=easeOut(current,start,change,duration);
				//console.log('end',y);
				scrollTo(y);
				if(current>=duration){
					stop();
				};
				current++;
			},17);
		};

		de.setAttribute(id,1);//表示缓动进行中


		//停止监听
		window.addEventListener(wheelEvent,stop,true);
		window.addEventListener('message',stop,true);

		begin();
	};


	//特殊的网站，非全局滚动条的网站。
	var special=[
		{name:'google-reader阅读器',
			url:/https?:\/\/[^\/.]+\.google(?:[.\w]+)+\/reader\/view\//i,
			getContainer:function(){
				var sectionsHolder=document.getElementById('sections-holder');
				if(sectionsHolder){
					return sectionsHolder;
				}else{
					var vEC=document.getElementById('viewer-entries-container');
					if(vEC){
						return vEC;
					};
				};
			},
		},
	];


	//支持事件检测
	function eventSupported( eventName,elem ){
		elem = elem || document.createElement("div");
		eventName = "on" + eventName;
		var isSupported = (eventName in elem);
		if (!isSupported && elem.setAttribute) {//setAttribute是元素节点的方法
			elem.setAttribute(eventName, "return;");
			isSupported = typeof elem[eventName] == "function";
		};
		return isSupported;
	};

	//保存下scroll的引用，某些网站，居然去改掉这个原始方法。。我。。
	var wScroll=window.scroll.bind(window);

	var rule;
	var wheelEvent;
	//只执行一次的函数
	function runOnce(){
		wheelEvent='DOMMouseScroll';
		if(eventSupported('wheel',document)){//w3c标准滚轮事件
			wheelEvent='wheel';
		}else if(eventSupported('mousewheel',document)){
			wheelEvent='mousewheel';
		};

		var s_i;
		var i=0;
		var gUrl=location.href;

		while(s_i=special[i++]){
			if(s_i.url.test(gUrl)){
				rule=s_i;
				break;
			};
		};

		runOnce=null;
	};

	function getContainer(){
		if(runOnce){
			runOnce();
		};

		if(!rule)return;
		return rule.getContainer();
	};


	//触发监听
	window.addEventListener('message',function(e){
		var data=e.data;
		if(typeof data!='string')return;
		switch(data){
			case '__scrollTo_Top.Bottom__top':{
				init('top',getContainer());
			}break;
			case '__scrollTo_Top.Bottom__bottom':{
				init('bottom',getContainer());
			}break;
		};
	},true);

	return init;
})();
