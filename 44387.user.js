// Author: James Sofra (James.Sofra@gmail.com)
//
// ==UserScript==
// @name           OWA 2007 Multi-selector
// @namespace      OWA.multiselector
// @description    This allows you to select multiple messages in OWA 2007 using the shift key in a similar style to Gmail. 
// @include        *
// ==/UserScript==
// Add jQuery

var JQInclude = document.createElement('script');
JQInclude.src = 'http://jquery.com/src/jquery-latest.js';
JQInclude.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(JQInclude);

// Check if jQuery's loaded
function waitForJQuery() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitForJQuery,100); }
	else { $ = unsafeWindow.jQuery; runJQuery(); }
}
waitForJQuery();

var SHIFT_DOWN = false
		
// All your GM code must be inside this function
function runJQuery() {
	
	$(window).keydown(function(event){
		if (event.keyCode = 16) {
			SHIFT_DOWN = true;
		}
	});

	$(window).keyup(function(event){
		if (event.keyCode = 16) {
			SHIFT_DOWN = false;
		}
	});

	var allCheckBoxes = $(":checkbox[name='chkmsg']");
	var start = -1;

	allCheckBoxes.click(function(e){	
		if (SHIFT_DOWN == false) {
			start = allCheckBoxes.index($(e.target));
		} else {
			var end = allCheckBoxes.index($(e.target));
			
			if (allCheckBoxes.eq(start).attr("checked") == true) {	
				if (start > end) {
					temp = start;
					start = end;
					end = temp;
				}

				var selectedBoxes = allCheckBoxes.slice(start, end);
				selectedBoxes.attr("checked", true);
				var selectedRows = $('table.lvw tbody:first').children().slice(start + 2, end + 2);
				selectedRows.addClass("sl");
				selectedRows.children("td[class='sc']").removeClass("sc").addClass("sr");
			}
		}
		
	});

}
