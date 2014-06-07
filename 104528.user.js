// ==UserScript==
// @name           Netflix - Show me the good stuff!
// @namespace      http://ChristopherBallLLC.com
// @include        http://*netflix.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
 
// ==Credits==
// Author          Christopher M. Ball
// Website         http://ChristopherBallLLC.com
// Date Authored   5/28/11
// Version         1.0
// ==/Credits==
 
$(function(){
    //When browsing in gallery or sortable list mode, hiding all movies (or movie rows) with a best guess rating of anything less than 3 stars.
    $("[class*=sbmf-1]").closest(".agMovie").hide();
    $("[class*=sbmf-2]").closest(".agMovie").hide();
 
    //When browsing in sortable list mode, hiding all movie rows made before the year 2000.
    $(".year").each(function(){
        if ($(this).text().toString().search(new RegExp(/1(8|9)\d\d/i)) != -1)
            $(this).closest(".agMovie").hide();
    });
});