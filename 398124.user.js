// ==UserScript==
// @name       DI.FM Sponsored Ad Auto-Muter
// @version    0.1
// @description  Mutes DI.FM player whenever a sponsored ad is played.
// @match      http://www.di.fm/*
// @copyright  2014+, Eran Betzalel
// ==/UserScript==

// Remove popping ad panel
$('#panel-ad').remove();

var btnVolume = $('#btn-volume');

if(btnVolume) {
    muteVolume = function () {
        if(btnVolume.hasClass('muted'))
            return;
        
        btnVolume.click();
    };
    
    unmuteVolume = function () {
        if(!btnVolume.hasClass('muted'))
            return;
        
        btnVolume.click();
    };
    
    $('#now-playing .title').bind('DOMNodeInserted DOMNodeRemoved DOMSubtreeModified', function () {
        var title = $(this).text();
        
        if(!title || title === '' || title.indexOf("Volume") === 0)
            return;
        
        if(title === "Sponsored Message") {
            muteVolume();
        }
        else {
            unmuteVolume();
        }
    });
}