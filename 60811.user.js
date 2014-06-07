// FreeModding.it cleaner
// version 1.0
// 2008-10-29
// by Diego De Vita
//
// ==UserScript==
// @name          FreeModding.it cleaner
// @description   it removes signature...signature is too big and childish
// @include       http://www.freemodding.it/*
// ==/UserScript==

function removeNode(node){
	node.parentNode.removeChild(node);
}

function removeByClassName(className){				
		firme=document.getElementsByClassName(className);					
		if(firme!=null){							
			while (firme.length) removeNode(firme[0]);					
		}
}

function deAd(){	
	o=document.getElementsByClassName('bordercolor');					
	postList = o[0].childNodes[0].childNodes;	
	//if the thread is full of posts
	if (postList.length==18) {		
		//delete the last nodes...it's an ad
		for(i=0;i<4;i++) removeNode(postList[postList.length-1]);			
	}
	//first ad
	ad=postList[1];
	adSeparator=postList[2];	
	removeNode(ad);
	removeNode(adSeparator);
}

function macro(){	
	deAd();
	removeByClassName('signature');
	removeByClassName('avatarBG');	
}

function onLoadHandler(){
	setTimeout(macro,500);
}

window.addEventListener('load',onLoadHandler,true);