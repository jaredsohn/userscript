// Add a "Google status" link to Facebook status lines.
// version 1.2
// - Now supports FF. Stupid FF.
// 2009-01-02 by Avner Kashtan
//
// ==UserScript==
// @name           Facebook Status Googler
// @description    Adds a "Google this" link to status lines.
// @include        http://*.facebook.com/*
// ==/UserScript==

function ygg_getElementsByClassName(classname, node) {

    if (!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
        if (re.test(els[i].className)) a.push(els[i]);
    return a;
}

function addGoogleLink() {
    var statusStories = ygg_getElementsByClassName('status_story_body_wrapper', null);
    for (var i = 0; i < statusStories.length; i++) {
        var story = statusStories[i];

        var storyUsername = ygg_getElementsByClassName('status_user_name', story)[0].innerText;
        if (!storyUsername)
	storyUsername = ygg_getElementsByClassName('status_user_name', story)[0].textContent;

        var storyTextElement = ygg_getElementsByClassName('status_body', story)[0];
        var storyText = storyTextElement.innerText;
        if (!storyText)
	storyText = storyTextElement.textContent;

        storyText = storyText.replace(storyUsername, '');

        var googleUrl = 'http://google.com/search?q=' + storyText;
        var linkElement = document.createElement('a');
        linkElement.href = googleUrl;
        if (linkElement.innerText)
	linkElement.innerText = 'Google it';
        else
	linkElement.textContent = 'Google it';
	 	

        var firstDash = ygg_getElementsByClassName('action_link_dash action_link_dash_0', story)[0];
        var anotherDash = document.createElement('span')
        anotherDash.innerHTML = firstDash.innerHTML;
        anotherDash.className = firstDash.className;


        firstDash.parentNode.insertBefore(linkElement, firstDash.nextSibling);
        firstDash.parentNode.insertBefore(anotherDash, firstDash.nextSibling.nextSibling);

    }
}

window.addEventListener(
'load',
function() { addGoogleLink() },
true);