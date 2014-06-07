// ==UserScript==
// @name           Facebook Wall Scanner
// @namespace      http://in-square.net/fbcrawler/grease
// @include        http://www.facebook.com/*
// ==/UserScript==
var $;

function GM_wait() {
    if ((typeof unsafeWindow.jQuery == 'undefined') || (typeof unsafeWindow.JSON == 'undefined')) {
	window.setTimeout(GM_wait, 100);
    } else {
	$ = unsafeWindow.jQuery.noConflict(true);
	JSON = unsafeWindow.JSON;
	letsJQuery();
    }
}

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
	var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	    GM_JQ = document.createElement('script');

	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;

	GM_JSON = document.createElement('script');
	GM_JSON.src = 'https://github.com/douglascrockford/JSON-js/raw/master/json2.js';
	GM_JSON.type = 'text/javascript';
	GM_JSON.async = true;

	GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	GM_Head.insertBefore(GM_JSON, GM_Head.firstChild);
    }
    GM_wait();
})();

function letsJQuery() {
    var style = $('<div/>')
	.attr('style', 'position: fixed; z-index: 1000; background-color: red; top: 0; left: 0; padding: 8px;')
	.append(
		$('<a/>').attr('href', '#').text('FB scan').attr('style', 'background-color: white;').click(runScan)
		)
	.append(
		$('<a/>').attr('href', '#').text('Open ALL').attr('style', 'background-color: yellow;').click(openAllPages)
		)
	.append(
		$('<textarea/>').attr('id', 'fbc_tb').attr('width', '100').attr('height', '100')
		)
	.appendTo($('body'));
}

function openAllPages()
{
    function wait()
    {
	if (!$('.uiMorePager a.pam').is(':visible')) {
	    if (typeof console.log != 'undefined')
		console.log('No more pages');
	    return;
	}

	window.scrollBy(0, 10000);

	if (!$('.uiMorePager a.pam img.loader').is(':visible')) {
	    $('.uiMorePager a.pam').click();
	}

	window.setTimeout(wait, 1000);
    }
    wait();

    return false;
}

function runScan()
{
    var data = {};
    var items = [];

    function getNumber(str)
    {
	var c = str.match(/\d+/);
	if (c == null)
	    return 0;

	return parseInt(c);
    }

    var props = JSON.parse($('#profile_minifeed .uiUnifiedStory:first').attr('data-ft'));
    data['fbid'] = props['actrs'];

    $.each($('div.UIStory'), function() {
	    var item = $(this);

	    //var fbinfo = eval('(' + item.attr('data-ft') + ')');
	    var parts = item.attr('id').split('_');
	    var fbid = parts[parts.length-1];

	    //console.log(fbid);

	    var titleLink = $('div.UIStoryAttachment_Title a', item);

	    var title = titleLink.text();
	    var link = titleLink.attr('href');
	    if (link != null && !link.match('^http'))
		link = 'http://www.facebook.com' + link;

	    var message = $('div.UIIntentionalStory_Header span.UIStory_Message', item).text();
	    var time = $('span.UIIntentionalStory_Time a abbr', item).attr('data-date');
	    var likes = getNumber($('li.uiUfiLike a', item).text());

	    var n = $('li.uiUfiComments li.ufiItem:first input', item).attr('value');
	    if (n == null)
		n = $('li.uiUfiComments li.ufiItem:first', item).text();

	    var comments = 0;
	    if (n.match('^View all'))
		comments = getNumber(n);

	    items[items.length] = new function()
		{
		    this.fbid = fbid;
		    this.title = title;
		    this.message = message;
		    this.time = time;
		    this.likes = likes;
		    this.comments = comments;
		    this.link = link;
		};

	    //if (typeof console.log != 'undefined')
	    //console.log('Got item ', fbinfo.fbid);
	});

    data['posts'] = items;

    $('#fbc_tb').val(JSON.stringify(data));

    //console.log(items);

    return false;
}