// ==UserScript==
// @name           Redmine - Only Show X Most Recent Posts v1.2
// @namespace      www.vertigofx.com
// @include        https://redmine.exodus-enterprises.com/issues/*
// ==/UserScript==


var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	//alert($); // check if the dollar (jquery) function works
	//alert($().jquery); // check jQuery version
	

	var options = '<span style="margin-top:-4px;float:right;text-align:right;font-size:12px;">Show <input id="divCount" type="text" value="10" style="width:20px;font-size:10px;" onkeydown="if (event.keyCode == 13) document.getElementById(\'divCountButton\').click()" /> most recent posts (of '+$("#history > div.journal").length+' total) <input id="divCountButton" type="button" value="Go" /></span>';

	$("#history > h3:contains('History')").append(options);
		
	if ($("#history > div.journal").length > 10) {
		$("#history > div.journal").slice(0,$("#history > div.journal").length-10).css("display","none");
	} else {
		$('#divCount').val($("#history > div.journal").length);
	}

	

	$("#divCountButton").click(function() {
		if ($("#history > div.journal").length > $('#divCount').val()) {
			$("#history > div.journal").slice(0,$("#history > div.journal").length).css("display","block");
			$("#history > div.journal").slice(0,$("#history > div.journal").length-$('#divCount').val()).css("display","none");
		} else {
			$('#divCount').val($("#history > div.journal").length);
		}
	});

	
	
	
	
}