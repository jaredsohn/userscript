// ==UserScript==
// @name           YouTube Auto-Like Videos
// @namespace      http://userscripts.org/users/23652
// @description    Automatically clicks the 'Like' button
// @include        http://*.youtube.com/watch*v=*
// @include        http://youtube.com/watch*v=*
// @include        https://*.youtube.com/watch*v=*
// @include        https://youtube.com/watch*v=*
// @copyright      JoeSimmons
// @version        1.0.36
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require        http://userscripts.org/scripts/source/49700.user.js?name=GM_config
// @require        https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.0.js
// @require        http://userscripts.org/scripts/source/186053.user.js?name=YouTube_Button_Container
// @require        http://usocheckup.dune.net/58010.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

/* CHANGELOG

    1.0.36 (12/17/2013)
        - added a user-script command for the options

    1.0.35 (12/14/2013)
        - started using YouTube Button Container
        - made code more readable by using JSL and @requires

    1.0.34
        - added compatibility for Opera & Chrome

*/



(function () {
    'use strict';

    var t = 0, tMax = 20,
        spaceRegex = /([ \t]+)|(\n[ \r\n\r]+\n)/g,
        newlineRegex = /\n/g,
        uRegex = /\/user\/(\w+)/i,
        uRegexS = /[\w ]+/i,
        spaces = /\s+/g,
        intv, pass, auto_like_list;

    // click by JoeSimmons
    function click(element, type) {
        var eventObject = document.createEvent('MouseEvents');
            element = typeof element === 'string' ? document.getElementById(element) : element;
            type =  typeof type === 'string' ? type : 'click';

        if (element.isJSL === true) {
            element = element[0];
        }

        if (element) {
            eventObject.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            element.dispatchEvent(eventObject);
        }
    }

    function waitForShare() {
        var aboutTab = JSL('//div[@id="watch7-secondary-actions"]//button[@data-trigger-for="action-panel-details"]'),
            shareTab = JSL('//div[@id="watch7-secondary-actions"]//button[@data-trigger-for="action-panel-share"]');
        
        // switch back to the 'About' tab after the 'Like' button is pressed
        if (shareTab.attribute('class').indexOf('yt-uix-button-toggled') !== -1) {
            window.setTimeout(click, 1000, aboutTab);

            shareTab.removeEvent('DOMAttrModified', waitForShare);
        }
    }

    function isPressed(e) {
        return e.attribute('class').indexOf('yt-uix-button-toggled') !== -1;
    }

    function doLike() {
        var author = JSL('#watch7-user-header a.yt-user-name'),
            like = JSL('#watch-like'),
            dislike = JSL('#watch-dislike'),
            shareTab = JSL('//div[@id="watch7-secondary-actions"]//button[@data-trigger-for="action-panel-share"]'),
            likeClass = like.attribute('class'),
            authorHref = '',
            authorText = '',
            usernameHref = '',
            usernameText = '';

        // check if the author section or like button are present
        if (t > tMax) {
            return JSL.clearInterval(intv);
        } else if (author.exists && like.exists && shareTab.exists) {
            authorText = author.text();
            authorHref = author.prop('href');
        } else {
            return;
        }

        // Figure out the username of the video author
        if ( authorHref.match(uRegex) ) {
            usernameHref = authorHref.match(uRegex)[1];
        }
        if ( authorText.match(uRegexS) ) {
            usernameText = authorText.match(uRegexS)[0].replace(spaces, '');
        }

        // try to click "Like"
        if ( GM_config.get('auto') === true || usernameHref.match(pass) || usernameText.match(pass) ) {
            if ( !isPressed(like) && !isPressed(dislike) ) {
                shareTab.addEvent('DOMAttrModified', waitForShare);
                window.setTimeout(click, 200, like);
                JSL.clearInterval(intv);
            }
        }

        t += 1;
    }

    // make sure the page is not in a frame
    if (window !== window.top) { return; }

    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('YouTube Auto-Like Options', function () { GM_config.open(); });
    }

    GM_config.init('YouTube Auto-Like Options', {
        auto : {
            section : ['Main Options'],
            label : 'Auto-like ALL videos?',
            type : 'checkbox',
            'default' : true,
            title : 'Enabling this will make you "Like" all videos.'
        },
        list : {
            section : ['Specific Usernames'],
            label : 'List the usernames of the users\' videos you want to auto-like.',
            type : 'textarea',
            cols : 80,
            rows : 20,
            'default' : 'Write usernames here separated by lines',
            title : 'This feature will be enabled if the previous feature is disabled.'
        }
    });

    auto_like_list = GM_config.get('list');
    pass = new RegExp('(' + auto_like_list.trim().replace(spaceRegex, '').replace(newlineRegex, '|') + ')', 'i');

    // Run a function when the page is fully loaded
    JSL.runAt('end', function() {
        addButtonToContainer('Auto-Like Options', function () { GM_config.open(); });

        // Try to 'like' each half second for 15 seconds max
        intv = JSL.setInterval(doLike, 750);
    });

}());