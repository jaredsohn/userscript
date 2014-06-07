// ==UserScript==
// @name		HKGolden#
// @namespace	mt@live.hk
// @description	Enhance HKGolden Forum
// @include		http://forum*.hkgolden.com/view.aspx?*
// @include		http://forum*.hkgolden.com/topics.aspx?*
// @include		http://forum*.hkgolden.com/search.aspx?*
// ==/UserScript==

// Author:		FatTunG
// Contact:		mt@live.hk
// Version:		0.70
// Date:		2009-06-29

/**
 * === Version History === 
 * Version 0.70 (2009-06-29)
 * Fix: Layout problem
 * Fix: Load More Topic not working
 * Fix: Open In New Tab not working
 * Add: Display Forum Selector option
 * 
 * Version 0.69 (2009-06-25)
 * Fix: Layout problem
 * Fix: Topic Face Converter not working
 * 
 * Version 0.68 (2009-05-21)
 * Fix: Topic page problem (No next page table)
 * 
 * Version 0.67 (2009-05-13) 
 * Modify: Embedded Video now support 16:9 and full screen mode 
 * Fix: Layout problems 
 * Add: Hide bookmark bar
 * Add: Reduce bookmark bar width
 * 
 * Version 0.66 (2009-04-17) 
 * Fix: Stream Replies not working 
 * Modify: Removed Forum 8 in Forum Selector
 * 
 * Version 0.65 (2009-04-02) 
 * Fix: Layout problems
 * 
 * Version 0.64 (2009-03-14) 
 * Fix: Elements hiding problem 
 * Modify: The selected index of the Page Selector in thread page remain unchange after retrieved next page
 * 
 * Version 0.63 (2008-09-27) 
 * Fix: Elements hiding problem at the bottom of the topic page 
 * Fix: Incorrect bye icon link in topic faces converter 
 * Fix: HKGolden logo position problem in topic page 
 * Fix: Ban user problem
 * 
 * Version 0.62 (2008-09-18) 
 * Modify: Improve post completed detection 
 * Modify: Improve float reply table popup location 
 * Fix: Sometimes cannot refresh last page 
 * Modify: Compatible with the new changes of HKGolden DOM Structure
 * 
 * Version 0.61 (2008-09-14) 
 * Modify: Separate layout change and remove google ads so that you can turn off layout change but remove google ads 
 * Fix: Bug in showing member type image 
 * Fix: Firefox 2 issues 
 * Fix: Quick reply encoding issue 
 * Modify: Quick reply table position 
 * Modify: Focus on the textarea after showing the quick reply table 
 * Fix: Using Ctrl-Enter to post message
 * 
 * Version 0.60 (2008-09-13) 
 * Fix: Compatible with Custom Icon feature of Super Golden 
 * Fix: Bug when page 1 has 49 replies (50 repliers table), script will skip 50 replies (51 repliers table) 
 * Fix: Replies auto refresh now can be set for individual page (last selection will be saved as default) 
 * Modify: Optimize and re-arrange the code 
 * Add: Image hider and show non-quote image only options 
 * Add: Show ON/OFF status in commands list 
 * Add: Instant Reply (like a chatroom) 
 * Add: Change form action to last page
 * 
 * Version 0.57 (2008-09-03) 
 * Fix: DOM structure in topics page change on 3-SEP-2008
 * 
 * Version 0.56 (2008-09-01) 
 * Fix: Bug in Title Changer
 * 
 * Version 0.55 (2008-08-31) 
 * Fix: Refresh last page will close embedded YouTube video 
 * Add: Auto Refresh Toggle Button 
 * Add: Set body padding left/right
 * Add: Forum 8 in forum selector 
 * Add: Title Changer 
 * Add: Dragable Quick Reply Table
 * 
 * Version 0.50 (2008-08-30) 
 * Add: Embed Youtube video inside the page 
 * Add: Stream(More) Replies 
 * Add: Float quick reply table 
 * Add: Topic Faces Converter
 * 
 * Version 0.40 (2008-08-25) 
 * Modify: Optimize the code 
 * Modify: Use icon to replace the ban/unban text 
 * Modify: No need to reload after ban/unban
 * Modify: Determine reload or not after changing the settings 
 * Add: Several options 
 * Add: Set number of quotes you want to display 
 * Add: Forum selector in thread
 * 
 * Version 0.31 (2008-08-20) 
 * Add: Layout and open in new tab options
 * 
 * Version 0.30 (2008-08-20) 
 * Add: Ban user function
 * 
 * Version 0.20 (2008-08-17) 
 * Add: Enable/Disable quote's transparency 
 * Add: Smartly resize images 
 * Add: Options to let you set number of pages to autoload, enable/disable quote's transperancy and images resize 
 * Add: Forum selector 
 * Add: Click "Blow Water" link automatically (when session expired) 
 * Fix: Some minor bugs
 * 
 * Version 0.15 (2008-08-15) 
 * Fix: Compatible with new ASP.NET version of HKGolden 
 * Add: Completely remove ads
 * 
 * Version 0.14 (2008-05-21) 
 * Fix: Google Ad-sense still appear in View page
 * 
 * Version 0.13 (2008-05-20) 
 * Fix: Error in the new layout 
 * Add: Remove useless elements 
 * Add: Layout change to 100% width
 * 
 * Version 0.12 (2007-06-19) 
 * First Release
 */

HKGS = {
		
	version: "0.70",
		
	init: function()
	{
		this.Commands.init();
		var page = this.determinePage();
		this.processPage(page);
	},

	determinePage: function()
	{
		var page = null;
		var url = window.location.href.toLowerCase();
		if (url.indexOf("/topics.aspx?") != -1)
		{
			page = 'topic';
		}
		else if (url.indexOf("/view.aspx?") != -1)
		{
			page = 'view';
		}
		else if (url.indexOf("/search.aspx?") != -1)
		{
			page = 'search';
		}
		return page;
	},

	processPage: function(page)
	{
		if (page != null)
		{
			if (typeof (this[page + "PageProcessor"]) == 'function')
			{
				this[page + "PageProcessor"]();
			}
		}
	},

	topicPageProcessor: function()
	{
		this.MessagePreview.init();
		this.RemoveGoogleAds.init();
		if (GM_getValue("showForumSelector")) this.ForumSelector.init();
		if (GM_getValue("isChangeLayout")) this.ChangeLayout.init();
		if (GM_getValue("isOpenInNewTab")) this.ChangeTopicsLinkTarget.init();
		if (GM_getValue("isConvertFaces")) this.TopicFacesConverter.init(document);
		if (GM_getValue("isReduceBookmarkBarWidth")) this.ReduceBookmarkBarWidth.init();
		this.LoadExtraTopics.init();
	},

	viewPageProcessor: function()
	{
		this.RemoveGoogleAds.init();
		if (GM_getValue("showForumSelector")) this.ForumSelector.init();
		if (GM_getValue("isImgHide")) this.ImageHider.init();
		if (GM_getValue("isChangeTitle")) this.TitleChanger.init();
		if (GM_getValue("isBanUser")) this.BanUser.init(document);
		if (GM_getValue("isChangeLayout")) this.ChangeLayout.init();
		if (!GM_getValue("isTrans")) this.DisableTrans.init();
		if (GM_getValue("isImgResize")) this.ResizeImage.init(document);
		if (GM_getValue("isEmbedVideo")) this.EmbedVideo.init(document);
		if (parseInt(GM_getValue("numQuote")) >= 0) this.CollapseQuote.init(document);
		if (GM_getValue("isStreamReplies")) this.StreamReplies.init();
		if (GM_getValue("isFloatQuickReply")) this.FloatQuickReply.init(document);
		if (GM_getValue("useInstantReply")) this.InstantReply.init();
		if (GM_getValue("isReduceBookmarkBarWidth")) this.ReduceBookmarkBarWidth.init();
	},

	searchPageProcessor: function()
	{
		if (GM_getValue("isConvertFaces")) this.TopicFacesConverter.init(document);
	},
	
	// Helper functions
	getFirstNode: function(xpath, node)
	{
		if (!node) GM_log("ERROR: No node pass in XPath function - getFirstNode");
		return document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	},
	
	getOrderedSnapshot: function(xpath, node)
	{
		if (!node) GM_log("ERROR: No node pass in XPath function - getOrderedNode");
		return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	},
	
	getXPathNumber: function(xpath, node)
	{
		if (!node) GM_log("ERROR: No node pass in XPath function - getXPathNumber");
		return document.evaluate(xpath, node, null, XPathResult.NUMBER_TYPE, null).numberValue;
	},

	addStyle: function(css)
	{
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) return;

		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	
	setStatus: function(str, duration)
	{
		if (this.statusDiv != null) 
		{
			clearTimeout(this.timeout);
			this.statusDiv.parentNode.removeChild(this.statusDiv);
		}
		
		var div = document.createElement("div");
		div.innerHTML = str;
		with (div.style)
		{
			position = "fixed";
			width = "200px";
			top = "0px";
			left = "0px";
			backgroundColor = "black";
			color = "white";
			border = "3px yellow solid";
			fontSize = "16px";
			textAlign = "center";
			fontWeight = "bold";
			zIndex = "101";
		}
		
		HKGS.statusDiv = div;
		document.body.appendChild(div);
		if (duration >= 0)
		{
			this.timeout = setTimeout(function() { div.parentNode.removeChild(div); HKGS.statusDiv = null }, duration * 1000);
		}
	},
	
	get: function(url, cb, errCb)
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(xhr) { cb(xhr.responseText); },
			onerror: function(xhr) { errCb(); }
		});
	},
	
	post: function(url, data, cb, errCb)
	{
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
			data: data,
			onload: function(xhr) { cb(xhr.responseText); },
			onerror: function(xhr) { errCb(); }
		});
	}
};

