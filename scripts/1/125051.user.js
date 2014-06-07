// ==UserScript==
// @name           Stack Exchange: "View Vote totals" without 1000 rep
// @namespace      Rob W
// @description    Enables the total vote counts feature without requiring an account or 1k+ reputation.
// @match          http://stackoverflow.com/questions/*
// @match          http://meta.stackoverflow.com/questions/*
// @match          http://superuser.com/questions/*
// @match          http://meta.superuser.com/questions/*
// @match          http://serverfault.com/questions/*
// @match          http://meta.serverfault.com/questions/*
// @match          http://askubuntu.com/questions/*
// @match          http://meta.askubuntu.com/questions/*
// @match          http://mathoverflow.net/questions/*
// @match          http://meta.mathoverflow.net/questions/*
// @match          http://*.stackexchange.com/questions/*
// @match          http://answers.onstartups.com/questions/*
// @match          http://meta.answers.onstartups.com/questions/*
// @match          http://stackapps.com/questions/*
// @match          http://stackoverflow.com/review/*
// @match          http://meta.stackoverflow.com/review/*
// @match          http://superuser.com/review/*
// @match          http://meta.superuser.com/review/*
// @match          http://serverfault.com/review/*
// @match          http://meta.serverfault.com/review/*
// @match          http://askubuntu.com/review/*
// @match          http://meta.askubuntu.com/review/*
// @match          http://mathoverflow.net/review/*
// @match          http://meta.mathoverflow.net/review/*
// @match          http://*.stackexchange.com/review/*
// @match          http://answers.onstartups.com/review/*
// @match          http://meta.answers.onstartups.com/review/*
// @match          http://stackapps.com/review/*
// @match          http://stackoverflow.com/search*
// @match          http://meta.stackoverflow.com/search*
// @match          http://superuser.com/search*
// @match          http://meta.superuser.com/search*
// @match          http://serverfault.com/search*
// @match          http://meta.serverfault.com/search*
// @match          http://askubuntu.com/search*
// @match          http://meta.askubuntu.com/search*
// @match          http://mathoverflow.net/search*
// @match          http://meta.mathoverflow.net/search*
// @match          http://*.stackexchange.com/search*
// @match          http://answers.onstartups.com/search*
// @match          http://meta.answers.onstartups.com/search*
// @match          http://stackapps.com/search*
// @exclude        http://area51.stackexchange.com/*
// @author         Rob W <gwnRob@gmail.com>
// @version        1.5.5
// @website        http://stackapps.com/q/3082/9699
// @run-at         document-end
// @grant          none
// ==/UserScript==

// Chrome extension: https://chrome.google.com/webstore/detail/oibfliilcglieepgkdkahpfiiigdijdd
// Greasemonkey script and bookmarklet: http://userscripts.org/scripts/show/125051

// @history        06-feb-2012 Release
// @history        07-feb-2012 Added CSS fix for IE7-. Added reference to optimized bookmarklet.
// @history        07-feb-2012 Modified click handler, so that it's also working after voting.
// @history        13-jun-2012 Upgraded to the SE 2.0 API (from 1.1)
// @history        10-nov-2012 Released Chrome extension
// @history        16-nov-2012 Added support for /review/ (previously limited to /questions/ only)
// @history        16-nov-2012 Added support for older jQuery versions (1.4.4 at Area 51)
// @history        16-nov-2012 Added support for /review/ (Suggested edits)
// @history        19-nov-2012 Corrected one-letter typo
// @history        12-dec-2012 Corrected $.fn.click override: .call replaced with .apply
// @history        23-may-2013 Added support for /questions/tagged/... and /search
// @history        05-sep-2013 Added Math Overflow to list of sites
// @history        21-feb-2014 Use https SE API on https SE sites.

/*
 * How does this script work?
 * - The Vote count feature is detected through the existence of the
 *          tooltip (title) on the Vote Count buttons.
 *  When the title is present, the script does not have any side-effects.
 *  When the title is absent, this script adds the feature:
 * 1) A style is appended to the head, which turns the cursor in a pointer on the 
 *      Vote Count elements.
 * 2) One global event listener is bound to the document.
 *    This click listener captures clicks on the Vote Count elements (now + future)
 * 3) On click, the vote counts are requested through the Stack Exchange API.
 *    The response is parsed, and the vote totals are shown.
 *    A tooltip is also added, in accordance with the normal behaviour.
 *    As a result, the Vote count button is not affected by the script any more.
 * 
 *  Usually, when a user casts a vote, the buttons are reset, and a click handler
 *  is added. This click handler is attached in a closure, and cannot be modified.
 * To prevent this method from being triggered, jQuery.fn.click() is modified.
 */

