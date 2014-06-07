// ==UserScript==
// @name        备份DIV#TEXTAREA#INPUT
// @description 只保存编辑状态下的内容; 还原:Ctrl+Alt
// @namespace   yuxingyc
// @include     http*
// @downloadURL https://userscripts.org/scripts/source/174286.user.js
// @updateURL https://userscripts.org/scripts/source/174286.meta.js 
// @version     1.0
// ==/UserScript==

//手动备份Shift+Alt: ; Ctrl+Alt:还原; 

(function(){
var hostname=location.hostname;
var t=true,ku=true,m=false,n=-1,el, xxdata,tmp,color;
var isClear=[true,true,true],firstClick=[true,true,true];
var timer;
var clock=3000;//暂停打字XX毫秒后自动保存
function autoSave()
{
	if(timer)clearTimeout(timer);
	timer=setTimeout(function(){n==2?gmsave(el.innerHTML):gmsave(el.value)},clock);
}
function add(){	
	tmp=GM_getValue(hostname+el.tagName,"");	
	if(n==-1)return;
	autoSave(n);
	if(firstClick[n]){change();change();firstClick[n]=false;}	
	el.onkeyup=function(){ku=true;autoSave();}
	el.onkeydown=function(e)
	{//Ctrl+Alt:还原;
		if(e.ctrlKey&&e.altKey)change();
	//Shift+Alt:备份
		else if(e.shiftKey&&e.altKey){n==2?gmsave(el.innerHTML):gmsave(el.value);}
	}
}
function change()
{
	if(n==2)
	{
		if(isClear[n]){xxdata=el.innerHTML;el.innerHTML=gmsave(tmp);isClear[n]=false}
		else {tmp=el.innerHTML;el.innerHTML=gmsave(xxdata);isClear[n]=true}
	}
	else
	{
		if(isClear[n]){xxdata=el.value;el.value=gmsave(tmp);isClear[n]=false}
		else {tmp=el.value;el.value=gmsave(xxdata);isClear[n]=true}
	}	
}
document.body.onmouseup=function(e){
	m=false;
	var p=window.event||e;
	el = p.srcElement ||  p.target;
	if(el.tagName=="TEXTAREA"){n=0;add(el);return;}
	if(el.tagName=="INPUT"&&el.type=="text"){n=1;add(el);return;}
	if(el.tagName=="DIV"&&el.contentEditable=="true"){n=2;add(el);return;}
	n=-1;
}
function gmsave(str)
{
	if(!t)return str;	
	if(ku){color=el.style.background;GM_setValue(hostname+el.tagName,str);ku=false;}	
	el.style.background='rgb(246, 246, 246)';
	setTimeout(function(){el.style.background=color;t=true},100);
	t=false;
	return str;
}
})();
