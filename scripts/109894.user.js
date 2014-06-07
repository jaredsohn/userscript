// ==UserScript==
// @name           miao
// @namespace      miao
// @description    mm
// ==/UserScript==

function g(v) {
	return document.getElementById(v);
}
function a(){ 
	if(g("verifycodeId")){
		alert("enter code!");
		g("verifycodeId").focus();	
	}
}

var m = parseInt(g("sellDateTime").innerHTML);

if(m>1){
	setTimeout("location.reload(true);",(m-0.5)*60*1000);
}else if(m>0){
	setTimeout("location.reload(true);",100);
}else{
	a()
}