// ==UserScript==
// @name           Gmail Unread Labels
// @namespace      http://userscripts.org/scripts/show/24297
// @description    Only show unread labels in Gmail
// @version        1.4.1
//
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// ==/UserScript==

if(document.location != top.location) return;

var labelsShowAll = false;

(function ()
{
  var interval = window.setInterval(tryToHideLabels, 3000);
  var showAllObj;



  function tryToHideLabels()
  {
      var canvas = document.getElementById("canvas_frame");

      if (canvas && canvas.contentDocument) {
	  hideLabels(canvas.contentDocument);
      }
  }

  function labelsToggleAll()
  {
    labelsShowAll = !labelsShowAll;
    var canvas = document.getElementById("canvas_frame");
    console.log('canvas=' + canvas);
    console.log('canvas.contentDocument=' + canvas.contentDocument);
    hideLabels(canvas.contentDocument);
    if(labelsShowAll) {
	showAllObj.innerHTML = '<div id="labelsToggleAll" class="pU">Show unread</div>';
    } else {
	showAllObj.innerHTML = '<div id="labelsToggleAll" class="pU">Show all</div>';
    }
  }

  function addExpander(parentItem)
  {
    var toggleXpath = "//div[@id = 'labelsToggleAll']";
    var toggle = parentItem.evaluate(toggleXpath, parentItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(toggle)
	return;

    var labelsTableXpath = "//div[@class = 'zw']";
    var labels = parentItem.evaluate(labelsTableXpath, parentItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    if(!labels || !labels.parentNode)
	return;

    var editLabel = labels.parentNode;

    showAllObj = parentItem.createElement("span");
    showAllObj.innerHTML = '<div id="labelsToggleAll" class="pU">Show all</div>';
    showAllObj.addEventListener('click', labelsToggleAll, true);
    editLabel.parentNode.insertBefore(showAllObj, null);
  }

  function hideLabels(parentItem)
  {
    var labelsXpath = "//div[@class = 'zw']";
    var labelsX = parentItem.evaluate(labelsXpath, parentItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var labels = labelsX.snapshotItem(0);

    if(!labels)
      return;

    window.clearInterval(interval);
    labels.addEventListener("DOMNodeInserted",tryToHideLabels, false)

    var div = labels.firstChild.firstChild;

      console.log('labelsShowAll=' + labelsShowAll);

    while(div) {
      var labelText = div.firstChild.firstChild.nextSibling.firstChild.textContent;

      if(labelsShowAll || labelText.match(/ \([1-9][0-9]*\)$/)) {
	  console.log('show ' + labelText);
	  div.style.display = "";
      } else {
	  console.log('hide ' + labelText);
	  div.style.display = "none";
      }

      div = div.nextSibling;
    }

    addExpander(parentItem);
  }

})();
