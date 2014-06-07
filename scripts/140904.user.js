// ==UserScript==
// @name        IMDB Unread Posts
// @namespace   http://abeltoy.com/
// @description Show which posts you haven't read in the IMDB Boards
// @icon		http://img402.imageshack.us/img402/4422/logohxz.png
// @author		Abel Toy (Rolpege) http://userscripts.org/users/rolpege
// @license		Creative Commons BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
// @grant		unsafeWindow
// @grant		GM_getResourceText
// @grant		GM_getResourceURL
// @include		http://*.imdb.com/*board*
// @exclude		http://*.imdb.com/*images*
// @exclude		http://pro.imdb.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource	newIcon http://img507.imageshack.us/img507/1585/newvm.png
// @version     0.9.3
// ==/UserScript==

if(window.top != window.self) return;

var newImage = function(thread)
{
	var img = '<img';
	img += ' src="' + GM_getResourceURL('newIcon') + '"';
	img += ' alt="NEW"';
	img += ' title="' + (thread ? 'This topic contains unread posts' : 'Unread Post') + '"';
	img += ' /> ';
	
	return img;
};

var path = window.location.pathname;

var thread = path.indexOf("thread/") > -1;
var flat = path.indexOf("flat") > - 1;
var inline = path.indexOf("inline") > -1;
var nest = path.indexOf("nest") > -1;

if(path.indexOf("threads") > -1 || path.match(/board\/$/))
{
	$(".board_left_column table:eq(1) table:first tr").each(function(index)
	{
		if(index > 0)
		{
			var titleCell = $(this).children('td:first');
			
			var link = titleCell.find("a:first").attr('href');
			var id = link.slice(link.lastIndexOf("/") + 1);
			
			var timeCell = $(this).children('td:eq(3)');
			var t = timeCell.find('a:first').attr('href');
			t = t.slice(t.indexOf('&t=') + 3, t.indexOf('#latest'));
			
			var date = new Date(t.slice(0, 4), parseFloat(t.slice(4, 6)) - 1, t.slice(6, 8), t.slice(8, 10), t.slice(10, 12), t.slice(12, 14));
			
			var lastRead = localStorage.getItem(id);
			if(lastRead) lastRead = new Date(lastRead);
			if(!lastRead || date > lastRead) titleCell.prepend(newImage(true));
		}
	});
}
else if(thread || flat || inline || nest)
{
	var id = path.slice(path.lastIndexOf("/") + 1);
	if(id.indexOf("?") > -1) id = id.slice(0, id.indexOf("?"));
	
	var lastRead = localStorage.getItem(id);
	if(lastRead) lastRead = new Date(lastRead);
	
	var mostRecent;
	
	if(thread || inline)
	{
		var time = $("#tn15 table:eq(3) > tbody > tr > td:first > table:eq(1) table table:first td:first").html();
		if(!time) return;
		time = time.match(/\(([^)]*)\)/g);
		if(!time) return;
		time = time[0].slice(1, -1)
			
		mostRecent = new Date(time);
		
		if(!lastRead || mostRecent > lastRead)
		{
			$("#tn15 table:eq(3) > tbody > tr > td:first > table:eq(1) table:first td:first").prepend(newImage());
		}
		
		$("#tn15 table:eq(3) > tbody > tr > td:first tr:gt(6)").each(function()
		{
			var time = $(this).find("td:eq(2)").html();
			if(!time) return;
			time = time.match(/\(([^)]*)\)/g);
			if(!time) return;
			time = time[0].slice(1, -1)
			
			var date = new Date(time);
			
			if(!lastRead || date > lastRead)
			{
				$(this).find("td:first").prepend(newImage());
			}
		});
	}
	else if(flat || nest)
	{
		$("#tn15 table:eq(4) > tbody > tr > td:first > table").each(function(index)
		{
			if(index > 0)
			{
				var time = $(this).find("table:eq(1) td:first").html();
				if(!time) return;
				time = time.match(/\(([^)]*)\)/g);
				if(!time) return;
				time = time[0].slice(1, -1)
				
				var date = new Date(time);
				if(!mostRecent || date > mostRecent) mostRecent = date;
				
				if(!lastRead || date > lastRead) $(this).find("table td:first").prepend(newImage());
			}
		});
	}
	
	if(!lastRead || mostRecent > lastRead) localStorage.setItem(id, mostRecent);
}