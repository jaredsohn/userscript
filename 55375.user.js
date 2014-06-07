// ==UserScript==
// @name           _@/ demonoid
// @author         Chris Porter
// @version        0.3a
// @date           2010-04-10
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.demonoid.com/*
// @include        http://fora.demonoid.com/*
// ==/UserScript==

var GM_consoleLineOffset = 11 /* current line number */; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset)); };
var _GM_getValue=GM_getValue;GM_getValue=function(key,_value){var value=_GM_getValue(key,_value);var type=typeof(value);switch(type){case"string":try{value=eval(value)}catch(error){}return value;default:return value}};
var _GM_setValue=GM_setValue;GM_setValue=function(key,value){var type=typeof(value);switch(type){case"object":value=value.toSource();default:_GM_setValue(key,value)}};

document._createElement=document.createElement;document.createElement=function(tagName,attributes){var element=this._createElement(tagName);if(attributes!=undefined){for(var attribute in attributes){if(attributes.hasOwnProperty(attribute)){switch(attribute){case"innerHTML":element.innerHTML=attributes[attribute];break;default:element.setAttribute(attribute,attributes[attribute])}}}}return element};
document._evaluate=document.evaluate;document.evaluate=function(xpathExpression,contextNode,resultType){if(resultType==undefined){resultType=XPathResult.ANY_TYPE}if(contextNode==null){contextNode=this}var result=this._evaluate(xpathExpression,contextNode,null,resultType,null);switch(resultType){case XPathResult.NUMBER_TYPE:return result.numberValue;case XPathResult.STRING_TYPE:return result.stringValue;case XPathResult.BOOLEAN_TYPE:return result.booleanValue;case XPathResult.ANY_UNORDERED_NODE_TYPE:case XPathResult.FIRST_ORDERED_NODE_TYPE:return result.singleNodeValue;default:return result}return result};
document.getElementByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.FIRST_ORDERED_NODE_TYPE);return x};
document.getElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.ORDERED_NODE_ITERATOR_TYPE);var result=[],next;while(next=x.iterateNext()){result.push(next)}return result};
document.removeElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);for(var i=0;i<x.snapshotLength;i++){x.snapshotItem(i).parentNode.removeChild(x.snapshotItem(i))}return i};

var location2={
	pagename: location.pathname.substr(location.pathname.lastIndexOf("/")+1,location.pathname.length),
	get searchParts(){if(this._searchParts==undefined){this._searchParts={};var a=location.search.substr(1,location.search.length).split("&");for(var i in a){a[i]=a[i].split("=");this._searchParts[a[i][0]]=a[i][1]}}return this._searchParts}
};

if(!String.prototype.left){String.prototype.left=function(iLen){return this.substr(0,iLen)}}if(!String.left){String.left=function(sInput,iLen){return sInput.substr(0,iLen)}}
if(!String.prototype.right){String.prototype.right=function(iLen){return this.substr(this.length-iLen,iLen)}}if(!String.right){String.right=function(sInput,iLen){return sInput.substr(sInput.length-iLen,iLen)}}
if(!String.prototype.trim){String.prototype.trim=function(){var s=this.replace(/^\s\s*/,''),ws=/\s/,i=this.length;while(ws.test(this.charAt(--i)));return this.slice(0,i+1)}}if(!String.trim){String.trim=function(sValue){var s=sValue.replace(/^\s\s*/,''),ws=/\s/,i=sValue.length;while(ws.test(sValue.charAt(--i)));return sValue.slice(0,i+1)}}



// =================================================================================================
// _@/ Demonoid
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================


// =================================================================================================
// nowViewing
// =================================================================================================

var nowViewing =
{
	mainSite: (location.hostname.indexOf("www.") == 0),
	forum: (location.hostname.indexOf("fora.") == 0)
};

