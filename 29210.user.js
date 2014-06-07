// ==UserScript==

// @name           PMOG Last Post Link

// @namespace      http://userscripts.org/scripts/show/29210

// @include        http://pmog.com/forums/*

// @include        http://pmog.com/forums/topics/*

// @include        http://pmog.com/posts/latest*

// ==/UserScript==



// add "last post" links to...

// forum topics pages

if (/^http:\/\/pmog\.com\/forums\/[^\/]+\/?$/.test(location.href)) {

	// function for topics page

	function topic_last_post (link) {

		GM_xmlhttpRequest({

			method:"GET",

			url:link.href,

			headers:{

				"User-Agent":"Mozilla/5.0",

				"Accept":"text/html"

			},

			onload:function(response) {

				var posts = response.responseText.match(/(#[^']+)'>Permalink<\/a>/g);

				var post = posts[posts.length-1].match(/(#[^']+)'/)[1];

				link.href += post;

				link.innerHTML = ' (last post)';

			}

		});

	}

	var rows = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

	for (var row in rows) {

		var cols = rows[row].getElementsByTagName('td');

		var replies = cols[2].innerHTML;

		if (replies > 24) {

			var topic = cols[0].getElementsByTagName('a')[0].href;

			var link = document.createElement('a');

			var last_page = Math.ceil((parseInt(replies) + 1)/25);

			link.href = topic + '?page=' + last_page;

			link.innerHTML = ' (fetching...)'

			topic_last_post(link);

			cols[0].getElementsByTagName('h5')[0].appendChild(link);

		}

	}

}

// latest posts page

if (/^http:\/\/pmog.com\/posts\/latest\/?$/.test(location.href)) {

	// function for latest posts page

	function GM_last_page (link, topic) {

		GM_xmlhttpRequest({

			method:"GET",

			url:topic, 

			headers:{

				"User-Agent":"Mozilla/5.0",

				"Accept":"text/html"

			},

			onload:function(response) {

				link.innerHTML = ' (last page)';

				var matches = response.responseText.match(/>(\d+)<\/a> <a href="\/forums\/[^\/]+\/topics\/[^\?]+\?page=2" class="next_page" rel="next/);

				// only need to hit again if the topic has more than one page

				if (matches) {

					link.href = topic + '?page=' + matches[1];

					GM_last_post(link, matches[1]);

				}

				else {

					link.href = topic;

					GM_last_post(link, 1);

				}

			}

		});

	}

	function GM_last_post (link, page) {

		GM_xmlhttpRequest({

			method:"GET",

			url:link.href,

			headers:{

				"User-Agent":"Mozilla/5.0",

				"Accept":"text/html"

			},

			onload:function(response) {

				var posts = response.responseText.match(/(#[^']+)'>Permalink<\/a>/g);

				var post = posts[posts.length-1].match(/(#[^']+)'/)[1];

				link.href += post;

				link.innerHTML = ' (last post)';

			}

		});

	}

	var lp_rows = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

	for (var l=1; l<=10; l++) {

		var lp_col = lp_rows[l].getElementsByTagName('td')[1];

		var lp_topic = lp_col.getElementsByTagName('a')[0].href;

		var lp_link = document.createElement('a');

		GM_last_page(lp_link, lp_topic);

		lp_link.innerHTML = ' (fetching...)';

		lp_col.appendChild(lp_link);

	}

}