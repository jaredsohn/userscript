// ==UserScript==
// @name          Flickr - Background color
// @description	  Changes background color on mouse hover
// @author	  Rafal Smyka
// @namespace     http://smyka.net/flickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version       4.0 2010-09-26
// ==/UserScript==

/*
 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr - Background color" and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------
 Just install the script with Greasemonkey.
 Then the photo page will display a rectangle area with white-to-black gradient
 left to the photo. Moving mouse over it will set the background color.
 Additionally, if the photopage is tagged with setbackground=#00ff00, where
 #00ff00 is HTML color format (two chars for red, two for green, two for blue),
 there will be another rectangle displayed with the color suggested by the page
 author (again moving mouse over it will change the color).

 Changelog:
 ----------
 v1.0	2006-12-31	Initial Release
 v2.0	2007-01-02	Gradient box was extended a bit on white and black end
 						so that the white and black color selection
 						is easier now (mouse doesn't escape box boundaries so easily)
 					Another box was added that allows selecting background color
 						suggested by page author with a tag.
 						The tag format is setbgcolor=#00ff00, where
 						#00ff00 is HTML color format
						(two chars for red, two for green, two for blue).
 v3.0	2007-01-07	Color selectors and cursor get hiden after 0.5 sec of mouse
 						inactivity. They are redisplayed when user moves the mouse again.
 					Script is applied on all sizes page too now.
 v3.1	2007-01-07	Bugfix: moving mouse out at just in the moment the selectors were
 						being hidden didn't cause unhiding them.
v.4.0	2010-09-26	Adjusted to the new flickr photo page layout
*/

var COLOR_SELECTOR_HEIGHT = 240;
var COLOR_SELECTOR_WIDTH = 20;
var COLOR_SELECTOR_TOP = 54;
var COLOR_SELECTOR_LEFT = 647;
var COLOR_SELECTOR_BW_MARGIN_HEIGHT = 20;
var COLOR_SELECTOR_TAG_MARGIN = 20;
var COLOR_SELECTOR_DISAPPEAR_TIMEOUT = 500; // 0.5 sec
var COLOR_SELECTOR_DISAPPEAR_TIMER_FREQUENCY = 100; // 0.1 sec

var lastMouseMove = 0;
var stopTicking = false;
var tickerRunning = false;
var allSizesPage = false;

var colorSelectorElement;
var byTagSelectorElement;

function setBgColor(color) {
	document.body.style.background = color;
}

function resetBgColor() {
	document.body.style.background = "";
}

