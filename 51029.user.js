// ==UserScript==
// @name           Gamma Addon
// @namespace      aetools.uuuq.com
// @description    Cowbacca's Gamma Addon
// @include        http://gamma.astroempires.com/*
// ==/UserScript==

	function ajaxFunction(x)
	{
	if(!x)
	{
		function processResponse()
		{
			if(xmlhttp.readyState==4)
		  {
			  alert(xmlhttp.responseText);
		  }
		}
		var ownerguildfleet = 0;
		var otherfleet = 0;
		var playername = document.getElementsByTagName("tbody")[7].childNodes[7].childNodes[1].firstChild.firstChild.nodeValue;
		var guildtaglength = playername.search("]");
		var playertag = playername.substring(1,guildtaglength);
		var myurl = 'http://durinsbeard.dyndns.org/time.php';
		if(document.getElementsByTagName("table")[2].childNodes.length == 2)
		{
		var loc = document.getElementsByTagName("table")[2].childNodes[1].childNodes[1].firstChild.firstChild.firstChild.nodeValue;
		}
		else
		{
		var loc = document.getElementsByTagName("table")[2].firstChild.childNodes[1].childNodes[1].firstChild.firstChild.nodeValue;
		}
		var galaxy = loc.substring(1,3);
		var region = loc.substring(4,6);
		var system = loc.substring(7,9);
		var base = loc.substring(10,12);
		var fleetowner = new Array();
		if(document.getElementsByTagName("tbody").length == 10)
		{
			var structures = document.getElementsByTagName("tbody")[9].innerHTML;
			var numfleets = 0;
		}
		else if(document.getElementsByTagName("tbody").length == 12)
		{
			var numfleets = document.getElementsByTagName("tbody")[9].childNodes.length;
			var fleetsloc = 9;
			var structures = document.getElementsByTagName("tbody")[11].innerHTML;
		}
		else
		{
			var numfleets = document.getElementsByTagName("tbody")[11].childNodes.length;
			var fleetsloc = 11;
			var structures = document.getElementsByTagName("tbody")[13].innerHTML;
		}
		
		for(i = 1; i < numfleets; i++)
		{
			fleetowner[i] = document.getElementsByTagName("tbody")[fleetsloc].childNodes[i].childNodes[1].firstChild.firstChild.nodeValue;
			var guildtaglength = fleetowner[i].search("]");
			var fleettag = fleetowner[i].substring(1,guildtaglength);
			var fleetsize = document.getElementsByTagName("tbody")[fleetsloc].childNodes[i].childNodes[3].firstChild.firstChild.nodeValue;
			fleetsize = fleetsize * 1
			if (fleettag == playertag)
			{
		
				ownerguildfleet = ownerguildfleet + fleetsize;
			}
			else
			{
				otherfleet = otherfleet + fleetsize
			}
		}
		
		var astroterrain = document.getElementsByTagName("table")[3].firstChild.firstChild.firstChild.firstChild.childNodes[6].nodeValue;
		var astrotype = document.getElementsByTagName("table")[3].firstChild.firstChild.firstChild.firstChild.childNodes[2].nodeValue;
		var economy = document.getElementsByTagName("tbody")[7].childNodes[4].childNodes[1].firstChild.nodeValue;
		var position = loc.charAt(10);
		if(document.getElementsByTagName("tbody")[7].childNodes[8].childNodes[1].nodeValue)
		{
			var occupier = document.getElementsByTagName("tbody")[7].childNodes[8].childNodes[1].firstChild.firstChild.nodeValue;
		}
		else
		{
			var occupier = "none";
		}
		}
	else
	{
		var astrotype = document.getElementsByTagName("tbody")[2].firstChild.firstChild.firstChild.childNodes[2].nodeValue;
		var astroterrain = document.getElementsByTagName("tbody")[2].firstChild.firstChild.firstChild.childNodes[6].nodeValue;
		var locationStr = document.getElementsByTagName("center")[0].childNodes[7].nodeValue;
		var loc = locationStr.substring(13,25);
		var galaxy = loc.substring(1,3);
		var region = loc.substring(4,6);
		var system = loc.substring(7,9);
		var base = loc.substring(10,12);
		var position = loc.charAt(10);
		var economy = 0;
		var ownerguildfleet = 0;
		var playername = "-";
		var structures = "-";
		var otherfleet = 0;
		if(document.getElementsByTagName("tbody").length == 7)
		{	
			var fleetowner = new Array();
			var numfleets = document.getElementsByTagName("tbody")[6].childNodes.length;
			for(i = 1; i < numfleets; i++)
			{
				fleetowner[i] = document.getElementsByTagName("tbody")[6].childNodes[i].childNodes[1].firstChild.firstChild.nodeValue;
				var fleetsize = document.getElementsByTagName("tbody")[6].childNodes[i].childNodes[3].firstChild.firstChild.nodeValue;
				fleetsize = fleetsize * 1;
				otherfleet = otherfleet + fleetsize;	
			}
		}
		
		
	}
		//alert(myurl);
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://aetools.uuuq.com/dbaddingscript.php',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: 'loc=' + loc + '&playername=' + playername + '&astrotype=' + astrotype + '&astroterrain=' + astroterrain + '&economy=' + economy + '&ownerguildfleet=' + ownerguildfleet + '&otherfleet=' + otherfleet + '&structures=' + structures+ '&position=' + position + '&galaxy=' + galaxy + '&region=' + region + '&system=' + system + '&base=' + base,
    onload: function(responseDetails) {
		//alert(responseDetails.responseText);
    }
});
	

	}
	var searchStrA = "base.aspx";
	var searchStrB = "view";
	var url = window.location.href;
	if(url.search(searchStrA) != -1 && url.search(searchStrB) == -1)
	{
		ajaxFunction(0);
	}
	var searchStrC = "loc=";
	var len = document.getElementsByTagName("tbody").length;
	if(len == 5)
	{
		var baseloc = 4;
	}
	else
	{
		var baseloc = 6;
	}
	if(url.search(searchStrC) != -1 && document.getElementsByTagName("tbody")[baseloc].firstChild.firstChild.firstChild.nodeValue != "Base")
	{
		ajaxFunction(1);
	}
	var logout = document.getElementsByTagName("a")[10];
	var link= document.createElement("A");
	var url = "http://aetools.uuuq.com/database.php";
	link.setAttribute("href",url);
	link.setAttribute("target","blank");
	var txt = document.createTextNode("Guild Database");
	link.appendChild(txt);
	logout.parentNode.insertBefore(link,logout);
	var txt = document.createTextNode(" - ");
	logout.parentNode.insertBefore(txt,logout);