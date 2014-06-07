/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * Predator Alert Tool for OkCupid
 *
 * Written in 2013 by Meitar Moscovitz <meitar@maymay.net>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright
 * and related and neighboring rights to this software to the public domain
 * worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along
 * with this software. If not, see
 *     http://creativecommons.org/publicdomain/zero/1.0/
 *
 * @author Anonymous
 */
// ==UserScript==
// @name           Question Highlight Tool for OkCupid
// @version        0.3
// @description    Shows the answers to questions on okcupid profiles according to a question list in the source.
// @include        http://www.okcupid.com/*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// ==/UserScript==

var OKCPAT = {};
OKCPAT.CONFIG = {
    'debug': false, // switch to true to debug.
    'version': '0.3', // used to perform clean up, etc. during init()
    'storage_server_url': 'http://okcupid-pat.appspot.com/okcupid_pat', // Our centralized database.
    'storage_server_url_development': 'http://localhost:8080/okcupid_pat', // A dev server, for when 'debug' is true.
    'red_flag_suggestion_form_url': 'https://docs.google.com/forms/d/15zyiFLP71Qtl6eVtACjg2SIaV9ZKAv3DpcK0d_9_Qnc/viewform',
    'red_flag_suggestion_form_url_development': 'https://docs.google.com/forms/d/1vddPhUKBq08yhaWgCQvtMCWoUA6YFIFV9rH9OAz9PsM/viewform',
    // TODO: A configuration option to select active sets?
    //'active_topics': [], // List of topics to match questions against.
    // Define list of flagged Lisak and Miller Q&A's by OkCupid Question IDs.
    // TODO: Define more, topical "flagged_qs_*" sets of alert-worthy Q&A's.
    'flagged_qs': {
        // QID : Answer
        // These are the critical Lisak and Miller questions with "Yes." and "No." answers.
        421567 : 'Yes',
        423365 : 'Yes',
        421568 : 'Yes',
        421570 : 'Yes',
        421572 : 'Yes',
        421574 : 'Yes',
        421577 : 'Yes',
        423366 : 'Yes',
        423369 : 'Yes',
        // And these are the gradiated McWhorter questions. McWhorter's study asks for answers on
        // an 11-point scale, but OkCupid only allows a maximum of 4 possible answers.
        430229 : [
            "Yes, once.",
            "Yes, a few times. (2 to 4 attempts.)",
            "Yes, many times. (5 or more attempts.)"
        ],
        428187 : [
            "Yes, once.",
            "Yes, a few times. (2 to 4 attempts.)",
            "Yes, many times. (5 or more attempts.)"
        ],
        428188 : [
            "Yes, once.",
            "Yes, a few times. (2 to 4 attempts.)",
            "Yes, many times. (5 or more attempts.)"
        ],
        430230 : [
            "Yes, once.",
            "Yes, a few times. (2 to 4 attempts.)",
            "Yes, many times. (5 or more attempts.)"
        ],
        430232 : [
            "Yes, once.",
            "Yes, a few times. (2 to 4 attempts.)",
            "Yes, many times. (5 or more attempts.)"
        ],
        // These are additional concerning questions regarding sexual consent.
        21527 : 'Yes', // Do you feel there are any circumstances in which a person is obligated to have sex with you?
        19162 : [ // No means NO!
            "Mostly, occasionally it's really a Yes in disguise",
            "A No is just a Yes that needs a little convincing!",
            "Never, they all want me. They just don't know it."
        ],
        8218 : [ // Would you ever film a sexual encounter without your partner knowing?
            "Yes",
            "I'm Not Sure"
        ],
        // These are additional concerning questions which could eventually be
        // moved to their own sets once that feature is implemented.
        55349 : 'Yes.', // Have you ever thrown an object in anger during an argument?
        36624 : [ // Are you ever violent with your friends?
            'Yes, I use physical force whenever I want.',
            'Yes, but only playfully or in jest.'
        ],
        48947 : 'Yes.', // Is intoxication ever an acceptable excuse for acting stupid?
        // Added by User
        39373 : [ // How often do you do things out of spite?
            'Very often.',
            'Sometimes'
        ],
		18979 : [ // If you found out your partner was cheating on you, would you cheat on them in revenge?
			'Yes, they have it coming!',
			'No, I\'d dump them on the spot.',
			'Maybe, if one of their friends is cute.'
		]
    }
};

// Utility debugging function.
OKCPAT.log = function (msg) {
    if (!OKCPAT.CONFIG.debug) { return; }
    GM_log('PAT-OkCupid: ' + msg);
};

