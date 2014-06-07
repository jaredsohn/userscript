// ==UserScript==
// @author         weiwsy（基于mungushume的googleMonkeyR改进）
// @version        2.0
// @name           GoogleMonkeyW
// @namespace      http://userscripts.org/scripts/show/154983
// @description    改善谷歌的搜索结果界面，提高阅读效率。（基于mungushume的googleMonkeyR改进）Google - Multiple columns of results, Remove "Sponsored Links", Number results, Auto-load more results, Remove web search dialogues, Open external links in a new tab, self updating and all configurable from a simple user dialogue.
// @include        http://www.google.*/webhp?*
// @include        http://www.google.*/search?*
// @include        http://www.google.*/ig?*
// @include        http://www.google.*/
// @include        http://www.google.*/#*
// @include        https://www.google.*/webhp?*
// @include        https://www.google.*/search?*
// @include        https://www.google.*/ig?*
// @include        https://www.google.*/
// @include        https://www.google.*/#*
// @include        https://encrypted.google.*/webhp?*
// @include        https://encrypted.google.*/search?*
// @include        https://encrypted.google.*/ig?*
// @include        https://encrypted.google.*/
// @include        https://encrypted.google.*/#*
// @updateURL			https://userscripts.org/scripts/source/154983.meta.js
// @downloadURL		https://userscripts.org/scripts/source/154983.user.js
/* StartHistory

v2.0 -2012-12-26
 - 修复: 修复 google改版后，搜索工具栏 改到 上边，而页面搜索结果都固定在左边空出一片空白（138px)
 现在原来的去除搜索工具的 选项仍做为新搜索工具的去除选项
 增加一个新去除选项："Left Space"，选中可以去除左边固定的空白。

v1.5.4 - 6 Dec 2011
 - Bug fix: GoogleMonkeyR preferences link moved after googles update to the
 menu bar. Thanks for the info on how to get it digideth!

 Since this Google update i'm unsure what to do about removal of search boxes
 etc. I could start moving elements around on the page but through experience
 i'm sure this will end up breaking the script more often. Not good!
 beta versions (with elements moved around for new toolbar ONLY) can be found
 here http://google.monkeyr.com/ff/history.php


EndHistory */
// ==/UserScript==



/**
 * Processing of the current page.
 **/
