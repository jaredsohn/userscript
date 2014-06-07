// ==UserScript==
// @name           Registered Commenter Filter for Slog and Line Out
// @description    Filters commenters and nests replies
// @icon           https://github.com/jonathancollins/the-stranger-greasemonkey/raw/a0fd7337551e5d843a9af2e8d9c28776183c8283/icon32.png
// @version        2.0.1
// @author         Jonathan Collins
// @copyright      2011 Jonathan Collins
// @attribution    Commenter filter idea and prototype by Dennis and Katrin Bratland
// @namespace      http://joncollins.name/
// @include        http://slog.thestranger.com/*/archives/*
// @include        http://lineout.thestranger.com/*/archives/*
// @include        http://www.thestranger.com/*/archives/*
// @include        http://www.thestranger.com/seattle/Comments?*
// @include        http://www.thestranger.com/seattle/*/Content?*
// @include        http://www.thestranger.com/seattle/SavageLove?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=48588
// ==/UserScript==

// Version 2.0.1
//
// * Fixed nesting not working with more than 2 comments referenced on a single @/#
// * Added "SHARE VIA" URL
//
// Version 2.0.0
//
// * Added option to enable/disable comment nesting using #N and @N references
//
// * Added option to enable/disable comment hiding
//
// * Hidden commenters stay hidden after using the "Registered" toggle button 
//
// * Support for online features and Savage Love
//
// Version 1.1.2
//
// * Clicking 'hide' or unchecking a box only acts on that user's comments (it was
//   hiding comments that had been opened by clicking a collapsed bar)
//
// * No longer interferes with the Stranger's built-in Registered/Unregistered
//   filters
//
// * Hide link is inserted after user website icon, if it exists
//
// Version 1.1.1
//
// * Added link to a google search on each filtered commenter
//
// Version 1.1.0
//
// * Utilized the built-in collapse controls to allow the user to show
//   a filtered comment
//
// * Included sizzlemctwizzle's auto update script
//
// Version 1.0.2
//
// * Added support for Line Out
//
// Version 1.0.1
//
// * Fixed "hide" link appearing next to anonymous comments. This might be
//   a useful feature in the anonymous comment script, but I left it out of
//   this one because anonymous commenter names can be sock-puppeted, etc.
//   This script is supposed to deal with registered commenters.
//
// Version 1.0.0
//
// * Initial release

$(document).ready(function()
{
    userOptions = getUserOptions();

    injectOptions();

    if (userOptions['nest']) {
        //check to make sure comments are in expected structure?
        var valid = true;

        //abort if not (could seriously break the page)
        if (valid)
        {
            nestComments();
        }
    }
    
    if (userOptions['hide']) {
        hideComments();
        injectAuthorCheckboxes();
        injectHideLinks();
    }    
});


/****************************************************
 *                                                  *
 *  Comment nesting                                 *
 *                                                  *
 ****************************************************/

