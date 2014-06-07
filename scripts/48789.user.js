// MLS.ca Extras
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MLS.ca Extras", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MLS.ca Extras
// @description   Moves the "more.." images onto the main page and GETS RID OF THE YELLING REALTORS
// @include       http://www.mls.ca/PropertyDetails.aspx?*
// @include       http://www.realtor.ca/PropertyDetails.aspx?*
// @include       http://www.realtor.ca/propertyDetails.aspx?*
// @include       www.realtor.ca/propertyDetails.aspx?*
// ==/UserScript==


// Get property id

var propertyId = "";
var form = document.getElementById("frmMain");
if (form && form.action.match(/propertyId=(\d+)/)) {
	propertyId = RegExp.$1;
}
else if (form && form.action.match(/PropertyID=(\d+)/)) {
	propertyId = RegExp.$1;
}


// Look for the "More..." button
var moreButton = document.getElementById("_ctl0_eThumbnails_lnkMorePhotos");

// safety
if (moreButton && propertyId.length > 0 && GM_xmlhttpRequest) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.realtor.ca/PropertyPhotos.aspx?propertyID='+propertyId,
		onload: function(response) {
			if (response.status == 200) {
				// Remove more button
				moreButton.parentNode.removeChild(moreButton);
				var html = response.responseText;
				var imgs = html.match(/http:\/\/cdn\.realtor\.ca\/listing\/[^']+/g) ;
				// Put in map to discard duplicates
				var map = {};
				for (var i=0; i < imgs.length; i++) {
					map[imgs[i]] = true;
				}
				// Add images to thumbnail span
				var thumbSpan = document.getElementById('_ctl0_eThumbnails_rptThumbnails');
				if (thumbSpan) {
					thumbSpan.innerHTML = "";	// Remove existing thumbnails
					for (var img in map) {
						var span = document.createElement('span');
						span.innerHTML = '<a href="'+img.replace('medres', 'highres')+'" target="blank"><img class="PhotoThumbnail" src="'+img.replace('medres', 'highres')+'" onmouseover="MM_swapImage(\'_ctl0_imgHouse\',\'\',\''+img+'\',1)"></a>';
						thumbSpan.appendChild(document.createTextNode(" "));
						thumbSpan.appendChild(span);
					}
				}
				// Expand thumbnail image sizes by about 1.7x so they are easier to see
				for (var i=0; i < thumbSpan.childNodes.length; i++) {
					var thumbnail = thumbSpan.childNodes.item(i);
					if (thumbnail.nodeType == 1) {
						thumbnail.getElementsByTagName('img')[0].style.width = "auto";
						thumbnail.getElementsByTagName('img')[0].style.height = "auto";
					}
				}
			}
		}
	});
}

function xpath(path) {
	return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Attempt to reformat ALL UPPER CASE ADS
// I'M JUST BUYING A HOUSE, WHY ARE YOU YELLING AT ME!!!
// could use some additions (first letter of the ad is lowercase...)

var lowercase = {
	init: function()
	{
		GM_registerMenuCommand("lowercase/uppercase!", function() { lowercase.flip(); });
		a = new Array();
		t = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		lowercase.l();
	},

	l : function()
	{
		lower = true;
		for(i=0; i<t.snapshotLength; i++)
		{
			n = t.snapshotItem(i);
                        s = n.data.toLowerCase();

                        s = n.data.toLowerCase();

                        // upper case period-letter
                        s = s.replace( /\.([a-z])/g, function( $0, $1, $2){
								// uppercase the starting character
								return( "." + $1 ).toUpperCase();
							});
                        // upper case period-space-letter
                        s = s.replace( /\.[\s]+([a-z])/g, function( $0, $1, $2){
								// uppercase the starting character
								return( ". " + $1 ).toUpperCase();
							});
                      
                        // upper case exclamationpoint-letter
                        s = s.replace( /\041([a-z])/g, function( $0, $1, $2){
								// uppercase the starting character
								return( "!" + $1 ).toUpperCase();
							});

                        // upper case exclamationpoint-space-letter
                        s = s.replace( /\041[\s]+([a-z])/g, function( $0, $1, $2){
								// uppercase the starting character
								return( "! " + $1 ).toUpperCase();
							});

                        a.push(n.data);
                        n.data = s;
		}
	},

	flip : function()
	{
		switch(lower)
		{
			case true: lowercase.u(); break;
			case false: lowercase.l(); break;
			default:;
		}
	},

	u : function()
	{
		lower = false;
		for(j=0; j<t.snapshotLength; j++)
		{
			n = t.snapshotItem(j);
			n.data = a[j];
		}
	},
}

lowercase.init();
