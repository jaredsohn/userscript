// ==UserScript==
// @name           CS direct group access
// @description    Hit the key 'ctrl + g' on any CS page to get your group-list. 
// @namespace      www.simön.de
// @include        http://*couchsurfing.com/*
// @include        http://*couchsurfing.org/*
// @exclude        http://*couchsurfing.com/group.html
// @exclude        http://*couchsurfing.org/group.html
// ==/UserScript==

var $;

function eventHandler(e) {
	if (e.ctrlKey && e.keyCode == 71){
		e.preventDefault();
		
		$('#gm_group_box').load('http://www.couchsurfing.org/group.html table.main-container', requestHandler);
		
		
	}else{
		return;
	}
};

function requestHandler(text){	
	
	$('#gm_group_box').html($('#gm_group_box .personalbox').html());
	$('#gm_group_box .classicbox').remove();
	$('#gm_group_box .headerbox').remove();
	$('#gm_group_box tr').each(function(){ $(this).children('td:gt(1)').remove();});
	$('#gm_group_box').css('width', '400px');
	$('#gm_group_box').css('max-height', '400px');
	$('#gm_group_box').css('overflow', 'scroll');
	$('#gm_group_box').css('border', '1px solid black');
	$('#gm_group_box').css('right', '10px');
	$('#gm_group_box').css('bottom', '10px');
	$('#gm_group_box').css('z-index', '100');
	$('#gm_group_box').css('display', 'block');
	
}

function jQueryIsReady($) {

	document.addEventListener("keydown", eventHandler, false); 
	$('<div id="gm_group_box" style="display:none; position:fixed;">Test</div>').insertBefore('#bodycontent');
  
};

// ----------------------------------------------------------------------
// Greasemonkey/GreaseKit compatibility
// ----------------------------------------------------------------------


if (typeof(unsafeWindow) === 'undefined') {
 unsafeWindow = window;
}

// Based on http://userscripts.org/topics/1912
if (typeof(GM_addStyle) === "undefined") {
  GM_addStyle = function(styles) {
    var oStyle = document.createElement("style");
    oStyle.setAttribute("type", "text/css");
    oStyle.appendChild(document.createTextNode(styles));
    document.getElementsByTagName("head")[0].appendChild(oStyle);
  }
}


// ----------------------------------------------------------------------
// jQuery
// ----------------------------------------------------------------------

var script = document.createElement('script');
script.src = 'http://jquery.com/src/jquery-latest.js';
script.type = 'text/javascript';
script.addEventListener("load", function() {
  unsafeWindow.jQuery.noConflict();
  $ = unsafeWindow.jQuery;
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);