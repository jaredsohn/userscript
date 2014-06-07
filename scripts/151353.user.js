// ==UserScript==
// @name         Google Search Result Tidy
// @namespace     http://blog.meituo.net/projects/greasemonkey/
// @description   去除google 搜索结果中的google统计，直接打开链接，Get ride of GFW's fuck,确保搜到的结果不是因为google 遭屏蔽而无法打开。
// @include  https://www.google.com.hk/*
// @include  http://www.google.com.hk/*
// @include  http://www.google.co.uk/*
// @include  https://www.google.co.uk/*
// ==/UserScript==

(function(){
	var reg = new RegExp('url=(.+?)&ei=','g');
	var dealedStr = 'dealed-sign';
	//在范围以内
	function getHref(a){
		var newhref;
			reg.exec(a);
		if(a.indexOf('http') == 0 && a.indexOf('http://www.google') != 0 ){
			newhref= a;
		}else if(RegExp.$1){
			newhref = decodeURIComponent(RegExp.$1);
		}else{
			newhref = a.match(/\/url\?q=(.*)+/);
		}
		reg.lastIndex = 0;
		return newhref;
	}
	function findA(el,self){
		var par = el;
		do{
			if(par && par.tagName.toLowerCase() === 'a'){
				break;
			}
			par = par.parentNode;
		}while(par && par != document && par != self)

		return par;
	}
	function changeA(el){
		var newhref = getHref(el.getAttribute('href'));
		console.log(newhref);
		var newa = document.createElement('a');
		newa.href = newhref;
		newa.innerHTML = el.innerHTML;
		newa.setAttribute('target','_blank');
		el.parentNode.appendChild(newa);
		el.parentNode.removeChild(el);
		return newhref;
	}

	//绑定点击事件
	function bindEvent(){
		document.addEventListener('click',function(e){
			e = e || window.event;
			var el = e.target || e.srcElement;
			var newWin = true;	
			if(el.tagName.toLowerCase() !== 'a'){
				el = findA(el,this);
				if(!el.getAttribute || !el.getAttribute('href')){
					return;
				}
			}
			//有类名l,只处理此类链接
			if(/(^|\b)l(\b|$)/.test(el.className)){
				e.preventDefault();

				var	url = changeA(el);

				if(newWin){
					window.open(url);
				}
			}
		},false);
	}

	bindEvent();
})();
