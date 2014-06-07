// ==UserScript==
// @name        Twitter data collection 2
// @namespace   Twitter
// @description Twitter data collection 2
// @include     https://twitter.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// @version     1
// ==/UserScript==

var tweets = [], tmpTweet = {}, i, data, dataStr, callback = true;
try
{
  var keyword_obj = document.location.toString ().match (/\?q\=([\%23]?\w+)/);
  if (keyword_obj == null)
  {
    keyword_obj = document.location.toString ().match (/https\:\/\/twitter\.com\/([\%23]?\w+)/);
    var keyword = decodeURIComponent (keyword_obj[1]);
  }
  else
  {
    var keyword = decodeURIComponent (keyword_obj[1]);
  }
}
catch (e) {};

$("<div id=\"divCounter\"><span id=\"spanKeyword\">" + keyword + "</span><br /><button id=\"btnCrawl\">Get tweets</button><br /><button id=\"btnStop\">Stop</button><br />Collected: <span id=\"tweetCnt\"></span></div>")
  .appendTo (document.body)
  .css
  (
    {
      position : "fixed",
      top : "20px",
      right : "20px",
      width : "auto",
      height : "100px",
      padding : "5px",
      lineHeight : "25px",
      background : "#ccc",
      borderRadius : "5px",
      zIndex : 10000,
      color : "#333"
    }
  );

$("#spanKeyword").css
(
  {
    fontWeight : "bold",
    color : "#09f"
  }
);
$("#btnCrawl").click (function ()
{
  crawl ();
});
$("#btnStop").click (function ()
{
  callback = false;
});

function crawl ()
{
	$("div.tweet").each (function ()
	{
    var tmpTweet = new Object;
		tmpTweet.keyword = $("#spanKeyword").text ();
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
        $("#tweetCnt").text (response.responseText);
        if (callback)
        {
          setTimeout (function () {crawl ();}, 5000);
        }
			}
	});
}

//crawl ();