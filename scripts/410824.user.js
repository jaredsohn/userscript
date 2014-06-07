// ==UserScript==
// @name          Ylilauta Hide Threads from Thread List
// @namespace     Ylilauta Hide Threads from Thread List
// @description   Functionality to hide/show threads directly from thread list
// @include       http://ylilauta.org/*
// @include       https://ylilauta.org/*
// @require       http://static.ylilauta.org/js/jquery.js
// @author        Ville Rouhiainen
// @version       1.1
// ==/UserScript==

var hiddenThreads = JSON.parse( localStorage.getItem( 'hiddenThreads' ) );
if( hiddenThreads === "" || hiddenThreads === null ) {
    hiddenThreads = [];
}

$('<style type="text/css"> .hidden{opacity:0.2;} </style>').appendTo('head');

function restoreThread(id) {
    var index = hiddenThreads.indexOf(id);
    if(index >= 0) {
        hiddenThreads.splice(index, 1);
        localStorage.setItem('hiddenThreads', JSON.stringify(hiddenThreads));
    }
}

$('.tlist_thread').each(function(){
    var threadNumber = $(this).children('a').attr('href');
    threadNumber = threadNumber.replace(/\D/g, '');
    
    if (localStorage.getItem("hiddenThreads").indexOf(threadNumber) > -1) {
        $('a', this).find('img').hide();
        $('a', this).find('.tlist_replycount').hide();
        var showButton = "<a href='javascript:void(0);' id=" + threadNumber + " class='showThread'><img alt='Show thread' src='//static.ylilauta.org/img/restore.png' style='display: block;'></a>";
        $('a', this).before(showButton);
        $('a', this).attr('class', 'showThread');
        $('a', this).parent().attr('class', 'tlist_thread hidden');
    } else {
        var hideButton = "<a href='javascript:void(0);' id=" + threadNumber + " class='hideThread'><img alt='Hide thread' src='//static.ylilauta.org/img/hide.png' style='display: block;'></a>";
        $('a', this).before(hideButton);
    }
});

$('.tlist_thread').on('click', ".hideThread", function() {
    var id = parseInt($(this).attr('id'));
    hiddenThreads.push(id);
    localStorage.setItem('hiddenThreads', JSON.stringify(hiddenThreads));
    $(this).attr('class', 'showThread');
    $(this).parent().attr('class', 'tlist_thread hidden');
    $(this).siblings().find('img').hide();
    $(this).siblings().find(".tlist_replycount").hide();
    $(this).find('img').attr('src','//static.ylilauta.org/img/restore.png').attr('alt', 'Show thread');
});

$('.tlist_thread').on('click', ".showThread", function() {
    var id = parseInt($(this).attr('id'));
    restoreThread(id);
    $(this).attr('class', 'hideThread');
    $(this).parent().attr('class', 'tlist_thread');
    $(this).siblings().find('img').show();
    $(this).siblings().find(".tlist_replycount").show();
    $(this).find('img').attr('src','//static.ylilauta.org/img/hide.png').attr('alt', 'Hide thread');
});
