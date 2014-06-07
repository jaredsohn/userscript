// ==UserScript==
// @name           add weibo rss
// @author         randull
// @namespace      http://userscripts.org/scripts/show/172941
// @description    add rss to weibo
// @version        1.3.0
// @include        http://www.weibo.com/*
// @include        http://weibo.com/*
// @updateURL      http://userscripts.org/scripts/source/172941.meta.js
// @downloadURL    http://userscripts.org/scripts/source/172941.user.js
// @run-at	       document-end
// ==/UserScript==
(function()
{
	var getElementByXpath = function (path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};
	setTimeout(function(){
//	var plink=document.getElementById('pl_profile_photo')
//alert(plink.childNodes[0].innerHTML)
//alert(getElementByXpath("//div[@class='pf_head_pic']").innerHTML)
var temp=getElementByXpath("//div[@class='pf_head_pic']").innerHTML
	temp=temp.replace(/(\r\n|\n|\r)/gm,"");
	temp=temp.replace(/.*src=\"/,"")
	temp=temp.replace(/\".*/gm,"")
	temp=temp.replace(/http:\/\/.*?\//,"")
	temp=temp.replace(/\/.*/,"")
//alert(temp)
//	var prof=document.getElementById('pl_profile_hisInfo')
//	var prof=getElementByXpath("//div[@class='pf_info_left']")
	var prof=getElementByXpath("//div[@class='btn_bed']")



		var div=document.createElement('a');
		div.setAttribute('class','W_btn_b');
		div.setAttribute('href','http://pipes.yahoo.com/pipes/pipe.run?_id=937e3b75e07fb95de0af46547c7edee2&_render=rss&textinput1='+temp+'');
//		div.textContent="Yahoo Pipes RSS";
//		div.innerHTML+="Yahoo RSS"
		prof.appendChild(div);

		var divspan=document.createElement('span');
		div.appendChild(divspan);

		var divem=document.createElement('em');
		divem.setAttribute('class','addicon');
		divem.innerHTML+="+"
		divspan.appendChild(divem);

/*
		var divimg=document.createElement('img');
		divimg.setAttribute('style','margin:4px 2px 0px 0px')
		divimg.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADF0lEQVQ4jVWTXUyTBxSGDyK0jRcLkclwOrkQAmqyuRtMduHmT2SEMLPNqDG6MXUaw4UXTLcZomaoEanOIGNMZ5FiacFWOkaLrZZmLUZqXdRs/kCa1MxELUOk8tef73t2UcTsTd7k3Dzvec/FEZkWXZsL8X+1l+Deano31eMu7eLqx3fxlIXxbhnAVX4NV/k+XOu3cmXDdgI1C2UG9lUe449i6F8HgXLoKwXfWvCuBO8q8H4A3W9DRzrY5kCrgFFIBH4okXjwRDH9JXC3AoK7wLMK3CuguwBsOXBJC9bZYM+GzvnQPgfa0uG8gL3YLQS/r+bmJ+D/DJxFYBG4KNAiYE6D33PBnpsCTbPBlAFmbarFpUWDgm9bD44l0LcBQqfg3hEIfA3+9eAoBKOkAFMGmDWp+VWANS8iXFl3g8vZEGoGQJ12SknwlEODgDkD2rSvbRKw5j4VfDu6cL+P2pWP6v4Q1V+BEgn8P8i1Fpqmm5g1YNagGIR4e8FtUXx7TmPPQe1chHqrEpyFqL8Iii0P5cVAKkBRwLYYLgi0acCiJdEoxDpX2kVxf3qQ9gzwlr7eOPYXapOAQYeaGAEg3l9F4keB1kyw6Ig1CAn7R1bBWXaInmVgzQL/56iDhlT9qQiJMwJ9XwAwHvYwphdoS0c1ahk+KUQvLrsuiufLb/gtD2xvQm8pmHVgmZuCbtWQ/FkgESUeSxI99wb8KsSbNERqhaGWdwOiXNu5G6OAc+nMCfGOt+CZj9GhMKN6gZGbKMDw+XzG64RYYybDeuF58xK/JK/uLOOCgKMIlJdMASPGBdC9hohrB5OGNAhbGQ25+Lc+i7GTQrxRw/NaYbhluVMmgy3vYNGiGAT13FwmzuYweVrg+CyUWoH2LJJNOqJHhVh9JvFGHdH6TB5UCXd+KjkrIiKJ3soq1SBMHRamqoVkXRrjJ2bxslZ4clj451vhyQHh8SEhfFC4t18IHM8PPew1Zc985GjPnsUTjo11460rBieal3qGGuZ7Hutz7oeOzXs0oC8IDZx67/qfNQsdt8+sdv7d8V3FK+4/XhXByjjWZMEAAAAASUVORK5CYII=');
		div.appendChild(divimg);
*/
		divspan.innerHTML+="Yahoo RSS"

}, 2000);
})()