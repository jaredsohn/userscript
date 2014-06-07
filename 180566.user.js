// ==UserScript==
// @name       ∀ssistant
// @namespace  
// @version    0.5
// @description  zoom image & submitshortcut
// @match      http://h.acfun.tv/*
// @require     
// @copyright  2013, You
// ==/UserScript==

var allimg,thisimg,src,newsrc,i;
var srclist = [],newsrclist = [];
var reg = /(.*\/)Th(.*)/;

allimg = document.getElementsByTagName("img");

for (i = 0;i < allimg.length;++i)
{
	thisimg = allimg[i];
	src = thisimg.src;
	srclist[i] = src;
	newsrclist[i] = src.replace(reg,'$1Images$2');
	thisimg.id = i;
	if(reg.test(src))
	{
		thisimg.onmouseover = (function (){return function (){this.src = newsrclist[this.id];this.style.width = "80%";};})();
		thisimg.onmouseout = (function (){return function (){this.src = srclist[this.id];this.style.width = "";};})();
	}
}

var input = document.getElementsByTagName('input');
for(i=0;i<input.length;i++){
	var that = input[i];
	if('送　出' == that.value)break;
}

function submit(e){
    console.log(e,that);
    //console.log(document.activeElement,e.ctrlKey,e.keyCode == '13');
    if('content' == document.activeElement.id && e.ctrlKey && e.keyCode == '13'){
    	that.click();
    }
}

document.getElementById('imgFlag').checked = '';
window.addEventListener('keydown',submit,false);