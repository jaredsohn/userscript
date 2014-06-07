// ==UserScript==

// @name           Heise Quick Delete
// @namespace      http://diveintogreasemonkey.org/download/

// @description    Löscht den aktuellen Beitrag sofort.

// @include        http://*heise.de/*wipe*
// @include        http://*heise.de/*/foren/
// @include        http://*heise.de/foren/user_postings/*

// ==/UserScript==

(function() {
	var execute = function (body) {
		if(typeof body === "function") { body = "(" + body + ")();"; }
		var el = document.createElement("script");
		el.textContent = body;
		document.body.appendChild(el);
		return el;
	};

	if (document.getElementsByName("wipe_submit").length > 0) {
		document.getElementsByName("pass")[0].checked = true;
		document.getElementsByName("wipe")[0].click();
	}
	if (document.location.href.match("user_postings")) {
	execute("console.log('Trying to add delete buttons. Is jquery available? ', $ != null);");
	execute("function adddelete(i,d){ a = $(d).find('a')[0]; console.log(a, a.href); bref = a.href.replace(/\\/foren\\/.*\\/(forum-\\d*\\/msg-\\d*)\\/read\\//, '/foren/$1/wipe/'); console.log(bref); b=document.createElement('a');b.href=bref;b.textContent='delete';b.style.float='right'; b.target='_blank'; $(a).before(b); };");
	execute("$('.thread_title').each(adddelete);");
	}
	// Go back after delete; close if it was a new tab.
	if (document.location.href.match("/foren/$")) {
		console.log("History length: "+history.length);
	execute("$('.error_message').each(function(d,i){console.log(i);if(i.textContent.match('gelöscht')){if(history.length > 2){history.go(-3);}else{window.close()};}});");
	};
}) ();
