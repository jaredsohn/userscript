// ==UserScript==
// @name       Stackoverflow review first-posts helper
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  enter something useful
// @match      http://stackoverflow.com/review/first-posts
// @copyright  2013+
// ==/UserScript==

// 2. Check if there are some new post for rewiew
function CheckReviewPosts()
{
	var content = document.body.innerHTML;
	var position = content.search("There are no items for you to review.");
	if (position == -1)
	{
                // По крайней мере не нашел отсутствие новых постов
                position = content.search("This is the");
                if (position == -1)
                {
                        var snd = new Audio("http://fsa.zedge.net/content/7/8/7/4/4-1368013-78740453.mp3"); // buffers automatically when created
                        snd.play();

			var link = document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			link.href = 'http://www.favicon.cc/favicon/481/570/favicon.ico';
			document.getElementsByTagName('head')[0].appendChild(link);
                }
	}
	else
	{
		// reload page
		window.location.reload();
	}
}

// 1. Page loaded. Wait for responce about new posts
setTimeout(CheckReviewPosts, 3000);