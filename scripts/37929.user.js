// ==UserScript==
// @name           LastSeeq v1.1
// @description    Download songs from Last.fm
// @include        http://*last.fm/*
// @include        http://*lastfm.*/*
// ==/UserScript==

/**************************************************************
 * Licensed as Creative Commons Attribution-ShareAlike 2.5    *
 * http://creativecommons.org/licenses/by-sa/2.5/             *
 **************************************************************/

(function(){
  /*
       Written by Jonathan Snook, http://www.snook.ca/jonathan
       Add-ons by Robert Nyman, http://www.robertnyman.com
       Rewrite by Lorenz Bauer
     */
  
  // Image is taken from http://www.ineversay.com/my-works/xiao-icon.html
  var searchImage = 'data:image/png;base64,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';
  var trackTypes = new Array('module modulechartstracks', 'module modulechartsartists', 'recentTracksContainer');
  
 function findTracks(type)
 {
	return document.evaluate(
		"//div[@class='" + type + "']//td[@class='subjectCell']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
 }
  
 function addButtons()
 {
	// Create button below the player
	if (location.href.match(/^http:\/\/(www\.)?(last.fm|lastfm.[a-z]{2,3})\/listen/))
	{
		var player = document.evaluate(
			"//div[@id='player']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);
		
		if (player.snapshotLength > 0)
		{
			player = player.snapshotItem(0);
			var node = document.createElement('p');
			var text = document.createTextNode('Search for current track');
				
			node.appendChild(text);
			node.addEventListener('click', playerClickHandler, true);
			node.style.margin = '0.2em';
			node.style.paddingLeft = '20px';
			node.style.height = '16px';
			node.style.cursor = 'pointer';
			node.style.background = 'url(\'' + searchImage + '\') no-repeat';
				
			player.appendChild(node);
		}
	}

	// Create buttons for song listings
	for (type in trackTypes)
	{
		var tracks = findTracks(trackTypes[type]);
			
		for (var i = 0; i < tracks.snapshotLength; i++)
		{
			var track = tracks.snapshotItem(i);
			var node = document.createElement('td');
			var image = document.createElement('img');
				
			image.setAttribute('src', searchImage);
			image.style.cursor = 'pointer';
			image.addEventListener('click', clickHandler, true);
				
			node.appendChild(image);
			node.className = 'playbuttonCell';

			track.parentNode.insertBefore(node, track);
		}
	}
 }
  
 function playerClickHandler(e)
 {
	var playerCtx = unsafeWindow.LFM.Flash.Player.context;
	
	if (!playerCtx.playing)
	{
		alert('No song is currently playing!');
		return;
	}
	
	var artist = playerCtx.currentTrack.creator;
	var title = playerCtx.currentTrack.name;
	
	searchSeeqPod(artist, title);
 }
  
 function clickHandler(evt)
 {
	var tableRow = evt.target.parentNode.parentNode;
	subject = document.evaluate(".//td[@class='subjectCell']//a", tableRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (subject.snapshotLength < 1)
	{
		alert('Sorry, an error has occured!');
		return;
	}
	//GM_log('CH: found ' + subject.snapshotLength + ' match(es)');
	
	var artist, title;
	if (subject.snapshotLength == 2)
	{
		artist = subject.snapshotItem(0).textContent;
		title = subject.snapshotItem(1).textContent;
	}
	else
	{
		// Can be either track title or artist
		//GM_log('Location is ' + location.href);
		
		var re = /\/music\/(.*?)(?:\/.*?)?$/;
		if (re.test(location.href))
		{
			// The artist is in our URL
			artist = re.exec(location.href)[1];
			title = subject.snapshotItem(0).textContent;
		}
		else
		{
			// Subject is only the Artist, send to seeqpod
			artist = encodeURIComponent(subject.snapshotItem(0).textContent);
			GM_openInTab('http://www.seeqpod.com/music/?q=' + artist);
			
			return;
		}
	}
	
	searchSeeqPod(artist, title);
 }
  
 function searchSeeqPod(artist, title)
 {
	artist = decodeURIComponent(artist).replace(/\+/g, ' ');
	title = decodeURIComponent(title).replace(/\+/g, ' ');
	
	//GM_log('Searching for: ' + artist + ' - ' + title);
	var songName = encodeURIComponent(artist + ' ' + title);
	
	GM_xmlhttpRequest({
		method : "GET",
		url :    "http://www.seeqpod.com/api/seeq/search?rm=1&rp=0&rv=0&random=z81gxBxdRa&s=0&n=1&rt=0&q=" + songName,
		onload : getFirstWebsite
	});
 }
  
  function getFirstWebsite(details)
 {
	// Get the filename
	var fileName = /<location>(.*?)<\/location>/.exec(details.responseText);
	
	if(fileName == null)
	{
		alert('Song not found');
		return false;
	}
	else
	{
		fileName = fileName[1];
	}
	    
	GM_openInTab(fileName);
	return;
 }

  addButtons();
})();