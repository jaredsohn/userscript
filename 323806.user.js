// ==UserScript==
// @name       DMT Forum Navigation
// @namespace  http://localhost/
// @version    0.1
// @description  Copy the page navigation prev/.../next from the top of the page to the bottom for improved usability
// @match      http://palmpleglobal.boards.net/thread/*
// @match      http://palmpleglobal.boards.net/board/*
// @copyright  2012+, You
// ==/UserScript==

$('<div>').attr('class','container bottom-nav').append(
 $('<div>').attr('class','title-bar').append($('<h2>').text('Navigation'))
).append(
    $('<div>').attr('class','control-bar ui-helper-clearfix').append($('.ui-pagination').clone()).css({'background-color':'#413242','border':'1px solid #000000','border-top':'none','border-radius':'0 0 5px 5px'})
).insertAfter($('.container.posts, .container.threads'));
