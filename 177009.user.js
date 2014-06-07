// ==UserScript==
// @name        E / ExHentai Downloader
// @description Downloader for E and ExHentai galleries
// @version     1.2.0
// @downloadURL https://userscripts.org/scripts/source/177009.user.js
// @updateURL   https://userscripts.org/scripts/source/177009.meta.js
// @include     *://exhentai.org/g/*
// @include     *://g.e-hentai.org/g/*
// @copyright   2013+, CBRX (cbrx.de)
// @require     http://code.jquery.com/jquery-latest.js
// ==/UserScript==


// Configuration //////////////////////////////////////////////////////////////////////////////
var config = {                                                                             ////
	'delaymin': 1500,   // Minimum delay between scrapping pages in ms                     ////
	'delaymax': 1200,   // Maximum delay between scrapping pages in ms                     ////
	'delaysav': 2200,   // Static  delay between image downloads in ms                     ////
	'dldafter':   10    // After fetching how many pages should the script download them?  ////
	                    // 0 = Download after fetching all images                          ////
}                                                                                          ////
///////////////////////////////////////////////////////////////////////////////////////////////
// Changelog //////////////////////////////////////////////////////////////////////////////////
//
////// v 1.2.0
// - Fixed critical bug related to the asynchronous fetching and downloading
// ! Sometimes the script will just download the 403.gif, need confirmation if
//   this is media-related or a bug in the script!
//
////// v 1.1.0
// - Fixed multiple box applying
// - Added delay between downloads
// - Added option to download after X images
//
////// v 1.0.0
// - Implemented basic function
//
///////////////////////////////////////////////////////////////////////////////////////////////


// The art element
var element = {
	'imagecount': 0,
	'imagelinks': 0,
	'downloadnm': 0,
	'downloadac': false,
	'targetlink': "",
	'requeststr': "",
	'newimgsour': "",
	'imagesourc': [],
	'ftinterval': null
}

// String padding function for filenames
$.strPad = function(inputnum, strlength) {
	var    numstring = inputnum.toString();
	while (numstring.length < strlength) {numstring = "0" + numstring;}
	return numstring;
};

function resetDownloadStatus(){
	element.downloadac = false;
}

// Download function to download a single page
function downloadImage(resurl){
	element.downloadnm++;
	
	var a = $("<a>").attr("href", resurl).attr("download", $.strPad(element.downloadnm, 3)+".jpg").appendTo("body");
	    a[0].click();
	    a.remove();
}

// Download function to download page
function downloadImages(){
	var localTimeout       = 0;
	    element.downloadac = true;
		
	for(i = 0; i < element.imagesourc.length; i++){
		localTimeout += config.delaysav;
		setTimeout(downloadImage, localTimeout, element.imagesourc[i]);
	}
	element.imagesourc = null;
	element.imagesourc = new Array();
	
	setTimeout(resetDownloadStatus, localTimeout);
}

// Grabber function to get image sources
function fetchImage(){
	if(element.downloadac == false){
		GM_xmlhttpRequest({
			method: "GET",
			url: element.targetlink,
			headers: {
				'User-Agent': window.navigator.userAgent,
				'Referer': window.location.href,
				'Cookie': document.cookie,
			},
			onload: function(resp){
				// Grab needed informations from page source
				element.requeststr = resp.responseText;
				element.targetlink = element.requeststr.match("a id\=\"next\" onclick\=\".{1,50}\" href\=\"(.*?)\"\>")[1];
				element.newimgsour = element.requeststr.match("img id\=\"img\" src\=\"(.*?)\" style\=\".{1,}\" \/\>")[1];
				element.imagesourc.push(element.newimgsour);
				element.imagelinks++;
				
				// Output debug informations
				$('#exhdval1').text(element.imagelinks);
				$('#exhdval4').text(element.newimgsour);
				$('#exhdval2').text(element.requeststr.match('[_0-9A-z]{1,3}.jpg :: (.*?)</div>')[1]);
				$('#exhdval3').text('available');
				
				// Check if all images have been grabbed
				if(element.imagelinks == element.imagecount || (element.imagesourc.length == config.dldafter && config.dldafter != 0)){
					// Display success message
					if(element.imagelinks == element.imagecount){
						$('#exhdsuccess').show(200);
						clearInterval(element.ftinterval);
					}
					
					downloadImages();
				}
			},
			onerror: function(resp){
				$('#exhdval3').text('unavailable');
				window.location.href = document.URL;
				console.log('Download failed at image '+i+', invalid xmlhttp request');
			}
		});
	}
}

// Wait for document load
$(document).ready(function(){
	// Read number of pages from details page
	element.imagecount = $('#gdd .gdt2:eq(1)').text();
	element.targetlink = $('#gdt a').first().attr('href');

	// Create GUI Box for the download button and the downloader's debug box
	$('.gm').first().after('<div class="gm"><span><u>ExHentai image downloader</u></span><br /><br /><div id="exhdpreview">Found '+element.imagecount+' images in this element. [<a id="forcedownloadbutton" >Start Download</a>]</div><div id="exhddebug" style="display:none"><table width="100%"><tr><td width="150"><strong>Image</strong></td><td><span id="exhdval1">0</span> / '+parseInt(element.imagecount.split(" @")[0])+' <span id="exhdsuccess" style="background: green; display: none;">successful!</span></td></tr><tr><td><strong>Image size</strong></td><td><span id="exhdval2">unknown</span></td></tr><tr><td><strong>Image status</strong></td><td><span id="exhdval3">unknown</span></td></tr><tr><td><strong>Image source</strong></td><td><span id="exhdval4">unknown</span></td></tr></table><a id="cancelbutton" >[Cancel]</a></div></div>');

	element.imagecount = parseInt(element.imagecount.split(" @")[0]);
	
	// Start script on clicking the force download button.
	$('#forcedownloadbutton').click(function(){
		// Show debug box, hide link
		$('#exhdpreview').hide(200);
		$('#exhddebug').show(200);
		
		// SPECIAL: Copy title to clipboard
		GM_setClipboard($('#gn').text());
		
		// Set default timeout value
		timeoutValue = 0;
		
		// Start loop to fetch images
		element.ftinterval = setInterval(fetchImage, (Math.floor(Math.random() * config.delaymax) + config.delaymin));
	});
	
	$('#cancelbutton').click(function(){
		element = null;
		location.reload();
	});
});