HKGS.Commands = {
		
	init: function()
	{
		this.initOptValues();
		this.initMenuCommands();
	},
	
	initOptValues: function()
	{
		if (GM_getValue("isTrans", "null") == "null") GM_setValue("isTrans", false);
		if (GM_getValue("isImgHide", "null") == "null") GM_setValue("isImgHide", false);
		if (GM_getValue("showNonQuoteImg", "null") == "null") GM_setValue("showNonQuoteImg", false);
		if (GM_getValue("isImgResize", "null") == "null") GM_setValue("isImgResize", true);
		if (GM_getValue("isOpenInNewTab", "null") == "null") GM_setValue("isOpenInNewTab", true);
		if (GM_getValue("isChangeLayout", "null") == "null") GM_setValue("isChangeLayout", true);
		if (GM_getValue("autoLoadPages", "null") == "null") GM_setValue("autoLoadPages", "2");
		if (GM_getValue("isBanUser", "null") == "null") GM_setValue("isBanUser", true);
		if (GM_getValue("banList", "null") == "null") GM_setValue("banList", "");
		if (GM_getValue("showMemImg", "null") == "null") GM_setValue("showMemImg", false);
		if (GM_getValue("numQuote", "null") == "null") GM_setValue("numQuote", "5");
		if (GM_getValue("heightMul", "null") == "null") GM_setValue("heightMul", "1.5");
		if (GM_getValue("isEmbedVideo", "null") == "null") GM_setValue("isEmbedVideo", true);
		if (GM_getValue("isAutoplay", "null") == "null") GM_setValue("isAutoplay", true);
		if (GM_getValue("isStreamReplies", "null") == "null") GM_setValue("isStreamReplies", true);
		if (GM_getValue("isFloatQuickReply", "null") == "null") GM_setValue("isFloatQuickReply", true);
		if (GM_getValue("refreshSec", "null") == "null") GM_setValue("refreshSec", "60");
		if (GM_getValue("isConvertFaces", "null") == "null") GM_setValue("isConvertFaces", true);
		if (GM_getValue("isRefreshEnabled", "null") == "null") GM_setValue("isRefreshEnabled", true);
		if (GM_getValue("bodyPadding", "null") == "null") GM_setValue("bodyPadding", "0");
		if (GM_getValue("isChangeTitle", "null") == "null") GM_setValue("isChangeTitle", true);
		if (GM_getValue("titlePrefix", "null") == "null") GM_setValue("titlePrefix", "【高登】");
		if (GM_getValue("useInstantReply", "null") == "null") GM_setValue("useInstantReply", true);
		if (GM_getValue("showBookmarkBar", "null") == "null") GM_setValue("showBookmarkBar", true);
		if (GM_getValue("isReduceBookmarkBarWidth", "null") == "null") GM_setValue("isReduceBookmarkBarWidth", true);
		if (GM_getValue("showForumSelector", "null") == "null") GM_setValue("showForumSelector", true);
	},

	initMenuCommands: function()
	{
		function addToggleCommand(cmdName, variable, onText, offText, reloadTarget)
		{
			GM_registerMenuCommand(cmdName + (GM_getValue(variable) ? "【ON】" : "【OFF】"), function()
			{
				GM_setValue(variable, !GM_getValue(variable));
				alert(GM_getValue(variable) ? onText : offText);
				if (reloadTarget)
				{
					if (HKGS.determinePage() == reloadTarget) window.location.reload();
				}
				else
				{
					window.location.reload();
				}
			});
		}
		
		addToggleCommand("Toggle Layout Change", "isChangeLayout", "Change Layout ON", "Change Layout OFF", null);
		addToggleCommand("Toggle Member Type Display", "showMemImg", "Member Type Image ON", "Member Type Image OFF", "view");
		addToggleCommand("Toggle Open In New Tab", "isOpenInNewTab", "Open In New Tab ON", "Open In New Tab OFF", "topic");
		addToggleCommand("Toggle Images Hiding", "isImgHide", "Images Hiding ON", "Images Hiding OFF", "view");
		addToggleCommand("Toggle Show Non-Quote Image Only", "showNonQuoteImg", "Show Non-Quote Image ON", "Show Non-Quote Image OFF", "view");
		addToggleCommand("Toggle Images Resize", "isImgResize", "Images Resize ON", "Images Resize OFF", "view");
		addToggleCommand("Toggle Quote's Transparency", "isTrans", "Quote's Transparency ON", "Quote's Transparency OFF", "view");
		addToggleCommand("Toggle Stream Replies", "isStreamReplies", "Stream Replies ON", "Stream Replies OFF", "view");
		addToggleCommand("Toggle Instant Reply", "useInstantReply", "Instant Reply ON", "Instant Reply OFF", "view");
		addToggleCommand("Toggle Float Quick Reply Table", "isFloatQuickReply", "Float Quick Reply Table ON", "Float Quick Reply Table OFF", "view");
		addToggleCommand("Toggle Embed Video", "isEmbedVideo", "Embed Video ON", "Embed Video OFF", "view");
		addToggleCommand("Toggle Autoplay Embedded Video", "isAutoplay", "Autoplay Embedded Video ON", "Autoplay Embedded Video OFF", "view");
		addToggleCommand("Toggle Ban User", "isBanUser", "Ban User ON", "Ban User OFF", "view");
		addToggleCommand("Toggle Topic Faces Converter", "isConvertFaces", "Topic Faces Converter ON", "Topic Faces Converter OFF", "topic");
		addToggleCommand("Toggle Title Changer", "isChangeTitle", "Title Changer ON", "Title Changer OFF", "view");
		addToggleCommand("Toggle Show Bookmark Bar", "showBookmarkBar", "Bookmark Bar ON", "Bookmark Bar OFF", null);
		addToggleCommand("Toggle Reduce Bookmark Bar Width", "isReduceBookmarkBarWidth", "Reduce Bookmark Bar Width ON", "Reduce Bookmark Bar Width OFF", null);
		addToggleCommand("Toggle Display Forum Selector", "showForumSelector", "Display Forum Selector ON", "Display Forum Selector OFF", null);

		// Set number of pages to autoload
		GM_registerMenuCommand("Set Number of Extra Pages to Autoload", setNumOfPages);
		function setNumOfPages()
		{
			var numOfPages;
			var correctFlag = false;
			while (!correctFlag)
			{
				numOfPages = prompt("你想額外自動載入多少頁?", GM_getValue("autoLoadPages"));
				if (!isNaN(numOfPages)) correctFlag = true; else alert("請輸入一個整數");
			}
			GM_setValue("autoLoadPages", numOfPages);
			if (HKGS.determinePage() == "topic") window.location.reload();
		}
		
		// Set number of quote to display
		GM_registerMenuCommand("Set Number of Quotes to Display", setNumOfQuotes);
		function setNumOfQuotes()
		{
			var numOfQuotes;
			var correctFlag = false;
			while (!correctFlag)
			{
				numOfQuotes = prompt("你想顯示多少引用?  (輸入負數關閉此功能)", GM_getValue("numQuote"));
				if (!isNaN(numOfQuotes)) correctFlag = true; else alert("請輸入一個整數");
			}
			GM_setValue("numQuote", numOfQuotes);
			if (HKGS.determinePage() == "view") window.location.reload();
		}
		
		// Set image height multiplier
		GM_registerMenuCommand("Set Image Height Multiplier", setMultiplier);
		function setMultiplier()
		{
			var multiplier;
			var correctFlag = false;
			while (!correctFlag)
			{
				multiplier = prompt("圖片高度將會限制在 N x 視窗高度 (N 為你所輸入的數字)", GM_getValue("heightMul"));
				if (!isNaN(multiplier)) correctFlag = true; else alert("請輸入一個數字");
			}
			GM_setValue("heightMul", multiplier);
			if (HKGS.determinePage() == "view") window.location.reload();
		}
		
		// Set number of second to refresh
		GM_registerMenuCommand("Set Number of Seconds to Refresh Reply", setRefreshSec);
		function setRefreshSec()
		{
			var sec;
			var correctFlag = false;
			while (!correctFlag)
			{
				sec = prompt("你想多少秒鐘更新一次回覆?", GM_getValue("refreshSec"));
				if (!isNaN(sec)) correctFlag = true; else alert("請輸入一個整數");
			}
			GM_setValue("refreshSec", sec);
			if (HKGS.determinePage() == "view") window.location.reload();
		}
		
		// Set body padding left/right
		GM_registerMenuCommand("Set Body Padding Left/Right", setBodyPadding);
		function setBodyPadding()
		{
			var padding;
			var correctFlag = false;
			while (!correctFlag)
			{
				padding = prompt("你想左右空白位置是多闊?", GM_getValue("bodyPadding"));
				if (!isNaN(padding)) correctFlag = true; else alert("請輸入一個整數");
			}
			GM_setValue("bodyPadding", padding);
			window.location.reload();
		}
		
		// Set body padding left/right
		GM_registerMenuCommand("Set Title Prefix", setTitlePrefix);
		function setTitlePrefix()
		{
			var prefix = prompt("你想標題開頭字樣是什麼?", GM_getValue("titlePrefix"));
			GM_setValue("titlePrefix", prefix);
			if (HKGS.determinePage() == "view") window.location.reload();
		}
		
		// Edit ban list
		GM_registerMenuCommand("Edit Ban List", editBanList);
		function editBanList()
		{
			list = prompt("Ban List  (Use ';' as delimiter)", GM_getValue("banList"));
			GM_setValue("banList", list);
			if (HKGS.determinePage() == "view") window.location.reload();
		}

		// Clear ban list
		GM_registerMenuCommand("Clear Ban List", clearBanList);
		function clearBanList()
		{
			var ok = window.confirm("Are you sure you want to clear the ban list?");
			if (ok)
			{
				GM_setValue("banList", "");
				if (HKGS.determinePage() == "view") window.location.reload();
			}
		}
	}
};

HKGS.ChangeTopicsLinkTarget = {
		
	init: function()
	{
		var topicsNode = HKGS.getOrderedSnapshot("//div[@id='HotTopics']/div/table/tbody/tr/td[2]/a", document);
		for (var i = 0; i < topicsNode.snapshotLength; i++)
		{
			var link = topicsNode.snapshotItem(i);
			link.target = "_blank";
		}
	}
};

HKGS.ForumSelector = {
		
	maxForum: 7,
	
	init: function()
	{
		if (HKGS.determinePage() == "topic") this.autoClickBW();
		this.appendForumSelector();
	},

	autoClickBW: function()
	{
		var nodeBW = HKGS.getFirstNode("//a[@href='topics.aspx?type=BW']", document);
		if (nodeBW) window.location.reload();
	},
	
	appendForumSelector: function()
	{
		var selector = document.createElement("select");
		selector.setAttribute("id", "ForumSelector");

		for (var i = 1; i <= this.maxForum; i++)
		{
			var forum = document.createElement("option");
			forum.setAttribute("value", i);
			forum.innerHTML = "Forum " + i;
			selector.appendChild(forum);
		}

		// Get current forum
		var currPage = 0;
		currPage = location.href.match(/forum(\d*)/)[1] - 0;
		if (currPage > 0) selector.selectedIndex = currPage - 1;

		// Event handler
		selector.addEventListener("change", this.selectorOnChange, true);

		// Determine the container
		var page = HKGS.determinePage();
		if (page == "topic")
		{
			selector.style.marginRight = "5px";
			var regionSelector = document.getElementById("forum_list");
			if (regionSelector) regionSelector.parentNode.insertBefore(selector, regionSelector);
		}
		else if (page == "view")
		{
			selector.style.marginLeft = "5px";
			var container = HKGS.getFirstNode("//div[@id='ctl00_ContentPlaceHolder1_view_form']/table[2]/tbody/tr[2]/td", document);
			if (container) container.appendChild(selector);
		}
	},

	selectorOnChange: function(event)
	{
		event.preventDefault();
		var selectedOpt = event.target.options[event.target.selectedIndex];
		location.href = location.href.replace(/forum(\d*)/, "forum" + selectedOpt.value);
	}
};

HKGS.LoadExtraTopics = {

	errCount: 0,
	
	init: function()
	{
		this.totalPages = isNaN(parseInt(GM_getValue("autoLoadPages"))) ? 2 : parseInt(GM_getValue("autoLoadPages"));
		this.lastPage = this.getCurrentPage() + this.totalPages;
		this.startPage = this.getCurrentPage() + 1;
		this.maxPages = this.getMaxPages();

		if (this.startPage > 1 && this.startPage <= this.lastPage && this.startPage <= this.maxPages)
		{
			this.changePreviousPageLink();
			this.getTopics(this.startPage);
		}
	},

	getCurrentPage: function()
	{
		var currentPage = 1;
		if (window.location.href.toLowerCase().indexOf("page=") != -1)
		{
			currentPage = (window.location.href.toLowerCase().match(/page=(\d*)/))[1] - 0;
			if (currentPage == 0)
			{
				currentPage = 1;
			}
		}
		return currentPage;
	},

	getMaxPages: function()
	{
		var pageNode = HKGS.getFirstNode("//select[@name='page']", document);
		return pageNode ? pageNode.options.length : 0;
	},

	getTopics: function(numPage)
	{
		var url = window.location.href;
		url = url.indexOf("page=") != -1 ? url.replace(/page=\d*/, "page=" + numPage) : url + "&page=" + numPage;

		var lastPage = this.lastPage;
		var maxPages = this.maxPages;

		this.switchOnLoadingGif();
		HKGS.get(url, onLoadCallback, onErrorCallback);
		
		function onLoadCallback(html)
		{
			var isSuccess = HKGS.LoadExtraTopics.processTopics(html, numPage);
			if (isSuccess)
			{
				HKGS.LoadExtraTopics.errCount = 0;
				numPage++;
			}
			else if (HKGS.LoadExtraTopics.errCount >= 2) 
			{
				alert("ERROR: Cannot Retrieve Page " + numPage);
				HKGS.LoadExtraTopics.errCount = 0;
				numPage++; // Continue to load page
			}
			else
			{
				HKGS.LoadExtraTopics.errCount++;
				GM_log("Page: " + numPage + " | Error Count: " + HKGS.LoadExtraTopics.errCount);
			}
			
			if (numPage <= lastPage && numPage <= maxPages) HKGS.LoadExtraTopics.getTopics(numPage);
		}
		
		function onErrorCallback() {}
	},

	processTopics: function(responseText, numPage)
	{
		var nextTopics = document.createElement('div');
		nextTopics.innerHTML = responseText;

		var topicsNode = HKGS.getFirstNode(".//div[@id='HotTopics']/div/table/tbody", nextTopics);
		if (topicsNode)
		{
			topicsNode.firstChild.innerHTML = "<td colspan='5' bgcolor=#d9e9f8><strong>&#31532; " + numPage + " &#38913;</strong></td>"

			// Remove google ads blank line
			var adsSnapshot = HKGS.getOrderedSnapshot("//td[@colspan=5][@height=52]/..", topicsNode);
			for (var i = 0; i < adsSnapshot.snapshotLength; i++)
			{
				adsSnapshot.snapshotItem(i).style.display = "none";
			}

			this.appendTopics(topicsNode.innerHTML);
			this.changeNextPageLink(numPage + 1);
			delete nextTopics;

			this.switchOffLoadingGif();			
			return true;
		}
		else
		{
			delete nextTopics;
			this.switchOffLoadingGif();
			return false;
		}
	},

	appendTopics: function(topics)
	{
		var topicsNode = HKGS.getFirstNode("//div[@id='HotTopics']/div/table/tbody", document);
		
		if (topicsNode)
		{
			topicsNode.innerHTML += topics;
			if (GM_getValue("isOpenInNewTab")) HKGS.ChangeTopicsLinkTarget.init();
			if (GM_getValue("isConvertFaces")) HKGS.TopicFacesConverter.convertTopic(document);
		}
		else
		{
			alert("ERROR: Cannot Append To Current Page");
		}
	},

	changeNextPageLink: function(newPageNum)
	{
		var nextLink;
		var nextLinkImg = HKGS.getFirstNode("//img[@alt='next']", document);

		if (nextLinkImg)
		{
			var nextLink = nextLinkImg.parentNode;
			var nextLinkPre = nextLink.previousSibling.previousSibling;

			if (newPageNum > this.maxPages)
			{
				nextLink.parentNode.removeChild(nextLink);
				nextLinkPre.parentNode.removeChild(nextLinkPre);
				return;
			}

			nextLink.href = nextLink.href.replace(/page=\d*/, "page=" + newPageNum);
			nextLinkPre.href = nextLinkPre.href.replace(/page=\d*/, "page=" + newPageNum);
			if (nextLinkPre.innerHTML.match(/\u3010(\d*)\u3011/))
			{
				nextLinkPre.innerHTML = nextLinkPre.innerHTML.replace(/\u3010(\d*)\u3011/, "&#12304;" + newPageNum + "&#12305;");
			}
			else
			{
				var pageText = document.createTextNode(String.fromCharCode(12304) + newPageNum + String.fromCharCode(12305));
				nextLinkPre.appendChild(pageText);
			}
		}
	},

	changePreviousPageLink: function()
	{
		var previousLink, previousLinkText;
		var newPageNum = this.getCurrentPage() - this.totalPages - 1;
		if (newPageNum < 1) newPageNum = 1;

		var previousLinkImg = HKGS.getFirstNode("//img[@alt='prev']", document);
		if (previousLinkImg)
		{
			previousLink = previousLinkImg.parentNode;
			previousLinkText = previousLink.nextSibling.nextSibling; // get another previous page hyperlink
			previousLinkText.href = previousLinkText.href.replace(/page=\d*/, "page=" + newPageNum);
			previousLink.href = previousLinkText.href; // hyperlink from the image has some problems, so replace it
			if (previousLinkText.innerHTML.match(/\u3010(\d*)\u3011/))
			{
				previousLinkText.innerHTML = previousLinkText.innerHTML.replace(/\u3010(\d*)\u3011/, "&#12304;" + newPageNum + "&#12305;");
			}
			else
			{
				var pageText = document.createTextNode(String.fromCharCode(12304) + newPageNum + String.fromCharCode(12305));
				previousLinkText.insertBefore(pageText, previousLinkText.firstChild);
			}
		}
	},

	switchOnLoadingGif: function()
	{
		if (this.loadingNode)
		{
			this.loadingNode.style.display = "block";
		}
		else
		{
			var divNode = document.createElement("div");
			divNode.setAttribute("style", 'height: 45px; background: white url(' + HKGS.Res.LoadingGif + ') no-repeat scroll center;');

			var targetNode = HKGS.getFirstNode("//div[@id='HotTopics']", document);
			if (targetNode)
			{
				targetNode.parentNode.insertBefore(divNode, targetNode.nextSibling);
				this.loadingNode = divNode;
			}
			else
			{
				alert("Cannot Show Loading Gif");
			}
		}
	},

	switchOffLoadingGif: function()
	{
		if (this.loadingNode) this.loadingNode.style.display = "none";
	}
};

