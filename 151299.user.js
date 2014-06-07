// ==UserScript==
// @name		Gathering of Tweakers - Add Posthistorie + Reacties to forum tabs
// @namespace		userscripts
// @description		Add Posthistorie and Reacties to forumtabs, show tabs everywhere
// @include		http://gathering.tweakers.net/*
// exclude		http://gathering.tweakers.net/forum/find/poster/204872/*
// exclude		http://gathering.tweakers.net/forum/find/poster/204872
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant		none
// @version		1.2.1
// ==/UserScript==



// Do config
// NOTE: Change to your id/name
var userId = 204872;
var userName = 'Redsandro';



// Globals
var postHistorie = '<li><a href="http://gathering.tweakers.net/forum/find/poster/'+userId+'">Posthistorie</a></li>';
var reacties = '<li><a href="http://tweakers.net/search/?DB=Userreacties&Query='+userName+'">Reacties</a></li>';

var tabs = '<li id="tab_forum_main" class="active"><a href="http://gathering.tweakers.net/forum">Forumlijst</a></li><li id="tab_forum_activetopics"><a href="http://gathering.tweakers.net/forum/list_activetopics">Active topics</a></li><li id="tab_forum_bookmarks"><a href="http://gathering.tweakers.net/forum/list_bookmarks">Bookmarks</a></li><li id="tab_forum_myreact"><a href="http://gathering.tweakers.net/forum/myreact">Myreact</a></li><li id="tab_forum_faq"><a href="http://gathering.tweakers.net/forum/faq">Faq</a></li>';
	tabs += postHistorie + reacties;



// Force tabs to show everywhere
if($('div#forum_tabs').length == 0) {
    var forumHeading = $('div#forumheading');
    forumHeading.prepend('<div id="forum_tabs"><div class="pageTabs"><ul>'+tabs+'</ul></div></div>');
}
// Tabje toevoegen waar tabjes zijn
else {
    var menu = $("div#forum_tabs ul:first");
    menu.append('<li><a href="http://gathering.tweakers.net/forum/find/poster/'+userId+'">Posthistorie</a></li>');
}