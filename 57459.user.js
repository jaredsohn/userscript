// ==UserScript==
// @name           [HFR] Image Anti HS
// @version        0.1.2 
// @namespace      http://mycrub.info
// @description    Ajoute une icône anti-hs en haut d'une page d'un topic pour filtrer les messages sans intérêt.
// @include        http://forum.hardware.fr/forum2.php*
// @include        http://forum.hardware.fr/hfr/*
// ==/UserScript==

var hsImg = "data:image/gif,GIF89a%10%00%10%00%A1%02%00%00%00%00%FF%00%00%FF%FF%FF%FF%FF%FF!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%03%00%2C%00%00%00%00%10%00%10%00%00%02%3B%9C%17%A9y%B7%AF%9A%12%B4F%93%AA%B6%01%25%00%08%20%05%02%8F%18%8Ee%B8%A0%EEH%B5k%0A%CB%2B9%DA..%E8j%D9%5B%FCP%2CFf%A3a%60%8EI%E5%12%B2h%3C%1F%8D%02%00%3B";
var noHsImg = "data:image/gif,GIF89a%10%00%10%00%A1%02%00%00%00%00%80%80%80%FF%FF%FF%FF%FF%FF!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%03%00%2C%00%00%00%00%10%00%10%00%00%02%3D%9C%17%A9y%B7%AF%9A%12%B4F%93%AA%16%0B%25%00%08%20%F5%3Db8~%E1r%9E%9F5%81%A0%1Ar%F1%1CP%B2%9D%E1u%CB%02%A8N)Hk%17%99l%60%18%A5%E6%D2%84t%1A%1EH%A3%00%00%3B";
var topicId = null;

/**
 * Parses processes the whole page
 */ 
var processPage = function () {
  var root = document.getElementById('mesdiscussions');
  var messages = getElementByXpath('//table[@class="messagetable"]', root);

  if (isInFilter()) {
    injectRemoveFilterButton();
    for(var i = 0; i < messages.length; i++) {
      if (hasImage(messages[i])) {
        messages[i].setAttribute("style", null);
      }
      else {
        messages[i].setAttribute("style", "display:none");
      }
    }
  }
  else {
    injectAddFilterButton();
    for(var i = 0; i < messages.length; i++) {
      messages[i].setAttribute("style", null);
    }
  }
}

/**
 * Does this message have an external image?
 */ 
var hasImage = function (message) {
  var images = getElementByXpath(".//div[starts-with(@id,'para')]//img[not(starts-with(@src, 'http://forum-images.hardware.fr'))]", message);
  var quotedImages = getElementByXpath(".//div[starts-with(@id,'para')]//table[@class='citation' or @class='oldcitation' or @class='quote']//img[not(starts-with(@src, 'http://forum-images.hardware.fr'))]", message);
  return images.length - quotedImages.length > 0;
}

/**
 * Utility function to retrieve DOM element by XPath
 */ 
var getElementByXpath = function (path, element) {
	var arr = Array(), xpr = document.evaluate(path, element, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for (;item = xpr.iterateNext();) arr.push(item);
	return arr;
}

/**
 * Gets the list of filtered topics from persistence
 */ 
var getFilteredTopicIds = function () {
  return GM_getValue("ah_topic_ids", "").split(";");
}

/**
 * Sets the list of filtered topics to persistence
 */ 
var setFilteredTopicIds = function (allIds) {
  GM_setValue("ah_topic_ids", allIds.join(";"));
}

/**
 * Returns the topic id as "cat.post" where cat is the category id and post the post id 
 */
var getTopicId = function () {
  if (topicId == null) {
    var searchForm = getElementByXpath('//table[@class="main"]//tr//th//form[@action="/transsearch.php"]', document.body)[0];
    var postInput = getElementByXpath('input[@name="post"]', searchForm);
    var catInput = getElementByXpath('input[@name="cat"]', searchForm);
    topicId = catInput[0].value + "." + postInput[0].value;
  }
  return topicId;
}

/**
 * Registers this topic in the list of topics that must be filtered
 */ 
var addTopicToFilter = function () {
  if (!isInFilter()) {
    var id = getTopicId();
    var allIds = getFilteredTopicIds();
    allIds.push(id);
    setFilteredTopicIds(allIds);
  }
}

/**
 * Unregisters this topic
 */ 
var removeTopicFromFilter = function () {
  if (isInFilter()) {
    var allIds = getFilteredTopicIds();
    var newIds = new Array();
    var id = getTopicId();
    for (var i = 0; i < allIds.length; i++) {
      if(allIds[i] != id) {
        newIds.push(allIds[i]);
      }
    }
    setFilteredTopicIds(newIds);
  }
}

/**
 * Returns true if the topic has to be filtered
 */ 
var isInFilter = function () {
  return getFilteredTopicIds().indexOf(getTopicId()) != -1;
}

/**
 * Returns the topic "toolbar" DOM element
 */ 
var getTopicToolbar = function() {
  return getElementByXpath('//table[@class="main"]//tr//th//div[@class="right"]', document.body)[0];
}

/**
 * Adds a button to the topic "toolbar" that enables the filter in this topic
 */ 
var injectAddFilterButton = function () {
  var newImg = document.createElement('img');
  newImg.src = hsImg;
  newImg.alt = newImg.title = 'Filtrer ce topic (masquer les posts sans images)';
  newImg.style.cursor = 'pointer';
  newImg.style.marginRight = '3px';
  newImg.addEventListener('click', 
    function(event) {
      addTopicToFilter();
      event.target.setAttribute("style", "display:none");
      processPage();
    }, false);
  
  var newDiv = document.createElement('div');
  newDiv.className = 'right';
  newDiv.appendChild(newImg);
  
  getTopicToolbar().insertBefore(newDiv, toolbar.lastChild);
}

/**
 * Adds a button to the topic "toolbar" that disables the filter in this topic
 */ 
var injectRemoveFilterButton = function () {
  var newDiv = document.createElement('div');
  var newImg = document.createElement('img');
  
  newImg.src = noHsImg;
  newImg.alt = newImg.title = 'Ne plus filtrer ce topic (afficher les posts sans images)';
  newImg.style.cursor = 'pointer';
  newImg.style.marginRight = '3px';
  newImg.addEventListener('click', 
    function(event) {
      removeTopicFromFilter();
      event.target.setAttribute("style", "display:none");
      processPage();
    }, false);

  newDiv.className = 'right';
  newDiv.appendChild(newImg);
  
  getTopicToolbar().insertBefore(newDiv, toolbar.lastChild);
}

//
// Script execution
//
processPage();