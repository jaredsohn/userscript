// ==UserScript==
// @name           _@/ tvguide
// @author         Chris Porter
// @version        0.6d
// @date           2010-04-02
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.tvguide.co.uk/*
// ==/UserScript==

var GM_consoleLineOffset = 10 /* current line number */; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset)); };

document._createElement=document.createElement;document.createElement=function(tagName,attributes){var element=this._createElement(tagName);if(attributes!=undefined){for(var attribute in attributes){if(attributes.hasOwnProperty(attribute)){switch(attribute){case"innerHTML":element.innerHTML=attributes[attribute];break;default:element.setAttribute(attribute,attributes[attribute])}}}}return element};
document._evaluate=document.evaluate;document.evaluate=function(xpathExpression,contextNode,resultType){if(resultType==undefined){resultType=XPathResult.ANY_TYPE}if(contextNode==null){contextNode=this}var result=this._evaluate(xpathExpression,contextNode,null,resultType,null);switch(resultType){case XPathResult.NUMBER_TYPE:return result.numberValue;case XPathResult.STRING_TYPE:return result.stringValue;case XPathResult.BOOLEAN_TYPE:return result.booleanValue;case XPathResult.ANY_UNORDERED_NODE_TYPE:case XPathResult.FIRST_ORDERED_NODE_TYPE:return result.singleNodeValue;default:return result}return result};
document.getElementByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.FIRST_ORDERED_NODE_TYPE);return x};
document.getElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.ORDERED_NODE_ITERATOR_TYPE);var result=[],next;while(next=x.iterateNext()){result.push(next)}return result};
document.removeElementsByXPath=function(xpathExpression,contextNode){var x=this.evaluate(xpathExpression,contextNode||this,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);for(var i=0;i<x.snapshotLength;i++){x.snapshotItem(i).parentNode.removeChild(x.snapshotItem(i))}return i};

if(!String.prototype.format){String.prototype.format=function(){var txt=this;for(var i=0;i<arguments.length;i++){var exp=new RegExp('\\{'+(i)+'\\}','gm');txt=txt.replace(exp,arguments[i])}return txt}}if(!String.format){String.format=function(){for(var i=1;i<arguments.length;i++){var exp=new RegExp('\\{'+(i-1)+'\\}','gm');arguments[0]=arguments[0].replace(exp,arguments[i])}return arguments[0]}}
if(!String.prototype.right){String.prototype.right=function(iLen){return this.substr(this.length-iLen,iLen)}}if(!String.right){String.right=function(sInput,iLen){return sInput.substr(sInput.length-iLen,iLen)}}



