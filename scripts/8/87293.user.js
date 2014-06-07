// ==UserScript==
// @name           Filter FB updates
// @namespace      http://varunkumar.me
// @description    Script for filtering Facebook updates about a specific topic.
// @include        http://*facebook.com*
// @include        https://*facebook.com/*
// @version        1.5
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
	if (document.getElementById("navAccount") == null) {
		// user has not signed in do nothing
		return ; 
	}
	
	screenName = document.querySelector("a.headerTinymanName").textContent;
	screenName = screenName.trim();
	
	// Adding the Filters menu
	var menu = document.getElementById("navAccount").parentNode;
	
	var list = document.createElement("li");
	list.setAttribute("id", "global-nav-filters");
    list.setAttribute("class", "topNavLink middleLink");
	
	var anchor = document.createElement("a");
	anchor.setAttribute("id", "global-nav-filters-link");
    anchor.setAttribute("class", "topNavLink");
	anchor.addEventListener("click", toggleFilterBox, false);
	anchor.innerHTML = "Filters";
	list.appendChild(anchor);
	
	menu.insertBefore(list, document.getElementById("navAccount"));
	
	// Preparing the filter box
	var filterBox = document.createElement('div');
	filterBox.id = 'divFilterBox';
	document.body.appendChild(filterBox);
	filterBox.setAttribute("style","-moz-border-radius-bottomleft: 5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-bottomright: 5px;-webkit-border-bottom-right-radius: 5px;background-color:#FFFFFF;border:1px solid #BABABA;color:#3A579A;display:none;font-size:12px;margin-right:0;margin-top:6px;padding:12px;position:absolute;right:0;text-align:left;top:34px;left:100px;width:240px;z-index:1001;opacity:1");
	filterBox.innerHTML = "<b>Use this form to filter out Updates</b>";
	
	// Close Button
	var closeButton  = document.createElement("span");
	closeButton.setAttribute("style", "cursor:pointer;");
	closeButton.addEventListener("click", hideFilterBox, false);
	closeButton.innerHTML = "<b>&nbsp;&nbsp;x&nbsp;</b>";
	filterBox.appendChild(closeButton);
	filterBox.appendChild(document.createElement("br"));
	filterBox.appendChild(document.createElement("br"));
	
	// Words Filter
	var wordsSpan = document.createElement("span");
	wordsSpan.innerHTML="Containing Words";
	filterBox.appendChild(wordsSpan);
	filterBox.appendChild(document.createElement("br"));
	var wordsFilterBox = document.createElement("input");
	wordsFilterBox.setAttribute("type", "text")
	wordsFilterBox.setAttribute("title", 'Filter out updates containing words.Use comma as a separator.');
	wordsFilterBox.addEventListener("keypress", suppressKeyStroke, true);
	wordsFilterBox.addEventListener("keydown", suppressKeyStroke, true);
	wordsFilterBox.setAttribute("id","txtWords");
	wordsFilterBox.setAttribute("value", GM_getValue(screenName + "WordsFilters", ""));
	wordsFilterBox.setAttribute("class", "inputtext");
	wordsFilterBox.setAttribute("style", "width:100%");
    wordsFilterBox.addEventListener("change", applyFilters, false);
	filterBox.appendChild(wordsFilterBox);
	filterBox.appendChild(document.createElement("br"));
	filterBox.appendChild(document.createElement("br"));

	// Case Sensitive Checkbox
	var caseCheckBox = document.createElement("input");
	caseCheckBox.setAttribute("type", "checkbox");
	caseCheckBox.setAttribute("title", "Case Sensitive");
	caseCheckBox.setAttribute("id", "chkCase");
	if (GM_getValue(screenName + "CaseSensitive", false))
		caseCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(caseCheckBox);
    caseCheckBox.addEventListener("change", applyFilters, false);
	var caseLabel = document.createElement("span");
	caseLabel.innerHTML = "&nbsp;Case Sensitive&nbsp;&nbsp;"
	filterBox.appendChild(caseLabel);
	filterBox.appendChild(document.createElement("br"));
	
	// Remove Likes Checkbox
	var likesCheckBox = document.createElement("input");
	likesCheckBox.setAttribute("type", "checkbox");
	likesCheckBox.setAttribute("title", "I don't care about what my friends like / recommend");
	likesCheckBox.setAttribute("id", "chkLikes");
	if (GM_getValue(screenName + "RemoveLikes", false))
		likesCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(likesCheckBox);
    likesCheckBox.addEventListener("change", applyFilters, false);
	var likesLabel = document.createElement("span");
	likesLabel.innerHTML = "&nbsp;Hide the 'Likes' from friends&nbsp;&nbsp;"
	likesLabel.setAttribute("title", "I don't care about what my friends like / recommend");
	filterBox.appendChild(likesLabel);
	filterBox.appendChild(document.createElement("br"));
	
	// Remove Connection Checkbox
	var conCheckBox = document.createElement("input");
	conCheckBox.setAttribute("type", "checkbox");
	conCheckBox.setAttribute("title", "I don't really care about who has be-friended whom");
	conCheckBox.setAttribute("id", "chkConnection");
	if (GM_getValue(screenName + "RemoveConnection", false))
		conCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(conCheckBox);
    conCheckBox.addEventListener("change", applyFilters, false);
	var connectionLabel = document.createElement("span");
	connectionLabel.innerHTML = "&nbsp;Hide the friend connection updates&nbsp;&nbsp;"
	connectionLabel.setAttribute("title", "I don't really care about who has be-friended whom");
	filterBox.appendChild(connectionLabel);
	filterBox.appendChild(document.createElement("br"));
	
	// Remove Attachments Checkbox
	var attachmentsCheckBox = document.createElement("input");
	attachmentsCheckBox.setAttribute("type", "checkbox");
	attachmentsCheckBox.setAttribute("title", "Attachments include shared videos, photos, links, etc");
	attachmentsCheckBox.setAttribute("id", "chkAttachments");
	if (GM_getValue(screenName + "RemoveAttachments", false))
		attachmentsCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(attachmentsCheckBox);
    attachmentsCheckBox.addEventListener("change", applyFilters, false);
	var attachmentsLabel = document.createElement("span");
	attachmentsLabel.setAttribute("title", "Attachments include shared videos, photos, links, etc");
	attachmentsLabel.innerHTML = "&nbsp;Hide the attachments&nbsp;&nbsp;"
	filterBox.appendChild(attachmentsLabel);
	filterBox.appendChild(document.createElement("br"));
    
    // Remove Check-in Checkbox
	var placesCheckBox = document.createElement("input");
	placesCheckBox.setAttribute("type", "checkbox");
	placesCheckBox.setAttribute("title", "I don't care about where my friends check-in");
	placesCheckBox.setAttribute("id", "chkPlaces");
	if (GM_getValue(screenName + "RemovePlaces", false))
		placesCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(placesCheckBox);
    placesCheckBox.addEventListener("change", applyFilters, false);
	var placesLabel = document.createElement("span");
	placesLabel.setAttribute("title", "I don't care about where my friends check-in");
	placesLabel.innerHTML = "&nbsp;Hide Facebook Places&nbsp;&nbsp;"
	filterBox.appendChild(placesLabel);
	filterBox.appendChild(document.createElement("br"));
    
    // Remove Answers Checkbox
	var answersCheckBox = document.createElement("input");
	answersCheckBox.setAttribute("type", "checkbox");
	answersCheckBox.setAttribute("title", "Hide Facebook Questions");
	answersCheckBox.setAttribute("id", "chkAnswers");
	if (GM_getValue(screenName + "RemoveAnswers", false))
		answersCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(answersCheckBox);
    answersCheckBox.addEventListener("change", applyFilters, false);
	var answersLabel = document.createElement("span");
	answersLabel.setAttribute("title", "Hide Facebook Questions");
	answersLabel.innerHTML = "&nbsp;Hide Facebook Questions&nbsp;&nbsp;"
	filterBox.appendChild(answersLabel);
	filterBox.appendChild(document.createElement("br"));
    filterBox.appendChild(document.createElement("br"));
    
    // Remove Tickers section
	var tickersCheckBox = document.createElement("input");
	tickersCheckBox.setAttribute("type", "checkbox");
	tickersCheckBox.setAttribute("title", "Hide Facebook Tickers Section");
	tickersCheckBox.setAttribute("id", "chkTickers");
	if (GM_getValue(screenName + "RemoveTickers", false))
		tickersCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(tickersCheckBox);
    tickersCheckBox.addEventListener("change", applyFilters, false);
	var tickersLabel = document.createElement("span");
	tickersLabel.setAttribute("title", "Hide Facebook Tickers Section");
	tickersLabel.innerHTML = "&nbsp;Hide Facebook Tickers Section&nbsp;&nbsp;"
	filterBox.appendChild(tickersLabel);
	filterBox.appendChild(document.createElement("br"));
	
    // Remove Unread Count
    var unreadCheckBox = document.createElement("input");
    unreadCheckBox.setAttribute("type", "checkbox");
	unreadCheckBox.setAttribute("title", "Hide Unread count of Groups / Lists");
	unreadCheckBox.setAttribute("id", "chkUnread");
	if (GM_getValue(screenName + "RemoveUnread", false))
		unreadCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(unreadCheckBox);
    unreadCheckBox.addEventListener("change", applyFilters, false);
	var unreadLabel = document.createElement("span");
	unreadLabel.setAttribute("title", "Hide Unread count of Groups / Lists");
	unreadLabel.innerHTML = "&nbsp;Hide Unread count of Groups / Lists&nbsp;&nbsp;"
	filterBox.appendChild(unreadLabel);
	filterBox.appendChild(document.createElement("br"));
    filterBox.appendChild(document.createElement("br"));

    // Show Filtered
	var showFilteredCheckBox = document.createElement("input");
	showFilteredCheckBox.setAttribute("type", "checkbox");
	showFilteredCheckBox.setAttribute("title", "Show filtered only");
	showFilteredCheckBox.setAttribute("id", "chkShowFiltered");
	if (GM_getValue(screenName + "ShowFiltered", false))
		showFilteredCheckBox.setAttribute("checked", "true");
	filterBox.appendChild(showFilteredCheckBox);
	var showFilteredLabel = document.createElement("span");
	showFilteredLabel.setAttribute("title", "Show Filtered Posts");
	showFilteredLabel.innerHTML = "&nbsp;Show Filtered Posts only&nbsp;&nbsp;"
	showFilteredCheckBox.addEventListener("change", applyFilters, false);
	filterBox.appendChild(showFilteredLabel);
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
	applyFilterButton.setAttribute("class", "uiButton");
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
	clearFilterButton.setAttribute("class", "uiButton");
	clearFilterButton.setAttribute("value", "Clear");
	clearFilterButton.innerHTML = "Clear";
	clearFilterButton.setAttribute("id", "btnClear");
	clearFilterButton.addEventListener("click", clearFilters, false);
	buttonBar.appendChild(clearFilterButton);

}

