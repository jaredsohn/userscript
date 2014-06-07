// ==UserScript==
// @name           Filter Tweets
// @namespace      http://varunkumar.me
// @description    Script for filtering tweets about a specific topic. Works only with #NewTwitter
// @include        http://*twitter.com/*
// @include        https://*twitter.com/*
// @version        1.1
// @author         Varunkumar Nagarajan
// ==/UserScript==

//================Helper Methods==========================
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function getAbsPos(oId, tl) {
	var o = document.getElementById(oId);
	var val = 0;
	while (o != null && o.offsetParent != null && o.offsetParent.nodeName != "body") {
		val += (tl == 'top') ? parseInt(o.offsetTop) : parseInt(o.offsetLeft);
		o = o.offsetParent;
	}
	return val;
}

function getElementByClass(theClass, ref) {
	var allHTMLTags = ref.getElementsByTagName("*");

	var matches = [];
	for (var i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className != null && allHTMLTags[i].className.indexOf(theClass) != -1)
			matches.push(allHTMLTags[i]);
	}
	return matches;
}
//========================================================

//================Chrome Compatibility====================
if (typeof GM_deleteValue == 'undefined') {
	if(typeof unsafeWindow == 'undefined') { 
		unsafeWindow = window; 
	}
	
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}
//========================================================

//================Global Variables========================
var screenName = "";
var timer;

//========================================================

prepareUI();

