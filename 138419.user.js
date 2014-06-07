// ==UserScript==
// @name           Twitter Non-native 233 Retweet MOD
// @namespace      @turygo
// @description      Add "Retweet with 233 comments" link to tweets
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function() {
  // http://wiki.greasespot.net/Content_Script_Injection
  function contentEval(source) {
	  // Check for function input.
	  if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	  }

	  // Create a script node holding this  source code.
	  var script = document.createElement('script');
	  script.setAttribute("type", "application/javascript");
	  script.textContent = source;

	  // Insert the script node into the page, so it will run, and immediately
	  // remove it to clean up.
	  document.body.appendChild(script);
	  document.body.removeChild(script);
	}
	

	function register(){
		// originally by @jamespgilbert (http://userscripts.org/scripts/show/70467), modified by @SAPikachu
		
		iconBackgroundColor = null;
		
		window.addEventListener("hashchange", function() { 
			// Style may change after navigation, need to re-get the correct background color
			iconBackgroundColor = null; 
		}, false);
				
		window.showRetweetBox = function (link) {
			setTimeout(function() {
				var tweetElem = $(link).parents().filter(".js-actionable-tweet").eq(0);
				if (tweetElem.size() == 0) {
					alert("Can't locate tweet element.");
					return;
				};
				var userElem = tweetElem.find(".account-group .username b").eq(0);
				var userName = $.trim(userElem.html());
				
				var contentElem = $(".js-tweet-text", tweetElem).clone();
				$("a", contentElem).each(function() {
					var o = $(this);
					var expanded = o.data("ultimate-url") || o.data("expanded-url");
					if (expanded) {
						o.text(expanded);
					};
				});
				var content = " 233RT @" + userName + " " + contentElem.text();
				var RTBox = new twttr.widget.TweetDialog(
					{modal: false,
					 draggable: true,
					 template: {title: _("Retweet with 233")},
					 defaultContent: ""}
				); 
				RTBox.open();
				RTBox.setContent(content);
				RTBox.setCaretPosition(0);
			}, 0);
		};
		
		function insertRetweetLink(parent, text) {
			if (parent.getElementsByClassName("rtwc").length > 0)
			{
				return;
			}
			var ref = parent.getElementsByClassName("action-fav-container")[0];
			var realrt = document.createElement("li");
			realrt.className = "action-fav-container action-rtwc-container";
			if (!iconBackgroundColor) {
				iconBackgroundColor = window.getComputedStyle(parent.getElementsByClassName("sm-reply")[0], null).getPropertyValue("background-color");
			}
			realrt.innerHTML = '<a href="#" onclick="showRetweetBox(this); return false;" class="with-icn"><i class="sm-rt" style="background-color: ' + iconBackgroundColor + '"></i> <b><span title="Retweet with comments" class="rtwc">' + text + '</span></b></a>';
			parent.insertBefore(realrt, ref);
		}
		
		function addRetweetLink(item) {
			var actionsArray, actions, ref;
			try {
				actionsArray = item.getElementsByClassName("tweet-actions");
				actions = actionsArray[0];
			} catch (e) {
				return;
			}
			insertRetweetLink(actions, "RT w/ 2");
			if (actionsArray.length > 1) 
			{
				insertRetweetLink(actionsArray[1], "Retweet with 233 comments");
			}
		}
		
		document.addEventListener('DOMNodeInserted', function (e) {
			target = e.target;
			cl = target.className;
			if (cl.indexOf("js-stream-tweet") >= 0 || cl.indexOf("stream-item") >= 0) {
				addRetweetLink(target);
			} else if (cl.indexOf("js-conversation-replies")) {
				replies = target.getElementsByClassName("js-actionable-tweet");
				if (replies.length > 0) {
					for (var i = 0; i < replies.length; i++) {
						// due to some unknown reason, we need to create a scope and capture the node object, otherwise something strange will happen (replies will be cleared etc.)
						(function() {
							var node = replies[i];
							setTimeout(function() { 
								addRetweetLink(node); 
							}, 0);
						})();
					}
				}
			}
		}, false);
	}

	contentEval(register);
})();
