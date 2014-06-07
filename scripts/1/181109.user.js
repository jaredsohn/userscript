// ==UserScript==
// @name        ao3 personal hellban
// @description Hide comments and kudos from specified users and/or guests
// @namespace   ao3
// @include     http*://archiveofourown.org/*works*
// @include     http*://archiveofourown.org/admin_posts*
// @include     http*://archiveofourown.org/comments*
// @grant       unsafeWindow
// @version     1.2
// @downloadURL http://userscripts.org/scripts/show/181109
// ==/UserScript==

/**** CONFIG ********************/
window.ao3hellban = {

    showToggle: true, 
    // set to false if you don't want to see a count of hidden comments & toggle ability
    
    blacklist: [
        // '##GUEST:*', // uncomment this if you want to block comments by all guest users
        // '##GUEST:Bender', // uncomment if you want to block guest user who signs as 'Bender'
        'Dobby', // block an archive user called 'Dobby'
        'Jar Jar Binks'
    ]
/********************************/
};

(function($) {
    var blacklist = ao3hellban.blacklist,
        blacklistString = '|' +blacklist.join('|') +'|',
        bannedGuests = (function() {
            var list = {};
            for (var i = 0, name; name = blacklist[i]; i++) {
                if (/^##GUEST:/.test(name)) {
                    list[name.split(':')[1]] = true;
                }
            }
            return list;
        })(),
        banAllGuests = bannedGuests['*'],
        placeholder = $('#comments_placeholder'),
        nukeKudos = function() {
            $('.kudos a').each(function() {

                var a = $(this),
                    userPath = a.attr('href').replace('/users/', ''),
                    commaMaybe = a[0].nextSibling,
                    domParent = a[0].parentNode;

                if (blacklistString.indexOf('|'+userPath+'|') != -1) {
                    if (commaMaybe && commaMaybe.textContent == ', ') {
                        domParent.removeChild(commaMaybe);
                    }
                    a.remove();
                }
            });
            
            var kudosContainer = $('.kudos'),
                remainingKudos = kudosContainer.children('a'),
                kudoNodes = kudosContainer[0].childNodes,
                lastText = kudoNodes[kudoNodes.length-1];
                
            kudosContainer.empty();
            
            if (!remainingKudos[0]) {
                kudosContainer.remove();
                return;
            }
            
            remainingKudos.each(function(i) {
                kudosContainer.append(this);
                if (i < remainingKudos.length-2) { 
                    kudosContainer.append(', ');
                } else if (i == remainingKudos.length-2) {
                    if (remainingKudos.length > 2) {
                        kudosContainer.append(',');
                    }
                    kudosContainer.append(' and ');
                }
            });
            
            kudosContainer.append(lastText);
        },
        nukedComments,
        nukeThread = function(byline) {
            var thread = byline.closest('li ol.thread'),
                comment = byline.closest('li.comment'),
                subthread = comment.next().not('.comment');

            hideCommentGroup(comment);
            nukedComments++;
            hideCommentGroup(subthread);
            nukedComments += subthread.find('.comment').length;
        },
        nukeComments = function() {
            nukedComments = 0;
            $('.thread .comment .byline').each(function() {
                var byline = $(this),
                    isGuest = !byline.children('a')[0],
                    guestName = byline.html().replace(/^\s*|\s*$/g, ''),
                    userName = byline.children('a').attr('href');

                userName = (userName || '').replace(/^\/users\//, '');
                userName = userName.substring(0, userName.indexOf('/'));

                if (blacklistString.indexOf('|'+userName+'|') != -1 ||
                        isGuest && bannedGuests[guestName] ||
                        isGuest && banAllGuests) {
                    nukeThread(byline);
                }
            });

            if (nukedComments) {
                var toggleButton = $('<span>').addClass('action hellbanned-comments-toggle')
                        .click(toggleCommentVisibility);
                        
                placeholder.children('.thread').prepend(
                    $('<p>').text('* ' +nukedComments +' comments hidden ').addClass('hellban-info')
                        .append(toggleButton)
                ).css('margin', '1em 0');

                setTimeout(addStarOnButton, 20);
                toggleCommentVisibility();
            }
        },
        addStarOnButton = function() {
            var button = $('#show_comments_link a'),
                linkText = button.text().replace(/\*\s*$/, '') +'*';
            button.text(linkText);
        },
        hideCommentGroup = function(li) {
            if (li.hasClass('comment')) {
                li.addClass('hellbanned');
            } else {
                li.find('.comment').addClass('hellbanned-reply');
            }
        },
        pollCount = 0,
        maxPolls = 150,
        pollForNewComments = function() {
            var loadingThread = placeholder.children('.thread.loading'),
                bylines = placeholder.find('.comment .byline');

            if (pollCount > maxPolls) {
                pollCount = 0;
                return; // 30 second timeout
            }

            if (bylines[0] && !loadingThread[0]) {
                pollCount = 0;
                loadingThread.removeClass('loading');
                nukeComments();
                attachCommentLoadHandler();
            } else {
                pollCount++;
                setTimeout(pollForNewComments, 200);
            }
        },
        commentLoadHandler = function() {
            var rootThread = placeholder.children('.thread').addClass('loading');
            pollForNewComments();
        },
        attachCommentLoadHandler = function() {
            $('a[href*="show_comments"]').off('click.personalHellban')
                .on('click.personalHellban', commentLoadHandler);
        },
        injectStyle = function() {
            if ($('.comment')[0]) {
                $('head').append($('<style>').text(
                    '.comment.hellbanned{border-right:5px solid red;}.comment.hellbanned-reply{border-right:5px solid salmon;}' +
                    (ao3hellban.showToggle ? '' : '.hellban-info{display:none;}')
                ));
            }
        },
        toggleCommentVisibility = function() {
            var comments = $('.comment.hellbanned, .comment.hellbanned-reply');
            comments.toggle();
            $('.hellbanned-comments-toggle').text(comments.is(':visible') ? 'Hide' : 'Show');
        };

    injectStyle();
    nukeKudos();
    nukeComments();
    attachCommentLoadHandler();

})(unsafeWindow.jQuery);