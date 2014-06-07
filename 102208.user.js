// ==UserScript==
// @name		GeoPrinting
// @version		1.1.3
// @namespace		http://denniskoot.nl
// @description		Make a better looking print-page on geocaching.com from the normal cache page
// @include		http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

function setupGeoPrinting() 
{
	doGeoPrinting = function(newValue)
	{
		// remove the print-media css-file
		$('link[media="print"]').remove();

		// hide part of the breadcrumb
		$('#ctl00_Breadcrumbs').hide();

		// hide the header and footer
		$('#Navigation').parent().parent().hide();
		$('footer').hide();
		$('.container').css('margin-bottom', '0px');
		$('.PrintOnly').remove();

		// set the background to white
		$('.yui-skin-sam').css('background', '#FFFFFF');
		$('#bd').css('background', '#FFFFFF');
		$('body').removeAttr('background');

		// hide the bottom-map and the links to online maps and the search-links 
		//$('#ctl00_ContentBody_uxlrgMap').hide(); //doesn't work anymore... strange..
		$('#uxlrgMap').hide();
		// hide the online-maps-links
		$('#ctl00_ContentBody_uxMapLinkHeader').parent().hide();
		$('#ctl00_ContentBody_MapLinks_MapLinks').parent().hide();
		// hide the search-links
		$('#ctl00_ContentBody_uxFindLinksHeader').parent().hide();
		$('#ctl00_ContentBody_uxFindLinksHiddenByThisUser').parent().parent().hide();

		// hide the table with user-logs
		$('.Warning').parent().hide();
		$('#ctl00_ContentBody_uxGalleryImagesLink').parent().hide();
		$('.LogsTable').hide();

		$('#ctl00_ContentBody_lblFindCounts > p').css('margin-bottom', '0px');
		$('#ctl00_ContentBody_lblFindCounts').parent().css('padding', '3px');
		$('#ctl00_ContentBody_lblFindCounts').parent().css('padding-left', '8px');

		// hide the favorites widget
		$('.favorite').hide();

		// hide the navigation-bar on the right
		$('#lnkSmallMap').parent().parent().hide()
		// and use the extra space for the content
		$('.span-17').css('width', '100%');
		$('#ctl00_divContentMain').css('width', '100%');
		$('#ctl00_divContentMain').parent().css('width', '95%');

		// hide the cache-hider's link to his/her/their website
		$('#ctl00_ContentBody_uxCacheUrl').hide();
		$('#Print').parent().css('margin-top', '-25px');

		// hide the feedback-div
		$('#feedback-tab').hide();

		// hide the download-links
		$('#Download').hide();

		// and finally hide the GeoPrinting-button etc.
		$('#Print').hide();
	}

	// insert a GeoPrint-link non-intrusive-style :D
	$('#ctl00_ContentBody_lnkPrintFriendly').after(
		'&nbsp;<a id="geoprinting_link" class="lnk" href="#" onclick="javascript:doGeoPrinting()">' +
			'<span>GeoPrint</span>' +
		'</a>&nbsp;');

	// hide the disclaimer
	$('.DisclaimerWidget').hide();
}

//var jQueryGeoPrinting = document.createElement("script");
//jQueryGeoPrinting.setAttribute("type", "text/javascript");
//jQueryGeoPrinting.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
//document.body.appendChild(jQueryGeoPrinting);

var injectGeoPrinting = document.createElement("script");
injectGeoPrinting.setAttribute("type", "text/javascript");
injectGeoPrinting.appendChild(document.createTextNode("(" + setupGeoPrinting + ")()"));
document.body.appendChild(injectGeoPrinting);


// some stuff that still needs to be done

// try to decrypt the extra hints by default
// but make sure that you don't encrypt because the user clicked the decrypt link...
// you could just read the value, but then it wouldn't work with other languages..
//
// if anybody knows how to do this, please leave a message :)
//
//dht($('#ctl00_ContentBody_lnkDH'));
//$('#ctl00_ContentBody_lnkDH').dht();