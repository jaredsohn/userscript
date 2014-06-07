// ==UserScript==
// @name           Old YouTube Homepage Layout
// @namespace      http://deadbeefstudios.com
// @description    Makes the subscription box more logical, as well as have the old modules (most popular videos, recommended videos) and remove the useless sidebar modules.
// @include        http://*.youtube.com/*
// @version        1.2.1
// ==/UserScript==

var sessionToken = document.getElementsByTagName("head")[0].innerHTML.match(/ModuleHelper\('([^']*)/)[1];
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g,'');}

function unreadCount(string, folder)
{
	return string.match(new RegExp('"' + folder + '": ([0-9]*)'))[1];
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		var c_start=document.cookie.indexOf(c_name + '=');
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(';', c_start);
			if(c_end == -1)
			{
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return '';
}

function generateShowHide(showID, hideID, toggleID)
{
	var mycookie = getCookie(hideID);
	var displayHide = (mycookie == 'no') ? ' style="display:none;"' : '';
	var displayShow = (mycookie == 'yes' || mycookie == '') ? ' style="display:none;"' : '';
	return '<div style="font-weight:normal;font-size:12px;float:right;"><a href="#' + hideID + '" id="' + hideID + '" onclick="document.getElementById(\'' + hideID + '\').style.display=\'none\';document.getElementById(\'' + showID + '\').style.display=\'inline\';document.getElementById(\'' + toggleID + '\').style.display=\'none\';document.cookie=\'' + hideID + '=no;expires=Saturday, 1 Jan 2050 23:59:59 UTC\';return false;"' + displayHide + '>hide</a><a href="#' + showID + '" id="' + showID + '" onclick="document.getElementById(\'' + showID + '\').style.display=\'none\';document.getElementById(\'' + hideID + '\').style.display=\'inline\';document.getElementById(\'' + toggleID + '\').style.display=\'block\';document.cookie=\'' + hideID + '=yes;expires=Saturday, 1 Jan 2050 23:59:59 UTC\';return false;"' + displayShow + '>show</a></div>';
}

function getInbox()
{
	GM_xmlhttpRequest({
		method: 'get',
		url: 'http://www.youtube.com/inbox?folder=messages&action_message=1#',
		onload: function(xhr)
		{
			GM_xmlhttpRequest({
				method: 'post',
				url: 'http://www.youtube.com/inbox?action_ajax=1&folder=messages',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: 'session_token=' + xhr.responseText.match(/'XSRF_TOKEN': '([^']*)/)[1] + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]',
				onload: function(xhr2)
				{
					var url = 'http://www.youtube.com/inbox?folder=messages&action_message=1#';
					var inboxContents = '<a href="' + url + 'messages/1">' + unreadCount(xhr2.responseText, 'messages') + ' Personal Messages</a><br />';
					inboxContents += '<a href="' + url + 'videos/1">' + unreadCount(xhr2.responseText, 'videos') + ' Shared with you</a><br />';
					inboxContents += '<a href="' + url + 'comments/1">' + unreadCount(xhr2.responseText, 'comments') + ' Comments</a><br />';
					inboxContents += '<a href="' + url + 'invites/1">' + unreadCount(xhr2.responseText, 'invites') + ' Friend Invites</a><br />';
					inboxContents += '<a href="' + url + 'responses/1">' + unreadCount(xhr2.responseText, 'responses') + ' Video Responses</a><br />';
					
					var inbox = document.createElement('div');
					inbox.setAttribute('id', 'userscript-inbox');
					inbox.style.marginBottom = '7px';
					inbox.innerHTML = '<div class="clear" style="margin-top:5px;"></div><span class="homepage-side-block"><div class="module-title">Inbox</div></span><div style="margin-top:5px;">' + inboxContents + '</div>';
					document.getElementById('homepage-whats-new').parentNode.insertBefore(inbox, document.getElementById('homepage-whats-new'));
				}
			});
		}
	});
	
	document.getElementById('userscript-subbox').style.display = (getCookie('hide_sub') == 'yes' || getCookie('hide_sub') == '') ? 'block' : 'none';
	document.getElementById('userscript-recommended').style.display = (getCookie('hide_rec') == 'yes' || getCookie('hide_rec') == '') ? 'block' : 'none';
	document.getElementById('feed_top_videos-content').style.display = (getCookie('hide_top') == 'yes' || getCookie('hide_top') == '') ? 'block' : 'none';
}

