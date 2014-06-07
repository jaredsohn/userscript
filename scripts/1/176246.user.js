// ==UserScript==
// @name        MTGO Server Status on magicTCG
// @namespace   PylonPants
// @include     https://*reddit.com/r/magicTCG*
// @include     http://*reddit.com/r/magicTCG*
// @version     1.0
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// Start the script
$(go);

function go() {

	var target_div = $("<a href='https://www.wizards.com/Magic/Digital/MagicOnline.aspx?x=mtg/digital/magiconline/whatshappening' style='border:1px solid gray;border-radius:6px 6px 6px 6px;display:block;font-size:14px;margin:2px 0;padding:2px 6px;' id='gm_mtgo_server_status'>").append(
		"Loading",
		// NB: This scary looking block of code is simply a small animated gif, it's embedded like this to avoid having to load it from an external source
		$("<img src='data:image/gif;base64,R0lGODlhCgACAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFHgABACwAAAAACgACAAACBQSCiaZaACH5BAUeAAEALAQAAAACAAIAAAIChFEAIfkEBR4AAQAsCAAAAAIAAgAAAgKEUQA7' />")
	);
	// Add div to the DOM
	$(".side").first().prepend(target_div);
	
	// Make AJAX call
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://www.wizards.com/Handlers/Status.ashx?service=mtgo",
		onload: function(response) {
			// Parse as JSON
			var status = jQuery.parseJSON(response["responseText"]);
			
			if (status.status == "DOWN") {
				target_div.html("<span style='color:darkRed'>&#9940;</span>Server is down");
			} else if (status.status == "UP") {
				target_div.html("<span style='color:darkGreen'>&#9728;</span>Server is up");
			} else {
				target_div.html("<span style='color:darkRed'>&#9889;</span>Error getting server status");
			}
			
		}
	});
	
}