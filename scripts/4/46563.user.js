// ==UserScript==
// @name           mixi apri navi
// @namespace      http://d.hatena.ne.jp/hatecha/
// @description    add Navi-links in mixi application view page
// @include        http://*mixi.jp/*appli*
// ==/UserScript==

(function (){

	var Anchor = document.getElementById('bodyMainArea') || document.getElementById('oldContents');

	location.href.match(/view_appli\.pl\?id=(.*)/)
	id=parseInt(RegExp.$1)

	i0=Math.max(id-50, 0)
	str='<div class="pageNavigation01 top"><div class="pageList01"><div>'
	str+=addtop(id,1,200)
	for(c=0; c<5; c++){
		str+=add(id,i0+c*20,20)
	}
	str+='</div></div></div>'

	Anchor.innerHTML=str+Anchor.innerHTML

})()


function add(id,i0,step)
{
	str=""
	str+='[<ul>'
	for(i=i0; i<i0+step; i++){
		if(i!=id) {
			str += '<li><a href="view_appli.pl?id='+i+'">'+i+'</a></li>';
		}
		else
		{
			str += '<li class="on">'+i+'</li>'
		}
	}
	str+='</ul>]'
	return str
}

function addtop(id,i0,step)
{
	str=""
	str+='[<ul>'
	for(i=i0; i<i0+step*10; i+=step){
		if(i!=id) {
			str += '<li><a href="view_appli.pl?id='+i+'">'+i+'</a></li>';
		}
		else
		{
			str += '<li class="on">'+i+'</li>'
		}
	}
	str+='</ul>]'
	return str
}