HKGS.RemoveGoogleAds = {
	
	init: function()
	{
		var hiddenElm = new Array("//div[@id='Side_GoogleAd']", // Side google ads
								  "//span[@id='HKGBottomGoogleAd']", // Bottom google ads
								  "//span[@id='HKGHeaderGoogleAd']", // Header google ads
								  "//span[starts-with(@id, 'MsgInLineAd')]" // Inline google ads
								  );
		for (var i = 0; i < hiddenElm.length; i++)
		{
			HKGS.ChangeLayout.hide(hiddenElm[i], document);
		}
	}
}

HKGS.ChangeLayout = {

	init: function()
	{
		this.changeGeneralLayout();
		
		var page = HKGS.determinePage();
		if (page == "topic") 
		{
			this.changeTopicLayout();
		}
		else if (page == "view")
		{
			this.changeViewLayout();
		}
	},
	
	changeGeneralLayout: function()
	{
		// Set left/right blank space
		var body = document.getElementsByTagName("body")[0];
		body.style.paddingLeft = body.style.paddingRight = GM_getValue("bodyPadding") + "px";
		
		// Override the CSS
		HKGS.addStyle(
				".PageWidthContainer { width: auto !important; } " +
				".PageLeftPanel { display: none; }" +
				".ContentPanel { padding-left: 0px !important; }" +
				".Topic_ForumInfoPanel { padding-right: 0px !important; }" +
				".Topic_ListPanel { margin-top: 20px }" + // Fix problem ocurred after removing the 高登公告 div
				".Topic_ForumInfoPanel table td { padding-bottom: 5px !important; }" + 
				".Topic_TopRightAdPanel { display: none; }");
		
		var fullWidthElm = new Array();
		for (var i = 0; i < fullWidthElm.length; i++)
		{
			this.fullWidth(fullWidthElm[i]);
		}

		var hiddenElm = new Array("//span[@id='HKGTopAd']" // Top main ads
								  );
		
		if (!GM_getValue("showBookmarkBar")) hiddenElm.push("//div[@id='hkg_bottombar']"); // Bookmark bar
		
		for (var i = 0; i < hiddenElm.length; i++)
		{
			this.hide(hiddenElm[i], document);
		}
	},

	changeTopicLayout: function()
	{
		var fullWidthElm = new Array("//div[@id='HotTopics']/div[1]/table[1]");
		for (var i = 0; i < fullWidthElm.length; i++)
		{
			this.fullWidth(fullWidthElm[i]);
		}
		
		var hiddenElm = new Array("//div[@class='Topic_ForumInfoPanel']/table/tbody/tr[3]", // 高登活動資訊
								  "//div[@class='Topic_ForumInfoPanel']/table/tbody/tr[4]", // ads below 高登活動資訊
								  "//div[@class='Topic_FunctionPanel']/div[4]", // 高登公告
								  "//div[@class='Topic_ListPanel']/table[3]", // Useless icon at the bottom
								  "//td[@colspan=5][@height=52]/.." // Inline ads container
								  );
		
		for (var i = 0; i < hiddenElm.length; i++)
		{
			this.hide(hiddenElm[i], document);
		}
		
		// 討論區資訊 table height problem
		var elm = HKGS.getFirstNode("//form[@id='aspnetForm']/div[3]/div/div[3]/table/tbody/tr/td/table[1]/tbody/tr/td[1]/table", document);
		if (elm) elm.removeAttribute("height");
	},

	changeViewLayout: function()
	{
		var fullWidthElm = new Array();
		for (var i = 0; i < fullWidthElm.length; i++)
		{
			this.fullWidth(fullWidthElm[i]);
		}
		
		var hiddenElm = new Array("//form[@id='aspnetForm']/div[3]/div/div[3]/div[@id='ctl00_ContentPlaceHolder1_view_form']/table[1]/tbody/tr/td/table/tbody/tr[3]", // 高登活動資訊
								  "//form[@id='aspnetForm']/div[3]/div/div[3]/div[@id='ctl00_ContentPlaceHolder1_view_form']/table[1]/tbody/tr/td/table/tbody/tr[4]", // Text ads below 高登活動資訊
								  // "//form[@id='aspnetForm']/table/tbody/tr[2]/td/table/tbody/tr/td[3]", // Empty td at right
								  "//form[@id='aspnetForm']/div[3]/div/div[3]/div[@id='ctl00_ContentPlaceHolder1_view_form']/table[3]/tbody/tr/td/table[2]/tbody/tr[2]", // Ads above main table
								  "//span[@id='HKGTopGoogleAd']/../..", // Top google ads and its container
								  "//span[@id='HKGBottomGoogleAd']/../.." // Bottom google ads container
								  );
		if (!GM_getValue("showMemImg")) hiddenElm.push("//td[@class='repliers_left']/table/tbody/tr[3]/td"); // 普通會員/進階會員 Images
		
		for (var i = 0; i < hiddenElm.length; i++)
		{
			this.hide(hiddenElm[i], document);
		}
	},

	hide: function(elm, node)
	{
		var nodesSnapshot = HKGS.getOrderedSnapshot(elm, node);

		if (nodesSnapshot.snapshotLength == 0) GM_log("No Such Element: " + elm);

		for (var i = 0; i < nodesSnapshot.snapshotLength; i++)
		{
			nodesSnapshot.snapshotItem(i).style.display = "none";
		}
	},

	fullWidth: function(elm)
	{
		var nodesSnapshot = HKGS.getOrderedSnapshot(elm, document);

		if (nodesSnapshot.snapshotLength == 0) GM_log("Full Width Element Error: " + elm);

		for (var i = 0; i < nodesSnapshot.snapshotLength; i++)
		{
			nodesSnapshot.snapshotItem(i).style.width = "100%";
		}
	}
};

HKGS.DisableTrans = {

	init: function()
	{
		HKGS.addStyle("blockquote { opacity: 1 ! IMPORTANT }");
	}
};

HKGS.ResizeImage = {

	init: function(node)
	{
		var imagesSnapshot = HKGS.getOrderedSnapshot(".//img[@onload='DrawImage(this)']", node);
		for (var i = 0; i < imagesSnapshot.snapshotLength; i++)
		{
			var image = imagesSnapshot.snapshotItem(i);
			image.setAttribute("onload", "");

			// If the image is not loaded, add onload event handler. Otherwise, resize the image immediately
			!image.complete ? image.addEventListener("load", this.resizeImage, true) : this.resizeImage(image);
		}
	},

	resizeImage: function(obj)
	{
		var image = typeof (obj.target) == 'undefined' ? obj : obj.target; // Determine obj is an event object or image object

		var containerWidth = GM_getValue("isChangeLayout") ? window.innerWidth - 210 - (2 * parseInt(GM_getValue("bodyPadding"))) : 625;
		var imgOffsetX = image.offsetLeft;
		var maxWidth = containerWidth - imgOffsetX;
		var maxHeight = window.innerHeight * (isNaN(parseFloat(GM_getValue("heightMul", "1.5"))) ? 1.5 : parseFloat(GM_getValue("heightMul", "1.5")));

		if (image.naturalWidth > maxWidth || image.naturalHeight > maxHeight)
		{
			var width = image.naturalWidth;
			var height = image.naturalHeight;

			if (width > maxWidth)
			{
				width = maxWidth;
				height = (image.naturalHeight * maxWidth / image.naturalWidth);
			}

			if (height > maxHeight)
			{
				height = maxHeight;
				width = (image.naturalWidth * maxHeight / image.naturalHeight);
			}

			image.removeAttribute('width');
			image.removeAttribute('height');
			image.style.width = width + "px";
			image.style.height = height + "px";
			image.style.cursor = "-moz-zoom-in";
			if (image.parentNode.getAttribute("_href")) image.parentNode.setAttribute("href", image.parentNode.getAttribute("_href")); // Restore href
		}
		else
		{
			image.removeAttribute('width');
			image.removeAttribute('height');
			image.setAttribute('onload', "");
			image.parentNode.setAttribute("_href", image.parentNode.href); // Backup the href
			image.parentNode.removeAttribute('href');
		}
	},
};

HKGS.BanUser = {

	init: function(node)
	{
		// Get the list of banned users
		var list = GM_getValue("banList", "").split(";");

		// Get current page users
		var userSnapshot = HKGS.getOrderedSnapshot(".//td/a[starts-with(@href, 'ProfilePage.aspx?userid=') and not(@status)]", node);
		for (var i = 0; i < userSnapshot.snapshotLength; i++)
		{
			var node = userSnapshot.snapshotItem(i);
			node.setAttribute("status", "true");
			var id = node.href.split("=")[1];

			if (list.indexOf(id) != -1)
			{
				// Hide banned user content
				var tdNode = node.offsetParent.offsetParent.offsetParent.nextSibling.nextSibling;
				this.hideMsg(tdNode);
				this.appendButton(node, "Unban");
			}
			else
			{
				this.appendButton(node, "Ban");
			}
		}
	},

	tempAllow: function(event)
	{
		event.target.parentNode.style.display = "none";
		event.target.parentNode.nextSibling.style.display = "";
		event.target.parentNode.parentNode.offsetParent.style.opacity = "1";
	},

	appendButton: function(node, type)
	{
		var nodeParent = node.parentNode;
		nodeParent.appendChild(document.createElement("br"));

		var spanButton = document.createElement("img");
		if (type == "Ban")
		{
			spanButton.setAttribute("src", HKGS.Res.AllowIcon);
			spanButton.setAttribute("alt", "封鎖");
			spanButton.addEventListener("click", this.banHandler, true);
		}
		else if (type == "Unban")
		{
			spanButton.setAttribute("src", HKGS.Res.DenyIcon);
			spanButton.setAttribute("alt", "解除封鎖");
			spanButton.addEventListener("click", this.unbanHandler, true);
		}

		with (spanButton.style)
		{
			marginTop = "5px";
			cursor = "pointer";
		}

		nodeParent.appendChild(spanButton);
	},

	banHandler: function(event)
	{
		var node = event.target.previousSibling.previousSibling;
		var id = node.href.split("=")[1];
		var msgSnapshot = HKGS.getOrderedSnapshot("//td/a[@href='ProfilePage.aspx?userid=" + id + "']", document);
		for (var i = 0; i < msgSnapshot.snapshotLength; i++)
		{
			var linkNode = msgSnapshot.snapshotItem(i);
			
			var button = linkNode.nextSibling.nextSibling;
			button.setAttribute("src", HKGS.Res.DenyIcon);
			button.setAttribute("alt", "解除封鎖");
			button.removeEventListener("click", HKGS.BanUser.banHandler, true);
			button.addEventListener("click", HKGS.BanUser.unbanHandler, true);
			
			HKGS.BanUser.hideMsg(linkNode.offsetParent.offsetParent.offsetParent.nextSibling.nextSibling);
		}
		
		GM_setValue("banList", GM_getValue("banList", "") + id + ';');
	},
	
	hideMsg: function(tdNode)
	{
		var messageTable = tdNode.childNodes[1];
		messageTable.style.display = "none";

		var bannedMsg = document.createElement("span");
		bannedMsg.innerHTML = "*** 已封鎖此用戶的訊息 ***";

		var tempAllow = document.createElement("span");
		tempAllow.innerHTML = "【暫時顯示此訊息】";
		tempAllow.style.cursor = "pointer";
		tempAllow.style.marginLeft = "10px";
		tempAllow.addEventListener("click", this.tempAllow, true);

		bannedMsg.appendChild(tempAllow);
		messageTable.parentNode.insertBefore(bannedMsg, messageTable);
		messageTable.parentNode.offsetParent.style.opacity = "0.3";
		messageTable.parentNode.style.verticalAlign = "top";
	},
	
	unbanHandler: function(event)
	{
		var node = event.target.previousSibling.previousSibling;
		var id = node.href.split("=")[1];
		
		var msgSnapshot = HKGS.getOrderedSnapshot("//td/a[@href='ProfilePage.aspx?userid=" + id + "']", document);
		for (var i = 0; i < msgSnapshot.snapshotLength; i++)
		{
			var linkNode = msgSnapshot.snapshotItem(i);
			
			var button = linkNode.nextSibling.nextSibling;
			button.setAttribute("src", HKGS.Res.AllowIcon);
			button.setAttribute("alt", "封鎖");
			button.removeEventListener("click", HKGS.BanUser.unbanHandler, true);
			button.addEventListener("click", HKGS.BanUser.banHandler, true);
			
			HKGS.BanUser.unhideMsg(linkNode.offsetParent.offsetParent.offsetParent.nextSibling.nextSibling);
		}

		var list = GM_getValue("banList", "").split(";");
		list.splice(list.indexOf(id), 1);
		var listStr = list.join(";");
		GM_setValue("banList", listStr);
	},
	
	unhideMsg: function(tdNode)
	{
		var span = tdNode.childNodes[1];
		var msgTable = tdNode.childNodes[2];

		tdNode.removeChild(span);
		msgTable.style.display = "";
		msgTable.parentNode.offsetParent.style.opacity = "1";
	}
};

