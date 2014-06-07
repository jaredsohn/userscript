// ==UserScript==
// @name           Link to GrapeStories
// @namespace      http://www.grapestories.com/
// @include        http://lastcallwines.com/*
// @include        http://www.lastcallwines.com/*
// @include        http://cinderellawine.com/*
// @include        http://www.cinderellawine.com/*
// @include        http://tillsoldout.com/*
// @include        http://www.tillsoldout.com/*
// @include        http://winestilsoldout.com/*
// @include        http://www.winestilsoldout.com/*
// @include        http://wtso.com/*
// @include        http://www.wtso.com/*
// @include        http://wine.woot.com/
// @include        http://wine.com/private-cellar/*
// @include        http://www.wine.com/private-cellar/*
// @include        http://wineryinsider.com/*
// @include        http://www.wineryinsider.com/*
// ==/UserScript==

// There are lots of wine-a-day sites. Let's link 'em to GrapeStores aka CellarTracker.

var removeTerms = /\b(winery|wines?|vineyards?|cellars?|docg?|fratelli|family|blend|wine|ws\s*\d+|iwc\s*\d+|wa\s*\d+|save)\b/ig;

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
    function letsJQuery() {
		$('A[href*="iWine="]').each(function() {
			var ctId = $(this).attr('href').replace(/.+iWine=(\d+).*/, "$1");
			grapeStoriesLink('','http://www.grapestories.com/wine.asp?iWine='+ctId);	
		});
		if( document.location.href.match(/^http:\/\/(www\.)?lastcallwines/i) ) {
			var name = $('.ProductNameText').html()
				.replace(/\*.+/, '');
			grapeStoriesLink(name);
		} else if( document.location.href.match(/^http:\/\/(www\.)?(wtso|tillsoldout|winestilsoldout)/i) ) {
			var name = $('.bodyRgtPadTop P:first').text()
				.replace(/\n/g, ' ')
				.replace(/\s+/g, ' ')
				.replace(/\b\s*[89][0-9] .+/g, ' ') // 90 points etc
				.replace(/Free .+/, '');
			grapeStoriesLink(name);
		} else if( document.location.href.match(/^http:\/\/(www\.)?cinderellawine/i) ) {
			var name = $('A.dyntextval:first').text()
				.replace(/ '/g, ' 20');
			grapeStoriesLink(name);
		} else if( document.location.href.match(/^http:\/\/(www\.)?wine\.com/i) ) {
			var name = $('#content H1:first').text();
			grapeStoriesLink(name);
		} else if( document.location.href.match(/^http:\/\/wine\.woot\.com/i) ) {
			// This one works a little differently
			var wineryName = $('h2.fn').text().replace(/-.+/, ''); // hmm
			$('dd').each(function() {
				var content = $(this).text();
				var m = content.match(/^\s*(\d)\s+(.+)/);
				if( !m ) { return; }
				$(this).html( content + ' <a href="' + createGsUrl(wineryName + ' ' + m[2]) + '" style="background-color: yellow;">GrapeStories</a>');
			});
		} else if( document.location.href.match(/^http:\/\/(www\.)?wineryinsider/i) ) {
			// This one works a little differently
			$('SPAN.product-name').each(function() {
				var content = $(this).text();
				$(this).html( content + ' <a href="' + createGsUrl(content) + '" style="background-color: yellow;">GrapeStories</a>');
			});
		} else if( document.location.href.match(/^http:\/\/(www\.)?thewinespies/i) ) {
			var name = $('#winery-name').text() + ' ' + $('#wine-name').text();
			name = name.replace(/\*.+/, '');
			grapeStoriesLink(name);
		}
    }

function createGsUrl(name) {
	name = name.replace(removeTerms,'').replace(/\d+%/g,'').replace(/\s+[^A-Za-z0-9' ]\s+/g,' ').replace(/\(.+?\)/g,'').replace(/\s*$/, '').replace(/^\s*/, '');
	return 'http://www.grapestories.com/list.asp?fInStock=0&Table=List&iUserOverride=0&szSearch=' + name.replace(/\s+/g,'+');
}

var gsAlready = false;
function grapeStoriesLink(name, url) {
	if( gsAlready ) return;
	gsAlready = true;
	
	if( !url ) url = createGsUrl(name);

	var newNotification = '';
	if( !GM_getValue('gsLinks_' + url) ) {
		newNotification = '<br><b>(NEW)</b>';
		GM_setValue('gsLinks_' + url, '1');
	}
	$('<div><a style="color: black" href="'+url+'">GrapeStories</a>' + newNotification + '</div>')
		.css('position','absolute')
		.css('top', 40)
		.css('left', 20)
		.css('z-Index',10000)
		.css('text-align', 'center')
		.css('padding', '5px')
		.css('background-color', 'yellow')
		.addClass('gsLink')
		.appendTo('body');
}

