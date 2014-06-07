// ==UserScript==
// @name       Time World Help Linker
// @namespace  http://stackoverflow.com/users/103167/ben-voigt
// @version    0.1
// @description Bypasses the need to post help links to your profile
// @match      http://www.kongregate.com/games/playmage/time-world*
// @copyright  2013+, Ben Voigt
// ==/UserScript==
function installHelpHook() {
    (function(orig) {
        
        unsafeWindow.lightbox.prototype.initializeFeedPostFrame = function(a, b, c, e) {
            if (c != 'http://www.perfectgalaxy.com/webimg/helptask.png') {
                return orig.call(a, b, c, e);
            }
            
            var s = 'http://www.kongregate.com/games/playmage/time-world?';
            unsafeWindow.$H(e).each(function(h) {
                s += h[0] + '=' + h[1] + '&';
            });
            unsafeWindow.document.getElementsByClassName('chat_input')[1].setValue(s);
            unsafeWindow.holodeck.invokeShoutCallback({message_type: 'feed', success: true, error: "User closed dialog"});
        };
        
    })(unsafeWindow.lightbox.prototype.initializeFeedPostFrame);
    unsafeWindow.console.info('Hook installed');
}

function autoinstallHelpHook() {
    if ('lightbox' in unsafeWindow && 'prototype' in unsafeWindow.lightbox && 'initializeFeedPostFrame' in unsafeWindow.lightbox.prototype) {
        installHelpHook();
    }
    else {
        window.setTimeout(autoinstallHelpHook, 50);
    }
}

window.setTimeout(autoinstallHelpHook, 50);
