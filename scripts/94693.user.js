// ==UserScript==
// @name           sina_blog
// @namespace      sina_blog
// @include        http://blog.sina.com.cn/*
// ==/UserScript==
var wait_num=0;
function removes(){
	 var select = document.getElementById("selectionShare");		   	
     document.getElementsByTagName("body")[0].removeChild(select);
}
function removep(){
		var photo =  document.getElementById("sharePhoto");			
		   
		document.getElementsByTagName("body")[0].removeChild(photo);
}
function GM_wait_p(){
    if((document.getElementById("selectionShare") == null)&& wait_num<200) { 
	window.setTimeout(GM_wait_p,100);wait_num++; 	
	}else{
	if(document.getElementById("selectionShare")==null){}else{
		removes();
	}
	}
}

function GM_wait() {
    if((document.getElementById("sharePhoto") == null && document.getElementById("selectionShare") == null )&& wait_num<200) { 
	window.setTimeout(GM_wait,100);wait_num++; 	
	}
    else {
	if(document.getElementById("selectionShare") == null){
	}else{	
	    removes();
		   
	}	
	if(document.getElementById("sharePhoto") == null){}else{
		removep();
		GM_wait_p();
	}	
	}
}

GM_wait();

