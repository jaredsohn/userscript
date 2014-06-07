// ==UserScript==
// @name           DTI Lightning Mods
// @namespace      http://www.registerguard.com
// @description    DTI Lightning GreaseMonkey modifications.
// @include        http://*.foo.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js
// @require        http://github.com/brandonaaron/livequery/raw/master/jquery.livequery.js
// @require        http://github.com/carhartl/jquery-cookie/raw/master/jquery.cookie.js
// ==/UserScript==

// http://forum.jquery.com/topic/importing-jquery-1-4-1-into-greasemonkey-scripts-generates-an-error
// Once bug gets fixed, use this for the above includes (note the version numbers):
// http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.js

// Start closure:
$(function() {
	
	// Add jQuery base theme to head:
	$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.0/themes/base/jquery-ui.css" type="text/css">');
	
});
// End closure.

// Start closure:
$(window).load(function () {
	
	/*
	** 
	** Navigation:
	** 
	*/
	
	// Hide it by default:
	$('#lookout').hide();
	
	/*
	** 
	** Section tab:
	** 
	*/
	
	// Expand the section list:
	$('.dynaTreeNode').parent().show();
	
	// Hide things I don't use:
	$('#zen11, #zen69, #zen72, #zen73, #zen82, #Section\\.simpleSearch, #Section\\.resultTable, #Section\\.buttonsectionlist').parent().parent().hide();
	
	// Force a height on the banner:
	$('#zen3').parent().parent().height('62px'); // Needed if you comment out the above two lines.
	$('#zen3 *').show(); // Too much trouble to find the specific element to show.
	
	/*
	** 
	** Pop open "Save story" faux modal window:
	** 
	*/
	
	// Make sure we fix anything hidden from the above code:
	$('.modalGroupBody *').show(); // Should I be more verbose here?
	// Remove banner container:
	$('.modalGroupBody').parent().parent().parent().find(':first').remove(); // I heart jQuery! :)
	
	/*
	** 
	** Miscellaneous layout:
	** Notes: This gets squirrely -- will revisit at a later date.
	** 
	*/
	
	// Remove cruft:
	$('#group_1 tr:last').remove();
	
	// Make expand vertically:
	$('#zen13, #group_13, #zen14, #group_14, #contentframe').height('100%');
	
	// Make expand horizontally:
	$('#group_13, #zen_14, #group_14, #contentframe').width('100%');
	
	/*
	** 
	** Editor Tabs: Related Items window
	** Note: If you do not want to wait for an event, use livequery() instead.
	** http://api.jquery.com/live/
	** http://brandonaaron.net/code/livequery/docs
	** Note: I have had problems with livequery recognizing elements created by the Zen framework. :(
	** 
	*/
	
	// I wish I could be more specific here:
	$('#editorTabs table.fieldset .zenLabel').live('click', function() {
		
		var $this = $(this);
		var $this1 = $this.parent().parent(); // Unfortunately, the IDs Zen use appear to change based on tab/story/other, so let's get jiggy with it. :)
		var $z = $this1.find('div.groupClass'); // Can't be specific here, because the IDs change from section to section. :(
		var $f = $('#editorTabs table.styleRowEven span.zenLabel, #editorTabs table.styleRowOdd span.zenLabel'); // File names.
		
		//$z.resizable(); // Major GM/chrome errors!
		
		// Give it the finger:
		$this.css('cursor', 'pointer'); // Better than nothing.
		
		// ...
		// Charlie: Eh, lieutenant, what were you doing there?
		// Goose: Communicating.
		// Maverick: Communicating. Keeping up foreign relations. You know, giving him the bird!
		// Goose: [Charlie looks puzzled, so Goose clarifies] You know, the finger.
		// Charlie: Yes, I know the finger, Goose.
		// Goose: I-I'm sorry, I hate it when it does that, I'm sorry. Excuse me.
		// ...
		
		if ($z.height() == 100) {
			
			$z.css({ 'height' : 'auto', 'overflow' : 'visible' }); // Make expand to show all.
				
			$f.parent().width('250px'); // Make wider. Default is 170px.
			
			// Show the full file name:
			$f.each(function(index) {
				
				var $this2 = $(this);
				var ttl = $this2.attr('title');
				var txt = $this2.text();
				
				$this2.text(ttl); // No more "..."!
				$this2.attr('title', txt); // Swap.
				
			});
			
		} else {
			
			$z.css({ 'height' : '100px', 'overflow' : 'auto' }) // 100px is dti default.
			
			$f.parent().width('170px'); // Make wider. Default is 170px.
			
			// Restore the filename ellipsis:
			$f.each(function(index) {
				
				var $this2 = $(this);
				var ttl = $this2.attr('title');
				var txt = $this2.text();
				
				$this2.text(ttl); // Bring back the "..."!
				$this2.attr('title', txt); // Swap.
				
			});
			
		}
		
	});
	
});
// End closure.

// Start closure:
$(window).resize(function() {
	
	// Looks like Zen might fiddle with #contentframe width/height on window resize, so let's trump:
	$('#contentframe').width('100%').height('100%');
	
});
// End closure.