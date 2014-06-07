// ==UserScript==
// @name        Twitch Plays Pokemon Blue Chat Filter
// @namespace   http://www.reddit.com/r/twitchplayspokemon
// @description Removes command input from the Twitch.tv chat.
// @include     http://www.twitch.tv/trakof
// @exclude     %exclude%
// @version     1.0
// @grant       none
// ==/UserScript==
window.addEventListener('load', function () {
    var chatButton = $('ul.segmented_tabs li a').first();
    $('<li><a class=\'CommandsToggle\'>Commands</a><a class=\'ChatToggle\'>Talk</a></li>').insertAfter(chatButton);
    chatButton.css('width', chatButton.width() - 71);
    $('.CommandsToggle').click(function () {
        'use strict';
        $('a.CommandsToggle').toggleClass('selected');
        if ($('.commandsHideCSS').length !== 0) {
            $('.commandsHideCSS').remove()
        } else {
            $('<style type=\'text/css\' class=\'commandsHideCSS\'>#chat_line_list li.cSpam{display:inline;}</style>').appendTo('head')
        }
    });
    $('.ChatToggle').click(function () {
        'use strict';
        $('a.ChatToggle').toggleClass('selected');
        if ($('.chatHideCSS').length !== 0) {
            $('.chatHideCSS').remove()
        } else {
            $('<style type=\'text/css\' class=\'chatHideCSS\'>#chat_line_list li.cSafe{display:inline;}</style>').appendTo('head')
        }
    });
    $('.ChatToggle').click();
    CurrentChat.line_buffer = 800;
    var extraCSS = ' <style type=\'text/css\' > ' + ' .segmented_tabs li li a.CommandsToggle { ' + ' width: 50px; ' + ' padding-left: 0px; ' + ' padding-top: 0; ' + ' height: 8px; ' + ' line-height: 115%; ' + ' } ' + ' ' + ' .segmented_tabs li li a.ChatToggle { ' + ' width: 35px; ' + ' padding-left: 15px; ' + ' padding-top: 0; ' + ' height: 8px; ' + ' line-height: 115%; ' + ' } ' + ' ' + ' #chat_line_list li { ' + ' display:none; ' + ' } ' + ' </style> ';
    $(extraCSS).appendTo('head');
    setInterval(function () {
        'use strict';
        $('#chat_line_list li:not(.cSpam):not(.cSafe)').each(function () {
            var a = $(this), cText = a.find('.chat_line').text();
            if (cText && !cText.match(/^(up|down|left|right|a|b|start|select?)$/i)) {
                a.addClass('cSafe')
            } else {
                a.addClass('cSpam')
            }
        });
        if (CurrentChat.currently_scrolling) {
            CurrentChat.scroll_chat()
        }
    }, 100)
}, false)