// ==UserScript==
// @name        x-cornerz linkbucks remover
// @namespace   http://*.x-cornerz.com/*
// @include     http://*x-cornerz.com/*
// @version     1
// ==/UserScript==


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; jq(); }
}
GM_wait();

function jq() 
{
    $.each($("a img"),function(){

	if($(this).attr("src").match(/imageporter/)){

		var url=$(this).attr("src");

		url=url.match(/.[^\/\.]{12}/);
		$(this).parent().attr("href",'http://www.imageporter.com'+url);
	
	}
else
	if($(this).attr("src").match(/imgchili/)){

		var url=$(this).attr("src");
		url=url.match(/\/[0-9a-z]+\/[0-9a-z_.]+\.jpg/);
		$(this).parent().attr("href",'http://imgchili.com/show'+url);

	}

 	});


}

