//
// ==UserScript==
// @name         	Habra author comments 
// @namespace   	http://habrahabr.ru/
// @description  	Highlight author commnets at habrahabr.ru
// @author			janitor
// @include      	http://habrahabr.ru/*
// @version        	1.0.0
// ==/UserScript==
//

var color       = '#D3E2F0',
    comments    = document.querySelectorAll('li.comment_holder.vote_holder'),
    author      = document.querySelector('#main-content .vcard.author.full > a > span').innerHTML;
 
for (var i = 0, commentsCount = comments.length; i < commentsCount; ++i) {
    var commentAuthor = comments[i].querySelector('.nickname > a').innerHTML;
    if ( commentAuthor == author ) {
        comments[i].querySelector('.msg-meta').style.backgroundColor = color;
        comments[i].querySelector('.entry-content').style.backgroundColor = color;
    }
}