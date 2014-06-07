// ==UserScript==
// @name           _@/ mininova
// @author         Chris Porter
// @version        0.7b
// @date           2009-11-14
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.mininova.org/*
// ==/UserScript==

var GM_consoleLineOffset = 10 /* current line number */; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset) + (arguments[0].description != undefined ? " (" + arguments[0].description + ")" : "")); };
Math._round = Math.round; Math.round = function(x, dp) { if (dp == undefined) return this._round(x); var pow = this.pow(10, dp); var n = this._round(x * pow) / pow; var s = n.toString(); if (s.indexOf(".") < 0) s += "."; while (s.indexOf(".") - (s.length - dp) >= 0) s += "0"; return s; };
var _parseInt = parseInt; parseInt = function(string, radix){ return _parseInt(string, radix || 10); }
// http://h1.ripway.com/crazysnailboy/javascript/document-0.1.2.js
document._createElement=document.createElement;document.createElement=function(tagName,attributes){var element=this._createElement(tagName);if(attributes!=undefined){for(var attribute in attributes){if(attributes.hasOwnProperty(attribute)){switch(attribute){case"innerHTML":element.innerHTML=attributes[attribute];break;default:element.setAttribute(attribute,attributes[attribute])}}}}return element};
document._evaluate=document.evaluate;document.evaluate=function(xpathExpression,contextNode,resultType){if(resultType==undefined){resultType=XPathResult.ANY_TYPE}if(contextNode==null){contextNode=this}var result=this._evaluate(xpathExpression,contextNode,null,resultType,null);switch(resultType){case XPathResult.NUMBER_TYPE:return result.numberValue;case XPathResult.STRING_TYPE:return result.stringValue;case XPathResult.BOOLEAN_TYPE:return result.booleanValue;case XPathResult.ANY_UNORDERED_NODE_TYPE:case XPathResult.FIRST_ORDERED_NODE_TYPE:return result.singleNodeValue;default:return result}return result};
document.getElementByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.FIRST_ORDERED_NODE_TYPE);return x};
document.getElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.ORDERED_NODE_ITERATOR_TYPE);var result=[],next;while(next=x.iterateNext()){result.push(next)}return result};
document.removeElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);for(var i=0;i<x.snapshotLength;i++){x.snapshotItem(i).parentNode.removeChild(x.snapshotItem(i))}return i};
// http://h1.ripway.com/crazysnailboy/javascript/string-0.4.js
if(!String.prototype.left){String.prototype.left=function(iLen){return this.substr(0,iLen)}}if(!String.left){String.left=function(sInput,iLen){return sInput.substr(0,iLen)}}
if(!String.prototype.right){String.prototype.right=function(iLen){return this.substr(this.length-iLen,iLen)}}if(!String.right){String.right=function(sInput,iLen){return sInput.substr(sInput.length-iLen,iLen)}}
if(!String.prototype.format){String.prototype.format=function(){var txt=this;for(var i=0;i<arguments.length;i++){var exp=new RegExp('\\{'+(i)+'\\}','gm');txt=txt.replace(exp,arguments[i])}return txt}}if(!String.format){String.format=function(){for(var i=1;i<arguments.length;i++){var exp=new RegExp('\\{'+(i-1)+'\\}','gm');arguments[0]=arguments[0].replace(exp,arguments[i])}return arguments[0]}}
if(!String.prototype.trim){String.prototype.trim=function(){var s=this.replace(/^\s\s*/,''),ws=/\s/,i=this.length;while(ws.test(this.charAt(--i)));return this.slice(0,i+1)}}



// =================================================================================================
// Mininova
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================


// =================================================================================================
// Settings and SettingsPanel
// =================================================================================================

