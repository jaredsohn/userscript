// ==UserScript==
// @name           9GAG NO and Me Gusta
// @namespace      http://huzze.net/wp-content/9gag.js
// @description      Replaces the Upvote and Downvote smilies on 9GAG with NO and Me Gusta Memes.
// @include        http://9gag.com/trending*
// @include        http://9gag.com/vote*
// @include        http://9gag.com/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#entry-list.list ul .info ul.actions li a.unlove span {background: url("https://lh4.googleusercontent.com/-TFE6hRuwVQQ/TygPASsKYQI/AAAAAAAABcE/2kAfcCQENtg/s45/no1.png") no-repeat; height: 45px; width: 45px; margin-top: 2px;}');
addGlobalStyle('#entry-list.list ul .info ul.actions li a.love span {background: url("https://lh5.googleusercontent.com/-40FhVXE4uuY/TygPAdqb_VI/AAAAAAAABcI/02M2pjYnDW4/s45/megusta.png") no-repeat; height: 45px; width: 45px; margin-top: 2px;}');
addGlobalStyle('#entry-list.list ul .info ul.actions li a.unloved.unloved span {background: url("https://lh4.googleusercontent.com/-TFE6hRuwVQQ/TygPASsKYQI/AAAAAAAABcE/2kAfcCQENtg/s45/no1.png") no-repeat; height: 45px; width: 45px; margin-top: 2px;}');
addGlobalStyle('#entry-list.list ul .info ul.actions li a.love.loved span {background: url("https://lh5.googleusercontent.com/-40FhVXE4uuY/TygPAdqb_VI/AAAAAAAABcI/02M2pjYnDW4/s45/megusta.png") no-repeat; height: 45px; width: 45px; margin-top: 2px;}');