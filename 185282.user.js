// ==UserScript==
// @name          Volafile shift filelist bellow chat frame
// @description   Places filelist under chat and strech everything full width
// @namespace     http://volafile.io/
// @version       3
// @author        GNUsuks
// @homepage      http://userscripts.org/scripts/show/185282
// @include       http://volafile.io/r/*
// @include       https://volafile.io/r/*
// @include       http://*.volafile.io/r/*
// @include       https://*.volafile.io/r/*
// @grant         none
// @run-at        document-end
// ==/UserScript==

// Use alt + numpad0 to switch between styles

var Pheight;
var Sbounce;
var Mulv;
var Lastv;
var Fsize;
var Wrname
var isAlt = false;
var isMod = true;
var SSa = 300;
var SSb = 200;
var SSc = 250;
var Pagev = $('html, body');
var Hrow = $('#header_row2').height();
var Rname = $("#room_name");

//hide chat frame so filelist will load
$('#chat_frame').css({'display': 'none'});

//inject CSS things
function fcss() {
var Vcss1 = "<style>body{overflow:hidden}#files_frame{float:right!important;margin-top:3.5em!important;top:100%!important;width:100%!important}#header_row_container{left:0!important;position:absolute!important;top:100%!important}#chat_frame,#room_name_container{width:100%!important}</style>";
var Vcss2 = "<style>html.room #header #room_name{float:right!important;top:-0.5em!important;position:fixed!important;text-align:right!important;right:0!important;width:auto!important;z-index:1!important;opacity:0.2!important}html.room #header{height:0!important}html.room #chat_frame #chat_input{height:3em!important;margin-top:0em!important;margin-bottom:-1em!important}</style>";
var Vcss3 = "<style>html.room #header #header_row_container .header_row {float: left!important;}html.room #header #header_row_container {overflow:scroll!important;height: 1.9em!important;}#files_frame{float:right!important;margin-top:1.75em!important;}html.room #chat_frame #chat_hbar {display:none!important}#rename_container{z-index: 999!important;position:absolute!important;right:0!important}</style>";
    $(Vcss1).appendTo('head'); //main modifications
    $(Vcss2).appendTo('head'); //room name modifications
    $(Vcss3).appendTo('head'); //search and toggle modifications
}
fcss();

//small delay so file list is loaded before bring the chat back
setTimeout(function () {$('#chat_frame').css({'display': 'block'});}, 5);

//send a resize event to correctly place the chat frame
setTimeout(function () {$(window).resize();}, 5);

//Rotate the roomname
function rrname() {
    Wrname = Rname.width() - 20;
    Rname.css({
        'transform-origin': 'left',
        'margin-top': '0.5em',
        'transform': 'rotate(90deg)',
        'margin-right': '-' + Wrname + 'px'
    });
}
rrname();

// =========================== Scrolling hotkeys. =========================== //
// alt+1 - scroll between
// alt+2 - half and half
// alt+3 - short chat, long filelist
// alt+4 - long chat, short filelist
// if keys pressed are the same as the last keys pressed then, return to previous position
$(document).keyup(function (e) {
    if (e.which == 18) isAlt = false;
}).keydown(function (e) {
    if (e.which == 18) isAlt = true; //Alt
    if (e.which == 49 && isAlt === true) { //1
        Mulv = 1;
        pscroll();
    } else if (e.which == 50 && isAlt === true) { //2
        Mulv = 0.5;
        pscroll();
    } else if (e.which == 51 && isAlt === true) { //3
        Mulv = 0.2;
        pscroll();
    } else if (e.which == 52 && isAlt === true) { //4
        Mulv = 0.8;
        pscroll();
    } else if (e.which == 96 && isAlt === true) { //numpad0 - switch to normal style
        if (isMod === true) {
        var Vcssclean = "<style>html.room #header {height: 1.75em!important}html.room #header #header_row_container {height: 1.9em!important;overflow: scroll!important}html.room #header #header_row_container .header_row {float: left!important}html.room #header .upload {margin-top: -1.75em!important}html.room #header #room_name {margin-top: -0.5em!important;text-align: center!important; position:absolute!important; left:0;z-index:1}html.room #chat_frame #chat_input {height: 4em!important;margin-bottom: -1em!important}#chat_hbar {display: none!important}</style>";
            Rname.removeAttr('style');
            $('head style').remove();
            $('<link rel="stylesheet" type="text/css" href="/static/css/style.css">').appendTo('head');
            $(Vcssclean).appendTo('head');
            $('<style>.message b{cursor:pointer;}</style>').appendTo('head');
            $(window).resize();
            isMod = false;
        } else {
            $('head style').remove();
            $('<link rel="stylesheet" type="text/css" href="/static/css/style.css">').appendTo('head');
            fcss();
            rrname();
            $('<style>.message b{cursor:pointer;}</style>').appendTo('head');
            $(window).resize();
            isMod = true;
        }
    }
});

// ========================== /Scrolling hotkeys/ =========================== //
// remove comments on commented lines for a bounce-ish effect
function pscroll() {
    Pheight = $(window).height();
    scrollby = Pheight * Mulv;
    Sbounce = scrollby * 0.02;
    Fsize = scrollby - Hrow - 2;
    if (Mulv == Lastv) {
        Pagev.scrollTop(0); //comment for bounce
        //        Pagev.animate({scrollTop: 0}, SSa);//uncomment for bounce
        //        Pagev.animate({scrollTop: Sbounce}, SSb);//uncomment for bounce
        //        Pagev.animate({scrollTop: 0}, SSc);//uncomment for bounce
        Lastv = 0;
    } else {
        Pagev.scrollTop(scrollby); //comment for bounce
        //        Pagev.animate({scrollTop: scrollby}, SSa);//uncomment for bounce
        //        Pagev.animate({scrollTop: scrollby - Sbounce}, SSc);//uncomment for bounce
        //        Pagev.animate({scrollTop: scrollby}, SSb);//uncomment for bounce
        setTimeout(function () {
            $("#files_scroller").css("height", Fsize + 'px');
            $(window).resize();
            }, 50);
        Lastv = Mulv;
    }
}

// ======================= click to add nick to chat. ======================= //
var chat = $("#chat_input");
$('<style>.message b{cursor:pointer;}</style>').appendTo('head');
//Pick a style, comment the others
$(document).on("click", ".message b", function (e) {
    chat.focus().val(chat.val() + ' ' + $(this).html().replace(/\(([^]+)\)/, "") + ' '); //'Current textbox content'' NICK: '
    //      chat.focus().val(chat.val() + ' ' + '@'+$(this).html().replace(/\(([^]+)\)/, "") + ' ');    //'Current textbox content'' @NICK: '
    //      chat.focus().val($(this).html().replace(/\(([^]+)\)/, "") + ' ' + chat.val());              //'NICK: ''Current textbox content'
    //      chat.focus().val('@'+$(this).html().replace(/\(([^]+)\)/, "") + ' ' + chat.val());          //'@NICK: ''Current textbox content'
});
// ====================== /click to add nick to chat/ ======================= //