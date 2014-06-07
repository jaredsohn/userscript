// ==UserScript==
// @name           SpamcopAutocheck
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Automatically put checks next to spamcop held mail
// @include        http://mailsc.spamcop.net/reportheld?action=heldlog
// ==/UserScript==

var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
                          "//a[@href]",
                          document,
                          null,
                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                          null);


var pageAddr, submitChoice;
pageAddr = window.location.href;

var submitChoice = document.evaluate(
                                 "/html/body/div[@id='content']/form/select/option[2]",
                                 document,
                                 null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                 null);
                        
if (submitChoice) {
  var myItem = submitChoice.snapshotItem(0);
  myItem.selected = true;
}

///html/body/div[@id='content']/form/dl/dt[2]/input[3]

var boxes = document.getElementsByTagName("input");
for (var i = 0; i < boxes.length; i++) {
  myType = boxes[i].getAttribute("type");
  if ( myType == "checkbox") {
    boxes[i].checked=1;
  }
}
