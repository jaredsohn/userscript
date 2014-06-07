// ==UserScript==
// @name           OGame Redesign: Resources on Moon Color
// @description    Remove the red color from the resources stored on a moon.
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        2.00
// @date           2012-10-29
// @include        http://*.ogame.*/game/index.php*page=*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php") < 0)
		return;
	var myFunc = (function ()
	{
		var version = $ ("meta[name='ogame-version']");
		if (version.length == 0)
			return;
		version = version.attr ("content");
		if (version === undefined)
			return;
		var versionMajor = version.split (".");
		if (versionMajor.length < 1)
			return;
		versionMajor = parseInt (versionMajor [0], 10);
		if (versionMajor < 5)
			return;
		if ($ ("meta[name='ogame-planet-type']").attr ("content") != "moon")
			return;
		var oldReloadResources = reloadResources;
		reloadResources = function reloadResources (d, f)
		{
			var e = (typeof (d) == "string") ? $.parseJSON (d) : d;
			if (typeof (metalTicker) != "undefined")
				timerHandler.removeCallback (metalTicker.intervalObj);
			if (typeof (crystalTicker) != "undefined")
				timerHandler.removeCallback (crystalTicker.intervalObj);
			if (typeof (deuteriumTicker) != "undefined")
				timerHandler.removeCallback (deuteriumTicker.intervalObj);
			$ ("#resources_metal").html (e.metal.resources ["actualFormat"]);
			$ ("#resources_metal").removeAttr ("class");
			e.metal.tooltip = e.metal.tooltip.replace (/overmark/gm, "").replace (/middlemark/gm, "");
			changeTooltip($("#metal_box"), e.metal.tooltip);
			$ ("#resources_crystal").html (e.crystal.resources ["actualFormat"]);
			$ ("#resources_crystal").removeAttr ("class");
			e.crystal.tooltip = e.crystal.tooltip.replace (/overmark/gm, "").replace (/middlemark/gm, "");
			changeTooltip ($ ("#crystal_box"), e.crystal.tooltip);
			$ ("#resources_deuterium").html (e.deuterium.resources ["actualFormat"]);
			$ ("#resources_deuterium").removeAttr ("class");
			e.deuterium.tooltip = e.deuterium.tooltip.replace (/overmark/gm, "").replace (/middlemark/gm, "");
			changeTooltip ($ ("#deuterium_box"), e.deuterium.tooltip);
			$ ("#resources_energy").html (e.energy.resources ["actualFormat"]);
			$ ("#resources_energy").removeAttr ("class");
			e.energy.tooltip = e.energy.tooltip.replace (/overmark/gm, "").replace (/middlemark/gm, "");
			changeTooltip ($ ("#energy_box"), e.energy.tooltip);
			$ ("#resources_darkmatter").html (e.darkmatter.resources ["actualFormat"]);
			$ ("#resources_darkmatter").attr ("class", e.darkmatter ["class"]);
			changeTooltip ($ ("#darkmatter_box a"), e.darkmatter.tooltip);
			honorScore = e.honorScore;
			darkMatter = e.darkmatter.resources ["actual"];
			if (typeof (f) == "function")
				f (e);
		}
		initAjaxResourcebox ();
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
}) ();
