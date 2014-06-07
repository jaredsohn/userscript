// ==UserScript==
// @name GMail, basic HTML view, improved.
// @namespace Yonatan Yoshpe
// @description Improve the look and usability of GMail basic HTML.  Sets background of all rows to white.  Improves readability, letter sizes, spacing, and highlighting.  Sets auto refresh on mailboxes.  Works in conjunction with 'select-all' FF extension
// @include        https://mail.google.com/mail/u/0/h/*
// @include        https://mail.google.com/mail/*/h/*
// @include        https://mail.google.com/mail/h/*
// @grant       none
// ==/UserScript==

(function () {
	var tags = document.evaluate("//tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		var tag = tags.snapshotItem(i);
		tag.style.background = '#ffffff';
	}

	tags = document.evaluate("//td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		var tag = tags.snapshotItem(i);

		if( tag.width == 5 ) { tag.style.background = '#fff'; tag.width='3'; tag.style.border='dotted 1px #ccc' };
	}
	
	tags = document.getElementsByName ("gm_select");
	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];
		tag.style.lineHeight = '1.4em';
		tag.style.color = '#000';
		tag.style.fontSize = '9px';
		if( i == 0 ) { tag.style.paddingLeft = '18px'} else {tag.style.paddingLeft = '8px'}
	}
	
})();


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
            '.gb1, .gb4 { font-size: 80% !important }' +
            '.bn td { display:none }' +
            'td span { font-size: 1.15em !important; padding-right: 8px !important }' +
            'td { font-size: 75% !important }' +
            'img.p { padding-right:12px !important }' +
            '.m td a:link{ color: rgb(100,0,100) !important}' + 
            'span.ts font { color: rgb(100,0,100) !important}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

// refresh doc every 1.5min unless in compose, settings, or account panes/tabs
if( document.title.indexOf( "Inbox" ) != -1 ) {
	setTimeout(function(){if( document.title.indexOf( "Inbox" ) != -1 ) {document.location.reload()}} , 90 * 1000);
}
