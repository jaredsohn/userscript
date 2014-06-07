// ==UserScript==
// @name           FJ Dont Hide The Side Bar
// @author         posttwo (Post15951)
// @include        *funnyjunk.com*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js

// ==/UserScript==
$(document).ready(function ()
{
    $('#columnLeftSeparator').removeClass("collapsed").addClass("expanded").attr("title", "Click to minimize");
    $("#contentLeft").removeClass("collapsed").addClass("expanded");
    $("#content").removeClass("collapsed").addClass("expanded");
    $("#contentRight").removeClass("collapsed").addClass("expanded");
    $.cookie("lcc", null, {
        path: "/"
    })
});