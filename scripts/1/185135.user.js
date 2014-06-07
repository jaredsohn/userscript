// ==UserScript==
// @name	Wykop - obserwowanie
// @author	snowak
// @description	Skrypt wyświetla ikonki obok obserwowanych i obserwujących nas użytkowników
// @include     http://*wykop.pl/*
// @downloadURL	http://userscripts.org/scripts/source/185135.user.js
// @updateURL	http://userscripts.org/scripts/source/185135.meta.js
// @version	1.1
// @grant	none
// @run-at	document-end
// ==/UserScript==

(function()
{
	// **************************************************
	// Variables
	// **************************************************
	var appKey = 'XZ76z2rfIT';
	var updateInterval = 3600; // 1 hour
	var followed = {};
	var followers = {};


	// **************************************************
	// Icons
	// **************************************************

	var iconFollowed = $('<span />').html('&#10004;');
	iconFollowed.css
	({
		'display' : 'inline-block',
		'width' : '12px',
		'height' : '12px',
		'line-height' : '14px',
		'margin-left' : '4px',
		'color' : '#ffffff',
		'font-size' : '8px',
		'text-align' : 'center',
		'background-color' : 'rgb(63, 180, 47)',
		'-webkit-border-radius' : '12px',
		'-moz-border-radius' : '12px',
		'-ms-border-radius' : '12px',
		'-o-border-radius' : '12px',
		'border-radius' : '12px'
	});
	var iconFollower = iconFollowed.clone().css('background-color', 'rgb(134, 134, 233)');
	iconFollowed.attr('title', 'Obserwujesz ten profil');
	iconFollower.attr('title', 'Jesteś obserwowany przez ten profil');


	// **************************************************
	// Utils
	// **************************************************

	function time()
	{
		return Math.floor(new Date().getTime() / 1000);
	}

	function cacheSet(key, value)
	{
		try
		{
			localStorage.removeItem(key); // required fix for some browsers
			localStorage.setItem(key, JSON.stringify({ data : value }));
		}
		catch (e){ }
	}

	function cacheGet(key)
	{
		try
		{
			return JSON.parse(localStorage.getItem(key)).data;
		}
		catch (e)
		{
			return null;
		}
	}

	function loadFollowed(login, callback, page)
	{
		if (page === undefined, cacheGet('followed') !== null && time() - cacheGet('followedTime') < updateInterval)
		{
			followed = cacheGet('followed');
			callback();
			return;
		}

		if (page === undefined) page = 1;
		$.getJSON('http://a.wykop.pl/profile/followed/' + login + '/appkey,' + appKey + '/page,' + page + '/', function(data)
		{
			for (var x = 0; x < data.length; ++x) followed[data[x].login] = data[x];
			if (data.length == 0)
			{
				cacheSet('followed', followed);
				cacheSet('followedTime', time());
				callback();
			}
			else
			{
				loadFollowed(login, callback, page + 1);
			}
		});
	}

	function loadFollowers(login, callback, page)
	{
		if (page === undefined, cacheGet('followers') !== null && time() - cacheGet('followersTime') < updateInterval)
		{
			followers = cacheGet('followers');
			callback();
			return;
		}

		if (page === undefined) page = 1;
		$.getJSON('http://a.wykop.pl/profile/followers/' + login + '/appkey,' + appKey + '/page,' + page + '/', function(data)
		{
			for (var x = 0; x < data.length; ++x) followers[data[x].login] = data[x];
			if (data.length == 0)
			{
				cacheSet('followers', followers);
				cacheSet('followersTime', time());
				callback();
			}
			else
			{
				loadFollowers(login, callback, page + 1);
			}
		});
	}

	function process()
	{
		$('a[href*="/ludzie/"]:not(.iconProcessed)').each(function()
		{
			// Mark as processed
			$(this).addClass('iconProcessed');

			// Extract login
			var login = $(this).attr('href');
			login = login.substr(login.indexOf('/ludzie/') + 8);
			login = login.substr(login, login.length - 1);
			if (~login.indexOf('/')) return;

			// Process logins
			$(this).find('*').add(this).filter(function()
			{
				return jQuery.trim($(this).clone().children().remove().end().text()) == login;
			}).each(function(data)
			{
				if (followed.hasOwnProperty(login))
				{
					iconFollowed.clone().appendTo(this);
				}

				if (followers.hasOwnProperty(login))
				{
					iconFollower.clone().appendTo(this);
				}
			})
		});
	}


	// **************************************************
	// Entry point
	// **************************************************

	// Extract account info
	var link = $('nav a[href*="/ulubione/"]');
	if (link.length == 0) return; // user is not logged in
	var login = /ulubione\/(.*?)\//.exec(link.attr('href'))[1];

	loadFollowed(login, function()
	{
		loadFollowers(login, function()
		{
			setInterval(function(){ process(); }, 500);
		});
	});
}());
