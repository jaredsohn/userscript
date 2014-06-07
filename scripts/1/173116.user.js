// ==UserScript==
// @name        v2ex-reply-context
// @namespace   http://github.com/leoleozhu
// @description click on @username will display the recent reply by that user
// @include	*://*.v2ex.com/t/*
// @include	*://v2ex.com/t/*
// @version     0.1.0
// ==/UserScript==

var w = unsafeWindow;
var $ = w.$;

String.prototype.format = String.prototype.f = function() {
    var s = this, i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(function(){
    $('.reply_content [href*="/member/"]').click(function(){
        var username = $(this).text();
        var user_href = ($(this).attr('href'));
        var this_cell = $(this).parents('.cell,.inner');

        // check the quoted text is already loaded, if so toggle display and return false
        var quoted = (this_cell.find('.quoted[data-author="{0}"]'.format(username)));
        if (quoted.length !== 0)
        {
            quoted.toggle();
            return false;
        }

        // find the quoted text...
        var target_cell = this_cell;
        do{
            target_cell = target_cell.prev('.cell,.inner');
        }while(target_cell.length !== 0
               && $(target_cell.find('strong [href*="/member/"]')).attr('href') != user_href);

        if (target_cell.length !== 0)
        {
            // found quoted text and display it
            var content = (target_cell.find('.reply_content').html());
            var content_div = $('<div class="quoted" data-author="{0}"><b>{0}：</b><br/><p>{1}</p></div>'.format(username, content))
                .css('border', '1px dashed #888')
                .css('border-radius', '6px')
                .css('margin-top', '6px')
                .css('padding', '8px');

            this_cell.find('.reply_content').after(content_div);
        }
        else
        {
            // can not find the quoted, deleted post?
            var msg = "没找到该用户的发言，该发言可能已经被移除。";
            var msg_div = $('<div class="err">{0}</div>'.format(msg))
                .css('color', '#800')
                .css('border', '1px dashed #800')
                .css('margin-top', '6px')
                .css('padding', '8px');
            msg_div.insertAfter(this_cell.find('.reply_content')).delay(2000).fadeOut();
        }

        return false;
    });
});
