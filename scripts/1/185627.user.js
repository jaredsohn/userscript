// ==UserScript==
// @name          click to add nick to chat
// @description   clicking on someones nick in the chat, adds it to your message
// @namespace     volafile.io
// @version       2
// @author        GNUsuks | Idea&code from https://github.com/binlain/volafile-bugs/issues/18
// @homepage      http://userscripts.org/scripts/show/185627
// @include       http://volafile.io/r/*
// @include       https://volafile.io/r/*
// @include       http://*.volafile.io/r/*
// @include       https://*.volafile.io/r/*
// @grant         none
// @run-at        document-end
// ==/UserScript==

var chat = $("#chat_input");

$('<style>.message b{cursor:pointer;}</style>').appendTo('head');

//Pick a style, comment the others
$(document).on("click", ".message b", function (e) {
//    chat.focus().val(chat.val()+' '+$(this).html().replace(/\(([^]+)\)/, "") + ' ');      //'Current textbox content'' NICK: '
//    chat.focus().val(chat.val()+' '+'@'+$(this).html().replace(/\(([^]+)\)/, "")+' ');    //'Current textbox content'' @NICK: '
//    chat.focus().val($(this).html().replace(/\(([^]+)\)/, "")+' '+chat.val());            //'NICK: ''Current textbox content'
//    chat.focus().val('@'+$(this).html().replace(/\(([^]+)\)/, "")+' '+chat.val());        //'@NICK: ''Current textbox content'
});