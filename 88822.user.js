// ==UserScript==
// @author         mungushume
// @version        1.4.0
// @name           GoogleMonkeyR
// @namespace      http://www.monkeyr.com
// @description    Google - Multiple columns of results, Remove "Sponsored Links", Number results, Auto-load more results, Remove web search dialogues, Open external links in a new tab, self updating and all configurable from a simple user dialogue.
// @include        http://www.google.tld/webhp?*
// @include        https://encrypted.google.com/*
// @include        http://www.google.tld/search?*
// @include        http://www.google.tld/ig?*
// @include        http://www.google.tld/
// @include        http://www.google.tld/#*
// @scriptsource   http://userscripts.org/scripts/show/9310
// @scriptsource   http://google.monkeyr.com/ff/script/1.3.8/googlemonkeyr.user.js
/* StartHistory

v1.3.8 - 24 May 2010
 - Layout: Position adjustment of loading image and txt for auto load
 - Bug fix: Second "Showing results for" prompt is now removed when Google
 thinks you have misspelled your search term.
 - Bug fix: First "Did you mean" prompt is now removed when Google thinks you
 have misspelled your search term.

v1.3.7 beta - 10 May 2010
 - Bug fix: Certain links in the search tools panel caused a reload of results
 but removed the first chunk of them when auto load was turned on.
 - Bug fix: Display of end of results notification when auto load is enabled.
 - Bug fix: Trackless links were sometimes appearing to early in the results
 when translate this page links occur.
 - Bug fix: "Show more results from" links now open inline as expected.
 - Feature: Update of result stats with auto load enabled.

v1.3.6 - 09 May 2010
 - Bug fix: Duplicate entries when "Auto load more results" is selected. Looks
like i introduced a bug back in v1.3.0 (Oct 09) during a code clean up. I'd
managed to double quote two regex values that may have resulted in duplicates
appearing when your default "Number of Results" returned by Google was anything
other than 10.
 - Bug fix: "More search tools" link removed the first X amount of results from
your search results. Where X is the "Number of results" per page set in your
Google preferences. This has now been resolved.
 - Thank you gauravbaadshah! Your (continued) well presented bug reports are
helping to make GoogleMonkeyR as good as it should be!

v1.3.5 - 08 May 2010
 - Feature: Added the ability to show/remove the "Search Tools" (left panel)
that has appeared in the latest Google update.
 - Bug fix: Selectors updated for trackless links. Should now pick up more
results and create the assosiated trackless links.
 - Bug fix: Repositioning of key elements when preferences remove "Related
Searches", "Sponsored Links" or "Search Tools".

v1.3.4 - 07 May 2010
 - Bug fix: Recent Google changes have been addressed in this update. I hope to
have another update shortly that will address some display issues when auto-load
is used and you approach the bottom of the page.

v1.3.3 - Unreleased
 - Bug fix: All "Did you mean?" prompts were removed when Google thought you had
 misspelled your search term. This is now corrected.
 Thanks to MasterMind33 for the heads up! Appreciated!
 - Bug fix: Trackless links added when Cached/Simlar links don't exist

v1.3.2 - 02 Dec 2009
 - Bug fix: When you follow links with the .../#hl=... type of format the script
 fails to trigger. I've now added the include http://www.google.tld/#*
 Big thanks to Hiromacu for finding the bug!

v1.3.1 - 10 Oct 2009
 - Bug fix: Possible infinite loop bug with /webhp? pages. 

v1.3.0 - 09 Oct 2009
 - Bug fix: When searching using the "on page" search dialogs, the script was
 not triggering properly. The fix implemented is only a band-aid and when google
 implement more changes, it will fail. I am working on the issue when i get time
 - Feature: Added an extra option in preferences to remove the "Related 
 Search" links that sometimes appear at the top of your search results.
 - Feature: Added an extra option in the preferences to select the flow 
 direction of your results when you use multiple columns. Either left to right 
 or top to bottom newspaper style. If you use "Auto-load" the newspaper style 
 is automatically paginated to try and keep some clarity in your results.
 - Bug fix: Added the include for "/ig?*" urls (iGoogle)
 - Cleanup: Reduced the amount of code for the creation and styling of elements 
 using the function document.buildElement
 - Feature: Now works on "/webhp?*" search urls 
  Thanks to gauravbaadshah for pointing this out!
 - Bug fix: Removed Googles results width limiting

v1.2.0 - 02 Jun 2009
 - Bug fix: The display of favicons for https links has been removed to stop
 invalid certificate warnings whilst searching.
 - Bug fix: Error removed when the main link of a result can't be found.
 - Feature: Site description text of each search result, when one column of 
 results is selected, is increased to 95% of the containing cell width as this 
 seems to be more readable. Two or more columns of results is unchanged as i 
 found the data appeared to be more cluttered.
  As requested by The_Steph.
 - Bug fix(ish): Google personalised search (Promote, Remove) functionality
 will now work on the initially loaded page of results. All further results 
 loaded dynamically using the "Auto load" option will NOT!
 - Bug fix: "End of search results" wasn't showing up when you'd reached the
 end of the results. Now fixed.
 - Bug fix: Removal of duplicate "Did you mean:" links at the top of search 
 results when you've misspelled your search term(s).

v1.1.1.2 - 22 Nov 2008
 - Bug fix: Another fix for the latest Google changes. Hopefully across the 
 board this time.

v1.1.1.1 - 21 Nov 2008
 - Bug fix: Quick (ish) fix for the latest Google changes. Sorry on my hols!)

v1.1.1.0 - 03 Nov 2008
 - Feature: Addition of favicons next to the main link. Configurable via a 
 checkbox in the preferences.
  As requested by Pierre75007.

v1.1.0.0 - 03 Nov 2008
 - Feature: Addition of GooglePreview images in your search results. Open up the
 GoogleMonkeyR preferences to turn this feature on.
  As requested by Nasir Jones.
 - Bug fix: Open in new target now overpowers any settings specified in your 
 Google preferences.

v1.0.9.1 - 30 Oct 2008
 - Bug fix: Ooops. I messed up the z-index of the preferences screen in the last
 version. It was appearing behind the blocker. All fixed in this update.

v1.0.9 - 30 Oct 2008
 - Feature: Moved the related searches and blog entries etc. to the top of the 
 results.
 - Cleanup: Commented out a GM_log entry i left in in the last update.
 - Bug fix: Version comparison now compares numbers rather than strings. Ooops.
 - Bug fix: Base numbering of 2nd, 3rd, 4th... pages of results restored (when 
 auto load more results is turned off).

v1.0.8.9 - 23 Oct 2008
 - Bug fix: Auto load more results is back up and running. Google has removed 
 the id attribute from the Next link at the bottom of their results page. Had
 to find it a different way.
 - Cleanup: encodeURI of the history information. (to maybe help with the crash)
 - Cleanup: Removal of an extra preferences bind that seems to have crept in 
 at the end of the script (to maybe help with the crash)

v1.0.8.8 - 14 Oct 2008
 - Bug fix: Results table and column widths should now be more stable. Less 
 re-sizing as links are clicked and/or more results auto-load.
 - Bug fix: Refined the stylesheet code that gives the results the background
 hue. This was to stop other elements getting the same hue.
 - Bug fix: Added trackless link to each result regardless of whether your 
 logged into a Google account or not.
 - Bug fix: With the google search dialogs removed sometimes a message reading 
 "Personalized based on your web history." overlays the GoogleMonkeyR link.
 This has now been adjusted to sit below the links.
 - Cleanup: XPath functions added to the document object.

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



/**
 * Processing of the current page.
 **/
