// ==UserScript==
// @name           Development Replace URL's
// @namespace      http://userscripts.org/users/84260
// @description    Basically allows you to change the host location during development. For testing this is just going through a twitter stream and changing the links for the hashtag #fb and replacing it with facebook url. Please change these values to meet you needs.
// @include        
// ==/UserScript==

var url1, url2;
url1 = "http://twitter.com/search?q=%23fb";
url2 = "http://www.facebook.com";
var a, links;
var tmp = "a";
var p, q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) 
{
    a = links[i];
    for(var j = 0; j < url1.length; j++)
    {
	    tmp = a.href + "";
	    if(tmp.indexOf(url1) != -1)
	    {
	        p = tmp.indexOf(url1);
	        q = url2 + tmp.substring(p + url1.length, tmp.length);
	        a.href = q;
	    }
	}
}