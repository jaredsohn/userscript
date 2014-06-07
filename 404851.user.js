// ==UserScript==
// @name           OGame Redesign: Fix the Action Icons
// @description    Prevents the shifting of the action icons if no spy icon available and removes the IPM and spy icons and menus if not applicable
// @namespace      Vesselin
// @version        2.00
// @date           2012-10-12
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

(function ()
{
	var myFunc = (function ()
	{
		
		// Wait until the Galaxy page is fully loaded:
		$( document ).ajaxSuccess( function( e, ajax, settings )
		{
			// Check if the Galaxy page has been loaded:
			if ((settings.url.indexOf ("page=galaxyContent") < 0) || ($ ("#fleetstatus").length == 0))
				return;
			$ ("tr.row").each (function ()
			{
				// Get the coordinates of the position (must be done first):
				var coords = $ (this).find ("span#pos-planet");
				if (coords.length == 0)
					return;
				coords = coords.text ().split (/[\[:\]]/);
				if (coords.length == 0)
					return;
				// Add the missing espionage icon or empty space, whichever is appropriate:
				var firstA = $ (this).find ("td.action a:first");
				if (firstA.length)
				{
					var href = firstA.attr ("href");
					if ((href != null) && (href.length > 0) && (firstA.find ("span.icon_eye").length == 0))
						firstA.before (
							($ (this).find ("td.playername").is (".vacation,.noob")) ?
								'<a></a>' :
								'<a href="javascript:void(0);" onclick="sendShips (6, ' + coords [1] + ", " + coords [2] + ", " + coords [3] + ', 1); return false;">' +
								'<img width="16" height="16" src="data:image/gif;base64,R0lGODlhEAAQAJEDAP///1x2i2+JnQAAACH5BAEAAAMALAAAAAAQABAAAAIrXI6Zpu0P4wMUyFohxs4G+h1eIAhAaVboiZor67YlvMrtRtv6zvf84EMNCgA7">' +
								'</a>'
						);
				}
			});
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();