HKGS.CollapseQuote = {

	init: function(node)
	{
		var numQuote = isNaN(parseInt(GM_getValue("numQuote", "5"))) ? 5 : parseInt(GM_getValue("numQuote", "5"));
		var xpath = ".//td/blockquote/div";
		for (var i = 0; i < numQuote; i++)
		{
			xpath += "/blockquote/div";
		}
		
		var quoteSnapshot = HKGS.getOrderedSnapshot(xpath, node);
		for (var i = 0; i < quoteSnapshot.snapshotLength; i++)
		{
			var quotes = quoteSnapshot.snapshotItem(i);
			
			var tempExp = document.createElement("div");
			tempExp.setAttribute("name", "collapse");
			tempExp.style.cursor = "pointer";
			tempExp.style.color = "green";
			tempExp.style.fontSize = "12px";
			tempExp.innerHTML = "......【顯示更多引用】";
			tempExp.addEventListener("click", HKGS.CollapseQuote.expand, true);
			
			quotes.style.display = "none";
			quotes.parentNode.insertBefore(tempExp, quotes);
			
		}
		if (node === document) this.appendQuoteDisplayBtn();
	},
	
	expand: function(event)
	{
		var button = event.target
		var quotes = button.nextSibling;

		quotes.style.display = "";
		
		// Need resize the image again
		var imgSnapshot = HKGS.getOrderedSnapshot(".//img[@onload]", quotes);
		for (var i = 0; i < imgSnapshot.snapshotLength; i++)
		{
			HKGS.ResizeImage.resizeImage(imgSnapshot.snapshotItem(i));
		}
		
		button.innerHTML = "【隱藏引用】";
		button.setAttribute("name", "expand");
		button.style.marginBottom = "10px";
		button.style.marginLeft = "-6px";
		button.removeEventListener("click", HKGS.CollapseQuote.expand, true);
		button.addEventListener("click", HKGS.CollapseQuote.collapse, true);
	},
	
	collapse: function(event)
	{
		var button = event.target
		var quotes = button.nextSibling;
		
		quotes.style.display = "none";
		button.innerHTML = "......【顯示更多引用】";
		button.setAttribute("name", "collapse");
		button.style.marginBottom = "0px";
		button.style.marginLeft = "0px";
		button.removeEventListener("click", HKGS.CollapseQuote.collapse, true);
		button.addEventListener("click", HKGS.CollapseQuote.expand, true);		
	},
	
	appendQuoteDisplayBtn: function()
	{
		var container = HKGS.getFirstNode("//div[@id='ctl00_ContentPlaceHolder1_view_form']/table[3]/tbody/tr/td/table[2]/tbody/tr[1]/td[2]", document);
		if (container)
		{
			var showAllBtn = document.createElement("span");
			showAllBtn.innerHTML = "顯示全部引用";
			with (showAllBtn.style)
			{
				cursor = "pointer";
				color = "blue";
				textDecoration = "underline";
				marginRight = "10px";
			}
			showAllBtn.addEventListener("click", this.expandAll, true);
			
			var collapseAllBtn = document.createElement("span");
			collapseAllBtn.innerHTML = "隱藏多餘引用";
			with (collapseAllBtn.style)
			{
				cursor = "pointer";
				color = "blue";
				textDecoration = "underline";
				marginLeft = "10px";
			}
			collapseAllBtn.addEventListener("click", this.collapseAll, true);
			
			container.appendChild(showAllBtn);
			container.appendChild(document.createTextNode("|"));
			container.appendChild(collapseAllBtn);
		}
	},
	
	expandAll: function()
	{
		var collapseBtnSnapshot = HKGS.getOrderedSnapshot("//div[@name='collapse']", document);

		for (var i = 0; i < collapseBtnSnapshot.snapshotLength; i++)
		{
			var collapseBtn = collapseBtnSnapshot.snapshotItem(i);
			var evt = document.createEvent("MouseEvents");
			
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			collapseBtn.dispatchEvent(evt);
		}
	},
	
	collapseAll: function()
	{
		var expandBtnSnapshot = HKGS.getOrderedSnapshot("//div[@name='expand']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < expandBtnSnapshot.snapshotLength; i++)
		{
			var expandBtn = expandBtnSnapshot.snapshotItem(i);
			var evt = document.createEvent("MouseEvents");
			
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			expandBtn.dispatchEvent(evt);
		}
	}
};

HKGS.EmbedVideo = {
		
	flashPlayerWidth: 640,

	flashPlayerHeight: 385,

	init: function(node)
	{
		var linkSnapshot = HKGS.getOrderedSnapshot(".//table[@class='repliers']/tbody/tr/td[2]/table/tbody/tr[1]/td//a[contains(@href, 'youtube.com')]", node);
		GM_log("This page has " + linkSnapshot.snapshotLength + " Youtube link");
		for (var i = 0; i < linkSnapshot.snapshotLength; i++)
		{
			var link = linkSnapshot.snapshotItem(i);
			var regexVideoId = link.href.match(/(v=|v\/)([a-zA-Z0-9_-]+)&?/i)
			
			if (regexVideoId !== null && regexVideoId[2] !== null)
			{
				var playBtn = document.createElement("img");
				var fontSize = document.defaultView.getComputedStyle(link,null).getPropertyValue('font-size').split("px")[0] - 0;
				playBtn.style.display = "none";
				playBtn.setAttribute("src", fontSize >= 16 ? HKGS.Res.PlayIcon : HKGS.Res.PlaySmallIcon);
				playBtn.setAttribute("id", regexVideoId[2]);
				playBtn.setAttribute("status", "close");
				with (playBtn.style)
				{
					marginLeft = "5px";
					marginRight = "5px";
					verticalAlign = "middle";
					cursor = "pointer";
				}
				playBtn.addEventListener("click", this.showVideoObj, true);
				
				link.parentNode.insertBefore(playBtn, link.nextSibling);
				playBtn.style.display = "";
			}
		}
	},
	
	showVideoObj: function(event)
	{
		var playBtn = event.target;
		
		if (playBtn.getAttribute("status") == "close")
		{
			playBtn.setAttribute("status", "open");
			
			var videoObj = document.createElement("ojbect");
			var videoParam1 = document.createElement("param");
			var videoParam2 = document.createElement("param");
			var videoParam3 = document.createElement("param");
			var videoEmbed = document.createElement("embed");
			var videoLink = "http://www.youtube.com/v/" + playBtn.getAttribute("id") + "&hl=en&fs=1&rel=0&autoplay=" + (GM_getValue("isAutoplay") ? "1" : "0");
			
			videoObj.setAttribute("width", HKGS.EmbedVideo.flashPlayerWidth);
			videoObj.setAttribute("height", HKGS.EmbedVideo.flashPlayerHeight);
			videoParam1.setAttribute("name", "movie");
			videoParam1.setAttribute("value", videoLink);
			videoParam2.setAttribute("name", "allowFullScreen");
			videoParam2.setAttribute("value", "true");
			videoParam3.setAttribute("name", "allowscriptaccess");
			videoParam3.setAttribute("value", "always");
			videoEmbed.setAttribute("src", videoLink);
			videoEmbed.setAttribute("type", "application/x-shockwave-flash");
			videoEmbed.setAttribute("allowfullscreen", "true");
			videoEmbed.setAttribute("allowscriptaccess", "always");
			videoEmbed.setAttribute("width", HKGS.EmbedVideo.flashPlayerWidth);
			videoEmbed.setAttribute("height", HKGS.EmbedVideo.flashPlayerHeight);
			
			videoObj.appendChild(videoParam1);
			videoObj.appendChild(videoParam2);
			videoObj.appendChild(videoParam3);
			videoObj.appendChild(videoEmbed);
			
			playBtn.parentNode.insertBefore(videoObj, playBtn.nextSibling);
			playBtn.parentNode.insertBefore(document.createElement("br"), playBtn.nextSibling);
		}
		else if (playBtn.getAttribute("status") == "open")
		{
			playBtn.parentNode.removeChild(playBtn.nextSibling.nextSibling);
			playBtn.parentNode.removeChild(playBtn.nextSibling);
			playBtn.setAttribute("status", "close");
		}
	}
};

HKGS.StreamReplies = {

	firstPage: 0,
	lastPage: 0,
	lastPageRepliesCount: 0,
	maxPage: 1,
	minRemainScroll: 3000,
	isRequesting: false,
	gotAllReplies: false,
	
	init: function()
	{
		this.getCurrentPage();
		this.appendLoadingGifDiv();
		this.encloseFirstPage(); // Create div to enclose the first page replies
		this.addToggleRefreshBtn();
		this.lastPageRepliesCount = this.getPageRepliesCount(this.lastPage);
		this.scrollWatcher();
	},
	
	getCurrentPage: function()
	{
		var regexPageMatch = window.location.href.match(/page=(\d*)/i);
		this.firstPage = regexPageMatch && regexPageMatch[1] ? regexPageMatch[1] : 1;
		this.lastPage = this.firstPage;
		GM_log("First Page: " + this.firstPage + ", Last Page: " + this.lastPage);
	},
	
	appendLoadingGifDiv: function()
	{
		var div = document.createElement("div");
		var img = document.createElement("img");
		
		div.setAttribute("id", "Loading");
		div.style.textAlign = "center";
		div.style.marginTop = "6px";
		div.style.marginBottom = "10px";
		div.style.display = "none";
		
		img.setAttribute("src", HKGS.Res.LoadingGif);
		
		div.appendChild(img);
		
		var bottomAd = document.getElementById("HKGBottomGoogleAd");
		if (bottomAd)
		{
			var beforeElement = bottomAd.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling;
			beforeElement.parentNode.insertBefore(div, beforeElement);
			this.loadingNode = div;
		}
	},
	
	switchOnLoading: function()
	{
		this.loadingNode.style.display = "";
	},
	
	switchOffLoading: function()
	{
		this.loadingNode.style.display = "none";
	},
	
	encloseFirstPage: function()
	{
		var time = new Date();
		var div = document.createElement("div");
		div.style.display = "none";
		div.setAttribute("id", this.firstPage)
		
		var repliesSnapshot = HKGS.getOrderedSnapshot("//table[@class='repliers'] | //div[@id='ctl00_ContentPlaceHolder1_view_form']/div/table[not(@width) and not(@cellspacing) and not(@style)]", document);
		
		for (var i = 0; i < repliesSnapshot.snapshotLength; i++)
		{
			var reply = repliesSnapshot.snapshotItem(i);
			
			if (reply.className == "repliers")
			{
				var encloseTable = reply.parentNode.parentNode.parentNode.parentNode;
				reply.style.marginBottom = "6px";
				div.appendChild(reply);
				
				encloseTable.style.display = "none";
			}
			else
			{
				reply.style.display = "none";
			}
		}
		if (this.loadingNode)
		{
			this.loadingNode.parentNode.insertBefore(div, this.loadingNode);
			div.style.display = "";
		}
		GM_log("Enclose Used: " + (new Date() - time));
	},
	
	getPageRepliesCount: function(page)
	{
		var repliesSnapshot;
		
		repliesCount = HKGS.getXPathNumber("count(.//table[@class='repliers'])", page != this.firstPage ? document.getElementById(page) : document);
		
		this.gotAllReplies = page == 1 ? repliesCount < 51 ? true : false : repliesCount < 50 ? true : false;
		GM_log("Page " + page + " has " + repliesCount + " replies. Got all replies: " + this.gotAllReplies);
		return repliesCount;
	},
	
	scrollWatcher: function()
	{
		if (!HKGS.StreamReplies.isRequesting && !HKGS.StreamReplies.gotAllReplies &&  
				HKGS.StreamReplies.remainingScroll() < HKGS.StreamReplies.minRemainScroll)
		{
			HKGS.StreamReplies.isRequesting = true;
			HKGS.StreamReplies.switchOnLoading();
			// GM_log(HKGS.StreamReplies.remainingScroll());
			HKGS.StreamReplies.getNextPage();
		}
		!HKGS.StreamReplies.gotAllReplies ? setTimeout(HKGS.StreamReplies.scrollWatcher, 500) : HKGS.StreamReplies.initAutoRefresh();
	},
	
	// Borrow from GoogleMonkeyR
	remainingScroll: function() 
	{
		var ele = document.documentElement;
		var total = (ele.scrollHeight - ele.clientHeight);
		if (total==0) 
		{
			ele = document.body;
			total = (ele.scrollHeight - ele.clientHeight);
		}
		var sc = ele.scrollTop;
		return total - sc;
	},
	
	getNextPage: function()
	{		
		this.lastPage++;
		GM_log("First Page: " + this.firstPage + ", Last Page: " + this.lastPage);
		
		var url = window.location.href;
		url = url.toLowerCase().indexOf("page=") != -1 ? url.replace(/page=(\d)*/, "page=" + this.lastPage) : url + "&page=" + this.lastPage;
		GM_log("Get Url: " + url);
		
		HKGS.get(url, onLoadCallback, onErrorCallback);
		
		function onLoadCallback(html)
		{
			var startTime = new Date();
			
			GM_log("Get Page " + HKGS.StreamReplies.lastPage + " Success");
			
			var newPageDiv = HKGS.StreamReplies.retrieveReplies(html, 0);
			// var pageSelector = HKGS.StreamReplies.retrievePageSelector(rs.responseText);
			// HKGS.StreamReplies.replacePageSelector(pageSelector);
			HKGS.StreamReplies.appendRepliesDiv(newPageDiv);
			
			HKGS.StreamReplies.switchOffLoading();
			HKGS.StreamReplies.isRequesting = false;
			
			GM_log("Loading Time: " + (new Date() - startTime));
		}
		
		function onErrorCallback()
		{
			alert("ERROR: Cannot Retrieve Page " + HKGS.StreamReplies.lastPage);
			HKGS.StreamReplies.isRequesting = false;
			HKGS.StreamReplies.switchOffLoading();
		}
	},
	
	retrieveReplies: function(html, from)
	{
		var page = document.createElement("div");
		page.style.display = "none";
		page.innerHTML = html;
		
		var repliesSnapshot = HKGS.getOrderedSnapshot(".//table[@class='repliers']", page);
		
		var newPageDiv = document.createElement("div");
		newPageDiv.style.display = "none"; // Reduce loading time
		GM_log("From: " + from + ". Retrieve " + (repliesSnapshot.snapshotLength - from) + " New Replie(s)");
		for (var i = from; i < repliesSnapshot.snapshotLength; i++)
		{
			var replyTable = repliesSnapshot.snapshotItem(i);
			replyTable.style.marginBottom = "6px";
			newPageDiv.appendChild(replyTable);
		}
		newPageDiv.setAttribute("id", this.lastPage);
		if (this.lastPage != this.firstPage && from == 0) 
		{
			var topicRow = HKGS.getFirstNode(".//tr", newPageDiv);
			if (topicRow) topicRow.innerHTML = "<td colspan='2' class='repliers_header' style='color:black;background-color:#D9E9F8;text-align:center;line-height:6px;'>第 " + this.lastPage + " 頁</td>";
		}
		
		// Get page selector and replace selector of current page
		var pageSelector = HKGS.getFirstNode(".//select[@name='page']", page);
		if (pageSelector) this.replacePageSelector(pageSelector);
		this.changeFormActionToLastPage();
		
		return newPageDiv;
	},
	
	retrievePageSelector: function(html)
	{
		var page = document.createElement("div");
		page.innerHTML = html;
		
		var pageSelector = HKGS.getFirstNode(".//select[@name='page']", page);
		return pageSelector;
	},
	
	appendRepliesDiv: function(div)
	{
		this.loadingNode.parentNode.insertBefore(div, this.loadingNode);
		this.lastPageRepliesCount = this.getPageRepliesCount(this.lastPage);
		
		div.style.display = "";
		// Redo the view page function
		if (GM_getValue("isImgHide")) { HKGS.ImageHider.hideAll(div); HKGS.ImageHider.appendShowBtn(div); }
		if (GM_getValue("isBanUser")) HKGS.BanUser.init(div);
		if (GM_getValue("isImgResize")) HKGS.ResizeImage.init(div);
		if (GM_getValue("isEmbedVideo")) HKGS.EmbedVideo.init(div);
		if (parseInt(GM_getValue("numQuote")) >= 0) HKGS.CollapseQuote.init(div);
		if (GM_getValue("isFloatQuickReply")) HKGS.FloatQuickReply.init(div);
		if (GM_getValue("isChangeLayout") && !GM_getValue("showMemImg")) HKGS.ChangeLayout.hide(".//td[@class='repliers_left']/table/tbody/tr[3]/td", div);
		
		this.changeNextPageLink();
	},
	
	changeNextPageLink: function()
	{
		var nextLinkImgSnapshot = HKGS.getOrderedSnapshot("//img[@alt='Next']", document);
		var nextPageNum = this.lastPage + 1;

		for (var i = 0; i < nextLinkImgSnapshot.snapshotLength; i++)
		{
			var nextLinkImg = nextLinkImgSnapshot.snapshotItem(i);
			var nextLink = nextLinkImg.parentNode;
			var nextLinkPre = nextLink.previousSibling.previousSibling;

			if (nextPageNum > this.maxPage)
			{
				nextLink.style.display = "none";
				nextLinkPre.style.display = "none";
			}
			else
			{
				nextLink.style.display = "";
				nextLinkPre.style.display = "";
				
				nextLink.href = nextLink.href.replace(/page=\d*/, "page=" + nextPageNum);
				nextLinkPre.href = nextLinkPre.href.replace(/page=\d*/, "page=" + nextPageNum);
				if (nextLinkPre.innerHTML.match(/\u3010(\d*)\u3011/))
				{
					nextLinkPre.innerHTML = nextLinkPre.innerHTML.replace(/\u3010(\d*)\u3011/, "&#12304;" + nextPageNum + "&#12305;");
				}
				else
				{
					var pageText = document.createTextNode(String.fromCharCode(12304) + nextPageNum + String.fromCharCode(12305));
					nextLinkPre.appendChild(pageText);
				}
			}
		}
	},
	
	replacePageSelector: function(selector)
	{
		var selectorSnapshot = HKGS.getOrderedSnapshot("//select[@name='page']", document);
		for (var i = 0; i < selectorSnapshot.snapshotLength; i++)
		{
			var sel = selectorSnapshot.snapshotItem(i);
			var newSelector = selector.cloneNode(true);
			if (newSelector.length > 0) newSelector.selectedIndex = sel.selectedIndex; // selected index remain unchange
			sel.parentNode.replaceChild(newSelector, sel);
		}
		this.maxPage = this.getMaxPage(selector);
		GM_log("Max Page: " + this.maxPage);
	},
	
	getMaxPage: function(selector)
	{
		return selector.options[selector.options.length - 1].value;
	},

	changeFormActionToLastPage: function()
	{
		var form = document.getElementById("aspnetForm");
		var formAction = form.action;
		form.action = form.action.indexOf("page=") != -1 ? form.action.replace(/page=\d*/, "page=" + this.lastPage) : form.action + "&page=" + this.lastPage;
	},
	
	
	initAutoRefresh: function()
	{
		this.refreshSec = (!isNaN(parseInt(GM_getValue("refreshSec"))) && parseInt(GM_getValue("refreshSec")) >= 5) ? 
				parseInt(GM_getValue("refreshSec")) : 60;
		this.time = new Date();
		!this.statusNode ? this.appendStatusDiv() : this.statusNode.style.display = "";
		setTimeout(HKGS.StreamReplies.refresh, 1000);
	},
	
	appendStatusDiv: function()
	{
		var statusDiv = document.createElement("div");
		with (statusDiv.style)
		{
			textAlign = "center";
			marginTop = marginBottom = "6px";
		}
		
		if (this.loadingNode)
		{
			this.loadingNode.parentNode.insertBefore(statusDiv, this.loadingNode.nextSibling);
			this.statusNode = statusDiv;
		}
	},
	
	refresh: function()
	{
		if (HKGS.StreamReplies.isRefreshEnabled)
		{
			var remainTime = HKGS.StreamReplies.refreshSec - Math.floor((new Date() - HKGS.StreamReplies.time) / 1000);
			
			if (remainTime <= 0)
			{
				HKGS.StreamReplies.time = new Date(); // Reset time to current time
				
				if (!HKGS.StreamReplies.isRequesting && HKGS.StreamReplies.gotAllReplies) HKGS.StreamReplies.refreshLastPage();
	
				if (!HKGS.StreamReplies.gotAllReplies)
				{
					HKGS.StreamReplies.statusNode.style.display = "none";
					setTimeout(HKGS.StreamReplies.scrollWatcher, 500);
				}
				else
				{
					setTimeout(HKGS.StreamReplies.refresh, 1000);
				}
			}
			else
			{
				if (!HKGS.StreamReplies.isRequesting)
				{
					HKGS.StreamReplies.statusNode.innerHTML = "已讀取全部回覆， " + remainTime + " 秒後自動重新整理";
					
					var spanBtn = document.createElement("span");
					spanBtn.innerHTML = "【立即重新整理】";
					spanBtn.style.cursor = "pointer";
					spanBtn.style.color = "blue";
					spanBtn.addEventListener("click", function() 
					{
						HKGS.StreamReplies.time = new Date() - (HKGS.StreamReplies.refreshSec * 1000);
					}, true);
					HKGS.StreamReplies.statusNode.appendChild(spanBtn);
				}
				setTimeout(HKGS.StreamReplies.refresh, 1000);
			}
		}
		else
		{
			setTimeout(HKGS.StreamReplies.refresh, 1000);
		}
	},
	
	refreshLastPage: function()
	{		
		GM_log("Refresh Last Page");
		this.isRequesting = true;
		this.statusNode.innerHTML = "<img style='vertical-align: middle' src='" + HKGS.Res.LoadingGif + "'> 正在重新整理...";
		
		var url = window.location.href;
		url = url.toLowerCase().indexOf("page=") != -1 ? url.replace(/page=(\d)*/, "page=" + this.lastPage) : url + "&page=" + this.lastPage;
		GM_log("Get Url: " + url);
		
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(rs)
			{				
				var startTime = new Date();
				
				GM_log("Get Page " + HKGS.StreamReplies.lastPage + " Success");
				
				var newPageDiv = HKGS.StreamReplies.retrieveReplies(rs.responseText, HKGS.StreamReplies.lastPageRepliesCount);
				HKGS.StreamReplies.replaceLastPage(newPageDiv);
				
				HKGS.StreamReplies.time = new Date();
				HKGS.StreamReplies.isRequesting = false;
				
				GM_log("Loading Time: " + (new Date() - startTime));
			},
			onerror: function(rs)
			{
				alert("ERROR: Cannot Retrieve Page " + this.lastPage);
				HKGS.StreamReplies.time = new Date();
				HKGS.StreamReplies.isRequesting = false;
			}
		});
	},
	
	replaceLastPage: function(div)
	{
		if (div.childNodes.length > 0)
		{
			// Redo the view page function
			if (GM_getValue("isImgHide")) { HKGS.ImageHider.hideAll(div); HKGS.ImageHider.appendShowBtn(div); }
			if (GM_getValue("isEmbedVideo")) HKGS.EmbedVideo.init(div);
			if (parseInt(GM_getValue("numQuote")) >= 0) HKGS.CollapseQuote.init(div);
			if (GM_getValue("isFloatQuickReply")) HKGS.FloatQuickReply.init(div);
			if (GM_getValue("isChangeLayout") && !GM_getValue("showMemImg")) HKGS.ChangeLayout.hide(".//td[@class='repliers_left']/table/tbody/tr[3]/td", div);
	
			var lastPageDiv = document.getElementById(this.lastPage);
			var numReplies = div.childNodes.length;
			for (var i = 0; i < numReplies; i++)
			{
				lastPageDiv.appendChild(div.childNodes[0], lastPageDiv);
			}
			delete div;
			this.lastPageRepliesCount = this.getPageRepliesCount(this.lastPage);
			
			// Redo the view page function
			if (GM_getValue("isBanUser")) HKGS.BanUser.init(lastPageDiv);
			if (GM_getValue("isImgResize")) HKGS.ResizeImage.init(lastPageDiv);
			
			this.changeNextPageLink();
		}
		else
		{
			GM_log("No New Reply");
		}
	},
	
	addToggleRefreshBtn: function()
	{
		var bottomAd = document.getElementById("HKGBottomGoogleAd");
		if (bottomAd)
		{
			var container = bottomAd.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.rows[1].cells[1];
			container.style.textAlign = "right";
			var btn = document.createElement("span");
			btn.style.cursor = "pointer";
			btn.style.color = "blue";
			btn.style.textDecoration = "underline";
			btn.addEventListener("click", this.refreshToggleHandler, true);
			if (GM_getValue("isRefreshEnabled"))
			{
				HKGS.StreamReplies.isRefreshEnabled = true;
				btn.innerHTML = "自動重新整理: <font color='green'>開</font>";
				btn.setAttribute("status", "on");
			}
			else
			{
				HKGS.StreamReplies.isRefreshEnabled = false;
				btn.innerHTML = "自動重新整理: <font color='red'>關</font>";
				btn.setAttribute("status", "off");
			}
			
			container.appendChild(btn);
		}
	},
	
	refreshToggleHandler: function(event)
	{
		var btn = event.target.tagName == "SPAN" ? event.target : event.target.parentNode;
		
		if (btn.getAttribute("status") == "on")
		{
			GM_setValue("isRefreshEnabled", false);
			HKGS.StreamReplies.isRefreshEnabled = false;
			if (HKGS.StreamReplies.statusNode) HKGS.StreamReplies.statusNode.style.display = "none";
			btn.innerHTML = "自動重新整理: <font color='red'>關</font>";
			btn.setAttribute("status", "off");
		}
		else
		{
			GM_setValue("isRefreshEnabled", true);
			HKGS.StreamReplies.isRefreshEnabled = true;
			HKGS.StreamReplies.time = new Date();
			if (HKGS.StreamReplies.statusNode) HKGS.StreamReplies.statusNode.style.display = "";
			btn.innerHTML = "自動重新整理: <font color='green'>開</font>";
			btn.setAttribute("status", "on");
		}
	}
};

