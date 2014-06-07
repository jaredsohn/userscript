// ==UserScript==
// @name       MyUserscript12345
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter somethinguseful
// @match      http://userscripts.org/scripts/show/141910
// @copyright  2012+, You
// Urls process this user script on
// @include        htt*://*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// ==/UserScript==


$(function(){
body = document.body;
	
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.60;
	div.style.bottom = "+70px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='AutoLike()'><center>Droll Down </center></a>";
	body.appendChild(div);
	}
});

function AutoLike() {
alert('1');
alert(window.innerHeight);
//var i = setInterval(function(){window.scrollBy(0, window.innerHeight)}, 100); //setTimeout(function(){clearInterval(i)}, 100 * 1000);   
}