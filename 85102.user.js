// ==UserScript==
// @name          /mu/ YouTube Previews
// @namespace     http://lucidchan.org
// @description   adds the two most relevent videos of strings enclosed in "*"
// @include       http://boards.4chan.org/*
// ==/UserScript==
function getYouTube(search) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://gdata.youtube.com/feeds/api/videos?max-results=5&q=' + search,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var XML = responseDetails.responseText;
			if (XML.indexOf('http://www.youtube.com/watch?v') != -1) {
				var patt1= /http:\/\/www.youtube.com\/watch\?v/g;
				var matches = XML.match(patt1);
				var first = XML.indexOf('http://www.youtube.com/watch?v')
				var second = XML.indexOf('\'', first + 1)
				var video = video2 = '';
				var second_vid = false;
				video = XML.substring(first, second);
				if (XML.substring(XML.lastIndexOf('http://www.youtube.com/watch?v'), video.length + XML.lastIndexOf('http://www.youtube.com/watch?v')) != video) {
					second_vid = true;
					var third = XML.indexOf('http://www.youtube.com/watch?v', second + 1);
					var fourth = XML.indexOf('\'', third + 1)
					var video2 = XML.substring(third, fourth);
					if (video.substring(0,42) == video2.substring(0,42)) {
						var fifth = XML.indexOf('http://www.youtube.com/watch?v', fourth + 1);
						var sixth = XML.indexOf('\'', fifth + 1)
						video2 = XML.substring(fifth, sixth);
					}
				}
				var posts = document.getElementsByTagName('blockquote');
				for (var i = 0; i < posts.length; i++) {
					var post = posts[i].innerHTML;
					if (post.indexOf('*') != -1) {
						var first_index = post.indexOf('*');
						if (post.indexOf('*', first_index + 1) != -1) {
							var second_index = post.indexOf('*', first_index + 1);
							var searchstr = post.substring(first_index + 1, second_index);
							var search1 = searchstr.replace(/<br>/g, '');
							if (search1 == search) {
								var vid = video.slice(video.indexOf('=') + 1, video.indexOf('&'));
								var vid2 = video2.slice(video.indexOf('=') + 1, video.indexOf('&'));
								posts[i].innerHTML += '<br/><object width="480" height="100"><param name="movie" value="http://www.youtube.com/v/' + vid + '?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + vid + '?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="100"></embed></object>';
								if (second_vid) {
									posts[i].innerHTML += "<br />";
									posts[i].innerHTML += '<object width="480" height="100"><param name="movie" value="http://www.youtube.com/v/' + vid2 + '?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + vid2 + '?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="100"></embed></object>';
									posts[i].innerHTML += "<br />";
								}
							}
						}
					}
				}
			}
		}
	});
}
function getSearchPhrase() {
	var posts = document.getElementsByTagName('blockquote');
	for (var i = 0; i < posts.length; i++) {
		var post = posts[i].innerHTML;
		if (post.indexOf('*') != -1) {
			var first_index = post.indexOf('*');
			if (post.indexOf('*', first_index + 1) != -1) {
				var second_index = post.indexOf('*', first_index + 1);
				var searchstr = post.substring(first_index + 1, second_index);
				var search = searchstr.replace(/<br>/g, '');
				if (search != '') {
					getYouTube(search);
				}
			}
		}
	}
}
getSearchPhrase();
