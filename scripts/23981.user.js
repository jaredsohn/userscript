// ==UserScript==
// @name           _@/ tv.com
// @author         Chris Porter
// @version        0.5
// @date           2009-03-28
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.tv.com/*
// ==/UserScript==

var GM_consoleLineOffset = 10 /* current line number */; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset)); };

//alert = function(){ if (_showAlert) { _showAlert = confirm(arguments[0]); }}; var _showAlert = true;

Date.prototype.round = function(sTimePeriod) { switch(new String("YMDHNS").indexOf(sTimePeriod.toUpperCase())) { case 0: this.setMonth(0); case 1: this.setDate(1); case 2: this.setHours(0); case 3: this.setMinutes(0); case 4: this.setSeconds(0); } this.setMilliseconds(0); return this; };
Date.prototype.setSerial = function(iYear, iMonth, iDay) { iYear = parseInt(iYear, 10); iMonth = parseInt(iMonth, 10); iDay = parseInt(iDay, 10); this.setYear(iYear); this.setMonth(iMonth-1); this.setDate(iDay); this.setHours(((arguments.length >= 6) ? arguments[3] : 0)); this.setMinutes(((arguments.length >= 6) ? arguments[4] : 0)); this.setSeconds(((arguments.length >= 6) ? arguments[5] : 0)); this.setMilliseconds(0); return this; };

document.createStyleSheet = function(sValue) { var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };
document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};
document.removeElementsByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); var i = a.snapshotLength; for ( var i = 0 ; i < a.snapshotLength ; i++ ) { a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i)); } return i; };

String.prototype.left = function(iLen) { return this.substr(0, iLen); };
String.prototype.right = function(iLen) { return this.substr( this.length - iLen, iLen ); }
String.prototype.trim = function() { return this.replace(/^\s*|\s*$/g,""); }


// =================================================================================================
// TV
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================

var TV = {

// =================================================================================================
// TV.nowViewing
// =================================================================================================

	nowViewing: {

		get pagename() { return window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1, window.location.pathname.length); },

		episodes: {

			get home() { return (this.parent.pagename == "episode.html"); },
			get listings() { return (this.parent.pagename == "episode_listings.html"); },
			get guide() { return (this.parent.pagename == "episode_guide.html"); },
			get summary() { return ((location.pathname.indexOf("/episode/") >= 0) && (this.parent.pagename == "summary.html")); },
			get top() { return ((location.pathname.indexOf("/show") > 0) && (this.parent.pagename == "top.html")); }

		},

		get listings() { return ((location.pathname.indexOf("/listings") == 0) && (this.pagename = "index.html")); },
		get photos() { return (location.pathname.indexOf("/photos") == 0); }

	},

// tv.nowViewing
// =================================================================================================


// =================================================================================================
// TV.settings
// =================================================================================================

	settings: {

		category: {}, get categories() { return this.category; },

// -------------------------------------------------------------------------------------------------
// addCategory

		addCategory: function(sName)
		{
		this.category[sName] = {
			name: sName,
			headerText: "",
			helpText: "",
			columnIndex: -1,
			setting:{},
			get settings() { return this.setting; },

// -------------------------------------------------------------------------------------------------
// addSetting

			addSetting: function(sName, oSetting)
			{
			var oCategory = this;
			this.setting[sName] = {
				category: oCategory,
				name: sName,
				type: oSetting.type,
				defaultValue: oSetting.defaultValue,
				labelText: oSetting.labelText,
				style: oSetting.style,
				get id() { return "userscript-setting--" + this.category.name + "--" + this.name; },
				get value() { return GM_getValue(this.id, this.defaultValue); },
				set value(vValue) { GM_setValue(this.id, vValue); }
				}

			}
		};

		return this.category[sName];
		}

	},
// TV.settings
// =================================================================================================



