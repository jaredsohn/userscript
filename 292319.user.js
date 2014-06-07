// ==UserScript==

// @name           Expand fchan images

// @namespace      

// @description    Adds a button to expand links into the fchan control pannel. 

// @include        http://fchan.us/*

// ==/UserScript==
var iDiv = document.createElement('div');
iDiv.innerHTML='<button id="expandall" onclick="javascript:a=document.getElementsByClassName(\'zoom\');for(var i in a)a[i].onclick();" style="background-color:black;color:white;font-size:10px;padding:1px;">Expand all images</button>';
document.getElementById('content').appendChild(iDiv)
