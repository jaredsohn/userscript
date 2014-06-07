// ==UserScript==
// @name           Grepolis Forum/Message Tools
// @namespace      http://userscripts.org/scripts/show/78710
// @description    Makes the Grepolis forums and player to player message views easier to use.
// @include        http://*.grepolis.com/game/*action=forum*
// @include        http://*.grepolis.com/game/message?*
// ==/UserScript==

function debug(message) {
    if (unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(message);
    }
}

var domain = unsafeWindow.location.href.match(/http:\/\/([a-z0-9]*)\./)[1];
debug("Domain is: " + domain);

function saveValue(key, value) {
    GM_setValue(domain + "--" + key, uneval(value));
}

function loadValue(key, default_value) {
    return eval(GM_getValue(domain + "--" + key, "false")) || default_value;
}

var height = 820;
var $ = unsafeWindow.jQuery;

GM_addStyle("#box { height: " + (height + 104) + "px; overflow-y:}");
GM_addStyle("#main_area { height: " + (height + 88) + "px; overflow-y:}");
GM_addStyle("#content { height: " + height + "px ! important; overflow: visible ! important; }");
GM_addStyle("#forum .game_list, #forum #postlist, #forumlist { max-height: " + (height - 270) + "px ! important; overflow-y: scroll;}");
GM_addStyle("#message_post_container { max-height: " + (height - 171) + "px !important; }");
GM_addStyle("#message_reply_preview { max-height: " + (height - 272) + "px ! important; }");
GM_addStyle("#message_reply_message { height: " + (height - 357) + "px ! important; }");
//GM_addStyle("#post_save_wrapper { height: " + (height - 171) + "px ! important; }");
//GM_addStyle("#forum_post_textarea { height: " + (height - 171 - 38) + "px ! important; }");

if (window.location.href.match(/alliance\?action=forum/)) {
    debug("On forum page");
    var thread_page_data = loadValue("thread_pages", {});
    debug("Loaded data: " + thread_page_data);
    $(".title a").each(function() {
        var node = $(this);
        var thread_id_match = node.attr("href").match(/forum\[thread_id\]=(\d+)/);
        if (thread_id_match) {
            var thread_id = parseInt(thread_id_match[1]);
            debug("Found thread id: " + thread_id);
            var page = thread_page_data[thread_id];
            if (page && page > 1) {
                var href = node.attr("href");
                var new_href = href + "&forum[page]=" + page;
                node.attr("href", new_href);
                debug("Replaced link for thread id " + thread_id + " to page " + page + " (" + href + " -> " + new_href + ")");
            }
        }
    });
    var window_thread_match = window.location.href.match(/forum\[thread_id\]=(\d+)/);
    if (window_thread_match) {
        var thread_id = parseInt(window_thread_match[1]);
        debug("Processing thread page for thread id: " + thread_id);
        var last_page_nodes = $("a.paginator_bg:last");
        if (last_page_nodes.length == 1) {
            var last_page_node = $(last_page_nodes[0]);
            debug("Found last page node: " + last_page_node.html());
            var page_match = last_page_node.attr("href").match(/forum\[page\]=(\d+)/);
            if (page_match) {
                var page = parseInt(page_match[1]);
                debug("Found last page from links: " + page);
                if ((thread_page_data[thread_id] || 0) > page) {
                    debug("Already have higher page recorded: " + thread_page_data[thread_id] + " instead of " + page);
                } else {
                    thread_page_data[thread_id] = page;
                }
                saveValue("thread_pages", thread_page_data);
            }
        }
    }
}