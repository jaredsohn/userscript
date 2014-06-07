// ==UserScript==
// @name       Feedly Preview
// @namespace  http://carygao.info
// @version    0.1
// @description  Add preview link to feedly
// @match      http://*.feedly.com/*
// @copyright  2012+, Cary
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {

	appendPreview();

});

function appendPreview() {

	setInterval(function() {
		var main_wikiBar = $('span[id*=_main_wikiBar],div[id*=_main_wikiBar]');
		//console.log(main_wikiBar.html());
		if (main_wikiBar.html() != null) {

			main_wikiBar.each(function(event) {
				var child = $(this).children('span[data-page-entry-action="previewEntry"]');
				//console.log(child.html());
				if (child.html() == null) {
					//console.log($(this).attr('data-entryid'));

					var data_entryid = $(this).attr('data-entryid');

					$(this).append('<span style="color:#CFCFCF">&nbsp;//&nbsp;</span>');
					$(this).append('<span class="action" data-page-entry-action="previewEntry" data-entryid="' + data_entryid + '">preview</span>');
				}

			});
		}
	}, 1000);

}