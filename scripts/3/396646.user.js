// ==UserScript==
// @name        TwitchPlaysPokemon Buttons
// @description Add Basic Buttons to TwitchPlaysPokemon
// @namespace   http://userscripts.org/users/62850
// @include     http://www.twitch.tv/twitchplayspokemon*
// @version     1.5
// @grant       none
// ==/UserScript==
function randInt(min,max){
	var rand=Math.round(Math.random()*(max-min+1)+min);
	if(rand==max+1){
		return min;
	}
	return rand;
}
function caseifyDir(way){
	var WAY='';
	for(var i=0;i<way.length;i++){
		WAY+=way.substr(i,1)['to'+(Math.round(Math.random())==1?'Upp':'Low')+'erCase']();
	}
	if(l==WAY){
		WAY=caseifyDir(way);
	}
	return WAY;
}
function action(N,B){
	l=caseifyDir(dir[N]);
	t.value=l;
	for(var i=0;i<k.length;i++){
		var evt = document.createEvent('KeyboardEvent');
		evt.initKeyEvent('key'+k[i], true, true, window, false, false, false, false, 13, 0);
		t.dispatchEvent(evt);
	}
	if(!B)
		return;
	h+=N;
	if(h.length>10)
		h=h.substr(1);
	if(h==1144353502){
		if(!Anarchy){
			t.value='Troll Mode Activated';
			setTimeout(anarchy,randInt(2750*Z,3800*Z));
		}
		else{
			t.value='Troll Mode Deactivated';
			clearTimeout(Anarchy);
			Anarchy=false;
		}
	}
}
function anarchy(){
	action(randInt(0,5),false);
	Anarchy=setTimeout(anarchy,randInt(2750*Z,3800*Z));
}
var dir=Array('b','up','a','left','down','right','start'),
	div=document.createElement('div'),
	t,k=Array('down','up','press'),
	l,h='',Anarchy=false,Z=document.location.href.indexOf('gen2')>0?1:2;
function loop(){
	t=document.evaluate('.//div[@class="textarea-contain"]/textarea[@class="ember-view ember-text-area"]', document, null, 9, null).singleNodeValue;
	if(t===null)
		return setTimeout(loop,500);
	div.id="D-Pad";
	div.innerHTML='<input type="button" value="B"/>'+
	'<input type="button" value="&uarr;"/>'+
	'<input type="button" value="A"/>'+
	'<input type="button" value="&larr;"/>'+
	'<input type="button" value="&darr;"/>'+
	'<input type="button" value="&rarr;"/>';
	t.parentNode.insertBefore(div,t);
	t.setAttribute("style","width:75%!important;");
	div.style.width="25%";
	div.style.cssFloat='left';
	for(var i=0;i<div.childNodes.length;i++){
		div.childNodes[i].setAttribute('style','width:24px;height:22.5px;margin:1px;'+(i!=0&&i!=2?'color:black;':'font-weight:bold;'));
		div.childNodes[i].className="normal_button action";
	}
	div.childNodes[0].addEventListener('click',function(){action(0,true);},false);
	div.childNodes[1].addEventListener('click',function(){action(1,true);},false);
	div.childNodes[2].addEventListener('click',function(){action(2,true);},false);
	div.childNodes[3].addEventListener('click',function(){action(3,true);},false);
	div.childNodes[4].addEventListener('click',function(){action(4,true);},false);
	div.childNodes[5].addEventListener('click',function(){action(5,true);},false);
}
loop();