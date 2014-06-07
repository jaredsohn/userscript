// ==UserScript==
// @name           Reddit keyboard control
// @namespace      http://reddit.com/user/dwdwdw
// @description    Navigate and vote on Reddit using the keyboard.
// @include        http://www.reddit.com/*
// ==/UserScript==

var CHARCODE_PREV = 107; // 'k'
var CHARCODE_NEXT = 106; // 'j'
var CHARCODE_HELP = 63;  // '?'
var CHARCODE_HIDE = 120; // 'x'
var CHARCODE_SAVE = 115; // 's'
var CHARCODE_UPMOD = 97; // 'a'
var CHARCODE_DOWNMOD = 122; // 'z'
var CHARCODE_OPEN = 118; // 'v'
var CHARCODE_COMMENTS = 99; // 'c'

// Combos
var CHARCODE_GOTO = 103; // 'g' ...
var CHARCODE_ALL = 97;          // 'a'
var CHARCODE_SAVED = 115;       // 's'
var CHARCODE_SUBREDDIT = 108;   // 'l'
var CHARCODE_INBOX = 105;       // 'i'
var CHARCODE_HOME = 104;        // 'h'
var CHARCODE_NEW = 110;         // 'n'
var CHARCODE_USER = 117;        // 'u'


var wnd = unsafeWindow;
var doc;
var $;

// List of default/user-selected Subreddits (array-of-string).
var subreddits = [];
// String URI to previous page of results or undefined.
var prevUri;
// String URI to next page of results or undefined.
var nextUri;

// jQuery object pointing to #siteTable.
var siteTable;
// jQuery object containing all DIV.things.
var things;
// jQuery object containing currently selected DIV.thing.
var selected;
// Integer index into things for currently selected DIV.thing.
var selectedIdx;

// Keypress state.

// Last key was beginning of combo.
var lastWasGoto = false;
// Currently doing Subreddit selection.
var inSubredditSelection = false;
// Help is currently open.
var inHelp = false;
// jQuery container with the selection box inside.
var selectionBox;
// jQuery container with the selection options inside.
var optionsBox;
// Current prefix filtering on.
var selectionPrefix;


function assert(bool, msg)
{
    if(! bool)
    {
        alert('reddit_keyboard_control.user.js is out of date: ' + msg);
        throw Error('assertion failed: ' + msg);
    }
}


// Ensure the selected item is visible in the viewport.
function ensureVisible()
{
    var selectedTop = selected.position().top;
    var selectedBottom = selectedTop + selected.outerHeight();

    var $wnd = $(wnd);
    var wndTop = $wnd.scrollTop();
    var wndBottom = wndTop + $wnd.height();

    if(selectedBottom > wndBottom)
    {
        $wnd.scrollTop(wndTop + (selectedBottom-wndBottom));
    }
    else if(selectedTop < wndTop)
    {
        $wnd.scrollTop(selectedTop);
    }
}


// direction: -1 for up; 1 for down.
function selectThing(direction)
{
    // Find the next non-hidden item.
    var newIdx = selectedIdx;
    do
    {
        newIdx += direction;

        // Ignore or navigate to previous page.
        if(newIdx < 0)
        {
            if(prevUri)
            {
                wnd.location = prevUri;
            }
            return;
        }

        // Ignore or navigate to next page.
        if(newIdx >= things.length)
        {
            if(nextUri)
            {
                wnd.location = nextUri;
            }
            return;
        }
    }
    while($(things[newIdx]).hasClass('hidden'));

    selected.removeClass('last-clicked');
    selectedIdx = newIdx;
    selected = $(things[newIdx]);
    selected.addClass('last-clicked');

    ensureVisible();
}


// Update Subreddit selection
function matches(prefix)
{
    function pred(item)
    {
        return item.toLowerCase().substr(0, prefix.length) == prefix;
    }
    return $.grep(subreddits, pred);
}


function updateSelection()
{
    var filtered = matches(selectionPrefix);

    if(filtered.length == 0)
    {
        selectionBox.hide();
        inSubredditSelection = false;
        return;
    }
    if(filtered.length == 1)
    {
        selectionBox.hide();
        wnd.location = '/r/' + filtered[0];
    }

    $('*', optionsBox).remove();
    optionsBox.text(filtered.join(', '));
}

// Start Subreddit selection.
function startSelection()
{
    inSubredditSelection = true;
    selectionPrefix = '';
    $('.__title', selectionBox).text('Type in a Subreddit name...');
    updateSelection();
    selectionBox.show();
}

function continueSelection(event)
{
    if(event.keyCode == 13)
    {
        var filtered = matches(selectionPrefix);
        if(filtered)
        {
            wnd.location = '/r/' + filtered[0];
            return;
        }
    }

    if(event.keyCode == 27)
    {
        inSubredditSelection = false;
        selectionBox.hide();
        return;
    }

    selectionPrefix += String.fromCharCode(event.charCode).toLowerCase();
    updateSelection();
}

function openHelp()
{
    function done()
    {
        inHelp = true;
        $('.__title', selectionBox).text('Shortcuts...');
        optionsBox.html(wnd.HELP_HTML);
        $('table', optionsBox).css('width', '100%');
        ($('td', optionsBox)
            .css('padding', '2px'));
        selectionBox.show();
    }

    $.getScript('http://greddit.googlecode.com/hg/help.js', done);
}

