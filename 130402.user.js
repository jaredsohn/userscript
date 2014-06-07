// ==UserScript==
// @name          My First GM script
// @namespace     http://lexus.cnblogs.com
// @description   basic <a href="https://addons.mozilla.org/firefox/addon/748" target="_blank">Greasemonkey</a> script
// @include       http://localhost:8080/hello/*
// @include       http://localhost:7777/hello/*
// ==/UserScript==

var script = document.createElement('script');
script.innerHTML ='function pre(){var arr=window.location.href.split("/");var i=parseInt(arr[arr.length-1])-1;arr[arr.length-1]=i.toString();var url=arr.join("/");window.location.href=url;}';
document.getElementsByTagName('head')[0].appendChild(script); 
//alert("ddd");
document.body.innerHTML='<div><input type="button" value="pre" onclick="javascript:pre();"></div>'+document.body.innerHTML;

 