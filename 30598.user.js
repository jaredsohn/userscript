// ==UserScript==
// @name          Nested Twitter Replies
// @namespace     pratham.name
// @description   Adds nested replies to every Twitter conversation thread.
// @include       http://twitter.com/*
// @include       http://explore.twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

twitter_replies = {
	html : {},
	replies : [],
	count : 0,
	change : false,

	locate : function () {
		var a = document.getElementsByTagName ('a');

		for (var i=0; i<a.length; i++) {
			if (a [i].innerHTML.substr (0, 11) == 'in reply to') {
				var href = a[i].href;
				var id = a [i].parentNode.parentNode.parentNode.id;

				if (twitter_replies.replies.indexOf (id) == -1) {
					if (id && id.indexOf ('status_') != -1)
						this.get_reply (id, href);

					// to keep track of the updates handled ...
					twitter_replies.replies.push (id);
				}
			}
		}

		try {
			twitter_replies.count = document.getElementsByClassName ('meta entry-meta').length;
		} catch (e) {
			twitter_replies.count = 0;
		}
	},

	monitor : function () {
		if (document.getElementsByClassName ('meta entry-meta').length != twitter_replies.count)
			twitter_replies.locate ();

		setTimeout (twitter_replies.monitor, 200);
	},

	// id is the DOM id - where to draw the reply.
	get_reply : function (id, reply) {
		if (typeof twitter_replies.html [reply.substr (reply.lastIndexOf ('/') + 1)] == 'undefined') {
			GM_xmlhttpRequest ({
				method: 'GET',
				url: reply,
				onload: function (responseDetails) {
					// console.log ('Request for '+reply+' returned ' + responseDetails.status + ' ' + responseDetails.statusText);
					twitter_replies.process_reply (responseDetails.responseText, id, reply);
				}
			});
		}

		else
			twitter_replies.process_reply (twitter_replies.html [reply.substr (reply.lastIndexOf ('/') + 1)], id, reply);
	},

	process_reply : function (html, id, reply) {
		twitter_replies.html [reply.substr (reply.lastIndexOf ('/') + 1)] = html;

		var descRegex = new RegExp ("<span class=\"entry-content\">([\\s\\S]+?)<\\/span>", "gi");
		var desc = descRegex.exec (html);

		var desc = desc === null ? ['', 'Sorry, you are not authorized to see this status.'] : desc;

		try {
			var metaRegex = new RegExp ("<span class=\"meta entry-meta\"[^>]*>([\\s\\S]+?<\\/span>[\\s\\S]+?<\\/span>[\\s\\S]*?)<\\/span>", "gi");
			var meta = metaRegex.exec (html);
			meta = meta [1];
		} catch (e) {
			var meta = '';
		}

		var thumbRegex = new RegExp ("src=\"(https?://a[0-9].twimg.com/profile_images/[^\"]*)\"", "gi");
		var thumbRegex2 = new RegExp ("src=\"(https?://s3.amazonaws.com/twitter_production/profile_images/[^\"]*)\"", "gi");

		var thumb = thumbRegex.exec (html);
		if(thumb === null) {
		  var thumb = thumbRegex2.exec (html);
		}

		try {
			thumb = thumb [1].replace (/bigger/, 'mini');
		} catch (e) {
			thumb = 'http://static.twitter.com/images/default_profile_mini.png';
		}

		// var status_id = 'status_' + reply.substr (reply.lastIndexOf ('/')+1);

		if (id.indexOf ('status_') != -1)
			var status_id = 'reply_' + id.substr (id.lastIndexOf ('_') + 1) + '_' + id.substr (id.lastIndexOf ('_') + 1) + '_' + reply.substr (reply.lastIndexOf ('/') + 1);

		else
			var status_id = 'reply_' + id.substr (id.indexOf ('_') + 1, id.indexOf ('_', 7) - id.indexOf ('_') - 1) + '_' + id.substr (id.lastIndexOf ('_') + 1) + '_' + reply.substr (reply.lastIndexOf ('/') + 1);


		// com/ is 4 chars.
		var tmp = reply.substr (reply.indexOf ('com/') + 4);
		user_id = tmp.substring (0, tmp.indexOf ('/'));

		// console.log (desc [1] + ' ' + meta [1] + ' ' + thumb [1]);

		var node = document.createElement ('li');
		node.setAttribute ('id', status_id);
		node.setAttribute ('class', 'hentry status reply u-prolificd');

		// if status_id exists, then remove the original node to prevent duplication.
		// to prevent multiple threading.
		try {
			var parent_id = 'status_' + reply.substr (reply.lastIndexOf ('/') + 1);
			var next = document.getElementById (parent_id).nextSibling;

			document.getElementById (parent_id).parentNode.removeChild (document.getElementById (parent_id));

			// loop thru all replies and delete them.
			while (next.id.indexOf ('reply_') != -1) {
				var elem = next;
				next = next.nextSibling;

				elem.parentNode.removeChild (elem);
			}

		} catch (e) {
		}

		// insertAfter hack.
		// this will throw an error if element has been deleted.
		try {
			document.getElementById (id).parentNode.insertBefore (node, document.getElementById (id).nextSibling);

			// now edit status_<ID> node.
			if (document.location.href.indexOf ('twitter.com/home') != -1 || document.location.href.indexOf ('twitter.com/replies') != -1 || document.location.href.indexOf ('twitter.com/public_timeline') != -1 || document.location.href.indexOf ('twitter.com/account/archive') != -1)
				document.getElementById (status_id).innerHTML = '<span class="status-body" style="margin-left:65px"> <a class="url" href="http://twitter.com/'+user_id+'"><img src="'+thumb+'" id="profile-image" class="photo fn" style="width:24px; height:24px; vertical-align:middle"/></a> <strong><a href="http://twitter.com/'+user_id+'">'+user_id+'</a></strong> <span class="entry-content"> '+desc [1]+' </span> <span class="meta entry-meta"> '+meta+' </span></span>';

			else
				document.getElementById (status_id).innerHTML = '<span class="status-body" style="margin-left:65px"> <a class="url" href="http://twitter.com/'+user_id+'"><img src="'+thumb+'" id="profile-image" class="photo fn" style="width:24px; height:24px; vertical-align:middle"/></a> <strong><a href="http://twitter.com/'+user_id+'">'+user_id+'</a></strong> <span class="entry-content"> '+desc [1]+' </span> <span class="meta entry-meta"> '+meta+' </span> </span>';

			// html element created now - could access dom functions.
			var a = document.getElementById (status_id).getElementsByTagName ('a');
			for (var i=0; i<a.length; i++) {
				if (a [i].innerHTML.substr (0, 11) == 'in reply to')
					twitter_replies.get_reply (a [i].parentNode.parentNode.parentNode.id, a[i].href);
			}

		} catch (e) {
		}
	}
};

if (document.location.href.indexOf ('/status') == -1) {
	twitter_replies.locate ();

	// set timer to check if "more", turns to "loading..." and fire locate () again ...
	setTimeout (twitter_replies.monitor, 200);
}
