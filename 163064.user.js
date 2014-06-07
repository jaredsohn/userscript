/**
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
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           Predator Alert Tool for OkCupid
// @version        0.5.1
// @namespace      com.maybemaimed.pat.okcupid
// @updateURL      https://userscripts.org/scripts/source/163064.user.js
// @description    Alerts you of potential sexual predators on OkCupid based on their own answers to Match Questions patterned after Lisak and Miller's groundbreaking academic work on identifying "undetected rapists."
// @include        http://www.okcupid.com/*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// ==/UserScript==

var OKCPAT = {};
OKCPAT.CONFIG = {
    'debug': false, // switch to true to debug.
    'version': '0.5.1', // used to perform clean up, etc. during init()
    'storage_server_url': 'http://okcupid-pat.appspot.com/okcupid_pat', // Our centralized database.
    'storage_server_url_development': 'http://localhost:8080/okcupid_pat', // A dev server, for when 'debug' is true.
    'red_flag_suggestion_form_url': 'https://docs.google.com/forms/d/15zyiFLP71Qtl6eVtACjg2SIaV9ZKAv3DpcK0d_9_Qnc/viewform',
    'red_flag_suggestion_form_url_development': 'https://docs.google.com/forms/d/1vddPhUKBq08yhaWgCQvtMCWoUA6YFIFV9rH9OAz9PsM/viewform',
    // Define list of flagged Lisak and Miller Q&A's by OkCupid Question IDs.
    // The flagged_qs_sexual_consent object is a built-in that always triggers
    // a red-flag when hit. The object structure is:
    //
    //     {
    //         Question_ID : string_or_array
    //     }
    //
    // The Question ID is numeric and must be unique. The string_or_array is an
    // answer to the question proposed in the question ID. If a string, only an
    // answer that matches that exact text will be flagged. If an array, each
    // of the strings in the array is an answer that will trigger a red-flag.
    'flagged_qs_sexual_consent': {
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
        48947 : 'Yes.' // Is intoxication ever an acceptable excuse for acting stupid?
    },
//    // TODO: Support multiple lists of questions?
//    'flagged_qs_violence': {
//        55349 : 'Yes.',
//        // TODO: Support checking against MULTIPLE concerning answers.
//        36624 : ['Yes, I use physical force whenever I want.', 'Yes, but only playfully or in jest.'],
//        61281 : ['Always.', 'Frequently.']
//    },
//    'flagged_qs_polyamory': {
//        784 : 'No',
//        31581 : 'No way.'
//    },
    'flagged_qs_development': {
        784 : 'No',
        31581 : 'No way.',
        36624 : ['Yes, I use physical force whenever I want.', 'Yes, but only playfully or in jest.'],
        61281 : ['Always.', 'Frequently.']
    }
};

// Utility debugging function.
OKCPAT.log = function (msg) {
    if (!OKCPAT.CONFIG.debug) { return; }
    GM_log('PAT-OkCupid: ' + msg);
};
// Find the position of an element.
// @see http://www.quirksmode.org/js/findpos.html
function findPos (obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curleft, curtop];
    }
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
.pat-okc-btn {\
    float: left;\
    width: auto;\
    margin-right: 3px;\
}\
.flag_pop .btn {\
    display: inline-block;\
    margin-right: 5px;\
}\
#pat-okc-creepshield-profile-results ul {\
    padding: 2em;\
    list-style: disc;\
}\
#pat-okc-creepshield-profile-results img {\
    position: absolute;\
    top: 10px;\
    right: 20px;\
}\
');
OKCPAT.init = function () {
    if (OKCPAT.isUpdatedVersion()) {
        OKCPAT.log('Updated version found.');
        // Code to run when we get updated to a new version.
        // TODO: Modularize this, eventually?
        // Update our installed version string.
        OKCPAT.setValue('version', OKCPAT.CONFIG.version);
        // If paused or already completed, start first run from beginning with "rerun" param.
        if (OKCPAT.isFirstRunPaused() || OKCPAT.getValue('completed_first_run_questionnaire')) {
            window.location =
                window.location.protocol + '//' + window.location.host
                + '/questions?rqid=' + OKCPAT.getQuestionIdOfFirstRunStep(0) +
                '&pat_okc_rerun_first_run&pat_okc_first_run_step=1&pat_okc_first_run_unpause';
        } else {
            // In all other cases, just show a pop-up.
            var html = OKCPAT.getUpdatedVersionHtml();
            html += '<div class="buttons"><p class="btn small flag_button green" style="width: auto;"><a style="padding: 0 20px;" href="#" onclick="var x = document.getElementById(\'okcpat-first_run\'); x.parentNode.removeChild(x); return false;">Ok</a></p></div>';
            OKCPAT.injectPopUp(html);
        }
        return; // Stop everything, let the reload happen.
    }
    if (OKCPAT.isFirstRun()) {
        // If we've paused the "First Run" sequence,
        if (OKCPAT.isFirstRunPaused()) {
            // inject the "Resume" link.
            OKCPAT.injectResumeFirstRunLink();
        } else {
            // If we're not paused
            OKCPAT.deleteValue('first_run_questionnaire_paused');
            OKCPAT.doFirstRun(OKCPAT.getFirstRunStep());
        }
    }
    // TODO: Define a UI for choosing topic lists?
//    OKCPAT.CONFIG.active_topics.push('sexual_consent');
//    OKCPAT.CONFIG.active_topics.push('polyamory');
    OKCPAT.main();
};
window.addEventListener('DOMContentLoaded', OKCPAT.init);

OKCPAT.isUpdatedVersion = function () {
    var v = OKCPAT.getValue('version', '0.0.0'); // Default is "version zero."
    OKCPAT.log('Check version ' + OKCPAT.CONFIG.version + ' against ' + v + '.');
    return (0 < OKCPAT.compareVersions(OKCPAT.CONFIG.version, v)) ? true : false;
};
OKCPAT.compareVersions = function (a, b) {
    var v1 = a.split('.');
    var v2 = b.split('.');
    for (var i = 0; i < Math.min(v1.length, v2.length); i++) {
        var res = v1[i] - v2[i];
        if (res != 0) {
            return res;
        }
    }
    return 0;
}

OKCPAT.isFirstRun = function () {
    var m = window.location.search.match(/pat_okc_rerun_first_run/);
    if (m) { // First run was completed, but questionnaire got updated.
        OKCPAT.deleteValue('completed_first_run_questionnaire');
        return true;
    } else {
        return (OKCPAT.getValue('completed_first_run_questionnaire')) ? false : true;
    }
};
OKCPAT.getFirstRunStep = function () {
    var m = window.location.search.match(/pat_okc_first_run_step=(\d+)/);
    if (m && m[1]) {
        return parseInt(m[1]);
    } else {
        return 0;
    }
};
OKCPAT.getQuestionIdOfFirstRunStep = function (step) {
    var step = step || OKCPAT.getFirstRunStep();
    var k = Object.keys(OKCPAT.getFlaggedQs()).reverse(); // Newer questions first.
    return k[step];
};
OKCPAT.isFirstRunPaused = function () {
    // If we've actively chosen to resume, we're not "paused."
    if (window.location.search.match(/pat_okc_first_run_unpause/)) {
        return false;
    } else {
        return (0 <= OKCPAT.getValue('first_run_questionnaire_paused')) ? true : false;
    }
};

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
    var question_set = (OKCPAT.CONFIG.debug) ?
        OKCPAT.CONFIG['flagged_qs_development']:
        OKCPAT.CONFIG['flagged_qs_sexual_consent'];
    // Load user's custom set of flagged questions, if exists.
    var custom_set = OKCPAT.readLocally('pat_okc_custom_flagged_qs');
    if (custom_set) {
        // Merge the custom set with the built-in set.
        for (key in custom_set) {
            question_set[key] = custom_set[key];
        }
    }
    return question_set;
};
OKCPAT.getQid = function (q_el) {
    return q_el.getAttribute('id').match(/\d+$/)[0];
};

OKCPAT.makeMatchQuestionsPermalinks = function () {
    var els = document.querySelectorAll('#questions .qtext');
    for (var i = 0; i < els.length; i++) {
        var txt = els[i].innerHTML;
        var qid = OKCPAT.getQid(els[i]);
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
        return uw.Profile.userid
    } else {
        OKCPAT.log('An HTML source code string was passed, parsing string values.');
        var m = html.match(/Profile\.initialize.*"userid"\s*:\s*"(\d+)"/);
        return (m) ? m[1] : false ;
    }
};
OKCPAT.getTargetScreenname = function () {
    return uw.Profile.screenname
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
        var qid    = OKCPAT.getQid(els[i]);
        var qtext  = els[i].querySelector('#qtext_' + qid).textContent.trim();
        var answer = els[i].querySelector('#answer_target_' + qid).textContent.trim();
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

OKCPAT.creepShield = {};
OKCPAT.creepShield.checkPhotoUrl = function (url) {
    // For Chrome, we need to create the multipart request manually because
    // extensions can't decode FormData objects due to its isolated worlds.
    // See http://code.google.com/p/tampermonkey/issues/detail?id=183
    var multipart_boundary = "---xxx111222333444555666777888999";
    var multipart_data = '--' + multipart_boundary + "\n";
    multipart_data += 'Content-Disposition: form-data; name="linked_image"';
    multipart_data += "\n\n";
    multipart_data += url;
    multipart_data += "\n";
    // Mimic hitting the "Search" button.
    multipart_data += '--' + multipart_boundary + "\n";
    multipart_data += 'Content-Disposition: form-data; name="submit_linked_image"';
    multipart_data += "\n\n";
    multipart_data += 'Search';
    multipart_data += "\n";
    multipart_data += '--' + multipart_boundary + '--'; // end

    GM_xmlhttpRequest({
        'method': 'POST',
        'url': 'http://www.creepshield.com/search',
        'headers': {
            'Content-Type': 'multipart/form-data; boundary=' + multipart_boundary
        },
        'data': multipart_data,
        'onload': function (response) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(response.responseText, 'text/html');
            // If our search was successful,
            if (doc.querySelector('.search-details')) {
                // Parse the CreepShield results and display on FetLife.
                var creep_data = OKCPAT.creepShield.parseResults(doc);
                OKCPAT.creepShield.display(creep_data);
            } else {
                OKCPAT.log('An error occurred searching CreepShield.com.');
                if (doc.getElementById('messages')) {
                    OKCPAT.creepShield.displayError(doc.getElementById('messages').textContent);
                }
            }
        }
    });
};
OKCPAT.creepShield.parseResults = function (doc) {
    var ret = {
        'searched_url' : doc.querySelector('.searched-image').getAttribute('src'),
        'matches_count': doc.querySelectorAll('.person').length,
        'highest_match': doc.querySelector('.match-percentage p:nth-child(2)').textContent.match(/\d+%/),
        'highest_photo': doc.querySelector('.person-images-inner img'),
        'person_detail': doc.querySelector('.person-name').textContent
    };
    return ret;
};
OKCPAT.creepShield.getDisclaimerHtml = function () {
    return '<p>This feature is powered by the facial recognition service at <a href="http://creepshield.com/">CreepShield.com</a>. The registered sex offender database is <em>not</em> always a reliable source of information. <a href="https://www.eff.org/deeplinks/2011/04/sexual-predators-please-check-here-match-com-s">Learn more</a>.</p>';
};
OKCPAT.creepShield.display = function (creep_data) {
    OKCPAT.log('Displaying data from CreepShield....');
    // Insert an "RSO facial match" percent.
    var percent_match_el = document.createElement('div');
    percent_match_el.setAttribute('class', 'percentbox');
    var html = '<a href="javascript:document.getElementById(\'pat-okc-creepshield-profile-results\').style.display = \'block\';void(0);">';
    html += '<span class="percent">' + creep_data.highest_match + '</span>';
    html += '<span><abbr title="Registered Sex Offender">RSO</abbr> facial match</span>';
    html += '</a>';
    percent_match_el.innerHTML = html;
    document.getElementById('percentages').appendChild(percent_match_el);

    // Inject an invisible element to show when they click on the percent.
    var html = '<h1>Possible Registered Sex Offender matches:</h1>';
    html += '<ul>';
    html += '<li>Highest facial match: ' + creep_data.highest_match + '</li>'
    html += '<li>Most likely offender: <img src="' + creep_data.highest_photo.getAttribute('src') + '" alt="" />' + creep_data.person_detail + '</li>';
    html += '<li>Total possible matches: ' + creep_data.matches_count + '</li>';
    html += '</ul>';
    html += '<form method="POST" action="http://www.creepshield.com/search">';
    html += '<input type="hidden" name="linked_image" value="' + creep_data.searched_url + '" />';
    html += '<p>Search for criminal histories and other possible offenders: ';
    html += '<input type="submit" name="submit_linked_image" value="Search" />';
    html += '</p>';
    html += '</form>';
    html += OKCPAT.creepShield.getDisclaimerHtml();
    html += '<div class="buttons"><p class="btn small flag_button blue" style="width: auto;"><a style="padding: 0 20px;" href="#" onclick="document.getElementById(\'pat-okc-creepshield-profile-results\').style.display = \'none\'; return false;">OK</a></p></div>';
    OKCPAT.injectPopUp(html, {
        'id' : 'pat-okc-creepshield-profile-results',
        'class' : 'flag_pop shadowbox',
        'style' : {
            'display' : 'none',
            'width' : '700px',
            'position' : 'absolute',
            'left': '30px',
            'z-index': '1000'
        }
    });
};
OKCPAT.creepShield.displayError = function (msg) {
    OKCPAT.log('Got error from CreepShield: ' + msg);
    var cswin = GM_openInTab('http://www.creepshield.com/search');
    if (cswin.blur) {
        cswin.blur(); // "popunder"
    }

    // Insert an error notice
    var percent_match_el = document.createElement('div');
    percent_match_el.setAttribute('class', 'percentbox');
    var html = '<a href="javascript:document.getElementById(\'pat-okc-creepshield-profile-results\').style.display = \'block\';void(0);">';
    html += '<span class="percent" style="color:red;font-weight:bold;">CreepShield Error</span>';
    html += '<span><abbr title="Registered Sex Offender">RSO</abbr> facial match</span>';
    html += '</a>';
    percent_match_el.innerHTML = html;
    document.getElementById('percentages').appendChild(percent_match_el);

    var html = '<h1>Possible Registered Sex Offender matches:</h1>';
    html += '<p>CreepShield returned an error:</p>';
    html += '<blockquote><p>' + msg + '</p></blockquote>';
    html += '<p>If you are being told you need to login before you can do more searches, simply <a href="javascript:window.location.reload();void(0);">reload this page</a> to try again.</p>';
    html += OKCPAT.creepShield.getDisclaimerHtml();
    html += '<div class="buttons"><p class="btn small flag_button blue" style="width: auto;"><a style="padding: 0 20px;" href="#" onclick="var x = document.getElementById(\'pat-okc-creepshield-profile-results\'); x.parentNode.removeChild(x); return false;">OK</a></p></div>';
    OKCPAT.injectPopUp(html, {
        'id' : 'pat-okc-creepshield-profile-results',
        'class' : 'flag_pop shadowbox',
        'style' : {
            'display' : 'none',
            'width' : '700px',
            'position' : 'absolute',
            'left': '30px',
            'z-index': '1000'
        }
    });
};

OKCPAT.clearCookies = function () {
    var cookie_list = document.cookie.split(';');
    for (var i = 0; i < cookie_list.length; i++) {
        var cookie_name = cookie_list[i].replace(/\s*(\w+)=.+$/, "$1");
        // To delete a cookie, set its expiration date to a past value.
        document.cookie = cookie_name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    }
};

// This is the main() function, executed on page load.
OKCPAT.main = function () {
    var myid = OKCPAT.getMyUserId();
    var mysn = OKCPAT.getMyScreenname();
    var names = OKCPAT.findUsersOnPage();
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
                        OKCPAT.flagUser(names[i]);
                    }
                }
            }
        }
    }
    var m = window.location.pathname.match(/^\/profile\/([^\/]+)/);
    // If we're on any profile page,
    if (m) {
        // scrape their userpic and send it to CreepShield for testing
        var userpic_el = document.querySelector('#thumb0 img');
        if (userpic_el) {
            // OkCupid sometimes returns .webp images, but will also return a .jpg of the same.
            OKCPAT.creepShield.checkPhotoUrl(userpic_el.getAttribute('src').replace(/\.webp.*$/, '.jpg'));
        }
    }
    // If we're on a flagged user's profile page,
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
        a_hdr.innerHTML = 'OkCupid Predator Alert Warning!';
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
    // If there are any questions the human user can see, offer a
    var q = document.querySelectorAll('div.question');
    if (q.length) {
        OKCPAT.makeMatchQuestionsPermalinks();
        // link to suggest adding this question to the list of red flags.
        for (var i = 0; i < q.length; i++) {
            // but only if we're not doing the "first run" questionnaire.
            var total_steps = Object.keys(OKCPAT.getFlaggedQs()).length;
            var m = window.location.search.match(/pat_okc_first_run_step=(\d+)/);
            if (!m || (m[1] > total_steps)) {
                OKCPAT.injectRedFlagSuggestionButton(q[i]);
                OKCPAT.injectCustomFlagButton(q[i]);
            }
        }
    }
};

/**
 * Generic wrapper to add a button to the OkCupid interface.
 *
 * @param el The parent element to append the button to.
 * @param str The textual content of the button for the UI.
 * @param attrs An object of attributes to assign the button.
 * @param listener A function to attach a click event to.
 * @return Node The injected button.
 */
