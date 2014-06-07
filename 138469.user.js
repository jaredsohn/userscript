// ==UserScript==
// @name        Hacker News Author Hilight
// @namespace   http://jaredmiller.name
// @description Makes the author name more apparent when scrolling through comments.
// @include     https://news.ycombinator.com/item?id=*
// @include     http://news.ycombinator.com/item?id=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.2
// ==/UserScript==

// identify who the author is
var author = $('table .subtext').find('a').eq(0).text();

// change the color of the author
$('.comhead a:contains(' + author + ')')
                    .css({
                        'background-color': '#ff6600',
                        'color': '#fff',
                        'padding': '0 2px',
                        'border-radius': '3px'
                    });