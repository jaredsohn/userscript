// ==UserScript==
// @name           THC-Game GK-ForumURL to Link
// @namespace      http://www.w3.org
// @description    Ersetzt Forum-URLs durch links | Modification von text2hyperlink.user.js
// @include        http://*.thc-game.com/*
// ==/UserScript==

var regexp = /http:\/\/forum.s2.thc-game.com\/[^\t^<]+/g;

var body = document.getElementsByTagName('body');

	if(body.length == 1)
	{	
	
		// get all the <p> elements in the document
		var divs=document.getElementsByTagName("div");
		var ps=0;
		for (i=0; i<divs.length; i++)
			 if (divs[i].className=="geruecht") { ps=divs[i]; break; }
		//var ps = document.getElementsByClass('b22');
	
		if(ps!=0)
		{
				var match, link, tmp;

				if(regexp.test(ps.innerHTML))
				{
					tmp = ps.innerHTML;
					match = tmp.match(regexp); //returns our result
					
						// checks to see if an array is returned (multiple results) or a string (one result--which we then perform 'else' condition)
						if(typeof(match) == "object")
						{
							for(var j=0; j < match.length; j++)
							{
								link = "<a href=\"" + match[j] + "\" target=\"_blank\">" + match[j] + "</a>";
								tmp = tmp.replace(match[j], link);					
								ps.innerHTML = tmp;
							}
						}
						else
						{
							link = "<a href=\"" + match + "\" target=\"_blank\">" + match + "</a>";
							tmp = tmp.replace(match, link);					
							ps.innerHTML = tmp;
						}
				}
			
		}
	
	}