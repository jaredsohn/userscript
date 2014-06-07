// ==UserScript==
// @id             somethingawful_lastpages
// @name           Something Awful - Last pages
// @version        2013-01-29
// @namespace      none.m31.lastpages
// @author         
// @description    Show links to the last few pages in the thread list
// @include        http://forums.somethingawful.com/forumdisplay.php?forumid=*
// @run-at         document-end
// ==/UserScript==

/* This Source Code Form is subject to the terms of the Mozilla Public
   License, v. 2.0. If a copy of the MPL was not distributed with this 
   file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var forum = document.getElementById('forum');
for (var i = 1; i < forum.rows.length; i++) {
    var thread = forum.rows[i];
    var postcount = 1 + parseInt(thread.querySelector('.replies').textContent);
    var pages = Math.ceil(postcount / 40);
    if (pages > 1) {
        var container = thread.querySelector('.title_pages');
        var thread_id = thread.id.substr(6);
        for (var target = Math.max(pages - 5, 8); target <= pages; target++) {
            var a = document.createElement('a');
            a.className = 'pagenumber';
            a.innerHTML = target;
            a.href = 'showthread.php?threadid=' + thread_id + '&userid=0&perpage=40&pagenumber=' + target;
            container.appendChild(a);
        }
        var last = postcount % 40;
        container.appendChild(document.createTextNode('(+' + (last == 0 ? 40 : last) + ')'));
    }
}
