// ==UserScript==
// @name          Slashdot Collapser
// @namespace     http://loucypher.wordpress.com/
// @include       http://slashdot.org/
// @include       http://slashdot.org/index.pl?issue=*
// @include       http://*.slashdot.org/
// @include       http://*.slashdot.org/index.pl?issue=*
// @description	  Expand/Collapse Articles
// ==/UserScript==

//Last updated: 2007-03-02

var genTitles, genTitle, postDetails, postBody,
    storyLinks, storyLink, tagBoxes, tagBox;

genTitles = document.evaluate("//div[@class='generaltitle']",
            document, null, 6, null);

storyLinks = document.evaluate("//div[@class='storylinks']",
             document, null, 6, null);

tagBoxes = document.evaluate("//div[@class='tags']",
           document, null, 6, null);

if(!genTitles) return;

for(var i = 0; i < genTitles.snapshotLength; i++) {
  genTitle = genTitles.snapshotItem(i);
  storyLink = storyLinks.snapshotItem(i);
  tagBox = tagBoxes.snapshotItem(i);
  postDetails = genTitle.nextSibling.nextSibling;
  postBody = postDetails.nextSibling.nextSibling;
  postDetails.style.display = "none";
  postBody.style.display = "none";
  storyLink.style.display = "none";
  tagBox.style.display = "none";

  genTitle.style.marginTop = "1em";
  genTitle.style.cursor = "pointer";
  genTitle.title = "Click to expand";
  genTitle.setAttribute("idx", i);
  genTitle.addEventListener("click", function(event) {
    var idx = this.getAttribute("idx");
    var pDetails = this.nextSibling.nextSibling;
    var pBody = pDetails.nextSibling.nextSibling;
    var pLinks = document.evaluate("//div[@class='storylinks']",
                 document, null, 6, null);
    var tagBoxes = document.evaluate("//div[@class='tags']",
                   document, null, 6, null);
    var pLink = pLinks.snapshotItem(idx);
    var tagBox = tagBoxes.snapshotItem(idx);

    if(pDetails.style.display == "none") {
      pDetails.removeAttribute("style");
      pBody.removeAttribute("style");
      pBody.removeAttribute("style");
      pLink.removeAttribute("style");
      tagBox.removeAttribute("style");
      this.title = "Click to collapse";
    } else {
      pDetails.style.display = "none";
      pBody.style.display = "none";
      pLink.style.display = "none";
      tagBox.style.display = "none";
      this.title = "Click to expand";
    }
  }, false);
}

