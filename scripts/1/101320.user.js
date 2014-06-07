// ==UserScript==
// @name           trans-tr-en
// @namespace      http://userscripts.org/users/133663
// @description    Sanitize troll dialogue by transliterating their simpler quirks to proper English
// @include        http://www.mspaintadventures.com/*
// ==/UserScript==

var text = [];
text = document.body.getElementsByTagName("span");
for (var i in text){
	if (!text[i].style){}
	else if (!text[i].style.color){}
	else if (text[i].style.color=="rgb(161, 161, 0)"){
		text[i].innerHTML = text[i].innerHTML.replace(/ii/g,"i");
		text[i].innerHTML = text[i].innerHTML.replace(/2/g,"s");
		text[i].innerHTML = text[i].innerHTML.replace(/0/g,"o");
	} else if (text[i].style.color=="rgb(0, 130, 130)"){
		text[i].innerHTML = text[i].innerHTML.replace(/4/g,"A");
		text[i].innerHTML = text[i].innerHTML.replace(/3/g,"E");
		text[i].innerHTML = text[i].innerHTML.replace(/1/g,"I");
	} else if (text[i].style.color=="rgb(65, 102, 0)"){
		text[i].innerHTML = text[i].innerHTML.replace(/ :33 &lt; /g," ");
		text[i].innerHTML = text[i].innerHTML.replace(/33/g,"ee");
	} else if (text[i].style.color=="rgb(43, 0, 87)"){
		text[i].innerHTML = text[i].innerHTML.substring(0,5).toUpperCase() + text[i].innerHTML.substring(5,text[i].innerHTML.length).toLowerCase();
	} else if (text[i].style.color=="rgb(161, 0, 0)"){
		text[i].innerHTML = text[i].innerHTML.replace(/0/g,"o");
	} else if (text[i].style.color=="rgb(0, 0, 86)"){
		text[i].innerHTML = text[i].innerHTML.replace(/0/g,"o");
	} else if (text[i].style.color=="rgb(161, 80, 0)"){
		text[i].innerHTML = text[i].innerHTML.substring(0,5).toUpperCase() + text[i].innerHTML.substring(5,text[i].innerHTML.length).toLowerCase();
	} else if (text[i].style.color=="rgb(0, 86, 130)"){
		text[i].innerHTML = text[i].innerHTML.replace(/h8/g,"hate");
		text[i].innerHTML = text[i].innerHTML.replace(/l8/g,"lat");
		text[i].innerHTML = text[i].innerHTML.replace(/f8/g,"fat");
		text[i].innerHTML = text[i].innerHTML.replace(/gr8/g,"great");
		text[i].innerHTML = text[i].innerHTML.replace(/ m8/g," mate");
		text[i].innerHTML = text[i].innerHTML.replace(/ w8/gi," wait");
		text[i].innerHTML = text[i].innerHTML.replace(/8r8k/g,"break");
		text[i].innerHTML = text[i].innerHTML.replace(/str8nge/g,"strange"); 
		text[i].innerHTML = text[i].innerHTML.replace(/8ight/g,"eight");
		text[i].innerHTML = text[i].innerHTML.replace(/cre8te/g,"create");
		text[i].innerHTML = text[i].innerHTML.replace(/duplic8/g,"duplicate"); 
		text[i].innerHTML = text[i].innerHTML.replace(/8/g,"b");
	} else if (text[i].style.color=="rgb(0, 129, 65)"){
		text[i].innerHTML = text[i].innerHTML.substring(0,5).toUpperCase() + text[i].innerHTML.substring(5,text[i].innerHTML.length).toLowerCase();
	} else if (text[i].style.color=="rgb(0, 0, 86)"){
		text[i].innerHTML = text[i].innerHTML.replace(/00/g,"oo");
		text[i].innerHTML = text[i].innerHTML.replace(/1/g,"l");
		text[i].innerHTML = text[i].innerHTML.replace(/%/g,"x");
		text[i].innerHTML = text[i].innerHTML.replace(/ D --&gt; /g," ");
	} else if (text[i].style.color=="rgb(119, 0, 60)"){
		text[i].innerHTML = text[i].innerHTML.replace(/\)\(/g,"H");
	} else if (text[i].style.color=="rgb(106, 0, 106)"){
		text[i].innerHTML = text[i].innerHTML.replace(/VV/g,"V");
		text[i].innerHTML = text[i].innerHTML.replace(/vv/g,"v");
		text[i].innerHTML = text[i].innerHTML.replace(/WW/g,"W");
		text[i].innerHTML = text[i].innerHTML.replace(/ww/g,"w");
	} 
	
}