function suppressKeyStroke(event) {
	event.stopPropagation();
}

var state = "closed";
function toggleFilterBox() {
	if (state == "closed") {
        showFilterBox();
    } else if (state == "opened") {
        hideFilterBox();
	}
	return ;
}

function showFilterBox() {
    var filterMenu = document.getElementById("global-nav-filters");
    filterMenu.setAttribute("style", "background-color:#FFFFFF;");
	
    var filterMenuLink = document.getElementById("global-nav-filters-link");
	filterMenuLink.setAttribute("style", "color:#333333;position:relative");
		
	var filterBox = document.getElementById("divFilterBox");
	filterBox.style.left = (getAbsPos("global-nav-filters", "left") + parseInt(filterMenu.offsetWidth) - parseInt(filterBox.style.width) - 25) + "px";
	filterBox.style.display = "block";
		
	state = "opened";
    
    if (timer != null)
        clearInterval(timer);
}

function hideFilterBox() {
    var filterMenu = document.getElementById("global-nav-filters");
	filterMenu.setAttribute("style", "background-color:''");

	var filterMenuLink = document.getElementById("global-nav-filters-link");
	filterMenuLink.setAttribute("style", "color:'';position:relative");
	
	var filterBox = document.getElementById("divFilterBox");
	filterBox.style.display = "none";
	
    state = "closed";

    timer = setInterval("document.getElementById('btnApply').click();", 1000 * 15);
}

