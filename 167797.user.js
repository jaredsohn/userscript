// ==UserScript==
// @name          /r/kpop Friday FFA Helper
// @description   Helps compile a list of weekly top submissions in kpop-related subreddits.
// @version       2013.6.08b
// @author        schrobby
// @match         *://*.reddit.com/r/kpop/submit*
// @updateURL     https://userscripts.org/scripts/source/167797.meta.js
// @downloadURL   https://userscripts.org/scripts/source/167797.user.js
// ==/UserScript==

var f = function($) {
	var options = [
		{sr: "kpop", size: 3},
		{sr: "kpop", size: 6},
		{sr: "kpop", size: 12},
		{sr: "kpop", size: 25},
		{sr: "kpics", size: 3},
		{sr: "kpics", size: 6},
		{sr: "kpics", size: 12}
	];

	var requestURL = "http://" + document.location.hostname + "/r/$sr/top.json?sort=top&t=week";

	// $.insertAtCaret taken from https://gist.github.com/mathiasbynens/326491
	$.fn.insertAtCaret = function(myValue) {
		return this.each(function() {
			var me = this;
			if (document.selection) { // IE
				me.focus();
				sel = document.selection.createRange();
				sel.text = myValue;
				me.focus();
			} else if (me.selectionStart || me.selectionStart == '0') { // Real browsers
				var startPos = me.selectionStart, endPos = me.selectionEnd, scrollTop = me.scrollTop;
				me.value = me.value.substring(0, startPos) + myValue + me.value.substring(endPos, me.value.length);
				me.focus();
				me.selectionStart = startPos + myValue.length;
				me.selectionEnd = startPos + myValue.length;
				me.scrollTop = scrollTop;
			} else {
				me.value += myValue;
				me.focus();
			}
		});
	};

	var insertLinks = function(sr, size) {
		var textfield = $("#text-field textarea");

		$.ajax({
			type: "get",
			url: requestURL.replace("$sr", sr),
			dataType: "json",
			success: function(data) {
				if (data.kind !== "Listing")
					$(textfield).insertAtCaret("error: response is " + data.kind);
				else {
					$.each(data.data.children, function(i, post){
						var title = post.data.title.replace(/\\/g, "\\\\").replace(/\[/g, "\\\[").replace(/\]/g, "\\\]");
						var link = post.data.permalink.replace(/\\/g, "\\\\").replace(/\(/g, "\\\([)").replace(/\)/g, "\\\)");

						if (post.data.url.match(/.(?:jpe?g|gif|png)$/) !== null)
							image = "| [\\[img\\]]("+post.data.url+")";
						else 
							image = "";

						$(textfield).insertAtCaret("* ["+title+"]("+link+") "+image+"\n\n");

						return (i < size - 1);
					});
				}
			},
			error: function(a, b, error) {
				$(textfield).insertAtCaret("error: " + error);
			}
		});
	}

	$("#text-field .bottom-area").prepend("<div class='dropdown lightdrop' onclick='open_menu(this)' style='float:left'>\
	<span class='selected help-toggle toggle'>FFA insert</span></div>\
	<div class='drop-choices lightdrop' style='z-index:101'></div>");

	$.each(options, function(i, opt) {
		$(document.createElement('a'))
			.addClass("choice")
			.attr("href", "javascript:void(0)")
			.text(opt.sr+" top"+opt.size)
			.click(function() {
				insertLinks(opt.sr, opt.size);
			})
			.appendTo($("#text-field .drop-choices"));
	});
}

var s = document.createElement('script');
s.textContent = "("+f.toString()+")(jQuery);";
document.head.appendChild(s);