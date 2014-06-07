// ==UserScript==
// @name        A Little Bit Better RTM
// @namespace   http://www.rememberthemilk.com
// @description CSS hacks to RTM because "A Bit Better RTM" extension is failing in my computer
// @include     http://www.rememberthemilk.com/*
// @include     https://www.rememberthemilk.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     1.0
// ==/UserScript==

// Required for JQuery use
var $ = unsafeWindow.jQuery;

// Initialization event
$(document).ready(function(){
    initialize();
    });

// Initialization function
function initialize(){ 

    // Add styles
    $("<style>")
        .prop("type", "text/css")
        .html("\
        #content { \n\
            width: 90%;\n\
        }\n\
        #listbox { \n\
            width: calc(100% - 300px);\n\
        }\n\
        #list { \n\
            width: 100%;\n\
        }\n\
        .appfooter { \n\
            clear: both;\n\
        }\n\
        .xtabs { \n\
            width: 240px;\n\
            border: 1px solid #CACACA;\n\
        }\n\
        #listwrap { \n\
            width: calc(100% - 250px);\n\
            float: right;\n\
        }\n\
        .xtabs li { \n\
            float: none;\n\
            border-bottom: none;\n\
        }\n\
        .xtabs .xtab_smartlist { \n\
            background: none;\n\
        }\n\
        .xtabs .xtab_smartlist a { \n\
            background: none;\n\
        }\n\
        .xtabs li { \n\
            background: none;\n\
        }\n\
        .xtabs li a:link, .xtabs li a:visited, .xtabs li a:active { \n\
            color: #0060BF;\n\
        }\n\
        .xtabs a { \n\
            background: none;\n\
        }\n\
        .xtabs ul { \n\
            padding: 0 5px;\n\
        }\n\
        .xtabs li.xtab_selected { \n\
            background-color: #C2CFF1;\n\
        }\n\
        .xtabs li:hover a { \n\
            text-decoration: underline;\n\
        }\n\
        #tools_spacer { \n\
            display: none;\n\
        }\n\
        #tools { \n\
            border-top: 1px solid #CACACA;\n\
            padding-top: 10px;\n\
        }\n\
        #details .xtabs { \n\
            border: none;\n\
            width: 100%;\n\
        }\n\
        #details .xtabs li { \n\
            float: left;\n\
        }\n\
        #details .xtabs_grey li { \n\
            background: url(\"/img/left_grey.png\") no-repeat scroll left top transparent;\n\
        }\n\
        #details .xtabs li.xtab_selected { \n\
           background-position: 0 -150px;\n\
        }\n\
        #details .xtabs_grey a { \n\
            background: url(\"/img/right_grey.png\") no-repeat scroll right top transparent;\n\
        }\n\
        #details .xtabs li a:link,#details  .xtabs li a:visited,#details  .xtabs li a:active { \n\
            color: #FFFFFF;\n\
            text-decoration: none;\n\
        }\n\
        #details .xtabs li.xtab_selected a { \n\
            background-position: 100% -150px;\n\
            color: #000000;\n\
            padding-bottom: 1px;\n\
            text-decoration: none;\n\
        }\n\
        ").appendTo("head");
}