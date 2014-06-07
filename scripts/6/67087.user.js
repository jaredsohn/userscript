// ==UserScript==
// @name           SteamID Replacer
// @include        *
// @description    Replaces all SteamID text with a url to the profile.
// @version        0.1
// @author         echo1001
// @date           01-23-2010
// ==/UserScript==

function convert(steamID)
{
	var parts = steamID.split(":");

	var iServer = Number(parts[1]);
	var iAuthID = Number(parts[2]);

	var converted = "76561197960265728"

	lastIndex = converted.length - 1

	var toAdd = iAuthID * 2 + iServer;
	var toAddString = new String(toAdd)
	var addLastIndex = toAddString.length - 1;

	for(var i=0;i<=addLastIndex;i++)
	{
		var num = Number(toAddString.charAt(addLastIndex - i));
		var j=lastIndex - i;

		do
		{
			var num2 = Number(converted.charAt(j));
			var sum = num + num2;

			converted = converted.substr(0,j) + (sum % 10).toString() + converted.substr(j+1);

			num = Math.floor(sum / 10);
			j--;
		}
		while(num);

	}

	return converted;
}

var Srch = /STEAM_[0-9]:[0-9]{1,}:[0-9]{1,}/gi
var Ignore = Array();
function d()
{
	var original = document.body.innerHTML;
	var search = original.match(Srch);
	if (search)
	{
		for (var i = 0; i < search.length; i++)
		{
			var mtch = search[i];
			if (!Ignore[mtch])
			{
				Ignore[mtch] = true;

				original = original.replace(new RegExp(mtch, "g"), "<a target='_blank' href='http://steamcommunity.com/profiles/" + convert(mtch) + "'>" + mtch + "</a>");
			}
		}
		document.body.innerHTML = original;
	}
};
d();