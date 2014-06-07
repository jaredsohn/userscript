// ==UserScript==
// @name Trello Label Icon
// @namespace http://paulodev.com.br
// @version 1.3
// @description Add customizable icons to trello labels using only CSS. No javascript or jquery.
// @match https://trello.com/*
// @copyright 2013+, Paulo Amaral
// ==/UserScript==

// =====================================================================================
// Edit these URLs according to your needings. Use 16x16 pictures.
// Icons credits: http://www.fatcow.com/free-icons
var imgGreen = "http://www.paulodev.com.br/images/icons/16x16/control_play_blue.png";
var imgYellow = "http://www.paulodev.com.br/images/icons/16x16/lightbulb_off.png";
var imgOrange = "http://www.paulodev.com.br/images/icons/16x16/user_go.png";
var imgRed = "http://www.paulodev.com.br/images/icons/16x16/error.png";
var imgPurple = "http://www.paulodev.com.br/images/icons/16x16/comment.png";
var imgBlue = "http://www.paulodev.com.br/images/icons/16x16/emotion_sleep.png";

// =====================================================================================
// These dimensions are good for 16x16 icons. I recommend to not use bigger ones.
GM_addStyle (".search-result-card .card-label, .list-card-area .card-label { min-height: 20px; max-width: 20px; background-repeat: no-repeat; background-position:center center; }");
GM_addStyle (".pop-over-label-list .card-label, .relative .card-label { background-repeat: no-repeat; background-position:center center; }");
GM_addStyle (".edit-labels-pop-over .card-label { background-repeat: no-repeat; background-position:5px center; padding-left: 25px; }");
GM_addStyle (".card-label-list .card-label { background-repeat: no-repeat; background-position:5px center; padding-left: 25px ! important; }");
GM_addStyle (".list-card { box-shadow: inset 1px 1px 1px rgba(10,10,10,0.7); }");
GM_addStyle (".card-label { box-shadow:  1px 1px 1px rgba(10,10,10,0.5); border: solid 1px #606060; }");
GM_addStyle (".ui-sortable-helper .card-label { background-image:none ! important; }");
GM_addStyle (".card-operation.icon-sm.icon-menu.dark-hover.js-card-menu { background-color: transparent; }");

GM_addStyle (".card-label.green-label  { background-image: url('" + imgGreen + "');  }");
GM_addStyle (".card-label.yellow-label { background-image: url('" + imgYellow + "'); }");
GM_addStyle (".card-label.orange-label { background-image: url('" + imgOrange + "'); }");
GM_addStyle (".card-label.red-label    { background-image: url('" + imgRed + "');    }");
GM_addStyle (".card-label.purple-label { background-image: url('" + imgPurple + "'); }");
GM_addStyle (".card-label.blue-label   { background-image: url('" + imgBlue + "');   }");