// http://h1.ripway.com/crazysnailboy/javascript/settings-0.1.js
function Category(){this.setting={};return this};function Setting(){this.type=arguments[0].type;this.value=arguments[0].value;return this};var settings={category:{},linkObjects:function(){for(var c in settings.category){settings.category[c].name=c;
for(var s in settings.category[c].setting){settings.category[c].setting[s].name=s;settings.category[c].setting[s].category=c;settings.category[c].setting[s].id="userscript-setting--"+c+"--"+s;settings.category[c].setting[s].value=GM_getValue(settings.
category[c].setting[s].id,settings.category[c].setting[s].value)}}}};function PanelCategory(){this.setting={};this.headerText=arguments[0].headerText;this.columnIndex=arguments[0].columnIndex;if(this.helpText!=undefined)this.helpText=arguments[0].helpText;
return this}function PanelSetting(){this.labelText=arguments[0].labelText;if(arguments[0].style!=undefined)this.style=arguments[0].style;return this}var settingsPanel={category:{},columnWidth:"250px",elements:{},CSS:[],panelExists:false,
linkObjects:function(){for(var c in this.category){this.category[c].name=c;for(var s in this.category[c].setting){this.category[c].setting[s].name=s;this.category[c].setting[s].category=c;this.category[c].setting[s].id="userscript-setting--"+c+"--"+s;
for(var p in settings.category[c].setting[s]){this.category[c].setting[s][p]=settings.category[c].setting[s][p]}}}},};settingsPanel.loadSettings=function(){try{for(var c in this.category){for(var s in this.category[c].setting){var setting=this.category[c].setting[s];
var element=document.getElementById(setting.id);switch(setting.type){case"boolean":element.checked=(setting.value==true);break;case"int":element.value=setting.value;break;case"string":element.value=setting.value;break}}}}catch(error){GM_logError(error)}};
settingsPanel.createLink=function(){try{this.elements.panelLink=document.createElement("a",{innerHTML:"_@/",href:"#",onclick:"return false;"});this.elements.panelLink.addEventListener("click",function(event){if(!settingsPanel.panelExists){settingsPanel.
createPanel();settingsPanel.panelExists=true}else{settingsPanel.elements.panelContainer.style.display=((settingsPanel.panelVisible)?"none":"block")}if(settingsPanel.panelVisible);{settingsPanel.loadSettings();settingsPanel.elements.panelContainer.style.top=
Math.floor((window.innerHeight-parseInt(settingsPanel.elements.panelContainer.offsetHeight))/2)+"px";settingsPanel.elements.panelContainer.style.left=Math.floor((window.innerWidth-parseInt(settingsPanel.elements.panelContainer.offsetWidth))/2)+"px"}},
true);document.getElementByXPath("//div[@id='navigation']/ul").appendChild(document.createElement("li")).appendChild(this.elements.panelLink)}catch(error){GM_logError(error)}};settingsPanel.createPanel=function(){try{var HTML=[];
HTML.push("<table border=0 cellpadding=0 cellspacing=0>");HTML.push("<thead><tr><th colspan='3'><h1>Userscript Settings</h1></th></tr></thead>");HTML.push("<tbody><tr>");HTML.push("<td style='padding-right:10px; width:"+this.columnWidth+";'>");
var columnIndex=0;for(var c in this.category){if(this.category[c].columnIndex!=columnIndex){HTML.push("</td>");HTML.push("<td style='padding-right:10px; width:"+this.columnWidth+";'>");columnIndex=this.category[c].columnIndex}HTML.push("<table border=0 cellpadding=0 cellspacing=0>");
HTML.push("<tr><td colspan='2'><h2>"+this.category[c].headerText+"</h2>");if(this.category[c].helpText!=""){HTML.push("<img src='"+""+"' width='11' height='12' class='help-icon' title='"+this.category[c].helpText+"' />")}HTML.push("</td></tr>");
for(var s in this.category[c].setting){var setting=this.category[c].setting[s];if(setting.style!=undefined)this.CSS.push("div#userscript-settings-panel #"+setting.id+" { "+setting.style+" } ");if(setting.HTML!=undefined){HTML.push(setting.HTML)}else
{switch(setting.type){case"boolean":HTML.push("<tr>");HTML.push("<td><input type='checkbox' id='"+setting.id+"'/></td>");HTML.push("<td><label for='"+setting.id+"'>"+setting.labelText+"</label></td>");HTML.push("</tr>");break;case"string":HTML.push("<tr>");
HTML.push("<td colspan='2'><textarea id='"+setting.id+"'></textarea></td>");HTML.push("</tr>");break}}}HTML.push("</table>")}HTML.push("</td>");HTML.push("</tr></tbody>");HTML.push("<tfoot>");HTML.push("<tr>");HTML.push("<td colspan='2'>");
HTML.push("<input type='button' class='button' id='userscript-settings-ok-button' value='OK' />");HTML.push("<input type='button' class='button' id='userscript-settings-cancel-button' value='Cancel' />");HTML.push("</td>");HTML.push("</tr>");
HTML.push("</tfoot>");HTML.push("</table>");GM_addStyle(this.CSS.join("\n"));delete this.CSS;this.elements.panelContainer=document.createElement("div",{id:"userscript-settings-panel",innerHTML:HTML.join("\n")});document.getElementsByTagName("body")[0].
appendChild(this.elements.panelContainer);this.elements.panelContainer.style.height=(this.elements.panelContainer.firstChild.offsetHeight+5).toString()+"px";document.getElementById("userscript-settings-ok-button").addEventListener("click",function(event)
{for(var c in settingsPanel.category){for(var s in settingsPanel.category[c].setting){var setting=settingsPanel.category[c].setting[s];var element=document.getElementById(setting.id);switch(setting.type){case"boolean":setting.value=element.checked;break;
case"int":setting.value=parseInt(element.value);break;case"string":setting.value=element.value;break;default:break}GM_setValue(setting.id,setting.value)}}settingsPanel.elements.panelContainer.style.display="none"},true);
document.getElementById("userscript-settings-cancel-button").addEventListener("click",function(event){settingsPanel.elements.panelContainer.style.display="none"},true)}catch(error){GM_logError(error)}};



// =================================================================================================
// nowViewing
// =================================================================================================

var nowViewing = {

	homePage: (location.pathname == "/"),

	category: (location.pathname.indexOf("/cat/") == 0),
	categoryList: (location.pathname.indexOf("/cat-list/") == 0),
	comments: (location.pathname.indexOf("/com/") == 0),
	searchResults: (location.pathname.indexOf("/search/") == 0),
	subCategory: (location.pathname.indexOf("/sub/") == 0),
	today: (location.pathname.indexOf("/today/") == 0),
	torrentInfo: (location.pathname.indexOf("/tor/") == 0),
	userTorrents: (location.pathname.indexOf("/user/") == 0),
	yesterday: (location.pathname.indexOf("/yesterday/") == 0)

};


// -------------------------------------------------------------------------------------------------
// loadSettings

