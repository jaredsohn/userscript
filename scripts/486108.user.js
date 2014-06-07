// ==UserScript==
// @name        求包养
// @namespace   mailto:tusooa@vista.aero
// @include     http://baozoumanhua.com/users/-ID-/articles
// @include     http://baozoumanhua.com/users/-ID-
// @version     1
// @grant       none
// ==/UserScript==
function addFeedArticle() {
    var entryList = document.getElementById('entry-list-ul');
    var articles = entryList.getElementsByClassName('entry-item');
    //alert('length:'+articles.length);
    for (var x = 0, len = articles.length; x < len; x++) {
        var meta = ((articles[x].getElementsByClassName('info')) [0].getElementsByClassName('meta')) [0];
        if (meta.getElementsByClassName('pending') .length > 0 || meta.getElementsByClassName('private') .length > 0) {
            //alert('article pending');
            var feed = document.createElement('li');
            feed.innerHTML = '<a href="#" class="re_fed_article" data-n="#re_fed_form">求包养</a>';
            (meta.getElementsByClassName('xl')) [0].appendChild(feed);
        }
    }
}
addFeedArticle();
