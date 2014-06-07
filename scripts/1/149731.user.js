/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           FetLife Spyscope
// @version        0.1.1
// @namespace      http://maybemaimed.com/playground/fetlife-spyscope/
// @updateURL      http://userscripts.org/scripts/source/149731.user.js
// @description    Hover over FetLife user avatar pictures to see their recent activity, vitals, group subscriptions, and more. Quickly discern whether they're worth talking back to or not.
// @include        https://fetlife.com/*
// @exclude        https://fetlife.com/adgear/*
// @exclude        https://fetlife.com/chat/*
// @exclude        https://fetlife.com/im_sessions*
// @exclude        https://fetlife.com/polling/*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

FL_SPYSCOPE = {};
FL_SPYSCOPE.CONFIG = {
    'debug': false, // switch to true to debug.
};

// Utility debugging function.
FL_SPYSCOPE.log = function (msg) {
    if (!FL_SPYSCOPE.CONFIG.debug) { return; }
    GM_log('FETLIFE SPYSCOPE: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
GM_addStyle('\
.fl-spyscope {\
    border: 1px solid gray;\
    max-width: 500px;\
}\
.group_mods .fl-spyscope {\
    float: left;\
}\
.post .fl-spyscope,\
.pictures .fl-spyscope,\
.friends .fl-spyscope {\
    position: absolute;\
    background: black;\
}\
.post .last_comment .fl-spyscope {\
    position: static;\
}\
/* Events page and friends lists. */\
.pictures > li,\
.friends > li { position: relative; }\
.pictures .fl-spyscope,\
.friends .fl-spyscope { z-index: 100; }\
.pictures .fl-spyscope { top: 60px; }\
.friends .fl-spyscope { top: 40px; }\
.pictures .fl-spyscope li,\
#profile .friends .fl-spyscope li { width: 300px; }\
.pictures .fl-spyscope a { float: none; }\
#profile .friends .fl-spyscope a { display: inline; }\
.friends .fl-spyscope img { float: none; }\
');
FL_SPYSCOPE.users_cache = {};
FL_SPYSCOPE.init = function () {
    FL_SPYSCOPE.main();
};
window.addEventListener('DOMContentLoaded', FL_SPYSCOPE.init);

/**
 * Given a user ID, fetch and store the complete FetLife profile HTML for this user.
 *
 * @see https://userscripts.org/scripts/review/146293#function.FL_SPYSCOPE.getUserProfile
 */
FL_SPYSCOPE.fetchUserProfile = function (id) {
    if (FL_SPYSCOPE.users_cache[id].profile_html) {
        return; // we've already got a cache, so don't do this again.
    }
    FL_SPYSCOPE.users_cache[id] = {};
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': 'https://fetlife.com/users/' + id.toString(),
        'onload': function (response) {
            // Get profile HTML.
            var html = response.responseText;
            // Store it in a local cache?
            FL_SPYSCOPE.users_cache[id].profile_html = html;

            // Parse the returned profile HTML and save relevant info.
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            // NOTE: We collect the nickname in the FL_SPYSCOPE.main() function, since we can.
            //FL_SPYSCOPE.users_cache[id].nickname = FL_SPYSCOPE.getSex(doc.querySelector('.bottom').childNodes[0].nodeValue);
            FL_SPYSCOPE.users_cache[id].sex      = FL_SPYSCOPE.getSex(doc.querySelector('.bottom'));
            FL_SPYSCOPE.users_cache[id].age      = FL_SPYSCOPE.getAge(doc.querySelector('.bottom'));
            FL_SPYSCOPE.users_cache[id].role     = FL_SPYSCOPE.getRole(doc.querySelector('.bottom'));
            FL_SPYSCOPE.users_cache[id].loc_str  = doc.querySelector('.bottom + p').innerHTML;
            FL_SPYSCOPE.users_cache[id].activity = doc.querySelector('#mini_feed');
        }
    });
};

/**
 * Various user info parsing functions.
 *
 * @see https://userscripts.org/scripts/review/146293#function.FL_SPYSCOPE.getSex
 */
FL_SPYSCOPE.getSex = function (el) {
    x = el.querySelector('.quiet').innerHTML;
    sex = x.match(/^\d\d(\S*)/);
    return sex[1];
};

FL_SPYSCOPE.getAge = function (el) {
    x = el.querySelector('.quiet').innerHTML;
    age = x.match(/^\d\d/);
    return parseInt(age);
};

FL_SPYSCOPE.getRole = function (el) {
    x = el.querySelector('.quiet').innerHTML;
    role = x.match(/ ?(\S+)?$/);
    return role[1];
};

FL_SPYSCOPE.createScope = function (id) {
    var div = document.createElement('div');
    div.setAttribute('class', 'fl-spyscope');
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    var html_str = '';
    // Fill list items appropriately.
    html_str += FL_SPYSCOPE.users_cache[id].age;
    html_str += FL_SPYSCOPE.users_cache[id].sex;
    html_str += ' ';
    html_str += FL_SPYSCOPE.users_cache[id].role;
    html_str += ' (' + FL_SPYSCOPE.users_cache[id].loc_str + ')';
    li.innerHTML = html_str;

    ul.appendChild(li);
    div.appendChild(ul);

    // Show last three items from "Latest activity" mini feed.
    var acts = FL_SPYSCOPE.users_cache[id].activity.children;
    div.innerHTML += '<ul><li>' + acts[0].innerHTML + '</li><li>' + acts[1].innerHTML + '</li><li>' + acts[2].innerHTML + '</li></ul>';

    return div;
};

/**
 * Handles spyscope rollovers.
 */
FL_SPYSCOPE.show = function (e) {
    scope = FL_SPYSCOPE.createScope(parseInt(e.currentTarget.href.match(/\d+$/)));
    e.currentTarget.parentNode.appendChild(scope);
};
FL_SPYSCOPE.hide = function (e) {
    var scope = e.currentTarget.parentNode.lastChild;
    scope.parentNode.removeChild(scope);
};

// This is the main() function, executed on page load.
FL_SPYSCOPE.main = function () {
    // Find all FetLife users on this page that aren't the current (logged-in) user.
    var user_links = document.querySelectorAll('a[href^="/users/"]:not([href^="/users/' + uw.FetLife.currentUser.id + '"])');
    // For each user,
    for (var i = 0; i < user_links.length; i++) {
        // Collect its user ID number.
        var id = parseInt(user_links[i].href.match(/(\d+)\/?$/));
        FL_SPYSCOPE.users_cache[id] = {};
        if (null !== id) {
            // Gather profile data for this user.

            // Get nickname.
            var n;
            if (user_links[i].children.length) {
                // This is an avatar link, not a text link.
                n = user_links[i].childNodes[0].alt;
            } else {
                // This is a text link. Easy.
                n = user_links[i].innerHTML;
            }
            FL_SPYSCOPE.users_cache[id].nickname = n;

            // Collect age/sex/role/location.
            // TODO: Loading them all on page load really slows things down.
            //       Can we optimize so that we fetch on rollover rather than load?
            FL_SPYSCOPE.fetchUserProfile(id);
        }
        // Attach the spyscope show/hide event handler.
        user_links[i].addEventListener('mouseover', FL_SPYSCOPE.show);
        user_links[i].addEventListener('mouseout', FL_SPYSCOPE.hide);
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
