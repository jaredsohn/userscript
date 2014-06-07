// ==UserScript==
// @name           Google News Headline Ticker
// @author         Manish Burman
// @namespace      http://mburman.github.com/Greasemonkey-Scripts/
// @description    Displays a news ticker from Google News on the Google Home Page below the search bar
// @version        1.1
// @include        http://www.google.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

(function(){
	var newsObj = [];
	function NewsItem(title, link, topic) {
		this.title = title;
		this.link = link;
		this.topic = topic;
	}

	function URL_lookup(url, topic) {
		this.url = url;
		this.topic = topic;
	}

	var urls = [

    new URL_lookup("http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=s&output=rss", "SPORT"),

	            new URL_lookup("http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=tc&output=rss", "TECH"),
	            new URL_lookup("http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=b&output=rss", "BUSINESS"),
	            new URL_lookup("http://news.google.com/?output=rss", "GENERAL")
	];

	var cnt = urls.length-1;
	unsafeWindow.console.log(urls[0]);
	unsafeWindow.console.log(urls[1]);

	recurse();

	function recurse() {
		GM_xmlhttpRequest({
			method: "GET",
			url: urls[cnt].url,
			onload: function(response) {
				parseRSS(response, urls[cnt].topic);
				cnt --;
				unsafeWindow.console.log("CNT: "+cnt);
				if(cnt == -1) {
					display();
				}
				else {
					unsafeWindow.console.log("REC");

					recurse();
				}
				return;
			}
		});
	}

	function parseRSS(response, topic) {
		unsafeWindow.console.log("TOPIC: "+topic);
		var titleMatch = "";
		var linkMatch = "";
		var regexp = /<item><title>(.*?)<\/title>/g;
		var link = /<link>(.*?)<\/link>/g;
		var special = /&apos;/g;

		// skip 2
		linkMatch = link.exec(response.responseText);
		linkMatch = link.exec(response.responseText);

		while(true) {
			titleMatch = regexp.exec(response.responseText);

			if(titleMatch == null) {
				break;
			}

			titleMatch[1] = titleMatch[1].replace(special,"'");
			linkMatch = link.exec(response.responseText);
			newsObj.push(new NewsItem(titleMatch[1], linkMatch[1], topic));
		}

		return;
	}

	function display() {


		GM_addStyle((<><![CDATA[
		#ticker {
			background-color: #ebebeb;
			border: 1px solid #ccc;
			padding: 20px;
			display:none;
		}

		#topic {
			position: absolute;
			right: 20px;
			margin-top: -5px;
			color: #777;
			font: bold 16px "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
				Geneva, Verdana, sans-serif;
			text-shadow: 0 1px 0 #eee;
		}

		ul {
			text-align: center;
		}

		#ticker > ul > li{
			display:none;
			color: #333;
			font: bold 14px "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
			"Geneva", "Verdana", "sans-serif";
			line-height: 1;
			padding: 8px 0;
			text-align: center;
			text-shadow: 0 1px 0 #eee;

		}

		#ticker > ul > li > a {
			color: #013ADF;
		}

		#ticker > ul > li > a:visited {
			color: #013ADF;
		}

		#ticker > ul#news {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		#ticker > ul#news li {
			margin: 0;
		}
		]]></>).toString());

		//	Add jQuery
		if (typeof unsafeWindow.jQuery == 'undefined') {
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

			GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
			GM_JQ.type = 'text/javascript';
			GM_JQ.async = true;

			GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
		}
		GM_wait();

		// Check if jQuery's loaded
		function GM_wait() {
			if (typeof unsafeWindow.jQuery == 'undefined') {
				window.setTimeout(GM_wait, 100);
			} else {
				$ = unsafeWindow.jQuery.noConflict(true);
				letsJQuery();
			}
		}

		// jQuery dependent code
		function letsJQuery() {
			var tickerDiv = '<div id="ticker"><ul id="news"><li></li></ul><div id="topic">'+'</div></div>';

			$('#body').append(tickerDiv);
			$('#ticker').fadeIn('slow');


			var i = 0;

			$('ul > li').eq(0).html('<a href="'+newsObj[i].link+'">'+newsObj[i].title+'</a>');
			$('#topic').text(newsObj[i].topic);

			$('ul > li').eq(0).fadeIn('slow');

			setInterval(animateList, 2500);

			function animateList() {
				$('ul > li').eq(0).fadeOut('fast', function() {
					i++;
					$('ul > li').eq(0).html('<a href="'+newsObj[i].link+'">'+newsObj[i].title+'</a>');
					i %= newsObj.length;
					$('#topic').text(newsObj[i].topic);
					unsafeWindow.console.log(newsObj.length);

					$('ul > li').eq(cnt).fadeIn('fast', function() {

					});
				});
			}
		}
	}

})();
