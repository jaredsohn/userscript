// ==UserScript==
// @name          Last.fm titles with Allmusic 
// @namespace     http://mll02.free.fr
// @description   Shows a link to Allmusic.com next to an artist, album or track's name on artists/albums/tracks pages on last.fm. Version 0.6.
// @include       http://*.last.fm/music/*
// @include       http://last.fm/music/*
// ==/UserScript==

/*
changelog

v0.6
- introduced options optionLinksInSidebar, optionGraphicalLink, optionGraphicalLinkURL, optionTextualLinkString

v0.5
- now places links to albums ans tracks

v0.4
- now uses an image instad of the "{AMG}" string

v0.3
- initial release
*/

(function() 
{

//*********** beginning of OPTIONS ***********

	var optionLinksInSidebar = true; //set to false if you want links only in the title bar and not in the sidebar (default: true)
	var optionGraphicalLink = false; //set to false if want textual links (default: true)
	var optionGraphicalLinkURL = "http://www.allmusic.com/i/pages/site/icons/footer-logo.gif"; //if optionGraphicalLink = true, provide the image URL here (default: "http://www.allmusic.com/i/pages/site/icons/footer-logo.gif")
	var optionTextualLinkString = "[AMG]"; //if optionGraphicalLink = false, make a link with this string.

//************** end of OPTIONS **************


	function getNodeText(node, goDeep)
	{
		var nodeText = node.nodeValue;
		
		if (goDeep && nodeText == null && node.childNodes != null && node.childNodes.length > 0)
		{
			nodeText= "";
			
			for (var i=0; i < node.childNodes.length; ++i)
			{
				nodeText += getNodeText(node.childNodes.item(i), goDeep);	
			}
		}
		return(nodeText == null ? "" : nodeText);
	}


	function getNodeText2(node)
	{
		var nodeText = "";
		
		for (var i = 0; i < node.childNodes.length; ++i)
		{
			nodeText += (node.childNodes[i].nodeValue == null ? "" : node.childNodes[i].nodeValue);
		}
		return(nodeText == null ? "" : nodeText);
	}
	
	
	function makeArtistLink(artistName)
	{
		return makeItemLink(artistName, "1");
	}


	function makeAlbumLink(albumName)
	{
		return makeItemLink(albumName, "2");
	}


	function makeSongLink(songName)
	{
		return makeItemLink(songName, "3");
	}


	function makeItemLink(itemName, itemType)
	/*
	type:
	  - artist: 1
	  - album: 2
	  - song: 3
	*/
	{
		if (itemName != null && itemName.length > 0 && itemName != "Overview" && itemName != "Music")
		{
			var container = document.createElement("span");
			container.setAttribute("style", "display: inline;");
			
			container.appendChild(document.createTextNode(" "));

			var newForm = document.createElement("form");
			newForm.setAttribute("name", "alm_form_" + itemName );
			newForm.setAttribute("action", "http://www.allmusic.com/cg/amg.dll");
			newForm.setAttribute("method", "post");
			newForm.setAttribute("style", "display: inline;");
			newForm.setAttribute("target", "_blank");

			var field_P = document.createElement("input");
			field_P.setAttribute("type", "hidden");
			field_P.setAttribute("name", "P");
			field_P.setAttribute("value", "amg");
			newForm.appendChild(field_P);
			
			var field_uid = document.createElement("input");
			field_uid.setAttribute("type", "hidden");
			field_uid.setAttribute("name", "uid");
			field_uid.setAttribute("value", "SEARCH");
			newForm.appendChild(field_uid);
			
			var field_opt1 = document.createElement("input");
			field_opt1.setAttribute("type", "hidden");
			field_opt1.setAttribute("name", "opt1");
			field_opt1.setAttribute("value", itemType);
			newForm.appendChild(field_opt1);
			
			var field_sql = document.createElement("input");
			field_sql.setAttribute("type", "hidden");
			field_sql.setAttribute("name", "sql");
			field_sql.setAttribute("value", itemName);
			newForm.appendChild(field_sql);

			var newLink = document.createElement("a");
			newLink.setAttribute("href", "javascript:;");
			newLink.setAttribute("onclick", "this.parentNode.submit()");
			
			if ( optionGraphicalLink )
			{
				var newImg = document.createElement("img");
				newImg.setAttribute("src", optionGraphicalLinkURL);
				newImg.setAttribute("style", "display: inline; margin-bottom: -6px; position: relative;"); //height: 13px;width: 9px;");
				newLink.appendChild(newImg);
			} else {
				newLink.appendChild(document.createTextNode(optionTextualLinkString));
			}

			
			newForm.appendChild(newLink);

			container.appendChild(newForm);

			return(container);
		}
		
		return(null);
	}
	
	
	function insertLinks()
	{
		
		var titles = document.getElementsByTagName("h1");
		var node;
		var class;
		var link;
		
		//title bar link
		for (var i = 0; i < titles.length; ++i)
		{
			node = titles[i];
			class = node.getAttribute("class");
			if (class.indexOf("h1artist") >= 0)
			{
				link = makeArtistLink(getNodeText2(node));
				if (link != null)
				{
					node.appendChild(link);
				}
			}
			if (class.indexOf("h1album") >= 0)
			{
				link = makeAlbumLink(getNodeText2(node));
				if (link != null)
				{
					node.appendChild(link);
				}
			}
			if (class.indexOf("h1track") >= 0)
			{
				link = makeSongLink(getNodeText2(node));
				if (link != null)
				{
					node.appendChild(link);
				}
			}
		}

		//sidebar links
		if ( optionLinksInSidebar )
		{
			titles = document.getElementsByTagName("a");
			for (i = 0; i < titles.length; ++i)
			{
				node = titles[i];
				class = node.getAttribute("class");
				if ( class != null)
				{
					if (class.indexOf("miniartist") >= 0)
					{
						link = makeArtistLink(getNodeText(node, true));
						if (link != null)
						{
							if (node.nextSibling == null)
								node.parentNode.appendChild(link);
							else
								node.parentNode.insertBefore(link, node.nextSibling);
						}
					}
					if (class.indexOf("minialbum") >= 0)
					{
						link = makeAlbumLink(getNodeText(node, true));
						if (link != null)
						{
							if (node.nextSibling == null)
								node.parentNode.appendChild(link);
							else
								node.parentNode.insertBefore(link, node.nextSibling);
						}
					}
				}
			}
		}

	}
	
	
	insertLinks();
	
})();