var UIL =
    {
    scriptName : "GoogleMonkeyR",
    scriptVersion : "1.3.8",
    scriptId : "9310",

    init : function()
    {   
        var pageType = this.determineCurrentPageType();
        //console.log(pageType);
        if(pageType !== null)
        {
            this.registerControls();
            this.processPage(pageType);
        }
        else
        {
            var self = arguments.callee;
            setTimeout(self.bind(this),100);
        }
    },
    nextResultsWatcher : function (e){
        //console.log(e.attrName+ ' type:'+ e.attrChange +' prev:'+ e.prevValue +' new:'+ e.newValue );
        if (e.attrName=='href' && e.newValue.indexOf(location.host) != -1  && e.newValue.indexOf('start=') != -1 )
        {
            //console.log('nextResultsWatcher')
            clearTimeout(this.reinit);
            this.reinit = setTimeout(this.init.bind(this), 100);
        }
    },

    determineCurrentPageType : function()
    {
        var pageType = null;
        var loc = window.location.href.toLowerCase();
        if (loc.indexOf("/ig?") != -1)
        {
            pageType = "igoogle";
        }
        else if (loc.indexOf("/webhp?") != -1)
        {
            pageType = "home";
        }
        else if (loc.indexOf("/search?") != -1)
        {
            if(document.getElementById('res'))
            {
                pageType = "search";
            }
        }
//        else if (window.location.href.indexOf(window.location.protocol + '//' + window.location.hostname + '/#') != -1)
//        {
//            if(document.getElementsByXPath('//ol[@id="rso"]//li').length>0)
//            {
//                pageType = "search";
//            }
//        }
        else if (window.location.href==(window.location.protocol + '//' + window.location.hostname + '/'))
        {
            pageType = "home";
        }
        var el = document.getElementByXPath("//iframe[@onload='google.j.l()']"); if(el)el.parentNode.removeChild(el);
        return pageType;
    },

    processPage : function(pageType)
    {
        if (pageType !== null)
        {
            var pageProcessor = pageType + "PageProcessor";
            if (typeof(this[pageProcessor]) == "function")
            {
                this[pageProcessor]();
            }
        }
    },
		
    igooglePageProcessor : function()
    {
        if(UIL.Config.getHideSearch())
        {
            var searchEle = document.getElementById("gsea");
            if(searchEle)
            {
                searchEle.style.display="none";
            }
        }
        this.externalLinks(document, UIL.Config.getExtLinkiGoogle());
    },
	
    searchPageProcessor : function()
    {
        this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #cnt {max-width: none !important;} #foot{margin:auto} #ofr{margin:0.33em 0 12px 0}");
        if(UIL.Config.getHideSearch())
        {
            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #tsf {display:none!important;} #subform_ctrl{margin-left:15px;min-height:0} .lsd{top:3px;width:auto;right:65px} #cnt{padding:0} #bfl");
            var searchEle = document.getElementByXPath("//p[@id='bfl']/parent::div");
            if(searchEle)
            {
                searchEle.style.display="none";
            }
        }
		
        if(UIL.Config.getRemSponsor())
        {
            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #center_col {margin-right:0} .ta, .ra, #mbEnd, #tads, #rhs { display: none !important; } #GoogleTabledResults {width: 100%};");
        }
		
        this.externalLinksResults = UIL.Config.getExtLinkSearch();

        this.searchLinkTracking = UIL.Config.getSearchLinkTracking();
        
        this.imagePreview = UIL.Config.getImagePreview();
        
        this.favIcon = UIL.Config.getFavIcon();
        
        this.buildResultTable();

        if(UIL.Config.getAutoLoad())
        {
            this.initialiseAutoLoad();
            if(this.insertLoadingImage())
            {
                //console.log('watchForScroll');
                this.watchForScroll.bind(this)();
            }
        }
    },
		
    insertEndText : function() 
    {
        //console.log('insertEndText');
        var elem = document.buildElement('table',{id:"endtext" ,width: "100%", cellspacing: "2", cellpadding: "0", border: "0", "class": "t bt", 
            style:"font-weight:bold;text-decoration:blink"}, "&nbsp;End of the search results");        
        var res = document.getElementById("res");
        res.parentNode.insertBefore(elem, res.nextSibling);
        return elem;
    },
	
    requestMoreResults : function()
    {
        if (this.requested == this.startNumber) 
        {
            return;
        }
        else
        {
            this.requested = this.startNumber;
            this.loadingImage.style.display = "block";
            this.UI.getURL(this.query.replace(/start=\d*/,"start=" + this.startNumber), this.processResults.bind(this));
        }
    },
	
    remainingScroll : function() 
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
	
    watchForScroll : function()
    {
        var self = arguments.callee;
        if (this.remainingScroll() < 500 && !this.requestingMoreResults) {
            //console.log('requestMoreResults '+this.remainingScroll());
            this.requestMoreResults();
            this.requestingMoreResults=true;
        }
        setTimeout(self.bind(this),100);
    },
	
    insertLoadingImage : function()
    {
        //console.log('insertLoadingImage');
        var nextLink = document.getElementByXPath("//table[@id='nav']//td[last()]/a");
        var navbar = document.getElementByXPath("//table[@id='nav']//td/ancestor::table");
        if(navbar)
        {
            navbar.style.display = "none";
            if(!this.loadingImage)
            {
//                nextLink.addEventListener("DOMAttrModified", this.nextResultsWatcher.bind(this), false);
//                nextLink.id="mynextlink";
                var div = document.buildElement('div', {style:"width:114px;height:34px;background-image:url(" + UIL.RES.LOADING_GIF + ");background-repeat:no-repeat;margin:2em auto auto auto;padding:10px;display:none;"});
                var p = document.buildElement('p', {style:"font-size:130%;font-weight:bold;padding:5px 0 0 40px;margin:0"}, "Loading");
                div.appendChild(p);
                navbar.parentNode.insertBefore(div, navbar)
                this.loadingImage = div;
            }
        }
        if(!this.endText)
        {
            this.endText = this.insertEndText();
        }
        this.endText.style.display = nextLink && (nextLink.href.indexOf('start=')!=-1) ? 'none' : 'block';
        //console.log('insertLoadingImage '+nextLink);
        return nextLink
    },
	
    initialiseAutoLoad : function()
    {
        var nextLink = document.getElementByXPath("//table[@id='nav']//td[last()]/a[contains(@href,'start')]");
        if(nextLink)
        {
            var href = nextLink.href;
            this.startNumber = this._matchNum(href, /start=(\d+)/, 10);
            this.itemsQuantity = this._matchNum(href, /num=(\d+)/, 10);
            //console.log(this.startNumber+ ' ' +this.itemsQuantity);
            this.query = href;
            this.resultStats = document.getElementById('resultStats');
        }
    },

    buildResultTable : function()
    {
        var tab = document.getElementById('GoogleTabledResults');
        if(tab)
        {
            tab.parentNode.removeChild(tab);
        }
        else
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

            var imagePreview = "";
            if(this.imagePreview)
            {
                imagePreview = "min-height:102px;";
            }

            var fullWidthResults = "";
            if(UIL.Config.getNumCol()<5)
            {
                fullWidthResults = ".s{max-width:98%!important;}";
            }

            var remSearchTools = "";
            if(UIL.Config.getRemSearchTools())
            {
                remSearchTools = "#leftnav {display:none} #center_col {margin-left:0 !important}";
            }

            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); a:visited {color:#AAAA8B !important;} li.g, div.g { margin-top: 0.15em !important; margin-right: 0.25em !important; margin-bottom: 0.15em !important; margin-left: 0.25em; -moz-border-radius: 10px ! important; " + BGBorder + " "+ hue +" ! important; padding: 0.5em ! important; } li.g {list-style-image:none;list-style-position:outside;list-style-type:none;"+imagePreview+"} "+fullWidthResults+remSearchTools+";");
        }
        
        var searchesRelatedTo = UIL.Config.getSearchesRelatedTo() && 
            document.getElementByXPath("//div[@id='res']//div[@class='e' or @id='brs']");
        if(searchesRelatedTo)
        {
            searchesRelatedTo.style.display = "none";
        }

        var didYouMean = document.getElementByXPath("//*[@id='res']/p[@class='ssp']//span[@class='spell']/ancestor::p");
        var showingResultFor = document.getElementByXPath("//*[@id='res']/p[2]//span[@class='spell']/ancestor::p");
        if(didYouMean)
        {
            didYouMean.style.display = "none";
        }
        else if(showingResultFor)
        {
            showingResultFor.style.display = "none";
        }

        var resultsFor = document.getElementByXPath("//div[@id='res']//li/p[@class='g']/parent::*");
        if(resultsFor)
        {
            resultsFor.style.display = "none";
        }

        var relatedSearches = document.getElementByXPath("//div[@id='res']/div[@id='trev']");
        if(relatedSearches)
        {
            relatedSearches.style.display = "none";
        }

        var table = document.buildElement('table', {id:'GoogleTabledResults',cellspacing:'5%',cellpadding:'0'})
        this.resultsTable = table;
        var div = document.getElementByXPath("//div/div[@class='g']/parent::div | //div[@id='res']/div | //div[@id='res']/span[@id='search']");
        if(div)
        {
            var start = window.location.search.match(/start=(\d+)/);
            this.startBase = (start && start[1].retNum()) || 0;
            this.lastI = 0;
            this.startNumber = 0;
            this.curRow = 0;
            this.nextRow = 0;
            this.requested = 0;
            this.requestingMoreResults=false;
            this.numResults = UIL.Config.getNumResults();
            this.numColumns = UIL.Config.getNumCol();
            this.newspaper = UIL.Config.getResultFlow() != "l2r";
            this.autoLoad = UIL.Config.getAutoLoad();
            div.parentNode.appendChild(table);
            var list = document.getElementsByXPath("//div//li[starts-with(@class,'g')] | //div//li/div[@class='g']");
            var length = list.length;
            for (var i = 0; i < list.length; i++)
            {
                this.resultsToTable(list, i, length);
            }
            this.nextRow = this.curRow;
            this.paginationBoundry();
            this.lastI = i;
        }
    },

    paginationBoundry : function()
    {
        if(this.newspaper && this.autoLoad)
        {
            var row = this.nextRow++;
            this.resultsTable.insertRow(row);
            var cell = this.resultsTable.rows[row].insertCell(0);
            cell.setAttribute("valign", "top");
            cell.setAttribute("width", "100%");
            cell.setAttribute("colspan", this.numColumns);
            var hr = document.createElement('hr');
            cell.appendChild(hr);
        }
    },

    resultsToTable : function(list, i, resLength)
    {
        var link = list[i];
        if(this.numResults)
        {
            link.innerHTML = "<strong>" + (i + this.lastI + this.startBase + 1) + "</strong>&nbsp;" + link.innerHTML;
        }
        var col=0, row=0;
        if(this.newspaper)
        {
            var rowsPfetch = Math.ceil(resLength / this.numColumns);
            col = Math.floor(i / rowsPfetch);
            row = Math.floor(i  - (col * rowsPfetch) + this.nextRow );
            this.curRow = ((this.curRow <= row) && (row+1)) || this.curRow;
        }
        else
        {
            col = (i + this.lastI) % this.numColumns;
            row = Math.floor((i + this.lastI) / this.numColumns);
        }
        if(col==0)
        {
            this.resultsTable.insertRow(row);
        }
        var a = document.getElementByXPath(".//h3[contains(@class,'r')]/a[contains(@class, 'l')]", link);
        if(a)
        {
            //console.log(a.href)
            if(this.externalLinksResults)
            {
                a.target = "_blank";
            }
            else
            {
                a.target = "_self";
            }
			
            if(this.searchLinkTracking)
            {
                a.removeAttribute("onmousedown");
            }
            
            if(this.favIcon)
            {
                var base = a.href.match(/http:\/\/[\w\.\-]+\//);
                var fav = document.buildElement('img', {width:'16',height:'16',style:'margin-bottom:-3px;',src:base + "favicon.ico"});
                a.parentNode.insertBefore(fav, a);
                a.parentNode.insertBefore(document.createTextNode(' '), a);
            }
            
            if(this.imagePreview)
            {
                var a2 = a.cloneNode(false);
                a2.removeAttribute('class');
                var sl = a.href.match(/:\/\/www.(\w)|:\/\/(\w)/);
                var bs = a.href.match(/(http:\/\/[\w\.\-]+)\/|(ftp:\/\/[\w\.\-]+)\/|(https:\/\/[\w\.\-]+)\//);
                sl = sl[1] || sl[2];
                bs = bs[1] || bs[2] || bs[3];
                var img = document.buildElement('img', {align:'left',src:"http://"+ sl +".googlepreview.com/preview?s="+ bs +"&ra=1",
                    style:'border:1px solid #BBB;margin:2px 4px 5px 0px;width:111px;height:82px;'});            
                a2.appendChild(img);           
                a.parentNode.parentNode.insertBefore(a2, a.parentNode);
            }
            if(!this.searchLinkTracking)
            {
                var ele = document.getElementByXPath(".//span[@class='f']//span[@class='bl' or @class='gl']", link);
                if (ele) {
                    var notrack = document.buildElement('a',
                        {href:a.href,'class':'fl',title:'Visit the link without Google tracking you'},'Trackless');
                    if(this.externalLinksResults) 
                    {
                        notrack.target = "_blank";
                    }
                    else
                    {
                        notrack.target = "_self";
                    }
                    ele.appendChild(document.createTextNode(" - "), ele.nextSibling);
                    ele.appendChild(notrack, ele.nextSibling);
                }
            }
        }

        var cell = this.resultsTable.rows[row].insertCell(col);
        cell.setAttribute("valign", "top");
        var cellWidth = Math.floor(100 / this.numColumns) + "%";
        cell.setAttribute("width", cellWidth);
        //cell.setAttribute("id", i);
        cell.appendChild(link);
    },

    processResults : function(responseText)
    {
        this.loadingImage.style.display = "none";
        var nextResult = document.buildElement('div', null, responseText);

        var stats = document.getElementByXPath(".//div[@id='resultStats']", nextResult);
        if(this.resultStats && stats)
        {
            this.resultStats.innerHTML = stats.innerHTML;
        }

        var list = document.getElementsByXPath(".//div[@id='res']/div//li[starts-with(@class,'g')] | .//div[@id='res']/div//li/div[@class='g']", nextResult);
    	var length = list.length;
        for (var i = 0; i < list.length; i++)
    	{
            this.resultsToTable(list, i, length);
    	}
        this.nextRow = this.curRow;
        this.paginationBoundry();
        this.lastI += i;

        var isNextExist = document.getElementByXPath(".//table[@id='nav']//td[last()]/a[@href]", nextResult);
        if (isNextExist) 
        {
            this.startNumber += this.itemsQuantity;
        } 
        else 
        {
            this.endText.style.display = 'block';
        }
		
        this.requestingMoreResults=false;
    },

    externalLinks : function(scope, blank)
    {
        var thisdomain = window.location.host;
        var links = scope.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            if (a.href && a.host && a.host != thisdomain) {
                a.target = (blank ? "_blank" : "_self");
            }
        }		
    },

    registerControls : function()
    {
        //console.log('registerControls');
        var controls = document.getElementByXPath("//div[@id='guser']/nobr/a[1] | //p[@id='gb']/nobr/a[1]");
        var link = document.getElementById('GoogleMonkeyRLink');
        if (controls && !link)
        {
            var parent = controls.parentNode;
            link = document.buildElement('a',{href:'#',id:'GoogleMonkeyRLink'},'GoogleMonkeyR','click',UIL.UI.preferencesShow.bind(UIL.UI));
            var ghead = document.getElementById('ghead');
            if(ghead)
            {
                var that = this;
                ghead.addEventListener('DOMNodeRemoved', function(){setTimeout(that.registerControls.bind(that),50);}, false);
            }
            parent.insertBefore(link, controls);
            parent.insertBefore(document.createTextNode(" | "), controls);
        }
        GM_registerMenuCommand("GoogleMonkeyR Preferences", UIL.UI.preferencesShow.bind(UIL.UI));
    },
    
    addStyle : function(css)
    {
        if (typeof GM_addStyle != "undefined") {
            GM_addStyle(css);
        } else {
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.innerHTML = css;
                heads[0].appendChild(node); 
            }
        }
    },
    
    _matchNum : function (subject, test, def)
    {
        var out = subject.match(test);
        return (out ? +(out[1]) : (def || 0));
    }
    
};

