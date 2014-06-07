// ==UserScript==
// @name           wykop scroll
// @namespace      wykopscroll
// @description    skacze do nowych komentarzy
// @include        http://www.wykop.pl/link/*
// ==/UserScript==


function scrol(dir){
	//var pos=GM_getValue('pos');
	if(dir=='next'){
		if(pos<(x.length-1)){
		 pos++;
		 window.scrollTo(0,(x[pos].offsetParent.offsetTop-40));
		 document.getElementById('com-pos').innerHTML=(pos+1);
		 //GM_setValue('pos',pos);
		}
		else
		{
			window.scrollTo(0,(x[pos].offsetParent.offsetTop-40));
		}
	}
	else{
		if(pos>0){
		 pos--;
		 window.scrollTo(0,(x[pos].offsetParent.offsetTop-40));
		 document.getElementById('com-pos').innerHTML=(pos+1);
		 //GM_setValue('pos',pos);
		}
		else
		{
			window.scrollTo(0,(x[pos].offsetParent.offsetTop-40));
		}
	}
}


var pos=-1;
//GM_setValue('pos',-1);
var x=document.getElementsByClassName('bgfbfbd3');
if(x.length>0){
var counter = document.createElement('div');
counter.innerHTML='<a id="com-prev" href="javascript:void(0)">&lt;</a> <span style="color: black" id="com-pos">0</span>/'+x.length+' <a id="com-next" href="javascript:void(0)">&gt;</a>';
counter.style.position='fixed';
counter.style.top='10px';
counter.style.left='10px';
counter.style.background='white';
counter.style.opacity='0.7';
counter.style.zIndex='5';


document.getElementsByTagName('body')[0].appendChild(counter);
document.getElementById('com-prev').addEventListener('click',function(){scrol('prev')},false);
document.getElementById('com-next').addEventListener('click',function(){scrol('next')},false);
}