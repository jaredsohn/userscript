// ==UserScript==
// @name          /prog/ : Ignore necroposting
// @version       2010 PRO DELUXE
// @namespace     http://dis.4chan.org/read/prog/1/
// @description   Do not display threads older than 2010 on /prog/'s main page.
// @include       http://dis.4chan.org/prog/
// ==/UserScript==

var threads, thread;
threads = document.evaluate("//div[@class='border']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < threads.snapshotLength; i++) {
  thread = threads.snapshotItem(i);
  if (-1 != thread.childNodes[3].childNodes[3].childNodes[1].childNodes[1].textContent.search(/200[4-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]/g)) {
  	thread.style.display = "none";
  }
}
// Doing it cleanly? Are you crazy? It'd take me, like, minutes.