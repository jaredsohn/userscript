// ==UserScript==
// @name innup 
// @version 0.1.0.2
// @description upload from url
// @include http://*.inn.co.il/Forum/Forum.aspx/*
// ==/UserScript==



  do_it=  function() {
	URLscript=document.createTextNode(afterWin+"\n"+doAtStart +"\n doAtStart();");
	var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','innup');
	document.body.appendChild(Uscript);
	document.getElementById('innup').appendChild(URLscript);
	
	
	};

function afterWin(){
var toAddStr="frm=document.createElement(\"form\"); frm.action=\"http://getlink.somee.com/UPpic.ashx\";  frm.innerHTML=\"<input type='text' name='url' /><input type='Button' value='submit' onclick='$.ajax({type:\\\"get\\\",url:\\\"http://getlink.somee.com/UPpic.ashx\\\",data:{url:url.value}, success: function(data) {data=data.slice(0,data.indexOf(\\\")\\\")+1);eval(data);}})'/>\"; document.getElementById(\"divUploadWinBefore\").appendChild(frm);";
var UPload=window.UploadWin.Load.toString();
UPload=UPload.slice(0,UPload.lastIndexOf('}')).concat(toAddStr+"}");
eval("window.UploadWin.Load ="+ UPload);
eval(toAddStr);
}
function doAtStart(){
var toAddStr="setTimeout(\"afterWin();\",500);";
var UPstr=Windows.Upload.toString();
UPstr=UPstr.slice(0,UPstr.lastIndexOf('};')).concat(";"+toAddStr+"}}");
eval("Windows.Upload ="+ UPstr);
}
do_it();