function loadSettings() { try
{
	settings.category["torrent-lists"] = new Category();
	with (settings.category["torrent-lists"])
	{
		setting["hide-seedless-trackers"] = new Setting({ type:"boolean" , value:true });
		setting["hide-seedless-trackers-value"] = new Setting({ type:"int" , value:1 });
		setting["hide-private-trackers"] = new Setting({ type:"boolean" , value:true });
		setting["show-comments-and-thanks"] = new Setting({ type:"boolean" , value:true });
		setting["format-dates-iso8601"] = new Setting({ type:"boolean" , value:true });
		setting["replace-leechers-with-peers"] = new Setting({ type:"boolean" , value:true });
		setting["create-ratio-column"] = new Setting({ type:"boolean" , value:false });
		setting["create-info-links"] = new Setting({ type:"boolean" , value:true });
	}
	settings.category["torrent-details"] = new Category();
	with (settings.category["torrent-details"])
	{
		setting["remove-smileys-from-comments"] = new Setting({ type:"boolean" , value:true });
	}
	settings.category["category-tabs"] = new Category();
	with (settings.category["category-tabs"])
	{
		setting["create-on-homepage"] = new Setting({ type:"boolean" , value:true });
		setting["create-on-today-and-yesterday"] = new Setting({ type:"boolean" , value:true });
	}
	settings.category["search-results"] = new Category();
	with (settings.category["search-results"])
	{
		setting["sort-by-seeds"] = new Setting({ type:"boolean" , value:false });
	}
	settings.category["appearance"] = new Category();
	with (settings.category["appearance"])
	{
		setting["replace-rss-icons"] = new Setting({ type:"boolean" , value:true });
		setting["gray-hidden-torrents"] = new Setting({ type:"boolean" , value:true });
	}
	settings.category["excluded-words"] = new Category();
	with (settings.category["excluded-words"])
	{
		setting["word-list"] = new Setting({ type:"string" , value:"" });
		setting["case-sensitive"] = new Setting({ type:"boolean" , value:false });
		setting["whole-words-only"] = new Setting({ type:"boolean" , value:false });
	}
	settings.category["excluded-categories"] = new Category();
	with (settings.category["excluded-categories"])
	{
		setting["category-list"] = new Setting({ type:"string" , value:"" });
	}
	settings.category["excluded-subcategories"] = new Category();
	with (settings.category["excluded-subcategories"])
	{
		setting["subcategory-list"] = new Setting({ type:"string" , value:"" });
	}

	settings.linkObjects();
	delete settings.linkObjects;
}
catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// createSettingsPanel

function createSettingsPanel() { try
{

	settingsPanel.category["torrent-lists"] = new PanelCategory({ headerText:"Torrent Lists" , columnIndex:0 });
	with (settingsPanel.category["torrent-lists"])
	{
		setting["format-dates-iso8601"] = new PanelSetting({ labelText:"IS0 8601 date formatting" });
		setting["hide-private-trackers"] = new PanelSetting({ labelText:"Hide private trackers" });
		setting["hide-seedless-trackers"] = new PanelSetting({ labelText:"Hide trackers with {0} or fewer seeds" });
		setting["hide-seedless-trackers-value"] = new PanelSetting({ style:"border:1px solid #AAAAAA; font-size:10px; margin-left:5px; position:relative; top:-1px;" });
		setting["create-info-links"] = new PanelSetting({ labelText:"Create IMDB links on movies" });
		setting["show-comments-and-thanks"] = new PanelSetting({ labelText:"Show numbers of comments and thanks" });
		setting["replace-leechers-with-peers"] = new PanelSetting({ labelText:"Replace the word \"Leechers\" with \"Peers\"" });
		setting["create-ratio-column"] = new PanelSetting({ labelText:"Create column for seeds/peers ratio" });
	}
	settingsPanel.category["torrent-details"] = new PanelCategory({ headerText:"Torrent Details" , columnIndex:0 });
	with (settingsPanel.category["torrent-details"])
	{
		setting["remove-smileys-from-comments"] = new PanelSetting({ labelText:"Remove smileys from comments" });
	}
	settingsPanel.category["category-tabs"] = new PanelCategory({ headerText:"Category Tabs" , columnIndex:0 });
	with (settingsPanel.category["category-tabs"])
	{
		setting["create-on-homepage"] = new PanelSetting({ labelText:"Tabs on home page" });
		setting["create-on-today-and-yesterday"] =  new PanelSetting({ labelText:"Tabs on todays and yesterdays torrents" });
	}
	settingsPanel.category["search-results"] = new PanelCategory({ headerText:"Search Results" , columnIndex:0 });
	with (settingsPanel.category["search-results"])
	{
		setting["sort-by-seeds"] = new PanelSetting({ labelText:"Sort results by seeds" });
	}
	settingsPanel.category["appearance"] = new PanelCategory({ headerText:"Appearance" , columnIndex:0 });
	with (settingsPanel.category["appearance"])
	{
		setting["replace-rss-icons"] = new PanelSetting({ labelText:"Replace RSS icons" });
		setting["gray-hidden-torrents"] = new PanelSetting({ labelText:"Hidden torrents are greyed out when visible" });
	}
	settingsPanel.category["excluded-words"] = new PanelCategory({ headerText:"Excluded Words" , columnIndex:1 , helpText:"Enter one word or phrase per line" });
	with (settingsPanel.category["excluded-words"])
	{
		setting["word-list"] =new PanelSetting( { style:"width:250px; height:100px;" });
		setting["case-sensitive"] = new PanelSetting({ labelText:"Excluded words are case sensitive" });
	}
	settingsPanel.category["excluded-categories"] = new PanelCategory({ headerText:"Excluded Categories" , columnIndex:1 , helpText:"Enter one category name or number per line" });
	with (settingsPanel.category["excluded-categories"])
	{
		setting["category-list"] = new PanelSetting({ style:"width:250px; height:55px;" });
	}
	settingsPanel.category["excluded-subcategories"] = new PanelCategory({ headerText:"Excluded Sub-categories" , columnIndex:1 , helpText:"Enter one sub-category name or number per line, with names in the format Category\\Subcategory" });
	with (settingsPanel.category["excluded-subcategories"])
	{
		setting["subcategory-list"] = new PanelSetting({ style:"width:250px; height:75px;" });
	}

	settingsPanel.linkObjects();

	settingsPanel.category["torrent-lists"].setting["hide-seedless-trackers"].__defineGetter__("HTML",
		function()
		{
			if (this._HTML == undefined)
			{
				var a = [];
				a.push("<tr>");
				a.push("<td><input type='checkbox' id='{0}'/></td>");
				a.push("<td>");
				a.push("<table border=0 cellpadding=0 cellspacing=0 style='margin:0px; padding:0px;'><tr>");
				a.push("<td style='margin:0px; padding:0px;'><label for='{0}'>Hide trackers with </label></td>");
				a.push("<td style='margin:0px; padding:0px;'><input type='textbox' id='{1}' size='2' value='' /></td>");
				a.push("<td style='margin:0px; padding:0px;'><label for='{0}'> or fewer seeds</label></td>");
				a.push("</tr></table>");
				a.push("</td>");
				a.push("</tr>");
				this._HTML = String.format(a.join(""), this.id, settingsPanel.category["torrent-lists"].setting["hide-seedless-trackers-value"].id);
			}
			return this._HTML;
		}
	);
	settingsPanel.category["torrent-lists"].setting["hide-seedless-trackers-value"].HTML = "";


	with (settingsPanel.CSS)
	{
		push("div#userscript-settings-panel { background-color:white; border:1px solid black; left:100px; padding:5px 10px; position:absolute; top:200px; } ");
		push("div#userscript-settings-panel h1 { background-color:#EFF3FB; border-bottom:1px dashed #204A87; font-size:11pt; padding:3px 10px; } ");
		push("div#userscript-settings-panel h2 { color:#204a87; display:block; font-size:11px; font-weight:bold; margin-bottom:2px; } ");
		push("div#userscript-settings-panel tbody td label { color:black; font-size:10px; font-weight:normal; padding-left:5px; } ");
		push("div#userscript-settings-panel tbody td input { margin:0px; } ");
		push("div#userscript-settings-panel td { vertical-align:top; } ");
		push("div#userscript-settings-panel td table { margin-bottom:5px; width:100%; } ");
		push("div#userscript-settings-panel td table td { padding-bottom:3px; padding-right:0px; } ");
		push("div#userscript-settings-panel tfoot td { padding-top:5px; padding-right:10px; text-align:right; } ");
		push("div#userscript-settings-panel input[type='button'] { margin-left:5px; padding-bottom:2px; width:60px; } ");
		push("div#userscript-settings-panel textarea { font-family:Verdana; font-size:10px; } ");
		push("div#userscript-settings-panel img.help-icon { float:right; margin-top:-14px; } ");
	}

	settingsPanel.createLink();


} catch(error){ GM_logError(error); }}



// =================================================================================================
// images
// =================================================================================================

var images = {

	favicons: {

		IMDB: {
			colour: "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVR4nK2TQQ4DIQhFheCJupnzdMGhWPQ8XbQnsokVqdYhM02MJZlBMe8LqEBEYcVwif6HQM8/pVeeAWMkUA/agwo/eW7ri1QRyDl8YCnfjDcRbDvHjU593G4dsriYQGGxT8b6KvC1dL/uYqMI9nQc" +
			"8MtMkJpACEdZ+IxMVNy8nEJ+sDu+oUm7sTdbQ6tNDgA/9p5rJloCtHrOYXbr3JoKMDymqZuosP7IB2Zt+TG9AbL/PkFSMv4WAAAAAElFTkSuQmCC",
			grayscale: "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAAuUlEQVQ4y61TuxHDIAx94iipvAIzvAE8vwpPoBWo6EmRwAmfnQvnvEZI8PRDkhgjniA8Yv/DwcjfzNoKMecsACAxRphZK6UsRd62" +
			"DTlnCZ1cawWAn2UpBWbWQo+87/utJImU0tC9k9AVD5KTrqqTzTsJ3fOZ8A2qOjIMvq47kISqjnddBwA5jmP6vlrrqNefz+h3geTU4Svy1U+klEDyPQcAmq/7lyw+TRVxy7Q0iQAEcKPcDat4vEwvdoV79LNTamoAAAAASUVORK5CYII="
		}

	},

	rssIcons14: // http://sean.members.winisp.net/posts/icons/feed-icon16x16.png
	"data:image/png;base64,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",

	rssIcons28: // http://sean.members.winisp.net/posts/icons/feed-icon32x32.png
	"data:image/png;base64,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",

};


// =================================================================================================
// eventHandlers
// =================================================================================================

var eventHandlers = {


// -------------------------------------------------------------------------------------------------
// onShowHideLinkClick

	onShowHideLinkClick: function(event)
	{
		var hidden = (event.target.innerHTML == "show");
		var position = event.target.getAttribute("position");

		var elements = document.getElementsByXPath("//table[@class='maintable' and position()=" + position + "]/tbody/tr[@hidden-torrent]");
		elements.forEach(function(element){ element.style.display = ((hidden) ? "table-row" : "none"); });


		var setRowColours = eval(event.target.getAttribute("setRowColours"));
		setRowColours(position);

		event.target.innerHTML = ((hidden) ? "hide" : "show");
	},


// -------------------------------------------------------------------------------------------------
// onTorrentInfoLinkClick

	onTorrentInfoLinkClick: function(event)
	{
		var elements = { image: event.target };
		elements.image.style.opacity = "0.3";

		var xmlhttpRequest = {
			method:"GET",
			url: document.getElementByXPath("a[starts-with(@href,'/tor/')]", document.getElementByXPath("ancestor::td", elements.image)).href,
			onload: function(xmlhttpResponse)
			{

				// get the URL of the films' IMDB page
				var url = xmlhttpResponse.responseText.match(/http\:\/\/(www\.)?imdb.com\/title\/tt\d+/)[0];

				// detach the event listener from the image
				elements.image.removeEventListener("click", eventHandlers.onTorrentInfoLinkClick, false);
				elements.image.style.opacity = "1.0";

				// wrap the image in an anchor element pointing to the URL of the IMDB page
				elements.link = document.createElement("a", { href:xmlhttpResponse.responseText.match(/http\:\/\/(www\.)?imdb.com\/title\/tt\d+/)[0] , target:"_blank" });
				elements.image.parentNode.insertBefore(elements.link, elements.image);
				elements.link.appendChild(elements.image);

				// open the films' IMDB page in a new tab
				GM_openInTab(url);
			}
		};
		GM_xmlhttpRequest(xmlhttpRequest);
	}

};


// -------------------------------------------------------------------------------------------------
// removeElements

function removeElements() { try
{
	var aXPath = [];

	// remove ads
	aXPath.push("//div[@id='sidebar']");
	aXPath.push("//div[starts-with(@id,'adspot')]");
	// toolbar ad
	aXPath.push("//p[@id='banner-toolbar']");
	// remove smileys from comments
	if ((nowViewing.comments) && (settings.category["torrent-details"].setting["remove-smileys-from-comments"].value == true)) aXPath.push("//img[contains(@src,'/images/smilies/')]");

	document.removeElementsByXPath(aXPath.join(" | "));
}
catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// formatDocument

function formatDocument() { try
{
	var aCSS = [];

	aCSS.push("a { color:#204a87; }");
	aCSS.push("div#content { margin-right:0px; }");


	// ---------------------------------------------------------------------------
	// elements

	var elements = {
		tables: document.getElementsByXPath("//table[@class='maintable']"),
		tableHeaders: [],
	};
	if (nowViewing.homePage || nowViewing.today || nowViewing.yesterday)
	{
		elements.tableHeaders = document.getElementsByXPath("//div[@id='content']/div[@class='catheader']");
		elements.categoryHeaderLinks = document.getElementsByXPath("//div[@id='content']/div[@class='catheader']/h2/a[1]");
	}
	if (nowViewing.searchResults || nowViewing.subCategory || nowViewing.categoryList || nowViewing.userTorrents)
	{
		elements.tableHeaders = document.getElementsByXPath("//div[@id='content']/h1");
	}
	if (nowViewing.searchResults)
	{
		elements.selectedCategoryLink = document.getElementByXPath("//ul[@id='tabs']/li[@class='current']/a");
	}



	// ---------------------------------------------------------------------------
	// formatSearchForm

	var formatSearchForm = function()
	{
		// sort search results by seeds
		if (settings.category["search-results"].setting["sort-by-seeds"].value == true)
		{
			var frmSearch = document.getElementByXPath("//form[@id='searchform']");
			// don't allow the search form to submit
			frmSearch.setAttribute("onsubmit", "return false;");
			// instead, intercept the onsubmit event and redirect to a custom URL based on the form criteria
			frmSearch.addEventListener("submit",
			function(event)
			{
				location.href = String.format("http://www.mininova.org/search/{0}/{1}/seeds",
					document.getElementById("search").value.split(" ").join("%2B"),
					document.getElementByXPath("//select[@name='cat']").value
				);
			}
			,true);
			// disable the search button's standard onclick handler
			var btnSearch = document.getElementByXPath("//form[@id='searchform']/button[@class='btn']");
			btnSearch.setAttribute("onclick", "");
		}

		// blur the search box if it's empty to aid page scrolling
		var oSearchBox = document.getElementByXPath("//div[@id='header']/form[@id='searchform']/input[@id='search']");
		if (oSearchBox.value == "") oSearchBox.blur();

	};


	// ---------------------------------------------------------------------------
	// createCategoryTabs

	var createCategoryTabs = function()
	{
		aCSS.push("#userscript-jumptocat { float:left; padding:0.2em 0.4em 0.2em 0; }");
		aCSS.push("ul#tabs li { margin-left:0.1em; margin-right:0.1em; }");

		var oTarget = document.getElementByXPath("//div[@id='content']/h1/following-sibling::*[1]");
		oTarget.parentNode.insertBefore(document.createElement("span", { id:"userscript-jumptocat" , innerHTML:"Jump to category:" }), oTarget);

		var oUL = document.createElement("ul", { id:"tabs" });
		var i = 0; var length = elements.categoryHeaderLinks.length;
		do
		{
			var element = elements.categoryHeaderLinks[i];
			var sText = element.innerHTML;
			var sName = sText.toLowerCase().replace(" ", "");
			// add a list item to the category header tabs list
			oUL.appendChild(document.createElement("li", { innerHTML:"<a href=\"#"  + sName + ">" + sText + "</a>" }));
			// create named anchor elements before each category header link
			element.parentNode.insertBefore(document.createElement("a", { name:sName }), element);
			i++;
		}
		while (i < length);

		oTarget.parentNode.insertBefore(oUL, oTarget);

		if (nowViewing.homePage)
		{
			var oTarget = document.getElementByXPath("//div[@id='content']/br[1]");
			oTarget.parentNode.removeChild(oTarget);
		}
		if ((nowViewing.today) || (nowViewing.yesterday))
		{
			var oTarget = document.getElementById("jumptocat");
			oTarget.parentNode.removeChild(oTarget);
		}
	};


	// ---------------------------------------------------------------------------
	// setColumnWidths

	var setColumnWidths = function()
	{
		//  create <colgroup> and <col> elements to control the column widths
		var a = (settings.category["torrent-lists"].setting["create-ratio-column"].value ? [7, 65, 7, 4, 4, 3] : [7, 66, 7, 5, 5]);
		var element = document.createElement("colgroup");
		var i = 0;
		do
		{
			element.appendChild(document.createElement("col", { width:a[i]+"%" }));
			i++;
		}
		while (i < a.length);
		// apply a clone of the <colgoup> element to each table on the page
		var i = elements.tables.length-1;
		do
		{
			var target = elements.tables[i];
			target.insertBefore(element.cloneNode(true), target.firstChild);
		}
		while (i--);
	};


	// ---------------------------------------------------------------------------
	// formatColumnHeaders

	var formatColumnHeaders = function()
	{
		var a = document.getElementsByXPath("//table[@class='maintable']/tbody/tr[1]/th[a[text()='Size' or text()='Seeds' or text()='Leechers']] | //table[@class='maintable']/tbody/tr[1]/th[text()='Size' or text()='Seeds' or text()='Leechers']");
		var b = settings.category["torrent-lists"].setting["replace-leechers-with-peers"].value;
		var i = a.length-1;
		do
		{
			var e = a[i];
			// right align the size, seeds and leechers column headers
			e.style.textAlign = "right";
			// change the text on the "Leechers" column headers to say "Peers"
			if (b)
			{
				if (e.tagName == "TH" && e.firstChild.tagName == "A") e = e.firstChild;
				if (e.innerHTML == "Leechers")
				{
					e.innerHTML = "Peers";
					if (e.tagName == "A") e.title = "Sort by Peers";
				}
			}
		}
		while (i--);

	};


	// ---------------------------------------------------------------------------
	// formatDateColumn

	var formatDateColumn = function()
	{
		// ISO 8601 date formatting on added dates
		var s;
		var elements = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td[1]");
		elements.forEach(function(element)
		{
			var a = element.innerHTML.split("&nbsp;");
			switch(a[1])
			{
				case "Jan": s = "01"; break;
				case "Feb": s = "02"; break;
				case "Mar": s = "03"; break;
				case "Apr": s = "04"; break;
				case "May": s = "05"; break;
				case "Jun": s = "06"; break;
				case "Jul": s = "07"; break;
				case "Aug": s = "08"; break;
				case "Sep": s = "09"; break;
				case "Oct": s = "10"; break;
				case "Nov": s = "11"; break;
				case "Dec": s = "12"; break;
			}
			element.innerHTML = "20" + a[2] + "-" + s + "-" + a[0];
		});
	};


	// ---------------------------------------------------------------------------
	// formatCategoryColumn

	var formatCategoryColumn = function()
	{
		// prevent text-wrapping on category names in search results
		var table = elements.tables[0];
		var cells = document.getElementsByXPath("tbody/tr/td[2]", table);
		var target = table.nextSibling;
		table.parentNode.removeChild(table);
		var i = cells.length-1;
		do
		{
			cells[i].setAttribute("nowrap", "nowrap");
		}
		while (i--);
		target.parentNode.insertBefore(table, target);
		aCSS.push(".maintable td { vertical-align:top; }");
	};


	// ---------------------------------------------------------------------------
	// formatNameColumn

	var formatNameColumn = function()
	{
		// convert the blue "info" links into links to a movie's IMDB page
		if (settings.category["torrent-lists"].setting["create-info-links"].value == true)
		{
			var elements = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td/a[img[@src='/images/info.gif']]");
			elements.forEach(function(element)
			{
				// remove the info image and it's parent link, and replace with an image showing the IMDB favicon
				var _element = document.createElement("img", { src:images.favicons.IMDB.colour , alt:"Movie profile at IMDB.com" , class:"ti" , style:"cursor:pointer; margin-top:0.1em;" });
				element.parentNode.replaceChild(_element, element);
				_element.addEventListener("click", eventHandlers.onTorrentInfoLinkClick, true);
			});
			aCSS.push(".maintable a img.ti { margin:0px; }");
		}

		// display the number of comments and thanks instead of just the total combined number
		if (settings.category["torrent-lists"].setting["show-comments-and-thanks"].value == true)
		{
			var elements = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td/a[@class='ti com']");
			elements.forEach(function(element)
			{
				var title = element.getAttribute("title").toString().split(",");
				element.insertBefore( document.createElement("small", { innerHTML:"(" +  parseInt(title[0]) + "/" + parseInt(title[1]) + ")" , style:"visibility:visible !important; display:inline !important; padding-right:3px;" }), element.firstChild.nextSibling );
			});
		}

		// modify the subcategory links so pages are launched in date order
		var elements = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td[" + columnPosition.nameColumn + "]/small/strong/a[starts-with(@href,'/sub/')]");
		elements.forEach(function(element)
		{
			var href = element.getAttribute("href") + "/added";
			element.setAttribute("href", href);
		});



	};


	// ---------------------------------------------------------------------------
	// createRatioColumn

	var createRatioColumn = function()
	{
		// create ratio column headers
		var element = document.createElement("th", { innerHTML:"Ratio" , style:"text-align:right;" , title:"(Seeds/" + (settings.category["torrent-lists"].setting["replace-leechers-with-peers"].value == true ? "Peers" : "Leechers") + ")" });
		var elements = document.getElementsByXPath("//table[@class='maintable']/tbody/tr[th]");
		var i = elements.length-1;
		do
		{
			elements[i].appendChild(element.cloneNode(true));
		}
		while (i--);

		// create ratio column cells
		var seeds = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td[" + columnPosition.seedsColumn + "][text()='---'] | //table[@class='maintable']/tbody/tr/td[" + columnPosition.seedsColumn + "]/span[@class='r' or @class='g']");
		var peers = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td[" + columnPosition.peersColumn + "][text()='---'] | //table[@class='maintable']/tbody/tr/td[" + columnPosition.peersColumn + "]/span[@class='b']");
		var i = seeds.length-1;
		do
		{
			var seedCount = parseInt(seeds[i].innerHTML.replace("---", "0"));
			var peerCount = parseInt(peers[i].innerHTML.replace("---", "0"));
			var ratio = document.createElement("td", { innerHTML:Math.round((peerCount == 0 ? 0 : seedCount / peerCount), 2) , style:"text-align:right;" });
			document.getElementByXPath("ancestor::tr", seeds[i]).appendChild(ratio);
		}
		while (i--);
	};


	// ---------------------------------------------------------------------------
	// hideTorrents

	var hideTorrents = function()
	{
		var exclusions = {
			words: [],
			categories: [],
			subcategories: []
		};

		if (settings.category["excluded-words"].setting["word-list"].value != "")
		{
			var a = settings.category["excluded-words"].setting["word-list"].value.split("\n");
			var i = a.length - 1;
			do { var s = a[i].trim(); exclusions.words.push(s); } while (i--);
		}

		if (settings.category["excluded-categories"].setting["category-list"].value != "")
		{
			var a = settings.category["excluded-categories"].setting["category-list"].value.split("\n");
			var i = a.length - 1;
			do { var s = a[i].trim(); exclusions.categories.push(s); } while (i--);
		}

		if (settings.category["excluded-subcategories"].setting["subcategory-list"].value != "")
		{
			var a = settings.category["excluded-subcategories"].setting["subcategory-list"].value.split("\n");
			var i = a.length - 1;
			do
			{
				var s = a[i].trim();
				if (isNaN(s))
				{
					if (s.indexOf("\\") >= 0)
					{
						s = s.split("\\");
						exclusions.subcategories.push({ category:s[0] , subcategory:s[1] });
					}
				}
				else
				{
					exclusions.subcategories.push(s);
				}
			}
			while (i--);
		}

		// build xpath queries to identify all the torrents we want to hide
		var aXPath = [];

		if (settings.category["torrent-lists"].setting["hide-private-trackers"].value == true)
			{
			aXPath.push("//table[@class='maintable']/tbody/tr[td[" + columnPosition.nameColumn + "]/a/img[@src='/images/priv.gif']]");
			}

		if (settings.category["torrent-lists"].setting["hide-seedless-trackers"].value == true)
			{
			aXPath.push("//table[@class='maintable']/tbody/tr[td[position()=" + columnPosition.seedsColumn + " and text()='---']]");
			aXPath.push("//table[@class='maintable']/tbody/tr[td[" + columnPosition.seedsColumn + "]/span[((@class='r') or (@class='g')) and number(text())<=" + settings.category["torrent-lists"].setting["hide-seedless-trackers-value"].value + "]]");
			}

		var getCategoryPosition = function(category)
		{
			var i = 0; var length = elements.categoryHeaderLinks.length;
			do
			{
				var element = elements.categoryHeaderLinks[i];
				if ((isNaN(category) ? element.innerHTML == category : element.href == "http://www.mininova.org/cat/" + category) == true) return (i+1);
				i++;
			}
			while ( i < length );
			return -1;
		};

		// if we have categories or subcategories to hide and we're viewing search results, determine the currently selected category tab
		if ((nowViewing.searchResults) && ((exclusions.categories.length > 0) || (exclusions.subcategories.length > 0)))
		{
			var sSelectedCategoryName = elements.selectedCategoryLink.firstChild.nodeValue;
			var iSelectedCategoryNumber = parseInt(elements.selectedCategoryLink.href.substr(elements.selectedCategoryLink.href.lastIndexOf("/")+1, elements.selectedCategoryLink.href.length), 10);
		}

		if (exclusions.words.length > 0)
		{
			if (nowViewing.searchResults)
			{
				var s = exclusions.words.join("|");
				var r = new RegExp("(^(" + s + ")\\b)|(\\b(" + s + ")\\b)|(\\b(" + s + ")$)", "g");
				var aElements = document.getElementsByXPath("//table[@class='maintable']/tbody/tr/td[" + columnPosition.nameColumn + "]/a[starts-with(@href,'/tor/')]");
				aElements.forEach(function(oElement)
				{
					var sTextContent = oElement.textContent;
					if (sTextContent.search(r) >= 0)
					{
						GM_log(sTextContent);
						var torrentRow = oElement.parentNode.parentNode;
						torrentRow.setAttribute("hidden-torrent", "hidden-torrent");
						torrentRow.style.display = "none";
					}
				});
			}
			else
			{
				var i = exclusions.words.length-1;
				var a = [];
				do
				{
					var s = "contains({0},'{1}')";
					var exclusion = exclusions.words[i];
					a.push(settings.category["excluded-words"].setting["case-sensitive"].value == true ? s.format("text()", exclusion) : s.format("translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')", exclusion.toLowerCase()));
				}
				while (i--);
				aXPath.push("//table[@class='maintable']/tbody/tr[td[" + columnPosition.nameColumn + "]/a[starts-with(@href,'/tor/') and (" + a.join(" or ") + ")]]");
			}
		}

		if (exclusions.categories.length > 0)
		{
			if (nowViewing.homePage)
			{
				var i = exclusions.categories.length-1;
				var a = [];
				do
				{
					var exclusion = exclusions.categories[i];
					a.push(String.format((isNaN(exclusion) ? "text()='{0}'" : "@href='/cat/{0}'"), exclusion));
				}
				while (i--);
				aXPath.push("//table[@class='maintable' and position()=1]/tbody/tr[td[1]/a[" + a.join(" or ") + "]]");
			}
			if ((nowViewing.homePage) || (nowViewing.today) || (nowViewing.yesterday))
			{
				var i = exclusions.categories.length-1;
				var a = [];
				do
				{
					var exclusion = exclusions.categories[i];
					a.push("position()=" + getCategoryPosition(exclusion));
				}
				while (i--);
				aXPath.push("//table[@class='maintable' and (" + a.join(" or ") + ")]/tbody/tr[td]");
			}
			if (nowViewing.searchResults)
			{
				if ((exclusions.categories.indexOf(iSelectedCategoryNumber) > -1) || (exclusions.categories.indexOf(sSelectedCategoryName) > -1))
					{
					aXPath.push("//table[@class='maintable']/tbody/tr[td]");
					}
				if (["All", "Featured"].indexOf(sSelectedCategoryName) > -1)
				{
					var i = exclusions.categories.length-1;
					var a = [];
					do
					{
						var exclusion = exclusions.categories[i];
						a.push(String.format((isNaN(exclusion) ? "text()='{0}'" : "@href='/cat/{0}'"), exclusion));
					}
					while (i--);
					aXPath.push("//table[@class='maintable']/tbody/tr[td[2]/a[" + a.join(" or ") + "]]");
				}
			}
		}

		var length = exclusions.subcategories.length;
		if (length > 0)
		{
			var i = length-1;
			var a = [];
			do
			{
				var exclusion = exclusions.subcategories[i];
				if (!isNaN(exclusion))
				{
					a.push(String.format("@href='/sub/{0}'", exclusion));
					exclusions.subcategories.splice(i, 1);
				}
			}
			while (i--);
			if (a.length > 0) aXPath.push("//table[@class='maintable']/tbody/tr[td[" + columnPosition.nameColumn + "]/small/strong/a[" + a.join(" or ") + "]]");
		}

		var length = exclusions.subcategories.length;
		if (length > 0)
		{
			if (nowViewing.categoryList)
			{
				var currentCategory = document.evaluate("/html/body/div/div[@id='location']/a[starts-with(@href,'/cat/') and @href!='/cat/']/text()", null, XPathResult.STRING_TYPE);
				var i = length-1;
				var a = [];
				do
				{
					var exclusion = exclusions.subcategories[i];
					if (exclusion.category != currentCategory) continue;
					a.push(String.format("text()=\"{0}\"", exclusion.subcategory));
				}
				while (i--);
				if (a.length > 0) aXPath.push("//table[@class='maintable']/tbody/tr[td[" + columnPosition.nameColumn + "]/small/strong/a[" + a.join(" or ") + "]]");
			}
			else
			{
				var i = length-1;
				do
				{
					var exclusion = exclusions.subcategories[i];
					if (nowViewing.homePage)
					{
						aXPath.push(String.format("//table[@class='maintable' and position()=1]/tbody/tr[td[1]/a[text()='{0}']][td[2]/small/strong/a[text()=\"{1}\"]]", exclusion.category, exclusion.subcategory));
					}
					if (nowViewing.homePage || nowViewing.today || nowViewing.yesterday)
					{
						aXPath.push(String.format("//table[@class='maintable' and position()={0}]/tbody/tr[td[2]/small/strong/a[text()=\"{1}\"]]", getCategoryPosition(exclusion.category), exclusion.subcategory));
					}
				}
				while (i--);
			}
		}

//		aXPath.forEach(function(sXPath)
//		{
//			GM_log(sXPath);
//			GM_log(document.getElementsByXPath(sXPath).length);
//		});

		var torrentRows = document.getElementsByXPath(aXPath.join(" | "));
		torrentRows.forEach(
			function(torrentRow)
			{
				torrentRow.style.display = "none";
				torrentRow.setAttribute("hidden-torrent", "hidden-torrent");
			}
		);

		var setRowColours = function(position)
		{
			var i = 0;
			var setRowColour = function(element)
			{
				if (element.style.display != "none")
				{
					element.className = ((i % 2 == 1) ? "" : "d");
					i++;
				}
			};
			var xpathExpression = "//table[@class='maintable' and position()=" + position + "]/tbody/tr";
			document.getElementsByXPath(xpathExpression).forEach(setRowColour);
		};

		var i = elements.tableHeaders.length-1;
		do
		{
			var hiddenCount = document.evaluate("count(.//tr[@hidden-torrent])", elements.tables[i], XPathResult.NUMBER_TYPE);
			if (hiddenCount > 0)
			{
				var element = document.createElement("span", { innerHTML:"&nbsp;&nbsp;&nbsp;" + hiddenCount.toString() + " hidden torrent" + ((hiddenCount != 1) ? "s" : "") + "&nbsp;&nbsp;&nbsp;" , style:"color:#aaaaaa; font-size:small;" });
				elements.tableHeaders[i].appendChild(element);

				var element = document.createElement("a", { innerHTML:"show" , href:"#" , onclick:"return false;" , style:"color:#aaaaaa; font-style:italic; font-size:small;" , position:i+1 });
				elements.tableHeaders[i].appendChild(element);
				element.addEventListener("click", eventHandlers.onShowHideLinkClick, false);
				element.setAttribute("setRowColours", setRowColours.toSource() );

				setRowColours(i+1);
			}
		}
		while (i--);


		if (settings.category["appearance"].setting["gray-hidden-torrents"].value == true)
		{
			aCSS.push("tr[hidden-torrent] * { color:#808080 !important; }");
		}

	};


	// ---------------------------------------------------------------------------
	// formatRssImages

	var formatRssImages = function()
	{
		var smallIcons = [];
		var largeIcons = [];
		if (nowViewing.homePage || nowViewing.today || nowViewing.yesterday)
		{
			aCSS.push("a.rss, a.rss:hover { background:none; border:0px; height:14px; margin:0px; padding:0px; width:14px; }");
			aCSS.push("div.catheader a.rss { position:relative; top:2px; }");
			smallIcons = document.getElementsByXPath("//a[@class='rss']");
		}
		if (nowViewing.category)
		{
			aCSS.push("h1 a.rss.small { background:none; border:0px; height:28px; margin:0px; padding:0px; vertical-align:bottom !important; width:28px; }");
			aCSS.push("h1 a.rss.small { position:relative; top:-2px; }");
			aCSS.push("table.maintable a.rss { background:none; border:0px; height:14px; margin:0px; padding:0px; width:14px; }");
			aCSS.push("table.maintable a.rss img { margin-bottom:1px; margin-top:0px; vertical-align:middle; }");
			aCSS.push("div#footer a.rss { background:none; border:0px; height:14px; margin:0px; padding:0px; width:14px; }");
			largeIcons = document.getElementsByXPath("//div[@id='content']//a[@class='rss small']");
			smallIcons = document.getElementsByXPath("//div[@id='footer']//a[@class='rss'] | //table[@class='maintable']//a[@class='rss']");
		}
		if (nowViewing.searchResults || nowViewing.subCategory || nowViewing.userTorrents || nowViewing.categoryList)
		{
			aCSS.push("h1 a.rss.small { background:none; border:0px; height:28px; margin:0px; padding:0px; vertical-align:bottom !important; width:28px; }");
			aCSS.push("div#footer a.rss { background:none; border:0px; height:14px; margin:0px; padding:0px; width:14px; }");
			smallIcons = document.getElementsByXPath("//div[@id='footer']//a[@class='rss']");
			largeIcons = document.getElementsByXPath("//div[@id='content']//a[@class='rss small']");
		}
		aCSS.push("div#footer a.rss { position:relative; top:-2px; }");

		if (smallIcons.length > 0) smallIcons.forEach(function(element){ element.innerHTML = "<img src='" + images.rssIcons14 + "' width='14' height'14' />"; });
		if (largeIcons.length > 0) largeIcons.forEach(function(element){ element.innerHTML = "<img src='" + images.rssIcons28 + "' width='28' height'28' />"; });
	};



	// ---------------------------------------------------------------------------


	// create category header tabs on the homepage, todays torrents and yesterdays torrents pages
	if (((nowViewing.homePage) && (settings.category["category-tabs"].setting["create-on-homepage"].value == true)) ||
	(((nowViewing.today) || (nowViewing.yesterday)) && (settings.category["category-tabs"].setting["create-on-today-and-yesterday"].value == true)))
	{
		createCategoryTabs();
	}

	// copy the "show all torrents in [category]" link from below the category table to above it
	// also amend the links so they list torrents sorted by date
	if (nowViewing.category)
	{
		with (document.getElementByXPath("//div[@id='content']/p[a[starts-with(@href,'/cat-list/')]]"))
		{
			getElementsByTagName("a")[0].href += "/added";
			var element = cloneNode(true);
		}
		var target = document.getElementByXPath("//div[@id='content']/h1");
		target.parentNode.insertBefore(element, target.nextSibling);
	}

	if (elements.tables.length > 0)
	{
		var columnPosition = {};

//		var b = ((nowViewing.searchResults || nowViewing.userTorrents) && (["All", "Featured"].indexOf(elements.selectedCategoryLink.firstChild.nodeValue) > -1));
		var b = ((nowViewing.searchResults && ["All", "Featured"].indexOf(elements.selectedCategoryLink.firstChild.nodeValue) > -1) || (nowViewing.userTorrents));

		columnPosition.nameColumn = (b ? 3 : 2);
		columnPosition.seedsColumn = columnPosition.nameColumn + 2;
		columnPosition.peersColumn = columnPosition.nameColumn + 3;

		if (nowViewing.homePage || nowViewing.today || nowViewing.yesterday)
		{
			setColumnWidths();
		}
		if (!nowViewing.category)
		{
			formatColumnHeaders();
		}
		if ((nowViewing.searchResults || nowViewing.categoryList || nowViewing.subCategory || nowViewing.userTorrents) && (settings.category["torrent-lists"].setting["format-dates-iso8601"].value == true))
		{
			formatDateColumn();
		}
		if (nowViewing.searchResults || nowViewing.userTorrents)
		{
			formatCategoryColumn();
		}
		if (!nowViewing.category)
		{
			formatNameColumn();
			if (settings.category["torrent-lists"].setting["create-ratio-column"].value == true)
			{
				createRatioColumn();
			}
			if ((settings.category["torrent-lists"].setting["hide-private-trackers"].value == true) ||
			(settings.category["torrent-lists"].setting["hide-seedless-trackers"].value == true) ||
			(settings.category["excluded-words"].setting["word-list"].value != "") ||
			(settings.category["excluded-categories"].setting["category-list"].value != "") ||
			(settings.category["excluded-subcategories"].setting["subcategory-list"].value != ""))
			{
				hideTorrents();
			}
		}
		if (settings.category["appearance"].setting["replace-rss-icons"].value == true)
		{
			formatRssImages();
		}
	}

	// add the seed/peer ratio on the torrent details page
	if (nowViewing.torrentInfo)
	{
		var oSpan = document.getElementById("shareratio");
		var aSpan = oSpan.getElementsByTagName("span");
		if (aSpan.length == 2)
		{
			if (settings.category["torrent-lists"].setting["replace-leechers-with-peers"].value == true) aSpan[1].nextSibling.nodeValue = " peers";
			var iSeeds = aSpan[0].innerHTML; iSeeds = (isNaN(iSeeds) ? 0 : parseInt(iSeeds));
			var iPeers = aSpan[1].innerHTML; iPeers = (isNaN(iPeers) ? 0 : parseInt(iPeers));
			oSpan.innerHTML += " (Ratio: " + Math.round((iPeers == 0 ? 0 : iSeeds / iPeers), 2) + ")";
		}
	}

	formatSearchForm();

	GM_addStyle(aCSS.join("\n"));
}
catch(error){ GM_logError(error); }}


// =================================================================================================
// Mininova

function Mininova() { try
{
	var i1 = Date.now();

	loadSettings();
	createSettingsPanel();
	removeElements();
	formatDocument();

	var i2 = Date.now();

	GM_log("_@/ mininova" + " (" + (i2 - i1) + "ms)");

} catch(error){ GM_logError(error); }}
Mininova();
