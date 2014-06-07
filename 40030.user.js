// Copyright (c) 2009, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// version 0.61 - 02.08.09
// Fix bug with linking usernames with underscore character
//
// version 0.6 - 02.03.09
// Adds favoriting back in @mentions tab.
//
// version 0.5 - 02.03.09
// Bug fix for @mentions (Twitter changed HTML)
//
// version 0.4 - 02.03.09
// Bug fix for @mentions (Twitter changed HTML)
//
// version 0.3 - 02.03.09
// Bug fix for li.status, thanks @firstclown
//
// version 0.2 - 01.27.09
// Added a tab for Mentions which are updates inclulding your @username,
// but aren't @replies.
//
// version 0.1 - 01.07.09
// First build
//
// ==UserScript==
// @name           Twitter - Show # of unread replies + adds mentions
// @namespace      http://userscripts.org/users/44035
// @description    Displays number of unread @replies and adds a mentions add.
// @include        http://twitter.com/home*
// @include        http://twitter.com/replies*
// @include        http://twitter.com/direct_messages*
// @include        http://twitter.com/favorites*
// @include        http://twitter.com/public_timeline*
// @include        https://twitter.com/home*
// @include        https://twitter.com/replies*
// @include        https://twitter.com/direct_messages*
// @include        https://twitter.com/favorites*
// @include        https://twitter.com/public_timeline*
// @version 0.61
// ==/UserScript==

function addMentionsTab()
{
	var li = document.getElementById('replies_tab').parentNode;
	var m = document.createElement('li');
	m.innerHTML = '<a id="mentions_tab" href="javascript:getMentions()" >@Mentions</a>';
	li.parentNode.insertBefore(m, li.nextSibling );
}

addMentionsTab();

//TODO: DM needs work, see below
//document.getElementById('message_count').innerHTML = '';

var LastReply = GM_getValue("LastReply", false);
var LastDirectMessage = GM_getValue("LastDirectMessage", false);

//GM_addStyle("");

//TODO: modify
var gmScript_url = "http://userscripts.org/scripts/source/40030.user.js";
var gmScript_name = "Twitter - Show # of unread replies + adds mentions";
var gmScript_version = 0.61;

autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}
GM_wait();

function letsJQuery()
{
	loadReplies();
	//TODO: DM needs work, see below
	//loadDirectMessages();
}
 
unsafeWindow.getMentions = function()
{
	var twitter_username = $.trim($('#me_name').text());
	$.getJSON(
		"http://search.twitter.com/search.json?rpp=50&q=%40" + twitter_username + "&callback=?",
		function(data) {
			var tab = $('#timeline').eq(0).parent();
			tab.html('<h2 class="timeline-header">Your Mentions</h2><h3 class="timeline-subheader">Updates with @' + twitter_username + '</h3><ol class="statuses" id="timeline">');
			var timeline_body = $('#timeline');
			var count = 0;
			$.each(data.results, function(i,item){
				var text = item.text;
				if(item.text.indexOf("@" + twitter_username) !== 0 && ++count <= 20)
				{
					text = text.replace(/(^|[\n ]|<p>)([\w]+?:\/\/[\w]+[^ \"\n\r\t<]*)/ig, "$1<a href=\"\$2\" target=\"_blank\">$2</a>");
					text = text.replace(/(^|[\n ])((www|ftp)\.[^ \"\t\n\r<]*)/ig, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");
					text = text.replace(/#(^|[\n ])([a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+\.)*[\w]+)/ig, "$1<a href=\"mailto:$2@$3\">$2@$3</a>");
					text = text.replace(/@([a-z0-9_]+)/ig, '@<a href="http://twitter.com/$1">$1</a>');
					var date = new Date(item.created_at);
					date = date.toLocaleString();
					timeline_body.append('<li class="hentry status u-' + item.from_user + '" id="status_' + item.id + '"><span class="thumb vcard author"><a href="http://twitter.com/' + item.from_user + '" class="url"><img alt="" class="photo fn" height="48" src="' + item.profile_image_url + '" width="48" /></a></span><span class="status-body"><strong><a href="http://twitter.com/' + item.from_user + '" title="">' + item.from_user + '</a></strong> <span class="entry-content">' + text + '</span> <span class="meta entry-meta"><a href="http://twitter.com/' + item.from_user + '/status/' + item.id + '" class="entry-date" rel="bookmark"><span class="published" title="' + item.created_at + '">' + date + '</span></a> </span></span><span class="actions"><div><a class="fav-action non-fav fav-action2" id="status_star_' + item.id + '" title="favorite this update" _id="' + item.id + '">&nbsp;&nbsp;</a><a class="repl" href="/home?status=@' + item.from_user + '%20&amp;in_reply_to_status_id=' + item.id + '&amp;in_reply_to=' + item.from_user + '" title="reply to ' + item.from_user + '">&nbsp;&nbsp;</a></div></span></li>');
				}
	        });
			$("#timeline .fav-action2").click(function(){
				$.post(
					"http://twitter.com/favorites/create/" + $(this).attr("_id"),
					{ authenticity_token: unsafeWindow.twttr.form_authenticity_token});
				$(this).removeClass("non-fav").addClass("fav");
			});
        }
    );
}

function loadReplies()
{
	$.ajax(
	{
		url: "http://twitter.com/replies",
		success: function(data, textStatus) {
			statuses = $(data).find('li.status');
			last_id = statuses.eq(0).attr('id');
			last_seen = statuses.filter('#'+LastReply);
			if(last_seen.length)
			{
				num = statuses.filter('#'+LastReply).prevAll().length;
			}
			else
			{
				num = '20+';
			}
			if(window.location.pathname == '/replies')
			{
				window.setTimeout(GM_setValue, 0, "LastReply", last_id);
				num = 0;
			}
			$('#replies_tab').prepend('<span class="stat_count" id="unread_reply_count">' + ((num != 0) ? (num + ' unread') : '') + '</span>');
        }
    });
}

//TODO: think of a better way to do DMs
//issues: deleted DMs will screw up count
//possibilities: use displayed DM count, but how to account for deleted DMs?
function loadDirectMessages()
{
	$.ajax(
	{
		url: "http://twitter.com/direct_messages",
		success: function(data, textStatus) {
			statuses = $(data).find('tr.direct_message');
			last_id = statuses.eq(0).attr('id');
			last_seen = statuses.filter('#'+LastDirectMessage);
			if(last_seen.length)
			{
				num = statuses.filter('#'+LastDirectMessage).prevAll().length;
			}
			else
			{
				num = '20+';
			}
			if(window.location.pathname == '/direct_messages')
			{
				window.setTimeout(GM_setValue, 0, "LastDirectMessage", last_id);
				num = 0;
			}
			$('#message_count').text(((num != 0) ? (num + ' new') : ''));
        }
    });
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

