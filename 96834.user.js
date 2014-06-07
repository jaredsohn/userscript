// ==UserScript==
// @name           ulForum.de Ignorierliste
// @version        0.3
// @description    Fügt ulForum.de eine Ignorierliste hinzu.
// @namespace      http://www.ulforum.de/
// @include        http://www.ulforum.de/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
if (unsafeWindow.console) {
	var GM_log = unsafeWindow.console.log;
}

/************************* Settings menu *************************/

function showSettings() {
	var blockedUsers = GM_getValue('blockedUsers', '');
	blockedUsers = prompt(
		'Bitte gib die Namen der Benutzer, die du ignorieren möchtest, mit Kommas getrennt ein:',
		blockedUsers);
	if (blockedUsers != null) {
		GM_setValue('blockedUsers', blockedUsers);
		alert('Um die Änderungen zu sehen, musst du die Seite neu laden!');
	}
}

$('<li><a name="blockedUsers" style="cursor: pointer"><img class="icon" alt="" src="images/icons/group.png" /> Meine Ignorierliste</a></li>')
	.insertAfter('ul.menu li:eq(6)') // after "Meine Nachrichten"
	.click(function() {
		setTimeout(showSettings, 0); // workaround
	});

/************************* Hide posts *************************/

// Abort if not in thread
var inThread = new RegExp('^/ultraleicht/forum/\\d+_[^/]+/\\d+_[^/]+', 'i').test(window.location.pathname);
if (!inThread) {
	GM_log('Nicht in Thread, breche ab');
	return;
}

// Load list of blocked users
var blockedUsers = GM_getValue('blockedUsers', '').trim();
if (blockedUsers.length == 0) {
	GM_log('Ignorierliste leer, breche ab');
	return;
}
blockedUsers = blockedUsers.split(',');

// Find <tr> elements of posts to hide
var a = $('a').filter(function() {
	for (var i = 0; i < blockedUsers.length; i++) {
		var user = blockedUsers[i].trim().toLowerCase();
		if (user.length > 0 && $(this).text().toLowerCase().indexOf(user) > -1)
			return true;
	}
	return false;
});

var posts = a.parent().parent().filter('tr');

// Hide the post content
posts.children().hide();

// Show hint
posts.each(function(index, element) {
	var name = $('a:first', this).text();
	$('<td colspan="2"><div class="hints groundhint" style="cursor: pointer"><img class="icon" alt="" src="/images/icons/delete.png" /> <b>' + name + ' ignoriert!</b> <small>(Klicken, um den Post trotzdem anzuzeigen.)</small></div></td>')
		.appendTo(element);
});

// Add click handler
$('.groundhint').click(function() {
	var td = $(this).parent();
	td.parent().children().toggle();
});
