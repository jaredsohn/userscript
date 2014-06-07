// CleanTwitter
// version 0.2
// 2013-05-19
// Copyright (c) 2013, Mark Caglienzi <mark.caglienzi@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// Cleans the twitter homepage, starting by removing follow suggestions.
//
// CHANGELOG:
// 2013-05-19:  First version
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name cleantwitter
// @version 0.2
// @namespace mark.caglienzi@gmail.com
// @description Cleans the twitter homepage.
// @include https://twitter.com/*
// ==/UserScript==

function remove_follow_suggestions()
{
    var element = document.getElementsByClassName('dashboard-user-recommendations')[0];
    element.parentNode.removeChild(element);
}

window.onload = remove_follow_suggestions
