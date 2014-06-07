/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 * Changes by Schnoff: Remove auto-update, exempt login page, comment out report links with exception of profile page
 */
// ==UserScript==
// @name           Predator Alert Tool for FetLife (PAT-FetLife)
// @version        0.2.2
// @namespace      com.maybemaimed.fetlife.faade
// @updateURL      about:blank
// @description    Alerts you of people who have allegedly assaulted others as you browse FetLife. Empowers you to anonymously report a consent violation perpetrated by a FetLife user.
// @include        https://fetlife.com/*
// @exclude        https://fetlife.com/adgear/*
// @exclude        https://fetlife.com/chat/*
// @exclude        https://fetlife.com/im_sessions*
// @exclude        https://fetlife.com/polling/*
// @exclude        https://fetlife.com/login*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// ==/UserScript==
FL_ASL = {};
FL_ASL.users = {};
FL_ASL.getUserProfile = function (id) {
    if (FL_ASL.users[id]) {
        return FL_ASL.users[id].profile_html;
    } else {
        FL_ASL.users[id] = {};
        GM_xmlhttpRequest({
            'method': 'GET',
            'url': 'https://fetlife.com/users/' + id.toString(),
            'onload': function (response) {
                FL_ASL.users[id].profile_html = response.responseText;
            }
        });
    }
};

FAADE = {};
FAADE.CONFIG = {
    'debug': false, // switch to true to debug.
    'gdocs_key': '0ArYmNHuRadHbdGNVT1kzSzFnOXhHRjh1RnczZVVmMXc',
    'gform_key': 'dGNVT1kzSzFnOXhHRjh1RnczZVVmMXc6MQ',
    'gdocs_development_key': '0ArYmNHuRadHbdGxjMUhyR0FzLWJicHNXUFdxckFEQWc',
    'gform_development_key': 'dGxjMUhyR0FzLWJicHNXUFdxckFEQWc6MQ',
};

// Utility debugging function.
FAADE.log = function (msg) {
    if (!FAADE.CONFIG.debug) { return; }
    GM_log('FETLIFE FAADE: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
GM_addStyle('\
/* Highlight alleged abusers in bright yellow. */\
.faade_alleged_abuser {\
    display: inline-block;\
    border: 2px solid yellow;\
}\
#faade_abuse_reports caption {\
    background: yellow;\
    color: red;\
}\
#faade_abuse_reports tfoot td {\
    padding-top: 1em;\
    text-align: center;\
}\
#faade_abuse_reports tr:target > * {\
    border: 1px solid red;\
}\
#faade_abuse_reports tr:target th {\
    border-width: 1px 0 1px 1px;\
}\
#faade_abuse_reports tr:target td {\
    border-width: 1px 1px 1px 0;\
}\
/* FAADE location broadcast dialog styles. */\
[aria-labelledby="ui-dialog-title-faade"] { border-color: yellow; }\
#ui-dialog-title-faade { color: red; }\
/* General prettiness. */\
#profile #main_content a + a.faade_report_link { padding-left: 5px; }\
footer .faade_report_link,\
.blog_entry p.quiet.small .faade_report_link,\
.byline .faade_report_link {\
    display: block;\
    color: #777;\
}\
.mini_feed_title .faade_report_link {\
    float: left;\
    padding-right: 5px;\
}\
ul.pictures li a.faade_report_link,\
#profile ul.friends li { width: auto; }\
');
FAADE.init = function () {
    FL_ASL.getUserProfile(uw.FetLife.currentUser.id); // run early
    FAADE.injectDialog();
    FAADE.abuser_database = FAADE.getValue('abuser_database', false);
    if (FAADE.abuserDatabaseExpired()) {
        FAADE.fetchAbuserDatabase();
    }
    FAADE.main();
};
window.addEventListener('DOMContentLoaded', FAADE.init);

// Determines whether the abuser database has expired and needs to be re-fetched.
FAADE.abuserDatabaseExpired = function () {
    // If we don't have a database, then of course it's "expired."
    if (!FAADE.abuser_database) {
        FAADE.log('Abuser database expired because of false-equivalent value.');
        return true;
    } else if ( (new Date().getTime() > (parseInt(FAADE.getValue('last_fetch_time')) + 86400)) ) {
        // Abuser database was last fetched more than 24 hours (86400 seconds) ago, so refresh.
        FAADE.log('Abuser database expired because of time.');
        return true;
    } else {
        FAADE.log('Abuser database still fresh.');
        return false;
    }
};

FAADE.getDatabaseConnectionString = function () {
    return (FAADE.CONFIG.debug) ?
        FAADE.CONFIG.gdocs_development_key :
        FAADE.CONFIG.gdocs_key;
};
FAADE.getReportFormKey = function () {
    return (FAADE.CONFIG.debug) ?
        FAADE.CONFIG.gform_development_key :
        FAADE.CONFIG.gform_key;
};

FAADE.setValue = function (x, y) {
    return (FAADE.CONFIG.debug) ?
        GM_setValue(x += '_development', y) :
        GM_setValue(x, y);
};
FAADE.getValue = function (x, y) {
    if (arguments.length === 1) {
        return (FAADE.CONFIG.debug) ?
            GM_getValue(x += '_development'):
            GM_getValue(x);
    } else {
        return (FAADE.CONFIG.debug) ?
            GM_getValue(x += '_development', y):
            GM_getValue(x, y);
    }
};

FAADE.fetchAbuserDatabase = function () {
    var key = FAADE.getDatabaseConnectionString();
    var url = 'https://docs.google.com/spreadsheet/pub?key=' + key + '&output=html';
    FAADE.log('fetching abusers database from ' + url);
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': url,
        'onload': function (response) {
            if (!response.finalUrl.match(/^https:\/\/docs.google.com\/spreadsheet\/pub/)) {
                FAADE.log('Failed to fetch abuser database from ' + url);
                return false;
            }
            FAADE.setValue('last_fetch_time', new Date().getTime().toString()); // timestamp this fetch
            FAADE.setValue('abuser_database', response.responseText);
            FAADE.abuser_database = FAADE.getValue('abuser_database');
        }
    });
};