if (nowViewing.mainSite)
{
	nowViewing.mainSite =
	{
		isPostback: (location.pathname == "new_pm.php"),

		cached: (location.pathname.indexOf("/cached/") == 0),
		homePage: (location.pathname == "/"),
		files: (location.pathname == "/files/"),
		fileDetails: (location.pathname.indexOf("/files/details/") == 0),
		user: (location.pathname.indexOf("/users/") == 0),
		userControlPanel: (location.pathname == "/user_control_panel.php"),
		chat: (location.pathname == "/chat.php")
	};

	if (nowViewing.mainSite.files)
	{
		nowViewing.mainSite.files = {
			category: location2.searchParts["category"]
		}
	}

}

//
// =================================================================================================



// =================================================================================================
// images
// =================================================================================================

var images = {

	logos: {

		d32: "data:image/gif;base64," +
		"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"

	}

};

//
// =================================================================================================




// =================================================================================================
// eventHandlers
// =================================================================================================

var eventHandlers = {




};

//
// =================================================================================================



// =================================================================================================
// homePage
// =================================================================================================

if (nowViewing.mainSite.homePage)
{

	var homePage = {

		_CSS: [],
		get CSS()
		{
			return this._CSS.join("");
		},
		
		
// -------------------------------------------------------------------------------------------------
// homePage.elements

		elements: {
	
			get categoryHeaderCells()
			{
				if (typeof this._categoryHeaderCells == "undefined")
				{ 
					this._categoryHeaderCells = document.getElementsByXPath("//table[@id='torrentlist-content-table']//td[@class='added_today']");	
				}
				return this._categoryHeaderCells;
			}


		},

// -------------------------------------------------------------------------------------------------
// homePage.checkForInvites
	
		checkForInvites: function()
		{
			// perform an xml http request against the user control panel page, and parse the resultant html to check for invites.
			// display the result in the current page header.
			GM_xmlhttpRequest({
				url: "http://www.demonoid.com/user_control_panel.php",
				instance: this,
				method:"GET",
				onload: function(xmlhttpResponse)
				{
					// create a div element and populate the innerhtml with the html returned from the xml http request
					var elements = {
						container: document.createElement("div", { style:"display:none;" , innerHTML:xmlhttpResponse.responseText })
					};
					// perform an xpath query against the returned html to check for invites
					elements.inviteCodeInfo = document.getElementByXPath(".//div[@id='fslispc']/table//tr[1]/td[1]/table//td[@class='ctable_content']/center/b", elements.container);
					var haveInvites = (elements.inviteCodeInfo.innerHTML != "No invitation codes found");
					// create elements in the page header to indicate whether or not we have invites
					elements.userBox = document.getElementByXPath("//td[@class='user_box']");
					elements.userBox.appendChild(document.createElement("br"));
					elements.userBox.appendChild(document.createElement("b", { innerHTML:"Invite Codes: " + (haveInvites ? "<a href=\"#\"><blink>" + elements.inviteCodeInfo.innerHTML + "</blink></a>" : "0") + " " }));
				}
			});
		},


// -------------------------------------------------------------------------------------------------
// homePage.createCategoryColumnHeaders

		createCategoryColumnHeaders: function()
		{
			// reproduce the column header row above each category separator row on the torrent list table, except featured torrents
			var columnHeaders = document.getElementByXPath("//table[@id='torrentlist-content-table']/tbody/tr[1]");
			for ( var i = 1, l = this.elements.categoryHeaderCells.length ; i < l ; i++ )
			{
				var element = this.elements.categoryHeaderCells[i];
				element.parentNode.parentNode.insertBefore( columnHeaders.cloneNode(true) , element.parentNode);
			}
		},


// -------------------------------------------------------------------------------------------------
// homePage.createCategoryLinks

		createCategoryLinks: function() { try
		{
			// create named anchor at top of page
			document.body.insertBefore(document.createElement("a", { name:"top" }), document.body.firstChild);

			// create the three tables which will comprise the category links section
			var elements = {
				
				categoryTables: {
					headerTable: document.createElement("table" , { width:"100%" , cellspacing:"0" , cellpadding:"0" , border:"0" , id:"torrentcat-header-table" }),
					bodyTable: document.createElement("table" , { width:"100%" , cellspacing:"0" , cellpadding:"0" , border:"0" , id:"torrentcat-body-table" }),
					footerTable: document.createElement("table" , { width:"100%" , cellspacing:"0" , cellpadding:"0" , border:"0" , id:"torrentcat-footer-table" })
				},
					
				torrentListTables: {
					headerTable: document.getElementById("torrentlist-header-table")
				}
					
			};

			// create arrays which we will use to build the markup for each table
			var categoryTableHTML = {
				
				headerTable: [],
				bodyTable: [],
				footerTable: []
				
			};


			// create the header table markup
			with (categoryTableHTML.headerTable)
			{
				push("<tbody><tr>");
				push("<td height=\"30\" width=\"22\" class=\"ctable_top_left\"><img height=\"1\" width=\"22\" src=\"/images/p.gif\"/></td>");
				push("<td width=\"100%\" class=\"ctable_header\">Torrent categories</td>");
				push("<td height=\"30\" width=\"10\" class=\"ctable_top_right\"><img height=\"1\" width=\"10\" src=\"/images/p.gif\"/></td>");
				push("</tr></tbody>");
			}
			// assign the markup to the table innerHTML property, and attach the table to the DOM
			elements.categoryTables.headerTable.innerHTML = categoryTableHTML.headerTable.join("");
			elements.torrentListTables.headerTable.parentNode.insertBefore(elements.categoryTables.headerTable, elements.torrentListTables.headerTable);


			// create the body table markup
			with (categoryTableHTML.bodyTable)
			{
				push("<tbody><tr><td width=\"100%\" class=\"ctable_content\">");

				push("<a href=\"#category" + i + "\"><img height=\"31\" border=\"0\" title=\"Featured torrents\" alt=\"Featured torrents\" src=\"" + images.logos.d32 + "\"/></a>");
				for ( var i = 1, l = this.elements.categoryHeaderCells.length ; i < l ; i++ )
				{
					var element = this.elements.categoryHeaderCells[i];

					var categoryName = element.firstChild.nodeValue.trim();
					var categoryImage = document.getElementByXPath("./parent::tr/following-sibling::tr/td[1]/a/img", element);

					push("<a href=\"#category" + i + "\"><img height=\"30\" border=\"0\" " +
						"title=\"" + categoryImage.getAttribute("title") + "\" " +
						"alt=\"" + categoryImage.getAttribute("alt") + "\" " +
						"src=\"" + categoryImage.getAttribute("src") + "\"/></a>"
					);

					// create a named anchor in the category header
					element.parentNode.previousSibling.appendChild(document.createElement("a", { name:"category" + i.toString() }));

					// create a link anchor back to the top of the page
					element.appendChild(document.createElement("a", { href:"#top" , innerHTML:"Back to top" , class:"back-to-top" }));

				}
				push("</td></tr></tbody>");
			}
			// assign the markup to the table innerHTML property, and attach the table to the DOM
			elements.categoryTables.bodyTable.innerHTML = categoryTableHTML.bodyTable.join("");
			elements.torrentListTables.headerTable.parentNode.insertBefore(elements.categoryTables.bodyTable, elements.torrentListTables.headerTable);
		

			// create the footer table markup
			with (categoryTableHTML.footerTable)
			{
				push("<tbody><tr>");
				push("<td height=\"11\" width=\"22\" class=\"ctable_bottom_left\"><img height=\"1\" width=\"22\" src=\"/images/p.gif\"/></td>");
				push("<td width=\"100%\" class=\"ctable_bottom\"><img height=\"10\" width=\"1\" src=\"/images/p.gif\"/></td>");
				push("<td height=\"11\" width=\"10\" class=\"ctable_bottom_right\"><img height=\"1\" width=\"10\" src=\"/images/p.gif\"/></td>");
				push("</tr></tbody>");
			}
			// assign the markup to the table innerHTML property, and attach the table to the DOM
			elements.categoryTables.footerTable.innerHTML = categoryTableHTML.footerTable.join("");
			elements.torrentListTables.headerTable.parentNode.insertBefore(elements.categoryTables.footerTable, elements.torrentListTables.headerTable);

			// add a spacer image between the category links section and the torrent list table
			elements.torrentListTables.headerTable.parentNode.insertBefore(document.createElement("img" , { height:"7" , width:"1" , src:"/images/p.gif" }), elements.torrentListTables.headerTable);


		} catch(error){ GM_logError(error); }}

	

	}; // var homePage = {

} // if (nowViewing.mainSite.homePage)


