// ==UserScript==
// @name           _@/ autosport
// @author         Chris Porter
// @version        0.3c
// @date           2010-01-30
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.autosport.com/*
// ==/UserScript==

var GM_consoleLineOffset = 10 /* current line number */; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset)); };

document._createElement=document.createElement;document.createElement=function(tagName,attributes){var element=this._createElement(tagName);if(attributes!=undefined){for(var attribute in attributes){if(attributes.hasOwnProperty(attribute)){switch(attribute){case"innerHTML":element.innerHTML=attributes[attribute];break;default:element.setAttribute(attribute,attributes[attribute])}}}}return element};
document._evaluate=document.evaluate;document.evaluate=function(xpathExpression,contextNode,resultType){if(resultType==undefined){resultType=XPathResult.ANY_TYPE}if(contextNode==null){contextNode=this}var result=this._evaluate(xpathExpression,contextNode,null,resultType,null);switch(resultType){case XPathResult.NUMBER_TYPE:return result.numberValue;case XPathResult.STRING_TYPE:return result.stringValue;case XPathResult.BOOLEAN_TYPE:return result.booleanValue;case XPathResult.ANY_UNORDERED_NODE_TYPE:case XPathResult.FIRST_ORDERED_NODE_TYPE:return result.singleNodeValue;default:return result}return result};
document.getElementByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.FIRST_ORDERED_NODE_TYPE);return x};
document.getElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.ORDERED_NODE_ITERATOR_TYPE);var result=[],next;while(next=x.iterateNext()){result.push(next)}return result};
document.removeElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);for(var i=0;i<x.snapshotLength;i++){x.snapshotItem(i).parentNode.removeChild(x.snapshotItem(i))}return i};

if(!String.prototype.trim){String.prototype.trim=function(){var s=this.replace(/^\s\s*/,''),ws=/\s/,i=this.length;while(ws.test(this.charAt(--i)));return this.slice(0,i+1)}}


// =================================================================================================
// Autosport
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================


// =================================================================================================
// nowViewing
// =================================================================================================

var nowViewing = {
	www: (location.hostname.indexOf("www.") == 0),
	live: (location.hostname.indexOf("live.") == 0)
};

if (nowViewing.www)
{
	nowViewing.www = {

		f1:
		((location.pathname == "/f1") || (
			(location.pathname.indexOf("/news/report.php") == 0) &&
			(document.getElementByXPath("/html/body/div/div/table/tbody/tr[3]/td/table/tbody/tr/td[@class='content']/b/font[contains(text(),'F1 NEWS')]") != null)
		)),
		motogp: (location.pathname == "/motogp"),

		newsItem: (location.pathname.indexOf("/news/report.php") == 0)

	};
}


// -------------------------------------------------------------------------------------------------
// identifyElements

function identifyElements() { try
{
	var elements = [];

	if (nowViewing.www.newsItem)
	{
		elements.push({ id:"content-container-table" , xpath:"/html/body/div/div/table/tbody/tr[5]/td/table[tbody/tr/td[@class='content']]" });
	}

	for ( var i = 0, l = elements.length ; i < l ; i++ )
	{
		var element = elements[i];
		document.getElementByXPath(element.xpath).id = element.id;
	}
}
catch(error){ GM_logError(error); }}



// -------------------------------------------------------------------------------------------------
// removeElements

function removeElements() { try
{
	var aXPath = [];

	if (nowViewing.www)
	{
		aXPath.push("//div[@id='headerbanner']"); // header ad above content
		aXPath.push("//div[@id='page']/div/table[1]/tbody/tr[2]"); // header ad and subscriber login container
		aXPath.push("//table[tbody/tr/td/font[@class='boxes'][contains(text(),'advertisement')]]");  // box ad in right hand column
		aXPath.push("//td[@class='content'][table/tbody/tr/td[@class='greybg'][contains(text(),'ADS BY GOOGLE')]]");  // "ads by google" section

		if (nowViewing.www.newsItem)
		{
			aXPath.push("//table[@id='content-container-table']/tbody/tr/td[7]/table[tbody/tr/td[contains(text(),'SPONSORED LINKS')]]");  // sponsored links box in right hand column
			aXPath.push("//td[@class='content']/div[@id='compad' or @id='geoad']"); // ads in news item footer
		}

	}

	if (aXPath.length > 0) document.removeElementsByXPath(aXPath.join(" | "));

}
catch(error){ GM_logError(error); }}



// =================================================================================================
// minorNewsHandler
// =================================================================================================

