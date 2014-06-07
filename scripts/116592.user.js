// ==UserScript==
// @name Glitch Forum Unread Posts
// @description Keeps track of whether a Glitch forum thread has unread posts using localStorage.
// @namespace http://joefriedl.net/
// @version 0.1.1
// @match http://*.glitch.com/forum/*
// @runat document-end
// ==/UserScript==

(function() {
	if (!localStorage) return alert('Your browser doesn\'t support localStorage! Try using recent versions of Chrome, Firefox, or Opera.');

	function getThreadInfo(url)
	{
		if (!url.match) return null;
		var m = url.match(/forum\/(\w+)\/(\d+)\/?/i);
		return (m) ? {forum: m[1], id: parseInt(m[2])} : null;
	}

	function getPostId(str)
	{
		if (!str.match) return null;
		var m = str.match(/(\d+)\/?(\?.*)?$/);
		return (m) ? parseInt(m[1]) : null;
	}

	function getLastViewed(name, id)
	{
		var v = localStorage.getItem('last_viewed.'+name+'.'+id);
		return (v === null) ? v : parseInt(v);
	}

	if (/forum\/\w+\/\d+\/?/i.test(window.location.href))
	{
		// Forum post
		var threadInfo = getThreadInfo(window.location.href);
		if (threadInfo)
		{
			var lastViewed = getLastViewed(threadInfo['forum'], threadInfo['id']),
			    replies = document.body.getElementsByClassName('reply'),
			    latestPost = (replies && replies.length)
				? getPostId(replies[replies.length -1].id)
				: 0;
			if (!lastViewed || lastViewed < latestPost)
				localStorage.setItem('last_viewed.'+threadInfo['forum']+'.'+threadInfo['id'], latestPost);
		}
	}
	else if (/forum\/me\/?/i.test(window.location.href))
	{
		// My Discussions
	}
	else if (/forum\/\w+\/?/i.test(window.location.href))
	{
		function container(post, threadInfo)
		{
			var cid = 'forum-read-'+threadInfo['id'];
			var c = document.getElementById(cid);
			if (!c)
			{
				c = document.createElement('div');
				c.className = 'minor';
				c.style.paddingLeft = '15px';
				c.id = cid;
				post.insertBefore(c, post.getElementsByTagName('span')[0]);
			}

			return c;
		}

		function unread(post, threadInfo, postId)
		{
			var c = container(post, threadInfo),
			    markRead = document.createElement('a'),
			    label = document.createElement('span');
			markRead.href = '#';
			markRead.innerHTML = 'Mark as Read';
			markRead.addEventListener('click', function(e) {
				c.removeChild(label);
				c.removeChild(markRead);
				localStorage.setItem('last_viewed.'+threadInfo['forum']+'.'+threadInfo['id'], postId);
				read(post, threadInfo, postId);
				e.preventDefault();
			});
			label.appendChild(document.createTextNode('Unread Posts'));
			label.style.color = '#900';
			label.style.fontWeight = 'bold';
			label.style.paddingLeft = '15px';
			c.appendChild(markRead);
			c.appendChild(label);
		}

		function read(post, threadInfo, postId)
		{
			var c = container(post, threadInfo);
			var markUnread = document.createElement('a');
			markUnread.href = '#';
			markUnread.appendChild(document.createTextNode('Mark as Unread'));
			markUnread.addEventListener('click', function(e) {
				c.removeChild(markUnread);
				localStorage.removeItem('last_viewed.'+threadInfo['forum']+'.'+threadInfo['id']);
				unread(post, threadInfo, postId);
				e.preventDefault();
			});
			c.appendChild(markUnread);
		}

		function processPost(post)
		{
			var title = post.getElementsByClassName('title');
			if (title && title.length)
			{
				var threadInfo = getThreadInfo(title[0].href),
				    latest = post.getElementsByClassName('latest'),
				    lastViewed = getLastViewed(threadInfo['forum'], threadInfo['id']),
				    postId = (latest && latest.length)
					    ? getPostId(latest[0].href)
					    : 0;

				if (lastViewed === null || postId > lastViewed)
					unread(post, threadInfo, postId);
				else
					read(post, threadInfo, postId);
			}
		}

		// Forum list
		var posts = document.body.getElementsByClassName('forum-title');
		for (var i in posts)
		{
			if (!posts[i].getElementsByClassName) continue;
			processPost(posts[i]);
		}
	}
})();
