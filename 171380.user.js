// ==UserScript==
// @name        Imgur Vote Fairy
// @namespace   http://userscripts.org/users/62850
// @include     http://imgur.com/*
// @description With this you can double click the image vote buttons on the page to up/down vote the page. It also adds vote buttons to user comment pages.
// @version     1
// ==/UserScript==

function findEle(target,i){
	target=document.evaluate(target, document, null, i, null);
	if(i==9)
		return target.singleNodeValue;
	else
		return target;
}
function getEle(id){
	return document.getElementById(id);
}
function sendEvt(element,event){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(event, true, true );
	return !element.dispatchEvent(evt);
}
function vote(x){
	var e=findEle(".//div[@class='arrows']/div[@class='arrow "+(x==1?'up':'down')+" ']",6);
	if(e.snapshotLength==0)
		e=findEle(".//div[@class='arrows']/div[@class='arrow "+(x==1?'up':'down')+"']",6);
	if(e.snapshotLength==0)
		e=findEle(".//div[@class='arrows']/div[@class='arrow "+(x==1?'up':'down')+" pushed']",6);
	for(var i=e.snapshotLength-1;i>-1;i--)
		sendEvt(e.snapshotItem(i),'click');
	e=findEle(".//div[@id='fairy-arrows']/span[@class='arrow "+(x!=1?'up':'down')+" pressed']",9);
	if(e)
		e.className="arrow "+(x!=1?'up':'down');
	
}
if(document.location.href.indexOf('/gallery/')>-1){
	getEle('mainUpArrow').addEventListener('dblclick',function(){vote(1);sendEvt(this,'click');},false);
	getEle('mainDownArrow').addEventListener('dblclick',function(){vote(0);sendEvt(this,'click');},false);
}
else if(document.location.href.indexOf('/user/')>-1){
	GM_addStyle(
		'#captions > .panel-header.textbox{'+
		'	position:relative;'+
		'}'+
		'#fairy-arrows {'+
		'	display:inline-block;'+
		'	position:absolute;'+
		'	right:195px;'+
		'	top:4px;'+
		'}'+
		'#fairy-arrows .arrow{'+
		'	display:inline-block;'+
		'	width:30px;'+
		'	height:30px;'+
		'	margin:1px;'+
		'}'+
		'#fairy-arrows .up{'+
		'	background-position:-3px -106px;'+
		'}'+
		'#fairy-arrows .down{'+
		'	background-position:-96px -106px;'+
		'}'+
		'#fairy-arrows .up:hover{'+
		'	background-position:-34px -106px;'+
		'}'+
		'#fairy-arrows .down:hover{'+
		'	background-position:-127px -106px;'+
		'}'+
		'#fairy-arrows .up.pressed{'+
		'	background-position:-65px -106px;'+
		'}'+
		'#fairy-arrows .down.pressed{'+
		'	background-position:-158px -106px;'+
		'}'
	);
	var e=document.createElement('div');
	e.id="fairy-arrows";
	e.innerHTML='<span type="image" class="arrow up" title="Up Vote Fairy" '+
					'onclick="this.className=this.className.indexOf(\'pressed\')>-1?\'arrow up\':\'arrow up pressed\';"></span>'+
				'<span type="image" class="arrow down" title="Down Vote Fairy" '+
					'onclick="this.className=this.className.indexOf(\'pressed\')>-1?\'arrow down\':\'arrow down pressed\';"></span>';
	findEle(".//div[@id='captions']/div[@class='panel-header textbox']",9).appendChild(e);
	e.childNodes[0].addEventListener('click',function(){vote(1);},false);
	e.childNodes[1].addEventListener('click',function(){vote(0);},false);
}