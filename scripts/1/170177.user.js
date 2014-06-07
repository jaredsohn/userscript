// ==UserScript==
// @name Torrentproxies.com Remove Adf.ly
// @description Removes the adf.ly links from TorrentProxies.com and replaces them with direct links!
// @include http://torrentproxies.com/
// @include http://www.torrentproxies.com/
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript== 

//Run on Window Load
$(document).ready(function() {
	//Loop thorugh each link
    $('a').each(function(index, value){
        //Get HREF value
        var href = $(this).attr('href');
		if(href.indexOf("go.piratereverse.info") > -1) {
        	//Replace
            var text = $(this).text();
            $(this).attr('href', text);
        }
    });	
});