OKCPAT.injectButton = function (el, str, attrs, listener) {
    // Attribute defaults.
    attrs = attrs || {};
    var style = attrs.style || false;
    var href = attrs.href || '#';
    var target = attrs.target || false;

    var p = document.createElement('p');
    p.setAttribute('class', 'btn small pat-okc-btn');
    if (style) {
        p.setAttribute('style', style);
    }
    var a = document.createElement('a');
    a.setAttribute('href', href);
    if (target) {
        a.setAttribute('target', target);
    }
    if (listener) {
        a.addEventListener('click', listener);
    }
    a.innerHTML = str;
    p.appendChild(a);
    return el.appendChild(p);
};

OKCPAT.injectRedFlagSuggestionButton = function (q_el) {
    // Construct the pre-filled Google Form URL.
    var qid = OKCPAT.getQid(q_el);
    var href = OKCPAT.getSuggestionFormUrl() + '?';
    href += 'entry.1272351999=' + encodeURIComponent(qid);
    href += '&entry.734244=' + encodeURIComponent(q_el.querySelector('.qtext').textContent);
    var possible_answers = OKCPAT.getPossibleAnswers(q_el);
    var concerning_answers = '';
    els = q_el.querySelectorAll('.self_answers li:not(.match)');
    for (x = 0; x < els.length; x++) {
        concerning_answers += els[x].textContent;
        if (x !== (els.length - 1)) {
            concerning_answers += "\n";
        }
    }
    href += '&entry.1550986692=' + encodeURIComponent(possible_answers);
    href += '&entry.2047128191=' + encodeURIComponent(concerning_answers);
    OKCPAT.injectButton(q_el, 'Suggest as "red flag" to PAT-OKC', {'style': 'clear: left;', 'href': href, 'target': '_blank'});
};

