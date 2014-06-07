function parseHeaders(text) {
	var headers = {}, name, value;
	for each (var line in text) {
		[, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
		headers[name] = value;
	}
	return headers; 
}

var META = parseHeaders(<><![CDATA[
// ==UserScript==
// @name          Subtitle Check for MyEpisodes
// @namespace     http://www.webmonkey.com
// @description   Add subtitle checkboxes to the Episode List on MyEpisodes.
// @version       0.1.1
// @author        TLGreg
// @include       http://www.myepisodes.com/views.php
// @include       http://myepisodes.com/views.php
// @include       http://www.myepisodes.com/views.php?
// @include       http://myepisodes.com/views.php?
// @require       http://code.jquery.com/jquery-latest.js
// @releaseURL    http://userscripts.org/scripts/source/44111.meta.js
// @scriptURL     http://userscripts.org/scripts/source/44111.user.js
// ==/UserScript==
]]></>.toString().split(/\n/).filter(/\/\/ @/));

//**************************************************************************************//
//	v0.1.1:
//		+ Added auto-update feature.
//		+ Using @require and so locale storage for jQuery, simpler, faster.
//		+ With document.ready the checkbox skipping bug seems to be disappeared.
//
//	TODO:
//		Settings for changing the checkbox position (before A, between A & W, after W).
//		Make it for epsbyshow and quickcheck.
//		Make a 'SUBBED' link for All-In-One!.
//
//**************************************************************************************//

$(document).ready(function() {
	
	// Check for UPDATE
	// If there is a new version then it pops up an alert, then opens up the script from userscripts.
	
	var cVerS = META['version'].split('.');
	var cVer = cVerS[0]*100+cVerS[1]*10+cVerS[2]/1;
	GM_xmlhttpRequest({
		method:'GET',
		url:META['releaseURL'],
		headers:{
			'User-Agent':navigator.userAgent,
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8',
			'Cache-Control':'no-cache',
			'Pragma':'no-cache'
		},
		onerror:function() {
			GM_log('An error occured while trying to check for an update.');
		},
		onload:function(response) {
			var outerMETA = parseHeaders(response.responseText.split(/\n/).filter(/\/\/ @/));
			var tVerS = outerMETA['version'].split('.');
			var tVer = tVerS[0]*100+tVerS[1]*10+tVerS[2]/1;
			if (tVer > cVer) {
				alert('There is a new version of \'Subtitle Check for MyEpisodes\', please reinstall it.');
				GM_openInTab(META['scriptURL']);
			}
		}
	});
	
	// search for a string in an array
	// returns the position of it in the array or null if not found any
	function searchArray(arr,str) {
		var tV = null;
		for (i=0; i<arr.length; i++) {
			if (arr[i] == str) {
				tV = i;
				break;
			}
		}
		return tV;
	}

	// initiate
	
	var sub_in = GM_getValue('eps',null);
//	window.setTimeout(function() { var sub_in = GM_getValue('eps',null); });
	
	var subs = new Array();
	var wtcd = new Array();
	var out = new Array();
	
	if (sub_in != null) { subs = sub_in.split('|'); }
	
	
	// DOM
	
	var actives = $('tr.Episode_PastOne,tr.Episode_PastTwo,tr.Episode_Today');
	var last_inputs = actives.find('td.status:last').find('input');
	
	// insert checkboxes
	actives.find('td.epname').after('<td class="subtit"><input type="checkbox" class="subchk" /></td>');
	$('th[title="Aquired"]').before('<th title="Subtitle">S</th>');
	$('tr.Episode_One td.epname,tr.Episode_Two td.epname').after('<td></td>');
	var sub_inputs = $('input.subchk');
	
	// Change the id of the new checkbox to the line's
	for (i=0; i<last_inputs.length; i++) {
		sub_inputs[i].id = last_inputs[i].id.substring(1);
	}
	
	// check the checkboxes if any has been saved before
	// if none been saved before then remove the empty value from the array
	if (subs[0] != '') {
		for (i=0; i<subs.length; i++) {
			$('#'+subs[i]).attr('checked',' ');
		}
	} else {
		subs.splice(0,1);
	}
	
	// subtitle checkbox event
	// checking: adds the current ID to the subs container if it is not in there
	// unchecking: removes the current ID from the subs container
	sub_inputs.bind('click',function() {
		var cID = $(this).attr('id');
		if ($(this).is(':checked')) {
			if (searchArray(subs,cID) == null) {
				subs.push(cID);
			}
		} else {
			var cSrc = searchArray(subs,cID);
			if (cSrc != null) {
				subs.splice(cSrc,1);
			}
		}
	});
	
	// watched checkbox event
	// checking: disable the subtitle checkbox and adds the current ID to the wtcd container if it is not in there
	// unchecking: reenable the subtitle checkbox and removes the current ID from the wtcd container
	last_inputs.bind('click',function() {
		var cID = $(this).attr('id').substring(1);
		if ($(this).is(':checked')) {
			$('input#'+cID).attr('disabled','disabled');
			if (!searchArray(wtcd,cID)) {
				wtcd.push(cID);
			}
		} else {
			$('input#'+cID).removeAttr('disabled');
			var cSrc = searchArray(wtcd,cID);
			if (cSrc != null) {
				wtcd.splice(cSrc,1);
			}
		}
	});
	
	// Save Status event
	// removes every watched IDs from the subtitle container
	// updated the script config Value from the subtitle container
	$('input[value="Save Status"]').bind('click',function(event) {
		for (i=0; i<wtcd.length; i++) {
			var cSrc = searchArray(subs,wtcd[i]);
			if (cSrc != null) {
				subs.splice(cSrc,1);
			}
		}
		
		window.setTimeout(function() {
			out = subs.join('|');
			GM_setValue('eps',out);
		});
	});
});