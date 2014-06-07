// ==UserScript==
// @name        C18
// @namespace   C18
// @include     http://vip.chloe18.com/verified/*
// @version     1
// ==/UserScript==
var lnks = document.links;
var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++) {
	if (imgs[i].src.indexOf("thumbnails/") != -1) {
		imgs[i].style.width="50%";
		imgs[i].style.height="50%";
	}
}
for (i=0; i<lnks.length; i++) {
	if (lnks[i].href.indexOf("pages/") != -1) {
		lnks[i].href="images/"+lnks[i].href.split("pages/")[1].split(".")[0]+".jpg";
	}
}
var x = document.getElementsByTagName('table')[0];
x.innerHTML = '';
loca = new String(window.location);
set = loca.split("pics/")[1].split("/")[0];
for (i=1; i<50; i++) {
	if(i<10){
		n=i.toString();
		if(set=='0'+i) {
			x.innerHTML = x.innerHTML.concat(' <a href="http://vip.chloe18.com/verified/pics/0'+n+'/" style="color:red;">0'+n+'</a>');
		} else {
			x.innerHTML = x.innerHTML.concat(' <a href="http://vip.chloe18.com/verified/pics/0'+n+'/">0'+n+'</a>');
			}
		}
	else if(i>=10){
		n=i.toString();
		if(set==i) {
			x.innerHTML = x.innerHTML.concat(' <a href="http://vip.chloe18.com/verified/pics/'+n+'/" style="color:red;">'+n+'</a>');
		} else {
			x.innerHTML = x.innerHTML.concat(' <a href="http://vip.chloe18.com/verified/pics/'+n+'/">'+n+'</a>');
			}
		}
}
