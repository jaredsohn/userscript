// ==UserScript==
// @name           GameFAQs WYSIWYG Editor
// @include        http://www.gamefaqs.com/boards/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var postform = $("form textarea[name=\"messagetext\"]");
$(document.createElement("table")).html("<tbody><tr class='top'><td class='author'><div class='msg_stats'></div></td></tr><tr class='topmsg'><td class='msg'><div class='msg_body'><i><code>Start typing a message below to see a preview</code></i></div></td></tr></tbody>").addClass("board").addClass("message").addClass("preview").attr("id","wysiwyg-post").insertBefore(postform);
var previewbox = $("#wysiwyg-post .msg_body");
postform.on("change keyup",function(){
	var thetext=postform.val();
	thetext = escapeHtml(thetext);
	thetext = replacestuff(thetext,escapeHtml("<spoiler>"),"<span class='fspoiler'>");
	thetext = replacestuff(thetext,escapeHtml("</spoiler>"),"</span>");
	thetext = replacestuff(thetext,escapeHtml("<quote>"),"<blockquote>");
	thetext = replacestuff(thetext,escapeHtml("</quotespoiler>"),"</blockquote>");
	thetext = replacestuff(thetext,escapeHtml("<b>"),"<b>");
	thetext = replacestuff(thetext,escapeHtml("</b>"),"</b>");
	thetext = replacestuff(thetext,escapeHtml("<i>"),"<i>");
	thetext = replacestuff(thetext,escapeHtml("</i>"),"</i>");
	thetext = replacestuff(thetext,escapeHtml("<cite>"),"<cite>");
	thetext = replacestuff(thetext,escapeHtml("</cite>"),"</cite>");
	thetext = replacestuff(thetext,escapeHtml("<p>"),"<p>");
	thetext = replacestuff(thetext,escapeHtml("</p>"),"</p>");
	thetext = replacestuff(thetext,escapeHtml("<br></br>"),"<br/>");
	thetext = replacestuff(thetext,escapeHtml("<br>"),"<br/>");
	thetext = replacestuff(thetext,escapeHtml("<br/>"),"<br/>");
	while (thetext.indexOf("\n")>-1){
		thetext = thetext.replace("\n", '<br/>');
	}
	previewbox.html(thetext);
});

var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '&quot;',
	"'": '&#39;',
	"/": '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}
function replacestuff(string,original,replacewith){
	while (string.indexOf(original)>-1) {
		string = string.replace(original,replacewith);
	}
	return string;
}