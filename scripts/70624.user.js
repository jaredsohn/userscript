// ==UserScript==
// @name           adv_removal
// @namespace      http://www.ex.ua/
// @description    script delete one advertisment element thus site page width becoming smaller, it's annoying on small resolutions
// @include        http://www.ex.ua/*
// @author		   fatalfury aka .bs
// @version		   0.3.3
// ==/UserScript==

console = unsafeWindow.console;
var debug = false;
if(!debug || console == 'undefined'){
	console = new Object();
	console.log = function(){}
}

var el = document.getElementsByClassName('include_0');
if(!el)	el = document.getElementsByClassName('list');
 try{
	var listWidth = GM_getValue('_bs_listWidth','0');
	if(parseInt(listWidth)){
		el[0].style.width = listWidth+'px';
	}
var col = el[0].parentNode.nextElementSibling;
if(col != null && col != 'undefined')
{
	col.innerHTML='';
	col.style.width=0;
}
}catch(e){console.log(e)}

el = document.getElementById('ad_window');
if(el){
	el.innerHTML = '';
}

function _advrem_call(){
	var q = window.prompt('type list width in pixels(now is:'+GM_getValue('_bs_listWidth','0')+')'),
	listWidth;
	if(q){
		listWidth = q.match(/^(\d+)(?:\s?px)?$/i);
		if(listWidth[1]){		
			GM_setValue('_bs_listWidth',listWidth[1]);
		}else{
			alert('Please input just a _number_ like (1000 or 1000px)');
		}
	}
}

GM_registerMenuCommand('set list width',_advrem_call,'l','shift','l');
