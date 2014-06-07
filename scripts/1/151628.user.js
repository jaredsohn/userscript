/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           FetLife Demographics
// @version        0.2.1
// @namespace      com.maybemaimed.fetlife.demographics
// @updateURL      https://userscripts.org/scripts/source/151628.user.js
// @description    Displays the demographics of FetLife events and user friend lists by age, sex, and role. May help you quickly determine whether an event is worth participating in or not, or whether a user is an objectifying troll.
// @include        https://fetlife.com/events/*
// @exclude        https://fetlife.com/events/*/*
// @include        https://fetlife.com/users/*
// @exclude        https://fetlife.com/users/*/*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_log
// ==/UserScript==

FL_ASL = {}; // We'll need some stock code from FetLife ASL Search.
FL_DEMOGRAPHICS = {};
FL_DEMOGRAPHICS.CONFIG = {
    'debug': false, // switch to true to debug.
};

FL_DEMOGRAPHICS.users       = {}; // stores our collected totals
FL_DEMOGRAPHICS.users.ages  = {}; // stores our collected totals by age
FL_DEMOGRAPHICS.users.sexes = {}; // stores our collected totals by sexes
FL_DEMOGRAPHICS.users.roles = {}; // stores our collected totals by roles

// Utility debugging function.
FL_DEMOGRAPHICS.log = function (msg) {
    if (!FL_DEMOGRAPHICS.CONFIG.debug) { return; }
    GM_log('FETLIFE DEMOGRAPHICS: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
GM_addStyle('\
/* Hide ages for now. */\
#fl-demographics-ages { display: none; }\
.fl-demographics-list { text-transform: capitalize; }\
.fl-demographics-list * { text-transform: none; }\
#fl-demographics-container ul ul ul {\
    display: none;\
    list-style: none;\
}\
');
FL_DEMOGRAPHICS.init = function () {
    FL_DEMOGRAPHICS.main();
};
window.addEventListener('DOMContentLoaded', FL_DEMOGRAPHICS.init);

// @see "FetLife Age/Sex/Location Search" #getKinkstersFromURL
FL_DEMOGRAPHICS.getKinkstersFromURL = function (url) {
    FL_DEMOGRAPHICS.log('Getting Kinksters list from URL: ' + url);
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': url,
        'onload': function (response) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(response.responseText, 'text/html');
            var els = doc.querySelectorAll('.user_in_list');

            result_count = 0;
            for (var i = 0; i < els.length; i++) {
                // Parse results for this page and make note of each demographic.
                // TODO: Tag source ("yes" or "maybe" RSVP) to sort later.
                // FIXME: This should actually be filtered elsewhere.
                var rsvp_type = (response.finalUrl.match(/maybe$/)) ? 'maybe' : 'yes';
                FL_DEMOGRAPHICS.parseUserInList(els[i]);
                result_count++;
            }

            // Set up next request.
            my_page = (url.match(/\d+$/)) ? parseInt(url.match(/\d+$/)[0]) : 1 ;
            next_page = my_page + 1;
            if (next_page > 2) {
                next_url = url.replace(/\d+$/, next_page.toString());
            } else {
                next_url = url + '?page=' + next_page.toString();
            }

            // No pagination? This is the end.
            if (!doc.querySelector('.previous_page')) {
                // We're done paginating, so this was the last page.
                FL_DEMOGRAPHICS.log('Done after searching ' + response.finalUrl)
                FL_DEMOGRAPHICS.displayTotals();
            } else if (!doc.querySelector('.next_page.disabled')) {
                // Automatically search on next page if not end of pagination.
                FL_DEMOGRAPHICS.getKinkstersFromURL(next_url);
                return false;
            } else {
                // We're done paginating, so this was the last page.
                FL_DEMOGRAPHICS.log('Done after searching ' + response.finalUrl)
                FL_DEMOGRAPHICS.displayTotals();
            }
        }
    });
};

FL_DEMOGRAPHICS.parseUserInList = function (el, rsvp_type) {
    var sex  = FL_ASL.getSex(el);
    var age  = FL_ASL.getAge(el);
    var role = FL_ASL.getRole(el);

    // Record this user under demographic of their sex.
    if (FL_DEMOGRAPHICS.users.sexes[sex]) {
        FL_DEMOGRAPHICS.users.sexes[sex].push({
            'html' : el,
            'rsvp' : rsvp_type
        });
    } else {
        FL_DEMOGRAPHICS.users.sexes[sex] = [{
            'html' : el,
            'rsvp' : rsvp_type
        }];
    }

    // Record this user under demographic of their age.
    if (FL_DEMOGRAPHICS.users.ages[age]) {
        FL_DEMOGRAPHICS.users.ages[age].push({
            'html' : el,
            'rsvp' : rsvp_type
        });
    } else {
        FL_DEMOGRAPHICS.users.ages[age] = [{
            'html' : el,
            'rsvp' : rsvp_type
        }];
    }

    // Record this user under demographic of their role.
    if (FL_DEMOGRAPHICS.users.roles[role]) {
        FL_DEMOGRAPHICS.users.roles[role].push({
            'html' : el,
            'rsvp' : rsvp_type
        });
    } else {
        FL_DEMOGRAPHICS.users.roles[role] = [{
            'html' : el,
            'rsvp' : rsvp_type
        }];
    }
};

