// ==UserScript==
// @name           _@/ grandprix
// @author         Chris Porter
// @version        0.3
// @date           2010-04-01
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.grandprix.com/*
// ==/UserScript==

var GM_consoleLineOffset = 11 /* current line number */; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset)); };

document._createElement=document.createElement;document.createElement=function(tagName,attributes){var element=this._createElement(tagName);if(attributes!=undefined){for(var attribute in attributes){if(attributes.hasOwnProperty(attribute)){switch(attribute){case"innerHTML":element.innerHTML=attributes[attribute];break;default:element.setAttribute(attribute,attributes[attribute])}}}}return element};
document._evaluate=document.evaluate;document.evaluate=function(xpathExpression,contextNode,resultType){if(resultType==undefined){resultType=XPathResult.ANY_TYPE}if(contextNode==null){contextNode=this}var result=this._evaluate(xpathExpression,contextNode,null,resultType,null);switch(resultType){case XPathResult.NUMBER_TYPE:return result.numberValue;case XPathResult.STRING_TYPE:return result.stringValue;case XPathResult.BOOLEAN_TYPE:return result.booleanValue;case XPathResult.ANY_UNORDERED_NODE_TYPE:case XPathResult.FIRST_ORDERED_NODE_TYPE:return result.singleNodeValue;default:return result}return result};
document.getElementByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.FIRST_ORDERED_NODE_TYPE);return x};
document.getElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.ORDERED_NODE_ITERATOR_TYPE);var result=[],next;while(next=x.iterateNext()){result.push(next)}return result};
document.removeElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);for(var i=0;i<x.snapshotLength;i++){x.snapshotItem(i).parentNode.removeChild(x.snapshotItem(i))}return i};


// =================================================================================================
// GrandPrix
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================


// -------------------------------------------------------------------------------------------------
// nowViewing

var nowViewing = {

	homePage: (((location.pathname == "/")) || (location.pathname == "/index.html")),
	
	newsItem: (location.pathname.indexOf("/ns/") == 0),
	feature: (location.pathname.indexOf("/ft/") == 0)

};
	

// -------------------------------------------------------------------------------------------------
// removeElements

function removeElements() { try 
{
	var aXPath = [];
		
	if (nowViewing.homePage) 
	{
		aXPath.push("//div[@id='mainbar']/div[starts-with(@class,'.ad')]");
		aXPath.push("//div[@id='mainbar']/div[@id='subbar2']/script | //div[@id='mainbar']/div[@id='subbar2']/ins | //div[@id='mainbar']/div[@id='subbar2']/center");
		aXPath.push("//div[@id='sidebar']/*");
	}
		
	if (nowViewing.newsItem) 
	{
		aXPath.push("//div[@id='mainbar']/center[1] | //div[@id='mainbar']/script | //div[@id='mainbar']/ins");
		aXPath.push("//div[@id='mainbar']/p[span[contains(@id,'sharethis')]]");
		aXPath.push("//div[@id='mainbar']/table[@id='printnewsbox']");
		aXPath.push("//div[@id='rightbar']/*");
	}
		
	if (aXPath.length > 0) 
	{
		document.removeElementsByXPath(aXPath.join(" | "));
	}
		
} catch (error){ GM_log(error); }}
	


// -------------------------------------------------------------------------------------------------
// removeElements
	
function disableAutoRefresh() { try 
{
	// schedule a clear for page load of the timeout which will reload the page
	window.stopTimer = window.setTimeout("window.stop();", 60 * 1000);
	window.addEventListener("load", 
	function(){
		try {
	  	window.clearTimeout(window.stopTimer);
	  } 
	  catch (error) {
	  	GM_logError(error);
	  }
		window.stop();
	}
	,true);

} catch (error){ GM_log(error); }}



// -------------------------------------------------------------------------------------------------
// formatDocument

function formatDocument() { try 
{
	var aCSS = [];
	
	if (nowViewing.homePage) 
	{

		var elements = {
			content: document.getElementByXPath("//div[@id='content']"),
			mainbar: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']"),
			bannerImage: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/a[@class='wsw-imglink']/img"),
			subbar1: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='subbar1']"),
			news: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='subbar1']/div[@class='wsw-news']"),
			//subbar2:  document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='subbar2']"),
			features: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='subbar2']/div[@class='wsw-features']"),
			analysis: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='subbar2']/div[@class='wsw-analysis']"),
			sidebar: document.getElementByXPath("//div[@id='content']/div[@id='sidebar']"),
			subbar3: document.createElement("div", { id:"subbar3" })
		};
	
		// create three columns of content by moving news into the (now empty) sidebar
		elements.sidebar.appendChild(elements.subbar3);
		elements.subbar3.appendChild(elements.news);
		elements.subbar1.appendChild(elements.features);
		// move the sidebar column from the right to the left
		elements.content.insertBefore(elements.sidebar, elements.mainbar);
	
		// resize the banner image to 620px wide, and maintain aspect ratio
		if (elements.bannerImage != null) 
		{
			currentWidth = elements.bannerImage.offsetWidth;
			currentHeight = elements.bannerImage.offsetHeight;
			
			newWidth = 620;
			resizePercentage = Math.round((newWidth / currentWidth) * 100) / 100;
			newHeight = Math.round(currentHeight * resizePercentage);
			
			elements.bannerImage.setAttribute("width", newWidth);
			elements.bannerImage.setAttribute("height", newHeight);
		}

		// make all columns 300px wide with 20px gutters
		aCSS.push("#content { padding:20px 0px 0px 0px; }");
		aCSS.push("#mainbar { width:620px !important; }");
		aCSS.push("#sidebar { width:320px; margin-left:0px; }");
		aCSS.push("#subbar1 { width:300px !important; }");
		aCSS.push("#subbar2 { width:300px; margin-top:0px; }");
		aCSS.push("#subbar3 { width:300px; }");
			
		// strike through visited links
		aCSS.push("#content .wsw-story h2 a:visited { text-decoration:line-through; }");
			
	}
	
	if (nowViewing.newsItem) 
	{

		var elements = {
			todaysStories: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='wsw-todaysstories']"),
			//features: document.getElementByXPath("//div[@id='content']/div[@id='mainbar']/div[@id='subbar2']/div[@class='wsw-features']"),
			rightbar:  document.getElementByXPath("//div[@id='content']/div[@id='rightbar']")
		};

		// move "todays' stories" from below the news item into the empty right hand sidebar
		elements.rightbar.appendChild(elements.todaysStories);

	}
	
	
	GM_addStyle(aCSS.join("\n"));

} catch (error){ GM_log(error); }}



// =================================================================================================
// GrandPrix
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================

//(function(){

	removeElements();
	disableAutoRefresh();
	formatDocument();

	GM_log("_@/ grandprix");
	
//}
//)();






