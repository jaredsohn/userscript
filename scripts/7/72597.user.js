// ==UserScript==
// @name           Gaia - Avatar Undo
// @author         Mister Leo (http://sweetnleo.com)
// @namespace      http://sweetnleo.com/greasemonkey
// @description    Adds an undo button for your avatar dressup page.
// @include        http://www.gaiaonline.com/avatar/*
// @include        http://www.gaiaonline.com/avatar
// ==/UserScript==

/* Begin Script Update Checker code */
var version_scriptURL = "http://userscripts.org/scripts/source/72597.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1269687261680; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
/* End Script Update Checker code */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://projects.indeedle.com/inc/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	// Place the undo button
	$('#btn_cancel').parent('li').after('<li style="margin-left:5px;"><a href="javascript:void(0);" title="Undo the last action" id="gm_undo" class="btn-link cta-btn" style="letter-spacing: 0.1em; margin-top: 11px; display: inline-block; text-decoration:underline; color: #ccc;">Undo</a></li>');
	
	// This array will hold the steps taken, so we can walk backwards to undo the history
	var avatarHistory = [];
	var historyCount = 0; // Keep track of the last ID
	
	var regMulti = new RegExp('^([0-9]+).([0-9]+).([a-zA-Z0-9]+)_([0-9]+).([0-9]+).([a-zA-Z0-9]+)-([a-zA-Z0-9]+)$');
	var regSingle = new RegExp('^([0-9]+).([0-9]+).([a-zA-Z0-9]+)$');
	
	var doNotRecord = false;
	
	// When the item is clicked, we need to record what was clicked
	$('.item-list ul li, .variation_containers ul li').live('click', function(){
		// If doNotRecord is set to true, we need to ignore this click
		if(doNotRecord)
			return false;
	
		// We need to check, are we clicking on a regular item or multi-item
		if($(this).children('img:not([variations])').length == 1){
			var itemID = $(this).children('img:not([variations])').attr('id');
			
			// This is item, but we need to check are we inside a multi-pose window?
			if(regSingle.test(itemID)){
				// Single item
				// Nothing special here, record the ID
				avatarHistory[historyCount] = [itemID, ''];
				historyCount = historyCount + 1;
			}
			else if(regMulti.test(itemID)){
				// Multi item
				// We need to split
				var ids = itemID.split('_'); // ids[0] = parent window id, ids[1] = pose id, we need both
				
				// Now store the action
				avatarHistory[historyCount] = [itemID, ids[0]];
				historyCount = historyCount + 1;
			}
			// Why did we check twice? To make sure we don't do something stupid, like record the close button
		}
		else {
			// This is a multi-pose item opening the multi-pose window
			// We don't actually need to do anything here
		}
		
		DisableHistoryList();
	});		
	
	// This code will run through the array (backwards) and perform each action to undo
	$('#gm_undo').live('click', function(){
		// If the history array is empty, there's nothing to undo
		if(avatarHistory.length > 0){
			// We want to grab the last array value, and remove it
			var itemEvent = avatarHistory.pop();
			doNotRecord = true;
			
			// We have the element, now we want to perform the action
			if(itemEvent[1] == ''){
				// It was a simple item
				var fireOnThis = document.getElementById(itemEvent[0]);
				var evObj = document.createEvent('MouseEvents');
				evObj.initEvent( 'click', true, true );
				fireOnThis.dispatchEvent(evObj);
			}
			else {
				// It was a multi-pose item
				// Open the window
				var fireOnThis = document.getElementById(itemEvent[1]);
				var evObj = document.createEvent('MouseEvents');
				evObj.initEvent( 'click', true, true );
				fireOnThis.dispatchEvent(evObj);
				
				// We're going to do a litlte run throuhg, to wait for the item popup to load
				var maxRec = 10;
				function MN_Wait() {
					maxRec = maxRec - 1;
					if(maxRec < 0){
						alert('We were unable to undo the action.');
						return false;	
					}
						
					if($('img[id="' + itemEvent[0] + '"]').length < 1){
						window.setTimeout(MN_Wait,400);
					}
					else { 
						var fireOnThis = $('img[id="' + itemEvent[0] + '"]').parents('div.variation_containers').children('.ft').children('img[title="reset"]')[0];
						var evObj = document.createEvent('MouseEvents');
						evObj.initEvent( 'click', true, true );
						fireOnThis.dispatchEvent(evObj);
					}
				}
				MN_Wait();
				
			}
			doNotRecord = false;
		}
		
		DisableHistoryList();
	});
	
	// Keep track of the reset
	$('#btn_cancel').click(function(){
		avatarHistory = [];
		historyCount = 0;
		DisableHistoryList();
		doNotRecord = false;
	});
	
	var DisableHistoryList = function(){
		if(avatarHistory.length == 0)
			$('#gm_undo').css('color', '#cccccc');
		else
			$('#gm_undo').css('color', '#ffffff');
	}	
}