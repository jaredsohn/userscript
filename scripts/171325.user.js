// ==UserScript==
// @name        Netvibes Improvements
// @namespace   dotneter
// @include     http://www.netvibes.com/*
// @version     1.4
// @updateURL   http://userscripts.org/scripts/source/171325.meta.js
// @downloadURL http://userscripts.org/scripts/source/171325.user.js
// @require		  http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==

var downKey = 72;
var upKey = 79;
(function($){
	$(function(){
		var timer = null;
		function getCount(x){
			return parseInt(x.replace("(","").replace(")",""),10);
		}
		function hide(){
			var showAllText = $("#show-all-feeds span.nv-treeview-unread").text();
			if(showAllText){
				var allUnreadCount = getCount(showAllText);
				var totalCount = 0;
				$("li.nv-treeview-section>div>span.nv-treeview-unread:not(:empty)").each(function(){
					if(!$(this).parents("#show-all-feeds").length){
						totalCount += getCount($(this).text());
					}
				});
				if(allUnreadCount == totalCount){
					$("li.nv-treeview-section").each(function(){
						if(!($("div.hasUnread", $(this)).length + $("li.focus", $(this)).length)){
							$(this).remove();
						}
					});
					$("li.nv-treeview-static").each(function(){
						if(!($("div.hasUnread", $(this)).length + $("li.focus", $(this)).length)){
							$(this).remove();
						}
					});

					$("li.nv-treeview-feed:not(.focus)").each(function(){
						var li = $(this);
						if(!$("div.hasUnread", li).length){
							li.remove();
						}
					});
				}
			}
		}

		timer = setInterval(hide,1000);

		function keyDown(e){
				if(e.which == downKey){
					e.stopPropagation();
					App.SmartReader.navigateDown();
					App.SmartReader.openSelectedSidebarElm();
				}
				if(e.which == upKey){
					e.stopPropagation();
					App.SmartReader.navigateUp();
					App.SmartReader.openSelectedSidebarElm();
				}
		}

		document.addEventListener('keydown', keyDown, true);



	});

})(jQuery.noConflict(true));
