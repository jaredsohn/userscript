// ==UserScript==
// @name           RC.com Tweak
// @namespace      Jay Tanzman
// @description    Allows users to control the appearance of rockclimbing.com pages.
// @include        http://www.rockclimbing.com/*
// @include        http://rockclimbing.com/*
// ==/UserScript==

var strVersion = "3.2.2";
       
// Revision history:

// Changed keys for next/previous post to Ctl-<right><left>

// Version 3.2.1
// Added function to hide average post rating

// Version 3.1.4-beta-2
// Fixed ignoreMyTopicsPost function

// Version 3.1.4-beta-1:
// Fixed linkify function to remove wbr nodes that the remote page began inserting into the
//     middle of long text URLs in posts
// Delayed loading of forum and misc pages until window.load event fires to smoothen page rendering
// Changes to Tweaks page:
//     Added panel to table header showing whether user has enabled deflickering
//     Removed obsolete items
// Added alert that pops up one time when user has upgraded Tweaks and has not enabled deflickering
// New feature: Fine tuning for deflickering
// Changed display type of form containing quote-and-reply button from "block" to "inline"

// Version 3.1.3:
// Added code to reverse hiding of document body in userContent.css (deflickering)

// Version 3.1.2:
// Re-wrote linkify function

// Version 3.1:
// Fixed real-time friends on line, and reset it to "on" by default

// Version 3.0.1:
// Fixed linkify function
// Changed real-time friends tweak to "off" by default

// Version 3.0:
// Added linkify function
// Fixed private message reply quoting
// Disabled obsolete banner hiding

// Versions 2.0a-c:
// Misc. changes to conform to changes in DOM 
// Disable hotkeys on all webmail pages (2.0c)

// Version 2.0:
// Added function for real-time display of friends online
// Improved reliability of tealification of My Threads table header
// Clarified description of tweaks in Tweaks table
// Changed most defaults from false to true

// Helper functions

