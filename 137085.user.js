// ==UserScript==
// @name        MGoBlog
// @namespace   BeenJammin.Greasemonkey.UserScripts
// @description Styling and readability updates to MGoBlog
// @include     http://mgoblog.com
// @include     http://mgoblog.com/*
// @include     http://www.mgoblog.com
// @include     http://www.mgoblog.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     2.2.0
// @grant       none
// ==/UserScript==

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {

	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	// the guts of this userscript
	function main() {
		jQuery.noConflict();
		(function($) {
			var preloader = new Array();
			var count = 0;
			$("a[href*='.gif']").each(function() {
				preloader[count] = new Image();
				preloader[count].src = $(this).attr("href");
				count++;
			});
			$("body").css("word-wrap","break-word");
			$("td[nowrap]").removeAttr("nowrap");
			$(".content table").css("max-width","100%");
			var aspectRatio = 16/9;
			$("iframe[src*='youtube']").each(function() {
				var containerWidth = $(this).parent().width();
				var videoHeight = Math.round(containerWidth/aspectRatio);
				$(this).attr("width",containerWidth).attr("height",videoHeight);
			});
			$("object param[value*='youtube']").each(function() {
				var containerWidth = $(this).parent().width();
				var videoHeight = Math.round(containerWidth/aspectRatio);
				var youtubeLink = $(this).attr("value").split("?")[0].replace("youtube.com/v/","youtube.com/embed/");
				$(this).parent("object").before("<iframe height='" + videoHeight + "' width='" + containerWidth + "' src='" + youtubeLink + "' frameborder='0' allowfullscreen=''></iframe>");
				$(this).parent("object").remove();
			});
			$(".node_read_more a").click(function(event) {
				event.preventDefault();
				var prevParaContent = "";
				for (var i = $(this).parents("div.post-footer").prev("div.content").children().length; i > 0; i--) {
					if ($(this).parents("div.post-footer").prev("div.content").children("*:nth-child(" + i + ")").html() != "") {
						prevParaContent = $(this).parents("div.post-footer").prev("div.content").children("*:nth-child(" + i + ")").html();
						break;
					}
				}
				var linkLocation = $(this).attr("href") + "??" + encodeURI(prevParaContent);
				window.location = linkLocation;
			});
			if (window.location.href.indexOf("??") != -1) {
				var paraContent = window.location.href.split("??")[1];
				for (var i = 1; i <= $("div.content").children().length; i++) {
					if ($("div.content").children("*:nth-child(" + i + ")").html() == decodeURI(paraContent)) {
						var scrollHere = $("div.content").children("*:nth-child(" + i + ")").offset();
						window.scrollTo(0,scrollHere.top);
					}
				}
			}
			$("div.post-footer li.comment_comments a").each(function() {
				var normalHref = $(this).attr("href").split("#comments")[0];
				$(this).attr("href",normalHref + "#forum-comments");
			});
			$(".meta.clear-block > a").each(function() {
				var normalHref = $(this).attr("href").split("#comments")[0];
				$(this).attr("href",normalHref + "#forum-comments");
			});
			$("#block-quicktabs-2 ul.pager > li").wrap("<span></span>");
			function boardPaging() {
				$("#block-quicktabs-2 ul.pager a").click(function() {
					$(this).addClass('views-throbbing');
					$("body").append("<div id='greasemonkeyInsertedFrame' style='display:none;'></div>");
					$("#greasemonkeyInsertedFrame").load($(this).attr("href") + " #quicktabs_container_2", function() {
						$("#quicktabs_container_2").html($("#greasemonkeyInsertedFrame #quicktabs_container_2").html());
						$("#quicktabs_container_2 > div").addClass("quicktabs-hide");
						$("#quicktabs_container_2 div:nth-child(" + ($("#quicktabs-2 ul.quicktabs_tabs li.active").index() + 1) + ")").removeClass("quicktabs-hide");
						$("#greasemonkeyInsertedFrame").remove();
						if ($(window).scrollTop() > $("#block-quicktabs-2").offset().top) {
							$('html, body').animate({scrollTop: $("#block-quicktabs-2").offset().top}, 500);
						}
						boardPaging();
					});
					return false;
				});
			}
			boardPaging();
			$("#block-quicktabs-1 ul.pager > li").wrap("<span></span>");
			function diaryPaging() {
				$("#block-quicktabs-1 ul.pager a").click(function() {
					$(this).addClass('views-throbbing');
					$("body").append("<div id='greasemonkeyInsertedFrame' style='display:none;'></div>");
					$("#greasemonkeyInsertedFrame").load($(this).attr("href") + " #quicktabs_container_1", function() {
						$("#quicktabs_container_1").html($("#greasemonkeyInsertedFrame #quicktabs_container_1").html());
						$("#quicktabs_container_1 > div").addClass("quicktabs-hide");
						$("#quicktabs_container_1 div:nth-child(" + ($("#quicktabs-1 ul.quicktabs_tabs li.active").index() + 1) + ")").removeClass("quicktabs-hide");
						$("#greasemonkeyInsertedFrame").remove();
						if ($(window).scrollTop() > $("#block-quicktabs-1").offset().top) {
							$('html, body').animate({scrollTop: $("#block-quicktabs-1").offset().top}, 500);
						}
						diaryPaging();
					});
					return false;
				});
			}
			diaryPaging();
			$("#block-views-archive-block ul.pager > li").wrap("<span></span>");
			function archivePaging() {
				$("#block-views-archive-block ul.pager a").click(function() {
					$(this).addClass('views-throbbing');
					$("body").append("<div id='greasemonkeyInsertedFrame' style='display:none;'></div>");
					$("#greasemonkeyInsertedFrame").load($(this).attr("href") + " #block-views-archive-block", function() {
						$("#block-views-archive-block").html($("#greasemonkeyInsertedFrame #block-views-archive-block").html());
						$("#greasemonkeyInsertedFrame").remove();
						if ($(window).scrollTop() > $("#block-views-archive-block").offset().top) {
							$('html, body').animate({scrollTop: $("#block-views-archive-block").offset().top}, 500);
						}
						archivePaging();
					});
					return false;
				});
			}
			archivePaging();
			$("a[href*='youtube.com/watch']:not([class='lightbox-processed'])").attr("rel","lightvideo");
			Drupal.behaviors.initLightbox();
		})(jQuery);
	}

	// load jQuery and execute the main function
	addJQuery(main);
}
else {
	jQuery.noConflict();
	(function($) {
		var preloader = new Array();
		var count = 0;
		$("a[href*='.gif']").each(function() {
			preloader[count] = new Image();
			preloader[count].src = $(this).attr("href");
			count++;
		});
		$("body").css("word-wrap","break-word");
		$("td[nowrap]").removeAttr("nowrap");
		$(".content table").css("max-width","100%");
		var aspectRatio = 16/9;
		$("iframe[src*='youtube']").each(function() {
			var containerWidth = $(this).parent().width();
			var videoHeight = Math.round(containerWidth/aspectRatio);
			$(this).attr("width",containerWidth).attr("height",videoHeight);
		});
		$("object param[value*='youtube']").each(function() {
			var containerWidth = $(this).parent().width();
			var videoHeight = Math.round(containerWidth/aspectRatio);
			var youtubeLink = $(this).attr("value").split("?")[0].replace("youtube.com/v/","youtube.com/embed/");
			$(this).parent("object").before("<iframe height='" + videoHeight + "' width='" + containerWidth + "' src='" + youtubeLink + "' frameborder='0' allowfullscreen=''></iframe>");
			$(this).parent("object").remove();
		});
		$(".node_read_more a").click(function(event) {
			event.preventDefault();
			var prevParaContent = "";
			for (var i = $(this).parents("div.post-footer").prev("div.content").children().length; i > 0; i--) {
				if ($(this).parents("div.post-footer").prev("div.content").children("*:nth-child(" + i + ")").html() != "") {
					prevParaContent = $(this).parents("div.post-footer").prev("div.content").children("*:nth-child(" + i + ")").html();
					break;
				}
			}
			var linkLocation = $(this).attr("href") + "??" + encodeURI(prevParaContent);
			window.location = linkLocation;
		});
		if (window.location.href.indexOf("??") != -1) {
			var paraContent = window.location.href.split("??")[1];
			for (var i = 1; i <= $("div.content").children().length; i++) {
				if ($("div.content").children("*:nth-child(" + i + ")").html() == decodeURI(paraContent)) {
					var scrollHere = $("div.content").children("*:nth-child(" + i + ")").offset();
					window.scrollTo(0,scrollHere.top);
				}
			}
		}
		$("div.post-footer li.comment_comments a").each(function() {
			var normalHref = $(this).attr("href").split("#comments")[0];
			$(this).attr("href",normalHref + "#forum-comments");
		});
		$(".meta.clear-block > a").each(function() {
			var normalHref = $(this).attr("href").split("#comments")[0];
			$(this).attr("href",normalHref + "#forum-comments");
		});
		$("#block-quicktabs-2 ul.pager > li").wrap("<span></span>");
		function boardPaging() {
			$("#block-quicktabs-2 ul.pager a").click(function() {
				$(this).addClass('views-throbbing');
				$("body").append("<div id='greasemonkeyInsertedFrame' style='display:none;'></div>");
				$("#greasemonkeyInsertedFrame").load($(this).attr("href") + " #quicktabs_container_2", function() {
					$("#quicktabs_container_2").html($("#greasemonkeyInsertedFrame #quicktabs_container_2").html());
					$("#quicktabs_container_2 > div").addClass("quicktabs-hide");
					$("#quicktabs_container_2 div:nth-child(" + ($("#quicktabs-2 ul.quicktabs_tabs li.active").index() + 1) + ")").removeClass("quicktabs-hide");
					$("#greasemonkeyInsertedFrame").remove();
					if ($(window).scrollTop() > $("#block-quicktabs-2").offset().top) {
						$('html, body').animate({scrollTop: $("#block-quicktabs-2").offset().top}, 500);
					}
					boardPaging();
				});
				return false;
			});
		}
		boardPaging();
		$("#block-quicktabs-1 ul.pager > li").wrap("<span></span>");
		function diaryPaging() {
			$("#block-quicktabs-1 ul.pager a").click(function() {
				$(this).addClass('views-throbbing');
				$("body").append("<div id='greasemonkeyInsertedFrame' style='display:none;'></div>");
				$("#greasemonkeyInsertedFrame").load($(this).attr("href") + " #quicktabs_container_1", function() {
					$("#quicktabs_container_1").html($("#greasemonkeyInsertedFrame #quicktabs_container_1").html());
					$("#quicktabs_container_1 > div").addClass("quicktabs-hide");
					$("#quicktabs_container_1 div:nth-child(" + ($("#quicktabs-1 ul.quicktabs_tabs li.active").index() + 1) + ")").removeClass("quicktabs-hide");
					$("#greasemonkeyInsertedFrame").remove();
					if ($(window).scrollTop() > $("#block-quicktabs-1").offset().top) {
						$('html, body').animate({scrollTop: $("#block-quicktabs-1").offset().top}, 500);
					}
					diaryPaging();
				});
				return false;
			});
		}
		diaryPaging();
		$("#block-views-archive-block ul.pager > li").wrap("<span></span>");
		function archivePaging() {
			$("#block-views-archive-block ul.pager a").click(function() {
				$(this).addClass('views-throbbing');
				$("body").append("<div id='greasemonkeyInsertedFrame' style='display:none;'></div>");
				$("#greasemonkeyInsertedFrame").load($(this).attr("href") + " #block-views-archive-block", function() {
					$("#block-views-archive-block").html($("#greasemonkeyInsertedFrame #block-views-archive-block").html());
					$("#greasemonkeyInsertedFrame").remove();
					if ($(window).scrollTop() > $("#block-views-archive-block").offset().top) {
						$('html, body').animate({scrollTop: $("#block-views-archive-block").offset().top}, 500);
					}
					archivePaging();
				});
				return false;
			});
		}
		archivePaging();
		$("a[href*='youtube.com/watch']:not([class='lightbox-processed'])").attr("rel","lightvideo");
		Drupal.behaviors.initLightbox();
	})(jQuery);
}