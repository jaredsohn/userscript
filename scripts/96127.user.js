// ==UserScript==
// @name           TWoP hide posts
// @namespace      jkalderash
// @include        http://forums.televisionwithoutpity.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// ==/UserScript==

// Add whitelisted users here
var whitelist = [
    'Glark',
    'Miss Alli',
    'Wing Chun',
];

$(document).ready(function() {
    // Hide all posts on the page
    $("div.thepost").hide();

    // Unhide the posts of any whitelisted users.
    $("div.twop_username").find("a").filter(function() {
	for (var i in whitelist)
	    if (this.innerHTML === whitelist[i])
		return true;
	return false;
    }).parents("tr").find("div.thepost").show();

    // Same, except for unregistered users.
    $("span.unreg").find("b").filter(function() {
	for (var i in whitelist)
	    if (this.innerHTML === whitelist[i])
		return true;
	return false;
    }).parents("tr").find("div.thepost").show();

    // Clicking on the post toggles its visibility.
    $("td.post1").click(function() {
	$(this).find("div.thepost").toggle();
    });
    $("td.post2").click(function() {
	$(this).find("div.thepost").toggle();
    });
    $("td.row1").click(function() {
	$(this).find("div.thepost").toggle();
    });
});