//
// =================================================================================================








// -------------------------------------------------------------------------------------------------
// addFavicon

function addFavicon() { try
{
	var oHead = document.getElementsByTagName("head")[0];
	oHead.insertBefore(
		document.createElement("link", { rel:"shortcut icon" , href:"http://www.demonoid.com/favicon.ico" } ),
		oHead.firstChild
	);

} catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// identifyElements

function identifyElements() { try
{

	var elements = [];

	if (nowViewing.mainSite.homePage)
	{
		elements.push({ id:"torrentlist-header-table" , xpath:"//td[@class='pad9px_left']//table[tbody/tr/td[text()='Most popular torrents per category']]" });
	}
	if (nowViewing.mainSite.homePage || nowViewing.mainSite.files)
	{
		elements.push({ id:"torrentlist-content-table" , xpath:"//td[@class='pad9px_left']/table/tbody/tr/td[@class='ctable_content_no_pad']/table[@class='font_12px']" });
	}
	if (nowViewing.mainSite.files)
	{
		elements.push({ id:"topfilter-body-table" , xpath:"//td[@class='pad9px_left']/table[2]" });
		elements.push({ id:"torrentlist-body-table" , xpath:"//td[@class='pad9px_left']/table[5]" });
		elements.push({ id:"torrentlist-header-row" , xpath:"//tr[td[starts-with(@class,'torrent_header')]]" });
	}
	if (nowViewing.mainSite.fileDetails)
	{
		elements.push({ id:"filedetails-body-table" , xpath:"//td[@class='pad9px_left']/table[2]" });
		elements.push({ id:"torrentlinks-body-table", xpath:"//td[@class='pad9px_left']/table[5]" });
		elements.push({ id:"extrainfo-body-table", xpath:"//td[@class='pad9px_left']/table[8]" });
	}

	for ( var i = 0, l = elements.length ; i < l ; i++ )
	{
		var element = document.getElementByXPath(elements[i].xpath);
		if (element != null) element.id = elements[i].id;
	}

} catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// removeElements

function removeElements() { try
{
	var aXPath = [];

	if (nowViewing.mainSite)
	{
		aXPath.push("/html/body/div[@id='fslispc3']/center/table/tbody/tr/td[@class='header_tile']/table/tbody/tr/td[@class='demonoid']/table/tbody/tr/td[@class='user_donation_box']"); // user donation box

//		if (nowViewing.mainSite.homePage || nowViewing.mainSite.files || nowViewing.mainSite.fileDetails || nowViewing.mainSite.userControlPanel)
//		{
			aXPath.push("/html/body/div/center/table[2]/tbody/tr/td[2]/div/table/tbody/tr/td[1]/center[iframe]"); // banner ads
			aXPath.push("/html/body/div/center/table[2]/tbody/tr/td[2]/div/table/tbody/tr/td[2]/div[iframe]")
			aXPath.push("//div[@id='fslispc']/table/tbody/tr/td[@class='pad9px_right']"); // empty ad space
//		}

		if (nowViewing.mainSite.homePage)
		{
			aXPath.push("//td[@class='pad9px_left']//table[tbody/tr/td[text()='Torrent search']]/preceding-sibling::*"); // news items and spacer images
		}

		if (nowViewing.mainSite.userControlPanel)
		{
			aXPath.push("//div[@id='fslispc3']/center/table[2]/tbody/tr/td[@class='main_content']/table[1]/tbody/tr[2]/td[@class='bnnr_top']/center/iframe");
		}

		if (nowViewing.mainSite.files)
		{
			aXPath.push("//table[@id='topfilter-body-table']//td/hr"); // sponsored links and toolbar ad in filter box
			aXPath.push("//table[@id='topfilter-body-table']//td/span[text()='Sponsored links']");
			aXPath.push("//table[@id='topfilter-body-table']//td/iframe");
			aXPath.push("//table[@id='topfilter-body-table']//td[@class='ctable_content']/center[2]/table");
			aXPath.push("//table[@id='torrentlist-body-table']//table//tr[td[@class='added_today' and text()='Sponsored links']]"); // sponsored links in torrent lists
			aXPath.push("//table[@id='torrentlist-body-table']//table//tr[td/iframe]");
		}

		if (nowViewing.mainSite.fileDetails)
		{
			aXPath.push("//table[@id='filedetails-body-table']//td[hr]"); // sponsored links in file details box
			aXPath.push("//table[@id='torrentlinks-body-table']//hr"); // sponsored links in torrent links box
			aXPath.push("//table[@id='torrentlinks-body-table']//span");
			aXPath.push("//table[@id='torrentlinks-body-table']//center");
		}

	}

	if (aXPath.length > 0) { document.removeElementsByXPath(aXPath.join(" | ")); }

} catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// formatDocument

function formatDocument() { try
{
	var aCSS = [];

	if (nowViewing.mainSite)
	{
		// format the user menu links on the right side of the header
		aCSS.push("td.user_box a { color:#3A3A81 !important; font-weight:bold !important; text-decoration:none !important; }");
		aCSS.push("td.user_box a:hover { text-decoration:underline overline !important; }");
		aCSS.push("td.user_menu a { color:#3A3A81 !important; font-weight:bold !important; text-decoration:none !important; }");
		aCSS.push("td.user_menu a:hover { text-decoration:underline overline !important; }");

		// remove the "[" and "]" from the user menu links
		var nodes = document.getElementByXPath("//td[@class='user_menu']").childNodes;
		for ( var i = 0, l = nodes.length ; i < l ; i++ )
		{
			if (nodes[i].nodeValue != null) nodes[i].nodeValue = "";
		}

		// remove padding from select elements
		aCSS.push("select { padding-right:0px; }");

		// format torrent links in torrent lists
		if (nowViewing.mainSite.homePage || nowViewing.mainSite.files)
		{
			aCSS.push("table#torrentlist-content-table td[class^='tone'][colspan='9'] a { text-decoration:none; }");
			aCSS.push("table#torrentlist-content-table td[class^='tone'][colspan='9'] a:hover { color:#3A3A81 !important; text-decoration:underline overline; }");
			aCSS.push("table#torrentlist-content-table td[class^='tone'][colspan='10'] a { text-decoration:none; }");
			aCSS.push("table#torrentlist-content-table td[class^='tone'][colspan='10'] a:hover { color:#3A3A81 !important; text-decoration:underline overline; }");
		}

		if (nowViewing.mainSite.files)
		{
			aCSS.push("table#topfilter-body-table span#rss_feed_link a:hover { color:#3A3A81; }");
 		}

		// shrink ad-space under menu in user control panel
		if (nowViewing.mainSite.userControlPanel)
		{
			document.getElementByXPath("//div[@id='fslispc3']/center/table[2]/tbody/tr/td[@class='main_content']/table[1]/tbody/tr[2]/td[@class='bnnr_top']").removeAttribute("height");
		}

		// format links in file details
		if (nowViewing.mainSite.fileDetails)
		{
			aCSS.push("table#filedetails-body-table a { text-decoration:none; }");
			aCSS.push("table#filedetails-body-table a:hover { color:#3A3A81 !important; text-decoration:underline overline; }");
			aCSS.push("table#torrentlinks-body-table a { font-weight:bold; text-decoration:none; }");
			aCSS.push("table#torrentlinks-body-table a:hover { color:#3A3A81 !important; text-decoration:underline overline; }");
			aCSS.push("table#extrainfo-body-table a { text-decoration:none; }");
			aCSS.push("table#extrainfo-body-table a:hover { color:#3A3A81 !important; text-decoration:underline overline; }");
		}


		// for torrent lists that support sorting, allow sort to be performed by clicking the column headers
		if (nowViewing.mainSite.files)
		{

			// identify the relevant elements in the page
			var elements = {
				torrentList: {
					sortList: document.getElementByXPath("//table[@id='torrentlist-content-table']/tbody/tr[1]/td/select"),
					headerRow: document.getElementById("torrentlist-header-row"),
					headerCells: {}
				}
			};

			if (elements.torrentList.sortList != null)
			{
				with (elements.torrentList)
				{
					headerCells["completed"] = document.getElementByXPath("./td[img[@title='Times completed']]", headerRow);
					headerCells["health"] = document.getElementByXPath("./td[text()='Health']", headerRow);
					headerCells["leechers"] = document.getElementByXPath("./td[img[@title='Leechers']]", headerRow);
					headerCells["seeders"] = document.getElementByXPath("./td[img[@title='Seeders']]", headerRow);
					headerCells["size"] = document.getElementByXPath("./td[text()='Size']", headerRow);
				}

				// determine the current sort criteria from the querystring
				var sort = location2.searchParts["sort"];

				// add anchor elements to the column headers which will submit the filters form with the new sort criteria when clicked
				for ( var id in elements.torrentList.headerCells )
				{
					var headerCell = elements.torrentList.headerCells[id];
					var columnSort = ""; var title = "";
					switch( id )
					{
						case "completed":  columnSort = (sort != "C" ? "C" : "c");  break;
						case "health":  columnSort = "H";  break;
						case "leechers":  columnSort = (sort != "L" ? "L" : "l");  break;
						case "seeders":  columnSort = (sort != "S" ? "S" : "s");  break;
						case "size":  columnSort = (sort != "B" ? "B" : "b");  break;
	 				}
					if (headerCell.firstChild.tagName)
					{
						title = headerCell.firstChild.getAttribute("title");
						headerCell.firstChild.removeAttribute("title");
					}
					else title = headerCell.innerHTML;
					title = "Sort by " + title + " (" + (columnSort == columnSort.toUpperCase() ? "descending" : "ascending") + ")";

					var anchor = document.createElement("a" , { href:"#" , sort:columnSort , title:title });
					anchor.setAttribute("onclick", "document.getElementById('filters_top').sort.value=this.getAttribute('sort'); document.getElementById('filters_bottom').sort.value=this.getAttribute('sort'); document.getElementById('filters_top').submit(); return false;");
					anchor.appendChild(headerCell.firstChild);
					headerCell.appendChild(anchor);
				}

				aCSS.push("table#torrentlist-content-table tr#torrentlist-header-row td a { color:#000000 !important; }");
				aCSS.push("table#torrentlist-content-table tr#torrentlist-header-row td a:hover { color:#000000 !important; text-decoration:underline overline; }");

			}
		}



		if (nowViewing.mainSite.homePage)
		{

			//homePage.checkForInvites();
			homePage.createCategoryColumnHeaders();
			homePage.createCategoryLinks();


//					element.appendChild(document.createElement("a", { href:"#" , onclick:"return false;" , innerHTML:"&#x25b2;" , class:"expand-collapse" }));

			// set the formatting for the "back to top" links
			aCSS.push("table#torrentlist-content-table td.added_today a { color:#777777; text-decoration:none; }");
			aCSS.push("table#torrentlist-content-table td.added_today a.expand-collapse { margin-left:5px; }");
			aCSS.push("table#torrentlist-content-table td.added_today a.expand-collapse:hover { color:black; }");
			aCSS.push("table#torrentlist-content-table td.added_today a.back-to-top { display:inline; float:right; }");
			aCSS.push("table#torrentlist-content-table td.added_today a.back-to-top:hover { text-decoration:underline overline; }");

//			aCSS.push("table#torrentlist-content-table td.added_today a { color:#777777 !important; text-decoration:none; }");
//			aCSS.push("table#torrentlist-content-table td.added_today a:hover { text-decoration:underline overline; }");




			// add some formatting to the category links and their container table cell
			aCSS.push("table#torrentcat-body-table td { padding-top:15px; text-align:center; }");
			aCSS.push("table#torrentcat-body-table a { margin-left:10px; margin-right:10px; }");




		}

	}


	// fix filtering links on torrents in list tables to include the values of their preceding siblings
	if (nowViewing.mainSite.homePage || nowViewing.mainSite.files)
	{
		var QS = function(href)
		{
			this.value = href;
			this.value = this.value.substr(this.value.indexOf("?")+1);

			this.parts = {};
			var parts = this.value.split("&");
			for ( var i in parts )
			{
				parts[i] = parts[i].split("=");
				this.parts[parts[i][0]] = parts[i][1];
			}

			this.toString = function()
			{
				var result = "";
				for ( var s in this.parts )
				{
					result += s + "=" + this.parts[s] + "&";
				}
				result = result.substr(0, result.length-1);
				return result;
			}

			return this;
		}

		var elements = document.getElementsByXPath("//table[@id='torrentlist-content-table']/tbody/tr/td[1]/a[2][@class='subcategory']");
		for ( var i = 0, l = elements.length ; i < l ; i++ )
		{
			var element = elements[i];

			var qs = {
				subcategory: new QS(element.parentNode.firstChild.href),
				quality: new QS(element.href)
			};

			qs.quality.parts["subcategory"] = qs.subcategory.parts["subcategory"];
			element.setAttribute("href", "/files/?" + qs.quality.toString());

		}

		var elements = document.getElementsByXPath("//table[@id='torrentlist-content-table']/tbody/tr/td[1]/a[3][@class='subcategory']");
		for ( var i = 0, l = elements.length ; i < l ; i++ )
		{
			var element = elements[i];

			var qs = {
				anchors: document.getElementsByXPath("./a[@class='subcategory']", element.parentNode)
			};

			qs.subcategory = new QS(qs.anchors[0].href);
			qs.quality = new QS(qs.anchors[1].href);
			qs.language = new QS(qs.anchors[2].href);

			qs.language.parts["subcategory"] = qs.subcategory.parts["subcategory"];
			qs.language.parts["quality"] = qs.quality.parts["quality"];

			element.setAttribute("href", "/files/?" + qs.language.toString());

		}

	}


	GM_addStyle(aCSS.join("\n"));


} catch(error){ GM_logError(error); }}


// -------------------------------------------------------------------------------------------------
// fixErrors

function fixErrors() { try
{
	// removal of some DOM elements causes errors in the page's javascript.
	// prevent this by adding invisible replacement elements for some of the ones we removed.
	var elements = [];
	elements.push({ id:"bnr3" , tagName:"div" });

	for ( var i = 0, l = elements.length ; i < l ; i++ )
	{
		var element = elements[i];
		if (document.getElementById(element.id) == null)
		{
			document.body.appendChild(document.createElement(element.tagName, { id:element.id , style:"display:none;" }));
		}
	}

} catch(error){ GM_logError(error); }}



// =================================================================================================
// Demonoid

function Demonoid() { try
{
	var i1 = Date.now();

//	if (nowViewing.forum)
//	{
//		addFavicon();
//	}

	if (nowViewing.mainSite)
	{
		if (nowViewing.mainSite.cached || nowViewing.mainSite.isPostback) return;

		identifyElements();
		removeElements();
		formatDocument();
		fixErrors();
	}

	var i2 = Date.now();
	GM_log("_@/ demonoid" + " (" + (i2 - i1) + "ms)");

} catch(error){ GM_logError(error); }}
Demonoid();