var isPostback = (location.pathname.indexOf("/gadget") == 0);
if (isPostback == false)
{

// =================================================================================================
// nowViewing
// =================================================================================================

	var nowViewing = {

		homePage: ((window.location.pathname == "/") || (window.location.pathname == "/default.asp")),

		viewAs: {
			get grid() { return (document.getElementsByXPath("//td[@class='title']/font[@color='black' and contains(text(),'GRID')]").length == 1); },
			get list() { return (document.getElementsByXPath("//td[@class='title']/font[@color='black' and contains(text(),'LIST')]").length == 1); }
		}

	};


// =================================================================================================
// eventListeners
// =================================================================================================

	var eventListeners = {

		toggleHighlightDisplayLinkClick: function(event)
		{
			try
			{
				var bShowHighlights = (event.target.innerHTML == "Show Highlight Pane");
				event.target.innerHTML = (bShowHighlights ? "Hide Highlight Pane" : "Show Highlight Pane");
				document.getElementById("layout-container-highlight").style.display = (bShowHighlights ? "table" : "none");
				settings.category["highlight-panel"].setting["visible"].value = bShowHighlights;
			}
			catch(error){ GM_logError(error); }
		},

		toggleDisplayModeLinkClick: function(event)
		{
			try
			{
				settings.category["channel-listing"].setting["view-mode"].value = event.target.innerHTML;
			}
			catch(error){ GM_logError(error); }
		}

	};



// =================================================================================================
// settings
// =================================================================================================

	var settings = {

		category: {},
		get categories() { return this.category; },

		addCategory: function(sName)
		{
		this.category[sName] = {
			name: sName,
			headerText: "",
			setting:{},
			get settings() { return this.setting; },

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

	};




// -------------------------------------------------------------------------------------------------
// identifyElements

	var identifyElements = function() { try
	{

		var a = [];

		a.push({ id:"layout-container-header" , xpath:"/html/body/table[1]" });
		a.push({ id:"header-logo-link" , xpath:"/html/body/table[1]/tbody/tr/td/div/div/a[1]" });
		a.push({ id:"layout-container-highlight" , xpath:"/html/body/table[2]" });
		a.push({ id:"layout-container-highlight-lovetv" , xpath:"/html/body/table[2]/tbody/tr/td[1]" });
		a.push({ id:"layout-container-highlight-gadget" , xpath:"/html/body/table[2]/tbody/tr/td[2]" });
		a.push({ id:"layout-container-body" , xpath:"/html/body/table[3]" });
		a.push({ id:"layout-container-body-datetime" , xpath:"/html/body/table[3]/tbody/tr/td[1]" });
		a.push({ id:"layout-container-body-listing" , xpath:"/html/body/table[3]/tbody/tr/td[2]" });
		a.push({ id:"view-as-grid" , xpath:"/html/body/table[3]/tbody/tr/td[2]/table[1]/tbody/tr/td/table/tbody/tr/td/a[text()='GRID']" });
		a.push({ id:"view-as-list" , xpath:"/html/body/table[3]/tbody/tr/td[2]/table[1]/tbody/tr/td/table/tbody/tr/td/a[text()='LIST']" });
		a.push({ id:"layout-container-footer" , xpath:"/html/body/table[6]" });

		for ( var i = 0, l = a.length ; i < l ; i++ )
		{
			var o = a[i];
			var element = document.getElementByXPath(o.xpath);
			if (element != undefined){ element.setAttribute("id", o.id); }
		}

	}
	catch(error){ GM_logError(error); }};


// -------------------------------------------------------------------------------------------------
// removeElements

	var removeElements = function() { try
	{

		var aXPath = [];

		// ads and ad containers
		aXPath.push("/html/body/div"); // includes strip ad at very top of page, highlight panel ad, vertical ad below date/time selection panel
		aXPath.push("//table[@id='layout-container-footer']/tbody/tr/td[2]/div"); // absolutely positioned header ad
		aXPath.push("//td[@id='layout-container-body-datetime']/a[img]"); // ads above and below date time selection panel
		//aXPath.push("//td[@id='layout-container-body-datetime']/table[2]");
		aXPath.push("//td[@id='layout-container-body-listing']/table[2]/tbody/tr[td/script]"); // ad in first row of listing table
		aXPath.push("//td[@id='layout-container-body-listing']/form/table/tbody/tr/td[4]/*"); // google-ads below channel listings
		aXPath.push("/html/body/table[4]"); // empty table
		aXPath.push("/html/body/table[5]"); // navigation table above footer
		aXPath.push("//iframe[@id='_atssh']"); // iframe ad container

		document.removeElementsByXPath(aXPath.join(" | "));
	}
	catch(error){ GM_logError(error); }};



// -------------------------------------------------------------------------------------------------
// formatDocument

	var formatDocument = function() { try
	{
		var aCSS = [];

		// recolor some elements to give the whole page a black background
		aCSS.push("body { background-color:black; background-image:none; }");
		aCSS.push("table.gridchannel.header { background-color:#000000; }");
		aCSS.push("table.gridchannel.header td { background-color:#333333; border-style:solid; border-width:0px 0px 3px 0px; width:75px; }");

		// reorganise the page header, moving the logo and creating space for additional elements
		aCSS.push("#header-logo-link img { margin-left:-25px; }");
		aCSS.push(".top_logo { padding-right:10px; }");
		aCSS.push(".top_fullbanner { float:right; padding-top:45px; }");
		aCSS.push(".top_fullbanner h1 { color:white; font-family:tahoma,arial,helvetica,san-serif; font-size: 0.7em; padding-bottom:3px; }");

		// make element widths consistent so the whole page fits in 975px
		aCSS.push("#layout-container-body-listing { width:820px; }");
		aCSS.push("div.top_nav { padding:0px; width:975px; }");
		aCSS.push("#layout-container-header { margin:0px auto; width:975px !important; }");
		aCSS.push("#layout-container-highlight { margin:0px auto; width:975px !important; }");
		aCSS.push("#layout-container-body { margin:0px auto; width:975px !important; }");
		aCSS.push("#layout-container-footer { margin:0px auto; width:975px !important; }");
		aCSS.push("ul#menu { width:966px; }");
		aCSS.push("ul#submenus { margin:0px auto; }");
		aCSS.push("#outer { width:975px; }");


		// remove inline style from the highlight pane, and set using classes
		// hide the highlight pane if necessary
		with (document.getElementById("layout-container-highlight"))
		{
			removeAttribute("style");
			style.display = (settings.category["highlight-panel"].setting["visible"].value == true ? "table" : "none");
		}
		aCSS.push("#layout-container-highlight { background-color:black; }");
		aCSS.push("#layout-container-highlight-lovetv { background-color:black; }");
		aCSS.push("#layout-container-highlight-gadget { background-color:black; width:100%; }");


		// create a link to show or hide the highlight panel
		var element = document.createElement("a", { href:"#", onclick:"return false;", style:"float:right; font-size:8pt;",
			innerHTML: ((settings.category["highlight-panel"].setting["visible"].value == true) ? "Hide Highlight Pane" : "Show Highlight Pane") });
		// attach the link to the page header
		var target = document.getElementByXPath("//div[@class='top_fullbanner']");
		target.parentNode.insertBefore(element, target);
		element.addEventListener("click", eventListeners.toggleHighlightDisplayLinkClick, true);



		// create a new category filter table with links spread horizontally instead of vertically,
		// and position in the page header
		var aHTML = [];
		aHTML.push("<h1>Filter current view to see only:</h1>");
		aHTML.push("<table border=\"0\" cellspacing=\"2\" class=\"gridchannel header\" style=\"width:800px;\">");
		aHTML.push("<tbody>");
		aHTML.push("<tr>");
		var sHTML = "<td style=\"border-color:#{0};\"><a href=\"{1}\">{2}</a></td>";
		var tablekey = document.getElementByXPath("//table[@id='tablekey']");

		var categories = [
			{ color:"FFFFFF", name:"All" },
			{ color:"3253CF", name:"Comedy" },
			{ color:"53CE32", name:"Sports" },
			{ color:"FF9933", name:"Music" },
			{ color:"AB337D", name:"Soap" },
			{ color:"E3BB00", name:"Kids" },
			{ color:"CE3D32", name:"Drama" },
			{ color:"800000", name:"Talk Show" },
			{ color:"669999", name:"Game Show" },
			{ color:"666699", name:"Sci-Fi" },
			{ color:"CCCCCC", name:"Documentary" },
			{ color:"996633", name:"Motor" },
			{ color:"666633", name:"Horror" }
		];
		for ( var i = 0, l = categories.length ; i < l ; i++ )
		{
			var category = categories[i];
			var element = document.getElementByXPath("./tbody/tr/td/a[text()='" + category.name + "']", tablekey);
			category.href = (element == null ? "#" : element.getAttribute("href"));
			aHTML.push(String.format(sHTML, category.color, category.href, category.name));
		}
		aHTML.push("</tr>");
		aHTML.push("</tbody>");
		aHTML.push("</table>");
		var target = document.getElementByXPath("//div[@class='top_fullbanner']");
		target.innerHTML = aHTML.join("");
		// remove the original category filter table
		document.removeElementsByXPath("/html/body/table[@id='layout-container-body']/tbody/tr/td[1]/p[table[@id='tablekey']]");


		// create a new row in the body table and reposition the channel filter
		var container = document.getElementByXPath("//table[@id='layout-container-body']/tbody");
		var tr1 = document.createElement("tr");
		var tr2 = document.getElementByXPath("//table[@id='layout-container-body']/tbody/tr[1]");
		tr2.parentNode.insertBefore(tr1, tr2);
		var td = document.createElement("td", { colspan:"2", align:"center" });
		tr1.appendChild(td);
		var channelFilter = document.getElementByXPath("//html/body/table[3]/tbody/tr[2]/td[2]/table");
		td.appendChild(channelFilter);



		// right align times in the date/time selection panel
		var aTarget = document.getElementsByXPath("//td[@id='layout-container-body-datetime']/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr/td[@class='gridchannel']");
		aTarget.forEach(function(oTarget) { oTarget.setAttribute("align", "right"); });

		// replace negative numbers in date selection with "X days ago"
		var aTarget = document.getElementsByXPath("//td[@id='layout-container-body-datetime']/table/tbody/tr/td/table/tbody/tr[2]/td[1]/table/tbody/tr/td[@class='gridchannel']/a[contains(text(),'-')]");
		aTarget.forEach(function(oTarget) { var s = oTarget.innerHTML; s = s.substring(1, 2) + " days ago"; oTarget.innerHTML = s;  });


		// if viewing in grid view...
		if (nowViewing.viewAs.grid == true)
		{
			// add an event listener to the "view as list" click to store preferences when clicked
			var oTarget = document.getElementById("view-as-list").addEventListener("click", eventListeners.toggleDisplayModeLinkClick, true);
			// prevent text wrapping in the title column of the listings table
			var oTarget = document.getElementByXPath("//td[@id='layout-container-body-listing']/table[1]/tbody/tr[3]/td[1]");
			oTarget.style.whiteSpace = "nowrap";
			oTarget.getElementsByTagName("font")[0].innerHTML = "Click a channel for<br />full day TV listings";
		}

		// if viewing in list view...
		if (nowViewing.viewAs.list == true)
		{
			// add an event listener to the "view as grid" click to store preferences when clicked
			var oTarget = document.getElementById("view-as-grid").addEventListener("click", eventListeners.toggleDisplayModeLinkClick, true);
			document.getElementById("header-logo-link").href += "?view=list";
			document.getElementByXPath("//ul[@id='menu']/li[1]/a").href += "?view=list";
			// make the channel columns fill the available width
			var aTarget = document.getElementsByXPath("//td[@id='layout-container-body-listing']/table/tbody/tr/td[position()>1]/table");
			aTarget.forEach(function(oTarget){ oTarget.parentNode.setAttribute("width", Math.round( 100 / aTarget.length ).toString() + "%"); oTarget.setAttribute("width", "100%"); });
			// ensure that each row of the channel table contains only one cell
			var aTarget = document.getElementsByXPath("//td[@id='layout-container-body-listing']/table/tbody/tr/td[position()>1]/table/tbody/tr/td[2]");
			aTarget.forEach(function(oTarget)
			{
				var oTR = document.createElement("tr");
				oTarget.parentNode.parentNode.insertBefore(oTR, oTarget.parentNode.nextSibling);
				oTR.appendChild(oTarget);
			});
		}

		// identify films in the channel listings, and add a search link to imdb.com (this will take you directly to the film if only the search returns only one result).
		var _buildSearchQuery =
		function(sFilmName)
		{
			var sResult = sFilmName.replace(/^\s+|\s+$/g, ''); //trim the title
			sResult = sResult.replace(/\s/g, "+"); //replace spaces with +'s
			sResult = sResult.replace(/[\?#]!"/g, ""); //remove bad chars
			return escape(sResult);
		};

		var aFilms = document.getElementsByXPath("//td[a/img[@src='/images/film.gif']]");
		for ( var i = 0 ; i < aFilms.length ; i++ )
		{
			var oTD = aFilms[i];
			// get the name of the film
			if (nowViewing.viewAs.grid) { var sFilmName = oTD.getElementsByTagName("a")[0].firstChild.nextSibling.nodeValue; }
			if (nowViewing.viewAs.list) { var sFilmName = oTD.getElementsByTagName("a")[0].getElementsByTagName("img")[0].nextSibling.nodeValue; }
			if (sFilmName.right(3) == "...") return;

			// create a link with the imdb icon to search for the film on imdb in a new tab
			var oImage = document.createElement("img");
			oImage.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVR4nK2TQQ4DIQhFheCJupnzdM" +
			"GhWPQ8XbQnsokVqdYhM02MJZlBMe8LqEBEYcVwif6HQM8/pVeeAWMkUA/agwo/eW7ri1QRyDl8YCnfjDcRbDvHjU593G4dsriYQG" +
			"GxT8b6KvC1dL/uYqMI9nQc8MtMkJpACEdZ+IxMVNy8nEJ+sDu+oUm7sTdbQ6tNDgA/9p5rJloCtHrOYXbr3JoKMDymqZuosP7IB2" +
			"Zt+TG9AbL/PkFSMv4WAAAAAElFTkSuQmCC";

			var oAnchor = document.createElement("a");
			oAnchor.href = "http://www.imdb.com/find?s=all&q=" + _buildSearchQuery(sFilmName) + "&x=0&y=0";
			oAnchor.setAttribute("target", "_blank");
			oAnchor.appendChild(oImage);
			oAnchor.style.marginLeft = "5px";

			oTD.appendChild(oAnchor);
		}

			GM_addStyle(aCSS.join("\n"));

		}
		catch(error){ GM_logError(error); }
	};



	var formatDocumentTitle = function()
	{
		try
		{
			// obtain displayed date and time from querystring if present. if not present, we're displaying the current date and time.
			var _getDateTime = function()
			{
				var dtResult = new Date(); dtResult.setMinutes(0); dtResult.setSeconds(0);
				if (location.search != "")
				{
					var s = location.search; s = s.substr(1, s.length);
					var a = s.split("&");
					for ( var i = 0 ; i < a.length ; i++ )
					{
						var b = a[i].split("=");
						if (b[1] != "")
						{
							switch(b[0].toLowerCase())
							{
								case "thisday":
									var c = b[1].split("/");
									dtResult.setFullYear(parseInt(c[2]));
									dtResult.setMonth(parseInt(c[0])-1);
									dtResult.setDate(parseInt(c[1]));
									break;
								case "thistime":
									dtResult.setHours(parseInt(b[1]));
								break;
							}
						}
					}
				}
				return dtResult;
			};

			var dtValue = _getDateTime();
			var s = dtValue.getFullYear() + "-" + ("00" + (dtValue.getMonth()+1)).right(2) + "-" + ("00" + (dtValue.getDate())).right(2);
			document.title = "TV Guide UK TV Listings (" + s + ")";
		}
		catch(error){ GM_logError(error); }
	};




	if (nowViewing.homePage == true)
	{

		with (settings)
		{
			with (addCategory("highlight-panel"))
			{
				addSetting("visible", { type:"boolean" , defaultValue:false  });
			}
			with (addCategory("channel-listing"))
			{
				addSetting("view-mode" , { type:"string" , defaultValue:"GRID" });
			}
		}

		identifyElements();
		removeElements();
		formatDocument();
		formatDocumentTitle();

	}
	GM_log("_@/ tvguide");

}
