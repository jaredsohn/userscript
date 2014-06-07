// ==UserScript==
// @name           Hacker News Split View
// @namespace      hacker_news_sv
// @description    Adds a "SPLIT VIEW" link to the Hacker News front page, which allows for split viewing of the article and Hacker News.
// @include        http://news.ycombinator.com/news
// @include        http://news.ycombinator.com/x?fnid=*
// ==/UserScript==
var tds = document.getElementsByTagName("td");
var articleHref, discussHref, articleTitle;
for (var i=0; i < tds.length; i++) {
    var tdTag = tds[i];
    if (tdTag.className.indexOf("title")!=-1) {
        articleHref = tdTag.firstChild.href;
        if (tdTag.firstChild.firstChild) {
            articleTitle = tdTag.firstChild.firstChild.nodeValue;
        }
    } else if ((tdTag.className.indexOf("subtext")!=-1) && (tdTag.lastChild.href)) {
        discussHref = tdTag.lastChild.href;
        if (articleHref && discussHref && articleTitle && (discussHref.indexOf("http://news.ycombinator.com/x") != 0) && (articleHref != discussHref)) {
            var splitterLink = document.createElement("a");
            splitterLink.href = 'http://www.nirmalpatel.com/splitter.html?a=' + articleHref + "&d=" + discussHref + "&t=" + articleTitle;
            splitterLink.appendChild(document.createTextNode('SPLIT VIEW'));
            tdTag.appendChild(document.createTextNode(' | '));
            tdTag.appendChild(splitterLink);
        }
        articleHref = discussHref = articleTitle = null;
    }
}
