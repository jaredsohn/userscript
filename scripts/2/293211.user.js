// ==UserScript==
// @name       Fanfiction.net Allow selection/copying of text
// @namespace  JewelNamespace
// @version    0.1
// @description  Allows selection/copying of text on Fanfiction.net
// @match      https://www.fanfiction.net/*
// @match      http://www.fanfiction.net/*
// @match      www.fanfiction.net/*
// @include    https://www.fanfiction.net/*
// @include    http://www.fanfiction.net/*
// @include    www.fanfiction.net/*
// @copyright  Jewel
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function removeNocopy()
{
    //var nocopy = $( ".nocopy" );
    //var nocopy = $( "*" );
    var nocopy = $("#storytextp");
    
    nocopy.removeAttr('style');
}

window.onload = function() {
	setTimeout(removeNocopy, 100);
};