/**
 * Scrapes the possible answers of a given question.
 *
 * @param DOMElement q_el The OkCupid question element to scrape from.
 * @return string Newline-separated list of textual answers.
 */
OKCPAT.getPossibleAnswers = function (q_el) {
    var possible_answers = '';
    var els = q_el.querySelectorAll('[id^="question_' + OKCPAT.getQid(q_el) + '_qans"]');
    for (var x = 0; x < els.length; x++) {
        possible_answers += els[x].value;
        // Add a newline unless this is the last possible answer.
        if (x !== (els.length - 1)) {
            possible_answers += "\n";
        }
    }
    return possible_answers;
};

OKCPAT.injectCustomFlagButton = function (q_el) {
    // Check to see if this question is already in our custom set.
    var qid = OKCPAT.getQid(q_el);
    var builtin_qs = (OKCPAT.CONFIG.debug) ?
        OKCPAT.CONFIG.flagged_qs_development :
        OKCPAT.CONFIG.flagged_qs_sexual_consent;
    var custom_set = OKCPAT.readLocally('pat_okc_custom_flagged_qs');
    if (custom_set[qid]) {
        OKCPAT.injectButton(q_el, 'Edit this red-flag', {}, function (e) {
            e.preventDefault();
            OKCPAT.showEditCustomFlagPopup(q_el);
        });
    } else if (builtin_qs[qid]) {
        // Do nothing if this is already a built-in red flag.
    } else {
        OKCPAT.injectButton(q_el, 'Add to my red-flags', {}, function (e) {
            e.preventDefault();
            OKCPAT.showAddCustomFlagPopup(q_el);
        });
    }
};
OKCPAT.showEditCustomFlagPopup = function (q_el) {
    var qid = OKCPAT.getQid(q_el);
    var html = '<h1>Edit your custom red-flag warning question</h1>';
    html += '<p>This question is one of your custom red-flags. This means Predator Alert Tool for OkCupid is warning you whenever you view the profile of a person who answered this question with one of the checked answers.</p>';
    html += '<form id="pat-okc-custom-flag-form">';
    html += '<input type="hidden" id="pat_okc_custom_flag_qid" name="pat_okc_custom_flag_qid" value="' + qid + '" />';
    var arr_ans = OKCPAT.getPossibleAnswers(q_el).split("\n");
    var red_ans = OKCPAT.readLocally('pat_okc_custom_flagged_qs')[qid];
    if (typeof(red_ans) === 'string') { red_ans = [red_ans] };
    for (var i = 0; i < arr_ans.length; i++) {
        html += '<p><label><input type="checkbox" value="' + arr_ans[i] + '" ';
        for (var z = 0; z < red_ans.length; z++) {
            if (arr_ans[i] == red_ans[z]) {
                html += 'checked="checked"';
            }
        }
        html += ' />' + arr_ans[i] + '</label></p>';
    }
    html += '</form>';
    html += '<p class="btn green"><a id="pat-okc-save-custom-flag-btn" href="#">Save</a></p>';
    html += '<p class="btn pink"><a id="pat-okc-delete-custom-flag-btn" href="#">Remove</a></p>';
    OKCPAT.injectPopUp(html, {
        'id' : 'pat-okc-edit-custom-flag-popup',
        'class' : 'flag_pop shadowbox',
        'style' : {
            'display' : 'block',
            'width' : '700px',
            'position' : 'absolute',
            'left': '30px',
            'top': findPos(q_el)[1].toString() + 'px',
            'z-index': '10'
        }
    });
    var save_btn = document.getElementById('pat-okc-save-custom-flag-btn');
    save_btn.addEventListener('click', OKCPAT.addAsCustomFlag);
    var remove_btn = document.getElementById('pat-okc-delete-custom-flag-btn');
    remove_btn.addEventListener('click', OKCPAT.removeCustomFlag);
    // Close the popup.
    // TODO: Uh, make this its own function?
    save_btn.addEventListener('click', function (e) {
        var x = document.getElementById('pat-okc-edit-custom-flag-popup');
        x.parentNode.removeChild(x);
    });
    remove_btn.addEventListener('click', function (e) {
        var x = document.getElementById('pat-okc-edit-custom-flag-popup');
        x.parentNode.removeChild(x);
    });
};
OKCPAT.showAddCustomFlagPopup = function (q_el) {
    var qid = OKCPAT.getQid(q_el);
    var html = '<h1>Add to your custom set of red-flag warning questions</h1>';
    html += '<p>By adding this to your custom set of red-flags, Predator Alert Tool for OkCupid will warn you whenever you view the profile of a person who answered this question in a concerning way.</p>';
    html += '<p>Which answer(s) to the question "' + q_el.querySelector('.qtext').textContent + '" concerns you?</p>';
    html += '<form id="pat-okc-custom-flag-form">';
    html += '<input type="hidden" id="pat_okc_custom_flag_qid" name="pat_okc_custom_flag_qid" value="' + qid + '" />';
    var arr_ans = OKCPAT.getPossibleAnswers(q_el).split("\n");
    for (var i = 0; i < arr_ans.length; i++) {
        html += '<p><label><input type="checkbox" value="' + arr_ans[i] + '" />' + arr_ans[i] + '</label></p>';
    }
    html += '</form>';
    html += '<p class="btn green"><a id="pat-okc-save-custom-flag-btn" href="#">Save</a></p>';
    OKCPAT.injectPopUp(html, {
        'id' : 'pat-okc-add-custom-flag-popup',
        'class' : 'flag_pop shadowbox',
        'style' : {
            'display' : 'block',
            'width' : '700px',
            'position' : 'absolute',
            'left': '30px',
            'top': findPos(q_el)[1].toString() + 'px',
            'z-index': '10'
        }
    });
    var save_btn = document.getElementById('pat-okc-save-custom-flag-btn');
    save_btn.addEventListener('click', OKCPAT.addAsCustomFlag);
    // Close the popup.
    save_btn.addEventListener('click', function (e) {
        var x = document.getElementById('pat-okc-add-custom-flag-popup');
        x.parentNode.removeChild(x);
    });
};
// Saves a new custom flag to the locally-stored custom flag set.
OKCPAT.addAsCustomFlag = function (e) {
    e.preventDefault();
    var qid = document.getElementById('pat_okc_custom_flag_qid').value;
    var els = document.querySelectorAll('#pat-okc-custom-flag-form input[type="checkbox"]');
    flagged_answers = [];
    for (var i = 0; i < els.length; i++) {
        if (els[i].checked) {
            flagged_answers.push(els[i].value);
        }
    }
    if (flagged_answers.length == 1) { flagged_answers = flagged_answers.toString(); }
    var custom_set = OKCPAT.readLocally('pat_okc_custom_flagged_qs') || {}; // Empty object by default.
    custom_set[qid] = flagged_answers;
    // Since this is called from the "unsafeWindow", GM_setValue won't work.
    // @see http://wiki.greasespot.net/0.7.20080121.0%2B_compatibility
    setTimeout(function () {
        OKCPAT.saveLocally('pat_okc_custom_flagged_qs', custom_set);
        var x = document.querySelector('#question_' + qid + ' p.pat-okc-btn:last-child');
        x.parentNode.removeChild(x);
        OKCPAT.injectCustomFlagButton(document.getElementById('question_' + qid));
    }, 0);
};
OKCPAT.removeCustomFlag = function (e) {
    e.preventDefault();
    var qid = document.getElementById('pat_okc_custom_flag_qid').value;
    var custom_set = OKCPAT.readLocally('pat_okc_custom_flagged_qs');
    delete custom_set[qid];
    setTimeout(function () {
        OKCPAT.saveLocally('pat_okc_custom_flagged_qs', custom_set);
        var x = document.querySelector('#question_' + qid + ' p.pat-okc-btn:last-child');
        x.parentNode.removeChild(x);
        OKCPAT.injectCustomFlagButton(document.getElementById('question_' + qid));
    }, 0);
};

