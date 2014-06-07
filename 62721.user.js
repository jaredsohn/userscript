// ==UserScript==
// @name           [HFR] Anti HS
// @version        2.3
// @namespace      http://mycrub.info/hfr/anti-hs/
// @description    Ajoute une icône anti-hs en haut d'une page d'un topic pour filtrer les messages sans intérêt.
// @include        http://forum.hardware.fr/forum2.php*
// @include        http://forum.hardware.fr/*/*/*/*-sujet_*_*.htm*
// ==/UserScript==

var hsImg = "data:image/gif,GIF89a%10%00%10%00%A1%02%00%00%00%00%FF%00%00%FF%FF%FF%FF%FF%FF!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%03%00%2C%00%00%00%00%10%00%10%00%00%02%3B%9C%17%A9y%B7%AF%9A%12%B4F%93%AA%B6%01%25%00%08%20%05%02%8F%18%8Ee%B8%A0%EEH%B5k%0A%CB%2B9%DA..%E8j%D9%5B%FCP%2CFf%A3a%60%8EI%E5%12%B2h%3C%1F%8D%02%00%3B";
var noHsImg = "data:image/gif,GIF89a%10%00%10%00%A1%02%00%00%00%00%80%80%80%FF%FF%FF%FF%FF%FF!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%03%00%2C%00%00%00%00%10%00%10%00%00%02%3D%9C%17%A9y%B7%AF%9A%12%B4F%93%AA%16%0B%25%00%08%20%F5%3Db8~%E1r%9E%9F5%81%A0%1Ar%F1%1CP%B2%9D%E1u%CB%02%A8N)Hk%17%99l%60%18%A5%E6%D2%84t%1A%1EH%A3%00%00%3B";

var minLength = null;
var blWords = null;
var wlWords = null;
var topicId = null;

var doubleClickInterval = 250;
var lastClickTime = 0;
var clickedImage;

/**
 * Parses processes the whole page
 */ 
var processPage = function () {
  var startTime = new Date().valueOf();
  var cmpt = 0;
  var root = document.getElementById('mesdiscussions');
  var messages = getElementByXpath('//table[@class="messagetable"]', root);
  
  if (isInFilter()) {
    injectRemoveFilterButton();
    for(var i = 0; i < messages.length; i++) {
      if (complies(messages[i])) {
        messages[i].setAttribute("style", null);
      }
      else {
        cmpt++;
        messages[i].setAttribute("style", "display:none");
      }
    }
    GM_log(cmpt + " messages filtered in " + (new Date().valueOf() - startTime) + " ms");
  }
  else {
    injectAddFilterButton();
    for(var i = 0; i < messages.length; i++) {
      messages[i].setAttribute("style", null);
    }
  }
}

/**
 * Tests if one message complies with the filtering rules of the topic
 */ 
var complies = function (message) {
  return (!filterOnImages()  || (filterOnImages()  && hasImage(message)))
      && (!filterOnQuotes()  || (filterOnQuotes()  && hasQuote(message)))
      && (!filterOnXQuotes() || (filterOnXQuotes() && hasXQuote(message)))
      && (!filterOnLength()  || (filterOnLength()  && hasLength(message)))
      && (!filterOnWords()   || (filterOnWords()   && wordsAreOK(message)))
      && (!filterOnLinks()   || (filterOnLinks()   && hasLink(message)))
  ;
}

/**
 * Is this topic configured for filtering on images?
 */ 
var filterOnImages = function () {
  return GM_getValue("ah_images." + getTopicId(), false);
}

/**
 * Is this topic configured for filtering on quotes?
 */ 
var filterOnQuotes = function () {
  return GM_getValue("ah_quotes." + getTopicId(), false);
}

/**
 * Is this topic configured for filtering on extra-topic quotes?
 */ 
var filterOnXQuotes = function () {
  return GM_getValue("ah_quotes_extra." + getTopicId(), false);
}

/**
 * Is this topic configured for filtering on message length?
 */ 
var filterOnLength = function () {
  return GM_getValue("ah_chars." + getTopicId(), false);
}

