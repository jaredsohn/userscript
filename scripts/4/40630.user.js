// ==UserScript==
// @name           Webscription direct links
// @version        1.0
// @namespace      webscriptionlinks
// @description    Webscription direct links (Mobipocket/Palm/Kindle format) when on the My Books page for downthemall
// @include        https://www.webscription.net/c-60-my-books.aspx*
// ==/UserScript==

// collect all the links
links = document.getElementsByTagName('a');
if(links != null)
{
	for(var i=0; i < links.length; i++)
	{
		// If this is a book page.  (All book pages start with p-### where ### is the product number)
		// the / at the beginning requires us to be sure it's right after the site address, and is just the page name
		// the aspx at the end, ensures that the page is indeed the format we expect
		if(links[i].href.match(/\/p-.*aspx$/i) != null)
		{
			// If this is the text that says download, then grab the real link
			// otherwise, leave it alone.
			if(links[i].innerHTML.indexOf('Down<br>load') != -1)
				// Needed to be broken into a seperate function, so that the link is in a different scope
				// as GM_xmlhttpRequest is asyncronous, and the loop will likely have finished
				// by the time that the first page retrieval is done.
				getpage(links[i]);
		}
	}
}

function getpage(link)
{
	// Retrieve the linked page, call onload when it's available
	GM_xmlhttpRequest({
		method:"GET",
		url: link.href,
		onload: function(result)
		{
			// Split the resulting text into an easy to access array
			lines = result.responseText.split("\n");
			for (var j = 0; j < lines.length; j++)
			{
				// Grab a local copy of the var, so I dont have to use array notation constantly :)
				var line = lines[j];
				// Find the start position based on the text at the beginning of the link
				var spos = line.indexOf('SendFile.aspx');
				// Find the end position of the link, using P as our key to indicate the format we're interested in
				var epos = line.indexOf('format=P');
				// If we have both a start position and end position, then we're good to extract the link we need
				if((spos != -1) && (epos != -1))
				{
					// Increment the position past the search text for the end, so we have the actual ending location
					epos = epos + 8;
					// Extract the actual link
					var newlink = line.substring(spos, epos);
					// Replace the &amp; with & to combat the html conversion that was done to us.
					// TODO: I know there's a function to do this for all html codes, but I cant recall it atm.
					newlink = newlink.replace(/\&amp\;/g, "&");
					// Actually replace the link in our My Books page with the real link.
					link.href=newlink;
					// And we're done, stop looking
					break;
				}
			}		
		}
	});
}
