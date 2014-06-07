// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Texas Clear
// @namespace       http://userscripts.org/scripts/show/51183
// @description     clear screen when playing texas
// @include         http://apps.guanxi.koubei.com/boyaa_texas/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first, and then
// reinstall this script.
// --------------------------------------------------------------------------------

;(function() {
    
    $("<li class=\"hand tab2\"><a id=\"texas-clear\" href=\"#\">清理</a></li>").appendTo($("#app_content_200099 ul:first"));
    
    $("#texas-clear").click(function(event) {
        event.preventDefault();
        $("#y-cp, #y-header, #y-footer, .y-main-canvas:first, #YK_swf_2, #app_content_200099 ul:first, #app_content_200099 .flash div:last").remove();
        $("#app_content_200099 .flash:first").prev().remove();
        $("#app_content_200099 .flash:first").prev().remove();
        $(".y-main:first").css("margin-left", "0");
        $("#YK_swf_1").before("<div style=\"padding:5px;\"><a href=\"http://apps.guanxi.koubei.com/boyaa_texas/\">德克萨斯扑克-关系 完整版</a></div>");
        $("#doc").parent().parent().css("background", "#ccc");
    });
    
})();
