// ==UserScript==
// @name Glitch Forum Avatars
// @namespace glitch.userscripts.forumavatars
// @description Adds avatars to Glitch forum pages.
// @include http://www.glitch.com/forum/*
// @include http://www.glitch.com/groups/*
// @include http://developer.glitch.com/forum/*
// @version 0.2.3
// @date 2011-11-01
// ==/UserScript==

(function() {
	if (window.top !== window.self) return;
	function main() {
		// Config
		var confs = {
			'forum': {
				'postSel': '.reply, .topic',
				'metaSel': '.minor a[href*="profiles"]',
				'avCss': 'top:30px;left:0;'
			},
			'forumlist': {
				'postSel': 'table.forum > tbody > tr td:last-child .minor',
				'metaSel': 'a[href*="profiles"]',
				'avCss': 'top:50%;margin-top:-19px;left:-42px;'
			},
			'dev': {
				'postSel': '.reply, .topic',
				'metaSel': '.postlinks a[href*="profiles"]',
				'avCss': 'top:0;left:-50px;height:72px;width:50px;text-indent:-10000px'
			},
			'devlist': {
				'postSel': 'table.forum > tbody > tr td:last-child .minor',
				'metaSel': 'a[href*="profiles"]',
				'avCss': 'top:50%;margin-top:-19px;left:-50px;width:38px;height:38px;background-position:-1px -7px;overflow:hidden;text-indent:-10000px;-webkit-border-radius:19px;-moz-border-radius:19px;border-radius:19px;'
			}
		}
		confs['grouplist'] = confs['forumlist'];
		confs['group'] = confs['forum'];

		if (/www\.glitch\.com\/forum\/\w+\/\d+\/?/i.test(window.location.href))
			var conf = confs['forum'];
		else if (/www\.glitch\.com\/forum\/\w+/i.test(window.location.href))
			var conf = confs['forumlist'];
		else if (/www\.glitch\.com\/groups\/\w+\/discuss\/\d+/i.test(window.location.href))
			var conf = confs['group'];
		else if (/www\.glitch\.com\/groups\/\w+/i.test(window.location.href))
			var conf = confs['grouplist'];
		else if (/developer\.glitch\.com\/forum\/\d+/i.test(window.location.href))
			var conf = confs['dev'];
		else if (/developer\.glitch\.com\/forum/i.test(window.location.href))
			var conf = confs['devlist'];
		else
			return;

		function makeAvatar(tsid, name, url, topic)
		{
			if (topic)
				var a = $('<a href="http://glitch.com/profiles/'+tsid+'" style="background-image:url('+url+');position:absolute;top:0;left:-50px;display:block;width:50px;height:72px;text-indent:-10000px;" title="'+name+'">'+name+'</a>');
			else
				var a = $('<a href="http://glitch.com/profiles/'+tsid+'" style="background-image:url('+url+');position:absolute;'+conf['avCss']+'" class="avatar-link name minor-link" title="'+name+'">'+name+'</a>');
			return a;
		}

		function showAvatars() {
			var posts = {};

			function getAvatar(tsid)
			{
				if (posts.hasOwnProperty(tsid))
				{
					api_call('players.fullInfo', {player_tsid: tsid}, function(data) {
						if (!data.avatar || !data.avatar[50] || !data.player_name) return;
						var url = data.avatar[50];
						for (var i = 0; i < posts[tsid].length; i++)
						{
							posts[tsid][i].style.position = 'relative';
							$(posts[tsid][i]).append(makeAvatar(tsid, data.player_name, url, /topic/i.test(posts[tsid][i].className)));
						}
					});
				}
			}

			function findUser()
			{
				var a = $(this).find(conf['metaSel']);
				if (a && a.attr('href'))
				{
					var m = a.attr('href').match(/profiles\/(\w+)\/?/);
					if (m)
					{
						if (typeof posts[m[1]] === 'undefined')
							posts[m[1]] = [];
						posts[m[1]].push(this);
					}
				}
			}

			$(conf['postSel']).each(findUser);

			for (var tsid in posts)
				getAvatar(tsid);
		}

		$(document).ready(showAvatars);
	}

	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+main+')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
})();