HKGS.FloatQuickReply = {

	init: function(node)
	{
		var quickQuoteSnapshot = HKGS.getOrderedSnapshot(".//a[starts-with(@href, 'Javascript:QuoteReply')]", node);
		for (var i = 0; i < quickQuoteSnapshot.snapshotLength; i++)
		{
			var quickQuoteBtn = quickQuoteSnapshot.snapshotItem(i);
			quickQuoteBtn.addEventListener("click", this.toggleQuickReply, true);
		}
		
		if (node === document)
		{
			// Modify the default OnQuoteSucceeded function
			unsafeWindow.OnQuoteSucceeded = function(result)
			{
				unsafeWindow.$get("ctl00_ContentPlaceHolder1_messagetext").value = unescape(result) + "\n";
				// unsafeWindow.$get("ctl00_ContentPlaceHolder1_messagetext").focus();
				unsafeWindow.$get("ctl00_ContentPlaceHolder1_messagetext").scrollTop = unsafeWindow.$get("ctl00_ContentPlaceHolder1_messagetext").scrollHeight;
				// window.scrollTo(0, document.body.scrollHeight);
				// unsafeWindow.$get("ctl00_ContentPlaceHolder1_messagetext").createTextRange().moveEnd("character",unsafeWindow.$get("ctl00_ContentPlaceHolder1_messagetext").innerHTML.length);
			}
		}
	},
	
	toggleQuickReply: function(event)
	{
		var quickReplyTable = document.getElementById("ctl00_ContentPlaceHolder1_QuickReplyTable");
		
		if (!quickReplyTable.getAttribute("status") || quickReplyTable.getAttribute("status") == "close")
		{
			quickReplyTable.setAttribute("status", "open");
			with (quickReplyTable.style)
			{
				position = "absolute";
				top = (event.pageY - 475) + "px";
				left = (event.pageX - 750 < 0 ? 0 : event.pageX - 750) + "px";
				width = "800px";
				border = "4px rgb(51, 102, 153) outset";
				zIndex = "100";
			}
			document.getElementById("ctl00_ContentPlaceHolder1_messagetext").focus();
			
			var titleBar = HKGS.getFirstNode(".//input[@name='messagetype']", quickReplyTable).parentNode;
			titleBar.style.cursor = "move";
			HKGS.FloatQuickReply.dragObj = new Object();
			titleBar.addEventListener("mousedown", HKGS.FloatQuickReply.dragStart, true);
		}
		else
		{
			quickReplyTable.setAttribute("status", "close");
			with (quickReplyTable.style)
			{
				position = "relative";
				left = "";
				top = "";
				width = "99%";
				border = "";
			}
			var titleBar = HKGS.getFirstNode(".//input[@name='messagetype']", quickReplyTable).parentNode;
			titleBar.style.cursor = "default";
			titleBar.removeEventListener("mousedown", HKGS.FloatQuickReply.dragStart, true);
		}
	},
	
	// *****************************************************************************
	// Copyright 2001 by Mike Hall.
	// See http://www.brainjar.com for terms of use.
	// *****************************************************************************
	dragStart : function(event) 
	{
		var x, y;
		var dragObj = HKGS.FloatQuickReply.dragObj;
		
		dragObj.elNode = document.getElementById("ctl00_ContentPlaceHolder1_QuickReplyTable");
		
		if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
		
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	
		// Save starting positions of cursor and element.
		dragObj.cursorStartX = x;
		dragObj.cursorStartY = y;
		dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
		dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
	
		if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
		if (isNaN(dragObj.elStartTop)) dragObj.elStartTop = 0;
	
		// Capture mousemove and mouseup events on the page.
		document.addEventListener("mousemove", HKGS.FloatQuickReply.dragGo, true);
		document.addEventListener("mouseup", HKGS.FloatQuickReply.dragStop, true);
		event.preventDefault();
	},

	dragGo : function(event) 
	{
		var x, y;
		var dragObj = HKGS.FloatQuickReply.dragObj;
		
		// Get cursor position with respect to the page.
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	
		// Move drag element by the same amount the cursor has moved.
		dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
		dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";

		event.preventDefault();
	},
	
	dragStop : function(event)
	{
		document.removeEventListener("mousemove", HKGS.FloatQuickReply.dragGo, true);
		document.removeEventListener("mouseup", HKGS.FloatQuickReply.dragStop, true);
	}
};