OKCPAT.findUsersOnPage = function () {
    var user_els = document.querySelectorAll('a[href^="/profile/"]');
    var mysn = OKCPAT.getMyScreenname();
    // Make a list of their screennames,
    var names = [];
    for (var i = 0; i < user_els.length; i++) {
        var m = user_els[i].getAttribute('href').match(/\/profile\/([^?\/]+)/);
        // but don't duplicate names, and exclude our own screenname.
        if (m[1] && (-1 === names.indexOf(m[1])) && (m[1] !== mysn)) {
            names.push(m[1]);
        }
    }
    return names;
};

OKCPAT.flagUser = function (name) {
    // Find links to this user's profile,
    var link_els = document.querySelectorAll('a[href^="/profile/' + name + '"]');
    for (var i = 0; i < link_els.length; i++) {
        // and highlight them with a CSS class.
        link_els[i].setAttribute('class', link_els[i].className + ' okcpat_red_flagged');
    }
};

OKCPAT.injectResumeFirstRunLink = function () {
    var step = OKCPAT.getValue('first_run_questionnaire_paused', 0);
    var el = document.getElementById('section_navigation');
    var li = document.createElement('li');
    li.setAttribute('id', 'okcpat-nav_questionnaire');
    var a = document.createElement('a');
    var url = '/questions?rqid=' + encodeURIComponent(OKCPAT.getQuestionIdOfFirstRunStep(step));
    url += '&pat_okc_first_run_step=' + encodeURIComponent(step.toString());
    url += '&pat_okc_first_run_unpause';
    a.setAttribute('href', url);
    a.innerHTML = 'Resume PAT-OKC <span class="badge">' + step + '</span>';
    li.appendChild(a);
    el.firstElementChild.appendChild(li);
};