// Initializations.
// Don't run in frames.
if (window.top !== window.self) {
    OKCPAT.log('In frame on page ' + window.location.href + ' (Aborting.)');
    return;
}
var uw = unsafeWindow || window; // Help with Chrome compatibility?
GM_addStyle('\
.okcpat_red_flagged, #okcpat_warning { border: 3px solid red; }\
#okcpat_warning { padding: 25px; }\
#okcpat_warning p { margin: 1em 0; }\
#okcpat_warning dl { counter-reset: item; }\
#okcpat_warning dt:before {\
    counter-increment: item;\
    content: counter(item)". ";\
}\
#okcpat_warning dd { margin: 0 0 1em 3em; }\
#okcpat-first_run p { margin: 1em 0; }\
#okcpat-first_run ul {\
    margin: 0 2em;\
    list-style-type: disc;\
}\
');
OKCPAT.init = function () {
    OKCPAT.main();
};
window.addEventListener('DOMContentLoaded', OKCPAT.init);

OKCPAT.getServerUrl = function (path) {
    path = path || '';
    return (OKCPAT.CONFIG.debug) ?
        OKCPAT.CONFIG.storage_server_url_development + path:
        OKCPAT.CONFIG.storage_server_url + path;
};
OKCPAT.getSuggestionFormUrl = function () {
    return (OKCPAT.CONFIG.debug) ?
        OKCPAT.CONFIG.red_flag_suggestion_form_url_development:
        OKCPAT.CONFIG.red_flag_suggestion_form_url;
};
OKCPAT.setValue = function (x, y) {
    return (OKCPAT.CONFIG.debug) ?
        GM_setValue(x += '_development', y) :
        GM_setValue(x, y);
};
OKCPAT.getValue = function (x, y) {
    if (arguments.length === 1) {
        return (OKCPAT.CONFIG.debug) ?
            GM_getValue(x += '_development'):
            GM_getValue(x);
    } else {
        return (OKCPAT.CONFIG.debug) ?
            GM_getValue(x += '_development', y):
            GM_getValue(x, y);
    }
};
OKCPAT.deleteValue = function (x) {
    return (OKCPAT.CONFIG.debug) ?
        GM_deleteValue(x += '_development'):
        GM_deleteValue(x);
};

OKCPAT.getFlaggedQs = function () {
    return OKCPAT.CONFIG['flagged_qs'];
};

OKCPAT.makeMatchQuestionsPermalinks = function () {
    var els = document.querySelectorAll('#questions .qtext');
    for (var i = 0; i < els.length; i++) {
        var txt = els[i].innerHTML;
        var qid = els[i].getAttribute('id').split('_')[1];
        var a_html = '<a href="/questions?rqid=' + encodeURIComponent(qid.toString()) + '">' + txt + '</a>';
        els[i].innerHTML = a_html;
    }
};

// This expects JSON-formatted data.
// TODO: Add some error-handling to these functions?
OKCPAT.saveLocally = function (key, data) {
    return OKCPAT.setValue(key, JSON.stringify(data));
};
OKCPAT.readLocally = function (key) {
    return (OKCPAT.getValue(key)) ?
        JSON.parse(OKCPAT.getValue(key)):
        false;
};
OKCPAT.deleteLocally = function (key) {
    return OKCPAT.deleteValue(key);
};

// NOTE: "target" = other user, "my" = logged-in user
OKCPAT.getMyUserId = function () {
    return uw.CURRENTUSERID;
};
OKCPAT.getMyScreenname = function () {
    return uw.SCREENNAME;
};
OKCPAT.getTargetUserId = function (html) {
    if (!html) {
        OKCPAT.log('No HTML source code string passed, using active script values.');
        return uw.user_info.userid;
    } else {
        OKCPAT.log('An HTML source code string was passed, parsing string values.');
        var m = html.match(/"userid"\s*:\s*"(\d+)"/);
        return (m) ? m[1] : false ;
    }
};
OKCPAT.getTargetScreenname = function () {
    return uw.user_info.screenname;
};
OKCPAT.isTargetMe = function () {
    return (this.getMyUserId() === this.getTargetUserId()) ? true : false;
};

