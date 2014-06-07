// ==UserScript==
// @name           UserScripts > Report Spammer
// @namespace      #aVg
// @include        http://userscripts.org/topics/*
// @version        0.2.7
// @description    Down with spam!
// ==/UserScript==

// Helper functions to maintain code compatiblity with http://userscripts.org/scripts/show/24464
function forEach(lst, cb) {
		var i = 0, len = lst.snapshotLength;
		while (i < len)
			cb(lst.snapshotItem(i), i++, lst);
}
function $(element) { return document.getElementById(element); }
function $x(x, r) { return document.evaluate(x, r || document, null, 6, null) }
function $x1(x, r) { return document.evaluate(x, r || document, null, 9, null).singleNodeValue }
function insertAfter(node, after) {
	after.parentNode.insertBefore(node, after.nextSibling);
}
function create(A, B, C) {
	if (!B) A = document.createTextNode(A);
	else {
		A = document.createElement(A);
		for (var b in B) {
			if (b.indexOf("on") == 0) A.addEventListener(b.substring(2), B[b], false);
			else if (b == "style") A.setAttribute(b, B[b]);
			else A[b] = B[b];
		}
		if (C) for (var i = 0, len = C.length; i < len; i++) A.appendChild(C[i]);
	}
	return A;
}
// End Helper functions

// Ajax spam reporting by Avg
function report_handle(e) {
	e.preventDefault();
	var l = $x1('.//span[@class="fn"]/a', e.target.parentNode.parentNode);
	var trunc = l.text.match(/(.*)\.\.\.$/i);
	if (trunc) {
		var spammerTemp = $x1("./a[starts-with(@title, '" + trunc[1] + "' )]", $("right"));
		if (spammerTemp.title != trunc[0]) alert('WARNING: Name truncation detected! \n\nDouble check report for accuracy.');
	} else {
		var spammerTemp = $x1("./a[@title='" + l.text + "']", $("right"));
	}

	var spammerLink = spammerTemp.pathname;
	var spammer = spammerTemp.title;

	if (!confirm("Report \"" + spammer + "\" as a spammer?")) return;
	var post = e.target.parentNode.childNodes[1].childNodes[1];
	var btn = e.target;
	var ref = "http://" + location.host + "/topics/9/posts";
	var comments = prompt("Any specific comments about spammer \"" + spammer + "\"?") || "";
	e.target.disabled = true;
	var report = "<a href=\"" + spammerLink + "\">" + spammer + "</a> is a <a href=\"" + spammerLink + "/posts\">spammer</a>, most recently on topic <a href=\"" + location.pathname + location.search + "\">" + document.getElementById("topic-title").firstChild.nodeValue.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").replace(/</g, "<") + "</a>, with <a href=\"" + post.pathname + post.search + post.hash + "\">this post</a>.";
	if (!/^\s*$/g.test(comments)) report += "\n" + comments;
	GM_xmlhttpRequest({
		url: ref,
		method: "POST",
		data: "authenticity_token=" + encodeURIComponent(unsafeWindow.auth_token) + "&post%5Bbody%5D=" + encodeURIComponent(report) + "&commit=Post+reply",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Referer: ref
		},
		onload: function () {
			btn.textContent = "Reported!";
		}
	});
}

forEach($x('//td[@class="author vcard"]//span[@class="role"]'), function (role) {
	if ($x1(".//span[@class='edit']", role.parentNode)) return;
	insertAfter(create('a', {
		href: '#',
		className: 'utility',
		textContent: 'Report Spam',
		style: 'display: block; clear: both; padding-bottom: 3px; padding-top: 3px;',
		onclick: function (e) {
			report_handle(e);
		}
	}), role);
});