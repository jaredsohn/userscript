// EncodeIt.org Tagoo Converter
// version 0.31 Alpha!
// 2009-07-11
// Copyright (c) 2009, exiper
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "EncodeIt.org Tagoo Converter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          EncodeIt.org Tagoo Converter
// @namespace     http://encodeit.org/js/dynjs
// @description   EncodeIt.org web-service converter integration with Tagoo.ru portal
// @include       http://tagoo.ru/*
// ==/UserScript==

window.getHref = function(el) {
	if(/search.php\?for=audio/.test(document.location.href)) {
		return $(el).attr('href')
	}
	else if (/search.php\?for=video/.test(document.location.href)) {
		return $(el).parent().parent().find('embed').attr('src');
	}
	return false;
}

document.addEncodeIcon = function() {
	$('div.item div.data a.link').each(function(){
		var href=getHref(this);
		if(!href)return false;
		$(this).after('<a target="_blank" href="http://encodeit.org/?url='+encodeURIComponent(href)+'">Перекодировать</a>'); 
	});


}


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; document.addEncodeIcon();}
    }
    GM_wait();





