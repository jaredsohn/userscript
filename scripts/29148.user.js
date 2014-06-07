// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.3 - 2008.09.02
// - supports room members
// - adds script auto-updater
//
// Version 0.2 - 2008.07.07
// - adds a button at the top to hide the people you already subscribe to
//
// Version 0.1 - 2008.06.25
// - adds Subscribe button to people you aren't subscribed to
//
// Contact: detect [at] hotmail [dot] com
//
// ==UserScript==
// @name           Better FriendFeed "subscribed to me"
// @namespace      http://userscripts.org/users/44035
// @description    Adds a Subscribe button for the people you aren't subscribed to on the FriendFeed "Subscribed to Me" page.
// @include        http://friendfeed.com/settings/subscribers*
// @include        http://friendfeed.com/rooms/*/members*
// @version	0.3
// ==/UserScript==

var gmScript_url = "http://userscripts.org/scripts/source/29148.user.js";
var gmScript_name = "Better FriendFeed subscribed to me";
var gmScript_version = 0.3;

autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);

var friendfeedUID = null;
var friendfeedMySubscriptions = null;

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}
GM_wait();

function getFriends()
{
	return $.map($('.friends .friend'), function(n){return $(n).attr('userid')});
}

function getUID()
{
	return $('.body a:contains("me")').attr('href').substr(22);
}

function isSubscribedTo( user )
{
	return ($.inArray(user, friendfeedMySubscriptions) != -1);
}

function checkSubscription( arrUsers )
{
friendfeedMySubscriptions
	if(friendfeedMySubscriptions == null)
	{
		$.getJSON('http://friendfeed.com/api/user/' + friendfeedUID + '/profile',
			function(json){
				friendfeedMySubscriptions = $.map(json.subscriptions, function(n){return n.id});
				checkSubscription(arrUsers);
			});
	}
	else
	{
		$.each(arrUsers, function( n , m ) {
			if(!isSubscribedTo(m))
			{
				$('.friends .friend[userid="' + m + '"] .menu').prepend('<input type="button" style="margin-right:6px" value="Subscribe" onclick="subscribeToFriend(this, \'' + m + '\')"/>');
			}
			else
			{
				$('.friends .friend[userid="' + m + '"]').addClass('subscribedTo');
			}
		});
		$('#friendgrid').prev().append('&nbsp;<a href="#" onclick="hideSubscribed(this); return false;">Hide those I subscribe to</a>');
	}
}
function removeMessages()
{
	$(".infomessage, .errormessage").remove()
}

function infoMessage(A)
{
	removeMessages();
	if(A)
	{
		$("#body").prepend($('<div class="infomessage">'+A+"</div>"));
	}
}

function letsJQuery() 
{
	unsafeWindow.subscribeToFriend = function (button, id) 
	{
		button.blur();
		button.disabled = true;
		$.postJSON("/account/newfriends", {id: id}, function(result) {
			if (result.message) 
			{
				infoMessage(result.message);
			}
		});
	}
	
	unsafeWindow.hideSubscribed = function(a)
	{
		a = $(a).blur();
		if(a.text()=='Hide those I subscribe to')
		{
			$('.subscribedTo').hide();
			a.text('Show all');
		}
		else
		{
			$('.subscribedTo').show();
			a.text('Hide those I subscribe to');
		}
	}
	
	friendfeedUID = getUID();
	checkSubscription(getFriends());


}

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}
