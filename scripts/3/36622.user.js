// ==UserScript==
// @author         mungushume
// @version        1.0.6
// @name           GoogleMonkeyR
// @namespace      http://www.monkeyr.com/非原创
// @description    Google - Multiple columns of results, Rem "Sponsored Links", Number results, Auto-load more results, Remove web search dialogues, Open external links in a new tab and self updating... Oh, did i mention, all configurable from a simple user dialogue?
// @include        http://www.google.*/ig?*
// @include        http://www.google.*/search?*
// @scriptsource   http://userscripts.org/scripts/show/9310
// @scriptsource   http://google.monkeyr.com/ff/script/1.0.6/googlemonkeyr.user.js
// ==/UserScript==

/* --- Public release version ---

v1.0.6 - 19 Apr 2008
 - Bug fix: Corrected the display of the preferences screen in Firefox 3
 - Bug fix: Corrected the removal of web search dialogs (after an update on google)
 - Bug fix: Natural numbering of 2nd, 3rd, 4th... pages of results. 
 	Thanks to theMoJo for the natural numbering sample code!

v1.0.5 - 24 Oct 2007
 - Bug fix: Natural indentation of multiple results from the same site restored
 - Bug fix: Google news entries within results no longer breaks the layout and numbering
 - Feature: Added ability to change (or remove) the background hue of the search results 
 	NB* Color picker code borrowed, then heavily modified, from Flooble.com

v1.0.4 - 25 May 2007
 - Bug fix: Removed the visually anoying bug where when you clicked on a "long" link it resized the whole
 	cell container before taking you to your link. Grrrr.

v1.0.3 - 20 May 2007
 - Bug fix: "Open results in a new target" would only work for the initially loaded results, not subsequent 
 	additions by the auto loader
 - Bug fix: Limit the column width to always fit on screen without scroll. As requested by Edward Rapley
 	NB* This fix only works when your being reasonable! If you want 4 columns of results on an 800x600
 		screen you'll have trouble. Works best with the "Sponsored Links" removed
 - Feature: Added an entry to the Greasemonkey user script commands to allow opening of the GoogleMonkeyR
 	preferences. This is just in case Google decide to alter their site in a way that removes the 
 	GoogleMonkeyR link from the top of the page.
 - Feature: Ability to disable Google tracking your search results 
 	NB* Every time you click a link in your search results, the click gets reported back to Google for 
 		their statisticians to ponder over. If you are signed in to a Google account this click will
 		be recorded in your search history. This allows you to remove this reporting to Google.
 - Feature: When the Disable Google tracking option is not active, an extra "Trackless" link is added 
 	in the "Cached", "Similar pages" links of each of the search results, so you can decide whether 
 	to be tracked at the time!
 		
v1.0.2 - 18 May 2007
 - Now uses userscripts.org as the download location for future updates

v1.0.1 - 16 May 2007
 - clean up of the code to use more of the this keyword rather than working round the issue by using the
 	document as a patsy

*/

Function.prototype.bind = function(object)
{
    var __method = this;
    return function()
    {
        __method.apply(object, arguments);
    }
};

