// ==UserScript==
// @name           FreeRice - dictionary helper
// @description    helps you play by providing definitions to words in bottom space
// @version        0.1
// @include        http://*freerice.com/*
// @exclude        http://*freerice.com/*Multiplication*
// ==/UserScript==

function createNewChild(child,node){
	node.innerHTML+='<div>a</div>';
	node.insertBefore(child,node.lastChild);
	node.removeChild(node.lastChild);
}

var i,s;
var dictUrl="http://www.merriam-webster.com/dictionary/";
var words=document.evaluate("//div[@class='questionDisplayChoices']/ol/li",document,null,7,null);
var w=words.snapshotItem(0).firstChild.innerHTML;
//var s=document.evaluate("//a[@href='javascript: submitForm('1')']",document,null,9,null).singleNodeValue.innerHTML;
GM_xmlhttpRequest({
	method:'GET',
	url:dictUrl+w,
	onload: function(a) {
		var def=document.createElement('div');
		def.id='def';
		def.innerHTML='<b><a href='+dictUrl+w+' target="_blank">'+w+'</a></b>&nbsp;';
		def.innerHTML+=/<div class="defs">(.|\n)+?<\/div>/.exec(a.responseText)[0];
		def.innerHTML+='<hr>';
		for(i=1;i<5;i++){
			s=words.snapshotItem(i).lastChild.innerHTML.replace(/\s/g,'&nbsp;');
			def.innerHTML+='<a href='+dictUrl+s+' target="_blank">'+s+'</a>&nbsp;';
		}
		var links=document.evaluate('.//a',def,null,6,null);
		for(i=0;i<links.snapshotLength;i++){
			links.snapshotItem(i).target='_blank';
			links.snapshotItem(i).href=dictUrl+links.snapshotItem(i).href.match(/^.*\/(.*)/)[1];
		}
		def.style.display='none';
		
		var showAnswer=document.createElement('button');
		showAnswer.id='showAnswerBut';
		showAnswer.innerHTML='Show Definition';
		showAnswer.setAttribute('onclick',
					'var def;if((def=document.getElementById("def")).style.display=="none")'+
					'{def.style.display="";document.getElementById("showAnswerBut").innerHTML="Hide Definition";}'+
					'else{def.style.display="none";document.getElementById("showAnswerBut").innerHTML="Show Definition";}'+
					'return false;');
		var showAnswerWrapper=document.createElement('div');
		showAnswerWrapper.align='right';
		createNewChild(showAnswer,showAnswerWrapper);
		
		var space=document.createElement('div');
		space.style.padding="0";
		space.style.backgroundColor="white";
		createNewChild(def,space);
		space.insertBefore(showAnswerWrapper,space.lastChild);
		
		var place=document.evaluate('//*[contains(@class,"contentWrap")]',document,null,9,null).singleNodeValue;
		place.parentNode.insertBefore(space,place.nextSibling);
}});
