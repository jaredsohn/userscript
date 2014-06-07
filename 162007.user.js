// ==UserScript==
// @name           Twitter: Extra Shortcut Keys
// @namespace      com.gingerbeardman.twittershortcutkeys
// @description    Adds extra keyboard shortcuts to Twitter.com
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// @grant          unsafeWindow
// @run-at         document-end
// @author         Matt Sephton
// @version        1.5.0
// ==/UserScript==

document.addEventListener('keydown', function(evt) {
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    if (evt.metaKey) {
        switch(evt.keyCode) {
            case 27:    //Meta+Esc = clear tweet box
                matches = evt.target.parentNode.parentNode.querySelectorAll('.tweet-box');
                for (var i = 0;i<matches.length;i++){
                    matches[i].innerHTML = '';
                }
            case 49:    //Meta+1 = home
                evt.target.parentNode.parentNode.querySelector('li.home a').dispatchEvent(clickEvent);
                evt.preventDefault();
                break;
            case 50:    //Meta+2 = connect
                evt.target.parentNode.parentNode.querySelector('li.people a').dispatchEvent(clickEvent);
                evt.preventDefault();
                break;
            case 51:    //Meta+3 = discover
                evt.target.parentNode.parentNode.querySelector('li.topics a').dispatchEvent(clickEvent);
                evt.preventDefault();
                break;
            case 52:    //Meta+4 = profile
                evt.target.parentNode.parentNode.querySelector('li.profile a').dispatchEvent(clickEvent);
                evt.preventDefault();
                break;
            case 53:    //Meta+5 = messages
                evt.target.parentNode.parentNode.querySelector('li.messages a').dispatchEvent(clickEvent);
                evt.preventDefault();
                break;
            case 54:    //Meta+6 = lists
                evt.target.parentNode.parentNode.querySelector('li[data-name="lists"] a').dispatchEvent(clickEvent);
                evt.preventDefault();
                break;
            case 73:    //Meta+I = add image...
                if (document.querySelector('#global-tweet-dialog').style.display == 'block') {
                    evt.target.parentNode.parentNode.querySelector('.file-input').dispatchEvent(clickEvent);
                    evt.preventDefault();
                }
                break;
            case 85:    //Meta+U = go to user...
                if (document.getElementById('goto-user-dialog').style.display != 'block') { 
                    document.querySelector('#goto-user-dialog .modal-small').style.margin = 'auto';
                    document.querySelector('#goto-user-dialog .modal-small').style.top = '';
                    document.querySelector('#goto-user-dialog .modal-small').style.left = '';
                    document.body.className += ' modal-enabled';
                    document.getElementById('goto-user-dialog').style.display = 'block';
                    document.querySelector('.username-input').focus();
                } else {
                    document.body.className = document.body.className.replace(/ modal-enabled/gi, '');
                    document.getElementById('goto-user-dialog').style.display = '';
                    document.querySelector('.username-input').blur();
                    document.querySelector('#goto-user-dialog .modal-small').style.margin = 'inherit';
                    document.querySelector('#goto-user-dialog .modal-small').top = '';
                    document.querySelector('#goto-user-dialog .modal-small').left = '';
                }
                evt.preventDefault();
                break;
            default:
        }
    } else {
        switch(evt.keyCode) {
            case 27:    //Esc
                // collapse all open tweets
                matches = evt.target.parentNode.parentNode.querySelectorAll('.opened-tweet span.collapse-stream-item');
                for (var i = 0;i<matches.length;i++){
                    matches[i].dispatchEvent(clickEvent);
                }
                evt.preventDefault();
                break;
        }
    }

}, false);
