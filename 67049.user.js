// ==UserScript==
// @name           twit.tv site - add links to twit youtube channel and odtv.me
// @namespace      blurg!
// @description    twit.tv site - add links to twit youtube channel and odtv.me
// @include        http://twit.tv/
// @include        http://twit.tv/*
// @include        http://www.twit.tv/
// @include        http://www.twit.tv/*
// ==/UserScript==

var pL=document.querySelector('#primary-links');
if(pL){

	var li1=document.createElement('li');
	li1.innerHTML='<a title="" href="http://www.youtube.com/twit"><span class="left-tab"></span><span class="center-tab">Youtube</span><span class="right-tab"></span></a>';
	pL.appendChild(li1);
	
	var li2=document.createElement('li');
	li2.innerHTML='<a title="" href="http://odtv.me"><span class="left-tab"></span><span class="center-tab">odtv.me</span><span class="right-tab"></span></a>';
	pL.appendChild(li2);	
   
}
document.querySelector('#login').style.display='none';
document.querySelector('#subwrapper').style.marginTop='15px';