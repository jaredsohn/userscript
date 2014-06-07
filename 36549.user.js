// ==UserScript==
// @name			eMule Island ed2k links
// @description		Reveal ed2k links in download window (parse) or description (prefetch)
// @include			http://www.emule-island.com/dl.php?idf=*
// @include			http://www.emule-island.com/telecharger-*
// @author			StalkR
// @version			1.0
// ==/UserScript==


// Send ed2k link to this url (urlencode & append); otherwise leave empty and use ed2k:// url
//var ED2K_LINK="http://mldonkey_server:4080/submit?q="
var ED2K_LINK=""



// -------------------- Download window

dl_regexp = /^http:\/\/www\.emule-island\.com\/dl\.php\?idf=/i;
if (dl_regexp.test(document.location)) {
	// write links in description window (under download button if possible)
	var writemsg_xpath = document.evaluate('//fieldset', document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var writemsg;
	if (writemsg_xpath.snapshotLength > 0) writemsg = writemsg_xpath.snapshotItem(0);
	else writemsg = document.body;
	function WriteMsg(m) {
		writemsg.innerHTML += '<p style="clear: both; text-align:justify; word-wrap: break-word;">' + m + "</p>\n";
	}
	
	// find link <input name="link[]"> elements
	var links = document.evaluate('//input[@name="link[]"]', document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (links.snapshotLength > 0) {
		var msg = "<span>ed2k links (" + links.snapshotLength + ") :</span><br /><br />";
		// if found, link is in value=""
		for (var i=0 ; i < links.snapshotLength; i++) {
			if (ED2K_LINK == "")
				msg += '<a href="' + links.snapshotItem(i).value + '">'+ links.snapshotItem(i).value + '</a><br />';
			else
				msg += '<a href="' + ED2K_LINK + encodeURIComponent(links.snapshotItem(i).value) + '">'+ links.snapshotItem(i).value + '</a><br />';
			
		}
		WriteMsg(msg + "<br>\n");
	}
	else WriteMsg('<font color="red">No ed2k link found</font>');
}



// -------------------- Description window

else {
	// write links in description window (under download button if possible)
	var writemsg_xpath = document.evaluate('//div[@class="content"]', document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var writemsg;
	if (writemsg_xpath.snapshotLength > 0) writemsg = writemsg_xpath.snapshotItem(0);
	else writemsg = document.body;
	function WriteMsg(m) {
		writemsg.innerHTML += '<p style="clear: both; text-align:justify; word-wrap: break-word;">' + m + "</p>\n";
	}
	
	// parse download window's html to find ed2k links
	function process_response(details) {
		var links = details.responseText.match(/ed2k:\/\/[^"]+/gi);
		if (links.length > 0) {
			var msg = "<span>ed2k links (" + links.length + ") :</span><br /><br />";
			for (var i=0 ; i < links.length; i++) {
				if (ED2K_LINK == "")
					msg += '<a href="' + links[i] + '">' + links[i] + '</a><br />';
				else
					msg += '<a href="' + ED2K_LINK + encodeURIComponent(links[i]) + '">' + links[i] + '</a><br />';
			}
			WriteMsg(msg + "<br>\n");
		}
		else WriteMsg('<font color="red">No ed2k link found</font>');
	}
	
	// find download button
	var dllink = document.evaluate('//a[@class="bdown"]', document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dllink.snapshotLength > 0) {
		// if found, send GET request to the download window (to obtain links)
		GM_xmlhttpRequest( {
			method: "GET",
			url: dllink.snapshotItem(0).href,
			onload: process_response
		} );
	}
	else WriteMsg('<font color="red">Error: download link not found</font>');
}
