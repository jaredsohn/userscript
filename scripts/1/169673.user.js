// ==UserScript==
// @name        Path of Exile Staff Post Toggle
// @description Adds a checkbox to forum threads to toggle showing only staff posts.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace   www.pathofexile.com
// @include     /^https?://www\.pathofexile\.com/forum/view-thread/\d+.*/
// @version     1.0
// ==/UserScript==

(function(){

this.$ = this.jQuery = jQuery.noConflict(true);

var forumSearchForm = $(".forumSearchForm");

if ( forumSearchForm )
{	
	var currentlyFiltered = false;
	
	if ( document.URL.indexOf( "filter-account-type/staff" ) > -1 )
	{
		currentlyFiltered = true;
	}
	
	var checkedAttribute = currentlyFiltered ? 'checked="checked"' : "";
	
	forumSearchForm.after( '<div style="float:right; padding: 3px;"><input type="checkbox" id="staffOnlyCheckbox" ' + checkedAttribute + ' /><label for="staffOnlyCheckbox">Staff Only</label></div>' );
	
	var staffOnlyCheckbox = $("#staffOnlyCheckbox");
	
	staffOnlyCheckbox.change( 
		function()
		{
			staffOnlyCheckbox.attr('disabled', 'disabled');
			
			var isNowChecked = $(this).is(':checked');
			
			var threadRegex = /view-thread\/(\d+)/;
			var match = threadRegex.exec( document.URL );
			var threadID = match[1];
			
			if ( isNowChecked )
			{
				var newUrl = document.URL.replace( "view-thread/" + threadID, "view-thread/" + threadID + "/filter-account-type/staff" );				
				newUrl = newUrl.replace( /page\/\d+/, "" );
				
				document.location = newUrl;
			}
			else
			{
				var newUrl = document.URL.replace( "/filter-account-type/staff", "" );
				newUrl = newUrl.replace( /page\/\d+/, "" );
				
				document.location = newUrl;
			}			
		}
	);
}
})();

