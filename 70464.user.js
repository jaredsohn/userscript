// ==UserScript==
// @name           ProRealTime
// @namespace      PRT
// @description    enhancement for prorealtime
// @include        http://www.prorealtime.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

GM_log("start PRT Enhancer");

// Check if jQuery's loaded
function GM_wait()
{
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery()
{
	//perform only when frame 1 is ready
	$(window.parent.frames[1].document).ready(function()
		{
		
			//GM_log("input found:" + $("input[value='OK']",window.parent.frames[1].document).length);
					
			//find ok button in frame1 and click on it
			if($("input[value='OK']",window.parent.frames[1].document).length)
			{
				try
				{
					$("input[value='OK']",window.parent.frames[1].document).click();
				}
				catch(Ex)
				{
				
				}
				finally
				{
					GM_log("input clicked");
				}
			}
		});
}