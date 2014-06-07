// ==UserScript==
// @name           Gmail Hide Certain Labels
// @namespace      http://userscripts.org/scripts/show/48237
// @description    Hide certain labels in Gmail
// @version        1.0
//
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// Thanks to Manu J for fixes after gmail changes.
// NOTE: This script takes the functionality of a couple of other scripts.
// The other gmail script authors deserve all the credit.

// ==/UserScript==

if(document.location != top.location) return;

var labelsShowAll = 0;

(function ()
{
  var interval = window.setInterval(tryToHideLabels, 3000);
  var showAllObj;



  function tryToHideLabels()
  {
    if (document.getElementById("canvas_frame") && frames[3].document) {
	hideLabels(frames[3].document);
    }
  }

  function labelsToggleAll()
  {
    labelsShowAll = !labelsShowAll;
    hideLabels(frames[3].document);
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

    var labelsTableXpath = "//table[@class = 'cf pQ']";
    var labels = parentItem.evaluate(labelsTableXpath, parentItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(!labels || !labels.parentNode || !labels.parentNode.nextSibling)
	return;

    var editLabel = labels.parentNode.nextSibling;

    showAllObj = parentItem.createElement("span");
    showAllObj.innerHTML = '<div id="labelsToggleAll" class="pU">Show all</div>';
    showAllObj.addEventListener('click', labelsToggleAll, true);
    editLabel.parentNode.insertBefore(showAllObj, editLabel);
  }

  function hideLabels(parentItem)
  {
    var labelsTableXpath = "//table[@class = 'cf pQ']";
    var labels = parentItem.evaluate(labelsTableXpath, parentItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(!labels || !labels.rows.length)
      return;

    window.clearInterval(interval);
    labels.addEventListener("DOMNodeInserted",tryToHideLabels, false)
    

    for(var i = 0; i < labels.rows.length; i++) {
      var labelRow = labels.rows[i];
      var div = labelRow.cells[0].firstChild.firstChild;
      // fix for folders4gmail
      if(div.nextSibling)
	  div = div.nextSibling;
      var labelText = div.firstChild.firstChild.textContent;

      if(labelsShowAll || !labelText.match(/_$/)) {
        labelRow.style.display = "table-row";
      } else {
        labelRow.style.display = "none";
	}
    }

    addExpander(parentItem);
  }

})();