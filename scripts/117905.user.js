// ==UserScript==
// @name           Wowhead Screenshot Shortcut
// @author         neutronimity
// @description    Allows for succesive screenshot uploading for the same page.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        *.wowhead.com/*
// ==/UserScript==

if ( typeof ( jQuery )  ) {
	jQuery ( function () {
		var ScThankYouUrlSnippet = /\/screenshot=thankyou&\d+\.\d+/;
		if ( ScThankYouUrlSnippet.test ( location.href ) && jQuery ( 'div#main-contents div.text:first' )  ) {
			var PageType = location.href.match ( /\/screenshot=thankyou&(\d+)\.\d+/ ) [1];
			var PageId = location.href.match ( /\/screenshot=thankyou&\d+\.(\d+)/) [1];
			var ScSubmitFormHtml = '<br><h3>Submit another screenshot</h3><form action="/screenshot=add&' + PageType + '.' + PageId + '" method="post" enctype="multipart/form-data" onsubmit="return ss_validateForm(this)"><input type="file" name="screenshotfile"><input type="submit" value="Submit"></form>';
			jQuery ( 'div#main-contents div.text:first' ).append ( ScSubmitFormHtml );
		};
	});
};