// ==UserScript==
// @name           Global Todo
// @namespace      http://userscripts.org/users/72838
// @include        *
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery () {
	function makeTodo () {
		var sel = window.getSelection();
		var txt = sel.toString();
			if (! txt) { return; }
	    var range = sel.getRangeAt(0); 
	    var par = range.commonAncestorContainer;
	    
	    var checkerIndex = 0;
	    
	    //Remove all existing checkboxes
	    $("._gsCheckbox").parent().css({'color' : null});
		$("._gsCheckbox").remove();
	    
	    $(par).children().each(function () {
	    	if (! sel.containsNode(this, 1))
	    		return;
	    		
	    	var this_id = '_gsChecker' + checkerIndex;
	    	
	    	$(this).prepend('<input type="checkbox" class="_gsCheckbox" id="' + this_id + '"> ');
	    	
	    	$('#' + this_id).change(function () {
			if ($(this).attr("checked")) {
				//do the stuff that you would do when 'checked'
				$(this).parent().css({'color' : 'green'});
			}
			else {
			   	$(this).parent().css({'color' : 'red'});
			}
	    	});
	    	
	    	checkerIndex++;
	    });
	}
	
	unsafeWindow.onmouseup = function () {
		makeTodo();
	};
}