// Scrape a page of Match Questions for a particular screenname, then recurse.
// Note this sends JSON data to the server in batches of up to 10 questions.
OKCPAT.scrapeMatchQuestionsPage = function (screenname, page_num) {
    var page_num = page_num || 1; // Start at 1 if no page_num was passed.
    var url = window.location.protocol + '//' + window.location.host + '/profile/'
        + screenname + '/questions?low=' + page_num.toString();
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': url,
        'onload': function (response) {
            // Find only the answered questions, since those are what we can scrape.
            var result_count = 0;

            var parser = new DOMParser();
            var doc = parser.parseFromString(response.responseText, 'text/html');
            var targetid = OKCPAT.getTargetUserId(response.responseText);
            var answered_questions = doc.querySelectorAll('.question.public:not(.not_answered)');
            var data = OKCPAT.processAnsweredQuestions(answered_questions, targetid, screenname);

            // Note how many answers we've been able to scrape.
            result_count += data.answers.length;

            var my_page = (url.match(/low=(\d+)/)) ? parseInt(url.match(/low=(\d+)/)[1]) : 1 ;
            if (result_count) {
                // TODO: Save with timestamp noting last scrape time.
                //data.last_scraped = new Date().getTime();
                // Share this scraped batch with the cooperative server.
                OKCPAT.saveToServer(data);
                // Also save this batch locally.
                var ldata = OKCPAT.readLocally(screenname);
                if (!ldata) {
                    OKCPAT.saveLocally(screenname, data);
                } else {
                    // If we already have some info saved for this user,
                    // make a list of QIDs to add from the scraped data,
                    var answers_to_add = [];

                    // Change the "ldata" data structure so it's indexed by QID!
                    // see https://github.com/meitar/pat-okcupid/issues/3#issuecomment-17585020
                    var local_answers = {};
                    for (var i = 0; i < ldata.answers.length; i++) {
                        local_answers[ldata.answers[i].qid] = {
                            qtext  : ldata.answers[i].qtext,
                            answer : ldata.answers[i].answer
                        };
                    }

                    // For each question we've scraped,
                    for (var x = 0; x < data.answers.length; x++) {
                        // check if we already saved a Match Question with that QID.
                        if (local_answers[data.answers[x].qid]) {
                            OKCPAT.log(screenname + '\'s scraped QID ' + data.answers[x].qid + ' matches their locally saved QID.');
                        } else {
                            // If we haven't, add it to our list.
                            OKCPAT.log(screenname + '\'s scraped QID ' + data.answers[x].qid + ' does not match a locally saved QID.');
                            answers_to_add.push(data.answers[x]);
                        }
                    }
                    // Add whatever new data we found.
                    for (var i = 0; i < answers_to_add.length; i++) {
                        OKCPAT.log('Adding QID ' + answers_to_add[i].qid + ' to ' + screenname + '\'s answers.');
                        ldata.answers.push(answers_to_add[i]);
                    }
                    OKCPAT.saveLocally(screenname, ldata);
                }

                // We got answers from the processed page, so grab the next page, too.
                var next_page = my_page + 10; // OkCupid increments by 10 questions per page.
                OKCPAT.log('Got ' + result_count.toString() + ' answers, next page starts at ' + next_page.toString());
                OKCPAT.scrapeMatchQuestionsPage(screenname, next_page);
            } else {
                OKCPAT.log('No Match Questions found on page ' + my_page.toString() + ', stopping.');
                // Now that we've scraped what we can, let's ask the server to
                // check if it knows of more answers we couldn't find, and save those.
                OKCPAT.getQuestionsAnsweredByUserId(targetid);
            }
            return;
        }
    });
};

OKCPAT.processAnsweredQuestions = function (els, targetid, targetsn) {
    var r = {'userid' : targetid, 'screenname' : targetsn};
    var arr_qs = [];
    // for each answered question on this page,
    for (var i = 0; i < els.length; i++) {
        var qid    = els[i].getAttribute('id').match(/\d+$/)[0];
        var qtext  = els[i].querySelector('#qtext_' + qid).childNodes[0].textContent.trim();
        var answer = els[i].querySelector('#answer_target_' + qid).childNodes[0].textContent.trim();
        // TODO: Ask the server if we've already got a match for question X with answer Y.
        // If we don't, send this information to the server for storage.
        arr_qs.push({'qid' : qid, 'qtext' : qtext, 'answer' : answer});
    }
    r.answers = arr_qs;
    return r;
};

OKCPAT.saveToServer = function (data) {
    GM_xmlhttpRequest({
        'method': 'POST',
        'url': OKCPAT.getServerUrl(),
        'headers': {
            'Content-Type': 'application/json'
        },
        'data': JSON.stringify(data),
        'onload': function (response) {
            // TODO: Offer some kind of UI to indicate we've done this?
            OKCPAT.log('OKCPAT.saveToServer(): Received response ' + response.responseText);
        }
    });
};


OKCPAT.getQuestionsAnsweredByUserId = function (userid) {
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': OKCPAT.getServerUrl('/' + userid),
        'onload': function (response) {
            var json = JSON.parse(response.responseText);
            if (json && (response.status === 200)) {
                // add a timestamp of when we last fetched this user's info.
                json.last_fetched = new Date().getTime();
                OKCPAT.saveLocally(json.screenname, json);
            }
        }
    });
};