/**
 * Processing of the current page.
**/
var UIL =
{
    init: function()
    {
        this.version = new Array(1,0,6);
        this.base = "http://google.monkeyr.com/ff";
        this.scriptBase = "http://userscripts.org/scripts/source/9310.user.js";
        this.scriptName = "googlemonkeyr.user.js";
        
        var pageType = this.determineCurrentPageType();
        this.processPage(pageType);
        this.registerControls(pageType);
    },

    determineCurrentPageType: function()
    {
        var pageType = null;
        if (window.location.href.toLowerCase().indexOf("/ig?") != -1)
        {
            pageType = "igoogle";
        }
        else if (window.location.href.toLowerCase().indexOf("/search?") != -1)
        {
            pageType = "search";
        }
        return pageType;
    },

    processPage: function(pageType)
    {
        if (pageType !== null)
        {
            var pageProcessor = pageType + "PageProcessor";
            if (typeof(this[pageProcessor]) == "function")
            {
                this[pageType + "PageProcessor"]();
            }
        }
    },
		
	igooglePageProcessor: function()
	{
		if(UIL.Config.getHideSearch())
		{
			var searchEle = document.getElementById("gsea");
			if(searchEle)
			{
				searchEle.style.display="none";
			}
		}
		if(UIL.Config.getExtLinkiGoogle())
		{
			this.externalLinks(document);
		}
	},
	
	searchPageProcessor: function()
	{
		if(UIL.Config.getHideSearch())
		{
			var searchEle = document.getElementById("guser").nextSibling;
			if(searchEle)
			{
				searchEle.style.display="none";
			}
			var searchEle = document.evaluate ("//table[contains(@class,'bb bt')]", document, null,
												XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(searchEle)
			{
				searchEle.style.display="none";
			}
		}
		
		if(UIL.Config.getRemSponsor())
		{
			this._addStyle("@namespace url(http://www.w3.org/1999/xhtml); .ta, .ra { display: none !important; }; ")
		}
		
		this.externalLinksResults = UIL.Config.getExtLinkSearch();

		this.searchLinkTracking = UIL.Config.getSearchLinkTracking();

		this.buildResultTable();

		if(UIL.Config.getAutoLoad())
		{
			this.initialiseAutoLoad();
			if(this.insertLoadingImage())
			{
				this.watchForScroll.bind(this)();
			}
		}
	},
		
	insertEndText: function() 
	{
		var elem = document.createElement("table");
		elem.innerHTML = "&nbsp;End of the search results";
		elem.setAttribute("width", "100%");
		elem.setAttribute("cellspacing", "2");
		elem.setAttribute("cellpadding", "0");
		elem.setAttribute("border", "0");
		elem.setAttribute("class", "t bt");
		elem.style.fontWeight = "bold";
		elem.style.textDecoration = "blink";
		var res = document.getElementById("res");
		res.parentNode.insertBefore(elem, res.nextSibling);
	},
	
	processResults: function(responseText)
	{
		this.navbar.style.display = "none";
		var nextResult = this.navbar.appendChild(document.createElement('div'));
		nextResult.style.display = "none";
		nextResult.innerHTML = responseText;
		
		var list = document.evaluate (".//div[@id='res']/div/div[@class='g']", nextResult, null, 
										XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 	
    	for (var i = 0; i < list.snapshotLength; i++)
    	{
    		this.resultsToTable(list, i);
    	}

		var isNextExist = document.evaluate (".//div[@id='nn']", nextResult, null, 
											XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;    	
		if (isNextExist) 
		{
			this.startNumber += this.itemsQuantity;
		} 
		else 
		{
			this.insertEndText();
		}
		
		this.navbar.removeChild(nextResult);
	},

	requestMoreResults: function()
	{
		if (this.requested == this.startNumber) 
		{
			return;
		}
		else
		{
			this.requested = this.startNumber;
			this.navbar.style.display = "block";
			var base = "http://"+location.host+"/search";
			base += this.query.replace(/start=\d*/,"start=" + this.startNumber);
			this.UI.getURL(base, this.processResults.bind(this));
		}
	},
	
	remainingScroll: function() 
	{
		var sc = document.body.scrollTop;
		var total = (document.body.scrollHeight - document.body.clientHeight);
		return total - sc;
	},
	
	watchForScroll: function()
	{
		var self = arguments.callee;
		if (this.remainingScroll() < 500) {
			this.requestMoreResults();
		}
		setTimeout(self.bind(this),100);
	},
	
	insertLoadingImage: function()
	{
		var navbar = document.getElementById("navbar");
		this.navbar = navbar;
		if(navbar)
		{
			var div = document.createElement("div");
			with(div.style)
			{
				width = "114px";
				height = "34px";
				backgroundImage = "url(" + UIL.RES.LOADING_GIF + ")";
				backgroundRepeat = "no-repeat";
				margin = "auto";
			}
			var p = document.createElement("p");
			p.innerHTML = "Loading";
			with(p.style)
			{
				fontSize = "130%";
				fontWeight = "bold";
				padding = "5px 0 0 40px";
				margin = "0";
			}
			div.appendChild(p);
			navbar.replaceChild(div, navbar.firstChild);
			
		}
		else
		{
			this.insertEndText();
		}
		return navbar
	},
	
	initialiseAutoLoad: function()
	{
		if(document.getElementById('nn'))
		{
			var next = document.getElementById('nn').parentNode;
			var href = next.href;
			this.query = href.substr(href.indexOf("?"));
			this.startNumber = (this.query.match(/start=(\d*)/))[1] - 0;
			var tmp = this.query.match(/num=(\d*)/);
			this.itemsQuantity = tmp ? (tmp[1] - 0) : 10;
		}
	},

	buildResultTable: function()
	{
		var hue = UIL.Config.getResHue();
		if(hue.length==0)
		{
			hue = "#FFFFFF";
		}
		
		this._addStyle("@namespace url(http://www.w3.org/1999/xhtml); a:visited {color:#AAAA8B !important;} .g { margin-top: 0.15em !important; margin-right: 0.25em !important; margin-bottom: 0.15em !important; margin-left: 0.25em; -moz-border-radius: 10px ! important; background-color: "+ hue +" ! important; padding: 0.5em ! important; };");
		
		var table = document.createElement("table");
		this.resultsTable=table;
		table.setAttribute("id", "GoogleTabledResults");
		table.setAttribute("cellspacing", "5%");
		table.setAttribute("cellpadding", "0");
		var div = document.evaluate ("//div/div[@class='g']/parent::div", document, null, 
										XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(div)
		{
			this.startNumber = 0;
			this.numResults = UIL.Config.getNumResults();
			this.numColumns = UIL.Config.getNumCol();
			
			var b = document.evaluate ("//table[@class='t bt']//b", document, null,
											XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			this.dispStartNumber = (b && !isNaN(b.innerHTML)) ? parseInt(b.innerHTML) : 1;
			
			div.appendChild(table);
			var list = document.evaluate ("//div/div[@class='g']", document, null, 
											XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < list.snapshotLength; i++)
			{
				this.resultsToTable(list, i);
			}
		}
	},

	resultsToTable: function(list, i)
	{
		var link = list.snapshotItem(i);
		if(this.numResults)
		{
			link.innerHTML = "<strong>" + (i + this.startNumber + this.dispStartNumber) + "</strong>&nbsp;" + link.innerHTML;
		}
		if((i + this.startNumber) % this.numColumns == 0)
		{
			this.currentRow = this.resultsTable.insertRow(Math.floor( (i + this.startNumber) / this.numColumns) );
		}
		
		var a = document.evaluate (".//h2[@class='r']/a[@class='l' and @href]", link, null, 
										XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
		if(a)
		{
			if(this.externalLinksResults)
			{
				a.target = "_blank";
			}
			
			if(this.searchLinkTracking)
			{
				a.removeAttribute("onmousedown");
			}
			else
			{
				var ele = document.evaluate (".//nobr/a[position()=last() and @class='fl']", link, null, 
												XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (ele) {
					var notrack = document.createElement("a");
					notrack.href = a.href;
					if(this.externalLinksResults) 
					{
						notrack.target = "_blank";
					}
					notrack.innerHTML = "Trackless";
					notrack.setAttribute("class", "fl");
					notrack.setAttribute("title", "Visit the link without Google tracking you");
					ele.parentNode.appendChild(document.createTextNode(" - "), ele.nextSibling);
					ele.parentNode.appendChild(notrack, ele.nextSibling);
				}
			}
		}
		var cell = this.currentRow.insertCell((i + this.startNumber) % this.numColumns);
		cell.setAttribute("valign", "top");
		//cell.setAttribute("id", i);
		cell.appendChild(link);
	},

	externalLinks: function(scope)
	{
		var thisdomain = window.location.host;
		var links = scope.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
		    var a = links[i];
		    if (a.host && a.host != thisdomain) {
		        a.target = "_blank";
		    }
		}		
	},

    registerControls: function(pageType)
    {
        var controls =
            document.evaluate("//div[@id='guser']/nobr/a[1]", document, null,
            					XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (controls)
        {
        	var parent = controls.parentNode
            parent.insertBefore(this.createLinkControl("GoogleMonkeyR",
                                                        UIL.UI.show.bind(UIL.UI)),
                                  						controls);
            parent.insertBefore(document.createTextNode(" | "), controls);
        }
        GM_registerMenuCommand("GoogleMonkeyR Preferences",	UIL.UI.show.bind(UIL.UI));
    },

    createLinkControl: function(name, handler)
    {
        var a = document.createElement("a");
        a.href = "#";
        a.appendChild(document.createTextNode(name));
        a.addEventListener("click", handler, false);
        return a;
    },
    
    _addStyle: function(css)
    {
		if (typeof GM_addStyle != "undefined") {
		    GM_addStyle(css);
		} else if (typeof addStyle != "undefined") {
		    addStyle(css);
		} else {
		    var heads = document.getElementsByTagName("head");
		    if (heads.length > 0) {
		        var node = document.createElement("style");
		        node.type = "text/css";
		        node.innerHTML = css;
		        heads[0].appendChild(node); 
		    }
		}
    }
    
};

/**
 * Configuration.
**/
UIL.Config =
{
    getResHue: function()
    {
        return this._getBooleanConfig("resHue", "#E5ECF9");
    },

    setResHue: function(resHue)
    {
    	resHue = resHue.toUpperCase();
    	if(!resHue.match(/#[0-9A-F][0-9A-F][0-9A-F][0-9A-F]/))
    	{
    		resHue = "";
    	}
        GM_setValue("resHue", resHue);
    },

    getNumCol: function()
    {
        return this._getBooleanConfig("numCol", 1);
    },

    setNumCol: function(numCol)
    {
        GM_setValue("numCol", numCol);
    },

    getRemSponsor: function()
    {
        return this._getBooleanConfig("remSponsor", false);
    },

    setRemSponsor: function(remSponsor)
    {
        GM_setValue("remSponsor", remSponsor);
    },

    getNumResults: function()
    {
        return this._getBooleanConfig("numResults", false);
    },

    setNumResults: function(numResults)
    {
        GM_setValue("numResults", numResults);
    },

    getAutoLoad: function()
    {
        return this._getBooleanConfig("autoLoad", false);
    },

    setAutoLoad: function(autoLoad)
    {
        GM_setValue("autoLoad", autoLoad);
    },

    getHideSearch: function()
    {
        return this._getBooleanConfig("hideSearch", false);
    },

    setHideSearch: function(hideSearch)
    {
        GM_setValue("hideSearch", hideSearch);
    },

    getExtLinkSearch: function()
    {
        return this._getBooleanConfig("extLinkSearch", false);
    },

    setExtLinkSearch: function(extLinkSearch)
    {
        GM_setValue("extLinkSearch", extLinkSearch);
    },

    getExtLinkiGoogle: function()
    {
        return this._getBooleanConfig("extLinkiGoogle", false);
    },

    setExtLinkiGoogle: function(extLinkiGoogle)
    {
        GM_setValue("extLinkiGoogle", extLinkiGoogle);
    },

    getSearchLinkTracking: function()
    {
        return this._getBooleanConfig("searchLinkTracking", false);
    },

    setSearchLinkTracking: function(searchLinkTracking)
    {
        GM_setValue("searchLinkTracking", searchLinkTracking);
    },

    _getBooleanConfig: function(configName, defaultValue)
    {
        var config = GM_getValue(configName);
        if (config === undefined)
        {
            GM_setValue(configName, defaultValue);
            config = defaultValue;
        }
        return config;
    }
};

/**
 * Preferences User Interface (UI).
**/
UIL.UI =
{
    show: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        var blocker = document.createElement("div");
        this.blocker = blocker;
        blocker.id = "uil_blocker";
        with(blocker.style)
        {
	        position = "fixed";
	        top = "0px";
	        right = "0px";
	        bottom = "0px";
	        left = "0px";

	        backgroundColor = "#000";
	        opacity = "0.5";
        }
        document.body.appendChild(blocker);

        var prefs = document.createElement("iframe");
        prefs.addEventListener("load", this.preferenceDocumentLoadHandler.bind(this), false);
        this.prefs = prefs;

        document.body.appendChild(prefs);

        prefs.id = "uil_preferences";
        prefs.name = "uil_preferences";
        with(prefs.style)
        {
	        position = "fixed";
	        top = "5%";
	        left = "0px";
	        right = "0px";
	        border = "none";
	        height = "100%";
	        width = "100%";
	        overflow = "hidden";
        }
        prefs.src = UIL.RES.PREFS_HTML;
    },

    showUpdate: function()
    {
        var arr = this.response.split(/\n/);
        var dir = arr.shift();
        var str = arr.join("\n");
        
        if(confirm(str))
        {
			try{
				window.location.replace(UIL.scriptBase);
			}
			catch(e)
			{}
			document.body.removeChild(this.prefs);
			setTimeout(this.showRefresh.bind(this),4000);
        }
    },

	showRefresh: function()
	{
		var prefs = document.createElement("iframe");
        document.body.appendChild(prefs);
        with(prefs.style)
        {
	        position = "fixed";
	        top = "20%";
	        left = "0px";
	        right = "0px";
	        border = "none";
	        height = "100%";
	        width = "100%";
	        overflow = "hidden";
        }
        prefs.src = UIL.RES.REFRESH_HTML;
	},
	
	hide: function()
    {
        document.body.removeChild(this.prefs);
        document.body.removeChild(this.blocker);
        this.prefs = null;
        this.blocker = null;
    },

    preferenceDocumentLoadHandler: function()
    {
        var form = this.prefs.contentDocument.forms.namedItem("preferences");

        // Set up form state
        form.elements.namedItem("numcol" + UIL.Config.getNumCol()).checked = true;
        form.elements.namedItem("remsponsor").checked = UIL.Config.getRemSponsor();
        form.elements.namedItem("numresults").checked = UIL.Config.getNumResults();
        form.elements.namedItem("autoload").checked = UIL.Config.getAutoLoad();
        form.elements.namedItem("hidesearch").checked = UIL.Config.getHideSearch();
        form.elements.namedItem("extlinksearch").checked = UIL.Config.getExtLinkSearch();
        form.elements.namedItem("extlinkigoogle").checked = UIL.Config.getExtLinkiGoogle();
        form.elements.namedItem("searchlinktracking").checked = UIL.Config.getSearchLinkTracking();
        form.elements.namedItem("ResHuefield").value = UIL.Config.getResHue();
        //this.prefs.contentDocument.getElementById("ResHue").style.color = UIL.Config.getResHue();
        this.prefs.contentDocument.getElementById("ResHue").style.background = UIL.Config.getResHue();

	    
        // Set up event handlers
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
        form.elements.namedItem("save_button").addEventListener("click", this.saveConfigurationHandler.bind(this), false);
        this.prefs.contentDocument.getElementById("version").innerHTML=UIL.version.join(".");
        this.getURL(UIL.base+"/version.txt", this.checkForUpdate.bind(this));
    },
    	
	getURL: function(address, cb)
	{
		GM_xmlhttpRequest({
			method:"GET",
			url:address,//+"?"+Math.random(),
			onload:function(xhr) { cb(xhr.responseText); }
		});
	},
	
	checkForUpdate: function(response)
	{
		this.response=response;
		var responseArr = response.split(/\s/);
		var remoteVersion = responseArr[0];
		var remoteVersionArr = remoteVersion.split(".", 3);
		for(var i=0; i<remoteVersionArr.length; i++)
		{
			if(UIL.version[i]<remoteVersionArr[i])
			{
				break;
			}
		}
		var link = this.prefs.contentDocument.getElementById("check_update");
		link.setAttribute("target", "_top");
		if(i!=remoteVersionArr.length)
		{
			link.addEventListener("click", this.showUpdate.bind(this), false);
			link.setAttribute("title", "see whats new with GoogleMonkeyR...");
			link.style.textDecoration = "blink";
			link.innerHTML = "v"+remoteVersion+" available";
		}
		else
		{
			link.setAttribute("href", UIL.base+"/history.php");
			link.setAttribute("title", "the history of GoogleMonkeyR");
			link.innerHTML = "history";
			link.parentNode.appendChild(document.createTextNode(" - "));
			var link2 = document.createElement("a");
			link2.setAttribute("href", "http://"+ location.hostname +"/preferences");
			link2.setAttribute("target", "_parent");
			link2.setAttribute("title", "your Google preferences");
			link2.innerHTML = "prefs";
			link.parentNode.appendChild(link2);
			link.parentNode.appendChild(document.createTextNode(" - "));
			var link3 = document.createElement("a");
			link3.setAttribute("href", "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mungushume@hotmail.com&item_name=GreaseMonkey%20programming/beer%20fund&no_shipping=0&no_note=1&tax=0&currency_code=GBP&lc=GB&bn=PP-DonationsBF&charset=UTF-8");
			link3.setAttribute("target", "_parent");
			link3.setAttribute("title", "donate to the GoogleMonkeyR programming/beer fund");
			link3.innerHTML = "donate";
			link.parentNode.appendChild(link3);
		}
	},
	
    saveConfigurationHandler: function()
    {
        var form = this.prefs.contentDocument.forms.namedItem("preferences");
        for(var i = 1; i <= 4; i++)
        {
        	if(form.elements.namedItem("numcol" + i).checked)
        	{
        		UIL.Config.setNumCol(i);
        		break;
        	}
        }
        UIL.Config.setRemSponsor(form.elements.namedItem("remsponsor").checked);
        UIL.Config.setNumResults(form.elements.namedItem("numresults").checked);
        UIL.Config.setAutoLoad(form.elements.namedItem("autoload").checked);
        UIL.Config.setHideSearch(form.elements.namedItem("hidesearch").checked);
        UIL.Config.setExtLinkSearch(form.elements.namedItem("extlinksearch").checked);
        UIL.Config.setExtLinkiGoogle(form.elements.namedItem("extlinkigoogle").checked);
        UIL.Config.setSearchLinkTracking(form.elements.namedItem("searchlinktracking").checked);
        UIL.Config.setResHue(form.elements.namedItem("ResHuefield").value);
        this.hide();
        window.location.replace(window.location.href);
    }
};

/**
 * Resource section (RES).
**/
UIL.RES = 
{
	PREFS_HTML:"data:text/html;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VOIiAiaHR0cDovL3"+
		"d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD48aGVhZD48dGl0bGU%2BR29vZ2xlTW9ua2V5IFByZWZlcm"+
		"VuY2VzPC90aXRsZT4NCg0KPG1ldGEgaHR0cC1lcXVpdj0iQ29udGVudC1UeXBlIiBjb250ZW50PSJ0ZXh0L2h0bWw7IGNoYXJzZX"+
		"Q9VVRGLTgiPg0KPG1ldGEgbmFtZT0iQXV0aG9yIiBjb250ZW50PSJtdW5ndXNodW1lIj4NCjxtZXRhIG5hbWU9IkNvcHlyaWdodC"+
		"IgY29udGVudD0iwqkgMjAwNywgTW9ua2V5Ui5jb20iPg0KPG1ldGEgbmFtZT0iT3JpZ2luYWxBdXRob3IiIGNvbnRlbnQ9Ikpvbm"+
		"F0aGFuIEJ1Y2hhbmFuIj4NCjxtZXRhIG5hbWU9Ik9yaWdpbmFsQ29weXJpZ2h0IiBjb250ZW50PSLCqSAyMDA2LCBKb25hdGhhbi"+
		"BCdWNoYW5hbiI%2BDQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KYm9keSB7IG1hcmdpbjowOyBwYWRkaW5nOjA7IGZvbnQtc2l6"+
		"ZToxMnB4OyBmb250LWZhbWlseToiTHVjaWRhIEdyYW5kZSIsIkJpdHN0cmVhbSBWZXJhIFNhbnMiLFZlcmRhbmEsQXJpYWwsc2Fu"+
		"cy1zZXJpZjsgY29sb3I6IzMzMzsgd2lkdGg6IDU1MHB4OyBtYXJnaW46IDAgYXV0bzsgfQ0KI2NvbG9ycGlja2VyIHsgcG9zaXRp"+
		"b246IGFic29sdXRlOyBib3JkZXI6ICMwMDAwMDAgMXB4IHNvbGlkOyBiYWNrZ3JvdW5kOiAjRkZGRkZGOyBkaXNwbGF5OiBub25l"+
		"OyB9DQoubW9kdWxlIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgbWFyZ2luLWJvdHRvbTogNXB4OyBiYWNrZ3JvdW5kLWNvbG9y"+
		"OiAjZmZmOyB9DQoubW9kdWxlIGgyLCAubW9kdWxlIGNhcHRpb24geyBtYXJnaW46IDA7IHBhZGRpbmc6IDJweCA1cHggM3B4IDVw"+
		"eDsgZm9udC1zaXplOiAxMXB4OyBmb250LXdlaWdodDogYm9sZDsgYmFja2dyb3VuZDogI0NDQ0NDQyB1cmwoImRhdGE6aW1hZ2Uv"+
		"Z2lmO2Jhc2U2NCxSMGxHT0RsaEFRQVdBTVFBQU1qS3lzWEh4OSUyRmg0YyUyRlIwZVBsNWNiSXlOUFYxYzNQeiUyQmZwNmQ3aDRl"+
		"N3c4T3Z0N2N2TnpkZloyZUhqNDl2ZDNmRHk4Z0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFB"+
		"QUFBQUFBQUFBQUFBQ0g1QkFBQUFBQUFMQUFBQUFBQkFCWUFBQVVTSUNRcUMwSUlUM01FQmNBTVJ2TWtqaE1DQURzJTNEIikgdG9w"+
		"IGxlZnQgcmVwZWF0LXg7IGNvbG9yOiAjNjY2NjY2OyBib3JkZXItYm90dG9tOiAwOyB9DQouZm9ybS1yb3cgeyBvdmVyZmxvdzog"+
		"aGlkZGVuOyBwYWRkaW5nOiA4cHggMTJweDsgZm9udC1zaXplOiAxMXB4OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsg"+
		"Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VlZTsgfQ0KLmZvcm0tcm93IGltZywgLmZvcm0tcm93IGlucHV0IHsgdmVydGljYWwt"+
		"YWxpZ246IG1pZGRsZTsgfQ0KLmFsaWduZWQgbGFiZWwgeyBwYWRkaW5nOiAwIDFlbSAzcHggMDsgZmxvYXQ6IGxlZnQ7IHdpZHRo"+
		"OiBhdXRvOyB9DQouY2hlY2tib3gtcm93IGxhYmVsIHsgcGFkZGluZzogMDsgZmxvYXQ6IG5vbmU7IHdpZHRoOiBhdXRvOyB9DQpp"+
		"bnB1dC5idG4gewlwYWRkaW5nOiAwcHggMTBweCAwcHggMTBweDsgY29sb3I6ICM5OTk5OTk7IGJhY2tncm91bmQtY29sb3I6IFdo"+
		"aXRlOyBmb250LXdlaWdodDogYm9sZDsgYm9yZGVyOiBzb2xpZCAxcHggI0NDQ0NDQzsgdGV4dC1hbGlnbjogY2VudGVyOyB9DQpp"+
		"bnB1dC5idG46aG92ZXIgewlwYWRkaW5nOiAxcHggMTFweCAxcHggMTFweDsgY29sb3I6ICMzMzMzMzM7IGJvcmRlci1jb2xvcjog"+
		"IzY2NjY2NjsgfQ0KYSB7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzk5OTk5OTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBj"+
		"dXJzb3I6IHBvaW50ZXI7IH0NCmE6aG92ZXIgewlmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICMzMzMzMzM7IHRleHQtZGVjb3Jh"+
		"dGlvbjogbm9uZTsgfQ0KPC9zdHlsZT4NCjxzY3JpcHQgbGFuZ3VhZ2U9IkphdmFzY3JpcHQiPg0KLy8gQ29sb3IgUGlja2VyIFNj"+
		"cmlwdCBmcm9tIEZsb29ibGUuY29tDQovLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgdmlzaXQgDQovLwlodHRwOi8vd3d3LmZsb29i"+
		"bGUuY29tL3NjcmlwdHMvY29sb3JwaWNrZXIucGhwDQovLyBDb3B5cmlnaHQgMjAwMyBBbmltdXMgUGFjdHVtIENvbnN1bHRpbmcg"+
		"aW5jLg0KLy8gWW91IG1heSB1c2UgYW5kIGRpc3RyaWJ1dGUgdGhpcyBjb2RlIGZyZWVseSwgYXMgbG9uZyBhcw0KLy8geW91IGtl"+
		"ZXAgdGhpcyBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGUgbGluayB0byBmbG9vYmxlLmNvbQ0KLy8gaWYgeW91IGNob3NlIHRvIHJl"+
		"bW92ZSB0aGVtLCB5b3UgbXVzdCBsaW5rIHRvIHRoZSBwYWdlDQovLyBsaXN0ZWQgYWJvdmUgZnJvbSBldmVyeSB3ZWIgcGFnZSB3"+
		"aGVyZSB5b3UgdXNlIHRoZSBjb2xvcg0KLy8gcGlja2VyIGNvZGUuDQovLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t"+
		"LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQ0KICAgICB2YXIgcGVybGluZSA9IDU7DQogICAgIHZhciBkaXZTZXQgPSBmYWxzZTsN"+
		"CiAgICAgdmFyIGN1cklkOw0KICAgICB2YXIgY29sb3JMZXZlbHMgPSBBcnJheSgnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0Yn"+
		"KTsNCiAgICAgdmFyIGNvbG9yQXJyYXkgPSBBcnJheSgpOw0KDQogICAgIGZ1bmN0aW9uIGFkZENvbG9yKHIsIGcsIGIpIHsNCiAg"+
		"ICAgCWNvbG9yQXJyYXlbY29sb3JBcnJheS5sZW5ndGhdID0gJyMnICsgY29sb3JMZXZlbHNbcl0gKyBjb2xvckxldmVsc1tyXSAr"+
		"IGNvbG9yTGV2ZWxzW2ddICsgY29sb3JMZXZlbHNbZ10gKyBjb2xvckxldmVsc1tiXSArIGNvbG9yTGV2ZWxzW2JdOw0KICAgICB9"+
		"DQoJIA0KICAgICBmdW5jdGlvbiBzZXRDb2xvcihjb2xvcikgew0KICAgICAJdmFyIGxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50"+
		"QnlJZChjdXJJZCk7DQogICAgIAl2YXIgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJJZCArICdmaWVsZCcpOw0K"+
		"ICAgICAJdmFyIHBpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvcnBpY2tlcicpOw0KICAgICAJZmllbGQudmFs"+
		"dWUgPSBjb2xvcjsNCiAgICAgCWlmIChjb2xvciA9PSAnJykgew0KCSAgICAgCWxpbmsuc3R5bGUuYmFja2dyb3VuZCA9ICdub25l"+
		"JzsNCgkgICAgIAlsaW5rLnN0eWxlLmNvbG9yID0gJ25vbmUnOw0KCSAgICAgCWNvbG9yID0gJ25vbmUnOw0KICAgICAJfSBlbHNl"+
		"IHsNCgkgICAgIAlsaW5rLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjsNCgkgICAgIAlsaW5rLnN0eWxlLmNvbG9yID0gY29sb3I7"+
		"DQoJICAgIH0NCiAgICAgCXBpY2tlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOw0KCSAgICBldmFsKGRvY3VtZW50LmdldEVsZW1l"+
		"bnRCeUlkKGN1cklkICsgJ2ZpZWxkJykudGl0bGUpOw0KICAgICB9DQogICAgICAgIA0KICAgICBmdW5jdGlvbiBzZXREaXYoaWQp"+
		"IHsgICAgIA0KICAgICAJaWYgKCFkb2N1bWVudC5jcmVhdGVFbGVtZW50KSB7IHJldHVybjsgfQ0KICAgICAgICB2YXIgZGl2ID0g"+
		"ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7DQogICAgICAgIGlmICh0eXBlb2YoZGl2LmlubmVySFRNTCkgIT0gJ3N0cmlu"+
		"ZycpIHsgcmV0dXJuOyB9DQogICAgICAgIGdlbkNvbG9ycygpOw0KICAgICAgICBkaXYuaWQgPSAnY29sb3JwaWNrZXInOw0KICAg"+
		"ICAgIAlkaXYuaW5uZXJIVE1MID0gJzxzcGFuIHN0eWxlPSJmb250LWZhbWlseTpWZXJkYW5hOyBmb250LXNpemU6MTFweDsiPjxh"+
		"IGhyZWY9ImphdmFzY3JpcHQ6c2V0Q29sb3IoXCdcJyk7Ij5ObyBjb2xvcjwvYT48YnI%2BJyArIGdldENvbG9yVGFibGUoKSArIC"+
		"c8L3NwYW4%2BJzsNCiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpOw0KICAgICAgICBkaXZTZXQgPSB0cnVl"+
		"Ow0KICAgICB9DQogICAgIA0KICAgICBmdW5jdGlvbiBwaWNrQ29sb3IoaWQpIHsNCiAgICAgCWlmICghZGl2U2V0KSB7IHNldERp"+
		"dihpZCk7IH0NCiAgICAgCXZhciBwaWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JwaWNrZXInKTsgICAgIAkN"+
		"CgkJaWYgKGlkID09IGN1cklkICYmIHBpY2tlci5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHsNCgkJCXBpY2tlci5zdHlsZS5k"+
		"aXNwbGF5ID0gJ25vbmUnOw0KCQkJcmV0dXJuOw0KCQl9DQogICAgIAljdXJJZCA9IGlkOw0KICAgICAJdmFyIHRoZWxpbmsgPSBk"+
		"b2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7DQogICAgIAlwaWNrZXIuc3R5bGUudG9wID0gKGdldEFic29sdXRlT2Zmc2V0VG9w"+
		"KHRoZWxpbmspICsgMjApICsgInB4IjsNCgkJcGlja2VyLnN0eWxlLmxlZnQgPSBnZXRBYnNvbHV0ZU9mZnNldExlZnQodGhlbGlu"+
		"aykgKyAicHgiOyAgIA0KCQlwaWNrZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7DQogICAgIH0NCiAgICAgDQogICAgIGZ1bmN0"+
		"aW9uIGdlbkNvbG9ycygpIHsNCiAgICAgICAgZm9yIChhID0gMDsgYSA8IGNvbG9yTGV2ZWxzLmxlbmd0aC0xOyBhKyspDQoJCQlh"+
		"ZGRDb2xvcihhLGEsNSk7DQoNCiAgICAgICAgZm9yIChhID0gMDsgYSA8IGNvbG9yTGV2ZWxzLmxlbmd0aC0xOyBhKyspDQoJCQlh"+
		"ZGRDb2xvcihhLDUsYSk7DQoJCQkNCiAgICAgICAgZm9yIChhID0gMDsgYSA8IGNvbG9yTGV2ZWxzLmxlbmd0aC0xOyBhKyspDQoJ"+
		"CQlhZGRDb2xvcig1LGEsYSk7DQoJCQkNCiAgICAgICAgZm9yIChhID0gMDsgYSA8IGNvbG9yTGV2ZWxzLmxlbmd0aC0xOyBhKysp"+
		"DQoJCQlhZGRDb2xvcig1LDUsYSk7DQoJCQkNCiAgICAgICAgZm9yIChhID0gMDsgYSA8IGNvbG9yTGV2ZWxzLmxlbmd0aC0xOyBh"+
		"KyspDQoJCQlhZGRDb2xvcihhLDUsNSk7DQoNCiAgICAgICAgZm9yIChhID0gMDsgYSA8IGNvbG9yTGV2ZWxzLmxlbmd0aC0xOyBh"+
		"KyspDQoJCQlhZGRDb2xvcig1LGEsNSk7DQoJCQ0KCQljb2xvckFycmF5W2NvbG9yQXJyYXkubGVuZ3RoXSA9ICIjRTVFQ0Y5IjsN"+
		"CgkJY29sb3JBcnJheVtjb2xvckFycmF5Lmxlbmd0aF0gPSAiI0ZBRkFFNiI7DQoJCQ0KICAgICAgIAlyZXR1cm4gY29sb3JBcnJh"+
		"eTsNCiAgICAgfQ0KICAgICBmdW5jdGlvbiBnZXRDb2xvclRhYmxlKCkgew0KICAgICAgICAgdmFyIGNvbG9ycyA9IGNvbG9yQXJy"+
		"YXk7DQogICAgICAJIHZhciB0YWJsZUNvZGUgPSAnJzsNCiAgICAgICAgIHRhYmxlQ29kZSArPSAnPHRhYmxlIGJvcmRlcj0iMCIg"+
		"Y2VsbHNwYWNpbmc9IjEiIGNlbGxwYWRkaW5nPSIxIj4nOw0KICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7"+
		"IGkrKykgew0KICAgICAgICAgICAgICBpZiAoaSAlIHBlcmxpbmUgPT0gMCkgeyB0YWJsZUNvZGUgKz0gJzx0cj4nOyB9DQogICAg"+
		"ICAgICAgICAgIHRhYmxlQ29kZSArPSAnPHRkIGJnY29sb3I9IiMwMDAwMDAiPjxhIHN0eWxlPSJvdXRsaW5lOiAxcHggc29saWQg"+
		"IzAwMDAwMDsgY29sb3I6ICcgDQogICAgICAgICAgICAgIAkgICsgY29sb3JzW2ldICsgJzsgYmFja2dyb3VuZDogJyArIGNvbG9y"+
		"c1tpXSArICc7Zm9udC1zaXplOiAxMXB4OyIgdGl0bGU9IicgDQogICAgICAgICAgICAgIAkgICsgY29sb3JzW2ldICsgJyIgaHJl"+
		"Zj0iamF2YXNjcmlwdDpzZXRDb2xvcihcJycgKyBjb2xvcnNbaV0gKyAnXCcpOyI%2BJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC"+
		"9hPjwvdGQ%2BJzsNCiAgICAgICAgICAgICAgaWYgKGkgJSBwZXJsaW5lID09IHBlcmxpbmUgLSAxKSB7IHRhYmxlQ29kZSArPSAn"+
		"PC90cj4nOyB9DQogICAgICAgICB9DQogICAgICAgICBpZiAoaSAlIHBlcmxpbmUgIT0gMCkgeyB0YWJsZUNvZGUgKz0gJzwvdHI%"+
		"2BJzsgfQ0KICAgICAgICAgdGFibGVDb2RlICs9ICc8L3RhYmxlPic7DQogICAgICAJIHJldHVybiB0YWJsZUNvZGU7DQogICAgIH"+
		"0NCiAgICAgZnVuY3Rpb24gcmVsYXRlQ29sb3IoaWQsIGNvbG9yKSB7DQogICAgIAl2YXIgbGluayA9IGRvY3VtZW50LmdldEVsZW"+
		"1lbnRCeUlkKGlkKTsNCiAgICAgCWlmIChjb2xvciA9PSAnJykgew0KCSAgICAgCWxpbmsuc3R5bGUuYmFja2dyb3VuZCA9ICdub2"+
		"5lJzsNCgkgICAgIAlsaW5rLnN0eWxlLmNvbG9yID0gJ25vbmUnOw0KCSAgICAgCWNvbG9yID0gJ25vbmUnOw0KICAgICAJfSBlbH"+
		"NlIHsNCgkgICAgIAlsaW5rLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjsNCgkgICAgIAlsaW5rLnN0eWxlLmNvbG9yID0gY29sb3"+
		"I7DQoJICAgIH0NCgkgICAgZXZhbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCArICdmaWVsZCcpLnRpdGxlKTsNCiAgICAgfQ"+
		"0KICAgICBmdW5jdGlvbiBnZXRBYnNvbHV0ZU9mZnNldFRvcChvYmopIHsNCiAgICAgCXZhciB0b3AgPSBvYmoub2Zmc2V0VG9wOw"+
		"0KICAgICAJdmFyIHBhcmVudCA9IG9iai5vZmZzZXRQYXJlbnQ7DQogICAgIAl3aGlsZSAocGFyZW50ICE9IGRvY3VtZW50LmJvZH"+
		"kpIHsNCiAgICAgCQl0b3AgKz0gcGFyZW50Lm9mZnNldFRvcDsNCiAgICAgCQlwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50Ow"+
		"0KICAgICAJfQ0KICAgICAJcmV0dXJuIHRvcDsNCiAgICAgfQ0KICAgICANCiAgICAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVPZmZzZX"+
		"RMZWZ0KG9iaikgew0KICAgICAJdmFyIGxlZnQgPSBvYmoub2Zmc2V0TGVmdDsNCiAgICAgCXZhciBwYXJlbnQgPSBvYmoub2Zmc2"+
		"V0UGFyZW50Ow0KICAgICAJd2hpbGUgKHBhcmVudCAhPSBkb2N1bWVudC5ib2R5KSB7DQogICAgIAkJbGVmdCArPSBwYXJlbnQub2"+
		"Zmc2V0TGVmdDsNCiAgICAgCQlwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50Ow0KICAgICAJfQ0KICAgICAJcmV0dXJuIGxlZn"+
		"Q7DQogICAgIH0NCjwvc2NyaXB0Pg0KPC9oZWFkPjxib2R5IG9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9InByZWZlcmVuY2VzIiBpZD"+
		"0icHJlZmVyZW5jZXMiIGNsYXNzPSJhbGlnbmVkIj4NCiAgPGRpdiBjbGFzcz0ibW9kdWxlIiBpZD0icm9vdCI%2BDQogICAgPHRh"+
		"YmxlIGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJvZH"+
		"k%2BPHRyPg0KICAgICAgICA8dGQ%2BPGgyPkdvb2dsZU1vbmtleVIgOjogdjxzcGFuIGlkPSJ2ZXJzaW9uIj4xLjAuMDwvc3Bhbj"+
		"48L2gyPjwvdGQ%2BDQogICAgICAgIDx0ZCBhbGlnbj0icmlnaHQiPjxoMj48YSBocmVmPSJodHRwOi8vd3d3Lm1vbmtleXIuY29t"+
		"LyIgdGFyZ2V0PSJfdG9wIj5Nb25rZXlSLmNvbTwvYT48L2gyPjwvdGQ%2BDQogICAgICA8L3RyPg0KICAgIDwvdGJvZHk%2BPC90"+
		"YWJsZT4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0ibnVtY29sMSI%"+
		"2BDQogICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iMSIgaWQ9Im51bWNvbDEiIHR5cGU9InJhZGlvIj4NCiAgICAgID"+
		"EgY29sdW1uIDwvbGFiZWw%2BDQogICAgICAmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsNCiAgICAgIDxsYWJlbCBmb3I9Im51bWNv"+
		"bDIiPg0KICAgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjIiIGlkPSJudW1jb2wyIiB0eXBlPSJyYWRpbyI%2BDQogIC"+
		"AgICAyIGNvbHVtbnM8L2xhYmVsPg0KICAgICAgJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJudW"+
		"1jb2wzIj4NCiAgICAgIDxpbnB1dCBuYW1lPSJudW1jb2wiIHZhbHVlPSIzIiBpZD0ibnVtY29sMyIgdHlwZT0icmFkaW8iPg0KIC"+
		"AgICAgMyBjb2x1bW5zPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0ibn"+
		"VtY29sNCI%2BDQogICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iNCIgaWQ9Im51bWNvbDQiIHR5cGU9InJhZGlvIj4N"+
		"CiAgICAgIDQgY29sdW1uczwvbGFiZWw%2BDQogICAgICAmbmJzcDsmbmJzcDsoIG9mIHJlc3VsdHMgKSA8L2Rpdj4NCiAgICA8ZG"+
		"l2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0icmVtc3BvbnNvciI%2BDQogICAgICA8"+
		"aW5wdXQgbmFtZT0icmVtc3BvbnNvciIgaWQ9InJlbXNwb25zb3IiIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgIFJlbW92ZSAiU3Bv"+
		"bnNvcmVkIExpbmtzIiBmcm9tIHJlc3VsdHMgPC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBj"+
		"aGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0ibnVtcmVzdWx0cyI%2BDQogICAgICA8aW5wdXQgbmFtZT0ibnVtcmVzdW"+
		"x0cyIgaWQ9Im51bXJlc3VsdHMiIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgIE51bWJlciByZXN1bHRzICggMSwgMiwgMy4uLiBldG"+
		"MuICk8L2xhYmVsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BDQogICAgICA8"+
		"bGFiZWwgZm9yPSJhdXRvbG9hZCI%2BDQogICAgICA8aW5wdXQgbmFtZT0iYXV0b2xvYWQiIGlkPSJhdXRvbG9hZCIgdHlwZT0iY2"+
		"hlY2tib3giPg0KICAgICAgQXV0byBsb2FkIG1vcmUgcmVzdWx0czwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbG"+
		"Fzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImhpZGVzZWFyY2giPg0KICAgICAgPGlucHV0IG"+
		"5hbWU9ImhpZGVzZWFyY2giIGlkPSJoaWRlc2VhcmNoIiB0eXBlPSJjaGVja2JveCI%2BDQogICAgICBEb24ndCBkaXNwbGF5IHRo"+
		"ZSBHb29nbGUgd2ViIHNlYXJjaCBkaWFsb2d1ZXMgKCBJIHVzZSB0aGUgR29vZ2xlIHRvb2xiYXIgaW5zdGVhZCEgKTwvbGFiZWw%"+
		"2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCgkgIFNlbGVjdCB0aGUgYmFj"+
		"a2dyb3VuZCBjb2xvciAoIGh1ZSApIGZvciB5b3VyIHNlYXJjaCByZXN1bHRzJm5ic3A7Jm5ic3A7Jm5ic3A7DQoJCTxhIGhyZWY9"+
		"ImphdmFzY3JpcHQ6cGlja0NvbG9yKCdSZXNIdWUnKTsiIGlkPSJSZXNIdWUiIHN0eWxlPSJib3JkZXI6IDFweCBzb2xpZCAjMDAw"+
		"MDAwOyBmb250LWZhbWlseTpWZXJkYW5hOyBmb250LXNpemU6MTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyI%2BJm5ic3A7Jm"+
		"5ic3A7Jm5ic3A7Jm5ic3A7PC9hPg0KCQk8aW5wdXQgaWQ9IlJlc0h1ZWZpZWxkIiBzaXplPSI3IiBvbkNoYW5nZT0icmVsYXRlQ2"+
		"9sb3IoJ1Jlc0h1ZScsIHRoaXMudmFsdWUpOyI%2BJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PGEgaHJlZj0iaHR0cDovL3d3dy5m"+
		"bG9vYmxlLmNvbS9zY3JpcHRzL2NvbG9ycGlja2VyLnBocCIgdGFyZ2V0PSJfYmxhbmsiIHRpdGxlPSJmbG9vYmxlIGNvbG9yIHBp"+
		"Y2tlciBzY3JpcHQiIHN0eWxlPSJmb250LXNpemU6OHB4Ij5mbG9vYmxlPC9hPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9"+
		"ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BIE1ha2UgbXkgR29vZ2xlIGxpbmtzIG9wZW4gaW4gYSBuZXcgdGFyZ2V0ICZuYnNwOw"+
		"0KICAgICAgPGxhYmVsIGZvcj0iZXh0bGlua3NlYXJjaCI%2BDQogICAgICA8aW5wdXQgbmFtZT0iZXh0bGlua3NlYXJjaCIgaWQ9"+
		"ImV4dGxpbmtzZWFyY2giIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgIGZvciBzZWFyY2ggcmVzdWx0czwvbGFiZWw%2BDQogICAgIC"+
		"AmbmJzcDsmbmJzcDsNCiAgICAgIDxsYWJlbCBmb3I9ImV4dGxpbmtpZ29vZ2xlIj4NCiAgICAgIDxpbnB1dCBuYW1lPSJleHRsaW"+
		"5raWdvb2dsZSIgaWQ9ImV4dGxpbmtpZ29vZ2xlIiB0eXBlPSJjaGVja2JveCI%2BDQogICAgICBmb3IgaUdvb2dsZTwvbGFiZWw%"+
		"2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9"+
		"InNlYXJjaGxpbmt0cmFja2luZyI%2BDQogICAgICA8aW5wdXQgbmFtZT0ic2VhcmNobGlua3RyYWNraW5nIiBpZD0ic2VhcmNobG"+
		"lua3RyYWNraW5nIiB0eXBlPSJjaGVja2JveCI%2BDQogICAgICBEaXNhYmxlIEdvb2dsZSB0cmFja2luZyAgbXkgc2VhcmNoIHJl"+
		"c3VsdHMgPC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%2BDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPHRhYmxl"+
		"IGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJvZHk%2B"+
		"PHRyIGhlaWdodD0iMzAiPg0KICAgICAgICA8dGQgYWxpZ249ImxlZnQiIHZhbGlnbj0ibWlkZGxlIj4mbmJzcDsmbmJzcDsmbmJz"+
		"cDs8YSBocmVmPSIjIiBuYW1lPSJjaGVja191cGRhdGUiIGlkPSJjaGVja191cGRhdGUiPmNoZWNraW5nIGZvciB1cGRhdGUuLi48"+
		"L2E%2BPC90ZD4NCiAgICAgICAgPHRkIGFsaWduPSJjZW50ZXIiIHZhbGlnbj0ibWlkZGxlIiB3aWR0aD0iNzIiPjxpbnB1dCB2YW"+
		"x1ZT0iQ2xvc2UiIG5hbWU9ImNsb3NlX2J1dHRvbiIgaWQ9ImNsb3NlX2J1dHRvbiIgY2xhc3M9ImJ0biIgdHlwZT0iYnV0dG9uIj"+
		"4NCiAgICAgICAgPC90ZD4NCiAgICAgICAgPHRkIGFsaWduPSJjZW50ZXIiIHZhbGlnbj0ibWlkZGxlIiB3aWR0aD0iMTY1Ij48aW"+
		"5wdXQgdmFsdWU9IlNhdmUgUHJlZmVyZW5jZXMiIG5hbWU9InNhdmVfYnV0dG9uIiBpZD0ic2F2ZV9idXR0b24iIGNsYXNzPSJidG"+
		"4iIHR5cGU9ImJ1dHRvbiI%2BDQogICAgICAgIDwvdGQ%2BDQogICAgICA8L3RyPg0KICAgIDwvdGJvZHk%2BPC90YWJsZT4NCiAg"+
		"PC9kaXY%2BDQo8L2Zvcm0%2BDQo8L2JvZHk%2BPC9odG1sPg%3D%3D",
	
	REFRESH_HTML: "data:text/html;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VOIiAiaHR0cDovL3"+
		"d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD4NCjxoZWFkPg0KPHRpdGxlPkdvb2dsZU1vbmtleVIgVXBk"+
		"YXRlPC90aXRsZT4NCjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVU"+
		"Ri04Ij4NCjxtZXRhIG5hbWU9IkF1dGhvciIgY29udGVudD0ibXVuZ3VzaHVtZSI%2BDQo8bWV0YSBuYW1lPSJDb3B5cmlnaHQiIG"+
		"NvbnRlbnQ9IsKpIDIwMDcsIE1vbmtleVIuY29tIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BDQpib2R5IHsgbWFyZ2luOjA7"+
		"IHBhZGRpbmc6MDsgZm9udC1zaXplOjEycHg7IGZvbnQtZmFtaWx5OiJMdWNpZGEgR3JhbmRlIiwiQml0c3RyZWFtIFZlcmEgU2Fu"+
		"cyIsVmVyZGFuYSxBcmlhbCxzYW5zLXNlcmlmOyBjb2xvcjojMzMzOyB3aWR0aDogMzAwcHg7IG1hcmdpbjogMCBhdXRvOyB9DQou"+
		"bW9kdWxlIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgbWFyZ2luLWJvdHRvbTogNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZm"+
		"OyB9DQoubW9kdWxlIGgyIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAycHggNXB4IDNweCA1cHg7IGZvbnQtc2l6ZTogMTFweDsgZm9u"+
		"dC13ZWlnaHQ6IGJvbGQ7IGJhY2tncm91bmQ6ICNDQ0NDQ0MgdXJsKCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFX"+
		"QU1RQUFNakt5c1hIeDklMkZoNGMlMkZSMGVQbDVjYkl5TlBWMWMzUHolMkJmcDZkN2g0ZTd3OE92dDdjdk56ZGZaMmVIajQ5dmQz"+
		"ZkR5OGdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNINUJBQUFBQUFB"+
		"TEFBQUFBQUJBQllBQUFVU0lDUXFDMElJVDNNRUJjQU1Sdk1ramhNQ0FEcyUzRCIpIHRvcCBsZWZ0IHJlcGVhdC14OyBjb2xvcjog"+
		"IzY2NjY2NjsgYm9yZGVyLWJvdHRvbTogMDsgfQ0KLmZvcm0tcm93IHsgb3ZlcmZsb3c6IGhpZGRlbjsgcGFkZGluZzogMTJweCAx"+
		"MnB4OyBmb250LXNpemU6IDExcHg7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlOyBib3JkZXItcmlnaHQ6IDFweCBzb2xp"+
		"ZCAjZWVlOyB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7IHRleHQtYWxpZ246Y2VudGVyOyB9DQppbnB1dC5idG4gewlwYWRkaW5nOiAw"+
		"cHggMTBweCAwcHggMTBweDsgY29sb3I6ICM5OTk5OTk7IGJhY2tncm91bmQtY29sb3I6IFdoaXRlOyBmb250LXdlaWdodDogYm9s"+
		"ZDsgYm9yZGVyOiBzb2xpZCAxcHggI0NDQ0NDQzsgdGV4dC1hbGlnbjogY2VudGVyOyB9DQppbnB1dC5idG46aG92ZXIgewlwYWRk"+
		"aW5nOiAxcHggMTFweCAxcHggMTFweDsgY29sb3I6ICMzMzMzMzM7IGJvcmRlci1jb2xvcjogIzY2NjY2NjsgfQ0KYSB7IGZvbnQt"+
		"d2VpZ2h0OiBib2xkOyBjb2xvcjogIzk5OTk5OTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IH0NCmE6"+
		"aG92ZXIgewlmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICMzMzMzMzM7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfQ0KPC9zdHls"+
		"ZT4NCjwvaGVhZD4NCjxib2R5IG9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9InVwZGF0ZSIgaWQ9InVwZGF0ZSIgY2xhc3M9ImFsaWdu"+
		"ZWQiPg0KICA8ZGl2IGNsYXNzPSJtb2R1bGUiPg0KICAgIDx0YWJsZSB3aWR0aD0iMTAwJSIgYm9yZGVyPSIwIiBjZWxscGFkZGlu"+
		"Zz0iMCIgY2VsbHNwYWNpbmc9IjAiPg0KICAgICAgPHRyPg0KICAgICAgICA8dGQ%2BPGgyPkdvb2dsZU1vbmtleVI8L2gyPjwvdG"+
		"Q%2BDQogICAgICAgIDx0ZCBhbGlnbj0icmlnaHQiPjxoMj48YSBocmVmPSJodHRwOi8vd3d3Lm1vbmtleXIuY29tIiB0YXJnZXQ9"+
		"Il90b3AiPk1vbmtleVIuY29tPC9hPjwvaDI%2BPC90ZD4NCiAgICAgIDwvdHI%2BDQogICAgPC90YWJsZT4NCiAgICA8ZGl2IGNs"+
		"YXNzPSJmb3JtLXJvdyI%2BDQoJPHRhYmxlIHdpZHRoPSIxMDAlIiBib3JkZXI9IjAiIGNlbGxwYWRkaW5nPSIwIiBjZWxsc3BhY2"+
		"luZz0iMCI%2BDQoJPHRyPjx0ZCBoZWlnaHQ9IjQwIiBhbGlnbj0iY2VudGVyIiB2YWxpZ249Im1pZGRsZSI%2BUmVmcmVzaCB5b3"+
		"VyIGJyb3dzZXIgdG8gY29udGludWUuPC90ZD48L3RyPg0KCTx0cj48dGQgaGVpZ2h0PSI0MCIgYWxpZ249ImNlbnRlciIgdmFsaW"+
		"duPSJtaWRkbGUiPjxpbnB1dCBuYW1lPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biIgb25DbGljaz0iamF2YXNjcm"+
		"lwdDp0b3AubG9jYXRpb24ucmVwbGFjZSh0b3AubG9jYXRpb24pIiB2YWx1ZT0iUmVmcmVzaCI%2BPC90ZD48L3RyPg0KCTwvdGFi"+
		"bGU%2BPC9kaXY%2BDQogIDwvZGl2Pg0KPC9mb3JtPg0KPC9ib2R5Pg0KPC9odG1sPg0K",
	
	LOADING_GIF: "data:image/gif;base64,R0lGODlhIgAiAPQAADk5OVJSUlpaWmtra3t7e4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7Ozt"+
		"bW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAgFAAAAIf8LTkVU"+
		"U0NBUEUyLjADAQAAACwAAAAAIgAiAAAFhiAljmRJLYmprqx4AG1cBgb5yjjVCDacxxKBYnT7lQoI0mBA9BlHEOToIYC4nE9RNCUa"+
		"1CjFLLTAdQQmYKyYshUJkodAVhFBQwkpB2OtSygYEVMFVnwjDSh0hSwSDX6EiioOj5CUJRIPEJiamJATERESn6CflaWmp6ipqqus"+
		"ra6vsLGys6ohACH5BAgFAAAALAAAAAAiACIAhCEhISkpKVpaWmNjY2tra3Nzc4SEhIyMjJSUlKWlpa2trbW1tb29vcbGxs7OztbW"+
		"1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWTICWOZElJiqmuZkMqAi"+
		"urUPHG4wNEM2ukIsWAJAj0SBPSwzASjiQA15HyUCRFEoPUKSIApqNF4kpBALkUwAIctoqWSW4BQGYv3BTDmhs4sEsKQAx%2BCjYJ"+
		"ABBTDg91EwprKCQJBGwQixIjjg5%2FLBAPDhF1nCwRDw%2BJoz0SmKmtrq%2BwsbKztLW2t7i5uru8vb6%2FwL4hACH5BAgFAAAA"+
		"LAAAAAAiACIAhCEhISkpKTk5OUJCQkpKSlJSUlpaWmNjY3Nzc4SEhIyMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B"+
		"%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWT4CWOZCk6ZqqaFAkha5xSjJuQiiHHTTRCt1FBsltNGj"+
		"%2BYaKEriiQTUoXRugBHB%2BSoEpBFoiMHRPQSPQqVEQUg2H3VNWswobxMAIOiBTrqXR43FQU%2BdnhOFxZvFxFIEAsXDE0SAASH"+
		"IntRFYRmPpMFliOJVSkAn6BOQaeqq6ytrq%2BwsbKztLW2t7i5uru8vb6%2FwIchACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQlJS"+
		"UlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWVICWOZCk2Zqqu4qOwcDk55JOQShGvTzS6JMNrl3o8frdWwUc0TR6T1pCCMJAag2YL0k"+
		"pKCtyTYEqUHClASm6kGBy0I4fPJiqcGQOyFnKEvBYFUW0IcCQTTCIONHiEJBIMhSUSAo0iDAEAABKRJEwSCpkBBJwmDgKZBIikJA"+
		"UBOquwsbKztLW2t7i5uru8vb6%2FwMHCsCEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2tre3t7hISEjIyMlJSU"+
		"nJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAABYlgJY5kKU5mqq7nw76vBJGRAt%2FV5I4Ng8OyEWUh%2Bb0mM5FjQaIcjKWgSFE8GRJQkk70YJ4O2OxISrXaxKNJpNKlVCSH"+
		"M7oUcbzjpQdhPsKfHAMDT3wVDVwGgQluhCIQBAMFcowiDAlrk5g4CZucnIt8AgEAogClAAiZqaqrrK2ur7CxsrO0tbavIQAh%2BQ"+
		"QIBQAAACwAAAAAIgAiAIQhISEpKSlKSkpra2t7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B"+
		"%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjCAljmRpnmiqriwbPW1cOpJsS7AtQxA5KbqU"+
		"YzL6LYInSI4iURyRpkeN6YSaIg6RJMGwmiTEZte3tHJJkAOh4BVlmY8CIVH2QhCFArBdYiQafIE6BwaFBgSIBGNehAYIj48Lb4KU"+
		"IgkElSQKAAADPZkUCgEAAgagFAwCnAOnEQsARKeys7S1tre4uYEhACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWmNj"+
		"Y2tra4yMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAWEICWOZGmeaKqubOu%2BcCzP6EOvk2Pf6PRAvN4vePIBiSVjMkIcjiILRYIoEU0gUsaRGGEkFI4JcvRg"+
		"7MboVYOxbrjd1WDiQK%2FTGen8ArFNPwoDBVNoYhQPCQQDCExBCgANIzmJBkQEAA4lEINBlph5IgMAZ3mhfWkCAKZoAQCfrq%2Bw"+
		"sS8hACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e"+
		"3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWCYCWOZGmeaKqubOu%2BcCzPdG3f"+
		"eK7T1D5SkcfDN4E8IhId0Jj0SZC%2BaCoCqVqrucVCse0qHNLdgxGuPAwFxoQoghgMCUhOMmiMIgjDYVEzgBMDfCMTDQY1AQMiCQ"+
		"R2OggAaxWLgjkAlAuBOgUAJIAIcwCNIgsEOgIBZZuRUqFlPWUsIQAh%2BQQIBQAAACwAAAAAIgAiAIQxMTFSUlJaWlpjY2Nzc3OE"+
		"hISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAFgSAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8DgSRIhGosTHOTBbDIjwhvEAYQkFI2kD6JIMCA5BwEq"+
		"iiwU2BqDmiiARxKrLHCgHAQiRIFsA9QlAVQUenw0fiIFBCN6En11FA4BfAgEWjOHIgMIJHo1mHYCljefFIE6pAZ4OaQ8B28uIQAh"+
		"%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlCQkJSUlJaWlpjY2Nra2tzc3N7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbW1t"+
		"be3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkOAljmRpnmiqrmzrvnAsz3Rt33iu73zv"+
		"%2F8CgcEgcVShAS0QyqfwskigSR2k4RRaKJDJtRRqkyOQCcXSxkhfgcHEg2gpR%2BSqDAJAOw2WSmEKsMwIDInkiCg4jfxYxEwAP"+
		"hAUiDwmLkg6VLgwBIw6RIglpIw9gamyQnAk1diSdIxYJYzMBnoQEJAsLOg62T4gvIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISFaWl"+
		"pjY2Nzc3N7e3uEhISMjIycnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkeAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgs2hpAAiCCkjQkM6Vi4kiQHJ"+
		"DJw8GEDQDWycAwSSwmjKm20W19DyJIAHmYPhLdbVv1Hi0CIgdnZQ4jD2wrXwgkAXATCGoNYSJ6KgCOIg0BUBOCIwhZhkgvAgWfkw"+
		"yTMhEBg2WuEqA0miQIqgqjOAquPQy5LSEAIfkECAUAAAAsAAAAACIAIgCEISEhMTExOTk5SkpKWlpaY2Nja2trc3Nze3t7hISEjI"+
		"yMnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AABY%2BgJY5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHCIexgWPUQAIHjoJgYAoAARVXADaeMqigwit2ZJQkhYJNURhTuTDMyW"+
		"RMPiAEvAs0m5m7gywBURbC8TAwgjC0gWDXgREzEUBAdqCXh%2FIhNpL5IkEHCLeBYRFDYJDCOXInc1EocjjJ2DMAqnqKFntzapPo"+
		"IwIQAh%2BQQIBQAAACwAAAAAIgAiAIQ5OTlSUlJaWlpra2t7e3uEhISMjIyUlJScnJylpaWtra29vb3GxsbOzs7W1tbe3t7n5%2B"+
		"fv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFguAkjmRpnmiqrmzrvnAsz3Rt33"+
		"iu73zv%2F0DYAUAsEgO4xWHJZAaDEsSi9zAEBI7dYRAYNEQPnEEgIGRFiYLkJmhESOnsI6xLEOiK7%2BNtQxToDwkiDhB9fyMKDG"+
		"CFNH50ExAKfA58M4cjCwojlDoSeZuMOBCCIw%2BhN4kknD%2BrPhGVLSEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2"+
		"Nja2trc3Nze3t7hISEjIyMlJSUpaWlra2ttbW1vb29xsbG1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAABYRgJY5kaZ5oqq5s675wLM90bd94HgMOpZcEAAAB%2BZEMAYDAYRw9BkJmszI5LKY%2FCmPL5e"+
		"IYA4K4QC4ksOhRhCH9NRIIRUQ3YSAQDIloflPciyMODDhyJYJ6FBM%2FDguKFRB6OQ0MjhMPOow%2Be3w3k5oVFBCONwyfFRKAUw"+
		"%2BRTaFoq2mxNyEAIfkECAUAAAAsAAAAACIAIgCEISEhWlpaY2Njc3Nze3t7hISEjIyMnJycpaWlra2ttbW1vb29xsbGzs7O1tbW"+
		"3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYLgJI5kaZ5oqq5s"+
		"675wLJPAMLdIfbOHvqsK3w%2B1ABCGokakFBQgAwFBgxRkIBcF6AIiWiJFEoMgMHB8TQ1D4swmOQ4IBFyOWA8bi8RCwc8v2oApDw"+
		"xmbQ0JCQpcXxIMdQ5eEkiICYsiD4U%2FSiWYXm2dgaCAmJKjkIETDpaorK2ur4AhACH5BAgFAAAALAAAAAAiACIAhCEhITExMTk5"+
		"OVJSUlpaWmNjY2tra3Nzc3t7e4SEhIyMjJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2Fw"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWM4CWOZGmeaKqurDCw8PkAVWyPgHGrRD06gF3qMKCMKgCEEHUgGEWFwBKFKIoggMj0VJ"+
		"2IArqpwktKDCQXiGLLSCQivkuCYNmSGu4FOm03QdoJZH0mFQ5ag4gnEg4ODYyODQ%2BDFhKVlpaJmTAWFHGJFJaefRMSEROidqQR"+
		"dZoXEqytsbKztLW2t7i5tCEAOw%3D%3D"

};

UIL.init();
UIL.UI.show.bind(UIL.UI);
