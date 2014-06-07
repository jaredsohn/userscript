// ==UserScript==
// @name         Douban Zan Machine
// @author       yudawang.h.sapiens@gmail.com
// @description  Zan many pages
// @include      http://www.douban.com/*
// @include      http://www.douban.com/?p=*
// ==/UserScript==

function main() {
	var zan = document.getElementsByClassName('btn-like');
	for (var i =0;i<zan.length;i++){
		zan[i].removeAttribute('href');
		zan[i].click();
	}
}
// main();
function sleep(n)   
{   
    var  start=new Date().getTime();   
    while(true) if(new Date().getTime()-start>n)  break;   
} 

var ele = document.getElementsByClassName('nav-items');
if(ele){
	// var text=ele[0].innerHTML;
	// var l=text.length;
	// text=text.substring(0,l-15)+"<li color=\"#072\"><a id=\"zan\">点赞</a></li></ul>";
	// ele[0].innerHTML=text;
	var e=document.createElement("li");
	var f=document.createElement('a');
	f.innerHTML='点赞';
	f.id='zan';
	e.appendChild(f);
	ele[0].childNodes[1].appendChild(e);
}
var dianzan=document.getElementById('zan');
dianzan.addEventListener('click',main,false);
// clickall(); //Deadmode!!!
function clickall(){
	var items=document.getElementsByClassName('status-item');
	if(items){
		dianzan.click();
		// for(var i=0;i<100000000;i++);
		// alert('已赞！');
		var next=document.getElementsByClassName('next');
		next[0].childNodes[3].click();
		// sleep(300);
		// items=document.getElementsByClassName('status-item');
	}
}