// ==UserScript==
// @name           Vend
// @namespace      http://userscripts.org/users/108089
// @include        https://appraisalzone.lendervend.com/SECURE/plus/pfac/QueuePage*
// ==/UserScript==

setTimeout(function() { document.location.reload(); } , 600); //3000 = 5 sec


var text=document.getElementsByTagName('html')[0].innerHTML; //entire text of document
var patt1 = /to you\?\'\); if \(postback\) \{ javascript:__doPostBack\(\'([^\']+)\',\'([^\']+)\'\)/; /*Looks for: to you?) if(postback) { javascript:_doPostBack('*','*') with   javascript:_doPostBack\(\'([^\']+),\'([^\']+)\) and stores parameters*/
if(patt1.test(text)){
	var var1 = RegExp.$1;
	var var2 = RegExp.$2;
	patt1.exec(text);
	__doPostBack(var1, var2);
	//window.location="http://www.google.com";
	alert("Found new job, calling doPostBack('"+var1+", "+var2+"') to reserve job.");
}else{
//alert("no match");
}


