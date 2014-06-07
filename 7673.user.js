// ==UserScript==
// @name           Bloglines - Open Links In Background Tab
// @namespace      http://uzy.nl
// @description    Open Bloglines article link in background tab, now with Techmeme and doggdot.us external link support
// @include        http://www.bloglines.com/myblogs_display?*
// ==/UserScript==

if (!GM_openInTab) {
    alert("The 'Bloglines - Open Links In Background Tab' requires a newer version of Greasemonkey to run");
}

var keyCodeForOpen = 'O'.charCodeAt(0);

// Filter out keyboard events tainted with modifiers, within form elements or not among the valid keycodes
function eventIsClean(e) {
	var targetTag = e.target.tagName;
	var keyCode = e.which;
	return !e.altKey && !e.ctrlKey && !e.metaKey &&
	       targetTag != "TEXTAREA" && targetTag != "INPUT" &&
	       keyCode == keyCodeForOpen;
}

document.addEventListener('keypress', keyHandler, true);

function keyHandler(e) {
	if (!eventIsClean(e)) return;	

	var keyCode = e.which;	
	
	if (keyCode == keyCodeForOpen) { 
		e.stopPropagation();
		e.preventDefault();
		
		var regex = /(digg.com|del.icio.us|techmeme.com)/;
		var xpath = "//td[@class='selected']/div/h3/a";
		var res = document.evaluate(xpath, document, null, 
																XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		
		if (res.snapshotLength == 1) {
			var link = res.snapshotItem(0).href;
			
			//alert(link.match(regex));
			var match = regex.exec(link);
						
			if (match) {				
				if (match[0] == "techmeme.com") {
					xpath = "//td[@class='selected']/div/table/tbody/tr/td/p/b/a";					
				} else {
					xpath = "//td[@class='selected']/div/div/ul/li[@class='first']/a";
				}
				
				var res = document.evaluate(xpath, document, null, 
																		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);						
				if (res.snapshotLength == 1) {
					link = res.snapshotItem(0).href;
				}
			}
			
			if (link) {
				GM_openInTab(res.snapshotItem(0).href);
			}
		}		
	}
}