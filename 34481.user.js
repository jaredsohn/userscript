// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// version 0.1 - Persian
//
// ==UserScript==
// @name           Friendfeed Buddy List [for persian style] 
// @namespace      http://userscripts.org/users/67758
// @description    Buddy list of online Friendfeeders [for persian style] [orginal script in : http://userscripts.org/scripts/show/32782] [edit by Amir Homaiy] 
// @include        http://friendfeed.com/*
// @exclude	http://friendfeed.com/share/bookmarklet/*
// @exclude	http://beta.friendfeed.com/share/bookmarklet/*
// @version 0.1
// ==/UserScript==

var REFRESH_INTERVAL = 60; //in seconds
var MINUTES_TILL_INACTIVE = 10; //in minutes

var HOST_NAME = window.location.hostname
var nickname = GM_getValue("nickname", false);
var remotekey = GM_getValue("remotekey", false);
var subscriptions = GM_getValue("subscriptions", false);
var showHide = GM_getValue("showhide", 'Hide');
var friends = [];

GM_addStyle("#buddylist {z-index: 9999;text-align:left ;background-color: #F7F9FA; position: fixed; bottom: 0; left: 0px; max-height: 350px; padding: 5px 3px 0px 5px; border: 1px solid #B3B3FF; overflow: auto;width:250px;} #buddylist h2 {padding-right:0px;position:relative;top:1px;margin:0;cursor:pointer;text-align:left ;border:solid 1px #93BAEB;border-bottom-width:3px;background-color:#E8F2FF;} #buddylist ul {list-style-type: none;padding-bottom:15px;width:190px;} #buddylist .name,#buddylist .showhide a{ text-decoration: none; color: #000000; text-align:right ;padding-right:3px; } #buddylist .lastseen, #buddylist .lastseen a { color: #dddddd; text-decoration: none; } #buddylist a:hover{text-decoration: underline} #buddylist .showhide {position:absolute;z-index:99999;margin-top:10px;}");

var gmScript_url = "http://userscripts.org/scripts/source/34481.user.js";
var gmScript_name = "Friendfeed Buddy List [for persian style]";
var gmScript_version = 0.1;

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
	if(!nickname || !remotekey || !subscriptions)
	{
	    $.ajax(
	    {
	        dataType: "html",
	        url: "http://" + HOST_NAME + "/account/api",
	        success: function(data, textStatus) {
	            nicknamekey = new RegExp(/FriendFeed nickname[\S\s]*?<td class="value">([\S\s]*?)<\/td>[\S\s]*?FriendFeed remote key[\S\s]*?<td class="value">([\S\s]*?)<\/td>/ig).exec(data);
	            if(nicknamekey)
	            {
					nickname = $.trim(nicknamekey[1].toString());
					window.setTimeout(GM_setValue, 0, "nickname", nickname);
					remotekey = $.trim(nicknamekey[2].toString());
					window.setTimeout(GM_setValue, 0, "remotekey", remotekey);
	                loadSubscriptions();
	            }
	        }
	    });
	}
	else
	{
		subscriptions = subscriptions.split(',');
		startInterval();
	}
}

unsafeWindow.showHide = function(obj)
{
	obj.blur();
	if(obj.innerHTML=='Hide')
	{
		showHide = 'Show';
		hideBuddyList(true);
	}
	else
	{
		showHide = 'Hide';
		hideBuddyList(false);
	}
	obj.innerHTML = showHide;
	window.setTimeout(GM_setValue, 0, "showhide", showHide);
}

function hideBuddyList(boolHide)
{
	if(boolHide)
	{
		$('#buddylist').css('max-height', '30px');
		$('#buddylist').css('overflow', 'hidden');
	}
	else
	{
		$('#buddylist').css('max-height', '350px');
		$('#buddylist').css('overflow', 'auto');
	}
}

function startInterval()
{
	loadFeed();
	window.setInterval(loadFeed, REFRESH_INTERVAL*1000);
}

