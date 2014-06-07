// ==UserScript==

// @name           Google Images NoFrame link

// @author         Ricardo Ferreira

// @version        20100407

// @description    Adds a noframe link to images in Google Images search results

// @include        http://images.google.*/*
// @include        http://www.google.*/images?*

// ==/UserScript==

// Version	   1.0

// Credits	   Thanks to Trixie



(function() 

{

	function GetImageUrl(theUrl)

	{

		if (theUrl == null)

			return(false);



		// Looking for "imgurl=..."

		var searchStr = "imgurl=";

		var pos = theUrl.indexOf(searchStr);

		var temp = null;



		if (pos >= 0)

		{

			var pos1 = theUrl.indexOf("&");

	    		temp = theUrl.substring(pos + searchStr.length, pos1);

		}

		

		return temp;

	}

	

	function MakeNoFrameLink(url)

	{

	    if (url != null && url.length > 0)

	    {

			var container = document.createElement("span");

			container.appendChild(document.createTextNode(" "));

	
			var enlargeImg = document.createElement("img");

			enlargeImg.setAttribute("src", "http://www.furniture2go.com/img/icon_enlarge.gif");
			enlargeImg.setAttribute("style", "border-style: none");


			var newLink = document.createElement("a");

			newLink.setAttribute("href", url);

			newLink.appendChild(enlargeImg);

			container.appendChild(newLink);

			

			return container;

	    }

	    

	    return null;

	}



	var hyperlinks = document.getElementsByTagName("a");



	for (var i = 0; i < hyperlinks.length; ++i)

	{

		var node = hyperlinks[i];

		var href = node.getAttribute("href");



		var imgUrl = GetImageUrl(href);

		if (imgUrl != null)

		{

		    var link = MakeNoFrameLink(imgUrl);

		    

		    if (link != null)

		    {

				if (node.nextSibling == null)

					node.parentNode.appendChild(link);

				else

					node.parentNode.insertBefore(link, node.nextSibling);

		    }

		}

	}

})();