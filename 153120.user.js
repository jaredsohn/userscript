// ==UserScript==
// @name        ao3 savior
// @description Tumblr savior clone for Ao3 works pages.
// @namespace   ao3
// @include     http*://archiveofourown.org/*
// @grant       unsafeWindow
// @version     1.3
// @downloadURL http://userscripts.org/scripts/source/153120.user.js
// ==/UserScript==

/**** CONFIG ********************/
window.ao3SaviorConfig = {
    showReasons: true,
    // set to false if you don't want to see why works were hidden

    showPlaceholders: true,
    // set to false if you don't want to see the "This work is hidden!" boxes (could result in empty works lists. Check out the "saved filters" script)

    authorBlacklist: ['Hated Author 1', 'smeyer'],
    // excludes works with an author that exactly matches at least one term

    tagBlacklist: ['dobby', 'jar jar binks', '*mimes'],
    // excludes works with a tag that exactly matches at least one term. Use * for wildcard

    summaryBlacklist: ['horse-sized ducks', 'duck-sized horses', "bee's knees"]
    // excludes works with summaries that contain at least one term
};
/********************************/

(function($) {

    var works = $('li.blurb');
    if (!works[0]) return;

    var toggleClass = 'ao3-savior-hide-toggle',
        fold = $('<p>').addClass('fold').append(
            $('<span>').addClass(toggleClass).text('This work is hidden! '),
            $('<span>').addClass(toggleClass).html('This work <em>was</em> hidden. ').hide(),
            $('<span>').addClass('reason'),
            $('<span>').addClass('actions').append(
                $('<a>').addClass('action').css({
                        'position': 'absolute',
                        'right': 8,
                        'top': 10
                    }).text('Unhide')
                )
        ),
        bl = window.ao3SaviorConfig,
        termsMatch = function(testTerm, listTerm) {
            if (testTerm == listTerm) { return true; }

            if (listTerm.indexOf('*') != -1) {
                var parts = listTerm.split('*'),
                    prevPartIndex = 0,
                    firstPart,
                    lastPart;

                for (var i = 0, part, len = parts.length; i < len; i++) {
                    part = parts[i];
                    partIndex = testTerm.indexOf(part);
                    if (part && partIndex < prevPartIndex) {
                        return false;
                    }
                    prevPartIndex = partIndex + part.length;
                }
                
                firstPart = parts[0];
                lastPart = parts[parts.length-1];

                return !(
                    firstPart && testTerm.indexOf(firstPart) != 0 ||
                    lastPart && testTerm.indexOf(lastPart)+lastPart.length != testTerm.length
                );
            }

            return false;
        },
        shouldBlacklist = function(work) {
            var authors = work.find('a.login.author'),
                tags = work.find('a.tag'),
                summary = work.find('blockquote.summary').text(),
                reason = 'Reason: ';

            for (var i = 0, blAuthor; blAuthor = bl.authorBlacklist[i]; i++) {
                var done;
                if (blAuthor == 'Anonymous' && !authors[0]) {
                    done = true;
                } else {
                    for (var j = 0, author; author = $(authors[j]).text(); j++) {
                        if (author == blAuthor) {
                            done = true;
                            break;
                        }
                    }
                }

                if (done) {
                    return reason +'author is <strong>' +blAuthor +'</strong>';
                }
            }

            for (var i = 0, tag; tag = $(tags[i]).text(); i++) {
                for (var j = 0, blTag; blTag = bl.tagBlacklist[j]; j++) {
                    if (termsMatch(tag, blTag)) {
                        return reason +'tags include <strong>' +blTag +'</strong>';
                    }
                }
            }

            for (var i = 0, blSummaryTerm; blSummaryTerm = bl.summaryBlacklist[i]; i++) {
                if (summary.indexOf(blSummaryTerm) != -1) {
                    return reason +'summary includes <strong>' +blSummaryTerm +'</strong>';
                }
            }

            return '';
        },
        blacklist = function(work, reason) {
            var cut = $('<div>').addClass('cut').html(work.html()),
                reason = '(' +reason +'.)',
                thisFold = fold.clone(),
                reasonContainer = thisFold.find('.reason');

            if (!ao3SaviorConfig.showPlaceholders) {
                work.hide();
                return;
            }

            if (ao3SaviorConfig.showReasons) {
                reasonContainer.html(reason);
            } else {
                reasonContainer.remove();
            }

            work.empty().append(thisFold, cut.hide());
            work.find('a.action').click(function() {
                var fold = $(this).closest('.fold'),
                    cut = fold.next('.cut');

                cut.add(fold.children('.'+toggleClass)).toggle();
                $(this).text(cut.is(':visible') ? 'Hide' : 'Unhide');
            })
        };

    works.each(function() {
        var reason = shouldBlacklist($(this));
        if (reason) {
            blacklist($(this), reason)
        }
    });

})(unsafeWindow.jQuery);
