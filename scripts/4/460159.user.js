// ==UserScript==
// @name       Nocontext Reddit Script
// @namespace  http://jonathon-vogel.com
// @version    0.1
// @description  Adds "Submit to /r/nocontext" links to Reddit comments
// @match      http://reddit.com/*/comments/*
// @match      http://*.reddit.com/*/comments/*
// @copyright  2014+, Rotten194
// ==/UserScript==

var context = 2;

//based on http://stackoverflow.com/questions/6251937/how-to-get-selecteduser-highlighted-text-in-contenteditable-element-and-replac
function get_selection_html() {
    var html = undefined;
    if (typeof window.getSelection != 'undefined') {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement('div');
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != 'undefined') {
        if (document.selection.type == 'Text') {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

$('.comment:not(.deleted) .buttons').each(function() {
    var $buttonul = $(this);
    if (!$buttonul.is(':empty')) { // fix because :not(.deleted) not working for some reason
        var $nocontext = $('<a href="javascript:void(0)">submit to /r/nocontext</a>');
        $nocontext.click(function() {
            var sel = get_selection_html();
            if (sel) {
                var title = window.encodeURIComponent('"' + sel + '"');
                var permalink = $('a:contains(\'permalink\')', $buttonul)[0].href;
                var link = 'http://www.reddit.com/r/nocontext/submit?title=' + title + '&url=' + window.encodeURIComponent(permalink) + '?context=' + context;
                GM_openInTab(link);
                $('a:contains(\'reply\')', $buttonul.parent()).click();
                setTimeout(function() {
                    $($('textarea', $buttonul.parent().parent().parent())[0]).val('>' + sel + '\n\n/r/nocontext');
                }, 1000);
            } else {
                alert('You have to highlight something in the post!');
            }
        });
        var $li = $('<li>');
        $li.append($nocontext);
        $buttonul.append($li);
    }
});