// ==UserScript==
// @name        Facebook Chat Image Replacer by LonDo Stupid Defacer
// @namespace   http://userscripts.org/scripts/show/139263
// @version			Trial
// @copyright		        @2012 LonDo Stupid Defacer
// @description Facebook Chat Image Replacer by LonDo Stupid Defacer
// @author			LonDo Stupid Defacer
// @icon			https://lh4.googleusercontent.com/-2A1Jpr4-1qM/TxPUbMq8IQI/AAAAAAAAAIU/_50N6LEgkxE/h120/FB.png
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// ==/UserScript==

(function(d) { 
    function replaceGif(target)
    {		//If its a plain link to image or text then a link or text, linebreak and the link then replace the elements
		if(target.children[0].children[0].innerHTML.substring(0,39)=='<a target="_blank" rel="nofollow" href=' ||
		target.children[0].children[0].children[0].outerHTML.substring(0,39)=='<a target="_blank" rel="nofollow" href=' ||
		target.children[0].children[0].children[1].outerHTML.substring(0,39)=='<a target="_blank" rel="nofollow" href=' ) {

			var link,ext;
		//Depending on the structure replace the elements if the image type for the link its .gif
			if(target.children[0].children[0].firstChild.href) {
				link = target.children[0].children[0].firstChild.href;
				ext = link.substring(link.length-3,link.length).toLowerCase();
				if(ext=="gif" || ext=="jpg" || ext=="png") {
					target.children[0].children[0].firstChild.innerHTML = '<img src="'+link+'" width=180 />';
				}
			}
			else if(target.children[0].children[0].children[0].href) {
				link = target.children[0].children[0].children[0].href;
				ext = link.substring(link.length-3,link.length).toLowerCase();
				if(ext=="gif" || ext=="jpg" || ext=="png") {
					target.children[0].children[0].children[0].outerHTML = '<img src="'+link+'" width=180 />';
				}
			}
			else
			{
				link = target.children[0].children[0].children[1].href;
				ext = link.substring(link.length-3,link.length).toLowerCase();
				if(ext=="gif" || ext=="jpg" || ext=="png") {
					target.children[0].children[0].children[1].outerHTML = '<img src="'+link+'" width=180 />';
				}
			}
		}

    }
	d.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {

		if(event.target.getElementsByClassName('fbChatMessage fsm direction_ltr'))
			replaceGif(event.target);

	}
})(document);