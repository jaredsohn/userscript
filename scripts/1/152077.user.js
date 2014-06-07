// ==UserScript==
// @name         YouTube Comment Fix 2012-11-08
// @include      http://www.youtube.com/watch?v=*
// @author       Michael (mickymauzer)
// @description  Fixes issue of comment text area getting disabled after using comment page navigation buttons.
// @version      1.01
// ==/UserScript==

window.onload=function(){
	window.setInterval(
		function()
		{
			var c = document.getElementsByTagName("TEXTAREA");
			for(var i=0;i<c.length;i++)
			{
				if(c[i].name == "comment") c[i].disabled=false;
			};
		}, 2000);
};