//=================UI Methods=============================	
function prepareUI() {
	if (document.getElementById("global-nav-messages") == null) {
		// user has not signed in do nothing
		return ; 
	}
	
	screenName = document.getElementById("screen-name").textContent;
	screenName = screenName.trim();
	
	// Adding the Filters menu
	var menu = document.getElementById("global-nav-messages").parentNode;
	
	var list = document.createElement("li");
	list.setAttribute("id", "global-nav-filters")
	
	var anchor = document.createElement("a");
	anchor.setAttribute("id", "global-nav-filters-link");
	anchor.setAttribute("href", "");
	anchor.addEventListener("click", toggleFilterBox, false);
	anchor.innerHTML = "Filters";
	list.appendChild(anchor);
	
	menu.insertBefore(list, document.getElementById("global-nav-messages"));
	
	// Preparing the filter box
	var filterBox = document.createElement('div');
	filterBox.id = 'divFilterBox';
	document.body.appendChild(filterBox);
	filterBox.setAttribute("style","-moz-border-radius-bottomleft: 5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-bottomright: 5px;-webkit-border-bottom-right-radius: 5px;-moz-border-radius-topright: 10px;-webkit-border-top-right-radius: 10px;background-color:#000000;border:1px none transparent;color:#BABABA;display:none;font-size:12px;margin-right:0;margin-top:6px;padding:12px;position:absolute;right:0;text-align:left;top:34px;left:100px;width:210px;z-index:100;opacity:.9");
	filterBox.innerHTML = "<b>Use this form to filter out tweets</b>";
	
	// Close Button
	var closeButton  = document.createElement("div");
	closeButton.setAttribute("class", 'twttr-dialog-close');
	closeButton.addEventListener("click", toggleFilterBox, false);
	closeButton.innerHTML = "<b>x</b>";
	filterBox.appendChild(closeButton);
	filterBox.appendChild(document.createElement("br"));
	filterBox.appendChild(document.createElement("br"));
	
	// People filter
	var peopleSpan = document.createElement("span");
	peopleSpan.innerHTML="From People";
	filterBox.appendChild(peopleSpan);
	var peopleFilterBox = document.createElement("input");
	peopleFilterBox.setAttribute("type", "text")
	peopleFilterBox.setAttribute("title", "Filter tweets from People.Use comma as a separator.");
	peopleFilterBox.addEventListener("keypress", suppressKeyStroke, true);
	peopleFilterBox.addEventListener("keydown", suppressKeyStroke, true);
	peopleFilterBox.setAttribute("id", "txtFrom");
	peopleFilterBox.setAttribute("value", GM_getValue(screenName + "PeopleFilters", ""));
	peopleFilterBox.setAttribute("style", "-moz-box-shadow: 0 0 8px rgba(82, 168, 236, 0.5); -webkit-box-shadow: 0 0 8px rgba(82, 168, 236, 0.5); border: 1px solid #CCCCCC; border-color: rgba(82, 168, 236, 0.75) !important; -moz-border-radius: 2px; -webkit-border-radius: 5px; height:20px;width:100%");
	filterBox.appendChild(peopleFilterBox);
	filterBox.appendChild(document.createElement("br"));
	filterBox.appendChild(document.createElement("br"));
	
	// Words Filter
	var wordsSpan = document.createElement("span");
	wordsSpan.innerHTML="Containing Words";
	filterBox.appendChild(wordsSpan);
	var wordsFilterBox = document.createElement("input");
	wordsFilterBox.setAttribute("type", "text")
	wordsFilterBox.setAttribute("title", 'Filter tweets containing words.Use comma as a separator.');
	wordsFilterBox.addEventListener("keypress", suppressKeyStroke, true);
	wordsFilterBox.addEventListener("keydown", suppressKeyStroke, true);
	wordsFilterBox.setAttribute("id","txtWords");
	wordsFilterBox.setAttribute("value", GM_getValue(screenName + "WordsFilters", ""));
	wordsFilterBox.setAttribute("style", "-moz-box-shadow: 0 0 8px rgba(82, 168, 236, 0.5); -webkit-box-shadow: 0 0 8px rgba(82, 168, 236, 0.5); border: 1px solid #CCCCCC; border-color: rgba(82, 168, 236, 0.75) !important; -moz-border-radius: 2px; -webkit-border-radius: 5px; height:20px;width:100%");
	filterBox.appendChild(wordsFilterBox);
	filterBox.appendChild(document.createElement("br"));
	filterBox.appendChild(document.createElement("br"));
	
	// Case sensitive checkbox
	var caseCheckBox = document.createElement("input");
	caseCheckBox.setAttribute("type", "checkbox");
	caseCheckBox.setAttribute("value", "Case Sensitive");
	caseCheckBox.setAttribute("id", "chkCase");
	if (GM_getValue(screenName + "CaseSensitive", false))
		caseCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(caseCheckBox);
	var caseLabel = document.createElement("span");
	caseLabel.innerHTML = "&nbsp;Case Sensitive&nbsp;&nbsp;"
	filterBox.appendChild(caseLabel);
	filterBox.appendChild(document.createElement("br"));
	
	// Remove links checkbox
	var linkCheckBox = document.createElement("input");
	linkCheckBox.setAttribute("type", "checkbox");
	linkCheckBox.setAttribute("value", "Filter out tweets with links");
	if (GM_getValue(screenName + "RemoveLinks", false))
		linkCheckBox.setAttribute("checked", "true");
	linkCheckBox.setAttribute("id", "chkLink");
	filterBox.appendChild(linkCheckBox);
	var linkLabel = document.createElement("span");
	linkLabel.innerHTML = "&nbsp;Filter out tweets with links&nbsp;&nbsp;"
	filterBox.appendChild(linkLabel);
	filterBox.appendChild(document.createElement("br"));
	filterBox.appendChild(document.createElement("br"));
	
	// Button Bar
	var buttonBar = document.createElement("div");
	buttonBar.setAttribute("style", "width: 100%");
	buttonBar.setAttribute("align", "center");
	filterBox.appendChild(buttonBar);
	
	// Apply Button
	var applyFilterButton = document.createElement("button");
	applyFilterButton.setAttribute("type", "button");
	applyFilterButton.setAttribute("class", "btn");
	applyFilterButton.setAttribute("value", "Apply");
	applyFilterButton.innerHTML = "Apply";
	applyFilterButton.setAttribute("id", "btnApply");
	applyFilterButton.addEventListener("click", applyFilters, false);
	buttonBar.appendChild(applyFilterButton);
	var spacer = document.createElement("span");
	spacer.innerHTML = "&nbsp;&nbsp;&nbsp;"
	buttonBar.appendChild(spacer);
	
	// Clear Button
	var clearFilterButton = document.createElement("button");
	clearFilterButton.setAttribute("type", "button");
	clearFilterButton.setAttribute("class", "btn");
	clearFilterButton.setAttribute("value", "Clear");
	clearFilterButton.innerHTML = "Clear";
	clearFilterButton.setAttribute("id", "btnClear");
	clearFilterButton.addEventListener("click", clearFilters, false);
	buttonBar.appendChild(clearFilterButton);
	
	timer = setTimeout("document.getElementById('btnApply').click();", 0);
}

function suppressKeyStroke(event) {
	event.stopPropagation();
}

var state = "closed";
function toggleFilterBox() {
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		// Need to take this approach as unsafeWindow is not available on Chrome
		// Reference: http://code.google.com/p/chromium/issues/detail?id=18857
		if (state == "closed") { 
			var filterMenu = document.getElementById("global-nav-filters");
			filterMenu.setAttribute("style", "background-color:#000000;opacity:.8");
			
			var filterBox = document.getElementById("divFilterBox");
			filterBox.style.left = getAbsPos("global-nav-filters", "left") + "px";
			filterBox.style.display = "block";
			
			state = "opened";
		} else if (state == "opened") {
			var filterMenu = document.getElementById("global-nav-filters");
			filterMenu.setAttribute("style", "background-color:'';opacity:0.8");
			
			var filterBox = document.getElementById("divFilterBox");
			filterBox.style.display = "none";
			state = "closed";
		}
		return ;
	}
	
	$ = unsafeWindow.$;
	if (state == "closed") {
		$('#global-nav-filters')
			.css("background-color", "#000000")
			.css("opacity", 0.8);
		$('#divFilterBox')
			.css('left', $('#global-nav-filters').offset().left)
			.css('top', $('#global-nav-filters').offset().top + $('#global-nav-filters').height() - 6)
			.slideDown(100);
		state = "opened";
	} else if (state == "opened") {
		$('#global-nav-filters')
			.css("background-color", "");
		$('#divFilterBox')
			.slideUp(100);
		state = "closed";
	}
}