FAADE.injectDialog = function () {
    // Inject hidden dialog box link.
    var trigger_el = document.createElement('a');
    trigger_el.setAttribute('class', 'opens-modal');
    trigger_el.setAttribute('data-opens-modal', 'faade');
    document.body.appendChild(trigger_el);

    // Inject dialog box HTML. FetLife currently uses Rails 3, so mimic that.
    // See, for instance, Rails Behaviors: http://josh.github.com/rails-behaviors/
    var faade_dialog = document.createElement('div');
    faade_dialog.setAttribute('style', 'display: none; position: absolute; overflow: hidden; z-index: 1000; outline: 0px none;');
    faade_dialog.setAttribute('class', 'ui-dialog ui-widget ui-widget-content ui-corner-all');
    faade_dialog.setAttribute('tabindex', '-1');
    faade_dialog.setAttribute('role', 'dialog');
    faade_dialog.setAttribute('aria-labelledby', 'ui-dialog-title-faade');
    var html_string = '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" unselectable="on" style="-moz-user-select: none;">';
    html_string += '<span class="ui-dialog-title" id="ui-dialog-title-faade" unselectable="on" style="-moz-user-select: none;">Predator Alert Tool for FetLife (PAT-FetLife)</span>';
    html_string += '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button" unselectable="on" style="-moz-user-select: none;">';
    html_string += '<span class="ui-icon ui-icon-closethick" unselectable="on" style="-moz-user-select: none;">close</span>';
    html_string += '</a>';
    html_string += '</div>';
    html_string += '<div data-modal-title="Predator Alert Tool for FetLife (PAT-FetLife)" data-modal-height="280" data-modal-auto-open="false" class="modal ui-dialog-content ui-widget-content" id="faade">';
    html_string += '<p class="mbm">There have been <span id="faade_reports_to_alert">X</span> new consent violations filed to the Predator Alert Tool for FetLife that may have been perpetrated near your location (<span id="faade_user_loc">X, X, X</span>).</p>';
    html_string += '<p>Click "View new nearby PAT-FetLife reports" to view the profiles of the people who have been accused of consent violations near your area in new tabs.</p>';
    html_string += '<p id="faade-actions" class="ac">';
    html_string += '<a rel="nofollow" class="btnsqr close" data-closes-modal="faade" href="#">View new nearby PAT-FetLife reports</a>';
    html_string += '<span class="i s q">&nbsp;-or-&nbsp;</span>';
    html_string += '<a data-closes-modal="faade" class="close tdn q" href="#">Cancel</a>';
    html_string += '</p>';
    html_string += '<p>(Don\'t worry, I\'m not looking for where you actually are. Your location was determined from your FetLife profile.)</p>';
    html_string += '</div>';
    faade_dialog.innerHTML = html_string;
    document.body.appendChild(faade_dialog);

    // Attach event listener to trigger element.
    document.querySelector('[data-opens-modal="faade"]').addEventListener('click', function (e) {
        document.querySelector('[data-opens-modal="faade"]').dialog("open");
    });
};

FAADE.getLocationFromProfileHtml = function (html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('h2.bottom + p > em').textContent.split(', '); // split with comma AND space
};

