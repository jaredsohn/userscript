// ==UserScript==
// @name          IMDB - Mininova searcher v 1.0
// @namespace     www.bajal.co.nr
// @description   Adds a link to search torrents directly from imdb
// @include       http://www.imdb.com/*
// ==/UserScript==

	//Retrieve Movie Name
	if(document.getElementById('tn15crumbs'))	
	var movieName = document.getElementById('tn15crumbs').getElementsByTagName('b')[0].innerHTML;
	
	// Prepare search string without year
	if(movieName != null)
	var mnString = movieName.indexOf('(')>-1 ? movieName.substring(0,movieName.indexOf('(')-1) : movieName;
	
	selObj = document.createElement("select");
	selObj.setAttribute("id","selTorrent");
	selObj.setAttribute("style", "color:#990033;font-weight:bold;background-color:#FFFF99")>
	addOptionToList(selObj,'Mininova', 'mininova');
	addOptionToList(selObj,'Pirate Bay', 'piratebay');
	//addOptionToList(selObj,'Snarf-It', 'snarfit');
	addOptionToList(selObj,'Iso Hunt', 'isohunt');
	addOptionToList(selObj,'TorrentPortal', 'torrentportal');
	addOptionToList(selObj,'TorrentSpy', 'torrentspy');
	addOptionToList(selObj,'Torrentz', 'torrentz');
	addOptionToList(selObj,'BtJunkie', 'btjunkie');

	btnObj =  document.createElement("input");
	btnObj.setAttribute("type","button");
	btnObj.setAttribute("id","btn");
	btnObj.setAttribute("value"," Go ");

	window.addEventListener('load',function(){
		if(document.forms[1])
		{
			document.forms[1].appendChild(selObj);
			document.forms[1].appendChild(btnObj);
		}	
	},
	true);

	btnObj.addEventListener('click',function(){
	if(document.getElementById('selTorrent').value=='mininova')
		window.open("http://www.mininova.org/search/?search="+mnString);
	else if(document.getElementById('selTorrent').value=='piratebay')
		window.open("http://thepiratebay.org/search/"+mnString+"/0/99/0");

	else if(document.getElementById('selTorrent').value=='isohunt')
		window.open("http://isohunt.com/torrents/?ihq="+mnString);
	else if(document.getElementById('selTorrent').value=='torrentportal')
		window.open("http://torrentportal.com/torrents-search.php?search="+mnString);
	else if(document.getElementById('selTorrent').value=='torrentspy')
		window.open("http://www.torrentspy.com/");
	else if(document.getElementById('selTorrent').value=='torrentz')
		window.open("http://www.torrentz.com/search?q="+mnString);
	else if(document.getElementById('selTorrent').value=='btjunkie')
		window.open("http://btjunkie.org/search?q="+mnString);


	}, true);
	


	function addOptionToList(selectbox,text,value)
	{
	var optn = document.createElement("option");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
	}

	