function getRecommendedVideos()
{
	GM_xmlhttpRequest({
		method: 'post',
		url: 'http://www.youtube.com/index_ajax?feedmore=true',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: 'module=REC&session_token=' + sessionToken,
		onload: function(xhr)
		{
			// add the recommended videos BEFORE the videos
			var rec = document.createElement('div');
			rec.innerHTML = '<div class="clear" style="margin-top:5px;"></div><span class="homepage-side-block"><div class="module-title" style="font-weight:bold;margin-top:5px;">Recommended Videos' + generateShowHide('show_rec', 'hide_rec', 'userscript-recommended') + '</div></span><div style="margin-top:5px;" id="userscript-recommended">' + xhr.responseText + '</div>';
			document.getElementById('feedmodule-TOP').parentNode.insertBefore(rec, document.getElementById('feedmodule-TOP'));
			
			// fix the sidebar
			if(document.getElementById('hp-sidebar-FEA'))
			{
				document.getElementById('hp-sidebar-FEA').parentNode.style.display = 'none'; // remove spotlight
			}
			if(document.getElementById('hp-sidebar-ASO'))
			{
				document.getElementById('hp-sidebar-ASO').parentNode.style.display = 'none'; // remove trending
			}
			if(document.getElementById('hp-sidebar-PRO'))
			{
				document.getElementById('hp-sidebar-PRO').parentNode.style.display = 'none'; // remove featured
			}
			
			getInbox();
		}
	});
}

function getTopVideos()
{
	GM_xmlhttpRequest({
		method: 'post',
		url: 'http://www.youtube.com/index_ajax?feedmore=true',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: 'module=TOP&session_token=' + sessionToken,
		onload: function(xhr)
		{
			if(!document.getElementById('feedmodule-TOP'))
			{
				document.getElementById('homepage-main-content').innerHTML += '<div id="feedmodule-TOP"><div class="clear"></div><span class="homepage-side-block"><div class="module-title" style="font-weight:bold;margin-top:5px;"><a href="/videos?s=pop" onmousedown="yt.analytics.urchinTracker(\'/Events/Home/PersonalizedHome/View_TopVideos/Logged_In\');">Most Popular</a>' + generateShowHide('show_top', 'hide_top', 'feed_top_videos-content') + '</div></span><div id="feed_top_videos-content">' + xhr.responseText + '</div></div>';
				
				// fix the sidebar
				if(document.getElementById('hp-sidebar-FEA'))
				{
					document.getElementById('hp-sidebar-FEA').parentNode.style.display = 'none'; // remove spotlight
				}
				if(document.getElementById('hp-sidebar-ASO'))
				{
					document.getElementById('hp-sidebar-ASO').parentNode.style.display = 'none'; // remove trending
				}
				if(document.getElementById('hp-sidebar-PRO'))
				{
					document.getElementById('hp-sidebar-PRO').parentNode.style.display = 'none'; // remove featured
				}
			}
			else
			{
				document.getElementById('TOP-titlebar').className = 'clear';
				document.getElementById('TOP-titlebar').innerHTML = '<span class="homepage-side-block"><div class="module-title" style="font-weight:bold;margin-top:5px;"><a href="/videos?s=pop" onmousedown="yt.analytics.urchinTracker(\'/Events/Home/PersonalizedHome/View_TopVideos/Logged_In\');">Most Popular</a>' + generateShowHide('show_top', 'hide_top', 'feed_top_videos-content') + '</div></span>';
			}
			
			getRecommendedVideos();
		}
	});
}