OKCPAT.getUpdatedVersionHtml = function () {
    var html = '<h1>The <a href="https://github.com/meitar/pat-okcupid/#readme">Predator Alert Tool for OkCupid</a> has been updated.</h1>';
    html += '<p>The running version is ' + OKCPAT.CONFIG.version + '. (<a href="https://github.com/meitar/pat-okcupid/#change-log" title="Read about what\'s new in this version.">Release notes</a>.)</p>';
    html += '<p><strong>Did you know?</strong></p>';
    html += '<ul><li>Predator Alert Tool for OkCupid is one in <strong>a larger <a href="http://maybemaimed.com/2013/10/09/no-good-excuse-for-not-building-sexual-violence-prevention-tools-into-every-social-network-on-the-internet/">suite of Predator Alert Tools</a> available for other sites</strong>, including <a href="https://apps.facebook.com/predator-alert-tool/" title="Log in to Facebook to start using Predator Alert Tool for Facebook.">for Facebook</a>.</li></ul>';
    return html;
};

// Dispatcher for the "first run" sequence.
OKCPAT.doFirstRun = function (step) {
    var step = step || 0;
    var total_steps = Object.keys(OKCPAT.getFlaggedQs()).length;
    OKCPAT.log('First run! Step: ' + step.toString());
    if (0 === step) {
        OKCPAT.startFirstRun();
    } else if (step <= total_steps) {
        // If we're re-running this questionnaire because of updates, let the user know.
        if (window.location.search.match(/pat_okc_rerun_first_run/)) {
            // Prepare pop-up HTML.
            var html = OKCPAT.getUpdatedVersionHtml();
            html += '<p>Please take a moment to review the PAT-OKC questionnaire to make sure you answered all the required questions.</p>';
            html += '<p>Answering the PAT-OKC questionnaire makes sure your browser has all the information it needs to flag the profiles of users who have answered these questions in a concerning way.</p>';
            html += '<div class="buttons"><p class="btn small flag_button blue" style="width: auto;"><a style="padding: 0 20px;" href="#" onclick="var x = document.getElementById(\'okcpat-first_run\'); x.parentNode.removeChild(x); return false;">Ok</a></p></div>';
            OKCPAT.injectPopUp(html);
        }
        // Save where we are, in case the user goes away from the questionnaire.
        OKCPAT.setValue('first_run_questionnaire_paused', step - 1); // Save last step.
        var next_step = step + 1;
        var cur_qid   = window.location.search.match(/rqid=(\d+)/)[1];
        var next_qid  = OKCPAT.getQuestionIdOfFirstRunStep(step);
        var url = window.location.protocol
                + '//' + window.location.host
                + '/questions?rqid=' + encodeURIComponent(next_qid)
                + '&pat_okc_first_run_step=' + encodeURIComponent(next_step)
                + '&pat_okc_first_run_unpause'; // Force "unpause" since we're activating the next step.
        var progress_txt = " You're on question <strong>" + step.toString() + " out of " + total_steps.toString() + "</strong> of PAT-OKC's required questionnaire.";

        // Remove the "Skip" button, if it's there.
        var skp = document.querySelector('.skip_btn');
        if (skp) {
            skp.parentNode.removeChild(skp);
        }

        // Hide the "answer privately" option, if it's there.
        var prv = document.querySelector('#new_question .answer_privately');
        if (prv) {
            prv.setAttribute('style', 'display: none;');
        }

        // Hijack the "Submit" button, if it's there.
        var sbtn = document.getElementById('submit_btn_' + cur_qid.toString());
        if (sbtn) {
            sbtn.addEventListener('click', function () {
                window.location.href = url;
                OKCPAT.injectPopUp('Great, thanks for answering! Hang on a sec while I fetch the next question.', {
                    'id' : 'okcpat-first_run',
                    'class' : 'flag_pop text_attached shadowbox',
                    'style' : {
                        'display' : 'block',
                        'width' : '535px',
                        'position' : 'absolute',
                        'left': '10px',
                        'top' : '250px',
                        'min-height': '750px',
                        'z-index': '1000'
                    }
                });
            });
            sbtn.innerHTML = sbtn.innerHTML + ' and continue';
            sbtn.setAttribute('style', 'width: auto;');
        }

        // If there's a next "red flag" question,
        if (next_qid) {
            // Hijack the "Skip question" button, if it's there.
            var nxt = document.querySelector('.skip_btn');
            if (nxt) {
                // Force the button to link to the next action in our sequence.
                nxt.setAttribute('href',
                    '/questions?rqid=' + encodeURIComponent(next_qid)
                    + '&pat_okc_first_run_step=' + encodeURIComponent(next_step.toString())
                    + '&pat_okc_first_run_unpause'
                );
                // And remove OkCupid's event listeners.
                var new_node = nxt.cloneNode(true);
                nxt.parentNode.replaceChild(new_node, nxt);
            }
        }

        // Customize the "Notice" text, later.
        // TODO: Clean this up when we hit the "staff robot" (at 25 questions or so).
        // TODO: Does OkCupid even provide these notices anymore? If not, let's just remove this.
        var el = document.querySelector('.notice') || document.getElementById('guide_text');
        if (el) {
            var nx = el.getAttribute('class').match(/green|pink|sr_message/);
            if (!nx) {
                // Neither "green" or "pink" (or the "staff robot") means we've answered but can re-answer.
                var txt = 'Looks like you already answered this important PAT-OKC question! Rock on, rockstar!';
                el.querySelector('p:not(.btn)').setAttribute('style', 'margin-right: 160px;');
                if (!next_qid) {
                    // There's no next_qid, meaning this is the last question.
                    // so the "Next question" button should say "Congrats, you're done!"
                    txt += '<p class="btn small green" style="width: 160px;"><a href="' + url + '">Start using PAT-OKC!</a></p>';
                }
            } else {
                switch (nx[0]) {
                    case 'green':
                    case 'sr_message':
                        var txt = "Yay! You're making the Internet safer with every question you answer!";
                        break;
                    case 'pink':
                        var txt = 'Woah there, you recently answered this question already!';
                        el.querySelector('p:not(.btn)').setAttribute('style', 'margin-right: 140px;');
                        // If we can't re-answer AND this is the last question,
                        if (!next_qid) {
                            // offer a "congrats, you're done!" link.
                            txt += '<p class="btn small green" style="width: 160px;"><a href="' + url + '">Start using PAT-OKC!</a></p>';
                        }
                        break;
                }
            }
            el.querySelector('p:not(.btn)').innerHTML = txt + '<br /><br />' + progress_txt;
        }
    } else {
        OKCPAT.finishFirstRun();
    }
};

