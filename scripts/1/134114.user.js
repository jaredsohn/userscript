// ==UserScript==
// @name		Mute Tweets
// @namespace	http://twitter.com/nuttari
// @version		0.1.9
// @description	（Twitter Mute "translated to English by SuperArsha")
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// ==/UserScript==

(function(d, func){
	var h = d.getElementsByTagName("head")[0],
		id = Math.floor(Math.random() * 10000),
		s = d.createElement("script");
	s.textContent = "(function loader" + id + "(){if(window.jQuery){(" + func.toString() + ")(jQuery);}else{setTimeout(loader" + id + ",500)}})();";
	h.appendChild(s);
})(document, function($){

	var words = {
		ja: ["Mute", "Mute", "Username", "Client", "Hashtag", "Save", "Setting have been saved", "Error", "Remove the mute", "Mute have been romoved"]
	}
	var lang = twttr.pageLocale;
	langKeyExists = 0;
	$.each(words, function(l){
		if(l == lang){
			langKeyExists = 1;
			return  false;
		}
	});
	if(!langKeyExists)
		lang = "ja";


	var mute = {
		username: localStorage.getItem("twitter-mute-user") ? localStorage.getItem("twitter-mute-user").split(",") : "",
		client: localStorage.getItem("twitter-mute-client") ? localStorage.getItem("twitter-mute-client").split(",") : "",
		hashtag: localStorage.getItem("twitter-mute-hashtag") ? localStorage.getItem("twitter-mute-hashtag").split(",") : ""
	};

	$(".topbar [href='/settings/account']").parent().after("<li><a href=#setting-mute>" + words["ja"][0] + "</li>");

	$(".dropdown-menu").on("click", "[href='#setting-mute']", function(e){
		mute = {
			username: localStorage.getItem("twitter-mute-user") ? localStorage.getItem("twitter-mute-user").split(",") : "",
			client: localStorage.getItem("twitter-mute-client") ? localStorage.getItem("twitter-mute-client").split(",") : "",
			hashtag: localStorage.getItem("twitter-mute-hashtag") ? localStorage.getItem("twitter-mute-hashtag").split(",") : ""
		};

		$("body > .twttr-dialog-wrapper").append("<div class='twttr-dialog-container draggable ui-draggable' style=width:500px id=setting-mute><div class='twttr-dialog dm-dialog' data-component-term=mute_dialog /></div>");

		$("body").append("<div class=twttr-dialog-overlay>");
		$(".twttr-dialog-overlay").show();
		$(".twttr-dialog-wrapper").show();
		$("#setting-mute > div").append("<div class='twttr-dialog-header'><h3 class=js-dm-header>" + words[lang][1] + "</h3><div class=twttr-dialog-close><b>×</b></div></div>");
		$("#setting-mute > div").append("<div class='twttr-dialog-inside'>");

		$("#setting-mute .twttr-dialog-inside").append("<div><h3>" + words[lang][2] + "</h3><textarea name=mute_username>"+mute.username+"</textarea></div>")
		.append("<div><h3>" + words[lang][3] + "</h3><textarea name=mute_client>"+mute.client+"</textarea></div>")
		.append("<div><h3>" + words[lang][4] + "</h3><textarea name=mute_hashtag>"+mute.hashtag+"</textarea></div>")
		.append("<div><p class='save-result'><span>" + words[lang][6] + "</span><span>" + words[lang][7] + "</span><span>" + words[lang][9] + "</span></p><a href=#save-mute class='tweet-button btn primary-btn'>" + words[lang][5] + "</a></div><p class='rm-mute'><a href=#remove-mute>"+words[lang][8]+"</a></p>");

		$("#setting-mute").on("keydown keypress", function(e){
			e.stopPropagation();
		});

		$("#setting-mute .twttr-dialog-inside > div").css({
			margin: 15,
			position: "relative",
			minHeight: 30
		});
		$("#setting-mute .twttr-dialog-inside > p").css({
			margin: "-7px 15px",
			fontSize: "80%",
			textAlign: "right"
		});
		$("#setting-mute .twttr-dialog-inside > div > h3").css({
			lineHeight: "25px"
		});
		$("#setting-mute .twttr-dialog-inside > div > div").css({
			position: "absolute",
			top: 0,
			right: 0
		});
		$("#setting-mute .twttr-dialog-inside > div > textarea").css({
			position: "block",
			marginTop: 4,
			width: 460,
			height: 56,
			fontFamily: "Consolas",
			resize: "none"
		});
		$("#setting-mute .twttr-dialog-inside > div > a").css({
			position: "absolute",
			top: 0,
			right: 0
		});
		$("#setting-mute .twttr-dialog-inside > div > p > span").hide();

		$(".twttr-dialog-overlay, .twttr-dialog-close").click(function(){
			$(".twttr-dialog-overlay, .twttr-dialog-container").remove();
			$(".twttr-dialog-wrapper").hide(function(){
				$(this).removeAttr("style");
			});
		});

		$("[href^='#']").click(function(f){
			switch(f.target.hash.slice(1)){
				case "remove-mute":
					localStorage.removeItem("twitter-mute-user");
					localStorage.removeItem("twitter-mute-client");
					localStorage.removeItem("twitter-mute-hashtag");
					$("#setting-mute textarea").val("");
					showResult(2);
					break;
				case "save-mute":
					var set = {
						username: $("[name=mute_username]").val(),
						client: $("[name=mute_client]").val(),
						hashtag: $("[name=mute_hashtag]").val()
					}
					var errFlag = 0;
/*					if(/^[a-zA-Z0-9_,]+$/.test(set.username))
						errFlag = 1;*/

					if(errFlag){
						showResult(1);
					}else{
						localStorage.setItem("twitter-mute-user", set.username);
						localStorage.setItem("twitter-mute-client", set.client);
						localStorage.setItem("twitter-mute-hashtag", set.hashtag);
						console.log([String(set.username), String(set.client), String(set.hashtag)])
						mute = {
							username: set.username ? set.username.split(",") : "",
							client: set.client ? set.username.split(",") : "",
							hashtag: set.hashtag ? set.username.split(",") : ""
						}
						showResult(0);
					}
					break;
			}
			function showResult(n){
				$("#setting-mute .save-result > span").hide();
				$("#setting-mute .save-result > :eq("+n+")").stop().show();
				setTimeout(function(){
					$("#setting-mute .save-result > :eq("+n+")").fadeOut();
				}, 4000);
			}
			f.preventDefault();
		});

		e.preventDefault();
	});


	$(".content-main").on("click", "[href='#mute']", function(e){
		e.preventDefault();
	});

	function muteTweet() {
		var streamManager = twttr.app.currentPage().getInstanceProperty("streamManager").getCurrent();
		$(streamManager.items).each(function(){
			var item = 0;
			switch(String(this.event)){
				case "undefined":
					item = this;
					break;
				case "mention":
					item = this.targetObjects.array[0];
					break;
				case "reply":
					item = this.targets.array[0];
					break;
			}
			if(item){
				var id = item.id
				var screenName = item.user.screenName;
				var source = item.source;
					source = source.replace(/<(a|\/a).*?>/g,"");
				var hashtags = item.entities.hashtags;

				var muteFlag = 0;
				if($.inArray(screenName, mute.username) > -1 || $.inArray(source, mute.client) > -1){
					muteFlag = 1;
				}else if(hashtags.length){
					$.each(hashtags, function(i){
						if($.inArray(hashtags[i].text, mute.hashtag) > -1){
							muteFlag = 1;
							return !1;
						}
					});
				}
				if(muteFlag) {
					console.log([id,screenName,source,hashtags]);
					$("[data-tweet-id="+id+"]").parent().remove();
				}
			}
		});
	}
	var timer;
	$("#page-container").on("DOMNodeInserted", function(e){
		if(!$(e.target).hasClass("stream-item")){
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(muteTweet, 50);
	});
	muteTweet();
});