HKGS.TopicFacesConverter = {

	init: function(node)
	{
		this.facesLink = new Array();
		
		this.facesLink['O:-)'] = 'faces/angel.gif';
		this.facesLink['xx('] = 'faces/dead.gif';
		this.facesLink[':)'] = 'faces/smile.gif';
		this.facesLink[':o)'] = 'faces/clown.gif';
		this.facesLink[':-('] = 'faces/frown.gif';
		this.facesLink[':~('] = 'faces/cry.gif';
		this.facesLink[';-)'] = 'faces/wink.gif';
		this.facesLink[':-['] = 'faces/angry.gif';
		this.facesLink[':-]'] = 'faces/devil.gif';
		this.facesLink[':D'] = 'faces/biggrin.gif';
		this.facesLink[':O'] = 'faces/oh.gif';
		this.facesLink[':P'] = 'faces/tongue.gif';
		this.facesLink['^3^'] = 'faces/kiss.gif';
		this.facesLink['?_?'] = 'faces/wonder.gif';
		this.facesLink['#yup#'] = 'faces/agree.gif';
		this.facesLink['#ng#'] = 'faces/donno.gif';
		this.facesLink['#hehe#'] = 'faces/hehe.gif';
		this.facesLink['#love#'] = 'faces/love.gif';
		this.facesLink['#oh#'] = 'faces/surprise.gif';
		this.facesLink['#cn#'] = 'faces/chicken.gif';
		this.facesLink['#ass#'] = 'faces/ass.gif';
		this.facesLink['[sosad]'] = 'faces/sosad.gif';
		this.facesLink['#good#'] = 'faces/good.gif';
		this.facesLink['#hoho#'] = 'faces/hoho.gif';
		this.facesLink['#kill#'] = 'faces/kill.gif';
		this.facesLink['#bye#'] = 'faces/bye.gif';
		this.facesLink['Z_Z'] = 'faces/z.gif';
		this.facesLink['@_@'] = 'faces/@.gif';
		this.facesLink['#adore#'] = 'faces/adore.gif';
		this.facesLink['???'] = 'faces/wonder2.gif';
		this.facesLink['[banghead]'] = 'faces/banghead.gif ';
		this.facesLink['[bouncer]'] = 'faces/bouncer.gif';
		this.facesLink['[bouncy]'] = 'faces/bouncy.gif';
		this.facesLink['[censored]'] = 'faces/censored.gif';
		this.facesLink['[flowerface]'] = 'faces/flowerface.gif';
		this.facesLink['[shocking]'] = 'faces/shocking.gif';
		this.facesLink['[photo]'] = 'faces/photo.gif';
		this.facesLink['#fire#'] = 'faces/fire.gif';
		this.facesLink['[yipes]'] = 'faces/yipes.gif';
		this.facesLink['[369]'] = 'faces/369.gif';
		this.facesLink['[bomb]'] = 'faces/bomb.gif';
		this.facesLink['[slick]'] = 'faces/slick.gif';
		this.facesLink['fuck'] = 'faces/fuck.gif';
		this.facesLink['#no#'] = 'faces/no.gif';
		this.facesLink['#kill2#'] = 'faces/kill2.gif';
		this.facesLink['[offtopic]'] = 'faces/offtopic.gif';
		
		this.regex = /O:-\)|xx\(|:\)|:o\)|:-\(|:~\(|;-\)|:-\[|:-\]|:D|:O|:P|\^3\^|\?_\?|#yup#|#ng#|#hehe#|#love#|#oh#|#cn#|#ass#|\[sosad\]|#good#|#hoho#|#kill#|#bye#|Z_Z|@_@|#adore#|\?\?\?|\[banghead\]|\[bouncer\]|\[bouncy\]|\[censored\]|\[flowerface\]|\[shocking\]|\[photo\]|#fire#|\[yipes\]|\[369\]|\[bomb\]|\[slick\]|fuck|#no#|#kill2#|\[offtopic\]/ig;
		
		this.convertTopic(node);
	},
	
	convertTopic: function(node)
	{
		// var time = new Date();
		var topicLinkSnapshot = HKGS.getOrderedSnapshot(".//a[starts-with(@href, 'view.aspx?') and not(contains(@href, 'page='))]", node);
		for (var i = 0; i < topicLinkSnapshot.snapshotLength; i++)
		{
			var topicLink = topicLinkSnapshot.snapshotItem(i);
			var topicText = topicLink.innerHTML;
			var match = topicText.match(this.regex);
			if (match)
			{
				var fontSize = document.defaultView.getComputedStyle(topicLink, null).getPropertyValue('font-size');
				for (var j = 0; j < match.length; j++)
				{
					topicText = topicText.replace(match[j], " <img style='height: " + fontSize + "; border: 0px;' src='" + this.facesLink[match[j]] + "' /> ");
				}
				topicLink.innerHTML = topicText;
			}
		}
		// GM_log("Convert Faces Time: " + (new Date() - time));
	}
};

HKGS.TitleChanger = {

	init: function()
	{
		var titleContainer = HKGS.getFirstNode("//table[@class='repliers']/tbody/tr[1]/td[2]", document);
		if (titleContainer) document.title = GM_getValue("titlePrefix") + titleContainer.innerHTML;
	}
};

