// ==UserScript==
// @name		EpisodeCalendar TorrentLink
// @namespace	http://teleportz.com.ar/
// @version		1.1
// @description	Add a link to Torrentz.eu for each episode listed in the calendar
// @match		http://episodecalendar.com/*
// @match		http://www.episodecalendar.com/*
// @copyright	Santiago Dimattia, MIT License
// ==/UserScript==

// Tracker Lists (use {name} as placeholder for show name and episode number

var $trackerList = [
	{
		name: 'Torrentz',
		link: 'https://torrentz.eu/search?f={name}',
	},
	{
		name: 'KickAssTorrents',
		link: 'https://kickass.to/usearch/{name}/'
	},
	{
		name: 'ThePirateBay',
		link: 'https://thepiratebay.se/search/{name}',
	}
];

// Code

var TorrentLink = {
	bodyCache: $('body'),
	pageCache: $('#page'),
	trackerList: $trackerList,
	trackerListTotal: $trackerList.length,

	init: function(){
		this.addStyles();

		if(this.bodyCache.hasClass('calendar'))
		{
			this.doCalendarPage();
		}

		if(this.bodyCache.hasClass('show_season'))
		{
		 	this.doShowPage();
		}

		if(this.bodyCache.hasClass('unwatched'))
		{
		 	this.doUnwatchedPage();
		}
	},

	doCalendarPage: function()
	{
		// Parse each episode not seen
		$('.calendar_cell_content li:not(.seen)').each(function(){
			// we only want to add the link to released episodes, so check if the episode has the check to mark as viewed
			if($(this).find('a.ajaxLink').length == 0)
			{
				return;
			}

			// get the show name
			var name = $(this).find('strong a').text();

			console.log(name);

			// get the episode number
			var number = TorrentLink.parseEpisodeNumber($(this).find('.episode').text());

			// if episode number is invalid, do nothing
			if( ! number)
			{
				return;
			}

			// generate links
			var links = TorrentLink.generateLinks(name+" "+number);
			$(this).append(links);
		});

		// we move the month pagination to the bottom
		$('#month_navigation').insertAfter('#calendar');
		$('#page > .month').insertAfter('#month_navigation');
	},

	doShowPage: function()
	{
		// get the show name
		var name = $('.show_banner h1.hidden').text();

		$('.season_list > div').each(function(){
			// if we already have the links, cancel
			if($(this).find('.torrentlink').length > 0)
			{
				return;
			}

			// if we already seen this episode (or it isn't released yet)
			var ajaxLink = $(this).find('.seen .ajaxLink');
			if(ajaxLink.length == 0 || ajaxLink.hasClass('ui-checkbox-state-checked'))
			{
				return;
			}

			// get the episode number
			var number = $(this).find('.name strong').text();

			// generate links
			var links = TorrentLink.generateLinks(name+" "+number);
			console.log(links);

			$(this).find('.name').append(links);
		});

		// Content is loaded via AJAX, so reload the buttons every 3 seconds
		setTimeout(function(){ TorrentLink.doShowPage(); }, 3000);
	},

	doUnwatchedPage: function()
	{
		// get the show name
		var str = $('.content h2 a').text();

		// delete " - Season X" from show name
		var rEXP = /(.*?) - Season \d+/;
		if(rEXP.test(str))
		{
			var result = rEXP.exec(str);
			var name = result[1];
		}
		else
		{
			setTimeout(function(){ TorrentLink.doUnwatchedPage(); }, 3000);
			return;
		}

		$('.season_list > div').each(function(){
			// if we already have the links, cancel
			if($(this).find('.torrentlink').length > 0)
			{
				return;
			}

			// get the episode number
			var number = $(this).find('.name strong').text();

			// generate links
			var links = TorrentLink.generateLinks(name+" "+number);

			$(this).find('.name').append(links);
		});

		// Content is loaded via AJAX, so reload the buttons every 3 seconds
		setTimeout(function(){ TorrentLink.doUnwatchedPage(); }, 3000);
	},

	addStyles: function()
	{
		var style = $('<style>', {
			type: 'text/css',
		});

		// global
		style.append('#page{max-width:1780px;}');

		// plugin
		style.append('.torrentlink-container{display: block;margin:1px 0;}');
		style.append('.torrentlink{font-size: 0.95em !important;margin-right: 6px;color:red !important;border-bottom: none !important;}');
		style.append('.torrentlink:hover{text-decoration:underline;}');

		// calendar
		style.append('.calendar_day_other_month, .calendar_day_other_month a {color: #777 !important;}');
		style.append('.calendar_day_other_month .torrentlink {color: #333 !important;}');

		// apply
		$('head').append(style);
	},

	generateLinks: function(str){
		var container = $('<div>', {
			class: 'torrentlink-container'
		});

		for (i = 0; i < this.trackerListTotal; ++i)
		{
			var tracker = $('<a>', {
				href: this.trackerList[i].link.replace('{name}', escape(str)),
				class: 'torrentlink torrentlink-'+this.generateSlug(this.trackerList[i].name),
				html: this.trackerList[i].name
			});

			tracker.appendTo(container);
		}

		return container;
	},

	parseEpisodeNumber: function(str)
	{
		var rEXP = /\((\w+)\)/;
		if(rEXP.test(str))
		{
			var result = rEXP.exec(str);

			if(result)
			{
				return result[1];
			}
		}

		return;
	},

	generateSlug: function(str){
		// thanks stackoverflow - https://stackoverflow.com/questions/2292302/jquery-convert-title-to-slug
		str = str.replace(/[^a-zA-Z0-9\s]/g, "");
		str = str.toLowerCase();
		str = str.replace(/\s/g,'-');
		return str;
	}
};

TorrentLink.init();