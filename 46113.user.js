// ==UserScript==
// @name		UCB Webcast Video Link Extractor
// @namespace		http://hlinzhou.blogbus.com/berkleywebcast
// @description		Extract video links of UC Berkley webcasts.
// @include		http://webcast.berkeley.edu/*
// ==/UserScript==

window.addEventListener(
    'load',
    function() {
	var wholeDocument = document.body.innerHTML;
	var mp4FileRegex = /http:\/\/webcast\.berkeley\.edu\/media\/common\/media\/.*?_opencast_video_itunes-wcb\.mp4/g;
	var links = wholeDocument.match(mp4FileRegex);

	// Create a link with content 'Extract mp4 links', and when it's clicked
	// the mp4 file links in the current page would be shown in the
	// mp4FileLinks div.
	var extractLinks = document.createElement('li');
	extractLinks.innerHTML = '<a href="#" id="extractLinks">[Extract mp4 links]</a>';
	
	// Append extractLinks element to the navigation bar.
	var navigationBar = document.evaluate("//ul[@class='breadcrumb h-menu yellow']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	navigationBar.appendChild(extractLinks);

	// Create the div that would contain all the mp4 file links.
	// Initially it would be hidden.
	var linksDiv = document.createElement('div');
	linksDiv.id = 'mp4FileLinks';
	linksDiv.style.display = 'none';
	document.body.insertBefore(linksDiv, document.body.firstChild);

	// Here comes the event handling part.
	extractLinks.addEventListener('click',
				      function() {
					  linksDiv.innerHTML = '';
					  for (var i = 0; i < links.length; i++) {
					      var link = links[i];
					      var a = '<a href="' + link + '">' + link + '</a><br>';
					      linksDiv.innerHTML += a;
					  }
					 
					  // Add a close button to linksDiv;
					  linksDiv.innerHTML += '<a href="#" id="closeLinksDiv">[close]</a>';
					 
					  // Register event handler for the close button;
					  var closeLinksDiv = document.getElementById('closeLinksDiv');
					  closeLinksDiv.addEventListener('click',
									 function() { linksDiv.style.display = 'none'; },
									 true);

					  // Show linksDiv.
					  linksDiv.style.display = 'block';
				      },
				      true);
    },
    true);

