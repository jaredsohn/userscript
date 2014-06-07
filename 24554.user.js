// ==UserScript==
// @name           _@/ devguru
// @author         Chris Porter
// @version        0.3
// @date           2008-07-12
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://*.devguru.com/*
// ==/UserScript==

document.createStyleSheet = function(sValue) { var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };
document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};
document.removeElementsByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); for ( var i = 0 ; i < a.snapshotLength ; i++ ) { a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i)); } };

String.prototype.left = function(iLen) { return this.substr(0, iLen); };
String.prototype.right = function(iLen) { return this.substr( this.length - iLen, iLen ); };
String.prototype.trim = function() { return this.replace(/^\s*|\s*$/g,""); }

Math.sign = function(nValue) { if (nValue < 0) return -1; if (nValue == 0) return 0; if (nValue > 0) return 1; };


// =================================================================================================
// DevGuru
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================


var DevGuru = {

// -------------------------------------------------------------------------------------------------
// domVersion

	domVersion: {

		divLayout: (document.getElementByXPath("//body/div[@id='glue']") != undefined),
		tableLayout: (document.getElementByXPath("//body/table") != undefined)

	},


// -------------------------------------------------------------------------------------------------
// nowViewing

	nowViewing: {
		parent: {},

		langObject: {
			parent: {},

			get pmeList()
			{
			var bResult = false;
			if (this.parent.parent.domVersion.divLayout)
				{
				bResult = (document.getElementsByXPath("//div[@id='leftcontent']/h1/a[position()=2 and text()='Objects']").length == 1);
				}
			if (this.parent.parent.domVersion.tableLayout)
				{
				var oPageHeader = document.getElementByXPath("//body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/form/table/tbody/tr[3]/td/font[@size='+1' and @face='arial, helvetica']");
				if (oPageHeader != undefined)
					{
					bResult = (oPageHeader.innerHTML.indexOf("OBJECT:") >= 0);
					}
				}
			return bResult;
			}

		},

	},



// -------------------------------------------------------------------------------------------------
// identifyElements

	identifyElements: function()
	{
	var elementIDs = [];
	if (this.domVersion.tableLayout)
		{
		elementIDs.push({ id:"table-layout-body-left" , xpath:"/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]" });
		elementIDs.push({ id:"table-layout-body-middle" , xpath:"/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]" });
		elementIDs.push({ id:"table-layout-body-right" , xpath:"/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[5]" });
		elementIDs.push({ id:"table-layout-content-header" , xpath:"/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/form/table/tbody/tr[3]/td/font[1]" });
		elementIDs.push({ id:"table-layout-content-text" , xpath:"/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/form/table/tbody/tr[3]/td/font[2]" });
		}
	elementIDs.forEach(function(elementID){ var oElement = document.getElementByXPath(elementID.xpath); if (oElement != undefined) { oElement.id = elementID.id; } });
	},


// -------------------------------------------------------------------------------------------------
// removeElements

	removeElements: function()
	{
	var a = [];

	if (this.nowViewing.langObject.pmeList)
		{
		a.push("//div[@id='TopLeaderBoard']");
		a.push("//div[@id='AboveContentBanner']");
		a.push("//div[@id='rightcontent-subcol2']/*");
		}

	for ( var i = 0 ; i < a.length ; i++ ) { document.removeElementsByXPath(a[i]); }
	},


// -------------------------------------------------------------------------------------------------
// createFavouritesLink

	createFavouritesLink: function()
	{
	// create an anchor element which, when clicked, will add the current url to the favourites list.
	var oLink = document.createElement("a");
	oLink.innerHTML = "Add to Favourites";
	oLink.href = "#";
	oLink.setAttribute("onclick", "return false;");
	oLink.setAttribute("style", "color:blue; font-size:8pt; font-style:italic; margin-left:20px;");

	// attach the element to the document
	var oTarget = document.getElementByXPath("//div[@id='leftcontent']/h1");
	oTarget.appendChild(oLink);

	// add an onclick handler to the element
	oLink.addEventListener("click",
		function(event)
		{
		DevGuru.favouritesList.addCurrent();
		}
	,true);
	},


// =================================================================================================
// favouritesList
// =================================================================================================

	favouritesList: {

	// -----------------------------------------------------------------------------
	// elements

		elements: {
			navMenuList: document.getElementByXPath("//ul[@id='menunav']"),
			navMenuListItem: null,
			get favouritesMenuList() { return document.getElementByXPath("//ul[@id='menunav']/li[@id='userscript-favourites-menuitem']/ul"); },
			get favouritesMenuListItems() { return document.getElementsByXPath("//ul[@id='menunav']/li[@id='userscript-favourites-menuitem']/ul/li"); }
		},


	// -----------------------------------------------------------------------------
	// data

		data: [],
		save: function() { GM_setValue("userscript-favourites", this.data.join("\b\b")); },
		load: function() { this.data = GM_getValue("userscript-favourites", "").split("\b\b"); },


	// -----------------------------------------------------------------------------
	// sort

		sort: function()
		{
		// sort the array alphabetically by item caption
		this.data = this.data.sort(
			function(elementA, elementB)
			{
			var a = elementA.split("\b")[1];
			var b = elementB.split("\b")[1];
			if (a.toLowerCase() > b.toLowerCase()) return 1;
			if (a.toLowerCase() < b.toLowerCase()) return -1;
			return 0;
			}
		);
		// save the data
		this.save();
		},


	// -----------------------------------------------------------------------------
	// addCurrent

		addCurrent: function()
		{
		// build an object containing the url of the current page and a shortened version of the document title
		var o = { caption:"" , uri:"" };
		o.caption = document.title.trim(); o.caption = o.caption.left(o.caption.length-23).trim(); o.caption = o.caption.left(o.caption.length-2);
		o.uri = location.href; if (o.uri.indexOf("#") >= 0) { o.uri = o.uri.substr(0, o.uri.indexOf("#")); }
		// add a string representation of the object to the data array if it isn't already included
		var s = [o.uri,o.caption].join("\b");
		if (this.data.indexOf(s) >= 0) { alert("URL is already in the favourites list."); return; }
		this.data.push(s);
		this.sort();
		// rebuild the menu items to reflect the addition to the data array
		this.refreshMenuItems();
		alert("Current URL added to Favourites List.");
		},


	// -----------------------------------------------------------------------------
	// createMenu

		createMenu: function()
		{
		// append a new list item to the navigation menu for the favourites menu
		this.elements.navMenuListItem = document.createElement("li");
		this.elements.navMenuListItem.id = "userscript-favourites-menuitem";
		this.elements.navMenuList.appendChild(this.elements.navMenuListItem);
		// add some css
		document.createStyleSheet(
		"li#userscript-favourites-menuitem ul { width:20em; } " +
		"li#userscript-favourites-menuitem ul li { width:20em; } " +
		"li#userscript-favourites-menuitem ul li a.link { display:inline; float:left; } " +
		"li#userscript-favourites-menuitem ul li a.delete { display:inline; float:right; font-weight:normal; width:10px; } " +
		"");
		// load the favourites menu items
		this.refreshMenuItems();
		},


	// -----------------------------------------------------------------------------
	// refreshMenuItems

		refreshMenuItems: function()
		{
		this.load();

		// create a link to display the favourites menu
		var sHTML = "<a href='#' onclick'return false;'>Favourites</a><ul>";
		// create a list item for each element in the favouries data array, containing a link to the page and a link to delete this favourite.
		for ( var i = 0 ; i < this.data.length ; i++ )
			{
			var a = this.data[i].split("\b");
			sHTML += "<li><a class='link' href='" + a[0] + "'>" + a[1] + "</a><a class='delete' index='" + i.toString() + "' href='#'>x</a></li>";
			}
		sHTML += "</ul>";
		this.elements.navMenuListItem.innerHTML = sHTML;

		// create event handlers for the delete links
		this.elements.favouritesMenuListItems
			.forEach(function(oLI)
				{
				oLI.getElementsByTagName("a")[1].addEventListener("click",
					function(event)
					{
					var oFavourites = DevGuru.favouritesList;
					// remove the element from the favourites data array with the selected index
					var iIndex = parseInt(event.target.getAttribute("index"), 10);
					oFavourites.data = oFavourites.data.filter(function(element, index, array) { return (index != iIndex); });
					oFavourites.save();
					// remove the parent list item of the clicked link from it's parent list
					event.target.parentNode.parentNode.removeChild(event.target.parentNode);
					}
				,true);
				}
			);

		}

	},


// =================================================================================================
// langObject
// =================================================================================================

langObject: {
	parent: {},

	// -----------------------------------------------------------------------------
	// createPMELinks

	createPMELinks:
		function()
		{
		var aXPath = [];
		var elements = {

			linkHolder: {
				header: {},
				rightColumn: {}
			}

		};


		document.createStyleSheet("" +

			(this.parent.domVersion.divLayout ?
			"div#csp-linkholder { margin-top:-5px; margin-bottom:10px; } " +
			"div#rightcontent-subcol2 { text-align:left; } " +
			"":"") +

			(this.parent.domVersion.tableLayout ?
			"div#csp-linkholder { margin-top:0px; margin-bottom:10px; } " +
			"div#csp-linkholder a { color:#F07800; font-size:8pt; font-weight:bold; text-decoration:none; } " +
			"td#table-layout-body-right h5 { color:#F07800; font-size:9pt; } " +
			"td#table-layout-body-right a { font-size:8pt; } " +
			"":"") +

		"");


		// prepare the page's right hand column <div> or <td> element to recieve links to the individual entities
		if (this.parent.domVersion.divLayout)
			{
			elements.linkHolder.rightColumn = document.getElementById("rightcontent-subcol2");
			}
		if (this.parent.domVersion.tableLayout)
			{
			elements.linkHolder.rightColumn = document.getElementByXPath("//td[@id='table-layout-body-right']");
			elements.linkHolder.rightColumn.innerHTML = "";
			}


		// create a <div> element below the page header to hold the links to the section headers
		elements.linkHolder.header = document.createElement("div");
		elements.linkHolder.header.id = "csp-linkholder";
		if (this.parent.domVersion.divLayout)  var oTarget = document.getElementByXPath("//div[@id='leftcontent']/h1[1]");
		if (this.parent.domVersion.tableLayout) var oTarget = document.getElementByXPath("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/form/table/tbody/tr[3]/td/br[1]");
		with (oTarget) { parentNode.insertBefore(elements.linkHolder.header, nextSibling); }


		// obtain an array of all the <h2> and <a> elements which make up the section headers
		if (this.parent.domVersion.divLayout)
			{
			// dom style 1 - e.g. VBScript
			aXPath.push("//div[@id='leftcontent']/h2[text()!='Examples']");
			aXPath.push("//div[@id='leftcontent']/dl[@class='Entity_SubEntityList']/dt/a");
			aXPath.push("//div[@id='leftcontent']/ul[@id='Entity_SeeAlsoList']/li/a");
			// dom style 2 - e.g. JavaScript
			aXPath.push("//div[@id='leftcontent']/h2/b[text()!='Examples']");
			aXPath.push("//div[@id='leftcontent']/dl[@class='Entity_SubEntityList']/dt/b/a");
			aXPath.push("//div[@id='leftcontent']/ul[@id='Entity_SeeAlsoList']/li/b/a");
			}
		if (this.parent.domVersion.tableLayout)
			{
			// dom style 1 - e.g. JavaScript Location object
			aXPath.push("//font[@id='table-layout-content-text']//span[text()='PROPERTIES' or text()='METHODS']");
			aXPath.push("//font[@id='table-layout-content-text']//a");
			// dom style 2 - e.g. JavaScript Array object
			aXPath.push("//font[@id='table-layout-content-text']//span[@class='PROPERTY' or @class='METHOD']/b[text()='PROPERTIES' or text()='METHODS']");
			aXPath.push("//font[@id='table-layout-content-text']//b[contains(text(),' Property')]");
			}


		// process each section header or entity link found...
		elements.entityHeaders = document.getElementsByXPath(aXPath.join(" | "));
		for ( var i = 0 ; i < elements.entityHeaders.length ; i++ )
			{
			var o = elements.entityHeaders[i];

			var sInnerHTML = o.innerHTML.trim();
			if (sInnerHTML.right(1) == ":") sInnerHTML = sInnerHTML.left(sInnerHTML.length-1);

			if (
				((this.parent.domVersion.divLayout) && (["B","H2"].indexOf(o.tagName) != -1)) ||
				((this.parent.domVersion.tableLayout) && ((o.tagName == "SPAN") || ((o.tagName == "B") && (o.innerHTML.right(9) != " Property"))))
			)
				{
				// create a named <a> element adjacent to the element so we can link to it
				var oA1 = document.createElement("a");
				oA1.name = "csp-" + sInnerHTML.toLowerCase() + "-section";
				oA1.id = "csp-" + sInnerHTML.toLowerCase() + "-section";
				o.parentNode.insertBefore(oA1, o);

				// create a linked <a> element in the header link holder for this section
				var oA2 = document.createElement("a");
				oA2.href = "#" + oA1.name;
				oA2.innerHTML = sInnerHTML;
				oA2.style.marginRight = "15px";
				oA2.style.fontWeight = "bold";
				elements.linkHolder.header.appendChild(oA2);

				// create a <h5> element in the right hand link holder for this section
				var oH5 = document.createElement("h5");
				oH5.innerHTML = sInnerHTML;
				oH5.style.marginBottom = "0px";
				//if (this.parent.domVersion.tableLayout) { oH5.className = o.className; }
				elements.linkHolder.rightColumn.appendChild(oH5);
				}


			if (
				((this.parent.domVersion.divLayout) && (o.tagName == "A")) ||
				((this.parent.domVersion.tableLayout) && ((o.tagName == "A") || ((o.tagName == "B") && (o.innerHTML.right(9) == " Property"))))
			)
				{

				if ((this.parent.domVersion.tableLayout) && (o.tagName == "B") && (o.innerHTML.right(9) == " Property"))
					{
					sInnerHTML = sInnerHTML.left(sInnerHTML.length-9);
					}


				// create a named <a> element adjacent to the element so we can link to it
				var oA1 = document.createElement("a");
				oA1.name = "csp-" + sInnerHTML.toLowerCase();
				oA1.id = "csp-" + sInnerHTML.toLowerCase();
				o.parentNode.insertBefore(oA1, o);

				var oA2 = document.createElement("a");
				oA2.href = "#" + oA1.name;
				oA2.innerHTML = sInnerHTML;
				oA2.style.fontWeight = "bold";
				elements.linkHolder.rightColumn.appendChild(oA2);
				elements.linkHolder.rightColumn.appendChild(document.createElement("br"));
				}

			}
		}

	},


// -------------------------------------------------------------------------------------------------
// onCreate

onCreate:
	function()
	{
	// build hierarchical relationships for child objects
	this.nowViewing.parent = this;
	this.nowViewing.langObject.parent = this.nowViewing;
	this.langObject.parent = this;

	// add id attributes to key DOM elements
	this.identifyElements();
	// remove unwanted DOM elements
	this.removeElements();

	// create the favourites menu
	if (this.domVersion.divLayout)
		{
		this.favouritesList.createMenu();
		this.createFavouritesLink();
		}

	// if we're viewing an object detail, add the property, method and event links
	if (this.nowViewing.langObject.pmeList)
		{
		this.langObject.createPMELinks();
		}

	}

};
DevGuru.onCreate();



