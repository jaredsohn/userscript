// ==UserScript==
// @name            Douban Topic Talk
// @description     Open douban group topics in a popup
// @version         0.2
// @author          Wu Yuntao <http://blog.luliban.com>
// @namespace       http://blog.luliban.com
// @include         http://www.douban.com/*
// ==/UserScript==

var $ = jQuery = unsafeWindow.jQuery;
var console = unsafeWindow.console || { debug: function() {} };

$(function() {
    setTimeout(initial, 0);
});

function initial() {
    if (inframe()) {
        $('body').doubanTopicPopupStyle();
    } else {
        $('a').click(function() {
            var url = $(this).attr('href');
            if (isValid(url)) {
                $('#douban-talk-popup')
                    .doubanTopicPopup({ url: url, open: true });
                return false;
            }
        });
    }
}

function inframe() {
    return location.href.match(/#douban\-talk\-popup$/);
}

function isValid(url) {
    var pattern = /(http:\/\/www\.douban\.com)?\/group\/topic\/\d+\/(\?.*)?/;
    if (url.match(pattern)) return true;
    else return false;
}

$.fn.doubanTopicPopup = function(action, options) {
    if (typeof action == 'object') {
        options = action;
        action = 'init';
    }

    options = $.extend({
        url: location.href,
        open: false
    }, options || {});

    var popup = this;
    var iframe = this.children('iframe');

    var popupStyles = {
        'background': '#c3d9ff',
        'width': '360px',
        'height': '360px',
        'padding': '3px',
        'position': 'fixed',
        'right': '0',
        'bottom': '0',
        'display': 'none',
        'border': '1px solid #ccc'
    };
    var iframeStyles = {
        'border': 'none',
        'overflow-x': 'hidden'
    };

    switch(action) {
        case 'open': return open();
        case 'close': return close();
        case 'toggle': return toggle();
        case 'init':
        default: return init();
    }

    function init() {
        if (!popup.length) {
            popup = $('<div></div>')
                        .attr('id', 'douban-talk-popup')
                        .css(popupStyles)
                        .appendTo('#maxw');
            iframe = $('<iframe></iframe>')
                         .attr('id', 'douban-talk-popup-iframe')
                         .attr('src', format(options.url))
                         .attr('width', '100%')
                         .attr('height', '100%')
                         .css(iframeStyles)
                         .appendTo(popup);

            if (options.open) return open();
        } else {
            iframe.attr('src', format(options.url));
        }
        return popup;
    }

    function format(url) {
        return url + '#douban-talk-popup';
    }

    function open() {
        return popup.addClass('popup-open').fadeIn('normal');
    }

    function close() {
        return popup.removeClass('popup-open').fadeOut('normal');
    }

    function toggle() {
        throw new Error("Not Implemented");
    }
};

$.fn.doubanTopicPopupStyle = function() {
    var styles =
        'body { font-size: 12px; }' +
        'body > h1 { background: #c3d9ff; font-size: 14px; line-height: 20px; margin: 0; padding: 2px; position: fixed; top: 0; left: 0; right: 0; }' +
        'body img { padding: 2px; }' +
        'body > .post { font-size: 12px; width: 340px; margin: 5px; padding: 24px 20px 0 0; }' +
        '.post span.mn { font-size: 12px; color: #999; display: block; }' +
        '.post span.pl2 { font-size: 12px; color: black; }' +
        '.post .post-icon { float: right; }' +
        '.post .post-body { margin: 3px; padding: 0; }' +
        '.post .post-body .wrc { margin: 5px 0 0; padding: 3px; }' +
        'body > .reply { width: 335px; margin: 0; padding: 5px 20px 0 5px; border-top: 1px solid #ccc; }' +
        '.reply span.wrap { background: #fff; }' +
        '.reply .wrap h4 { background: #fff; color: #999; line-height: 16px; margin: 0; padding-bottom: 5px; }' +
        '.reply p.wrc { margin: 0; padding: 0; }' +
        '.reply .group_banned { display: none; }' +
        '.reply .reply-icon { float: left; }' +
        '.reply-even, .reply-even .wrap, .reply-even .wrap h4 { background: #e2edff; }' +
        '.reply-even .reply-icon { float: right; }' +
        'body > .post-comment { font-size: 12px; width: 340px; margin: 10px; padding: 0 20px 0 0; }' +
        '.post-comment textarea#last { width: 300px; height: 40px; }' +
        '';
    var sheet = $('<style></style>')
                    .attr('type', 'text/css')
                    .text(styles)
                    .appendTo('head');
    return this
        .popupTitle()
        .popupPost()
        .popupReply()
        .popupPaginator()
        .popupForm()
        .children('#maxw')
            .remove()
            .end()
        .find('a')
            .click(openUrl)
            .end();

    function openUrl() {
        window.open($(this).attr('href'));
        return false;
    }
};

$.fn.popupTitle = function() {
    return this
        .find('#maxw > h1')
            .appendTo('body')
            .end();
};

$.fn.popupPost = function() {
    var post = $('<div></div>')
                   .attr('class', 'post')
                   .append('<div class="clear"></div>');
    var body = $('<div></div>')
                   .attr('class', 'post-body')
                   .prependTo(post);
    var icon = $('<div></div>')
                   .attr('class', 'post-icon')
                   .prependTo(post);
    return this
        .find('#in_tablem > .wr td.wrtd > a')
            .appendTo(icon)
            .end()
        .find('#in_tablem > .wr td.wrtd + td:first *:lt(5)')
            .appendTo(body)
            .end()
        .append(post);
};

$.fn.popupReply = function() {
    var body = this;
    var replyTable = this.find('#in_tablem > .wr td.wrtd + td:first table.wr');

    $.each(replyTable, function() {
        body.append(createReply($(this)));
    });

    return this
        .find('.reply:even')
            .addClass('reply-even')
            .end();

    function createReply(table) {
        var reply = $('<div></div>')
                       .attr('class', 'reply')
                       .append('<div class="clear"></div>');
        var body = $('<div></div>')
                       .attr('class', 'reply-body')
                       .html(table.find('td:last').html())
                       .prependTo(reply);
        var icon = $('<div></div>')
                   .attr('class', 'reply-icon')
                   .html(table.find('td:first').html())
                   .prependTo(reply);
        return reply;
    }
};

$.fn.popupPaginator = function() {
    return this;
};

$.fn.popupForm = function() {
    return this
        .find('#in_tablem > .wr td.wrtd + td:first div.txd')
            .addClass('post-comment')
            .appendTo('body')
            .find('form')
                .submit(comment)
                .end()
            .end();

    function comment() {
        $.post('add_comment', $(this).serialize(), function() {
            location.reload(true);
        });
        return false;
    }
};
