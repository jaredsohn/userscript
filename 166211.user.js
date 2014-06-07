// ==UserScript==
// @name           turkopticon
// @version        2014.03.07
// @description    Review requesters on Amazon Mechanical Turk
// @author         Created by Lilly Irani and Six Silberman, modified by Miku
// @license        GNU GPL
// @homepage       http://turkopticon.ucsd.edu
// @updateURL      https://userscripts.org/scripts/source/166211.meta.js
// @downloadURL    https://userscripts.org/scripts/source/166211.user.js
// @include        https://*.mturk.com/mturk/viewhits*
// @include        https://*.mturk.com/mturk/findhits*
// @include        https://*.mturk.com/mturk/sorthits*
// @include        https://*.mturk.com/mturk/searchbar*
// @include        https://*.mturk.com/mturk/viewsearchbar*
// @include        https://*.mturk.com/mturk/sortsearchbar*
// @include        https://*.mturk.com/mturk/preview?*
// @include        https://*.mturk.com/mturk/statusdetail*
// @include        https://*.mturk.com/mturk/return*
// @require        https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// Recent Changes
// 2014-03-07      Added a backup server to keep Turkopticon online if the proxy server fails
// 2014-02-28      Merged a fix from Six Silberman that handles blank values in the TO database
// 2014-02-05      Fixed a bug that didn't display the blue box for requesters with no TO
// 2014-02-04      Changed the pages in which the script is allowed to run which saves bandwidth - thank you mmmturkeybacon from mturkgrind
// 2014-02-03      Added a patch for null values
// 2014-01-28      Fixed the TO API by pointing it to the new server. Added in the new TOS violation count into the drop down.
// 2013-05-02      Turkopticon data is now cached and refreshes every 30 minutes with the origin server.
// 2013-05-01      Changed script processing to evaluate data after the page has loaded. Also fixed a bug where sometimes the JSON parsing failed.
// 2013-04-30      Initial upload to userscripts

var TURKOPTICON_BASE = "http://turkopticon.ucsd.edu/";
var TURKOPTICON_PROXY = "http://turkopticon.istrack.in/";
var API_BASE = "http://turkopticon.ucsd.edu/api/";
var API_PROXY_BASE = "https://api.turkopticon.istrack.in/";
var API_PROXY_BACKUP = "https://api.differenceengines.com/";
var API_MULTI_ATTRS_URL = API_PROXY_BASE + "multi-attrs.php?ids=";

function getRequesterAnchorsAndIds(a) {
    //a is a list of anchor DOM elements derived in the previous function
    var rai = {};
    var re = new RegExp(/requesterId/);
    var rf = new RegExp(/contact/);
    var isContactLink = new RegExp(/Contact/);
    var isImgButton = new RegExp(/img/);
    var requestersHere = false;

    for (var i = 0; i < a.length; i++) {
        var href = a[i].getAttribute('href');
        if (re.test(href) /*&& !rf.test(href)*/ ) {
            var innards = a[i].innerHTML;
            if (!isContactLink.test(innards) && !isImgButton.test(innards)) {
                var id = a[i].href.split('requesterId=')[1].split('&')[0]
                if (!rai.hasOwnProperty(id)) {
                    rai[id] = [];
                }
                rai[id].push(a[i]);
                requestersHere = true;
            }
        }
    }

    rai = (requestersHere) ? rai : null;
    return rai;
}

function buildXhrUrl(rai) {
    var url = API_MULTI_ATTRS_URL;
    var ri = Object.keys(rai);
    for (var i = 0; i < ri.length; i++) {
        url += ri[i];
        if (i < ri.length - 1) {
            url += ",";
        }
    }
    return url;
}

function makeXhrQuery(url, reqAnchors) {
    GM_xmlhttpRequest({
        method: 'GET',
        timeout: 1000,
        url: url,
        onload: function (results) {
            //Test the http status code
            if (results.status != 200) {
                console.log("HTTP STATUS NOT OK, status: " + results.status);
                //Status is not OK, use the fallback
                useFallback(url, reqAnchors);
            } else {
                console.log("HTTP STATUS OK");
                /*r = results.responseText;
                console.log(r);*/
                var data = $.parseJSON(results.responseText);
                //console.log(data);
                getNamesForEmptyResponses(reqAnchors, data);
                insertDropDowns(reqAnchors, data);
            }
        },
        //Network level failure
        onerror: function () {
            console.log("NETWORK ERROR");
            useFallback(url, reqAnchors);
        },
        //Request timed out
        ontimeout: function (results) {
            console.log("REQUEST TIMEOUT");
            useFallback(url, reqAnchors);
        }
    });
}

function useFallback(url, reqAnchors) {
    //If the TO proxy ever goes down, here we can switch to the backup
    return makeXhrQuery(url.replace(API_PROXY_BASE, API_PROXY_BACKUP), reqAnchors);
}

function ul(cl, inner) {
    return "<ul class='" + cl + "'>" + inner + "</ul>";
}

function li(cl, inner) {
    return "<li class='" + cl + "'>" + inner + "</li>";
}

function span(cl, inner) {
    return "<span class='" + cl + "'>" + inner + "</span>";
}

function strmul(str, num) {
    return Array(num + 1).join(str);
}

function pad(word, space) {
    if (word.length >= space) {
        return word;
    } else {
        return word + strmul("&nbsp;", space - word.length);
    }
}

function long_word(word) {
    switch (word) {
    case "comm":
        return "communicativity";
        break;
    case "pay":
        return "generosity";
        break;
    case "fair":
        return "fairness";
        break;
    case "fast":
        return "promptness";
        break;
    }
}