function fnGetQuotedText() {
    var fntQuote = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/font[1]",document.body,null,9,null).singleNodeValue;  
    var nlSpansInFntQuote = document.evaluate(".//span", fntQuote, null, 7, null); 
    var nlDivsFollowingSpans = document.evaluate(".//span/following-sibling::div",fntQuote,null,7,null);
    var nlPresInDivs = document.evaluate(".//span/following-sibling::div/pre",fntQuote,null,7,null);
  
    if (nlSpansInFntQuote) {
	for (var i = 0; i < nlSpansInFntQuote.snapshotLength; i++) {
	    nlSpansInFntQuote.snapshotItem(i).parentNode.removeChild(nlSpansInFntQuote.snapshotItem(i));
	}
    }
  
    if (nlPresInDivs) {
	for (var i = 0; i < nlPresInDivs.snapshotLength; i++) {
	    var newTextNode = document.createTextNode("[pre]" + nlPresInDivs.snapshotItem(i).textContent + "[/pre]");
	    nlDivsFollowingSpans.snapshotItem(i).parentNode.replaceChild(newTextNode,nlDivsFollowingSpans.snapshotItem(i));
	}
    }
  
    var strQuote = fntQuote.innerHTML;
  
    var reMailTo = /<a href=\"mailto:([^\"]*)\">[^<]*<\/a>/g;
    var arrMailTo = reMailTo.exec(strQuote);
    strQuote = strQuote.replace(reMailTo,"[email]$1[/email]");
    strQuote = strQuote.replace(/\s{2,}<br>/g, " <br>");
    strQuote = strQuote.replace(/\s{2,}/g,"");                        // Strip instances of multipe spaces
    strQuote = strQuote.replace(/(\s<br>)/g,"\n");                    // Replace <br> elements with \n characters
    strQuote = strQuote.replace(/<div style=\"border[^<]*<div style=\"padding[^<]*<\/div>/g,"[quote]");   // Fix for requoted text
    strQuote = strQuote.replace(/<br><br><hr noshade(.*\n*)*/,"");    // Delete sender's signature
   
    strQuote = strQuote.replace(/<div[^>]*>/g,"");                    // Strip <div> tag and  <div> contents in re-quoted text
    strQuote = strQuote.replace(/In reply to:<\/div>/g,"[quote]");    // Replace "In reply to:" with [quote] tag

    strQuote = strQuote.replace(/<\/div>/g,"[/quote]");               // Replace </div> tags with [/quote] tags  
    strQuote = strQuote.replace(/<a href=\"/g,"[url ");               // Replace HTML links with BBCode links
    strQuote = strQuote.replace(/\" target=[^>]*>/g,"]");
    strQuote = strQuote.replace(/<\/a>/g,"[/url]"); 
    strQuote = strQuote.replace(/<img src=\"/g,"[img]");
    strQuote = strQuote.replace(/\"\sonload=[^>]*>/g,"[/img]");
    strQuote = strQuote.replace(/\"\salt=[^>]*>/g,"[/img]"); 
    strQuote = strQuote.replace(/<(\/?[b|i|u|s|li|ol|ul|blockquote|strike])>/g, "[$1]"); 
    strQuote = strQuote.replace(/<hr noshade=\"noshade\" size=\"1\">/g,"[hr]");
  
    var reColorHTML = /<font color=\"([^\"]*)\">([^<]*)<\/font>/g;
    var arrColorHTML = reColorHTML.exec(strQuote);
    strQuote = strQuote.replace(reColorHTML,"[$1]$2[/$1]");
  
    var reAlignHTML = /<p align=\"([^\"]*)\">([^<]*)<\/p>/g;
    var arrAlignHTML = reAlignHTML.exec(strQuote);
    strQuote = strQuote.replace(reAlignHTML,"[$1]$2[/$1]");
  
    return strQuote;
}

function fnElementHeight(element) {
    return element.offsetParent ? element.offsetTop + fnElementHeight(element.offsetParent) : element.offsetTop;
}

function fnScrollToNextPost(nlPosts) {
    forEachPost: for (var i = 0; i < nlPosts.snapshotLength; i++) {
	if (!isNaN(nlPosts.snapshotItem(i).name)) {
	    var elementHeight = fnElementHeight(nlPosts.snapshotItem(i));
	    if ((window.scrollMaxY > elementHeight) && (elementHeight > window.pageYOffset)) {
		window.scroll(window.pageXOffset, Math.min(elementHeight, window.scrollMaxY));
		break forEachPost;
	    }
	}
	if (i == nlPosts.snapshotLength - 1) { 
	    if (window.pageYOffset != window.scrollMaxY) {
		window.scrollTo(window.pageXOffset, window.scrollMaxY);
	    }
	    else {
		var bCurrPageNum = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td/font/b", document.body, null, 9, null).singleNodeValue;
		if (bCurrPageNum) {
		    var aNextPageNum = document.evaluate("following-sibling::a", bCurrPageNum, null, 9, null).singleNodeValue;
		    if (aNextPageNum.text.match(/^\d+$/)) {
			window.location.href = aNextPageNum.href;
		    }
		}
	    }
	}
    }
}

function fnScrollToPreviousPost(nlPosts) {
    forEachPost: for (var i = (nlPosts.snapshotLength - 1); i >= 0; i--) {
	if (!isNaN(nlPosts.snapshotItem(i).name)) {
	    var elementHeight = fnElementHeight(nlPosts.snapshotItem(i));
	    if (elementHeight < window.pageYOffset) {
		window.scrollTo(window.pageXOffset, elementHeight);
		break forEachPost;
	    }  
	}
	if (i == 0) {
	    if (window.pageYOffset != 0) window.scrollTo(window.pageXOffset,0); 
	    else {
		var bCurrPageNum = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td/font/b", document.body, null, 9, null).singleNodeValue;
		if (bCurrPageNum) {
		    var aPrevPageNum = document.evaluate("preceding-sibling::a[position()=1]", bCurrPageNum, null, 9, null).singleNodeValue;
		    if (aPrevPageNum) {
			window.location.href = aPrevPageNum.href;
		    }
		}
	    }
	}
    }
}

function fnSubmit() {
    var arrCkboxes = document.evaluate("tr/td[2]/input[@type='checkbox']", tbodyTweaks, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    arrCkboxValues = new Array(0);
    for (var i = 0; i < arrCkboxes.snapshotLength; i++) {
	arrCkboxValues.push(arrCkboxes.snapshotItem(i).checked);
	var strCkboxValues = arrCkboxValues.toString();
	GM_setValue("tweaks", strCkboxValues);
    }
}

function getCurrentPageNumElement() {
    return document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td/font/b",document.body,null,9,null).singleNodeValue;
}

function openT12HelpWindow() {
    if (wT12Help == null || wT12Help.closed) {
	wT12Help = window.open("","","height=720, width=720, left=1000, top=0, dialog, scrollbars=yes, minimizable=yes, resizable=yes");
	wT12Help.document.body.style.backgroundColor = "#f8faed";
	wT12Help.document.body.innerHTML = " \
      <h2>Help for Mark Multi-page Threads Read Utility</h2> \
      <h3>Synopsis</h3>  \
      You can use this feature to mark as 'read' threads that span multiple pages.  \
      <h3>Overview</h3>  \
      Let's say a 100-page long thread continually appears on the Recent Posts page.  You want to mark it read, but the only \
      way the website allows you to do this is to tediously click on every page of the thread.  Basically, this utility automates \
      this task, so that you don't have to do it by hand. \
      <h3>Details</h3> \
      To use this feature: \
      <ol> \
      <li>Navigate to a page of a multi-page thread (other than the last page of the thread) that contains unread posts.  \
      <li>Click the 'Mark Thread Read' button (this button will only appear if the <i>page</i> contains unread posts). \
      <li>The utility will then sequentially mark following pages of the thread read, until it reaches a page with no unread posts \
          or the end of the thread, whichever comes first.  The utility will then stop, and provide an alert message indicating which \
          pages of the thread have been marked read.  \
      <li>If you attempt to mark more than 10 pages at a time, you will be asked after every tenth page whether you wish to continue. \
          There are two reasons for this: (1) It gives you a chance to halt page marking in case you change your mind \
          or find that the process is taking too long (note, however, that you can open another browser tab and allow this function to \
          run in the background), and (2) it safeguards against the function running away (although I've made every attempt to safeguard \
          against this in the code, who knows, I could have missed something). \
      <li><u>Setting a breakpoint</u>. Let's say you're mildly interested in the 100-page thread.  You want to read recent posts - say the \
          last 5 pages - but not the first 95.  You can set a breakpoint by simply clicking on the 5th from last page.  Then go to the first \
          unread page of the thread, and click the 'Mark Thread Read' button.  Because clicking on the 5th from last page marked \
          all the posts on that page read, the function will stop marking pages read at that page.</ol> \
          <input type='button' value='Close' onclick=window.close()";
    }
    else wT12Help.focus();
}

function openT13HelpWindow() {
    if (wT13Help == null || wT13Help.closed) {
	wT13Help = window.open("","","height=720, width=500, left=1000, top=0, dialog, scrollbars=yes, minimizable=yes, resizable=yes");
	wT13Help.document.body.style.backgroundColor = "#f8faed";
	wT13Help.document.body.innerHTML = ' \
      <h2>Help for Enable Hot Keys for Website Navigation</h2> \
      <h3>If you enable this feature, you can use the following keys to navigate to the website pages listed below.</h3>  \
      <table width="100%" cellspacing="0" cellpadding="4" bgcolor="#dee0cb" style="border: 1px solid rgb(222, 224, 203);"> \
      <tbody style="border: 1px solid rgb(222, 224, 203)"> \
        <tr style="background-color: teal; font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px; color: white"> \
          <th class="ftablecol" align="center" width="20%" style="border-right: 1px solid rgb(222, 224, 203)">Key</th> \
          <th class="ftablecol" align="left">Webpage</th></tr> \
        <tr style="background-color: rgb(248, 250, 237); font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">E</td> \
          <td class="ftablecol" align="left"><u>E</u>mail</td></tr> \
        <tr style="background-color: white; font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">F</td> \
          <td class="ftablecol" align="left"><u>F</u>orums</td></tr> \
        <tr style="background-color: rgb(248, 250, 237); font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">H</td> \
          <td class="ftablecol" align="left"><u>H</u>ome</td></tr> \
        <tr style="background-color: white; font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">M</td> \
          <td class="ftablecol" align="left"><u>M</u>y Topics</td></tr> \
        <tr style="background-color: rgb(248, 250, 237); font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">N</td> \
          <td class="ftablecol" align="left">Go to <u>N</u>ext (Oldest) New Post on My Topics Page</td></tr> \
        <tr style="background-color: white; font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">P</td> \
          <td class="ftablecol" align="left"><u>P</u>hotos</td></tr> \
        <tr style="background-color: rgb(248, 250, 237); font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">R</td> \
          <td class="ftablecol" align="left"><u>R</u>ecent Posts</td></tr> \
        <tr style="background-color: white; font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">S</td> \
          <td class="ftablecol" align="left">Private Me<u>s</u>sages</td></tr> \
        <tr style="background-color: rgb(248, 250, 237); font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)">W</td> \
          <td class="ftablecol" align="left"><u>W</u>ho\'s Online</td></tr> \
        <tr style="background-color: white; font-family: verdana,tahoma,geneva,sans-serif; font-size: 12px;"> \
          <td class="ftablecol" align="center" style="border-right: 1px solid rgb(222, 224, 203)"><i>n</i> \
            <br><font size="1">(1-9)</font></td> \
          <td class="ftablecol" align="left">Go to <i>n</i>th Topic on Recent Posts or My Topics Page \
            <br><font size="1">(eg, 2 = Go to 2nd topic)</font></td></tr> \
      </table> \
      <br><input type="button" value="Close" onclick=window.close()';
    }
    else wT13Help.focus();
}

function doSubmitFeedback() {
    var wFeedback = window.open("http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do%3Dmessage%3Buser%3D8716=Send+Private+Message","");
    return wFeedback;
}

// Tweak functions

function fnRemoveAdBannerFromOther() {
    if (document.location != ("http://www.rockclimbing.com/" || "http://rockclimbing.com/")) {
	if (document.getElementById("leaderboard")) {
	    document.getElementById("leaderboard").style.display = "none";
	}
    }
}

function fnRemoveAdBannerFromHome() {
    if (document.location == ("http://www.rockclimbing.com/" || "http://rockclimbing.com/")) {
	document.getElementById("leaderboard").style.display = "none";
    }
}

function fnColorNavbar() {
    if (document.getElementById("navbar")) {
	var ulNavbarList = document.getElementById("navbar").childNodes[1];
	ulNavbarList.style.backgroundColor = "teal";
	ulNavbarList.parentNode.style.backgroundColor = "teal";
    }
}

function fnCleanUpRecentPosts() {
    var documentIsHidden = false;
    var tdMainContent;
    if (window.getComputedStyle(document.getElementsByTagName("body")[0],null).getPropertyValue("visibility") == "hidden") {
        documentIsHidden = true;
    }
    if (documentIsHidden && supplementDeflickering) {
	tdMainContent = document.evaluate("/html/body/div/div/table/tbody/tr/td[3]",document,null,9,null).singleNodeValue;
    }
    try {
	if (
	    (
	     (document.URL.substr(0,56) == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=") || 
	     (document.URL.substr(0,58) == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?post=") || 
	     (document.URL.substr(0,59) == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?forum=") ||
	     (document.URL.search("http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?") > -1) ||
	     (document.URL == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi")
	     ) && 
	    (document.URL.search("reply_write") == -1) &&
	    (document.URL.search("username=") == -1) &&
	    (document.URL.search("message") == -1) &&
	    (document.title.search(/reply/i) == -1)
	    ) {
	    if (tdMainContent) { tdMainContent.style.visibility = "hidden"; }
	    var arrAllBrs = document.body.getElementsByTagName("br");
	    arrAllBrs[2].style.display = "none";
	    if (document.location.href != "http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?list_type=friends#killfile") {
		arrAllBrs[3].style.display = "none";
	    }
	    arrAllBrs[5].style.display = "none";

	    var arrAllHrs = document.body.getElementsByTagName("hr");
	    arrAllHrs[0].style.display = "none";

	    var arrAllTds = document.body.getElementsByTagName("td");
	    arrAllTds[5].style.height = "26px";
	}
    }
    catch(e) {
	if (tdMainContent) {
	    tdMainContent.style.visibility = "visible";
	}
	return;
    }


    // Scroll pages to poge top, to first new post, or to selected post

    function alignFirstNewPost() {

	    if ((document.location.toString().search("#") == -1) || (document.location.toString().search("unread") > -1)) {
		var oFirstNewPost = document.evaluate(".//a[@name='unread']",document.body,null,9,null).singleNodeValue;
		if (oFirstNewPost) {
		    oFirstNewPost.scrollIntoView(true);
		} else {
		    window.scrollTo(0,0);
		}
	    }
	    else if (document.location.toString().search("#") > -1) {
		var thePostName = document.location.hash.substr(1);
		var allPosts = document.evaluate(".//a[@name]",document.body,null,7,null);
		for (var i = 0; i < allPosts.snapshotLength; i++) {
		    if (allPosts.snapshotItem(i).name == thePostName) {
			var thePost = allPosts.snapshotItem(i);
			window.scrollTo(0,fnElementHeight(thePost));
		    }
		}
	    }  
	    if (tdMainContent) { tdMainContent.style.visibility = "visible"; }
    }
    
    if (document.location != "http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?list_type=friends#killfile") {	
	if (tdMainContent) { tdMainContent.style.visibility = "hidden"; }
	window.addEventListener ("load", function() { alignFirstNewPost() }, true);
    } else if (tdMainContent) { 
	tdMainContent.style.visibility = "visiblae"; 
    }

    if (document.URL == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;") {
	document.getElementById("header").style.display = "none";
	//	var tblMyPages = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	//	var tblMyPagesClone = tblMyPages.cloneNode(true);
	//	tblMyPages.parentNode.removeChild(tblMyPages);
	//	var theParentNode = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	//	theParentNode.insertBefore(tblMyPagesClone, theParentNode.getElementsByTagName("h3")[0]);
    }
}

function fnTealify() {
    window.addEventListener("load", function() {
	    var grayElements = document.evaluate("descendant::tr[attribute::bgcolor='#91998b']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	    for (i = 0; i < grayElements.snapshotLength; i++) {
		var grayElement = grayElements.snapshotItem(i);
		grayElement.style.backgroundColor = "teal";
	    }
	}, true);


    // Delay tealification of Ajax elements

    if (document.location == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;") {
	var i = 0;
	var success = false;
	function timedFunction() {
	    var t = setTimeout(timedFunction, 100);
	    i++;
	    if ((i > 150) || (success == true)) {
		clearTimeout(t);
	    }
	    try {
		document.evaluate("div/div[1]/table[1]/tbody[1]/tr[1]/td[3]/center[1]/table[1]/tbody[1]/tr[1]/td[2]/table[1]/tbody[1]/tr[2]/td[1]/div[2]/table[1]/tbody[1]/tr[1]", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.backgroundColor = "teal";
		success = true;
	    }
	    catch (e1) {
		return;
	    }
	}

	var j = 0;
	var success2 = false;
	function timedFunction2() {
	    var t2 = setTimeout(timedFunction2, 100);
	    j++;
	    if ((j > 50) || (success2 == true)) {
		clearTimeout(t2);
	    }
	    try {
		document.evaluate("div/div[1]/table[1]/tbody[1]/tr[1]/td[3]/center[1]/table[1]/tbody[1]/tr[1]/td[2]/table[1]/tbody[1]/tr[2]/td[1]/div[3]/table[1]/tbody[1]/tr[1]", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.backgroundColor = "teal";
		success2 = true;
	    }
	    catch (e2) {
		return;
	    }
	}
	timedFunction();
	timedFunction2();
    }
}


// Remove logo banner and relocate useful links to left sidebar from all but Home page

function fnRemoveLogoBanner() {
    if (document.location != ("http://www.rockclimbing.com/" || "http://rockclimbing.com/")) {
	if (document.getElementById("header")) {
	    document.getElementById("header").style.display = "none";
	    var arrLoginAnchors = document.evaluate("//div[@id='login']/a[position()>1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	    var oLeftsidebarLiParent = document.evaluate("//a[@href='/cgi-bin/forum/gforum.cgi?do=message_list;']/../..", document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	    if(oLeftsidebarLiParent.singleNodeValue) {
		for (i = 0; i < arrLoginAnchors.snapshotLength; i++) {
		    var li = document.createElement("li");
		    li.className = "localnav";
		    var newLi = oLeftsidebarLiParent.singleNodeValue.appendChild(li);
		    var a = arrLoginAnchors.snapshotItem(i);
		    newLi.appendChild(a);
		}
	    }
	}
    }
}

function fnEnableScrollWithArrowKeys() {
    if ((document.URL.search(/post=/) > -1) && (document.URL.search(/post_reply_write/) == -1)){
	var nlPosts = document.evaluate(".//a[@name]",document.body,null,7,null);
	document.addEventListener("keypress", function(event) {
		if (event.keyCode == 39 && event.ctrlKey) {
		    // if (event.ctrlKey) {
		    //    window.scrollBy(19, 0);
		    // }
		    // else {
			event.preventDefault(); 
			fnScrollToNextPost(nlPosts);
		    // }
		}
		else if (event.keyCode == 37 && event.ctrlKey) {
		    // if (event.ctrlKey) {
		    //    window.scrollBy(-19, 0);
		    // }
		    // else {     
			event.preventDefault(); 
			fnScrollToPreviousPost(nlPosts);   
		    // }
		}
	    }, false);
    }
}

function fnQuoteAndReply() {
    return;
    // if (document.URL.search("message=") > -1) {

    // 	var frmGForum = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/form[1]",document.body,null,9,null).singleNodeValue.cloneNode(true);
    // 	frmGForum.style.display = "inline";

    // 	var btnPMReply = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table[2]/tbody/tr/td/input[4]",document.body,null,9,null).singleNodeValue;

    // 	var btnQuote = btnPMReply.cloneNode(true);
    // 	btnQuote.value = "Quote and Reply";
    // 	btnPMReply.parentNode.appendChild(frmGForum);
    // 	frmGForum.appendChild(btnQuote);
    // }

    // if (document.URL.search("Quote\\+and\\+Reply") > -1) {
    // 	window.addEventListener("load", function() {
    // 		var msgBody = document.evaluate(".//textarea[@name='msg_body']", document.body, null, 9, null).singleNodeValue;
    // 		var strQuote = "[quote]\n" + fnGetQuotedText() + "[/quote]";
    // 		msgBody.value = strQuote;
    // 	    },false);
    // }
}

function ignoreMyPostsTopics() {
    if (document.URL == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;") {

	const ICON1 = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys%2FRD84QzQ5Ojf%2F2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf%2FwAARCAAPAA8DASIAAhEBAxEB%2F8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIEBf%2FEACIQAAICAgIBBQEAAAAAAAAAAAECAwQFEQYSEwAUISIxFf%2FEABQBAQAAAAAAAAAAAAAAAAAAAAT%2FxAAdEQAABQUAAAAAAAAAAAAAAAAAAgMREhMUISIx%2F9oADAMBAAIRAxEAPwB%2BKQYKHIYDEXuPxZW9mMf%2FAEbF2yokSrGwdkVUYED8CEjrs6J2ToYvKpcVJBn7GOwi4mzgbaRSxxHrHaidmRW6gAKSdNvROgBsg%2FBR5law2CGNOSq12jnD1hdinZDEOhCK0J7L1YN9SCCrBfwEepsryGTPY6nTa7DbrwqfceCOVY3b69FPlJdyumJLaBLL8EjYOY6dGTYBDKJW8m1bg%2F%2FZ";
    
	const ICON2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC6ElEQVR4nCXSy28TBADH8V%2FX9%2Fpau9SwdTKDAbcxo1Fi4oF49uhlR8EMoskIJMaEw%2BL7ccADUUM0ioncJiY6ExanlcyNrd3arfSxrmuh9LG1tfbhChkLIHw98PkbPjKdG5ZOunR48iUNjR2UbMJkED1mYZPwWoRJQiZxdGxUQ%2BNPy%2F6mV9ZzT0nGswcU%2BOCIFBDaJ%2FL1BHt3atxpVunUqxRvZEgmQ8TTc8gv1Cf6JgalCaf0xFsjUkBMJS9Tf1ims1vj%2Ft5tWq0G%2FzQbNP5tU2tWicQXSBRCfDN7Hu0TBydfkJ479rLUI3bpUK7k4NEDWo02%2BXKVrfYO8VsFttstqo0Kq8lFSp0M8oiR46OSLCK2EaW%2BXSIcnKNbFgyy0nkA23sPybY7yGRFhi4u%2FXCRxcVZrlydQr1CToederEEO%2FcYsPhwyIpRDrZ27hEp1bhebSKzHclMr8vDVjZD8LefMTqFjBL8B82NMh6Z8cmNWU4au5CoNIkWqhh6%2FNhtbizqIhkKkVoNIaOQLAaK5QKPbt%2FFJRNudTNzeZb0zSoblSapco0vv7%2BEzeLAIpGOR0iuh5FNSG5xNXuNfCXH31tFdustiuk8uVyZbLHK6nqGSCzBZibNyso8s3O%2FMB3%2BCfmEnj3ziuQX02u%2FkshGKN3c5G6zhVEmYmtJnC4vwWCQaPQawYVpppenkE84XvNLgckXpVet6LBYrSwRjv5JJZ9j%2B1aRjUSayPIK66nrxJNL%2FBW7grxi%2BNSwAu%2BOSBo3a%2F8nz0sDInV%2FDWuvMOpxSYvBjFFChsc957MzaEi43%2FDI8VG%2F1PWpX473%2BqQD4rvVC4RvzDFxehxJGGTGZnVy%2FOQxFmJ%2F8O3v51G%2FGHx%2Fv%2FS2JH3cLZ0xyH3CJQ2JizMXWE4tsbIWI71ZYD4UIZnP8PWPXyGvOPrhEfnOeqTPTJLekfq%2FeFL%2BiR4den1QcglnvwuZrajLgYx25HEivxgdO6RnTg1IJyTj52b9D%2FCH3se26VD%2BAAAAAElFTkSuQmCC";
    
	const ICON5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACyUlEQVR4nG2Sy2uTeRSGj1dq0XRyMZMvbS5Gk6ZpvsQ0SZu0tlM0WqlgFbzsFLygiCMudOGMd7oQRFAsKFpGZ9nN%2FA2DiwFxBsXaekGxahUs9pI0bfL9kuZxEXU1i7M5nIfD%2B%2FJI6fSocCcnz%2FofyvOhV0IBShWYVlAApgwoAZTgwdCwPB98LfO3p6R4%2Bq1I%2BcobGb%2FwSEABCp89Qs1KByutGia7hmddEF1PEw118%2F3m08CYMDAr8vnWiIBir74b%2B2IXploHy2pWYbHYWG21YfvJjMOqkYx2EvGmOdJzElC86v9P5Mn9fwQUtWLC5fQji5ZisZnxuTQazHVE13ipN1vQbE7iegduUxBQjNwbFsGAWFMCe72bVKabOQwqFDEtFeprFhMwm6BUhMoC%2B%2FYfpKOjh20b9wIKAYXd40bqlvPBmCRPkTJ5GuqWk3Q7WK9ZQc0Dii%2B5GRoCQTJbd1bhMiBLBGuTixkUk2RRzGKrFSJOKwmvRmV6gvlCFoMF9HSacDz97bNRwePysmjVCnKUyDJH7%2B4eQms1mpxWwi4Hvx7YR8HIYwChaBK9OfUNzsLGwAZ8Tj8%2FN3iotVvwhHz4%2FS4CHo14c5BkLEJjMERraxc93TvoS%2B2CSZCn1%2F8WUPS1bCcSSOJe28gKq4UyJWItOrO5KTKZDInEBjKdffS1VcvK%2FzUhMt7%2F7w9B4s52UolNOH1%2B6td4aIqESLa10hxeT1Rv55fYNkAxenNUxi%2BPiDCo5N3vjwUU4WUtFL9AuWojRkVRBqhUF12BXkCR%2FWNG8uc%2Biiz8NiH5S58EFIfix0it62bgxiBVRlEoznLvzn06Y5s5vKVq19jFd8I1RDg7J1yvSPZuTkBxsPcYbeF2WltihBq9dKWT6L4gR%2Fcchyl4cP6RTF6ZEc6URLiKfDzxXiYGpuXln2M%2F8v%2FfDA%2B9lBc3Pwh3kfIpJV8BIYIus7dARPAAAAAASUVORK5CYII%3D";
        
	var icon = ICON1;

	if (!GM_getValue("HiddenMyTopicNums")) {
	    var arrHiddenMyTopicNums = [];
	} else {
	    var arrHiddenMyTopicNums = GM_getValue("HiddenMyTopicNums").split(",");
	}

	if (!GM_getValue("HiddenMyTopicTitles")) {
	    var arrHiddenMyTopicTitles = [];
	} else {
	    var arrHiddenMyTopicTitles = GM_getValue("HiddenMyTopicTitles").split(",");
	}

	function timedFunction() { 

	    function recolorTableRows() {
		var intVisibleRowNum = 0;
		for (var i = 0; i < nlMyTopicTableRows.snapshotLength; i++) {
		    if (nlMyTopicTableRows.snapshotItem(i).style.display != "none") {
			intVisibleRowNum++;
			nlMyTopicTableRows.snapshotItem(i).bgColor = arrBgColors[(intVisibleRowNum + 1) % 2];
		    }
		}
	    }
      
	    var arrBgColors = ["#f8faed", "white"];
      
	    var attemptCounter = 0;
	    var success = false;
	    var t = setTimeout(timedFunction, 100);
	    attemptCounter++;
	    if ((attemptCounter > 100) || success) {
		clearTimeout(t);
	    }
	    try {
		var th1 = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/table/tbody/tr/th[1]",document.body,null,9,null).singleNodeValue;

		var imgIcon = document.createElement("img");
		imgIcon.src = icon;
		th1.replaceChild(imgIcon,th1.getElementsByTagName("font")[0]);

		var nlMyTopicTableRows = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/table/tbody/tr[position()>1]",document.body,null,7,null);
		var nlMyTopicTablePostLinks = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/table/tbody/tr/td[2]/a",document.body,null,7,null);
		var arrMyTopicTablePostNums = [];
		for (var i = 0; i < nlMyTopicTableRows.snapshotLength; i++) {      
		    var intMyTopicPostNum = nlMyTopicTablePostLinks.snapshotItem(i).href.match(/post=(\d+)/)[1];
		    arrMyTopicTablePostNums.push(intMyTopicPostNum);
		}
		if (arrHiddenMyTopicNums.length > 0) {
		    for (var i = 0; i < arrMyTopicTablePostNums.length; i++) {
			hiddenNumsLoop:
			for (var j = 0; j < arrHiddenMyTopicNums.length; j++) {
			    if (arrMyTopicTablePostNums[i] == arrHiddenMyTopicNums[j]) {
				nlMyTopicTableRows.snapshotItem(i).style.display = "none";
				break hiddenNumsLoop;
			    }
			}
		    }
		    recolorTableRows();
		}
		
		var nlTopicReplyIcons = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/table/tbody/tr/td[1]/nobr/img",document.body,null,7,null);
		var strOriginalSrc = "";
		for (var j = 0; j < nlTopicReplyIcons.snapshotLength; j++) {
		    nlTopicReplyIcons.snapshotItem(j).addEventListener("mouseover", function fnMouseover() {
			    strOriginalSrc = this.src;
			    this.src = icon;
			},false);
		    nlTopicReplyIcons.snapshotItem(j).addEventListener("mouseout", function() {
			    this.src = strOriginalSrc;
			},false);
		    nlTopicReplyIcons.snapshotItem(j).title = "Click to delete topic";
		    nlTopicReplyIcons.snapshotItem(j).style.cursor = "pointer";
		    nlTopicReplyIcons.snapshotItem(j).addEventListener("click", function() {
			    var aTopicLink = this.parentNode.parentNode.parentNode.childNodes[3].firstChild;
			    var intPostNum = aTopicLink.href.match(/post=(\d+)/)[1];
			    var strMyTopicTitleToHide = aTopicLink.textContent;
			    var strMessage = "Permanently delete \"" + strMyTopicTitleToHide + "\" from My Topics?";
			    if (!confirm(strMessage)) return;
			    this.parentNode.parentNode.parentNode.style.display = "none";
			    recolorTableRows();
			    arrHiddenMyTopicNums.push(intPostNum);
			    arrHiddenMyTopicTitles.push(strMyTopicTitleToHide.substr(0,30));
			    GM_setValue("HiddenMyTopicNums", arrHiddenMyTopicNums.toString());
			    GM_setValue("HiddenMyTopicTitles", arrHiddenMyTopicTitles.toString())
				},false);
		}
		success = true;
	    }
	    catch (e1) {
		return;
	    }   
	}
	timedFunction();
    }
}

function showQuotedImages() {
    return;
 //    if ((document.URL.search(/http:\/\/www\.rockclimbing\.com\/cgi\-bin\/forum\/gforum\.cgi\?do=post_reply_write;quote=1/) > -1) || (document.URL == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi#last")) {
// 	var txtarea = document.body.getElementsByTagName("textarea")[0]; 
// 	if (txtarea.textContent.match(/\[\.(img|image)\]/i)) {
// 	    var btnPost = document.evaluate( "div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td/input[@value='Post Reply']", document.body, null, 9, null).singleNodeValue;  
// 	    var btnPostWithImg = btnPost.cloneNode(true);
// 	    btnPostWithImg.value = "Post: Show Quoted Images";
// 	    btnPostWithImg.style.MozMarginStart = "6px";
// 	    btnPost.parentNode.insertBefore(btnPostWithImg, btnPost.nextSibling);
// 	    btnPostWithImg.addEventListener("mouseup", function() {
// 		    var txt = txtarea.value;
// 		    var newtxt = txt.replace(/\[\.(img|image)\]/ig, "[$1]");
// 		    txtarea.value = newtxt;
// 		    btnPost.click();
// 		},false); 
// 	}
//     }
}

function addBottomLinks() {
    if (window.location.href.search(/post=/) > -1) {  // If page is a forum thread
	var fntBottomLinks = document.evaluate("div/div/table/tbody/tr/td[3]/center/table[position()=(last()-1)]/tbody/tr/td[2]/table/tbody/tr[2]/td/font",document.body,null,9,null).singleNodeValue;

	if (fntBottomLinks) {
	    var aForums = fntBottomLinks.firstChild;

	    var aMyTopicsLink = aForums.cloneNode(true);
	    aMyTopicsLink.textContent = "My Topics";
	    aMyTopicsLink.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;";
	    aMyTopicsLink.style.marginLeft = "10px";
	    fntBottomLinks.appendChild(aMyTopicsLink);

	    var aRecPostsLink = aForums.cloneNode(true);
	    aRecPostsLink.textContent = "Recent Posts";
	    aRecPostsLink.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts;";
	    aRecPostsLink.style.marginLeft = "10px";
	    fntBottomLinks.appendChild(aRecPostsLink);
	}
    }
}

function markLongThreadRead() {

    function doMarkThreadRead() {
	lastPageTest: if (!isLastPage) {
	    if (fntNewPosts.snapshotLength > 0) {
		var intPageCounter = 1 + (GM_getValue("PageCounter") || 0);
		if (intPageCounter > 100) { // Every 10 pages, confirm whether user wishes to continue marking pages read
		    if (confirm("Continue marking thread pages read?")) intPageCounter = 0;
		    else break lastPageTest;
		}
		GM_setValue("PageCounter", intPageCounter);
		document.location = aNextPage.href;
		return;
	    }
	}
	GM_setValue("MarkThreadRead", false);
	if (fntNewPosts) {
	    for (var i = 0; i < fntNewPosts.snapshotLength; i++) {
		fntNewPosts.snapshotItem(i).style.display = "none";
	    }
	}
	scrollTo(0,0);
	alert("Thread has been marked read from page " + GM_getValue("StartPage") + " through the current page.");
    }
  
    if (document.URL.search(/post=/) > -1) {
    
	var fntNewPosts = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr/td/font/table/tbody/tr/td[2]/table/tbody/tr/td/font/b/font[@color='red']",document.body,null,7,null);
	var isMultiPage = (getCurrentPageNumElement() != null);
	if (isMultiPage) {
	    var aNextPage = document.evaluate("following-sibling::a", getCurrentPageNumElement(), null, 9, null).singleNodeValue;
	    var isLastPage = (aNextPage.textContent == "View All");
	}
    
	if ( isMultiPage && !isLastPage && fntNewPosts.snapshotLength > 0 ) { 

	    // Create and insert button
	    var tdBtnParent = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]", document.body,null,9,null).singleNodeValue;
	    var btnMarkThreadRead = tdBtnParent.getElementsByTagName("input")[0].cloneNode(true);
	    btnMarkThreadRead.type = "button";
	    btnMarkThreadRead.value = "Mark Thread Read";
	    btnMarkThreadRead.style.MozMarginEnd = "6px";
	    btnMarkThreadRead.name = "MarkThreadRead";
	    btnMarkThreadRead.addEventListener("click", function() {
		    GM_setValue("StartPage", getCurrentPageNumElement().textContent);
		    GM_setValue("MarkThreadRead", true);
		    GM_setValue("PageCounter", 0);
		    GM_setValue("ThreadID", document.URL.match(/post=(\d+)/)[1]);
		    doMarkThreadRead();
		}, false);
	    tdBtnParent.insertBefore(btnMarkThreadRead, tdBtnParent.getElementsByTagName("input")[0]);
	    if (GM_getValue("MarkThreadRead") == undefined) GM_setValue("MarkThreadRead", false);
	}
    
	if (GM_getValue("MarkThreadRead") == true){
	    if (document.URL.search("post=" + GM_getValue("ThreadID")) > -1) doMarkThreadRead();
	    else GM_setValue("MarkThreadRead", false);
	}
    }
}
  

function enableHotKeys() {
    if (document.URL.search(/webmail/) == -1) {
	var inInput = false;
	var hasFocus = false;
	var arrSelects = document.getElementsByTagName("select");
	var arrTextareas = document.getElementsByTagName("textarea");
	var nlTextboxes = document.evaluate(".//input[@type='text']", document, null, 7, null);
	var arrUsername = document.getElementsByName("username");
	var arrPassword = document.getElementsByName("password");
	var arrInputs = [];

	for (var i = 0; i < arrSelects.length; i++) {
	    arrInputs.push(arrSelects[i]);
	}
	for (var i = 0; i < arrTextareas.length; i++) {
	    arrInputs.push(arrTextareas[i]);
	}
	for (var i = 0; i < nlTextboxes.snapshotLength; i++) {
	    arrInputs.push(nlTextboxes.snapshotItem(i));
	}
	for (var i = 0; i < arrUsername.length; i++) {
	    arrInputs.push(arrUsername[i]);
	}
	for (var i = 0; i < arrPassword.length; i++) {
	    arrInputs.push(arrPassword[i]);
	}
	for (var i = 0; i < arrInputs.length; i++) {
	    arrInputs[i].addEventListener("mouseover", function() {inInput = true;}, false);
	    arrInputs[i].addEventListener("mouseout", function() {inInput = false;}, false);
	    arrInputs[i].addEventListener("focus", function() {hasFocus = true;}, false);
	    arrInputs[i].addEventListener("blur", function() {hasFocus = false;}, false);
	}
	document.addEventListener("keydown", function(event) { 
		if (!inInput && !hasFocus) {
		    if (event.keyCode == 69) {  // E = Email
			window.location.href = "http://www.rockclimbing.com/webmail/";
		    }
		    else if (event.keyCode == 70) {  // F = Forums
			window.location.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?";
		    }
		    else if (event.keyCode == 72) {  // H = Home
			window.location.href = "http://www.rockclimbing.com";
		    }
		    else if (event.keyCode == 77) {  // M = My topics
			window.location.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;";
		    }

		    else if (event.keyCode == 80) {  // P = Photos
			window.location.href = "http://www.rockclimbing.com/photos/";
		    }
		    else if (event.keyCode == 82) {  // R = Recent messages
			window.location.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts;";
		    }
		    else if (event.keyCode == 83) {  // S = Private messages
			window.location.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=message_list;";
		    }
		    else if (event.keyCode == 87) {  // W = Who's online
			window.location.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=whos_online;";
		    }
		    if (window.location.href == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;" || "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts;") {
			if (window.location.href == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;") {
			    var nlTableRowIcons = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr[position()>1]/td/nobr/img",document.body,null,7,null);    
			    var nlTableRows = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr[position()>1]",document.body,null,7,null);
			    if (event.keyCode == 78) {  // N = Next new post 
				for (var i = nlTableRowIcons.snapshotLength - 1; i >= 0; i--) {
				    if (nlTableRowIcons.snapshotItem(i).src.search(/new/i) > -1) {
					if (nlTableRows.snapshotItem(i).style.display != "none") {
					    window.location.href = nlTableRows.snapshotItem(i).getElementsByTagName("a")[0].href;
					    break;
					}
				    }
				}
			    }
			}
			else if (window.location.href == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts;") {
			    var nlTableRowIcons = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div[2]/table/tbody/tr[position()>1]/td/nobr/img",document.body,null,7,null);
			    var nlTableRows = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div[2]/table/tbody/tr[position()>1]",document.body,null,7,null);
			}
			if (event.keyCode >= 49 && event.keyCode <= 57) {
			    window.location.href = nlTableRows.snapshotItem(event.keyCode - 49).getElementsByTagName("a")[0];
			}
		    }
		}
	    }, false);
    }
}

function removeGoogleTextAds() {
    var divGoogleAds = document.evaluate("div/div/table/tbody/tr/td[3]/center/div",document.body,null,9,null).singleNodeValue;
    if (divGoogleAds) { divGoogleAds.parentNode.removeChild(divGoogleAds); }
}

function showFriendsOnline() {
    function startFriendsRequests() {
	friendsInterval = setInterval(makeFriendsRequest, REQUEST_INTERVAL);
    }

    function postFriendsOnline(arrFriendsOnline) {
	var ulNewFriendsOnline = document.createElement("ul");
	ulNewFriendsOnline.className = "localnav";
	ulNewFriendsOnline.style.marginTop = "0px";
	
	for (var i = 0; i < arrFriendsOnline.length; i++) {
	    var aFriendOnline = document.createElement("a");
	    aFriendOnline.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi\?username=" + arrFriendsOnline[i] + ";";
	    aFriendOnline.textContent = arrFriendsOnline[i];
			
	    var liFriendOnline = document.createElement("li");
	    liFriendOnline.className = "localnav";
	    liFriendOnline.appendChild(aFriendOnline);
			
	    ulNewFriendsOnline.appendChild(liFriendOnline);
	}
	divFriendsOnline.replaceChild(ulNewFriendsOnline, ulFriendsOnline);
	ulFriendsOnline = ulNewFriendsOnline;
    }

    function makeFriendsRequest() {
	allCookies = document.cookie;
	GM_xmlhttpRequest({
		method: "POST",
		    url: "http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?",
		    headers: {
		    'Accept': 'application/xml,text/xml',
			'Content-type':'application/x-www-form-urlencoded',
			'Cookie': allCookies,			
			},    
		    data: encodeURI('list_type=friends;'),
		    onload: function(responseDetails) {
		    divResponse.innerHTML = responseDetails.responseText;
		    var nlFriendsOnline = document.evaluate("div[@id='background']/div[@id='forumbody']/center/div[@id='wrapper']/div[4]/div/table/tbody/tr/td[2]/div/div[2]/table/tbody/tr/td[2]/table/tbody/tr/td[2]/font/font",divResponse,null,7,null);
		    
		    arrFriendsOnline = [];
		    for (var i = 0; i < nlFriendsOnline.snapshotLength; i++) {
			if (nlFriendsOnline.snapshotItem(i).textContent == "Yes") {
			    var txtFriendName = nlFriendsOnline.snapshotItem(i).parentNode.parentNode.parentNode.getElementsByTagName("a")[0].textContent;
			    arrFriendsOnline.push(txtFriendName);
			}
		    }
		    GM_setValue("keyFriendsOnline", arrFriendsOnline.toString());
		    GM_setValue("keyFriendsOnlineTime", (new Date()).toString());
		    if (fntMyStuff) postFriendsOnline(arrFriendsOnline);
		}
	    });
    }

    const TIME_TO_LIVE = 180000;
    const REQUEST_INTERVAL = 15000;

    var divResponse = document.createElement("div");
    var arrFriendsOnline = [];

    var divWrapper = document.getElementById("wrapper");

    // Container on most pages
    var divMyStuff1 = document.evaluate("div[4]/div/table/tbody/tr/td[2]/table[1]/tbody/tr/td[2]/div/div[2]",divWrapper,null,9,null).singleNodeValue;
    // Container on Forums Index page
    //var fntMyStuff2 = document.evaluate("div/center/div/table/tbody/tr/td[2]/div/div[3]/ul/font",document.body,null,9,null).singleNodeValue;
    // Container on Home page 
    //var ulMyStuff1 = document.evaluate("div[2]/div[2]/div/div/div[2]/ul",document.body,null,9,null).singleNodeValue;
    // Container on Routes page 
    //var ulMyStuff2 = document.evaluate("div[2]/div[2]/div/div/div[3]/ul",document.body,null,9,null).singleNodeValue;
    // Container on Partners page
    //var ulMyStuff3 = document.evaluate("div/div/table/tbody/tr/td[2]/div/font/div[2]/ul",document.body,null,9,null).singleNodeValue;
    // Container on Email page 
    //var ulMyStuff4 = document.evaluate("div[2]/div[4]/div/div/div[8]/ul",document.body,null,9,null).singleNodeValue;
    // Container on My Hit List page 
    //var ulMyStuff5 = document.evaluate("div[2]/div[3]/div/div/div[2]/ul",document.body,null,9,null).singleNodeValue;
    // Container on individual photo pages 
    //var ulMyStuff6 = document.evaluate("div[2]/div[2]/div/div/div[4]/ul",document.body,null,9,null).singleNodeValue;

    var fntMyStuff = divMyStuff1 //||fntMyStuff2||ulMyStuff1||ulMyStuff2||ulMyStuff3||ulMyStuff4||ulMyStuff5||ulMyStuff6||undefined;

    var ulFriendsOnline = document.createElement("ul");
    ulFriendsOnline.className = "localnav";
    ulFriendsOnline.style.marginTop = "0px";
   
    var h4FriendsOnline = document.createElement("h4");
    h4FriendsOnline.textContent = "Friends Online:";

    var divFriendsOnline = document.createElement("div");
    divFriendsOnline.className = "clear";
    divFriendsOnline.appendChild(ulFriendsOnline);
    
    if (fntMyStuff) {
	fntMyStuff.appendChild(h4FriendsOnline);
	fntMyStuff.appendChild(divFriendsOnline);
    }

    if (GM_getValue("keyFriendsOnline") && GM_getValue("keyFriendsOnlineTime")) {
	if (Date.now() - Date.parse(GM_getValue("keyFriendsOnlineTime")) < TIME_TO_LIVE) {
	    arrFriendsOnline = GM_getValue("keyFriendsOnline").split(",");
	    if (fntMyStuff) postFriendsOnline(arrFriendsOnline);
	}
    }

    makeFriendsRequest();
    startFriendsRequests();
}

// Turn text URLs in posts into clickable links

function linkify() {
    if (window.location.href.search(/post=/) > -1) {
	// Some posts are font nodes while others are div nodes
	// So var "posts" has to be the parent td node
	var posts = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr/td/font/table/tbody/tr/td[2]",document.body,null,7,null);
	for (var i = 0; i < posts.snapshotLength; i++) {
	    // We have to get rid of any wbr nodes that the remote page sometimes mysteriously
	    // inserts in the middle of URLs in posts.
	    var nlWbrs = posts.snapshotItem(i).getElementsByTagName("wbr");
	    var intThisWbr = nlWbrs.length - 1;
	    while (nlWbrs.length > 0) {
		nlWbrs[intThisWbr].parentNode.removeChild(nlWbrs[intThisWbr]);
		intThisWbr--;
	    }
	    // Removing the wbr's leaves the URL broken up into multiple adjacent text nodes,
	    // so we have to collapse them before we can linkify them.
	    posts.snapshotItem(i).normalize();
	    // Now we finally linkify them.
	    var textNodes = document.evaluate("descendant::text()",posts.snapshotItem(i),null,7,null);
	    for (var j = 0; j < textNodes.snapshotLength; j++) {
		if (textNodes.snapshotItem(j).parentNode.nodeName != "A" 
		    && textNodes.snapshotItem(j).parentNode.nodeName != "IMG") {
		    var reURLs = /\bhttps?:\/\/[^<\[]+\b/gi;
		    if (textNodes.snapshotItem(j).nodeValue.match(reURLs)) {
			var aNew = document.createElement("a");
			aNew.href = textNodes.snapshotItem(j).nodeValue.match(reURLs);
			aNew.target = "_blank";
			aNew.textContent = textNodes.snapshotItem(j).nodeValue.match(reURLs);
			textNodes.snapshotItem(j).parentNode.replaceChild(aNew, textNodes.snapshotItem(j));
		    }
		}
	    }
	}
    }
}

function hideAvgVote() {
	if (window.location.href.search(/post=/) > -1) {
		var spans = document.getElementsByTagName("span");
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].id.search(/average_rating_/) > -1) {
				spans[i].style.visibility = "hidden";
			}
		}
	}
}

// Global variables
var wT12Help = null; 
var wT13Help = null;
var isDeflickered = false;
var supplementDeflickering = false;

if (window.getComputedStyle(document.getElementsByTagName("body")[0],null).getPropertyValue("visibility") == "hidden") {
    isDeflickered = true;
}

// Fill in subject box and give focus to message body for PM to jt512 with Tweaks feedback

if ((document.URL == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do%3Dmessage%3Buser%3D8716=Send+Private+Message") && (document.referrer =="http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts" || "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts#")) {
    document.getElementsByName("msg_subject")[0].value = "Tweaks Feedback" + " (V" + strVersion + ")";
    document.getElementsByName("msg_body")[0].focus();
}

// Apply selected tweaks when a page loads

// Set default tweaks for new users
if (GM_getValue("tweaks") == undefined) {
    // Edit if number of table rows is changed
    var strCkboxValues = "false,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,true,false";  
    GM_setValue("tweaks", strCkboxValues);
}

// Read tweaks into an array and convert array elements from strings to booleans
var strCkboxValues = GM_getValue("tweaks");
var arrCkboxValues = strCkboxValues.split(",");
for (var i = 0; i < arrCkboxValues.length; i++) {  // Convert array elements from strings to booleans
    if (arrCkboxValues[i] == "true") {
	arrCkboxValues[i] = true;
    } else if (arrCkboxValues[i] == "false") {
	arrCkboxValues[i] = false;
    }
}

// Set default tweaks for newly added tweaks for upgraders
if (arrCkboxValues[17] == undefined) {
    arrCkboxValues[17] = false;
    strCkboxValues = arrCkboxValues.toString();
    GM_setValue("tweaks",strCkboxValues);
}

if (arrCkboxValues[0])  fnRemoveAdBannerFromOther();   // Edit if number or order of table rows is changed
if (arrCkboxValues[1])  fnRemoveAdBannerFromHome();
if (arrCkboxValues[2])  fnColorNavbar();
if (arrCkboxValues[16]) supplementDeflickering = true; // Must precede execustion of fnCleanUpRecentPosts()
if (arrCkboxValues[3])  fnCleanUpRecentPosts();
if (arrCkboxValues[4])  fnTealify();
if (arrCkboxValues[5])  fnRemoveLogoBanner();
if (arrCkboxValues[6])  fnEnableScrollWithArrowKeys();
if (arrCkboxValues[7])  fnQuoteAndReply();
if (arrCkboxValues[8])  ignoreMyPostsTopics();
if (arrCkboxValues[9])  showQuotedImages();
if (arrCkboxValues[10]) addBottomLinks();
if (arrCkboxValues[11]) markLongThreadRead();
if (arrCkboxValues[12]) enableHotKeys();
if (arrCkboxValues[13]) removeGoogleTextAds();
if (arrCkboxValues[14]) showFriendsOnline();
if (arrCkboxValues[15]) linkify();
if (arrCkboxValues[17]) hideAvgVote();

// Apply selected tweaks when Tweaks page unloads, unless user has just upgraded

if (document.URL == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts#;") {
    window.addEventListener("unload", function () {
	    if (GM_getValue("keyVersion") == strVersion) {
		fnSubmit();
	    }
	}, false);
}

// Add Tweaks page link to Navbar

var divNavbar = document.getElementById("navbar");
var ulNavbar = divNavbar.getElementsByTagName("ul")[0];
var liPreferences = document.createElement("li");
var aPreferences = document.createElement("a");
                            
aPreferences.textContent = "Tweaks";
aPreferences.href = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts#;";

liPreferences.appendChild(aPreferences);
ulNavbar.appendChild(liPreferences);


// Create Tweaks page

if (document.location == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts#;") {

    // Create page header
    var tbodyRemove = document.getElementById("forumbody").getElementsByTagName("tbody")[2];
    tbodyRemove.getElementsByTagName("a")[0].style.display = "none";
    tbodyRemove.getElementsByTagName("b")[1].textContent = "Tweaks";
    tbodyRemove.getElementsByTagName("b")[1].parentNode.innerHTML = "<b>Tweaks <font size='2'>(version " + strVersion + ")</font></b>";
    tbodyRemove.getElementsByTagName("font")[3].style.display = "none";
    tbodyRemove.getElementsByTagName("th")[0].style.display = "none";


    // Create tweaks table

    var tbodyTweaks = document.createElement("tbody");
    tbodyTweaks.width="100%";
    tbodyTweaks.cellspacing="0";
    tbodyTweaks.cellpadding="4";
    tbodyTweaks.bgcolor="#dee0cb";
    tbodyTweaks.style.cssText = "border: 1px solid rgb(222, 224, 203);";


    // Create table header

    var trTweaksHeader = document.createElement("tr");
    trTweaksHeader.bgColor = "#91998b";

    var thTweak = document.createElement("th");
    thTweak.className = "ftablecol";
    thTweak.align = "left";
    thTweak.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="white"><b>Tweak</b></font>';
    trTweaksHeader.appendChild(thTweak);

    var tdDeflicker = document.createElement("td");
    tdDeflicker.className = "ftablecol";
    tdDeflicker.align = "center";
    tdDeflicker.style.width = "225px";
    tdDeflicker.style.backgroundColor = "BBBFA1";

    if (isDeflickered) {
	tdDeflicker.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="white";>Deflicker status: </font> \
            <font size="2" weight="bold" face="Verdana,Arial,Helvetica" color="green"><b>Enabled</b></font>';
    } else {
	tdDeflicker.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="white";>Deflicker status:</font>\
            <font size="2" weight="bold" face="Verdana,Arial,Helvetica" color="red"><b>Not Enabled</b></font>\
            <a href="http://jt512.dyndns.org/deflicker.html" target="_blank"><br \><font color="blue" size="1">Learn more</a></font>';
    }
	

    trTweaksHeader.appendChild(tdDeflicker);
   

    var thEnable = document.createElement("th");
    thEnable.className = "ftablecol";
    thEnable.align = "center";
    thEnable.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="white";"><b>Enable</b></font>';
    trTweaksHeader.appendChild(thEnable);

    tbodyTweaks.appendChild(trTweaksHeader);


    // Design Enable control

    var ckEnable = document.createElement("input");
    ckEnable.type = "checkbox";


    // Add table row 1

    var trTweaks1 = document.createElement("tr");
    trTweaks1.style.backgroundColor = "#f8faed";

    var tdTweak = document.createElement("td");
    tdTweak.className = "ftablecol";
    tdTweak.align = "left";
    tdTweak.colSpan = "2";
    tdTweak.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="#212126">Regional Discussions</font>';

    trTweaks1.appendChild(tdTweak);

    var tdEnable = document.createElement("td");
    tdEnable.className = "ftablecol";
    tdEnable.align = "center";
    tdEnable.appendChild(ckEnable);

    trTweaks1.appendChild(tdEnable);
    trTweaks1.getElementsByTagName("input")[0].checked = false;
    
    tbodyTweaks.appendChild(trTweaks1);
    trTweaks1.getElementsByTagName("font")[0].textContent = "Remove Top Advertising Banner from All Pages Except the Home Page (obsolete)";


    // Add table row 2

    var trTweaks2 = trTweaks1.cloneNode(true);
    trTweaks2.style.backgroundColor = "white";
    trTweaks2.getElementsByTagName("font")[0].textContent = "Remove Top Advertising Banner from Home Page (obsolete)";
    trTweaks2.getElementsByTagName("input")[0].checked = false;
    tbodyTweaks.appendChild(trTweaks2);


    // Add table row 3

    var trTweaks3 = trTweaks1.cloneNode(true);
    trTweaks3.getElementsByTagName("font")[0].textContent = "Add Color to the Main Navigation Bar";
    trTweaks3.getElementsByTagName("input")[0].checked = arrCkboxValues[2];
    tbodyTweaks.appendChild(trTweaks3);


    // Add table row 4

    var trTweaks4 = trTweaks2.cloneNode(true);
    trTweaks4.getElementsByTagName("font")[0].textContent = "Remove Wasteful Whitespace from Certain Pages and Scroll Pages to Top of Page or First New Post";
    trTweaks4.getElementsByTagName("input")[0].checked = arrCkboxValues[3];
    tbodyTweaks.appendChild(trTweaks4);


    // Add table row 5

    var trTweaks5 = trTweaks1.cloneNode(true);
    trTweaks5.getElementsByTagName("font")[0].textContent = "Tealify: Color Table Headers Teal";
    trTweaks5.getElementsByTagName("input")[0].checked = arrCkboxValues[4];
    tbodyTweaks.appendChild(trTweaks5);


    // Add table row 6

    var trTweaks6 = trTweaks2.cloneNode(true);
    trTweaks6.getElementsByTagName("font")[0].textContent = "Remove Logo Banner from All Pages Except Home Page";
    trTweaks6.getElementsByTagName("input")[0].checked = arrCkboxValues[5];
    tbodyTweaks.appendChild(trTweaks6);
  
  
    // Add table row 7

    var trTweaks7 = trTweaks1.cloneNode(true);
    trTweaks7.getElementsByTagName("font")[0].innerHTML = "Use Ctr + Right (Left) Arrow Keys to Scroll to Next (Previous) Post on Forum Pages";
    // <br><font size='1'>(Press 'Ctl + \u2192' or 'Ctl + \u2190' for normal horizontal scrolling)</font>";
    trTweaks7.getElementsByTagName("input")[0].checked = arrCkboxValues[6];
    tbodyTweaks.appendChild(trTweaks7);
  
  
    // Add table row 8

    var trTweaks8 = trTweaks2.cloneNode(true);
    trTweaks8.getElementsByTagName("font")[0].textContent = "Enable Quoting of Sender\'s Message When Replying to Private Messages";
    trTweaks8.getElementsByTagName("input")[0].checked = arrCkboxValues[7];
    tbodyTweaks.appendChild(trTweaks8);

  
    // Add table row 9

    var trTweaks9 = trTweaks1.cloneNode(true);
    trTweaks9.getElementsByTagName("font")[0].textContent = "Enable Hiding of Selected Topics on 'My Topics' Page";
    trTweaks9.getElementsByTagName("input")[0].checked = arrCkboxValues[8];
    tbodyTweaks.appendChild(trTweaks9);
  
  
    // Add table row 10

    var trTweaks10 = trTweaks2.cloneNode(true);
    trTweaks10.getElementsByTagName("font")[0].textContent = "When I Quote a Post Containing Images, Let Me Show the Quoted Images in My Reply";
    trTweaks10.getElementsByTagName("input")[0].checked = arrCkboxValues[9];
    tbodyTweaks.appendChild(trTweaks10);
  
  
    // Add table row 11

    var trTweaks11 = trTweaks1.cloneNode(true);
    trTweaks11.getElementsByTagName("font")[0].textContent = "Add Links to 'My Topics' Page and 'Recent Posts' Page to the Bottom of Forum Pages";
    trTweaks11.getElementsByTagName("input")[0].checked = arrCkboxValues[10];
    tbodyTweaks.appendChild(trTweaks11);
  
  
    // Add table row 12

    var trTweaks12 = trTweaks2.cloneNode(true);
    trTweaks12.getElementsByTagName("font")[0].textContent = "Enable Utitlity for Marking Multi-page Threads 'Read'";
  
    var aTweaks12Help = document.createElement("a");    
    aTweaks12Help.href = "";
    aTweaks12Help.textContent = "Help";
    aTweaks12Help.style.fontSize = "10px";
    aTweaks12Help.style.color = "blue";
    aTweaks12Help.style.marginLeft = "6px";
    aTweaks12Help.addEventListener("click", function(event) {openT12HelpWindow(); event.preventDefault();}, false);
    aTweaks12Help.title = "Help: Mark Multi-Page Thread Utility";
    trTweaks12.getElementsByTagName("td")[0].appendChild(aTweaks12Help);

    trTweaks12.getElementsByTagName("input")[0].checked = arrCkboxValues[11];

    tbodyTweaks.appendChild(trTweaks12);
  
    // Add table row 13

    var trTweaks13 = trTweaks1.cloneNode(true);
    trTweaks13.getElementsByTagName("font")[0].textContent = "Enable Hot Keys for Website Navigation";
  
    var aTweaks13Help = document.createElement("a");    
    aTweaks13Help.href = "";
    aTweaks13Help.textContent = "Help";
    aTweaks13Help.style.fontSize = "10px";
    aTweaks13Help.style.color = "blue";
    aTweaks13Help.style.marginLeft = "8px";
    aTweaks13Help.addEventListener("click", function(event) {openT13HelpWindow(); event.preventDefault();}, false);
    aTweaks13Help.title = "Show table of available hot keys";
    trTweaks13.getElementsByTagName("td")[0].appendChild(aTweaks13Help);
  
    trTweaks13.getElementsByTagName("input")[0].checked = arrCkboxValues[12];
    tbodyTweaks.appendChild(trTweaks13);
  
  
    // Add table row 14

    var trTweaks14 = trTweaks2.cloneNode(true);
    trTweaks14.getElementsByTagName("font")[0].textContent = "Hide Google Text Ads That May Appear at Top of Pages";
    trTweaks14.getElementsByTagName("input")[0].checked = arrCkboxValues[13];
    tbodyTweaks.appendChild(trTweaks14); 
	
	
    // Add table row 15

    var trTweaks15 = trTweaks1.cloneNode(true);
    trTweaks15.getElementsByTagName("font")[0].textContent = "Display Real-time Friends Online in 'My Stuff' Panel";
    trTweaks15.getElementsByTagName("input")[0].checked = arrCkboxValues[14];
    tbodyTweaks.appendChild(trTweaks15);

    // Add table row 16

    var trTweaks16 = trTweaks2.cloneNode(true);
    trTweaks16.getElementsByTagName("font")[0].textContent = "Turn Unclickable URLs in Posts Into Clickable Links";
    trTweaks16.getElementsByTagName("input")[0].checked = arrCkboxValues[15];
    tbodyTweaks.appendChild(trTweaks16);

    // Add table row 17

    var trTweaks17 = trTweaks1.cloneNode(true);
    trTweaks17.getElementsByTagName("font")[0].innerHTML = "Fine Tune Page Loading If Deflickering Is Enabled <b>(recommended)</b>";
    trTweaks17.getElementsByTagName("input")[0].checked = arrCkboxValues[16];
    tbodyTweaks.appendChild(trTweaks17);

    // Add table row 18

    var trTweaks18 = trTweaks2.cloneNode(true);
    trTweaks18.getElementsByTagName("font")[0].textContent = "Hide Average Post Ratings";
    trTweaks18.getElementsByTagName("input")[0].checked = arrCkboxValues[17];
    tbodyTweaks.appendChild(trTweaks18);

    // Disable and hide obsolete tweaks

    trTweaks1.getElementsByTagName("input")[0].disabled = true;
    trTweaks2.getElementsByTagName("input")[0].disabled = true;
    trTweaks1.style.display = "none";
    trTweaks2.style.display = "none";

    // Add submit button to table

    var btnSubmit = document.createElement("input");
    btnSubmit.type = "button";
    btnSubmit.value = "Apply Changes";
    btnSubmit.style.backgroundColor = "gainsboro";
    btnSubmit.addEventListener("click", function() {
	    fnSubmit();
	    window.location.reload();
	}, false);

    var trSubmit = document.createElement("tr");
    var tdSubmit = document.createElement("td");
    tdSubmit.appendChild(btnSubmit);
    trSubmit.appendChild(tdSubmit);
    tbodyTweaks.appendChild(trSubmit);
  
  
    // Add footer to table
  
    var tblFooter = document.createElement("table");
    var trFooter = document.createElement("tr");
    trFooter.style.backgroundColor="white";
    trFooter.style.border = "none";  
  
    var tdFooter1 = document.createElement("td");
    tdFooter1.style.fontSize = "10px";
    tdFooter1.style.color = "#d98c00";
    tdFooter1.innerHTML = '<i>Tweaks</i> by <a style="color:d98c00" href="http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?username=jt512;">jt512</a> \u00b7 ';
  
    var aFooter1 = document.createElement("a");
    aFooter1.style.color = "#d98c00";
    aFooter1.href = "#";
    aFooter1.textContent = "Send feedback";
    aFooter1.addEventListener("click", function(event) {
	    doSubmitFeedback();
	    event.preventDefalut();
	}, false);
    tdFooter1.appendChild(aFooter1);
  
    trFooter.appendChild(tdFooter1);
    tblFooter.appendChild(trFooter);
  

    // Replace Recent Posts table with Tweaks table and append footer
    var trContainer = document.evaluate("tr[3]/td[1]/div[2]/table[1]", tbodyRemove, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    trContainer.removeChild(trContainer.getElementsByTagName("tbody")[0]);
    trContainer.appendChild(tbodyTweaks);
    trContainer.parentNode.appendChild(tblFooter);
}

if ((GM_getValue("keyVersion") != strVersion) && (!isDeflickered)) {
    var updateMessage = "Tweaks Message\
      \n________________\
      \n\nYou have not enabled Deflickering.\
      \n\nTo learn more, visit your Tweaks page.\n ";
    alert(updateMessage);
}

GM_setValue("keyVersion", strVersion);

// Override "body {visibility:hidden}" if user has set it in userContent.css
document.body.style.visibility = "visible";
