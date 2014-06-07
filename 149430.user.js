/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           FetLife Epic Thread
// @version        0.1.1
// @namespace      http://maybemaimed.com/playground/fetlife-epic-thread/
// @updateURL      https://userscripts.org/scripts/source/149430.user.js
// @description    Easily view comments in-reply-to other comments on FetLife discussion threads, quickly jump from one comment in a thread on the same page to another.
// @include        https://fetlife.com/*
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

FL_SHITSTORM = {};
FL_SHITSTORM.CONFIG = {
    'debug': false, // switch to true to debug.
    'load_disemvoweled': GM_getValue('load_disemvoweled', true) // Whether to load comments disemvoweled or not.
};

// Utility debugging function.
FL_SHITSTORM.log = function (msg) {
    if (!FL_SHITSTORM.CONFIG.debug) { return; }
    GM_log('FETLIFE COMMENT SHITSTORM: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
GM_addStyle('\
div.comment-shitstorm {\
    margin-left: 73px;\
    border: 1px solid gray;\
    padding: 1em;\
}\
footer.comment-shitstorm {\
    width: 598px;\
    float: left;\
}\
.comment-shitstorm footer.comment-shitstorm { width: 100%; }\
.comment:target { border: 1px solid red; }\
');
FL_SHITSTORM.init = function () {
    FL_SHITSTORM.main();
};
window.addEventListener('DOMContentLoaded', FL_SHITSTORM.init);

FL_SHITSTORM.disemvowel = function (str) {
    return str.replace(/[aeiou]/ig, '');
};
FL_SHITSTORM.disemvowel_deep = function (el) {
    // If this is a TEXT_NODE, this can't have children
    if (3 === el.nodeType) {
        el.textContent = FL_SHITSTORM.disemvowel(el.textContent);
    } else {
        for (var i = 0; i < el.childNodes.length; i++) {
            FL_SHITSTORM.disemvowel_deep(el.childNodes[i]); // recurse
        }
    }
};

FL_SHITSTORM.disemvowelComments = function (comments) {
    for (var i = 0; i < comments.length; i++) {
        FL_SHITSTORM.disemvowel_deep(comments[i]);
    }
};

// This is the main() function, executed on page load.
FL_SHITSTORM.main = function () {
    // Iterate through list of comments.
    var comments = document.querySelectorAll('#comments .comment');
    // For each comment
    var comments_thread = [];
    for (var i = 0; i < comments.length; i++) {
        // TODO: Add a way to "Disemvowel" individual comments before they're likely to trigger.
        // that contains an "@-reply",
        var m = comments[i].querySelector('.content').innerHTML.match(/@(\w+)/i);
        if (m !== null && m[1]) {
            comments_thread.push(comments[i]);
            // find the most recent comment by the user who was @-reply'ed to
            // by iterating backwards from the current position
            for (var ix = i; ix >= 0; ix--) {
                var replying_to_nickname = (comments[ix].querySelector('.nickname')
                                         || comments[ix].querySelector('.q a')).innerHTML; // selectors for group/improvement page respectively
                var pat = new RegExp(m[1], 'i'); // do case-insensitive pattern matching
                if (pat.exec(replying_to_nickname)) {
                    var prior_comment = comments[ix];
                    comments_thread.splice(comments_thread.indexOf(comments[i]), 0, prior_comment);
                    // insert a button to show this other comment
                    var span = document.createElement('span');
                    span.setAttribute('class', 'smallest');
                    var a = document.createElement('a');
                    a.setAttribute('href', '#' + prior_comment.id);
                    a.innerHTML = 'in reply to ' + replying_to_nickname;
                    span.appendChild(a);
                    // and when clicked, display that comment inline
                    a.addEventListener('click', (function (replied_to_comment) {
                        return function (event) {
                            event.preventDefault();
                            var div = document.createElement('div');
                            div.setAttribute('class', 'comment-shitstorm');
                            var z = replied_to_comment.cloneNode(true);
                            div.appendChild(z);
                            var upper = this.parentNode.parentNode.parentNode;
                            var after;
                            if (upper.className.indexOf('content') != -1) {
                                // improvement page
                                after = upper.getElementsByTagName('p')[0];
                                div.style.marginLeft = '0px';
                            } else {
                                // group page
                                after = upper.querySelector('.content');
                            }
                            upper.insertBefore(div, after);
                        }
                    }(prior_comment))); // capture reference to prior_comment
                    // make a text node for prettiness
                    var txt = document.createTextNode(' ');
                    span.appendChild(txt);
                    var appendee = (comments[i].getElementsByTagName('footer')[0] // group
                                 || comments[i].querySelector('.q'));             // improvement
                    appendee.appendChild(span);
                    break; // Found it, stop loop!
                }
            }
        }
        // and offer a link to reply to this comment, too
//        var reply_link = document.createElement('a');
//        reply_link.setAttribute('href', '#');
//        reply_link.innerHTML = 'reply to ' + comments[i].querySelector('.nickname').innerHTML + '\'s comment';
//        reply_link.addEventListener('click', function (e) {
//            e.preventDefault();
//            // TODO:
//            uw.document.getElementById('generic_comment_body_fake').click(); // simulate user click?
//            uw.document.getElementById('generic_comment_body').focus();
//        });
//        comments[i].getElementsByTagName('footer')[0].appendChild(reply_link);
    }

    // now that we have all the replied-to-comments,
    uniq_comments_thread = jQuery.unique(comments_thread);

    // add a "previous reply" and "next reply" button at the end of them to jump from one to the next
    for (var i = 0; i < uniq_comments_thread.length; i++) {
        var ftr = document.createElement('footer');
        ftr.setAttribute('class', 'comment-shitstorm');
        var html_string = '';
        // Is there a previous item?
        if (-1 !== (i - 1)) {
            html_string += '<a style="float: left;" href="#' + uniq_comments_thread[i - 1].id + '">&larr; Previous in thread on page</a> ';
        }
        // Is there a next item?
        if ((i + 1) < uniq_comments_thread.length) {
            html_string += '<a style="float: right;" href="#' + uniq_comments_thread[i + 1].id + '">Next in thread on page &rarr;</a>';
        }
        ftr.innerHTML = html_string;
        uniq_comments_thread[i].appendChild(ftr);
    }

    // Offer buttons for changing default settings.
    var hdr = document.querySelector('#comments header');
    if (FL_SHITSTORM.CONFIG.load_disemvoweled) {
        // Disemvowl page by default.
        var comments = document.querySelectorAll('#comments .comment .content');
        FL_SHITSTORM.disemvowelComments(comments);
        var btn = document.createElement('button');
        btn.innerHTML = 'Stop loading comments disemvoweled.';
        btn.addEventListener('click', function (e) {
            GM_setValue('load_disemvoweled', false);
            hdr.innerHTML = hdr.innerHTML + 'Okay! Comments will no longer be disemvowled when they load.';
        });
        hdr.appendChild(btn);
    } else {
        // Add a "Disemvowel!" button.
        var btn = document.createElement('button');
        btn.innerHTML = 'Disemvowel!';
        btn.addEventListener('click', function () {
            var comments = document.querySelectorAll('#comments .comment .content');
            FL_SHITSTORM.disemvowelComments(comments);
        });
        hdr.appendChild(btn);
        var btn2 = document.createElement('button');
        btn2.innerHTML = 'Load comments disemvoweled.';
        btn2.addEventListener('click', function () {
            GM_setValue('load_disemvoweled', true);
            hdr.innerHTML = hdr.innerHTML + 'Okay! Comments will now be disemvowled when they load.';
        });
        hdr.appendChild(btn2);
    }
};
