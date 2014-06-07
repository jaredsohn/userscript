

// ==UserScript==
// @name       Mod User Notes
// @namespace  http://www.reddit.com/r/toolbox
// @author  agentlame, creesch
// @description    Create and display user notes for mods.
// @include     *://www.reddit.com/*
// @include     *://reddit.com/*
// @include     *://*.reddit.com/*
// @downloadURL http://userscripts.org/scripts/source/170091.user.js
// @version    1.0.1
// ==/UserScript==

function usernotes() {
    if (!reddit.logged) return;

    var subs = [],
        mySubs = [],
        modMineURL = 'http://www.reddit.com/subreddits/mine/moderator.json?count=100',
        lastget = JSON.parse(localStorage['Toolbox.cache.lastget'] || -1),
        cachename = localStorage['Toolbox.cache.cachename'] || '',
        modmail = location.pathname.match(/\/message\/(?:moderator)\/?/),
        modpage = location.pathname.match(/\/about\/(?:reports|modqueue|spam|unmoderated|trials)\/?/);

    var notes = {
        ver: 1,
        users: [] //typeof userNotes
    };

    // Because normal .sort() is case sensitive.

    function saneSort(arr) {
        return arr.sort(function (a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
    }

    if (localStorage['Toolbox.cache.moderatedsubs']) {
        mySubs = JSON.parse(localStorage['Toolbox.cache.moderatedsubs']);
    }

    // If it has been more than ten minutes, refresh mod cache.
    if (mySubs.length < 1 || (new Date().getTime() - lastget) / (1000 * 60) > 30 || cachename != reddit.logged) {
        mySubs = []; //resent list.
        getSubs(modMineURL);
    } else {
        mySubs = saneSort(mySubs);

        // Go!
        run();
    }

    function getSubs(URL) {
        $.getJSON(URL, function (json) {
            getSubsResult(json.data.children, json.data.after);
        });
    }

    // Callback because reddits/mod/mine is paginated.

    function getSubsResult(subs, after) {
        $(subs).each(function (sub) {
            mySubs.push(this.data.display_name.trim());
        });

        if (after) {
            var URL = modMineURL + '&after=' + after;
            getSubs(URL);
        } else {
            // We have all our subs.  Start adding ban links.
            lastget = new Date().getTime();
            cachename = reddit.logged;

            mySubs = saneSort(mySubs);

            // Update the cache.
            localStorage['Toolbox.cache.moderatedsubs'] = JSON.stringify(mySubs);
            localStorage['Toolbox.cache.lastget'] = JSON.stringify(lastget);
            localStorage['Toolbox.cache.cachename'] = cachename;

            // Go!
            run();
        }
    }

    function postToWiki(sub, json) {
        $.post('/r/' + sub + '/api/wiki/edit', {
                content: '    ' + JSON.stringify(json, undefined, 2),
                page: 'usernotes',
                reason: 'updated via user notes',
                uh: reddit.modhash
            })
            .error(function (err) {
                console.log(err.responseText);
            }).success(function () {
                setTimeout(function () {
                    run();
                }, 500);
            });

        // hide the page
        $.post('/r/' + sub + '/wiki/settings/usernotes', {
                permlevel: 2,
                uh: reddit.modhash
            })
            .error(function (err) {
                console.log(err.responseText);
            });
    }

    // RES NER support.
    $('div.content').on('DOMNodeInserted', function (e) {
        // Not RES.
        if (e.target.className !== 'NERPageMarker') {
            return;
        }

        // Wait for content to load.
        setTimeout(function () {
            run();
        }, 1000);
    });

    // Uncompress wiki data
    function compressHTML(src){return src.replace(/(\n+|\s+)?&lt;/g,'<').replace(/&gt;(\n+|\s+)?/g,'>').replace(/&amp;/g,'&').replace(/\n/g,'').replace(/child" >  False/,'child">') }
    
    function getThingInfo(thing) {

        var user = $(thing).find('.author:first').text(),
            subreddit = $('.titlebox h1.redditname a').text(),
            link = $(thing).closest('.entry').find('a.bylink').attr('href');

        // Try again.
        if (!user) {
            user = $(thing).closest('.entry').find('.author:first').text();
        }

        // Might be a submission.
        if (!link) {
            link = $(thing).closest('.entry').find('a.comments').attr('href');
        }

        if (!subreddit) {
            subreddit = $(thing).closest('.entry').find('.subreddit').text();
        }

        if (!subreddit) {
            subreddit = $(thing).closest('.thing').find('.subreddit').text();
        }

        // If we still don't have a sub, we're in mod mail
        if (!subreddit) {
            subreddit = $(thing).find('.head a:last').text().replace('/r/', '').replace('/', '').trim();
        }

        // Not a mod, reset current sub.
        if ($.inArray(subreddit, mySubs) === -1) {
            subreddit = '';
        }

        if (user == '[deleted]') {
            user = '';
        }

        return {
            subreddit: subreddit,
            user: user,
            link: link
        };
    }

    function processThings(things) {

        $(things).each(function () {
            if ($(this).hasClass('ut-processed')) {
                return;
            }
            $(this).addClass('ut-processed');

            var subreddit = getThingInfo(this).subreddit;

            if (!subreddit) return;

            var tag = '<span style="color:#888888; font-size:x-small;">&nbsp;[<a class="add-user-tag-' +
                subreddit + '" id="add-user-tag" "href="javascript:;">N</a>]</span>';

            $(this).find('.userattrs').after(tag);

            if ($.inArray(subreddit, subs) == -1) {
                subs.push(subreddit);
            }
        });

        // Way too big of a performance issue.
        $(subs).each(function () {
            var currsub = this;

            $.getJSON('http://www.reddit.com/r/' + currsub + '/wiki/usernotes.json', function (json) {

                if (json.data.content_md) {

                    notes = JSON.parse(json.data.content_md);
                    if (!notes || notes.length < 1) return;

                    $(things).each(function () {
                        var thing = this;
                        var user = getThingInfo(this).user;

                        $.grep(notes.users, function (u) {

                            if (u.name == user) {
                                var usertag = $(thing).find('.add-user-tag-' + currsub);
                                $(usertag).css('color', 'red');
                                if (u.notes.length == 1) {
                                        $(usertag).text(unescape(u.notes[0].note));
                                } else {
                                        $(usertag).text('N:' + u.notes.length);
                                }
                            }
                        });
                    });
                }
            });
        });
    }

    function run() {
        if (modmail) return;

        var things = $('div.thing .entry');

        processThings(things);
    }

    $('body').delegate('.entry', 'click', function (e) {
        if (!modmail) return;
        subs = [];

        var things = $(e.target).parents('.message-parent').find('.entry');

        processThings(things);
    });

    $('body').delegate('#add-user-tag', 'click', function (e) {
        var thing = $(e.target).closest('.thing .entry'),
            info = getThingInfo(thing),
            subreddit = info.subreddit,
            user = info.user,
            link = info.link;

        // Make box & add subreddit radio buttons
        var popup = $('\
                    <div class="utagger-popup">\
                    <span>/u/' + user + ': <span><input type="text" class="user-note" user="' + user + '" subreddit="' + subreddit + '" link= "' + link + '"/>\
                    <input class="save-user" type="button" value="save for /r/' + subreddit + '"/>\
                    <input class="cancel-user" type="button" value="cancel"/>\
                    <label><input class="include-link" type="checkbox" checked/>include link</label<br><br>\
                    <table class="utagger-notes"><tr><td class="utagger-notes-td1">Author</td><td>Note</td></tr></table>\
                    <div>')
            .appendTo('body')
            .css({
                left: e.pageX - 50,
                top: e.pageY - 10,
                display: 'block'
            });

        $.getJSON('http://www.reddit.com/r/' + subreddit + '/wiki/usernotes.json', function (json) {

            if (json.data.content_md) {

                notes = JSON.parse(json.data.content_md);
                if (!notes || notes.length < 1) return;

                $.grep(notes.users, function (u) {
                    if (u.name == user) {

                        var i = 0;
                        $(u.notes).each(function () {
                            i++;
                            popup.find('table.utagger-notes').append('<tr><td class="utagger-notes-td1">' + this.mod + ' <br> <span class="utagger-date" id="utagger-date-' + i + '">' + new Date(this.time).toLocaleString() + '</span></td><td>' + unescape(this.note) + '</td></tr>');
                            if (this.link) {
                                popup.find('#utagger-date-' + i).wrap('<a href="' + this.link + '">');
                            }
                        });
                    }
                });
            }
        });
    });

    $('body').delegate('.save-user', 'click', function () {
        var popup = $(this).closest('.utagger-popup'),
            subreddit = popup.find('.user-note').attr('subreddit'),
            user = popup.find('.user-note').attr('user'),
            noteText = popup.find('.user-note').val(),
            link = '';

        if (popup.find('.include-link').is(':checked')) {
            link = popup.find('.user-note').attr('link');
        }

        if (!user || !subreddit || !noteText) return;
        
        // Important, if we do not reset notes we will leak tags across subs, if the wiki is a 404.
        notes = {
            ver: 1,
            users: []
        };

        var note = {
            note: escape(noteText),
            time: new Date().getTime(),
            mod: reddit.logged,
            link: link
        };

        var userNotes = {
            name: user,
            notes: []
        };

        userNotes.notes.push(note);

        $(popup).remove();

        $.getJSON('http://www.reddit.com/r/' + subreddit + '/wiki/usernotes.json', function (json) {

            if (json.data.content_md) {
                notes = JSON.parse(json.data.content_md);
            }

            if (notes) {
                var results = $.grep(notes.users, function (u) {

                    if (u.name == user) {

                        u.notes.unshift(note);
                        postToWiki(subreddit, notes);
                        return u;
                    }
                });

                if (!results || results.length < 1) {
                    notes.users.push(userNotes);
                    postToWiki(subreddit, notes);
                }
            } else {
                notes.users.push(userNotes);
                postToWiki(subreddit, notes);
            }
        })
            .error(function (e) {
                if (JSON.parse(e.responseText).reason == 'PAGE_NOT_CREATED') {
                    notes.users.push(userNotes);
                    postToWiki(subreddit, notes);
                }
            });
    });

    $('body').delegate('.cancel-user', 'click', function () {
        var popup = $(this).closest('.utagger-popup');
        $(popup).remove();
    });
}

// Add script to page
(function () {
    var css = '\
        .utagger-popup { max-width:900px;padding:10px 15px;background-color: #FAFAFA;border: 1px solid #808080 ;position:absolute;z-index:10000; box-shadow: 0px 1px 3px 1px #D6D6D6;} \
        .utagger-popup .right{ float:right }\
        .utagger-popup .left{ float:left }\
        .utagger-popup .status{ display:none; }\
        .utagger-popup .buttons{ padding-top:10px }\
        .add-user-tag:hover {text-decoration:underline}\
        .utagger-date { font-size: 80%;}\
                .utagger-notes { width: 100%; } \
                .utagger-notes td {     padding: 2px; border: solid 1px #C1BFBF; vertical-align: top; }\
                .utagger-notes-td1 { width: 65px; }\
        ';

    // Add CSS
    var style = document.createElement('style');
    style.type = "text/css";
    style.textContent = css;
    document.head.appendChild(style);

    var s = document.createElement('script');
    s.textContent = "(" + usernotes.toString() + ')();';
    document.head.appendChild(s);

})();

