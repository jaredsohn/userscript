// ==UserScript==
// @name           nciku Query Plus
// @namespace      http://userscripts.org/people/26505
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @description    nciku Query Plus
// @include        http://www.nciku.com.tw/search/**
// ==/UserScript==
//GM_addStyle(".test_odd { border: solid gray }");
//GM_addStyle(".test_even { border: solid red }");
GM_addStyle(".lightbox { background-color: #ffff95 }");
GM_addStyle(".debug { border: solid red;}");
GM_addStyle(".debug2 { display: none;}");

$(document).ready(function() {
	$('input#de_searchboxQuery').click(function(){
		$(this).select();
	});
	
	var hintText = $('div .ct_profile02').text();
	if(hintText.indexOf('未記住') >= 0){
		$('div .ct_profile02').addClass('lightbox');
		
		}

});

function GM_wait() {	
    if(typeof unsafeWindow.nds_nav == 'undefined' && typeof unsafeWindow.EntryPlayer == 'undefined') { 
    	window.setTimeout(GM_wait,100); 
    }
}


window.addEventListener("load", function(e) 
{
	var scriptLine = $('a:has(img[alt="sound"])').attr('href');
	if(typeof scriptLine != 'undefined' && scriptLine.indexOf('EntryPlayer')>=0){
		var playScript = scriptLine.substring(scriptLine.indexOf('EntryPlayer'));
		playScript = 'unsafeWindow.' + playScript;
		GM_wait();
		try{ eval(playScript); } catch(err) {}
		}
},false);
