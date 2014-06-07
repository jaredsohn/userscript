/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name           Reddit Tweet Comments
// @namespace      http://userscripts.org/users/raugturi
// @description    Share comments from Reddit via Twitter.
// @version        1.01
// @author         Chris Johnson (raugturi@gmail.com)
// @include        http://reddit.com/*/comments/*
// @include        https://reddit.com/*/comments/*
// @include        http://*.reddit.com/*/comments/*
// @include        https://*.reddit.com/*/comments/*
//
// @require http://userscripts.org/scripts/source/57756.user.js
//
// @history        1.01 Changed. Use '[T]' instead of Twitter icon for huge performance improvement.
// @history        1.00 Initial release
//
// ==/UserScript==

(function(){
    ScriptUpdater.check(86086, "1.01");
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined')
        window.setTimeout(GM_wait,100);
    else {
        $ = unsafeWindow.jQuery;
        addTweetIcons();
    }
}

function addTweetIcons() {
    $('.tagline:gt(0)').each(function (i, e) {
        comment = $(this).parent().find('.usertext-body:first').find('div.md:first').text();
        comment = comment.substring(0,120);
        url = $(this).parent().find('a:contains("permalink"):first').attr("href");
        $(this).append(' <a href="http://twitter.com/share?text='+encodeURI(comment)+'&url='+encodeURI(url)+'>[T]</a>');
    });
}