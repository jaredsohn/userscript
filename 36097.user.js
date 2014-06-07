// ==UserScript==
// @name           Google News ==> Rename Links
// @description    Rename links so that it looks better in the bookmark.
// @namespace      #avg
// @version        0.2.3
// @include        *news.google.com*
// ==/UserScript==
var titles=document.evaluate("//div[@class='lh']//a/b[text()!='...'] | //div[@class='lh']//b//a[text()!='...']",document,null,7,null);
var stories=document.evaluate("//a[starts-with(@href,'http://news.google.com/news?') and contains(@href,'ncl=')]",document,null,7,null), l=stories.snapshotLength;
for(i=0;i<l;i++) {
	cur=stories.snapshotItem(i);
	cur.firstChild.firstChild.innerHTML="0 "+titles.snapshotItem(i).textContent+" ("+/[\d,]+/.exec(cur.textContent)[0]+" articles)";
}