function hideAllButPicture() {
	var buttonBar = document.getElementById("nav");
	if (buttonBar) {
		buttonBar.style.visibility = "hidden";
		document.getElementById("head").style.visibility = "hidden";
		document.getElementById("sidebar").style.visibility = "hidden";
		document.getElementById("meta").style.visibility = "hidden";
		document.getElementById("invites").style.visibility = "hidden";
		document.getElementById("comments").style.visibility = "hidden";
		document.getElementById("shortcuts").style.visibility = "hidden";
		document.getElementById("foot").style.visibility = "hidden";
	} else if (allSizesPage) {
		//GM_log("Hiding all sizes page elements");
		document.getElementById("head").style.visibility = "hidden";
		document.getElementById("faq-link").style.visibility = "hidden";
		document.getElementById("foot").style.visibility = "hidden";
		
		var hideUsPaths = [
			'//div[@id="main"]/h1',
			'//div[@id="main"]/table'
		];
		for (i = 0; i < hideUsPaths.length; i++) {
			var elementToHide = document.evaluate(hideUsPaths[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            if (elementToHide) {
				elementToHide.style.visibility = "hidden";
			}
		}
	}
}

function unhideAllButPicture() {
	var buttonBar = document.getElementById("nav");
	if (buttonBar) {
		buttonBar.style.visibility = "";
		document.getElementById("head").style.visibility = "";
		document.getElementById("sidebar").style.visibility = "";
		document.getElementById("meta").style.visibility = "";
		document.getElementById("invites").style.visibility = "";
		document.getElementById("comments").style.visibility = "";
		document.getElementById("shortcuts").style.visibility = "";
		document.getElementById("foot").style.visibility = "";
	} else if (allSizesPage) {
		//GM_log("Hiding all sizes page elements");
		document.getElementById("head").style.visibility = "";
		document.getElementById("faq-link").style.visibility = "";
		document.getElementById("foot").style.visibility = "";
		
		var showUsPaths = [
			'//div[@id="main"]/h1',
			'//div[@id="main"]/table'
		];
		for (i = 0; i < showUsPaths.length; i++) {
			var elementToShow = document.evaluate(showUsPaths[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            if (elementToShow) {
				elementToShow.style.visibility = "";
			}
		}
	}
}

function hideColorSelectors() {
	//GM_log("Hiding color selectors");
	// Has to enter this flag, otherwise displaying hider calls event that resets bg colors.
	// Unrigistering event handler would be cleaner, but this was simpler.
	// The flag will be reset in the event handler, this way the handler will pass
	// only one (next) event.
	document.getElementById("backgroundChooser").style.visibility = "hidden";
	var byTag = document.getElementById("backgroundChooserByTag");
	if (byTag) {
		byTag.style.visibility = "hidden";
	}
	document.getElementById("backgroundChooserHider").style.visibility = "";
	//GM_log("Hiding finished");
}

function unhideColorSelectors() {
	//GM_log("Unhiding color selectors");
	document.getElementById("backgroundChooser").style.visibility = "";
	var byTag = document.getElementById("backgroundChooserByTag");
	if (byTag) {
		byTag.style.visibility = "";
	}
	document.getElementById("backgroundChooserHider").style.visibility = "hidden";
	//GM_log("Unhiding finished");
}

function tick() {
	//GM_log("Tick");
	if (! stopTicking) {
		var mouseInactivity = new Date().valueOf() - lastMouseMove;
		//GM_log("Mouse inactivity: " + mouseInactivity);
		if (mouseInactivity >= COLOR_SELECTOR_DISAPPEAR_TIMEOUT) {
			hideColorSelectors();
			stopTicking = true;
		}
		setTimeout(tick, COLOR_SELECTOR_DISAPPEAR_TIMER_FREQUENCY);
	} else {
		tickerRunning = false;
	}
}

function startTicker() {
	if (!tickerRunning) {
		tickerRunning = true;
		setTimeout(tick, COLOR_SELECTOR_DISAPPEAR_TIMER_FREQUENCY);
	}
}

function handleGradientMouseMove(e) {
	var mouseY = e.pageY - determineElementTopInPage(colorSelectorElement) - COLOR_SELECTOR_BW_MARGIN_HEIGHT;
	if (mouseY > COLOR_SELECTOR_HEIGHT - 2 * COLOR_SELECTOR_BW_MARGIN_HEIGHT) {
		mouseY = COLOR_SELECTOR_HEIGHT - 2 * COLOR_SELECTOR_BW_MARGIN_HEIGHT;
	}
	var calculatedColor = 255 - Math.round(255 * mouseY / (COLOR_SELECTOR_HEIGHT  - 2 * COLOR_SELECTOR_BW_MARGIN_HEIGHT));

	//GM_log("PageY: " + e.pageY + ", MouseY: " + mouseY + ", color: " + calculatedColor);

	setBgColor("rgb(" + calculatedColor + ", " + calculatedColor + ", " + calculatedColor + ")");
	hideAllButPicture();
	lastMouseMove = new Date().valueOf();
	stopTicking = false;
	startTicker();
}

function handleColorSelectorDivMouseMove(e) {
	//GM_log("Mouse out");
	var color = e.target.style.backgroundColor;
	//GM_log(color);
	setBgColor(color);
	hideAllButPicture();
	lastMouseMove = new Date().valueOf();
	stopTicking = false;
	startTicker();
}

function handleColorSelectorMouseOut(e) {
	if (!isMouseInsideElement(e)) {
		// handle only if mouse really moved out
		// the event is called also when the element is hidden, but then we don't want it to be processed
		resetBgColor();
		unhideAllButPicture();
		stopTicking = true;
	}
}

function handleColorSelectorHiderMouseMove(e) {
	unhideColorSelectors();
	lastMouseMove = new Date().valueOf();
	stopTicking = false;
	startTicker();
}

function handleColorSelectorHiderMouseOut(e) {
	//GM_log("Hider mouse out");
	if (!isMouseInsideElement(e)) {
		stopTicking = true;
		unhideColorSelectors();
		resetBgColor();
		unhideAllButPicture();
	}
}

function isMouseInsideElement(e) {
	var mouseX = e.pageX;
	var mouseY = e.pageY;

	//GM_log("Mouse X: " + mouseX + " mouse Y: " + mouseY);
	
	var colorSelectorLeft = determineElementLeftInPage(colorSelectorElement);
	var colorSelectorTop = determineElementTopInPage(colorSelectorElement);

	if (
		mouseX > colorSelectorLeft
		&& mouseY > colorSelectorTop
		&& mouseX <= colorSelectorLeft + COLOR_SELECTOR_WIDTH
		&& mouseY <= colorSelectorTop + COLOR_SELECTOR_HEIGHT
	) {
		return true;
	}

	var byTag = document.getElementById("backgroundChooserByTag");
	if (byTag) {
		var byTagSelectorTop = determineElementTopInPage(byTagSelectorElement);
	
		if (
			mouseX >= colorSelectorLeft
			&& mouseY >= byTagSelectorTop
			&& mouseX <= colorSelectorLeft + COLOR_SELECTOR_WIDTH
			&& mouseY <= byTagSelectorTop + COLOR_SELECTOR_WIDTH
		) {
			return true;
		}
	}
    return false;
}

function determineElementLeftInPage(e) {
	var left = 0;
	
	while (e != null) {
		left += e.offsetLeft;
		e = e.offsetParent;
	}
	
	return left;
}

function determineElementTopInPage(e) {
	var top = 0;
	
	while (e != null) {
		top += e.offsetTop;
		e = e.offsetParent;
	}
	
	return top;
}

function createGradientElement() {
	var gradientElement = document.createElement("div");
	gradientElement.style.position = "absolute";
    gradientElement.style.top = COLOR_SELECTOR_TOP + "px";
	gradientElement.style.left = COLOR_SELECTOR_LEFT + "px";
	gradientElement.style.height = COLOR_SELECTOR_HEIGHT + "px";
	gradientElement.style.width = COLOR_SELECTOR_WIDTH + "px";
	gradientElement.style.border = "1px solid #888";
    gradientElement.id = "backgroundChooser";

	var whiteMarginElement = document.createElement("div");
	whiteMarginElement.style.height = COLOR_SELECTOR_BW_MARGIN_HEIGHT + "px";
	whiteMarginElement.style.width = COLOR_SELECTOR_WIDTH + "px";
	whiteMarginElement.style.backgroundColor = "white";
	whiteMarginElement.id = "backgroundChooserWhite";
	whiteMarginElement.style.position = "absolute";
	whiteMarginElement.style.top = "0";
	whiteMarginElement.style.left = "0";
	whiteMarginElement.addEventListener("mousemove", handleColorSelectorDivMouseMove, false);
	whiteMarginElement.addEventListener("mouseout", handleColorSelectorMouseOut, false);

	var blackMarginElement = document.createElement("div");
	blackMarginElement.style.height = COLOR_SELECTOR_BW_MARGIN_HEIGHT + "px";
	blackMarginElement.style.width = COLOR_SELECTOR_WIDTH + "px";
	blackMarginElement.style.backgroundColor = "black";
	blackMarginElement.id = "backgroundChooserBlack";
	blackMarginElement.style.position = "absolute";
	blackMarginElement.style.top = COLOR_SELECTOR_HEIGHT - COLOR_SELECTOR_BW_MARGIN_HEIGHT + "px";
	blackMarginElement.style.left = "0";
	blackMarginElement.addEventListener("mousemove", handleColorSelectorDivMouseMove, false);
	blackMarginElement.addEventListener("mouseout", handleColorSelectorMouseOut, false);

	var gradientImgElement = document.createElement("img");
	gradientImgElement.style.height = COLOR_SELECTOR_HEIGHT - 2 * COLOR_SELECTOR_BW_MARGIN_HEIGHT + "px";
	gradientImgElement.style.width = COLOR_SELECTOR_WIDTH + "px";
	gradientImgElement.style.border = "none";
	gradientImgElement.style.position = "absolute";
	gradientImgElement.style.top = COLOR_SELECTOR_BW_MARGIN_HEIGHT + "px";
	gradientImgElement.style.left = "0";
	gradientImgElement.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEACAAAAAEgUnPSAAAAB3RJTUUH1gwfFwwtNTpZ1gAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAAzSURBVHjaY/jP9INcyMzCzMDwm2zdbMxMzP8Y/jL9GRjIzMzMyMDI8I9phEJmRmDsMQAApnT0U8bNU1EAAAAASUVORK5CYII=";
	gradientImgElement.id = "backgroundChooserGradient";
	gradientImgElement.addEventListener("mousemove", handleGradientMouseMove, false);
	gradientImgElement.addEventListener("mouseout", handleColorSelectorMouseOut, false);

    gradientElement.appendChild(whiteMarginElement);
	gradientElement.appendChild(gradientImgElement);
	gradientElement.appendChild(blackMarginElement);
	return gradientElement;
}

function createTagColorSelector(color) {
	var selectorElement = document.createElement("div");
	selectorElement.style.position = "absolute";
    selectorElement.style.top = COLOR_SELECTOR_TOP + COLOR_SELECTOR_HEIGHT + COLOR_SELECTOR_TAG_MARGIN + "px";
	selectorElement.style.left = COLOR_SELECTOR_LEFT + "px";
	selectorElement.style.height = COLOR_SELECTOR_WIDTH + "px";
	selectorElement.style.width = COLOR_SELECTOR_WIDTH + "px";
	selectorElement.style.border = "1px solid #888";
    selectorElement.style.backgroundColor = color;
    selectorElement.id = "backgroundChooserByTag";
	selectorElement.addEventListener("mousemove", handleColorSelectorDivMouseMove, false);
	selectorElement.addEventListener("mouseout", handleColorSelectorMouseOut, false);
    return selectorElement;
}

function createColorSelectorHider() {
	// we need this element to receive mouse events when the color selector is hiddens
	var hiderElement = document.createElement("div");
	hiderElement.style.position = "absolute";
	hiderElement.style.top = COLOR_SELECTOR_TOP + "px";
	hiderElement.style.left = COLOR_SELECTOR_LEFT + "px";
	// +2 below to cover border of underlying element
	hiderElement.style.height = COLOR_SELECTOR_HEIGHT + COLOR_SELECTOR_TAG_MARGIN + COLOR_SELECTOR_WIDTH + 2 + "px";
	hiderElement.style.width = COLOR_SELECTOR_WIDTH + 2 + "px";
	//hiderElement.style.background = "red";
	hiderElement.style.cursor = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAHCGzyUAAAAB3RJTUUH1wEHECkPq4e2NAAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAAALSURBVHjaY/jPAAACAQEAoR5cdQAAAABJRU5ErkJggg==), crosshair";
	//hiderElement.style.display = "none";
	hiderElement.style.visibility = "hidden";
    hiderElement.id = "backgroundChooserHider";
    hiderElement.addEventListener("mousemove", handleColorSelectorHiderMouseMove, false);
	hiderElement.addEventListener("mouseout", handleColorSelectorHiderMouseOut, false);
    return hiderElement;
}

function determineBackgroundTagColor() {
	var tagsParent = document.getElementById("thetags-wrapper");
	var tagList = document.evaluate("ul/li/span/a", tagsParent, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < tagList.snapshotLength; i++) {
		var tagText = tagList.snapshotItem(i).text;
		//GM_log("Tag text: " + tagText);
		if (tagText.substring(0, 10).toLowerCase() == "setbgcolor") {
			var color = tagText.substring(11);
			return color;
		}
	}
}

function fetchColorTag() {
	//GM_log("Page URI: " + document.location.href);
	var photoId = /\/\/.*?\/.*?\/.*?\/(.*?)\//.exec(document.location.href)[1];
	//GM_log("Photo id: " + photoId);
	if (photoId) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.flickr.com/services/rest?method=flickr.tags.getListPhoto&api_key=e852bc07c41c83fcfbc58dcf53400ad1&photo_id=" + photoId,
			onload: handleTagResponse
		});
	}
}

