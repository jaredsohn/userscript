// ==UserScript==
// @name           Collapse all children
// @namespace      Reddit
// @description    Collapses all children comment replies
// @include        http://www.reddit.com/*
// @author	   Austin
// ==/UserScript==


function letsJQuery() {$('div.commentarea%20>%20div.sitetable%20>%20div.thing%20>%20div.child').each(function(){var%20t=$(this);if(t.children().length%20>%200)t.prev().find('ul.buttons').append($('<li></li>').append($('<a%20href="#"><font%20color="green">toggle%20children</font></a>').click(function(e){t.children('div').toggle();e.preventDefault();})))}).children('div').toggle()()}