// ==UserScript==
// @name           Test
// @namespace      FBTest
// @description    nothing at all
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+100px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.padding = "2px";
	div.innerHTML = "<a onclick='test()'><b>Add Comment</b></a>"
	body.appendChild(div);


	unsafeWindow.test = function() {
           txtarea = document.getElementByTagName("textarea");
           alert(txtarea);
	};
}
