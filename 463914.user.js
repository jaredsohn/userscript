// ==UserScript==
// @name        HAD numComments
// @namespace   had.num.comments
// @description show num comments 
// @include http://hackaday.com/*
// @match http://*.hackaday.com/*
// @match http://hackaday.com/*
// @grant       none
// ==/UserScript==
function addGlobalStyle(css) {
    var head,
    style;
    head = document.getElementsByTagName('head') [0];
    if (!head) {
        return ;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
//addGlobalStyle(
//'li { list-style-type: decimal ! important }');


/* Make sure the page has comments. */
var comments = document.getElementById('comments');
if (comments) {
    var commentNum = document.getElementsByClassName('post-comments') [0].innerHTML;
    //console.log('====  ' + commentNum);
    var cmt = document.createElement('div');
    var cmt1 = document.createElement('div');
    
    cmt.innerHTML = commentNum;
    cmt1.innerHTML = commentNum;

    comments.insertBefore(cmt, comments.firstChild);
    comments.appendChild(cmt1);
}
