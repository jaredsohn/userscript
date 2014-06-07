// ==UserScript==
// @name           GLB Forum User Stats
// @namespace      Bogleg
// @description    Gather and display some stats about who posted what when
// @version        0.1.2
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=*
// @include        http://goallineblitz.com/game/forum_thread_list.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var users = {};
var forums = {};
var threads = {};
var includeSubForums = false;
var pendingForums = [];
var pendingThreads = [];
var tryingAdmin = 0;

var topUrl = window.location.href.replace(/&page=(?:\d+|last)/, '');
var topPage = window.location.href.match(/&page=(\d+)/);
if (topPage) topPage = parseInt(topPage[1]);
var topTitle = $('title').text().replace(/^Forum - | - Goal Line Blitz - Beta$/g, '');
var topPages = 1;
$('div.page_selectors:eq(0) div:last a').each(function() {
	if (topPages = $(this).attr('href').match(/page=(\d+)/)) {
		topPages = parseInt(topPages[1]);
	} else {
		topPages = parseInt($(this).text());
	}
});
var forumId = window.location.href.match(/((?:forum|team)_id=\d+)/)[1];

function updateStatus() {
	if (pendingThreads.length == 0 && pendingForums.length == 0) {
		$('#UPS_status').text('');
		$('#get_UPS').attr('disabled', false);
		$('#UPS_incl_sf_span').show();
	}
	var out = '';
	if (tryingAdmin) {
		if (out) out += ', ';
		out += 'admin page';
	}
	if (pendingForums.length > 0) {
		if (out) out += ', ';
		if (pendingForums.length == 1) {
			out += '1 forum';
		} else {
			out += pendingForums.length + ' forums';
		}
		var np = 0;
		$.each(pendingForums, function() {
			np += this.pages;
		});
		out += ' (' + np + ' pages)';
	}
	if (pendingThreads.length > 0) {
		if (out) out += ', ';
		if (pendingThreads.length == 1) {
			out += '1 thread';
		} else {
			out += pendingThreads.length + ' threads';
		}
		var np = 0;
		$.each(pendingThreads, function() {
			np += this.pages;
		});
		out += ' (' + np + ' pages)';
	}
	$('#UPS_status').text('Working: ' + out);
}

function initUser(id, name) {
	if (users[id]) return;
	users[id] = {
		id: id,
		name: name,
		newestPost: 0,
		oldestPost: 0,
		numThreads: 0,
		threads: {},
		numPosts: 0,
		posts: {},
	};
}

function initForum(url, title) {
	if (forums[url]) return;
	forums[url] = {
		url: url,
		title: title,
		pages: [],
		pendingPages: [],
		numThreads: 0,
		numPosts: 0,
		threads: {},
	};
	// start the fetching process here, if url != window.location.href
}

function initThread(forumUrl, forumTitle, threadUrl, threadTitle, when, userId, userName) {
	initUser(userId, userName);
	initForum(forumUrl, forumTitle);
	threads[threadUrl] = {
		url: threadUrl,
		title: threadTitle,
		forum: forums[forumUrl],
		creator: users[userId],
		created: when,
		pages: [],
		pendingPages: [],
		numPosts: 0,
		posts: {},
	};
	forums[forumUrl].numThreads++;
	forums[forumUrl].threads[threadUrl] = threads[threadUrl];
	users[userId].numThreads++;
	users[userId].threads[threadUrl] = threads[threadUrl];
	// start the fetching process here, if url != window.location.href
}

function threadPost(threadUrl, threadTitle, postId, when, userId, userName) {
	initUser(userId, userName);
	users[userId].numPosts++;
	users[userId].posts[when] = { thread: threads[threadUrl], post: postId };
	if (!users[userId].oldestPostWhen) {
		users[userId].oldestPostWhen = when;
		users[userId].oldestPostThread = users[userId].threads[threadId];
		users[userId].newestPostWhen = when;
		users[userId].newestPostThread = users[userId].threads[threadId];
	} else if (users[userId].oldestPostWhen > when) {
		users[userId].oldestPostWhen = when;
		users[userId].oldestPostThread = users[userId].threads[threadId];
	} else if (users[userId].newestPostWhen < when) {
		users[userId].newestPostWhen = when;
		users[userId].newestPostThread = users[userId].threads[threadId];
	}
}

function crawlThread(ob) {
}

function crawlForum(ob) {
}

$('div.content_header').after('<button id="get_UPS">Get User Post Stats</button><span id="UPS_incl_sf_span"> <input type="checkbox" id="UPS_incl_sf"/> Include subforums</span> <span id="UPS_status" style="font-weight: bold;"></span>');

$('#get_UPS').click(function() {
	$(this).attr('disabled', true);
	$('#UPS_incl_sf_span').hide();
	initForum(topUrl, topTitle);
	pendingForums.push({url: topUrl, title: topTitle, pages: topPages});
	tryingAdmin = 1;
	updateStatus();
	$.get('/game/forum_private_access.pl?' + forumId, function(data) {
		if (data.indexOf('<meta http-equiv="Refresh" content="0;url=">') != -1) { // no access
			tryingAdmin = 0;
			updateStatus();
			return;
		}
		var agents = data.match(/home\.pl\?user_id=(\d+)">([^<]+)</ig);
		if (!agents) {
			tryingAdmin = 0;
			updateStatus();
			return;
		}
		$.each(agents, function() {
			var a = this.match(/user_id=(\d+)">([^<]+)</);
			initUser(a[1], a[2]);
		});
		console.log(users);
		tryingAdmin = 0;
		updateStatus();
	});
	if ($('#UPS_incl_sf').attr('checked')) {
		$('table.forums a.forum_title').each(function() {
			var url = $(this).attr('href');
			initForum(url, topTitle + ' > ' + $(this).text());
			pendingForums.push(forums[url]);
			updateStatus();
		});
	}
	$('#threads a.thread_title').each(function() {
		var url = $(this).attr('href');
// might not be able to get userId til we fetch the page, right?
// should be able to get numPages, though
		initThread(topUrl, topTitle, url, topTitle + ' - ' + $(this).text(), when, userId, userName);
		pendingThreads.push(threads[url]);
		updateStatus();
	});
	console.log(pendingForums);
	//console.log(pendingThreads);
});
