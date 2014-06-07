// ==UserScript==
// @name       Random Amazon Cloud Player Album
// @namespace  http://www.houseofslack.com/
// @version    0.1
// @description  This script picks a random album from the album list and clicks on it.
// @match      https://www.amazon.com/*
// @copyright  2013+, Joshua Buergel
// @require http://zeptojs.com/zepto.min.js
// @grant       none
// ==/UserScript==

// hacky, but whatever
window.setTimeout(function() {
    if ($('#amazonMp3Player') && $('.albumCount')) {
        var randomButton = $('<a class="albumCount" style="cursor: pointer">Random</a>');
        randomButton.click(function() {
        	//var clickables = $('#gridBuffer .gridHeightBody li');
            var scrollable = $('#gridContainer #gridBody');
            var maxRand = $('#gridContainer #gridBuffer').height();
            var randomScrollLocation = Math.floor(Math.random() * maxRand);
            scrollable[0].scrollTop = randomScrollLocation;
            // ok, now we have to wait for that to population - this is again hacky, but whatever
            window.setTimeout(function() {
        		var clickables = $('#gridBuffer .gridHeightBody li');
            	var randomItem = Math.floor(Math.random() * clickables.length);
                $(clickables[randomItem]).find('.playAlbum').click();
            }, 4000);
        });
        randomButton.insertBefore('.listHeader .clear');
    }
}, 5000);
