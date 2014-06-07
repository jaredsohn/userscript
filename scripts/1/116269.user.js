// ==UserScript==
// @name           Enable Form Autocomplete
// @namespace      http://armeagle.nl
// @description    Some websites use the form attribute 'autocomplete=off' so browsers won't store the login details. This script enables autocomplete.
// @include        https://eu.realtimeworlds.com/login/?source=http://eu.beta.apb.com/forums/rtw-auth.php&skin=apb
// ==/UserScript==

var forms = document.getElementsByTagName('form');
if ( forms != null ) {
	for (var ind=0; ind < forms.length; ind++) {
		if ( forms[ind].hasAttribute('autocomplete') && forms[ind].getAttribute('autocomplete') == 'off' ) {
			forms[ind].removeAttribute('autocomplete');
		}
	}
}