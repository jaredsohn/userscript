// Google Maps Print: Skip Steps
// version 1.1 beta
// created 2008-09-10 (last updated: 2009-02-23)
// Author: Aaron McBride (http://www.apejet.org/aaron/)
// License: public domain (attribution appreciated)
//
// Changes:
// 0.1 - 2008-09-10
//      Just getting started
// 1.0 - 2008-09-11
//	It now does just about everything I need.  Ship it!
// 1.1.1 - 2009-02-23
//	Updated to check for frame and 
//	tweaked attribute selector syntax for new version of jQuery.
//	Show and hide a with animation.
//
// ==UserScript==
// @name           Google Maps Print: Skip Steps
// @namespace      http://www.apejet.org/aaron/
// @description    Allows you to skip driving direction steps when printing Google Maps directions.  The skip button shows up on the little mouse over tab.
// @include        http://maps.google.com/maps?*
// ==/UserScript==

//only run if not in a frame
if(unsafeWindow == unsafeWindow.top) {
	
	//include jQuery (include code based on http://www.joanpiedra.com/jquery/greasemonkey/)
	var jqScript = document.createElement('script');
	jqScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
	document.getElementsByTagName('head')[0].appendChild(jqScript);
	
	// wait for jQuery to load
	var jQueryWaitCount = 20;
	function waitForJQuery(retryCount) {
		if(typeof unsafeWindow.jQuery == 'undefined') {
			if(jQueryWaitCount--)
				window.setTimeout(waitForJQuery, 500);
		} else {
			$ = unsafeWindow.jQuery;
			jQueryReady();
		}
	}
	waitForJQuery();
}

//jQuery has loaded... let's get everything set up
function jQueryReady() {
	//inject my "public" functions into the page
	unsafeWindow.GMPSS = {};
	unsafeWindow.GMPSS.skipStep = skipStep;
	unsafeWindow.GMPSS.showStep = showStep;

	$('.step_tab_text').each(function () {
		var stepId = $('a[id^=st_tx]', this).attr('id');
		if(stepId) {
			stepId = stepId.substring(5);
			$(this).append(" | <a href=\"#skipStep_" + stepId + "\" onclick=\"javascript:GMPSS.skipStep('" + stepId + "');return false;\">Skip " + stepIdToNum(stepId) + "</a>");
		}
	});
}

function skipStep (stepId) {
	var leg = stepId.split('_')[0];
	
	//get the div holding the list of skipped steps
	var skippedlist = $('#skippedlist_' + leg);
	if(skippedlist.length == 0) {
		$('.segmentdiv:has(#step_' + leg + '_0' + ')').before("<div id='skippedlist_" + leg + "'><span class='skiptitle'></span>: <span class='steps'></steps>");
		skippedlist = $('#skippedlist_' + leg);
		skippedlist.data('stepIds', []);//init data to empty array
	}

	//get the list of stepIds
	var stepIds = skippedlist.data('stepIds');
	
	//add this stepId to the data
	stepIds.push(stepId);
	stepIds.sort(function (a, b) {
		return stepIdToNum(a) - stepIdToNum(b);
	});
	
	//render
	renderStepList(skippedlist, stepIds)
	
	var segment = $('.segmentdiv:has(#step_' + stepId + ')');
	segment.hide('slow');
	
	//fixAlternatingBackgroundColors();
};

function showStep (stepId) {
	var leg = stepId.split('_')[0];
	
	//get the div holding the list of skipped steps
	var skippedlist = $('#skippedlist_' + leg);
	
	//get the list of stepIds
	var stepIds = skippedlist.data('stepIds');
	
	//remove this stepId
	var i = stepIds.indexOf(stepId);
	stepIds.splice(i, 1);
	
	//render
	renderStepList(skippedlist, stepIds)

	var segment = $('.segmentdiv:has(#step_' + stepId + ')');
	segment.show('slow');
	
	//fixAlternatingBackgroundColors();
};

function stepIdToNum(stepId) {
	//step ids are like: 0_2 for leg #1, step #3 (zero based)
	return Number(stepId.split('_')[1]) + 1;
}

function renderStepList(skippedlist, stepIds) {
	
	if(stepIds.length == 0) {
		skippedlist.hide();
	} else {
	
		if(stepIds.length == 1) {
			$('.skiptitle', skippedlist).html('Skipping Step');
		} else {
			$('.skiptitle', skippedlist).html('Skipping Steps');	
		}
		var linkTexts = "";
		for(var i = 0; i < stepIds.length; i++) {
			var stepId = stepIds[i];
			if(i != 0) linkTexts += ", ";
			linkTexts += "<a href=\"#showStep_" + stepId + "\" onclick=\"javascript:GMPSS.showStep('" + stepId + "');return false;\">" + stepIdToNum(stepId) + "</a>";
		}
		$('.steps', skippedlist).html(linkTexts);
		
		skippedlist.show();
	}
	
}

function fixAlternatingBackgroundColors() {
	//this causes problems with the right and left turn arrows because they have background colors
	
	//segmentdiv dirstep_white or segmentdiv dirstep_shaded
	$('div.segmentdiv:visible:odd').removeClass('dirstep_shaded');
	$('div.segmentdiv:visible:odd').addClass('dirstep_white');
	
	$('div.segmentdiv:visible:even').removeClass('dirstep_white');
	$('div.segmentdiv:visible:even').addClass('dirstep_shaded');
}