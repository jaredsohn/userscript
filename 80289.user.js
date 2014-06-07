// ==UserScript==
// @name           Google Groups - widescreen
// @namespace      blurg!
// @description    Google Groups - widescreen
// @include        http://groups.google.com/group/*
// @include        https://groups.google.com/group/*
// ==/UserScript==

GM_addStyle('body div.rf{display:none !important;}'+
			'body>div.clear>table >col:nth-child(1){width:100% !important;}'+
			'body>div.clear>table >col:nth-child(2){display:none !important;width:0 !important;}');

/*
var docU = document.URL;

if(docU.indexOf('/browse_thread/thread/')>-1){

	try{
		[].forEach.call(document.querySelectorAll('.msg div'), function(item,index,array){
			var post = item;
			[].forEach.call(post.querySelectorAll('br'), function(item,index,array){
				post.removeChild(item);
			});
		});
	}
	catch(e){}

}
*/