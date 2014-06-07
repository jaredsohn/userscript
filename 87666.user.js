// ==UserScript==
// @name	lolololo
// @include http://www.tianya.cn/publicforum/content/funinfo/*
// ==/UserScript==

var post=document.getElementsByClassName('post'),nameList=document.getElementsByTagName("center"),name,removeNode=function(target){
			if(target){
				target.parentNode.removeChild(target);
			}
		};
if(nameList){
	for(index in nameList){
		if(nameList[index].firstElementChild){
			name=nameList[index].firstElementChild.firstElementChild.innerHTML;
		}
		//console.log(name);
		if(name){
			if(name!=='蓉荣' && nameList[index].parentNode){
				
				removeNode(nameList[index].parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling);
				//removeNode(nameList[index].parentNode.parentNode.parentNode.parentNode);
				//nameList[index].parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.innerHTML='';
			}
		}
	}
}
