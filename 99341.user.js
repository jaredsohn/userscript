// ==UserScript==
// @name           Twitter FavView
// @namespace      tfav_new
// @description    In New Twitter, display the number of favorites to tweets. (Powered by favstar.fm)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @author         Vilart
// @version        1.12
// ==/UserScript==

(function(){

	////// is new design?
	if (!document.getElementById("top-stuff")) return false;

	////// style (based by favotter.net)
	var style = document.createElement("style");

	style.type = "text/css";
	style.innerHTML = <![CDATA[
._x_gm_twfav_container {
float: right;
}
.permalink-tweet ._x_gm_twfav_container {
line-height: 20px;
}
a._x_gm_twfav {
visibility: hidden;*
font-family:"Helvetica","Arial",sans-serif;
font-weight: bold;
font-size: 12px;
padding: 0 7px;

border-radius: 5px;
-moz-border-radius: 5px;
}
a._x_gm_twfav[data-num] {visibility: visible; background: #f44; color: white;}
a._x_gm_twfav[data-num]:after {content: attr(data-num) ' favs';}
a._x_gm_twfav[data-num="1"]:after {content: attr(data-num) ' fav';}

a._x_gm_twfav[num="0"] {visibility: hidden;}
a._x_gm_twfav[data-num="1"] {background: #aaa; color: white; font-weight: normal;}
a._x_gm_twfav[data-num="2"] {background: #696; color: white; font-weight: normal;}
a._x_gm_twfav[data-num="3"], a._x_gm_twfav[data-num="4"] {background: #669; color: white; font-weight: normal;}
a._x_gm_twfav[data-num="5"], a._x_gm_twfav[data-num="6"], a._x_gm_twfav[data-num="7"], a._x_gm_twfav[data-num="8"], a._x_gm_twfav[data-num="9"] {font-weight:normal;}
}
	]]>.toString();
	
	document.getElementsByTagName('head')[0].appendChild(style);

	////// ready
	var twitterReady = function(callback, afterReady) {
		var uniqueId, correctId;

		var func = function() {
			var interval;
			var loopTimer = 200;
			var intervalFunc = function() {
				var ok = false;
				if (twttr) {
			 	    if (callback()) {
			 	    	var custom = 0;
			 	    	ok = true;
			 	    }
				}
				if (!ok) interval = setTimeout(intervalFunc, loopTimer);
		 	}
			interval = setTimeout(intervalFunc, loopTimer);
		}
		var funcStr = func.toString();

		if (afterReady) {
			uniqueId = Math.floor(Math.random() * 2147483647);
			correctId = Math.floor(Math.random() * 2147483647);
			
			var lockerName = "_x_gm_twready_locker_" + uniqueId;
			var openerName = "_x_gm_twready_opener_" + correctId;

			var locker = document.createElement("div");
			locker.setAttribute("id", lockerName);
			locker.setAttribute("style", "display:none;");
			document.body.appendChild(locker);
			
			locker.addEventListener("DOMNodeInserted", function(e) {
				var isErase = false;
				for (var i = 0; i < locker.childNodes.length; i++) {
					if (locker.childNodes[i].id == openerName) { isErase = true; break; }
				}
				if (isErase) {
					document.body.removeChild(locker);
					afterReady();
				}
			}, false);

			funcStr = funcStr.replace(/var custom = 0;/, 'var e=document.createElement("span");e.setAttribute("id","'+openerName+'");document.getElementById("'+lockerName+'").appendChild(e);');
		}

		var script = document.createElement("script");
		script.innerHTML = "(function(){var callback="+callback.toString()+";("+funcStr+")();})();";
		document.body.appendChild(script);
	}

	var getFav = function (targetElement, tweetId, screenName) {
		var url = "http://favstar.fm/users/" + screenName + "/status/" + tweetId;
		
		GM_xmlhttpRequest({
			method: "GET", 
			url: url,
			onload: function(e) {
				var m = e.responseText.match(new RegExp('<a class="favCount"[.\\s\\S\\r\\n]+?<span class="count">(\\d+)</span>'));
				if (m) {
					targetElement.setAttribute("data-num", m[1]);
					targetElement.setAttribute("href", url);
				}
			}
		});
	}

	////// main
	twitterReady(function(){
		if (!(twttr.templates && twttr.templates.details_pane_tweet && twttr.templates.permalink_tweet)) return false;

		if (!twttr.templates.gm_twitterfav)
			twttr.templates.gm_twitterfav = '<div class="_x_gm_twfav_container unchecked" data-screen-name="{{#user}}{{screen_name}}{{/user}}" data-tweet-id="{{id}}"><a class="_x_gm_twfav" target="_blank" href="#"></a></div>';
		else
			return true;			// Avoid double registration

		twttr.templates.details_pane_tweet = twttr.templates.details_pane_tweet.replace(/{{>tweet_actions}}/, "{{>tweet_actions}}{{>gm_twitterfav}}");
		twttr.views.DetailsPaneTweet._template = twttr.templates.details_pane_tweet;

		twttr.templates.permalink_tweet = twttr.templates.permalink_tweet.replace(/{{>tweet_actions}}/, "{{>tweet_actions}}{{>gm_twitterfav}}");
		twttr.views.PermalinkTweet._template = twttr.templates.permalink_tweet;

		return true;
	}, function() {
		document.body.addEventListener("DOMNodeInserted", function(e) {
			var x = Array.slice(e.relatedNode.getElementsByClassName("_x_gm_twfav_container unchecked"), 0);

			for (var i = 0; i < x.length; i++) {
				var elm = x[i];
				
				elm.className = "_x_gm_twfav_container";
				var tweetId = elm.getAttribute("data-tweet-id");
				var screenName = elm.getAttribute("data-screen-name");
				
				setTimeout(function() { getFav(elm.getElementsByClassName("_x_gm_twfav")[0], tweetId, screenName) }, 10);
			}
		}, false);
	});
})();