// =================================================================================================
// TV.settingsPanel
// =================================================================================================

	settingsPanel: {

		elements: {},

		get panelVisible() { return (this.elements.panelContainer.offsetHeight > 0) },
		get panelExists() { return (typeof(this.elements.panelContainer) == "object"); },

// -------------------------------------------------------------------------------------------------
// createLink

		createLink: function() { try
		{
		// create the anchor element to display the settings panel from the navigation bar
		this.elements.panelLink = document.createElement("a");
		with (this.elements.panelLink)
			{
			innerHTML = "_@/";
			setAttribute("href", "#");
			setAttribute("onclick", "return false;");
			addEventListener("click", this.eventHandlers.onLinkClick, true);
			}

		// create a new list item in the navigation bar list, and append the settings panel link to it
		var elements = {
			list: document.getElementByXPath("//div[@id='tv_header']/ul[@class='site_nav']"),
			listItems: document.getElementsByXPath("//div[@id='tv_header']/ul[@class='site_nav']/li"),
			listItem: document.createElement("li")
		};
		elements.listItem.appendChild(this.elements.panelLink);

		elements.listItems[elements.listItems.length-1].removeAttribute("class");
		elements.list.appendChild(elements.listItem);
		elements.listItem.setAttribute("class", "last");
		}
		catch(error){ error.method = "onCreate"; GM_logError(error); }},



// -------------------------------------------------------------------------------------------------
// createPanel

		createPanel: function() { try
		{
		var aCSS = [], aHTML = [];
		var settings = this.parent.settings;

		aCSS.push("div#userscript-settings-panel { background-color:white; left: 200px; position:absolute; top:200px; }");
		aCSS.push("div#userscript-settings-panel #panel-header { border:1px solid #C7C7C7; padding:1px; }");
		aCSS.push("div#userscript-settings-panel #panel-header h1 { background: #0085CA url(http://image.com.com/tv/images/tv_wide/layout/bg_modules.gif) repeat-x scroll left -48px; color:white; height:36px; color:white; font-size:16px; font-weight:bold; line-height:36px; padding-left:10px; }");
		aCSS.push("div#userscript-settings-panel #panel-body { border:1px solid #C7C7C7; padding:10px; }");
		aCSS.push("div#userscript-settings-panel table { width:350px; }");
		aCSS.push("div#userscript-settings-panel td.category-header { background-color:#white; border:1px solid #C7C7C7; padding:1px; }");
		aCSS.push("div#userscript-settings-panel td.category-header h2 { background-color:#DDDDDD; color:black; font-size:12px; font-weight:bold; height:100%; padding:8px; }");
		aCSS.push("div#userscript-settings-panel td.checkbox-holder { border-left:1px solid #C7C7C7; padding-left:5px; padding-top:5px; width:1%; } ");
		aCSS.push("div#userscript-settings-panel td.label-holder { border-right:1px solid #C7C7C7; padding-top:5px; } ");
		aCSS.push("div#userscript-settings-panel td.label-holder label { color:#0085CA; font-size:11px; font-weight:bold; margin-left:5px; width:100%; } ");
		aCSS.push("div#userscript-settings-panel td.category-footer { background-color:#white; border-color:#C7C7C7; border-style:solid; border-width:0px 1px 1px 1px; font-size:5px; } ");
		aCSS.push("div#userscript-settings-panel input.button { width:70px; } ");


		aHTML.push("<div id='panel-header'><h1>Userscript Settings</h1></div>");
		aHTML.push("<div id='panel-body'>");

		aHTML.push("<table border=0 cellpadding=0 cellspacing=0 class=\"option-holder\">");
		var iColumnIndex = 0;
		for ( var sCategoryName in settings.categories )
			{
			var oCategory = settings.category[sCategoryName];
			if (oCategory.columnIndex != iColumnIndex)
				{
				aHTML.push("</table><br />");
				aHTML.push("<table border=0 cellpadding=0 cellspacing=0 class=\"option-holder\">");
				iColumnIndex = oCategory.columnIndex;
				}
			aHTML.push("<tr>");
			aHTML.push("<td colspan=\"2\" class=\"category-header\"><h2>" + oCategory.headerText + "</h2></td>");
			aHTML.push("</tr>");
			for ( var sSettingName in oCategory.settings )
				{
				var oSetting = oCategory.setting[sSettingName]
				switch (oSetting.type)
					{
					case "boolean":
					aHTML.push("<tr>");
					aHTML.push("<td class=\"checkbox-holder\"><input type=\"checkbox\" id=\"" + oSetting.id + "\" value=\"\" /></td>");
					aHTML.push("<td class=\"label-holder\"><label for=\"" + oSetting.id + "\">" + oSetting.labelText + "</label></td>");
					aHTML.push("</tr>");
					break;
					}
				}
			aHTML.push("<tr>");
			aHTML.push("<td colspan=\"2\" class=\"category-footer\">&nbsp;</td>");
			aHTML.push("</tr>");
			}
		aHTML.push("</table><br />");

		aHTML.push("<table border=0 cellpadding=0 cellspacing=0>");
		aHTML.push("<tr>");
		aHTML.push("<td width=\"99%\">&nbsp;</td>");
		aHTML.push("<td class=\"button-holder\"><input type=\"button\" class=\"button\" id=\"userscript-settings-ok-button\" value=\"OK\" /></td>");
		aHTML.push("<td>&nbsp;</td>");
		aHTML.push("<td class=\"button-holder\"><input type=\"button\" class=\"button\" id=\"userscript-settings-cancel-button\" value=\"Cancel\" /></td>");
		aHTML.push("</tr>");
		aHTML.push("</table>");

		aHTML.push("</div>");

		document.createStyleSheet(aCSS.join("\n"));

		this.elements.panelContainer = document.createElement("div");
		this.elements.panelContainer.id = "userscript-settings-panel";
		this.elements.panelContainer.innerHTML = aHTML.join("\n");
		document.getElementsByTagName("body")[0].appendChild(this.elements.panelContainer);

		for ( var sCategoryName in settings.categories )
			{
			for ( var sSettingName in settings.category[sCategoryName].settings )
				{
				var oSetting = settings.category[sCategoryName].setting[sSettingName];
				var oElement = document.getElementById(oSetting.id);

				switch (oSetting.type)
					{
					case "boolean": oElement.checked = (oSetting.value == true); break;
					case "int": oElement.value = oSetting.value; break;
					case "string": oElement.value = oSetting.value; break;
					}
				}
			}


		document.getElementById("userscript-settings-ok-button").addEventListener("click", TV.settingsPanel.eventHandlers.onOKButtonClick, true);
		document.getElementById("userscript-settings-cancel-button").addEventListener("click", TV.settingsPanel.eventHandlers.onCancelButtonClick, true);


		GM_log("TV.settingsPanel.createPanel");
		}
		catch(error){ GM_logError(error); }},


// =================================================================================================
// TV.settingsPanel.eventHandlers
// =================================================================================================

		eventHandlers: {

// -------------------------------------------------------------------------------------------------
// onLinkClick

			onLinkClick: function(event) { try
			{
			var settingsPanel = TV.settingsPanel;
			if (!settingsPanel.panelExists)
				{
				settingsPanel.createPanel();
				}
			else
				{
				settingsPanel.elements.panelContainer.style.display = ((settingsPanel.panelVisible) ? "none" : "block" );
				}
			if (settingsPanel.panelVisible);
				{
				// centre the dialog horzontally and vertically within the window
				settingsPanel.elements.panelContainer.style.top = Math.floor((window.innerHeight - parseInt(settingsPanel.elements.panelContainer.offsetHeight)) / 2) + "px";
				settingsPanel.elements.panelContainer.style.left = Math.floor((window.innerWidth - parseInt(settingsPanel.elements.panelContainer.offsetWidth)) / 2) + "px";
				}
			}
			catch(error){ GM_logError(error); }},

// -------------------------------------------------------------------------------------------------
// onOKButtonClick

			onOKButtonClick: function(event) { try
			{
			var settings = TV.settings;
			var settingsPanel = TV.settingsPanel;

			for ( var sCategoryName in settings.categories )
				{
				for ( var sSettingName in settings.category[sCategoryName].settings )
					{
					var oSetting = settings.category[sCategoryName].setting[sSettingName];
					switch (oSetting.type)
						{
						case "boolean": oSetting.value = document.getElementById(oSetting.id).checked; break;
						case "int": oSetting.value = parseInt(document.getElementById(oSetting.id).value, 10); break;
						case "string": oSetting.value = document.getElementById(oSetting.id).value; break;
						default: break;
						}
					}
				}

			settingsPanel.elements.panelContainer.style.display = "none";
			}
			catch(error){ GM_logError(error); }},

// -------------------------------------------------------------------------------------------------
// onCancelButtonClick

			onCancelButtonClick: function(event) { try
			{
			var settingsPanel = TV.settingsPanel;
			settingsPanel.elements.panelContainer.style.display = "none";
			}
			catch(error){ GM_logError(error); }}

		},
// TV.settingsPanel.eventHandlers
// =================================================================================================


// -------------------------------------------------------------------------------------------------
// onCreate

		onCreate: function()
		{
		this.createLink();
		}

	},