HKGS.ImageHider = {

	init: function()
	{
		this.hideAll(document);
		this.appendShowBtn(document);
	},
	
	hideAll: function(node)
	{
		var xpath = GM_getValue("showNonQuoteImg") ? ".//table[@class='repliers']//blockquote//a[@target]//img/.." : 
				".//table[@class='repliers']//a[@target]//img/..";
		var imgSnapshot = HKGS.getOrderedSnapshot(xpath, node);
		GM_log("Images Hiding Count: " + imgSnapshot.snapshotLength);
		for (var i = 0; i < imgSnapshot.snapshotLength; i++)
		{
			var imgLink = imgSnapshot.snapshotItem(i);
			imgLink.innerHTML = "<img src='faces/photo.gif' style='border-width: 0px;'/> 按此顯示圖片";
			imgLink.setAttribute("status", "hide")
			imgLink.style.textDecoration = "none";
			imgLink.style.color = "green";
			imgLink.addEventListener("click", this.showImg, true);
		}
	},
	
	showImg: function(event)
	{
		event.preventDefault();	
		var link = event.target;
		var img = document.createElement("img");

		GM_getValue("isImgResize") ? img.addEventListener("load", HKGS.ResizeImage.resizeImage, true) : img.setAttribute("onload", "DrawImage(this)");
		img.src = link.href;
		img.style.borderWidth = "0px";
		img.setAttribute("alt", "[img]" + img.src + "[/img]");
		
		link.removeEventListener("click", HKGS.ImageHider.showImg, true);
		link.innerHTML = "";
		link.removeAttribute("style");
		link.removeAttribute("status");
		link.appendChild(img);
	},
	
	appendShowBtn: function(node)
	{
		var container = HKGS.getOrderedSnapshot(".//table[@class='repliers']/tbody/tr/td[2]/table/tbody/tr[2]/td", node);
		for (var i = 0; i < container.snapshotLength; i++)
		{
			var row = container.snapshotItem(i);
			var btn = document.createElement("span");
			with(btn.style)
			{
				fontSize = "12px";
				color = "gray";
				cursor = "pointer";
				verticalAlign = "middle";
				marginLeft = marginRight = "5px";
			}
			btn.innerHTML = "顯示所有圖片";
			btn.addEventListener("click", this.showAll, true);
			row.insertBefore(btn, row.childNodes[5]);
		}
	},
	
	showAll: function(event)
	{
		var btn = event.target;
		var replyTable = btn.parentNode.offsetParent;
		var hiddenImg = HKGS.getOrderedSnapshot(".//a[@status='hide']", replyTable);
		for (var i = 0; i < hiddenImg.snapshotLength; i++)
		{
			var showBtn = hiddenImg.snapshotItem(i);
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			showBtn.dispatchEvent(evt);
		}
	}
};

HKGS.InstantReply = {
		
	isPosting: false,
	
	init: function()
	{
		var submitBtn = document.getElementById("ctl00_ContentPlaceHolder1_btn_Submit");
		if (submitBtn) 
		{
			submitBtn.addEventListener("click", this.submit, true);
		}
		
		var textArea = document.getElementById("ctl00_ContentPlaceHolder1_messagetext");
		if (textArea)
		{
			textArea.addEventListener("keydown", this.onKeyDown, true);
			textArea.removeAttribute("onkeydown");
		}
	},
	
	submit: function(event)
	{
		event.preventDefault();
		
		if (!HKGS.InstantReply.isPosting)
		{
			HKGS.InstantReply.isPosting = true;
			HKGS.setStatus("正在張貼訊息...", -1);
			HKGS.InstantReply.postMsg();
		}
		else
		{
			alert("正在張貼訊息，請稍後再試");
		}
	},
	
	postMsg: function()
	{
		var viewState = encodeURIComponent(document.getElementById("__VIEWSTATE").value);
		var subject = encodeURIComponent(document.getElementById("ctl00_ContentPlaceHolder1_messagesubject").value);
		var msg = encodeURIComponent(document.getElementById("ctl00_ContentPlaceHolder1_messagetext").value);
		var data = "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=" + viewState + 
				"&page=1&page=1&messagetype=Y&ctl00%24ContentPlaceHolder1%24messagesubject=" + subject +
				"&ctl00%24ContentPlaceHolder1%24messagetext=" + msg + 
				"&ctl00%24ContentPlaceHolder1%24btn_Submit.x=0&ctl00%24ContentPlaceHolder1%24btn_Submit.y=0";
		
		HKGS.post(window.location.href, data, onLoadCallback, onErrorCallback);
		
		function onLoadCallback(html)
		{
			var div = document.createElement("div");
			div.innerHTML = html;
			
			var sysMsg = HKGS.getFirstNode(".//table[@id='ctl00_ContentPlaceHolder1_SystemMessageBoard']//p", div);
			if (sysMsg)
			{
				HKGS.setStatus("<font style='color: #ffb2b2'>發生錯誤</font>", 5);
				alert("系統信息:\n" + unescape(sysMsg.firstChild.nodeValue).replace(/\&nbsp\;/ig, " "));
			}
			else if (HKGS.getFirstNode(".//table[@class='repliers']", div)) // response page has replies so post message is completed
			{
				HKGS.setStatus("<font style='color: #b1ff9f'>完成</font>", 5);
				document.getElementById("ctl00_ContentPlaceHolder1_messagetext").value = "";
				if (!HKGS.StreamReplies.isRequesting) HKGS.StreamReplies.time = new Date() - (HKGS.StreamReplies.refreshSec * 1000); // Refresh
				if (document.getElementById("ctl00_ContentPlaceHolder1_QuickReplyTable").getAttribute("status") == "open") 
					HKGS.FloatQuickReply.toggleQuickReply(); // Close quick reply table
			}
			else // may be an error page without system message
			{
				// GM_log(html);
				onErrorCallback();
			}
			HKGS.InstantReply.isPosting = false;
		}
		
		function onErrorCallback()
		{
			HKGS.setStatus("<font style='color: #ffb2b2'>發生錯誤</font>", 5);
			alert("ERROR: Cannot Post Message. Please Try Again Later");
			HKGS.InstantReply.isPosting = false;
		}
	},
	
	onKeyDown: function(event)
	{
		if (event.ctrlKey && event.keyCode == 13)
		{
			event.preventDefault();
			var btn = document.getElementById("ctl00_ContentPlaceHolder1_btn_Submit");
			if (btn)
			{
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				btn.dispatchEvent(evt);
			}
		}
	}
}

HKGS.ReduceBookmarkBarWidth = {
		
	init: function() {
		var bookmarkElm = document.getElementById("hkg_bottombar");
		if (bookmarkElm != null)
		{
			bookmarkElm.style.width = "auto";
		}
	}
}

HKGS.MessagePreview = {
	
	init: function() {
		this.injectMessageFunc();
	},

	injectMessageFunc: function() {
		var mFunc = document.createElement('script');
		mFunc.src = 'MessageFunc.asmx/js';
		document.body.appendChild(mFunc);
	}
}