FL_DEMOGRAPHICS.displayTotals = function () {
    var x = document.getElementById('fl-demographics-loading');
    x.parentNode.removeChild(x);
    var div = document.getElementById('fl-demographics-container');
    var ul = document.createElement('ul');
    var html_string = '';
    for (var key in FL_DEMOGRAPHICS.users) {
        html_string += '<li id="fl-demographics-' + key + '" class="fl-demographics-list">' + key + '<ul>';
        for (var v in FL_DEMOGRAPHICS.users[key]) {
            html_string += '<li>' + FL_DEMOGRAPHICS.users[key][v].length + ' ' + v + ' (<a href="#" class="fl-demographics-show-list">show</a>)<ul>';
            for (var x in FL_DEMOGRAPHICS.users[key][v]) {
                html_string += '<li>' + FL_DEMOGRAPHICS.users[key][v][x].html.outerHTML + '</li>';
            }
            html_string += '</ul></li>';
        }
        html_string += '</ul></li>';
    }
    ul.innerHTML = html_string;

    div.appendChild(ul);

    // Attach event handlers.
    var els = document.querySelectorAll('.fl-demographics-show-list');
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener('click', FL_DEMOGRAPHICS.toggleShowHideList);
    }
};

FL_DEMOGRAPHICS.toggleShowHideList = function (e) {
    e.preventDefault();
    var ul = e.target.nextElementSibling;
    var me = e.target.childNodes[0];
    if (ul.style.display === 'block') {
        ul.style.display = 'none';
    } else {
        ul.style.display = 'block';
    }
    if (me.nodeValue === 'show') {
        me.nodeValue = 'hide';
    } else {
        me.nodeValue = 'show';
    }
    return false;
};

// @see FetLife Age/Sex/Location
FL_ASL.getSex = function (el) {
    var x = el.querySelector('.quiet').innerHTML;
    var sex = x.match(/^\d\d(\S*)/);
    return sex[1];
};

FL_ASL.getAge = function (el) {
    var x = el.querySelector('.quiet').innerHTML;
    var age = x.match(/^\d\d/);
    return parseInt(age);
};

FL_ASL.getRole = function (el) {
    var x = el.querySelector('.quiet').innerHTML;
    var role = x.match(/ ?(\S+)?$/);
    return role[1];
};

FL_DEMOGRAPHICS.getKinkstersGoing = function (event, page) {
    var url = 'https://fetlife.com/events/' + event.toString() + '/rsvps';
    url = (page) ? url + '?page=' + page.toString() : url ;
    FL_DEMOGRAPHICS.getKinkstersFromURL(url);
};
FL_DEMOGRAPHICS.getKinkstersMaybeGoing = function (event, page) {
    var url = 'https://fetlife.com/events/' + event.toString() + '/rsvps/maybe';
    url = (page) ? url + '?page=' + page.toString() : url ;
    FL_DEMOGRAPHICS.getKinkstersFromURL(url);
};
FL_DEMOGRAPHICS.getKinkstersInFriend = function (user_id, page) {
    var url = 'https://fetlife.com/users/' + user_id.toString() + '/friends';
    url = (page) ? url + '?page=' + page.toString() : url ;
    FL_DEMOGRAPHICS.getKinkstersFromURL(url);
};

// This is the main() function, executed on page load.
FL_DEMOGRAPHICS.main = function () {
    // Find page anchor.
    html_el = document.querySelector('table.mbxxl td') || document.querySelector('.friends');
    if (!html_el) {
        FL_DEMOGRAPHICS.log('No relevant HTML found, page ' + window.location.href + ' likely not user profile or event.');
        return;
    }

    // Get object ID.
    var m = window.location.href.match(/^https:\/\/fetlife.com\/(event|user)s\/(\d+)/);
    if (!m) {
        FL_DEMOGRAPHICS.log('No user or event ID found in URL: ' + window.location.href);
        return;
    }

    var div = document.createElement('div');
    div.setAttribute('id', 'fl-demographics-container');
    div.innerHTML = 'Demographics:<div id="fl-demographics-loading">Loading&hellip;</div>';

    switch (m[1]) {
        case 'user':
            html_el.parentNode.insertBefore(div, html_el);
            var friends = FL_DEMOGRAPHICS.getKinkstersInFriend(m[2]);
        break;
        case 'event':
        default:
            html_el.appendChild(div);
            // Get the list of "yes" and "maybe" RSVPs
            var rsvp_yes = FL_DEMOGRAPHICS.getKinkstersGoing(m[2]);
            //var rsvp_maybe = FL_DEMOGRAPHICS.getKinkstersMaybeGoing(m[1]);

        break;
    }

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
