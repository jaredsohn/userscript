// ==UserScript==
// @name		Remove YouTube redirect
// @namespace	http://userscripts.org/scripts/show/157513
// @description	Removes the redirection promt from outgoing links on YouTube. It also changes the link on the YouTube logo to go directly to the subscription box.
// @include		*youtube.com*
// @grant		none
// @version		2.1
// @require		http://code.jquery.com/jquery-latest.min.js
// @downloadURL	http://userscripts.org/scripts/source/157513.user.js
// ==/UserScript==

// --- Start of config ---

var logo_redirect_to_subs = true;	// Let this be set to true if you want the YouTube logo to link directly to your subscription box
var https = true;					// If above variable is set to true, you can here choose if you want to use https or not (true is recommended)

// ---- End of config ----

if (logo_redirect_to_subs) {
	
	var protocol;
	if (https) {
		protocol = 'https://';
	} else {
		protocol = 'http://';
	}
	
	$('#logo-container').attr('href', protocol+'www.youtube.com/feed/subscriptions');
}

// This is the "main" function, it removes the attribute that YouTube uses to add the redirection page with javascript
// By doing this, we avoid the whole rediretion page
$('.yt-uix-redirect-link').each(function() {
	$(this).attr('data-redirect-href-updated', 'false');
});

// If it won't work for some reason, this is the backup
// One we reach the redirection page the user will automatically be transfered to the destination
var redirect = urlvar('q');
if (redirect && window.location.pathname == '/redirect') {
	console.log(redirect);
	window.location = decodeURIComponent(redirect.replace(/\+/g, ' '));
}
function urlvar(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}