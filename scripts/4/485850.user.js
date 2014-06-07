// ==UserScript==
// @name       USO Remove spam only threads
// @namespace  http://websocket.bplaced.net/
// @version    3.0
// @description  Remove forum threads that only contain spam from userscripts.org
// @match      http://userscripts.org/forums/*
// @match      http://userscripts.org:8080/forums/*
// @require    https://code.jquery.com/jquery-1.11.0.min.js
// @copyright  2014, devnull69
// ==/UserScript==

var $theTopics;
var maxNextPagesToLoad = 15;
var nextPagesLoaded = 0;
var threadCount = 0;
var currCount = 0;
var foundSpam = 0;

$(document).ready(function() {
    var nextPageHREF = null;
    if($('a.next_page').length > 0) {
        nextPageHREF = $('a.next_page').prop('href');
    }
    // Paginierung anpassen
    var $firstPagination = $('.pagination').eq(0);
    var childrenCount = $firstPagination.children().size();
    var maxOrigPage = parseInt($firstPagination.children().eq(childrenCount - 2).text(), 10);
    console.log('maxOrigPage = ' + maxOrigPage);
    $('.pagination').empty();
    var currPage = 1;
    if(window.location.search != "") {
       currPage = parseInt(window.location.search.substring(6), 10);
    }
    currPage = getNewPageFromOrigPage(currPage);
    
    var forumNr = window.location.href.match(/forums\/(\d+)/)[1];
    
    showPagination(forumNr, currPage, Math.floor(getNewPageFromOrigPage(maxOrigPage)));
    // next_page nachladen
    if(nextPageHREF) {
        addNextPage(nextPageHREF);
    }
});

function getOrigPageFromNewPage(newPage) {
    return (newPage-1)*(maxNextPagesToLoad+1) + 1;
}

function getNewPageFromOrigPage(origPage) {
    return (origPage + maxNextPagesToLoad) / (maxNextPagesToLoad+1);
}

function showPagination(forumNr, currPage, maxPage) {
    var startPage = currPage - 4;
    var endPage = currPage + 4;
    if(startPage < 1) {
        startPage = 1;
        endPage = 9;
    }
    if(endPage > maxPage) {
        startPage = maxPage - 8;
        endPage = maxPage;
    }
    console.log('startPage = ' + startPage);
    console.log('endPage = ' + endPage);
    console.log('maxPage = ' + maxPage);
    console.log('currPage = ' + currPage);
    if(currPage>1) {
        $('.pagination').append('<a href="/forums/' + forumNr + '?page=' + getOrigPageFromNewPage(currPage-1) + '" class="prev_page" rel="prev">« Previous</a>');
    } else {
        $('.pagination').append('<span class="disabled prev_page">« Previous</span>');
    }
    if(startPage>1) {
        for(i=1; (i<startPage && i<3); i++) {
            $('.pagination').append('<a href="/forums/' + forumNr + '?page=' + getOrigPageFromNewPage(i) + '" style="padding-right: 5px;">' + i + '</a>');
        }
        if(startPage>3)
            $('.pagination').append('<span class="gap">…</span>');
    }
    for(i=startPage; i<=endPage; i++) {
        if(i==currPage) {
            $('.pagination').append('<span class="current">' + i + '</span>');
        } else {
            var relStart = "";
            if(i==(currPage-1))
                relStart = ' rel="prev"';
            if(i==(currPage+1))
                relStart = ' rel="next"';
            $('.pagination').append('<a href="/forums/' + forumNr + '?page=' + getOrigPageFromNewPage(i) + '"' + relStart + ' style="padding-right: 5px;">' + i + '</a>');
        }
            
    }
    if(endPage<maxPage) {
        if(endPage<(maxPage-2))
            $('.pagination').append('<span class="gap">…</span>');
        for(i=maxPage; (i>endPage && i>(maxPage-2)); i--) {
            $('.pagination').append('<a href="/forums/' + forumNr + '?page=' + getOrigPageFromNewPage(i) + '" style="padding-right: 5px;">' + i + '</a>');
        }
    }
    if(currPage<maxPage) {
        $('.pagination').append('<a href="/forums/' + forumNr + '?page=' + getOrigPageFromNewPage(currPage+1) + '" class="next_page" rel="next">Next »</a>');
    } else {
        $('.pagination').append('<span class="disabled next_page">Next »</span>');
    }
}

function showInfo(infoText) {
    var standardText = "Topic";
    if(infoText != "") {
        standardText += " (" + infoText + ")";
    }
    $('table.topics > tbody > tr > th.la').text(standardText);
}

function addNextPage(url) {
    $.ajax({
        url : url,
        type: 'GET',
        dataType : 'html',
        success: function(data) {
	        nextPagesLoaded++;
	        showInfo("Loading subpage " + nextPagesLoaded + "/" + maxNextPagesToLoad + " ...");
            var $page = $(data);
            var $theTopics = $page.find('.topics tr');
            $theTopics.each(function(idx) {
                if(idx > 0)
                    $(this).appendTo('.topics tbody');
            });
            if(nextPagesLoaded < maxNextPagesToLoad && $page.find('a.next_page').length > 0) {
                addNextPage($page.find('a.next_page').prop('href'));
            } else {
                removeSpamThreads();
            }
        }
    });
}

function removeSpamThreads() {
    $theTopics = $('.topics tr');
    threadCount = $theTopics.length - 1;
    $theTopics.each(function(idx) {
        if(idx > 0) {
           checkNextThread($(this));
        }
    });
}

function checkNextThread($current) {
    var theURL = $current.find('a').prop('href');
    
    console.log('Checking ' + theURL);
    $.ajax({
        url: theURL,
        type: 'GET',
        dataType : 'html',
        success : function(data) {
            currCount++;
            var $page = $(data);
            if($page.find('#content table.posts tr').length == 0 || $page.text().indexOf("has been marked as spam") != -1) {
                foundSpam++;
                $current.remove();
            }
            showInfo("Removing spam thread " + currCount + "/" + threadCount + " ... " + foundSpam + " spam threads found");
            if(currCount == threadCount)
                showInfo("");
        },
        error: function() {
            currCount++;
            showInfo("Removing spam thread " + currCount + "/" + threadCount + " ... " + foundSpam + " spam threads found");
            if(currCount == threadCount)
                showInfo("");
        }
    });
}