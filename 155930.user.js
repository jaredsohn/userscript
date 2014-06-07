// ==UserScript==
// @name		HTML编辑器
// @namespace		http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include		http://tieba.baidu.com/*
// @updateURL		https://userscripts.org/scripts/source/155930.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155930.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		雨滴在心头
// @version		1.01
// ==/UserScript==
var bt=document.createElement('input');
bt.setAttribute('type','button');
bt.setAttribute('class','subbtn_bg');
bt.setAttribute('value','转html');
document.querySelector('.pt_submit').appendChild(bt);
bt.addEventListener('click',function(){toggle()},false);
var t=1;var be=''
function toggle()
{	
	var tb=document.querySelector('td .tb-editor-editarea').innerHTML;
	if(t>0)
	{be=tb;
		document.querySelector('td .tb-editor-editarea').innerHTML=tb.replace(/&lt;/g,'<').replace(/&gt;/g,'>');t=0;bt.value='转text';
	}
	else
	{	
		document.querySelector('td .tb-editor-editarea').innerHTML=be;
		bt.value='转html';
		t=1;
	}
}
