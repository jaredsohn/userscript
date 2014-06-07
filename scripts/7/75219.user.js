// ==UserScript==
// @name           Live Twit.tv video buffer changer
// @namespace      meh
// @description    Lets you change the buffer size (in seconds) of the bitgravity streams
// @include        http://live.twit.tv/
// @include        http://live.twit.tv/*
// @version        0.1
// ==/UserScript==

var vidCenter=document.querySelector('#video-center');
var twitStream=document.querySelector('#twit-stream');
function returnEleAndHTML(){
    var embElement=vidCenter.firstElementChild;
    var buffNumFromEmbed=embElement.innerHTML.split('BufferTime=')[1].split('&')[0];
    var storedBuffNum=localStorage.getItem('bitGrav_Buffer');
    return [embElement, buffNumFromEmbed, storedBuffNum];
}
function checkAndChange(){
    var embAndBuffNum=returnEleAndHTML();
    if(embAndBuffNum[0].firstElementChild.id=="TWiTBitGravity" && embAndBuffNum[1] != embAndBuffNum[2]){
        embAndBuffNum[0].innerHTML=embAndBuffNum[0].innerHTML.replace('BufferTime='+embAndBuffNum[1],'BufferTime='+embAndBuffNum[2]);
    }
}

var si = window.setInterval(function(){ 
	var iB = document.querySelector('#video>embed');
	if(iB){
		window.clearInterval(si);  
		
		var newP=document.createElement('p');
		newP.setAttribute('style','margin:15px 10px 6px 10px;width:100%;float:left;');
		
		var iP1=document.createElement('input');
		var rEaH=returnEleAndHTML();
		if(!rEaH[2]){
			localStorage.setItem('bitGrav_Buffer',rEaH[1]);
		}
		iP1.setAttribute('value',localStorage.getItem('bitGrav_Buffer'));
		iP1.setAttribute('style','width:40px;margin-right:5px;');
		iP1.setAttribute('type','text');
		iP1.setAttribute('id','iP1');

		var iB1=document.createElement('button');
		iB1.setAttribute('type','button');
		iB1.textContent='Change Buffer Time';
		iB1.setAttribute('id','iB1');
		iB1.addEventListener('mouseup',function(e){
			localStorage.setItem('bitGrav_Buffer',this.previousElementSibling.value);
			checkAndChange();
		},false);

		newP.appendChild(iP1);
		newP.appendChild(iB1);
		twitStream.appendChild(newP);
		checkAndChange();
		vidCenter.addEventListener('DOMNodeInserted', function(e){checkAndChange();},false);
	}
},500);	

