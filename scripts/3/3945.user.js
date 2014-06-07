// ==UserScript==
// @name          Facebookpedia
// @author	      James Pereira
// @namespace     http://www.sawdustbunny.com/
// @description	  Shows Wikipedia info for your interests when you hover over a link. Thanks to Jared Morgenstern for the idea.
// @description   If you want to see info for more than just the 'interests' section, take a look at lines 22-30
// @description   And if you want, "facebook me": facebook.com/profile.php?id=208628
// @include       http://facebook.com/profile.php*
// @include       http://*.facebook.com/profile.php*
// ==/UserScript==

	var atags = document.evaluate('//a[@href]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var reallinks = Array();

	for(var i=0; i<atags.snapshotLength; i++){
		// get search term and current link
		var thislink = atags.snapshotItem(i);
		var text = thislink.innerHTML;
		
		// These are the sections we want to get data for.
		// If you don't want to show wikipedia info for a particular section, put a // before the text on one of the lines.
		// If you do, remove the //'s
		if(
		   thislink.parentNode.parentNode.parentNode.firstChild.innerHTML == "Interests:"       ||
//		   thislink.parentNode.parentNode.parentNode.firstChild.innerHTML == "Favorite Music:"  ||
//		   thislink.parentNode.parentNode.parentNode.firstChild.innerHTML == "Favorite Movies:" ||
//		   thislink.parentNode.parentNode.parentNode.firstChild.innerHTML == "Favorite Books:"  ||
//		   thislink.parentNode.parentNode.parentNode.firstChild.innerHTML == "Favorite TV Shows:" ||
        false){

			var url = 'http://en.wikipedia.org/wiki/' + escape(text);
			var rndnum = Math.floor(Math.random()*100000);
			reallinks[url] = (i + ":" + text + ":" + rndnum);
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {
	      			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        		'Accept': 'application/xml,text/xml'
	    		},
				onload: function(responseDetails) {
					// Get Wikipedia data
					var parser = new DOMParser();
					var dom    = parser.parseFromString(responseDetails.responseText, "application/xml");
					var ptags  = dom.getElementsByTagName('p');

					// If we got the page we were looking for...
  					// Get the next link id
  					var t = reallinks[this.url];
  					var thislinkid = t.split(":")[0];
  					var thistext   = t.split(":")[1];
					var thisrndnum = t.split(":")[2];
					var WPLink     = "WP" + thisrndnum;
					var LNLink     = "LN" + thisrndnum;

					// Assign an id to this link
					atags.snapshotItem(thislinkid).id = LNLink;

					// Set up the wikipedia information div
					var infoDiv = document.createElement('div');
					infoDiv.style.position = "absolute";
					infoDiv.style.background = "lightblue";
					infoDiv.style.display = "none";
					infoDiv.style.border = "3px double blue";
					infoDiv.style.padding = "2px";
					infoDiv.id = WPLink;
															
					// Event listeners for mouseover/mouseout
					document.getElementById(LNLink).addEventListener('mouseover', function(event) { document.getElementById(WPLink).style.display = "block"; }, false);
					document.getElementById(LNLink).addEventListener('mouseout',  function(event) { document.getElementById(WPLink).style.display = "none"; } , false);
					infoDiv.addEventListener('mouseover', function(event) { document.getElementById(WPLink).style.display = "block"; }, false);
					infoDiv.addEventListener('mouseout',  function(event) { document.getElementById(WPLink).style.display = "none"; } , false);

					// Attach infoDiv to this document
					atags.snapshotItem(thislinkid).parentNode.insertBefore(infoDiv, atags.snapshotItem(thislinkid).nextSibling);

					// If this is a content page, else if it's a 'not found' page...
					if(ptags.length > 1){
						// Loop through all the <p> tags and find the one with the id 'bodyContent'. The first child of this will be the opening paragraph.
	  					for(var j=0; j<ptags.length; j++){
		  					if(ptags[j].parentNode.id == 'bodyContent'){			  					

			  					// The data from the <p> tag that we want to display. Only display the first 500 characters.
			  					ptagdata = ptags[j].innerHTML.replace(/(<([^>]+)>)/ig,"");
		  						ptagdata = ptagdata.substring(0, 500);

								infoDiv.innerHTML = "<div>";
		  						infoDiv.innerHTML += ptagdata;
		  						infoDiv.innerHTML += " [<a href=\"http://en.wikipedia.org/wiki/" + thistext + "\" target='_blank'> more </a>]"; 
								infoDiv.innerHTML += "</div>";
								
								
								// BREAK!! Because we found the ptag we want and have inserted it.
		  						break;
	  						}
	  					}
					} else {
						// Link to here to search for wikipedia articles matching this term
						search_link = "http://en.wikipedia.org/wiki/Special:Search?search=" + escape(thistext);

  						infoDiv.innerHTML = "<div>";
  						infoDiv.innerHTML += "No direct matches found for '" + thistext + "', but you can <a href=\"" + search_link + "\" target='_blank'>search for it</a>!";
  						infoDiv.innerHTML += "</div>";
					}
				}
			});
		}
	};
