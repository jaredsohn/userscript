// ==UserScript==
// @name           OGame: Fix Login Page's Universe Names
// @namespace      Vesselin
// @version        1.01
// @date           2010-06-21
// @description    Fixes the login page to set named instead of numbered universes.
// @include        http://*ogame.*/
// @include        http://*ogame.*/index.php
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("ogame.") == -1)
		return;
	var uniNames = [
		["uni101", "andromeda"],
		["uni102", "barym"],
		["uni103", "capella"],
		["uni104", "draco"],
		["uni105", "electra"],
		["uni106", "fornax"],
		["uni107", "gemini"],
		["uni108", "hydra"],
		["uni109", "io"],
		["uni110", "jupiter"],
		["uni111", "kassiopeia"],
		["uni112", "leo"],
		["uni113", "mizar"],
		["uni114", "nekkar"],
		["uni115", "orion"],
		["uni116", "pegasus"],
		["uni117", "quantum"],
		["uni118", "rigel"],
		["uni119", "sirius"],
		["uni120", "taurus"],
		["uni121", "ursa"],
		["uni122", "vega"],
		["uni123", "wasat"],
		["uni124", "xalynth"],
		["uni125", "yakini"],
		["uni126", "zagadra"]
	];
	var uniURLs = document.getElementById ("serverLogin");
	if ((uniURLs == null) || (uniURLs == undefined))
		return;
	for (var i = 0; i < uniURLs.length; i++)
	{
		var uni = uniURLs.options [i].value.toLowerCase ().split (".") [0];
		for (var j = 0; j < uniNames.length; j++)
		{
			if (uni == uniNames [j] [0])
			{
				uniURLs.options [i].value = uniURLs.options [i].value.replace (uni, uniNames [j] [1]);
				break;
			}
		}
	}
}
) ();