(function(){
var UIL =
    {
    scriptName : "GoogleMonkeyW",
    scriptVersion : "2.0",
    scriptId : "154983",

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
        this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #cnt #center_col, #cnt #foot, .mw {width:auto !important; max-width:100% !important;} #rhs {left:auto; !important}#botstuff .sp_cnt,#botstuff .ssp{display:none} .s{max-width:98%!important;} .vshid{display:inline} #res h3.r {white-space:normal}");
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
			//this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #leftnav {display:none}, #center_col {margin-left:0 !important}");
			this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); #top_nav {display:none}");
		}

		if(UIL.Config.getRemLeftSpace())
		{
			this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); .mw #center_col {margin-left:0 !important}");
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

            this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); li.g, div.g { margin-top: 0.15em !important; margin-right: 0.25em !important; margin-bottom: 0.15em !important; margin-left: 0.25em; -moz-border-radius: 10px; border-radius: 10px; " + BGBorder + " "+ hue +" ! important; padding: 0.5em ! important; } li.g {list-style-image:none;list-style-position:outside;list-style-type:none;"+imagePreview+"};");
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
        var controls = document.getElementByXPath("//div[@id='ab_options']/ul/li[3]");
        var link = document.getElementById('GoogleMonkeyRLink');
        if (controls && !link)
        {

            var parent = controls.parentNode;
			var li = document.buildElement('li',{'class':'ab_dropdownitem'});
            link = document.buildElement('a',{href:'#',id:'GoogleMonkeyRLink','class':'ab_dropdownlnk'},'GoogleMonkeyW settings','click',UIL.UI.preferencesShow.bind(UIL.UI));
			li.appendChild(link);
            parent.insertBefore(li, controls);
        }
        var controls = document.getElementByXPath("//div[@id='gbd5']//ol[@class='gbmcc']/li[3]");
        var link = document.getElementById('GoogleMonkeyRLink');
        if (controls && !link)
        {
			console.log(controls)
            var parent = controls.parentNode;
			//<li class="gbt gbtb"><a class="gbgt" id="gbg4" href="//google.com/profiles" aria-haspopup="true" aria-owns="gbd4"><span class="gbtb2"><span id="gbgs4" class="gbts"><span id="gbi4"><span id="gbi4m1">GoogleMonkeyW</span></span></span></span></a></li>
			var li = document.buildElement('li',{'class':'gbkp gbmtc'});
            link = document.buildElement('a',{href:'#',id:'GoogleMonkeyRLink','class':'gbmt'},'GoogleMonkeyW settings','click',UIL.UI.preferencesShow.bind(UIL.UI));
			li.appendChild(link);
            parent.insertBefore(li, controls);
        }
        if(typeof GM_registerMenuCommand !== "undefined"){
            GM_registerMenuCommand("GoogleMonkeyW Preferences", UIL.UI.preferencesShow.bind(UIL.UI));
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

    getRemLeftSpace : function()
    {
        return this._getBooleanConfig("remLeftSpace", false);
    },

    setRemLeftSpace : function(remLeftSpace)
    {
        GM_setValue("remLeftSpace", remLeftSpace);
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

        form.elements.namedItem("remleftspace").checked = UIL.Config.getRemLeftSpace();

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
            link.setAttribute("title", " see what's new with GoogleMonkeyW... ");
            link.style.textDecoration = "blink";
            link.innerHTML = "v"+this.onSiteVersion+" available";
        }
        else
        {
            if(BrowserDetect.csQuery)
            {
                link.setAttribute("href", "#");
                link.setAttribute("title", " the history of GoogleMonkeyW ");
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

            //var link3 = document.buildElement('a',{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mungushume@hotmail.com&item_name=GreaseMonkey%20programming/beer%20fund&no_shipping=0&no_note=1&tax=0&currency_code=GBP&lc=GB&bn=PP-DonationsBF&charset=UTF-8",
            //    target:'_parent',title:' Now, no donate, free used! '},'donate');
						//
            //link.parentNode.appendChild(link3);
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

        UIL.Config.setRemLeftSpace(form.elements.namedItem("remleftspace").checked);

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
    PREFS_HTML : "PHN0eWxlIHR5cGU9InRleHQvY3NzIj4KLmJvZHkgewoJbWFyZ2luOjA7CglwYWRkaW5nOjA7Cglmb250LXNpemU6MTJweDsKCWZvbnQtZmFtaWx5OiJMdWNpZGEgR3JhbmRlIiwgIkJpdHN0cmVhbSBWZXJhIFNhbnMiLCBWZXJkYW5hLCBBcmlhbCwgc2Fucy1zZXJpZjsKCWNvbG9yOiMzMzM7Cgl3aWR0aDogNTUwcHg7CgltYXJnaW46IDAgYXV0bzsKfQojY29sb3JwaWNrZXIgewoJcG9zaXRpb246IGFic29sdXRlOwoJYm9yZGVyOiAjMDAwMDAwIDFweCBzb2xpZDsKCWJhY2tncm91bmQ6ICNGRkZGRkY7CglkaXNwbGF5OiBub25lOwoJei1pbmRleDogMTAwMDI7Cn0KLm1vZHVsZSB7Cglib3JkZXI6IDFweCBzb2xpZCAjY2NjOwoJbWFyZ2luLWJvdHRvbTogNXB4OwoJYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsKfQoubW9kdWxlIGgyLCAubW9kdWxlIGNhcHRpb24gewoJbWFyZ2luOiAwOwoJcGFkZGluZzogMnB4IDVweCAzcHggNXB4OwoJZm9udC1zaXplOiAxMXB4OwoJZm9udC13ZWlnaHQ6IGJvbGQ7CgliYWNrZ3JvdW5kOiAjQ0NDQ0NDIHVybCgiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBV0FNUUFBTWpLeXNYSHg5JTJGaDRjJTJGUjBlUGw1Y2JJeU5QVjFjM1B6JTJCZnA2ZDdoNGU3dzhPdnQ3Y3ZOemRmWjJlSGo0OXZkM2ZEeThnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSDVCQUFBQUFBQUxBQUFBQUFCQUJZQUFBVVNJQ1FxQzBJSVQzTUVCY0FNUnZNa2poTUNBRHMlM0QiKSB0b3AgbGVmdCByZXBlYXQteDsKCWNvbG9yOiAjNjY2NjY2OwoJYm9yZGVyLWJvdHRvbTogMDsKfQouZm9ybS1yb3cgewoJb3ZlcmZsb3c6IGhpZGRlbjsKCXBhZGRpbmc6IDhweCAxMnB4OwoJbWFyZ2luLXRvcDozcHg7Cglmb250LXNpemU6IDExcHg7Cglib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsKCWJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlZWU7Cn0KLmZvcm0tcm93IGltZywgLmZvcm0tcm93IGlucHV0IHsKCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7CgltYXJnaW4tdG9wOiAwCn0KLmFsaWduZWQgbGFiZWwgewoJcGFkZGluZzogMCAxZW0gM3B4IDA7CglmbG9hdDogbGVmdDsKCXdpZHRoOiBhdXRvOwp9Ci5jaGVja2JveC1yb3cgbGFiZWwgewoJcGFkZGluZzogMDsKCWZsb2F0OiBub25lOwoJd2lkdGg6IGF1dG87Cn0KLmJvZHkgaW5wdXQuYnRuIHsKCXBhZGRpbmc6IDBweCAxMHB4IDBweCAxMHB4OwoJY29sb3I6ICM5OTk5OTk7CgliYWNrZ3JvdW5kLWNvbG9yOiBXaGl0ZTsKCWZvbnQtd2VpZ2h0OiBib2xkOwoJYm9yZGVyOiBzb2xpZCAxcHggI0NDQ0NDQzsKCXRleHQtYWxpZ246IGNlbnRlcjsKCWZvbnQtc2l6ZToxMnB4Owp9Ci5ib2R5IGlucHV0LmJ0bjpob3ZlciB7CglwYWRkaW5nOiAxcHggMTFweCAxcHggMTFweDsKCWNvbG9yOiAjMzMzMzMzOwoJYm9yZGVyLWNvbG9yOiAjNjY2NjY2Owp9Ci5ib2R5IGEgewoJZm9udC13ZWlnaHQ6IGJvbGQ7Cgljb2xvcjogIzk5OTk5OTsKCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCWN1cnNvcjogcG9pbnRlcjsKfQouYm9keSBhOmhvdmVyIHsKCWZvbnQtd2VpZ2h0OiBib2xkOwoJY29sb3I6ICMzMzMzMzMgIWltcG9ydGFudDsKCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKfQouYm9keSBpbWcubDJyIHsKCWJhY2tncm91bmQ6dXJsKCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJnQUFBQVpDQU1BQUFBYzlSNXZBQUFBQkdkQlRVRUFBSyUyRklOd1dLNlFBQUFCbDBSVmgwVTI5bWRIZGhjbVVBUVdSdlltVWdTVzFoWjJWU1pXRmtlWEhKWlR3QUFBQVlVRXhVUmY5N2UlMkYlMkZKeVRVQUFQODdPN29BQVA4QUFBQUFBUCUyRiUyRiUyRiUyQlZZRnU0QUFBQnlTVVJCVkhqYXJKRkxEb0F3Q0VUNXRkNyUyRnhpWjhySUEyTHB3VkdYZ3BUT0Y0RVd3YU01VEtMU0V1NXFpYzRGSEVRZFFHdFRkQWZXeGJvYyUyRlhyVkFmZzNZSHFTJTJGOURvNkZDaUZyUGhGNWZoRTZ6OVN5dWgyUUNISyUyRnBtdUhBVjV5Z2l5c0QlMkJrT0k2ajVZJTJGNzk1ODg2QlJnQSUyRjVzTjJIOHI5OVFBQUFBQVNVVk9SSzVDWUlJJTNEIikgbm8tcmVwZWF0IHRyYW5zcGFyZW50Owp9Ci5ib2R5IGltZy50MmIgewoJYmFja2dyb3VuZDp1cmwoImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQmdBQUFBWkNBTUFBQUFjOVI1dkFBQUFCR2RCVFVFQUFLJTJGSU53V0s2UUFBQUJsMFJWaDBVMjltZEhkaGNtVUFRV1J2WW1VZ1NXMWhaMlZTWldGa2VYSEpaVHdBQUFBTVVFeFVSZjklMkZmJTJGOEFBQUFBQVAlMkYlMkYlMkZ5Q1pGSW9BQUFCd1NVUkJWSGphbE5KTERzQWdDQVRRR1h2JTJGT3pmbFg4RW1aVVdRRnhYRmRRaDhMQ3lQVjZvQ0JWcXVna3dodVFtUTBVJTJGTFJUQUZPWXFuZnhSU0g0VFd1d0JuSVhXZ0NlJTJGZWhmYm5maTRrc0h5JTJGRkhHY1Nkalltb2pMYjhLbTIwUVo3empkWFpRSHJPTDg1biUyQiUyQnp5M0FBRSUyRjZCU2phRkJhYkFBQUFBRWxGVGtTdVFtQ0MiKSBuby1yZXBlYXQgdHJhbnNwYXJlbnQ7Cn0KPC9zdHlsZT4KPGRpdiBjbGFzcz0iYm9keSI+Cjxmb3JtIG5hbWU9InByZWZlcmVuY2VzIiBpZD0icHJlZmVyZW5jZXMiIGNsYXNzPSJhbGlnbmVkIj4KICA8ZGl2IGNsYXNzPSJtb2R1bGUiIGlkPSJyb290Ij4KICAgIDx0YWJsZSBib3JkZXI9IjAiIGNlbGxwYWRkaW5nPSIwIiBjZWxsc3BhY2luZz0iMCIgd2lkdGg9IjEwMCUiPgogICAgICA8dGJvZHk+CiAgICAgICAgPHRyPgogICAgICAgICAgPHRkPjxoMj5Hb29nbGVNb25rZXlXIDo6IHY8c3BhbiBpZD0idmVyc2lvbiI+MS4wLjA8L3NwYW4+PC9oMj48L3RkPgogICAgICAgICAgPHRkIGFsaWduPSJyaWdodCI+PGgyPjxhIGhyZWY9Imh0dHA6Ly91c2Vyc2NyaXB0cy5vcmcvc2NyaXB0cy9zaG93LzE1NDk4MyIgdGFyZ2V0PSJfdG9wIj53ZWl3c3kuR29vZ2xlTW9ua2V5VzwvYT48L2gyPjwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgPC90Ym9keT4KICAgIDwvdGFibGU+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPgogICAgICA8bGFiZWwgZm9yPSJudW1jb2wxIj4KICAgICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iMSIgaWQ9Im51bWNvbDEiIHR5cGU9InJhZGlvIj4KICAgICAgICAxIGNvbHVtbiA8L2xhYmVsPgogICAgICAmbmJzcDsmbmJzcDsKICAgICAgPGxhYmVsIGZvcj0ibnVtY29sMiI+CiAgICAgICAgPGlucHV0IG5hbWU9Im51bWNvbCIgdmFsdWU9IjIiIGlkPSJudW1jb2wyIiB0eXBlPSJyYWRpbyI+CiAgICAgICAgMiBjb2x1bW5zPC9sYWJlbD4KICAgICAgJm5ic3A7Jm5ic3A7CiAgICAgIDxsYWJlbCBmb3I9Im51bWNvbDMiPgogICAgICAgIDxpbnB1dCBuYW1lPSJudW1jb2wiIHZhbHVlPSIzIiBpZD0ibnVtY29sMyIgdHlwZT0icmFkaW8iPgogICAgICAgIDMgY29sdW1uczwvbGFiZWw+CiAgICAgICZuYnNwOyZuYnNwOwogICAgICA8bGFiZWwgZm9yPSJudW1jb2w0Ij4KICAgICAgICA8aW5wdXQgbmFtZT0ibnVtY29sIiB2YWx1ZT0iNCIgaWQ9Im51bWNvbDQiIHR5cGU9InJhZGlvIj4KICAgICAgICA0IGNvbHVtbnM8L2xhYmVsPgogICAgICAmbmJzcDsmbmJzcDsoIG9mIHJlc3VsdHMgKSZuYnNwOyZuYnNwOyZuYnNwOzxhIGhyZWY9ImphdmFzY3JpcHQ6OyI+PGltZyBpZD0iZmxvd2ltZyIgbmFtZT0iZmxvd2ltZyIgY2xhc3M9ImwyciIgdGl0bGU9IiBmbG93IG9mIHJlc3VsdHMgIiBib3JkZXI9IjAiIHN0eWxlPSJ3aWR0aDoyNHB4OwloZWlnaHQ6MjVweDsJbWFyZ2luLXRvcDotNHB4OyIgc3JjPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJnQUFBQVpDQU1BQUFBYzlSNXZBQUFBQkdkQlRVRUFBSyUyRklOd1dLNlFBQUFCbDBSVmgwVTI5bWRIZGhjbVVBUVdSdlltVWdTVzFoWjJWU1pXRmtlWEhKWlR3QUFBQUdVRXhVUmYlMkYlMkYlMkZ3QUFBRlhDMDM0QUFBQUJkRkpPVXdCQTV0aG1BQUFBRVVsRVFWUjQybUpnR0FXamdJNEFJTUFBQW5FQUFmV2dhcmtBQUFBQVNVVk9SSzVDWUlJJTNEIj48L2E+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPiBSZW1vdmU6PGJyPjxicj4KICAgICAgPGxhYmVsIGZvcj0icmVtc2VhcmNoZXNyZWxhdGVkdG8iPgogICAgICAgIDxpbnB1dCBuYW1lPSJyZW1zZWFyY2hlc3JlbGF0ZWR0byIgaWQ9InJlbXNlYXJjaGVzcmVsYXRlZHRvIiB0eXBlPSJjaGVja2JveCI+CiAgICAgICAgIlJlbGF0ZWQgU2VhcmNoZXMiPC9sYWJlbD4KICAgICAgJm5ic3A7CiAgICAgIDxsYWJlbCBmb3I9InJlbXNwb25zb3IiPgogICAgICAgIDxpbnB1dCBuYW1lPSJyZW1zcG9uc29yIiBpZD0icmVtc3BvbnNvciIgdHlwZT0iY2hlY2tib3giPgogICAgICAgICJTcG9uc29yZWQgTGlua3MiPC9sYWJlbD4KICAgICAgJm5ic3A7CiAgICAgIDxsYWJlbCBmb3I9InJlbXNlYXJjaHRvb2xzIj4KICAgICAgICA8aW5wdXQgbmFtZT0icmVtc2VhcmNodG9vbHMiIGlkPSJyZW1zZWFyY2h0b29scyIgdHlwZT0iY2hlY2tib3giPgogICAgICAgICJTZWFyY2ggVG9vbHMiPC9sYWJlbD4KICAgICAgJm5ic3A7CiAgICAgIDxsYWJlbCBmb3I9InJlbWxlZnRzcGFjZSIgc3R5bGU9ImNvbG9yOnJlZDsiPgogICAgICAgIDxpbnB1dCBuYW1lPSJyZW1sZWZ0c3BhY2UiIGlkPSJyZW1sZWZ0c3BhY2UiIHR5cGU9ImNoZWNrYm94Ij4KICAgICAgICAiTGVmdCBTcGFjZSI8L2xhYmVsPgogICAgICAmbmJzcDsKICAgICAgPGxhYmVsIGZvcj0ibm9TaXRlUHJldmlldyI+CiAgICAgICAgPGlucHV0IG5hbWU9Im5vU2l0ZVByZXZpZXciIGlkPSJub1NpdGVQcmV2aWV3IiB0eXBlPSJjaGVja2JveCI+CiAgICAgICAgIlNpdGUgUHJldmlldyI8L2xhYmVsPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPgogICAgICA8bGFiZWwgZm9yPSJudW1yZXN1bHRzIj4KICAgICAgICA8aW5wdXQgbmFtZT0ibnVtcmVzdWx0cyIgaWQ9Im51bXJlc3VsdHMiIHR5cGU9ImNoZWNrYm94Ij4KICAgICAgICBOdW1iZXIgcmVzdWx0cyAoIDEsIDIsIDMuLi4gZXRjLiApPC9sYWJlbD4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4KICAgICAgPGxhYmVsIGZvcj0iYXV0b2xvYWQiPgogICAgICAgIDxpbnB1dCBuYW1lPSJhdXRvbG9hZCIgaWQ9ImF1dG9sb2FkIiB0eXBlPSJjaGVja2JveCI+CiAgICAgICAgQXV0byBsb2FkIG1vcmUgcmVzdWx0czwvbGFiZWw+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI+CiAgICAgIDxsYWJlbCBmb3I9ImhpZGVzZWFyY2giPgogICAgICAgIDxpbnB1dCBuYW1lPSJoaWRlc2VhcmNoIiBpZD0iaGlkZXNlYXJjaCIgdHlwZT0iY2hlY2tib3giPgogICAgICAgIERvbid0IGRpc3BsYXkgdGhlIEdvb2dsZSB3ZWIgc2VhcmNoIGRpYWxvZ3VlcyAoIEkgdXNlIHRoZSBHb29nbGUgdG9vbGJhciBpbnN0ZWFkISApPC9sYWJlbD4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4gU2VsZWN0IHRoZSA8YSBocmVmPSJqYXZhc2NyaXB0OjsiIG5hbWU9IkJHQm9yZGVybGluayIgaWQ9IkJHQm9yZGVybGluayIgdGl0bGU9IiB0b2dnbGUgYmV0d2VlbiBhIGJhY2tncm91bmQgb3IgYm9yZGVyIGh1ZSAiPmJhY2tncm91bmQ8L2E+IGNvbG9yICggaHVlICkgZm9yIHlvdXIgc2VhcmNoIHJlc3VsdHMmbmJzcDsmbmJzcDsmbmJzcDsgPGEgaHJlZj0iamF2YXNjcmlwdDo7IiBpZD0iUmVzSHVlIiBzdHlsZT0iYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApOyBmb250LWZhbWlseTogVmVyZGFuYTsgZm9udC1zaXplOiAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7Ij4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L2E+CiAgICAgIDxpbnB1dCBpZD0iUmVzSHVlZmllbGQiIHNpemU9IjciIG1heGxlbmd0aD0iNyI+CiAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzxhIGhyZWY9Imh0dHA6Ly93d3cuZmxvb2JsZS5jb20vc2NyaXB0cy9jb2xvcnBpY2tlci5waHAiIHRhcmdldD0iX2JsYW5rIiB0aXRsZT0iIGZsb29ibGUgY29sb3IgcGlja2VyIHNjcmlwdCAiIHN0eWxlPSJmb250LXNpemU6IDhweDsiPmZsb29ibGU8L2E+IDwvZGl2PgogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4gTWFrZSBteSBHb29nbGUgbGlua3Mgb3BlbiBpbiBhIG5ldyB0YXJnZXQgJm5ic3A7CiAgICAgIDxsYWJlbCBmb3I9ImV4dGxpbmtzZWFyY2giPgogICAgICAgIDxpbnB1dCBuYW1lPSJleHRsaW5rc2VhcmNoIiBpZD0iZXh0bGlua3NlYXJjaCIgdHlwZT0iY2hlY2tib3giPgogICAgICAgIGZvciBzZWFyY2ggcmVzdWx0czwvbGFiZWw+CiAgICAgICZuYnNwOyZuYnNwOwogICAgICA8bGFiZWwgZm9yPSJleHRsaW5raWdvb2dsZSI+CiAgICAgICAgPGlucHV0IG5hbWU9ImV4dGxpbmtpZ29vZ2xlIiBpZD0iZXh0bGlua2lnb29nbGUiIHR5cGU9ImNoZWNrYm94Ij4KICAgICAgICBmb3IgaUdvb2dsZTwvbGFiZWw+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI+CiAgICAgIDxsYWJlbCBmb3I9InNlYXJjaGxpbmt0cmFja2luZyI+CiAgICAgICAgPGlucHV0IG5hbWU9InNlYXJjaGxpbmt0cmFja2luZyIgaWQ9InNlYXJjaGxpbmt0cmFja2luZyIgdHlwZT0iY2hlY2tib3giPgogICAgICAgIERpc2FibGUgR29vZ2xlIHRyYWNraW5nICBteSBzZWFyY2ggcmVzdWx0cyA8L2xhYmVsPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLXJvdyBjaGVja2JveC1yb3ciPiBGb3IgZWFjaCByZXN1bHQgc2hvdyAmbmJzcDsKICAgICAgPGlucHV0IG5hbWU9ImZhdmljb24iIGlkPSJmYXZpY29uIiB0eXBlPSJjaGVja2JveCI+CiAgICAgIDxsYWJlbCBmb3I9ImZhdmljb24iPiBmYXZpY29uczwvbGFiZWw+CiAgICAgICZuYnNwOyZuYnNwOwogICAgICA8aW5wdXQgbmFtZT0iaW1hZ2VwcmV2aWV3IiBpZD0iaW1hZ2VwcmV2aWV3IiB0eXBlPSJjaGVja2JveCI+CiAgICAgIDxsYWJlbCBmb3I9ImltYWdlcHJldmlldyI+IEdvb2dsZVByZXZpZXcgaW1hZ2VzPC9sYWJlbD4KICAgICAgJm5ic3A7CiAgICAgICZuYnNwOyZuYnNwOzxhIGhyZWY9Imh0dHA6Ly93d3cuZ29vZ2xlcHJldmlldy5jb20vIiB0YXJnZXQ9Il9ibGFuayIgdGl0bGU9IiBHb29nbGVQcmV2aWV3ICIgc3R5bGU9ImZvbnQtc2l6ZTogOHB4OyI+R29vZ2xlUHJldmlldzwvYT4gPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0ibW9kdWxlIj4KICAgIDx0YWJsZSBib3JkZXI9IjAiIGNlbGxwYWRkaW5nPSIwIiBjZWxsc3BhY2luZz0iMCIgd2lkdGg9IjEwMCUiPgogICAgICA8dGJvZHk+CiAgICAgICAgPHRyIGhlaWdodD0iMzAiPgogICAgICAgICAgPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249Im1pZGRsZSI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PGEgaHJlZj0iIyIgbmFtZT0iY2hlY2tfdXBkYXRlIiBpZD0iY2hlY2tfdXBkYXRlIj5jaGVja2luZyBmb3IgdXBkYXRlLi4uPC9hPjwvdGQ+CiAgICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRoPSI3MiI+PGlucHV0IHZhbHVlPSJDbG9zZSIgbmFtZT0iY2xvc2VfYnV0dG9uIiBpZD0iY2xvc2VfYnV0dG9uIiBjbGFzcz0iYnRuIiB0eXBlPSJidXR0b24iPjwvdGQ+CiAgICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRoPSIxNjUiPjxpbnB1dCB2YWx1ZT0iU2F2ZSBQcmVmZXJlbmNlcyIgbmFtZT0ic2F2ZV9idXR0b24iIGlkPSJzYXZlX2J1dHRvbiIgY2xhc3M9ImJ0biIgdHlwZT0iYnV0dG9uIj48L3RkPgogICAgICAgIDwvdHI+CiAgICAgIDwvdGJvZHk+CiAgICA8L3RhYmxlPgogIDwvZGl2Pgo8L2Zvcm0+CjwvZGl2Pg==",


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