// ==UserScript==
// @name FanFiction/FictionPress PM De-Paginator
// @namespace aiybe
// @version 0.6
// @description de-paginates FanFiction PMs
// @include *.fanfiction.net/pm2/*
// @include *.fictionpress.com/pm2/*
// @require http://code.jquery.com/jquery-2.1.0.min.js
// @grant GM_xmlhttpRequest
// ==/UserScript==

var pageNumRegex = /&p=([0-9]+)/
var rid = window.location.href.match(/rid=([0-9]+)/)[1];
var currentPage = Number(document.getElementsByTagName('b')[5].innerHTML);
if (isNaN(currentPage)) {
    currentPage = 1;
}

function getNumPages(text) {
    var allTags = document.getElementsByTagName('a');
    for (var i = 0; i < allTags.length; i++) {
        var tag = allTags[i];
        if (tag.innerHTML == text) {
            return Number(tag.href.match(pageNumRegex)[1]);
        }
    }
    return 0;
}

var numPages = getNumPages("Last");
if (!numPages) {
    numPages = getNumPages("Next »");
    if (!numPages) {
        numPages = currentPage;
    }
}

var last = $('#last').last();
if (last.length == 0) {
    last = $('<span id="last">');
    $('#xpreview').before(last);
}
$('.round8').remove();

var pages = [];

for (var i = 1; i <= numPages; i++) {
    pages[i] = $('<div class="page" id="page-' + i + '">');
    last.before(pages[i]);
}

function getPages(num) {
    if (num > numPages) {
        return;
    }

    var url = '/pm2/post.php?rid=' + rid + '&p=' + num;

    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            var responseDoc = $('.round8', $('<div>').html(response.responseText));
            pages[num].append(responseDoc);
            pages[num].data('loaded', true);

            var allLoaded = true;

            for (var i = 1; i <= numPages; i++) {
                allLoaded &= pages[i].data('loaded');
            }

            if (allLoaded) {
                window.location.hash = '#';
                window.location.hash = '#last';
            }
        }
    });

    getPages(num + 1);
}

console.log('Page: ' + currentPage + '/' + numPages);
getPages(1);