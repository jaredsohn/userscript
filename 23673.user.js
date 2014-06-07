// ==UserScript==
// @name           HabraForest
// @namespace      *
// @description    add expand/collapse functionality to habrahabr's comments tree
// @include        http://*.habrahabr.ru/blog/*
// @include        http://habrahabr.ru/blog/*
// @author         hlomzik

// version 1.1
// UFO edition
// author contacts:
// icq    165124041
// mail   hlomzik@gmail.com

function aclk(e){
	var p=this.parentNode.parentNode;if(p.className!='comment_item')p=p.parentNode;
	var max=min=parseInt(p.style.marginLeft)+30,c=p.coll=p.coll?false:true;
	this.src='/i/fav_'+(c?'del':'add')+'.gif';
	while(p=p.nextSibling)
		if(p.nodeType==1){
			var m=parseInt(p.style.marginLeft);
			if(!m || m<min)break;
			if(c)
				p.style.display='none';
			else if(m<=max){
				max=p.coll?m:m+30;
				p.style.display='block';
			}
		}
}
function habra_forest(){
	for(var li,o=document.getElementsByTagName('*'),i=o.length;i--;)
		if(o[i].className=='reply_word_holder' || o[i].className=='comment_hide'){
			var p=o[i].parentNode;
			if(o[i].className=='reply_word_holder')p=p.parentNode;
			if(li && li>parseInt(p.style.marginLeft)){
				var e=document.createElement('img');
				e.src='/i/fav_add.gif';
				e.addEventListener("click",aclk,true);
				o[i].insertBefore(document.createTextNode(' '),o[i].firstChild);
				o[i].insertBefore(e,o[i].firstChild);
			}
			li=parseInt(p.style.marginLeft);
		}
}
var __hl=window.setInterval(function(){if(document.getElementsByTagName('body')[0]){window.clearInterval(__hl);habra_forest();}},500);

// ==/UserScript==