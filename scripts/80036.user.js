// ==UserScript==
// @name          Coderah GoogleWoot
// @namespace     http://www.coderah.com/
// @description   Adds Woot to Google.
// @include       *google.com*
// @version       1.00
// ==/UserScript==

function $(e){if(typeof e=='string')e=document.getElementById(e);return e};
function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n};

ajax={};
ajax.x=function(){try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}};
ajax.send=function(u,f,m,a){var x=ajax.x();x.open(m,u,true);x.onreadystatechange=function(){if(x.readyState==4)f(x.responseText)};if(m=='POST')x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.send(a)};
ajax.get=function(url,func){ajax.send(url,func,'GET')};

var resDiv=document.getElementById('res');

if (resDiv) {
	resDiv.innerHTML+='<div id="gwoot"></div>';
	var gwootDiv=document.getElementById('gwoot');
	gwootDiv.innerHTML='<img src="http://www.coderah.com/gmonkey/coderah_gwoot/loading.gif" />';
	ajax.get("http://www.coderah.com/gmonkey/coderah_gwoot/get.php",function(r) {
		gwootDiv.innerHTML=r;
	});
}