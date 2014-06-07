// ==UserScript==
// @name        Jira Subversion View
// @namespace   http://jira.heinrichmartin.com
// @description Sorts "Files Changed" and opens diff in new tab.
// @include     *jira*/browse/*-*
// @require     http://code.jquery.com/jquery.min.js
// @author      heinrichmartin
// @grant       GM_log
// @version     0.2
// ==/UserScript==

// @history
//    0.2   BUGFIX: script breaks dropdown menu
//    0.1   first version

// open in _blank
var changed = $("#issue_actions_container tr:last-child td");
changed.find("a").attr("target", "_blank");

// wrap in divs for sorting
// XXX jquery does not support text nodes - use html!
changed.html(function(index,oldhtml){
    return oldhtml.replace(/<font [\s\S]*?<br>/g, "<div>$&</div>\n");
});
// sort & unwrap
changed.each(function(index,elem){
    // sort
    $(elem).append($(elem).children().get().sort(function(a,b){
        a = $(a).text();
        b = $(b).text();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
        // template for multi-column sorting below
        /*a = $(a).find("font").text();
        b = $(b).find("font").text();
        if (a < b) return -1;
        if (a > b) return  1;
        a = $(a).find("a").text();
        b = $(b).find("a").text();
        return (a < b) ? -1 : (a > b) ? 1 : 0;*/
    }));
    // unwrap divs
    $(elem).find("font").unwrap();
});
