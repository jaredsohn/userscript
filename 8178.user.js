// ==UserScript==
// @name          Gmail plain text formatting
// @namespace     http://henrik.nyh.se
// @description   For plain text mails in Gmail, displays text like "*bold*", "/italic/" and "_underline_" with that formatting.
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/a/*
// @include       http://mail.google.tld/a/*
// ==/UserScript==


const OUTSIDE_TAGS_RE = /(^|>)([\s\S]*?)(<|$)/g;
const FORMAT_RE       = /(^|\s)(([\/*_])(?!\3)[^\s](?:.*?\S)?\3)(?=[\W_]|$)/g;
const FORMAT_MAP      = {"/": "i", "*": "b", "_": "u"};


// Takes care of mail bodies that are displayed as you open a thread.

var bodies = $x('//div[@class="mb"]/div/div');
bodies.forEach(function(body) {
	body.innerHTML = format(body.innerHTML);
});

// Takes care of mail bodies that you expand later.

var oldP = unsafeWindow.P;
unsafeWindow.P = function(iframe, data) {
	if (data[0] == "mb")
		data[1] = format(data[1]);
	return oldP.apply(iframe, arguments);
}

// Only replace outside of tags.

function format(content) {
	return content.replace(OUTSIDE_TAGS_RE, format_outside_tags);
}
function format_outside_tags(_, before, content, after) {
	return before + really_format(content) + after;
}

// Actually replace /foo/ with <i>/foo/</i> etc.

function really_format(content) {
	return content.replace(FORMAT_RE, apply_format);
}
function apply_format(_, preContext, content, formatter) {
	var tag = FORMAT_MAP[formatter];
	return preContext + "<"+tag+">" + content + "</"+tag+">"
}


/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
