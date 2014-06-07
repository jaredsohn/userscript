// ==UserScript==
// @name           yetanotheradfkill
// @namespace      yetanotheradfkill
// @author         d37s7d@gmail.com
// @description    Remove adf.ly waiting time 
// @include        http://adf.ly/*
// ==/UserScript==
(function()
{
if(unsafeWindow && unsafeWindow.showSkip)
{
      unsafeWindow.countdown=0;
	  unsafeWindow.t = 0;
	   unsafeWindow.counter();
		var link;
           link= document.getElementById('skip_button');
			if (link) {
				document.location.href = link.href;
		}
}
})();