OKCPAT.isConcerningAnswer = function (answer, flagged_answers) {
    OKCPAT.log('Checking answer "' + answer + '" against flagged answers: ' + flagged_answers.toString());
    if (
        'string' === typeof(flagged_answers)
        &&
        answer === flagged_answers
        ) { return true; }
    for (var i = 0; i < flagged_answers.length; i++) {
        if (answer=== flagged_answers[i]) {
            return true;
        }
    }
    return false;
};

// This is the main() function, executed on page load.
OKCPAT.main = function () {
    var myid = OKCPAT.getMyUserId();
    var mysn = OKCPAT.getMyScreenname();
    var names = OKCPAT.findUsersOnPage();
	alert(names);
	if(names){
		var red_flags = {};
		// For each of the OkCupid Users found,
		for (var i = 0; i < names.length; i++) {
			// begin scraping their Match Questions.
			OKCPAT.log('Beginning scraping Match Questions answered by ' + names[i]);
			OKCPAT.scrapeMatchQuestionsPage(names[i]);

			// Read the list of questions answered by this user, if we remember any.
			var data = OKCPAT.readLocally(names[i]);
			if (data) {
				// TODO: How are we going to figure out which are the appropriate set of questions?
				//       We could:
				//           * Define a set of built-ins?
				// Get a list of the flagged question IDs, as strings
				var k = Object.keys(OKCPAT.getFlaggedQs());
				// and a list of the answered question IDs, also as strings.
				var a = [];
				for (var y in data.answers) {
					a.push(String(data.answers[y].qid));
				}
				// Search the answered questions for one of the flagged ones.
				for (var y = 0; y < k.length; y++) {
					// If that person has answered one of a set of flagged questions,
					var x = a.indexOf(k[y]);
					if (-1 !== x) {
						// check their answer and, if it's concering,
						if (OKCPAT.isConcerningAnswer(data.answers[x].answer.trim(), OKCPAT.getFlaggedQs()[k[y]])) {
							OKCPAT.log('Found concerning answer in Question ID ' + data.answers[x].qid + ' by user ' + names[i]);
							// add the answer to their set of red flags.
							if (names[i] in red_flags) {
								red_flags[names[i]].push({
									'qid' : data.answers[x].qid,
									'qtext' : data.answers[x].qtext,
									'answer' : data.answers[x].answer
								});
							} else {
								red_flags[names[i]] = [{
									'qid' : data.answers[x].qid,
									'qtext' : data.answers[x].qtext,
									'answer' : data.answers[x].answer
								}];
							}
						}
					}
				}
			}
		}
		// If we're on a flagged user's profile page,
		var m = window.location.pathname.match(/^\/profile\/([^\/]+)/);
		if (m && (m[1] in red_flags)) {
			// Grab the target IDs here.
			var targetid = OKCPAT.getTargetUserId();
			var targetsn = OKCPAT.getTargetScreenname();
			OKCPAT.log('Loading profile page for ' + targetsn + ' (userid: ' + targetid + ').');
			// Show the details of the flagged Questions answered by this user.
			var div = document.createElement('div');
			div.setAttribute('id', 'okcpat_warning');
			div.setAttribute('class', 'content');
			var a_hdr = document.createElement('a');
			a_hdr.setAttribute('class', 'essay_title');
			a_hdr.innerHTML = 'Flagged questions found!';
			div.appendChild(a_hdr);
			var txt_el = document.createElement('div');
			txt_el.setAttribute('class', 'text');
			var p = document.createElement('p');
			// TODO: Variablize this so it reads "NAME answered NUMBER questions about TOPIC in a concerning way..."
			p.innerHTML = targetsn + ' answered the following questions in a concerning way:';
			txt_el.appendChild(p);
			div.appendChild(txt_el);
			var dl = document.createElement('dl');
			// For each of the flagged questions,
			for (var z = 0; z < red_flags[targetsn].length; z++) {
				// create a <dd> element and an associated <dt> element
				var dt = document.createElement('dt');
				dt.innerHTML = red_flags[targetsn][z].qtext;
				dl.appendChild(dt);
				var dd = document.createElement('dd');
				dd.innerHTML = red_flags[targetsn][z].answer;
				dl.appendChild(dd);
			}
			div.appendChild(dl);
			// Display this information at the top of the user's profile.
			var before = document.getElementById('essay_0') // the "About" essay
				|| document.querySelector('.question') // the first Match Question
				|| document.querySelector('.description') // the first Photo Album
				|| document.getElementById('main_column').childNodes[0]; // whatever else
			before.parentNode.insertBefore(div, before);
		}
	}
};

OKCPAT.findUsersOnPage = function () {
	var url = window.location.href
	var match_result = url.match(/\/profile\/([^?\/]+)/);
	if(match_result){
		return [match_result[1]];
	} else {
		return false;
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