FAADE.broadcastNewProximalReports = function (doc) {
    // Recall timestamp of last record checked.
    var last_timestamp_checked = parseInt(FAADE.getValue('last_timestamp_checked', '0')); // default is "never!"
    // Get latest timestamp in stored alleged abuser database.
    var rows = doc.querySelectorAll('#tblMain tr'); // read in every report, in full
    var latest_timestamp_filed = Date.parse(rows[rows.length - 1].childNodes[1].textContent);

    // If never checked, or if there are new records since last timestamp checked
    if (last_timestamp_checked < latest_timestamp_filed) {
        FAADE.log('Last timestamp checked (' + last_timestamp_checked.toString() + ') is older than latest timestamp filed (' + latest_timestamp_filed.toString() + ').');

        // count how many new records there are since last check
        var num_reports = 0;
        for (var i = rows.length - 1; i > 0; i--) {
            if (Date.parse(rows[i].childNodes[1].textContent) > last_timestamp_checked) {
                num_reports++;
            } else {
                break; // we've reached the timestamps we've already checked, we're done
            }
        }
        FAADE.log('Total of ' + num_reports + ' new reports since last check.');

        var user_loc = FAADE.getLocationFromProfileHtml(FL_ASL.users[uw.FetLife.currentUser.id].profile_html);
        FAADE.log('Current user location seems to be ' + user_loc.join(', ') + '.');

        // Loop over all new records one by one
        var reports_to_alert = [];
        for (var i = rows.length - num_reports; i <= rows.length - 1; i++) {
            // extract the location data from the report
            report_loc = rows[i].childNodes[6].textContent;
            // compare current user's FetLife profile location against alleged abuse location
            // and test each substring of the user profile against the reported location
            for (var z = 0; z < user_loc.length; z++) {
                // if a relevant case insensitive substring matches
                if (-1 !== report_loc.toLowerCase().search(user_loc[z].toLowerCase())) {
                    FAADE.log('Filed report location ' + report_loc + ' matches user location substring ' + user_loc[z] + '!');
                    // store for future pop-up
                    reports_to_alert.push(rows[i]);
                    break; // we found a match, so stop trying on this row
                }
            }
        }

        // Ask user to view the profiles of the alleged abusers in the user's local vicinity.
        if (reports_to_alert.length) {
            // Fill in the user-facing message with the appropriate info.
            document.getElementById('faade_reports_to_alert').innerHTML = reports_to_alert.length.toString();
            document.getElementById('faade_user_loc').innerHTML = user_loc.join(', ');
            // Create the click event we're going to use.
            var evt = document.createEvent('MouseEvents');
            evt.initEvent('click', true, false); // can bubble, can't be cancelled
            // "Click" event on hidden code.
            document.querySelector('a[data-opens-modal="faade"]').dispatchEvent(evt);
            // Attach event listener to "View" button and pass in appropriate URLs.
            document.querySelector('.btnsqr[data-closes-modal="faade"]').addEventListener('click', function () {
                for (var i = 0; i < reports_to_alert.length; i++) {
                    // TODO: Add the permalink to the specific report to this URL, so it's highlighted when opened.
                    var url = 'https://fetlife.com/users/';
                    GM_openInTab(url + reports_to_alert[i].childNodes[2].textContent.match(/\d+/)[0]);
                }
            });
        }
    }

    // Make a note of the latest timestamp filed, so we start here next time we're loaded.
    FAADE.setValue('last_timestamp_checked', latest_timestamp_filed.toString());
};

