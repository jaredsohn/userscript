// ==UserScript==
// @name          Dinosaur Comics' Easter Eggs
// @namespace     oliver.dyas@gmail.com 2006-11-1
// @description   Shows the alt text / comments subject / RSS title beneath each comic at qwantz.com
// @version       0.8
// @include       http://www.qwantz.com/
// @include       http://www.qwantz.com/index.pl?comic=*
// @include       http://qwantz.com/
// @include       http://qwantz.com/index.pl?comic=*
// ==/UserScript==

function toggleQwantzTranscript(e) {
 if (GM_getValue("showqwantztranscript", false))
   GM_setValue("showqwantztranscript", false);
 else
   GM_setValue("showqwantztranscript", true);
};

(function() {
 if (GM_getValue("qwantz_menu_does_not_exist",true)) {
   GM_registerMenuCommand("Toggle Qwantz Transcript", toggleQwantzTranscript);
   GM_setValue("qwantz_menu_does_not_exist",false);
 }

 // change the next line to true to show the comic content as text
 // var showTranscript = false

 var comicImage =
  document.evaluate('//img[contains(@src,\'/comics/\')]',document,null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 comicImage = comicImage.snapshotItem(0);

 var commentsLink =
  document.evaluate('//a[contains(@href,\'mailto:ryan@qwantz.com?subject=\')]'
  ,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 commentsLink = commentsLink.snapshotItem(0).getAttribute('href');

 var rssTitle =
  document.evaluate('//comment()',document,null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(5).textContent;
 var theDate = document.evaluate('//a[.="previous"]/../../td[2]',
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 theDate = theDate.snapshotItem(0).textContent;

 var urlToClick = document.evaluate('//a[.="archive"]', document,
  null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 urlToClick = urlToClick.snapshotItem(0).getAttribute('href');

 var rssTitle = "";

 GM_xmlhttpRequest({
   method: 'GET',
   url: urlToClick,
   onload: function (response) {
     completed_req = true;
     var re = theDate+'[^-]*-([^<]*)<';
     var matches = new RegExp(re).exec(response.responseText);
     rssTitle = matches[1];

     var rssfeedplace = document.evaluate('//a[.="rss feed"]/../../span[@class="rssfeedtitle"]', document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
     rssfeedplace.appendChild(document.createTextNode(rssTitle));
   }
 });

 var str = '<br /><b>alt text:</b> ' + comicImage.getAttribute("title");
 if (commentsLink!="mailto:ryan@qwantz.com?subject=")
   str = str + '<br /><b><a href="' + commentsLink + '">comments</a> subject:</b> ' + commentsLink.substring(31,commentsLink.length);
 str = str + '<br /><b><a href="http://rsspect.com/rss/qwantz.xml">rss feed</a> title:</b> <span class="rssfeedtitle">'+rssTitle+'</span>';

 if (GM_getValue("showqwantztranscript", false)) {
   var script =
document.evaluate("//meta[@name='content']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   str = '<br /><b><a href="http://www.ohnorobot.com/index.pl?comic=23">transcript</a>:</b> ' +
script.snapshotItem(0).getAttribute("CONTENT") + '<br />' + str;
 }

 var easterEggs = document.createElement("div");
 easterEggs.innerHTML = str;
 comicImage.parentNode.insertBefore(easterEggs, comicImage.nextSibling);
})();

// i'm not a programmer so forgive the poor quality
// if you improve this script please send me a copy

//TO DO:
//  support "qwantz.com/<date>.html" pages
//  fix the transcription text, which is currently all run together on one line

// Changelog
//  2006-11-28 - rjhughes@umich.edu - Getting rss feed title from the "archive" page.
