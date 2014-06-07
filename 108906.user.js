// ==UserScript==
// @include		http://www.hobbyking.com/hobbyking/store/uh_customerShowOrders.asp*
// @include		https://www.hobbyking.com/hobbyking/store/uh_customerShowOrders.asp*
// @match		http://www.hobbyking.com/hobbyking/store/uh_customerShowOrders.asp*
// @match		https://www.hobbyking.com/hobbyking/store/uh_customerShowOrders.asp*
// @name		Hobbyking Orders Page Tracking Enhancement
// @namespace	tag:distopie@gmx.de,2011-08-01:HobbykingTrackingScript
// @description	Simple script to direct links to traking system directly to shipment to track
// @version		1.0.5
// ==/UserScript==

function rewriteLink(link) {
	var linkHref;
	var setLinkHref;
	if (link.attributes.href === undefined) {
		if (link.attributes.getNamedItem) {
			linkHref = link.attributes.getNamedItem("href");
			setLinkHref = function (link, newHref) {
				var attr = document.createAttribute("href");
				attr.nodeValue = newHref;
				link.attributes.setNamedItem(attr);
			}
		}
	} else {
		linkHref = link.attributes.href;
		setLinkHref = function(link, newHref)  {
			link.attributes.href.value = newHref;
		}
	}
	var modified = false;
	// HK Post
	if (linkHref.value == 'http://app3.hongkongpost.com/CGI/mt/enquiry.jsp') {
		setLinkHref(link,'http://app3.hongkongpost.com/CGI/mt/genresult.jsp?tracknbr=' + link.text);
		modified = true;
	}
	// GLS Germany
	if (linkHref.value == 'http://www.gls-group.eu/276-I-PORTAL-WEB/content/GLS/NL99/EN/5004.htm') {
		setLinkHref(link,'http://www.gls-group.eu/276-I-PORTAL-WEB/content/GLS/NL99/EN/5004.htm?txtAction=71000&txtRefNo=' + link.text);
		modified  = true;
	}

	// Swisspost /* might work could not test no test data */
	if (linkHref.value == 'http://www.post.ch/en/post-startseite/post-privatkunden/post-versenden/post-track-and-trace-uebersicht-pk/post-track-and-trace.htm') {
		setLinkHref(link,'http://www.post.ch/swisspost-tracking?formattedParcelCodes=' + link.text);
		modified  = true;
	}
	
	// UPS 
	if (linkHref.value == 'http://www.ups.com/?Site=Corporate&cookie=hk_en_home&setCookie=yes') {
		setLinkHref(link,'http://wwwapps.ups.com/WebTracking/track?HTMLVersion=5.0&loc=en_HK&Requester=UPSHome&WBPM_lid=homepage%2Fct1.html_pnl_trk&track.x=Track&trackNums=' + link.text);
		modified  = true;
	}

	/* Speedpost does not work as there is no simple url-based tracking known
	// Speedpost 

	if (linkHref.value == 'http://www.speedpost.com.sg/TrackAndTrace.asp') {
		setLinkHref(link,'http://www.speedpost.com.sg/speedpost_services_track_check.asp?itemnos=' + link.text);
		modified = true;
	}
	*/
	if (modified) {
		link.style.backgroundColor = "#FFFF66";
	}
}
var links = document.links;
for (var idx = 0; idx < links.length; idx++) {
	var link = links[idx];
	rewriteLink(link);
}