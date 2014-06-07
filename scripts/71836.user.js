// ==UserScript==
// @name           Gaia - Search Avatar
// @author         Mister Leo (http://sweetnleo.com/)
// @namespace      http://userscripts.org/scripts/show/71836
// @description    Allows you to easily locate items inside your inventory
// @include        http://www.gaiaonline.com/avatar/*
// ==/UserScript==
/* Begin Script Update Checker code */
var version_scriptURL = "http://userscripts.org/scripts/source/71836.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1269124042549; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
/* End Script Update Checker code */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://projects.indeedle.com/inc/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Add scroll
var GM_JQ2 = document.createElement('script');
GM_JQ2.src = 'http://projects.indeedle.com/inc/jquery.scroll.js';
GM_JQ2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ2);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	// Theme the bloody thing
	$('head').append("<style type=\"text/css\">#inv_itemsearch_gs { width: 338px; float:right; margin: 5px 10px 0px 0px; text-align:right; } #inv_itemsearch_gs_input { font-size: 12px; background: #fff; border: 1px solid #8D8E9F; width: 195px; margin-right: 5px; margin-top:2px; } #inv_itemsearch_gs label { display:none; } #execItemSearch_gs { background: pink; float: right;} .gsHighlight img { background: #FFF15F; border: 1px solid #DFCC00!important; } .gsHighlight img:hover { border: 2px solid #DFCC00!important; } .gs_tabfound a em { font-weight: bold!important; text-decoration: underline!important; color: #3D184F!important; } #gs_results_span { font-size: 11px; float:right; margin: 4px 10px 0px 0px; }</style>");

	// This function grabs the value from the search textbox and does a .find to see if there are any element(s) with the same title
	FindItemByText = function(){
		// Clear the colors
		$('.gsHighlight').each(function(){
			$(this).removeClass('gsHighlight');
		});
		
		$('.gs_tabfound').each(function(){
			$(this).removeClass('gs_tabfound');
		});
		
		$('#gs_results_span').html('');
	
		// Get the search value
		var searchValue = $.trim($('#inv_itemsearch_gs_input').val().toLowerCase());
		if(searchValue.length < 1)
			return false;

		var myregexp = new RegExp(searchValue);
			
		// Search for the item and loop around
		var foundItems = $('div.item-list').find('li img').filter(function(index) {
			// We need to check if the title of this element has the title in it
			return myregexp.test($(this).attr('title').toLowerCase());
		});
								
		// If no items are found, display an error
		if(foundItems.length == 0){
			$('#gs_results_span').html('No matching items found. (Only loaded tabs are checked)');
			return false;
		}
		else{
			// Keep track of what tabs were found
			var lastTab = '';
			var firstItem = '';
			var tabCount = 0;
		
			// Items were found, color them
			$(foundItems).each(function(){
				// Add the class
				$(this).parent().addClass('gsHighlight');
				
				// Work out what the current tab is
				var parentTab = $(this).parents('.item-list');
				// Check to see what the last found tab was, so we can keep track of how many tabs the results span
				if(lastTab != $(parentTab).attr('id')){
					// Increment the tab count
					tabCount = tabCount + 1;
					lastTab = $(parentTab).attr('id');
					
					// Add a class to the tab
					$('#' + lastTab + '_tab').addClass('gs_tabfound');
				}
				
				// Work out if we're on the current tab
				if(firstItem == '' && $(parentTab).attr('id') + '_tab' == $('ul.yui-nav .selected').attr('id'))
					firstItem = $(this);
			});
			
			// If we have some results, click the last found tab (to be lazy)
			if(foundItems.length > 0){
				// $('#' + lastTab + '_tab a').trigger('click'); // Not sure how to activate it
				if(firstItem != '')
					$('#gaia_content #center .yui-content').scrollTo($(firstItem), {
						offset: { top: -10 }
					});	

				$('#gs_results_span').html('<strong>' + foundItems.length + '</strong> items found throughout <strong>' + tabCount + '</strong> tab');
				if(tabCount > 1)
					$('#gs_results_span').html($('#gs_results_span').html() + 's');
			}
		}
	}
	
	// Add the search menu
	$('#outfits_tab').after('<div id="inv_itemsearch_gs"><input type="text" name="inv_itemsearch_gs_input" id="inv_itemsearch_gs_input" value="" /> <div id="execItemSearch_gs" title="Search the Inventory"><a class="info_button" href="javascript:void(0)"><span class="button_cap">&nbsp;</span><span class="button_text">Search</span></a></div><br /><span id="gs_results_span">&nbsp;</span></div>');
	
	// Trigger the search
	$('#execItemSearch_gs a').live('click', function(){
		FindItemByText();
	});
	$('#inv_itemsearch_gs_input').live('change', function(){
		FindItemByText();
	});
	
};