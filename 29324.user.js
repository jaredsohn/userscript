// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Note: If user/pass login box pops up this means someone you subscribe to has a private feed.
// Type in your REMOTE KEY as the password.
// remote key can be found at: https://friendfeed.com/account/api
//
// Version 0.2 - 2008.07.04
// - optimize performance, faster now
// - added ability to set max users, max subscriptions per user, max results in UI
// - added loading progress bar
// - added: people count
// - keeps state when clicking on Show More Results and added seperator
// - added Show All Results
// - fix bug: duplicate mutual subscribers
//
// Version 0.1 - 2008.06.28
// - adds a second-level nav tab "better recommended"
// - lists in order, similiar subscriptions that your subscriptions have (popular friends of friends)
// - hover over avatar to see how many mutual friends are subscribed to that user
// - only takes a max of 30 subscriptions per friend to save time (tweak MAX_SUBSCRIPTIONS_PER_USER if you dare) 
// - show more results button at the bottom
//
// Contact: detect [at] hotmail [dot] com
//
// ==UserScript==
// @name           Better FriendFeed "recommended"
// @namespace      http://userscripts.org/users/44035
// @description    Discover interesting people. Click friend settings -> better recommended. Give it some time to load up your subscriptions.
// @include        http://friendfeed.com/settings*
// ==/UserScript==

// Increase or decrease these numbers to change performance and results

var MAX_SUBSCRIPTIONS_PER_USER = 40;
var MAX_USERS = 90;
var MAX_RESULTS = 500;

// No need to edit below this line

var friendfeedUID = null;
var friendfeedMySubscriptions = null;
var friendfeedMySubscriptionsID = null;
var friendfeedChunkLength = 0;
var friendfeedLoadingNum = 0;
var friendfeedArray = new Array();
var friendfeedArrayChunk = new Array();
var numToShow = 24;

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

function getUID()
{
	return $('.body a:contains("me")').attr('href').substr(22);
}

