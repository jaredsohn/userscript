// ==UserScript==
// @name           mo better forum links v2
// @namespace      mark
// @include        http://forums.myspace.com/t/*
// @include        http://forums.myspace.com/p/*
// @include        http://forums.myspace.com/Reply.asp*
// ==/UserScript==
// description:    Adds more functionality to the new Myspace forums
// credits: created by mark (myspace.com/xenomark)
// credits: with help from dave (myspace.com/_saintjimmy)


// check for thread page or reply page
var isreplypage; 
isreplypage = window.location.href;
isreplypage = isreplypage.substring(isreplypage.indexOf('http://') + 26);
isreplypage = isreplypage.substring(0,isreplypage.indexOf('.'));


// if not a reply page, then we are on a thread page
if (isreplypage != 'Reply') {

// create an anchor before the nav bar
var topnav, topanchor;
topnav = document.getElementById('topnav');
if (topnav) {
    topanchor = document.createElement('a');
    topanchor.setAttribute("name", "top");
    topnav.parentNode.insertBefore(topanchor, topnav);
}


// create the "jump to bottom post link" before the top breadcrumb
var highdiv, toplink;
highdiv = document.getElementById('ctl00_ctl00_cpMain_CommonTop_RoundHeader_PopupPanel');
if (highdiv) {
	toplink = document.createElement('a');
    	toplink.setAttribute("href", "#bottom");
    	toplink.setAttribute("style", "text-decoration:none;font-weight:bold;margin-left:22px;");
    	toplink.appendChild(document.createTextNode('[jump to bottom post]'));
	highdiv.parentNode.insertBefore(toplink, highdiv);
}

// find the last post and insert the bottom anchor before it
var lastpost, thispost, bottomanchor;
lastpost = document.evaluate('/HTML[1]/BODY[1]/DIV[1]/FORM[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI[last()]', document, null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var l = 0; l < lastpost.snapshotLength; l++) {
    		thispost = lastpost.snapshotItem(l);
		//thispost.style.border = "5px red solid";
		if (thispost) {
			bottomanchor = document.createElement('a');
			bottomanchor.setAttribute("name", "bottom");
    			thispost.parentNode.insertBefore(bottomanchor, thispost);
		}
	}

// locate the top breadcrumb table and copy the contents
var bctbl, targetcode, tgtlink, newtbl;
bctbl = document.evaluate(                                  
	'//table[@class ="ThreadNavArea"]', document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < bctbl.snapshotLength; i++) {
		targetcode = bctbl.snapshotItem(i).innerHTML;

// locate a link at the bottom of the page from which to position the new breadcrumb table
		tgtlink = document.getElementById('ctl00_ctl00_cpMain_bcr_PostListSorter1_PostListSorter1');
		if (tgtlink) {

// build new breadcrumb table, include the "back to top" link as well as css info
			newtbl = document.createElement("table");  
			newtbl.setAttribute("id", "btmbctbl");
			newtbl.setAttribute("class", "ThreadNavArea");
			newtbl.setAttribute("style", "table-layout:fixed");
			newtbl.innerHTML = '<tr><td><a href="#top" style="text-decoration:none;font-weight:bold;">[back to top]</a></td></tr>' + targetcode + 
'<style> table#btmbctbl td[align="right"] {display:none;} table#btmbctbl tr td:first-child {width:100%;} table#btmbctbl {margin-bottom:10px;} div#header {display:none;}' +
'td.ForumPostFooterArea td[align="right"] a.btn  {display:block; width:16px; height:20px; overflow:hidden;} div#Signature {width:500px;}</style>';
			tgtlink.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newtbl, tgtlink.parentNode.parentNode.parentNode.parentNode.nextSibling);
		}
	}

// code to change buttons here


var allReplyLinks, currentReplyLink, currentReplyUrl;
allReplyLinks = document.evaluate(
    '/HTML[1]/BODY[1]/DIV[1]/FORM[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI/DIV[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/A[1]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allReplyLinks.snapshotLength; i++) {
    currentReplyLink = allReplyLinks.snapshotItem(i);
	currentReplyUrl = currentReplyLink.href
	currentReplyUrl = currentReplyUrl.substring(0,currentReplyUrl.indexOf('&MyToken'));
	currentReplyUrl = currentReplyUrl + '&quote=quote!'
	currentReplyLink.setAttribute("href", currentReplyUrl)
	currentReplyLink.setAttribute("id", "newquotelink");
	currentReplyLink.innerHTML = '<div class="CommonImageTextButton CommonQuoteButton">Quote</div>'
}

var replylink, thisreplylink, replyurl;
replylink = document.evaluate('/HTML[1]/BODY[1]/DIV[1]/FORM[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI[1]/DIV[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/A[1]', document, null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var m = 0; m < replylink.snapshotLength; m++) {
    		thisreplylink = replylink.snapshotItem(m);

		replyurl = thisreplylink.href;
		replyurl = replyurl.substring(0,replyurl.indexOf('&quote'));

		//thispost.style.border = "5px red solid";
		if (thisreplylink) {
			newreplylink = document.createElement('a');
			newreplylink.setAttribute("href", replyurl);
			newreplylink.setAttribute("class", "btn");
			newreplylink.setAttribute("id", "newreplylink");
			newreplylink.innerHTML = '<div class="CommonImageTextButton CommonReplyButton">Post a Reply</div>' +
'<style>a#newreplylink{position:fixed; margin-left:128px; margin-top:-40px; width:148px; height:30px; text-align:center;}' +
'a#newreplylink *, a#newreplylink *:hover, a#newquotelink *, a#newquotelink *:hover {color:black !important; text-decoration:none !important; font-size:16px;}' +
'table.ThreadNavArea td[align="right"] {visibility:hidden;}' +
'a#link_FavoritesControl {visibility:visible !important; position:fixed; width:148px; height:24px; margin-left:-27px; margin-top:-20px; text-align:center}</style>';
    			thisreplylink.parentNode.insertBefore(newreplylink, thisreplylink);
		}
	}


}


// if we are on a reply page, hide the stuff at the top
if (isreplypage == 'Reply') {
	function addGlobalStyle(css) {
    		var head, style;
    		head = document.getElementsByTagName('head')[0];
    		if (!head) { return; }
    		style = document.createElement('style');
    		style.type = 'text/css';
    		style.innerHTML = css;
    		head.appendChild(style);
	}
	addGlobalStyle('div.CommonContent>div>div.ForumPostArea, div.ForumTitlePadding, div#header, br {display:none;} div.ForumPostArea br {display:block;}');

// check the url to see if this is a quote page or a general reply page
	var isquotepage; 
	isquotepage = window.location.href;
	isquotepage = isquotepage.substring(isquotepage.indexOf('&quote') + 7);
	isquotepage = isquotepage.substring(0,isquotepage.indexOf('!'));

// if we are on a quote page 
	if (isquotepage == 'quote') {

// auto quote poster
		var page = document.getElementById('wrap');
		if (page) {
			page.setAttribute("onMouseOver", "ctl00_ctl00_cpMain_bcr_ReplyPostControl_Quote(); return false;")
		}
	}
	else {

// hide the quote button on general reply pages
		function addGlobalStyle2(css) {
    			var head2, style2;
    			head2 = document.getElementsByTagName('head')[0];
    			if (!head2) { return; }
    			style2 = document.createElement('style');
    			style2.type = 'text/css';
    			style2.innerHTML = css;
    			head2.appendChild(style2);
		}
		addGlobalStyle2('a#ctl00_ctl00_cpMain_bcr_ReplyPostControl_composepane_QuoteButton {display:none;}');
	}
}

