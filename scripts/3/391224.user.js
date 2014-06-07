// ==UserScript==
// @name        TwitchPlaysPokemon Chat Fix
// @namespace   http://twitch.tv/
// @version     0.1
// @match       http://twitch.tv/twitchplayspokemon
// @match       http://www.twitch.tv/twitchplayspokemon
// ==/UserScript==

// Original code by /u/RenaKunisaki with /u/smog_alado's excelent notes 
// Spam button by /u/SRS-SRSLY. Chat Scroll Improvement by /u/schrobby
// Compressed by http://javascriptcompressor.com.
// Passes http://www.jslint.com on default settings

// Identify the chat button
var chatButton = $("ul.segmented_tabs li a").first();

// Add spam button after the chat button
$("<li><a class='CommandsToggle'>Commands</a><a class='ChatToggle'>Talk</a></li>").insertAfter(chatButton);

// Reduce the width of the chat button by 71px.
// This gives enough space for a spam button width 30px with 15px margins with an extra pixel of wiggle room
chatButton.css("width", chatButton.width() - 71);

// Spam buttons make quick and dirty css rules to turn chat spam on or off. 
$(".CommandsToggle")
    .click(function () {
        "use strict";
        $("a.CommandsToggle").toggleClass("selected");

        if ($(".commandsHideCSS").length !== 0) {
            $(".commandsHideCSS").remove();
        } else {
            $("<style type='text/css' class='commandsHideCSS'>#chat_line_list li.cSpam{display:inline;}</style>").appendTo("head");
        }
    }
        );

// Same for the Twitch Chat
$(".ChatToggle")
    .click(function () {
        "use strict";
        $("a.ChatToggle").toggleClass("selected");

        if ($(".chatHideCSS").length !== 0) {
            $(".chatHideCSS").remove();
        } else {
            $("<style type='text/css' class='chatHideCSS'>#chat_line_list li.cSafe{display:inline;}</style>").appendTo("head");
        }
    }
        );

// Simulate a click on ChatToggle, so it starts in the "on" position.
$(".ChatToggle").click();

CurrentChat.line_buffer = 800;

//This part creates a CSS rule
//that hides all chat messages by default
var extraCSS =
    " <style type='text/css' >                                " +
    " .segmented_tabs li li a.CommandsToggle {                " +
    "     width: 50px;                                        " +
    "     padding-left: 0px;                                  " +
    "     padding-top: 0;                                     " +
    "     height: 8px;                                        " +
    "     line-height: 115%;                                  " +
    " }                                                       " +
    "                                                         " +
    " .segmented_tabs li li a.ChatToggle {                    " +
    "     width: 35px;                                        " +
    "     padding-left: 15px;                                 " +
    "     padding-top: 0;                                     " +
    "     height: 8px;                                        " +
    "     line-height: 115%;                                  " +
    " }                                                       " +
    "                                                         " +
    " #chat_line_list li {                                    " +
    "     display:none;                                       " +
    " }                                                       " +
    " </style>                                                ";

$(extraCSS)
    .appendTo("head");  // <- and adds the rule to the page

// setInterval makes this part of the code run periodically
setInterval(function () {
    "use strict";

    // The `#chat_line_list` references the chat box
    // and the `li` references the individual chat items inside it.
    // Thus, run for each chat box item,
    // This part of the script is the part where it sends chat commands  
    // to release Abby and Jay Leno. Hail Dome Fossil. Hail Flareon. 
    $('#chat_line_list li:not(.cSpam):not(.cSafe)')
        .each(function () {

            // cLine is a reference a single line in chat.
            // cLine.text gets the chat text
            // split(':') breaks the text into the username and the message
            // [1] selects the chat message (rather than the username)
            // In this way cText is cLine's (trimmed) message.

            var cLine = $(this),
                cText = cLine.find(".chat_line").text();

            // Use a regular expression to see if the message matches
            // a pattern. If it's not (!) a message that 
            //  starts (^)
            //  is followed by one of the commands 
            //    (up|down|...)
            //  and immediately ends ($)
            // Then we show the message.
            // Once we get to Cinnabar Island, this section revives that fool Helix,
            // then releases it into the wild! Hail Dome Fossil! Hail Flareon!
            if (cText && !cText.match(/^(up|down|left|right|a|b|start|select?)$/i)) {
                cLine.addClass("cSafe");
            } else {
                cLine.addClass("cSpam");
            }
        });

    if (CurrentChat.currently_scrolling) { CurrentChat.scroll_chat(); }

}, 100);  // <- run every 100 milliseconds