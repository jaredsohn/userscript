// ==UserScript==
// @name        submit
// @namespace   *
// @version     1
// ==/UserScript==

var inputs=document.getElementsByTagName('input');
var found=false;
for(var i=0;i<inputs.length;i++){
	if (inputs[i].type=='submit'){
		found=inputs[i];
		break;
	}
}
//alert(found.type);
if (found){
	var em=document.getElementsByName('time')[0];
	var time=parseInt(em.value);
	var now=Math.floor((new Date()).getTime()/1000);
	var delay=2;
	now+=delay;
	var diff=now-time;
	found.setAttribute('onclick',"var em=document.getElementsByName('time')[0];em.value=Math.floor((new Date()).getTime()/1000)-"+diff+";");
}