OKCPAT.injectPopUp = function (html, attrs) {
    // Initialize to empty defaults.
    var html = html || '';
    var attrs = attrs || {
        'id' : 'okcpat-first_run',
        'class' : 'flag_pop text_attached shadowbox',
        'style' : {
            'display' : 'block',
            'width' : '700px',
            'position' : 'absolute',
            'left': '30px',
            'z-index': '1000'
        }
    };
    // Inject a pop-up.
    var div = document.createElement('div');
    div.setAttribute('id', attrs['id']);
    div.setAttribute('class', attrs['class']);
    var str_style = '';
    for (x in attrs.style) {
        str_style += x + ':' + attrs.style[x] + ';';
    }
    div.setAttribute('style', str_style);
    var inner_html = '<div class="container clearfix">';
    inner_html += html;
    inner_html += '</div>';
    div.innerHTML = inner_html;
    var el = document.querySelector('.tabbed_heading');
    // If we're not a profile or questions page, then get other elements out of the way.
    if (!window.location.pathname.match(/^\/profile|^\/questions/)) {
        GM_addStyle('\
            #matches_block { z-index: 1; }\
            .fullness, p.fullness-bar, p.fullness-bar span.progress { display: none; }\
        ');
        // OkC uses inline style, so alter it directly.
        if (grr = document.querySelector('.page_tabs li[style]')) { grr.setAttribute('style', ''); }
        el.setAttribute('style', 'z-index: 1000;' + el.getAttribute('style'));
        div.style.top = '30px';
    }
    el.insertBefore(div, el.firstChild);
};

