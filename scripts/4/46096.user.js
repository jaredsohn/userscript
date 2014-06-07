///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// "Your Scripts" Page Enhancer
// Version 1.3, 2009-06-01
// Coded by Maarten van Egmond.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           "Your Scripts" Page Enhancer
// @namespace      http://userscripts.org/users/64961
// @author         Maarten
// @version        1.3
// @description    v1.3: Shows the date and user name of the last review or discussion forum post each script received.
// @include        http://userscripts.org/home/favorites*
// @include        http://userscripts.org/home/scripts*
// @include        http://userscripts.org/users/*/favorites*
// @include        http://userscripts.org/users/*/scripts*
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////
//
// This script will enhance the "Scripts By" and "Favorites" pages by showing
// the date on which the last post or review was received, and the name of the
// user who wrote it.
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////

// Satisfy JSLint.
/*global alert, document, GM_xmlhttpRequest, setTimeout */

// To avoid introducing global variables, define the entire script as a 
// self-invoking function following the singleton pattern.
(function () {
    //
    // Private variables
    //

    // Work queue.
    var queue = [];

    // To avoid bombarding the server, use a delay between AJAX calls.
    var XHR_REQUEST_DELAY = 250;

    // Column indices on your scripts' management page.
    // To avoid diffs between own and specific user's tables,
    // use offset from end, i.e. idx = arr.length - offset.
    var POSTS_COL_OFFSET = 4;
    var RATING_COL_OFFSET = 5;

    // Column indices on your scripts' discussions page.
    // (No offset needed here.)
    var LAST_POST_COL_IDX = 4;

    //
    // Private functions
    //

    function trim(str) {
        return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
    }

    function showError(pageName) {
        alert('Internal error: could not parse ' + pageName + ' page.\n' +
                'Looks like the page source may have changed and this ' +
                'script needs to be updated.\nPlease let the script\'s ' +
                'author know.');
    }

    function getPage(url, elt, fn) {
        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                fn(url, elt, xhr.responseText);
            }
        });
    }

    function runQueue() {
        if (queue.length > 0) {
            //var args = queue.pop();   // In case user has lots of scripts, 
            var args = queue.shift();   // start from the top, not bottom,
                                        // so that updates are visible.
            var delayed = function () {
                getPage(args[0], args[1], args[2]);
            };
            setTimeout(delayed, XHR_REQUEST_DELAY);
        }
    }

    // Returns the first tag child element of elt that has attrib = value.
    function getFirstElementByTagAttribute(elt, tag, attrib, value) {
        var result, ee, elts = elt.getElementsByTagName(tag);
        for (ee = 0; ee < elts.length; ee++) {
            if ('class' === attrib &&
                    elts[ee].getAttribute(attrib).indexOf(value) >= 0) {
                result = elts[ee];
                break;   // Only interested in first element.
            } else if (elts[ee].getAttribute(attrib) === value) {
                result = elts[ee];
                break;   // Only interested in first element.
            }
        }
        return result;
    }

    // Returns the tag child element of elt at the given index.
    function getElementByTagAtIndex(elt, tag, index) {
        var result, elts = elt.getElementsByTagName(tag);
        if (elts.length > index) {
            result = elts[index];
        }
        return result;
    }

    function parseReviewsPage(url, tableCell, text) {
        var success = false, elt, div;

        // Convert text to DOM structure.
        div = document.createElement('div');
        div.innerHTML = text;
 
        // Find the div that contains the reviews.
        elt = getFirstElementByTagAttribute(div, 'div', 'id',
                    'review-list');
        if (undefined !== elt) {
            elt = getElementByTagAtIndex(elt, 'div', 0);
            if (undefined !== elt) {
                elt = getElementByTagAtIndex(elt, 'div', 1);
                if (undefined !== elt) {
                    text = elt.innerHTML;
                    text = text.replace(/[\n\r]/g, '');
                    // Capture and add the info.
                    if (/<\/b>\s*,(.*?)<br>.*?(<a.*?<\/a>)/.test(text)) {
                        var date = RegExp.$1;
                        var name = RegExp.$2;
                        tableCell.innerHTML += '<br><br>Last review:' +
                                '<br><nobr>' + date +
                                '</nobr><br><small><nobr>by ' + name +
                                ' <a href="' + url + '" class="lastpost" ' +
                                'title="last review">\u00BB</a></nobr></small>';

                        // Looks better if there are also posts.
                        tableCell.setAttribute('style',
                                'vertical-align: bottom;');

                        success = true;
                    }
                }
            }
        }

        if (success) {
            // Proceed with next item on the queue.
            runQueue();
        } else {
            showError('reviews');
        }
    }

    function parseDiscussionsPage(url, tableCell, text) {
        var success = false, elt, elts;

        // Convert text to DOM structure.
        elt = document.createElement('div');
        elt.innerHTML = text;

        // Find the div that contains the discussions.
        elt = getFirstElementByTagAttribute(elt, 'div', 'id', 'content');
        if (undefined !== elt) {
            elts = elt.getElementsByTagName('table');
            if (1 === elts.length) {
                elt = elts[0];
                elts = elt.getElementsByTagName('tr');

                // Most recent update is on top.  Skip the title row.
                if (1 === elts.length) {
                    elt = elts[0];
                    elt = getElementByTagAtIndex(elt, 'th', LAST_POST_COL_IDX);
                    if (undefined !== elt && elt.innerHTML === 'Last Post') {
                        // Only title row, so no last post; nothing to update.
                        success = true;
                    }
                } else if (elts.length > 1) {
                    // Last update is on top.
                    elt = elts[1];
                    elt = getElementByTagAtIndex(elt, 'td', LAST_POST_COL_IDX);
                    if (undefined !== elt) {
                        text = elt.innerHTML;
                        text = text.replace(/[\n\r]/g, '');
                        // Capture and add the info.
                        if (/(<abbr.*?<\/abbr>).*?(<small.*?<\/small>)/.
                                test(text)) {
                            var date = RegExp.$1;
                            var name = RegExp.$2;
                            tableCell.innerHTML += '<br><br>Last post:<br>' +
                                    '<nobr>' + date + '</nobr><br><nobr>' +
                                    name + '</nobr>';

                            // Looks better if there are also reviews.
                            tableCell.setAttribute('style',
                                    'vertical-align: bottom;');

                            success = true;
                        }
                    }
                }
            }
        }

        if (success) {
            // Proceed with next item on the queue.
            runQueue();
        } else {
            showError('discussions');
        }
    }

    function enhancePage() {
        var url, args, colIdx, id, addedHeader = false;
        var elt, tds, ee, elts = document.getElementsByTagName('tr');
        for (ee = 0; ee < elts.length; ee++) {
            if (/^scripts-(\d+)$/.test(elts[ee].id)) {
                id = RegExp.$1;

                tds = elts[ee].getElementsByTagName('td');

                colIdx = tds.length - RATING_COL_OFFSET;
                if (trim(tds[colIdx].innerHTML).
                        indexOf('no&nbsp;reviews') < 0) {
                    // Add request for Rating column.
                    url = 'http://userscripts.org/scripts/reviews/' + id;
                    args = [
                        url,
                        tds[colIdx],
                        parseReviewsPage
                    ];
                    queue.push(args);
                }

                colIdx = tds.length - POSTS_COL_OFFSET;
                if (0 !== parseInt(tds[colIdx].innerHTML, 10)) {
                    // Add request for Posts column.
                    url = 'http://userscripts.org/scripts/discuss/' + id;
                    args = [
                        url,
                        tds[colIdx],
                        parseDiscussionsPage
                    ];
                    queue.push(args);
                }
            } else if (!addedHeader) {
                // This is the title row.

                tds = elts[ee].getElementsByTagName('th');

                // Make sortable column headers not disappear once visited.
                for (var tt = 0; tt < tds.length; tt++) {
                    elt = getElementByTagAtIndex(tds[tt], 'a', 0);
                    if (undefined !== elt) {
                        elt.style.color = 'white';   // TODO: use a:visited.
                    }
                }
            } else {
                // Should never get here.
                showError('scripts');
            }
        }

        // Start queue.
        runQueue();
    }

    // Return publicly accessible variables and functions.
    return {
        //
        // Public functions
        // (These access private variables and functions through "closure".)
        //

        // Initialize this script.
        init: function () {
            // Enhance the page.
            enhancePage();
        }
    };
}()).init();   // Auto-run this script.
// End singleton pattern.

///////////////////////////////////////////////////////////////////////////////

