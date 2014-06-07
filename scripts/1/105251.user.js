// ==UserScript==
// @name Reddit-Style Comments for Hacker News
// @description This extension simply adds Reddit style comment toggling on Hacker News discussion articles.
// @namespace https://github.com/andrewheins/HN-Comment-Hider
// @include http://news.ycombinator.com/item*
// @include http://hackerne.ws/item*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include http://hackerne.ws/item*
// ==/UserScript==


function runthis() {

	if(window.location.href.indexOf("http://news.ycombinator.com/item") === -1 && window.location.href.indexOf("http://hackerne.ws/item") === -1) {
		return;
	}

	var rows = $(".default");

	var getRank = function(ele) {
		var imgWidth = $(ele).closest("tr").children("td:first-child").find("img").width();
		if (imgWidth > 0) {
			return imgWidth / 40;
		}
		else {
			return imgWidth;
		}
	}

	var findInList = function(ele) {
		var targ = $(ele).closest(".default");
		for (var i = 0; i < rows.length; i++) {
			if (targ[0] === rows[i]) {
				return i;
			}
		}
	}

	var toggleChildComments = function(ele) {
		var thisRank = getRank(ele),
				pos = findInList(ele),
				childNodes = [];
		for (var i = pos + 1; i < rows.length; i++) {
			if (getRank(rows[i]) > thisRank) {
				if ($(ele).hasClass("hide_children")) {
					$(rows[i]).closest("tr").parent().closest("tr").show();
				} else {
					$(rows[i]).closest("tr").parent().closest("tr").hide();
				}
				childNodes.push(rows[i]);
			} else {
			break;
			}
		}

		if ($(ele).hasClass("hide_children")) {
			$(ele).removeClass("hide_children");
			$(ele).closest("td").children(".comment, p").show();
			$(ele).html("[-]");
		} else {
			$(ele).addClass("hide_children");
			$(ele).closest("td").children(".comment, p").hide();
			var msg = '[+] (' + childNodes.length;
			msg += childNodes.length === 1 ? ' child)' : ' children)';		
			$(ele).html(msg);
		}

		return childNodes;
	}

	

	var toggleBtn = $('<a href="#" class="commentToggle" style="padding-right: 1em; font-family: monospace;">[-]</a>');
	$("span.comhead").not('td.title span.comhead').prepend(toggleBtn);

	$(".commentToggle").click(function(e) {
		toggleChildComments(e.target);

		e.preventDefault();
	});

}

runthis();

