// ==UserScript==
// @name           DMOZ category link checker
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @namespace      http://www.codespin.ch (lab2@codespin.ch)
// @description    Checks through GM_xmlhttpRequest if a link within the category is broken or still active
// @license        Creative Commons Attribution License
// @version		   2.4
// @include        http://www.dmoz.org/editors/*
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: https://addons.mozilla.org/de/firefox/addon/greasemonkey/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list and click uninstall
 *
 * Creative Commons Attribution License
 * http://creativecommons.org/licenses/by/2.5/
 */

/*	Tested on 
 * 	Firefox 12.0 with Greasemonkey 0.9.18
 */

var lnk, failed, errors, lnklen, tests;
var result = "<span class='cds' style='font-size: 12px;padding-left:3px;padding-right:3px;margin:3px;color:#111;font-weight: bold;'></span>";
var output = "<span class='out' style='margin: 3px;'></span>";

function getLinks() {
	lnklen = 0, tests = 0, errors = 0, failed = 0;
	// remove http results from result span
	if ($('.cds').length > 0)
		$('.cds').remove();
	// remove output text
	if ($('.out').length > 0)
		$('.out').remove();
	//add output span %
	$('input#chk').after(output); 
	
	jQuery.each(arguments, function(index, value) {
		$(value).each(function() {
			// do not verify 'edit' button links
			if (!/edit?/i.test(this)) {
				lnklen++;
				checkLink(this);
			}
		});
	});
}

function checkLink(lnk) {
	this.lnk = lnk;
	lnk.target = "_blank";
	
	GM_xmlhttpRequest({
		method : 'GET',
		url : lnk.href,
		onload : function(response) {
			if (response.readyState == 4 && response.status == 200) {
				tests++;
				percent = Math.round(tests/lnklen*100);
				$('.out').html(percent+"% ("+lnklen+"): "+failed+" Failed"+", "+errors+" Errors");
			} 
			if (response.readyState == 4 && response.status != 200) {
				tests++;
				failed++;
				percent = Math.round(tests/lnklen*100);
				$('.out').html(percent+"% ("+lnklen+"): "+failed+" Failed"+", "+errors+" Errors");
				$(result).html(response.status).css({
					"background" : "#FFFFCC",
					"border" : "1px solid #FFD324"
				}).insertBefore(lnk);
			}
		},
		onerror : function() {
			tests++;
			errors++;
			percent = Math.round(tests/lnklen*100);
			$('.out').html(percent+"% ("+lnklen+"): "+failed+" Failed"+", "+errors+" Errors");
			$(result).html("N/A!").css({
				"background" : "#FFB5D1",
				"border" : "1px solid #FF7CAE"
			}).insertBefore(lnk);
		}
	});
}

function createButton(elementTag) {
	var btn = $('<input/>').attr({
		type : 'button',
		value : 'Check links',
		id : 'chk',
		class : 'btn utds'
	});
	$(elementTag).after(btn);
	return btn;
}

$(document).ready(
		function() {
			// category edit pages links check
			if ($('ul').hasClass('edit') && $('div').hasClass('nav-pnl')) {
				createButton('div.nav-pnl').click(function() {
					getLinks('ul.edit > li > a', 'ul.edit > li > i > a');
				});
			}

			// unreviewed old mode links check
			// Thanks to tanstaaf1 for if improvement for super mode
			if (!/power/.test(self.location.href) && !/super/.test(self.location.href)
					&& /editunrev/.test(self.location.href)) {
				createButton('fieldset.form-ct').click(function() {
					getLinks('fieldset.form-ct > ul > li > a');
				});
			}

			// unreviewed power mode links check
			// Thanks to tanstaaf1 for if improvement for super mode
			if ((/power/.test(self.location.href) || /super/.test(self.location.href))
					&& /editunrev/.test(self.location.href)) {
				createButton('fieldset.form-ct > form').click(function() {
					getLinks('fieldset.form-ct > form > ul > li > a', 'fieldset.form-ct > form > ul > li > i > a');
				});
			}
		});