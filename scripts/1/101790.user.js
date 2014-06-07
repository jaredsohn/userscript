// ==UserScript==
// @name Remove Broken Fonts
// @namespace www.jcbusch.de
// @description Removes crappy rendered fonts stand-ins used by Ubuntu from all CSS for smoother fonts. Currently "Helvetica" and "Lucida Grande" are removed.
// @include *
// @version 1.1
// @copyright Creative Commons Attribution-ShareAlike : CC BY-SA 
// ==/UserScript==
// newest version can always be found at http://userscripts.org/scripts/show/101790

// add trim() to String, if not already natively there
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

// takes a fontFamily style definition and removes unwanted fonts
function modifyFontFamily(fontStyle)
{
	var f = fontStyle.split(",");
	var ret = "";
	for (x in f)
	{
		if (f[x].toLowerCase().trim() == "helvetica" || f[x].toLowerCase().trim() == "\"lucida grande\"")
		{
			continue;
		}
		else
		{
			ret = ret.concat(f[x].trim() + ",");
		}
	}
	
	// strip trailing ','
	ret = ret.substring(0, ret.length - 1);
	return ret;
}

// called _after_ page completely loaded (hookup below). otherwise we
// run the risk of accessing style sheets that are not yet fully
// processed, resulting in error messages and an aborted script
function main()
{
	var x = 0;
	for (x = 0; x < document.styleSheets.length; ++x)
	{
		try
		{
			var theRules = document.styleSheets[x].cssRules;
		}
		catch (err)
		{
			if (err.name == "NS_ERROR_DOM_SECURITY_ERR")
			{
				// the current sheet is hosted on another domain, the
				// Same Origin Policy will not allow access
				// skip the sheet
				GM_log("Style sheet '" + document.styleSheets[x].href + "' hosted on remote domain; skipping sheet.");
				continue;						
			}
			else
			{
				// some other error
				throw err;
			}
		}
		var y = 0;
		for (y = 0; y < theRules.length; ++y)
		{
			if ('style' in theRules[y])
			{
				if (theRules[y].style.fontFamily.length > 0)
					theRules[y].style.fontFamily = modifyFontFamily(theRules[y].style.fontFamily);
			}
		}
	}
}

// event hookup for calling main() after page load
window.addEventListener("load", main, false);