function getSubscriptions()
{
	GM_xmlhttpRequest({
		method: 'post',
		url: 'http://www.youtube.com/index_ajax?feedmore=true',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: 'feedmore=true&module=ALL&end_time=0&session_token=' + sessionToken,
		onload: function(xhr)
		{
			var el = document.createElement('div');
			el.innerHTML = xhr.responseText;
			var divs = el.getElementsByTagName('div');
			
			var videos = new Array();
			for(var i = 0; i < divs.length; i++)
			{
				if(divs[i].className == 'grid-view' || divs[i].className == 'list-view')
				{
					var match = divs[i].innerHTML.match(/<b>Uploaded<\/b> by <a href="\/user\/([^"]*)/);
					if(!match)
					{
						match = divs[i].innerHTML.match(/Uploaded by <a href="\/user\/([^"]*)/);
						if(!match)
						{
							continue;
						}
					}
					var uploader = match[1];
					var time = divs[i].innerHTML.match(/<span class="feedmodule-ts"[^>]*>\((.+?)\)<\/span>/)[1];
					
					var childDivs = divs[i].getElementsByTagName('div');
					for(var o = 0; o < childDivs.length; o++)
					{
						if(childDivs[o].className == 'video-entry')
						{
							// make sure it isn't previously watched
							if(childDivs[o].innerHTML.match(/<div class="previously-viewed-label smallText grayText">Previously viewed<\/div>/))
							{
								continue;
							}
							
							// populate array for each video with details
							var video = new Array();
							video['uploader'] = uploader;
							video['video-time'] = time;
							video['thumbnail'] = childDivs[o].innerHTML.match(/\/\/[a-z0-9]+?.ytimg.com\/vi\/[^\/]*\/default.jpg/)[0];
							video['video-id'] = childDivs[o].innerHTML.match(/ytimg.com\/vi\/([^\/]*)/)[1];
							video['video-length'] = childDivs[o].innerHTML.match(/<span class="video-time">([^<]+)<\/span>/)[1];
							video['description'] = document.getElementById('video-description-'+ video['video-id']).innerHTML.trim();
							video['video-short-title'] = document.getElementById('video-short-title-' + video['video-id']).innerHTML.trim();
							video['video-long-title'] = document.getElementById('video-long-title-' + video['video-id']).innerHTML.trim();
							video['video-views'] = document.getElementById('video-num-views-' + video['video-id']).innerHTML.trim();
							videos.push(video);
						}
					}
				}
			}
			
			var divs = document.getElementsByTagName('div');
			for(var i = 0; i < divs.length; i++)
			{
				if(divs[i].className == 'main-spacer-bottom')
				{
					divs[i].className = 'clear';
				}
			}
			
			var feedContent = document.getElementById('feedmodule-ALL');
			feedContent.setAttribute('style', 'margin-bottom:0 !important;');
			feedContent.innerHTML = '<br /><span class="homepage-side-block"><div class="module-title" style="font-weight:bold;"><a href="#subscriptions">Subscriptions</a>' + generateShowHide('show_sub', 'hide_sub', 'userscript-subbox') + '</div></span>';
			
			var videoHTML = '';
			for(var j = 0; j < videos.length; j++)
			{
				videoHTML += '<div class="feedmodule-item-with-x" id="feedvid-' + videos[j]['video-id'] + '-UPL"><div style="width: 99.5%;" class="video-cell"><div class="video-entry"><a class="ux-thumb-wrap contains-addto" href="/watch?v=' + videos[j]['video-id'] + '&amp;feature=feedu"><span class="video-thumb ux-thumb-128 "><span class="clip"><img onmousedown="yt.analytics.urchinTracker(\'/Events/Home/PersonalizedHome/TheFeed/UPL/aggregated/Logged_In\');" click="" class="" src="//i3.ytimg.com/vi/' + videos[j]['video-id'] + '/default.jpg" alt="Thumbnail" title="' + videos[j]['video-long-title'] + '" onload=""></span></span><span class="video-time">' + videos[j]['video-length'] + '</span><span data-feature="thumbnail" data-video-ids="' + videos[j]['video-id'] + '" class="yt-uix-button-group addto-container short video-actions" dir="ltr"><button aria-pressed="false" role="button" data-button-action="yt.www.addtomenu.add" title="" onclick=";return false;" class="master-sprite start yt-uix-button yt-uix-button-short yt-uix-tooltip" type="button"><img alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon-addto"><span class="yt-uix-button-content"><span class="addto-label">Add to</span></span></button><button aria-pressed="false" role="button" data-button-action="yt.www.addtomenu.load" data-button-menu-id="shared-addto-menu" title="" onclick=";return false;" class="end yt-uix-button yt-uix-button-short yt-uix-tooltip" type="button"><img alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-arrow"></button></span><span class="video-in-quicklist">Added to queue </span></a><div id="video-main-content-' + videos[j]['video-id'] + '" class="video-main-content video-title-one-line"><div class="video-title " dir="ltr"><div class="video-short-title"><a onmousedown="yt.analytics.urchinTracker(\'/Events/Home/PersonalizedHome/TheFeed/UPL/aggregated/Logged_In\');" id="video-short-title-' + videos[j]['video-id'] + '" class="" title="' + videos[j]['video-long-title'] + '" rel="nofollow" href="/watch?v=' + videos[j]['video-id'] + '&amp;feature=feedu">' + videos[j]['video-short-title'] + '</a></div><div class="video-long-title"><a onmousedown="yt.analytics.urchinTracker(\'/Events/Home/PersonalizedHome/TheFeed/UPL/aggregated/Logged_In\');" id="video-long-title-' + videos[j]['video-id'] + '" class="" title="' + videos[j]['video-long-title'] + '" rel="nofollow" href="/watch?v=' + videos[j]['video-id'] + '&amp;feature=feedu">' + videos[j]['video-short-title'] + '</a><div class="video-logos"><a href="/watch?v=' + videos[j]['video-id'] + '&amp;feature=feedu&amp;hd=1"><img class="master-sprite hd-video-logo video-logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a></div></div></div><div class="video-description" dir="ltr" id="video-description-' + videos[j]['video-id'] + '"> ' + videos[j]['video-description'] + ' </div><div class="video-facets"><span class="video-view-count">' + videos[j]['video-time'] + '</span><span class="video-view-count" id="video-num-views-' + videos[j]['video-id'] + '">' + videos[j]['video-views'] + '</span><span class="video-view-count"><a href="/users/' + videos[j]['uploader'] + '">' + videos[j]['uploader'] + '</a></span></div></div><div class="video-clear-list-left"></div></div></div><div onclick="moduleHelper.deleteFeedVideo(\'' + videos[j]['video-id'] + '\', \'UPL\');document.getElementById(\'feedvid-' + videos[j]['video-id'] + '-UPL\').style=\'display:none;\';return false" class="feedmodule-x-button" style="top:0;"><img alt="Remove" class="master-sprite img-php-close-button" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></div></div>';
			}
			
			if(videoHTML == '')
			{
				feedContent.innerHTML += '<div style="margin-left:5px;margin-top:5px;" id="userscript-subbox"><div style="font-weight:bold;">Your subscriptions haven\'t added videos lately.</div><div style="color:#666;">When your subscriptions upload and add new videos, we\'ll show them here on this page.</div>';
			}
			else
			{
				feedContent.innerHTML += '<div class="feedmodule-body opt-in-experiment-feedmodule-body" id="userscript-subbox"><div class="grid-view"><div class="feedmodule-single-form-item"><div class="feeditem-grid-new">' + videoHTML + '</div></div></div></div>';
			}
			
			getTopVideos();
		}
	});
}

if(document.getElementById('homepage-main-content'))
{	
	// replace welcome message
	document.getElementById('homepage-main-content').innerHTML = document.getElementById('homepage-main-content').innerHTML.replace('Welcome to the new YouTube homepage.', 'Welcome to the <strong>old</strong> and <strong>superior</strong> YouTube homepage.');
	
	getSubscriptions();
}