// ==UserScript==
// @name           ViewOrigPosterOnly
// @namespace      http://phill84.org
// @description    DRL - Show only posts from thread starter
// @include        https://dream4ever.org/showthread.php?*
// @include        https://*.dream4ever.org/showthread.php?*
// @include        https://d4e.org/showthread.php?*
// @include        https://*.d4e.org/showthread.php?*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         phill84
// @version        1.06
/* @reason
> make it work on chrome
@end*/
// ==/UserScript==

/* Updater */
var thisScript = {
	name:		'ViewOrigPosterOnly',
	id:			'74910',
	version:	'1.06'
};
try {
	var updater = new Updater(thisScript);
	updater.check();
} catch (e) {}

/* global variables */
var $ = document;
var params = {};
var starter;
var totalPage;
var lastFetchedPage;
var running = false;
var nextRefreshId;
var lastPostId;

/* Update current/total page number */
var parseNav = function(doc) {
	var nav = null;
	try {
		nav = doc.getElementsByClassName('pagenav')[0].getElementsByClassName('vbmenu_control')[0].childNodes[1].textContent;
	} catch (e) {
		lastFetchedPage = totalPage = 1;
		return;
	}
	var array = nav.split(' ');
	lastFetchedPage = parseInt(array[0].substring(1, array[0].length - 1));
	totalPage = parseInt(array[1].substring(1, array[1].length - 1));
};

var init = function() {
	var array = window.location.search.substring(1).split('&');
	for (var i = 0; i < array.length; i ++) {
		var entry = array[i].split('=');
		if (entry.length === 2){
			params[entry[0]] = parseInt(entry[1]);
		}
	}
	if (!params.page) {
		params.page = 1;
	}
	if (!params.postcount) {
		lastFetchedPage = params.page

		var tbody = $.getElementById('displaymodes_menu').childNodes[1].childNodes[1]
		/* Create and append filter link */
		var fltr = $.createElement('tr');
		var fltd = $.createElement('td');
		fltd.setAttribute('class', 'vbmenu_option');
		fltd.style.cursor = 'pointer';
		var fllink = $.createElement('a');
		fllink.href = 'javascript: void(0);';
		fllink.innerHTML = '\u53EA\u770B\u697C\u4E3B';
		fllink.addEventListener('click', filter, false);
		fltd.appendChild(fllink);
		fltr.appendChild(fltd);
		tbody.appendChild(fltr);
		parseNav($);
	}
};

var displayNotification = function(text) {
	var notificationTop = $.getElementById('filter_notification_top');
	if (!notificationTop) {
		notificationTop = $.createElement('DIV');
		notificationTop.id = 'filter_notification_top';
		notificationTop.setAttribute('class', 'thead');
		notificationTop.style.textAlign = 'center';
		notificationTop.style.fontWeight = 'strong';
		notificationTop.style.width = '100%';
		var poststop = $.getElementById('poststop');
		poststop.parentNode.insertBefore(notificationTop, poststop.nextSibling);
	} else {
		notificationTop.style.display = 'block';
	}
	var notificationBottom = $.getElementById('filter_notification_bottom');
	if (!notificationBottom) {
		notificationBottom = $.createElement('DIV');
		notificationBottom.id = 'filter_notification_bottom';
		notificationBottom.setAttribute('class', 'thead');
		notificationBottom.style.textAlign = 'center';
		notificationBottom.style.fontWeight = 'strong';
		notificationBottom.style.width = '100%';
		var table = $.getElementById('threadtools2').parentNode.parentNode.parentNode.parentNode;
		table.parentNode.insertBefore(notificationBottom, table.nextSibling);
	} else {
		notificationBottom.style.display = 'block';
	}
	notificationTop.innerHTML  = notificationBottom.innerHTML = text;
};

var hideNotification = function() {
	var notificationTop = $.getElementById('filter_notification_top');
	var notificationBottom = $.getElementById('filter_notification_bottom');
	if (notificationTop) {
		notificationTop.innerHTML = '';
		notificationTop.style.display = 'none';
	}
	if (notificationBottom) {
		notificationBottom.innerHTML = '';
		notificationBottom.style.display = 'none';
	}
};

