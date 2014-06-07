// ==UserScript==
// @namespace     http://www.iblist.com/editorial
// @name          compact_add_manifestation
// @description   compact the add manifestation entry screen
// @include       http://www.iblist.com/editorial/add_manifestation.php?id=*
// @include       http://www.iblist.com/editorial/edit_manifestation.php?id=*
// ==/UserScript==

// hide the isbn input instructions
document.getElementById("isbn").nextSibling.textContent = "";
// hide the dimension text "in inches"
document.evaluate("//p//text()[4]", document, null, 9, null).singleNodeValue.textContent = "";
// remove extraneous line-breaks
b = document.evaluate("//p//br[2]", document, null, 7, null);
for (var i=0; i < b.snapshotLength; i++) {
  if (i != 7) { // skip the "br" in "notes"
    b.snapshotItem(i).parentNode.removeChild(b.snapshotItem(i));
  }
}
// hide the descriptions - float the inputs (& the container) - adjust the textarea size.
GM_addStyle("span.ffd {display:none} #main .boxbody {float:left; width:98%} #main p {float:left; margin-bottom:0px; margin-right:25px;} #main textarea {width:315px !important;}");//.user.js

document.evaluate("//input[@id='isbn']/parent::p", document, null, 9, null).singleNodeValue.style.clear = "left";
document.evaluate("//select[@id='source_type']/parent::p", document, null, 9, null).singleNodeValue.style.clear = "left";
document.evaluate("//input[@name='addwork']/parent::p", document, null, 9, null).singleNodeValue.style.clear = "left";
