// ==UserScript==
// @name           U115 By pass
// @namespace      U115
// @description    
// @include        http://u.115.com*
// ==/UserScript==

// ===============
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"javascript:MoveMyFile.Show(); \">Download下载 </a>"
	
	body.appendChild(div);
	
	
	

}
// ==============