function nestComments()
{
    var comments = {};
    var max = 0;
    var nests = {};

    $(".comment:not(.collapsed) .commentNumber").each(function(i, e)
    {
        //create a map of comment number to comment
        var n = parseInt(e.innerHTML);
        comments[n] = $(e).parent().parent();
    
        //get the highest comment number
        //for reverse iteration
        max = Math.max(max, n);
        
        //create a reply nest for each comment
        var nest = $(document.createElement('div'))
            .attr('id', comments[n].attr('id') + '-nest')
            .css('margin-left', '40px')
            .css('min-width', '260px')
            .addClass('nest')
            .insertAfter(comments[n]);

        nests[n] = nest;
    });
    
    //match replies in "#N" or "@N" format
    //also matches variants of "@N and M"
    var replyRegExp = /[#@] ?([0-9]+(?: ?(?:,|\/|and|&) ?[0-9]+)*)/g;
    var splitRegExp = / ?(?:,|\/|and|&) ?/;

    //loop through comments in reverse order
    for (var n = max; n > 0; n--)
    {
        //handle missing comments
        if (comments[n] == undefined)
        {
            continue;
        }

        var commentBody = $(".commentBody", comments[n])
        var parents = [];
        var match;

        //search for @N or #N references
        while ((match = replyRegExp.exec(commentBody.html())) != null)
        {
            //account for multiple references in one @/#
            var matches = match[1].split(splitRegExp);
            for (var i in matches) {
                var inReplyTo = parseInt(matches[i]);

                //avoid false positives and circular references
                if (inReplyTo < n && comments[inReplyTo] != undefined)
                {
                    //index by inReplyTo to avoid duplicating replies
                    parents[inReplyTo] = inReplyTo;
                }
            }
        }

        //nest the comment
        if (parents.length > 0)
        {
            for (p in parents)
            {
                //clone comment's nest
                var nestClone = nests[n].clone() 
                  .attr('id', parents[p] + '-' + nests[n].attr('id')); //assign new id

                //reassign ids inside nest
                $('.comment, .nest', nestClone).each(
                    function(i) {
                        $(this).attr('id', parents[p] + '-' + $(this).attr('id'));
                    }
                );

                //clone comment
                var commentClone = comments[n].clone()
                    .attr('id', parents[p] + '-' + comments[n].attr('id')); //assign new id

                //clone collapsed comment
                var collapsed = $('#' + comments[n].attr('id') + '-collapsed');
                
                var collapsedClone = collapsed.clone()
                    .attr('id', p + '-' + comments[n].attr('id') + '-collapsed'); //assign new id

                //make sure the expander acts on the correct comment
                var expander = $('a:first', collapsedClone);

                //using .attr('onclick', ...) or .removeAttr('onclick') is causing some
                //kind of conflict in a greasemonkey sandbox, so use the raw DOM
                expander.get(0).setAttribute('onclick', '');

                //using jQuery events simply doesn't work after the cloning process
                /*
                expander.click(function expand(event) {
                    $(event.target).parent().hide();
                    $(event.target).parent().next().fadeIn(0.5);
                });
                */

                //instead use The Stranger's prototype install with an onclick attribute
                expander.get(0).setAttribute('onclick', '$(this).up().hide();$(this).up().next().appear({duration:0.5});');

                //prepend everying to the parent's reply nest
                nests[p]
                    .prepend(nestClone)
                    .prepend(commentClone)
                    .prepend(collapsedClone);
            }
        }
    }
    
    //nesting complete
    //collapse all but the first instance of a comment
    var appeared = {};
    
    $(".comment:not(.collapsed) .commentNumber").each(function(i, e)
    {
        var n = parseInt(e.innerHTML);
        
        if (appeared[n] == undefined) {
            appeared[n] = true;
        }
        else {
            var comment = $(e).parent().parent();
            var commentId = comment.attr('id');
            
            var nestId = commentId + '-nest';
            var nest = $('#' + nestId);
            
            var collapsedId = commentId + '-collapsed';
            var collapsed = $('#' + collapsedId);
            
            //collapse comment in place
            comment.hide();
            
            nest.hide();

            //and give a message as to why it's collapsed
            collapsed
                .append($(document.createElement('p'))
                .css('text-align', 'left')
                    .append($(document.createElement('small'))
                        .html('The comment above is nested elsewhere')));

            collapsed.show();
        }
    });
}

/*
var message = $(document.createElement('small'))
        .html('The above comment is nested below comment'
            + (parents.length > 1 ? '(s)' : ''));

for (p in parents)
{
    var anchor = $('a:first', comments[parents[p]]).attr('name');

    message
        .append(document.createTextNode(' '))
        .append($(document.createElement('a'))
            .attr('href', '#' + anchor)
            .html(parents[p])
        );
}

collapsed.append($(document.createElement('p')).append(message));
*/


/****************************************************
 *                                                  *
 *  Comment hiding                                  *
 *                                                  *
 ****************************************************/

var authorStatus = getAuthorStatus();

function hideComments() {
    if ($("#BrowseComments").size() > 0) {
        $(".commentByline .commentAuthor").each(
            function(i) {
                // get the id of the comment div
                // also for use showing the collapse control

                var commentId  = $(this).parent().parent().attr('id');
                var collapseId = commentId + '-collapsed';

                // there is no need to check anonymity here
                // anonymous comments cannot sock puppet registered names

                var author = $(this).html();

                // hide the comment and show collapse control if author is set to invisible
                if (authorStatus[author] !== undefined) {
                    $('#' + commentId).hide();
                    $('#' + collapseId).show();
                }
            }
        );
    }
}

function setAuthorVisibility(author, visible) {
    if ($("#BrowseComments").size() > 0) {
        $(".commentByline .commentAuthor").each(
            function(i) {
                var currentAuthor = $(this).html();
                if (currentAuthor == author) {
                    var comment = $(this).parent().parent();
                    
                    //don't expand nested comments
                    if (comment.hasClass('nested')) {
                        return;
                    }
                    
                    // get the id of the comment div
                    // also for use showing the collapse control

                    var commentId  = comment.attr('id');
                    var collapseId = commentId + '-collapsed';

                    // hide or show the comment and collapse control

                    if (visible === false) {
                        $('#' + commentId).hide();
                        $('#' + collapseId).show();
                    }
                    else {
                        $('#' + commentId).show();
                        $('#' + collapseId).hide();
                    }
                }
            }
        );
    }
}


/****************************************************
 *                                                  *
 *  UI injection                                    *
 *                                                  *
 ****************************************************/

function injectSidebarDiv(div) {
    // append updated list to right sidebar
    var sidebar = $('#gridSpanningIsland');
    if (sidebar.size() > 0) {
        div.css('width', '330px');
        div.appendTo($('#gridSpanningIsland'));
    }

    // it's called something different on comment popups
    var sidebar = $('#gridRightSidebar');
    if (sidebar.size() > 0) {
        div.css('width', '280px');
        div.appendTo($('#gridRightSidebar'));
    }
    
    // and something else in online articles and Savage Love
    var sidebar = $('#mainRight');
    if (sidebar.size() > 0) {
        div.css('width', '330px');
        div.appendTo($('#mainRight'));
    }
}

function injectAuthorCheckboxes() {
    // create a sorted author list array
    var authors = new Array();
    for (var author in authorStatus) {
        authors.push(author);
    }

    if ($('#BrowseComments').size() > 0) {
        if (authors.length == 0) {
            //try to remove existing list
            $('#HiddenCommenters').remove();
            return;
        }

        //sort case insensitive
        authors.sort(function(x, y) {
            var a = x.toUpperCase();
            var b = y.toUpperCase();

            if (a > b) {
                return 1;
            }

            if (a < b) {
                return -1;
            }

            return 0;
        });

        // create the checkboxes and surrounding div
        var div = $(document.createElement('div'))
            .css('background', '#FFFFFF none repeat scroll 0 0')
            .css('float', 'left')
            .css('margin', '10px 0')
            .css('padding', '10px')
            .css('text-align', 'left');

        $(document.createElement('h2'))
            .addClass('sitesection')
            .text('Hidden Commenters')
            .appendTo(div);

        for (var i = 0; i < authors.length; i++) {
            getAuthorCheckbox(authors[i]).appendTo(div);
        }

        // remove existing list
        $('#HiddenCommenters').remove();

        div.attr('id', 'HiddenCommenters');

        injectSidebarDiv(div);
    }
}

function getAuthorCheckbox(author) {
    var div = $(document.createElement('div'));

    var input = $(document.createElement('input'))
        .attr('type', 'checkbox')
        .attr('value', author)
        .attr('checked', 'checked')
        .bind('change', function(e) {
            if (this.checked == true) {
                // this shouldn't actually happen...
                authorStatus[this.value] = true;
                setAuthorVisibility(this.value, false);
            }
            else {
                delete authorStatus[this.value];
                setAuthorVisibility(this.value, true);

                // ...because of this
                injectAuthorCheckboxes();
            }

            saveAuthorStatus();
        })

    //checkbox
    input.appendTo(div);

    //space
    $(document.createTextNode(' ')).appendTo(div);

    //link
    var a = $(document.createElement('a'))
            .attr('href', 'http://www.google.com/search?q=%22' + author.replace('/ /', '%20') + '%22%20site%3A' + document.domain + '&tbo=s&tbs=qdr:y,sbd:1')
            .attr('target', '_blank');
    $(document.createTextNode(author)).appendTo(a);
    a.appendTo(div);

    return div;
}

function injectHideLinks() {
    if ($("#BrowseComments").size() > 0) {

        $(".commentByline .commentAuthor").each(
            function(i) {
                //skip adding "hide" link next to anonymous comments
                if ($(this).hasClass('anonymous')) return;

                var author = $(this).html();

                var span = $(document.createElement('span'));

                var a = $(document.createElement('a'))
                    .text('hide')
                    .bind('click', function(e) {
                        authorStatus[author] = true;
                        setAuthorVisibility(author, false);
                        injectAuthorCheckboxes();
                        saveAuthorStatus();
                    })

                $(document.createTextNode(' [')).appendTo(span);
                a.appendTo(span);
                $(document.createTextNode(']')).appendTo(span);

                $('.commentDate', $(this).parent()).before(span);
            }
        );

    }
}

function injectOptions() {
    // create the checkboxes and surrounding div
    var div = $(document.createElement('div'))
        .css('background', '#FFFFFF none repeat scroll 0 0')
        .css('float', 'left')
        .css('margin', '10px 0')
        .css('padding', '10px')
        .css('text-align', 'left');

    $(document.createElement('h2'))
        .addClass('sitesection')
        .text('Options')
        .appendTo(div);
    
    hideOption = getOptionCheckbox('hide', 'Hide commenters', function(e) {
        userOptions['hide'] = this.checked;
        saveUserOptions();
        $('#refreshDiv').show();
    });
    
    hideOption.appendTo(div);
    
    nestOption = getOptionCheckbox('nest', 'Nest comments', function(e) {
        userOptions['nest'] = this.checked;
        saveUserOptions();
        $('#refreshDiv').show();
    });
    
    nestOption.appendTo(div);
    
    refreshDiv = $(document.createElement('div'))
        .attr('id', 'refreshDiv')
        .css('margin-top', '10px')
        .css('display', 'none');
    
    refreshButton = $(document.createElement('button'))
        .html('Refresh')
        .bind('click', function(e) { location.reload(true) })
        .appendTo(refreshDiv);
    
    refreshDiv.appendTo(div);
    
    injectSidebarDiv(div);
}

function getOptionCheckbox(name, label, event) {
    var option = $(document.createElement('div'));

    var checkbox = $(document.createElement('input'))
        .attr('type', 'checkbox')
        .attr('name', name + 'Option');
    
    if (userOptions[name] == true) {
        checkbox.attr('checked', 'checked');
    }
    
    checkbox.bind('change', event);
    
    checkbox.appendTo(option);
    
    $(document.createTextNode(' ')).appendTo(option);
    
    $(document.createElement('label'))
        .attr('for', name + 'Option')
        .html(label)
        .appendTo(option);
        
    return option;
}


/****************************************************
 *                                                  *
 *  Storage                                         *
 *                                                  *
 ****************************************************/

function saveUserOptions() {
    GM_setValue('userOptions', userOptions.toSource());
}

function getUserOptions() {
    var userOptions = GM_getValue('userOptions');
    
    if (userOptions === undefined) {
        userOptions = {
            hide: true,
            nest: true
        };
    }
    else {
        userOptions = eval(userOptions);
    }
    
    return userOptions;
}

function saveAuthorStatus() {
    GM_setValue('authorStatus', authorStatus.toSource());
}

function getAuthorStatus() {
    var authorStatus = GM_getValue('authorStatus');

    if (authorStatus === undefined) {
        authorStatus = new Object();
    }
    else {
        authorStatus = eval(authorStatus);
    }

    return authorStatus;
}
