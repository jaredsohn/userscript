// ==UserScript==
// @name           Title Enhancer - YouTube Comments (All)
// @namespace      http://userscripts.org/users/9270
// @description    Updates the title of YouTube Comments (All) pages to include the video title
// @version        0.1
// @date           2012-04-10
// @author         Justin
// @include        http://www.youtube.com/all_comments?*
// ==/UserScript==


vtitleLinks = document.evaluate(
     "//div[@class='vtitle']/span/a",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
 if (vtitleLinks.snapshotLength != 0) {
  firstvtitleLink = vtitleLinks.snapshotItem(0);
  firstvtitletext = firstvtitleLink.innerHTML;
  document.title = firstvtitletext + " - YouTube Comments"
 }