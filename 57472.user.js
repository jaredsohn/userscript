// ==UserScript==
// @name           Twitter Twelephone Button
// @namespace      none
// @description    Adds twelephone button next to the actions area of a tweet on Twitter. 
// @verion         0.13
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


var twele = document.getElementById('me_name');
	if (twele) {
		var tweleUser = twele.innerHTML;
	}


var tweleHome = document.getElementById('heading');
	if (tweleHome) {
		var a = document.createElement('a');
		a.href = "http://tweleswitch.appspot.com/start/" + tweleUser;
		a.innerHTML = " > Launch Twelephone";
		a.className = "tool";
		a.target = "_blank";
                
	tweleHome.parentNode.insertBefore(a, tweleHome.nextSibling);
	}



/* USER SETTINGS */
/**
 * The Twelephone icon.
 */
var tweleIcon = "data:image/gif;base64,R0lGODlhEAAQAIABAGZmZgAAACH5BAEAAAEALAAAAAAQABAAAAIljI+pwKznUJTPgHRtthTOsG1QBy6kyI2pJrYeuZoY+s1Nhed6AQA7";
/**
 * Title of the Twelephone link.
 */
var tweleTitle = "twelephone this user";
/**
 * Local variables.
 * %a = author
 */

/* MAIN LOOP */
var $ = unsafeWindow.jQuery;

$(".hentry:not(.mine) .actions").livequery(function() {
	if($(this).children("div").size() != 0)
		$this = $(this).children("div");
	else
		$this = $(this);
	var author = $this.parents(".hentry").attr('class').match(/u-([^\s]+)/)[1];
	var href = 'http://tweleswitch.appspot.com/call/'+encodeURIComponent(author);

	var tweleButton = $("<a />")
		.addClass('twelephone')
		.attr('href', href)
		.attr('title', tweleTitle)
		.attr('target', "_blank")
		.html('&nbsp;&nbsp;');
	$this.append(tweleButton);
});

GM_addStyle(".hentry .actions .twelephone { background-image: url(" + tweleIcon + "); margin-top: -6px; }");