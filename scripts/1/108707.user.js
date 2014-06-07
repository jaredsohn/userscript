// ==UserScript==
// @name           timesofindia_nocomments
// @namespace      http://userscripts.org/users/376591
// @description    Remove Comments from Times Of India
// @include        http://timesofindia.indiatimes.com/*.cms
// @include        http://articles.timesofindia.indiatimes.com/*
// ==/UserScript==
//

var commentBox = document.getElementById('populatecomment');
if (commentBox) {
    commentBox.parentNode.removeChild(commentBox);
}
// Pattern on articles.timesofindia.com/
var commentBox2 = document.getElementById('cmtMainBox');
if (commentBox2) {
    commentBox2.parentNode.removeChild(commentBox2);
}