function onDocumentKeyPress(event)
{
    // Ignore keypresses in comment editor, etc.
    if(event.target.tagName != 'HTML')
    {
        return;
    }

    if(inHelp)
    {
        selectionBox.hide();
        inHelp = false;
        event.preventDefault();
        return;
    }

    if(inSubredditSelection)
    {
        return continueSelection(event);
    }

    switch(event.charCode)
    {
    case CHARCODE_PREV:
        selectThing(-1);
        break;

    case CHARCODE_NEXT:
        selectThing(+1);
        break;

    case CHARCODE_UPMOD:
    // case CHARCODE_ALL: // they're the same key.
        if(lastWasGoto)
        {
            wnd.location = '/r/all';
        }
        else
        {
            $('.up', selected).click();
        }
        break;

    case CHARCODE_DOWNMOD:
        $('.down', selected).click();
        break;

    case CHARCODE_OPEN:
        wnd.open($('a.title', selected).attr('href'), 'new');
        break;

    case CHARCODE_HELP:
        openHelp();
        break;

    case CHARCODE_COMMENTS:
        // Somehow .click() doesn't work.
        wnd.location = $('a.comments', selected).attr('href');
        break;

    case CHARCODE_HIDE:
        $('form.hide-button a', selected).click();
        selectThing(+1);
        break;

    case CHARCODE_SAVE:
        if(! lastWasGoto)
        {
            $('form.save-button a', selected).click();
            selectThing(+1);
        }
        else
        {
            wnd.location = '/saved';
        }
        break;

    // Combos.
    case CHARCODE_GOTO:
        break;

    case CHARCODE_SUBREDDIT:
        if(! lastWasGoto) return;
        startSelection();
        break;

    case CHARCODE_INBOX:
        if(! lastWasGoto) return;
        wnd.location = '/message/inbox';
        break;

    case CHARCODE_HOME:
        if(! lastWasGoto) return;
        wnd.location = '/';
        break;

    case CHARCODE_NEW:
        if(newUri)
        {
            wnd.location = newUri;
        }
        break;

    case CHARCODE_USER:
        if(! lastWasGoto) return;
        var href = $('#header-bottom-right .user a').attr('href');
        if(href) // Logged in?
        {
            wnd.location = href;
        }
        break;

    default:
        lastWasGoto = false;
        return;
    }

    lastWasGoto = (event.charCode == CHARCODE_GOTO);
    event.preventDefault();
}


function onWindowLoad(event)
{
    $ = wnd.$;
    assert($, 'cannot find jQuery');

    doc = wnd.document;
    assert(doc, 'cannot find window document.');

    siteTable = $('#siteTable', doc);
    // Not on an index page.
    if(! siteTable.length)
    {
        return;
    }

    // Build Subreddit list.
    $('.srdrop a.choice').each(function()
    {
        var elem = $(this);
        if(! elem.hasClass('bottom-option'))
        {
            subreddits.push($(this).text());
        }
    });

    selectionBox = ($('<div/>')
        .css({ width: '90%',
               left: '5%',
               padding: '10px',
               background: 'black',
               '-moz-border-radius': '10px',
               border: '1px solid black',
               opacity: 0.93,
               position: 'fixed',
               top: '10%',
               color: 'white',
               'z-index': 9001
        })
        .hide()
        .appendTo($('body', doc))
    );

    ($('<div/>')
        .css({ 'font-size': '20px',
               'text-align': 'center',
               'border-bottom': '1px solid silver',
               'margin-bottom': '8px',
               'font-weight': 'bold' })
        .addClass('__title')
        .appendTo(selectionBox)
    );

    optionsBox = ($('<div/>')
        .css({ 'font-size': '18px',
               padding: '10px',
               'color': 'yellow',
               'line-height': 2
             })
        .addClass('options')
        .appendTo(selectionBox)
    );

    things = $('.thing', siteTable);
    assert(things.length, 'cannot find any links');

    selected = $('.last-clicked', siteTable);
    assert(selected.length == 1 || selected.length == 0);

    // Find URI for new queue for this subreddit.
    $('.tabmenu li a').each(function()
    {
        var elem = $(this);
        if(elem.text() == 'new')
        {
            newUri = elem.attr('href');
        }
    });


    // Look to see if something was already selected, otherwise select the
    // first item on the page.
    if(selected.length)
    {
        for(var i = 0; i < things.length; i++)
        {
            if(things[i] == selected[0])
            {
                selectedIdx = i;
                break;
            }
        }

        assert(typeof selectedIdx === 'number',
               'Couldnt find index of selected item.');
        // TODO: make sure its scrolled to.
    }
    else
    {
        selected = $(things[0]);
        selected.addClass('last-clicked');
        selectedIdx = 0;
    }

    // Look for previous and next links. Reddit bug means we can't use rel
    // attribute value.
    $('.nextprev a', doc).each(function()
    {
        var href = $(this).attr('href');
        if(href.match(/before=/))
        {
            prevUri = href;
        }
        else if (href.match(/after=/))
        {
            nextUri = href;
        }
    });

    // Install kepress handler.
    $(doc).keypress(onDocumentKeyPress);
}


wnd.addEventListener('load', onWindowLoad, false);
