// ==UserScript==
// @name           OGame Redesign: Planet Navigation Keys
// @description    Adds previous/next planet buttons to the planet selector
// @namespace      Vesselin
// @version        1.06
// @date           2011-10-19
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=search*
// @exclude        http://*.ogame.*/game/index.php?page=logout*
// @exclude        http://*.ogame.*/game/index.php?page=buddies*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @exclude        http://*.ogame.*/game/index.php?page=payment*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=traderlayer*
// @exclude        http://*.ogame.*/game/index.php?page=rocketlayer*
// @exclude        http://*.ogame.*/game/index.php?page=searchLayer*
// @exclude        http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude        http://*.ogame.*/game/index.php?page=station*&openJumpgate=1*
// ==/UserScript==

(function ()
{
	var url = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((url.indexOf ("/game/index.php?page=")                < 0) ||
	    (url.indexOf ("&openJumpgate=1")                     >= 0) ||
	    (url.indexOf ("/game/index.php?page=search")         >= 0) ||
	    (url.indexOf ("/game/index.php?page=logout")         >= 0) ||
	    (url.indexOf ("/game/index.php?page=buddies")        >= 0) ||
	    (url.indexOf ("/game/index.php?page=notices")        >= 0) ||
	    (url.indexOf ("/game/index.php?page=payment")        >= 0) ||
	    (url.indexOf ("/game/index.php?page=showmessage")    >= 0) ||
	    (url.indexOf ("/game/index.php?page=traderlayer")    >= 0) ||
	    (url.indexOf ("/game/index.php?page=searchLayer")    >= 0) ||
	    (url.indexOf ("/game/index.php?page=rocketlayer")    >= 0) ||
	    (url.indexOf ("/game/index.php?page=globalTechtree") >= 0))
		return;
	const min = "data:image/gif;base64," +
		"R0lGODlhDgALAOYAAN2YJt9yONpTC96iMN+POd+OOd54PN1zNt53Od53O995QN+FOt5xNt5qLd1q" +
		"Ld6cKdxqFt17H9lgE95tMd10M950Nt6bKt92MtpaENxqKtpTDNlZEtxzNuCKQ9tjGN+QO9tbFd93" +
		"N92AIN+CRtx/HN+ESttXE92XJd9vM9pcEN6gLdx1HNtaEt6rMN98Ot2PIdxwLNlUENtmENpVEt5s" +
		"L9ttGttTC918Idx2G918IN55Pd6jMd9wN9tvHNtjFt5tLd94PN5qLtxzMdthFdpnGd1sMOCIQN16" +
		"H9pcEt19It18M9xuHN+kMt+EO9xxFt51NtptGdxyHtlWEt95P95zNt1zN91yNttqFtx3G+CGTd2A" +
		"Jdx5Ht2ANNpWDtx4Hd+VON1+I9+PO9peEdtrGN+SPNpWEttfEt6dKuB/Q9pvHHhBJN+MNv///wAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
		"BAAAAAAALAAAAAAOAAsAAAePgGpkH2EEBWtrh4hfak08AQEMKBM0RUENDj9oRgkGQAlsbE8UoUIX" +
		"Ix1TCgqhOgahCAguWQtVVqEcB6EHFVQhJRAgoTEzoWUmG1IsGTJIGKECGqE2Al1mME4eQxKhYimh" +
		"PkRLSiQ9NWNXoVBpoVErXC9HW1g4XhFgWkk3OSIEag8ATgCwcEbFgB1MBrRQEwgAOw==";
	const max = "data:image/gif;base64," +
		"R0lGODlhDgALAOYAAN2YJt9yONpTC96iMN+POd+OOd54PN1zNt53Od53O995QN+FOt5xNt5qLd1q" +
		"Ld6cKdxqFt17H9lgE95tMd10M950Nt6bKt92MtpaENxqKtpTDNlZEtxzNuCKQ9tjGN+QO9tbFd93" +
		"N92AIN+CRtx/HN+ESttXE92XJd9vM9pcEN6gLdx1HNtaEt6rMN98Ot2PIdxwLNlUENtmENpVEt5s" +
		"L9ttGttTC918Idx2G918IN55Pd6jMd9wN9tvHNtjFt5tLd94PN5qLtxzMdthFdpnGd1sMOCIQN16" +
		"H9pcEt19It18M9xuHN+kMt+EO9xxFt51NtptGdxyHtlWEt95P95zNt1zN91yNttqFtx3G+CGTd2A" +
		"Jdx5Ht2ANNpWDtx4Hd+VON1+I9+PO9peEdtrGN+SPNpWEttfEt6dKuB/Q9pvHHhBJN+MNv///wAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
		"BAAAAAAALAAAAAAOAAsAAAeOgGpfa4QFhQRhH2RqaD8ODUFFNBMoDAEBPE0jF0JsbBRPnglABglG" +
		"WS4ICJ4GOp4KClMdJSFUFQeeBxyeVlULGSxSGyZlnjMxniAQMGZdAjaeGgKeGEgySktEPp4pYp4S" +
		"Qx5OXCtRnmlQnldjNT0kBCI5N0laYBFeOFhbRy9qLQNMdgxQccYCgBMAHqgJBAA7"
	var unsafe = window;
	try
	{
		unsafe = unsafeWindow
	}
	catch (e)
	{
	}
	var divCountColonies = document.getElementById ("countColonies");
	if (divCountColonies == null)
		return;
	var myAs = divCountColonies.parentNode.getElementsByTagName ("a");
	if (myAs.length < 2)
		return;
	var planetLinks = new Array ();
	var planetNames = new Array ();
	var planetCoords = new Array ();
	var activePlanet = -1;
	var j = 0;
	var onMoon = unsafe.resourceTickerMetal ["production"] <= 0;
	for (var i = 0; i < myAs.length; i++)
	{
		var thisA = myAs [i];
		if ((thisA.className.indexOf ("planetlink") > -1) || (thisA.className.indexOf ("moonlink") > -1))
		{
			planetLinks.push (thisA);
			var mySpans = thisA.getElementsByTagName ("span");
			if (mySpans.length > 0)
			{
				planetNames.push (mySpans [0].textContent);
				planetCoords.push (mySpans [1].textContent);
			}
			else
			{
				var title = thisA.getAttribute ("title").replace (/\|<b>(.+)<\/b>/i, "$1");
				planetNames.push (title);
				planetCoords.push (planetCoords [planetCoords.length - 1]);
			}
			if ((thisA.className.indexOf ("active") > -1) && ! onMoon)
				activePlanet = j;
			else if ((thisA.className.indexOf ("moonlink") > -1) && (i > 0) &&
				 (myAs [i - 1].className.indexOf ("active") > -1) && onMoon)
				activePlanet = j;
			j++;
		}
	}
	var numPlanets = planetLinks.length;
	if ((numPlanets < 2) || (activePlanet < 0))
		return;
	var myCenter = document.createElement ("center");
	function createButton (left)
	{
		var index = ((left) ? (activePlanet + numPlanets - 1) : (activePlanet + 1)) % numPlanets;
		var myA = document.createElement ("a");
		var myImg = document.createElement ("img");
		//myImg.setAttribute ("src", "img/navigation/icon-" + ((left) ? "min" : "max") + "-small.gif");
		myImg.setAttribute ("src", (left) ? min : max);
		myA.appendChild (myImg);
		myA.href = planetLinks [index].href;
		myA.title = "|" + planetNames [index] + " " + planetCoords [index];
		myA.className = "tipsStandard";
		return myA;
	}
	myCenter.appendChild (createButton (true));
	myCenter.appendChild (document.createTextNode (" "));
	myCenter.appendChild (createButton (false));
	divCountColonies.appendChild (myCenter);
}
) ();
