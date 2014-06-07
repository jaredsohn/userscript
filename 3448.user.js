// ==UserScript==
// @name          Last.fm with Allmusic
// @namespace     http://mll02.free.fr
// @description   Shows a link to Allmusic.com next to any artist link on last.fm. Version 0.4.1
// @include       http://*.last.fm/*
// @include       http://last.fm/*
// ==/UserScript==

// changelog
// v0.4.1
// - uses a smaller AMG logo (thanks joecan)
// v0.4
// - now uses an image instad of the "{AMG}" string
// v0.3
// - better display even in user pages
// - avoids getting shown on "recommended music" links


(function() 
{

	function isArtistURL(theUrl)
	{
		if (theUrl == null)
			return(false);

		// Looking for "/music/".  If any more slashes are found, then this is not a URL to the artist itself.
		var searchStr = "/music/";
		
		// We don't want links to music recommendation
		if (theUrl.indexOf("/recommended/music/") >= 0) return (false) ;

		var pos = theUrl.indexOf(searchStr);
		// Is the prefix correct?
		if (pos >= 0)
		{
			var temp = theUrl.substring(pos + searchStr.length);
			
			// Are there any more slashes? One more is ok.
			var pos = temp.indexOf("/");
			// If there are no more slashes, then success.
			if (pos == -1)
				return(true);
			temp = temp.substring(pos+1);
			
			// Is there anything left?
			return (temp == null || temp.length == 0);
		}
	}		
	
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
	
	function makeLink(artistName)
	{
		if (artistName != null && artistName.length > 0 && artistName != "Overview" && artistName != "Music")
		{
			var container = document.createElement("span");
			
			container.appendChild(document.createTextNode(" "));

			var newForm = document.createElement("form");
			newForm.setAttribute("name", "alm_form_" + artistName );
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
			field_uid.setAttribute("type", "hidden"); //"submit" (ugly) or "hidden"
			field_uid.setAttribute("name", "uid");
			field_uid.setAttribute("value", "SEARCH");
			newForm.appendChild(field_uid);
			
			var field_opt1 = document.createElement("input");
			field_opt1.setAttribute("type", "hidden");
			field_opt1.setAttribute("name", "opt1");
			field_opt1.setAttribute("value", "1");
			newForm.appendChild(field_opt1);
			
			var field_sql = document.createElement("input");
			field_sql.setAttribute("type", "hidden");
			field_sql.setAttribute("name", "sql");
			field_sql.setAttribute("value", artistName);
			newForm.appendChild(field_sql);

			var newLink = document.createElement("a");
			newLink.setAttribute("href", "javascript:;");
			newLink.setAttribute("onclick", "this.parentNode.submit()");
//			newLink.appendChild(document.createTextNode("{AMG}"));

			var newImg = document.createElement("img");
			newImg.setAttribute("src", "http://allmusic.com/i/pages/site/icons/amg-key.gif");
			newImg.setAttribute("style", "display: inline; margin-bottom: -6px; position: relative;"); //height: 13px;width: 9px;");
			
			newLink.appendChild(newImg);

			newForm.appendChild(newLink);

			container.appendChild(newForm);

			return(container);
		}
		
		return(null);
	}

	function insertLinks()
	{
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isArtistURL(href))
			{
				var link = makeLink(getNodeText(node, true));
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
	
	insertLinks();
	
})();