HKGS.Res = {
	"LoadingGif": "data:image/gif;base64,R0lGODlhIgAiAPQAADk5OVJSUlpaWmtra3t7e4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAgFAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIgAiAAAFhiAljmRJLYmprqx4AG1cBgb5yjjVCDacxxKBYnT7lQoI0mBA9BlHEOToIYC4nE9RNCUa1CjFLLTAdQQmYKyYshUJkodAVhFBQwkpB2OtSygYEVMFVnwjDSh0hSwSDX6EiioOj5CUJRIPEJiamJATERESn6CflaWmp6ipqqusra6vsLGys6ohACH5BAgFAAAALAAAAAAiACIAhCEhISkpKVpaWmNjY2tra3Nzc4SEhIyMjJSUlKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWTICWOZElJiqmuZkMqAiurUPHG4wNEM2ukIsWAJAj0SBPSwzASjiQA15HyUCRFEoPUKSIApqNF4kpBALkUwAIctoqWSW4BQGYv3BTDmhs4sEsKQAx%2BCjYJABBTDg91EwprKCQJBGwQixIjjg5%2FLBAPDhF1nCwRDw%2BJoz0SmKmtrq%2BwsbKztLW2t7i5uru8vb6%2FwL4hACH5BAgFAAAALAAAAAAiACIAhCEhISkpKTk5OUJCQkpKSlJSUlpaWmNjY3Nzc4SEhIyMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWT4CWOZCk6ZqqaFAkha5xSjJuQiiHHTTRCt1FBsltNGj%2BYaKEriiQTUoXRugBHB%2BSoEpBFoiMHRPQSPQqVEQUg2H3VNWswobxMAIOiBTrqXR43FQU%2BdnhOFxZvFxFIEAsXDE0SAASHIntRFYRmPpMFliOJVSkAn6BOQaeqq6ytrq%2BwsbKztLW2t7i5uru8vb6%2FwIchACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWVICWOZCk2Zqqu4qOwcDk55JOQShGvTzS6JMNrl3o8frdWwUc0TR6T1pCCMJAag2YL0kpKCtyTYEqUHClASm6kGBy0I4fPJiqcGQOyFnKEvBYFUW0IcCQTTCIONHiEJBIMhSUSAo0iDAEAABKRJEwSCpkBBJwmDgKZBIikJAUBOquwsbKztLW2t7i5uru8vb6%2FwMHCsCEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2tre3t7hISEjIyMlJSUnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYlgJY5kKU5mqq7nw76vBJGRAt%2FV5I4Ng8OyEWUh%2Bb0mM5FjQaIcjKWgSFE8GRJQkk70YJ4O2OxISrXaxKNJpNKlVCSHM7oUcbzjpQdhPsKfHAMDT3wVDVwGgQluhCIQBAMFcowiDAlrk5g4CZucnIt8AgEAogClAAiZqaqrrK2ur7CxsrO0tbavIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlKSkpra2t7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjCAljmRpnmiqriwbPW1cOpJsS7AtQxA5KbqUYzL6LYInSI4iURyRpkeN6YSaIg6RJMGwmiTEZte3tHJJkAOh4BVlmY8CIVH2QhCFArBdYiQafIE6BwaFBgSIBGNehAYIj48Lb4KUIgkElSQKAAADPZkUCgEAAgagFAwCnAOnEQsARKeys7S1tre4uYEhACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWmNjY2tra4yMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWEICWOZGmeaKqubOu%2BcCzP6EOvk2Pf6PRAvN4vePIBiSVjMkIcjiILRYIoEU0gUsaRGGEkFI4JcvRg7MboVYOxbrjd1WDiQK%2FTGen8ArFNPwoDBVNoYhQPCQQDCExBCgANIzmJBkQEAA4lEINBlph5IgMAZ3mhfWkCAKZoAQCfrq%2BwsS8hACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWCYCWOZGmeaKqubOu%2BcCzPdG3feK7T1D5SkcfDN4E8IhId0Jj0SZC%2BaCoCqVqrucVCse0qHNLdgxGuPAwFxoQoghgMCUhOMmiMIgjDYVEzgBMDfCMTDQY1AQMiCQR2OggAaxWLgjkAlAuBOgUAJIAIcwCNIgsEOgIBZZuRUqFlPWUsIQAh%2BQQIBQAAACwAAAAAIgAiAIQxMTFSUlJaWlpjY2Nzc3OEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgSAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8DgSRIhGosTHOTBbDIjwhvEAYQkFI2kD6JIMCA5BwEqiiwU2BqDmiiARxKrLHCgHAQiRIFsA9QlAVQUenw0fiIFBCN6En11FA4BfAgEWjOHIgMIJHo1mHYCljefFIE6pAZ4OaQ8B28uIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlCQkJSUlJaWlpjY2Nra2tzc3N7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbW1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkOAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgcVShAS0QyqfwskigSR2k4RRaKJDJtRRqkyOQCcXSxkhfgcHEg2gpR%2BSqDAJAOw2WSmEKsMwIDInkiCg4jfxYxEwAPhAUiDwmLkg6VLgwBIw6RIglpIw9gamyQnAk1diSdIxYJYzMBnoQEJAsLOg62T4gvIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISFaWlpjY2Nzc3N7e3uEhISMjIycnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkeAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgs2hpAAiCCkjQkM6Vi4kiQHJDJw8GEDQDWycAwSSwmjKm20W19DyJIAHmYPhLdbVv1Hi0CIgdnZQ4jD2wrXwgkAXATCGoNYSJ6KgCOIg0BUBOCIwhZhkgvAgWfkwyTMhEBg2WuEqA0miQIqgqjOAquPQy5LSEAIfkECAUAAAAsAAAAACIAIgCEISEhMTExOTk5SkpKWlpaY2Nja2trc3Nze3t7hISEjIyMnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABY%2BgJY5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHCIexgWPUQAIHjoJgYAoAARVXADaeMqigwit2ZJQkhYJNURhTuTDMyWRMPiAEvAs0m5m7gywBURbC8TAwgjC0gWDXgREzEUBAdqCXh%2FIhNpL5IkEHCLeBYRFDYJDCOXInc1EocjjJ2DMAqnqKFntzapPoIwIQAh%2BQQIBQAAACwAAAAAIgAiAIQ5OTlSUlJaWlpra2t7e3uEhISMjIyUlJScnJylpaWtra29vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFguAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F0DYAUAsEgO4xWHJZAaDEsSi9zAEBI7dYRAYNEQPnEEgIGRFiYLkJmhESOnsI6xLEOiK7%2BNtQxToDwkiDhB9fyMKDGCFNH50ExAKfA58M4cjCwojlDoSeZuMOBCCIw%2BhN4kknD%2BrPhGVLSEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2trc3Nze3t7hISEjIyMlJSUpaWlra2ttbW1vb29xsbG1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYRgJY5kaZ5oqq5s675wLM90bd94HgMOpZcEAAAB%2BZEMAYDAYRw9BkJmszI5LKY%2FCmPL5eIYA4K4QC4ksOhRhCH9NRIIRUQ3YSAQDIloflPciyMODDhyJYJ6FBM%2FDguKFRB6OQ0MjhMPOow%2Be3w3k5oVFBCONwyfFRKAUw%2BRTaFoq2mxNyEAIfkECAUAAAAsAAAAACIAIgCEISEhWlpaY2Njc3Nze3t7hISEjIyMnJycpaWlra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYLgJI5kaZ5oqq5s675wLJPAMLdIfbOHvqsK3w%2B1ABCGokakFBQgAwFBgxRkIBcF6AIiWiJFEoMgMHB8TQ1D4swmOQ4IBFyOWA8bi8RCwc8v2oApDwxmbQ0JCQpcXxIMdQ5eEkiICYsiD4U%2FSiWYXm2dgaCAmJKjkIETDpaorK2ur4AhACH5BAgFAAAALAAAAAAiACIAhCEhITExMTk5OVJSUlpaWmNjY2tra3Nzc3t7e4SEhIyMjJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWM4CWOZGmeaKqurDCw8PkAVWyPgHGrRD06gF3qMKCMKgCEEHUgGEWFwBKFKIoggMj0VJ2IArqpwktKDCQXiGLLSCQivkuCYNmSGu4FOm03QdoJZH0mFQ5ag4gnEg4ODYyODQ%2BDFhKVlpaJmTAWFHGJFJaefRMSEROidqQRdZoXEqytsbKztLW2t7i5tCEAOw%3D%3D",
	"DenyIcon": "data:image/gif;base64,R0lGODlhEAAQAPcAAG0SEm8SEmofH3YTE3UUFHkUFHoVFXYjI3ckJIEWFoAXF4MYGJYdHZceHpkeHpseHp8eHqAfH4YnJ4koKIY5OaAhIaIhIaUiIqQjI6YjI6UkJKgkJKolJasmJqonJ60mJrApKbEqKrIrK7YrK7kqKrovL7wtLa41Na43N7swML0wMLc4OMM2NsQ1NcY3N8ozM8g3N8s2Nss%2BPtE0NNI3N4xBQY1CQpBDQ5lAQKZNTbBRUbJRUb9mZstCQtBJSdBLS9JNTdFOTslUVMxZWc9eXtNQUNVWVtZbW9xZWdlcXMBlZdRnZ9lgYNphYdtmZtNsbN5tbd5vb8p1ddVyctlyct59feVwcOJ1deJ3d%2BJ5eeV6esuAgNqDg92WluWAgOSBgeKHh%2BmAgOeIiOiNjeqPj%2BWSkuCVleqRkeqTk%2BqVleCbm%2BOamuWenumamuuamuuenu6dndeiotipqditrdmuruygoO2goO6hoeinp%2B2mpu%2BmpuKrq%2B%2BqqvGqqvKtrfKvr%2BuwsO%2B4uPGwsPKzs%2FK1tfO4uPW8vPS9vfLDw%2FTBwfXCwvXExPXGxvbJyffKyvXMzPfS0vjV1fjX1%2Fnc3PX19fb29vf39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAAJcALAAAAAAQABAAAAjsAC8JFCinSxgrT7YMXHhpzp8%2Ffe6c0YKEBg%2BGewwxYlSIjxsxWJq8QDGQjiFHjhIR0oPGSxQmRUzsEPhnUaNGhwTZGZPFiREfMCBciuNHkaJDg%2FSk%2BQLlyA8ZLjDgUBNp0iRJkB4hCgQID5s1ZrhIgFOprNmzZiklIGOJktu3cN8OmPImT502ZcBUobKEyBAhQlYckILkShQnR4L0YFECBIcMGRZQuDQjSRIjTxmH4HDhAgMAApXEAOJDRosUIjpkqPDAgI2BJ0i4cKFixIcNFhwQEMBQRwQNHjxoaKAgQA2GA3NMSFAAwQ2GAQEAOw%3D%3D",
	"AllowIcon": "data:image/gif;base64,R0lGODlhEAAQAPcAABM4ExQ6ExU7FBY8FRZCFRdFFhhAFxpKGRpMGSBeHyFiHyJKISFPICdPJiJQISFdICJfICZcJSdfJitXKixaKyFhICVrJCZtJCZsJShtJihvJipqKStsKS9uLSlxKCpzKCtzKit0KSx1Ki14Ky94LS95LjB7Lj9tPjJzMDR%2FMjp5OEd3RkV5REd5Rkl8RzWCMzWEMziNNjuIOTuKOTyJOjyLOjuMOUGTQEOUQUSXQkSdQUaZREmcR0meR06bTFKKUVeQVVeRVkugSU6hTFGkT1OuUVatVFesVVqvWGeoZWixZmmyZ2O4YWq1aGq5aGq7aHG8b3WxdHS%2FcnfAdXfCdXzDeoG3gILFgITFgo7EjYvJio3LjI%2FLjpDFj5LGkZPHkpLNkJXOk5bOlZvRmp3TnKLKoarNqqLUoaPVoqbWpajWp6fYpajYp6vTqqrZqKvZqq3Yq63aq63ZrK7ZrbDQr7Dcr7HPsLLcsbXdtLbctrjgt7rgub7ivb%2Fiv8HgwMHjwMLkwcbmxcfmx83nzM7ozdPr0tTq09zs3ODw3%2Br16vLz8vT09PT19PX19fb29vf39%2FT59Pj4%2BP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAAJIALAAAAAAQABAAAAj5ACUJFGjmS5UnS6wMXCiJzps3a8hskVJERxeGbfQAAoQnTZgrcBwpyjLQjh5BgvjcOcNFjaNGeVAEEejmTyBAe%2BSM0dKo0aEeNBhIKsOmT589ddCASbSI0ZAbNSKw8LIGD544aMTMabSoCQ4bMDhMoEImTRpCYbA8amQox4wXJkAYYLIlzEtHgyI54mEjRQkRGQQomXKlUCNHiyL56UvigwYIDaIUgeIE0stFPlKM8IABA4ITkmIYQXLkJaIUJDxcuJAAgMAkMoQI2UHkRYkPnRUUaDFQRQcZMmCYCKHBQgUCCxgCcSBhg%2FMHBwKsYDjwBwUDAxq4YBgQADs%3D",
	"PlayIcon": "data:image/gif;base64,R0lGODlhFgAUAPcAAP%2F%2F%2F1uZ5ampqeqEAO7u7nJycrS0tPX19f7bNJmZmfHx8ffKyvn5%2Bf%2Fodv%2F6yenp6cPQ7DExMf1nZ%2F4zM%2Fq1tv2FhbrC4P7laOfn5%2FqUAP%2BZAPL2%2FDVcnP1PT%2F%2F96bEVFeHh4dXV1eTk5Nvk9kpISIiIiNvb29jY2P%2Fvl8zMzP%2FtjP%2F1stTU1KG02ezx%2Bv%2F70%2BLi4tra2v%2FxncMcHLFWV%2F%2F5wdUjI9Le9AI1m2WYAN7e3uzBASeUFP%2F83ZjLAfz8%2FMzZ8w8ODvX4%2Ff7eQv7jXON9AOQpKcbU7%2F7ZJc4iIuXs%2Bd54ANTk%2B9VSU9zp%2FM2ur8DN6%2F7hUaQuLvj6%2Ff%2Fzo%2F%2F0rE58sv%2FrgfGLAP7%2B%2Fp0ICLvH5sHBweCOj%2F7gS1USEvzj42GkUr7L6KHZSPv8%2F6DOk9nn%2B%2Bry%2FOHs%2FN1ububu%2FPm5TFPEHtfg9erw%2Bv%2F%2F%2Bv%2F%2B88jW8f7YHPaQAOJ8f%2FEsLHyt9SpsDzB73AgwaeLp99DQ0P3w8OLp%2BODn99g0NPD0%2FO3z%2B83e%2BICzAP39%2Fu%2F0%2B8s5Ou%2Fi4tHb73qz4DFtd6bE8md2y%2BpjWO%2B%2FwOomTpcdHY%2BbztY4KJS98Y%2B7itnh7%2F%2F3t9LusLh%2Bf9ftyt3Ky7%2FS8cPoj9JfYKu74KHF5rHC4l5eXrONt7a5zfDJikaUNkl8AOTs%2BMianN%2Fl7%2BykMM8cG%2F%2F%2FZu7o6MzH3Ojq7qxDRPDRpevv9sjR2LHibuXo7%2Bfu%2BvecnMnXya%2FK8%2F%2FqXNS8vuzl6OjX3ezx93COtew4OOvs7ni0avflx0aAbbnS7Pf49%2Bjj4%2BTX1%2BBJRdTT1MbX8%2B746NzL2f%2F3tubo5tTb0%2F%2F39%2BXl5dPT0%2Fv7%2B%2F7%2B%2F%2BXk59nZ2czM%2F8z%2F%2F9PU0%2Bzs7JnMzOXm5dna2d3d3ff39%2Bfk5h0dHbjP8dPT1JwNKvbY2MMqKa7Jru7s7Newb%2F39%2Fcng%2F3%2FKLsuFEdzq9pOTk%2BKTE%2BFTcN7S1GYzmbfL3coRNrzG6NrZ2drZ49ra2dHBp9PU1PPz89fTzP%2F%2F%2FyH5BAEAAP8ALAAAAAAWABQAAAixAP%2F9S0CwoMGDBQUOBMCwocOHDRMshEgRIsGKGCMmyJiRILiPIEukAEmypEeSBAoUEFnSZAIC4AjATCmgxEouM3OCIyizZ0qCJWyWwOmTAM%2BiK0skCKqyAFGZBLsRkCo1VNCrBaxyoWo0QbevYJuKHTkVbFSw3XSIdQoArdkEOuLG7daUS0y5eHUQzKvWblq%2BcvfmBfcXcOAEIRIrXsyYMcHGkCFLRBy5skSBCDMfFBgQADs%3D",
	"PlaySmallIcon": "data:image/gif;base64,R0lGODlhEAAMAPcAAP%2F%2F%2F1uZ5ampqeqEAO7u7nJycrS0tPX19f7bNJmZmfHx8ffKyvn5%2Bf%2Fodv%2F6yenp6cPQ7DExMf1nZ%2F4zM%2Fq1tv2FhbrC4P7laOfn5%2FqUAP%2BZAPL2%2FDVcnP1PT%2F%2F96bEVFeHh4dXV1eTk5Nvk9kpISIiIiNvb29jY2P%2Fvl8zMzP%2FtjP%2F1stTU1KG02ezx%2Bv%2F70%2BLi4tra2v%2FxncMcHLFWV%2F%2F5wdUjI9Le9AI1m2WYAN7e3uzBASeUFP%2F83ZjLAfz8%2FMzZ8w8ODvX4%2Ff7eQv7jXON9AOQpKcbU7%2F7ZJc4iIuXs%2Bd54ANTk%2B9VSU9zp%2FM2ur8DN6%2F7hUaQuLvj6%2Ff%2Fzo%2F%2F0rE58sv%2FrgfGLAP7%2B%2Fp0ICLvH5sHBweCOj%2F7gS1USEvzj42GkUr7L6KHZSPv8%2F6DOk9nn%2B%2Bry%2FOHs%2FN1ububu%2FPm5TFPEHtfg9erw%2Bv%2F%2F%2Bv%2F%2B88jW8f7YHPaQAOJ8f%2FEsLHyt9SpsDzB73AgwaeLp99DQ0P3w8OLp%2BODn99g0NPD0%2FO3z%2B83e%2BICzAP39%2Fu%2F0%2B8s5Ou%2Fi4tHb73qz4DFtd6bE8md2y%2BpjWO%2B%2FwOomTpcdHY%2BbztY4KJS98Y%2B7itnh7%2F%2F3t9LusLh%2Bf9ftyt3Ky7%2FS8cPoj9JfYKu74KHF5rHC4l5eXrONt7a5zfDJikaUNkl8AOTs%2BMianN%2Fl7%2BykMM8cG%2F%2F%2FZu7o6MzH3Ojq7qxDRPDRpevv9sjR2LHibuXo7%2Bfu%2BvecnMnXya%2FK8%2F%2FqXNS8vuzl6OjX3ezx93COtew4OOvs7ni0avflx0aAbbnS7Pf49%2Bjj4%2BTX1%2BBJRdTT1MbX8%2B746NzL2f%2F3tubo5tTb0%2F%2F39%2BXl5dPT0%2Fv7%2B%2F7%2B%2F%2BXk59nZ2czM%2F8z%2F%2F9PU0%2Bzs7JnMzOXm5dna2d3d3ff39%2Bfk5h0dHbjP8dPT1JwNKvbY2MMqKa7Jru7s7Newb%2F39%2Fcng%2F3%2FKLsuFEdzq9pOTk%2BKTE%2BFTcN7S1GYzmbfL3coRNrzG6NrZ2drZ49ra2dHBp9PU1PPz89fTzP%2F%2F%2FyH5BAEAAP8ALAAAAAAQAAwAAAiAAP8lGEiwYEGBABIqXLhw4EIFPxgqdKjQALwHEgFQTMhFQAkDBxhuBNDRYoEUERM6zJIFgIES8OCFKqCgWjWNCX4wYEDIQKifXH5kMWbsx8ADChSAExBBwIEsSJMeGEjgwQMCBkD86CfNqlUCA0FIkyb2AIizaMUmEGiw7cB%2FAQEAOw%3D%3D"
};

HKGS.init();
