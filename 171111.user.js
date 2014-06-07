// ==UserScript==
// @name           500px Download Link
// @namespace     
// @description    Add a download link to your 500px portfolio so users can download your lovely pictures
// @version        1.0
// Add the download link
	var url = window.location + "";
	
	var rsTest = url.search('(500px.com/photo)');
	
	if (rsTest !== "-1") {
	    //-------------------------------------------------- 
		// CHANGE START 
		$('div[data-image]').each(function(index) {
			var a = document.createElement('a');
		    var div = document.createElement('div');
		    
		    $(a).append($(div));
			$(a).attr('class', 'button like');
			$(a).attr('href', $(this).attr('data-image'));
			$(a).attr('target', '_blank');
			$(div).attr('class', 'button red');
			$(div).attr('style', 'margin: 0px auto');
	        $(div).append(document.createTextNode("Download"));		
		
			$(this).find('div[class=photoinfo]').append(a);
		});
	}
// end of download link
// ==/UserScript==