function visualize(i, max, size) {
    var color;
    if (i / max <= 2 / 5) {
        color = 'red';
    } else if (i / max <= 3 / 5) {
        color = 'yellow';
    } else {
        color = 'green';
    }
    var filled = Math.round((i / max) * size);
    var unfilled = size - filled;
    var bar = span("bar", span(color, strmul("&nbsp;", filled)) + span("unf", strmul("&nbsp;", unfilled)));
    return bar;
}

function attr_html(n, i) {
    return pad(long_word(n), 15) + ": " + visualize(i, 5, 30) + "&nbsp;" + i + " / 5";
}

function ro_html(ro) {
    var rohtml = "";
    if (ro.attrs) {
        var keys = Object.keys(ro.attrs);
        if (ro.attrs[keys[0]]) {
            for (var i = 0; i < keys.length; i++) {
                rohtml += li("attr", attr_html(keys[i], ro.attrs[keys[i]]));
            }
        }
    }
    return rohtml;
}

function what(ro) {
    var str = "";
    if (ro.attrs) {
        var keys = Object.keys(ro.attrs);
        if (ro.attrs[keys[0]]) {
            str = li("gray_link", "<a href='" + TURKOPTICON_BASE + "help#attr'>What do these scores mean?</a>");
        }
    }
    return str;
}

function nrs(rid, nrevs) {
    var str = "";
    if (!nrevs) {
        str = "<li>No reviews for this requester</li>";
    } else {
        str = "<li>Scores based on <a href='" + TURKOPTICON_BASE + rid + "'>" + nrevs + " reviews</a></li>";
    }
    return str;
}

function tos(tosflags) {
    if (!tosflags) {
        tosflags = 'N/A';
    }
    var str = "<li>Terms of Service violation flags: " + tosflags + "</li>";
    return str;
}

function rl(rid, name) {
    var rl = "<li><a href='" + TURKOPTICON_BASE + "report?requester[amzn_id]=" + rid;
    rl += "&requester[amzn_name]=" + name + "'>";
    rl += "Report your experience with this requester &raquo;</a></li>";
    return rl;
}

function dropDown(ro, rid) {
    var n = ro.name;
    var arrcls = "";
    if (ro.attrs) {
        var keys = Object.keys(ro.attrs);
        if (ro.attrs[keys[0]]) {
            arrcls = "toc";
        }
    }
    var dd = ul("tob", li(arrcls, "&#9660;") + ul("tom", ro_html(ro) + what(ro) + nrs(rid, ro.reviews) + tos(ro.tos_flags) + rl(rid, n)));
    return dd;
}

function insertInlineCss() {
    var css = "<style type='text/css'>\n";
    css += ".tob, .tom { list-style-type: none; padding-left: 0; }\n";
    css += ".tob { float: left; margin-right: 5px; }\n";
    css += ".tob > .tom { display: none; position: absolute; background-color: #ebe5ff; border: 1px solid #aaa; padding: 5px; }\n";
    css += ".tob:hover > .tom { display: block; }\n";
    css += ".tob > li { border: 1px solid #9db9d1; background-color: #ebe5ff; color: #00c; padding: 3px 3px 1px 3px; }\n";
    css += ".tob > li.toc { color: #f33; }\n";
    css += "@media screen and (-webkit-min-device-pixel-ratio:0) { \n .tob { margin-top: -5px; } \n}\n"
    css += ".attr { font-family: Monaco, Courier, monospace; color: #333; }\n";
    css += ".bar { font-size: 0.6em; }\n";
    css += ".unf { background-color: #ddd; }\n";
    css += ".red { background-color: #f00; }\n";
    css += ".yellow { background-color: #f90; }\n";
    css += ".green { background-color: #6c6; }\n";
    css += ".gray_link { margin-bottom: 15px; }\n";
    css += ".gray_link a { color: #666; }\n";
    css += "</style>";
    var head = document.getElementsByTagName("head")[0];
    head.innerHTML = css + head.innerHTML;
}

function getNamesForEmptyResponses(rai, resp) {
    for (var rid in rai) {
        if (rai.hasOwnProperty(rid)) {
            if (resp[rid] == "") { // empty response, no data in Turkopticon DB for this ID
                /**
                 * Chrome + Firefox compatibility using jQuery
                 */
                resp[rid] = $.parseJSON('{"name": "' + rai[rid][0].innerHTML + '"}');
            }
            resp[rid].name = rai[rid][0].innerHTML;

            /*Firefox way which might not be compatible with chrome*/
            //resp[rid] = JSON.parse('{"name": "' + rai[rid][0].innerHTML + '"}');
        }
    } // overwrite name attribute of response object from page
    return resp;
}

function insertDropDowns(rai, resp) {
    for (var rid in rai) {
        if (rai.hasOwnProperty(rid)) {
            for (var i = 0; i < rai[rid].length; i++) {
                var td = rai[rid][i].parentNode;
                td.innerHTML = dropDown(resp[rid], rid) + " " + td.innerHTML;
            }
        }
    }
}

/**
 * Start execution script functions
 */

/**
 * Insert the CSS in the html head of the page
 */
insertInlineCss();

/**
 * Gather all of the links on the page <a href="...">
 */
var a = document.getElementsByTagName('a');

/**
 * Process the links to retrieve the requester data
 */
var reqAnchors = getRequesterAnchorsAndIds(a);

/**
 * If the variable reqAnchors has data, lets review it
 */
if (reqAnchors) {

    /**
     * Build a list requester IDs separated by a comma
     */
    var url = buildXhrUrl(reqAnchors);

    /**
     * Contact Turkopticon for data about all of the requesters in one http request
     */
    var turkopticon = makeXhrQuery(url, reqAnchors);
}