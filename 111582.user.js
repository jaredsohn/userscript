// ==UserScript==
// @name           ogame input select
// @namespace      marshen
// @description    Instead of clearing the text in an input when you enter it the text will get selected.
// @include        http://*.ogame.gameforge.com/game/index.php*
// ==/UserScript==

(function()
{
	var version = 59999; // The game version for which this script is developed.
	
	/**
	 * Checks whether the game version is less or equal to the scripts version.
	 * @param	pVersion	The version to check for.
	 * @return	True if the version is ok.
	 */
	function versionCheck(pVersion)
	{
		var version = document.getElementsByName('ogame-version');
		if (version.length == 1 && getVersion(pVersion) < getVersion(version[0].getAttribute('content')))
		{
			return false;
		}
		return true;
	}
	
	/**
	 * Parses a given version to an integer.
	 * @param	pVersion	The version string to parse.
	 * @return	The parsed version.
	 */
	function getVersion(pVersion)
	{
		var version = pVersion.toString().split('.');
		if (version.length == 3)
		{
			// This is why I would like to see the version as a number because otherwise you can't compare it!
			var intversion = parseInt(version[0]) * 10000 + parseInt(version[1]) * 100 + parseInt(version[2]);
			return intversion;
		}
		return parseInt(pVersion);
	}
	
	/**
	 * Checks if an value is present in the array.
	 * @param	value	The value it should contain.
	 * @param	array	The array to check.
	 * @return	The first index or -1 if not found.
	 */
	function inArray(value, array)
	{
		if (array.indexOf)
		{
			return array.indexOf(value);
		}
		for (var i = 0, length = array.length; i < length; i++)
		{
			if (array[i] == value)
			{
				return i;
			}
		}
		return -1;
	}
	
	// Start script
	if (versionCheck(version))
	{
		// Ids of additional inputs that should be manipulated.
		var whitelist = [
			'galaxy',
			'metal',
			'crystal',
			'deuterium',
			'1_value', // merchant met
			'2_value', // merchant cry
			'3_value', // merchant deut
		];
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			if ((input.getAttribute('onfocus') && input.getAttribute('onfocus').indexOf('clearInput') > -1) || inArray(input.getAttribute('id'), whitelist) > -1)
			{
				input.setAttribute('onfocus', 'this.select();');
			}
		}
		var galaxy = document.getElementById('galaxy');
		if (galaxy)
		{
			galaxy.setAttribute('onclick', '');
		}
	}
	else
	{
		// Not very elegant to notify the user because this may annoy.
		alert('"ogame input select" is not compatible with this ogame version.\n\nPlease disable and/or update the script.');
	}
})();