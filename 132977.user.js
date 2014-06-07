// ==UserScript==
// @name			Facepunch Countries
// @version			1.02
// @namespace		http://www.vertinode.nl/
// @description		Shows where users on Facepunch come from!
// @include			http://www.facepunch.com/*
// @include			http://facepunch.com/*
// ==/UserScript==

//	========================================================================
//		Helpers
//	========================================================================

var user = -1;
if ( document.getElementById( "navbar-login" ).getElementsByClassName( "buttons" ).length != 0 )
{
	var user = document.getElementById( "navbar-login" ).getElementsByTagName( "a" );
	for ( var i = 0; i < user.length; i++ ) {
		if ( user[i].href != undefined && user[i].href.indexOf( "member.php" ) != -1 ) {
			user = user[i].href.match( /[0-9]+/ )[0];
			break;
		}
	}
}

function webRequest( url, postbody, callback )
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if ( request.readyState == 4 )
		{
			callback( request.responseText );
		}
	}
	
	if ( postbody == null ) {
		request.open( "GET", url + "&user=" + user, true );
		request.send( null );
	} else {
		request.open( "POST", url + "?user=" + user, true );
		request.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		request.setRequestHeader( "Content-Length", postbody.length );
		request.setRequestHeader( "Connection", "close" );
		request.send( postbody );
	}
}

//	========================================================================
//		Static content
//	========================================================================

