// ==UserScript==
// @name        Twitter data collection 3
// @namespace   Twitter
// @description Twitter data collection 3
// @include     https://twitter.com/search?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// @version     1
// ==/UserScript==

var tweets = [], tmpTweet = {}, i, data, dataStr;
try
{
  var keyword = document.location.toString ().match (/\?q\=([\%23]?\w+)/)[1];
  //keyword = "MelissaOnline";
}
catch (e)
{
  var keyword = "";
};

function crawl ()
{
	$("div.tweet").each (function ()
	{
    var tmpTweet = new Object;
		tmpTweet.keyword = keyword;
		tmpTweet.tid = $(this).attr ("data-tweet-id");
		tmpTweet.retweet = $(this).attr ("data-retweet-id");
    tmpTweet.reply = $(this).attr ("data-is-reply-to");
		tmpTweet.user = $(this).attr ("data-user-id");
		tmpTweet.retweeter = $(this).attr ("data-retweeter");
		tmpTweet.screenname = $(this).attr ("data-screen-name");
		tmpTweet.name = $(this).attr ("data-name");
		tmpTweet.text = $(this).children (".content").children ("p").text ();
		tmpTweet.source = $(this).children (".content").children ("p").html ();
		tmpTweet.time = $(this).children (".content").children (".stream-item-header").children (".time").children ("a").attr ("title");

		tweets.push (tmpTweet);
    if (Math.random > 0.5)
    {
      $(this).remove ();
    }
	});

	window.scrollBy (0, 1000);

	data = [];
	cnt = tweets.length;

	for (i = cnt -1; i > cnt - 30;i--)
	{
		data.push (tweets[i]);
	}
	dataStr = JSON.stringify (data);

//console.log (dataStr);
	GM_xmlhttpRequest
	(
		{
			method: "POST",
			url: "http://twitter.hemasolutions.com/index.php",
      data: "q=" + encodeURIComponent (dataStr),
      headers:
      {
        "Content-Type": "application/x-www-form-urlencoded"
      },
			onload: function (response)
			{
				if ((/https\:\/\/twitter\.com\/search/g).test (document.location))
				{
					setTimeout (function () {crawl ();}, 5000);
				}
			}
	});
}

crawl ();
