// ==UserScript==
// @name           SalesForce Default Email
// @namespace      http://www.anonymous.com
// @description    enables setting for a default From address in "Send an Email" form.
// @include        https://*.salesforce.com/_ui/core/email/author/EmailAuthor*
// ==/UserScript==

// v1.0

var defaultFromEmailCookieName = 'defaultFromEmail';
var fromElID = 'p26';

// insert '[set default]' button next to select list and add an onclick event listender
var fromEl = document.getElementById(fromElID);
var fromElParent = fromEl.parentNode;
fromElParent.innerHTML = fromElParent.innerHTML + ' <span style="text-decoration:underline;color:#009;font-size:0.9em" id="setDefaultButton">[set default]</span>';
var setDefaultButtonEl = document.getElementById('setDefaultButton');
setDefaultButtonEl.addEventListener("click", setDefaultCookie, true);

presetDefaultEmail();

function presetDefaultEmail() {
	// pre-select the default email, if possible
	var existingDefault = unescape(Get_Cookie(defaultFromEmailCookieName));
	if ( existingDefault != null ) {
		var thisfromEl = document.getElementById(fromElID);
		// cycle through fromEl and find the correct option
		for (var i = 0; i <= thisfromEl.length; i++ ) {
			if (thisfromEl.options[i].value == existingDefault) {
				thisfromEl.selectedIndex = i;
				break;
			}
		}
	}
}

function setDefaultCookie() {
	var thisFromEl = document.getElementById(fromElID);
	var thisValEl = thisFromEl.options[thisFromEl.selectedIndex];
	Set_Cookie(defaultFromEmailCookieName, thisValEl.value, 1000, "/");	// cookie is valid for 1000 days
	alert('default email set to ' + unescape(thisValEl.text));
}

// Get_Cookie and Set_Cookie borrowed from: http://techpatterns.com/downloads/javascript_cookies.php
function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	
	for ( i = 0; i < a_all_cookies.length; i++ ) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
				
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name ) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )	{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) {
		return null;
	}
}				

function Set_Cookie( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

	/*
	if the expires variable is set, make the correct 
	expires time, the current script below will set 
	it for x number of days, to make it for hours, 
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
		( ( path ) ? ";path=" + path : "" ) + 
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}

