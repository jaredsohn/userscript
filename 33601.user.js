// ==UserScript==
// @name           Stack Overflow highlight viewed questions
// @namespace      *
// @include        http://stackoverflow.com/questions
// @include        http://stackoverflow.com/questions?*
// @include        http://beta.stackoverflow.com/questions
// @include        http://beta.stackoverflow.com/questions?*
// @version        0.55 (DOM-Ready instead of onload)
// ==/UserScript==

(function() {

    // Customizable items
    // var fav_tags = ["python", "database", "mysql"];          // Your favorite tags
    const UNSEEN_BACK_COLOR = "rgb(225,210,210)";     // Backcolor for the question already seen
    const FAV_TAG_BACK_COLOR = "rgb(210,210,225)";  // Backcolor for the favorite tags

    // Internal to the DOM
    // const QUESTION_URL = "http:\/\/beta.stackoverflow.com\/questions\/([0-9]+)\/";
    const QUESTION_URL = "http:\/\/stackoverflow.com\/questions\/([0-9]+)\/";
    const TAG_PREFIX = "show questions tagged ";

    const SEEN_MARK = "x";
    //

    var seen_q = [];
    var seen_q_str = "";

    var seen_q_str = GM_getValue ("seen_q", "");
    var seen_q = seen_q_str.split("|");

    var fav_tags_str = GM_getValue ("fav_tags", "")
    var fav_tags = fav_tags_str.split(" ")
    
    var already_run = false;

    GM_registerMenuCommand ("Set favorite tags", askTags);
    
    // window.addEventListener ("DOMContentLoaded", doStuff, false);
    if (! doStuff()) {
        window.addEventListener ("load", doStuff, false);
    }

    function doStuff() {

        var elements = window.document.getElementsByTagName('A');

        if (! elements || already_run) {
            return false;
        } else {
            already_run = true;
        }

        GM_log ("here");

        for (elem = 0; elem < elements.length; elem++) {
            if (elements[elem].href.match (QUESTION_URL)) {
                curr_q = RegExp.$1;

                // Already seen?
                if ((seen_q.length < curr_q) || (seen_q [curr_q] != SEEN_MARK)) {
                    elements[elem].style.backgroundColor = UNSEEN_BACK_COLOR;
                    seen_q [curr_q] = SEEN_MARK;
                }

                // Is a favorite tag?
                node = elements[elem].parentNode.parentNode;
                for (tag = 0; tag <= fav_tags.length; tag++) {
                    if (node.innerHTML.match ("'" + fav_tags[tag] + "'")) {
                        node.style.backgroundColor = FAV_TAG_BACK_COLOR;
                        break;
                    }
                }

                // return (0);
            }
        }

        seen_q_str = seen_q.join("|");
        GM_setValue ("seen_q", seen_q_str);
        
        return true;
    }


    function askTags() {
        fav_tags_str = prompt("Favorite tags (separated by spaces)", fav_tags_str);
        GM_setValue ("fav_tags", fav_tags_str)
    }
    
})();
