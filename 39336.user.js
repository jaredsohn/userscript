// ==UserScript==
// @name				MusicBrainz Multi-Domain ASIN Finder
//	@namespace		http://muz.goatse.co.uk/
// @description	Finds potential ASINs to AR to MB releases
// @include			http://musicbrainz.org/show/release/*
// @include			http://musicbrainz.org/release/*
// @include			http://musicbrainz.org/edit/relationship/addurl*
// ==/UserScript==

// A small function for obtaining GET request stuff
function getvar(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// Figure out what page we're on
var hrefregex = /relationship\/addurl/i;
if (hrefregex.exec(window.location.href)) {
	// We're adding an AR
	// Check to see if an ASIN argument was passed and do stuff
	var asin = getvar('asin');
	var domain = getvar('domain');
	if (asin && domain) {
		var inputs = document.getElementsByTagName('input');
		for (r = 0; r < inputs.length; r++) {
			input = inputs[r];
			// Populate the URL
			if (input.getAttribute('name') == 'url') {
				amazonurl = 'http://www.amazon.' + domain +
					'/gp/product/' + asin;
				input.value = amazonurl;
			}
		}
		// Set Amazon as the AR type on the dropdown
		var asinoption = /^30.*/i;
		var options = document.getElementsByTagName('option');
		for (o = 0; o < options.length; o++) {
			option = options[o];
			if (asinoption.exec(option.getAttribute('value'))) {
				option.selected = 'selected';
			}
		}
	}
} else {
	// we're on a release page
	// Append JS file for creating the popup
	var jslink = document.createElement("script");
	jslink.type = 'text/javascript';
	jslink.src = 'http://muz.goatse.co.uk/js/popup.js';
	document.getElementsByTagName('head')[0].appendChild(jslink);
	
	// Find the release's MBID
	var atags = document.getElementsByTagName('a');
	for (i = 0; i < atags.length; i++) {
		myatag = atags[i];
		if (myatag.getAttribute('title') == 'Link to this release') {
			var mbid = myatag.getAttribute('href');
		}
	}
	// Use some regexto extract the MBID properly
	var regex = /([a-z,0-9]{8}-([a-z,0-9]{4}-){3}[a-z,0-9]{12})/;
	var match = regex.exec(mbid);
	
	// Add the Search URL to launch the popup with results in it
	var relurl = document.getElementsByClassName("RELATE_TO_LINK");
	if (relurl.length) {
		var searchhtml;
		searchhtml = document.createElement("span");
		searchhtml.innerHTML = 
			'| <a href="http://muz.goatse.co.uk/musicbrainz/asinpopup.php' +
			'?mbid=' + match[0] +
			'" onClick="return popup(this, \'asins' + match[0] + '\')">' +
			'Search for ASINs' +
			'</a>';
		relurl[0].parentNode.insertBefore(searchhtml, relurl[0].nextSibling);
	}
}