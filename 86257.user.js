// ==UserScript==
// @name           OGame Redesign: Color the Message Subjects
// @description    Colors the Subject of some messages
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.11
// @date           2013-08-16
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=messages") == -1)
		return;
	var espAction = [
		"Espionage action",		// org, us
		"Špiónská akce",		// cz
		"Spionageaktion",		// de
		"Activité d`espionnage",	// fr
		"Δράση κατασκοπείας",		// gr
		"Akcija špijunaže",		// hr
		"Akcja szpiegowska",		// pl
		"Ataque de espião",		// pt
		"Шпионаж",			// ru
		"Acción de espionaje"		// sp
	];
	const espionageColor = "yellow";
	const expeditionColor = "darkorchid";
	const privateMessageColor = "green";
	const circularMessageColor = "#0044FF";
	var $;
	try
	{
		$ = unsafeWindow.$;
	}
	catch (e)
	{
		$ = window.$;
	}
	$ (document).ajaxSuccess (function (e, xhr, settings)
	{
		if (settings.url.indexOf ("page=messages") < 0)
			return;
		if (document.getElementById ("mailz") == null)
			return;
		$ (this).find ("table#mailz.list td.subject a").each (function ()
		{
			var theHref = $ (this).attr ("href");
			if (theHref.indexOf ("cat=2") >= 0)
				$ (this).css ("color", circularMessageColor);
			else if ((theHref.indexOf ("cat=6") >= 0) || (theHref.indexOf ("cat=1") >= 0))
				$ (this).css ("color", privateMessageColor);
			else if (theHref.indexOf ("cat=8") >= 0)
				$ (this).css ("color", expeditionColor);
			else if (theHref.indexOf ("cat=4"))
				for (var j in espAction)
					if (($ (this).text ().indexOf (espAction [j]) >= 0) ||
					    ($ (this).find ("span.espionagereport").length > 0))
					{
						$ (this).css ("color", espionageColor);
						$ (this).find ("span.espionagereport").attr ("class", "");
						break;
					}
		});
	});
}) ();
