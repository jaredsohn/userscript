// ==UserScript==
// @author         mungushume
// @version        1.0.8.7
// @name           GoogleMonkeyR
// @namespace      http://www.monkeyr.com
// @description    Google - Multiple columns of results, Rem "Sponsored Links", Number results, Auto-load more results, Remove web search dialogues, Open external links in a new tab and self updating... Oh, did i mention, all configurable from a simple user dialogue?
// @include        http://www.google.tld/webhp?*
// @include        http://www.google.tld/search?*
// @scriptsource   http://userscripts.org/scripts/show/9310
// @scriptsource   http://google.monkeyr.com/ff/script/1.0.8/googlemonkeyr.user.js
/* StartHistory

v1.0.8.7 - 05 Oct 2008
 - Cleanup: Change of the update url to point at the script meta file
 "http://userscripts.org/scripts/source/9310.meta.js" 
 this will reduce the bandwidth to/from userscripts.org and speed up checks
 - Cleanup: Change of several method names to aid readability
 - Cleanup: "Update bar" code re-written more cleanly

v1.0.8.6 - 01 Oct 2008
 - Cleanup: Change of includes to use "Magic top-level domains" instead of *'s 
 see http://wiki.greasespot.net/Magic_TLD for more info
 - Cleanup: Change of update script to pick up history text more cleanly

v1.0.8.5 bug fix - 25 Sep 2008
 - Bug fix: History update fix 2

v1.0.8.4 bug fix - 25 Sep 2008
 - Bug fix: History update fix

v1.0.8.3 bug fix - 23 Sep 2008
 - Bug fix: Final fix with the auto update script

v1.0.8.2 bug fix - 23 Sep 2008
 - Bug fix: Another small bug fix with the auto update script

v1.0.8.1 bug fix - 23 Sep 2008
 - Bug fix: Small bug fix with the auto update script

v1.0.8 - 23 Sep 2008
 - Feature: The update feature of the script has been completely re-written 
 to notify the user when there are future updates. This update mechanism 
 will also work if (and when) Google decide to change their DOM again! The 
 basis for this update method comes from the "UserScript Update Notification" 
 script from Seifer. This code has been heavily modified and expanded for 
 the GoogleMonkeyR script.
 
v1.0.7 bug fix - 17 Sep 2008
 - Bug fix: Roll up pack of bug fixes. Should be ok for now!

v1.0.6.3 beta bug fix - 21 Aug 2008
 - Bug fix: Some localisations of Google changed again on the 19th Aug. The DOM structure has again 
 	been modified. Oh when will they stop messing with it?

v1.0.6.2 beta bug fix - 13 Aug 2008
 - Bug fix: Some localisations of Google changed again on the 12th Aug. The DOM structure has again 
 	been modified. More changes to follow? I hope not!
 	This is a beta update to fix these problems but may have its own bugs!!!
 - Feature: Added ability to change the background hue or the border color of the search results 

v1.0.6.1 beta bug fix - 01 Aug 2008
 - Bug fix: Some localisations of Google changed on the 31st July. 
 	The DOM structure was quite heavily modified and somehow they messed up the 
 	scroll to bottom of page detection. 
 	This is a beta update to fix these problems but may have its own bugs!!!
 - Bug fix: Autoload would flood requests to Google for the next page of results. 
 	Now only one request is sent until a response is received
 - Bug fix: Background hue now defaults to transparent rather than white. 
 	Thanks to Lil Junior for the suggestion!

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

EndHistory */ 
// ==/UserScript==

Function.prototype.bind = function(object)
{
    var __method = this;
    return function()
    {
        __method.apply(object, arguments);
    }
};

String.prototype.repeat = function(l)
{
    return new Array(l+1).join(this);
};

/**
 * Processing of the current page.
 **/
