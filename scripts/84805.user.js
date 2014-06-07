// ==UserScript==
// @name TalesBook
// @description Unlocks the TalesBook version of VuTales.
// @match http://*.vutales.vuii.co.uk/*
// @match http://*.vutales.com/*
// ==/UserScript==
function Get(Element) { 
	var object = (arguments.length > 1)? arguments[1]:document
	switch(Element.charAt(0)) {
		case '#': 
		return object.getElementById(Element.substr(1));
		break;
	case '.':
		return object.getElementsByClassName(Element.substr(1));
		break;
	default:
		return object.getElementsByTagName(Element);  
	} 
}
Get('body')[0].style.backgroundImage="url(http://i.imgur.com/acgSY.jpg)";
Get('body')[0].style.backgroundColor="black";
Get('.Logo')[0].style.backgroundImage="url(http://i.imgur.com/aV6g7.png)"
/* Replace VuTales text */
Get('a',Get('.MenuItem')[0])[0].innerHTML="TalesBook"
Get('a',Get('.MenuItem')[2])[0].innerHTML="My account"
if(typeof Get('.topNotice')[0] != 'undefined') 
	Get('.topNotice')[0].innerHTML=Get('.topNotice')[0].innerHTML.replace('VuTales','TalesBook')
if(typeof Get('.moduleItemTop')[5] != 'undefined')
	Get('.moduleItemTop')[5].innerHTML="TalesBook"
/* Things I didn't like and customized. */
Get('.Mast')[0].style.height="15px"
Get('.Mast')[0].style.borderBottomLeftRadius="4px"
Get('.Mast')[0].style.borderBottomRightRadius="4px"
Get('.Mast')[0].style.width="80%"
Get('.Mast')[0].style.marginLeft="10%"
Get('.Mast')[0].style.marginRight="10%"

if(typeof Get('.topNotice')[0] != 'undefined') {
	Get('.topNotice')[0].style.border="0px solid white"
	Get('.topNotice')[0].style.borderBottomLeftRadius="0px"
	Get('.topNotice')[0].style.borderBottomRightRadius="0px"
	Get('.topNotice')[0].style.marginBottom="0px"
}
if(typeof Get('.leftModule')[0] != 'undefined') {
	Get('.leftModule')[0].style.border="0px solid white"
	Get('.leftModule')[0].style.borderTopLeftRadius="0px"
	Get('.leftModule')[0].style.borderTopRightRadius="0px"
	Get('.leftModule')[0].style.marginRight="0px"
}
if(typeof Get('.mainModuleMiddle')[0] != 'undefined') {
	Get('.mainModuleMiddle')[0].style.border="0px solid white"
	Get('.mainModuleMiddle')[0].style.borderLeft="1px solid #ddd"
	Get('.mainModuleMiddle')[0].style.borderTopLeftRadius="0px"
	Get('.mainModuleMiddle')[0].style.borderTopRightRadius="0px"
	Get('.mainModuleMiddle')[0].style.marginLeft="0px"
	Get('.mainModuleMiddle')[0].style.padding="10px 10px 10px 14px"
} else if(typeof Get('.mainModule')[0] != 'undefined') {
	Get('.mainModule')[0].style.border="0px solid white"
	Get('.mainModule')[0].style.borderLeft="1px solid #ddd"
	Get('.mainModule')[0].style.borderTopLeftRadius="0px"
	Get('.mainModule')[0].style.borderTopRightRadius="0px"
	Get('.mainModule')[0].style.marginLeft="0px"
	Get('.mainModule')[0].style.padding="10px 10px 10px 14px"
} else if(typeof Get('.commentsWrap')[0] != 'undefined') {
	Get('.commentsWrap')[0].style.border="0px solid white"
	Get('.commentsWrap')[0].style.borderTopLeftRadius="0px"
	Get('.commentsWrap')[0].style.borderTopRightRadius="0px"
}
if(typeof Get('.rightModule')[0] != 'undefined') {
	Get('.rightModule')[0].style.marginLeft="0px"
	Get('.rightModule')[0].style.border="0px solid white"
	Get('.rightModule')[0].style.borderLeft="1px solid #ddd"
	Get('.rightModule')[0].style.borderTopLeftRadius="0px";
	Get('.rightModule')[0].style.borderTopRightRadius="0px";
}

//Modify "author: lawzors" to "written by lawzors"
if(typeof Get('.infoBar')[0] != 'undefined') {
	var Bars = Get('.infoBar')
	for(z=0;z<Bars.length;z++) {
		var Author = Get('span',Bars[z])[0]
		var inHTML = Author.innerHTML
		Author.innerHTML=inHTML.replace(/(.+)Author: (.+)/,"$1 written by $2")
	}
}