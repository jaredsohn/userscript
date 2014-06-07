// ==UserScript==
// @name		Motherless
// @namespace	http://www.belineperspectives.com
// @description	Make Motherless a little more friendly.  Add download links to movies.
// @include		http://*motherless.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

	
(function() {

	$.noConflict()
	
	// Check to see if page loaded correctly, refresh in 30 seconds if not...
		
	if (jQuery("div#main_duh").length < 1){
		//console.log("Page Not Loaded!\nRefreshing in 30 Seconds...");
		setTimeout("location.reload(true);", 30000)
	}
	
	// Check for and handle a video page...
	
	var media = jQuery("#mediaspace").html();
	if (media != null){
		//console.log("Creating Video Link...");
		var flash = "file=(http://members\.motherless\.com/movies/[A-Z0-9]{4,10}-[A-Z0-9]{6,50}\.flv)&amp;";

		var re = new RegExp(flash);
		var found = re.exec(media);
		if (found == null) {
			//console.log("No Movie Found");
		} else {
			var url = found[1];
			//console.log(url);
			var nav = jQuery(".tabbernavy");
			li = document.createElement('li');
			anchor = document.createElement('a');
			anchor.href = url;
			anchor.style.background = '#507d50';
			text = document.createTextNode('Download');
			anchor.appendChild(text);
			li.appendChild(anchor);
			nav[0].appendChild(li);
		}	
	}
	
	// Check for and handle a gallery page...
	
	var gal = jQuery("div.trail a:last").attr('href');
	if (gal != null){
		//console.log("Linking to Fullsize...");
		jQuery("div.video").each(function(i,e){
			if (jQuery(e).find('div.thumbnail a div').length != 1) {
				var link = jQuery(e).find("a[href^="+ gal +"]");
				link.attr('href', 'http://members.motherless.com/img/' + link.attr('href').substring(gal.length + 1) + '.' + link.find('img').attr('src').slice(-3)).attr('target', '_blank');
			} else {
				jQuery(e).css('border', '1px solid #0C46F2').find('div.media_info').css('background', '#666');
			}
		});
		
	}
}());