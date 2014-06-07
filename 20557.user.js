// ==UserScript==
// @name           HaiNeiHome
// @namespace      longwosion
// @include        http://hainei.com/home*
// @include        http://www.hainei.com/home*
// ==/UserScript==

(function() {

	function addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};

	//Shortcut
	var YAHOO = unsafeWindow.YAHOO;
	var Dom = YAHOO.util.Dom
	var Event = YAHOO.util.Event;
	var $ = Dom.get;
	var feeds, newsfeed, caption;

	function showByType(feedType) {
		var i, n, one, style;
		for(i=0, n=feeds.length; i<n; i++){
			one = feeds[i];
			style = Dom.hasClass(one, feedType) ? "" : "none";
			Dom.setStyle(one.parentNode, "display", style);
		}
	}

	function createSwitchButton (feedType, tip, parent) {
		var btn = document.createElement("DIV");
		btn.className = "feed " + feedType;
		btn.id = "switch_" + feedType;
		btn.innerHTML = "<a class='type' href='#'></a>";
		parent.appendChild(btn);

		Event.on(btn, "click", function(e){
			caption.innerHTML = "好友动态 (s)".replace("s", tip);
			var buttons = Dom.getElementsBy(function(el) { return true; }, "A", parent);
			Dom.batch(buttons, function(el) {
				if(el.parentNode.id == btn.id) {
					Dom.addClass(el, "select");
				} else {
					Dom.removeClass(el, "select");
				}
			});
			showByType(feedType);
		});
	}

	
	var f = function() {
		addStyle(
			".feeds_button{height:4px;} " +
			".feeds_button .feed{float:right;} " + 
			".feeds_button .feed a.select {border:2px solid #68A8E2} " +
			".feeds_button .feed a{border:2px solid #fff;margin-left:-19px;} "
			);
		
		newsfeed = $("newsfeed");
		if(newsfeed){
			//init
			feeds = Dom.getElementsByClassName("feed", "DIV", "newsfeed");
			caption = Dom.getFirstChild("newsfeed");

			//buttons-div
			var b = document.createElement("DIV");
			b.id = "feeds_button";
			b.className = "feeds_button";
			Dom.insertBefore(b, caption);

			//buttons-list
			createSwitchButton("feed", "全部", b);
			createSwitchButton("feed-friend", "好友", b);
			createSwitchButton("feed-photo", "照片", b);
			createSwitchButton("feed-share", "分享", b);
			createSwitchButton("feed-blog", "日志", b);
			createSwitchButton("feed-blogcomment", "日志评论", b);
			createSwitchButton("feed-profile", "个人资料", b);
			createSwitchButton("feed-group", "群组", b);
			createSwitchButton("feed-miniblog", "迷你勃客", b);
			createSwitchButton("feed-movie", "电影", b);
		};
	};
	f();
	//window.addEventListener('load', f, false);
})();