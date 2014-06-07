// ==UserScript==
// @name           OWAwesome
// @namespace      http://takeo.info
// @description    An attempt to make OWA bearable, and maybe even awesome
// @author         Toby Sterrett
// @include        *your.exchange-server.com*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// All your GM code must be inside this function
function letsJQuery() {

    var OWA = {};
    $.OWA = OWA;

    // hotkeys plugin courtesey of defunkt
    $.hotkeys = function(options) {
        for(key in options) $.hotkey(key, options[key]);
        return this;
    };

    // set up some special keys
    $.hotkeys.specialKeys = {'esc': 27, 'enter': 13};

    // place the key / mapping into the cache; accepts a function or url
    $.hotkey = function(key, value) {
        var mapKey = null;
        if ($.hotkeys.specialKeys[key] != null) {
            mapKey = $.hotkeys.specialKeys[key];
        } else {
            charcode = key.charCodeAt(0);
            // if it's not an ascii numeric (eg: '0', '1', ...), I think he was trying to fold lowercase into uppercase :\
            // stop the shenanagins
            // mapKey = (charcode >= 48 && charcode <= 57) ? charcode : (charcode - 32);
            mapKey = charcode;
        }
        $.hotkeys.cache[mapKey] = value;
        return this;
    };

    $.hotkeys.cache = {};

    // krb: outlook web access can have anchors with a hotkey...pull those into the mapping too...
    $('a[hotkey]').each(function() {
                            $.hotkey($(this).attr('hotkey'), $(this).attr('href'));
                        });

    // this finds the checkboxes
    // jQuery(window.parent.frames[1].document).find('table tr :checkbox')
    // need to enhance it to find the row so we can set effects on it...
    OWA.navDocument = function () {
        return $(window.parent.frames[0].document);
    };

    OWA.mainBodyDocument = function () {
        return $(window.parent.frames[1].document);
    };

    OWA.isOnEmailListView = function () {
        // are there any td's with class List?
        return OWA.mainBodyDocument().find('td.List').length > 0;
    };

    OWA.isViewingEmail = function () {
        return OWA.mainBodyDocument().find('[name="MainForm"]').length > 0;
    };

    OWA.isViewingFolders = function () {
        return OWA.mainBodyDocument().find('table:contains("Move"):contains("Folder"):contains("Picker")').length > 0;
    };

    OWA.getEmailListTable = function () {
        if ( ! OWA.isOnEmailListView() ) return false;
        return OWA.mainBodyDocument().find('table:not(.tblView):has(td:has(input[type="checkbox"]))');
    };

    OWA.theRows = [];
    OWA.getEmailRows = function () {
        if ( ! OWA.isOnEmailListView() ) return false;
        OWA.theRows = OWA.getEmailListTable().find('tr:not(:first)');
        return OWA.theRows;
    };


    // question: does this need to be on the document, or each frame in the frameset?
    OWA.keyboardHandler = function(e) {
        console.log('keydown.hotkey'
                  + ', keyCode:' + e.keyCode + '/' + String.fromCharCode(e.keyCode)
                  + '; which:'   + e.which   + '/' + String.fromCharCode(e.which)
                  + '; e.target: ' + e.target);

        // don't hotkey when typing in an input
        if ($(e.target).is(':input')) {
            console.log('keydown.hotkey: target is :input, not executing handler');
            return true;
        }

        // e.shiftKey is ok, but allow ctrl/alt/meta (and tab) to be handled by the browser...
        if (e.ctrlKey || e.altKey || e.metaKey) {
            console.log('keydown.hotkey: key is modified (shift/ctrl/alt/meta)');
            return true;
        }

        e.preventDefault();
        var el = $.hotkeys.cache[e.which];
        console.log('keydown.hotkeys: handler is: ' + el);
        if (el) $.isFunction(el) ? el.call(this) : window.location = el;
        return true;
    };

//     jQuery.bind('owa.onPageChange',function () {
//         OWA.theRows = [];
//     });

    $(document).keypress(OWA.keyboardHandler);

    $.nav = {};

    $.nav.subfolder = function(title) {
        console.log(title);
        if ($('a[title=' + title + ']'))
            return $('a[title=' + title + ']').attr('href');
        else
            return false;
    };

    $.nav.activeTab = function() {
        return $('a.pn.s').attr('title');
    };

    // var records = $('table.lvw > tbody > tr:visible:not(:has(th, td.ohdv))');

    OWA.hasCurrentRow  = function () {
        return !(typeof(OWA.currentRow) == "undefined");
    };

    OWA.setCurrentRowHighlight = function () {
        if (OWA.hasCurrentRow() && OWA.isOnEmailListView() ) {
            console.log('OWA.setCurrentRowHighlight: ' + OWA.currentRow);
            var records = OWA.getEmailRows();
            var current = OWA.mainBodyDocument().find('tr[current="current"]')[0];
            if (current)        $(current).removeAttr('current').find('td').css('background-color','transparent');
            $(records[OWA.currentRow]).attr('current','current').find('td').css('background-color','#fc3');
        }
    };

    // TODO: if on the email list view, highlight the next/prev email
    // if viewingin an email, go to the next email (click the up or down button)
    // if on the folder view, select the next folder radio button
    // if at the last email on the page, and doing 'next' go to the next page
    // if at the first email on the page, and doing 'prev' go to the prev page (if possible)
    $.nav.go = function(direction) {
        var records = OWA.getEmailRows();
        if (records.length < 1) return false;

        if (!OWA.hasCurrentRow()) {
            OWA.currentRow = -1;
        }

        OWA.currentRow = direction == 'prev' ? OWA.currentRow-1 : OWA.currentRow+1;
        if (OWA.currentRow < 0) {
            OWA.currentRow = 0;
        }

        if (OWA.currentRow >= records.length) {
            OWA.currentRow = records.length - 1;
        }

        OWA.setCurrentRowHighlight();
        // TODO: scroll the view so the current row can be seen if necessary
        return true;
    };

    $.nav.open = function() {
        var anchor = OWA.mainBodyDocument().find('tr[current=current] a');
        if (anchor.length < 1) return false;
        return OWA.mainBodyDocument()[0].location = anchor.attr('href');
    };

    $.nav.page = function(dir) {
        if ($('img[title*=' + dir + ']').length > 0) return $($('img[title*=' + dir + ']')[0]).parent().click();
        if ($('td.nv a[title*=' + dir + ']').length > 0) return $('td.nv a[title*=' + dir + ']').click();
        return null;
    };

    $.nav.click = function(btn) {
        return $('a.btn[title=' + btn + ']').click();
    };

    $.nav.esc = function() {
        $.nav.click('Close');
        $.nav.click('Cancel');
        $('tr[current=current]')
            .removeAttr('current')
            .find('td')
            .css('background-color','transparent');
    };

    OWA.gotoInbox = function () {
        console.log('OWA.gotoInbox()');
        OWA.inboxUrl = window.parent.frames[1].src;
        var href = OWA.navDocument().find('a:contains("Inbox")')[0].href;
        window.parent.frames[1].document.location = href;
        // jQuery.trigger('owa.onPageChange');
        // wait for it to load and then re-highlight the current row if there is one...
        window.setTimeout(OWA.setCurrentRowHighlight,200);
        return true;
    };

    OWA.deleteSelectedItems = function () {
        var elt = OWA.mainBodyDocument().find('a[title="Delete"]');
        console.log('deleteSelectedItems: elt=' + elt);
        console.log('window.frames :' + window.parent.frames);
        console.log('window.frames[1] :' + window.parent.frames[1]);
        window.parent.frames[1].document.location = "javascript:SetCmd(document.msgViewer.CmdDelete.value);";
        // jQuery.trigger('owa.onPageChange');
        return true;
    };

    OWA.clickOutlookLink = function(selector) {
        var elt = OWA.mainBodyDocument().find(selector)[0];
        console.log('OWA.clickOutlookLink: selector="' + selector + '"; href=' + elt.href);
        window.parent.frames[1].document.location = elt.href;
        // jQuery.trigger('owa.onPageChange');
        return true;
    };

    OWA.linkClicker = function (selector) {
        return function () {
            return OWA.clickOutlookLink(selector);
        };
    };

    OWA.newMessage = function() {
        window.parent.frames[1].document.location = OWA.mainBodyDocument().find('a[title="New Message"]')[0].href;
        // jQuery.trigger('owa.onPageChange');
    };

    OWA.moveSelectedToFolder = function() {
        window.parent.frames[1].document.location = OWA.mainBodyDocument().find('a[title="Move"]')[0].href;
        // jQuery.trigger('owa.onPageChange');
    };

    OWA.selectAllCheckboxes = function () {
        $(window.parent.frames[1].document).find('table tr :checkbox').attr('checked',true);
    };

    // break the hotkeys out into a multi-map, support unmodified and
    // modified keybindings, eg, so we can use '#' like in gmail...
    // right now, based on how the code is doing the keymappings, it's
    // ignoring modified keys (like shift)
    $.hotkeys({
                  'j':     function() { $.nav.go('next'); },
                  'k':     function() { $.nav.go('prev'); },
                  'enter': function() { $.nav.open(); },
                  // TODO: the 'u' handler should refresh if on the list of emails,
                  // and go back to the list of emails if on any other view
                  'u':     OWA.gotoInbox,
                  'x':     function() { OWA.mainBodyDocument().find('tr[current=current] :checkbox').click(); },
                  '#':     OWA.deleteSelectedItems,
                  'd':     OWA.deleteSelectedItems,
                  'n':     OWA.newMessage,
                  'y':     OWA.moveSelectedToFolder,
                  'r':     OWA.linkClicker('a[title="Reply"]'),        // function() { $.nav.click('Reply'); },
                  'a':     OWA.linkClicker('a[title="Reply to all"]'), // function() { $.nav.click('Reply to All'); },
                  'w':     OWA.linkClicker('a[title="Forward"]'),       // function() { $.nav.click('Forward'); }
                  '*':     OWA.selectAllCheckboxes,
/*
                  '1': function() { $('a[title=Mail]').click(); },
                  '2': function() { $('a[title=Calendar]').click(); },
                  '3': function() { $('a[title=Contacts]').click(); },
                  'f': function() { $('#txtSch').focus(); },
                  //'d': function() { $.nav.click('Delete'); },
                  //'u': function() { $.nav.click('Junk'); },
                  'l': function() { $.nav.page('Next'); },
                  'h': function() { $.nav.page('Previous'); },
                  'esc': function() { $.nav.esc(); }
*/
	      });

    console.log('bindings applied');
    console.log('frameset:' + $('frameset').innerHTML);

    OWA.inboxUrl = window.parent.frames[1].src;
}

// Check if jQuery's loaded
function GM_wait() {
    if (typeof(unsafeWindow.jQuery) === 'undefined') {
        console.log('GM_wait, waiting and trying [again?] (for jQuery toload...)');
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
        console.log('w00t! jQuery is loaded: ' + $);
    }
}

GM_wait();

letsJQuery();