function clearFilters () {
	var txtWords = document.getElementById('txtWords');
	var chkCase = document.getElementById('chkCase');
    var chkLikes = document.getElementById('chkLikes');
	var chkConnection = document.getElementById('chkConnection');
	var chkAttachments = document.getElementById('chkAttachments');
    var chkPlaces = document.getElementById('chkPlaces');
    var chkAnswers = document.getElementById('chkAnswers');
    var chkTickers = document.getElementById('chkTickers');
    var chkUnread = document.getElementById('chkUnread');
    var chkShowFiltered = document.getElementById('chkShowFiltered');
	
	txtWords.value = "";
	chkCase.checked = false;
	chkLikes.checked = false;
	chkConnection.checked = false;
	chkAttachments.checked = false;
    chkPlaces.checked = false;
    chkAnswers.checked = false;
    chkTickers.checked = false;
    chkUnread.checked = false;
    chkShowFiltered.checked = false;
	
	applyFilters(null);

    hideFilterBox();
};

function applyFilters (evnt) {	
	var txtWords = document.getElementById('txtWords');
	var chkCase = document.getElementById('chkCase');
	var chkLikes = document.getElementById('chkLikes');
	var chkConnection = document.getElementById('chkConnection');
	var chkAttachments = document.getElementById('chkAttachments');
    var chkPlaces = document.getElementById('chkPlaces');
    var chkAnswers = document.getElementById('chkAnswers'); 
    var chkTickers = document.getElementById('chkTickers');
    var chkUnread = document.getElementById('chkUnread');
    var chkShowFiltered = document.getElementById('chkShowFiltered');
	
	var wordsStr = txtWords.value;
	var caseSensitive = chkCase.checked;
	var removeLikes = chkLikes.checked;
	var removeConnection = chkConnection.checked;
	var removeAttachments = chkAttachments.checked;
    var removePlaces = chkPlaces.checked;
    var removeAnswers = chkAnswers.checked;
    var removeTickers = chkTickers.checked;
    var removeUnread = chkUnread.checked;
    var showFiltered = chkShowFiltered.checked;

    var i = 0;
    
    // Saving the filter values
	try {
		GM_setValue(screenName + "WordsFilters", wordsStr);
		GM_setValue(screenName + "CaseSensitive", caseSensitive);
		GM_setValue(screenName + "RemoveLikes", removeLikes);
		GM_setValue(screenName + "RemoveConnection", removeConnection);
		GM_setValue(screenName + "RemoveAttachments", removeAttachments);
        GM_setValue(screenName + "RemovePlaces", removePlaces);
        GM_setValue(screenName + "RemoveAnswers", removeAnswers);
        GM_setValue(screenName + "RemoveTickers", removeTickers);
        GM_setValue(screenName + "RemoveUnread", removeUnread);
        GM_setValue(screenName + "ShowFiltered", showFiltered);
	} catch(e) {}

    // Removing the Tickers Section
    var divTickers = document.getElementById('pagelet_rhc_ticker');
    if (divTickers != null) {
        if (removeTickers)
            divTickers.style.display = "none";
        else
            divTickers.style.display = "block";
    }
    
    divTickers = document.getElementById('pagelet_ticker');
    if (divTickers != null) {
        if (removeTickers)
            divTickers.style.display = "none";
        else
            divTickers.style.display = "block";
    }


    // Removing the Unread count of Groups / Lists
    if (removeUnread) {
        var ctSpans = document.querySelectorAll("span.uiSideNavCount");
        
        if (ctSpans != null) {
            for (i = 0; i < ctSpans.length; i++) {
                ctSpans[i].style.display = "none";
            }
        }
    } else {
        var ctSpans = document.querySelectorAll("span.uiSideNavCount");

        if (ctSpans != null) {
            for (i = 0; i < ctSpans.length; i++) {
                ctSpans[i].style.display = "block";
            }
        }
    }
	
	// Cleaning the input
	wordsStr = wordsStr.trim();

	var statuses = document.evaluate(".//*[@id='home_stream']/li", document, null, XPathResult.ANY_TYPE, null); 
	
    var matchedStatuses = [];
	var unmatchedStatuses = []; 
	
	var status = statuses.iterateNext(); 
	
	// Check if the user is in profile page
	if (status == null) {
		statuses = document.evaluate(".//*[@id='profile_minifeed']/li", document, null, XPathResult.ANY_TYPE, null); 
		status = statuses.iterateNext(); 
	}

    // Check if the user is in groups page
    if (status == null) {
        statuses = document.evaluate(".//*[@id='pagelet_group_mall']/ul/li", document, null, XPathResult.ANY_TYPE, null);
        status = statuses.iterateNext();
    }


	while (status) {
		var content = status.textContent;
		
		// Filtering the likes and friend connection
		var passiveContents = getElementByClass("uiStreamPassive", status);
		var passiveContent = (passiveContents.length > 0) ? passiveContents[0].textContent : "";
		passiveContent = passiveContent.toLowerCase();
		
		// Getting the attachment title
		var attachments = getElementByClass("uiAttachmentTitle", status);
		
		// Cleaning up the contents
		if (content == null || content.length == 0)
			content = "";
		
		if (!caseSensitive) {
			content = content.toLowerCase();
		}
		
		var found = false;
		
		// Like filtering
		if (removeLikes && (passiveContent.indexOf(" likes ") != -1 || passiveContent.indexOf(" recommends ") != -1 || passiveContent.indexOf(" like ") != -1 || passiveContent.indexOf(" recommend ") != -1))
			found = true;
			
		// Friend Connection filtering
		if (!found && removeConnection && (passiveContent.indexOf(" now friends with ") != -1 || passiveContent.indexOf(" now friends.") != -1))
			found = true;
		
		// Filtering attachments. Shared Links, Videos, Photos, etc.
		if (!found && removeAttachments) {
			if (attachments.length > 0)
				found = true;
			else {
				// Check for attachments without title on the stream
				attachments = getElementByClass("uiStreamAttachments", status);
				if (attachments.length > 0)
					found = true;
				else {
					// Check for attachments title on profile page
					attachments = getElementByClass("UIStoryAttachment_Title", status);
					if (attachments.length > 0)
						found = true;
					else {
						attachments = getElementByClass("UIStoryAttachment", status);
						if (attachments.length > 0)
							found = true;
					}
				}
			}
		}
        
        // Filtering Facebook Places
		if (!found && removePlaces && (passiveContent.indexOf(" at ") != -1 || passiveContent.indexOf(" is at ") != -1 || passiveContent.indexOf(" was at ") != -1 || passiveContent.indexOf(" are at ") != -1 || passiveContent.indexOf(" were at ") != -1 ))
			found = true;
        
        // Filtering Facebook Questions
		if (!found && removeAnswers && (passiveContent.indexOf(" answered ") != -1 || passiveContent.indexOf(" asked ") != -1 || passiveContent.indexOf(" replied to ") != -1))
			found = true;
            
		// Keywords filtering
		if (!found) {
			var wordFilters = wordsStr.split(",");
			for (i = 0; i < wordFilters.length; i++) {
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
        if (showFiltered)
		    matchedStatuses[i].style.display = 'block';
        else
            matchedStatuses[i].style.display = 'none';
	}
	
	for (i = 0; i < unmatchedStatuses.length; i++) {
        if (showFiltered)
		    unmatchedStatuses[i].style.display = 'none';
        else
            unmatchedStatuses[i].style.display = 'block';
	}

    var filteredCount = 0;
    if (showFiltered)
        filteredCount = unmatchedStatuses.length;
    else
        filteredCount = matchedStatuses.length;
	
	var linkFilters = document.getElementById("global-nav-filters-link");
	if (filteredCount > 0) {
		linkFilters.innerHTML = "Filters <span class='jewelCount' style='background-color: #F03D25;border: 0px;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px; top: 0px; right: 0px; position: absolute; display: block;padding: 1px 2px 0px 1px;line-height: 14px;'><span>" + filteredCount + "</span></span>";
	} else {
		linkFilters.innerHTML = "Filters";
	}

    if (evnt != null && evnt.type == "click")
        hideFilterBox();        
};
//========================================================
