/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           FetLife Text Search
// @version        0.1.1
// @namespace      com.maybemaimed.fetlife.textsearch
// @updateURL      https://userscripts.org/scripts/source/152135.user.js
// @description    Searches through FetLife group discussions for a specific keyword or phrase.
// @include        https://fetlife.com/groups*
// @exclude        https://fetlife.com/adgear/*
// @exclude        https://fetlife.com/chat/*
// @exclude        https://fetlife.com/im_sessions*
// @exclude        https://fetlife.com/polling/*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_log
// ==/UserScript==

FL_TXT = {};
FL_TXT.CONFIG = {
    'debug': false, // switch to true to debug.
};

// Utility debugging function.
FL_TXT.log = function (msg) {
    if (!FL_TXT.CONFIG.debug) { return; }
    GM_log('FETLIFE TEXT SEARCH: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
GM_addStyle('\
#tabnav li:last-child { position: relative; }\
#tabnav li:last-child div {\
    opacity: .95;\
    display: none;\
    position: absolute;\
    background: gray;\
    width: 930px;\
    min-height: 125px;\
    padding: 3px 10px;\
}\
#tabnav li:last-child input[type="text"] { width: 100%; }\
#tabnav #fetlife_text_search_results li {\
    opacity: 1;\
    display: list-item;\
    margin: 1em 0;\
    clear: left;\
}\
#tabnav #fetlife_text_search_results .avatar { float: left; }\
#tabnav #fetlife_text_search_results .permalink {\
    font-weight: normal;\
    background-color: transparent;\
    padding: 0;\
    border: none;\
    color: black;\
    line-height: 1.3em;\
}\
.comment::target { border: 1px solid red; }\
');
FL_TXT.init = function () {
    FL_TXT.currentSearch = {};
    FL_TXT.CONFIG.search_form = document.getElementById('tabnav');
    FL_TXT.main();
};
window.addEventListener('DOMContentLoaded', FL_TXT.init);

FL_TXT.getPageFromURL = function (url) {
    FL_TXT.log('Getting page from URL: ' + url);
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': url,
        'onload': function (response) {

            // Parse page now to find pagination, in a moment.
            var parser = new DOMParser();
            var doc = parser.parseFromString(response.responseText, 'text/html');

            // Set up next request.
            my_page = (url.match(/\?page=\d+$/)) ? parseInt(url.match(/\d+$/)[0]) : 1 ;
            next_page = my_page + 1;
            if (next_page > 2) {
                next_url = url.replace(/\d+$/, next_page.toString());
            } else {
                next_url = url + '?page=' + next_page.toString();
            }

            // If this was a discussion listing page
            if (!url.match(/group_posts/)) {
                // Make a list of links to each thread, and recurse on those.
                var as = doc.querySelectorAll('#discussions h4 a');
                for (var i = 0; i < as.length; i++) {
                    FL_TXT.getPageFromURL(as[i].href);
                }

                // Check for pagination on discussion lists, follow if necessary.
                if (FL_TXT.isPaginated(doc)) {
                    FL_TXT.getPageFromURL(next_url);
                }
                return;
            }

            // Search group post content, too, if on first page.
            if (my_page === 1 && (-1 !== doc.querySelector('.group_post').textContent.toLowerCase().search(FL_TXT.currentSearch.search_string.toLowerCase()))) {
                FL_TXT.displayResult(doc.querySelector('.group_post'), doc.querySelector('.group_post').textContent.toLowerCase().search(FL_TXT.currentSearch.search_string.toLowerCase()), url);
            }

            var els = doc.querySelectorAll('.comment');

            result_count = 0;
            for (var i = 0; i < els.length; i++) {
                // Parse results for this page and make note of any search string hits.
                var x = els[i].textContent.toLowerCase().search(FL_TXT.currentSearch.search_string.toLowerCase());
                if (-1 !== x) {
                    FL_TXT.displayResult(els[i], x, url);
                }
                result_count++;
            }

            // Check for pagination of group thread itself, follow.
            if (FL_TXT.isPaginated(doc)) {
                FL_TXT.getPageFromURL(next_url);
            }
        }
    });
};

FL_TXT.isPaginated = function (doc) {
    if (!doc.querySelector('.pagination')) {
        return false;
    } else if (!doc.querySelector('.pagination .next_page.disabled')) {
        return true;
    } else {
        return false;
    }
};

FL_TXT.toggleSearchInterface = function (e) {
    var lis = e.target.parentNode.parentNode.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = lis[i].className.replace('in_section', '');
    }
    e.target.parentNode.className = "in_section";
    e.target.nextSibling.style.display = 'block';
};