function clearFilters () {
	var txtWords = document.getElementById('txtWords');
	var txtFrom = document.getElementById('txtFrom');
	var chkCase = document.getElementById('chkCase');
	var chkLink = document.getElementById('chkLink');
	
	txtWords.value = "";
	txtFrom.value = "";
	chkCase.checked = false;
	chkLink.checked = false;
	
	applyFilters();
};

 function applyFilters () {	
	var txtWords = document.getElementById('txtWords');
	var txtFrom = document.getElementById('txtFrom');
	var chkCase = document.getElementById('chkCase');
	var chkLink = document.getElementById('chkLink');
	
	var wordsStr = txtWords.value;
	var fromStr = txtFrom.value;
	var caseSensitive = chkCase.checked;
	var removeLinks = chkLink.checked;
	
	var statuses = document.evaluate(".//*[@class='stream-items']/div", document, null, XPathResult.ANY_TYPE, null); 

	// Cleaning the input
	wordsStr = wordsStr.trim();
	fromStr = fromStr.trim();
	
	// Saving the filter values
	try {
		GM_setValue(screenName + "WordsFilters", wordsStr);
		GM_setValue(screenName + "PeopleFilters", fromStr);
		GM_setValue(screenName + "CaseSensitive", caseSensitive);
		GM_setValue(screenName + "RemoveLinks", removeLinks);
	} catch(e) {}
	
	var matchedStatuses = [];
	var unmatchedStatuses = [];
	
	var status = statuses.iterateNext(); 
	while (status) {
		var contentDOM = getElementByClass("tweet-text", status);
		var content = (contentDOM.length > 0) ? contentDOM[0].textContent : "";
		var fromDOM = getElementByClass("tweet-screen-name", status);
		var from = (fromDOM.length > 0) ? fromDOM[0].textContent : "";
		
		if (content == null || content.length == 0)
			content = "";
		
		if (from == null || from.length == 0)
			from = "";
		
		if (!caseSensitive) {
			content = content.toLowerCase();
			from = from.toLowerCase();
		}
		
		var wordFilters = wordsStr.split(",");
			
		var found = false;
		// Filter out tweets with links
		if (removeLinks) {
			var lowerContent = content.toLowerCase();
			if (lowerContent.indexOf("http://") != -1 || lowerContent.indexOf("https://") != -1 || lowerContent.indexOf("www.") != -1)
				found = true;
		}
		
		// Words filter
		if (!found) {
			for (var i = 0; i < wordFilters.length; i++) {
				var filter = wordFilters[i].trim();
				if (filter == "")
					continue;
				
				if (!caseSensitive)
					filter = filter.toLowerCase();
				
				if (content.indexOf(filter) != -1) {
					found = true;
					break;
				} 
			}
		}
		
		// From filter
		if (!found) {
			var fromFilters = fromStr.split(",");
			for (i = 0; i < fromFilters.length; i++) {
				var filter = fromFilters[i].trim();
				if (filter == "")
					continue;
				
				if (!caseSensitive)
					filter = filter.toLowerCase();
				
				if (from.indexOf(filter) != -1) {
					found = true;
					break;
				}
			}
		}
		
		if (found) {
			matchedStatuses.push(status);
		} else {
			unmatchedStatuses.push(status);
		}
			
		status = statuses.iterateNext();
	}

	// Need to do this outside the iteration as the iterator will be invalidated if there are any updates to the DOM
	// Refer to https://developer.mozilla.org/en/DOM/document.evaluate
	for (i = 0; i < matchedStatuses.length; i++) {
		matchedStatuses[i].style.display = 'none';
	}
	
	for (i = 0; i < unmatchedStatuses.length; i++) {
		unmatchedStatuses[i].style.display = 'block';
	}
	
	var linkFilters = document.getElementById("global-nav-filters-link");
	if (matchedStatuses.length > 0) {
		linkFilters.innerHTML = "Filters (" + matchedStatuses.length + ")";
	} else {
		linkFilters.innerHTML = "Filters";
	}
	
	if (timer != null)
		clearTimeout(timer);
	timer = setTimeout("document.getElementById('btnApply').click();", 1000 * 15);
};
//========================================================