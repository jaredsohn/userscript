// ==UserScript==
// @name			Roth tst
// @namespace	http://shuki.rothfarb.info
// @description	Shows requested data in a page 
// @include		http://hivisions.com*
// ==/UserScript==
document.body.innerHTML = document.body.innerHTML.replace(/Hi-Vision/g,"Dany's");

//var thisdomain = window.location.host;
//iframes = document.getElementsByTagName('iframe');
//for (var i = 0; i < iframes.length; i++) {
//	if(iframes[i].name=="searchFrame")
//	{
//		iframes[i].style.border = "3px dashed red";
//	}
//}