OKCPAT.startFirstRun = function () {
    // Prepare pop-up HTML.
    var html = '<h1>Thank you for installing the <a href="https://github.com/meitar/pat-okcupid/#readme">Predator Alert Tool for OkCupid</a>!</h1>';
    html += '<p>The Predator Alert Tool for OkCupid (PAT-OKC) is <strong>an early warning system</strong> that highlights red flags which may be an indicator of predatory or abusive behavior on OkCupid. It is part of the larger <a href="https://github.com/meitar/pat-facebook/wiki/Frequently-Asked-Questions">Predator Alert Tool suite</a>, so if you use Facebook, consider using the <a href="https://apps.facebook.com/predator-alert-tool/">Predator Alert Tool for Facebook</a>, too.</p>';
    html += '<p><strong>No software is a substitute for basic <a href="http://maymay.net/blog/2013/02/20/howto-use-tor-for-all-network-traffic-by-default-on-mac-os-x/#step-6">Internet self-defense</a>.</strong> Predator Alert Tools can only give you information to help you make better decisions; the decisions you make are still up to you. Always meet people you don\'t know from OkCupid in a public place, and consider <a href="https://yesmeansyesblog.wordpress.com/2010/04/26/what-is-a-safecall/">setting up a safe call</a> with one of your friends.</p>';
    html += "<p>As this is the first time you've installed the Predator Alert Tool for OkCupid (PAT-OKC), <strong>you'll be asked to answer a few OkCupid Match Questions</strong> that will help ensure your Web browser has the information it needs to alert you of a potentially dangerous profile. Ready? Set?</p>";
    var next_qid = OKCPAT.getQuestionIdOfFirstRunStep(0); // This is always the first step.
    html += '<div class="buttons"><p class="btn small flag_button green"><a href="/questions?rqid=' + next_qid + '&pat_okc_first_run_step=1">Go!</a></p></div>';
    OKCPAT.injectPopUp(html);
};
OKCPAT.finishFirstRun = function () {
    // Record that we've completed the first run sequence.
    OKCPAT.setValue('completed_first_run_questionnaire', true);
    // Prepare pop-up HTML.
    var html = '<h1>You finished the <a href="https://github.com/meitar/pat-okcupid/#readme">Predator Alert Tool for OkCupid</a> questionnaire!</h1>';
    html += '<p>You are now ready to begin using The Predator Alert Tool for OkCupid. :) Basically, that just means continuing to use OkCupid as you have been. However, there will be a few small changes:</p>';
    html += '<ul><li><img src="http://ak2.okccdn.com/php/load_okc_image.php/images/160x160/160x160/813x237/1500x924/2/7542193099865135582.jpeg" width="40" class="okcpat_red_flagged" style="float: right; margin: 0 0 1em 1em" />If you come across the OkCupid Profile of someone who PAT-OKC thinks might be dangerous, all of their pictures and links to their profile pages will be outlined in <strong>a blocky red square</strong>, as shown. If you see such a square, click in it for an explanation of why that profile was flagged.</li>';
    html += '<li>If you come across a Match Question that you think should be considered a "red flag", click the button to suggest it be added. The button looks like this: <p class="btn small" style="float: none; display: inline-block; margin: 0; width: auto;"><a href="#">Suggest as \'red flag\' to PAT-OKC</a></p></li></ul>';
    html += '<p>And most important of all, please tell your friends about the Predator Alert Tool for OkCupid! If we work together to share information, we can all keep one another safer! To learn more about the origins of this tool and what can be done to combat rape culture from a technological perspective, read the developer\'s blog: <a href="http://maybemaimed.com/2012/12/21/tracking-rape-cultures-social-license-to-operate-online/">Tracking rape culture\'s social license to operate online</a>.</p>';
    html += '<div class="buttons"><p class="btn small flag_button green" style="width: auto;"><a style="padding: 0 20px;" href="#" onclick="var x = document.getElementById(\'okcpat-first_run\'); x.parentNode.removeChild(x); return false;">Thanks! I feel better already!</a></p></div>';
    OKCPAT.injectPopUp(html);
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