var getDocByPageNumber = function(page, getStarterOnly) {
	if (getStarterOnly) {
		displayNotification('\u6B63\u5728\u83B7\u53D6\u697C\u4E3B\u7528\u6237\u540D...');
	} else {
		displayNotification('\u6B63\u5728\u52A0\u8F7D\u7B2C ' + page + ' \u9875(\u5171 ' + totalPage + ' \u9875)...');
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: window.location.href + '&page=' + page + '&pp=' + params.pp,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
		},
		onload: function(responseDetails) {
			/* Parse string to DOM object */
			hideNotification();
			var div = $.createElement('div');
			div.innerHTML = responseDetails.responseText
			docProcessor(div, getStarterOnly);
		}
	});
};

var getPostsDiv = function(doc) {
	var nodes = doc.getElementsByTagName('DIV');
	for (var i = 0; i < nodes.length; i ++) {
		if (nodes[i].id === 'posts') {
			return nodes[i];
		}
	}
};

var docProcessor = function(doc, getStarterOnly) {
	if (getStarterOnly) {
		starter = doc.getElementsByClassName('bigusername')[0].innerHTML;
		removeNonStarterPosts();
	} else {
		var posts = $.getElementById('posts');
		parseNav(doc);
		displayNotification('\u6B63\u5728\u5904\u7406\u7B2C ' + lastFetchedPage + ' \u9875(\u5171 ' + totalPage + ' \u9875)...');
		var nodes = getPostsDiv(doc).childNodes;
		for (var i = 0; i < nodes.length; i ++ ) {
			if (nodes[i].nodeType === 1 && nodes[i].tagName === 'DIV') {
				var name = nodes[i].getElementsByClassName('bigusername')[0].innerHTML;
				var id = parseInt(nodes[i].getElementsByTagName('STRONG')[0].innerHTML);
				if (name === starter && (!lastPostId || lastPostId < id)) {
					posts.appendChild(nodes[i]);
					lastPostId = id;
				}
			}
		}
	}
	hideNotification();
	if (lastFetchedPage < totalPage) {
		getDocByPageNumber(lastFetchedPage + 1);
	} else {
		running = false;
	}
};

var removeNonStarterPosts = function() {
	var nodes = $.getElementById('posts').childNodes;
	var id;
	for (var i = 0; i < nodes.length; i ++ ) {
		if (nodes[i].nodeType === 1 && nodes[i].tagName === 'DIV') {
			var name = nodes[i].getElementsByClassName('bigusername')[0].innerHTML;
			if (name !== starter) {
				nodes[i].parentNode.removeChild(nodes[i]);
				i --;
			} else {
				id = parseInt(nodes[i].getElementsByTagName('STRONG')[0].innerHTML);
			}
		}
	}
	if (id) {
		lastPostId = id;
	}
	getDocByPageNumber(lastFetchedPage + 1);
};

var autoRefresh = function() {
	if (!running) {
		getDocByPageNumber(totalPage);
	}
	nextRefreshId = setTimeout(arguments.callee, 30000);
};

var toggleAutoRefreshing = function() {
	if ($.getElementById('auto_refresh').checked) {
		autoRefresh();
	} else {
		if (nextRefreshId) {
			clearTimeout(nextRefreshId);
		}
	}
};

var filter = function() {
	running = true;
	if (params.page !== 1) {
		getDocByPageNumber(1, true);
	} else {
		/* Get starter name */
		starter = $.getElementById('posts').childNodes[4].getElementsByClassName('bigusername')[0].innerHTML;
		removeNonStarterPosts();
	}
	$.getElementById('displaymodes_menu').style.display = 'none';
	var displaymodes = $.getElementById('displaymodes');
	var td = $.createElement('td');
	td.setAttribute('class', 'vbmenu_control');
	td.innerHTML = '\u81EA\u52A8\u5237\u65B0';
	var input = $.createElement('input');
	input.type = 'checkbox';
	input.id = 'auto_refresh';
	input.addEventListener('click', toggleAutoRefreshing, false);
	td.appendChild(input);
	displaymodes.parentNode.insertBefore(td, displaymodes.nextSibling);
	return false;
};

init();