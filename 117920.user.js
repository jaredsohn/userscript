// ==UserScript==
// @name           BikePortlandFilterByRecommended
// @namespace      http://namespace.kinobe.com/greasemonkey/
// @description    Allows the users to select bikeportland.org comments they wish to view based on how many times it has been recommended.
// @match          http://bikeportland.org/*
// @match          http://bp/*
// @version        1.2
// ==/UserScript==

/*

 This copyright section and all credits in the script must be included in modifications or redistributions of this script.

 BikePortlandFilterByRecommended is Copyright (c) 2011, Jonathan Gordon
 BikePortlandFilterByRecommended is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
 License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

 BikePortland is owned by PedalTown Media Inc.
 BikePortlandFilterByRecommended is not related to or endorsed by PedalTown Media Inc. in any way.

 */

/*
 This script borrows heavily from Jimmy Woods' Metafilter favorite posts filter script
 http://userscripts.org/scripts/show/75332

 Also from Jordan Reiter's Metafilter MultiFavorited Multiwidth - November Experiment
 http://userscripts.org/scripts/show/61012

 Version 1.2
 - Fixed bug where nesting was broken. Cleaned up styling.

 Version 1.1
 - Added additional recommended styling on left, ala the Metafilter MultiFavorited Multiwidth script.

 Version 1.0
 - Initial Release.



 */


Global = {
    last_tr: null        // Reference to the last TR tag in the select table that a user clicked on.
    , table_bg_color: "gray"   // Background color for the table rows.
    , table_selected_color: "#DC5E04"     // BG color for the selected table row.
    , post_count_color: "white"
    , fav_count_color: "#BBD"
    , max_count: 100     // Largest possible # of favourites
    , posts: []        // Stores info about each post
    , max_favourites: 0   // Highest favourite count so far.
    , doLog: false   // Should we log messages?
};


/**
 * ----------------------------------
 * Logger
 * ----------------------------------
 * Allows swapping out GM logger for console
 */
Logger = {

    log: function(message) {
        if (Global.doLog) {
            GM_log(message);
        }
    }
};

/**
 * ----------------------------------
 * Util
 * ----------------------------------
 * Various utility functions
 */
Util = {
    /**
     * Returns an array of DOM elements that match a given XPath expression.
     *
     * @param path string - Xpath expression to search for
     * @param from DOM Element - DOM element to search under. If not specified, document is used
     * @return Array - Array of selected nodes (if any)
     */
    getNodes: function(path, from) {
        from = from || document;

        var item, ret = [];
        var iterator = document.evaluate(path, from, null, XPathResult.ANY_TYPE, null);
        while (item = iterator.iterateNext()) {
            ret.push(item);
//            Logger.log("Iterating comment divs...");

        }
        return ret;
    }

    /**
     * Deletes a DOM element
     * @param DOM element - DOM element to remove
     * @return DOM element - the removed element
     */
    , removeElement: function(element) {
        return element.parentNode.removeChild(element);
    }

    /**
     * Binds an event handler function to an object context, so that the handler can be executed as if it
     * was called using "this.<methodname>(event)", i.e. it can use "this.foo" inside it.
     *
     * @param function method - a function to execute as an event handler
     * @param Object context - the object that will be used as context for the function, as if the function had been
     *          called as context.method(event);
     * @return function - the function to pass to addEventListener
     */
    , bindAsEventHandler: function(method, context) {
        var __method = method;
        return function (event) {
            return __method.apply(context, [event]);
        }
    }
};

/*
 * Event handler for when user clicks on a row
 */
function filterPosts(evt) {
    // Find the parent <TR> tag.
    var t = evt.target;
    while (t.tagName != "TR") {
        t = t.parentNode;
    }

    // Determine its ID and extract the number from it.
    /(\d+)$/.exec(t.id);
    var max_cnt = parseInt(RegExp.$1);

    // Hide/unhide all posts that don't match the chosen fav count.
    var i = Global.posts.length;
    while (i--) {
        var is_showing = (Global.posts[i].div.style.display !== "none");
        var show = (Global.posts[i].num_favs >= max_cnt);
        if (show != is_showing) {
            Global.posts[i].div.style.display = (show ? "" : "none");
        }
    }

    // Reset the color of the previous row to be clicked on.
    if (Global.last_tr !== null) {
        Global.last_tr.style.background = Global.table_bg_color;
    }
    // Set the color of the row we just clicked on
    t.style.background = Global.table_selected_color;
    Global.last_tr = t;
}

