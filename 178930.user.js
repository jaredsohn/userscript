// ==UserScript==
// @id             www1.nbnco.com.au-298e7edf-5e1f-4b22-8438-a42207dc15b4@http://nbn.skymesh.net.au
// @name           NSOC Validate SAMSID
// @version        1.0
// @namespace      http://nbn.skymesh.net.au
// @author         David Toso
// @description    blah
// @include        https://www1.nbnco.com.au/online_customers/page/order/avc/new/setup
// @run-at         document-end
// @require				 http://code.jquery.com/jquery-1.10.2.min.js
// @grant					 GM_addStyle
// ==/UserScript==

(function(){
	if ($ && $('#referenceID')) {
		console.log("found reference ID");
		var handler = function(evt) {
			var input = $('#referenceID');
			var td = input.parent();
			var contents = input.val()+"";
			if (contents.length != 12) {
				$('img.status-image', td).remove();
				td.append('<img class="status-image" src="http://tina.skymesh.net.au/nsoc_red_cross.png" border=0>');
			} else if (!/^SAMS0+[1-9][0-9]{4,5}$/.test(contents)) {
				$('img.status-image', td).remove();
				td.append('<img class="status-image" src="http://tina.skymesh.net.au/nsoc_red_cross.png" border=0>');
			} else {
				$('img.status-image', td).remove();
				td.append('<img class="status-image" src="http://tina.skymesh.net.au/nsoc_green_tick.png" border=0>');
			}
		};
		$('#referenceID')
			.bind('click', handler)
			.bind('change', handler)
			.bind('keyup', handler);
		handler();
	}
})();