var UIL =
    {
    scriptName: "GoogleMonkeyR",
    scriptVersion: "1.0.8.7",
    scriptId: "9310",

    init: function()
    {   
        var pageType = this.determineCurrentPageType();
        this.processPage(pageType);
        this.registerControls(pageType);
    },

    determineCurrentPageType: function()
    {
        var pageType = null;
        if (window.location.href.toLowerCase().indexOf("/webhp?") != -1)
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
            var searchEle = document.evaluate ("//form[@id='tsf'] | //table[@id='sft']", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if(searchEle)
            {
                searchEle.style.display="none";
            }
            searchEle = document.evaluate ("//table[contains(@class,'bb bt')] | //div[@id='bsf']", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if(searchEle)
            {
                searchEle.style.display="none";
            }
        }
		
        if(UIL.Config.getRemSponsor())
        {
            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); .ta, .ra, #mbEnd, #tads { display: none !important; }; ")
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
        var ele = document.documentElement;
        var total = (ele.scrollHeight - ele.clientHeight);
        if (total==0) {
            ele = document.body;
            total = (ele.scrollHeight - ele.clientHeight);
        }
        var sc = ele.scrollTop;
        return total - sc;
    },
	
    watchForScroll: function()
    {
        var self = arguments.callee;
        if (this.remainingScroll() < 500 && !this.requestingMoreResults) {
            //GM_log('requestMoreResults');
            this.requestMoreResults();
            this.requestingMoreResults=true;
        }
        setTimeout(self.bind(this),100);
    },
	
    insertLoadingImage: function()
    {
        var navbar = document.evaluate("//*[@id='navbar' or @id='nav']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
            if (navbar.id=='navbar')
            {
                navbar.replaceChild(div, navbar.firstChild);
                this.navbar = navbar;
            }
            else
            {
                navbar.parentNode.replaceChild(div, navbar);
                this.navbar = div;
            }
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
            hue = "transparent";
        }
		
        var BGBorder;
        if(UIL.Config.getBGBorder()=='background')
        {
            BGBorder = "background-color:";
        }
        else
        {
            BGBorder = "border: solid 0.01em";
        }		
		
        this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); a:visited {color:#AAAA8B !important;} .g { margin-top: 0.15em !important; margin-right: 0.25em !important; margin-bottom: 0.15em !important; margin-left: 0.25em; -moz-border-radius: 10px ! important; " + BGBorder + " "+ hue +" ! important; padding: 0.5em ! important; } li.g {list-style-image:none;list-style-position:outside;list-style-type:none;};");
		
        var table = document.createElement("table");
        this.resultsTable=table;
        table.setAttribute("id", "GoogleTabledResults");
        table.setAttribute("cellspacing", "5%");
        table.setAttribute("cellpadding", "0");
        var div = document.evaluate ("//div/div[@class='g']/parent::div | //div[@id='res']/div", document, null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(div)
        {
            this.startNumber = 0;
            this.lastI = 0;
            this.numResults = UIL.Config.getNumResults();
            this.numColumns = UIL.Config.getNumCol();
			
            var b = document.evaluate ("//table[@class='t bt']//b", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            div.appendChild(table);
            var list = document.evaluate ("//div//li[@class='g'] | //div//li/div[@class='g']", document, null, 
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < list.snapshotLength; i++)
            {
                this.resultsToTable(list, i);
            }
            this.lastI = i;
        }
    },

    resultsToTable: function(list, i)
    {
        var link = list.snapshotItem(i);
        if(this.numResults)
        {
            link.innerHTML = "<strong>" + (i + this.lastI + 1) + "</strong>&nbsp;" + link.innerHTML;
        }
        if((i + this.lastI ) % this.numColumns == 0)
        {
            this.currentRow = this.resultsTable.insertRow(Math.floor( (i + this.lastI) / this.numColumns) );
        }
        var a = document.evaluate (".//h3[@class='r']/a[@class='l' and @href]", link, null, 
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
        }
        if(!this.searchLinkTracking)
        {
            var ele = document.evaluate (".//span[@class='bl']/a[position()=last()]", link, null, 
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
        var cell = this.currentRow.insertCell((i + this.lastI) % this.numColumns);
        cell.setAttribute("valign", "top");
        //cell.setAttribute("id", i);
        cell.appendChild(link);
    },

    processResults: function(responseText)
    {
        this.navbar.style.display = "none";
        var nextResult = this.navbar.appendChild(document.createElement('div'));
        nextResult.style.display = "none";
        nextResult.innerHTML = responseText;
		
        var list = document.evaluate (".//div[@id='res']/div//li[@class='g'] | .//div[@id='res']/div//li/div[@class='g']", nextResult, null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 	
    	for (var i = 0; i < list.snapshotLength; i++)
    	{
            this.resultsToTable(list, i);
    	}

        this.lastI += i;

        var isNextExist = document.evaluate (".//div[@id='nn'] | .//span[@id='nn']", nextResult, null, 
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
        this.requestingMoreResults=false;
    },

    externalLinks: function(scope)
    {
        var thisdomain = window.location.host;
        var links = scope.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            if (a.href && a.host && a.host != thisdomain) {
                a.target = "_blank";
            }
        }		
    },

    registerControls: function(pageType)
    {
        var controls =
            document.evaluate("//div[@id='guser']/nobr/a[1] | //p[@id='gb']/nobr/a[1]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (controls)
        {
            var parent = controls.parentNode
            parent.insertBefore(this.createLinkControl("GoogleMonkeyR",
            UIL.UI.preferencesShow.bind(UIL.UI)),
            controls);
            parent.insertBefore(document.createTextNode(" | "), controls);
        }
        GM_registerMenuCommand("GoogleMonkeyR Preferences",	UIL.UI.preferencesShow.bind(UIL.UI));
    },

    createLinkControl: function(name, handler)
    {
        var a = document.createElement("a");
        a.href = "#";
        a.appendChild(document.createTextNode(name));
        a.addEventListener("click", handler, false);
        return a;
    },
    
    addStyle: function(css)
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
    getBGBorder: function()
    {
        return this._getBooleanConfig("BGBorder", "background");
    },

    setBGBorder: function(BGBorder)
    {
        GM_setValue("BGBorder", BGBorder);
    },

    getResHue: function()
    {
        return this._getBooleanConfig("resHue", "#E5ECF9");
    },

    setResHue: function(resHue)
    {
    	resHue = resHue.toUpperCase();
    	if(!resHue.match(/^#[0-9A-F]{6}$/))
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
    preferencesShow: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        this._loadBlocker();

        var prefs = document.createElement("iframe");
        prefs.addEventListener("load", this.preferencesDocumentLoadHandler.bind(this), false);
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
    
    _loadBlocker: function()
    {
        

        if (this.blocker==null)
        {
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
        }
    },
	
    updateScript: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        this._loadBlocker();

        try{
            window.location.replace("http://userscripts.org/scripts/source/"+ UIL.scriptId +".user.js");
        }
        catch(e)
        {}
        if(this.prefs)document.body.removeChild(this.prefs);
        if(this.history)document.body.removeChild(this.history);
        GM_setValue('skipVersion', 0);
        setTimeout(this.refreshShow.bind(this),4000);

    },

    refreshShow: function()
    {
        var refresh = document.createElement("iframe");
        this.refresh = refresh;
        refresh.addEventListener("load", this.refreshDocumentLoadHandler.bind(this), false);
        document.body.appendChild(refresh);
        with(refresh.style)
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
        refresh.src = UIL.RES.REFRESH_HTML;
    },
    
    refreshDocumentLoadHandler: function()
    {
        this.refresh.contentDocument.getElementById("scriptName").innerHTML=UIL.scriptName;
    },
	
    hide: function()
    {
        if(this.history) document.body.removeChild(this.history);
        if(this.prefs)document.body.removeChild(this.prefs);
        if(this.blocker)document.body.removeChild(this.blocker);
        this.history = null;
        this.prefs = null;
        this.blocker = null;
    },

    preferencesDocumentLoadHandler: function()
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
        this.prefs.contentDocument.getElementById("BGBorderlink").innerHTML = UIL.Config.getBGBorder();
	    
        // Set up event handlers
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
        form.elements.namedItem("save_button").addEventListener("click", this.preferencesSaveConfigurationHandler.bind(this), false);
        this.prefs.contentDocument.getElementById("version").innerHTML=UIL.scriptVersion;
        this.getURL("http://userscripts.org/scripts/source/"+UIL.scriptId+".meta.js", this.updateTestOnPreferences.bind(this)); 
    },
    	
    getURL: function(address, cb)
    {
        GM_xmlhttpRequest({
            method:"GET",
            url:address,//+"?"+Math.random(),
            onload:function(xhr) { cb(xhr.responseText); }
        });
    },
	
    updateCheckRequest: function()
    {		
        var lastCheck = GM_getValue('lastCheck', 0);
		
        if (this._currentTime() > (lastCheck + 86400)) //24 hours after last check
        { 
            GM_setValue('delayUpdate', false);
            this.getURL("http://userscripts.org/scripts/source/"+UIL.scriptId+".meta.js", this.updateTestOnPage.bind(this));
        }
        else
        {
            this.onSiteVersion = GM_getValue('onSiteVersion', 0);
            var delayUpdate = GM_getValue('delayUpdate', false);			
            var skipVersion = GM_getValue('skipVersion', 0);
            if ( this.versionCompare(UIL.scriptVersion, this.onSiteVersion) )
            {
                if ( this.versionCompare(skipVersion, this.onSiteVersion) && !delayUpdate )
                {
                    this.updateMessageShow();
                }
            }
        }
    },
	
    updateTestOnPage: function(text)
    {
        var skipVersion = GM_getValue('skipVersion', 0);

        var onSiteVersion = text.match(/\/\/\s*@version\s*(\d.*)/);
        this.onSiteVersion = (onSiteVersion===null) ? 0 : onSiteVersion[1];
        GM_setValue('onSiteVersion', this.onSiteVersion);
		
        var updateHistory = text.substring(text.search(/\/\*.*StartHistory/im));
        updateHistory = updateHistory.substring(0, updateHistory.search(/EndHistory.*\*\//im))
        GM_setValue('onSiteVersionHistory', updateHistory);

        if ( this.versionCompare(UIL.scriptVersion, this.onSiteVersion) )
        {
            if ( this.versionCompare(skipVersion, this.onSiteVersion) )
            {
                this.updateMessageShow();
            }
    	}
    	GM_setValue('lastCheck', this._currentTime());
    },	
	
    updateTestOnPreferences: function(text)
    {
        var onSiteVersion = text.match(/\/\/\s*@version\s*(\d.*)/);
        this.onSiteVersion = (onSiteVersion===null) ? 0 : onSiteVersion[1];
        GM_setValue('onSiteVersion', this.onSiteVersion);

        var updateHistory = text.substring(text.search(/\/\*/));
        updateHistory = updateHistory.substring(0, updateHistory.search(/\*\//))
        GM_setValue('onSiteVersionHistory', updateHistory);
		
        var link = this.prefs.contentDocument.getElementById("check_update");
        link.setAttribute("target", "_top");

        if ( this.versionCompare(UIL.scriptVersion, this.onSiteVersion) )
        {
            link.addEventListener("click", this.historyShow.bind(this), false);
            link.setAttribute("title", "see what's new with GoogleMonkeyR...");
            link.style.textDecoration = "blink";
            link.innerHTML = "v"+this.onSiteVersion+" available";
        }
        else
        {
            link.setAttribute("href", "#");
            link.setAttribute("title", "the history of GoogleMonkeyR");
            link.innerHTML = "history";
            link.addEventListener("click", this.historyShow.bind(this), false);
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
    	GM_setValue('lastCheck', this._currentTime());
    },
	
    versionCompare: function(ver1, ver2)
    {
        var maxVersionPartTest = 5;
        var ver1Arr = (ver1+('.0'.repeat(maxVersionPartTest))).split(".",maxVersionPartTest);
        var ver2Arr = (ver2+('.0'.repeat(maxVersionPartTest))).split(".",maxVersionPartTest);
        for(var i=0; i<maxVersionPartTest; i++)
        {
            //alert(scriptVersionArr[i] +' '+ skipVersionArr[i] +' '+ onSiteVersionArr[i]);
            if( ver1Arr[i] < ver2Arr[i] )
            {
                break;
            }
        }
        return (i<maxVersionPartTest);
    },
	
    updateMessageShow: function()
    {
        UIL.addStyle("@namespace url(http://www.w3.org/1999/xhtml); .gbh{display: none !important;} #gm_update_alert {margin: 10px; background-color: #E5ECF9; text-align: center; -moz-border-radius: 5px} #gm_update_alert a:visited {color: #0000CC !important} #gm_update_alert p {padding: 5px}");
        var div = document.createElement("div");
        div.id = 'gm_update_alert';
        var p = document.createElement("p");
        var sn = document.createElement("strong");
        sn.innerHTML = UIL.scriptName+"&nbsp;";
        var sep = document.createElement("span");
        sep.innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;";
        p.appendChild(sn);
        p.appendChild(document.createTextNode(" update available v"+this.onSiteVersion+" (current v"+UIL.scriptVersion+")"));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(UIL.createLinkControl("Ignore for 24 hours", UIL.UI.updateDelay.bind(UIL.UI)));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(UIL.createLinkControl("Wait for next version", UIL.UI.updateSkip.bind(UIL.UI)));
        p.appendChild(sep.cloneNode(true));
        var a = document.createElement("a"); 
        a.target = "_blank";
        a.href = "http://userscripts.org/scripts/show/"+UIL.scriptId;
        a.innerHTML = "Script homepage";
        p.appendChild(a);
        p.appendChild(sep.cloneNode(true));
        p.appendChild(UIL.createLinkControl("What's new", UIL.UI.historyShow.bind(UIL.UI)));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(UIL.createLinkControl("Update", UIL.UI.updateScript.bind(UIL.UI)));
        div.appendChild(p);
        document.body.insertBefore(div, document.body.firstChild);
        this.updateMessage = div
    },

    updateMessageHide: function()
    {
        if(this.updateMessage)document.body.removeChild(this.updateMessage);
        this.updateMessage = null;
    },
    
    updateDelay: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        GM_setValue('delayUpdate', true);
        alert("You will not be reminded about this update again for 24 hours.");
        this.updateMessageHide();
     },
	
    updateSkip: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        GM_setValue('skipVersion', this.onSiteVersion);
        alert("You will not be reminded again until the next new version is released.");
        this.updateMessageHide();
    },
	
    _currentTime: function()
    {
        var d = new Date();
        return Math.round(d.getTime() / 1000); // Unix time in seconds
    },

    historyShow: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        
        this._loadBlocker();
        if(this.prefs)document.body.removeChild(this.prefs);
        this.prefs = null;

        var history = document.createElement("iframe");
        history.addEventListener("load", this.historyDocumentLoadHandler.bind(this), false);
        this.history = history;

        document.body.appendChild(history);

        history.id = "uil_history";
        history.name = "uil_history";
        with(history.style)
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
        history.src = UIL.RES.HISTORY_HTML;
    },

    historyDocumentLoadHandler: function()
    {
        this.history.contentDocument.getElementById("scriptName").innerHTML=UIL.scriptName;
        this.history.contentDocument.getElementById("version").innerHTML=UIL.scriptVersion;

        var form = this.history.contentDocument.forms.namedItem("history");

        // Set up form state
        form.elements.namedItem("history_text").innerHTML = GM_getValue('onSiteVersionHistory', '');
	    
        // Set up event handlers
        form.elements.namedItem("install_button").addEventListener("click", this.updateScript.bind(this), false);
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
                
    },

    preferencesSaveConfigurationHandler: function()
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
        UIL.Config.setBGBorder(this.prefs.contentDocument.getElementById("BGBorderlink").innerHTML);
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
        "Q7DQogICAgIH0NCjwvc2NyaXB0Pg0KPHNjcmlwdCBsYW5ndWFnZT0iamF2YXNjcmlwdCIgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij"+
        "4NCmZ1bmN0aW9uIEJHQm9yZGVydG9nKCkgew0KCXZhciBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0JHQm9yZGVybGluay"+
        "cpOw0KCWUuaW5uZXJIVE1MID0gKGUuaW5uZXJIVE1MPT0nYmFja2dyb3VuZCcpID8gJ2JvcmRlcicgOiAnYmFja2dyb3VuZCcNCn"+
        "0NCjwvc2NyaXB0Pg0KPC9oZWFkPjxib2R5IG9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9InByZWZlcmVuY2VzIiBpZD0icHJlZmVyZW"+
        "5jZXMiIGNsYXNzPSJhbGlnbmVkIj4NCiAgPGRpdiBjbGFzcz0ibW9kdWxlIiBpZD0icm9vdCI%2BDQoNCiAgICA8dGFibGUgYm9y"+
        "ZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj4NCiAgICAgIDx0Ym9keT48dHI%2BDQ"+
        "ogICAgICAgIDx0ZD48aDI%2BR29vZ2xlTW9ua2V5UiA6OiB2PHNwYW4gaWQ9InZlcnNpb24iPjEuMC4wPC9zcGFuPjwvaDI%2BPC"+
        "90ZD4NCiAgICAgICAgPHRkIGFsaWduPSJyaWdodCI%2BPGgyPjxhIGhyZWY9Imh0dHA6Ly93d3cubW9ua2V5ci5jb20vIiB0YXJn"+
        "ZXQ9Il90b3AiPk1vbmtleVIuY29tPC9hPjwvaDI%2BPC90ZD4NCiAgICAgIDwvdHI%2BDQogICAgPC90Ym9keT48L3RhYmxlPg0K"+
        "ICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BDQoNCiAgICAgIDxsYWJlbCBmb3I9Im51bWNvbDEiPg0KIC"+
        "AgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjEiIGlkPSJudW1jb2wxIiB0eXBlPSJyYWRpbyI%2BDQogICAgICAxIGNv"+
        "bHVtbiA8L2xhYmVsPg0KICAgICAgJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJudW1jb2wyIj4N"+
        "CiAgICAgIDxpbnB1dCBuYW1lPSJudW1jb2wiIHZhbHVlPSIyIiBpZD0ibnVtY29sMiIgdHlwZT0icmFkaW8iPg0KICAgICAgMiBj"+
        "b2x1bW5zPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOw0KDQogICAgICA8bGFiZWwgZm9yPSJudW1jb2wz"+
        "Ij4NCiAgICAgIDxpbnB1dCBuYW1lPSJudW1jb2wiIHZhbHVlPSIzIiBpZD0ibnVtY29sMyIgdHlwZT0icmFkaW8iPg0KICAgICAg"+
        "MyBjb2x1bW5zPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0ibnVtY29s"+
        "NCI%2BDQogICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iNCIgaWQ9Im51bWNvbDQiIHR5cGU9InJhZGlvIj4NCiAgIC"+
        "AgIDQgY29sdW1uczwvbGFiZWw%2BDQogICAgICAmbmJzcDsmbmJzcDsoIG9mIHJlc3VsdHMgKSA8L2Rpdj4NCg0KICAgIDxkaXYg"+
        "Y2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BDQogICAgICA8bGFiZWwgZm9yPSJyZW1zcG9uc29yIj4NCiAgICAgIDxpbn"+
        "B1dCBuYW1lPSJyZW1zcG9uc29yIiBpZD0icmVtc3BvbnNvciIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgUmVtb3ZlICJTcG9uc2"+
        "9yZWQgTGlua3MiIGZyb20gcmVzdWx0cyA8L2xhYmVsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZW"+
        "NrYm94LXJvdyI%2BDQogICAgICA8bGFiZWwgZm9yPSJudW1yZXN1bHRzIj4NCiAgICAgIDxpbnB1dCBuYW1lPSJudW1yZXN1bHRz"+
        "IiBpZD0ibnVtcmVzdWx0cyIgdHlwZT0iY2hlY2tib3giPg0KDQogICAgICBOdW1iZXIgcmVzdWx0cyAoIDEsIDIsIDMuLi4gZXRj"+
        "LiApPC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxh"+
        "YmVsIGZvcj0iYXV0b2xvYWQiPg0KICAgICAgPGlucHV0IG5hbWU9ImF1dG9sb2FkIiBpZD0iYXV0b2xvYWQiIHR5cGU9ImNoZWNr"+
        "Ym94Ij4NCiAgICAgIEF1dG8gbG9hZCBtb3JlIHJlc3VsdHM8L2xhYmVsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZv"+
        "cm0tcm93IGNoZWNrYm94LXJvdyI%2BDQoNCiAgICAgIDxsYWJlbCBmb3I9ImhpZGVzZWFyY2giPg0KICAgICAgPGlucHV0IG5hbW"+
        "U9ImhpZGVzZWFyY2giIGlkPSJoaWRlc2VhcmNoIiB0eXBlPSJjaGVja2JveCI%2BDQogICAgICBEb24ndCBkaXNwbGF5IHRoZSBH"+
        "b29nbGUgd2ViIHNlYXJjaCBkaWFsb2d1ZXMgKCBJIHVzZSB0aGUgR29vZ2xlIHRvb2xiYXIgaW5zdGVhZCEgKTwvbGFiZWw%2BDQ"+
        "ogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCgkgIFNlbGVjdCB0aGUgPGEgaHJl"+
        "Zj0iamF2YXNjcmlwdDogQkdCb3JkZXJ0b2coKTsiIG5hbWU9IkJHQm9yZGVybGluayIgaWQ9IkJHQm9yZGVybGluayIgdGl0bGU9"+
        "InRvZ2dsZSBiZXR3ZWVuIGEgYmFja2dyb3VuZCBvciBib3JkZXIgaHVlIj5iYWNrZ3JvdW5kPC9hPiBjb2xvciAoIGh1ZSApIGZv"+
        "ciB5b3VyIHNlYXJjaCByZXN1bHRzJm5ic3A7Jm5ic3A7Jm5ic3A7DQoJCTxhIGhyZWY9ImphdmFzY3JpcHQ6cGlja0NvbG9yKCdS"+
        "ZXNIdWUnKTsiIGlkPSJSZXNIdWUiIHN0eWxlPSJib3JkZXI6IDFweCBzb2xpZCAjMDAwMDAwOyBmb250LWZhbWlseTpWZXJkYW5h"+
        "OyBmb250LXNpemU6MTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyI%2BJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9hPg0KCQ"+
        "k8aW5wdXQgaWQ9IlJlc0h1ZWZpZWxkIiBzaXplPSI3IiBvbkNoYW5nZT0icmVsYXRlQ29sb3IoJ1Jlc0h1ZScsIHRoaXMudmFsdW"+
        "UpOyI%2BJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PGEgaHJlZj0iaHR0cDovL3d3dy5mbG9vYmxlLmNvbS9zY3JpcHRzL2NvbG9y"+
        "cGlja2VyLnBocCIgdGFyZ2V0PSJfYmxhbmsiIHRpdGxlPSJmbG9vYmxlIGNvbG9yIHBpY2tlciBzY3JpcHQiIHN0eWxlPSJmb250"+
        "LXNpemU6OHB4Ij5mbG9vYmxlPC9hPg0KDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm"+
        "93Ij4gTWFrZSBteSBHb29nbGUgbGlua3Mgb3BlbiBpbiBhIG5ldyB0YXJnZXQgJm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJleH"+
        "RsaW5rc2VhcmNoIj4NCiAgICAgIDxpbnB1dCBuYW1lPSJleHRsaW5rc2VhcmNoIiBpZD0iZXh0bGlua3NlYXJjaCIgdHlwZT0iY2"+
        "hlY2tib3giPg0KICAgICAgZm9yIHNlYXJjaCByZXN1bHRzPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOw0KICAgICAgPGxhYm"+
        "VsIGZvcj0iZXh0bGlua2lnb29nbGUiPg0KDQogICAgICA8aW5wdXQgbmFtZT0iZXh0bGlua2lnb29nbGUiIGlkPSJleHRsaW5raW"+
        "dvb2dsZSIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgZm9yIGlHb29nbGU8L2xhYmVsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2"+
        "xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BDQogICAgICA8bGFiZWwgZm9yPSJzZWFyY2hsaW5rdHJhY2tpbmciPg0KICAg"+
        "ICAgPGlucHV0IG5hbWU9InNlYXJjaGxpbmt0cmFja2luZyIgaWQ9InNlYXJjaGxpbmt0cmFja2luZyIgdHlwZT0iY2hlY2tib3gi"+
        "Pg0KICAgICAgRGlzYWJsZSBHb29nbGUgdHJhY2tpbmcgIG15IHNlYXJjaCByZXN1bHRzIDwvbGFiZWw%2BDQogICAgPC9kaXY%2B"+
        "DQoNCiAgPC9kaXY%2BDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPHRhYmxlIGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9"+
        "IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJvZHk%2BPHRyIGhlaWdodD0iMzAiPg0KICAgICAg"+
        "ICA8dGQgYWxpZ249ImxlZnQiIHZhbGlnbj0ibWlkZGxlIj4mbmJzcDsmbmJzcDsmbmJzcDs8YSBocmVmPSIjIiBuYW1lPSJjaGVj"+
        "a191cGRhdGUiIGlkPSJjaGVja191cGRhdGUiPmNoZWNraW5nIGZvciB1cGRhdGUuLi48L2E%2BPC90ZD4NCiAgICAgICAgPHRkIG"+
        "FsaWduPSJjZW50ZXIiIHZhbGlnbj0ibWlkZGxlIiB3aWR0aD0iNzIiPjxpbnB1dCB2YWx1ZT0iQ2xvc2UiIG5hbWU9ImNsb3NlX2"+
        "J1dHRvbiIgaWQ9ImNsb3NlX2J1dHRvbiIgY2xhc3M9ImJ0biIgdHlwZT0iYnV0dG9uIj4NCiAgICAgICAgPC90ZD4NCiAgICAgIC"+
        "AgPHRkIGFsaWduPSJjZW50ZXIiIHZhbGlnbj0ibWlkZGxlIiB3aWR0aD0iMTY1Ij48aW5wdXQgdmFsdWU9IlNhdmUgUHJlZmVyZW"+
        "5jZXMiIG5hbWU9InNhdmVfYnV0dG9uIiBpZD0ic2F2ZV9idXR0b24iIGNsYXNzPSJidG4iIHR5cGU9ImJ1dHRvbiI%2BDQoNCiAg"+
        "ICAgICAgPC90ZD4NCiAgICAgIDwvdHI%2BDQogICAgPC90Ym9keT48L3RhYmxlPg0KICA8L2Rpdj4NCjwvZm9ybT4NCjwvYm9keT"+
        "48L2h0bWw%2B",

    HISTORY_HTML: "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VO"+
        "IiAiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD48aGVhZD4NCjxtZXRhIGh0dHAtZXF1aX"+
        "Y9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVURi04Ij4NCjxtZXRhIG5hbWU9IkF1dGhvciIgY2"+
        "9udGVudD0ibXVuZ3VzaHVtZSI%2BDQo8bWV0YSBuYW1lPSJDb3B5cmlnaHQiIGNvbnRlbnQ9IsKpIDIwMDcsIE1vbmtleVIuY29t"+
        "Ij4NCjxtZXRhIG5hbWU9Ik9yaWdpbmFsQXV0aG9yIiBjb250ZW50PSJKb25hdGhhbiBCdWNoYW5hbiI%2BDQo8bWV0YSBuYW1lPS"+
        "JPcmlnaW5hbENvcHlyaWdodCIgY29udGVudD0iwqkgMjAwNiwgSm9uYXRoYW4gQnVjaGFuYW4iPg0KPHN0eWxlIHR5cGU9InRleH"+
        "QvY3NzIj4NCmJvZHkgeyBtYXJnaW46MDsgcGFkZGluZzowOyBmb250LXNpemU6MTJweDsgZm9udC1mYW1pbHk6Ikx1Y2lkYSBHcm"+
        "FuZGUiLCJCaXRzdHJlYW0gVmVyYSBTYW5zIixWZXJkYW5hLEFyaWFsLHNhbnMtc2VyaWY7IGNvbG9yOiMzMzM7IHdpZHRoOiA2OD"+
        "ZweDsgbWFyZ2luOiAwIGF1dG87IH0NCi5tb2R1bGUgeyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBtYXJnaW4tYm90dG9tOiA1cH"+
        "g7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH0NCi5tb2R1bGUgaDIsIC5tb2R1bGUgY2FwdGlvbiB7IG1hcmdpbjogMDsgcGFkZG"+
        "luZzogMnB4IDVweCAzcHggNXB4OyBmb250LXNpemU6IDExcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBiYWNrZ3JvdW5kOiAjQ0NDQ0"+
        "NDIHVybCgiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBV0FNUUFBTWpLeXNYSHg5JTJGaDRjJTJGUjBlUGw1Y2JJeU"+
        "5QVjFjM1B6JTJCZnA2ZDdoNGU3dzhPdnQ3Y3ZOemRmWjJlSGo0OXZkM2ZEeThnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"+
        "FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSDVCQUFBQUFBQUxBQUFBQUFCQUJZQUFBVVNJQ1FxQzBJSVQzTUVCY0FNUn"+
        "ZNa2poTUNBRHMlM0QiKSB0b3AgbGVmdCByZXBlYXQteDsgY29sb3I6ICM2NjY2NjY7IGJvcmRlci1ib3R0b206IDA7IH0NCi5mb3"+
        "JtLXJvdyB7IG92ZXJmbG93OiBoaWRkZW47IHBhZGRpbmc6IDhweCA4cHg7IGZvbnQtc2l6ZTogMTFweDsgYm9yZGVyLWJvdHRvbT"+
        "ogMXB4IHNvbGlkICNlZWU7IGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlZWU7IH0NCi5mb3JtLXJvdyBpbWcsIC5mb3JtLXJvdy"+
        "BpbnB1dCB7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0NCmlucHV0LmJ0biB7CXBhZGRpbmc6IDBweCAxMHB4IDBweCAxMHB4Oy"+
        "Bjb2xvcjogIzk5OTk5OTsgYmFja2dyb3VuZC1jb2xvcjogV2hpdGU7IGZvbnQtd2VpZ2h0OiBib2xkOyBib3JkZXI6IHNvbGlkID"+
        "FweCAjQ0NDQ0NDOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0NCmlucHV0LmJ0bjpob3ZlciB7CXBhZGRpbmc6IDFweCAxMXB4IDFweC"+
        "AxMXB4OyBjb2xvcjogIzMzMzMzMzsgYm9yZGVyLWNvbG9yOiAjNjY2NjY2OyB9DQphIHsgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG"+
        "9yOiAjOTk5OTk5OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGN1cnNvcjogcG9pbnRlcjsgfQ0KYTpob3ZlciB7CWZvbnQtd2VpZ2"+
        "h0OiBib2xkOyBjb2xvcjogIzMzMzMzMzsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9DQo8L3N0eWxlPg0KPC9oZWFkPjxib2R5IG"+
        "9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9Imhpc3RvcnkiIGlkPSJoaXN0b3J5IiBjbGFzcz0iYWxpZ25lZCI%2BDQogIDxkaXYgY2xh"+
        "c3M9Im1vZHVsZSIgaWQ9InJvb3QiPg0KDQogICAgPHRhYmxlIGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5n"+
        "PSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJvZHk%2BPHRyPg0KICAgICAgICA8dGQ%2BPGgyPjxzcGFuIGlkPSJzY3JpcH"+
        "ROYW1lIj5zY3JpcHROYW1lPC9zcGFuPiA6OiB2PHNwYW4gaWQ9InZlcnNpb24iPjEuMC4wPC9zcGFuPiA6OiBoaXN0b3J5PC9oMj"+
        "48L3RkPg0KICAgICAgICA8dGQgYWxpZ249InJpZ2h0Ij48aDI%2BPGEgaHJlZj0iaHR0cDovL3d3dy5tb25rZXlyLmNvbS8iIHRh"+
        "cmdldD0iX3RvcCI%2BTW9ua2V5Ui5jb208L2E%2BPC9oMj48L3RkPg0KICAgICAgPC90cj4NCiAgICA8L3Rib2R5PjwvdGFibGU%"+
        "2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3ciPg0KICAgICAgPGRpdiBhbGlnbj0iY2VudGVyIj4NCiAgICAgICAgPHRleHRhcm"+
        "VhIGlkPSJoaXN0b3J5X3RleHQiIG5hbWU9Imhpc3RvcnlfdGV4dCIgY29scz0iODAiIHJvd3M9IjE1Ij4mbmJzcDs8L3RleHRhcm"+
        "VhPg0KICAgICAgICA8L2Rpdj4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%2BDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPH"+
        "RhYmxlIGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJv"+
        "ZHk%2BPHRyIGhlaWdodD0iMzAiPg0KICAgICAgICA8dGQgd2lkdGg9IjUxNCIgYWxpZ249ImxlZnQiIHZhbGlnbj0ibWlkZGxlIj"+
        "4mbmJzcDs8L3RkPg0KICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRoPSI4NSI%2BPGlucHV0"+
        "IHZhbHVlPSJJbnN0YWxsIiBuYW1lPSJpbnN0YWxsX2J1dHRvbiIgaWQ9Imluc3RhbGxfYnV0dG9uIiBjbGFzcz0iYnRuIiB0eXBl"+
        "PSJidXR0b24iPg0KICAgICAgICA8L3RkPg0KICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRo"+
        "PSI4NSI%2BPGlucHV0IHZhbHVlPSJDbG9zZSIgbmFtZT0iY2xvc2VfYnV0dG9uIiBpZD0iY2xvc2VfYnV0dG9uIiBjbGFzcz0iYn"+
        "RuIiB0eXBlPSJidXR0b24iPg0KICAgICAgICA8L3RkPg0KICAgICAgPC90cj4NCiAgICA8L3Rib2R5PjwvdGFibGU%2BDQogIDwv"+
        "ZGl2Pg0KPC9mb3JtPg0KPC9ib2R5PjwvaHRtbD4%3D",

    REFRESH_HTML: "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VO"+
        "IiAiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD4NCjxoZWFkPg0KPHRpdGxlPkdvb2dsZU"+
        "1vbmtleVIgVXBkYXRlPC90aXRsZT4NCjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOy"+
        "BjaGFyc2V0PVVURi04Ij4NCjxtZXRhIG5hbWU9IkF1dGhvciIgY29udGVudD0ibXVuZ3VzaHVtZSI%2BDQo8bWV0YSBuYW1lPSJD"+
        "b3B5cmlnaHQiIGNvbnRlbnQ9IsKpIDIwMDcsIE1vbmtleVIuY29tIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BDQpib2R5IH"+
        "sgbWFyZ2luOjA7IHBhZGRpbmc6MDsgZm9udC1zaXplOjEycHg7IGZvbnQtZmFtaWx5OiJMdWNpZGEgR3JhbmRlIiwiQml0c3RyZW"+
        "FtIFZlcmEgU2FucyIsVmVyZGFuYSxBcmlhbCxzYW5zLXNlcmlmOyBjb2xvcjojMzMzOyB3aWR0aDogMzAwcHg7IG1hcmdpbjogMC"+
        "BhdXRvOyB9DQoubW9kdWxlIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgbWFyZ2luLWJvdHRvbTogNXB4OyBiYWNrZ3JvdW5kLW"+
        "NvbG9yOiAjZmZmOyB9DQoubW9kdWxlIGgyIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAycHggNXB4IDNweCA1cHg7IGZvbnQtc2l6ZT"+
        "ogMTFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGJhY2tncm91bmQ6ICNDQ0NDQ0MgdXJsKCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUj"+
        "BsR09EbGhBUUFXQU1RQUFNakt5c1hIeDklMkZoNGMlMkZSMGVQbDVjYkl5TlBWMWMzUHolMkJmcDZkN2g0ZTd3OE92dDdjdk56ZG"+
        "ZaMmVIajQ5dmQzZkR5OGdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"+
        "NINUJBQUFBQUFBTEFBQUFBQUJBQllBQUFVU0lDUXFDMElJVDNNRUJjQU1Sdk1ramhNQ0FEcyUzRCIpIHRvcCBsZWZ0IHJlcGVhdC"+
        "14OyBjb2xvcjogIzY2NjY2NjsgYm9yZGVyLWJvdHRvbTogMDsgfQ0KLmZvcm0tcm93IHsgb3ZlcmZsb3c6IGhpZGRlbjsgcGFkZG"+
        "luZzogMTJweCAxMnB4OyBmb250LXNpemU6IDExcHg7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlOyBib3JkZXItcmlnaH"+
        "Q6IDFweCBzb2xpZCAjZWVlOyB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7IHRleHQtYWxpZ246Y2VudGVyOyB9DQppbnB1dC5idG4gew"+
        "lwYWRkaW5nOiAwcHggMTBweCAwcHggMTBweDsgY29sb3I6ICM5OTk5OTk7IGJhY2tncm91bmQtY29sb3I6IFdoaXRlOyBmb250LX"+
        "dlaWdodDogYm9sZDsgYm9yZGVyOiBzb2xpZCAxcHggI0NDQ0NDQzsgdGV4dC1hbGlnbjogY2VudGVyOyB9DQppbnB1dC5idG46aG"+
        "92ZXIgewlwYWRkaW5nOiAxcHggMTFweCAxcHggMTFweDsgY29sb3I6ICMzMzMzMzM7IGJvcmRlci1jb2xvcjogIzY2NjY2NjsgfQ"+
        "0KYSB7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzk5OTk5OTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBjdXJzb3I6IHBvaW"+
        "50ZXI7IH0NCmE6aG92ZXIgewlmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICMzMzMzMzM7IHRleHQtZGVjb3JhdGlvbjogbm9uZT"+
        "sgfQ0KPC9zdHlsZT4NCjwvaGVhZD4NCjxib2R5IG9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9InVwZGF0ZSIgaWQ9InVwZGF0ZSIgY2"+
        "xhc3M9ImFsaWduZWQiPg0KICA8ZGl2IGNsYXNzPSJtb2R1bGUiPg0KICAgIDx0YWJsZSB3aWR0aD0iMTAwJSIgYm9yZGVyPSIwIi"+
        "BjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPg0KDQogICAgICA8dHI%2BDQogICAgICAgIDx0ZD48aDI%2BPHNwYW4gaW"+
        "Q9InNjcmlwdE5hbWUiPnNjcmlwdE5hbWU8L3NwYW4%2BPC9oMj48L3RkPg0KICAgICAgICA8dGQgYWxpZ249InJpZ2h0Ij48aDI%"+
        "2BPGEgaHJlZj0iaHR0cDovL3d3dy5tb25rZXlyLmNvbSIgdGFyZ2V0PSJfdG9wIj5Nb25rZXlSLmNvbTwvYT48L2gyPjwvdGQ%2B"+
        "DQogICAgICA8L3RyPg0KICAgIDwvdGFibGU%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3ciPg0KCTx0YWJsZSB3aWR0aD0iMT"+
        "AwJSIgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPg0KCTx0cj48dGQgaGVpZ2h0PSI0MCIgYWxpZ2"+
        "49ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiPlJlZnJlc2ggeW91ciBicm93c2VyIHRvIGNvbnRpbnVlLjwvdGQ%2BPC90cj4NCg0K"+
        "CTx0cj48dGQgaGVpZ2h0PSI0MCIgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiPjxpbnB1dCBuYW1lPSJidXR0b24iIHR5"+
        "cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biIgb25DbGljaz0iamF2YXNjcmlwdDp0b3AubG9jYXRpb24ucmVwbGFjZSh0b3AubG9jYXRp"+
        "b24pIiB2YWx1ZT0iUmVmcmVzaCI%2BPC90ZD48L3RyPg0KCTwvdGFibGU%2BPC9kaXY%2BDQogIDwvZGl2Pg0KPC9mb3JtPg0KPC"+
        "9ib2R5Pg0KPC9odG1sPg%3D%3D",
	
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

UIL.UI.updateCheckRequest();
UIL.init();
UIL.UI.preferencesShow.bind(UIL.UI);
