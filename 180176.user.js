// ==UserScript==
// @name        Copy Create Task -button
// @namespace   agilefant.ipss.fi
// @include     https://agilefant.ipss.fi:8443/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1
// @grant       unsafeWindow
// @copyright	2013+, Timo Sand
// ==/UserScript==

(function(w) {
    w.$(window).ajaxComplete(function(event, xhr, options) {
        if(options.url.indexOf("dailyWorkData") > 0) {
            for (var i = 3;i < 100; i+=2) { 
                var toplevel = "#container_dynamicView_"+i;
                var query = toplevel + " ul.dynamictable-captionactions:contains('Create task')"; 
                var target = "#dynamicView_"+i; 
                var newTask="taskCreation_"+i; 
                $("<div id='"+newTask+"' style='height:20px;'>").appendTo($(toplevel)); 
                $(query).clone().prependTo($("#"+newTask));
            }
        };
    });
}) (unsafeWindow);