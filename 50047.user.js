// ==UserScript==
// @name           jj.am-no ads
// @namespace      google.ca
// @include        http://4gifs.com/*
// @include        http://*.4gifs.com/*
// ==/UserScript==
//alert("mmk");
var a = document.getElementsByTagName("img");
for(var i in a)
{
	if(a[i].className == "giThumbnail")
	{
		a[i].setAttribute("oldsrc", a[i].src);
		b = a[i].src.split("/");
		num2 = parseInt(b[5].split("-")[0]);
		num3 = parseInt(b[5].split("-")[1]);
		num1 = (num2-1)+"-"+(num3-1);
		b[5] = num1;
		var bigpic = b.join("/");
		a[i].setAttribute("onMouseOver", "this.removeAttribute('height');this.removeAttribute('width'); this.src='"+bigpic+"';");
		a[i].setAttribute("onMouseOut", "this.height='"+a[i].height+"'; this.width='"+a[i].width+"'; this.src='"+window.location.href+a[i].src.replace("http://4gifs.com","")+"';");
	}
}

var a = document.getElementsByTagName("iframe");
for(var i in a)
{
	a[i].parentNode.removeChild(a[i]);
}
