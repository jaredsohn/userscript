// ==UserScript==
// @name           RapidHyperlink
// @namespace      http://www.w3.org
// @version        0.0.1
// @author         RapidCrew - ADK
// @description    Converts rapidshare.com text links to hyperlinks.
// @include        http://www.rapidhacks.com/*
// ==/UserScript==

var regexp = /http:\/\/rapidshare.com\/[^\t^<]+/g;
var body = document.getElementsByTagName('body');

	if(body.length == 1)
	{		
	
		// get all the <p> elements in the document
		var ps = document.getElementsByTagName('p');
	
		if(ps.length > 0)
		{
		
			for (var i=0; i < ps.length; i++)
			{
				var match, link, tmp;

				if(regexp.test(ps[i].innerHTML))
				{
					
					tmp = ps[i].innerHTML;
					match = tmp.match(regexp); //returns our result
					
						// checks to see if an array is returned (multiple results) or a string (one result--which we then perform 'else' condition)
						if(typeof(match) == "object")
						{
							for(var j=0; j < match.length; j++)
							{
								link = "<a href=\"" + match[j] + "\" target=\"_blank\">" + match[j] + "</a>";
								tmp = tmp.replace(match[j], link);					
								ps[i].innerHTML = tmp;
							}
						}
						else
						{
							link = "<a href=\"" + match + "\" target=\"_blank\">" + match + "</a>";
							tmp = tmp.replace(match, link);					
							ps[i].innerHTML = tmp;
						}
				}
			}
		}
	
	}