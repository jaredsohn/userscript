// ==UserScript==
// @name           GameTrailers
// @namespace      localhost
// @description    Links to game pages on the homepage now default to sorted by date.
// @include        http://www.gametrailers.com/
// ==/UserScript==

function rewrite_links()
{
  var links = document.getElementById('newestmedia').getElementsByTagName('a');
  
    for (var x=0; x<links.length; x++) 
  	{
  		// Capture the stuff between the start and stop key strings.
  		var lmatch = links[x].href.search('http://www.gametrailers.com/game/');
  	
  		// If it matched successfully...
  		if (lmatch==0) 
  		{
  			// Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
  			links[x].href = links[x].href + '?sort=date';
  		}
  	}
}

rewrite_links();

var _next_page = unsafeWindow.next_page;

unsafeWindow.next_page = function(){
  _next_page();
  rewrite_links();
};