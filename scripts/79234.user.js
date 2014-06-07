// ==UserScript==
// @name           MediaWiki History Sparkline
// @namespace      http://zak.greant.com/greasy
// @description    Display a sparkline (aka tiny graph) of recent changes to the current MediaWiki page
// @include        *
// @require        http://code.jquery.com/jquery-1.3.min.js
// @require        http://omnipotent.net/jquery.sparkline/1.5.1/jquery.sparkline.min.js
// @license        Simplified BSD License (see end of file)
// ==/UserScript==

// todo: add popup sparkline key and help info to graph display
// todo: display other graphs - eg. top contributors
// todo: add windowshade feature
// todo: make sparklines draggable
// todo: allow configuration of periods - inc. length, number displayed, etc.
// todo: ignore or flag reverts and undos
// todo: tidy and comment code

var scriptName = 'MW History Sparkline';
var scriptVersion = '0.2';
var scriptLocation = 'http://github.com/zakgreant/Miscellaneous/tree/master/mw_history_sparkline';

// require login so that it is easier to track overuse of this script
if( /^Special:UserLogin/.test(unsafeWindow.wgPageName) ){
	// don't bug people when they are logging in

} else if( null === unsafeWindow.wgUserName ){
	window.alert( 'You must be logged in to ' + unsafeWindow.wgServer + ' to use the ' + scriptName +' Greasemonkey script.' );

// only run the script for MediaWiki article pages on MediaWiki servers with the API enabled
} else if( true === unsafeWindow.wgEnableAPI && 'view' == unsafeWindow.wgAction && unsafeWindow.wgArticleId ){
	// fetch history page, grab data, then show sparklines for current wikipedia/mediawiki page
	GM_xmlhttpRequest({
		method: 'GET',
		headers: {
			'Accept-Encoding': 'gzip',
			'User-Agent': scriptName + ' v' + scriptVersion + ' from ' + scriptLocation + ' (used by ' + unsafeWindow.wgUserName + '@' + unsafeWindow.wgDBname + ')'
		},
		url: makeHistoryPageURL( window.location.href ),
		onload: function(response) {
			if(response.status == 200) {
				makeSparklines( response.responseText );
			}
		}
	});
}

// make URL for current articles history page
function makeHistoryPageURL( pageURL ){
	var d = new Date();
	var revisionQuery = unsafeWindow.wgServer + '/w/api.php?'
		+ 'action=query'
		+ '&format=json'
		+ '&prop=revisions'
		+ '&rvend=' + (d.getUTCFullYear() - 3) + '-' + pad( d.getUTCMonth() ) + '-' + pad( d.getUTCDate() )+'T' + pad( d.getUTCHours() ) +':' + pad( d.getUTCMinutes() ) +':' + pad( d.getUTCSeconds() )+'Z'
		+ '&rvprop=size|timestamp'
		+ '&pageids=' + unsafeWindow.wgArticleId;
	return( revisionQuery );
}


// process data and generate sparklines
function makeSparklines( json ){
	var data = {};			// store sparkline data
	var day = 86400000;
	var now = Date.now();
	var revisions = [];		// set default value for revisions - important when no revisions are returned

	var query = JSON.parse(json).query; 
	for( page in query.pages ){
		if( 'revisions' in query.pages[page] ) {
			revisions = query.pages[page].revisions;
		}
		break;
	}

	// periods to make sparklines for. order of array elements matters
	var periods = [
		{label:'3years', length:day*365.25*36, segments:36, title:"last 3 years"},
		{label:'6months', length:day*30*6, segments:24, title:"last six months"},
		{label:'week', length:day*7, segments:28, title:"last week"},
	];

	for( i in periods ){
		var period = periods[i];

		var bytesChanged = [];
		var changeCount = [];
		var counter = 0;

		for( var n = 0; n < period.segments; ++n ){
			var bytesPerSegment = 0;
			var changesPerSegment = 0;

			if( 0 !== counter && counter == revisions.length ){
				bytesPerSegment = null;
				changesPerSegment = null;
			}

			while( counter < revisions.length && Date.parse(revisions[counter].timestamp) > (now - (period.length / period.segments) * n) ){
				bytesPerSegment += revisions[counter].size;
				++changesPerSegment;
				++counter;
			}

			bytesChanged.unshift( bytesPerSegment );
			changeCount.unshift( changesPerSegment );
		}
		data[period.label] = [bytesChanged, changeCount];
	}

	var sparkline = document.createElement('div');
	sparkline.style.position = 'absolute';

	for( p in periods ){
		var period = periods[p];
		sparkline.innerHTML += '<div style="color: #AAA; font-size:7pt; background: #FFF; padding:0.1em; position:relative; float:left; z-index:100; text-align:center;">'
								+ '<span id="sparkline_' + period.label + '" style="border-bottom:thin solid #CCF;position:absolute;"></span>'
								+ '<span id="sparkline_changes_' + period.label + '" style=""></span><br />'
								+ '<span style="">' + period.title + '</span>'
							+ '</div>';
	}

	if( revisions.length ){
		var elapsedTime = Math.floor( (now - Date.parse(revisions[revisions.length-1].timestamp)) / day );
	} else {
		var elapsedTime = 365.25 * 3;
	}

	sparkline.innerHTML += '<span style="color: #AAA; font-size:7pt; background: #FFF; top:0.75em; padding:1em; position:relative; z-index:100;"> ' 
						+ revisions.length + ' changes in the last ' + (1 == elapsedTime ? 'day' : elapsedTime +  ' days') + '</span>';
	
	document.body.insertBefore( sparkline, document.body.firstChild );

	for( p in periods ){
		var period = periods[p];
		$('#sparkline_changes_' + period.label).sparkline( data[period.label][1], {type:'bar', barColor:'#ccf', barSpacing:0, barWidth: 3, height:'1.3em'} );
		$('#sparkline_' + period.label).sparkline( data[period.label][0], {composite: true, fillColor: false, height:'1.3em', lineColor:'blue'} );
	}
}

function pad( val ){
	return val < 10 ? '0' + val : val;
}
/*
	Simplified BSD License

	Copyright (c) 2010, MediaWiki Foundation
	All rights reserved.

	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:

		* Redistributions of source code must retain the above copyright
		  notice, this list of conditions and the following disclaimer.

		* Redistributions in binary form must reproduce the above copyright
		  notice, this list of conditions and the following disclaimer in the
		  documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
	LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	POSSIBILITY OF SUCH DAMAGE.
*/