FL_TXT.getGroupName = function () {
    return document.querySelector('.group_name a').innerHTML;
};

FL_TXT.doTextSearch = function (e) {
    e.preventDefault();
    var group_id = document.getElementById('fetlife_text_search_group_id').value;
    var search_string = document.getElementById('fetlife_text_search').value;
    FL_TXT.currentSearch.search_string = search_string;
    switch (e.explicitOriginalTarget.value) {
        case 'Search all discussions.':
            FL_TXT.searchGroup(search_string, group_id);
            break;
        case 'Search this thread.':
        default:
            var group_post_id = document.getElementById('fetlife_text_search_group_post_id').value;
            FL_TXT.searchGroup(search_string, group_id, group_post_id);
            break;
    };
};

FL_TXT.searchGroup = function (str, group_id, group_post_id) {
    var url = 'https://fetlife.com/groups/' + group_id;
    if (group_post_id) {
        url += '/group_posts/' + group_post_id;
    }
    FL_TXT.getPageFromURL(url);
};

FL_TXT.displayResult = function (el, pos, url) {
    var ul = document.getElementById('fetlife_text_search_results');
    var li = document.createElement('li');

    var icon = el.querySelector('.avatar');
    var nick = el.querySelector('.nickname');
    var permalink = url;
    if (el.getAttribute('id')) {
        url += '#' + el.getAttribute('id');
    }

    var start = (100 > pos) ? 0 : pos - 100;
    var end = pos + 100;
    var html_string = '<a href="' + permalink + '" class="permalink">' + icon.innerHTML + ': ' + el.textContent.substring(start, end) + '</a>';

    li.innerHTML = html_string;
    ul.appendChild(li);
};

// This is the main() function, executed on page load.
FL_TXT.main = function () {
    // Get relevant object IDs.
    var group_id, group_post_id;
    var m = window.location.href.match(/https:\/\/fetlife\.com\/groups\/(\d+)(\/group_posts\/(\d+))?/);
    if (!m) {
        FL_TXT.log('Failed to find FetLife Group ID or group post ID in ' + window.location.href);
        return false;
    } else {
        group_id = m[1];
        group_post_id = m[3];
    }

    // Insert FetLife Text Search button interface.
    var li = document.createElement('li');
    li.setAttribute('id', 'tab-text-search');
    var a  = document.createElement('a');
    a.setAttribute('href', '#');
    a.addEventListener('click', FL_TXT.toggleSearchInterface);
    a.innerHTML = 'Search ' + this.getGroupName();
    li.appendChild(a);

    var div = document.createElement('div');
    var form = document.createElement('form');
    form.setAttribute('action', window.location.href)
    form.setAttribute('method', 'GET');
    form.addEventListener('submit', FL_TXT.doTextSearch);
    var html_string = '<input type="hidden" id="fetlife_text_search_group_id" name="fetlife_text_search_group_id" value="' + group_id + '" />';
    html_string += '<label><input type="text" id="fetlife_text_search" name="fetlife_text_search" value="" placeholder="Search for&hellip;"/></label>';
    html_string += '<input type="submit" name="fetlife_text_search_discussions" value="Search all discussions." />';
    // If this is a specific discussion, offer to search only within that discussion thread.
    if (group_post_id) {
        html_string += '<input type="submit" name="fetlife_text_search_this_thread" value="Search this thread." />';
        html_string += '<input type="hidden" id="fetlife_text_search_group_post_id" name="fetlife_text_search_group_post_id" value="' + group_post_id + '" />';
    }
    form.innerHTML = html_string;

    div.appendChild(form);
    li.appendChild(div);
    document.getElementById('tabnav').appendChild(li);

    var ul = document.createElement('ul');
    ul.setAttribute('id', 'fetlife_text_search_results');
    div.appendChild(ul);
};

// The following is required for Chrome compatibility, as we need "text/html" parsing.
/*
 * DOMParser HTML extension
 * 2012-09-04
 *
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/

(function(DOMParser) {
	"use strict";

	var
	  DOMParser_proto = DOMParser.prototype
	, real_parseFromString = DOMParser_proto.parseFromString
	;

	// Firefox/Opera/IE throw errors on unsupported types
	try {
		// WebKit returns null on unsupported types
		if ((new DOMParser).parseFromString("", "text/html")) {
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}

	DOMParser_proto.parseFromString = function(markup, type) {
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var
			  doc = document.implementation.createHTMLDocument("")
			;

			doc.body.innerHTML = markup;
			return doc;
		} else {
			return real_parseFromString.apply(this, arguments);
		}
	};
}(DOMParser));
