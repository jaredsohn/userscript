// ==UserScript==
// @name        HellaSmella
// @namespace   http://fluidapp.com
// @description Updates Fluid.app dock badge with percentage status and adds a dock menu to open Newzbin
// @include     *
// @author      Dallas Brown http://www.kdbdallas.com
// ==/UserScript==

(function ()
{
	if (window.fluid)
	{
		function openNewzbin()
		{
			window.open("http://www.newzbin.com");
		}
		
		function updateBadges()
		{
			if (document.title != "idle")
			{
				var percent = $$('div.progress')[0].style.width;
				window.fluid.setDockBadge(percent);
			}
			else
			{
				window.fluid.setDockBadge("");
			}

			setTimeout(updateBadges, 5000);
		}

		window.fluid.addDockMenuItem("Open Newzbin", openNewzbin);

		updateBadges();
	}
})();