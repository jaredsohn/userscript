// ==UserScript==
// @name           Permanence for reddit's comment collapsing
// @namespace      http://userscripts.org/users/7405
// @description    This will remember which comments you have collapsed on a given story.
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

/*
v0.4 4th April 2011      - Made a small change recommended by N
v0.3 8th December 2010   - Fixed to run with latest GM nightly on FF4 Beta
v0.2 20th July 2010      - Don't collapse comments on comment permalinks
v0.1 19th July 2010      - Initial version
By Rodrigo Queiro <rodrigo.queiro@gmail.com>
*/

// from http://userscripts.org/topics/41177
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }
}

delete GM_deleteValue, GM_getValue, GM_setValue;

GM_deleteValue = function(name) {
    localStorage.removeItem(name);
}

GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value)
        return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
    }
}

GM_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
}

/* this method copied from Reddit Reveal */
function GM_wait(callback) {
   if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; if (callback) { callback(); } }
}

GM_wait(function () {
    /* extract reddit's 5-letter page id */
    var page_id = document.location.href.match(/\/comments\/([a-z0-9]{5})\//)[1];

    /* preload GM settings */
    var comm_state = $.secureEvalJSON(GM_getValue(page_id, "{}"));
    var history = $.secureEvalJSON(GM_getValue("history", "{}"));

    /* this function is defined as a workaround for GM's security measures */
    function GM_set_state(comm_id, new_state)
    {
        setTimeout(function(){
            var comm_state = $.secureEvalJSON(GM_getValue(page_id, "{}"));
            comm_state[comm_id] = new_state;
            GM_setValue(page_id, $.toJSON(comm_state));
        }, 0);
    }

    /* extracts the comment id stored as a class */
    $.fn.classid = function () {
        return this.attr('class').match(/id-\S*/)[0];
    }

    $(document).ready(function(){
        /* disable on direct links to comments */
        if (document.location.href.match(
                //new RegExp("/r/\w*/comments/\w*/\w*/\w{7}\b")))
                new RegExp("/r/\\w*/comments/\\w*/\\w*/\\w{7}\\b")))
            return;

        /* restore previous states */
        for (comm_id in comm_state)
        {
            if (comm_state[comm_id] == "hide")
                /* hidecomment expects to be called with a descendant of the main
                   'thing' */
                unsafeWindow.hidecomment($("."+comm_id+">:first"));
        }

        /* install new handlers on comments' hide and show links */
        $(".noncollapsed > p > .expand").each(function () {
            this.setAttribute('onclick', '');
            $(this).click(function () {
                /* new onclick handler for hide links */
                unsafeWindow.hidecomment(this);
                var comm_id = $(this).thing().classid();
                GM_set_state(comm_id, "hide");
                return false;
            });
        });
        $(".collapsed > .expand").each(function () {
            this.setAttribute('onclick', '');
            $(this).click(function () {
                /* new onclick handler for show links */
                unsafeWindow.showcomment(this);
                var comm_id = $(this).thing().classid();
                GM_set_state(comm_id, "show");
                return false;
            });
        });

        /* clean up history - this might cause concurrency problems... */
        var now = new Date();
        history[page_id] = now.toString();
        for (hist_page_id in history)
        {
            var last_view = new Date(history[hist_page_id]);
            var diff_days = (now - last_view) / 1000 / 60 / 60 / 24;
            if (diff_days > 1)
            {
                setTimeout(function(){GM_deleteValue(hist_page_id);}, 0);
                delete history[hist_page_id];
            }
        }
        setTimeout(function(){GM_setValue("history", $.toJSON(history));}, 0);
    });
});