// ==UserScript==
// @name           OGame Redesign: Expedition Pictures
// @namespace      Vesselin
// @description    Shows random images in some cases when the expedition brings nothing
// @version        1.06
// @date           2011-06-17
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=showmessage") == -1)
		return;
	var animal = "";
	server = document.location.href.match (/http:\/\/([^\\\/]+[\\\/])/i);
	if (server)
		server = server [1].toLowerCase ().replace (/\\/i, "/");
	if      (server.indexOf ("ogame.ru/")   != -1)
		animal = "Экспедиция не принесла ничего особого, кроме какой-то странной зверушки с неизвестной болотной  планеты.";
	else if (server.indexOf ("ogame.de/")   != -1)
		animal = "Außer einiger kurioser, kleiner Tierchen von einem unbekannten Sumpfplaneten bringt diese Expedition nichts Aufregendes von ihrer Reise mit.";
	else if (server.indexOf ("ogame.fr/")   != -1)
		animal = "Mis à part quelques petits animaux provenant d`une planète marécageuse jusque là inconnue, votre expédition ne ramène rien de spécial.";
	else if (server.indexOf ("ogame.nl/")   != -1)
		animal = "Behalve een bijzonder vreemd klein dier van een onbekende planeet, brengt deze expeditie niets bijzonders mee terug van de reis.";
	else if (server.indexOf ("ogame.pl/")   != -1)
		animal = "Poza osobliwymi małymi zwierzętami pochodzącymi z nieznanej bagiennej planety ekspedycja nie przywiozła z wyprawy niczego groźnego.";
	else if ((server.indexOf ("ogame.us/")  != -1) ||
		 (server.indexOf ("ogame.org/") != -1))
		animal = "Besides some quaint, small pets from a unknown marsh planet, this expedition brings nothing thrilling back from the trip.";
	else
		return;	// Unrecognized language
	// URLs (with "http://" stripped). You can add your own.
	var animals = [
		"strana.az/uploads/posts/2008-10/1224604130_001-2484.jpg",
		"strana.az/uploads/posts/2008-10/1224604152_002-2434.jpg",
		"strana.az/uploads/posts/2008-10/1224604148_003-2406.jpg",
		"strana.az/uploads/posts/2008-10/1224604175_004-2413.jpg",
		"strana.az/uploads/posts/2008-10/1224604130_005-2388.jpg",
		"strana.az/uploads/posts/2008-10/1224604150_006-2343.jpg",
		"strana.az/uploads/posts/2008-10/1224604164_007-2225.jpg",
		"strana.az/uploads/posts/2008-10/1224604110_008-2075.jpg",
		"strana.az/uploads/posts/2008-10/1224604198_009-1884.jpg",
		"strana.az/uploads/posts/2008-10/1224604127_010-1665.jpg",
		"strana.az/uploads/posts/2008-10/1224604194_011-1462.jpg",
		"strana.az/uploads/posts/2008-10/1224604134_012-1312.jpg",
		"strana.az/uploads/posts/2008-10/1224604141_013-1123.jpg",
		"strana.az/uploads/posts/2008-10/1224591363_005-2394.jpg",
		"image2.etsy.com/il_430xN.24424438.jpg",
		"www.toyarchive.com/STAForSale/NEW2001+/Aliens/FigBullLoose1a.jpg",
		"rookery2.viary.com/storagev12/932500/932750_4aed_625x1000.jpg",
		"danielladooling.com/sculpture/alienanimals/images/01_FD-3-front-view.jpg",
		"zuzutop.com/wp-content/uploads/2009/07/cute-animals-spiders-2.jpg"
	];
	var msgId = parseInt (document.location.href.match (/&msg_id=(\d+)/) [1]);
	var divs = document.getElementsByTagName ("div");
	var pictureURL = null;
	for (var i = 0; i < divs.length; i++)
	{
		var currentDiv = divs [i];
		if (currentDiv.className == "note")
		{
			if ((animal != "") && (currentDiv.firstChild.nodeValue.indexOf (animal) != -1))
				pictureURL = animals [msgId % animals.length];
			if (pictureURL != null)
			{
				var picture = document.createElement ("img");
				picture.setAttribute ("src", "http://" + pictureURL);
				var center = document.createElement ("center");
				var p = document.createElement ("p");
				p.appendChild (picture);
				center.appendChild (p);
				var div = document.createElement ("div");
				div.appendChild (center);
				currentDiv.appendChild (div);
			}
		}
	}
}
)();
