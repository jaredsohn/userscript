// ==UserScript==
// @name          IRCCloud Reconnect
// @description	  Make IRCCloud continue to try to reconnect every 10 seconds, even after 10 retries
// @author        Jonatan Heyman, http://heyman.info
//
// @include       http://irccloud.com/*
// @include       https://irccloud.com/*
// @include       http://www.irccloud.com/*
// @include       https://www.irccloud.com/*
// ==/UserScript==


// it doesn't matter if the monkey patch is injected after 10 seconds, so this is a quick fix
// to not have to check for stuff being fully loaded
setTimeout(function() {
    window.MainController.prototype.onDisconnect = function (failCount) {
        this.startingStream = false;
        this.clearStartTimeout();
        debug.debug('Controller', 'onDisconnect (hooked by Userscript)', '(failCount: ' + failCount + ')', '(restart: ' + this.restartStream + ')');

        if (this.isAuthed()) {
            this.view.disconnected();
            switch (failCount) {
                case 0:
                case 1:
                case 2:
                    if (this.restartStream)
                        this.start(failCount);
                    break;
                default:
                    if (this.restartStream)
                        this.start(10);
                    break;
            }
        }
    };
}, 10000);