function array_chunk( input, size ) 
{
	for(var x, i = 0, c = -1, l = input.length, n = []; i < l; i++)
	{
		(x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
	}
	return n;
}

function checkSubscription()
{
	$.ajax({
		type: "GET",
		async: false,
		url: "http://friendfeed.com/api/user/" + friendfeedUID + "/profile",
		dataType: "json",
		success:
			function(json)
			{
				friendfeedMySubscriptions = $.map(json.subscriptions, function(n){return n.nickname});
				friendfeedMySubscriptionsID = $.map(json.subscriptions, function(n){return n.id}).concat(json.id);
			}
	});
}

function checkSubscriptions(arrUsers)
{
	$.ajax({
		type: "GET",
		url: "http://friendfeed.com/api/profiles?nickname=" + arrUsers,
		dataType: "json",
		success: 
			function(json)
			{
				$.each(json.profiles, function(n,m)
					{
						for(var i=0,sub=m.subscriptions,len=m.subscriptions.length;i<(len < MAX_SUBSCRIPTIONS_PER_USER ? len : MAX_SUBSCRIPTIONS_PER_USER);i++)
						{
							y = sub[i];
							if(isNotSubscribedTo(y))
							{
								index = -1;
								for(var j in friendfeedArray)
								{
									if(friendfeedArray[j].nickname == y.nickname)
									{
										index = j;
										break;
									}
								}
								if(index == -1)
								{
									index = friendfeedArray.length;
									y.num = 1;
									y.subscribers = [m.nickname];
									friendfeedArray[index] = y;
								}
								else
								{
									friendfeedArray[index].num++;
									friendfeedArray[index].subscribers.push(m.nickname);
								}
							}
						}
					}
				);
				getRecommendedHTML();
				updatePeopleCount();
				updateLoadingPercentage();
			},
		error: 
			function()
			{
				updateLoadingPercentage();
			}

	});
}

function updatePeopleCount()
{
	$('#numPeople').text(friendfeedArray.length);
}

function updateLoadingPercentage()
{
	percentage = Math.round(++friendfeedLoadingNum / friendfeedChunkLength * 100);
	$('#progressbar').html('Loading...' + percentage + '%').show();
	if(friendfeedLoadingNum == friendfeedChunkLength)
		doneLoading();
}

function doneLoading()
{
	window.setTimeout(function(){$('#progressbar').hide()}, 1000);
	$('#btnReload').attr('disabled', false).blur();
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

function addBetterRecommendedTab()
{
	y = $("#subtabs td.l_tab:not('.selected'):first").clone().click(function(){return clickRecommendedTab(this);});;
	$(".l_tab:contains('recommended')").after(y).next().find('a').text('better recommended').attr('href','#');
}

function clickRecommendedTab(tab)
{
	$('#body').html('<div class="nofriends">The <span id="numPeople" style="font-weight:bold;"/> people below are popular among your friends, and you might find their feeds interesting. <span id="progressbar" style="font-style:italic;"/></div><div id="friendgrid" style="width:1000px;clear:both"/><div id="showMore" style="display:none;clear:both;color:#ccc;"><a href="#" onclick="showMoreResults(); return false;">Show more results</a> &nbsp;|&nbsp; <a href="#" onclick="showAllResults(); return false;">Show all results</a></div><div id="configSettings" style="clear:both;padding-top:20px">Max users to load <input type="text" id="txtMaxUsers" size="2" value="' + MAX_USERS + '"/> Max subscriptions per user to load <input type="text" id="txtMaxSubs" size="2" value="' + MAX_SUBSCRIPTIONS_PER_USER + '"/> Max results <input type="text" id="txtMaxResults" size="2" value="' + MAX_RESULTS + '"/> <input type="button" id="btnReload" onclick="reloadSubscriptions()" value="Reload"/></div>');
	old = $("#subtabs td[@class*='l_tab selected']:first");
	$(tab).replaceWith(old.clone());
	old.removeClass('selected').html(old.find('.body'));
	$("#subtabs td.selected:first").find('a').text('better recommeneded').attr('href','#');
	checkSubscription();
	runRecommended();
	return false;
}

function runRecommended()
{
	friendfeedChunkLength = 0;
	friendfeedLoadingNum = 0;
	friendfeedArray = new Array();
	friendfeedArrayChunk = new Array();
	numToShow = 24;
	$('#progressbar').html('Loading...0%').show();
	$('#btnReload').attr('disabled', true).blur();
	$('#friendgrid').html('');
	$('#showMore').hide();
	updatePeopleCount();
	for(i=0,friendfeedArrayChunk=array_chunk(friendfeedMySubscriptions,15).splice(0,Math.ceil(MAX_USERS / 15)),friendfeedChunkLength=friendfeedArrayChunk.length;i<friendfeedChunkLength;i++)
		checkSubscriptions(friendfeedArrayChunk[i].join(','));
}

function mysortfn(a,b) 
{
	if (a.num<b.num) return 1;
	if (a.num>b.num) return -1;
	return 0;
}

function isNotSubscribedTo(x)
{
   return ($.inArray(x.id, friendfeedMySubscriptionsID) == -1);
}

function getRecommendedHTML()
{
	numToShow2 = numToShow;
	friendfeedArray = friendfeedArray.sort(mysortfn).slice(0, MAX_RESULTS);
	if(friendfeedArray.length <= numToShow)
		numToShow2 = friendfeedArray.length;
	putRecommendedHTML(numToShow2);
}

function putRecommendedHTML(num)
{
	x = '';
	s = friendfeedArray.slice(0,num);
	for(var y=0,len=s.length;y<len;y++)
	{
		x += '<div style="float:left;width:250px;height:90px;"><div style="float:left"><a href="http://friendfeed.com/' + s[y].nickname + '" title="' + s[y].num + '+ mutual subscribers: ' + s[y].subscribers.join(', ') + '"><img src="http://friendfeed.s3.amazonaws.com/pictures-' + s[y].id.replace(/-/g,'') + '-medium.jpg?v=4" width="50" height="50" onerror="this.src=\'http://friendfeed.com/static/images/nomugshot-medium.png\'" border="0"/></a></div><div style="float:left;padding-left:10px"><a href="http://friendfeed.com/' + s[y].nickname + '" title="View ' + s[y].name + '\'s profile" style="font-weight:bold">' + s[y].name + '</a><br/>' + s[y].nickname + '<br/><input type="button" onclick="subscribeToFriend(this, \'' + s[y].id + '\')" value="Subscribe"/></div></div>';
		if(((y + 1) % 24) == 0)
		{
			x += '<div style="float:left;width:1000px;padding-bottom:20px;clear:both;border-top:1px solid #ccc"/>';
		}
	}
	if(friendfeedArray.length <= num)
		$('#showMore').hide();
	else
		$('#showMore').show();
	$('#friendgrid').html(x);
}

function letsJQuery() 
{
	
	unsafeWindow.reloadSubscriptions = function()
	{
		MAX_USERS = $('#txtMaxUsers').val();
		MAX_SUBSCRIPTIONS_PER_USER = $('#txtMaxSubs').val();
		MAX_RESULTS = $('#txtMaxResults').val();
		runRecommended();
	}
	
	unsafeWindow.showMoreResults = function()
	{
		numToShow = numToShow + 24;
		putRecommendedHTML(numToShow);
	}
	
	unsafeWindow.showAllResults = function()
	{
		putRecommendedHTML(friendfeedArray.length);
	}

	unsafeWindow.subscribeToFriend = function(button, id) 
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

	addBetterRecommendedTab();
	friendfeedUID = getUID();
}