/* This script injection method is used to have one single script that works in all modern browsers.
 * Against sandboxed window-objects (Chrome)
 * The code itself has successfully been tested in:
 * Firefox 3.0 - 16.0
 * Opera 9.00 - 12.00
 * Chrome 1 - 23
 * IE 7 - 10 (for IE6, see http://userscripts.org/scripts/show/125051)
 * Safari 3.2.3 - 5.1.7 */

/*This script can ALSO be used as a BOOKMARKLET. Just copy-paste anything below this line!*/

javascript:void(function(doc){
var head = (doc.head||doc.getElementsByTagName('head')[0]||doc.documentElement);
var style = doc.createElement('style');
var css = '/*Added through UserScript*/' + 
          '.vote-count-post{cursor:pointer;}' + 
          '.vote-count-post[title]{cursor:default;}' +
          '.vote-count-separator{height:0;*margin-left:0;}'; /* IE7- */
head.appendChild(style);

if (style.styleSheet) {
    /* This is for IE-users.*/
    style.styleSheet.cssText = css;
} else {
    style.appendChild(doc.createTextNode(css));
}


var script = doc.createElement('script');
script['textContent' in script ? 'textContent' : 'text'] = '(' + function() {
    var api_url = location.protocol + '//api.stackexchange.com/2.0/posts/';
    var api_filter_and_site = '?filter=!)q3b*aB43Xc&key=DwnkTjZvdT0qLs*o8rNDWw((&site=' + location.host;
    var canViewVotes = 1; /* Intercepts click handler when the user doesn't have 1k rep.*/
    var b = StackExchange.helpers;
    var original_click = $.fn.click;
    $.fn.click = function() {
        if (this.hasClass('vote-count-post') && !canViewVotes) return this;
        return original_click.apply(this, arguments);
    };
    var voteCountClickHandler = function(e) {
        var $this = $(this), t=this.title, $tmp;
        if (/up \/ /.test(t) || /View/.test(t) && canViewVotes) return;
        canViewVotes = 0; /* At this point, not a 1k+ user */
        var postId = $this.siblings('input[type="hidden"]').val();
        if (!postId) {
            // At /review/, for instance:
            $tmp = $this.closest('[data-questionid],[data-answerid]');
            postId = $tmp.attr('data-answerid') || $tmp.attr('data-questionid');
        }
        if (!postId) {
            // At /review/ of Suggested edits
            $tmp =  $this.closest('.suggested-edit');
            postId = $.trim($tmp.find('.post-id').text());
        }
        if (!postId) {
            // At /questions/tagged/....
            // At /search
            $tmp = $this.closest('.question-summary');
            postId = /\d+/.exec($tmp.attr('id'));
            postId = postId && postId[0];
        }   
        if (!postId) {
            console.error('Post ID not found! Please report this at http://stackapps.com/q/3082/9699');
            return;
        }
        b.addSpinner($this);
        $.ajax({
            type: 'GET',
            url: api_url + postId + api_filter_and_site + '&callback=?', /* JSONP for cross-site requests */
            dataType: 'json',
            success: function(json) {
                json = json.items[0];
                var up = json.up_vote_count, down = json.down_vote_count;
                up = up ? '+' + up : 0;       /* If up > 0, prefix a plus sign*/
                down = down ? '-' + down : 0; /* If down > 0, prefix a minus sign */
                $('.error-notification').fadeOut('fast', function() {
                    $(this).remove();
                });
                $this.css('cursor','default').attr('title', up + ' up / ' + down + ' down')
                     .html('<div style="color:green">' + up + '</div>' +
                           '<div class="vote-count-separator"></div>'  +
                           '<div style="color:maroon">' + down + '</div>');
            },
            error: function(N) {
                b.removeSpinner();
                b.showErrorPopup($this.parent(), N.responseText && N.responseText.length < 100 ?
                        N.responseText : 'An error occurred during vote count fetch');
            }
        });
        e.stopImmediatePropagation();
    };
    if ($.fn.on) $(document).on('click', '.vote-count-post', voteCountClickHandler);
    else { // For old jQuery versions, e.g. Area 51
        $(document).delegate('.vote-count-post', 'click', voteCountClickHandler);
    }
} + ')();';

head.appendChild(script);
script.parentNode.removeChild(script);
})(document);
