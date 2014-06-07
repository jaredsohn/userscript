// Lowbie Removal tool
// Version 0.1 BETA
// 2007-10-17
// Copyright (c) 2007, Some Guy
// ==UserScript==
// @name          Lowbie Removal Tool
// @namespace     http://about:blank
// @description   Removes low level character posts from forum topics
// @include       http://forums.worldofwarcraft.com/thread.html*
// ==/UserScript==
// Set level_min to the minumum level character posts you want to see
var level_min = 70; 
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
var filter_link = document.createElement('a');
filter_link.id = "filter_link"
filter_link.href = "#"
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; doWork(); }
    }
    GM_wait();
function doWork()
{
	character_levels = $('div[@class="iconPosition"]').children();
	$(filter_link).text("[ Toggle low-level posts ]");
	$(filter_link).css("z-index","100");
	$(filter_link).insertBefore("a[@href='http://www.worldofwarcraft.com/']");
	$(filter_link).click( function()
	{
		$("*[@low_level='true']").toggle();
	});
	for(i=1;i< character_levels.size();i++)
	{
		if (parseFloat($(character_levels[i]).children().text()) < level_min)
		{
			$(character_levels[i]).parents("div[@class='postdisplay']").toggle();
			$(character_levels[i]).parents("div[@class='postdisplay']").attr("low_level","true");
			
		}
	}
} 