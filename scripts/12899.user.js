// ==UserScript==

// @name           mo better forum links
// @namespace      mark
// @include        http://forums.myspace.com/t/*
// @include        http://forums.myspace.com/p/*
// ==UserScript==
// created: 10/09/2007
// credits: created by mark (myspace.com/xenomark) 

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
			newtbl.innerHTML = '<tr><td><a href="#top" style="text-decoration:none;font-weight:bold;">[back to top]</a></td></tr>' + targetcode + '<style> table#btmbctbl td[align="right"] {display:none;} table#btmbctbl tr td:first-child {width:100%;} table#btmbctbl {margin-bottom:10px;} div#header {display:none;}</style>';
			tgtlink.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newtbl, tgtlink.parentNode.parentNode.parentNode.parentNode.nextSibling);
		}
	}
