// ==UserScript==
// @name        VoF forum proper ignore
// @namespace   DScript
// @description Completely hide ignored users, posts quoting ignored users, and threads created by ignored users
// @include     http://www.vof.se/forum/*
// @require     http://code.jquery.com/jquery.min.js
// @version     3
// ==/UserScript==

var properIgnore = {
	getIgnoredUsers: function() {
		var x = JSON.parse(localStorage.getItem('phpBBIgnoredUsers') || 'null');
		if(x === null) {
			properIgnore.refreshIgnoredUsers();
		}

		properIgnore.gotIgnoredUsers(x);
	},

	gotIgnoredUsers: function(users) {
		if(location.href.indexOf('viewforum.php') >= 0 || location.href.indexOf('search.php') >= 0) {
			properIgnore.removeThreads(users);
		} else if(location.href.indexOf('viewtopic.php') >= 0) {
			properIgnore.removePosts(users);
			properIgnore.removeQuotes(users);
		} else if(location.href.indexOf('index.php') >= 0 || location.href == 'http://www.vof.se/forum/') {
			properIgnore.removeChat(users);
		}

		$('#vofIgnoreListRefresh').prop('disabled', false);
	},

	refreshIgnoredUsers: function() {
		$.get('/forum/ucp.php?i=zebra&mode=foes', {}, function(res) {
			var d = $(res);
			var users = d.find('select[name="usernames[]"] option').map(function() { return $(this).text(); }).toArray();
			localStorage.setItem('phpBBIgnoredUsers', JSON.stringify(users));
			properIgnore.gotIgnoredUsers(users);
		});
	},

	removeThreads: function(users) {
		// subsilver2
		$('.topicauthor a').each(function() {
			var authorName = $(this).text();
			if(users.indexOf(authorName) >= 0) {
				$(this).closest('tr').remove();
			}
		});

		// prosilver
		$('li.row dt:first-child a[href*="memberlist.php"]').each(function() {
			var authorName = $(this).text();
			if(users.indexOf(authorName) >= 0) {
				$(this).closest('li.row').remove();
			}
		});
	},

	removePosts: function(users) {
		// subsilver2
		$('.gensmall:contains("som är på din lista över ignorerade användare")').closest('table.tablebg').remove();

		// prosilver
		$('.post').filter(function() { return $('.postbody .ignore', this).length > 0; }).remove();
	},

	removeQuotes: function(users) {
		// subsilver2
		$('.postbody').each(function() {
			$('.quotetitle').each(function() {
				var user = $(this).text().replace(' skrev:','');
				if(users.indexOf(user) >= 0) {
					$(this).closest('table.tablebg').remove();
					return false;
				}
			});
		});

		// prosilver
		$('.postbody').each(function() {
			$('cite').each(function() {
				var user = $(this).text().replace(' skrev:','');
				if(users.indexOf(user) >= 0) {
					$(this).closest('.post').remove();
					return false;
				}
			});
		});
	},

	removeChat: function(users) {
		$('#mChatData > div a[href*="memberlist.php"]').each(function() {
			var authorName = $(this).text();
			if(users.indexOf(authorName) >= 0) {
				$(this).closest('.mChatBG1, .mChatBG2').remove();
			}
		});
	},

	addRefreshButton: function() {
		// subsilver2
		$('<td/>', { 'style': 'padding-right: 4px' })
			.append($('<span/>', { 'class': 'gensmall' })
				.append($('<button />', { id: 'vofIgnoreListRefresh' }).html('Refresh ignore list'))
			)
			.insertBefore('table.legend td:first');

		// prosilver
		$('<li />', { 'style': 'padding: 1px 4px' })
			.append(' | ')
			.append($('<a/>', { href: 'javascript:void(0);', id: 'vofIgnoreListRefresh' }).html('Refresh ignore list'))
			.insertAfter('#page-footer .linklist .icon-home')

		$('#vofIgnoreListRefresh').click(function() {
			$(this).prop('disabled', true);
			properIgnore.refreshIgnoredUsers();
		});
	}
};

properIgnore.getIgnoredUsers();
properIgnore.addRefreshButton();