// ==UserScript==
// @name         Osc DongTan
// @namespace    http://userscripts.org/scripts/show/185430
// @updateURL    https://userscripts.org/scripts/source/185430.meta.js
// @downloadURL  https://userscripts.org/scripts/source/185430.user.js
// @description  oschina屏蔽某人的动弹
// @match        http://www.oschina.net/*
// @icon         http://www.oschina.net/img/favicon.ico
// @license      GPL version 3
// @encoding     utf-8
// @require      http://code.jquery.com/jquery-1.8.2.js
// @version      1.0
// @author       moxia
// @run-at       document-end
// ==/UserScript==

/**
* 系转载，原作者：http://www.oschina.net/code/snippet_1168115_22482
*/

(function() {
    function hook() {
      unsafeWindow.ajax_get = function(the_url, succ_callback) {
        var delList=['雾海树妖'];
        jQuery.ajax({
            type: 'GET',
            cache: true,
            url: the_url,
            success: function(data) {
                g_last_id=(''.replace(/^<li[^\d]+?(\d+)[\s\S]+$/ig,'$1')*1)||g_last_id;
                for (var i = 0,p = (data || '').match(/<li[^>]+?>[\s\S]+?<\/li>|$/ig); i < p.length; i++)
                    p[i].match(new RegExp("<span class=(\"|')user\\1><a[^>]+?>(" + delList.join('|') + ")</a>", "ig")) && p.splice(i, 1);
                succ_callback(p.join(''));
            },
            error: function(html) {}
        });
      }
    }
    setTimeout(hook, 1000);
})();