// ==UserScript==
// @name           Original Imageshack
// @namespace      Laserbomb
// @description    Gets rid of the annoying sign up thing on the imageshack site for Direct Links.
// @include        http://*.imageshack.us/content_round.php?*
// ==/UserScript==

function removeStupid(){
	var linksList = document.getElementsByClassName( "listbox" );
	var target = linksList[1];
	

	var directLink = "Herpaderpa";
	
        var textBox = target.getElementsByClassName( "tt" )[1];

	var textBox2 = textBox.getElementsByClassName( "readonly" );
	textBox2 = textBox2[0];

	directLink = textBox2.value;

	target.innerHTML = '<label><a href="' + directLink + '">Direct Link</a></label>' +
			'<input class="Focuser" onClick="this.select(); pageTracker._trackEvent(' + "'new-done-click','short-click');" + '" value="' + directLink + '"/>';
	
	var textField = document.getElementsByClassName( "Focuser" )[0];
	textField.select();
}

removeStupid();




