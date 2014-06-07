// ==UserScript==
// @name        Turner
// @namespace   tag:4ntti.koskinen@gmail.com,2009:GM
// @description Plain text paginator
// @copyright   2009, Antti Koskinen
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version     1.0.0
// @include     *.txt
// @include     *.txt#*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var Corpus = {
    idx: 0, //current line
    perPage: 20,
    currentPage: 0,
    lines: [],

    // We split the input text into an array and pad with newlines
    // so every page will have the desired line count.
    read: function (txt) {
        var lines, line, len, i, pagePos, inTxt;
        this.lines = [];
        if (txt.match(/\r\n/))
            lines = txt.split("\r\n");
        else
            lines = txt.split("\n");
        len = lines.length;
        pagePos = 0;
        inTxt = false;
        for (i=0; i < len; i++) {
            line = lines[i];
            if (pagePos > this.perPage) {
                pagePos = 0;
                inTxt = false;
            }
            if (line.match(/./)) {
                inTxt = true;
            }
            if (inTxt && !line && !lines[i+1] && !lines[i+2]) {
                // three empty lines triggers page turn
                for (; pagePos <= this.perPage; pagePos++) {
                    this.lines[this.lines.length] = "";
                }
                pagePos = 0;
                inTxt = false;
            }
            this.lines[this.lines.length] = line;
            pagePos++;
        }
        for (i=0; i < this.perPage; i++) {
            this.lines[this.lines.length] = "";
        }
    },

    buildPage: function (endline) {
        function pageNum(i,n) {
            return "\r\n<a href='#" + i + "'>-" + n +"-</a>\r\n";
        }
        var line, buf, footer;
        line = "";
        buf = [];
        footer = pageNum(this.idx, this.currentPage);
        buf[buf.length] = '<pre style="font-family:Verdana,Arial,sans-serif;">';
        for (; this.idx <= endline; this.idx++) {
            line = this.lines[this.idx];
            buf[buf.length] = line;
        }
        buf[buf.length] = footer;
        buf[buf.length] = '</pre>';
        return buf.join("\r\n");
    },

    process: function (page) {
        return page.replace(/_([^_]+)_/g, "<em>$1</em>").replace(/--/g, '&mdash;');
    },

    next: function () {
        var endline = this.idx + this.perPage;
        if (typeof(this.lines[endline]) == 'undefined') {
            throw "LastPage";
        }
        if (this.currentPage === 0) {
            this.currentPage = Math.floor(this.idx / this.perPage) + 1;
        }
        else {
            this.currentPage += 1;
        }
        return this.process(this.buildPage(endline));
    },

    prev: function () {
        this.idx -= this.perPage * 2 + 2;
        this.currentPage -= 1;
        if (this.idx < 0) {
            this.idx = 0;
            this.currentPage = 1;
        }
        return this.process(this.buildPage(this.idx + this.perPage));
    }
};

function readBookmark() {
    var line = window.location.hash.replace("#", "");
    return line ? parseInt(line, 10) : 0;
}


function loadIt() {
    if ($('title, p, a, br').length !== 0) {
        // Not a text file after all.
        return false;
    }
    Corpus.read($(document).text());
    Corpus.idx = readBookmark();
    document.open();
    document.write('<div id="page"></div>');
    document.close();
    $('#page').html(Corpus.next());
    return true;
}

function styleIt() {
    $('body').css({
        'background': '#eeeeee',
        'color': '#333333',
        'line-height': '1.5',
        'margin': '20px'
    });
}

$(document).ready(function () {
    if (!loadIt()) {
        return;
    }
    styleIt();
    $(window).keydown(function(event){
        switch (event.keyCode) {
            case 39:
            case 40:
                try {
                    $('#page').html(Corpus.next());
                } catch (e) {};
                break;
            case 37:
            case 38:
                $('#page').html(Corpus.prev());
                break;
        }
    });
});