var niceNames = { "ad": "Andorra", "ae": "United Arab Emirates", "af": "Afghanistan", "ag": "Antigua and Barbuda", "ai": "Anguilla", "al": "Albania", "am": "Armenia", "ao": "Angola", "aq": "Antarctica", "ar": "Argentina", "as": "American Samoa", "at": "Austria", "au": "Australia", "aw": "Aruba", "ax": "Aland Islands", "az": "Azerbaijan", "ba": "Bosnia and Herzegovina", "bb": "Barbados", "bd": "Bangladesh", "be": "Belgium", "bf": "Burkina Faso", "bg": "Bulgaria", "bh": "Bahrain", "bi": "Burundi", "bj": "Benin", "bl": "Saint Barthelemy", "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivia", "bq": "Caribbean Netherlands", "br": "Brazil", "bs": "The Bahamas", "bt": "Bhutan", "bv": "Bouvet Island", "bw": "Botswana", "by": "Belarus", "bz": "Belize", "ca": "Canada", "cc": "Cocos (Keeling) Islands", "cd": "Democratic Republic of the Congo", "cf": "Central African Republic", "cg": "Republic of the Congo", "ch": "Switzerland", "ci": "Cote d'Ivoire", "ck": "Cook Islands", "cl": "Chile", "cm": "Cameroon", "cn": "China", "co": "Colombia", "cr": "Costa Rica", "cu": "Cuba", "cv": "Cape Verde", "cw": "Curacao", "cx": "Christmas Island", "cy": "Cyprus", "cz": "Czech Republic", "de": "Germany", "dj": "Djibouti", "dk": "Denmark", "dm": "Dominica", "do": "Dominican Republic", "dz": "Algeria", "ec": "Ecuador", "ee": "Estonia", "eg": "Egypt", "eh": "Western Sahara", "er": "Eritrea", "es": "Spain", "et": "Ethiopia", "fi": "Finland", "fj": "Fiji", "fk": "Falkland Islands", "fm": "Federated States of Micronesia", "fo": "Faroe Islands", "fr": "France", "ga": "Gabon", "gb": "United Kingdom", "gd": "Grenada", "ge": "Georgia (country)", "gf": "French Guiana", "gg": "Guernsey", "gh": "Ghana", "gi": "Gibraltar", "gl": "Greenland", "gm": "The Gambia", "gn": "Guinea", "gp": "Guadeloupe", "gq": "Equatorial Guinea", "gr": "Greece", "gs": "South Georgia and the South Sandwich Islands", "gt": "Guatemala", "gu": "Guam", "gw": "Guinea-Bissau", "gy": "Guyana", "hk": "Hong Kong", "hm": "Heard Island and McDonald Islands", "hn": "Honduras", "hr": "Croatia", "ht": "Haiti", "hu": "Hungary", "id": "Indonesia", "ie": "Republic of Ireland", "il": "Israel", "im": "Isle of Man", "in": "India", "io": "British Indian Ocean Territory", "iq": "Iraq", "ir": "Iran", "is": "Iceland", "it": "Italy", "je": "Jersey", "jm": "Jamaica", "jo": "Jordan", "jp": "Japan", "ke": "Kenya", "kg": "Kyrgyzstan", "kh": "Cambodia", "ki": "Kiribati", "km": "Comoros", "kn": "Saint Kitts and Nevis", "kp": "North Korea", "kr": "South Korea", "kw": "Kuwait", "ky": "Cayman Islands", "kz": "Kazakhstan", "la": "Laos", "lb": "Lebanon", "lc": "Saint Lucia", "li": "Liechtenstein", "lk": "Sri Lanka", "lr": "Liberia", "ls": "Lesotho", "lt": "Lithuania", "lu": "Luxembourg", "lv": "Latvia", "ly": "Libya", "ma": "Morocco", "mc": "Monaco", "md": "Moldova", "me": "Montenegro", "mf": "Collectivity of Saint Martin", "mg": "Madagascar", "mh": "Marshall Islands", "mk": "Republic of Macedonia", "ml": "Mali", "mm": "Myanmar", "mn": "Mongolia", "mo": "Macau", "mp": "Northern Mariana Islands", "mq": "Martinique", "mr": "Mauritania", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldives", "mw": "Malawi", "mx": "Mexico", "my": "Malaysia", "mz": "Mozambique", "na": "Namibia", "nc": "New Caledonia", "ne": "Niger", "nf": "Norfolk Island", "ng": "Nigeria", "ni": "Nicaragua", "nl": "Netherlands", "no": "Norway", "np": "Nepal", "nr": "Nauru", "nu": "Niue", "nz": "New Zealand", "om": "Oman", "pa": "Panama", "pe": "Peru", "pf": "French Polynesia", "pg": "Papua New Guinea", "ph": "Philippines", "pk": "Pakistan", "pl": "Poland", "pm": "Saint Pierre and Miquelon", "pn": "Pitcairn Islands", "pr": "Puerto Rico", "ps": "Palestinian territories", "pt": "Portugal", "pw": "Palau", "py": "Paraguay", "qa": "Qatar", "re": "Reunion", "ro": "Romania", "rs": "Serbia", "ru": "Russia", "rw": "Rwanda", "sa": "Saudi Arabia", "sb": "Solomon Islands", "sc": "Seychelles", "sd": "Sudan", "se": "Sweden", "sg": "Singapore", "sh": "Saint Helena, Ascension and Tristan da Cunha", "si": "Slovenia", "sj": "Svalbard and Jan Mayen", "sk": "Slovakia", "sl": "Sierra Leone", "sm": "San Marino", "sn": "Senegal", "so": "Somalia", "sr": "Suriname", "ss": "South Sudan", "st": "Sao Tome and Principe", "sv": "El Salvador", "sx": "Sint Maarten", "sy": "Syria", "sz": "Swaziland", "tc": "Turks and Caicos Islands", "td": "Chad", "tf": "French Southern and Antarctic Lands", "tg": "Togo", "th": "Thailand", "tj": "Tajikistan", "tk": "Tokelau", "tl": "East Timor", "tm": "Turkmenistan", "tn": "Tunisia", "to": "Tonga", "tr": "Turkey", "tt": "Trinidad and Tobago", "tv": "Tuvalu", "tw": "Taiwan", "tz": "Tanzania", "ua": "Ukraine", "ug": "Uganda", "um": "United States Minor Outlying Islands", "us": "United States", "uy": "Uruguay", "uz": "Uzbekistan", "va": "Vatican City", "vc": "Saint Vincent and the Grenadines", "ve": "Venezuela", "vg": "British Virgin Islands", "vi": "United States Virgin Islands", "vn": "Vietnam", "vu": "Vanuatu", "wf": "Wallis and Futuna", "ws": "Samoa", "ye": "Yemen", "yt": "Mayotte", "za": "South Africa", "zm": "Zambia", "zw": "Zimbabwe", "eu": "European Union" };

//	========================================================================
//		Thread
//	========================================================================

if ( document.location.pathname.match( "^/showthread.php" ) )
{
	// Collect users on page and ask server for countries
	var usernameElements = document.getElementsByClassName( "username_container" );
	var userIds = "";
	for ( var i in usernameElements )
	{
		if ( usernameElements[i].getElementsByTagName )
			userIds += usernameElements[i].getElementsByTagName( "a" )[0].href.match( /[0-9]+/ ) + ",";
	}
	userIds = userIds.substring( 0, userIds.length - 1 );
	
	webRequest( "http://dev.vertinode.nl/fpcountries.php", "uids=" + userIds, function( src )
	{
		addCountryIcons( src.split( "," ) );
	} );

	// Adds the country icons where the country is known
	function addCountryIcons( countries )
	{
		var postLinkSections = document.getElementsByClassName( "postlinking" );

		for ( var i in postLinkSections )
		{
			if ( countries[i] == "null" ) continue;
			
			var container = postLinkSections[i];
			if ( !container.getElementsByTagName ) continue;
			var eventLogButton = container.getElementsByTagName( "a" )[0];
			
			var icon = document.createElement( "img" );
			icon.src = "http://dev.vertinode.nl/flags/" + countries[i] + ".png";
			icon.alt = icon.title = niceNames[ countries[i] ];
			icon.style.marginLeft = "1px";
			icon.style.marginRight = "4px";
			icon.style.position = "relative";
			icon.style.top = "-2px";
			
			container.insertBefore( icon, eventLogButton );
		}
	}
}