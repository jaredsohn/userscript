// ==UserScript==
// @name        Facebook Message Seen remover
// @namespace   http://userscripts.org/users/73184
// @description don't let your friends know if you have seen their messages or not.
// @include     *facebook.com*
// @version     1
// ==/UserScript==

(function(){
//Google Chrome version 19.0.1084.52 m
//The following code is for disallowing XMLHttpRequest to connect to facebook.com/ajax/mercury/change_read_status.php, when on  facebook.com
//Code: works as expected in firefox. makes chrome unresponding, un-closable (cannot X-it-out), and eventually completely white (when url.toString().indexOf('change_read_status')!=-1 )
//i have tried just returning. i have tried altering the url. tried throwing exception, and they all lead to the same result in chrome.
//(and chrome console also goes completely white/unresponding, before any exception can be seen)
//code should work when chrome fix bug http://code.google.com/p/v8/issues/detail?id=2167
var toStringFunction=function(){
XMLHttpRequest.prototype.originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(/*DOMString */method,/* DOMString */url,/* optional boolean */async,/* optional DOMString? */user,/* optional DOMString? */password)
{//ty https://developer.mozilla.org/en/DOM/XMLHttpRequest#open%28%29
if(url.toString().indexOf('change_read_status')!=-1)
{
throw "sorry exception";
return;
url='http://httpstat.us/200/';
//alert("should block this!");
//method="GET";
}
/*return void*/this.originalOpen(method,url,async,user,password);
}
}


	/*"9gag.com enhancements" code for jumping same window as browser tab*/
    var script = document.createElement('script');
    script.innerHTML = 'try{(' + toStringFunction.toString() + ')();}catch(e){try{alert("Sorry! 9gag.com enhancements crashed, init000 :( exception info: "+e);console.log("e!!:");console.log(e);}catch(eee){alert("dafuq");}}';
	delete toStringFunction;
    document.getElementsByTagName('head')[0].appendChild(script);
	/**/

})();