/**
 * Configuration.
 **/
UIL.Config =
    {
    getBGBorder : function()
    {
        return this._getBooleanConfig("BGBorder", "background");
    },

    setBGBorder : function(BGBorder)
    {
        GM_setValue("BGBorder", BGBorder);
    },

    getResHue : function()
    {
        return this._getBooleanConfig("resHue", "#E5ECF9");
    },

    setResHue : function(resHue)
    {
    	resHue = resHue.toUpperCase();
    	if(!resHue.match(/^#[0-9A-F]{6}$/))
    	{
            resHue = "";
    	}
        GM_setValue("resHue", resHue);
    },

    getNumCol : function()
    {
        return this._getBooleanConfig("numCol", 1);
    },

    setNumCol : function(numCol)
    {
        GM_setValue("numCol", numCol);
    },

    getRemSponsor : function()
    {
        return this._getBooleanConfig("remSponsor", false);
    },

    setRemSponsor : function(remSponsor)
    {
        GM_setValue("remSponsor", remSponsor);
    },

    getRemSearchTools : function()
    {
        return this._getBooleanConfig("remSearchTools", false);
    },

    setRemSearchTools : function(remSearchTools)
    {
        GM_setValue("remSearchTools", remSearchTools);
    },

    getNumResults : function()
    {
        return this._getBooleanConfig("numResults", false);
    },

    setNumResults : function(numResults)
    {
        GM_setValue("numResults", numResults);
    },

    getAutoLoad : function()
    {
        return this._getBooleanConfig("autoLoad", false);
    },

    setAutoLoad : function(autoLoad)
    {
        GM_setValue("autoLoad", autoLoad);
    },


    getHideSearch : function()
    {
        return this._getBooleanConfig("hideSearch", false);
    },

    setHideSearch : function(hideSearch)
    {
        GM_setValue("hideSearch", hideSearch);
    },

    getExtLinkSearch : function()
    {
        return this._getBooleanConfig("extLinkSearch", false);
    },

    setExtLinkSearch : function(extLinkSearch)
    {
        GM_setValue("extLinkSearch", extLinkSearch);
    },

    getExtLinkiGoogle : function()
    {
        return this._getBooleanConfig("extLinkiGoogle", false);
    },

    setExtLinkiGoogle : function(extLinkiGoogle)
    {
        GM_setValue("extLinkiGoogle", extLinkiGoogle);
    },

    getSearchLinkTracking : function()
    {
        return this._getBooleanConfig("searchLinkTracking", false);
    },

    setSearchLinkTracking : function(searchLinkTracking)
    {
        GM_setValue("searchLinkTracking", searchLinkTracking);
    },

    getImagePreview : function()
    {
        return this._getBooleanConfig("imagePreview", false);
    },

    setImagePreview : function(imagePreview)
    {
        GM_setValue("imagePreview", imagePreview);
    },
    
    getFavIcon : function()
    {
        return this._getBooleanConfig("favIcon", false);
    },

    setFavIcon : function(favIcon)
    {
        GM_setValue("favIcon", favIcon);
    },
    
    getSearchesRelatedTo : function()
    {
        return this._getBooleanConfig("hideSearchesRelatedTo", false);
    },

    setSearchesRelatedTo : function(hideSearchesRelatedTo)
    {
        GM_setValue("hideSearchesRelatedTo", hideSearchesRelatedTo);
    },
    
    getResultFlow : function()
    {
        return this._getBooleanConfig("resultFlow", "l2r");
    },

    setResultFlow : function(resultFlow)
    {
        GM_setValue("resultFlow", resultFlow);
    },
    
    _getBooleanConfig : function(configName, defaultValue)
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
    preferencesShow : function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        this._loadBlocker();

        var prefs = document.buildElement('iframe',
            {id:'uil_preferences',name:'uil_preferences',
            style:'position:fixed;top:5%;left:0px;right:0px;border:none;height:100%;width:100%;overflow:hidden;z-index:10001;',
            src:UIL.RES.PREFS_HTML},null,'load',this.preferencesDocumentLoadHandler.bind(this));
        document.body.appendChild(prefs);
        this.prefs = prefs;
    },
    
    _loadBlocker : function()
    {
        if (this.blocker==null)
        {
            var blocker = document.buildElement('div',
                {id:'uil_blocker',
                style:'position:fixed;top:0px;left:0px;right:0px;bottom:0px;background-color:#000;opacity:0.5;z-index:10000;'});
            
            this.blocker = blocker;
            document.body.appendChild(blocker);	
        }
    },
	
    updateScript : function(e)
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

    refreshShow : function()
    {
        var refresh = document.buildElement('iframe',
            {style:'position:fixed;top:20%;left:0px;right:0px;border:none;height:100%;width:100%;overflow:hidden;z-index:10001;',
            src:UIL.RES.REFRESH_HTML},'','load',this.refreshDocumentLoadHandler.bind(this));

        this.refresh = refresh;
        document.body.appendChild(refresh);
    },
    
    refreshDocumentLoadHandler : function()
    {
        this.refresh.contentDocument.getElementById("scriptName").innerHTML=UIL.scriptName;
    },
	
    hide : function()
    {
        if(this.history) document.body.removeChild(this.history);
        if(this.prefs)document.body.removeChild(this.prefs);
        if(this.blocker)document.body.removeChild(this.blocker);
        this.history = null;
        this.prefs = null;
        this.blocker = null;
    },

    preferencesDocumentLoadHandler : function()
    {
        var form = this.prefs.contentDocument.forms.namedItem("preferences");

        // Set up form state
        form.elements.namedItem("numcol" + UIL.Config.getNumCol()).checked = true;
        form.elements.namedItem("remsponsor").checked = UIL.Config.getRemSponsor();
        form.elements.namedItem("numresults").checked = UIL.Config.getNumResults();
        form.elements.namedItem("remsearchtools").checked = UIL.Config.getRemSearchTools();
        form.elements.namedItem("autoload").checked = UIL.Config.getAutoLoad();
        form.elements.namedItem("hidesearch").checked = UIL.Config.getHideSearch();
        form.elements.namedItem("extlinksearch").checked = UIL.Config.getExtLinkSearch();
        form.elements.namedItem("extlinkigoogle").checked = UIL.Config.getExtLinkiGoogle();
        form.elements.namedItem("searchlinktracking").checked = UIL.Config.getSearchLinkTracking();
        form.elements.namedItem("ResHuefield").value = UIL.Config.getResHue();
        form.elements.namedItem("imagepreview").checked = UIL.Config.getImagePreview();
        form.elements.namedItem("favicon").checked = UIL.Config.getFavIcon();
        form.elements.namedItem("remsearchesrelatedto").checked = UIL.Config.getSearchesRelatedTo();
        //this.prefs.contentDocument.getElementById("ResHue").style.color = UIL.Config.getResHue();
        this.prefs.contentDocument.getElementById("ResHue").style.background = UIL.Config.getResHue();
        this.prefs.contentDocument.getElementById("BGBorderlink").innerHTML = UIL.Config.getBGBorder();
        this.prefs.contentDocument.getElementById("flowimg").className = UIL.Config.getResultFlow();
	    
        // Set up event handlers
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
        form.elements.namedItem("save_button").addEventListener("click", this.preferencesSaveConfigurationHandler.bind(this), false);
        this.prefs.contentDocument.getElementById("version").innerHTML=UIL.scriptVersion;
        this.getURL("http://userscripts.org/scripts/source/"+UIL.scriptId+".meta.js", this.updateTestOnPreferences.bind(this)); 
    },
    	
    getURL : function(address, cb)
    {
        GM_xmlhttpRequest({
            method :"GET",
            url :address,//+"?"+Math.random(),
            onload :function(xhr) { cb(xhr.responseText); }
        });
    },
	
    updateCheckRequest : function()
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
	
    updateTestOnPage : function(text)
    {
        var skipVersion = GM_getValue('skipVersion', 0);

        var onSiteVersion = text.match(/\/\/\s*@version\s*(\d.*)/);
        this.onSiteVersion = (onSiteVersion===null) ? 0 : onSiteVersion[1];
        GM_setValue('onSiteVersion', this.onSiteVersion);
		
        var updateHistory = text.substring(text.search(/\/\*.*StartHistory/im));
        updateHistory = updateHistory.substring(0, updateHistory.search(/EndHistory.*\*\//im))
        GM_setValue('onSiteVersionHistory', encodeURI(updateHistory));

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
        this.onSiteVersion = (onSiteVersion===null) ? 0  : onSiteVersion[1];
        GM_setValue('onSiteVersion', this.onSiteVersion);

        var updateHistory = text.substring(text.search(/\/\*/));
        updateHistory = updateHistory.substring(0, updateHistory.search(/\*\//))
        GM_setValue('onSiteVersionHistory', encodeURI(updateHistory));
		
        var link = this.prefs.contentDocument.getElementById("check_update");
        link.setAttribute("target", "_top");

        if ( this.versionCompare(UIL.scriptVersion, this.onSiteVersion) )
        {
            link.addEventListener("click", this.historyShow.bind(this), false);
            link.setAttribute("title", " see what's new with GoogleMonkeyR... ");
            link.style.textDecoration = "blink";
            link.innerHTML = "v"+this.onSiteVersion+" available";
        }
        else
        {
            link.setAttribute("href", "#");
            link.setAttribute("title", " the history of GoogleMonkeyR ");
            link.innerHTML = "history";
            link.addEventListener("click", this.historyShow.bind(this), false);
            link.parentNode.appendChild(document.createTextNode(" - "));
            
            var link2 = document.buildElement('a',{href:"http://"+ location.hostname +"/preferences",
                target:'_parent',title:' your Google preferences '},'prefs');

            link.parentNode.appendChild(link2);
            link.parentNode.appendChild(document.createTextNode(" - "));

            var link3 = document.buildElement('a',{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mungushume@hotmail.com&item_name=GreaseMonkey%20programming/beer%20fund&no_shipping=0&no_note=1&tax=0&currency_code=GBP&lc=GB&bn=PP-DonationsBF&charset=UTF-8",
                target:'_parent',title:' donate to the GoogleMonkeyR programming/beer fund '},'donate');

            link.parentNode.appendChild(link3);
        }
    	GM_setValue('lastCheck', this._currentTime());
    },
	
    versionCompare : function(ver1, ver2)
    {
        var maxVersionPartTest = 5;
        var ver1Arr = (ver1+('.0'.repeat(maxVersionPartTest))).split(".",maxVersionPartTest);
        var ver2Arr = (ver2+('.0'.repeat(maxVersionPartTest))).split(".",maxVersionPartTest);
        
        //alert(ver1Arr.join(',') + ' - ' +ver2Arr.join(','));
        
        for(var i=0; i<maxVersionPartTest; i++)
        {
            //alert(ver1Arr[i].retNum() +' '+ ver2Arr[i].retNum());
            if( ver1Arr[i].retNum() < ver2Arr[i].retNum() )
            {
                break;
            }
            else if( ver1Arr[i].retNum() > ver2Arr[i].retNum() )
            {
                i = maxVersionPartTest
                break;
            }
        }
        return (i<maxVersionPartTest);
    },
	
    updateMessageShow : function()
    {
        UIL.addStyle("@namespace url(http://www.w3.org/1999/xhtml); .gbh{display: none !important;} #gm_update_alert {margin: 10px; background-color: #E5ECF9; text-align: center; -moz-border-radius: 5px} #gm_update_alert a:visited {color: #0000CC !important} #gm_update_alert p {padding: 5px}");
        var div = document.buildElement("div",{id:'gm_update_alert'});
        var p = document.createElement("p");
        var sn = document.buildElement("strong",{},UIL.scriptName+"&nbsp;");
        var sep = document.buildElement("span",{},"&nbsp;&nbsp;-&nbsp;&nbsp;");
        p.appendChild(sn);
        p.appendChild(document.createTextNode(" update available v"+this.onSiteVersion+" (current v"+UIL.scriptVersion+")"));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(document.buildElement('a',{href:'#'},"Ignore for 24 hours",'click',UIL.UI.updateDelay.bind(UIL.UI)));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(document.buildElement('a',{href:'#'},"Wait for next version",'click',UIL.UI.updateSkip.bind(UIL.UI)));
        p.appendChild(sep.cloneNode(true));
        var a = document.buildElement("a", {target:"_blank", href:"http://userscripts.org/scripts/show/"+UIL.scriptId}, "Script homepage"); 
        p.appendChild(a);
        p.appendChild(sep.cloneNode(true));
        p.appendChild(document.buildElement('a',{href:'#'},"What's new",'click',UIL.UI.historyShow.bind(UIL.UI)));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(document.buildElement('a',{href:'#'},"Update",'click',UIL.UI.updateScript.bind(UIL.UI)));
        div.appendChild(p);
        document.body.insertBefore(div, document.body.firstChild);
        this.updateMessage = div
    },

    updateMessageHide : function()
    {
        if(this.updateMessage)document.body.removeChild(this.updateMessage);
        this.updateMessage = null;
    },
    
    updateDelay : function(e)
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
	
    updateSkip : function(e)
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
	
    _currentTime : function()
    {
        var d = new Date();
        return Math.round(d.getTime() / 1000); // Unix time in seconds
    },

    historyShow : function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        
        this._loadBlocker();
        if(this.prefs)document.body.removeChild(this.prefs);
        this.prefs = null;

        var history = document.buildElement("iframe", {src:UIL.RES.HISTORY_HTML,
            style:"position:fixed;top:5%;left:0px;right:0px;border:none;height:100%;width:100%;overflow:hidden;z-index:10001"}, 
            null, "load", this.historyDocumentLoadHandler.bind(this));
        this.history = history;

        document.body.appendChild(history);
    },

    historyDocumentLoadHandler : function()
    {
        this.history.contentDocument.getElementById("version").innerHTML=UIL.scriptVersion;
        this.history.contentDocument.getElementById("scriptName").innerHTML=UIL.scriptName;

        var form = this.history.contentDocument.forms.namedItem("history");

        // Set up form state
        form.elements.namedItem("history_text").innerHTML = decodeURI(GM_getValue('onSiteVersionHistory', ''));
	    
        // Set up event handlers
        form.elements.namedItem("install_button").addEventListener("click", this.updateScript.bind(this), false);
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
                
    },

    preferencesSaveConfigurationHandler : function()
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
        UIL.Config.setRemSearchTools(form.elements.namedItem("remsearchtools").checked);
        UIL.Config.setAutoLoad(form.elements.namedItem("autoload").checked);
        UIL.Config.setHideSearch(form.elements.namedItem("hidesearch").checked);
        UIL.Config.setExtLinkSearch(form.elements.namedItem("extlinksearch").checked);
        UIL.Config.setExtLinkiGoogle(form.elements.namedItem("extlinkigoogle").checked);
        UIL.Config.setSearchLinkTracking(form.elements.namedItem("searchlinktracking").checked);
        UIL.Config.setResHue(form.elements.namedItem("ResHuefield").value);
        UIL.Config.setBGBorder(this.prefs.contentDocument.getElementById("BGBorderlink").innerHTML);
        UIL.Config.setImagePreview(form.elements.namedItem("imagepreview").checked);
        UIL.Config.setFavIcon(form.elements.namedItem("favicon").checked);
        UIL.Config.setSearchesRelatedTo(form.elements.namedItem("remsearchesrelatedto").checked);
        UIL.Config.setResultFlow(this.prefs.contentDocument.getElementById("flowimg").className);
        this.hide();
        window.location.reload(true);
    }
};

/**
 * Resource section (RES).
 **/
UIL.RES = 
    {
    PREFS_HTML : "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VO"+
        "IiAiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD4NCjxoZWFkPg0KPHRpdGxlPkdvb2dsZU"+
        "1vbmtleSBQcmVmZXJlbmNlczwvdGl0bGU%2BDQo8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQv"+
        "aHRtbDsgY2hhcnNldD1VVEYtOCI%2BDQo8bWV0YSBuYW1lPSJBdXRob3IiIGNvbnRlbnQ9Im11bmd1c2h1bWUiPg0KPG1ldGEgbm"+
        "FtZT0iQ29weXJpZ2h0IiBjb250ZW50PSLCqSAyMDA3LCBNb25rZXlSLmNvbSI%2BDQo8bWV0YSBuYW1lPSJPcmlnaW5hbEF1dGhv"+
        "ciIgY29udGVudD0iSm9uYXRoYW4gQnVjaGFuYW4iPg0KPG1ldGEgbmFtZT0iT3JpZ2luYWxDb3B5cmlnaHQiIGNvbnRlbnQ9IsKp"+
        "IDIwMDYsIEpvbmF0aGFuIEJ1Y2hhbmFuIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BDQpib2R5IHsNCgltYXJnaW46MDsNCg"+
        "lwYWRkaW5nOjA7DQoJZm9udC1zaXplOjEycHg7DQoJZm9udC1mYW1pbHk6Ikx1Y2lkYSBHcmFuZGUiLCAiQml0c3RyZWFtIFZlcm"+
        "EgU2FucyIsIFZlcmRhbmEsIEFyaWFsLCBzYW5zLXNlcmlmOw0KCWNvbG9yOiMzMzM7DQoJd2lkdGg6IDU1MHB4Ow0KCW1hcmdpbj"+
        "ogMCBhdXRvOw0KfQ0KI2NvbG9ycGlja2VyIHsNCglwb3NpdGlvbjogYWJzb2x1dGU7DQoJYm9yZGVyOiAjMDAwMDAwIDFweCBzb2"+
        "xpZDsNCgliYWNrZ3JvdW5kOiAjRkZGRkZGOw0KCWRpc3BsYXk6IG5vbmU7DQp9DQoubW9kdWxlIHsNCglib3JkZXI6IDFweCBzb2"+
        "xpZCAjY2NjOw0KCW1hcmdpbi1ib3R0b206IDVweDsNCgliYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOw0KfQ0KLm1vZHVsZSBoMiwgLm"+
        "1vZHVsZSBjYXB0aW9uIHsNCgltYXJnaW46IDA7DQoJcGFkZGluZzogMnB4IDVweCAzcHggNXB4Ow0KCWZvbnQtc2l6ZTogMTFweD"+
        "sNCglmb250LXdlaWdodDogYm9sZDsNCgliYWNrZ3JvdW5kOiAjQ0NDQ0NDIHVybCgiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbE"+
        "dPRGxoQVFBV0FNUUFBTWpLeXNYSHg5JTJGaDRjJTJGUjBlUGw1Y2JJeU5QVjFjM1B6JTJCZnA2ZDdoNGU3dzhPdnQ3Y3ZOemRmWj"+
        "JlSGo0OXZkM2ZEeThnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSD"+
        "VCQUFBQUFBQUxBQUFBQUFCQUJZQUFBVVNJQ1FxQzBJSVQzTUVCY0FNUnZNa2poTUNBRHMlM0QiKSB0b3AgbGVmdCByZXBlYXQteD"+
        "sNCgljb2xvcjogIzY2NjY2NjsNCglib3JkZXItYm90dG9tOiAwOw0KfQ0KLmZvcm0tcm93IHsNCglvdmVyZmxvdzogaGlkZGVuOw"+
        "0KCXBhZGRpbmc6IDhweCAxMnB4Ow0KCW1hcmdpbi10b3A6M3B4Ow0KCWZvbnQtc2l6ZTogMTFweDsNCglib3JkZXItYm90dG9tOi"+
        "AxcHggc29saWQgI2VlZTsNCglib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWVlOw0KfQ0KLmZvcm0tcm93IGltZywgLmZvcm0tcm"+
        "93IGlucHV0IHsNCgl2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KCW1hcmdpbi10b3A6IDANCn0NCi5hbGlnbmVkIGxhYmVsIHsNCg"+
        "lwYWRkaW5nOiAwIDFlbSAzcHggMDsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogYXV0bzsNCn0NCi5jaGVja2JveC1yb3cgbGFiZW"+
        "wgew0KCXBhZGRpbmc6IDA7DQoJZmxvYXQ6IG5vbmU7DQoJd2lkdGg6IGF1dG87DQp9DQppbnB1dC5idG4gew0KCXBhZGRpbmc6ID"+
        "BweCAxMHB4IDBweCAxMHB4Ow0KCWNvbG9yOiAjOTk5OTk5Ow0KCWJhY2tncm91bmQtY29sb3I6IFdoaXRlOw0KCWZvbnQtd2VpZ2"+
        "h0OiBib2xkOw0KCWJvcmRlcjogc29saWQgMXB4ICNDQ0NDQ0M7DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KCWZvbnQtc2l6ZToxMn"+
        "B4Ow0KfQ0KaW5wdXQuYnRuOmhvdmVyIHsNCglwYWRkaW5nOiAxcHggMTFweCAxcHggMTFweDsNCgljb2xvcjogIzMzMzMzMzsNCg"+
        "lib3JkZXItY29sb3I6ICM2NjY2NjY7DQp9DQphIHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogIzk5OTk5OTsNCgl0ZX"+
        "h0LWRlY29yYXRpb246IG5vbmU7DQoJY3Vyc29yOiBwb2ludGVyOw0KfQ0KYTpob3ZlciB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQ"+
        "oJY29sb3I6ICMzMzMzMzM7DQoJdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KfQ0KaW1nLmwyciB7DQoJYmFja2dyb3VuZDp1cmwoIm"+
        "RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQmdBQUFBWkNBTUFBQUFjOVI1dkFBQUFCR2RCVF"+
        "VFQUFLJTJGSU53V0s2UUFBQUJsMFJWaDBVMjltZEhkaGNtVUFRV1J2WW1VZ1NXMWhaMlZTWldGa2VYSEpaVHdBQUFBWVVFeFVSZj"+
        "k3ZSUyRiUyRkp5VFVBQVA4N083b0FBUDhBQUFBQUFQJTJGJTJGJTJGJTJCVllGdTRBQUFCeVNVUkJWSGphckpGTERvQXdDRVQ1dG"+
        "Q3JTJGeGlaOHJJQTJMcHdWR1hncFRPRjRFV3dhTTVUS0xTRXU1cWljNEZIRVFkUUd0VGRBZld4Ym9jJTJGWHJWQWZnM1lIcVMlMk"+
        "Y5RG82RkNpRnJQaEY1ZmhFNno5U3l1aDJRQ0hLJTJGcG11SEFWNXlnaXlzRCUyQmtPSTZqNVklMkY3OTU4ODZCUmdBJTJGNXNOMk"+
        "g4cjk5UUFBQUFBU1VWT1JLNUNZSUklM0QiKSBuby1yZXBlYXQgdHJhbnNwYXJlbnQ7DQp9DQppbWcudDJiIHsNCgliYWNrZ3JvdW"+
        "5kOnVybCgiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCZ0FBQUFaQ0FNQUFBQWM5UjV2QU"+
        "FBQUJHZEJUVUVBQUslMkZJTndXSzZRQUFBQmwwUlZoMFUyOW1kSGRoY21VQVFXUnZZbVVnU1cxaFoyVlNaV0ZrZVhISlpUd0FBQU"+
        "FNVUV4VVJmOSUyRmYlMkY4QUFBQUFBUCUyRiUyRiUyRnlDWkZJb0FBQUJ3U1VSQlZIamFsTkpMRHNBZ0NBVFFHWHYlMkZPemZsWD"+
        "hFbVpVV1FGeFhGZFFoOExDeVBWNm9DQlZxdWdrd2h1UW1RMFUlMkZMUlRBRk9ZcW5meFJTSDRUV3V3Qm5JWFdnQ2UlMkZlaGZibm"+
        "ZpNGtzSHklMkZGSEdjU2RqWW1vakxiOEttMjBRWjd6amRYWlFIck9MODVuJTJCJTJCenkzQUFFJTJGNkJTamFGQmFiQUFBQUFFbE"+
        "ZUa1N1UW1DQyIpIG5vLXJlcGVhdCB0cmFuc3BhcmVudDsNCn0NCjwvc3R5bGU%2BDQo8c2NyaXB0IGxhbmd1YWdlPSJKYXZhc2Ny"+
        "aXB0Ij4NCi8vIENvbG9yIFBpY2tlciBTY3JpcHQgZnJvbSBGbG9vYmxlLmNvbQ0KLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHZp"+
        "c2l0IA0KLy8JaHR0cDovL3d3dy5mbG9vYmxlLmNvbS9zY3JpcHRzL2NvbG9ycGlja2VyLnBocA0KLy8gQ29weXJpZ2h0IDIwMDMg"+
        "QW5pbXVzIFBhY3R1bSBDb25zdWx0aW5nIGluYy4NCi8vIFlvdSBtYXkgdXNlIGFuZCBkaXN0cmlidXRlIHRoaXMgY29kZSBmcmVl"+
        "bHksIGFzIGxvbmcgYXMNCi8vIHlvdSBrZWVwIHRoaXMgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhlIGxpbmsgdG8gZmxvb2JsZS5j"+
        "b20NCi8vIGlmIHlvdSBjaG9zZSB0byByZW1vdmUgdGhlbSwgeW91IG11c3QgbGluayB0byB0aGUgcGFnZQ0KLy8gbGlzdGVkIGFi"+
        "b3ZlIGZyb20gZXZlcnkgd2ViIHBhZ2Ugd2hlcmUgeW91IHVzZSB0aGUgY29sb3INCi8vIHBpY2tlciBjb2RlLg0KLy8tLS0tLS0t"+
        "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0NCiAgICAgdmFyIHBlcmxpbmUgPSA1Ow0K"+
        "ICAgICB2YXIgZGl2U2V0ID0gZmFsc2U7DQogICAgIHZhciBjdXJJZDsNCiAgICAgdmFyIGNvbG9yTGV2ZWxzID0gQXJyYXkoJ0En"+
        "LCAnQicsICdDJywgJ0QnLCAnRScsICdGJyk7DQogICAgIHZhciBjb2xvckFycmF5ID0gQXJyYXkoKTsNCg0KICAgICBmdW5jdGlv"+
        "biBhZGRDb2xvcihyLCBnLCBiKSB7DQogICAgIAljb2xvckFycmF5W2NvbG9yQXJyYXkubGVuZ3RoXSA9ICcjJyArIGNvbG9yTGV2"+
        "ZWxzW3JdICsgY29sb3JMZXZlbHNbcl0gKyBjb2xvckxldmVsc1tnXSArIGNvbG9yTGV2ZWxzW2ddICsgY29sb3JMZXZlbHNbYl0g"+
        "KyBjb2xvckxldmVsc1tiXTsNCiAgICAgfQ0KCSANCiAgICAgZnVuY3Rpb24gc2V0Q29sb3IoY29sb3IpIHsNCiAgICAgCXZhciBs"+
        "aW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VySWQpOw0KICAgICAJdmFyIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVu"+
        "dEJ5SWQoY3VySWQgKyAnZmllbGQnKTsNCiAgICAgCXZhciBwaWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Jw"+
        "aWNrZXInKTsNCiAgICAgCWZpZWxkLnZhbHVlID0gY29sb3I7DQogICAgIAlpZiAoY29sb3IgPT0gJycpIHsNCgkgICAgIAlsaW5r"+
        "LnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7DQoJICAgICAJbGluay5zdHlsZS5jb2xvciA9ICdub25lJzsNCgkgICAgIAljb2xv"+
        "ciA9ICdub25lJzsNCiAgICAgCX0gZWxzZSB7DQoJICAgICAJbGluay5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7DQoJICAgICAJ"+
        "bGluay5zdHlsZS5jb2xvciA9IGNvbG9yOw0KCSAgICB9DQogICAgIAlwaWNrZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJzsNCgkg"+
        "ICAgZXZhbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJJZCArICdmaWVsZCcpLnRpdGxlKTsNCiAgICAgfQ0KICAgICAgICAN"+
        "CiAgICAgZnVuY3Rpb24gc2V0RGl2KGlkKSB7ICAgICANCiAgICAgCWlmICghZG9jdW1lbnQuY3JlYXRlRWxlbWVudCkgeyByZXR1"+
        "cm47IH0NCiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOw0KICAgICAgICBpZiAodHlwZW9m"+
        "KGRpdi5pbm5lckhUTUwpICE9ICdzdHJpbmcnKSB7IHJldHVybjsgfQ0KICAgICAgICBnZW5Db2xvcnMoKTsNCiAgICAgICAgZGl2"+
        "LmlkID0gJ2NvbG9ycGlja2VyJzsNCiAgICAgICAJZGl2LmlubmVySFRNTCA9ICc8c3BhbiBzdHlsZT0iZm9udC1mYW1pbHk6VmVy"+
        "ZGFuYTsgZm9udC1zaXplOjExcHg7Ij48YSBocmVmPSJqYXZhc2NyaXB0OnNldENvbG9yKFwnXCcpOyI%2BTm8gY29sb3I8L2E%2B"+
        "PGJyPicgKyBnZXRDb2xvclRhYmxlKCkgKyAnPC9zcGFuPic7DQogICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2"+
        "KTsNCiAgICAgICAgZGl2U2V0ID0gdHJ1ZTsNCiAgICAgfQ0KICAgICANCiAgICAgZnVuY3Rpb24gcGlja0NvbG9yKGlkKSB7DQog"+
        "ICAgIAlpZiAoIWRpdlNldCkgeyBzZXREaXYoaWQpOyB9DQogICAgIAl2YXIgcGlja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5"+
        "SWQoJ2NvbG9ycGlja2VyJyk7ICAgICAJDQoJCWlmIChpZCA9PSBjdXJJZCAmJiBwaWNrZXIuc3R5bGUuZGlzcGxheSA9PSAnYmxv"+
        "Y2snKSB7DQoJCQlwaWNrZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJzsNCgkJCXJldHVybjsNCgkJfQ0KICAgICAJY3VySWQgPSBp"+
        "ZDsNCiAgICAgCXZhciB0aGVsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOw0KICAgICAJcGlja2VyLnN0eWxlLnRv"+
        "cCA9IChnZXRBYnNvbHV0ZU9mZnNldFRvcCh0aGVsaW5rKSArIDIwKSArICJweCI7DQoJCXBpY2tlci5zdHlsZS5sZWZ0ID0gZ2V0"+
        "QWJzb2x1dGVPZmZzZXRMZWZ0KHRoZWxpbmspICsgInB4IjsgICANCgkJcGlja2VyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOw0K"+
        "ICAgICB9DQogICAgIA0KICAgICBmdW5jdGlvbiBnZW5Db2xvcnMoKSB7DQogICAgICAgIGZvciAoYSA9IDA7IGEgPCBjb2xvckxl"+
        "dmVscy5sZW5ndGgtMTsgYSsrKQ0KCQkJYWRkQ29sb3IoYSxhLDUpOw0KDQogICAgICAgIGZvciAoYSA9IDA7IGEgPCBjb2xvckxl"+
        "dmVscy5sZW5ndGgtMTsgYSsrKQ0KCQkJYWRkQ29sb3IoYSw1LGEpOw0KCQkJDQogICAgICAgIGZvciAoYSA9IDA7IGEgPCBjb2xv"+
        "ckxldmVscy5sZW5ndGgtMTsgYSsrKQ0KCQkJYWRkQ29sb3IoNSxhLGEpOw0KCQkJDQogICAgICAgIGZvciAoYSA9IDA7IGEgPCBj"+
        "b2xvckxldmVscy5sZW5ndGgtMTsgYSsrKQ0KCQkJYWRkQ29sb3IoNSw1LGEpOw0KCQkJDQogICAgICAgIGZvciAoYSA9IDA7IGEg"+
        "PCBjb2xvckxldmVscy5sZW5ndGgtMTsgYSsrKQ0KCQkJYWRkQ29sb3IoYSw1LDUpOw0KDQogICAgICAgIGZvciAoYSA9IDA7IGEg"+
        "PCBjb2xvckxldmVscy5sZW5ndGgtMTsgYSsrKQ0KCQkJYWRkQ29sb3IoNSxhLDUpOw0KCQkNCgkJY29sb3JBcnJheVtjb2xvckFy"+
        "cmF5Lmxlbmd0aF0gPSAiI0U1RUNGOSI7DQoJCWNvbG9yQXJyYXlbY29sb3JBcnJheS5sZW5ndGhdID0gIiNGQUZBRTYiOw0KCQkN"+
        "CiAgICAgICAJcmV0dXJuIGNvbG9yQXJyYXk7DQogICAgIH0NCiAgICAgZnVuY3Rpb24gZ2V0Q29sb3JUYWJsZSgpIHsNCiAgICAg"+

        "ICAgIHZhciBjb2xvcnMgPSBjb2xvckFycmF5Ow0KICAgICAgCSB2YXIgdGFibGVDb2RlID0gJyc7DQogICAgICAgICB0YWJsZUNv"+
        "ZGUgKz0gJzx0YWJsZSBib3JkZXI9IjAiIGNlbGxzcGFjaW5nPSIxIiBjZWxscGFkZGluZz0iMSI%2BJzsNCiAgICAgICAgIGZvci"+
        "AoaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHsNCiAgICAgICAgICAgICAgaWYgKGkgJSBwZXJsaW5lID09IDApIHsgdG"+
        "FibGVDb2RlICs9ICc8dHI%2BJzsgfQ0KICAgICAgICAgICAgICB0YWJsZUNvZGUgKz0gJzx0ZCBiZ2NvbG9yPSIjMDAwMDAwIj48"+
        "YSBzdHlsZT0ib3V0bGluZTogMXB4IHNvbGlkICMwMDAwMDA7IGNvbG9yOiAnIA0KICAgICAgICAgICAgICAJICArIGNvbG9yc1tp"+
        "XSArICc7IGJhY2tncm91bmQ6ICcgKyBjb2xvcnNbaV0gKyAnO2ZvbnQtc2l6ZTogMTFweDsiIHRpdGxlPSInIA0KICAgICAgICAg"+
        "ICAgICAJICArIGNvbG9yc1tpXSArICciIGhyZWY9ImphdmFzY3JpcHQ6c2V0Q29sb3IoXCcnICsgY29sb3JzW2ldICsgJ1wnKTsi"+
        "PiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvYT48L3RkPic7DQogICAgICAgICAgICAgIGlmIChpICUgcGVybGluZSA9PSBwZXJs"+
        "aW5lIC0gMSkgeyB0YWJsZUNvZGUgKz0gJzwvdHI%2BJzsgfQ0KICAgICAgICAgfQ0KICAgICAgICAgaWYgKGkgJSBwZXJsaW5lIC"+
        "E9IDApIHsgdGFibGVDb2RlICs9ICc8L3RyPic7IH0NCiAgICAgICAgIHRhYmxlQ29kZSArPSAnPC90YWJsZT4nOw0KICAgICAgCS"+
        "ByZXR1cm4gdGFibGVDb2RlOw0KICAgICB9DQogICAgIGZ1bmN0aW9uIHJlbGF0ZUNvbG9yKGlkLCBjb2xvcikgew0KICAgICAJdm"+
        "FyIGxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7DQogICAgIAlpZiAoY29sb3IgPT0gJycpIHsNCgkgICAgIAlsaW"+
        "5rLnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7DQoJICAgICAJbGluay5zdHlsZS5jb2xvciA9ICdub25lJzsNCgkgICAgIAljb2"+
        "xvciA9ICdub25lJzsNCiAgICAgCX0gZWxzZSB7DQoJICAgICAJbGluay5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7DQoJICAgIC"+
        "AJbGluay5zdHlsZS5jb2xvciA9IGNvbG9yOw0KCSAgICB9DQoJICAgIGV2YWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQgKy"+
        "AnZmllbGQnKS50aXRsZSk7DQogICAgIH0NCiAgICAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVPZmZzZXRUb3Aob2JqKSB7DQogICAgIA"+
        "l2YXIgdG9wID0gb2JqLm9mZnNldFRvcDsNCiAgICAgCXZhciBwYXJlbnQgPSBvYmoub2Zmc2V0UGFyZW50Ow0KICAgICAJd2hpbG"+
        "UgKHBhcmVudCAhPSBkb2N1bWVudC5ib2R5KSB7DQogICAgIAkJdG9wICs9IHBhcmVudC5vZmZzZXRUb3A7DQogICAgIAkJcGFyZW"+
        "50ID0gcGFyZW50Lm9mZnNldFBhcmVudDsNCiAgICAgCX0NCiAgICAgCXJldHVybiB0b3A7DQogICAgIH0NCiAgICAgDQogICAgIG"+
        "Z1bmN0aW9uIGdldEFic29sdXRlT2Zmc2V0TGVmdChvYmopIHsNCiAgICAgCXZhciBsZWZ0ID0gb2JqLm9mZnNldExlZnQ7DQogIC"+
        "AgIAl2YXIgcGFyZW50ID0gb2JqLm9mZnNldFBhcmVudDsNCiAgICAgCXdoaWxlIChwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSkgew"+
        "0KICAgICAJCWxlZnQgKz0gcGFyZW50Lm9mZnNldExlZnQ7DQogICAgIAkJcGFyZW50ID0gcGFyZW50Lm9mZnNldFBhcmVudDsNCi"+
        "AgICAgCX0NCiAgICAgCXJldHVybiBsZWZ0Ow0KICAgICB9DQo8L3NjcmlwdD4NCjxzY3JpcHQgbGFuZ3VhZ2U9ImphdmFzY3JpcH"+
        "QiIHR5cGU9InRleHQvamF2YXNjcmlwdCI%2BDQpmdW5jdGlvbiBCR0JvcmRlcnRvZygpIHsNCgl2YXIgZSA9IGRvY3VtZW50Lmdl"+
        "dEVsZW1lbnRCeUlkKCdCR0JvcmRlcmxpbmsnKTsNCgllLmlubmVySFRNTCA9IChlLmlubmVySFRNTD09J2JhY2tncm91bmQnKSA%"+
        "2FICdib3JkZXInIDogJ2JhY2tncm91bmQnDQp9DQpmdW5jdGlvbiBmbG93dG9nKCkgew0KCXZhciBlID0gZG9jdW1lbnQuZ2V0RW"+
        "xlbWVudEJ5SWQoJ2Zsb3dpbWcnKTsNCgllLmNsYXNzTmFtZSA9IChlLmNsYXNzTmFtZT09J2wycicpID8gJ3QyYicgOiAnbDJyJz"+
        "sNCn0NCjwvc2NyaXB0Pg0KPC9oZWFkPg0KPGJvZHkgb25Mb2FkPSIiPg0KPGZvcm0gbmFtZT0icHJlZmVyZW5jZXMiIGlkPSJwcm"+
        "VmZXJlbmNlcyIgY2xhc3M9ImFsaWduZWQiPg0KICA8ZGl2IGNsYXNzPSJtb2R1bGUiIGlkPSJyb290Ij4NCiAgICA8dGFibGUgYm"+
        "9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj4NCiAgICAgIDx0Ym9keT4NCiAgIC"+
        "AgICAgPHRyPg0KICAgICAgICAgIDx0ZD48aDI%2BR29vZ2xlTW9ua2V5UiA6OiB2PHNwYW4gaWQ9InZlcnNpb24iPjEuMC4wPC9z"+
        "cGFuPjwvaDI%2BPC90ZD4NCiAgICAgICAgICA8dGQgYWxpZ249InJpZ2h0Ij48aDI%2BPGEgaHJlZj0iaHR0cDovL3d3dy5tb25r"+
        "ZXlyLmNvbS8iIHRhcmdldD0iX3RvcCI%2BTW9ua2V5Ui5jb208L2E%2BPC9oMj48L3RkPg0KICAgICAgICA8L3RyPg0KICAgICAg"+
        "PC90Ym9keT4NCiAgICA8L3RhYmxlPg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BDQogICAgICA8bG"+
        "FiZWwgZm9yPSJudW1jb2wxIj4NCiAgICAgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjEiIGlkPSJudW1jb2wxIiB0eX"+
        "BlPSJyYWRpbyI%2BDQogICAgICAgIDEgY29sdW1uIDwvbGFiZWw%2BDQogICAgICAmbmJzcDsmbmJzcDsNCiAgICAgIDxsYWJlbC"+
        "Bmb3I9Im51bWNvbDIiPg0KICAgICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iMiIgaWQ9Im51bWNvbDIiIHR5cGU9In"+
        "JhZGlvIj4NCiAgICAgICAgMiBjb2x1bW5zPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0ibn"+
        "VtY29sMyI%2BDQogICAgICAgIDxpbnB1dCBuYW1lPSJudW1jb2wiIHZhbHVlPSIzIiBpZD0ibnVtY29sMyIgdHlwZT0icmFkaW8i"+
        "Pg0KICAgICAgICAzIGNvbHVtbnM8L2xhYmVsPg0KICAgICAgJm5ic3A7Jm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJudW1jb2w0"+
        "Ij4NCiAgICAgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjQiIGlkPSJudW1jb2w0IiB0eXBlPSJyYWRpbyI%2BDQogIC"+
        "AgICAgIDQgY29sdW1uczwvbGFiZWw%2BDQogICAgICAmbmJzcDsmbmJzcDsoIG9mIHJlc3VsdHMgKSZuYnNwOyZuYnNwOyZuYnNw"+
        "OzxhIGhyZWY9ImphdmFzY3JpcHQ6IGZsb3d0b2coKTsiPjxpbWcgaWQ9ImZsb3dpbWciIG5hbWU9ImZsb3dpbWciIGNsYXNzPSJs"+
        "MnIiIHRpdGxlPSIgZmxvdyBvZiByZXN1bHRzICIgYm9yZGVyPSIwIiBzdHlsZT0id2lkdGg6MjRweDsJaGVpZ2h0OjI1cHg7CW1h"+
        "cmdpbi10b3A6LTRweDsiIHNyYz0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCZ0FBQUFa"+
        "Q0FNQUFBQWM5UjV2QUFBQUJHZEJUVUVBQUslMkZJTndXSzZRQUFBQmwwUlZoMFUyOW1kSGRoY21VQVFXUnZZbVVnU1cxaFoyVlNa"+
        "V0ZrZVhISlpUd0FBQUFHVUV4VVJmJTJGJTJGJTJGd0FBQUZYQzAzNEFBQUFCZEZKT1V3QkE1dGhtQUFBQUVVbEVRVlI0Mm1KZ0dB"+
        "V2pnSTRBSU1BQUFuRUFBZldnYXJrQUFBQUFTVVZPUks1Q1lJSSUzRCI%2BPC9hPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZvcm"+
        "0tcm93IGNoZWNrYm94LXJvdyI%2BIFJlbW92ZSAmbmJzcDsNCiAgICAgIDxsYWJlbCBmb3I9InJlbXNlYXJjaGVzcmVsYXRlZHRv"+
        "Ij4NCiAgICAgICAgPGlucHV0IG5hbWU9InJlbXNlYXJjaGVzcmVsYXRlZHRvIiBpZD0icmVtc2VhcmNoZXNyZWxhdGVkdG8iIHR5"+
        "cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgIlJlbGF0ZWQgU2VhcmNoZXMiIDwvbGFiZWw%2BDQogICAgICAmbmJzcDsNCiAgICAgID"+
        "xsYWJlbCBmb3I9InJlbXNwb25zb3IiPg0KICAgICAgICA8aW5wdXQgbmFtZT0icmVtc3BvbnNvciIgaWQ9InJlbXNwb25zb3IiIH"+
        "R5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgIlNwb25zb3JlZCBMaW5rcyI8L2xhYmVsPg0KICAgICAgJm5ic3A7DQogICAgICA8bG"+
        "FiZWwgZm9yPSJyZW1zZWFyY2h0b29scyI%2BDQogICAgICAgIDxpbnB1dCBuYW1lPSJyZW1zZWFyY2h0b29scyIgaWQ9InJlbXNl"+
        "YXJjaHRvb2xzIiB0eXBlPSJjaGVja2JveCI%2BDQogICAgICAgICJTZWFyY2ggVG9vbHMiPC9sYWJlbD4NCiAgICA8L2Rpdj4NCi"+
        "AgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0ibnVtcmVzdWx0cyI%2BDQog"+
        "ICAgICAgIDxpbnB1dCBuYW1lPSJudW1yZXN1bHRzIiBpZD0ibnVtcmVzdWx0cyIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgICBO"+
        "dW1iZXIgcmVzdWx0cyAoIDEsIDIsIDMuLi4gZXRjLiApPC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3Jt"+
        "LXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0iYXV0b2xvYWQiPg0KICAgICAgICA8aW5wdXQgbmFtZT0iYXV0"+
        "b2xvYWQiIGlkPSJhdXRvbG9hZCIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgICBBdXRvIGxvYWQgbW9yZSByZXN1bHRzPC9sYWJl"+
        "bD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0i"+
        "aGlkZXNlYXJjaCI%2BDQogICAgICAgIDxpbnB1dCBuYW1lPSJoaWRlc2VhcmNoIiBpZD0iaGlkZXNlYXJjaCIgdHlwZT0iY2hlY2"+
        "tib3giPg0KICAgICAgICBEb24ndCBkaXNwbGF5IHRoZSBHb29nbGUgd2ViIHNlYXJjaCBkaWFsb2d1ZXMgKCBJIHVzZSB0aGUgR2"+
        "9vZ2xlIHRvb2xiYXIgaW5zdGVhZCEgKTwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2"+
        "hlY2tib3gtcm93Ij4gU2VsZWN0IHRoZSA8YSBocmVmPSJqYXZhc2NyaXB0OiBCR0JvcmRlcnRvZygpOyIgbmFtZT0iQkdCb3JkZX"+
        "JsaW5rIiBpZD0iQkdCb3JkZXJsaW5rIiB0aXRsZT0iIHRvZ2dsZSBiZXR3ZWVuIGEgYmFja2dyb3VuZCBvciBib3JkZXIgaHVlIC"+
        "I%2BYmFja2dyb3VuZDwvYT4gY29sb3IgKCBodWUgKSBmb3IgeW91ciBzZWFyY2ggcmVzdWx0cyZuYnNwOyZuYnNwOyZuYnNwOyA8"+
        "YSBocmVmPSJqYXZhc2NyaXB0OnBpY2tDb2xvcignUmVzSHVlJyk7IiBpZD0iUmVzSHVlIiBzdHlsZT0iYm9yZGVyOiAxcHggc29s"+
        "aWQgcmdiKDAsIDAsIDApOyBmb250LWZhbWlseTogVmVyZGFuYTsgZm9udC1zaXplOiAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5v"+
        "bmU7Ij4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L2E%2BDQogICAgICA8aW5wdXQgaWQ9IlJlc0h1ZWZpZWxkIiBzaXplPSI3Ii"+
        "BvbkNoYW5nZT0icmVsYXRlQ29sb3IoJ1Jlc0h1ZScsIHRoaXMudmFsdWUpOyI%2BDQogICAgICAmbmJzcDsmbmJzcDsmbmJzcDsm"+
        "bmJzcDs8YSBocmVmPSJodHRwOi8vd3d3LmZsb29ibGUuY29tL3NjcmlwdHMvY29sb3JwaWNrZXIucGhwIiB0YXJnZXQ9Il9ibGFu"+
        "ayIgdGl0bGU9IiBmbG9vYmxlIGNvbG9yIHBpY2tlciBzY3JpcHQgIiBzdHlsZT0iZm9udC1zaXplOiA4cHg7Ij5mbG9vYmxlPC9h"+
        "PiA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPiBNYWtlIG15IEdvb2dsZSBsaW5rcyBvcGVu"+
        "IGluIGEgbmV3IHRhcmdldCAmbmJzcDsNCiAgICAgIDxsYWJlbCBmb3I9ImV4dGxpbmtzZWFyY2giPg0KICAgICAgICA8aW5wdXQg"+
        "bmFtZT0iZXh0bGlua3NlYXJjaCIgaWQ9ImV4dGxpbmtzZWFyY2giIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgZm9yIHNlYXJj"+
        "aCByZXN1bHRzPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0iZXh0bGlua2lnb29nbGUiPg0K"+
        "ICAgICAgICA8aW5wdXQgbmFtZT0iZXh0bGlua2lnb29nbGUiIGlkPSJleHRsaW5raWdvb2dsZSIgdHlwZT0iY2hlY2tib3giPg0K"+
        "ICAgICAgICBmb3IgaUdvb2dsZTwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2ti"+
        "b3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9InNlYXJjaGxpbmt0cmFja2luZyI%2BDQogICAgICAgIDxpbnB1dCBuYW1lPSJzZW"+
        "FyY2hsaW5rdHJhY2tpbmciIGlkPSJzZWFyY2hsaW5rdHJhY2tpbmciIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgRGlzYWJsZS"+
        "BHb29nbGUgdHJhY2tpbmcgIG15IHNlYXJjaCByZXN1bHRzIDwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz"+
        "0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4gRm9yIGVhY2ggcmVzdWx0IHNob3cgJm5ic3A7DQogICAgICA8aW5wdXQgbmFtZT0iZm"+
        "F2aWNvbiIgaWQ9ImZhdmljb24iIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImZhdmljb24iPiBmYXZpY29ucz"+
        "wvbGFiZWw%2BDQogICAgICAmbmJzcDsmbmJzcDsNCiAgICAgIDxpbnB1dCBuYW1lPSJpbWFnZXByZXZpZXciIGlkPSJpbWFnZXBy"+
        "ZXZpZXciIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImltYWdlcHJldmlldyI%2BIEdvb2dsZVByZXZpZXcgaW"+
        "1hZ2VzPC9sYWJlbD4NCiAgICAgICZuYnNwOw0KICAgICAgJm5ic3A7Jm5ic3A7PGEgaHJlZj0iaHR0cDovL3d3dy5nb29nbGVwcm"+
        "V2aWV3LmNvbS8iIHRhcmdldD0iX2JsYW5rIiB0aXRsZT0iIEdvb2dsZVByZXZpZXcgIiBzdHlsZT0iZm9udC1zaXplOiA4cHg7Ij"+
        "5Hb29nbGVQcmV2aWV3PC9hPiA8L2Rpdj4NCiAgPC9kaXY%2BDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPHRhYmxlIG"+
        "JvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJvZHk%2BDQ"+
        "ogICAgICAgIDx0ciBoZWlnaHQ9IjMwIj4NCiAgICAgICAgICA8dGQgYWxpZ249ImxlZnQiIHZhbGlnbj0ibWlkZGxlIj4mbmJzcD"+
        "smbmJzcDsmbmJzcDs8YSBocmVmPSIjIiBuYW1lPSJjaGVja191cGRhdGUiIGlkPSJjaGVja191cGRhdGUiPmNoZWNraW5nIGZvci"+
        "B1cGRhdGUuLi48L2E%2BPC90ZD4NCiAgICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRoPSI3"+
        "MiI%2BPGlucHV0IHZhbHVlPSJDbG9zZSIgbmFtZT0iY2xvc2VfYnV0dG9uIiBpZD0iY2xvc2VfYnV0dG9uIiBjbGFzcz0iYnRuIi"+
        "B0eXBlPSJidXR0b24iPjwvdGQ%2BDQogICAgICAgICAgPHRkIGFsaWduPSJjZW50ZXIiIHZhbGlnbj0ibWlkZGxlIiB3aWR0aD0i"+
        "MTY1Ij48aW5wdXQgdmFsdWU9IlNhdmUgUHJlZmVyZW5jZXMiIG5hbWU9InNhdmVfYnV0dG9uIiBpZD0ic2F2ZV9idXR0b24iIGNs"+
        "YXNzPSJidG4iIHR5cGU9ImJ1dHRvbiI%2BPC90ZD4NCiAgICAgICAgPC90cj4NCiAgICAgIDwvdGJvZHk%2BDQogICAgPC90YWJs"+
        "ZT4NCiAgPC9kaXY%2BDQo8L2Zvcm0%2BDQo8L2JvZHk%2BDQo8L2h0bWw%2B",

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
    
    REFRESH_HTML : "data:text/html;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VOIiAiaHR0cDovL3"+
        "d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD48aGVhZD48dGl0bGU%2BR29vZ2xlTW9ua2V5UiBVcGRhdG"+
        "U8L3RpdGxlPg0KPG1ldGEgaHR0cC1lcXVpdj0iQ29udGVudC1UeXBlIiBjb250ZW50PSJ0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLT"+
        "giPg0KPG1ldGEgbmFtZT0iQXV0aG9yIiBjb250ZW50PSJtdW5ndXNodW1lIj4NCjxtZXRhIG5hbWU9IkNvcHlyaWdodCIgY29udG"+
        "VudD0iwqkgMjAwNywgTW9ua2V5Ui5jb20iPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCmJvZHkgeyBtYXJnaW46MDsgcGFkZG"+
        "luZzowOyBmb250LXNpemU6MTJweDsgZm9udC1mYW1pbHk6Ikx1Y2lkYSBHcmFuZGUiLCJCaXRzdHJlYW0gVmVyYSBTYW5zIixWZX"+
        "JkYW5hLEFyaWFsLHNhbnMtc2VyaWY7IGNvbG9yOiMzMzM7IHdpZHRoOiAzMDBweDsgbWFyZ2luOiAwIGF1dG87IH0NCi5tb2R1bG"+
        "UgeyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBtYXJnaW4tYm90dG9tOiA1cHg7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH0NCi"+
        "5tb2R1bGUgaDIgeyBtYXJnaW46IDA7IHBhZGRpbmc6IDJweCA1cHggM3B4IDVweDsgZm9udC1zaXplOiAxMXB4OyBmb250LXdlaW"+
        "dodDogYm9sZDsgYmFja2dyb3VuZDogI0NDQ0NDQyB1cmwoImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQVdBTVFBQU"+
        "1qS3lzWEh4OSUyRmg0YyUyRlIwZVBsNWNiSXlOUFYxYzNQeiUyQmZwNmQ3aDRlN3c4T3Z0N2N2TnpkZloyZUhqNDl2ZDNmRHk4Z0"+
        "FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0g1QkFBQUFBQUFMQUFBQU"+
        "FBQkFCWUFBQVVTSUNRcUMwSUlUM01FQmNBTVJ2TWtqaE1DQURzJTNEIikgdG9wIGxlZnQgcmVwZWF0LXg7IGNvbG9yOiAjNjY2Nj"+
        "Y2OyBib3JkZXItYm90dG9tOiAwOyB9DQouZm9ybS1yb3cgeyBvdmVyZmxvdzogaGlkZGVuOyBwYWRkaW5nOiAxMnB4IDEycHg7IG"+
        "ZvbnQtc2l6ZTogMTFweDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7IGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlZW"+
        "U7IHZlcnRpY2FsLWFsaWduOm1pZGRsZTsgdGV4dC1hbGlnbjpjZW50ZXI7IH0NCmlucHV0LmJ0biB7CXBhZGRpbmc6IDBweCAxMH"+
        "B4IDBweCAxMHB4OyBjb2xvcjogIzk5OTk5OTsgYmFja2dyb3VuZC1jb2xvcjogV2hpdGU7IGZvbnQtd2VpZ2h0OiBib2xkOyBib3"+
        "JkZXI6IHNvbGlkIDFweCAjQ0NDQ0NDOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0NCmlucHV0LmJ0bjpob3ZlciB7CXBhZGRpbmc6ID"+
        "FweCAxMXB4IDFweCAxMXB4OyBjb2xvcjogIzMzMzMzMzsgYm9yZGVyLWNvbG9yOiAjNjY2NjY2OyB9DQphIHsgZm9udC13ZWlnaH"+
        "Q6IGJvbGQ7IGNvbG9yOiAjOTk5OTk5OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGN1cnNvcjogcG9pbnRlcjsgfQ0KYTpob3Zlci"+
        "B7CWZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzMzMzMzMzsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9DQo8L3N0eWxlPjwvaG"+
        "VhZD48Ym9keSBvbkxvYWQ9IiI%2BDQo8Zm9ybSBuYW1lPSJ1cGRhdGUiIGlkPSJ1cGRhdGUiIGNsYXNzPSJhbGlnbmVkIj4NCiAg"+
        "PGRpdiBjbGFzcz0ibW9kdWxlIj4NCiAgICA8dGFibGUgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAi"+
        "IHdpZHRoPSIxMDAlIj4NCg0KICAgICAgPHRib2R5Pjx0cj4NCiAgICAgICAgPHRkPjxoMj48c3BhbiBpZD0ic2NyaXB0TmFtZSI%"+
        "2Bc2NyaXB0TmFtZTwvc3Bhbj48L2gyPjwvdGQ%2BDQogICAgICAgIDx0ZCBhbGlnbj0icmlnaHQiPjxoMj48YSBocmVmPSJodHRw"+
        "Oi8vd3d3Lm1vbmtleXIuY29tLyIgdGFyZ2V0PSJfdG9wIj5Nb25rZXlSLmNvbTwvYT48L2gyPjwvdGQ%2BDQogICAgICA8L3RyPg"+
        "0KICAgIDwvdGJvZHk%2BPC90YWJsZT4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyI%2BDQoJPHRhYmxlIGJvcmRlcj0iMCIgY2"+
        "VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQoJPHRib2R5Pjx0cj48dGQgYWxpZ249ImNlbnRl"+
        "ciIgaGVpZ2h0PSI0MCIgdmFsaWduPSJtaWRkbGUiPlJlZnJlc2ggeW91ciBicm93c2VyIHRvIGNvbnRpbnVlLjwvdGQ%2BPC90cj"+
        "4NCg0KCTx0cj48dGQgYWxpZ249ImNlbnRlciIgaGVpZ2h0PSI0MCIgdmFsaWduPSJtaWRkbGUiPjxpbnB1dCBuYW1lPSJidXR0b2"+
        "4iIGNsYXNzPSJidG4iIG9uQ2xpY2s9ImphdmFzY3JpcHQ6dG9wLmxvY2F0aW9uLnJlbG9hZCh0cnVlKTsiIHZhbHVlPSJSZWZyZX"+
        "NoIiB0eXBlPSJidXR0b24iPjwvdGQ%2BPC90cj4NCgk8L3Rib2R5PjwvdGFibGU%2BPC9kaXY%2BDQogIDwvZGl2Pg0KPC9mb3Jt"+
        "Pg0KPC9ib2R5PjwvaHRtbD4%3D",
	
    LOADING_GIF : "data:image/gif;base64,R0lGODlhIgAiAPQAADk5OVJSUlpaWmtra3t7e4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7Ozt"+
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

/* Prototypes and additional document functions */
document.getElementByXPath = function(XPath, contextNode)
{
    var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return (a.snapshotLength ? a.snapshotItem(0) : null);
};

document.getElementsByXPath = function(XPath, contextNode)
{
    var ret=[], i=0;
    var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
    {
        ret.push(a.snapshotItem(i++));
    }
    return ret;
};

document.buildElement = function(type, atArr, inner, action, listen)
{
    var e = document.createElement(type);
    for (var at in atArr) 
    {
        if (atArr.hasOwnProperty(at))
        {
            e.setAttribute(at, atArr[at]);
        }
    }
    if(action && listen)
    {
        e.addEventListener(action, listen, false);
    } 
    if(inner)
    {
        e.innerHTML = inner;
    }
    return e;
};

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

String.prototype.retNum = function()
{
    return (isNaN(this) ? 0 : (+this));
}; 


/* Run the update check */
UIL.UI.updateCheckRequest();
/* Run the script */
UIL.init();

