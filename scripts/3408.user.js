// ==UserScript==
// @name          K5PM
// @namespace     http://diveintogreasemonkey.org/download/
// @description   adds several enhancements to the Kuro5hin.org private messaging system
// @include       http://www.kuro5hin.org/*
// ==/UserScript==


var envelope_img = "data:image/gif,GIF89a%0F%00%0B%00%D5%00%00%D9%D9%D9%DD%DD%DD%D6" +
				   "%D6%D6%FB%FB%FB%E2%E2%E2%D3%D3%D3%D4%D4%D4%DA%DA%DA%ED%ED%ED%FE" +
				   "%FE%FE%F0%F0%F0%DC%DC%DC%F7%F7%F7%F2%F2%F2%FD%FD%FD%D7%D7%D7%F8" +
				   "%F8%F8%DE%DE%DE%F9%F9%F9%DB%DB%DB%EE%EE%EE%C4%C4%C4%CE%CE%CE%C7" +
				   "%C7%C7%EC%EC%EC%EF%EF%EF%C9%C9%C9%EA%EA%EA%FA%FA%FA%CA%CA%CA%C3" +
				   "%C3%C3%F1%F1%F1%F5%F5%F5%CF%CF%CF%CB%CB%CB%C5%C5%C5%D5%D5%D5%DF" +
				   "%DF%DF%FC%FC%FC%F3%F3%F3%E8%E8%E8%F6%F6%F6%D8%D8%D8%D1%D1%D1%E9" +
				   "%E9%E9%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
				   "%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
				   "%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%0" +
				   "0%00%00%00%2C%00%00%00%00%0F%00%0B%00%00%06f%C0%8A%C6%B0*%1A%8D" +
				   "%05Q'%14%60%B4%9EP('%B2%00%40T%A9(%14%F2%60lT-%93%A1%A1M%3D%06-" +
				   "%148%7CP%40S%01%C9S%FD%F6PZ%A7%11y%BEv%1C%10%00%04%13'%11hi%60%" +
				   "09%02%19-%09%0A%26x%02%8Fj%0E%02'ZO%20%24%03%2C%05%25%1F%97o%01" +
				   "%04%17%00%08%2C%A7%A8%A8%18%0B%16A%00%3B";
				
// kuro5hin doesn't use CSS at the moment so we have to schelp through the page
// to find the location to insert our envelope link.
// go after all the <a> tags that have an HREF matching the pattern "/user/uid:%d*"

var user_uid_matcher = /\/uid:\d*/;

for(var i = 0; i < document.links.length; i++) 
{
	//GM_log(anchors[anchor].href);
	var pathname = new String(document.links[i].pathname);
	if(pathname.match(user_uid_matcher))
	{
		var username = new String(document.links[i].text);
		newSpan = document.createElement("span");
		newSpan.innerHTML = "&nbsp\;<a href=\"http://k5pm.firetree.net/index.cgi?a=create_message&to_uname=" + 
							username + "\"><img src=\"" + envelope_img + "\" border='0' /></a>";
		document.links[i].parentNode.insertBefore(newSpan, document.links[i].nextSibling);
	}
	
}
