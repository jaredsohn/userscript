// ==UserScript==
// @name        Indie Royale Collector
// @description Make some sense of your Indie Royale collection by being able to search it, look at it as a list and hide skipped bundles.
// @author      raina
// @namespace   http://userscripts.org/users/315152
// @updateURL   https://userscripts.org/scripts/source/170793.meta.js
// @downloadURL https://userscripts.org/scripts/source/170793.user.js
// @include     http://www.indieroyale.com/collection
// @version     2.1
// @released    2014-04-08
// @run-at      document-start
// @grant       none
// ==/UserScript==

(function() {
	"use strict";
	function go(e) {
		if (document.readyState === "interactive") {
			var style = document.createElement("style");
			style.type = "text/css";
			style.textContent =
				".homebox h2 {" +
				"	margin-top: 3ex;" +
				"}" +
				"#collection.list .hasbundle," +
				"#collection.list .wantbundle {" +
				"	width: 100%;" +
				"	height: 32px;" +
				"	padding: 1ex 1ex 2ex 2ex;" +
				"	margin-bottom: 1ex;" +
				"	background: url('/borderless/images/default/collection_bg.png') no-repeat scroll center center transparent;" +
				"	background-size: 100% 100%;" +
				"}" +
				"#collection.list .wantbundle:last-child," +
				"#collection.list .hasbundle:last-child {" +
				"	margin: 0;" +
				"}" +
				"#collection.list .wishlist," +
				"#collection.list .togglebundle," +
				"#collection.list .togglebundleholder {" +
				"	position: static;" +
				"	float: right;" +
				"	margin-right: 1ex;" +
				"}" +
				"#collection.list .hasbundle img," +
				"#collection.list .wantbundle img {" +
				"	width: 32px;" +
				"	height: 32px;" +
				"}" +
				".title {" +
				"	display: block;" +
				"	text-align: center;" +
				"}" +
				"#collection.list .title {" +
				"	display: inline-block;" +
				"	text-align: left;" +
				"	vertical-align: 25%;" +
				"	font-size: 150%;" +
				"	font-weight: 800;" +
				"	margin-left: 1ex;" +
				"}" +
				".view {" +
				"	float: right;" +
				"	border: none;" +
				"	background: url('/borderless/images/default/download_button.png') no-repeat scroll center top transparent;" +
				"	color: rgb(85, 49, 24);" +
				"	height: 38px;" +
				"	text-align: center;" +
				"	width: 158px;" +
				"	font-weight: bold;" +
				"	text-transform: none;" +
				"	cursor: pointer;" +
				"}" +
				".view.depressed {" +
				"	background-position: center bottom;" +
				"	color: rgb(226, 209, 175);" +
				"}" +
				"";
			document.head.appendChild(style);

			var main = function() {
				// The site uses jQuery, so we might as well make use of it
				if (localStorage.getItem('hide')) {
					$('.wantbundle').hide();
				}
				if (localStorage.getItem('list')) {
					$('#collection').addClass('list');
				}
				$('.homebox h2').last().append('<button class="view" id="thumbs">Thumbnails</button><button class="view" id="list">List view</button><button class="view" id="hide">Hide skipped</button>');
				if (localStorage.getItem('hide')) {
					$('#hide').addClass('depressed');
				}
				if (localStorage.getItem('list')) {
					$('#list').addClass('depressed');
				} else {
					$('#thumbs').addClass('depressed');
				}
				$.each($('.hasbundle'), function() {
					$(this).append('<span class="title">' + $(this).attr('title') + '</span>');
				});
				$.each($('.wantbundle'), function() {
					$(this).append('<span class="title">' + $(this).find('a:first').attr('title') + '</span>');
				});
				$('#thumbs').click(function() {
					$('#list').removeClass('depressed');
					$('#thumbs').addClass('depressed');
					$('#collection').removeClass('list');
					localStorage.removeItem('list');
				});
				$('#list').click(function() {
					$('#thumbs').removeClass('depressed');
					$('#list').addClass('depressed');
					$('#collection').addClass('list');
					localStorage.setItem('list', true);
				});
				$('#hide').click(function() {
					if (localStorage.getItem('hide')) {
						localStorage.removeItem('hide');
						$('#hide').removeClass('depressed');
						$('.wantbundle').slideDown();
					} else {
						localStorage.setItem('hide', true);
						$('#hide').addClass('depressed');
						$('.wantbundle').slideUp();
					}
				});
			};

			// Inject main function as a script block on the page,
			// as stackoverflow.com user fudgey taught us.
			// http://stackoverflow.com/a/8890387
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.textContent = "(" + main.toString() + ")();";
			document.body.appendChild(script);
		}
	}
	document.addEventListener("readystatechange", go, false);
}());
