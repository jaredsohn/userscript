// ==UserScript==
// @name			PPV URL Spy
// @namespace		http://derekbeau.com
// @copyright		Derek Beauchemin
// @description		Continuously Loads a List of URLs to Trigger Pops
// @include			*
// @require			http://code.jquery.com/jquery-latest.js
// @version			0.1
// ==/UserScript==


// Block all alert boxes, send them to the console instead
unsafeWindow.alert = function alert(message) { console.log(message); }

$(document).ready(function() {
	// Get the list of URLs and the delay
	var refresher;
	var urlString = GM_getValue('urls');
	if (urlString == undefined) urlString = '';
	var delay = GM_getValue('delay');
	if (delay == undefined) delay = 5000;
	

	// Build the user input controller
	var controller = '';
	controller += '<div style="width:400px;background:#00a7b1;border:2px solid #000000;padding:4px;position:absolute;z-index:9999;">';
	controller += '	<label style="display:block;font-weight:bold;color:white;">Enter Some URLs to Cycle Through - One Per Line</label>';
	controller += '	<textarea id="urls" style="display:block;width:95%;height:100px;">'+urlString+'</textarea>';
	controller += '	<button id="start">Start Spying</button>';
	controller += '	<button id="stop">Stop Spying</button>';
	controller += '	<label style="font-weight:bold;color:white;"> Delay: </label>';
	controller += '	<input type="text" id="delay" value="'+delay+'" />';
	controller += '</div>';
	
	// Attach the controller to the page
	$('body').prepend(controller);
	$('#stop').attr('disabled', 'true');
	
	// Start spying
	$('#start').click(function() {
		GM_setValue('state', 'run');
		$('#stop').removeAttr('disabled');
		gotoNextUrl();
	});
	
	// Continue spying
	if (GM_getValue('state') == 'run') {
		$('#stop').removeAttr('disabled');
		gotoNextUrl();
	}
	
	// Stop spying
	$('#stop').click(function() {
		GM_setValue('state', 'stop');
		$('#start').removeAttr('disabled');
		$('#stop').attr('disabled', 'true');
		$('#delay').removeAttr('disabled');
	});
});


/* *********************************************************************************************
 Processes the list of URLs and sends the browser to the next one in line
/* *********************************************************************************************/
function gotoNextUrl() {
	// Disable start button and delay input
	$('#start').attr('disabled', 'true');
	$('#delay').attr('disabled', 'true');

	// Explode the list of URLs into an array
	var urlArray = $('#urls').val().split("\n");
	// Take the first URL off the list and save it
	var nextUrl = urlArray.shift();
	// Put that URL at the end of the array
	urlArray.push(nextUrl);
	// Implode the array of URLs into a text list
	var urlString = urlArray.join("\n");
	// Save the list of URLs before reloading
	GM_setValue('urls', urlString);
	
	// Get the delay before going to the next url
	var delay = $('#delay').val();
	GM_setValue('delay', delay);
	
	// Go to the next URL
	window.setTimeout(function() { window.location.href = 'http://'+nextUrl; }, delay)
}

