// ==UserScript==
// @name           Last.fm free downloads
// @namespace      last.fm free downloads
// @include        http://www.last.fm/music/*/*/*
// @include        http://www.lastfm.*/music/*/*/*

// ==/UserScript==

Function.prototype.bind =
	function(object) {
		var method = this;
		return function () {method.apply(object, arguments);
	};
}




	//playerTag.style.display = "none";
	//playerTag.innerHTML = artistname;
	

		

new LyricsPanel();

function LyricsPanel() {

	this.loadContent = function() {
		var headline = document.getElementsByTagName("h1")[2];
		var artist = headline.childNodes[0].childNodes[0].nodeValue;
		var track  = headline.childNodes[1].nodeValue.substring(3);
		//var track = "1";	

		GM_xmlhttpRequest({
			method: "GET",
			url: "http://enot.itce.ru/lastfm/audio.php?player=no&"
				+ "artist=" + encodeURIComponent(artist)
				+ "&title="   + encodeURIComponent(track),
			headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
			          "Accept": "application/xml"},
			onload: this.handleResponse.bind(this)});
	}

	this.handleResponse = function(response) {
		this.content.innerHTML = response.responseText;
	}

	this.toggleDisplayed = function() {
		this.panelDisplayed = !this.panelDisplayed;
		GM_setValue("panelDisplayed", this.panelDisplayed);
		this.updateDisplayed();
	}

	this.updateDisplayed = function() {
		if (this.panelDisplayed && !this.contentLoaded) {
			this.loadContent();
			this.contentLoaded = true;
		}
		this.collapser.innerHTML = this.panelDisplayed ? "Hide" : "Show";
		this.content.style.display = this.panelDisplayed ? ""  : "none";
	}
	
	
	this.contentLoaded = false;
	this.panelDisplayed = GM_getValue("panelDisplayed", true);
	var menu = new DropDownMenu();

	var header = document.createElement("h2");
	header.setAttribute("class", "heading");
	header.innerHTML = "<span class=\"h2Wrapper\">Download mp3</span>";
	this.content = document.createElement("div");
	this.panel = document.createElement("div");
	this.panel.setAttribute("class", "module");

	this.collapser = document.createElement("a");
	this.collapser.addEventListener("click", this.toggleDisplayed.bind(this), false);
	this.collapser.style.cursor = "pointer";
	menu.addItem(this.collapser);

	var positioner = new PanelPositioner(this.panel);
	var controls = positioner.getControls();
	for (var i = 0; i < 4; i++)
		menu.addItem(controls[i]);

	this.panel.appendChild(menu.getComponent());
	this.panel.appendChild(header);
	this.panel.appendChild(this.content);
	
	this.content.innerHTML = "Searching mp3..."
	
	this.updateDisplayed();
	positioner.insertPanel();
}

function DropDownMenu() {

	this.getComponent = function() {
		return this.menu;
	}

	this.addItem = function(element) {
		var item = document.createElement("li");
		item.appendChild(element);
		this.menuList.appendChild(item);
	}

	this.menuButton = document.createElement("a");
	this.menuButton.setAttribute("class", "lfmButton lfmSmallButton lfmSmallModuleButton");
	this.menuList = document.createElement("ul");
	this.menuList.setAttribute("class", "lfmDropDownBody");
	this.menuList.style.display = "none";
	this.menuList.style.position = "absolute";
	this.menuList.style.zIndex = "99";
	this.menu = document.createElement("div");
	this.menu.setAttribute("class", "moduleDropDown toggle");
	this.menu.appendChild(this.menuButton);
	this.menu.appendChild(this.menuList);

	document.addEventListener("click", function(event) {
		this.menuList.style.display = event.target == this.menuButton
			&& this.menuList.style.display == "none" ? ""  : "none";
	}.bind(this), false);
}

function PanelPositioner(panel) {

	this.panel = panel;
	this.panelOrientation = GM_getValue("panelOrientation", "right").toLowerCase();
	this.panelIndex = GM_getValue("panelIndex", 1);
	this.nHeadings = {"left": getHeadingCount("left"), "right": getHeadingCount("right")};

	this.getControls = function() {
		return [createMoveLink(this.moveLeft.bind(this),  "left"),
				createMoveLink(this.moveRight.bind(this), "right"),
				createMoveLink(this.moveUp.bind(this),    "up"),
				createMoveLink(this.moveDown.bind(this),  "down")];
	}

	this.insertPanel = function() {
		if (this.panel.parentNode)
			this.panel.parentNode.removeChild(this.panel);

		var containerClassName = this.panelOrientation + "Col" + (this.panelOrientation == "left" ? "Wrapper" : "");
		var expr = "//div[@class='" + containerClassName + "']";
		if (this.panelIndex <= this.nHeadings[this.panelOrientation]) {
			expr += "/h2[" + this.panelIndex + "]";
			var node = document.evaluate(expr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			node.parentNode.insertBefore(this.panel, node);
		} else {
			this.panelIndex = this.nHeadings[this.panelOrientation] + 1;
			var node = document.evaluate(expr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			node.insertBefore(this.panel, null);
		}
		GM_setValue("panelOrientation", this.panelOrientation);
		GM_setValue("panelIndex", this.panelIndex);
	}

	this.moveUp = function() {
		if (this.panelIndex > 1) {
			this.panelIndex--;
			this.insertPanel();
		}
	}

	this.moveDown = function() {
		if (this.panelIndex <= this.nHeadings[this.panelOrientation]) {
			this.panelIndex++;
			this.insertPanel();
		}
	}

	this.moveLeft = function() {
		this.moveHorizontally("right", "left");
	}

	this.moveRight = function() {
		this.moveHorizontally("left", "right");
	}

	this.moveHorizontally = function(from, to) {
		if (this.panelOrientation == from) {
			this.panelOrientation = to;
			if (this.panelIndex > this.nHeadings[from])
				this.panelIndex = this.nHeadings[to] + 1;
			this.insertPanel();
		}
	}

	function createMoveLink(handler, direction) {
		var link = document.createElement("a");
		link.addEventListener("click", handler, false);
		link.innerHTML = direction.charAt(0).toUpperCase() + direction.substring(1); /* "Move " + direction */
		link.style.cursor = "pointer";
		return link;
	}


	function getHeadingCount(orientation) {
		return document.evaluate("count(//div[@class='" + orientation + "Col']/descendant::h2)", document, null, XPathResult.NUMBER_TYPE, null).numberValue;
	}
}