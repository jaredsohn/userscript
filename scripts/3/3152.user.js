// ==UserScript==
// @name          Add Prev/Next Accesskeys
// @namespace     tag:oliver.dyas@gmail.com,2005-2-28:userscript
// @description   Adds accesskeys to "previous" and "next" type links (useful for reading multi-page forum threads, webcomic archives, google results, etc.). The keys are 'Alt-,' for back & 'Alt-.' for forward; 'Alt-<' & 'Alt->' do likewise but open the link in a new window/tab.
// @version       0.1.2
// ==/UserScript==

(function() {
  //############## THESE CONTROL WHICH KEYS ARE USED ##############
  var prevAccessKey = ",";
  var nextAccessKey = ".";
  var prevInNewWindowKey = "<";
  var nextInNewWindowKey = ">";

  // This script looks for the words "forward" and "next" and "previous" and "back" in link text and the names of link images, and gives the first ones that it finds on each page access keys.
  // It also adds accesskeys which open the links in a new window. This is probably only useful if you have "Tools > Options > Tabs > Force links that open new windows to open in a new tab" turned on

  // Much of the code is copied from tutorials
  // I'm not a programmer so forgive the poor quality, if you improve this script please send me a copy

  var allLinks, thisLink;
  var nex = /next/, fr = /forw/;
  var pre = /prev/, bac = /back/;
  //it would be nice to also use << and >>, but some sites use < & > with << & >> for 'first' and 'latest'

  allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

  //scan through all links in page in REVERSE ORDER so the first match on the page is the one that gets the access key
  for (var i = allLinks.snapshotLength - 1; i >= 0 ; i--) {
	var thisLink = allLinks.snapshotItem(i);
	if (pre.test(thisLink.textContent.toLowerCase()) | bac.test(thisLink.textContent.toLowerCase())) {
	  thisLink.setAttribute("accesskey", prevAccessKey);

      var invisiLink = document.createElement("a");
	  invisiLink.setAttribute("href", thisLink.getAttribute("href"));
	  invisiLink.setAttribute("accesskey", prevInNewWindowKey);
	  invisiLink.setAttribute("target", "_blank");
	  thisLink.parentNode.insertBefore(invisiLink, thisLink.nextSibling);
	}
	if (nex.test(thisLink.textContent.toLowerCase()) | fr.test(thisLink.textContent.toLowerCase())) {
	  thisLink.setAttribute("accesskey", nextAccessKey);

      var invisiLink = document.createElement("a");
	  invisiLink.setAttribute("href", thisLink.getAttribute("href"));
	  invisiLink.setAttribute("accesskey", nextInNewWindowKey);
	  invisiLink.setAttribute("target", "_blank");
	  thisLink.parentNode.insertBefore(invisiLink, thisLink.nextSibling);
	}
  }
  
  //check for links that contain images that have likely sounding properties
  var allLinks = document.evaluate('//a[@href]/img[contains(@src,\'prev\')]/parent::* '
    +'| //a[@href]/img[contains(@src,\'Prev\')]/parent::* '
	+'| //a[@href]/img[contains(@src,\'back\')]/parent::* '
	+'| //a[@href]/img[contains(@alt,\'prev\')]/parent::* '
	+'| //a[@href]/img[contains(@alt,\'Prev\')]/parent::* '
	+'| //a[@href]/img[contains(@alt,\'back\')]/parent::* '
	+'| //a[contains(@title,\'Prev\')]'
	,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if (allLinks.snapshotLength!=0) {
	  var thisLink = allLinks.snapshotItem(0); thisLink.setAttribute("accesskey", prevAccessKey);

      var invisiLink = document.createElement("a");
	  invisiLink.setAttribute("href", thisLink.getAttribute("href"));
	  invisiLink.setAttribute("accesskey", prevInNewWindowKey);
	  invisiLink.setAttribute("target", "_blank");
	  thisLink.parentNode.insertBefore(invisiLink, thisLink.nextSibling);
  }

  var allLinks = document.evaluate('//a[@href]/img[contains(@src,\'next\')]/parent::* '
    +'| //a[@href]/img[contains(@src,\'Next\')]/parent::* '
  	+'| //a[@href]/img[contains(@src,\'forw\')]/parent::* '
	+'| //a[@href]/img[contains(@alt,\'forw\')]/parent::* '
	+'| //a[@href]/img[contains(@alt,\'next\')]/parent::* '
	+'| //a[@href]/img[contains(@alt,\'Next\')]/parent::* '
	+'| //a[contains(@title,\'Next\')]'
	,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if (allLinks.snapshotLength!=0) {
	  var thisLink = allLinks.snapshotItem(0)
	  thisLink.setAttribute("accesskey", nextAccessKey);

      var invisiLink = document.createElement("a");
	  invisiLink.setAttribute("href", thisLink.getAttribute("href"));
	  invisiLink.setAttribute("accesskey", nextInNewWindowKey);
	  invisiLink.setAttribute("target", "_blank");
  thisLink.parentNode.insertBefore(invisiLink, thisLink.nextSibling);
  }
})();