// ---------------------------

function simulateClickShow(count) {

// jquery isn't working here
//            $('#filter0').trigger('click');

// use non-jquery method to simulate the click of the count row specified
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var show_all_link = document.getElementById("filter" + count);
    show_all_link.dispatchEvent(evt);

}

function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) { // use native implementation if available
        Logger.log("Using native implementation...");
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass, node) {
            if (node == null)
                node = document;
            var classElements = [], els = document.getElementsByTagName("*"), elsLen = els.length, pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"), i, j;
            Logger.log("Total elements: " + els.length);
            Logger.log("Looking for" + searchClass);

            for (i = 0, j = 0; i < elsLen; i++) {

                var elsClassName = els[i].className;
                if ("" != elsClassName) {
//                    Logger.log("Class of element: " + elsClassName);
                }
                if (pattern.test(elsClassName)) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function captureShowClick(e) {

    var click_target = e.target;
    while (click_target.tagName != "SPAN") {
        click_target = click_target.parentNode;
    }

    Logger.log("e.target is: " + click_target);
    Logger.log("e.target.id is: " + click_target.id);

    var recommended_re = /^(\d+)_(\d+)$/;
    var count_class = 0;

    var count = recommended_re.exec(click_target.id)[2];
    Logger.log("Count is: " + count);
    simulateClickShow(count);
    return false;
}

function init() {

    // if we can't find comments, it's probably this is being called for a page we haven't excluded
    if (undefined == document.getElementById("comments")) {
        return;
    }

    // Prepare array for storing counts of how many posts have been favourited this many times.
    var counts = [];
    for (i = 0; i <= Global.max_count; i++) {
        counts[i] = 0;
    }

    // Get posts and compile them into arrays
    var recommended_re = /^(\d+)$/, id_re = /^div\-comment\-(\d+)$/;
    var commentDivs = Util.getNodes('.//div[@class="comment-body"]');
    var total_posts = 0;
    for (var i = 0; i < commentDivs.length; i++) {

        var comment_div = commentDivs[i];
        var comment_div_id = comment_div.id;
//        Logger.log("Id is: " + comment_div_id);

        if (comment_div_id !== undefined && id_re.test(comment_div_id)) {

            var id_num = id_re.exec(comment_div_id)[1];
//            Logger.log("id num: " + id_num);


            var parent_div = Util.getNodes('.//div[@class="comment-text"]', comment_div)[0];
            var recommended_span = Util.getNodes('.//span[@id="karma-' + id_num + '-up"]', comment_div)[0];
            var recommended_text = recommended_span.textContent;


//            Logger.log("recommended_text: " + recommended_text);
            var recommended_count = (recommended_re.exec(recommended_text) !== null) ? Math.min(parseInt(RegExp.$1), Global.max_count) : 0;
//            Logger.log("recommended_count: " + recommended_count);
            counts[recommended_count]++;

            if (recommended_count > 2) {
                var recommendedWidthSize = (Math.round(recommended_count / 2) + 1);
                comment_div.style.borderLeft = '' + recommendedWidthSize + 'px solid ' + Global.table_selected_color;
                comment_div.style.borderTop = '0px';
                comment_div.style.borderBottom = '0px';
                

                comment_div.style.paddingLeft = '5px';
//                comment_div.style.marginLeft = '' + (70 - recommendedWidthSize) + 'px';
            }
            
            Global.max_favourites = Math.max(recommended_count, Global.max_favourites);
            Global.posts.push({
                div: comment_div
                , num_favs: recommended_count
            });

            var id_text = id_num + "_" + recommended_count;
            var all_id_text = id_num + "_0";
            var show_all_span = document.createElement('span');
            show_all_span.className = "click_count";
            show_all_span.id = all_id_text;

            var show_count_span = document.createElement('span');
            show_count_span.className = "click_count";
            show_count_span.id = id_text;
            show_all_span.innerHTML = "&nbsp;<a>(Show all)</a>";
            show_count_span.innerHTML = "&nbsp;<a>(Show " + recommended_count + " and above)</a>";
            parent_div.insertBefore(show_all_span, recommended_span.nextSibling);
            parent_div.insertBefore(show_count_span, recommended_span.nextSibling);


            total_posts++;
        }
    }

    GM_addStyle('#comments { margin-bottom: 1em; }'
        + ' .td1 {cursor: pointer; border: 1px solid white; background: ' + Global.table_bg_color + '; }'
        + ' .myhr {height: 7px ; margin-top: 2px; margin-bottom: 2px; }'
        + ' .hr1 {color:' + Global.post_count_color + '; background-color: ' + Global.post_count_color + '; }'
        + ' .hr2 {color:' + Global.fav_count_color + '; background-color: ' + Global.fav_count_color + '; }'
    );

    initTable(counts, total_posts);
    document.addEventListener('keydown', function(e) {
        // pressed alt+g
        if (e.keyCode == 71 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
            simulateClickShow(0);
        }
    }, false);

    var allClickClasses = getElementsByClassName(document, "click_count");
    Logger.log("allClickClasses count: " + allClickClasses.length);

    for (var i = 0; i < allClickClasses.length; i++) {
        var n = allClickClasses[i];
        Logger.log("n is: " + n);
        Logger.log("n.target is: " + n.target);
        n.addEventListener('click', captureShowClick, false);

    }


//    Logger.log("Attempting to get elements by class name...");
//    Logger.log(getElementsByClassName(document, "children").length);


}

/**
 * Generates the table at the top of the page
 * @param Array counts - post counts, from 0 to Global.max_total. [fav_count => # of posts]
 * @param integer total_posts - Total number of posts.
 * @return void
 */
function initTable(counts, total_posts) {
    Logger.log("Total counts: " + counts);

    var dummyDiv = document.createElement('div');
    var table_rows_html = '';
    var m = Global.max_count + 1, cum_total = 0;
    // Generate the table rows
    while (m-- >= 0) {
        if (counts[m] > 0 || m == 0) {
            cum_total += counts[m];
            table_rows_html += '<tr id="filter' + m + '" class="td1">'
                + '<td style="color: ' + Global.fav_count_color + '">'
                + ((m == 0) ? "All" : m)
                + '</td>'
                + '<td style="color: ' + Global.post_count_color + '">'
                + cum_total
                + '</td>'
/**                
                + '<td>'
                + '<hr noshade align="left" class="myhr hr1" width="'
                + Math.ceil(100 * cum_total / total_posts)
                + '%"/>'
                + '<hr noshade align="left" class="myhr hr2" width="'
                + Math.ceil(100 * (m / Global.max_favourites))
                + '%"/>'
                + '</td>'
*/                		
                + '</tr>';
        }
    }

    // Insert table into page
    
    dummyDiv.innerHTML = '<div>'
    	+ '<div style="margin:2em;">Click on a row to show comments that have been recommended that number of times or higher.</div>'
    	+ '<table id="favs_table"'
        + ' style="margin:2em;width:80%;border:1px solid white;border-collapse:collapse;">'
        + '<thead><tr><th style="width:4em;"># of Recommendations</th><th style="width:4em;"># of Comments</th>'
//        + '<th></th>'
        + '</thead>'
        + '<tbody>'
        + table_rows_html
        + '</tbody></table>'
        + '</div>';
    var page_div = document.getElementById("comments");
    page_div.insertBefore(dummyDiv.firstChild, page_div.firstChild);

    // Add the event listeners.
    var rows = Util.getNodes('.//table[@id="favs_table"]/tbody/tr');
    var n = rows.length;
    while (n--) {
        rows[n].addEventListener('click', filterPosts, false);
    }


}


init();