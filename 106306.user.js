// ==UserScript==
// @name           Add +1 button to Facebook
// @namespace      anui
// @description    This script adds Google Plus +1 button to each Facebook post :D
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

function show(){
	var gs = document.createElement("script");
	gs.type = "text/javascript";
	gs.src = "https://apis.google.com/js/plusone.js";
	document.getElementsByTagName("head")[0].appendChild(gs);
	onload();
	setInterval(onload, 250);
}
var current = 0;
function onload(){
	var likes = document.getElementsByName("like");
	//alert(current +" "+likes.length);
	if(likes.length <= current) return;
	var i = current;
	for (; i<likes.length; i++)
	{
		//likes[i].style.background = "#0000FF";
		var href = likes[i].parentNode.previousSibling.firstChild.getAttribute("href");
		if(null == href) continue;
		//alert(href);
		if(href.charAt(0) == '/') href = "http://www.facebook.com" + href;
		else href.replace("https", "http");
		
		//likes[i].firstChild.innerHTML = i+"::"+href;
		/*
		likes[i].firstChild.style.minWidth = "24px";
		likes[i].firstChild.style.minHeight = "15px";
		likes[i].firstChild.style.width = "24px";
		likes[i].firstChild.style.height = "15px";
		likes[i].firstChild.style.background = 'url("//ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite.png") no-repeat scroll -75px -42px transparent';
		*/
		var div = document.createElement("div");
		div.id = "___plusone_0";
		div.setAttribute("style","height: 15px; width: 70px; display: inline-block; text-indent: 0pt; margin: 0pt; padding: 0pt; background: none repeat scroll 0% 0% transparent; border-style: none; float: none;");
		
		var iframe = document.createElement("iframe");
		iframe.width = "100%";
		iframe.scrolling = "no";
		iframe.frameBorder = 0;
		iframe.setAttribute("vspace", "0");
		iframe.setAttribute("tabindex", "-1");
		iframe.setAttribute("style","position: static; left: 0pt; top: 0pt; width: 70px; height: 15px; visibility: visible;");
		iframe.marginWidth = 0;
		iframe.marginHeight = 0;
		
		iframe.setAttribute("hspace", "-1");
		iframe.setAttribute("allowtransparency", "true");
		
		var srchead = 'https://plusone.google.com/u/0/_/+1/button?hl=en-US&jsh=r%3Bgc%2F22224365-adc8a19e#url=';
		var srctail = '&size=small&count=true&useSharedProxy=true&rcache=true&scache=true&id=I1_1310049664058&parent=https%3A%2F%2Fwww.facebook.com&rpctoken=229167859&_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe';
		
		iframe.src=srchead+href+srctail;
		div.appendChild(iframe);
		
		likes[i].parentNode.lastChild.style.marginRight = "5px";
		likes[i].parentNode.appendChild(div);
		
		/*
		<iframe width="100%" scrolling="no" frameborder="0" vspace="0" tabindex="-1" style="position: static; left: 0pt; top: 0pt; width: 70px; height: 15px; visibility: visible;" src="https://plusone.google.com/u/0/_/+1/button?hl=en-US&amp;jsh=r%3Bgc%2F22224365-adc8a19e#url=http%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D240869669274938%26id%3D100000557213545&amp;size=small&amp;count=true&amp;useSharedProxy=true&amp;rcache=true&amp;scache=true&amp;id=I1_1310049664058&amp;parent=https%3A%2F%2Fwww.facebook.com&amp;rpctoken=229167859&amp;_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe" name="I1_1310049664058" marginwidth="0" marginheight="0" id="I1_1310049664058" hspace="0" allowtransparency="true"></iframe>
		*/
	}
	current = i;
}
try{
if (self != window.top) { return; }
show();
}catch(e){alert(e);}