/**
 * Is this topic configured for filtering on blacklisted words?
 */ 
var filterOnWords = function () {
  return GM_getValue("ah_bl_words." + getTopicId(), false);
}

/**
 * Is this topic configured for filtering on links?
 */ 
var filterOnLinks = function () {
  return GM_getValue("ah_links." + getTopicId(), false);
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
 * Does this message have an external link?
 */ 
var hasLink = function (message) {
  var links = getElementByXpath(".//div[starts-with(@id,'para')]//p//a[not(starts-with(@href, 'http://forum.hardware.fr'))]", message);
  var quotedLinks = getElementByXpath(".//div[starts-with(@id,'para')]//table[@class='citation' or @class='oldcitation' or @class='quote']//p//a[not(starts-with(@href, 'http://forum.hardware.fr'))]", message);
  return links.length - quotedLinks.length > 0;
}

/**
 * Does this message contain at least 1 quote?
 */ 
var hasQuote = function (message) {
  var quotes = getElementByXpath(".//div[starts-with(@id,'para')]//table[@class='citation' or @class='oldcitation' or @class='quote']", message);
  return quotes.length > 0;
}

/**
 * Does this message contain at least 1 extra-topic quote?
 */ 
var hasXQuote = function (message) {
  var quotes = getElementByXpath(".//div[starts-with(@id,'para')]//table[@class='citation' or @class='oldcitation' or @class='quote']//tr//td//b[@class='s1']//a", message);
  for (var i = 0; i < quotes.length; i++) {
    var href = quotes[i].href;
    var anchor = href.substring(href.lastIndexOf("#")+1);
    if (document.getElementsByName(anchor).length == 0) {
      return true
    }
  }
  return false;
}

/**
 * Returns the (unquoted) text of this message
 */ 
var getMessageText = function (message) {
  var pars = getElementByXpath(".//div[starts-with(@id,'para')]/p", message);
  var text = "";
  for (var i = 0 ; i < pars.length ; i++) text += pars[i].textContent + " ";
  return text;
}

/**
 * Is this message long enough?
 */ 
var hasLength = function (message) {
  return getMessageText(message).length >= getMinLength();
}

/**
 * Does this message have 1 blacklisted word?
 */ 
var hasBlWord = function (message) {
  var blWords = getBlWords();
  var text = getMessageText(message).toUpperCase();
  for (var i = 0; i < blWords.length; i++) {
    if (blWords[i] != null && blWords[i].length > 0) {
      if (text.indexOf(blWords[i].toUpperCase()) >= 0) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Does this message have 1 whitelisted word?
 */ 
var isWlSet = function () {
  var wlWords = getWlWords();
  return wlWords != null && wlWords.length != 0 && (wlWords.length != 1 || wlWords[0] != "");
}

/**
 * Does this message have 1 whitelisted word?
 */ 
var hasWlWord = function (message) {
  var wlWords = getWlWords();
  var text = getMessageText(message).toUpperCase();
  for (var i = 0; i < wlWords.length; i++) {
    if (wlWords[i] != null && wlWords[i].length > 0) {
      if (text.indexOf(wlWords[i].toUpperCase()) >= 0) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Is the message OK with the White and Black lists?
 */ 
var wordsAreOK = function (message) {
  if (isWlSet()) {
    return hasWlWord(message) && !hasBlWord(message);
  }
  else {
    return !hasBlWord(message);
  }
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
    var postId;
    var catId;

    var m = new RegExp(".*forum2\\.php\\?.*\\&cat=(\\d*)\\&.*\\&post=(\\d*)\\&.*").exec(document.location.href);
    if (m != null) {
      catId = m[1];
      postId = m[2];
    }
    else {
      var searchForm = getElementByXpath('//table[@class="main"]//tr//th//form[@action="/transsearch.php"]', document.body)[0];
      postId = getElementByXpath('input[@name="post"]', searchForm)[0].value;
      catId = getElementByXpath('input[@name="cat"]', searchForm)[0].value;    
    }

    topicId = catId + "." + postId;
  }
  return topicId;
}

/**
 * Returns the minimum length of the accepted messages
 */ 
var getMinLength = function () {
  if (minLength == null) {
    minLength = GM_getValue("ah_chars_length." + getTopicId(), 500);
  }
  return minLength;
}

/**
 * Returns the list of blacklisted words
 */ 
var getWlWords = function () {
  if (wlWords == null) {
    wlWords = GM_getValue("ah_wl_words." + getTopicId(), "").split("\n");
  }
  return wlWords;
}

/**
 * Returns the list of blacklisted words
 */ 
var getBlWords = function () {
  if (blWords == null) {
    blWords = GM_getValue("ah_bl_words", "").split("\n");
  }
  return blWords;
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
  newImg.alt = newImg.title = 'Filtrer ce topic (masquer les posts sans images). Double-clic pour configurer.';
  newImg.style.cursor = 'pointer';
  newImg.style.marginRight = '3px';
  newImg.addEventListener('click', 
    function(event) {
      var clickTime = new Date().getTime();
      if (clickTime - lastClickTime > doubleClickInterval) {
        lastClickTime = clickTime;
        clickedImage = event.target;
        setTimeout(
          function() {
            if (lastClickTime == clickTime) {
              addTopicToFilter();
              clickedImage.setAttribute("style", "display:none");
              if (filterOnImages() || filterOnQuotes() || filterOnXQuotes() || filterOnLength() || filterOnWords() || filterOnLinks()) {
                processPage();
              }
              else {
                showConfigDialog();
              }
            }
          }, doubleClickInterval);
      }
      else {
        lastClickTime = clickTime;
        showConfigDialog();
      }
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
  newImg.alt = newImg.title = 'Ne plus filtrer ce topic (afficher les posts sans images). Double-clic pour configurer.';
  newImg.style.cursor = 'pointer';
  newImg.style.marginRight = '3px';
  newImg.addEventListener('click', 
    function(event) {
      var clickTime = new Date().getTime();
      if (clickTime - lastClickTime > doubleClickInterval) {
        lastClickTime = clickTime;
        clickedImage = event.target;
        setTimeout(
          function() {
            if (lastClickTime == clickTime) {
                removeTopicFromFilter();
                clickedImage.setAttribute("style", "display:none");
                processPage();
            }
          }, doubleClickInterval);
      }
      else {
        lastClickTime = clickTime;
        showConfigDialog();
      }
    }, false);

  newDiv.className = 'right';
  newDiv.appendChild(newImg);
  
  getTopicToolbar().insertBefore(newDiv, toolbar.lastChild);
}

function showConfigDialog() {
  clickedImage.setAttribute("style", "display:none");
  cmScript.showConfigWindow();
}

/**
 * Config window
 */ 
var cmScript =
{
	backgroundDiv : null,
	
	configDiv : null,
	
	timer : null,
	
	setDivsPosition : function ()
	{		
		cmScript.setBackgroundPosition();
		cmScript.setConfigWindowPosition();
	},
	
	setBackgroundPosition : function ()
	{				
		cmScript.backgroundDiv.style.width = document.documentElement.clientWidth + 'px';	
		cmScript.backgroundDiv.style.height = document.documentElement.clientHeight + 'px';
		cmScript.backgroundDiv.style.top = window.scrollY + 'px';
	},

	setConfigWindowPosition : function ()
	{
		cmScript.configDiv.style.left = (document.documentElement.clientWidth / 2) - (parseInt(cmScript.configDiv.style.width) / 2) + window.scrollX + 'px';
		cmScript.configDiv.style.top = (document.documentElement.clientHeight / 2) - (parseInt(cmScript.configDiv.clientHeight) / 2) + window.scrollY + 'px';
	},	
	
	disableKeys : function (event)
	{
		var key = event.which;
		if (key == 27)
		{
			clearInterval(cmScript.timer);
			cmScript.hideConfigWindow();
		}
		//else if (key == 13) cmScript.validateConfig();
		else if (event.altKey || (event.target.nodeName.toLowerCase() != 'input' && key >= 33 && key <= 40)) event.preventDefault();
	},
	
	disableTabUp : function (elt)
	{
		elt.addEventListener('keydown', function(event)
		{
			var key = event.which;
			if (key == 9 && event.shiftKey) event.preventDefault();
		}
		, false);
	},
	
	disableTabDown : function (elt)
	{
		elt.addEventListener('keydown', function(event)
		{
			var key = event.which;
			if (key == 9 && !event.shiftKey) event.preventDefault();
		}
		, false);
	},
	
	disableScroll : function ()
	{
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', cmScript.disableKeys, false);
	},
	
	enableScroll : function ()
	{
		document.body.style.overflow = 'visible';
		window.removeEventListener('keydown', cmScript.disableKeys, false);
	},
	
	alterWindow : function (opening)
	{
		if (opening)
		{
			// On fige la fenêtre
			cmScript.disableScroll();
			// A chaque resize, repositionnement des divs
			window.addEventListener('resize', cmScript.setDivsPosition, false);
			// On cache les iframes de m%$!§
			getElementByXpath('//iframe', document.body).forEach(function(iframe){ iframe.style.visibility = 'hidden'; });		
		}
		else
		{
			cmScript.enableScroll();
			window.removeEventListener('resize', cmScript.setDivsPosition, false);
			getElementByXpath('//iframe', document.body).forEach(function(iframe){ iframe.style.visibility = 'visible'; });
		}
	},
	
	buildBackground : function ()
	{
		if (!document.getElementById('ah_back'))
		{
			cmScript.backgroundDiv = document.createElement("div");
			cmScript.backgroundDiv.id = 'ah_back';
			cmScript.backgroundDiv.addEventListener('click', function()
			{
				clearInterval(cmScript.timer);
				cmScript.hideConfigWindow();
			}
			, false);
			cssManager.addCssProperties("#ah_back { display: none; position: absolute; left: 0px; top: 0px; background-color: #242424; z-index: 1001;}");
			document.body.appendChild(cmScript.backgroundDiv);
		}
	},
	
	buildConfigWindow : function ()
	{
	  if (top.location != self.document.location) {
      return;
    }
	
		if (!document.getElementById('ah_front'))
		{	
			cmScript.configDiv = document.createElement("div");
			cmScript.configDiv.id = 'ah_front';
			cmScript.configDiv.style.width = '400px'; 
			cssManager.addCssProperties("#ah_front { display: none; vertical-align: bottom; position: absolute; background-color: #F7F7F7; z-index: 1003; border: 1px dotted #000; padding: 8px; text-align: left; font-family: Verdana;}");
			cssManager.addCssProperties("#ah_front span { font-size: 0.8em;}");
			cssManager.addCssProperties("#ah_front select { border: 1px solid black; font-family: Verdana; font-size: 0.75em;}");
			cssManager.addCssProperties("#ah_front img { display: block; margin-top: 10px; margin-left: auto; margin-right: auto;}");
			cssManager.addCssProperties("#ah_front div { position: absolute; bottom: 8px; right: 8px;}");
			cssManager.addCssProperties("#ah_front input[type=image] { margin: 2px; }");
			cssManager.addCssProperties("#ah_front label { font-size: 0.8em; }");
			
			var topicId = getTopicId();
			
			var label1 = document.createElement('span');
			label1.innerHTML = "<center><b>Configuration du script Anti HS</b></center><hr><center><b>Sur ce topic</b></center><br>Masquer les message :";
			cmScript.configDiv.appendChild(label1);
						
      var imageContainer = document.createElement('p');
      var imagesInput = document.createElement('input');
			imagesInput.type = 'checkbox';
			imagesInput.id = 'ah_images.' + topicId;
			imagesInput.checked = filterOnImages();
      imageContainer.appendChild(imagesInput);
      var imageLabel = document.createElement('label');
      imageLabel.htmlFor = 'ah_images.' + topicId;
      imageLabel.innerHTML = "qui ne contiennent pas d'image";
      imageContainer.appendChild(imageLabel);			
      cmScript.configDiv.appendChild(imageContainer);
			
			var quotesContainer = document.createElement('p');
      var quotesInput = document.createElement('input');
			quotesInput.type = 'checkbox';
			quotesInput.id = 'ah_quotes.' + topicId;
			quotesInput.checked = filterOnQuotes();
			quotesContainer.appendChild(quotesInput);
      var quotesLabel = document.createElement('label');
      quotesLabel.htmlFor = 'ah_quotes.' + topicId;
      quotesLabel.innerHTML = "qui ne contiennent pas de quote";
      quotesContainer.appendChild(quotesLabel);			
      cmScript.configDiv.appendChild(quotesContainer);

			var quotesExtraContainer = document.createElement('p');
      var quotesExtraInput = document.createElement('input');
			quotesExtraInput.type = 'checkbox';
			quotesExtraInput.id = 'ah_quotes_extra.' + topicId;
			quotesExtraInput.checked = filterOnXQuotes();
			quotesExtraContainer.appendChild(quotesExtraInput);
      var quotesExtraLabel = document.createElement('label');
      quotesExtraLabel.htmlFor = 'ah_quotes_extra.' + topicId;
      quotesExtraLabel.innerHTML = "qui ne contiennent pas de quote extra-page";
      quotesExtraContainer.appendChild(quotesExtraLabel);			
      cmScript.configDiv.appendChild(quotesExtraContainer);

			var charsContainer = document.createElement('p');
      var charsInput = document.createElement('input');
			charsInput.type = 'checkbox';
			charsInput.id = 'ah_chars.' + topicId;
			charsInput.checked = filterOnLength()
			charsInput.addEventListener('focus',
          function(event) {
            document.getElementById('ah_chars_length.' + topicId).focus();
          }, false);
			charsContainer.appendChild(charsInput);
      var charsLenInput = document.createElement('input');
			charsLenInput.type = 'text';
			charsLenInput.id = 'ah_chars_length.' + topicId;
			charsLenInput.value = getMinLength();
			charsLenInput.size = 3;
			charsLenInput.maxLength = 5;
			charsLenInput.addEventListener('blur', 
          function (event) {
            var val = parseInt(event.target.value);
            if ((typeof val !== typeof 1) || (null === val) || !isFinite(val)) {
              event.target.value = 0;
            }
            else {
              event.target.value = val;
            }
          }, false);
      var charsLabel = document.createElement('label');
      charsLabel.htmlFor = 'ah_chars.' + topicId;      
      charsLabel.appendChild(document.createTextNode("de moins de "));
      charsLabel.appendChild(charsLenInput);
      charsLabel.appendChild(document.createTextNode(" caractères"));
      charsContainer.appendChild(charsLabel);			
      cmScript.configDiv.appendChild(charsContainer);
			
			var linksContainer = document.createElement('p');
      var linksInput = document.createElement('input');
			linksInput.type = 'checkbox';
			linksInput.id = 'ah_links.' + topicId;
			linksInput.checked = filterOnLinks();
			linksContainer.appendChild(linksInput);
      var linksLabel = document.createElement('label');
      linksLabel.htmlFor = 'ah_links.' + topicId;
      linksLabel.innerHTML = "qui ne contiennent pas de lien";
      linksContainer.appendChild(linksLabel);			
      cmScript.configDiv.appendChild(linksContainer);
			
			var blWordsContainer = document.createElement('p');
      var blWordsInput = document.createElement('input');
			blWordsInput.type = 'checkbox';
			blWordsInput.id = 'ah_bl_words.' + topicId;
			blWordsInput.checked = filterOnWords();
			blWordsContainer.appendChild(blWordsInput);
      var blWordsLabel = document.createElement('label');
      blWordsLabel.htmlFor = 'ah_bl_words.' + topicId;
      blWordsLabel.innerHTML = "qui ne contiennent pas de mots-clés de la whitelist <br/>ou qui contiennent des mots-clés de la blacklist ";
      blWordsContainer.appendChild(blWordsLabel);			
      cmScript.configDiv.appendChild(blWordsContainer);

			var whiteListContainer = document.createElement('p');
      var whiteListLabel = document.createElement('span');
      whiteListLabel.innerHTML = "Liste des mots-clés (whitelist) : ";
      whiteListContainer.appendChild(whiteListLabel);
      var whiteListWords = document.createElement('textarea');
			whiteListWords.id = 'ah_wl_words.' + topicId;
			whiteListWords.cols = '40';
			whiteListWords.rows = '3';
			whiteListWords.value = getWlWords().join("\n").replace(/^\s+/g,'').replace(/\s+$/g,'');
			whiteListContainer.appendChild(whiteListWords);
      cmScript.configDiv.appendChild(whiteListContainer);
			
			var label2 = document.createElement('span');
			label2.innerHTML = "<hr><center><b>Sur tous les topics</b></center>";
			cmScript.configDiv.appendChild(label2);
			
			var blackListContainer = document.createElement('p');
      var blackListLabel = document.createElement('span');
      blackListLabel.innerHTML = "Liste des mots-clés (blacklist) : ";
      blackListContainer.appendChild(blackListLabel);
      var blackListWords = document.createElement('textarea');
			blackListWords.id = 'ah_bl_words';
			blackListWords.cols = '40';
			blackListWords.rows = '3';
			blackListWords.value = getBlWords().join("\n").replace(/^\s+/g,'').replace(/\s+$/g,'');
			blackListContainer.appendChild(blackListWords);
      cmScript.configDiv.appendChild(blackListContainer);
			
			var buttonsContainer = document.createElement('div');
			var inputOk = document.createElement('input');
			inputOk.type = 'image';
			inputOk.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%9FIDAT8%CB%A5%93%EBKSa%1C%C7%FD%3Bv%CEvl%03%09dD!%82%84P%7B%15%24%12%3B%9A%0D%C5%BC%2CK%D3%DD%BD%D26c%D8L%8B2r%5E%C6H)-%B3%D4jsNm%EA%D4%E6%D6%942q%D9QB%CC%BD%E9B%B5at%B1o%E7%EC%C5L%12%23z%E0%0B%0F%0F%CF%E7%F3%7B%AEq%00%E2%FE'%7F%0C%14%F8%0E%89r%A7%0F%EA%B3%3D)L%C6%E3%FDa%E9%888%2Cu%252Rg%A2%3E%DD%BEW%B4%AB%20%CF%9BJ%CB%3C%C9!%9DG%86%9BA%0B%FA%96%BB%A2%E9%5ClF%89%EB%18%24%BDTH%D2C%D1%3B%0A%D8%AAt%E6xR%E4%EA%9C%11%CE%D5~%D8%5E%5E%83i%AE2%1A%AE%EFX%EDC%E3L%15%0E%D8%F8%91d%1B%9F%DE%26%C8%F1%A4%083%DDI%EB%1C%CCM%AC%09%94%A1%C2_%02%CD%CC%19%E8%D8%94%B3%A9%F6%9D%85%FD%F5%3D%5C%9C%AA%80%D8B%AE%8B%AF%93%C2%98%40%E6N2%A8%C6%B2%A2%959%98%03U%DESPL%17B1U%00%F5T!%DCk%830x%95p%B0%92%DC%9E%23H%B8B%1Ab%82%8C%111%D3%19l%865%D8%84%0A_1%94O%E4%2C%98%0F%E5%24%1BO%3E%C6%DF%B8%C0%B5Pd%0Dm%CF%1Ba%9BkD%7C%3D%C9%C4%04G%ED%09%1B%0FVn%A36%A0%81%D6%5B%C4%AEd%00%8B%1F%E6%A1%9A(%C4%D8%DAP%14%FE%B1%F9%1Dm%CF.%C10Q%8C%BE%60'%04Fb%23%26%90%DC%A76%FA%97%BBa%F4%ABP%EB%D7%E2%D3%D7%8FQ%E8%FD%97%B71%D82%5B%0F%B5%2B%1Bz%F7i%F4%07%3B%20%A8%F9%5D%D0C17%E6%9B%D0%BEp%19%BAI9%CC%BEjD%BE%7D%8E%C2%9B%3F7ayz%01e%CE%2ChXAK%A0%0E%ED%5E3%A8*bk%0B%A9%B7%04%06%F9%40%1A%EC%2BwQ%3D!%87%DA%7D%12u%D3%E5Xz%B7%80%B6%D9%06%94%0E%1E%87%C2q%02%3Ag%0E%EC%AF%BA%91n%3D%0C%AA%92%D8%3A%C4d%2B_%B8%8F%BD%1A%B3G%83%87%CC%1DT%8E%E6A%3B%9C%03%D5%90%0CJ%07%17%0E%CE%C6%A3%A5.%18%87%8A!P%F3%D6)5!%DC%F6%90%12%9BH%3A%BE%81%88%98%DCep%B0%92%D6%80%19%FA%D1%22%9C%1B%96%A3%95%DD%82%9D%85%F5%CE%22%F0Ky%11%16%A6w%7C%CA%7B%1AH%9A2%11!i%87%04%ED~3z_X%D1%3Bo%85%C5kBZK*%04%0A%5E%88R%11%F4%AE%9F%89%3AO%8A(%03%A1%A7j%08F%A0%E5%85%05*%5E%98%AD%C8%B0%D1S%A5%84%E8%AF%BF%F1_%F3%0Bg%D0%AC%E5y%BA%D4c%00%00%00%00IEND%AEB%60%82";
			inputOk.alt = 'Valider';
			inputOk.addEventListener('click', cmScript.validateConfig, false);
			
			var inputCancel = document.createElement('input');
			inputCancel.type = 'image';
			inputCancel.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02!IDAT8%CB%95%93%EBN%13Q%14%85%89%89%C9%89%CF%A0V%89%86%C8%91%80%C4%1BB%5B%06(%AD%0D%08%26%D0%FB%85%5E%A4%80%B4%A5%ED%A4M%A16%EA%0FM%7C%12%9F%0BD%C5%DE%B0%D2%99v%3A%D3%E5%AE%98J-%25%E1%C7N%CEd%CE%FA%F6%AC%B5%F7%0C%00%18%B8L%D5%D7B%D7%CE%3Ew_%103%3A*%DEW%EC%0Fr%D9%ED%8D%D7lNC%2F%A0-%CE%EC%A2%95%CEB%8B'%7B%20u_%80%D7%03a46%B6%F0%EB%E5%CA%E7%EA%E2%D2%BD%7F%80%BFb%E4%DF%A1E%A5%25D47%B7%3B%10%D9%BB%C6%A9%3B%9A%D18%90%CB%A3%7D%3E6%5B%E3%E5%19%D3%95S%40*%CDZ%09Qk%ED%BE%01%3E~%82%96%CD%B5%01h%04B%5C%F6%F89u%87%B2%1D%03%E8%BD%EC%0F%E0x%FE%B9Z%16%E6%AEvY%D0b%09%A6%BE%8E%A9%9A%98%01%DE%7F%80%9AJ%A3%1E%0C%83%BAC%D9%8A%02%D9%BD%3F%E7%8A%C9B%E2Yvn%88%CD%C8%26k%84%D6%D5ft%87%EC%BC%05%F6%F2%24%CC%01%99%2Cd%8F%0F%959%B3Z%9E%9Ea%FD%A7p%1A%16%93%5C%5E%0DY%B2%E3%F6%01%0E7%20%A6Q%99%9D%D7JF%81%FD%7F%BF%07%209%3D%EDQ%014%0D%D8%9C%C0%8A%1D%D8I%92o%0B%0A%13S%FCB%80%E4ps%C9%E5%81%12%8E%00I%91%84)%20Fv(%40y%D5%8E%B2%DE%88%EFc%E3%FC%5C%40%CD%EE%E2%92%D3%0D%25%B4%0E%D0%18%25%87%0B%14%96Z%9C2h'%8B%CB%40d%03%B5%17%CB(%3C%7C%8C%C3%A1a%DE%05%A0%CD%E2%D4%1DJ%F0%15uM%40%A2O%A7%B0%D4%E2%A4%81%15%9EL%B0%A3%F1Gj%D5d%06%82!%9CX%AC8%1A%19%C5%C1%ADA%DE%01%D0f%095%9B%03J%20%04i%D5%01%0AK-%3E%D3w%02%FB62%C6%BE%0E%DFW%7F%1A%05H%D6%05%FC%18%7D%80%FD%1B%3A%A1%CB%02m%96P%5DXB%C90%ADQX%3Di%1F%DE%1Db_%06%EF%A8g%C5%3D!%96%F4F%A1%F0t%92%F5%FB%99%0Et%B7%D9%FE%F5%9B%C2%85c%BCl%FD%06r%BB%A4%C7%DB%ED%BE%14%00%00%00%00IEND%AEB%60%82";
			inputCancel.alt = 'Annuler';
			inputCancel.addEventListener('click', cmScript.hideConfigWindow, false);
			cmScript.disableTabDown(inputCancel);
			
			buttonsContainer.appendChild(inputOk);
			buttonsContainer.appendChild(inputCancel);
			cmScript.configDiv.appendChild(buttonsContainer);

			document.body.appendChild(cmScript.configDiv);
		}
	},
	
	getInputValue : function(input)
	{
    if (input.type=="checkbox") {
      return input.checked;
    }
    else {
      return input.value;
    }
  },
	
	validateConfig : function()
	{
	  addTopicToFilter();
		getElementByXpath('.//*[starts-with(@id, "ah_")]', document.getElementById('ah_front')).forEach(function(input)
		{
			GM_setValue(input.id, cmScript.getInputValue(input));
		}
		);
		cmScript.hideConfigWindow();	
	},
	
	initBackAndFront : function()
	{
		if (document.getElementById('ah_back'))
		{
			cmScript.setBackgroundPosition();
			cmScript.backgroundDiv.style.opacity = 0;
			cmScript.backgroundDiv.style.display = 'block';
		}
		
		if (document.getElementById('ah_front'))
		{
			//document.getElementById('ar_alias_url').value = sleathRehost.currentAliasUrl;
		}
	},
	
	showConfigWindow : function ()
	{
		cmScript.alterWindow(true);
		cmScript.initBackAndFront();
		var opacity = 0;
		cmScript.timer = setInterval(function()
		{
			opacity = Math.round((opacity + 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if (opacity >= 0.8)
			{
				clearInterval(cmScript.timer);
				cmScript.configDiv.style.display = 'block';
				cmScript.setConfigWindowPosition();
			}
		}
		, 1);
	},
	
	hideConfigWindow : function ()
	{
	  //Reset current conf, it will be retrieved from the registry
	  minLength = null;
    blWords = null;
    wlWords = null;
    
	  processPage();
	  
		cmScript.configDiv.style.display = 'none';
		var opacity = cmScript.backgroundDiv.style.opacity;
		cmScript.timer = setInterval(function()
		{
			opacity = Math.round((opacity - 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if (opacity <= 0)
			{
				clearInterval(cmScript.timer);
				cmScript.backgroundDiv.style.display = 'none';
				cmScript.alterWindow(false);
			}
		}
		, 1);
	},
	
	setUp : function()
	{
		// On construit l'arrière plan
		cmScript.buildBackground();
		// On construit la fenêtre de config
		cmScript.buildConfigWindow();
		// On ajoute la css
		cssManager.insertStyle();
	},
	
	createConfigMenu : function ()
	{
		GM_registerMenuCommand("[HFR] Auto Rehost -> Configuration", this.showConfigWindow);
	}
};

var cssManager = 
{
	cssContent : '',
	
	addCssProperties : function (properties)
	{
		cssManager.cssContent += properties;
	},
	
	insertStyle : function()
	{
		GM_addStyle(cssManager.cssContent);
		cssManager.cssContent = '';
	}
}

cmScript.setUp();

//
// Script execution
//
processPage();