function loadSubscriptions()
{
	$.ajax(
	{
		dataType: "json",
		url: "http://"+nickname+":"+remotekey+"@" + HOST_NAME + "/api/user/"+nickname+"/profile",
		success: function(data, textStatus) {
			subscriptions = [];
			$.each(data['subscriptions'], function(){
				subscriptions.push(this.nickname);
			});
			window.setTimeout(GM_setValue, 0, "subscriptions", subscriptions.join(','));
			startInterval();
        }
    });
}

function loadFeed()
{
    $.ajax(
    {
        dataType: "json",
        url: "http://"+nickname+":"+remotekey+"@" + HOST_NAME + "/api/feed/home",
        success: function(data, textStatus) {
            var entries = data;
            parseEntries(entries['entries']);
        }
    });
}

function parseEntries(entries)
{
    now = new Date();
    $.each(entries, function(){
		if(this['service']['id']=='internal')
		{
	        updated = convertAtomDateString(this['updated']);
	        friends.push({name: this['user']['name'], nickname: this['user']['nickname'], time:updated, type:'/'});
		}
        $.each(this['comments'], function(){
            updated = convertAtomDateString(this['date']);
            friends.push({name: this['user']['name'], nickname: this['user']['nickname'], time:updated, type:'/comments'});});
        $.each(this['likes'], function(){
            updated = convertAtomDateString(this['date']);
            friends.push({name: this['user']['name'], nickname: this['user']['nickname'], time:updated, type:'/likes'});});
    });
    //console.log(friends);
    toSplice = [];
    $.each(friends, function(i,val){
        difference = now - this['time'];
        minutes = Math.round(difference/(1000*60));
        this['minutes'] = minutes;
        if(minutes > MINUTES_TILL_INACTIVE)
        {
            //not active
            toSplice.push(i);
        }
    });
	toSplice = toSplice.reverse();
    $.each(toSplice, function(){
        friends.splice(this,1);
    });
    friends.sort(function(a, b)
    {
        var keyA = a.minutes;
        var keyB = b.minutes;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    friends = unique(friends);
    toSplice = [];
    $.each(friends, function(i,val){
		if($.inArray(this['nickname'], subscriptions)==-1)
		{
			//not friends
            toSplice.push(i);
		}
	});
	toSplice = toSplice.reverse();
    $.each(toSplice, function(){
        friends.splice(this,1);
    });
    friends.sort(function(a, b)
    {
        var keyA = a.name.toUpperCase();
        var keyB = b.name.toUpperCase();
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    //console.log(friends);
    if(!document.getElementById("buddylist"))
        $('#body').prepend('<div id="buddylist"/>');
	html = '';
	html += '<div class="showhide"><a href="#" id="ashowhide" onclick="showHide(this); return false;">' + showHide + '</a></div>';
	html += '<h2 onclick="showHide(' + "document.getElementById('ashowhide')" + ')">Buddy List :' + friends.length + '</h2>';
    html += '<ul>'+$.map(friends, function(x){return '<li><a href="/' + x.nickname + '" class="name">' + x.name + '</a>&nbsp;<span class="lastseen">-&nbsp;<a href="/' + x.nickname + x.type + '">' + (x.type=='/'?'post':(x.type=='/likes'?'like':'comm'))+'</a>&nbsp;' + (x.minutes==0?'just&nbsp;now':x.minutes + '&nbsp;min&nbsp;ago') + '</span></li>'}).join('') + '</ul>';
    //console.log(html);
    $('#buddylist').html(html);
	hideBuddyList(showHide=='Show');
}

function unique(a) {
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = 0, y = r.length; x < y; x++)
         if(r[x]['name']==a[i]['name']) continue o;
      r[r.length] = a[i];
   }
   return r;
}

function convertAtomDateString(str)
{
    //2008-08-27T04:59:19Z
    var year, month, date, hour, minute, second, offset;
    year = str.slice(0,4);
    month = str.slice(5,7)-1;        //00-11
    if(month<10)
        month = '0'+month;
    date = str.slice(8,10);        //01-31
    hour = str.slice(11,13);    //00-23
    minute = str.slice(14,16);    //00-59
    second = str.slice(17,19);    //00-59
    d = new Date();
    d.setUTCMonth(month,date);
    d.setUTCFullYear(year);
    d.setUTCHours(hour);
    d.setUTCMinutes(minute);
    d.setUTCSeconds(second);
    return d;
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