// TV.settingsPanel
// =================================================================================================


// -------------------------------------------------------------------------------------------------
// removeElements

	removeElements: function() { try
	{
	var aXPath = [];

	if (this.settings.category["general"].setting["remove-cnet-content"].value == true)
		{
		aXPath.push("//div[@id='tv_header']/div[@class='row_of_stuff']/div[@class='cnet_promo']");
		aXPath.push("//div[@id='footer']/div[@id='cnet_footer']");
		}

	aXPath.push("//div[@class='ad leader_bottom']");

	if (this.nowViewing.episodes.listings)
		{
		aXPath.push("//div[@id='side']");
		aXPath.push("//div[@id='main']//div[@class='module sponsored_links']");
		}

	if (aXPath.length > 0) { document.removeElementsByXPath(aXPath.join(" | ")); }
	}
	catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// formatDocument

	formatDocument: function() { try
	{
	var aCSS = [];

	aCSS.push("div#footer { padding-bottom:0px; }");

	if (this.settings.category["general"].setting["format-dates-iso8601"].value == true)
		{
		var aTarget = [];

		var _formatDate =
			function()
			{
			var result = { s:"" , d:new Date(0) };
			var aDatePart = arguments[0].split("/");
			if (aDatePart.length == 3)
				{
				aDatePart[0] = "00" + String(aDatePart[0]).trim();  aDatePart[0] = aDatePart[0].right(2);
				aDatePart[1] = "00" + String(aDatePart[1]).trim();  aDatePart[1] = aDatePart[1].right(2);
				aDatePart[2] = String(aDatePart[2]).trim();
				result.s = aDatePart[2] + "-" + aDatePart[0] + "-" + aDatePart[1];
				result.d.setFullYear(parseInt(aDatePart[2], 10));
				result.d.setMonth(parseInt(aDatePart[0], 10)-1);
				result.d.setDate(parseInt(aDatePart[1], 10));
				}
			return result;
			};

		if (this.nowViewing.episodes.home)
			{
			var aTarget = document.getElementsByXPath("//span[@class='air_date']");
			}

		if (this.nowViewing.episodes.guide)
			{
			var aTarget = document.getElementsByXPath("//span[@class='air_date']");
			}

		aTarget.forEach(function(oTarget){ oTarget.innerHTML = _formatDate(oTarget.innerHTML).s; });
		}


	if (aCSS.length > 0) { document.createStyleSheet(aCSS.join("\n")); }
	}
	catch(error){ GM_logError(error); }},



// =================================================================================================
// TV.episodeDetails
// =================================================================================================

	episodeDetails: {

// =================================================================================================
// TV.episodeDetails.dataCache
// =================================================================================================

		dataCache: {

			ids: [],
			items: [],

// -------------------------------------------------------------------------------------------------
// createEpisode

			createEpisode: function()
			{
			// create an episode data object from the argument object
			return {
				id: ((arguments[0].id != undefined) ? arguments[0].id : null ),
				title: ((arguments[0].title != undefined) ? arguments[0].title : null ),
				season: ((arguments[0].season != undefined) ? arguments[0].season : null ),
				episode: ((arguments[0].episode != undefined) ? arguments[0].episode : null ),
				summary: ((arguments[0].summary != undefined) ? arguments[0].summary : null )
				};
			},


// -------------------------------------------------------------------------------------------------
// push

			push: function()
			{
			// create an episode data object from the argument object
			var oEpisode = this.createEpisode(arguments[0]);
			// insert the episode id into the ids array for quicker retrieval
			this.ids.push(oEpisode.id);
			// insert the episode data object into the items array
			this.items.push(oEpisode);
			// save the items array to the greasemonkey data store in string form
			this.save();
			},

// -------------------------------------------------------------------------------------------------
// pushReplace

			pushReplace: function()
			{
			// create an episode data object from the argument object
			var oEpisode = this.createEpisode(arguments[0]);
			// test whether this episode already exists in the items array
			var i = this.ids.indexOf(oEpisode.id);
			// if the object already exists
			if (i >= 0)
				{
				// replace it with the new object
				this.items[i] = oEpisode;
				}
			// if the object doesn't already exist
			else
				{
				// insert the episode id into the ids array for quicker retrieval
				this.ids.push(oEpisode.id);
				// insert the episode data object into the items array
				this.items.push(oEpisode);
				}
			// save the items array to the greasemonkey data store in string form
			this.save();
			},

// -------------------------------------------------------------------------------------------------
// load

			load: function()
			{
			// retrieve the data in string form from the greasemonkey data store
			var data = GM_getValue("datacache-episodeinfo", "");
			if (data != "")
				{
				// convert the data into an array of strings
				data = data.split("Ø");
				// process each element of the array
				for ( var i = 0 ; i < data.length ; i++ )
					{
					// convert the element to an object
					var item = eval(data[i]);
					// insert the episode id into the ids array for quicker retrieval
					this.ids.push(item.id);
					// insert the episode data object into the items array
					this.items.push(item);
					}
				}
			},

// -------------------------------------------------------------------------------------------------
// save

			save: function()
			{
			// create an array of strings from the items data array
			var data = [];
			for ( var i = 0 ; i < this.items.length ; i++ )
				{
				data.push(this.items[i].toSource());
				}
			// store the array in string form in the greasemonkey data store
			GM_setValue("datacache-episodeinfo", data.join("Ø"));
			}

		},
// TV.episodeDetails.dataCache
// =================================================================================================

// -------------------------------------------------------------------------------------------------
// getEpisodeData

		getEpisodeData: function() { try
		{
		// obtain the episode details from the DOM
		var s = document.getElementByXPath("//div[@class='ep_tabs']/ul/li/a[text()='Overview']").href;
		var i1 = s.indexOf("/episode/")+9; var i2 = s.indexOf("/", i1);
		var iEpisodeID = parseInt(s.substring(i1, i2));
		var sEpisodeTitle = document.getElementByXPath("//div[@id='indepth_block']//h2[@class='module_title']").innerHTML;
		var sEpisodeSummary = document.getElementByXPath("//p[@class='deck']").innerHTML; sEpisodeSummary = sEpisodeSummary.substr(0, sEpisodeSummary.indexOf("<a")).trim();
		var iSeasonNumber = parseInt(document.getElementByXPath("//ul[@class='ep_stats']/li/span[text()='Season:']").nextSibling.nodeValue.trim());
		var iEpisodeNumber = parseInt(document.getElementByXPath("//ul[@class='ep_stats']/li/span[text()='Episode:']").nextSibling.nodeValue.trim());

		// create an episode data object using the details obtained
		var oEpisode = {
			id: iEpisodeID,
			title: sEpisodeTitle,
			season: iSeasonNumber,
			episode: iEpisodeNumber,
			summary: sEpisodeSummary
		};

		// add the episode data object to the episode details data cache, or replace it if it already exists
		this.dataCache.pushReplace(oEpisode);
		}
		catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// formatDocument

		formatDocument: function() { try
		{
		var aCSS = [];

		// convert the season number span into a link to the episode listing for the season
		// determine the show number from the "main" link in the left link list
		var oTarget = document.getElementByXPath("//div[@id='mini' and @class='col']/div[1]/div[1]/ul/li[1]/a");
		var aParts = oTarget.href.split("/");
		var iShowNumber = parseInt(aParts[aParts.length-2], 10);
		// determine the season number from the span
		var oTarget = document.getElementByXPath("//div[@class='header']//ul[@class='ep_stats']/li/span[text()='Season:']");
		var iSeasonNumber = parseInt(oTarget.nextSibling.nodeValue, 10);
		oTarget = oTarget.parentNode;
		// create a link inside the span
		oTarget.innerHTML = "<a href=\"http://www.tv.com/show/" + iShowNumber.toString() + "/episode_listings.html?season=" + iSeasonNumber.toString() + "\">" + oTarget.innerHTML + "</a>";

		if (aCSS.length > 0) { document.createStyleSheet(aCSS.join("\n")); }
		}
		catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// onCreate

		onCreate: function() { try
		{
		this.settings = this.parent.settings;
		this.nowViewing = this.parent.nowViewing;

		if (this.nowViewing.episodes.summary)
			{
			this.getEpisodeData();
			this.formatDocument();
			}
		}
		catch(error){ GM_logError(error); }}

	},
// TV.episodeDetails
// =================================================================================================


// =================================================================================================
// TV.episodeListing
// =================================================================================================

	episodeListing: {

// =================================================================================================
// TV.episodeListing.eventHandlers
// =================================================================================================

		eventHandlers: {

// -------------------------------------------------------------------------------------------------
// onEpisodeLinkMouseover

			onEpisodeLinkMouseover: function(event) { try
			{
			var s = event.target.href;
			var i1 = s.indexOf("/episode/")+9; var i2 = s.indexOf("/", i1);
			var iEpisodeID = parseInt(s.substring(i1, i2));

			with (TV.episodeListing.summaryPopup.elements.container)
				{
				id = "ep_summary_" + iEpisodeID;
				style.display = "inline";
				style.width = parseInt(event.target.parentNode.offsetWidth) + "px";
				style.left = (document.documentElement.scrollLeft + event.clientX + 2) + "px";
				style.top = (document.documentElement.scrollTop + event.clientY + 2) + "px";
				}

			var summaryPopup = TV.episodeListing.summaryPopup;
			var dataCache = TV.episodeDetails.dataCache;

			summaryPopup.show(iEpisodeID);
			if (dataCache.ids.indexOf(iEpisodeID) == -1)
				{
				summaryPopup.getEpisodeDataViaAJAX(event.target.href);
				}
			}
			catch(error){ GM_logError(error); }},

// -------------------------------------------------------------------------------------------------
// onEpisodeLinkMousemove

			onEpisodeLinkMousemove: function(event) { try
			{
			with (TV.episodeListing.summaryPopup.elements.container)
				{
				style.left = (document.documentElement.scrollLeft + event.clientX + 2) + "px";
				style.top = (document.documentElement.scrollTop + event.clientY + 2) + "px";
				}
			}
			catch(error){ GM_logError(error); }},

// -------------------------------------------------------------------------------------------------
// onEpisodeLinkMouseout

			onEpisodeLinkMouseout: function(event) { try
			{
			with (TV.episodeListing.summaryPopup.elements.container)
				{
				id = "";
				style.display = "none";
				innerHTML = "<div style=\"width:100%; height:100%; line-height:100%; text-align:center;\"><img src=\"http://image.com.com/tv/images/misc/ajax-loader-blue.gif\" /></div>";
				}
			}
			catch(error){ GM_logError(error); }}

		},
// TV.episodeListing.eventHandlers
// =================================================================================================

// -------------------------------------------------------------------------------------------------
// formatDocument

		formatDocument: function() { try
		{
		var aCSS = [];

		var xPath = {
			table: "//div[@id='main']//div[@id='eps_table']/div[@class='body']/table",
			get rows() { return (this.table + "/tbody/tr"); },
			row: function(iRow) { return this.table + "/tbody/tr[position()=" + iRow.toString() + "]"; },
			cell: function(iCol, iRow) { return this.table + "/tbody/tr[position()=" + iRow.toString() + "]/td[position()=" + iCol.toString() + "]"; }
		};

		// expand the width of the listing table to utilise the space left by ad removal
		aCSS.push("#sky_layout #main { width:785px !important; }");

		// resize the columns in the table to make each the episode title as wide as possible
		var iCols = document.getElementsByXPath(xPath.row(1) + "/td").length;
		switch(iCols)
			{
			case 7: var aColWidths = [10,44,13,7,9,10,7]; break;
			default: GM_log("episodeListing.formatDocument: unexpected column count - " + iCols.toString()); break;
			}
		if (aColWidths != undefined)
			{
			var oColGroup = document.createElement("colgroup");
			aColWidths.forEach(function(iWidth){ var oCol = document.createElement("col"); oCol.setAttribute("width", iWidth.toString() + "%"); oColGroup.appendChild(oCol); });
			var oTable = document.getElementByXPath(xPath.table);
			oTable.insertBefore(oColGroup, oTable.firstChild);
			}

		var showData = {

			_showName: "",
			get showName()
			{
			if (this._showName == "")
				{
				var oTarget = document.getElementByXPath("//div[@class='content_title']/h1");
				if (oTarget != undefined)
					{
					this._showName = oTarget.firstChild.nodeValue.trim();
					this._showName = this._showName.substr(0, this._showName.length-1);
					}
				}
			return this._showName;
			},

			_seasonNumber: 0,
			get seasonNumber()
			{
			if (this._seasonNumber == 0)
				{
				var oTarget = document.getElementByXPath("//div[@id='eps_table']/div[@class='header']/div[@class='wrap']/span/strong");
				this._seasonNumber = ((oTarget != undefined) ? parseInt(oTarget.innerHTML, 10) : 1);
				}
			return this._seasonNumber;
			},

			episodeNumber: 0,

			toString: function()
			{
			var partStrings = ["%sn", "%et", "%ss", "%s", "%ee", "%e"];
			var getPart =
				function(sPart, showData)
				{
				switch(sPart)
					{
					case "%sn": return showData.showName; break;
					case "%et": return showData.episodeTitle; break;
					case "%ss": return String("00" + showData.seasonNumber.toString()).right(2); break;
					case "%s": return showData.seasonNumber; break;
					case "%ee": return String("00" + showData.episodeNumber.toString()).right(2); break;
					case "%e": return showData.episodeNumber; break;
					}
				};

			var result = arguments[0];
			for ( var i = 0 ; i < partStrings.length ; i++ )
				{
				result = result.replace(partStrings[i], getPart(partStrings[i], this));
				}
			return result;
			}

		};

		var aTR = document.getElementsByXPath(xPath.rows);
		for ( var iTR = 0 ; iTR < aTR.length ; iTR++ )
			{

			var elements = {
				divs: {
					episodeNumber: document.getElementByXPath(xPath.row(iTR+1) + "/td[@class='num']/div"),
					episodeTitle: document.getElementByXPath(xPath.row(iTR+1) + "/td[@class='ep_title']/div"),
					airDate: document.getElementByXPath(xPath.row(iTR+1) + "/td[@class='ep_air_date']/div"),
				},
				links: {
					episodeTitle: document.getElementByXPath(xPath.row(iTR+1) + "/td[@class='ep_title']/div/a"),
				}
			};

			showData.episodeTitle = elements.links.episodeTitle.innerHTML;

			// if the episode has an integer episode number
			if ((!isNaN(elements.divs.episodeNumber.innerHTML)) && (this.nowViewing.episodes.top == false))
				{
				// increment the series episode counter by one
				showData.episodeNumber++;
				if (this.settings.category["episode-listings"].setting["add-episode-number"].value == true)
					{
					// display the season and episode number in format "sXXeXX" next to the absolute episode number value
					var oSpan = document.createElement("span");
					oSpan.innerHTML = showData.toString("s%sse%ee");
					with (oSpan.style) { fontSize = "80%"; marginLeft = "5px"; }
					elements.divs.episodeNumber.appendChild(oSpan);
					}
				}

			// if the episode has an air date
			if (elements.divs.airDate.innerHTML != "0/0/0")
				{
				// get the component parts from the episode air date string
				var aDatePart = elements.divs.airDate.innerHTML.split("/"); if (aDatePart.length != 3) { GM_log("episodeListing.formatDocument: inexpected aDatePart length value " + aDatePart.length.toString()); continue; }
				aDatePart[0] = "00" + String(aDatePart[0]).trim();  aDatePart[0] = aDatePart[0].right(2);
				aDatePart[1] = "00" + String(aDatePart[1]).trim();  aDatePart[1] = aDatePart[1].right(2);
				aDatePart[2] = String(aDatePart[2]).trim();
				// and build a date value out of them
				showData.airDate = new Date(0).setSerial(aDatePart[2], aDatePart[0], aDatePart[1]);

				// reformat the displayed air date into format "YYYY-MM-DD"
				if (this.settings.category["general"].setting["format-dates-iso8601"].value == true)
					{
					elements.divs.airDate.innerHTML = aDatePart[2] + "-" + aDatePart[0] + "-" + aDatePart[1];
					}

				// if the date value is in the future, create a link to add an event to a google calendar
				if (this.settings.category["episode-listings"].setting["create-google-calendar-links"].value == true)
					{
					if (showData.airDate >= new Date().round("d"))
						{
						var oLink = document.createElement("a");
						oLink.target = "_new";
						oLink.title = "Add this episode to your Google Calendar";
						oLink.href = "http://www.google.com/calendar/event" +
						"?action=TEMPLATE" +
						"&text=" + escape(showData.toString("%sn s%sse%ee")) +
						"&dates=" + aDatePart[2] + aDatePart[0] + aDatePart[1] + "T210000Z" + "/" +  aDatePart[2] + aDatePart[0] + aDatePart[1] + "T220000Z" +
						"&details=" + escape(showData.toString("%sn Season %s Episode %e\n%et"));
						"&location=&trp=false&sprop=&sprop=name:";
						oLink.innerHTML = "<img src=\"" + this.parent.images.favicons.googleCalendar + "\" border=\"0\" />";
						oLink.style.marginLeft = "5px";

						elements.divs.airDate.appendChild(oLink);
						}
					}
				}
			else
				{
				elements.divs.airDate.innerHTML = "~";
				showData.airDate = new Date(0);
				}


			if (this.settings.category["episode-listings"].setting["create-torrent-links"].value == true)
				{
				var formatSearchQuery =
					function()
					{
					var sResult = arguments[0];
					sResult = sResult.replace(/^\s+|\s+$/g, ''); //trim the title
					sResult = sResult.replace(/\s/g, "+"); //replace spaces with +'s
					sResult = sResult.replace(/[\?#]!"/g, ""); //remove bad chars
					return sResult;
					};

				if (showData.airDate <= new Date())
					{
					var oDownloadDiv = document.getElementByXPath(xPath.row(iTR+1) + "/td[@class='ep_downloads']/div");
					with (oDownloadDiv.style) { padding = "5px"; }

					var oLinks = { TV:document.createElement("a") , thePirateBay:document.createElement("a") };
					with (oLinks.TV)
						{
						title = "Search mininova.org for \"" + showData.toString("%sn s%sse%ee") + "\"";
						setAttribute("target", "_blank");
						href = "#";
						href = "http://www.mininova.org/search/" + formatSearchQuery(showData.toString("%sn s%sse%ee"));
						innerHTML = "<img src=\"" + this.parent.images.favicons.TV + "\" border=\"0\" />";
						style.marginRight = "5px";
						}
					oDownloadDiv.appendChild(oLinks.TV);
					with (oLinks.thePirateBay)
						{
						title = "Search thepiratebay.org for \"" + showData.toString("%sn s%sse%ee") + "\"";
						setAttribute("target", "_blank");
						href = "#";
						href = "http://thepiratebay.org/search/" + formatSearchQuery(showData.toString("%sn s%sse%ee")) + "/0/99/0";
						innerHTML = "<img src=\"" + this.parent.images.favicons.thePirateBay + "\" border=\"0\" />";
						}
					oDownloadDiv.appendChild(oLinks.thePirateBay);

					}
				}


			// display a hovering div containing the summary of the episode on mouseover
			if (this.settings.category["episode-listings"].setting["ajax-episode-summary"].value == true)
				{
				with (elements.links.episodeTitle)
					{
					addEventListener("mouseover", this.eventHandlers.onEpisodeLinkMouseover, false);
					addEventListener("mousemove", this.eventHandlers.onEpisodeLinkMousemove, false);
					addEventListener("mouseout", this.eventHandlers.onEpisodeLinkMouseout, false);
					}
				}

			}


		if (aCSS.length > 0) { document.createStyleSheet(aCSS.join("\n")); }
		}
		catch(error){ GM_logError(error); }},


// =================================================================================================
// TV.episodeListing.summaryPopup
// =================================================================================================

		summaryPopup: {

// -------------------------------------------------------------------------------------------------
// show

			show: function() { try
			{
			this.elements.container.innerHTML = "<div style=\"width:100%; height:100%; line-height:100%; text-align:center;\"><img src=\"http://image.com.com/tv/images/misc/ajax-loader-blue.gif\" /></div>";
			var episodeData = null;

			if (typeof(arguments[0]) == "object")
				{
				var episodeData = arguments[0];
				}
			if (typeof(arguments[0]) == "number")
				{
				var iEpisodeID = arguments[0];
				if (TV.episodeDetails.dataCache.ids.indexOf(iEpisodeID) >= 0)
					{
					var episodeData = TV.episodeDetails.dataCache.items[TV.episodeDetails.dataCache.ids.indexOf(iEpisodeID)];
					}
				}

			if (episodeData != null)
				{
				this.elements.container.innerHTML = "<span>" + episodeData.summary + "</span>";
				}
			}
			catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// getEpisodeDataViaAJAX

			getEpisodeDataViaAJAX: function(sURL) { try
			{
			var GM_xmlhttpRequest_onload =
				function(xmlHttpResponse)
				{

				// create a document fragment containing the html from the response object
				var oRange = document.createRange();
				oRange.selectNode(document.getElementsByTagName("body").item(0));
				var oFragment = oRange.createContextualFragment("<div id=\"divXmlHttpResponse\" style=\"display:none\">" + xmlHttpResponse.responseText + "</div>");

				var episodeData = {

					id: null,
					season: null,
					episode: null,
					title: null,
					summary: null

				};

				var aTarget = oFragment.firstChild.getElementsByTagName("a");
				for ( var i = 0 ; i < aTarget.length ; i++ )
					{
					if (aTarget[i].innerHTML == "Overview")
						{
						var s = aTarget[i].href;
						var i1 = s.indexOf("/episode/")+9; var i2 = s.indexOf("/", i1);
						episodeData.id = parseInt(s.substring(i1, i2), 10);
						break;
						}
					}

				var aTarget = oFragment.firstChild.getElementsByTagName("ul");
				for ( var i = 0 ; i < aTarget.length ; i++ )
					{
					if (aTarget[i].getAttribute("class") == "ep_stats")
						{
						break;
						}
					}
				var aTarget = aTarget[i].getElementsByTagName("span");
				for ( var i = 0 ; i < aTarget.length ; i++ )
					{
					if (aTarget[i].innerHTML == "Season:")
						{
						episodeData.season = aTarget[i].nextSibling.nodeValue.trim();
						}
					if (aTarget[i].innerHTML == "Episode:")
						{
						episodeData.episode = aTarget[i].nextSibling.nodeValue.trim();
						}
					}
				var aTarget = oFragment.firstChild.getElementsByTagName("h2");
				for ( var i = 0 ; i < aTarget.length ; i++ )
					{
					if (aTarget[i].getAttribute("class") == "module_title")
						{
						if (aTarget[i].innerHTML != "LATEST NEWS")
							{
							episodeData.title = aTarget[i].innerHTML.trim();
							break;
							}
						}
					}
				var aTarget = oFragment.firstChild.getElementsByTagName("p");
				for ( var i = 0 ; i < aTarget.length ; i++ )
					{
					if (aTarget[i].getAttribute("class") == "deck")
						{
						aTarget[i].removeChild(aTarget[i].getElementsByTagName("a")[0]);
						episodeData.summary = aTarget[i].innerHTML.trim();
						break;
						}
					}

				TV.episodeDetails.dataCache.push(episodeData);

				if (TV.episodeListing.summaryPopup.elements.container.id == "ep_summary_" + episodeData.id)
					{
					TV.episodeListing.summaryPopup.show(episodeData);
					}

				GM_log("_@/ tv.com GM_xmlhttpRequest");
				};

			GM_xmlhttpRequest({
				method:"GET",
				url:sURL,
				headers: {
					"User-Agent":"Mozilla/5.0",
					"Accept":"text/xml"
			  },
				onload:GM_xmlhttpRequest_onload
			});

			}
			catch(error){ GM_logError(error); }},

// -------------------------------------------------------------------------------------------------
// onCreate

			onCreate: function() { try
			{
			this.elements = {
				container: document.createElement("div")
			};
			with (this.elements.container)
				{
				setAttribute("style", "position:absolute; left:0px; top:0px; background-color:white; border:1px solid #C7C7C7; width:0px; padding:10px; display:none; ");
				}
			document.body.appendChild(this.elements.container);
			}
			catch(error){ GM_logError(error); }}

		},
// TV.episodeListing.summaryPopup
// =================================================================================================


// -------------------------------------------------------------------------------------------------
// onCreate

		onCreate: function() { try
		{
		this.settings = this.parent.settings;
		this.nowViewing = this.parent.nowViewing;

		this.summaryPopup.onCreate();

		if (this.nowViewing.episodes.listings)
			{
			this.formatDocument();
			}
		}
		catch(error){ GM_logError(error); }}

	},

// TV.episodeListing
// =================================================================================================



	images: {

		favicons: {

			googleCalendar: "data:image/png;base64," + // http://www.google.com/calendar/images/favicon.ico
			"iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAABkUlEQVR4nGNkAIIFWzb9Z2BkYPgP4oAIRiDxn5GBEUqDxRnAShgg" +
			"BANDgrc/I+PcjWv/nxdwZyAVGL7fycA4Y9WK/8VXbRhSfAVAljDMu8HNkKT5lWHWln84NTL9+snQp7+XgXHK0kX/S66Hk2xzj8ZK" +
			"BsYJ82b9z0tIJVnzpAVzGBi7p0/5X5yeDQwcYJD8R0juPn4Op0ZXSyOGnplTGRjbJvT+L8stgoQikua9J84xuFkZMVxs6WLQ37ON" +
			"4f2nLwyCleUMu6SVGZwtjBi6JvcyMDZ0tv2vKKxkOHgau02mOWkMd5LTwWyVuTMZTk+ZxWBvasTQ2d/GwPT750+GP/8gVoJswkab" +
			"6qiBaUE+HjANUv/r5y8GxvLq8v+VVe0MJy+cx2qz+L49DHLrVoHZj4LCGF46uTCYGxgytLVVMjAWlxX+r6jrYTh38QLYpl3HzuGk" +
			"jfQN4IZ2NJYyMOYX5PyvbJzIcPHKBZyhCwP6OgjNbfX5DIzZOen/q1umQZI0Qe0I0FqTxcCYmZHyn7BS7AAAAmaahbdRlvAAAAAA" +
			"SUVORK5CYII=",

			TV: "data:image/x-icon;base64," +
			"AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2F" +
			"ANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ%2BRgDx0MEA%2FPLxAP%2F99wDmkmsAMzMzMzMzMzMxERERER" +
			"EREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL%2B" +
			"EzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

			thePirateBay: "data:image/png;base64," + // http://www.favicon.cc/favicon/973/45/favicon.png
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAD" +
			"CklEQVRIx8VVTaupURR+8BL5/p4oEcoAKR8Zysg/MFEyYMKAn2Bi6gf4+AnEQJKUKAbKQDExMUGZCCVh34H22cU595zuvXXXZLXX" +
			"Xu/aaz3rWesF/rPwXg2LxWKxWBCSz+fz+TxwuVwulwvA5/P5fP7PAxNCCCHsnEqlUqkUEIvFYrEY7+Nd7vXD+Xw+n8+Bdrvdbrf/" +
			"XaUajUaj0bzb3xLgOI7juHdHoVAoFAqB+/1+v98BtVqtVqvZ+Xg8Ho9H5v94PB6PB0NCJBKJRKL3uN+C6nK5XC4XMJ1Op9MpEI/H" +
			"4/E4UKvVarUaMJlMJpMJkEwmk8kkUK/X6/U6UCwWi8Xi1y35EoFXR4lEIpFIAK1Wq9Vqgev1er1egWw2m81mAbFYLBaLgdvtdrvd" +
			"gEwmk8lkWCtfEflWyuVyuVymKTCtVCqVSuW7/VXL5XK5XE6IQCAQCATMHggEAoHAOwY/5vXhcDgcDoDZbDabzYBUKpVKpeze4XA4" +
			"HA42NZQbVM7n8/l8/oQDT6gIyeVyuVyOEArlswLmGAwGg8Eg4Pf7/X4/oFKpVCoVuw+FQqFQiPlRklIxGAwGg+E9AV6/3+/3+4SE" +
			"w+FwOAwUCoVCoQDIZDKZTAYYjUaj0cgCnk6n0+nEek45QzXlDN0bVPt8Pp/PBzSbzWazCQyHw+FwCHDdbrfb7bKMngkx0lgsFovF" +
			"ArjdbrfbDUQikUgkAng8Ho/Hw+PhCxmNRqPRiJDlcrlcLoFqtVqtVoFSqVQqldh08TqdTqfTIaTVarVaLcbedDqdTqeB2Ww2m82A" +
			"SqVSqVSA/X6/3+8BnU6n0+kAu91ut9uB7Xa73W4ZB2w2m81mA0wmk8lkAna73W63Y36UIx8VbDabzWZDiNPpdDqdrMdWq9VqtQJ6" +
			"vV6v1wMKhUKhUDDSUaToPqAV07H1er1erxdoNBqNRoMhmEgkEonEJ9A9Vyb9F3y2On4mg8FgMBgQ8tz9bBzH4/F4PP5N3F6v1+v1" +
			"/vzhV1mv1+v1mpBoNBqNRglZrVar1erfxf9r+QU9br7mPZBOigAAAABJRU5ErkJggg=="

		}

	},



// -------------------------------------------------------------------------------------------------
// onCreate

	onCreate: function() { try
	{
	this.nowViewing.episodes.parent = this.nowViewing;

	this.episodeDetails.dataCache.load();

	with (this.settings)
		{
		with (addCategory("general"))
			{
			headerText = "General";
			columnIndex = 0;
			addSetting("remove-cnet-content", { type:"boolean" , defaultValue:true , labelText:"Remove non-TV.com CNET content" });
			addSetting("format-dates-iso8601", { type:"boolean" , defaultValue:true , labelText:"IS0 8601 date formatting" });
			}
		with (addCategory("episode-listings"))
			{
			headerText = "Episode Listings";
			columnIndex = 0;
			addSetting("add-episode-number", { type:"boolean" , defaultValue:true , labelText:"Add Episode numbers starting at 1" });
			addSetting("create-google-calendar-links", { type:"boolean" , defaultValue:true , labelText:"Create links to Google Calendar" });
			addSetting("create-torrent-links", { type:"boolean" , defaultValue:true , labelText:"Create torrent search links" });
			addSetting("ajax-episode-summary", { type:"boolean" , defaultValue:true , labelText:"Show episode summaries on mouseover" });
			}
		}

	this.settingsPanel.parent = this;
	this.settingsPanel.onCreate();

	this.removeElements();
	this.formatDocument();

	this.episodeListing.parent = this;
	this.episodeListing.onCreate();

	this.episodeDetails.parent = this;
	this.episodeDetails.onCreate();
	}
	catch(error){ error.method = "onCreate"; GM_logError(error); }}

};
TV.onCreate();
GM_log("_@/ tv.com");
// =================================================================================================