function handleTagResponse(responseDetails) {
	//GM_log("Response received");
	if (responseDetails.status = 200) {
		var flickrResponse = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
		var flickrStatus = flickrResponse.evaluate("//rsp/attribute::stat", flickrResponse, null, XPathResult.STRING_TYPE, null).stringValue;
		//GM_log("Flickr status: '" + flickrStatus + "'");
		if (flickrStatus = "ok") {
			var tags = flickrResponse.evaluate("//rsp/photo/tags/tag/attribute::raw", flickrResponse, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < tags.snapshotLength; i++) {
				var tagText = tags.snapshotItem(i).textContent;
				//GM_log("Tag text: " + tagText);
				if (tagText.substring(0, 10).toLowerCase() == "setbgcolor") {
					var color = tagText.substring(11);
					if (color) {
                    	byTagSelectorElement = createTagColorSelector(color);
						document.getElementById("main").appendChild(byTagSelectorElement);
     				}
     				return;
				}
			}
		}
	}
}

function displayColorSelector() {
	//GM_log("Script running");
	
	if (document.getElementById("button-bar")) {
		//GM_log("Creating elements");
		
		if (document.width - document.getElementById("main").offsetWidth > COLOR_SELECTOR_WIDTH * 2 + 20) {
			// window is wide enough, put color picker left to the photo
			COLOR_SELECTOR_LEFT = -10 - COLOR_SELECTOR_WIDTH;
		}
		
		colorSelectorElement = createGradientElement();
		document.getElementById("main").appendChild(colorSelectorElement);
		
		var color = determineBackgroundTagColor();
		//GM_log("Color: " + color);
		if (color) {
			byTagSelectorElement = createTagColorSelector(color);
			document.getElementById("main").appendChild(byTagSelectorElement);
		}
		document.getElementById("main").appendChild(createColorSelectorHider());
	} else if (document.location.href.indexOf("/sizes/") > 0) {
		//GM_log("All sizes page");
		COLOR_SELECTOR_TOP = 182;
		COLOR_SELECTOR_LEFT = -8 - COLOR_SELECTOR_WIDTH;
		allSizesPage = true;
		
		colorSelectorElement = createGradientElement();
		document.getElementById("main").appendChild(colorSelectorElement);
		
		document.getElementById("main").appendChild(createColorSelectorHider());
		fetchColorTag();
	}
}

displayColorSelector();