// This is the main() function, executed on page load.
FAADE.main = function () {
    // Make a list of known alleged abuser user IDs.
    var parser = new DOMParser();
    var doc = parser.parseFromString(FAADE.abuser_database, 'text/html');
    var els = doc.querySelectorAll('#tblMain td:nth-child(3)'); // third child is the column of IDs.
    var abuser_ids = [];
    for (var i = 1; i < els.length; i++) { // we never need the first (0'th) cell because Google provides it blank.
        abuser_ids.push(els[i].innerHTML);
    }
    FAADE.log('recalled abuser ids ' + abuser_ids);

    // TODO: Refactor this, it's kludgy.
    setTimeout(function() {
        FAADE.log('Running time-delayed function.');
        if (FL_ASL.users[uw.FetLife.currentUser.id].profile_html) {
            FAADE.log('We have the current user\'s FetLife profile HTML. Running broadcast checks.');
            FAADE.broadcastNewProximalReports(doc);
        }
    }, 5000); // give us a few seconds to grab the current user's FetLife profile HTML.

    // Are we on a user profile page?
    if (window.location.href.match(/users\/(\d+)\/?$/)) {

        var profile_nick = document.querySelector('h2.bottom').childNodes[0].textContent.match(/\S+/)[0];
        var id_in_url = window.location.href.match(/users\/(\d+)\/?$/)[1];

        // If we're not viewing our own profile page, insert a report link.
        usr_ops = document.querySelector('#main_content p.quiet');
        if (usr_ops) {
            usr_ops.appendChild(document.createElement('br'));
            usr_ops.appendChild(FAADE.createAbuseReportLink(id_in_url, profile_nick));
        }

        // If this is a profile page of an alleged abuser,
        if (-1 !== abuser_ids.indexOf(id_in_url)) {

            var report_el = document.createElement('table');
            report_el.setAttribute('id', 'faade_abuse_reports');
            report_el.setAttribute('summary', 'Reported consent violations committed by ' + profile_nick + '.');
            var caption = document.createElement('caption');
            caption.innerHTML = 'There are reports ' + profile_nick + ' violated others\' consent in these ways:';
            var tfoot = document.createElement('tfoot');
            tfoot.innerHTML = '<tr><td colspan="2"></td></tr>';
            tfoot.querySelector('td').appendChild(FAADE.createAbuseReportLink(id_in_url, profile_nick));
            report_el.appendChild(caption);
            report_el.appendChild(tfoot);

            // Find all reports that match ID number.
            var abuse_reports = [];
            for (var ix = 0; ix < els.length; ix++) {
                if (id_in_url === els[ix].innerHTML) {
                    abuse_reports.push(els[ix].parentNode); // the table row of abuse report
                }
            }
            // Add this information to the top of this user's profile
            for (var iy = 0; iy < abuse_reports.length; iy++) {
                var num = iy + 1;
                var tr = document.createElement('tr');
                tr.setAttribute('id', 'faade_abuse_report-' + num.toString());
                var details_html = '<ul><li class="faade_abuse_report_datetime">' + abuse_reports[iy].childNodes[7].innerHTML + '</li>';
                details_html += '<li class="faade_abuse_report_location">' + abuse_reports[iy].childNodes[6].innerHTML + '</li></ul>';
                var permalink_html = '<a class="faade_abuse_reported_datetime" rel="bookmark" href="'
                    + window.location + '#faade_abuse_report-' + num.toString()
                    + '" title="Permalink for PAT-FetLife abuse report number ' + num.toString() + ' against '
                    + profile_nick + '.">' +  abuse_reports[iy].childNodes[1].innerHTML + '</a>';
                tr.innerHTML += '<th>Abuse report ' + num.toString() + ' (' + permalink_html + '):' + details_html + '</th>';
                tr.innerHTML += '<td>' + abuse_reports[iy].childNodes[5].innerHTML + '</td>';
                report_el.appendChild(tr);
            }

            var before = document.querySelector('#main_content table:last-child');
            before.parentNode.insertBefore(report_el, before);
        }

    }

    // Collect all user links on this page.
    var user_links = [];
    for (i = 0; i < document.links.length; i++) {
        var l = document.links[i].href.match(/^(https:\/\/fetlife.com)?\/users\/(\d+)\/?$/);
        if ( l && (l[2] !== uw.FetLife.currentUser.id.toString()) ) {
            user_links.push(document.links[i]);
        }
    }

    // For each user ID found,
    var last_id = null;
    for (i = 0; i < user_links.length; i++) {
        // Collect its user ID number.
        var id = user_links[i].href.match(/\d+\/?$/);
        if (id) { id = id.toString(); } // cast to string for later comparison

        // Get nickname.
        var n;
        if (user_links[i].children.length) {
            // This is an avatar link, not a text link.
            n = user_links[i].childNodes[0].alt;
        } else {
            // This is a text link. Easy.
            n = user_links[i].innerHTML;
        }

        // check the alleged abusers data store for a match.
        if (-1 !== abuser_ids.indexOf(id)) {
            FAADE.log('found match on this page for alleged abuser ID number ' + id);
            // highlight the user's links that matched an alleged abuser using CSS
            user_links[i].setAttribute('class', user_links[i].className + ' faade_alleged_abuser');

        }

        // Don't create another link if we just made one for that user.
        if (id === last_id) { continue; }

        // Offer a link to add another report for this user.
        // See also: https://support.google.com/docs/bin/answer.py?hl=en&answer=160000
        // Add link to report this user for a consent violation.
        //var a = FAADE.createAbuseReportLink(id, n);
        //user_links[i].parentNode.appendChild(a);
        last_id = id;
    }
};

FAADE.createAbuseReportLink = function (id, nick) {
    var a = document.createElement('a');
    a.setAttribute('class', 'faade_report_link');
    a.setAttribute('target', '_blank');
    var href = 'https://docs.google.com/spreadsheet/viewform?formkey=' + FAADE.getReportFormKey();
    href += '&entry_0=' + id;
    href += '&entry_1=' + nick;
    a.setAttribute('href', href);
    a.innerHTML = '(report a consent violation by ' + nick + ')';
    return a;
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
