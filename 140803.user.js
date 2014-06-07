// ==UserScript==
// @name           hanshenriks-scriptforshfriends1
// @namespace      http://userscripts.org/users/73184
// @description    just a script for me and some of my friends. 
// @include        /^http(s)?:\/\/(www\.)?slavehack\.com(\/)?/
// @include       http://*.slavehack.com/index2.php*
// @include       http://slavehack.com/index2.php*

// (thanks to ventero@irc.freenode.net/#regex for regex help!)
// @run-at document-start
// @version 0.2
// ==/UserScript==
//Slavehack cheat detection disabler.
//Please do not talk about this script anywhere public at all. 
//it was probably stupid even putting it on userscripts.org ...
//Only for firefox.
(function(){
	//alert("ifkinrun!");
if(typeof(unsafeWindow)==='undefined')
{
XMLHttpRequest.prototype.originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(/*DOMString */method,/* DOMString */url,/* optional boolean */async,/* optional DOMString? */user,/* optional DOMString? */password)
{//ty https://developer.mozilla.org/en/DOM/XMLHttpRequest#open%28%29
if(url.toString().indexOf('bot')!=-1)
{
//alert("should block this!");
//alert(typeof(this.originalOpen));
throw "I Think Not...";
return;
}
/*return void*/window.XMLHttpRequest.prototype.originalOpen(method,url,async,user,password);
}//XMLHttpRequest.prototype replacement


} else {//unsafeWindow
unsafeWindow.XMLHttpRequest.prototype.originalOpen = unsafeWindow.XMLHttpRequest.prototype.open;
unsafeWindow.XMLHttpRequest.prototype.open = function(/*DOMString */method,/* DOMString */url,/* optional boolean */async,/* optional DOMString? */user,/* optional DOMString? */password)
{
//	alert("typeof(unsafeWindow.XMLHttpRequest.prototype.originalOpen)"+typeof(unsafeWindow.XMLHttpRequest.prototype.originalOpen));
	
//ty https://developer.mozilla.org/en/DOM/XMLHttpRequest#open%28%29
if(url.toString().indexOf('bot')!=-1)
{
//alert("should block this!");
throw "I Think Not...";
return;
}
/*return void*/unsafeWindow.XMLHttpRequest.prototype.originalOpen(method,url,async,user,password);
}//unsafeWindow.XMLHttpRequest.open replacement
}//unsafeWindow?
})();//end of file