var minorNewsHander = {

	newsItems: {},

// ---------------------------------------------------------------------------------------
// eventHandlers

	eventHandlers: {

		onCollapseLinkClick: function(event) { try
		{
			var id = event.target.getAttribute("news-item-id");
			var newsItem = minorNewsHander.newsItems[id];
			newsItem.toggle();

		} catch(error){ GM_logError(error); }}

	},


// ---------------------------------------------------------------------------------------
// bind

	bind: function()
	{
		// identify all the minor news tables on the current page
		var elements = document.getElementsByXPath(".//td[7]/table[@class='news_minor'] | .//td[7]/div/table[@class='news_minor']", document.getElementById("content-container-table"));

		// for each minor news table found...
		for ( var i = 0, l = elements.length ; i < l ; i++ )
		{
			var element = elements[i];

			// create a newsItem object
			var newsItem = {

				id: document.evaluate(".//tr[1]/td/text() | .//tr[1]/td/div/text()", element, XPathResult.STRING_TYPE).trim(),
				index: null,

				elements: {
					container: element,
					headerCell: document.getElementByXPath(".//tr[1]/td", element),
					bodyRows: document.getElementsByXPath(".//tr[position()>1]", element)
				},

				get collapsed()
				{
					var currentState = (this.elements.container.style.marginBottom == "10px");
					var savedState = GM_getValue("minor-news-item__" + this.id + "__collapsed", currentState);
					return savedState;
				},
				set collapsed(value)
				{
					GM_setValue("minor-news-item__" + this.id + "__collapsed", value);
				},

				collapse: function()
				{
					this.elements.bodyRows.forEach(function(tr){ tr.style.display = "none"; });
					this.elements.container.style.marginBottom = "10px";
					this.elements.collapseLink.innerHTML = "&#x25bc;";
					this.collapsed = true;
				},
				expand: function()
				{
					this.elements.bodyRows.forEach(function(tr){ tr.style.display = "table-row"; });
					this.elements.container.style.marginBottom = "0px";
					this.elements.collapseLink.innerHTML = "&#x25b2;";
					this.collapsed = false;
				},
				toggle: function()
				{
					if (this.collapsed){ this.expand(); } else { this.collapse(); }
				}

			};


			// bind the newsItem object to the DOM
			newsItem.elements.container.setAttribute("news-item-id", newsItem.id);

			// create the expand/collapse link
			newsItem.elements.collapseLink = document.createElement("a", { href:"#" , onclick:"return false;" , style:"float:right; margin-right:5px;" });
			newsItem.elements.collapseLink.setAttribute("news-item-id", newsItem.id);
			newsItem.elements.collapseLink.innerHTML = (newsItem.collapsed ? "&#x25bc;" : "&#x25b2;");
			newsItem.elements.headerCell.appendChild(newsItem.elements.collapseLink);

			// add event listeners
			newsItem.elements.collapseLink.addEventListener("click", this.eventHandlers.onCollapseLinkClick, false);

			// collapse the news item if the saved state says it should be collapsed
			if (newsItem.collapsed == true){ newsItem.collapse(); }

			// add the newsItem object to the the newsItems collection
			this.newsItems[newsItem.id] = newsItem;

		}

	}

};





// -------------------------------------------------------------------------------------------------
// formatDocument

function formatDocument() { try
{
	var aCSS = [];

	if (nowViewing.www)
	{

		// hide the page background ad
		aCSS.push("body { background-color:white !important; background-image:none !important; }");
		aCSS.push("#page { background-image:none; cursor:auto !important; }");

		// disable the click handler for the page background ad
		document.getElementById('page').setAttribute("onclick", "");

		// make setting of the page alignment use a hidden iframe instead of a popup window
		var oTarget = document.getElementByXPath("//table[@class='navbar']/tbody/tr/td[10]/a");
		oTarget.setAttribute("onclick", "document.getElementById('userscript-postback-frame').src = this.href; return false;");
		var oIFrame = document.createElement("iframe" , { id:"userscript-postback-frame" , style:"visibility:hidden; display:none;" });
		document.body.appendChild(oIFrame);
		oIFrame.addEventListener("load", function(event) { if (event.target.src != "") { window.location.reload(); } }, true);

		// prevent news items from wrapping lines
		//document.getElementsByXPath("//table[@class='text_small']//td[font[@class='boxes' and @color='#808080']]").forEach(function(oTD){ oTD.style.whiteSpace = "nowrap"; });
		//document.getElementsByXPath("//table[@class='text_small']//td[a]").forEach(function(oTD){ oTD.style.whiteSpace = "nowrap"; oTD.style.paddingRight = "10px"; });

		if (nowViewing.www.newsItem)
		{
			// make right hand news tables collapsible
			minorNewsHander.bind();
		}

	}

	// strike through visited links
	aCSS.push(".content a:visited { text-decoration:line-through; }");

	// but not all of them :)
	var aXPath = [];
	aXPath.push("//a[text()='Go to the News Index']");
	aXPath.push("//a[contains(@href,'/news/archive.php')]");
	aXPath.push("//table[@class='news_minor']//a[starts-with(@href,'http://www.twitter.com/')]");
	document.getElementsByXPath(aXPath.join(" | ")).forEach(function(oTarget){ oTarget.className += " nostrike"; });
	aCSS.push(".content a.nostrike:visited { text-decoration:none; }");


	// add all our accumulated CSS to the document
	if (aCSS.length > 0) { GM_addStyle(aCSS.join("\n")); }
}
catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// fixErrors

function fixErrors() { try
{
	// removal of some elements causes script errors, so create fake ones
	var element = document.getElementById("leaderboardWrapperAd");
	if (element == null) document.body.appendChild(document.createElement("div", { id:"leaderboardWrapperAd" , style:"display:none;" }));

	var element = document.getElementById("mpuWrapperAd");
	if (element == null) document.body.appendChild(document.createElement("div", { id:"mpuWrapperAd" , style:"display:none;" }));

} catch(error){ GM_logError(error); }}



// =================================================================================================
// Autosport

function Autosport() { try
{
	if (location.pathname.indexOf("/scripts/") == 0) return;

	identifyElements();
	removeElements();
	formatDocument();
	fixErrors();

	GM_log("_@/ autosport");
}
catch(error){ GM_logError(error); }}
Autosport();

