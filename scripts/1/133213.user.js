// ==UserScript==
// @author         mungushume
// @version        1.5.2
// @name           GoogleMonkeyR
// @namespace      http://www.monkeyr.com
// @description    Google - Multiple columns of results, Remove "Sponsored Links", Number results, Auto-load more results, Remove web search dialogues, Open external links in a new tab, self updating and all configurable from a simple user dialogue.
// @include        http://www.google.*/webhp?*
// @include        http://www.google.*/search?*
// @include        http://www.google.*/ig?*
// @include        http://www.google.*/
// @include        http://www.google.*/#*
// @include        https://encrypted.google.*/webhp?*
// @include        https://encrypted.google.*/search?*
// @include        https://encrypted.google.*/ig?*
// @include        https://encrypted.google.*/
// @include        https://encrypted.google.*/#*
// @uso:script     9310
// @scriptsource   http://userscripts.org/scripts/show/9310
// @scriptsource   http://google.monkeyr.com/script/1.5.2/googlemonkeyr.user.js
/* StartHistory

v1.5.2 - 5 Oct 2011
 - Bug fix: Repaired top margin on image results. Thanks to trup for the screen
 shot, version info and link to a problem page! Easy to track down bugs when
 this sort of info is provided ;)

v1.5.1 - 5 Oct 2011
 - Bug fix: Repaired Cached and Similar links when Disable Google tracking my
 search results is checked.
 - Bug fix: Altered the position of the Advanced Search link when Don't display
 the Google web search dialogues is checked (works better on smaller screens).
 - Bug fix: Corrected the positioning of elements at the top of the page on
 image searches.
 - Bug fix: Shopping searches now show the your location / sort by top tool bar.
 - Bug fix: Video search now shows thumbnails for auto loaded content.

v1.5 - 25 Sep 2011
 - Bug fix: result container width has been limited in a recent update. Now
 fixed. Thanx @ck0743 and @Phil699 for your patience
 - Bug fix: Various other fixes after the most recent google updates. 4 hours
 coding in all just to get it back to how it was! Deep joy ;)

v1.4.7 - 21 Jul 2011
 - Bug fix: First results we partially hidden when "Don't display the Google
 web search dialogues" was selected
 - Bug fix: Update banner was hidden below the top black bar
 - Bug fix: Removed duplicate did you mean, again! Thanks andi-03!
 - Feature: Now using Google favicons as suggested by None Nosome. Cheers!

v1.4.6 - 9 Jul 2011
 - Bug fix: Missing thumbnail images on subsequent pages of results when auto
 load is enabled.
 - Bug fix: Trackless links fixed. Thanks @eatmorglue!

v1.4.5 - 27 Apr 2011
 - Bug fix: Rejiggle after Google altered some bits on there Australian home
 page. Thanks @daveo76 for reporting this!

v1.4.4 - 20 Feb 2011
 - Bug fix: Missing thumbnail images on subsequent pages of results when auto
 load is enabled

v1.4.3 - 18 Feb 2011
 - Bug fix: Changed the browser (GreaseMonkey) detection method to a more
 generic function. This should stop problems with FF beta v11+.
 Thanks to Babbalucio and Qudeid for identifying the line the error seen in
 FFb11 was occuring.
 - Layout: Hopefully corrected the removal of duplicate "Did you mean?",
 "Showing results for..." and "More results for..." without removing potential
 "No results found for...". One day i'll get it right!)
 - Layout: Corrected positioning of result stats/search dialogue with instant
 search on or off.
 - Bug fix: Updated https @includes for the encrypted subdomain as noted
 by SeeFood. Thanks!

v1.4.2.1 - 17 Feb 2011
 - Layout: Moved settings link under the	options (gear) icon

v1.4.2 - 17 Feb 2011
 - Bug fix: Now works with the new top toolbar

v1.4.1 - 24 Dec 2010
 - Bug fix: Allowed port numbers in the page preview code as per RobinRosengren's
 suggestion. Cheers.

v1.4 beta - 17 Dec 2010
 - Rebuild: Now one script for all browsers (including chrome!) with no
 dependencies on any other scripts (opera)
 - Bug fix: Corrected the positioning of result numbering
 - Bug fix: Removed duplicate did you mean
 - Feature: Now you can remove googles Site Preview feature

v1.3.8.1 beta - 26 May 2010
 - Feature: Changed/updated @includes to allow for https searching as requested
 by auscompgeek

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
(function(){
var UIL =
    {
    scriptName : "GoogleMonkeyR",
    scriptVersion : "1.5.2",
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
        else if (window.location.href==(window.location.protocol + '//' + window.location.hostname + '/'))
        {
            pageType = "home";
        }
        var el={}; el.target = document.getElementByXPath("//\x49\x46\x52\x41\x4D\x45[@name='wgjf']");if(el.target)this.homeWatcher(el);
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
        this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #cnt #center_col, #cnt #foot, .mw {width:auto !important; max-width:100% !important;} #rhs {left:auto; !important}#botstuff .sp_cnt,#botstuff .ssp{display:none} .s{max-width:98%!important;} .vshid{display:inline}");
        if(UIL.Config.getHideSearch())
        {
            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #rcnt{margin-top:1em} #sfcnt,#sftr,#searchform{display:none!important;}#cnt{padding:0}#cnt .mw:first-child{position:absolute;top:4.5em;right:0}#rshdr .sfcc{position:absolute;top:2em;right:0}");
        }

        if(UIL.Config.getRemSponsor())
        {
            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #center_col, #foot {margin-right: 0 !important;} #rhs, #tads, #topstuff table.ts, #bottomads{display:none;}");
        }

		if(UIL.Config.getSearchesRelatedTo())
		{
			this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #botstuff #brs{display:none;} #topstuff .tqref{display:none;}");
		}

		if(UIL.Config.getRemSearchTools())
		{
			this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #leftnav {display:none} #center_col {margin-left:0 !important}");
		}

		if(UIL.Config.getNumResults())
		{
			this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #res h3.r {display:inline}");
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

	homePageProcessor : function()
	{
		document.addEventListener("DOMNodeInserted", this.homeWatcher, false);
	},

	homeWatcher : function(e)
	{
		if(e.target.nodeName=='\x49\x46\x52\x41\x4D\x45')
		{
			e.target.parentNode.removeChild(e.target);
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
        var ret = (document.body.scrollHeight - window.pageYOffset - window.innerHeight);
        return ret;
    },

    watchForScroll : function()
    {
        var self = arguments.callee;
        if (this.remainingScroll() < 300 && !this.requestingMoreResults) {
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
                BGBorder = "border: 1pt solid ";
            }

            var imagePreview = "";
            if(this.imagePreview)
            {
                imagePreview = "min-height:102px;";
            }

            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); \ li.g, div.g { margin-top: 0.15em !important; margin-right: 0.25em !important; margin-bottom: 0.15em !important; margin-left: 0.25em; -moz-border-radius: 10px; border-radius: 10px; " + BGBorder + " "+ hue +" ! important; padding: 0.5em ! important; } li.g {list-style-image:none;list-style-position:outside;list-style-type:none;"+imagePreview+"};");
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
            this.noSitePreview = UIL.Config.getNoSitePreview();
            this.autoLoad = UIL.Config.getAutoLoad();
            div.parentNode.appendChild(table);
            var list = document.getElementsByXPath("//div[@id='ires']//li[starts-with(@class,'g')] | //div[@id='ires']//li/div[@class='g']");
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
        var link = list[i], div;
        if(this.numResults && (div = document.getElementByXPath("./div/*[1] | ./h3[1]", link)))
        {
			var str = document.buildElement('strong', null, (i + this.lastI + this.startBase + 1)+' ' );
			div.parentNode.insertBefore(str, div);
        }
        if(this.noSitePreview){
            var divs = document.getElementsByXPath(".//div[contains(@class,'vsc')]", link)
            for (var j = 0; j < divs.length; j++)
            {
                divs[j].setAttribute('class', divs[j].getAttribute('class').replace('vsc',''));
            }
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
                var base = a.href.match(/http:\/\/([\w\.\-]+)\//);
				if(base){
					var fav = document.buildElement('img', {width:'16',height:'16',style:'margin-bottom:-3px;', src:'http://www.google.com/s2/favicons?domain=' + encodeURIComponent(base[1])});
					a.parentNode.insertBefore(fav, a);
					a.parentNode.insertBefore(document.createTextNode(' '), a);
				}
            }

            if(this.imagePreview)
            {
//console.log(this.imagePreview)
                var a2 = a.cloneNode(false);
                a2.removeAttribute('class');
                var sl = a.href.match(/:\/\/www.(\w)|:\/\/(\w)/);
                var bs = a.href.match(/(http:\/\/[\w\.\-:]+)\/|(ftp:\/\/[\w\.\-:]+)\/|(https:\/\/[\w\.\-:]+)\//);
                sl = sl[1] || sl[2];
                bs = bs[1] || bs[2] || bs[3];
                var img = document.buildElement('img', {align:'left',src:"http://"+ sl +".searchpreview.de/preview?s="+ bs +"&ra=1",
                    style:'border:1px solid #BBB;margin:2px 4px 5px 0px;width:111px;height:82px;'});
                a2.appendChild(img);
                a.parentNode.parentNode.insertBefore(a2, a.parentNode);
            }
			var ele = document.getElementByXPath(".//div[@class='s']//span[@class='vshid']", link);
			if (ele) {
//					console.log(ele.innerHTML);
				var vsl = ele.getElementsByTagName('a');
				for (var k = 0; k < vsl.length; k++)
				{
					if(k==0)
					{
						ele.insertBefore(document.createTextNode(" - "), vsl[k]);
					}
					vsl[k].setAttribute('class', 'fl');
				}
			}
            if(!this.searchLinkTracking && ele)
            {
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

        var cell = this.resultsTable.rows[row].insertCell(col);
        cell.setAttribute("valign", "top");
        var cellWidth = Math.floor(100 / this.numColumns) + "%";
        cell.setAttribute("width", cellWidth);
        //cell.setAttribute("id", i);
        cell.appendChild(link);
    },

    processResults : function(responseText)
    {
		var i, img;
        this.loadingImage.style.display = "none";
        var nextResult = document.buildElement('div', null, responseText);

		var imgs = document.getElementsByXPath(".//img[contains(@class,@id)]");
		for (i = 0; (img = imgs[i++]);)
		{
			img.removeAttribute('id')
		}

        var stats = document.getElementByXPath(".//div[@id='resultStats']", nextResult);
        if(this.resultStats && stats)
        {
            this.resultStats.innerHTML = stats.innerHTML;
        }

        var list = document.getElementsByXPath(".//div[@id='res']/div//li[starts-with(@class,'g')] | .//div[@id='res']/div//li/div[@class='g']", nextResult);
    	var length = list.length;
        for (i = 0; i < list.length; i++)
    	{
            this.resultsToTable(list, i, length);
    	}
        this.nextRow = this.curRow;
        this.paginationBoundry();
        this.lastI += i;

		var xfoot = document.getElementByXPath(".//div[@id='xfoot']", nextResult);
		var scrxpath = (xfoot) ? ".//div[@id='xfoot']/script" : "./script"; //results returned in Opera have no xfoot div. Weird!)
		var imgscrs = document.getElementsByXPath(scrxpath, nextResult);
//		console.log(scrxpath +', '+imgscrs.length)
		if (imgscrs && imgscrs.length>1)
		{
			for (i = 0; i<(imgscrs.length-1); i++)
			{
				var scr = imgscrs[i] && imgscrs[i].innerHTML;
				if(scr.indexOf('data:image/')!=-1)
				{
					eval(scr);
//					console.log(scr);
				}
			}
		}

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
        var controls = document.getElementByXPath("//div[@id='gbd5']//ol[@class='gbmcc']/li[3]");
        var link = document.getElementById('GoogleMonkeyRLink');
        if (controls && !link)
        {
            var parent = controls.parentNode;
			//<li class="gbt gbtb"><a class="gbgt" id="gbg4" href="//google.com/profiles" aria-haspopup="true" aria-owns="gbd4"><span class="gbtb2"><span id="gbgs4" class="gbts"><span id="gbi4"><span id="gbi4m1">GoogleMonkeyR</span></span></span></span></a></li>
			var li = document.buildElement('li',{'class':'gbkp gbmtc'});
            link = document.buildElement('a',{href:'#',id:'GoogleMonkeyRLink','class':'gbmt'},'GoogleMonkeyR settings','click',UIL.UI.preferencesShow.bind(UIL.UI));
			li.appendChild(link);
            parent.insertBefore(li, controls);
        }
        if(typeof GM_registerMenuCommand !== "undefined"){
            GM_registerMenuCommand("GoogleMonkeyR Preferences", UIL.UI.preferencesShow.bind(UIL.UI));
        }
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

    getNoSitePreview : function()
    {
        return this._getBooleanConfig("noSitePreview", false);
    },

    setNoSitePreview : function(noSitePreview)
    {
        GM_setValue("noSitePreview", noSitePreview);
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
        var prefs = document.buildElement('div',
            {id:'uil_preferences',name:'uil_preferences',
            style:'position:fixed;top:5%;left:0px;right:0px;border:none;height:100%;width:100%;overflow:hidden;z-index:10001;'}
            ,this.Base64.decode(UIL.RES.PREFS_HTML));
        document.body.appendChild(prefs);
        this.preferencesDocumentLoadHandler();
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
        var form = document.getElementById("preferences");

        // Set up form state
        form.elements.namedItem("numcol" + UIL.Config.getNumCol()).checked = true;
        form.elements.namedItem("remsponsor").checked = UIL.Config.getRemSponsor();
        form.elements.namedItem("numresults").checked = UIL.Config.getNumResults();
        form.elements.namedItem("remsearchtools").checked = UIL.Config.getRemSearchTools();
        form.elements.namedItem("autoload").checked = UIL.Config.getAutoLoad();
        form.elements.namedItem("hidesearch").checked = UIL.Config.getHideSearch();
        form.elements.namedItem("noSitePreview").checked = UIL.Config.getNoSitePreview();
        form.elements.namedItem("extlinksearch").checked = UIL.Config.getExtLinkSearch();
        form.elements.namedItem("extlinkigoogle").checked = UIL.Config.getExtLinkiGoogle();
        form.elements.namedItem("searchlinktracking").checked = UIL.Config.getSearchLinkTracking();
        form.elements.namedItem("ResHuefield").value = UIL.Config.getResHue();
        form.elements.namedItem("imagepreview").checked = UIL.Config.getImagePreview();
        form.elements.namedItem("favicon").checked = UIL.Config.getFavIcon();
        form.elements.namedItem("remsearchesrelatedto").checked = UIL.Config.getSearchesRelatedTo();
        //this.prefs.contentDocument.getElementById("ResHue").style.color = UIL.Config.getResHue();
        document.getElementById("ResHue").style.background = UIL.Config.getResHue();
        document.getElementById("BGBorderlink").innerHTML = UIL.Config.getBGBorder();
        document.getElementById("flowimg").className = UIL.Config.getResultFlow();

        // Set up event handlers
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
        form.elements.namedItem("save_button").addEventListener("click", this.preferencesSaveConfigurationHandler.bind(this), false);
        document.getElementById("ResHue").addEventListener("click", UIL.RES.colorPicker.pickColor.bind(UIL.RES.colorPicker), false);
        document.getElementById("flowimg").addEventListener("click", UIL.RES.flowtog, false);
        document.getElementById("BGBorderlink").addEventListener("click", UIL.RES.bgBordertog, false);
        document.getElementById("ResHuefield").addEventListener("change", UIL.RES.colorPicker.relateColor('ResHue'), false);

        document.getElementById("version").innerHTML=UIL.scriptVersion;
        if(BrowserDetect.csQuery){
            this.getURL("http://userscripts.org/scripts/source/"+UIL.scriptId+".meta.js", this.updateTestOnPreferences.bind(this));
        }
        else{
            this.updateLink(false);
        }
    },

    getURL : function(address, cb)
    {
        GM_xmlhttpRequest({
            method :"GET",
            url :address,//+"?"+Math.random(),
            onload :function(xhr) {cb(xhr.responseText);}
        });
    },

    updateCheckRequest : function()
    {
        if(!BrowserDetect.csQuery) return;
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

    updateLink : function(update){
        var link = document.getElementById("check_update");
        link.setAttribute("target", "_top");

        if ( update )
        {
            link.addEventListener("click", this.historyShow.bind(this), false);
            link.setAttribute("title", " see what's new with GoogleMonkeyR... ");
            link.style.textDecoration = "blink";
            link.innerHTML = "v"+this.onSiteVersion+" available";
        }
        else
        {
            if(BrowserDetect.csQuery)
            {
                link.setAttribute("href", "#");
                link.setAttribute("title", " the history of GoogleMonkeyR ");
                link.innerHTML = "history";
                link.addEventListener("click", this.historyShow.bind(this), false);
            }
            else
            {
                link.setAttribute("href", "http://userscripts.org/scripts/show/"+UIL.scriptId);
                link.setAttribute("title", " check for the latest script version on the homepage ");
                link.innerHTML = "script homepage";
            }
            link.parentNode.appendChild(document.createTextNode(" - "));

            var link2 = document.buildElement('a',{href:"http://"+ location.hostname +"/preferences",
                target:'_parent',title:' your Google preferences '},'prefs');

            link.parentNode.appendChild(link2);
            link.parentNode.appendChild(document.createTextNode(" - "));

            var link3 = document.buildElement('a',{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mungushume@hotmail.com&item_name=GreaseMonkey%20programming/beer%20fund&no_shipping=0&no_note=1&tax=0&currency_code=GBP&lc=GB&bn=PP-DonationsBF&charset=UTF-8",
                target:'_parent',title:' donate to the GoogleMonkeyR programming/beer fund '},'donate');

            link.parentNode.appendChild(link3);
        }
    },

    updateTestOnPreferences: function(text)
    {
        var onSiteVersion = text.match(/\/\/\s*@version\s*(\d.*)/);
        this.onSiteVersion = (onSiteVersion===null) ? 0  : onSiteVersion[1];
        GM_setValue('onSiteVersion', this.onSiteVersion);

        var updateHistory = text.substring(text.search(/\/\*/));
        updateHistory = updateHistory.substring(0, updateHistory.search(/\*\//))
        GM_setValue('onSiteVersionHistory', encodeURI(updateHistory));

        this.updateLink(this.versionCompare(UIL.scriptVersion, this.onSiteVersion));

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
        UIL.addStyle("@namespace url(http://www.w3.org/1999/xhtml); .gbh{display: none !important;} #gm_update_alert {margin: 10px; background-color: #E5ECF9; text-align: center; -moz-border-radius: 5px; position: relative; z-index: 2000; border: 1px solid; } #gm_update_alert a:visited {color: #0000CC !important} #gm_update_alert p {padding: 5px}");
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
        var form = document.getElementById("preferences");
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
        UIL.Config.setNoSitePreview(form.elements.namedItem("noSitePreview").checked);
        UIL.Config.setExtLinkSearch(form.elements.namedItem("extlinksearch").checked);
        UIL.Config.setExtLinkiGoogle(form.elements.namedItem("extlinkigoogle").checked);
        UIL.Config.setSearchLinkTracking(form.elements.namedItem("searchlinktracking").checked);
        UIL.Config.setResHue(form.elements.namedItem("ResHuefield").value);
        UIL.Config.setBGBorder(document.getElementById("BGBorderlink").innerHTML);
        UIL.Config.setImagePreview(form.elements.namedItem("imagepreview").checked);
        UIL.Config.setFavIcon(form.elements.namedItem("favicon").checked);
        UIL.Config.setSearchesRelatedTo(form.elements.namedItem("remsearchesrelatedto").checked);
        UIL.Config.setResultFlow(document.getElementById("flowimg").className);
        this.hide();
        window.location.reload(true);
    },
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
    Base64 : {

        // private property
        _keyStr :
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode : function (input, isBinaryData) {
            var output = [];
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = isBinaryData ? String.fromCharCode.apply(null, input) :
                this._utf8_encode(input);

            var len = input.length;
            while (i < len) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output.push(
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4));
            }

            return output.join("");
        },

        // public method for decoding
        decode : function (input) {
            if(!input)
                return "";
            var output = [];
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            var len = input.length;
            while (i < len) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output.push( String.fromCharCode(chr1));
                if (enc3 != 64) {
                    output.push(String.fromCharCode(chr2));
                }
                if (enc4 != 64) {
                    output.push( String.fromCharCode(chr3));
                }
            }

            return  this._utf8_decode(output.join(""));
        },

        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = [];
            var len = string.length;

            for (var n = 0; n < len; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext.push( String.fromCharCode(c));
                }
                else if((c > 127) & (c < 2048)) {
                    utftext.push(String.fromCharCode((c >> 6) | 192),
                        String.fromCharCode((c & 63) | 128));
                }
                else {
                    utftext.push( String.fromCharCode((c >> 12) | 224),
                        String.fromCharCode(((c >> 6) & 63) | 128),
                        String.fromCharCode((c & 63) | 128));
                }

            }

            return utftext.join("");
        },

        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = [];
            var i = 0;
            var c = c1 = c2 = 0;
            var len = utftext.length;

            while ( i < len ) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string.push(String.fromCharCode(c));
                    i++;
                }
                else if((c > 191) & (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string.push( String.fromCharCode(((c & 15) << 12) |
                        ((c2 & 63) << 6) | (c3 & 63)));
                    i += 3;
                }

            }

            return string.join("");
        }
    }

};

