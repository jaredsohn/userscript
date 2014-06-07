// ==UserScript==
// @name            SaltyBet - The Important Bits.
// @namespace       
// @version         0.5
// @description     Moves the video to the left, reduces font sizes.
// @include         /^https?://(www\.)?saltybet\.com
// @include         *saltybet.com*
// @include         http://www.twitch.tv/chat/embed?channel=saltybet&popout_chat=true
// @copyright       2013, NickPancakes
// ==/UserScript==

$('#sbettorswrapper').remove();
$('#footer').remove();
$('#status').remove();
$('ul').remove(":contains('Odds')");
$('#content').css({
    "bottom": "0px"
});
$('#tournamentname').css({
    "left": "210px",
    "position": "absolute"
});
$('#videoEmbed').css({
    "left": "1px",
    "width": "67%",
    "margin-left": "0"
});
$('#chatWrapper').css({
    "width": "33%"
});
$('#stream').css({
    "bottom": "80px"
});
$('#bottomcontent').css({
    "min-height": "75px",
    "height": "75px",
    "bottom": "0px"
});
$('#wagerwrapper').css({
    "font-size": "12px"
});

var cache = $("span").filter(":contains('Place your bet')").children();
$("span").filter(":contains('Place your bet')").html("<span id=\"betstatus\"></span>").append(cache);
$('#wager').css({
    "font-size": "14px",
    "text-align": "center"
});
$('#wager').after("<br /><span class=\"hudtext\">Last Bet: <span id=\"lastbet\">N/A</span> - Odds: <span id=\"odds\">N/A</span></span>");
$('#player2wager').css({
    "right": "30px",
    "bottom": "10px",
    "position": "absolute"
});
$('#player1wager').css({
    "left": "20px",
    "bottom": "10px",
    "position": "absolute"
});
$('div.betcard').css({
    "height": "40px",
    "width": "30%",
    "font-size": "14px",
    "margin": "6px"
});
$('input.betbuttonred').css({
    "height": "35px",
    "width": "80px"
});
$('input.betbuttonblue').css({
    "height": "35px",
    "width": "80px"
});
