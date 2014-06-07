// ==UserScript==
// @name        Happy Danoss
// @version     0.0.1
// @namespace   http://www.neogaf.com/forum/
// @match     http://www.neogaf.com/forum/*
// ==/UserScript==

// Blatently copied from the NeoGAF User Highlight Script
// http://userscripts.org/scripts/review/77218

var username	= "Danoss";
var append		= ", lol :P";

// Add jQuery
///////////////////////////////////////////////
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
if (window.opera) unsafeWindow=window;

// Check if jQuery's loaded
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; if(username.length > 0) execJQuery(); }
}
    
GM_wait();

function execJQuery()
{
	// thanks to yeef @ neogaf
	$.expr[":"].econtains = function(obj, index, meta, stack) {
		return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
	}
	
	var path = window.location.pathname;
	
	if((path.search("showpost") > 0) || (path.search("showthread") > 0))
	{
		var user = $(".bigusername:contains('" + username + "')");
		
		user.css('color', 'black').closest('td').siblings().each(function(index) {
			var post = $(this).html();
			var postEnd;
			
			// How not to do if statements
			if(	post.substring(post.length - 47, post.length - 48) == "." ||
				post.substring(post.length - 47, post.length - 48) == "?" ||
				post.substring(post.length - 47, post.length - 48) == "," ||
				post.substring(post.length - 47, post.length - 48) == "!")
			{
				postEnd = post.substring(post.length - 47, post.length);
				post = post.substring(0,post.length - 48) + append + postEnd;
			}
			else
			{
				postEnd = post.substring(post.length - 46, post.length);
				post = post.substring(0,post.length - 47) + append + postEnd;
			}
			
			$(this).html(post);
		});
	}
}