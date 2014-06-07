// ==UserScript==
// @name           Stack Overflow Simple Keyboard Navigation
// @namespace      http://userscripts.org/users/bryanjamesross
// @include        http://stackoverflow.com/
// @require        http://code.jquery.com/jquery-1.7.min.js
// @require        https://raw.github.com/litera/jquery-scrollintoview/master/jquery.scrollintoview.min.js
// ==/UserScript==

if(unsafeWindow.console) {
    GM_log = unsafeWindow.console.log;
    GM_err = unsafeWindow.console.error;
}

$(function(){

    var focus = null;

    var focusStyle = {
        boxShadow: '0 0 5px #0064ff inset',
        backgroundColor: '#fdb'
    };

    var setFocus = function(elem) {
        if(focus)
            $(focus).removeAttr('style');

        $(elem).css(focusStyle);
        focus = $(elem).get(0);

        // Ensure element is visible
        var docTop = $(window).scrollTop();
        var docBottom = docTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        $(focus).scrollintoview({duration:'fast', direction: 'y'});
    }

    var handlers = {
        '74': function() {
            if(focus == null) {
                setFocus($('div.question-summary:first-child'));
            } else if(!$(focus).is(':last-child')) {
                setFocus($(focus).next());
            }
        },
        '75': function() {
            if(focus != null && !$(focus).is(':first-child')) {
                setFocus($(focus).prev());
            }
        },
        '79': function() {
            if(focus) {
                location.href = $('a.question-hyperlink', focus).attr('href');
            }
        },
        '82': function() {
            location.reload();
        }
    };

    $(document).on('keydown', function(evt) {
        try {
            if(handlers && handlers[evt.which]) {
                handlers[evt.which]();
            }
        } catch(err) {
            GM_err(err);
        }
    });

    $('div#question-mini-list').on('click', 'div.question-summary', function(evt) {
        setFocus(this);
    });
});

