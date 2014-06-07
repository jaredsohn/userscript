// ==UserScript==
// @name       Facebook Shortcut By Shivesh96
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  This Script Enables Some extra Shortcut for Facebook 
// @match      https://www.facebook.com/*
// @include    http://*facebook*
// @include    https://*facebook*
// @copyright  2014+, Shivesh96
// ==/UserScript==
function createDiv() 
{
    text = "This Script is Written by <a href=\"#\" st>Shivesh Chandra</a>Alt+L = Logout";
    var _body = document.getElementsByClassName('_li')[0];
    var _div = document.createElement('div');
    _div.id = "FbShortcut";
    _body.appendChild(_div);
    document.getElementById('FbShortcut').innerHTML = '<div style="background-color: #3b5998; color: white;"><marquee>'+text+'</marquee></div>';
    //alert("");
    document.body.insertBefore(_div, document.body.firstChild);
}
function setKey(){
	var a = document.getElementsByTagName("a");
	var inp = document.getElementsByTagName("input");
	for(var i = 0; i<a.length; i++){
		if(a[i].getAttribute("href") == "https://www.facebook.com/rcb.shs/photos"){
			a[i].setAttribute('accesskey','p');
		}
		if(a[i].getAttribute("href") == "https://www.facebook.com/rcb.shs/photos"){
			a[i].setAttribute('accesskey','p');
		}
		if(a[i].getAttribute("href") == "https://www.facebook.com/rcb.shs/photos"){
			a[i].setAttribute('accesskey','p');
		}
		if(a[i].getAttribute("href") == "https://www.facebook.com/rcb.shs/friends"){
			a[i].setAttribute('accesskey','f');
		}
		if(a[i].getAttribute("class") == "fbChatGoOnlineLink"){
			a[i].setAttribute('accesskey','O');
		}
	}
	for(i = 0; i<inp.length; i++){
		if(inp[i].getAttribute("value") == "Log Out"){
			inp[i].setAttribute('accesskey','l');
		}
	}
}
createDiv();
setKey();