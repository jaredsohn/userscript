// ==UserScript==
// @name        提取当页ixweb的IP
// @namespace   提取当页ixweb的IP
// @include     *.ixwebhosting.com/psoft/servlet/*
// @version     1
// ==/UserScript==

(function(){
var Style = 'Style = "display:block;cursor:pointer;position:fixed;top:0;left:20%;';
var Src1 = '<button id="Go-To-Top" ' + Style + '">提取当页ixweb的IP</button>';
var div = document.createElement("div");
div.innerHTML = Src1;
document.getElementsByTagName("body")[0].appendChild(div);
document.getElementById("Go-To-Top").addEventListener("click",clickme, false);
function clickme(){
var s,Endnum1,stringcache
tags = document.getElementsByTagName("td");
stringcache="";
for(var i=0;i<tags.length;i++){
	obj=tags[i].getElementsByTagName("font")[0];
	if(obj){
		s=obj.innerHTML;
		Endnum1=0;
		findnum=s.indexOf(".",Endnum1+1);
		Endnum=s.indexOf(".",findnum+1);
		Endnum1=s.indexOf(".",Endnum+1);
		checknum=Endnum1-Endnum;
		if(checknum!=1 && checknum>0 && findnum>0 && Endnum>0 && Endnum1>0 && s.match(/[a-zA-Z]/i)==null){
			stringcache=stringcache+"\r\n"+s;
		}
	}
}
alert(stringcache);
}
})();