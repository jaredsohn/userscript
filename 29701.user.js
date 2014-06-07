// ==UserScript==
// @name           _@/ google blacklist
// @author         Chris Porter
// @version        0.1d
// @date           2008-09-20
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.google.*/search?*
// ==/UserScript==

document.createStyleSheet = function(sValue) { var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };
document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};

var jsLF = String.fromCharCode(10);


// =================================================================================================
// GoogleBlacklist
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================

var GoogleBlacklist = {

// -------------------------------------------------------------------------------------------------
// settings

	settings: {

		blacklist: {

			get value() { return GM_getValue("setting-blacklist-urls", "http://www.experts-exchange.com/"); },
			set value(sValue) { GM_setValue("setting-blacklist-urls", sValue); },
			get urls() { return this.value.split(jsLF); }

		}

	},


// -------------------------------------------------------------------------------------------------
// elements

	elements: {

		settingsPanel: {

			get container() { return document.getElementById("userscript-settings-panel"); }

		}

	},


// -------------------------------------------------------------------------------------------------
// event handlers

	eventHandlers: {

		settingsPanelLinkClick: function(event)
		{
		try
			{
			var o = document.getElementById("userscript-settings-panel");
			if (o == undefined) { GoogleBlacklist.createSettingsPanel(); }
			o.style.display = ((o.offsetWidth > 0) ? "none" : "inline");
			o.style.top = Math.floor((window.innerHeight - parseInt(o.offsetHeight)) / 2) + "px";
			o.style.left = Math.floor((window.innerWidth - parseInt(o.offsetWidth)) / 2) + "px";
			}
		catch(e){}
		},

		settingsPanel: {

			okButtonClick: function(event)
			{
			GoogleBlacklist.settings.blacklist.value = document.getElementById("userscript-blacklist-urls").value;
			GoogleBlacklist.elements.settingsPanel.container.style.display = "none";
			location.reload();
			},

			cancelButtonClick: function(event)
			{
			GoogleBlacklist.elements.settingsPanel.container.style.display = "none";
			document.getElementById("userscript-blacklist-urls").value = GoogleBlacklist.settings.blacklist.value;
			}

		},

		toggleItemDisplayLinkClick: function(event)
		{
		var b = (event.target.innerHTML == "Show");
		var elements = {
			resultLinks: document.getElementsByXPath("//div[@userscript-blacklisted-url]")
		};
		for ( var i = 0 ; i < elements.resultLinks.length ; i++ )
			{
			elements.resultLinks[i].style.display = (b ? "inline" : "none");
			}
		event.target.innerHTML = (b ? "Hide" : "Show");
		}

	},


// -------------------------------------------------------------------------------------------------
// createSettingsPanel

	createSettingsPanel: function()
	{
	// create settings panel css
	document.createStyleSheet(
	"div#userscript-settings-panel { background-color:white; border-color:#3366CC; border-style:solid; border-width:1px 1px 1px 1px; display:inline; left:400px; position:absolute; top:200px; width:405px; } " +
	"div#userscript-settings-panel td#header { background-color:#ebeff9; font-weight:bold; padding-left:5px; padding-top:5px; padding-bottom:5px;  } " +
	"div#userscript-settings-panel table.form-holder { margin:5px; } " +
	"div#userscript-settings-panel table.form-holder td { font-size:8pt; martin-bottom:5px; margin-top:5px; } " +
	"div#userscript-settings-panel textarea { height:250px; width:390px; } " +
	"div#userscript-settings-panel input[type=\"button\"] { font-size:8pt; margin-left:5px; margin-top:5px; width:60px; } " +
	"");

	var elements = {
		get docBody() { return document.getElementsByTagName("body")[0]; },
		settingsPanel: document.createElement("div"),
		get okButton() { return document.getElementById("userscript-blacklist-ok"); },
		get cancelButton() { return document.getElementById("userscript-blacklist-cancel"); }
	};

	// create settings panel html
	with (elements.settingsPanel)
		{
		id = "userscript-settings-panel";
		innerHTML =
		"<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\"><tbody>" +
			"<tr><td id='header' nowrap=\"nowrap\"><span id=\"sd\">Blacklisted URLs</span></td></tr>" +
		"</tbody></table>" +
		"<table border=0 cellpadding=0 cellspacing=0 class=\"form-holder\"><tbody>" +
			"<tr><td>Enter each URL on a separate line.</td></tr>" +
			"<tr><td><textarea id=\"userscript-blacklist-urls\">" + GoogleBlacklist.settings.blacklist.value + "</textarea></td></tr>" +
			"<tr><td align=\"right\">" +
				"<input type=\"button\" value=\"OK\" id=\"userscript-blacklist-ok\" />" +
				"<input type=\"button\" value=\"Cancel\" id=\"userscript-blacklist-cancel\" />" +
			"</td></tr>" +
		"</tbody></table>";
		}
	elements.docBody.appendChild(elements.settingsPanel);

	// add event listener to the ok and cancel buttons
	elements.okButton.addEventListener("click", this.eventHandlers.settingsPanel.okButtonClick, true);
	elements.cancelButton.addEventListener("click", this.eventHandlers.settingsPanel.cancelButtonClick, true);
	},


// -------------------------------------------------------------------------------------------------
// createSettingsPanelLink

	createSettingsPanelLink: function()
	{
	// create an anchor element to activate or deactivate the in the page header after the signin or signout link.
	var elements = {
		get targetLink()
			{
			return document.getElementByXPath("//div[@id='header']/p[@id='gb']/a[contains(@href,'accounts/Log')] | //div[@id='header']/p[@id='gb']/nobr/a[contains(@href,'accounts/Log')]");
			},
		settingsLink: document.createElement("a")
	};

	with (elements.settingsLink)
		{
		href = "#";
		setAttribute("onclick", "return false;");
		setAttribute("style", "margin-left:10px;");
		innerHTML = "_@/";
		addEventListener("click", this.eventHandlers.settingsPanelLinkClick, true);
		}

	// add the new link to the page DOM after the signin or signout link.
	elements.targetLink.parentNode.appendChild(elements.settingsLink);
	},


// -------------------------------------------------------------------------------------------------
// filterSearchResults

	filterSearchResults: function()
	{
	var elements = {
		resultLinks: document.getElementsByXPath("//div[@class='g']/h2[@class='r']/a[@class='l']"),
		resultSummary: document.getElementByXPath("//div[@id='ssb']/p")
	};
	var aBlacklist = this.settings.blacklist.urls;

	// check each link returned by the search and hide it if the url is included in the blacklist.
	var iHiddenCount = 0;
	for ( var i = 0 ; i < elements.resultLinks.length ; i++ )
		{
		sURL = elements.resultLinks[i].href;
		for ( var j = 0 ; j < aBlacklist.length ; j++ )
			{
			if (sURL.indexOf(aBlacklist[j]) == 0)
				{
				with (elements.resultLinks[i].style) { color = "#808080"; fontStyle = "italic"; }
				with (elements.resultLinks[i].parentNode.parentNode)
					{
					style.display = "none";
					// set a custom attribute for easy identification later on
					setAttribute("userscript-blacklisted-url", "true")
					}
				iHiddenCount++;
				break;
				}
			}
		}

	// add some text to the summary to indicate the number of search results we have hidden,
	// and a link to toggle the display of hidden results.
	var sHTML = elements.resultSummary.innerHTML + "&nbsp;|&nbsp;" + iHiddenCount.toString() + " hidden result" + ((iHiddenCount != 1) ? "s" : "") + "&nbsp;&nbsp;";
	if (iHiddenCount > 0)
		{
		sHTML += "<a href=\"#\" onclick=\"return false;\" id=\"userscript-show-blacklisted-urls\">Show</a>" + "&nbsp;&nbsp;";
		elements.resultSummary.innerHTML = sHTML;
		// attach the onclick event handler to the link to toggle display of blacklisted urls
		document.getElementById("userscript-show-blacklisted-urls").addEventListener("click", this.eventHandlers.toggleItemDisplayLinkClick, true);
		}
	else
		{
		elements.resultSummary.innerHTML = sHTML;
		}
	},


// -------------------------------------------------------------------------------------------------
// onCreate

	onCreate: function()
	{
	this.createSettingsPanelLink();
	this.filterSearchResults();
	}

};
GoogleBlacklist.onCreate();