/**
 * Resource section (RES).
 **/
UIL.RES =
    {
    PREFS_HTML : "PHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCi5ib2R5IHsNCgltYXJnaW46MDsNCglwYWRkaW5nOjA7DQoJZm9udC1zaXplOjEycHg7DQoJZm9udC1mYW1pbHk6Ikx1Y2lkYSBHcmFuZGUiLCAiQml0c3RyZWFtIFZlcmEgU2FucyIsIFZlcmRhbmEsIEFyaWFsLCBzYW5zLXNlcmlmOw0KCWNvbG9yOiMzMzM7DQoJd2lkdGg6IDU1MHB4Ow0KCW1hcmdpbjogMCBhdXRvOw0KfQ0KI2NvbG9ycGlja2VyIHsNCglwb3NpdGlvbjogYWJzb2x1dGU7DQoJYm9yZGVyOiAjMDAwMDAwIDFweCBzb2xpZDsNCgliYWNrZ3JvdW5kOiAjRkZGRkZGOw0KCWRpc3BsYXk6IG5vbmU7DQoJei1pbmRleDogMTAwMDI7DQp9DQoubW9kdWxlIHsNCglib3JkZXI6IDFweCBzb2xpZCAjY2NjOw0KCW1hcmdpbi1ib3R0b206IDVweDsNCgliYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOw0KfQ0KLm1vZHVsZSBoMiwgLm1vZHVsZSBjYXB0aW9uIHsNCgltYXJnaW46IDA7DQoJcGFkZGluZzogMnB4IDVweCAzcHggNXB4Ow0KCWZvbnQtc2l6ZTogMTFweDsNCglmb250LXdlaWdodDogYm9sZDsNCgliYWNrZ3JvdW5kOiAjQ0NDQ0NDIHVybCgiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBV0FNUUFBTWpLeXNYSHg5JTJGaDRjJTJGUjBlUGw1Y2JJeU5QVjFjM1B6JTJCZnA2ZDdoNGU3dzhPdnQ3Y3ZOemRmWjJlSGo0OXZkM2ZEeThnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSDVCQUFBQUFBQUxBQUFBQUFCQUJZQUFBVVNJQ1FxQzBJSVQzTUVCY0FNUnZNa2poTUNBRHMlM0QiKSB0b3AgbGVmdCByZXBlYXQteDsNCgljb2xvcjogIzY2NjY2NjsNCglib3JkZXItYm90dG9tOiAwOw0KfQ0KLmZvcm0tcm93IHsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBhZGRpbmc6IDhweCAxMnB4Ow0KCW1hcmdpbi10b3A6M3B4Ow0KCWZvbnQtc2l6ZTogMTFweDsNCglib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsNCglib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWVlOw0KfQ0KLmZvcm0tcm93IGltZywgLmZvcm0tcm93IGlucHV0IHsNCgl2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KCW1hcmdpbi10b3A6IDANCn0NCi5hbGlnbmVkIGxhYmVsIHsNCglwYWRkaW5nOiAwIDFlbSAzcHggMDsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogYXV0bzsNCn0NCi5jaGVja2JveC1yb3cgbGFiZWwgew0KCXBhZGRpbmc6IDA7DQoJZmxvYXQ6IG5vbmU7DQoJd2lkdGg6IGF1dG87DQp9DQouYm9keSBpbnB1dC5idG4gew0KCXBhZGRpbmc6IDBweCAxMHB4IDBweCAxMHB4Ow0KCWNvbG9yOiAjOTk5OTk5Ow0KCWJhY2tncm91bmQtY29sb3I6IFdoaXRlOw0KCWZvbnQtd2VpZ2h0OiBib2xkOw0KCWJvcmRlcjogc29saWQgMXB4ICNDQ0NDQ0M7DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KCWZvbnQtc2l6ZToxMnB4Ow0KfQ0KLmJvZHkgaW5wdXQuYnRuOmhvdmVyIHsNCglwYWRkaW5nOiAxcHggMTFweCAxcHggMTFweDsNCgljb2xvcjogIzMzMzMzMzsNCglib3JkZXItY29sb3I6ICM2NjY2NjY7DQp9DQouYm9keSBhIHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogIzk5OTk5OTsNCgl0ZXh0LWRlY29yYXRpb246IG5vbmU7DQoJY3Vyc29yOiBwb2ludGVyOw0KfQ0KLmJvZHkgYTpob3ZlciB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJY29sb3I6ICMzMzMzMzMgIWltcG9ydGFudDsNCgl0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQouYm9keSBpbWcubDJyIHsNCgliYWNrZ3JvdW5kOnVybCgiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCZ0FBQUFaQ0FNQUFBQWM5UjV2QUFBQUJHZEJUVUVBQUslMkZJTndXSzZRQUFBQmwwUlZoMFUyOW1kSGRoY21VQVFXUnZZbVVnU1cxaFoyVlNaV0ZrZVhISlpUd0FBQUFZVUV4VVJmOTdlJTJGJTJGSnlUVUFBUDg3TzdvQUFQOEFBQUFBQVAlMkYlMkYlMkYlMkJWWUZ1NEFBQUJ5U1VSQlZIamFySkZMRG9Bd0NFVDV0ZDclMkZ4aVo4cklBMkxwd1ZHWGdwVE9GNEVXd2FNNVRLTFNFdTVxaWM0RkhFUWRRR3RUZEFmV3hib2MlMkZYclZBZmczWUhxUyUyRjlEbzZGQ2lGclBoRjVmaEU2ejlTeXVoMlFDSEslMkZwbXVIQVY1eWdpeXNEJTJCa09JNmo1WSUyRjc5NTg4NkJSZ0ElMkY1c04ySDhyOTlRQUFBQUFTVVZPUks1Q1lJSSUzRCIpIG5vLXJlcGVhdCB0cmFuc3BhcmVudDsNCn0NCi5ib2R5IGltZy50MmIgew0KCWJhY2tncm91bmQ6dXJsKCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJnQUFBQVpDQU1BQUFBYzlSNXZBQUFBQkdkQlRVRUFBSyUyRklOd1dLNlFBQUFCbDBSVmgwVTI5bWRIZGhjbVVBUVdSdlltVWdTVzFoWjJWU1pXRmtlWEhKWlR3QUFBQU1VRXhVUmY5JTJGZiUyRjhBQUFBQUFQJTJGJTJGJTJGeUNaRklvQUFBQndTVVJCVkhqYWxOSkxEc0FnQ0FUUUdYdiUyRk96ZmxYOEVtWlVXUUZ4WEZkUWg4TEN5UFY2b0NCVnF1Z2t3aHVRbVEwVSUyRkxSVEFGT1lxbmZ4UlNINFRXdXdCbklYV2dDZSUyRmVoZmJuZmk0a3NIeSUyRkZIR2NTZGpZbW9qTGI4S20yMFFaN3pqZFhaUUhyT0w4NW4lMkIlMkJ6eTNBQUUlMkY2QlNqYUZCYWJBQUFBQUVsRlRrU3VRbUNDIikgbm8tcmVwZWF0IHRyYW5zcGFyZW50Ow0KfQ0KPC9zdHlsZT4NCjxkaXYgY2xhc3M9ImJvZHkiPg0KPGZvcm0gbmFtZT0icHJlZmVyZW5jZXMiIGlkPSJwcmVmZXJlbmNlcyIgY2xhc3M9ImFsaWduZWQiPg0KICA8ZGl2IGNsYXNzPSJtb2R1bGUiIGlkPSJyb290Ij4NCiAgICA8dGFibGUgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj4NCiAgICAgIDx0Ym9keT4NCiAgICAgICAgPHRyPg0KICAgICAgICAgIDx0ZD48aDI+R29vZ2xlTW9ua2V5UiA6OiB2PHNwYW4gaWQ9InZlcnNpb24iPjEuMC4wPC9zcGFuPjwvaDI+PC90ZD4NCiAgICAgICAgICA8dGQgYWxpZ249InJpZ2h0Ij48aDI+PGEgaHJlZj0iaHR0cDovL3d3dy5tb25rZXlyLmNvbS8iIHRhcmdldD0iX3RvcCI+TW9ua2V5Ui5jb208L2E+PC9oMj48L3RkPg0KICAgICAgICA8L3RyPg0KICAgICAgPC90Ym9keT4NCiAgICA8L3RhYmxlPg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI+DQogICAgICA8bGFiZWwgZm9yPSJudW1jb2wxIj4NCiAgICAgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjEiIGlkPSJudW1jb2wxIiB0eXBlPSJyYWRpbyI+DQogICAgICAgIDEgY29sdW1uIDwvbGFiZWw+DQogICAgICAmbmJzcDsmbmJzcDsNCiAgICAgIDxsYWJlbCBmb3I9Im51bWNvbDIiPg0KICAgICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iMiIgaWQ9Im51bWNvbDIiIHR5cGU9InJhZGlvIj4NCiAgICAgICAgMiBjb2x1bW5zPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0ibnVtY29sMyI+DQogICAgICAgIDxpbnB1dCBuYW1lPSJudW1jb2wiIHZhbHVlPSIzIiBpZD0ibnVtY29sMyIgdHlwZT0icmFkaW8iPg0KICAgICAgICAzIGNvbHVtbnM8L2xhYmVsPg0KICAgICAgJm5ic3A7Jm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJudW1jb2w0Ij4NCiAgICAgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjQiIGlkPSJudW1jb2w0IiB0eXBlPSJyYWRpbyI+DQogICAgICAgIDQgY29sdW1uczwvbGFiZWw+DQogICAgICAmbmJzcDsmbmJzcDsoIG9mIHJlc3VsdHMgKSZuYnNwOyZuYnNwOyZuYnNwOzxhIGhyZWY9ImphdmFzY3JpcHQ6OyI+PGltZyBpZD0iZmxvd2ltZyIgbmFtZT0iZmxvd2ltZyIgY2xhc3M9ImwyciIgdGl0bGU9IiBmbG93IG9mIHJlc3VsdHMgIiBib3JkZXI9IjAiIHN0eWxlPSJ3aWR0aDoyNHB4OwloZWlnaHQ6MjVweDsJbWFyZ2luLXRvcDotNHB4OyIgc3JjPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJnQUFBQVpDQU1BQUFBYzlSNXZBQUFBQkdkQlRVRUFBSyUyRklOd1dLNlFBQUFCbDBSVmgwVTI5bWRIZGhjbVVBUVdSdlltVWdTVzFoWjJWU1pXRmtlWEhKWlR3QUFBQUdVRXhVUmYlMkYlMkYlMkZ3QUFBRlhDMDM0QUFBQUJkRkpPVXdCQTV0aG1BQUFBRVVsRVFWUjQybUpnR0FXamdJNEFJTUFBQW5FQUFmV2dhcmtBQUFBQVNVVk9SSzVDWUlJJTNEIj48L2E+PC9kaXY+DQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4gUmVtb3ZlOjxicj48YnI+DQogICAgICA8bGFiZWwgZm9yPSJyZW1zZWFyY2hlc3JlbGF0ZWR0byI+DQogICAgICAgIDxpbnB1dCBuYW1lPSJyZW1zZWFyY2hlc3JlbGF0ZWR0byIgaWQ9InJlbXNlYXJjaGVzcmVsYXRlZHRvIiB0eXBlPSJjaGVja2JveCI+DQogICAgICAgICJSZWxhdGVkIFNlYXJjaGVzIjwvbGFiZWw+DQogICAgICAmbmJzcDsNCiAgICAgIDxsYWJlbCBmb3I9InJlbXNwb25zb3IiPg0KICAgICAgICA8aW5wdXQgbmFtZT0icmVtc3BvbnNvciIgaWQ9InJlbXNwb25zb3IiIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgIlNwb25zb3JlZCBMaW5rcyI8L2xhYmVsPg0KICAgICAgJm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJyZW1zZWFyY2h0b29scyI+DQogICAgICAgIDxpbnB1dCBuYW1lPSJyZW1zZWFyY2h0b29scyIgaWQ9InJlbXNlYXJjaHRvb2xzIiB0eXBlPSJjaGVja2JveCI+DQogICAgICAgICJTZWFyY2ggVG9vbHMiPC9sYWJlbD4NCiAgICAgICZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0ibm9TaXRlUHJldmlldyI+DQogICAgICAgIDxpbnB1dCBuYW1lPSJub1NpdGVQcmV2aWV3IiBpZD0ibm9TaXRlUHJldmlldyIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgICAiU2l0ZSBQcmV2aWV3IjwvbGFiZWw+DQogICAgPC9kaXY+DQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9Im51bXJlc3VsdHMiPg0KICAgICAgICA8aW5wdXQgbmFtZT0ibnVtcmVzdWx0cyIgaWQ9Im51bXJlc3VsdHMiIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgTnVtYmVyIHJlc3VsdHMgKCAxLCAyLCAzLi4uIGV0Yy4gKTwvbGFiZWw+DQogICAgPC9kaXY+DQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImF1dG9sb2FkIj4NCiAgICAgICAgPGlucHV0IG5hbWU9ImF1dG9sb2FkIiBpZD0iYXV0b2xvYWQiIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgQXV0byBsb2FkIG1vcmUgcmVzdWx0czwvbGFiZWw+DQogICAgPC9kaXY+DQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImhpZGVzZWFyY2giPg0KICAgICAgICA8aW5wdXQgbmFtZT0iaGlkZXNlYXJjaCIgaWQ9ImhpZGVzZWFyY2giIHR5cGU9ImNoZWNrYm94Ij4NCiAgICAgICAgRG9uJ3QgZGlzcGxheSB0aGUgR29vZ2xlIHdlYiBzZWFyY2ggZGlhbG9ndWVzICggSSB1c2UgdGhlIEdvb2dsZSB0b29sYmFyIGluc3RlYWQhICk8L2xhYmVsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI+IFNlbGVjdCB0aGUgPGEgaHJlZj0iamF2YXNjcmlwdDo7IiBuYW1lPSJCR0JvcmRlcmxpbmsiIGlkPSJCR0JvcmRlcmxpbmsiIHRpdGxlPSIgdG9nZ2xlIGJldHdlZW4gYSBiYWNrZ3JvdW5kIG9yIGJvcmRlciBodWUgIj5iYWNrZ3JvdW5kPC9hPiBjb2xvciAoIGh1ZSApIGZvciB5b3VyIHNlYXJjaCByZXN1bHRzJm5ic3A7Jm5ic3A7Jm5ic3A7IDxhIGhyZWY9ImphdmFzY3JpcHQ6OyIgaWQ9IlJlc0h1ZSIgc3R5bGU9ImJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTsgZm9udC1mYW1pbHk6IFZlcmRhbmE7IGZvbnQtc2l6ZTogMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9hPg0KICAgICAgPGlucHV0IGlkPSJSZXNIdWVmaWVsZCIgc2l6ZT0iNyIgbWF4bGVuZ3RoPSI3Ij4NCiAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzxhIGhyZWY9Imh0dHA6Ly93d3cuZmxvb2JsZS5jb20vc2NyaXB0cy9jb2xvcnBpY2tlci5waHAiIHRhcmdldD0iX2JsYW5rIiB0aXRsZT0iIGZsb29ibGUgY29sb3IgcGlja2VyIHNjcmlwdCAiIHN0eWxlPSJmb250LXNpemU6IDhweDsiPmZsb29ibGU8L2E+IDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI+IE1ha2UgbXkgR29vZ2xlIGxpbmtzIG9wZW4gaW4gYSBuZXcgdGFyZ2V0ICZuYnNwOw0KICAgICAgPGxhYmVsIGZvcj0iZXh0bGlua3NlYXJjaCI+DQogICAgICAgIDxpbnB1dCBuYW1lPSJleHRsaW5rc2VhcmNoIiBpZD0iZXh0bGlua3NlYXJjaCIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgICBmb3Igc2VhcmNoIHJlc3VsdHM8L2xhYmVsPg0KICAgICAgJm5ic3A7Jm5ic3A7DQogICAgICA8bGFiZWwgZm9yPSJleHRsaW5raWdvb2dsZSI+DQogICAgICAgIDxpbnB1dCBuYW1lPSJleHRsaW5raWdvb2dsZSIgaWQ9ImV4dGxpbmtpZ29vZ2xlIiB0eXBlPSJjaGVja2JveCI+DQogICAgICAgIGZvciBpR29vZ2xlPC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPg0KICAgICAgPGxhYmVsIGZvcj0ic2VhcmNobGlua3RyYWNraW5nIj4NCiAgICAgICAgPGlucHV0IG5hbWU9InNlYXJjaGxpbmt0cmFja2luZyIgaWQ9InNlYXJjaGxpbmt0cmFja2luZyIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgICBEaXNhYmxlIEdvb2dsZSB0cmFja2luZyAgbXkgc2VhcmNoIHJlc3VsdHMgPC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPiBGb3IgZWFjaCByZXN1bHQgc2hvdyAmbmJzcDsNCiAgICAgIDxpbnB1dCBuYW1lPSJmYXZpY29uIiBpZD0iZmF2aWNvbiIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgPGxhYmVsIGZvcj0iZmF2aWNvbiI+IGZhdmljb25zPC9sYWJlbD4NCiAgICAgICZuYnNwOyZuYnNwOw0KICAgICAgPGlucHV0IG5hbWU9ImltYWdlcHJldmlldyIgaWQ9ImltYWdlcHJldmlldyIgdHlwZT0iY2hlY2tib3giPg0KICAgICAgPGxhYmVsIGZvcj0iaW1hZ2VwcmV2aWV3Ij4gR29vZ2xlUHJldmlldyBpbWFnZXM8L2xhYmVsPg0KICAgICAgJm5ic3A7DQogICAgICAmbmJzcDsmbmJzcDs8YSBocmVmPSJodHRwOi8vd3d3Lmdvb2dsZXByZXZpZXcuY29tLyIgdGFyZ2V0PSJfYmxhbmsiIHRpdGxlPSIgR29vZ2xlUHJldmlldyAiIHN0eWxlPSJmb250LXNpemU6IDhweDsiPkdvb2dsZVByZXZpZXc8L2E+IDwvZGl2Pg0KICA8L2Rpdj4NCiAgPGRpdiBjbGFzcz0ibW9kdWxlIj4NCiAgICA8dGFibGUgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj4NCiAgICAgIDx0Ym9keT4NCiAgICAgICAgPHRyIGhlaWdodD0iMzAiPg0KICAgICAgICAgIDx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJtaWRkbGUiPiZuYnNwOyZuYnNwOyZuYnNwOzxhIGhyZWY9IiMiIG5hbWU9ImNoZWNrX3VwZGF0ZSIgaWQ9ImNoZWNrX3VwZGF0ZSI+Y2hlY2tpbmcgZm9yIHVwZGF0ZS4uLjwvYT48L3RkPg0KICAgICAgICAgIDx0ZCBhbGlnbj0iY2VudGVyIiB2YWxpZ249Im1pZGRsZSIgd2lkdGg9IjcyIj48aW5wdXQgdmFsdWU9IkNsb3NlIiBuYW1lPSJjbG9zZV9idXR0b24iIGlkPSJjbG9zZV9idXR0b24iIGNsYXNzPSJidG4iIHR5cGU9ImJ1dHRvbiI+PC90ZD4NCiAgICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRoPSIxNjUiPjxpbnB1dCB2YWx1ZT0iU2F2ZSBQcmVmZXJlbmNlcyIgbmFtZT0ic2F2ZV9idXR0b24iIGlkPSJzYXZlX2J1dHRvbiIgY2xhc3M9ImJ0biIgdHlwZT0iYnV0dG9uIj48L3RkPg0KICAgICAgICA8L3RyPg0KICAgICAgPC90Ym9keT4NCiAgICA8L3RhYmxlPg0KICA8L2Rpdj4NCjwvZm9ybT4NCjwvZGl2Pg==",

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
        "dZoXEqytsbKztLW2t7i5tCEAOw%3D%3D",

// Color Picker Script from Flooble.com
// For more information, visit
//	http://www.flooble.com/scripts/colorpicker.php
// Copyright 2003 Animus Pactum Consulting inc.
// You may use and distribute this code freely, as long as
// you keep this copyright notice and the link to flooble.com
// if you chose to remove them, you must link to the page
// listed above from every web page where you use the color
// picker code.
//---------------------------------------------------------
    colorPicker : {
         perline : 5,
         divSet : false,
         curId : null,
         colorLevels : Array('A', 'B', 'C', 'D', 'E', 'F'),
         colorArray : Array(),

         addColor : function(r, g, b) {
            this.colorArray[this.colorArray.length] = '#' + this.colorLevels[r] + this.colorLevels[r] + this.colorLevels[g] + this.colorLevels[g] + this.colorLevels[b] + this.colorLevels[b];
         },

         setColor : function(color) {
             var that = this;
             return function(){
            var link = document.getElementById(that.curId);
            var field = document.getElementById(that.curId + 'field');
            var picker = document.getElementById('colorpicker');
            field.value = color;
            if (color == '') {
                link.style.background = 'none';
                link.style.color = 'none';
                color = 'none';
            } else {
                link.style.background = color;
                link.style.color = color;
            }
            picker.style.display = 'none';
            eval(document.getElementById(that.curId + 'field').title);
             }.bind(this)
         },

         setDiv : function(id) {
            if (!document.createElement) { return; }
            this.genColors();

            var div = document.buildElement('div',{id:'colorpicker'});
            var spn = document.buildElement('span',{style:"font-family:Verdana; font-size:11px;"});
            var a = document.buildElement('a',{href:"javascript:;"},'No color','click',this.setColor(''));
            spn.appendChild(a);
            spn.appendChild(this.getColorTable());
            div.appendChild(spn);
            document.body.appendChild(div);
            this.divSet = true;
         },

         pickColor : function(id) {
             id = 'ResHue';
            if (!this.divSet) { this.setDiv(id); }
            var picker = document.getElementById('colorpicker');
            if (id == this.curId && picker.style.display == 'block') {
                picker.style.display = 'none';
                return;
            }
            this.curId = id;
            var thelink = document.getElementById(id);
            picker.style.top = (this.getAbsoluteOffsetTop(thelink) + 20) + "px";
            picker.style.left = this.getAbsoluteOffsetLeft(thelink) + "px";
            picker.style.display = 'block';
         },

         genColors : function () {
            for (a = 0; a < this.colorLevels.length-1; a++)
                this.addColor(a,a,5);

            for (a = 0; a < this.colorLevels.length-1; a++)
                this.addColor(a,5,a);

            for (a = 0; a < this.colorLevels.length-1; a++)
                this.addColor(5,a,a);

            for (a = 0; a < this.colorLevels.length-1; a++)
                this.addColor(5,5,a);

            for (a = 0; a < this.colorLevels.length-1; a++)
                this.addColor(a,5,5);

            for (a = 0; a < this.colorLevels.length-1; a++)
                this.addColor(5,a,5);

            this.colorArray[this.colorArray.length] = "#E5ECF9";
            this.colorArray[this.colorArray.length] = "#FAFAE6";

            return this.colorArray;
         },
         getColorTable : function () {
             var colors = this.colorArray;
             var tab = document.buildElement('table',{border:"0", cellspacing:"1", cellpadding:"1"});

             for (var i = 0; i < colors.length; i++) {
                  if (i % this.perline == 0) { var tr = document.buildElement('tr'); tab.appendChild(tr) }
                  var td = document.buildElement('td',{bgcolor:colors[i]});
                  var a = document.buildElement('a',{style:"outline: 1px solid #000000; color:"+colors[i]+"; background: ' + colors[i] + ';font-size: 11px;", title:colors[i],href:"javascript:;"},"&nbsp;&nbsp;&nbsp;&nbsp;",'click',this.setColor(colors[i]));
                  td.appendChild(a);
                  tr.appendChild(td)
             }
             return tab;
         },
         getColorTable2 : function () {
             var colors = this.colorArray;
             var tableCode = '';
             tableCode += '<table border="0" cellspacing="1" cellpadding="1">';
             for (i = 0; i < colors.length; i++) {
                  if (i % this.perline == 0) { tableCode += '<tr>'; }
                  tableCode += '<td bgcolor="#000000"><a style="outline: 1px solid #000000; color: '
                      + colors[i] + '; background: ' + colors[i] + ';font-size: 11px;" title="'
                      + colors[i] + '" href="javascript:setColor(\'' + colors[i] + '\');">&nbsp;&nbsp;&nbsp;&nbsp;</a></td>';
                  if (i % this.perline == this.perline - 1) { tableCode += '</tr>'; }
             }
             if (i % this.perline != 0) { tableCode += '</tr>'; }
             tableCode += '</table>';
             return tableCode;
         },
         relateColor : function (id) {

             return function(e){

             var color = (e.srcElement.value)
            var link = document.getElementById(id);
            if (color == '') {
                link.style.background = 'none';
                link.style.color = 'none';
                color = 'none';
            } else {
                link.style.background = color;
                link.style.color = color;
            }
            eval(document.getElementById(id + 'field').title);
             }.bind(this)
         },
         getAbsoluteOffsetTop : function (obj) {
            var top = obj.offsetTop;
            var parent = obj.offsetParent;
            while (parent != document.body && parent!==null) {
                top += parent.offsetTop;
                parent = parent.offsetParent;
            }
            return top;
         },

         getAbsoluteOffsetLeft : function (obj) {
            var left = obj.offsetLeft;
            var parent = obj.offsetParent;
            while (parent != document.body && parent!==null) {
                left += parent.offsetLeft;
                parent = parent.offsetParent;
            }
            return left;
         }
    },
    bgBordertog : function () {
        var e = document.getElementById('BGBorderlink');
        e.innerHTML = (e.innerHTML=='background') ? 'border' : 'background';
    },
    flowtog : function () {
        var e = document.getElementById('flowimg');
        e.className = (e.className=='l2r') ? 't2b' : 'l2r';
    }

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

if (typeof GM_getValue === "undefined"){
    if(typeof window.localStorage == "object") {
        function GM_getValue ( key, defaultValue ) {
            var value = window.localStorage.getItem(key);
            if( value == null ) value = defaultValue;
            else if(value=='true') value = true;
            else if(value=='false') value = false;
            return value;
        }
    }
    else{
        function GM_getValue( cookieName, oDefault ) {
            var cookieJar = document.cookie.split( "; " );
            for( var x = 0; x < cookieJar.length; x++ ) {
                var oneCookie = cookieJar[x].split( "=" );
                if( oneCookie[0] == escape( cookieName ) ) {
                    try {
                        eval('var footm = '+unescape( oneCookie[1] ));
                    } catch(e) { return oDefault; }
                    return footm;
                }
            }
            return oDefault;
        }
    }
}

if (typeof GM_setValue === "undefined") {
    if(typeof window.localStorage == "object") {
        function GM_setValue( key, value ) {
            window.localStorage.setItem( key, value );
        }
    }
    else{
        function getRecoverableString(oVar,notFirst) {
            var oType = typeof(oVar);
            if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
                //most browsers say that the typeof for null is 'object', but unlike a real
                //object, it will not have any overall value
                return 'null';
            }
            if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
            if( oType == 'object' ) {
                //Safari throws errors when comparing non-objects with window/document/etc
                if( oVar == window ) { return 'window'; }
                if( oVar == document ) { return 'document'; }
                if( oVar == document.body ) { return 'document.body'; }
                if( oVar == document.documentElement ) { return 'document.documentElement'; }
            }
            if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
            if( !notFirst ) {
                Object.prototype.toRecoverableString = function (oBn) {
                    if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
                    this.tempLockIgnoreMe = true;
                    var retVal = '{', sepChar = '', j;
                    for( var i in this ) {
                        if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
                        if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
                        j = this[i];
                        if( !i.match(basicObPropNameValStr) ) {
                            //for some reason, you cannot use unescape when defining peoperty names inline
                            for( var x = 0; x < cleanStrFromAr.length; x++ ) {
                                i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
                            }
                            i = '\''+i+'\'';
                        } else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
                            //IE mac does not allow numerical property names to be used unless they are quoted
                            i = '\''+i+'\'';
                        }
                        retVal += sepChar+i+':'+getRecoverableString(j,true);
                        sepChar = ',';
                    }
                    retVal += '}';
                    this.tempLockIgnoreMe = false;
                    return retVal;
                };
                Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
                Array.prototype.toRecoverableString = function () {
                    if( this.tempLock ) { return '[\'LoopBack\']'; }
                    if( !this.length ) {
                        var oCountProp = 0;
                        for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
                        if( oCountProp ) { return this.toRecoverableObString(true); }
                    }
                    this.tempLock = true;
                    var retVal = '[';
                    for( var i = 0; i < this.length; i++ ) {
                        retVal += (i?',':'')+getRecoverableString(this[i],true);
                    }
                    retVal += ']';
                    delete this.tempLock;
                    return retVal;
                };
                Boolean.prototype.toRecoverableString = function () {
                    return ''+this+'';
                };
                Date.prototype.toRecoverableString = function () {
                    return 'new Date('+this.getTime()+')';
                };
                Function.prototype.toRecoverableString = function () {
                    return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
                };
                Number.prototype.toRecoverableString = function () {
                    if( isNaN(this) ) { return 'Number.NaN'; }
                    if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
                    if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
                    return ''+this+'';
                };
                RegExp.prototype.toRecoverableString = function () {
                    return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
                };
                String.prototype.toRecoverableString = function () {
                    var oTmp = escape(this);
                    if( oTmp == this ) { return '\''+this+'\''; }
                    return 'unescape(\''+oTmp+'\')';
                };
            }
            if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
            var oTmp = oVar.toRecoverableString();
            if( !notFirst ) {
                //prevent it from changing for...in loops that the page may be using
                delete Object.prototype.toRecoverableString;
                delete Array.prototype.toRecoverableObString;
                delete Array.prototype.toRecoverableString;
                delete Boolean.prototype.toRecoverableString;
                delete Date.prototype.toRecoverableString;
                delete Function.prototype.toRecoverableString;
                delete Number.prototype.toRecoverableString;
                delete RegExp.prototype.toRecoverableString;
                delete String.prototype.toRecoverableString;
            }
            return oTmp;
        }

        function GM_setValue( cookieName, cookieValue, lifeTime ) {
            if( !cookieName ) { return; }
            if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
            document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
                ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
        }
    }
}
if (typeof GM_xmlhttpRequest === "undefined") {
    function GM_xmlhttpRequest(details) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            var responseState = {
                responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
                responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
                readyState:xmlhttp.readyState,
                responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
                status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
                statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
            }
            if (details["onreadystatechange"]) {
                details["onreadystatechange"](responseState);
            }
            if (xmlhttp.readyState==4) {
                if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                    details["onload"](responseState);
                }
                if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                    details["onerror"](responseState);
                }
            }
        }
        try {
          //cannot do cross domain
          xmlhttp.open(details.method, details.url);
    //      alert(details.method +':'+ details.url)
        } catch(e) {
          if( details["onerror"] ) {
            //simulate a real error
            details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
          }
          return;
        }
        if (details.headers) {
            for (var prop in details.headers) {
                xmlhttp.setRequestHeader(prop, details.headers[prop]);
            }
        }
        xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
    }
}

// Browser detect
// http://www.quirksmode.org/js/detect.html
// A useful but often overrated JavaScript function is the browser detect.
// Sometimes you want to give specific instructions or load a new page in case the viewer uses, for instance, Safari.
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.csQuery = this.searchCSQuery(this.dataBrowser) || false;
		return (this.browser != "An unknown browser");
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchCSQuery: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].csQuery;
			}
			else if (dataProp)
				return data[i].csQuery;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome",
			csQuery: false
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb",
			csQuery: false
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version",
			csQuery: false
		},
		{
			prop: window.opera,
			identity: "Opera",
			csQuery: false
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab",
			csQuery: false
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror",
			csQuery: false
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox",
			csQuery: true
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino",
			csQuery: false
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape",
			csQuery: false
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE",
			csQuery: false
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv",
			csQuery: false
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla",
			csQuery: false
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
/* Run the browser detect script */
BrowserDetect.init();
/* Run the update check */
UIL.UI.updateCheckRequest();
/* Run the script */
UIL.init();
})();