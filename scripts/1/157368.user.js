// ==UserScript==
// @name			Facepunch SH IFrame Injector
// @namespace		http://userscripts.org/users/500730
// @description		Injects the article's source into the page via an iframe
// @include			http://www.facepunch.com/showthread.php*
// @include			https://www.facepunch.com/showthread.php*
// @include			www.facepunch.com/showthread.php*
// @include			*facepunch.com/showthread.php*
// @version			1.4
// ==/UserScript==

window.addEventListener("load", function()
{
	try
	{
		if(document.querySelectorAll(".navbit")[2].children[0].innerHTML != "Sensationalist Headlines") // Cleanup
		{
			return
		}
		else if(document.querySelectorAll("span.selected").length != 0 && document.querySelectorAll("span.selected")[0].children[0].innerHTML != "1") // This too
		{
			return
		}

		// Find first post
		var op = document.querySelector(".postcontent") // returns first object of type

		// Obtain the number of links in the post
		var linklist = op.getElementsByTagName("a")

		// Define iframe target
		var articlesource = new Object()

		if(linklist.length == 1)
		{
			articlesource = linklist[0]
		}

		else if(linklist.length > 1)
		{
			// Try to find the source if there's multiple links
			for(i = 0; i < linklist.length; i++)
			{
				if(linklist[i].children.length > 0 && linklist[i].children[0].tagName.toLowerCase() == "img")
				{
					continue
				}
				else if(linklist[i].innerHTML.match(/(source|article|website)/gi)) // TODO: Refine regex
				{
					articlesource = linklist[i]
					break
				}
				else if(linklist[i].href.match(/(http(s)?:\/\/|www\.).+\..\w+.+(\w+|\/)?$/gi))
				{
					// http  or www, s, jpg or slash, jpg
					articlesource = linklist[i]
					break
				}
				/*
				else if(linklist[i].href.match(/(http(s)?:\/\/|www\.).+\..\w+.+((jpg|jpeg|bmp|gif|png)|\/)?$/gi))
				{
					articlesource = linklist[i]
					break
				}
				*/
			}
		}
		
		else
		{
			return
		}


		// Create IFrame
		var articlecontainer = document.createElement("iframe")
			articlecontainer.src = articlesource.href
			articlecontainer.width = "98%"
			articlecontainer.height = (window.innerWidth * 0.8) * window.innerHeight / window.innerWidth
                        articlecontainer.setAttribute("sandbox", "") // Disallow the site in the iframe from being able to change the parent's location -- grrr

		// Append article after the found source

		op.insertBefore(articlecontainer, articlesource)

	}
	catch(e)
	{
		console.error(e)
	}
})