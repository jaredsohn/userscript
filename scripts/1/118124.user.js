// ==UserScript==
// @name           Glitch Groups Plus
// @namespace      http://www.glitch.com/profiles/PIF6RN35T3D1DT2/
// @namespace      http://www.glitch.com/profiles/PCRDMHR3NDO1FVT/
// @include        http://www.glitch.com/groups/*
// @match          http://www.glitch.com/groups/*
// @description    Groups UI enhancements
// @version		   0.3
// ==/UserScript==

function groupListing() {
	$(document).ready(function() {
	
		$.each($('div.label-section:first div.menu-list')
			, function(idx, item) {
				var group = $(item);
				// modify styling
				group.find('a').css("float","left");
				group.find('a').css("width","210px");
				group.css("display","block");
				group.css("width","550px");
				group.css("overflow","hidden");
				
				var groupLink = group.find('a').attr('href') + 'discuss/';

				$.get(groupLink, function(page) {	// process group discuss page to get latest post
					var d = $(page);
					var alink = d.find('td.forum-title:first a:first');	// get top most post link
					var link = $('<span><a style="margin-left: 230px !important; min-height: 3px; padding-left: 0px; " href="' + alink.attr("href") + '">' + alink.text() + '</a></span>');
					
					var last = d.find('td.forum-title:first > span').text().replace('<', '&lt;').replace('>','&gt;');	// get the "4 replies Lastest: 5 hrs ago by so-and-so" text, fix formating for <no replies yet>
					last = $('<span class="minor">' + last + '</span>');
					
					var lastDiv = $('<span style="width: 100%;" />');
					lastDiv.append(link);
					lastDiv.append(last);
					group.find('div.aside').before(lastDiv);
				});
			}
		);
	});
}


if (document.location.pathname == '/groups/') {	// only on http://www.glitch.com/groups/
	var style = document.createElement('style');
	style.innerHTML = ''
		+ ' div.aside { width: 100px !important; } '
		;
	document.head.appendChild(style);

	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + groupListing + ')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}


if (document.location.pathname.match(/\/groups\/[A-Z,0-9]+\/discuss\/[0-9]+\//)) {	// only on a group discussion page
	// Tweak the ahref links to be less subtle and more obvious
	var style = document.createElement('style');
	style.innerHTML = ''
		+ ' p.first a, div.reply a	{ border-bottom: dotted 1px #aaa; } '
		+ ' div.reply div.minor a { border-bottom: none; } '
		;
	document.head.appendChild(style);
}

function groupHome() {
	$(document).ready(function() {
		var viewerTSID = $('#nav-profile a').attr('href').split('/')[2];	// get logged in user ID
		if (!viewerTSID) { return; }
		$.each($('div.section-2 span span'), function(idx, item) {
			var member = $(item);
			var playerTSID = member.attr("id").split("-")[2];
			// check online status for group members and show on page, see styling for details
			api_call('players.fullInfo', { player_tsid: playerTSID, viewer_tsid: viewerTSID }, function(e) {
				if (e.ok) {
					var player = $('#member-level-' + e.player_tsid);
					var title = player.attr("title") + '';
					var styleClass = 'is';
					if (e.relationship.is_rev_contact) { 	// shouldn't we be using relationship.is_contact? - API looks buggy
						title = (title.length == 0 ? 'Your contact ' : '');
						styleClass += '_contact';
					}
					if (e.is_online) { 
						styleClass += '_online';
						title = (title.length == 0 ? 'Is online!' : title + 'is online!');
					} else {
						title = (title.length == 0 ? 'Is offline' : title + 'is offline');
						styleClass += '_offline';
					}
					player.addClass(styleClass);
					player.addClass('group_plus_indicator');
					player.attr("title", title);
				} else { console.error("Something went wrong with checking member status. (players.fullInfo): " + e.error); }
			});
		});
	});
}
if (document.location.pathname.match(/\/groups\/[A-Z,0-9]+\/$/) || document.location.pathname.match(/\/groups\/[A-Z,0-9]+\/members\/page[0-9]+\//) || document.location.pathname.match(/\/groups\/[A-Z,0-9]+\/members\/$/)) {	
// only on a group home page or member list pages, e.g. http://www.glitch.com/groups/RHV10V06BH5240F/
	var style = document.createElement('style');
	style.innerHTML = ''
		+ ' .group_plus_indicator		{ padding: 1px 2px 1px 2px; } '
		+ ' .is_online		{ color: green; font-weight: bold; } '
		+ ' .is_offline		{ } '
		+ ' .is_contact_online		{ background: green; color: white; } '
		+ ' .is_contact_offline		{ background: #999; color: white; } '
		;
	document.head.appendChild(style);

	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + groupHome + ')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}