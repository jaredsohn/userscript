// ==UserScript==


// @name           DeliciousRedditToolbar
// @namespace      http://www.masukomi.org/

// @description    Add del.icio.us links to reddit links opened with a reddit toolbar fram above them.
// @include        http://reddit.com/toolbar*
// @include        http://*.reddit.com/toolbar*
// @exclude        http://reddit.com/toolbar/comments/*
// @exclude        http://*.reddit.com/toolbar/comments/*
// @exclude        http://reddit.com/toolbar/inner*
// @exclude        http://*.reddit.com/toolbar/inner*
// UPDATED Dec 24 2009: Works (finally) with the new reddit toolbar layout
// UPDATED Jun 15 2007: New URL structure being used by Reddit toolbar. 
// UPDATED May 15 2007: Includes fix for bookmarking pages whose titles have apostrophes in them.

// ==/UserScript==

try {
	var breakoutLink = document.evaluate( "//div[@class='right-side']//a[5]", 
		document, 
		null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var right_side_div = null;
	
	try {
		right_side_div = document.getElementsByClassName('right-side')[0];
	} catch (f){
	};
	if (right_side_div){
		
		var breakoutCell =  document.evaluate("//div[@class='right-side']",
		document, 
		null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		

		var url = breakoutLink.href;

		var delSpan = document.createElement('span');
		delSpan.setAttribute('class', 'linkicon');
		postTarget = "javascript:(function(){open('http://del.icio.us/post?v=4;noui=yes;jump=close;url="
						+ encodeURIComponent(url)
						+ ';title=' 
						+ encodeURIComponent(top.document.title).replace(/'/g, "\\'")
						+ "','delicious','toolbar=no,width=700,height=400')})()";
		delSpan.innerHTML = "<a class=\"bylink\" href='#' onClick=\""  + postTarget + "\">del.icio.us</a>";
		//right_side_div.appendChild(delSpan);
		breakoutCell.innerHTML = "<span >&nbsp;&nbsp;" + delSpan.innerHTML + "</span>" + breakoutCell.innerHTML;
		
	}

} catch (e){
	//eat it. 
}

