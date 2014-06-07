// Slideshare Downloader user script 
// version 1.0
// 2009-07-17
// Copyright (c) 2008, Irfan Ahmad 
// Released under the GPL license 
// http://www.gnu.org/copyleft/gpl.html 
// 
// -------------------------------------------------------------------- 
// 
// This is a Greasemonkey user script. 
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/ 
// Then restart Firefox and revisit this script. 
// Under Tools, there will be a new menu item to "Install User Script". 
// Accept the default configuration and install. 
// 
// To uninstall, go to Tools/Manage User Scripts, 
// select "Slideshare Downloader", and click Uninstall. 
// 
// --------------------------------------------------------------------
//
// Change Log:
//

// 1.0: This is the final release. Please use www.slidzy.com to download slides.
// 0.5 BETA: Fixed it again. This time trying a permanent solution
// 0.43 BETA: I am tired of changing class name daily :S Looking for a better solution.
// 0.42 BETA: Yet another change in class name.
// 0.41 BETA: Minor change in class name of download not available text. Fixed ! 
// 0.4  BETA: Slideshare changed the classname of "Download not available" text again. Cant understand why they are changing is so rapidly.
// 0.3  BETA: Slideshare again changed the location of the doc variable, now it is part of slideshare_object.
// 0.2  BETA: Fixed the the script to work with updated DOM of slideshare.net (They had changed the location of Download not Available text)
//
// 
// ==UserScript== 
// @name          Slideshare Downloader
// @namespace     http://iffee.wordpress.com/2008/07/27/how-to-download-slideshare-slides/
// @description   This script enables a download option on all slideshare slides which have their download option disabled 
// @include       http://www.slideshare.net/*
// @include       http://slideshare.net/* 
// ==/UserScript== 

// declaring namespace
window.Irfan = {};

// Thanks slideshare for making doc variable easy to find ;)
window.Irfan.xmlURL = "http://s3.amazonaws.com/slideshare/" + unsafeWindow.slideshare_object.doc + ".xml";

// now we have xml url in variable xmlURL

// make the downlaod link in the document

// get the span to replace Downlaod not availabe text with Download link

window.Irfan.lnkDownload = document.evaluate( 
    "//li[@class='action-download']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

window.Irfan.lnkContainer = document.evaluate( 
    "//ul[@class='slideviewActions h-tools']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

// Add "Download" link
if(window.Irfan.lnkDownload.snapshotLength == 0) {
	
	// Add Slidzy link
	window.Irfan.lnkContainer.snapshotItem(0).innerHTML += "<li class='action-download'><a href='javascript:void(0);' class='iconDownload' title='Download' id='lnkDownload_slidzy'>Download PPT/PDF</a></li>";

	window.Irfan.lnkContainer.snapshotItem(0).innerHTML += "<li class='action-download'><a href='javascript:void(0);' class='iconDownload' title='Download' id='lnkDownload_irfan'>Download</a></li>";
	
	document.getElementById('lnkDownload_slidzy').addEventListener('click',function(){
		document.location = 'http://www.slidzy.com/download/?url=' + document.location;
	},false);
	
	// add click event to the download link
	document.getElementById('lnkDownload_irfan').addEventListener('click',function(){
		
		// checkign if GM_xmlhttpRequest is supported 
		
		if(!GM_xmlhttpRequest) {
			alert("Your version of Greasemonkey is old. Please upgrade it.");
			return false;
		}
		
		// making XHR
		GM_xmlhttpRequest({
			method: 'GET',
			url: window.Irfan.xmlURL,
			onload: function(response) {
				// parsing the xml to extract all slide links
				var p = new DOMParser();
				var xmldoc = p.parseFromString(response.responseText,"application/xml");
				var slides = xmldoc.getElementsByTagName("Slide");
				
				// adding links to a div for display
				
				var links = document.createElement("div");
				for(i = 0;i < slides.length; i++) {
					var lnk = document.createElement("a");
					lnk.href = slides[i].getAttribute("Src");
					lnk.appendChild(document.createTextNode("Slide " + (i + 1)));
					lnk.style.display = "block";
					
					links.appendChild(lnk);
				}
				
				// making the html of the page
				
				var slidesCount = document.createElement("p");
				slidesCount.appendChild(document.createTextNode(slides.length + " Slides"));
				var downloadAllLink = document.createElement("a");
				downloadAllLink.href = "https://addons.mozilla.org/en-US/firefox/addon/201";
				downloadAllLink.target = "_blank";
				downloadAllLink.appendChild(document.createTextNode("DownloadThemAll"));
				var help = document.createElement("p");
				help.appendChild(document.createTextNode("Use some tool like "));
				help.appendChild(downloadAllLink);
				help.appendChild(document.createTextNode(" to download all slides."));
				
				// opening the browser window with download links
				
				var w = window.open("","ss_downloadlinks","toolbar=0,menubar=0,resizable=0,scrollbars=1,width=400,height=300");
				w.document.body.appendChild(slidesCount);
				w.document.body.appendChild(help);
				w.document.body.appendChild(links);
			}
		});
	},false);
}
else if(window.Irfan.lnkAlreadyDownload.snapshotLength != 1)
{
	alert("Error!\nPlease report it to http://iffee.wordpress.com/2008/07/27/how-to-download-slideshare-slides/");
}