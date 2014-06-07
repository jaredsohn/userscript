// ==UserScript==
// @name           Boycott UBISOFT in RPS
// @namespace      rocks rock
// @include        http://www.rockpapershotgun.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


var url = document.location.href;


return;

//TODO: write it all :-)

   
var allTagLinks = document.evaluate( 
    "//a[@rel='tag']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null); 
	 

	for (var i = 0; i < allTagLinks.snapshotLength; i++) { 
	    
	    thisTagLink = allTagLinks.snapshotItem(i); 
		var text = thisTagLink.innerHTML;
		if (text=="Ubisoft"){
			thisTagLink.innerHTML = "Evilpeople";
		}
			
	} 


//div#left-column div.block p   .
//div#left-column p.tags 

/*
	<div class="hr"></div>
					
				<p class="tags"><a href="http://www.rockpapershotgun.com/tag/drm/" rel="tag">DRM</a>, <a href="http://www.rockpapershotgun.com/tag/ubisoft/" rel="tag">Ubisoft</a>, <a href="http://www.rockpapershotgun.com/tag/you-maniacs/" rel="tag">you maniacs</a>.</p>
				<p class="comments"><a href="http://www.rockpapershotgun.com/2010/02/17/you-maniacs/#comments" title="Comment on YOU MANIACS!">216 Comments »</a></p>

*/

/*
$(document).ready(function() {

    $("a[rel=tag]").each( function() {

           $(this).css("background-color","red");          
     });

}
*/
