// ==UserScript==
// @name           geekologie - daisykillah
// @namespace      daisykillah
// @description    removes stupid comments from geekologie including daisys 
// @include        http://www.geekologie.com/*
// ==/UserScript==

com = document.getElementsByClassName("comment"); 
for(i=0;i<com.length;i++){
	myregexp = new RegExp(/(daisy)|(first)|(frist)|(FAKE)|(porn)|(Never Back Down)|(Millionaire Loving)|(furst)|(1st)/ig); 
	match = myregexp.exec(com[i].innerHTML); 
	tag="moron"+i; 		
	if(null != match){
		insert = "<a href=#"+tag+" onclick=document.getElementById('moron"+i+"').style.display='block'; >show</a> <div id=moron"+i+" style=display:none;>"+com[i].innerHTML+"</div>"; 
		com[i].innerHTML='<p class="comment-footer"><a name='+tag+' ></a> '+(i+1)+' Moron Detected '+insert+'</div> <div class="comment-content"> '; 
		com[i].innerHTML+='  </div>'; 
	}
}
